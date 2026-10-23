export const productionUrl = 'https://andikadev.com' as const

export const siteConfig = {
  name: 'Andika Putra Dev',
  shortName: 'Andika Putra Dev',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? productionUrl,
  description:
    'Wahyu Andika Putra menyediakan layanan pembuatan website, pembuatan aplikasi, jasa upload aplikasi ke Play Store, keamanan siber defensif, serta Web3 dan blockchain.',
  author: 'Wahyu Andika Putra',
  titleSuffix: ' | Andika Putra Dev',
  locale: 'id_ID',
  logo: '/logo.png',
  ogImage: '/og.png',
  authorImage: '/foto-profil.webp',
  email: 'wahyuandikaputra.co.id@gmail.com',
  sameAs: [
    'https://github.com/andikaputradev',
    'https://linkedin.com/in/wahyu-andika-putra',
    'https://x.com/andikaputradev',
  ],
  twitterHandle: '@andikaputradev',
} as const

// Fakta resmi tentang profil yang tampil pada schema dan metadata.
export const authorProfile = {
  name: 'Wahyu Andika Putra',
  jobTitle: 'Pengembang web dan aplikasi',
  city: 'Wonosobo / Semarang',
  region: 'Jawa Tengah',
  country: 'Indonesia',
  countryCode: 'ID',
  languages: ['Indonesia'],
  roles: [] as string[],
  programs: [] as Array<{ name: string; host?: string; hostUrl?: string; page: string }>,
  pastOrganizations: [] as Array<{ name: string; url?: string }>,
  knowsAbout: [
    'Pembuatan website',
    'Pembuatan aplikasi',
    'Jasa upload aplikasi ke Play Store',
    'Keamanan siber defensif',
    'Web3 dan blockchain',
  ],
} as const

export function absoluteUrl(path: string): string {
  const base = siteConfig.url.replace(/\/+$/, '')
  if (!path || path === '/') return base
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function productionAbsoluteUrl(path: string): string {
  if (!path || path === '/') return productionUrl
  return `${productionUrl}${path.startsWith('/') ? path : `/${path}`}`
}
