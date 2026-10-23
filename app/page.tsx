import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { getPosts } from '@/lib/blog'
import { ArrowRight, ArrowUpRight, Code2, Globe, ShieldCheck, Smartphone, Award, MessagesSquare, FileText, CheckCircle2, Laptop } from 'lucide-react'
import type { Metadata } from 'next'
import { buildPageGraph, buildPageMetadata, type FaqItem } from '@/lib/seo'
import { JsonLd } from '@/components/seo/json-ld'
import { HomeContent } from '@/components/home-content'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const PostsFallback = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
    {[1, 2, 3].map((i) => (
      <div key={i} className="animate-pulse bg-zinc-100 h-80 rounded-2xl" />
    ))}
  </div>
)

const pageTitle = 'Jasa Pembuatan Website dan Aplikasi'
const pageDescription =
  'Wahyu Andika Putra menyediakan jasa pembuatan website, aplikasi mobile, upload Google Play Store, keamanan siber defensif, dan Web3 di Wonosobo dan Semarang.'

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path: '/',
})

const faqs: (FaqItem & { link?: { href: string; label: string } })[] = [
  {
    question: 'Bagaimana cara memulai konsultasi proyek?',
    answer:
      'Anda dapat menghubungi saya langsung melalui WhatsApp atau mengisi formulir kontak di situs ini. Sampaikan gambaran kebutuhan Anda dan saya akan merespons dengan pertimbangan teknis yang relevan.',
  },
  {
    question: 'Layanan apa saja yang Anda kerjakan?',
    answer:
      'Fokus layanan saya mencakup pembuatan website, pembuatan aplikasi mobile, jasa upload aplikasi ke Google Play Store, pengujian keamanan siber defensif, serta pengembangan Web3.',
  },
  {
    question: 'Di mana lokasi kerja Anda?',
    answer:
      'Saya berbasis di Wonosobo dan Semarang, Jawa Tengah. Komunikasi dan pengerjaan proyek dapat berlangsung secara jarak jauh.',
  },
  {
    question: 'Apakah melayani klien di luar Wonosobo dan Semarang?',
    answer:
      'Ya. Koordinasi dapat dilakukan secara daring melalui pertemuan video, pesan teks, dan repositori kode.',
  },
  {
    question: 'Teknologi apa saja yang Anda gunakan dalam pengembangan sistem?',
    answer:
      'Teknologi disesuaikan dengan arsitektur sistem, antara lain Next.js, React, TypeScript, Flutter, Kotlin, Express.js, Laravel, Python, serta Solidity untuk kontrak pintar Web3.',
  },
  {
    question: 'Bagaimana batasan pelaksanaan layanan keamanan siber?',
    answer:
      'Layanan keamanan siber hanya dilakukan dalam koridor defensif, legal, dan wajib memiliki izin tertulis resmi dari pemilik sistem. Saya tidak menyediakan layanan peretasan atau akses tanpa hak.',
  },
  {
    question: 'Apakah layanan Web3 menyediakan saran atau janji keuntungan finansial?',
    answer:
      'Tidak. Layanan Web3 berfokus murni pada rekayasa perangkat lunak, integrasi smart contract, dan arsitektur terdesentralisasi. Saya tidak memberikan nasihat investasi atau janji keuntungan finansial apa pun.',
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
    title: 'Pembuatan website',
    description: 'Website berkecepatan tinggi dengan tampilan rapi di perangkat ponsel dan kemudahan pengelolaan konten.',
    href: '/layanan/pembuatan-website',
  },
  {
    icon: Smartphone,
    title: 'Pembuatan aplikasi mobile',
    description: 'Aplikasi Android dan multi platform yang stabil untuk kelancaran operasional usaha Anda.',
    href: '/layanan/pembuatan-aplikasi',
  },
  {
    icon: ArrowUpRight,
    title: 'Upload aplikasi ke Play Store',
    description: 'Pendampingan rilis aplikasi ke Google Play Store secara tertata agar memenuhi seluruh standar Google.',
    href: '/layanan/upload-play-store',
  },
  {
    icon: ShieldCheck,
    title: 'Keamanan siber defensif',
    description: 'Evaluasi dan penguatan pertahanan sistem digital secara etis atas izin tertulis untuk mencegah gangguan.',
    href: '/layanan/keamanan-siber',
  },
  {
    icon: Code2,
    title: 'Web3 dan blockchain',
    description: 'Pengembangan kontrak pintar dan integrasi aplikasi terdesentralisasi yang aman tanpa janji spekulasi finansial.',
    href: '/layanan/web3-blockchain',
  },
]

const workflowSteps = [
  {
    number: '01',
    icon: MessagesSquare,
    title: 'Konsultasi kebutuhan',
    description: 'Kita mendiskusikan masalah, alur kerja yang diinginkan, dan hasil yang ingin dicapai melalui sistem baru.',
  },
  {
    number: '02',
    icon: FileText,
    title: 'Penawaran dan ruang lingkup',
    description: 'Saya menyusun batasan teknis yang realistis, daftar modul yang akan dikerjakan, serta kesepakatan bersama.',
  },
  {
    number: '03',
    icon: Laptop,
    title: 'Pengerjaan bertahap dengan tinjauan',
    description: 'Implementasi kode dikerjakan bertahap dengan pelaporan berkala agar Anda dapat menguji fungsi aplikasi secara langsung.',
  },
  {
    number: '04',
    icon: CheckCircle2,
    title: 'Serah terima dan dukungan',
    description: 'Pemasangan sistem ke server produksi, penyerahan akses serta dokumentasi, dan pendampingan awal penggunaan.',
  },
]

export default function HomePage() {
  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-8 lg:pb-0 pt-4 items-start">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col pt-4 relative justify-center">
          {/* Status Pill */}
          <div
            className="inline-flex bg-white/60 max-w-full rounded-2xl sm:rounded-full mb-8 py-1.5 pr-5 pl-1.5 shadow-sm backdrop-blur-sm items-center"
            style={{
              position: 'relative',
              // @ts-expect-error CSS custom properties
              '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
              '--border-radius-before': '9999px',
            }}
          >
            <div className="w-6 h-6 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center mr-3">
              <Award className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
              <span className="text-zinc-900 dark:text-zinc-100">Wahyu Andika Putra · Terbuka untuk diskusi proyek</span>
            </span>
          </div>

          {/* Headline with outcome for the reader */}
          <h1 className="leading-[0.95] lg:text-[4.25rem] text-4xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tighter mb-8">
            Website dan aplikasi andal
            {' '}<span className="block gradient-text font-light">yang siap memajukan</span>
            {' '}<span className="block">bisnis Anda</span>
          </h1>

          {/* Subheadline (one single clear sentence) */}
          <p className="text-sm text-zinc-600 dark:text-zinc-300 font-medium max-w-xl mb-10 leading-relaxed tracking-wide border-l-2 border-zinc-200 dark:border-zinc-700 pl-6">
            Saya Wahyu Andika Putra, pengembang yang merancang website, mengembangkan aplikasi mobile, membantu rilis Play Store, serta memperkuat keamanan sistem untuk klien di Wonosobo, Semarang, dan sekitarnya.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hover:scale-[1.02] transition-all flex group shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 text-sm font-medium text-zinc-900 rounded-full py-3 px-6 gap-3 items-center justify-between"
            >
              <span className="text-sm font-medium tracking-tight">Konsultasi lewat WhatsApp</span>
              <span className="flex items-center justify-center rounded-full bg-black/10 px-3 py-1">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </a>
            <Link
              href="/layanan"
              className="btn-secondary hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex text-sm font-medium rounded-full py-3 px-6 gap-2 items-center text-zinc-700 dark:text-zinc-100"
              style={{
                boxShadow: '0 18px 35px rgba(31, 41, 55, 0.25), 0 0 0 1px rgba(209, 213, 219, 0.3)',
                position: 'relative',
                // @ts-expect-error CSS custom properties
                '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.4), rgba(255, 255, 255, 0.8))',
                '--border-radius-before': '9999px',
              }}
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-100 tracking-tight">Lihat layanan</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-zinc-300" />
            </Link>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium lg:mb-14 mb-10">
            Pesan Anda dibaca langsung oleh pengembang tanpa perantara.
          </p>

          {/* Footer Stats with Curved Lines */}
          <div className="flex flex-wrap gap-2 md:gap-6 mt-auto items-center">
            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  Fokus
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">Web dan Mobile</p>
              </div>
              <div className="curve-separator opacity-60 ml-4 md:ml-8" />
            </div>

            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  Layanan Khusus
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">Upload Play Store</p>
              </div>
              <div className="curve-separator md:ml-8 opacity-60 ml-4" />
            </div>

            <div className="flex items-center group cursor-default">
              <div className="px-1 text-center">
                <p className="text-[10px] font-semibold text-zinc-400 uppercase tracking-widest mb-1 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  Lokasi
                </p>
                <p className="text-sm text-zinc-900 dark:text-zinc-100 font-medium">Wonosobo / Semarang</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Card */}
        <div className="lg:col-span-5 relative group perspective-midrange">
          <div className="relative aspect-[4/5] w-full rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/20 border border-white/20">
            <Image
              src="/foto-profil.webp"
              alt="Foto Wahyu Andika Putra"
              fill
              className="transition-transform duration-[2s] ease-in-out group-hover:scale-105 object-cover"
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
                    '--border-radius-before': '9999px',
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
                  '--border-radius-before': '12px',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-white text-[10px] font-bold">
                      W
                    </div>
                    <span className="text-xs text-white font-medium">Wahyu Andika Putra</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 font-mono">Tersedia</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] text-white/60 uppercase">Fokus</span>
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
              Solusi pengembangan perangkat lunak yang disesuaikan dengan kebutuhan nyata sistem Anda.
            </p>
          </div>
          <Link
            href="/layanan"
            className="group flex items-center gap-2 hover:text-orange-500 dark:hover:text-orange-400 transition-colors text-sm font-normal text-zinc-900 dark:text-zinc-100 pb-1"
          >
            Lihat semua layanan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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

      {/* Workflow Section (Cara Kerja) */}
      <section className="flex flex-col gap-12 w-full relative">
        <div className="max-w-2xl px-1">
          <h2 className="md:text-5xl text-3xl font-medium text-zinc-900 tracking-tighter mb-4">
            Alur kerja sama
            <span className="gradient-text"> proyek</span>
          </h2>
          <p className="leading-relaxed text-base font-normal text-zinc-500">
            Empat langkah terstruktur dari perumusan kebutuhan teknis sampai sistem siap digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step) => (
            <div
              key={step.number}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-zinc-200/60 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-semibold text-zinc-400">{step.number}</span>
                </div>
                <h3 className="text-base font-semibold text-zinc-900 mb-2">{step.title}</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl w-full mt-6" aria-labelledby="home-faq">
          <h2 id="home-faq" className="text-2xl md:text-3xl font-medium text-zinc-900 dark:text-zinc-100 tracking-tighter mb-6">
            Pertanyaan seputar kerja sama
          </h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details key={faq.question} className="group bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-2xl p-5 shadow-sm open:shadow-md border border-zinc-200/60 dark:border-zinc-800">
                <summary className="cursor-pointer list-none font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-between gap-4">
                  {faq.question}
                  <span className="text-orange-500 transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                </summary>
                <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Main CTA Card */}
        <div className="overflow-hidden min-h-[380px] shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl mt-4">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
              backgroundSize: '40px 40px',
            }}
          />

          <div className="flex flex-col p-8 md:p-12 lg:p-16 justify-center min-h-[380px] relative">
            <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-3xl">
              Siap mendiskusikan kebutuhan sistem Anda?
            </h2>
            <p className="text-zinc-400 mb-8 max-w-xl font-medium leading-relaxed">
              Sampaikan rencana proyek website atau aplikasi Anda untuk mendapatkan evaluasi teknis yang terarah.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 bg-white hover:bg-zinc-100 transition-all text-zinc-900 text-sm font-medium rounded-full px-6 py-3 w-fit shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <span>Konsultasi lewat WhatsApp</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                href={contactHref('other')}
                className="group flex items-center gap-3 bg-white/10 hover:bg-white/20 transition-all text-white text-sm font-medium rounded-full px-6 py-3 w-fit"
              >
                <span>Isi formulir kontak</span>
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
