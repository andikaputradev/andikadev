import { productionUrl } from '@/lib/seo/config'

// Crawler mesin pencari dan mesin penjawab AI yang diizinkan mengindeks situs
const CRAWLERS = [
  'Googlebot',
  'Bingbot',
  'Applebot',
  'DuckDuckBot',
  'YandexBot',
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
  'DuckAssistBot',
  'Amazonbot',
  'meta-externalagent',
  'MistralAI-User',
  'cohere-ai',
  'CCBot',
  '*',
]

const RULES = [
  'Allow: /',
  'Allow: /_next/static/',
  'Allow: /_next/image',
  'Disallow: /api/',
  'Disallow: /_next/data/',
  'Disallow: /*?_rsc=',
]

export function GET() {
  // Lingkungan non-produksi (preview deployment / staging di Vercel): blokir semua crawler
  const isNonProduction =
    Boolean(process.env.VERCEL_ENV && process.env.VERCEL_ENV !== 'production')

  if (isNonProduction) {
    const disallowAll = [
      '# Lingkungan pratinjau/non-produksi: blokir seluruh perayapan mesin pencari',
      'User-agent: *',
      'Disallow: /',
      '',
    ].join('\n')

    return new Response(disallowAll, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    })
  }

  // Lingkungan produksi
  const groups = CRAWLERS.map((agent) => [`User-agent: ${agent}`, ...RULES].join('\n'))

  const robotsTxt = [
    '# https://www.robotstxt.org/robotstxt.html',
    ...groups,
    `# Ringkasan situs untuk model bahasa besar (LLM): ${productionUrl}/llms.txt`,
    `Sitemap: ${productionUrl}/sitemap.xml`,
    '',
  ].join('\n\n')

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  })
}
