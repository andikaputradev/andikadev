import type { Metadata } from 'next'
import Link from 'next/link'
import { Globe, Smartphone, ArrowUpRight, ShieldCheck, Code2, ArrowRight } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const pageTitle = 'Layanan Pengembangan Web dan Aplikasi'
const pageDescription =
  'Fokus layanan Wahyu Andika Putra mencakup pembuatan website, pembuatan aplikasi mobile, jasa upload Play Store, keamanan siber defensif, dan Web3.'
const path = '/layanan'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Layanan Pembuatan Website',
    'Layanan Pembuatan Aplikasi',
    'Jasa Upload Play Store',
    'Keamanan Siber Defensif',
    'Web3 Blockchain Developer',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [{ name: 'Layanan', path }],
})

const serviceItems = [
  {
    title: 'Pembuatan website',
    desc: 'Layanan pembuatan website modern yang dibangun dengan performa tinggi, struktur rapi, dan teknologi terkini.',
    href: '/layanan/pembuatan-website',
    icon: Globe,
  },
  {
    title: 'Pembuatan aplikasi',
    desc: 'Layanan pembuatan aplikasi mobile dan multi platform yang responsif, stabil, dan sesuai kebutuhan sistem Anda.',
    href: '/layanan/pembuatan-aplikasi',
    icon: Smartphone,
  },
  {
    title: 'Jasa upload aplikasi ke Play Store',
    desc: 'Layanan pendampingan teknis dan publikasi rilis aplikasi ke Google Play Store secara resmi sesuai regulasi Google.',
    href: '/layanan/upload-play-store',
    icon: ArrowUpRight,
  },
  {
    title: 'Keamanan siber defensif',
    desc: 'Layanan pengujian dan penguatan keamanan siber dalam kerangka defensif, legal, dan atas izin tertulis pemilik sistem.',
    href: '/layanan/keamanan-siber',
    icon: ShieldCheck,
  },
  {
    title: 'Web3 dan blockchain',
    desc: 'Layanan pengembangan teknologi Web3, integrasi kontrak pintar, dan arsitektur terdesentralisasi yang aman.',
    href: '/layanan/web3-blockchain',
    icon: Code2,
  },
]

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <Globe className="w-4 h-4 text-orange-500" />, label: 'Layanan Teknis' }}
        title="Layanan Pengembangan"
        accent="Website, Aplikasi, dan Keamanan Siber"
      >
        <p>
          Fokus layanan teknis oleh Wahyu Andika Putra untuk membantu mewujudkan produk digital yang andal dan aman.
        </p>
      </PageHero>

      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-zinc-50 hover:bg-zinc-100/80 rounded-2xl p-6 transition-all border border-zinc-200/60 hover:border-zinc-300 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <item.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-semibold text-zinc-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h2>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6">
                  {item.desc}
                </p>
              </div>
              <div className="flex items-center text-sm font-medium text-orange-500 group-hover:translate-x-1 transition-transform">
                <span>Pelajari detail layanan</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <CtaBand
        title="Ingin berkonsultasi mengenai kebutuhan proyek Anda?"
        body="Sampaikan gambaran sistem yang ingin dibangun. Saya akan memberikan tanggapan teknis secara lugas."
        primary={{
          href: buildWhatsAppUrl(),
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('website'),
          label: 'Gunakan formulir kontak',
        }}
      />
    </>
  )
}
