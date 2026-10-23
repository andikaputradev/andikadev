import { buildLlmsFullTxt } from '@/lib/seo'
import { getPostsWithContent } from '@/lib/blog'

export const revalidate = 604800

export async function GET() {
  const posts = await getPostsWithContent()

  return new Response(buildLlmsFullTxt(posts), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}
