import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import {
  Code2,
  ArrowRight,
  MapPin,
  Briefcase,
  ArrowUpRight,
  Languages,
  Globe,
  ShieldCheck,
  Smartphone,
  Layers,
  Terminal,
  Cpu,
  Lock,
  Server,
  BarChart3,
} from 'lucide-react'
import { GithubIcon } from '@/components/icons/github'
import { LinkedinIcon } from '@/components/icons/linkedin'
import { TelegramIcon } from '@/components/icons/telegram'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { blurDataURLs } from '@/lib/utils'
import { JsonLd } from '@/components/seo/json-ld'
import { buildPageGraph, buildPageMetadata } from '@/lib/seo'
import { contactHref, buildWhatsAppUrl } from '@/lib/contact-services'

export const revalidate = 86400

const path = '/tentang'
const pageTitle = 'Tentang Wahyu Andika Putra'
const pageDescription =
  'Profil Wahyu Andika Putra, pengembang website, aplikasi mobile, praktisi keamanan siber defensif, dan Web3 dari Wonosobo dan Semarang.'

const structuredData = buildPageGraph({
  path,
  name: pageTitle,
  description: pageDescription,
  breadcrumbs: [{ name: 'Tentang', path }],
})

export const metadata: Metadata = buildPageMetadata({
  title: pageTitle,
  description: pageDescription,
  path,
  brand: false,
})

const servicesList = [
  {
    title: 'Pembuatan website',
    desc: 'Membangun website dengan performa cepat, arsitektur kode rapi, dan kemudahan pengelolaan.',
    icon: Globe,
    href: '/layanan/pembuatan-website',
  },
  {
    title: 'Pembuatan aplikasi mobile',
    desc: 'Pengembangan aplikasi mobile yang responsif dan stabil untuk kebutuhan operasional.',
    icon: Smartphone,
    href: '/layanan/pembuatan-aplikasi',
  },
  {
    title: 'Jasa upload ke Play Store',
    desc: 'Pendampingan teknis dan proses rilis aplikasi ke Google Play Store secara resmi.',
    icon: ArrowUpRight,
    href: '/layanan/upload-play-store',
  },
  {
    title: 'Keamanan siber defensif',
    desc: 'Pengujian dan evaluasi celah keamanan sistem dalam koridor legal atas izin tertulis.',
    icon: ShieldCheck,
    href: '/layanan/keamanan-siber',
  },
  {
    title: 'Web3 dan blockchain',
    desc: 'Pengembangan kontrak pintar dan integrasi aplikasi terdesentralisasi yang aman.',
    icon: Code2,
    href: '/layanan/web3-blockchain',
  },
]

const techStackGroups = [
  {
    category: 'Protocol dan sistem',
    icon: Terminal,
    items: ['Rust', 'Go', 'C++', 'Python', 'Shell', 'C'],
  },
  {
    category: 'Smart contract dan Web3',
    icon: Cpu,
    items: ['Solidity', 'Ethereum', 'Hardhat', 'Foundry', 'Web3.js', 'Ethers.js'],
  },
  {
    category: 'Rekayasa keamanan',
    icon: Lock,
    items: ['OWASP', 'Semgrep', 'Trivy', 'Slither', 'Burp Suite', 'Echidna', 'Kali Linux'],
  },
  {
    category: 'Infrastruktur dan DevOps',
    icon: Server,
    items: ['Docker', 'Kubernetes', 'Terraform', 'GitHub Actions', 'Linux', 'Ansible'],
  },
  {
    category: 'Lapisan aplikasi',
    icon: Layers,
    items: ['TypeScript', 'Next.js', 'React', 'PostgreSQL', 'Redis', 'Node.js'],
  },
  {
    category: 'Riset dan analitik',
    icon: BarChart3,
    items: ['Python', 'NumPy', 'Pandas', 'Jupyter', 'R', 'SciPy'],
  },
]

export default function AboutPage() {
  return (
    <>
      <JsonLd data={structuredData} />

      {/* Hero Section */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-8 pt-4">
        {/* Left Column: Profile Image */}
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-zinc-900/20 border border-white/20">
            <Image
              src="/foto-profil.webp"
              alt="Foto Wahyu Andika Putra"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
              priority
              placeholder="blur"
              blurDataURL={blurDataURLs.avatar}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

            {/* Available Badge */}
            <div className="absolute top-6 left-6">
              <div
                className="flex gap-2 bg-gradient-to-b from-white/20 to-white/5 rounded-full py-1.5 px-3 items-center backdrop-blur-sm"
                style={{
                  position: 'relative',
                  // @ts-expect-error CSS custom properties
                  '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0))',
                  '--border-radius-before': '9999px',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-[10px] uppercase font-semibold text-white tracking-wide">Terbuka untuk proyek</span>
              </div>
            </div>

            {/* Info Card at Bottom */}
            <div className="absolute bottom-6 left-6 right-6">
              <div
                className="bg-gradient-to-b from-white/15 to-white/5 rounded-xl p-4 backdrop-blur-md"
                style={{
                  position: 'relative',
                  // @ts-expect-error CSS custom properties
                  '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0))',
                  '--border-radius-before': '12px',
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-bold">
                    W
                  </div>
                  <div>
                    <p className="text-white font-semibold">Wahyu Andika Putra</p>
                    <p className="text-white/60 text-xs">Andika Putra Dev</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80 font-medium">Website</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80 font-medium">Aplikasi</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80 font-medium">Play Store</span>
                  <span className="px-2 py-0.5 bg-white/10 rounded text-[10px] text-white/80 font-medium">Keamanan Siber</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          {/* Badge */}
          <div
            className="inline-flex bg-white/60 w-max rounded-full mb-6 py-1.5 pr-4 pl-3 shadow-sm backdrop-blur-sm items-center gap-2"
            style={{
              position: 'relative',
              // @ts-expect-error CSS custom properties
              '--border-gradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0))',
              '--border-radius-before': '9999px',
            }}
          >
            <Briefcase className="w-4 h-4 text-orange-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-zinc-600">Profil pengembang</span>
          </div>

          {/* Name */}
          <h1 className="leading-[0.95] lg:text-[4rem] text-4xl font-medium text-zinc-900 tracking-tighter mb-6">
            Wahyu Andika Putra
            {' '}<span className="block gradient-text font-light text-3xl lg:text-4xl mt-2">
              Pengembang website, aplikasi, dan keamanan siber
            </span>
          </h1>

          {/* Bio strictly based on official facts */}
          <p className="text-base text-zinc-600 font-medium max-w-xl mb-4 leading-relaxed">
            Saya Wahyu Andika Putra, pengembang di balik Andika Putra Dev. Saya berfokus pada pembuatan website, pengembangan aplikasi mobile, jasa upload aplikasi ke Google Play Store, pengujian keamanan siber defensif, serta implementasi teknologi Web3 dan blockchain.
          </p>
          <p className="text-sm text-zinc-500 max-w-xl mb-6 leading-relaxed">
            Berbasis di Wonosobo dan Semarang, Jawa Tengah, saya bekerja langsung dengan klien untuk menerjemahkan kebutuhan fungsional menjadi sistem perangkat lunak yang stabil dan aman.
          </p>

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 mb-8">
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <MapPin className="w-4 h-4 text-orange-500" />
              <span>Wonosobo / Semarang, Jawa Tengah, Indonesia</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Languages className="w-4 h-4 text-orange-500" />
              <span>Bahasa Indonesia dan Bahasa Inggris</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-10">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hover:scale-[1.02] transition-all flex group shadow-zinc-900/10 hover:shadow-2xl hover:shadow-zinc-900/20 hover:-translate-y-0.5 text-sm font-medium text-zinc-900 rounded-full py-3 px-6 gap-3 items-center"
            >
              <span className="text-sm font-medium tracking-tight">Konsultasi lewat WhatsApp</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            <Link
              href="/layanan"
              className="btn-secondary hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-all flex text-sm font-medium rounded-full py-3 px-6 gap-2 items-center text-zinc-700 dark:text-zinc-100"
              style={{
                boxShadow: '0 18px 35px rgba(31, 41, 55, 0.15), 0 0 0 1px rgba(209, 213, 219, 0.3)',
                position: 'relative',
                // @ts-expect-error CSS custom properties
                '--border-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(0, 0, 0, 0.2), rgba(255, 255, 255, 0.8))',
                '--border-radius-before': '9999px',
              }}
            >
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-100 tracking-tight">Lihat daftar layanan</span>
              <ArrowRight className="w-4 h-4 text-zinc-500 dark:text-zinc-300" />
            </Link>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-xs text-zinc-400 uppercase tracking-wider font-medium">Tautan profil</span>
            <div className="flex gap-2">
              <a
                href="https://linkedin.com/in/wahyu-andika-putra"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wahyu Andika Putra di LinkedIn"
                className="p-2 rounded-full bg-zinc-100 hover:bg-orange-100 text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/andikaputradev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wahyu Andika Putra di GitHub"
                className="p-2 rounded-full bg-zinc-100 hover:bg-orange-100 text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/andikaputradev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wahyu Andika Putra di Telegram"
                className="p-2 rounded-full bg-zinc-100 hover:bg-orange-100 text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <TelegramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/6287730139582"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Wahyu Andika Putra di WhatsApp"
                className="p-2 rounded-full bg-zinc-100 hover:bg-orange-100 text-zinc-600 hover:text-orange-500 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-12 lg:my-16 opacity-60" />

      {/* Technology Stack Section */}
      <section className="mb-12 lg:mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-zinc-900 tracking-tighter mb-4">
            Teknologi dan <span className="gradient-text">keahlian</span>
          </h2>
          <p className="text-base text-zinc-500 max-w-xl mx-auto font-medium">
            Rumpun teknologi dan kakas rekayasa perangkat lunak yang digunakan dalam pengerjaan sistem.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {techStackGroups.map((group) => (
            <div key={group.category} className="bg-zinc-50 rounded-2xl p-6 text-left border border-zinc-200/60">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4">
                <group.icon className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-zinc-900 mb-3 text-base">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 bg-white rounded-lg text-xs font-medium text-zinc-700 border border-zinc-200/80 shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent my-12 lg:my-16 opacity-60" />

      {/* Services Focus Section */}
      <section className="mb-12 lg:mb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-medium text-zinc-900 tracking-tighter mb-4">
            Fokus <span className="gradient-text">layanan</span>
          </h2>
          <p className="text-base text-zinc-500 max-w-xl mx-auto font-medium">
            Bidang teknis yang saya kerjakan untuk membantu kebutuhan digital Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="bg-zinc-50 hover:bg-zinc-100/80 rounded-2xl p-6 text-left border border-zinc-200/60 transition-colors group flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-zinc-900 mb-2 group-hover:text-orange-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed mb-4">{item.desc}</p>
              </div>
              <div className="flex items-center text-xs font-medium text-orange-500 group-hover:translate-x-1 transition-transform">
                <span>Pelajari layanan</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 lg:my-16 opacity-60" />

      {/* CTA Section */}
      <section className="overflow-hidden shadow-zinc-900/30 bg-zinc-900 rounded-[2rem] relative shadow-2xl mb-8">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="flex flex-col px-6 py-12 md:px-12 md:py-14 justify-center relative">
          <h2 className="md:text-4xl lg:text-5xl leading-tight text-3xl font-normal text-white tracking-tight mb-6 max-w-2xl">
            Punya rencana pembuatan aplikasi atau website?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl font-medium leading-relaxed">
            Sampaikan kebutuhan sistem Anda. Saya akan mempelajari kebutuhan teknisnya dan memberikan langkah pelaksanaan yang terukur.
          </p>

          <div className="flex flex-wrap gap-3">
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
              <span>Gunakan formulir kontak</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
