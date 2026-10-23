# andikadev.com

Repositori resmi untuk situs web personal dan portofolio https://andikadev.com bagi **Wahyu Andika Putra** (merek: **Andika Putra Dev**).

Situs ini dibangun menggunakan Next.js 16 (App Router), React 19, Tailwind CSS v4, dan TypeScript.

---

## Deskripsi Proyek

Situs andikadev.com berfungsi sebagai platform representasi profil profesional, portofolio hasil karya, publikasi artikel teknis, serta sarana kontak langsung untuk layanan:
- Pembuatan website modern
- Pembuatan aplikasi mobile
- Jasa upload aplikasi ke Google Play Store
- Pengujian keamanan siber defensif (berizin tertulis)
- Pengembangan Web3 dan blockchain

---

## Struktur Direktori

```text
.
├── .cursor/               # Aturan Cursor IDE dan panduan rekayasa
├── app/                   # Rute halaman Next.js App Router
│   ├── about/             # Halaman profil dan tentang pengembang
│   ├── blog/              # Indeks artikel blog dan halaman detail
│   ├── contact/           # Formulir kontak dan informasi komunikasi
│   ├── projects/          # Halaman portofolio dan proyek
│   ├── layout.tsx         # Root layout aplikasi
│   ├── page.tsx           # Halaman utama (beranda)
│   └── sitemap.ts         # Pembangkit sitemap dinamis
├── components/            # Komponen antarmuka pengguna (UI)
│   ├── seo/               # Komponen metadata dan JSON-LD structured data
│   └── ui/                # Komponen dasar (tombol, kartu, animasi)
├── content/               # Konten lokal situs
│   └── blog/              # Berkas artikel blog (Markdown dengan frontmatter Zod)
├── docs/                  # Dokumentasi proyek dan kebenaran data resmi
│   ├── data-gap.md        # Catatan kesenjangan data yang perlu konfirmasi
│   ├── design-system.md   # Panduan token desain
│   └── fakta-resmi.md     # Sumber tunggal fakta profil dan kontak
├── lib/                   # Fungsi utilitas, SEO, konfigurasi, dan API
│   ├── blog.ts            # Pembaca konten blog lokal dan validasi zod
│   ├── env.ts             # Validasi variabel lingkungan dengan zod
│   └── seo/               # Helper metadata, Open Graph, dan schema graph
├── public/                # Aset statis publik
│   ├── brand/             # Berkas aset sumber logo dan foto profil
│   └── foto-profil.webp   # Aset gambar profil hasil optimasi
└── scripts/               # Skrip pengecekan dan utilitas build
```

---

## Variabel Lingkungan (Environment Variables)

Salin berkas `.env.example` menjadi `.env.local`:

```bash
cp .env.example .env.local
```

Isi variabel lingkungan berikut di dalam `.env.local`:

| Variabel | Keterangan | Wajib / Opsional |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL domain produksi (default: https://andikadev.com) | Opsional |
| `RESEND_API_KEY` | Kunci API Resend untuk pengiriman email formulir kontak | Opsional di lokal |
| `EMAIL_TO` | Alamat email tujuan penerimaan pesan formulir kontak | Opsional |
| `EMAIL_FROM` | Alamat pengirim email terverifikasi di Resend | Opsional |
| `INDEXNOW_KEY` | Kunci verifikasi IndexNow untuk mesin pencari | Opsional |
| `GOOGLE_VERIFICATION_CODE` | Kode verifikasi Google Search Console | Opsional |
| `BING_VERIFICATION_CODE` | Kode verifikasi Bing Webmaster Tools | Opsional |

---

## Skrip yang Tersedia

Proyek ini menggunakan **pnpm 9.15.3** sebagai manajer paket.

| Perintah | Deskripsi |
|---|---|
| `pnpm dev` | Menjalankan server pengembangan lokal (port 3000 dengan Turbopack) |
| `pnpm build` | Membangun aplikasi untuk produksi (Next.js build dan inline critical CSS) |
| `pnpm start` | Menjalankan server produksi hasil kompilasi |
| `pnpm lint` | Menjalankan pemeriksaan kode menggunakan ESLint |
| `pnpm copy:check` | Memeriksa kepatuhan salinan teks terhadap aturan anti-slop bahasa Indonesia |
| `pnpm seo:check` | Memvalidasi konfigurasi SEO dan metadata |

---

## Panduan Deploy ke Vercel

1. Hubungkan repositori GitHub `andikaputradev/andikadev` ke dashboard Vercel.
2. Pada konfigurasi proyek Vercel:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Node.js Version: **20.x** atau **22.x**
   - Package Manager: **pnpm** (Vercel otomatis mendeteksi dari `packageManager` di `package.json`)
3. Masukkan Environment Variables di Vercel:
   - `NEXT_PUBLIC_SITE_URL`: `https://andikadev.com`
   - `RESEND_API_KEY`: Kunci API pengiriman email (jika formulir kontak diaktifkan)
   - `EMAIL_TO`: Email penerima pesan formulir kontak
4. Jalankan deployment. Vercel akan mengeksekusi `pnpm build` dan mempublikasikan situs ke Edge Network.

---

## Aturan Pengembangan

Setiap pengembang maupun agen kecerdasan buatan wajib mematuhi aturan pada berkas:
- `.cursor/rules/andikadev-project.mdc` (aturan utama proyek, selalu aktif)
- `.cursor/rules/engineering.mdc` (standar penulisan TypeScript dan Next.js)
- `docs/fakta-resmi.md` (sumber tunggal fakta profil dan layanan)
