import type { Metadata } from 'next'
import { ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/keamanan-siber'
const pageTitle = 'Layanan Keamanan Siber Defensif'
const pageDescription =
  'Layanan pengujian dan penguatan keamanan siber dalam kerangka defensif, legal, dan atas izin tertulis pemilik sistem.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Keamanan Siber Defensif',
    'Audit Keamanan Web',
    'Pengujian Kerentanan Legal',
    'Penguatan Sistem',
    'Andika Putra Dev',
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
})

export default function CyberSecurityServicePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <ShieldCheck className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Keamanan Siber Defensif"
        accent="Legal, Terstruktur, dan Berizin"
      >
        <p>{pageDescription}</p>
      </PageHero>

      <CtaBand
        title="Ingin mengevaluasi keamanan sistem Anda?"
        body="Diskusikan kebutuhan audit defensif dengan perjanjian tertulis dan persetujuan resmi dari pemilik sistem."
        primary={{
          href: 'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20keamanan%20siber%20defensif.',
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
