import { buildLlmsTxt } from '@/lib/seo'
import { getPostsForLlms } from '@/lib/blog'

export const revalidate = 604800

export async function GET() {
  const posts = await getPostsForLlms()

  return new Response(buildLlmsTxt(posts), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
