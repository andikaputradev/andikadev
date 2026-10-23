# andikadev.com

Repositori resmi untuk situs web personal dan portofolio https://andikadev.com bagi **Wahyu Andika Putra** (merek: **Andika Putra Dev**).

Situs ini dibangun menggunakan Next.js 16 (App Router), React 19, Tailwind CSS v4, dan TypeScript.

---

## Deskripsi Proyek

Situs andikadev.com berfungsi sebagai platform representasi profil profesional, portofolio hasil karya, publikasi artikel teknis, serta sarana kontak langsung untuk layanan:
- Pembuatan website modern
- Pembuatan aplikasi Android dan web
- Jasa upload aplikasi ke Google Play Store
- Pengujian keamanan siber defensif (berizin tertulis)
- Pengembangan Web3 dan blockchain

---

## Struktur Direktori

```text
.
├── .cursor/               # Aturan Cursor IDE dan panduan rekayasa
├── app/                   # Rute halaman Next.js App Router
│   ├── actions/           # Server actions (formulir kontak, pengiriman email)
│   ├── blog/              # Indeks artikel blog lokal dan halaman detail
│   ├── kebijakan-privasi/ # Kebijakan privasi dan kepatuhan UU PDP
│   ├── kontak/            # Formulir konsultasi dan kontak langsung
│   ├── layanan/           # Rute utama dan sub-layanan spesifik
│   ├── tentang/           # Profil pengembang dan latar belakang
│   ├── layout.tsx         # Root layout aplikasi (bahasa Indonesia)
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
│   ├── contact-services.ts# Skema validasi formulir dan utilitas WhatsApp
│   ├── env.ts             # Validasi variabel lingkungan dengan zod
│   └── seo/               # Helper metadata, Open Graph, dan schema graph
├── public/                # Aset statis publik
│   ├── brand/             # Berkas aset sumber logo dan foto profil
│   └── foto-profil.webp   # Aset gambar profil hasil optimasi
├── scripts/               # Skrip pengecekan dan utilitas build
└── tests/                 # Uji unit otomatis (Vitest)
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
| `EMAIL_FROM` | Alamat pengirim email dari domain terverifikasi di Resend | Opsional |
| `INDEXNOW_KEY` | Kunci verifikasi IndexNow untuk mesin pencari | Opsional |
| `GOOGLE_VERIFICATION_CODE` | Kode verifikasi Google Search Console | Opsional |
| `BING_VERIFICATION_CODE` | Kode verifikasi Bing Webmaster Tools | Opsional |

---

## Panduan Verifikasi Domain andikadev.com di Resend

Untuk menggunakan fitur formulir kontak di domain produksi, Anda wajib memverifikasi domain `andikadev.com` di dasbor Resend agar email tidak dianggap spam atau ditolak oleh server penerima:

1. **Buka Dasbor Resend**:
   Masuk ke https://resend.com/domains lalu klik tombol **Add Domain**.
2. **Masukkan Nama Domain**:
   Ketik `andikadev.com` dan pilih region terdekat (misalnya Singapura atau US East).
3. **Konfigurasi Catatan DNS**:
   Buka panel manajemen DNS domain Anda (di Cloudflare atau registrar domain), lalu tambahkan tiga catatan DNS yang disediakan oleh Resend:
   - **DKIM (DomainKeys Identified Mail)**: Tambahkan record tipe `CNAME` atau `TXT` dengan nama host dan nilai unik yang tertera di dasbor Resend (misalnya `resend._domainkey.andikadev.com`).
   - **SPF (Sender Policy Framework)**: Tambahkan record tipe `TXT` pada root domain `@` atau subdomain pengirim dengan nilai yang diberikan Resend (contoh: `v=spf1 include:amazonses.com ~all`). Jika sudah ada record SPF sebelumnya, gabungkan nilainya ke dalam satu baris SPF tunggal.
   - **DMARC (Domain-based Message Authentication)**: Tambahkan record tipe `TXT` dengan nama host `_dmarc.andikadev.com` dan isi nilai:
     ```text
     v=DMARC1; p=none; rua=mailto:wahyuandikaputra.co.id@gmail.com
     ```
     Setelah sistem berjalan stabil, Anda dapat menaikkan kebijakan DMARC ke `p=quarantine` atau `p=reject`.
4. **Verifikasi Status**:
   Kembali ke dasbor Resend dan klik **Verify Domain**. Tunggu propagasi DNS sampai status berubah menjadi **Verified**.
5. **Setel Variabel Lingkungan**:
   Pada pengaturan dasbor Vercel (atau `.env.local`), masukkan alamat pengirim resmi:
   ```text
   EMAIL_FROM=Andika Putra Dev <kontak@andikadev.com>
   ```
   Hindari memakai alamat bawaan seperti `onboarding@resend.dev` karena alamat tersebut hanya ditujukan untuk tujuan uji coba terbatas ke alamat email pemilik akun Resend.

---

## Pembatasan Laju (Rate Limiting)

Formulir kontak membutuhkan perlindungan agar tidak dibanjiri spam atau serangan denial of service. Pada arsitektur serverless (seperti Next.js di Vercel), implementasi pembatas laju berbasis memori lokal (in-memory LRU cache) tidak dapat diandalkan karena isolate serverless dapat dihidupkan ulang sewaktu waktu (cold start) dan setiap permintaan dapat diarahkan ke instance yang berbeda.

### Pilihan Arsitektur dan Trade-off

1. **Vercel Firewall Rate Limiting (Pilihan yang Diimplementasikan)**:
   - **Mekanisme**: Pembatasan dilakukan pada layer edge infrastructure Vercel sebelum permintaan mencapai server action Next.js.
   - **Konfigurasi**: Dilakukan langsung melalui dasbor Vercel pada menu **Security > Firewall > Rate Limiting** dengan aturan batas (misalnya maksimal 5 permintaan per menit per alamat IP untuk rute `/kontak`).
   - **Kelebihan**: Sangat andal, memblokir serangan di tepi jaringan tanpa mengonsumsi kuota eksekusi serverless, tanpa menambah dependensi kode, dan tanpa membuat akun layanan eksternal baru.
   - **Aplikasi**: Pada level aplikasi, form dilengkapi validasi Zod ketat serta mekanisme input tersembunyi honeypot (`website_trap`) yang langsung membuang kiriman bot otomatis.

2. **Upstash Redis (Alternatif Penyimpanan Eksternal)**:
   - **Mekanisme**: Menyimpan token request ke Redis terdistribusi menggunakan paket `@upstash/ratelimit` dan `@upstash/redis`.
   - **Kelebihan**: Memberikan kontrol granular di tingkat kode aplikasi dan dapat diterapkan pada hosting mandiri (self-hosted).
   - **Kekurangan**: Membutuhkan akun layanan pihak ketiga baru, koneksi jaringan tambahan per request, dan pengelolaan kredensial API ekstra.
   - **Status**: Direkomendasikan sebagai peningkatan di masa mendatang jika diperlukan kendali spesifik di luar platform Vercel.

---

## Status Pengujian Email

Pengiriman email sungguhan melalui jaringan Resend API belum diuji secara end-to-end pada repositori lokal ini sampai kunci API `RESEND_API_KEY` aktif dan domain `andikadev.com` terverifikasi di Resend.

Seluruh alur aplikasi pendukung pengiriman pesan telah diuji dan diverifikasi secara otomatis melalui rangkaian tes unit Vitest, meliputi:
- Skema validasi data Zod (panjang nama 2 sampai 100 karakter, format email valid, panjang pesan 10 sampai 5000 karakter, validasi daftar layanan tetap).
- Pembersihan karakter CR (`\r`) dan LF (`\n`) dari subjek email untuk mencegah celah eksploitasi header injection.
- Deteksi honeypot `website_trap` untuk memblokir spam bot secara hening (silent drop).
- Pembentukan tautan WhatsApp resmi dengan encoding URI yang aman.
- Pengelolaan status antarmuka pengguna (loading, role status, role alert, dan perpindahan fokus ramah aksesibilitas).

---

## Skrip yang Tersedia

Proyek ini menggunakan **pnpm 9.15.3** sebagai manajer paket.

| Perintah | Deskripsi |
|---|---|
| `pnpm dev` | Menjalankan server pengembangan lokal (port 3000 dengan Turbopack) |
| `pnpm build` | Membangun aplikasi untuk produksi (Next.js build dan inline critical CSS) |
| `pnpm test` | Menjalankan seluruh pengujian unit otomatis menggunakan Vitest |
| `pnpm start` | Menjalankan server produksi hasil kompilasi |
| `pnpm lint` | Menjalankan pemeriksaan kode menggunakan ESLint |
| `pnpm copy:check` | Memeriksa kepatuhan salinan teks terhadap aturan anti-slop bahasa Indonesia |
| `pnpm dashes:check` | Memeriksa tidak adanya karakter terlarang em dash dan en dash |
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
   - `RESEND_API_KEY`: Kunci API Resend pengiriman email
   - `EMAIL_TO`: `wahyuandikaputra.co.id@gmail.com`
   - `EMAIL_FROM`: `Andika Putra Dev <kontak@andikadev.com>`
4. Jalankan deployment. Vercel akan mengeksekusi `pnpm build` dan mempublikasikan situs ke Edge Network.
5. Aktifkan fitur **Vercel Firewall Rate Limiting** di dasbor Vercel untuk melindungi rute formulir kontak.

---

## Aturan Pengembangan

Setiap pengembang maupun agen kecerdasan buatan wajib mematuhi aturan pada berkas:
- `.cursor/rules/andikadev-project.mdc` (aturan utama proyek, selalu aktif)
- `.cursor/rules/engineering.mdc` (standar penulisan TypeScript dan Next.js)
- `docs/fakta-resmi.md` (sumber tunggal fakta profil dan layanan)
