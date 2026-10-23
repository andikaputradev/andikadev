# AGENTS.md

## Panduan dan Aturan Proyek andikadev.com

Repositori ini sedang dalam proses transformasi menjadi situs personal dan portofolio https://andikadev.com untuk Wahyu Andika Putra.

Seluruh agen AI dan pengembang wajib membaca dan mematuhi aturan utama di `.cursor/rules/andikadev-project.mdc` serta data profil di `docs/fakta-resmi.md`.

### Ringkasan Aturan Utama
1. **Desain tidak berubah**: Dilarang mengubah `app/globals.css`, token warna, tipografi, spasi, layout komponen, atau animasi. Hanya teks, data, props, rute, metadata, dan aset yang boleh disesuaikan.
2. **Kebenaran fakta**: Sumber fakta tunggal adalah `docs/fakta-resmi.md`. Dilarang mengarang testimoni, klien, statistik, tahun pengalaman, sertifikasi, penghargaan, atau harga. Bila data tidak ada, hapus bagian terkait dan catat di `docs/data-gap.md`.
3. **Bahasa dan gaya (Voice)**: Bahasa Indonesia, sudut pandang orang pertama tunggal ("saya"), lugas, jujur mengenai batas layanan teknis, tanpa gaya agensi.
4. **Larangan em dash dan en dash**: Dilarang memakai simbol em dash dan en dash di teks, kode, komentar, metadata, JSON-LD, maupun dokumentasi. Untuk rentang gunakan kata "sampai". Gunakan koma, titik dua, titik, atau tanda kurung untuk jeda kalimat.
5. **Salinan situs (Site copy)**: Aturan `.cursor/rules/site-copy.mdc` berlaku dalam bahasa Indonesia. Hindari kontras buatan "bukan X melainkan Y", hindari klaim kosong (seperti "solusi terbaik", "terdepan", "inovatif", "canggih", "mumpuni", "profesional dan terpercaya"). Gunakan huruf kapital hanya di awal kalimat judul (sentence case). CTA harus menyebutkan langkah berikutnya dan hasilnya.
6. **Keamanan siber dan Web3**: Hanya dalam kerangka defensif, etis, legal, dan atas izin tertulis pemilik sistem. Dilarang menawarkan eksploitasi, bypass, atau klaim "anti bobol". Tidak ada nasihat investasi atau janji keuntungan.
7. **Panduan Next.js 16**: Wajib membaca panduan di `node_modules/next/dist/docs/` sebelum menulis kode. Jangan berasumsi dari ingatan versi lama.
8. **Kebersihan kode**: Tanpa komentar kode kecuali krusial. Tanpa teks sementara (placeholder) atau penanda tugas tertunda (TODO).
9. **Verifikasi wajib**: Setiap tahap diakhiri dengan menjalankan `pnpm lint`, `pnpm build`, dan `pnpm copy:check`. Laporkan hasilnya secara jujur dan transparan.
10. **Manajemen commit**: Satu tahap satu commit dengan standar Conventional Commits.

---

## Cursor Cloud specific instructions

### Overview
Single Next.js 16 (App Router) portfolio and blog site. No monorepo, no database, no Docker required. Blog content comes from local Markdown files in `content/blog/`.

### Environment variable
Configuration is handled in `lib/env.ts`. Copy `.env.example` to `.env.local` for local development:
- `NEXT_PUBLIC_SITE_URL`: canonical website URL (defaults to `https://andikadev.com`).
- Optional: `RESEND_API_KEY`, `EMAIL_TO`, `EMAIL_FROM` (contact form email), `INDEXNOW_KEY`, `GOOGLE_VERIFICATION_CODE`, `BING_VERIFICATION_CODE`.

### Commands
Standard scripts are in `package.json`. Quick reference:
| Task | Command |
|------|---------|
| Dev server | `pnpm dev` (port 3000, Turbopack) |
| Lint | `pnpm lint` |
| Build | `pnpm build` |
| Copy check | `pnpm copy:check` |
| Production | `pnpm start` |

### Gotchas
- The project uses **pnpm 9.15.3** (declared via `packageManager` field). Using npm/yarn will produce a different lockfile.
- Node.js v20+ is required. The environment ships with v22 via nvm which works fine.
- ESLint produces ~5 warnings (unused vars) but zero errors. This is expected.
- The `optimizeCss` experimental flag requires the `critters` package (already in dependencies).
- `.env.local` is gitignored; each developer/agent must create it.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes: APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev`. Verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only recreates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
