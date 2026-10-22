import type { Metadata } from 'next'
import { Suspense } from 'react'
import { redirect } from 'next/navigation'
import { BlogContent } from '@/components/blog-content'
import { BookOpen, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { JsonLd } from '@/components/seo/json-ld'
import { contactHref } from '@/lib/contact-services'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { BLOG_POSTS_PER_PAGE, getPostsPaginated } from '@/lib/wordpress'

export const revalidate = 604800 // 7 days; webhook refreshes the index on publish

const BLOG_TITLE = 'Blog dan Artikel Teknis'
const BLOG_DESCRIPTION =
  'Artikel dan wawasan teknis mengenai pembuatan website, aplikasi mobile, keamanan siber defensif, dan Web3.'

interface BlogPageProps {
  searchParams: Promise<{ page?: string }>
}

function parseBlogPageParam(pageParam?: string): number {
  if (!pageParam) return 1

  const parsedPage = Number.parseInt(pageParam, 10)
  if (!Number.isFinite(parsedPage)) return 1

  return parsedPage
}

function getBlogCanonicalPath(currentPage: number): string {
  return currentPage <= 1 ? '/blog' : `/blog?page=${currentPage}`
}

function getBlogTitle(currentPage: number): string {
  return currentPage > 1 ? `${BLOG_TITLE} (Halaman ${currentPage})` : BLOG_TITLE
}

export async function generateMetadata({ searchParams }: BlogPageProps): Promise<Metadata> {
  const { page: pageParam } = await searchParams
  const currentPage = parseBlogPageParam(pageParam)
  const canonicalPath = getBlogCanonicalPath(currentPage)

  return buildPageMetadata({
    title: getBlogTitle(currentPage),
    description: BLOG_DESCRIPTION,
    path: canonicalPath,
    keywords: [
      'Blog teknologi',
      'Pembuatan website',
      'Pembuatan aplikasi',
      'Keamanan siber',
      'Web3',
    ],
  })
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page: pageParam } = await searchParams
  const currentPage = parseBlogPageParam(pageParam)

  if (pageParam === '1') {
    redirect('/blog')
  }

  const { data: posts, totalPages } = await getPostsPaginated({
    page: currentPage,
    per_page: BLOG_POSTS_PER_PAGE,
  })

  const canonicalPath = getBlogCanonicalPath(currentPage)
  const currentTitle = getBlogTitle(currentPage)

  const structuredData = buildPageGraph({
    path: canonicalPath,
    name: currentTitle,
    description: BLOG_DESCRIPTION,
    type: 'CollectionPage',
    breadcrumbs: [{ name: 'Blog', path: '/blog' }],
  })

  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero Section */}
      <section className="text-center pt-8 pb-12">
        <div
          className="inline-flex bg-white/60 rounded-full mb-8 py-1.5 pr-4 pl-3 shadow-sm backdrop-blur-sm items-center gap-2"
          style={{
            position: 'relative',
            // @ts-expect-error CSS custom properties
            '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
            '--border-radius-before': '9999px',
          }}
        >
          <BookOpen className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-600">
            Publikasi dan artikel
          </span>
        </div>

        <h1 className="leading-[0.95] lg:text-[4rem] text-4xl font-medium text-zinc-900 tracking-tighter mb-6">
          Blog dan
          {' '}<span className="block gradient-text font-light">artikel teknis</span>
        </h1>

        <p className="text-base md:text-lg text-zinc-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Wawasan teknis seputar pembuatan aplikasi, arsitektur website, standar keamanan siber defensif,
          serta implementasi Web3.
        </p>
      </section>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 opacity-60" />

      <Suspense
        fallback={
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-[350px] animate-pulse rounded-2xl bg-zinc-100" />
            ))}
          </div>
        }
      >
        <BlogContent
          initialPosts={posts}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </Suspense>

      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-16 opacity-60" />

      <section className="overflow-hidden min-h-[300px] shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl mb-8">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 min-h-[300px] relative">
          <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-2xl">
            Ingin berkonsultasi mengenai proyek Anda?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg font-medium">
            Kirimkan detail kebutuhan sistem atau aplikasi yang ingin Anda bangun untuk mendapatkan masukan teknis.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href={contactHref('other')}
              className="group flex items-center gap-3 bg-white hover:bg-zinc-100 transition-all text-zinc-900 text-sm font-medium rounded-full px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Hubungi saya untuk diskusi proyek</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
