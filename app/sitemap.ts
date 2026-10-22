import type { MetadataRoute } from 'next'
import { getPostsForSitemap } from '@/lib/wordpress'
import { productionUrl } from '@/lib/seo/config'

export const revalidate = 604800 // 7 days; webhook calls revalidatePath('/sitemap.xml')

const mainRoutes = [
  { path: '', priority: 1.0, changeFreq: 'monthly' },
  { path: 'about', priority: 0.8, changeFreq: 'monthly' },
  { path: 'blog', priority: 0.8, changeFreq: 'weekly' },
  { path: 'projects', priority: 0.8, changeFreq: 'weekly' },
  { path: 'contact', priority: 0.8, changeFreq: 'monthly' },
]

const legalRoutes = [
  { path: 'privacy-policy', priority: 0.5, changeFreq: 'yearly' },
  { path: 'terms-of-service', priority: 0.5, changeFreq: 'yearly' },
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

  const staticRoutes = [
    ...mainRoutes,
    ...legalRoutes,
  ].map((route) => createSitemapEntry(baseUrl, route))

  try {
    const posts = await getPostsForSitemap()

    const postRoutes = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified || post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

    const allRoutes = [...staticRoutes, ...postRoutes]
    return allRoutes.sort((a, b) => (b.priority || 0) - (a.priority || 0))
  } catch (error) {
    console.error('Failed to generate sitemap:', error)
    return staticRoutes
  }
}
