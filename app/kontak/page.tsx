import type { Metadata } from 'next'
import { Mail, MapPin, Send, MessageSquare, ArrowUpRight, Phone, SendHorizontal } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { ContactForm } from '@/components/contact-form'
import { GithubIcon } from '@/components/icons/github'
import { LinkedinIcon } from '@/components/icons/linkedin'
import { TelegramIcon } from '@/components/icons/telegram'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { InstagramIcon } from '@/components/icons/instagram'
import { TikTokIcon } from '@/components/icons/tiktok'
import { FacebookIcon } from '@/components/icons/facebook'
import { XIcon } from '@/components/icons/x'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'

export const revalidate = 86400

const pageTitle = 'Hubungi Wahyu Andika Putra'
const pageDescription =
  'Kirimkan kebutuhan proyek Anda untuk pembuatan website, aplikasi mobile, upload Play Store, keamanan siber defensif, atau Web3.'
const path = '/kontak'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  keywords: [
    'Kontak Pengembang',
    'Konsultasi Pembuatan Website',
    'Jasa Pembuatan Aplikasi Semarang',
    'Pengembang Web Wonosobo',
    'Andika Putra Dev',
  ],
})

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  type: 'ContactPage',
  breadcrumbs: [{ name: 'Kontak', path }],
})

const directContacts = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+62 877-3013-9582',
    href: 'https://wa.me/6287730139582',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'wahyuandikaputra.co.id@gmail.com',
    href: 'mailto:wahyuandikaputra.co.id@gmail.com',
  },
  {
    icon: SendHorizontal,
    label: 'Telegram',
    value: '@andikaputradev',
    href: 'https://t.me/andikaputradev',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Wonosobo / Semarang, Jawa Tengah',
    href: undefined,
  },
]

const socialProfiles = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/wahyu-andika-putra', icon: LinkedinIcon },
  { name: 'GitHub', href: 'https://github.com/andikaputradev', icon: GithubIcon },
  { name: 'Telegram', href: 'https://t.me/andikaputradev', icon: TelegramIcon },
  { name: 'WhatsApp', href: 'https://wa.me/6287730139582', icon: WhatsAppIcon },
  { name: 'Instagram', href: 'https://instagram.com/andikaputradev', icon: InstagramIcon },
  { name: 'TikTok', href: 'https://tiktok.com/@andikaputradev', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://facebook.com/andikaputradev', icon: FacebookIcon },
  { name: 'X', href: 'https://x.com/andikaputradev', icon: XIcon },
]

export default function ContactPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero Section */}
      <section className="text-center pt-8 pb-16">
        <div
          className="inline-flex bg-white/60 rounded-full mb-8 py-1.5 pr-4 pl-3 shadow-sm backdrop-blur-sm items-center gap-2"
          style={{
            position: 'relative',
            // @ts-expect-error CSS custom properties
            '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
            '--border-radius-before': '9999px',
          }}
        >
          <MessageSquare className="w-4 h-4 text-orange-500" />
          <span className="text-xs font-semibold tracking-wider uppercase text-zinc-600">Konsultasi proyek</span>
        </div>

        <h1 className="leading-[0.95] lg:text-[4rem] text-4xl font-medium text-zinc-900 tracking-tighter mb-6">
          Sampaikan rencana
          {' '}<span className="block gradient-text font-light">proyek yang ingin Anda bangun</span>
        </h1>

        <p className="text-base md:text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
          Tuliskan ringkasan kebutuhan sistem Anda. Saya membaca setiap pesan secara langsung dan memberikan tanggapan mengenai solusi teknis yang sesuai.
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hover:scale-[1.02] transition-all inline-flex group shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 text-sm font-medium text-zinc-900 rounded-full py-3 px-6 gap-3 items-center"
          >
            <span className="text-sm font-medium tracking-tight">Konsultasi lewat WhatsApp</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <Link
            href="#contact-form"
            className="btn-secondary hover:bg-zinc-50 transition-all inline-flex text-sm font-medium rounded-full py-3 px-6 gap-2 items-center text-zinc-700"
          >
            <span className="text-sm font-medium tracking-tight">Buka formulir konsultasi</span>
          </Link>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-16 opacity-60" />

      {/* Contact Form and Info Grid */}
      <section id="contact-form" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-zinc-200/60">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-zinc-100 rounded-xl">
                <Send className="w-5 h-5 text-zinc-600" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-zinc-900">Formulir kebutuhan proyek</h2>
                <p className="text-sm text-zinc-500">Kirimkan rincian kebutuhan Anda untuk dipelajari.</p>
              </div>
            </div>
            <Suspense fallback={<div className="h-[420px] rounded-lg border bg-card" />}>
              <ContactForm />
            </Suspense>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-zinc-200/60">
            <h3 className="font-semibold text-zinc-900 mb-6">Kontak langsung</h3>

            <div className="space-y-5">
              {directContacts.map((contact) => (
                <div key={contact.label} className="flex items-start gap-4">
                  <div className="p-2 bg-zinc-100 rounded-lg shrink-0">
                    <contact.icon className="w-4 h-4 text-zinc-600" />
                  </div>
                  <div>
                    <p className="text-xs text-zinc-400 uppercase tracking-wider mb-1">{contact.label}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.href.startsWith('http') ? '_blank' : undefined}
                        rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-zinc-900 hover:text-orange-500 transition-colors font-medium break-all"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-sm text-zinc-900 font-medium">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Profiles Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-zinc-200/60">
            <h3 className="font-semibold text-zinc-900 mb-4">Profil media sosial</h3>
            <div className="grid grid-cols-2 gap-2">
              {socialProfiles.map((profile) => (
                <a
                  key={profile.name}
                  href={profile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-50 hover:bg-orange-50 hover:text-orange-600 transition-colors group text-sm text-zinc-700"
                >
                  <profile.icon className="w-4 h-4 text-zinc-500 group-hover:text-orange-500 shrink-0" />
                  <span className="truncate">{profile.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Communication Process Card */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border border-orange-100">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">Tahapan komunikasi</span>
            </div>
            <ol className="text-sm text-zinc-600 leading-relaxed space-y-2 list-decimal pl-4">
              <li>Pesan Anda dipelajari langsung oleh Wahyu Andika Putra.</li>
              <li>Penyelarasan ruang lingkup teknis dan arsitektur sistem.</li>
              <li>Kesepakatan rencana kerja sebelum tahap penulisan kode dimulai.</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-16 opacity-60" />

      {/* Services Section */}
      <section className="mb-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-3">
            Layanan yang <span className="gradient-text">tersedia</span>
          </h2>
          <p className="text-sm text-zinc-500 max-w-lg mx-auto font-medium">
            Pilih jenis layanan yang paling sesuai dengan kebutuhan sistem Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Pembuatan website',
              description: 'Website dengan arsitektur modern, performa tinggi, dan struktur kode yang mudah dikembangkan.',
              href: '/layanan/pembuatan-website',
              icon: '🌐',
            },
            {
              title: 'Aplikasi mobile dan Play Store',
              description: 'Pengembangan aplikasi mobile dan pendampingan publikasi resmi ke Google Play Store.',
              href: '/layanan/pembuatan-aplikasi',
              icon: '📱',
            },
            {
              title: 'Keamanan defensif dan Web3',
              description: 'Pemeriksaan keamanan sistem berizin resmi serta pengembangan kontrak pintar yang stabil.',
              href: '/layanan/keamanan-siber',
              icon: '🛡️',
            },
          ].map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow group block border border-zinc-200/60"
            >
              <div className="text-3xl mb-4">{service.icon}</div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {service.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden min-h-[300px] shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl mb-8">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 lg:p-16 min-h-[300px] relative">
          <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-2xl">
            Siap mendiskusikan kebutuhan digital Anda?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-lg font-medium leading-relaxed">
            Sampaikan pesan Anda sekarang. Saya siap membantu merealisasikan sistem web dan aplikasi Anda.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-white hover:bg-zinc-100 transition-all text-zinc-900 text-sm font-medium rounded-full px-6 py-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <span>Konsultasi lewat WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <Link
              href="#contact-form"
              className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium rounded-full px-6 py-3"
            >
              <span>Gunakan formulir kontak</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
