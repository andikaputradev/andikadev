import type { Metadata } from 'next'
import { ShieldCheck, CheckCircle2, FileText, Search, AlertTriangle } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { Faq } from '@/components/page/faq'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/keamanan-siber'
const pageTitle = 'Layanan Keamanan Siber Defensif'
const pageDescription =
  'Layanan tinjauan keamanan aplikasi web dan API defensif berbasis OWASP. Evaluasi celah keamanan legal dengan izin tertulis pemilik sistem.'

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Apakah pengujian keamanan ini legal?',
    answer:
      'Ya. Layanan ini murni bersifat defensif dan hanya dilaksanakan setelah adanya kesepakatan tertulis serta surat izin resmi dari pemilik sah sistem terkait.',
  },
  {
    question: 'Standar apa yang digunakan dalam tinjauan keamanan aplikasi?',
    answer:
      'Evaluasi mengacu pada metodologi standar industri, seperti OWASP Top 10 dan OWASP Application Security Verification Standard (ASVS).',
  },
  {
    question: 'Apa saja yang diserahkan di akhir pekerjaan?',
    answer:
      'Anda menerima laporan temuan komprehensif yang memuat deskripsi celah, tingkat keparahan, dampak risiko, bukti reproduksi di lingkungan Anda, serta panduan langkah perbaikan.',
  },
  {
    question: 'Apakah ada pengujian ulang setelah tim kami menambal celah?',
    answer:
      'Ya. Layanan mencakup sesi verifikasi ulang untuk memeriksa kembali celah yang telah diperbaiki oleh tim pengembang Anda guna memastikan risiko telah teratasi.',
  },
  {
    question: 'Apakah layanan ini memberikan jaminan sistem anti bobol?',
    answer:
      'Tidak ada sistem digital di dunia yang dapat dijamin kebal secara mutlak. Layanan ini bertujuan memperkuat pertahanan dan menutup celah sebelum dimanfaatkan oleh pihak luar.',
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Keamanan Siber Defensif',
    'Audit Keamanan Aplikasi Web',
    'Pengujian OWASP ASVS',
    'Secure Code Review',
    'Hardening Sistem Semarang Wonosobo',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Keamanan Siber', path },
  ],
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

const outcomes = [
  {
    icon: Search,
    title: 'Identifikasi kerentanan dini',
    description: 'Menemukan celah keamanan pada aplikasi dan API sebelum disalahgunakan oleh pihak yang tidak bertanggung jawab.',
  },
  {
    icon: FileText,
    title: 'Laporan temuan terstruktur',
    description: 'Dokumentasi detail berisi bukti reproduksi yang valid di lingkungan Anda beserta panduan mitigasi yang aplikatif.',
  },
  {
    icon: ShieldCheck,
    title: 'Verifikasi hasil perbaikan',
    description: 'Pemeriksaan ulang setelah tim Anda menambal celah untuk memastikan penanganan berjalan efektif dan tuntas.',
  },
]

const scopes = [
  {
    title: 'Tinjauan keamanan aplikasi web dan API',
    description: 'Evaluasi celah keamanan antarmuka dan endpoint data berbasis metodologi standar OWASP Top 10 dan OWASP ASVS.',
  },
  {
    title: 'Tinjauan kode aman (secure code review)',
    description: 'Pemeriksaan kode sumber untuk mendeteksi kelemahan logika autentikasi, otorisasi, penanganan sesi, dan sanitasi input.',
  },
  {
    title: 'Pengerasan konfigurasi (system hardening)',
    description: 'Peninjauan pengaturan server web, konfigurasi TLS, header keamanan HTTP, dan pembatasan hak akses sistem.',
  },
  {
    title: 'Pemodelan ancaman (threat modeling)',
    description: 'Pemetaan potensi vektor serangan dan analisis skenario risiko terhadap arsitektur pertukaran data bisnis Anda.',
  },
  {
    title: 'Pemeriksaan dependensi',
    description: 'Pemeriksaan paket pustaka pihak ketiga dan modul open source terhadap basis data kerentanan yang terpublikasi (CVE).',
  },
  {
    title: 'Rekomendasi perbaikan terarah',
    description: 'Penyusunan langkah teknis penambalan celah yang jelas agar dapat segera dieksekusi oleh tim rekayasa perangkat lunak Anda.',
  },
]

const deliverables = [
  'Deskripsi terperinci mengenai sifat dan karakteristik kerentanan.',
  'Prasyarat lingkungan yang memungkinkan celah tersebut terjadi.',
  'Dampak nyata terhadap integritas data, kerahasiaan, dan ketersediaan layanan.',
  'Tingkat keparahan risiko berdasarkan metriks standar keamanan industri.',
  'Bukti teknis pengujian yang dapat direproduksi secara aman di lingkungan klien.',
  'Panduan mitigasi dan langkah penambalan kode yang konkret.',
  'Sesi pengujian verifikasi ulang setelah tim pengembang Anda menerapkan perbaikan.',
]

const workflowSteps = [
  {
    number: '01',
    title: 'Persetujuan tertulis',
    description: 'Menandatangani kesepakatan tertulis dan surat izin resmi yang merinci domain target, alamat IP, dan jadwal evaluasi.',
  },
  {
    number: '02',
    title: 'Pemetaan ruang lingkup',
    description: 'Mengumpulkan informasi arsitektur dan memetakan permukaan serangan sistem secara terukur.',
  },
  {
    number: '03',
    title: 'Evaluasi teknis defensif',
    description: 'Menjalankan pengujian keamanan web, API, konfigurasi, dan pemeriksaan pustaka dependensi sesuai acuan OWASP.',
  },
  {
    number: '04',
    title: 'Penyusunan laporan dan verifikasi',
    description: 'Menyerahkan laporan temuan dan melakukan verifikasi ulang setelah perbaikan selesai diaplikasikan tim klien.',
  },
]

const boundaries = [
  'Pekerjaan hanya dilakukan pada sistem milik klien sendiri atau yang memiliki izin tertulis sah dari pemilik infrastruktur.',
  'Seluruh pengujian tunduk pada batasan ruang lingkup tertulis yang disepakati bersama sebelum pengujian dimulai.',
  'Tidak ada jaminan sistem 100 persen bebas dari celah karena lanskap ancaman siber senantiasa berkembang.',
  'Layanan ini berfokus pada evaluasi teknis defensif independen di luar lingkup sertifikasi kepatuhan regulator formal.',
  'Dilarang keras meminta dan saya tidak menyediakan alat serangan, modul eksploitasi, atau teknik peretasan tanpa izin.',
]

export default function CyberSecurityServicePage() {
  const whatsappUrl =
    'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20keamanan%20siber%20defensif.'

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={{ icon: <ShieldCheck className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Layanan Keamanan Siber Defensif"
        accent="Berbasis OWASP, Etis, dan Berizin Tertulis"
      >
        <p>{pageDescription}</p>
      </PageHero>

      {/* Ringkasan Hasil Bagi Klien */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Hasil nyata untuk perlindungan sistem Anda
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Menemukan kelemahan teknis secara terukur dan memberikan langkah mitigasi yang jelas untuk memperkuat infrastruktur digital.
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
            Ruang lingkup evaluasi keamanan
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Pemeriksaan menyeluruh pada lapisan kode aplikasi, antarmuka API, dan konfigurasi server.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scopes.map((scope) => (
            <div key={scope.title} className="bg-zinc-50 rounded-2xl p-6 border border-zinc-200/60">
              <h3 className="text-base font-semibold text-zinc-900 mb-2">{scope.title}</h3>
              <p className="text-sm text-zinc-600 leading-relaxed">{scope.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bentuk Keluaran Laporan */}
      <section className="mb-16">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 border border-zinc-200/60 shadow-sm max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-500 flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Format keluaran laporan temuan</h2>
          </div>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Setiap evaluasi menghasilkan laporan teknis komprehensif dengan rincian berikut:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {deliverables.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-sm text-zinc-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cara Kerja */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Alur pelaksanaan evaluasi
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Tahapan kerja profesional yang transparan dan mematuhi etika hukum.
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

      {/* Batasan Layanan dan Etika */}
      <section className="mb-16">
        <div className="bg-zinc-50 rounded-2xl p-8 border border-zinc-200/60 max-w-4xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-zinc-200 text-zinc-700 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Batasan etika dan ketentuan hukum</h2>
          </div>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Prinsip yang wajib dipatuhi sebelum kerja sama pengujian keamanan disepakati:
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
      <Faq id="faq-keamanan" title="Pertanyaan seputar keamanan siber defensif" faqs={faqs} />

      {/* CTA Band Khusus */}
      <CtaBand
        title="Ingin mengevaluasi keamanan sistem Anda secara legal?"
        body="Diskusikan kebutuhan audit defensif dengan perjanjian tertulis dan persetujuan resmi dari pemilik sistem."
        primary={{
          href: whatsappUrl,
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('keamanan-siber'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
