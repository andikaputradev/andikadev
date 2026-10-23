// Skrip verifikasi live server: memeriksa status HTTP 200, sitemap.xml, robots.txt, llms.txt, dan JSON-LD
import http from 'node:http'

const BASE_URL = 'http://localhost:3000'

const routes = [
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
  '/sitemap.xml',
  '/robots.txt',
  '/llms.txt',
  '/llms-full.txt',
]

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get(`${BASE_URL}${urlPath}`, (res) => {
      let data = ''
      res.on('data', (chunk) => (data += chunk))
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data,
        })
      })
    }).on('error', reject)
  })
}

async function verify() {
  console.log('Memulai verifikasi rute produksi...\n')
  let failureCount = 0

  for (const path of routes) {
    try {
      const res = await fetchUrl(path)
      if (res.statusCode === 200) {
        console.log(`[OK 200] ${path}`)
      } else {
        console.error(`[FAIL ${res.statusCode}] ${path}`)
        failureCount++
      }

      // Validasi sitemap.xml
      if (path === '/sitemap.xml') {
        if (!res.body.includes('<urlset') || !res.body.includes('https://andikadev.com')) {
          console.error('  [ERROR] sitemap.xml tidak memuat urlset atau URL kanonik yang benar!')
          failureCount++
        }
        if (res.body.includes('<priority>') || res.body.includes('<changefreq>')) {
          console.error('  [ERROR] sitemap.xml masih memuat priority atau changefreq!')
          failureCount++
        }
        if (res.body.includes('<lastmod>')) {
          console.log('  [VALID] sitemap.xml memuat lastmod nyata tanpa priority/changefreq.')
        }
      }

      // Validasi robots.txt
      if (path === '/robots.txt') {
        if (
          res.body.includes('Disallow: /api/') &&
          res.body.includes('Sitemap: https://andikadev.com/sitemap.xml')
        ) {
          console.log('  [VALID] robots.txt memuat aturan Disallow: /api/ dan sitemap produksi.')
        } else {
          console.error('  [ERROR] robots.txt tidak valid!')
          failureCount++
        }
      }

      // Validasi llms.txt
      if (path === '/llms.txt') {
        if (
          res.body.includes('Andika Putra Dev') &&
          res.body.includes('Wahyu Andika Putra') &&
          res.body.includes('/layanan/pembuatan-website')
        ) {
          console.log('  [VALID] llms.txt memuat identitas dan tautan layanan resmi.')
        } else {
          console.error('  [ERROR] llms.txt tidak memuat data yang sesuai!')
          failureCount++
        }
      }

      // Validasi JSON-LD pada halaman HTML
      if (res.headers['content-type']?.includes('text/html')) {
        const matches = [...res.body.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
        if (matches.length === 0) {
          console.error(`  [ERROR] Halaman ${path} tidak memiliki blok JSON-LD!`)
          failureCount++
        } else {
          for (const m of matches) {
            try {
              const parsed = JSON.parse(m[1])
              if (parsed['@context'] !== 'https://schema.org') {
                console.error(`  [ERROR] JSON-LD pada ${path} tidak memiliki @context schema.org!`)
                failureCount++
              }

              // Periksa FAQ jika ada
              if (parsed['@graph']) {
                for (const node of parsed['@graph']) {
                  if (node['@type'] === 'FAQPage' && node.mainEntity) {
                    for (const q of node.mainEntity) {
                      if (!res.body.includes(q.name)) {
                        console.error(`  [ERROR] Pertanyaan FAQ "${q.name}" pada ${path} tidak terlihat di HTML!`)
                        failureCount++
                      }
                    }
                  }
                }
              }
            } catch (err) {
              console.error(`  [ERROR] Gagal mem-parse JSON-LD pada ${path}:`, err.message)
              failureCount++
            }
          }
        }
      }
    } catch (err) {
      console.error(`[ERROR] Gagal mengakses ${path}:`, err.message)
      failureCount++
    }
  }

  console.log(`\nHasil verifikasi: ${failureCount === 0 ? 'SEMUA LOLOS (0 galat)' : `${failureCount} galat ditemukan`}`)
  process.exit(failureCount === 0 ? 0 : 1)
}

verify()
