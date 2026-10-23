import type { MetadataRoute } from 'next'
import { getPostsForSitemap } from '@/lib/blog'
import { productionUrl } from '@/lib/seo/config'

export const revalidate = 604800

const coreRoutes = [
  { path: '', priority: 1.0, changeFreq: 'monthly' },
  { path: 'tentang', priority: 0.8, changeFreq: 'monthly' },
  { path: 'layanan', priority: 0.9, changeFreq: 'monthly' },
  { path: 'layanan/pembuatan-website', priority: 0.8, changeFreq: 'monthly' },
  { path: 'layanan/pembuatan-aplikasi', priority: 0.8, changeFreq: 'monthly' },
  { path: 'layanan/upload-play-store', priority: 0.8, changeFreq: 'monthly' },
  { path: 'layanan/keamanan-siber', priority: 0.8, changeFreq: 'monthly' },
  { path: 'layanan/web3-blockchain', priority: 0.8, changeFreq: 'monthly' },
  { path: 'kontak', priority: 0.8, changeFreq: 'monthly' },
]

const legalRoutes = [
  { path: 'kebijakan-privasi', priority: 0.5, changeFreq: 'yearly' },
]

function createSitemapEntry(baseUrl: string, route: { path: string; priority: number; changeFreq: string }) {
  return {
    url: route.path ? `${baseUrl}/${route.path}` : baseUrl,
    changeFrequency: route.changeFreq as 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never',
    priority: route.priority,
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = productionUrl

  try {
    const posts = await getPostsForSitemap()
    const hasPosts = posts.length > 0

    const dynamicMainRoutes = [
      ...coreRoutes,
      ...(hasPosts ? [{ path: 'blog', priority: 0.8, changeFreq: 'weekly' }] : []),
    ]

    const staticRoutes = [
      ...dynamicMainRoutes,
      ...legalRoutes,
    ].map((route) => createSitemapEntry(baseUrl, route))

    const postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const allRoutes = [...staticRoutes, ...postRoutes]
    return allRoutes.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return [...coreRoutes, ...legalRoutes].map((route) => createSitemapEntry(baseUrl, route))
  }
}
