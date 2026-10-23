import { authorProfile, productionUrl, siteConfig } from './config'
import { decodeHtmlEntities, stripHtml } from './utils'

interface LlmsLink {
  title: string
  path: string
  summary: string
}

const services: LlmsLink[] = [
  {
    title: 'Pembuatan Website',
    path: '/layanan/pembuatan-website',
    summary: 'Layanan pembuatan website company profile, landing page, dan aplikasi web yang cepat di ponsel serta siap SEO dasar.',
  },
  {
    title: 'Pembuatan Aplikasi',
    path: '/layanan/pembuatan-aplikasi',
    summary: 'Layanan pengembangan aplikasi Android dan aplikasi web kustom dari kebutuhan awal hingga rilis.',
  },
  {
    title: 'Jasa Upload Play Store',
    path: '/layanan/upload-play-store',
    summary: 'Pendampingan rilis aplikasi Android ke Google Play Store tanpa kendala closed testing 14 hari sesuai panduan Google.',
  },
  {
    title: 'Keamanan Siber Defensif',
    path: '/layanan/keamanan-siber',
    summary: 'Evaluasi keamanan web dan API defensif berbasis OWASP atas izin tertulis sah dari pemilik sistem.',
  },
  {
    title: 'Web3 dan Blockchain',
    path: '/layanan/web3-blockchain',
    summary: 'Pengembangan kontrak pintar Solidity, pengujian kode, dan integrasi dApp yang aman.',
  },
]

const profilePages: LlmsLink[] = [
  {
    title: 'Tentang Wahyu Andika Putra',
    path: '/tentang',
    summary: 'Profil Wahyu Andika Putra, pengembang di balik Andika Putra Dev yang berbasis di Wonosobo dan Semarang.',
  },
  {
    title: 'Daftar Layanan',
    path: '/layanan',
    summary: 'Daftar lengkap lima fokus layanan teknis pengembangan perangkat lunak.',
  },
  {
    title: 'Kontak Langsung',
    path: '/kontak',
    summary: 'Formulir konsultasi proyek, email resmi, dan tautan komunikasi WhatsApp.',
  },
  {
    title: 'Kebijakan Privasi',
    path: '/kebijakan-privasi',
    summary: 'Ketentuan perlindungan data pribadi pengunjung dan kepatuhan UU PDP Nomor 27 Tahun 2022.',
  },
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
    `Fokus layanan: Pembuatan website, pembuatan aplikasi, jasa upload aplikasi ke Play Store, keamanan siber defensif, serta Web3 dan blockchain.`,
    `Lokasi domisili: ${authorProfile.city}, ${authorProfile.region}, ${authorProfile.country}.`,
    `Kontak resmi: ${productionUrl}/kontak, email ${siteConfig.email}, atau WhatsApp ${siteConfig.telephone}.`,
  ]

  const sections = [
    `# ${siteConfig.name}`,
    `> ${siteConfig.description}`,
    `Situs ini dibangun menggunakan Next.js 16 (App Router) dan disajikan melalui Vercel Edge Network.`,
    `## Fakta Utama\n\n${facts.map((fact) => `- ${fact}`).join('\n')}`,
    `## Layanan Teknis\n\n${services.map(link).join('\n')}`,
    `## Profil dan Informasi\n\n${profilePages.map(link).join('\n')}`,
  ]

  if (posts.length) {
    sections.push(
      `## Artikel Blog Teknis\n\n${posts
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
    `## Sumber Daya Terkait\n\n- [Sitemap XML](${productionUrl}/sitemap.xml)\n- [Indeks Blog](${productionUrl}/blog)\n- [Umpan RSS](${productionUrl}/feed.xml)\n- [Teks Lengkap Artikel](${productionUrl}/llms-full.txt)`,
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
    `> Seluruh artikel blog teknis oleh ${authorProfile.name}. Ringkasan singkat tersedia di ${productionUrl}/llms.txt.`,
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
