import type { Metadata } from 'next'
import { Code2 } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/web3-blockchain'
const pageTitle = 'Layanan Web3 dan Blockchain'
const pageDescription =
  'Layanan pengembangan teknologi Web3, integrasi kontrak pintar, dan arsitektur terdesentralisasi yang aman.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Pengembangan Web3',
    'Integrasi Smart Contract',
    'Arsitektur Blockchain',
    'DApp Development',
    'Andika Putra Dev',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [
    { name: 'Layanan', path: '/layanan' },
    { name: 'Web3 dan Blockchain', path },
  ],
})

export default function Web3ServicePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <Code2 className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Web3 dan Blockchain"
        accent="Teknologi Terdesentralisasi yang Aman"
      >
        <p>{pageDescription}</p>
      </PageHero>

      <CtaBand
        title="Ingin mengintegrasikan teknologi blockchain?"
        body="Diskusikan arsitektur teknis dan penerapan kontrak pintar yang stabil tanpa janji spekulasi finansial."
        primary={{
          href: 'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20Web3%20dan%20blockchain.',
          label: 'Konsultasi lewat WhatsApp',
        }}
        secondary={{
          href: contactHref('web3'),
          label: 'Isi formulir kontak',
        }}
      />
    </>
  )
}
