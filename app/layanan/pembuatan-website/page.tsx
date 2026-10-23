import type { Metadata } from 'next'
import { Globe, CheckCircle2, Shield, Smartphone, Search, RefreshCw } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { Faq } from '@/components/page/faq'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/pembuatan-website'
const pageTitle = 'Jasa Pembuatan Website'
const pageDescription =
  'Layanan pembuatan company profile, landing page, toko online, dan aplikasi web yang cepat di ponsel, mudah dikelola, dan siap SEO dasar.'

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Website apa saja yang bisa dibuat?',
    answer:
      'Saya melayani pembuatan company profile, landing page promosi, katalog toko online, hingga aplikasi web kustom untuk kebutuhan operasional bisnis Anda.',
  },
  {
    question: 'Apakah website sudah responsif saat dibuka di ponsel?',
    answer:
      'Ya. Seluruh tata letak halaman dirancang dengan pendekatan mobile-first sehingga tampil rapi, proporsional, dan ringan saat diakses melalui smartphone.',
  },
  {
    question: 'Bagaimana dengan optimasi mesin pencari (SEO)?',
    answer:
      'Setiap website sudah dilengkapi konfigurasi SEO teknis dasar, meliputi meta title, meta description, berkas sitemap XML, robots.txt, dan struktur heading hierarkis.',
  },
  {
    question: 'Teknologi apa yang digunakan dalam pembuatan website?',
    answer:
      'Teknologi dipilih sesuai kebutuhan proyek, seperti Next.js, React, TypeScript, atau platform terkait, guna memastikan efisiensi performa dan kemudahan perawatan.',
  },
  {
    question: 'Apakah saya bisa memperbarui isi website sendiri nantinya?',
    answer:
      'Ya. Struktur konten dapat dihubungkan ke sistem pengelolaan atau berkas data terstruktur sehingga Anda dapat memperbarui informasi secara mandiri.',
  },
]

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Pembuatan Website',
    'Pembuatan Website Company Profile',
    'Jasa Landing Page',
    'Toko Online Cepat',
    'Pengembang Website Semarang Wonosobo',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Pembuatan Website', path },
  ],
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

const outcomes = [
  {
    icon: Smartphone,
    title: 'Cepat diakses di ponsel',
    description: 'Halaman ringan dengan pemuatan kilat agar pengunjung tidak meninggalkan situs Anda karena waktu tunggu yang lama.',
  },
  {
    icon: RefreshCw,
    title: 'Mudah dikelola mandiri',
    description: 'Arsitektur konten yang teratur sehingga pembaruan teks, gambar, dan layanan dapat dilakukan tanpa kesulitan teknis.',
  },
  {
    icon: Search,
    title: 'Siap SEO teknis dasar',
    description: 'Dilengkapi metadata terstruktur, sitemap XML otomatis, dan hierarki heading yang memudahkan mesin pencari membaca isi situs.',
  },
]

const scopes = [
  {
    title: 'Company profile',
    description: 'Situs profil perusahaan atau bisnis untuk memperkenalkan identitas, rekam jejak, dan keunggulan layanan Anda secara profesional.',
  },
  {
    title: 'Landing page',
    description: 'Halaman penawaran khusus yang dirancang dengan tata letak terarah untuk mendorong konversi pesan atau transaksi calon pelanggan.',
  },
  {
    title: 'Toko online',
    description: 'Katalog produk digital maupun fisik dengan navigasi rapi, etalase responsif, dan alur pemesanan langsung ke WhatsApp atau sistem kasir.',
  },
  {
    title: 'Aplikasi web',
    description: 'Sistem portal fungsional berbasis peramban untuk otomasi pencatatan data, dashboard internal, atau layanan interaktif pelanggan.',
  },
]

const workflowSteps = [
  {
    number: '01',
    title: 'Penyelarasan kebutuhan',
    description: 'Mendiskusikan tujuan situs, sasaran pengguna, dan bahan informasi yang telah disiapkan.',
  },
  {
    number: '02',
    title: 'Penyusunan tata letak',
    description: 'Merancang alur informasi dan navigasi antarbagian agar mudah dipahami pengunjung.',
  },
  {
    number: '03',
    title: 'Pengembangan kode',
    description: 'Menulis kode program secara rapi dengan teknologi yang dipilih sesuai kebutuhan proyek untuk performa optimal.',
  },
  {
    number: '04',
    title: 'Pengujian dan peluncuran',
    description: 'Memeriksa tampilan di berbagai ukuran layar, integrasi formulir, konfigurasi domain, dan aktivasi sitemap.',
  },
]

const boundaries = [
  'Penyusunan konten teks tertulis (copywriting) produk secara menyeluruh disiapkan oleh klien, kecuali disepakati kerja sama terpisah.',
  'Klien menyediakan aset visual seperti logo resmi, dokumentasi foto, dan data legalitas usaha.',
  'Tidak ada jaminan peringkat pertama di mesin pencari secara instan karena algoritma pihak ketiga bergantung pada reputasi domain dan dinamika kata kunci.',
  'Biaya pendaftaran nama domain tahunan dan sewa hosting server produksi menjadi tanggung jawab klien.',
]

export default function WebDevelopmentServicePage() {
  const whatsappUrl = buildWhatsAppUrl(
    'Halo Wahyu Andika Putra, saya ingin berkonsultasi mengenai jasa pembuatan website.'
  )

  return (
    <>
      <JsonLd data={structuredData} />

      <PageHero
        eyebrow={{ icon: <Globe className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Jasa Pembuatan Website"
        accent="Cepat di Ponsel, Mudah Dikelola, dan Siap SEO"
      >
        <p>{pageDescription}</p>
      </PageHero>

      {/* Ringkasan Hasil Bagi Klien */}
      <section className="mb-16">
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Hasil nyata untuk kehadiran digital Anda
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Setiap website dirancang agar berfungsi sebagai sarana komunikasi yang efektif bagi calon pelanggan Anda.
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
            Ruang lingkup pembuatan website
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Format website yang dapat disesuaikan dengan skala dan tujuan operasional usaha Anda.
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
            Alur pengerjaan website
          </h2>
          <p className="text-zinc-600 leading-relaxed">
            Langkah terstruktur agar proyek selesai tepat sasaran dan mudah dipantau perkembangannya.
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
              <Shield className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-semibold text-zinc-900">Batasan teknis layanan</h2>
          </div>
          <p className="text-sm text-zinc-600 mb-6 leading-relaxed">
            Keterbukaan mengenai batasan kerja sama menjaga kejelasan ekspektasi sejak awal proyek:
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
      <Faq id="faq-website" title="Pertanyaan seputar pembuatan website" faqs={faqs} />

      {/* CTA Band Khusus */}
      <CtaBand
        title="Ingin membuat website untuk usaha Anda?"
        body="Sampaikan kebutuhan sistem atau tampilan yang Anda inginkan. Saya akan memberikan pertimbangan teknis secara langsung."
        primary={{
          href: whatsappUrl,
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('website'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
