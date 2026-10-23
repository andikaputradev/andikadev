import type { MetadataRoute } from 'next'
import fs from 'node:fs'
import path from 'node:path'
import { getPostsForSitemap } from '@/lib/blog'
import { productionUrl } from '@/lib/seo/config'

export const revalidate = 604800

const staticPageMap: Record<string, string> = {
  '': 'app/page.tsx',
  tentang: 'app/tentang/page.tsx',
  layanan: 'app/layanan/page.tsx',
  'layanan/pembuatan-website': 'app/layanan/pembuatan-website/page.tsx',
  'layanan/pembuatan-aplikasi': 'app/layanan/pembuatan-aplikasi/page.tsx',
  'layanan/upload-play-store': 'app/layanan/upload-play-store/page.tsx',
  'layanan/keamanan-siber': 'app/layanan/keamanan-siber/page.tsx',
  'layanan/web3-blockchain': 'app/layanan/web3-blockchain/page.tsx',
  kontak: 'app/kontak/page.tsx',
  'kebijakan-privasi': 'app/kebijakan-privasi/page.tsx',
}

function getFileDate(relativePath: string): Date {
  try {
    const fullPath = path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath)
    const stat = fs.statSync(fullPath)
    return stat.mtime
  } catch {
    return new Date('2026-10-23T00:00:00.000Z')
  }
}

/**
 * Pembangkit sitemap XML resmi.
 * Berdasarkan dokumentasi resmi Google Search Central, nilai <priority> dan <changefreq> diabaikan oleh Googlebot.
 * Oleh karena itu hanya bidang <loc> dan <lastmod> nyata yang disertakan.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = productionUrl

  try {
    const posts = await getPostsForSitemap()
    const hasPosts = posts.length > 0

    const staticRoutes: MetadataRoute.Sitemap = Object.entries(staticPageMap).map(
      ([routePath, filePath]) => ({
        url: routePath ? `${baseUrl}/${routePath}` : baseUrl,
        lastModified: getFileDate(filePath),
      })
    )

    if (hasPosts) {
      staticRoutes.push({
        url: `${baseUrl}/blog`,
        lastModified: getFileDate('app/blog/page.tsx'),
      })
    }

    const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.modified),
    }))

    return [...staticRoutes, ...postRoutes]
  } catch (error) {
    console.error('Gagal membangkitkan sitemap dinamis:', error)
    return Object.entries(staticPageMap).map(([routePath, filePath]) => ({
      url: routePath ? `${baseUrl}/${routePath}` : baseUrl,
      lastModified: getFileDate(filePath),
    }))
  }
}
