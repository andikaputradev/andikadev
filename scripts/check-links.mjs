import { readFileSync, readdirSync, statSync } from 'node:fs'
import { join, resolve } from 'node:path'

const validRoutes = new Set([
  '/',
  '/tentang',
  '/layanan',
  '/layanan/pembuatan-website',
  '/layanan/pembuatan-aplikasi',
  '/layanan/upload-play-store',
  '/layanan/keamanan-siber',
  '/layanan/web3-blockchain',
  '/kontak',
  '/kebijakan-privasi',
  '/blog',
  '/feed.xml',
  '/llms.txt',
  '/llms-full.txt',
  '/sitemap.xml',
  '/robots.txt',
])

const staleRoutes = [
  '/about',
  '/contact',
  '/projects',
  '/privacy-policy',
  '/terms-of-service',
  '/services',
]

const rootDir = resolve('.')
const searchDirs = ['app', 'components', 'lib']

function getAllFiles(dir, exts = ['.ts', '.tsx', '.js', '.mjs', '.md', '.json']) {
  let results = []
  const list = readdirSync(dir)
  for (const file of list) {
    const fullPath = join(dir, file)
    const stat = statSync(fullPath)
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, exts))
    } else {
      if (exts.some((ext) => file.endsWith(ext))) {
        results.push(fullPath)
      }
    }
  }
  return results
}

const files = searchDirs.flatMap((dir) => getAllFiles(join(rootDir, dir)))

let errorCount = 0

// Regex to capture internal hrefs or paths starting with /
// Matches href="/..." or path: '/...' or path = '/...'
const hrefRegex = /(?:href|path)\s*[:=]\s*["'](\/[a-zA-Z0-9_\-\/#?]*)["']/g

for (const filePath of files) {
  const content = readFileSync(filePath, 'utf-8')
  const lines = content.split('\n')

  lines.forEach((line, idx) => {
    let match
    // Check stale routes specifically
    for (const stale of staleRoutes) {
      if (line.includes(`"${stale}"`) || line.includes(`'${stale}'`) || line.includes(`\`${stale}\``)) {
        console.error(`[STALE ROUTE] ${filePath}:${idx + 1} uses stale route: "${stale}"`)
        errorCount++
      }
    }

    // Match all hrefs/paths
    hrefRegex.lastIndex = 0
    while ((match = hrefRegex.exec(line)) !== null) {
      const fullTarget = match[1]
      // Strip anchor and query
      const baseTarget = fullTarget.split('?')[0].split('#')[0]

      if (!baseTarget) {
        // e.g. #contact-form or ?service=...
        continue
      }

      // Allow static assets
      if (
        baseTarget.endsWith('.png') ||
        baseTarget.endsWith('.webp') ||
        baseTarget.endsWith('.jpg') ||
        baseTarget.endsWith('.jpeg') ||
        baseTarget.endsWith('.svg') ||
        baseTarget.endsWith('.ico')
      ) {
        continue
      }

      // Check dynamic blog routes
      if (baseTarget.startsWith('/blog/')) {
        continue
      }

      if (!validRoutes.has(baseTarget)) {
        console.error(`[INVALID LINK] ${filePath}:${idx + 1} targets unknown route: "${fullTarget}"`)
        errorCount++
      }
    }
  })
}

if (errorCount > 0) {
  console.error(`\nPemeriksaan tautan gagal: ditemukan ${errorCount} masalah tautan internal.`)
  process.exit(1)
} else {
  console.log(`Pemeriksaan tautan berhasil: seluruh tautan internal valid dan tidak ditemukan rute lama.`)
}
