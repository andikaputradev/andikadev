import type { Metadata } from 'next'
import { ArrowUpRight } from 'lucide-react'
import { PageHero } from '@/components/page/hero'
import { CtaBand } from '@/components/page/cta-band'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/layanan/upload-play-store'
const pageTitle = 'Jasa Upload Aplikasi ke Play Store'
const pageDescription =
  'Layanan pendampingan teknis dan publikasi rilis aplikasi ke Google Play Store secara resmi sesuai regulasi Google.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Jasa Upload Play Store',
    'Upload Aplikasi Android',
    'Publikasi Google Play',
    'Rilis Aplikasi Play Store',
    'Andika Putra Dev',
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
})

export default function PlayStoreUploadServicePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      <PageHero
        eyebrow={{ icon: <ArrowUpRight className="w-4 h-4 text-orange-500" />, label: 'Layanan' }}
        title="Jasa Upload ke Play Store"
        accent="Pendampingan Rilis Resmi"
      >
        <p>{pageDescription}</p>
      </PageHero>

      <CtaBand
        title="Butuh bantuan merilis aplikasi ke Google Play Store?"
        body="Konsultasikan kesiapan berkas aplikasi Anda untuk proses rilis yang tertata dan patuh pada ketentuan Google."
        primary={{
          href: 'https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20jasa%20upload%20Play%20Store.',
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
