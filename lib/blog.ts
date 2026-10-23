import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { z } from 'zod'
import type { Post, Category, Tag } from './types'

export const BLOG_POSTS_PER_PAGE = 9

const blogFrontmatterSchema = z.object({
  title: z.string().min(1, 'Judul artikel wajib diisi'),
  description: z.string().min(1, 'Deskripsi artikel wajib diisi'),
  date: z.string().min(1, 'Tanggal publikasi artikel wajib diisi'),
  modified: z.string().optional(),
  author: z.string().default('Wahyu Andika Putra'),
  category: z.string().default('Umum'),
  tags: z.array(z.string()).default([]),
  featuredImage: z.string().optional(),
  published: z.boolean().default(true),
  rank_math_title: z.string().optional(),
  rank_math_description: z.string().optional(),
})

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>

export interface ProcessedPost extends Omit<Post, 'categories' | 'tags'> {
  id: string
  slug: string
  readingTime: number
  published: boolean
  categories: Category[]
  tags: Tag[]
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200
  const wordCount = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

const BLOG_DIRECTORY = path.join(process.cwd(), 'content', 'blog')

export async function getAllBlogPosts(): Promise<ProcessedPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return []
  }

  const entries = fs.readdirSync(BLOG_DIRECTORY, { withFileTypes: true })
  const markdownFiles = entries.filter(
    (entry) =>
      entry.isFile() &&
      (entry.name.endsWith('.md') || entry.name.endsWith('.mdx')) &&
      !entry.name.startsWith('.'),
  )

  const posts: ProcessedPost[] = []

  for (const file of markdownFiles) {
    const fullPath = path.join(BLOG_DIRECTORY, file.name)
    const rawContent = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(rawContent)

    const parsed = blogFrontmatterSchema.safeParse(data)
    if (!parsed.success) {
      console.warn(`Artikel ${file.name} memiliki frontmatter tidak valid:`, parsed.error.issues)
      continue
    }

    const frontmatter = parsed.data
    const slug = file.name.replace(/\.(md|mdx)$/, '')
    const renderedHtml = await marked.parse(content)
    const readingTime = calculateReadingTime(content)
    const categorySlug = slugify(frontmatter.category)

    const post: ProcessedPost = {
      id: slug,
      slug,
      date: frontmatter.date,
      modified: frontmatter.modified ?? frontmatter.date,
      status: frontmatter.published ? 'publish' : 'draft',
      type: 'post',
      link: `/blog/${slug}`,
      featured_media: 0,
      title: {
        rendered: frontmatter.title,
      },
      excerpt: {
        rendered: frontmatter.description,
      },
      content: {
        rendered: renderedHtml,
      },
      author: {
        id: 1,
        name: frontmatter.author,
      },
      categories: [
        {
          id: 1,
          name: frontmatter.category,
          slug: categorySlug,
        },
      ],
      tags: frontmatter.tags.map((tagName, index) => ({
        id: index + 1,
        name: tagName,
        slug: slugify(tagName),
        count: 0,
      })),
      ...(frontmatter.featuredImage
        ? {
            _embedded: {
              'wp:featuredmedia': [
                {
                  id: 1,
                  source_url: frontmatter.featuredImage,
                  alt_text: frontmatter.title,
                },
              ],
            },
          }
        : {}),
      rank_math_title: frontmatter.rank_math_title,
      rank_math_description: frontmatter.rank_math_description,
      readingTime,
      published: frontmatter.published,
    }

    posts.push(post)
  }

  // Urutkan berdasarkan tanggal terbaru menurun (descending)
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPublishedBlogPosts(): Promise<ProcessedPost[]> {
  const posts = await getAllBlogPosts()
  return posts.filter((post) => post.published)
}

export async function hasPublishedBlogPosts(): Promise<boolean> {
  const posts = await getPublishedBlogPosts()
  return posts.length > 0
}

export async function getPost(slug: string): Promise<ProcessedPost | null> {
  const posts = await getPublishedBlogPosts()
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getPosts(params: {
  categories?: number[]
  exclude?: (string | number)[]
  per_page?: number
} = {}): Promise<ProcessedPost[]> {
  let posts = await getPublishedBlogPosts()

  if (params.exclude?.length) {
    posts = posts.filter((post) => !params.exclude?.includes(post.id) && !params.exclude?.includes(post.slug))
  }

  if (params.per_page) {
    posts = posts.slice(0, params.per_page)
  }

  return posts
}

export async function getPostsPaginated(params: {
  page?: number
  per_page?: number
} = {}): Promise<{ data: ProcessedPost[]; totalPages: number; totalPosts: number }> {
  const posts = await getPublishedBlogPosts()
  const page = Math.max(1, params.page ?? 1)
  const perPage = params.per_page ?? BLOG_POSTS_PER_PAGE

  const totalPosts = posts.length
  const totalPages = Math.ceil(totalPosts / perPage)
  const startIndex = (page - 1) * perPage
  const data = posts.slice(startIndex, startIndex + perPage)

  return {
    data,
    totalPages,
    totalPosts,
  }
}

export async function getPostsForSitemap(): Promise<Array<{ slug: string; modified: string }>> {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
    modified: post.modified,
  }))
}

export async function getPostsForLlms(): Promise<
  Array<{ slug: string; title: string; excerpt?: string }>
> {
  const posts = await getPublishedBlogPosts()
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
  }))
}

export async function getPostsWithContent(
  limit?: number,
): Promise<
  Array<{
    slug: string
    title: string
    excerpt: string
    content: string
    date: string
    modified: string
  }>
> {
  let posts = await getPublishedBlogPosts()
  if (limit) {
    posts = posts.slice(0, limit)
  }
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title.rendered,
    excerpt: post.excerpt.rendered,
    content: post.content.rendered,
    date: post.date,
    modified: post.modified,
  }))
}
