import type { Metadata } from 'next'
import { Globe } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/pembuatan-website'
const pageTitle = 'Jasa Pembuatan Website'
const pageDescription =
  'Layanan pembuatan website modern yang dibangun dengan performa tinggi, struktur rapi, dan teknologi terkini.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Pembuatan Website',
    'Pengembang Website',
    'Website Responsif',
    'Next.js Website',
    'Andika Putra Dev',
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
})

export default function WebDevelopmentServicePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <Globe className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Pembuatan Website"
        accent="Modern dan Berkinerja Tinggi"
      >
        <p>{pageDescription}</p>
      </PageHero>

      <CtaBand
        title="Punya rencana membangun website baru?"
        body="Sampaikan kebutuhan website Anda untuk mendapatkan perkiraan teknis dan langkah pelaksanaan kerja."
        primary={{
          href: 'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20pembuatan%20website.',
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
