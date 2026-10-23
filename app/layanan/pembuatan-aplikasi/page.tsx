import type { Metadata } from 'next'
import { Smartphone } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/pembuatan-aplikasi'
const pageTitle = 'Jasa Pembuatan Aplikasi'
const pageDescription =
  'Layanan pembuatan aplikasi mobile dan multi platform yang responsif, stabil, dan sesuai kebutuhan sistem Anda.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Pembuatan Aplikasi',
    'Pembuatan Aplikasi Mobile',
    'Aplikasi Android',
    'Aplikasi iOS',
    'Andika Putra Dev',
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
})

export default function AppDevelopmentServicePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <Smartphone className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Pembuatan Aplikasi"
        accent="Mobile dan Multi Platform"
      >
        <p>{pageDescription}</p>
      </PageHero>

      <CtaBand
        title="Ingin mengembangkan aplikasi mobile?"
        body="Diskusikan konsep aplikasi yang ingin Anda kembangkan dan dapatkan solusi teknis yang terarah."
        primary={{
          href: 'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pembuatan%20aplikasi.',
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
