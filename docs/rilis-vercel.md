# Panduan Rilis Produksi Vercel

Dokumen ini berisi panduan teknis langkah demi langkah untuk merilis situs andikadev.com ke platform Vercel.

## 1. Impor Repositori ke Vercel

1. Buka dasbor Vercel (https://vercel.com) dan masuk dengan akun GitHub Anda.
2. Klik tombol "Add New..." lalu pilih "Project".
3. Pilih repositori GitHub `andikadev.com`.
4. Pada panel konfigurasi proyek:
   - Framework Preset: Next.js (terdeteksi secara otomatis).
   - Root Directory: `./` (akar repositori).
   - Build Command: `pnpm build` (otomatis dari `package.json`).
   - Output Directory: `.next` (otomatis).
   - Install Command: `pnpm install`.
   - Node.js Version: 20.x atau 22.x (atur pada menu Project Settings > General > Node.js Version).

## 2. Pengaturan Variabel Lingkungan

Atur variabel lingkungan di dasbor Vercel pada menu Project Settings > Environment Variables. Pisahkan cakupan lingkungan antara Production dan Preview.

### Variabel Wajib untuk Production
- `NEXT_PUBLIC_SITE_URL`: `https://andikadev.com`
- `EMAIL_TO`: Alamat email tujuan penerimaan pesan formulir kontak.
- `EMAIL_FROM`: Alamat pengirim email terverifikasi di Resend, misalnya `Wahyu Andika <kontak@andikadev.com>`.
- `RESEND_API_KEY`: Kunci API dari akun Resend untuk pengiriman email transaksi formulir.

### Variabel Opsional
- `INDEXNOW_KEY`: Kunci IndexNow untuk mempercepat indeks mesin pencari Bing dan Yandex.
- `GOOGLE_VERIFICATION_CODE`: Kode verifikasi Google Search Console (bila memakai metode meta tag html).
- `BING_VERIFICATION_CODE`: Kode verifikasi Bing Webmaster Tools (bila memakai metode meta tag html).

### Mekanisme Noindex pada Lingkungan Preview
Pada lingkungan Preview dan Development (ketika `VERCEL_ENV` bukan `production`), sistem secara otomatis menyematkan header dan meta tag `noindex, nofollow` serta membatasi file `robots.txt` agar mesin pencari tidak mengindeks URL pratinjau Vercel. Anda tidak perlu mematikan konfigurasi ini secara manual.

## 3. Konfigurasi Domain Kustom

1. Buka menu Settings > Domains di dasbor proyek Vercel.
2. Tambahkan domain apex `andikadev.com` dan subdomain `www.andikadev.com`.
3. Pilih opsi pengalihan rekomendasi Vercel: alihkan `www.andikadev.com` ke `andikadev.com` (atau sebaliknya sesuai preferensi kanonikal).
4. Masuk ke panel pengelola DNS tempat domain Anda terdaftar (misalnya Cloudflare, Niagahoster, atau Namecheap).
5. Tambahkan rekaman DNS berikut:
   - Tipe A: Nama `@` (atau `andikadev.com`), Isi `76.76.21.21`
   - Tipe CNAME: Nama `www`, Isi `cname.vercel-dns.com`
6. Tunggu proses propagasi DNS sampai status di dasbor Vercel berubah menjadi centang hijau dan sertifikat SSL terbit otomatis.

## 4. Konfigurasi Email Resend (SPF, DKIM, DMARC)

Agar email dari formulir kontak tidak masuk ke folder spam:
1. Masuk ke dasbor Resend (https://resend.com/domains).
2. Daftarkan domain `andikadev.com`.
3. Buka DNS manager domain Anda dan tambahkan rekaman yang diberikan oleh Resend:
   - Rekaman DKIM (tipe TXT atau CNAME sesuai instruksi Resend).
   - Rekaman SPF (tipe TXT): jika belum ada rekaman SPF, isi `v=spf1 include:amazonses.com ~all`.
   - Rekaman DMARC (tipe TXT): Nama `_dmarc.andikadev.com`, Isi `v=DMARC1; p=none; rua=mailto:dmarc-reports@andikadev.com`.
4. Klik tombol "Verify DNS Records" di dasbor Resend sampai status domain terverifikasi.

## 5. Langkah Verifikasi Pasca Rilis

Lakukan daftar periksa berikut segera setelah deployment produksi aktif:
1. Akses Domain Produksi: Buka `https://andikadev.com` dan periksa status sertifikat HTTPS.
2. Verifikasi Google Search Console:
   - Tambahkan properti Domain `andikadev.com` di Google Search Console.
   - Lakukan verifikasi kepemilikan melalui rekaman DNS TXT.
   - Kirimkan URL sitemap: `https://andikadev.com/sitemap.xml`.
3. Verifikasi Bing Webmaster Tools:
   - Impor properti dari Google Search Console atau verifikasi manual via DNS.
   - Pastikan `sitemap.xml` terbaca tanpa galat.
4. Uji Formulir Kontak Langsung:
   - Buka halaman `https://andikadev.com/kontak`.
   - Isi formulir dengan data pengujian nyata dan kirim.
   - Pastikan notifikasi email masuk ke kotak masuk `EMAIL_TO` dalam hitungan detik.
5. Verifikasi URL Preview:
   - Buka URL branch pratinjau Vercel (`*.vercel.app`).
   - Periksa kode sumber halaman: pastikan terdapat `<meta name="robots" content="noindex, nofollow">`.
   - Buka `https://<preview-domain>/robots.txt`: pastikan memuat aturan `Disallow: /`.

## 6. Prosedur Rollback Cepat

Jika ditemukan kendala kritis pada versi produksi baru:
1. Buka menu Deployments pada dasbor proyek di Vercel.
2. Cari rilis stabil terakhir yang berfungsi normal pada daftar riwayat deployment.
3. Klik ikon titik tiga di sebelah kanan rilis tersebut, lalu pilih "Instant Rollback".
4. Konfirmasi dialog. Lalu lintas produksi akan langsung dialihkan kembali ke rilis stabil sebelumnya dalam hitungan detik tanpa perlu melakukan build ulang.
