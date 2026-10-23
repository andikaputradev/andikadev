import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const targets = ['app', 'components', 'lib', 'content', 'docs']
let hasDash = false

function scanDir(dir) {
  if (!existsSync(dir)) return
  const items = readdirSync(dir)
  for (const item of items) {
    const full = join(dir, item)
    const stat = statSync(full)
    if (stat.isDirectory()) {
      scanDir(full)
    } else if (/\.(tsx|ts|js|mjs|md|json)$/.test(item)) {
      const content = readFileSync(full, 'utf8')
      const lines = content.split('\n')
      lines.forEach((line, idx) => {
        if (line.includes('\u2014') || line.includes('\u2013')) {
          console.error(`[DASH DETECTED] ${full}:${idx + 1}: ${line.trim()}`)
          hasDash = true
        }
      })
    }
  }
}

for (const dir of targets) {
  scanDir(dir)
}

if (hasDash) {
  console.error('\nAda simbol em dash atau en dash ditemukan!')
  process.exit(1)
} else {
  console.log('Bersih: tidak ada em dash atau en dash di app, components, lib, content, docs.')
}
