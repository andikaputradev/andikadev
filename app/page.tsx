import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { getPosts } from '@/lib/blog'
import { ArrowRight, ArrowUpRight, Code2, Globe, ShieldCheck, Smartphone, Award } from 'lucide-react'
import type { Metadata } from 'next'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { HomeContent } from '@/components/home-content'
import { contactHref } from '@/lib/contact-services'

export const revalidate = 86400 // 24 hours

const PostsFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse bg-zinc-100 h-80 rounded-2xl" />
    ))}
  </div>
)

const pageTitle = 'Pengembang Website dan Aplikasi Mobile'
const pageDescription =
  'Wahyu Andika Putra menyediakan jasa pembuatan website, pembuatan aplikasi, jasa upload aplikasi ke Play Store, keamanan siber defensif, dan Web3.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/',
})

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Bagaimana proses kerja sama proyek?',
    answer:
      'Anda dapat mengirimkan ringkasan kebutuhan proyek melalui formulir kontak atau WhatsApp. Saya akan mempelajari cakupan teknisnya dan memberikan gambaran langkah kerja secara transparan.',
  },
  {
    question: 'Layanan apa saja yang disediakan?',
    answer:
      'Fokus layanan mencakup pembuatan website, pembuatan aplikasi mobile, jasa upload aplikasi ke Google Play Store, pengujian keamanan siber defensif atas izin tertulis, serta pengembangan Web3.',
  },
  {
    question: 'Apakah melayani klien secara remote?',
    answer:
      'Ya. Saya berbasis di Wonosobo / Semarang, Jawa Tengah, dan siap bekerja secara remote untuk klien dari berbagai wilayah di Indonesia.',
  },
]

const structuredData = buildPageGraph({
  path: '/',
  name: `${pageTitle} | Wahyu Andika Putra`,
  description: pageDescription,
  faqs: faqs.map(({ question, answer }) => ({ question, answer })),
})

async function Posts() {
  let posts: Awaited<ReturnType<typeof getPosts>> = []
  try {
    posts = await getPosts({
      per_page: 3,
    })
  } catch (error) {
    console.error('Failed to load posts:', error)
  }

  return <HomeContent type="posts" initialData={posts} />
}

const services = [
  {
    icon: Globe,
    title: "Pembuatan website",
    description: "Membangun website modern dengan performa cepat, responsif di ponsel, dan struktur kode yang mudah dikembangkan.",
    href: "/contact",
  },
  {
    icon: Smartphone,
    title: "Pembuatan aplikasi mobile",
    description: "Pengembangan aplikasi Android dan multi-platform yang stabil untuk operasional bisnis Anda.",
    href: "/contact",
  },
  {
    icon: ArrowUpRight,
    title: "Jasa upload ke Play Store",
    description: "Pendampingan teknis dan proses rilis aplikasi ke Google Play Store hingga tayang secara resmi.",
    href: "/contact",
  },
  {
    icon: ShieldCheck,
    title: "Keamanan siber defensif dan Web3",
    description: "Audit keamanan sistem berbasis izin tertulis serta integrasi kontrak pintar blockchain yang aman.",
    href: "/contact",
  },
]

const features = [
  {
    icon: Globe,
    text: "Pembuatan website dan aplikasi dengan performa cepat, arsitektur rapi, dan teknologi modern.",
  },
  {
    icon: ArrowUpRight,
    text: "Bantuan teknis upload aplikasi ke Google Play Store sesuai regulasi Google.",
  },
  {
    icon: ShieldCheck,
    text: "Layanan keamanan siber hanya dalam koridor defensif, legal, dan atas izin tertulis pemilik sistem.",
  },
  {
    icon: Code2,
    text: "Penerapan teknologi Web3 dan blockchain yang aman tanpa janji spekulasi finansial.",
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />
      
      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-8 lg:pb-0 pt-4">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col pt-4 relative justify-center">
          {/* Status Pill */}
          <div 
            className="inline-flex bg-white/60 max-w-full rounded-2xl sm:rounded-full mb-8 py-1.5 pr-5 pl-1.5 shadow-sm backdrop-blur-sm items-center"
            style={{
              position: 'relative',
              // @ts-expect-error CSS custom properties
              '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
              '--border-radius-before': '9999px'
            }}
          >
            <div className="w-6 h-6 shrink-0 rounded-full bg-zinc-900 text-white flex items-center justify-center mr-3">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-zinc-600 tracking-wide">
              <span className="text-zinc-900">Wahyu Andika Putra · Terbuka untuk proyek baru</span>
            </span>
          </div>

          {/* Headline */}
          <h1 className="leading-[0.95] lg:text-[4.5rem] text-4xl font-medium text-zinc-900 tracking-tighter mb-8">
            Pengembang
            {' '}<span className="block gradient-text font-light">Website dan Aplikasi</span>
            {' '}<span className="block">Mobile</span>
          </h1>

          {/* Subheadline */}
          <p className="text-sm text-zinc-500 font-medium max-w-md mb-10 leading-relaxed tracking-wide border-l-2 border-zinc-200 pl-6">
            Halo, saya <span className="text-zinc-900 font-semibold">Wahyu Andika Putra</span>. Saya membantu pembuatan website, pembuatan aplikasi mobile, jasa upload aplikasi ke Play Store, keamanan siber defensif, dan Web3. Bekerja langsung secara transparan dari Jawa Tengah, Indonesia.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <Link 
              href={contactHref('other')}
              className="btn-primary hover:scale-[1.02] transition-all flex group shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 text-sm font-medium text-zinc-900 rounded-full py-3 px-6 gap-3 items-center justify-between"
            >
              <span className="text-sm font-medium tracking-tight">Kirimkan rencana proyek Anda</span>
              <span className="flex items-center justify-center rounded-full bg-black/10 px-3 py-1">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </Link>
            <Link 
              href="/projects"
              className="btn-secondary hover:bg-zinc-50 transition-all flex text-sm font-medium rounded-full py-3 px-6 gap-2 items-center"
              style={{
                boxShadow: '0 18px 35px rgba(31, 41, 55, 0.25), 0 0 0 1px rgba(209, 213, 219, 0.3)',
                position: 'relative',
                // @ts-expect-error CSS custom properties
                '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.8))',
                '--border-radius-before': '9999px'
              }}
            >
              <span className="text-sm font-medium text-black/60 tracking-tight">Lihat portofolio</span>
              <ArrowRight className="w-4 h-4 text-zinc-500" />
            </Link>
          </div>
          <p className="text-xs text-zinc-500 font-medium lg:mb-14 mb-10">
            Saya membaca setiap pesan secara langsung dan merespons dalam waktu 24 jam.
          </p>

          {/* Footer Stats with Curved Lines */}
          <div className="flex flex-wrap gap-2 md:gap-6 mt-auto items-center">
            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                  Fokus
                </p>
                <p className="text-sm text-zinc-900 font-medium">Web dan Mobile</p>
              </div>
              <div className="curve-separator opacity-60 ml-4 md:ml-8" />
            </div>

            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                  Layanan Khusus
                </p>
                <p className="text-sm text-zinc-900 font-medium">Upload Play Store</p>
              </div>
              <div className="curve-separator md:ml-8 opacity-60 ml-4" />
            </div>

            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 transition-colors">
                  Lokasi
                </p>
                <p className="text-sm text-zinc-900 font-medium">Wonosobo / Semarang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="lg:col-span-5 h-full min-h-[400px] lg:min-h-0 relative group perspective-midrange">
          <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/20 transition-all duration-700 ease-out border border-white/20">
            <Image
              src="/foto-profil.webp"
              alt="Wahyu Andika Putra, pengembang web dan aplikasi mobile"
              fill
              className="transition-transform duration-[2s] ease-in-out group-hover:scale-110 object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-zinc-900/10" />

            <div className="flex flex-col p-8 absolute inset-0 justify-between">
              <div className="flex items-start justify-between">
                <div 
                  className="flex gap-2 bg-gradient-to-b from-white/10 to-white/0 rounded-full py-1.5 px-3 items-center"
                  style={{
                    position: 'relative',
                    // @ts-expect-error CSS custom properties
                    '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
                    '--border-radius-before': '9999px'
                  }}
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <span className="text-[10px] uppercase font-semibold text-white tracking-wide">Menerima proyek baru</span>
                </div>
              </div>

              <div 
                className="self-end transform group-hover:translate-y-0 transition-transform duration-700 ease-out bg-gradient-to-b from-white/10 to-white/0 w-full max-w-[240px] rounded-xl p-4 backdrop-blur translate-y-4"
                style={{
                  position: 'relative',
                  // @ts-expect-error CSS custom properties
                  '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0))',
                  '--border-radius-before': '12px'
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                      W
                    </div>
                    <span className="text-xs text-white font-medium">Wahyu Andika Putra</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Remote</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/60 uppercase">Keahlian</span>
                  <span className="text-sm text-white font-medium">Web, Mobile dan Security</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-12 lg:my-16 opacity-60" />

      {/* Services Bento Grid Section */}
      <section className="flex flex-col gap-10 w-full relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
          <div className="max-w-2xl">
            <h2 className="md:text-5xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
              Layanan teknis
              <span className="gradient-text"> yang disediakan</span>
            </h2>
            <p className="leading-relaxed text-base font-normal text-zinc-500">
              Solusi pengembangan perangkat lunak dengan pendekatan jujur dan spesifik sesuai kebutuhan Anda.
            </p>
          </div>
          <Link 
            href="/contact" 
            className="group flex items-center gap-2 hover:text-orange-500 transition-colors text-sm font-normal text-zinc-900 pb-1"
          >
            Konsultasikan proyek Anda
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid-cols-1 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="bento-card group relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-3 text-zinc-400">
                  <service.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-2 tracking-tight group-hover:text-orange-500 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                  {service.description}
                </p>
              </div>
              
              <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-orange-500" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-12 lg:my-16 opacity-60" />

      {/* Features Row */}
      <section className="flex flex-col gap-16 w-full relative">
        <div className="max-w-2xl px-1 -mb-6">
          <h2 className="md:text-5xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
            Prinsip kerja
            <span className="gradient-text"> dan komitmen</span>
          </h2>
          <p className="leading-relaxed text-base font-normal text-zinc-500">
            Bekerja langsung dengan pengembang yang merancang, menulis kode, dan bertanggung jawab penuh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div className="text-zinc-900">
                <feature.icon className="w-7 h-7" />
              </div>
              <p className="leading-relaxed text-base font-medium text-zinc-900">
                {feature.text}
              </p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="max-w-3xl w-full" aria-labelledby="home-faq">
          <h2 id="home-faq" className="text-2xl md:text-3xl font-medium text-zinc-900 tracking-tighter mb-6">
            Pertanyaan seputar kerja sama
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm open:shadow-md">
                <summary className="cursor-pointer list-none font-semibold text-zinc-900 flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-orange-500 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Main CTA Card */}
        <div className="overflow-hidden min-h-[400px] shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl">
          <div 
            className="absolute inset-0 opacity-10" 
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px'
            }}
          />

          <div className="flex flex-col p-8 md:p-12 lg:p-16 justify-center min-h-[400px] relative">
            <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-3xl">
              Sampaikan rencana proyek yang ingin Anda bangun
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl font-medium">
              Sampaikan gambaran produk digital Anda. Saya membaca setiap pesan dan memberikan arahan teknis yang jelas.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Link 
                href={contactHref('other')}
                className="group flex items-center gap-3 bg-white hover:bg-zinc-100 transition-all text-zinc-900 text-sm font-medium rounded-full px-6 py-3 w-fit shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Mulai diskusi proyek</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-12 lg:my-16 opacity-60" />

      {/* Recent Blog Posts */}
      <section className="flex flex-col gap-10 w-full relative cv-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-1">
          <div className="max-w-2xl">
            <h2 className="md:text-5xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
              Artikel
              <span className="gradient-text"> terbaru</span>
            </h2>
            <p className="leading-relaxed text-base font-normal text-zinc-500">
              Wawasan seputar pengembangan aplikasi, arsitektur website, dan keamanan teknologi.
            </p>
          </div>
          <Link 
            href="/blog" 
            className="group flex items-center gap-2 hover:text-orange-500 transition-colors text-sm font-normal text-zinc-900 pb-1"
          >
            Lihat semua artikel
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        <Suspense fallback={<PostsFallback />}>
          <Posts />
        </Suspense>
      </section>
    </>
  )
}
