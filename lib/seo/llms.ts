import { authorProfile, productionUrl, siteConfig } from './config'
import { decodeHtmlEntities, stripHtml } from './utils'

interface LlmsLink {
  title: string
  path: string
  summary: string
}

const services: LlmsLink[] = [
  { title: 'Pembuatan Website', path: '/layanan/pembuatan-website', summary: 'Layanan pembuatan website modern berkinerja tinggi.' },
  { title: 'Pembuatan Aplikasi', path: '/layanan/pembuatan-aplikasi', summary: 'Layanan pembuatan aplikasi mobile dan multi platform.' },
  { title: 'Jasa Upload Play Store', path: '/layanan/upload-play-store', summary: 'Pendampingan teknis dan rilis resmi aplikasi ke Google Play Store.' },
  { title: 'Keamanan Siber Defensif', path: '/layanan/keamanan-siber', summary: 'Pengujian dan penguatan keamanan siber secara legal atas izin tertulis.' },
  { title: 'Web3 dan Blockchain', path: '/layanan/web3-blockchain', summary: 'Pengembangan teknologi Web3 dan integrasi kontrak pintar terdesentralisasi.' },
]

const guides: LlmsLink[] = []

const profilePages: LlmsLink[] = [
  { title: 'Tentang', path: '/tentang', summary: 'Informasi profil Wahyu Andika Putra dan keahlian teknis.' },
  { title: 'Layanan', path: '/layanan', summary: 'Daftar layanan pembuatan website, aplikasi, upload Play Store, keamanan siber, dan Web3.' },
  { title: 'Kontak', path: '/kontak', summary: 'Kontak Wahyu Andika Putra melalui formulir, email, atau WhatsApp.' },
  { title: 'Kebijakan Privasi', path: '/kebijakan-privasi', summary: 'Kebijakan privasi andikadev.com.' },
]

export interface LlmsPost {
  slug: string
  title: string
  excerpt?: string
}

const link = (item: { title: string; path: string; summary?: string }) =>
  `- [${item.title}](${productionUrl}${item.path})${item.summary ? `: ${item.summary}` : ''}`

function postSummary(excerpt?: string): string | undefined {
  if (!excerpt) return undefined
  const text = decodeHtmlEntities(stripHtml(excerpt)).replace(/\s*\[…\]|\s*\[\.\.\.\]/g, '').trim()
  if (!text) return undefined
  return text.length > 180 ? `${text.slice(0, 177).replace(/\s+\S*$/, '')}...` : text
}

export function buildLlmsTxt(posts: LlmsPost[] = []): string {
  const facts = [
    `Nama: ${authorProfile.name}. Merek dan situs: ${siteConfig.name} (${productionUrl}).`,
    `Fokus: Pembuatan website, pembuatan aplikasi, jasa upload aplikasi ke Play Store, keamanan siber (defensif), Web3 dan blockchain.`,
    `Lokasi: ${authorProfile.city}, ${authorProfile.region}, ${authorProfile.country}.`,
    `Kontak: ${productionUrl}/kontak atau ${siteConfig.email}.`,
  ]

  const sections = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `Situs ini dibangun menggunakan Next.js dan dideploy di Vercel.`,
    `## Fakta Utama\n\n${facts.map((fact) => `- ${fact}`).join('\n')}`,
  ]

  if (services.length) {
    sections.push(`## Layanan\n\n${services.map(link).join('\n')}`)
  }

  if (guides.length) {
    sections.push(`## Panduan\n\n${guides.map(link).join('\n')}`)
  }

  sections.push(`## Profil dan Halaman\n\n${profilePages.map(link).join('\n')}`)

  if (posts.length) {
    sections.push(
      `## Artikel\n\n${posts
        .map((post) =>
          link({
            title: decodeHtmlEntities(stripHtml(post.title)),
            path: `/blog/${post.slug}`,
            summary: postSummary(post.excerpt),
          }),
        )
        .join('\n')}`,
    )
  }

  sections.push(
    `## Lainnya\n\n- [Sitemap](${productionUrl}/sitemap.xml)\n- [Blog](${productionUrl}/blog)\n- [RSS feed](${productionUrl}/feed.xml)\n- [Teks Lengkap Artikel](${productionUrl}/llms-full.txt)`,
  )

  return `${sections.join('\n\n')}\n`
}

function htmlToText(html: string): string {
  const text = html
    .replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (_m, code: string) => `\n\`\`\`\n${stripTags(code)}\n\`\`\`\n`)
    .replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_m, level: string, inner: string) => `\n${'#'.repeat(Math.min(6, Math.max(3, Number(level) + 1)))} ${stripHtml(inner)}\n`)
    .replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_m, inner: string) => `\n- ${stripHtml(inner)}`)
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|ul|ol|table|tr|blockquote)>/gi, '\n\n')
    .replace(/<\/t[dh]>/gi, ' | ')
  return decodeHtmlEntities(stripTags(text))
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

function stripTags(html: string): string {
  return html.replace(/<[^>]*>/g, '')
}

export interface LlmsFullPost extends LlmsPost {
  content: string
  date: string
  modified: string
}

export function buildLlmsFullTxt(posts: LlmsFullPost[]): string {
  const header = [
    `# ${siteConfig.name}: teks artikel lengkap`,
    `> Seluruh artikel blog oleh ${authorProfile.name}. Ringkasan singkat tersedia di ${productionUrl}/llms.txt.`,
  ].join('\n\n')
  const articles = posts.map((post) =>
    [
      `## ${decodeHtmlEntities(stripHtml(post.title))}`,
      `URL: ${productionUrl}/blog/${post.slug}`,
      `Published: ${post.date.slice(0, 10)}. Updated: ${post.modified.slice(0, 10)}.`,
      htmlToText(post.content),
    ].join('\n\n'),
  )
  return `${[header, ...articles].join('\n\n---\n\n')}\n`
}
