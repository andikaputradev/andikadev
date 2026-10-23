import type { Metadata } from 'next'
import { Smartphone, CheckCircle2, Shield, Layers, Layout, Terminal, Rocket, Database } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { Faq } from '@/components/page/faq'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/pembuatan-aplikasi'
const pageTitle = 'Jasa Pembuatan Aplikasi Android dan Web'
const pageDescription =
  'Layanan pembuatan aplikasi Android dan aplikasi web kustom. Alur terstruktur dari analisis kebutuhan, prototipe, pengembangan, hingga rilis.'

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Platform apa saja yang didukung dalam pembuatan aplikasi?',
    answer:
      'Saya mengembangkan aplikasi mobile untuk platform Android serta aplikasi web responsif yang dapat diakses melalui berbagai peramban modern.',
  },
  {
    question: 'Bagaimana tahapan kerja sama pembuatan aplikasi?',
    answer:
      'Alur kerja dimulai dari analisis kebutuhan sistem, pembuatan prototipe antarmuka, tahap penulisan kode modul, pengujian fungsi aplikasi, hingga rilis dan serah terima.',
  },
  {
    question: 'Teknologi apa yang Anda pakai untuk mengembangkan aplikasi?',
    answer:
      'Teknologi dipilih sesuai kebutuhan proyek, seperti Flutter, Dart, Kotlin, TypeScript, atau Node.js, agar aplikasi bekerja optimal dan mudah dipelihara.',
  },
  {
    question: 'Apakah data aplikasi dapat disinkronkan secara real-time?',
    answer:
      'Ya. Aplikasi dapat diintegrasikan dengan database cloud dan arsitektur API sehingga pertukaran data antar pengguna berlangsung cepat dan terstruktur.',
  },
  {
    question: 'Bagaimana jika aplikasi membutuhkan pembaruan fitur di masa depan?',
    answer:
      'Kode ditulis dengan pemisahan modul yang teratur, sehingga penambahan fitur atau penyesuaian fungsional di masa mendatang dapat dilakukan secara bertahap.',
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Pembuatan Aplikasi Android',
    'Jasa Pembuatan Aplikasi Web',
    'Aplikasi Mobile Wonosobo Semarang',
    'Pengembang Aplikasi Flutter',
    'Aplikasi Bisnis Kustom',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Pembuatan Aplikasi', path },
  ],
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

const outcomes = [
  {
    icon: Smartphone,
    title: 'Aplikasi stabil dan responsif',
    description: 'Kinerja aplikasi yang lancar saat memproses data dan berpindah layar, mengurangi kendala mogok saat digunakan pengguna.',
  },
  {
    icon: Database,
    title: 'Sinkronisasi data teratur',
    description: 'Pertukaran informasi antara aplikasi seluler dan server tersusun rapi melalui antarmuka data (API) yang terproteksi.',
  },
  {
    icon: Layers,
    title: 'Arsitektur kode modular',
    description: 'Struktur kode yang dipisahkan per modul fungsional sehingga memudahkan perawatan dan penambahan fitur baru di masa depan.',
  },
]

const scopes = [
  {
    title: 'Aplikasi Android',
    description: 'Pengembangan aplikasi mobile untuk perangkat Android dengan fokus pada kemudahan navigasi pengguna dan efisiensi konsumsi memori.',
  },
  {
    title: 'Aplikasi web terintegrasi',
    description: 'Dashboard dan panel manajemen berbasis web yang terhubung langsung dengan pusat data aplikasi mobile Anda.',
  },
  {
    title: 'Integrasi backend dan API',
    description: 'Pembuatan jalur komunikasi data yang aman untuk proses autentikasi pengguna, penyimpanan berkas, dan pelaporan operasional.',
  },
  {
    title: 'Pengujian fungsionalitas',
    description: 'Verifikasi logika modul dan alur kerja aplikasi di berbagai kondisi jaringan untuk memastikan konsistensi sistem.',
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Analisis kebutuhan',
    description: 'Mengurai alur bisnis, spesifikasi fungsional, dan batasan teknis yang diharapkan dari aplikasi.',
    icon: Terminal,
  },
  {
    number: '02',
    title: 'Pembuatan prototipe',
    description: 'Menyusun alur visual layar dan kerangka interaksi untuk dievaluasi bersama sebelum pengkodean dimulai.',
    icon: Layout,
  },
  {
    number: '03',
    title: 'Pengembangan kode',
    description: 'Menulis logika aplikasi dan antarmuka memakai teknologi yang dipilih sesuai kebutuhan proyek.',
    icon: Layers,
  },
  {
    number: '04',
    title: 'Pengujian bertahap',
    description: 'Menjalankan skenario penggunaan nyata untuk menemukan dan membenahi potensi galat sistem.',
    icon: CheckCircle2,
  },
  {
    number: '05',
    title: 'Rilis dan serah terima',
    description: 'Mempersiapkan berkas rilis, panduan penggunaan, serta pemasangan sistem ke server operasional.',
    icon: Rocket,
  },
]

const boundaries = [
  'Klien bertanggung jawab atas penyediaan akun layanan cloud pihak ketiga dan biaya server mandiri.',
  'Pekerjaan tidak mencakup garansi mutlak atas perubahan kebijakan platform eksternal atau sistem operasi di masa depan.',
  'Tidak mencakup pengadaan akun developer Google Play Console kecuali disepakati dalam ruang lingkup publikasi.',
  'Penyusunan basis data awal atau input entri master data skala besar disiapkan langsung oleh pihak klien.',
]

export default function AppDevelopmentServicePage() {
  const whatsappUrl = buildWhatsAppUrl(
    'Halo Wahyu Andika Putra, saya ingin berkonsultasi mengenai jasa pembuatan aplikasi.'
  )

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={{ icon: <Smartphone className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Jasa Pembuatan Aplikasi"
        accent="Android dan Aplikasi Web"
      >
        <p>{pageDescription}</p>
      </PageHero>

      {/* Ringkasan Hasil Bagi Klien */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Hasil aplikasi yang mendukung operasional Anda
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Membangun sistem aplikasi yang bekerja andal, mudah dipahami pengguna, dan siap bertumbuh bersama bisnis Anda.
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
            Ruang lingkup pembuatan aplikasi
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Cakupan pengembangan dari lapisan antarmuka seluler hingga arsitektur pusat data.
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

      {/* Cara Kerja: Alur Lengkap */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Alur pengembangan sistem aplikasi
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Tahapan transparan dari pemetaan konsep, perancangan prototipe, pengkodean modul, sampai rilis sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step) => (
            <div key={step.number} className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-zinc-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-zinc-400 block mb-2">{step.number}</span>
                <h3 className="text-sm font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Batasan Layanan */}
      <section className="mb-16">
        <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200/60 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Batasan teknis layanan</h2>
          </div>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Poin batasan yang disepakati untuk menjaga ruang lingkup pengerjaan tetap realistis:
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
      <Faq id="faq-aplikasi" title="Pertanyaan seputar pembuatan aplikasi" faqs={faqs} />

      {/* CTA Band Khusus */}
      <CtaBand
        title="Ingin mengembangkan aplikasi untuk sistem Anda?"
        body="Diskusikan gambaran alur aplikasi yang ingin Anda bangun untuk mendapatkan arahan teknis yang terukur."
        primary={{
          href: whatsappUrl,
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('aplikasi'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
