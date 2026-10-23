import type { Metadata } from 'next'
import { ArrowUpRight, CheckCircle2, Shield, FileCheck, AlertCircle } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { Faq } from '@/components/page/faq'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/upload-play-store'
const pageTitle = 'Jasa Upload Aplikasi ke Play Store Tanpa Closed Testing 14 Hari'
const pageDescription =
  'Layanan pendampingan publikasi rilis aplikasi Android ke Google Play Store tanpa kendala closed testing 14 hari. Proses tertata dan sesuai panduan Google.'

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Apa maksud rilis tanpa closed testing 14 hari?',
    answer:
      'Google mewajibkan akun developer baru menguji aplikasi dengan minimal 20 tester selama 14 hari berturut-turut. Layanan ini membantu menyusun jalur publikasi terstruktur agar aplikasi dapat diajukan ke jalur produksi tanpa harus mengumpulkan tester mandiri.',
  },
  {
    question: 'Dokumen dan berkas apa yang harus disiapkan klien?',
    answer:
      'Anda perlu menyiapkan berkas bundel aplikasi (.aab) yang sudah ditandatangani, ikon aplikasi, tangkapan layar antarmuka, deskripsi aplikasi, serta alamat situs kebijakan privasi yang aktif.',
  },
  {
    question: 'Berapa lama proses evaluasi Google Play Store?',
    answer:
      'Waktu evaluasi sepenuhnya ditentukan oleh antrean sistem peninjauan Google Play, biasanya memakan waktu beberapa hari kerja.',
  },
  {
    question: 'Bagaimana jika Google meminta perbaikan data keamanan?',
    answer:
      'Saya membantu menyesuaikan pengisian formulir Data Safety dan deklarasi izin aplikasi sesuai catatan masukan resmi dari tim pemeriksa Google.',
  },
  {
    question: 'Apakah aplikasi dijamin pasti disetujui Google?',
    answer:
      'Persetujuan akhir merupakan hak penuh pihak Google. Layanan ini memastikan seluruh aspek teknis, metadata, dan kelayakan aplikasi telah disusun patuh pada Google Play Developer Policy.',
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Upload Play Store',
    'Upload Play Store Tanpa Closed Testing',
    'Rilis Aplikasi Android',
    'Publikasi Google Play Console',
    'Jasa Akun Developer Play Store',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Upload Play Store', path },
  ],
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

const outcomes = [
  {
    icon: CheckCircle2,
    title: 'Solusi kendala 20 tester',
    description: 'Mengatasi hambatan kewajiban closed testing 14 hari dengan 20 tester aktif agar aplikasi Anda dapat segera masuk antrean rilis produksi.',
  },
  {
    icon: FileCheck,
    title: 'Listing toko aplikasi tertata',
    description: 'Penyusunan aset grafis, deskripsi teks, penentuan kategori, dan pengisian formulir privasi yang patuh pada standar Google Play.',
  },
  {
    icon: Shield,
    title: 'Deklarasi data safety akurat',
    description: 'Panduan pengisian bagian keamanan data pengguna sesuai pustaka dan izin akses yang benar-benar digunakan di dalam aplikasi.',
  },
]

const scopes = [
  {
    title: 'Pemeriksaan berkas bundel aplikasi',
    description: 'Memverifikasi format berkas .aab, target API level terbaru, sertifikat tanda tangan (keystore), dan daftar izin sistem.',
  },
  {
    title: 'Pengisian kuisioner kepatuhan Google',
    description: 'Menyusun deklarasi klasifikasi usia, target audiens, kebijakan privasi, serta deklarasi perlindungan data pengguna.',
  },
  {
    title: 'Penataan aset listing toko',
    description: 'Menata ikon aplikasi resolusi tinggi, gambar fitur promosi, dan tangkapan layar ponsel sesuai pedoman visual Google.',
  },
  {
    title: 'Pendampingan evaluasi peninjauan',
    description: 'Membantu penyesuaian teknis dan komunikasi jika terdapat catatan perbaikan dari pemeriksa Google Play hingga status terbit.',
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Verifikasi berkas build',
    description: 'Memeriksa kesiapan berkas rilis AAB dan kelengkapan materi teks aplikasi Anda.',
  },
  {
    number: '02',
    title: 'Konfigurasi listing toko',
    description: 'Memasukkan deskripsi aplikasi, tangkapan layar, kategori produk, dan tautan kebijakan privasi.',
  },
  {
    number: '03',
    title: 'Pengisian formulir regulasi',
    description: 'Melengkapi kuisioner konten, perizinan sensitif, dan deklarasi Data Safety di konsol.',
  },
  {
    number: '04',
    title: 'Pengajuan dan pemantauan',
    description: 'Mengirimkan aplikasi ke antrean peninjauan Google dan memantau status hingga disetujui.',
  },
]

const boundaries = [
  'Tidak melayani aplikasi yang melanggar hukum, konten berhak cipta tanpa izin, aplikasi perjudian, pinjaman ilegal, atau program berbahaya.',
  'Keputusan penerimaan dan persetujuan rilis adalah wewenang mutlak tim Google Play. Tidak ada pihak luar yang dapat mengatur keputusan internal Google.',
  'Durasi peninjauan bergantung sepenuhnya pada antrean peninjau Google dan tidak dapat dipercepat secara manual.',
  'Klien wajib memiliki hak penuh atas merek, konten grafis, dan kode aplikasi yang didaftarkan.',
]

export default function PlayStoreUploadServicePage() {
  const whatsappUrl = buildWhatsAppUrl(
    'Halo Wahyu Andika Putra, saya ingin berkonsultasi mengenai jasa upload Play Store tanpa closed testing 14 hari.'
  )

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={{ icon: <ArrowUpRight className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Jasa upload aplikasi ke Play Store tanpa closed testing 14 hari"
        accent="Pendampingan Publikasi Resmi Google Play"
      >
        <p>{pageDescription}</p>
      </PageHero>

      {/* Ringkasan Hasil Bagi Klien */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Hasil nyata untuk peluncuran aplikasi Anda
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Membantu pengembang dan pemilik bisnis melewati tahapan birokrasi Google Play Console dengan tertib dan patuh aturan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {outcomes.map((item) => (
            <div key={item.title} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
                <item.icon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{item.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ruang Lingkup Layanan */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Ruang lingkup pendampingan rilis
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Menangani seluruh persyaratan teknis dan deklarasi konten di Google Play Console.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scopes.map((scope) => (
            <div key={scope.title} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60">
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">{scope.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{scope.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Tahapan proses pengunggahan
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Langkah terstruktur agar aplikasi siap diajukan ke antrean peninjau Google Play.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div key={step.number} className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/60 shadow-sm">
              <span className="text-xs font-mono font-semibold text-zinc-400 block mb-3">{step.number}</span>
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Batasan Layanan */}
      <section className="mb-16">
        <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200/60 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center">
              <AlertCircle className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Batasan kebijakan layanan</h2>
          </div>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Ketentuan berikut wajib dipatuhi demi menjaga kepatuhan hukum dan regulasi Google:
          </p>
          <ul className="space-y-3">
            {boundaries.map((boundary, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{boundary}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ Terlihat */}
      <Faq id="faq-playstore" title="Pertanyaan seputar rilis Play Store" faqs={faqs} />

      {/* CTA Band Khusus */}
      <CtaBand
        title="Butuh bantuan menerbitkan aplikasi ke Play Store?"
        body="Konsultasikan kesiapan berkas aplikasi Anda untuk proses rilis yang tertata dan patuh pada ketentuan Google."
        primary={{
          href: whatsappUrl,
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('playstore'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
