import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { LiveClock } from './live-clock'
import { WhatsAppIcon } from '@/components/icons/whatsapp'
import { TelegramIcon } from '@/components/icons/telegram'
import { InstagramIcon } from '@/components/icons/instagram'
import { TikTokIcon } from '@/components/icons/tiktok'
import { FacebookIcon } from '@/components/icons/facebook'
import { XIcon } from '@/components/icons/x'
import { GithubIcon } from '@/components/icons/github'
import { LinkedinIcon } from '@/components/icons/linkedin'

interface FooterProps {
  hasBlog?: boolean
}

const servicesList = [
  { name: 'Pembuatan website', href: '/layanan/pembuatan-website' },
  { name: 'Pembuatan aplikasi mobile', href: '/layanan/pembuatan-aplikasi' },
  { name: 'Jasa upload Play Store', href: '/layanan/upload-play-store' },
  { name: 'Keamanan siber defensif', href: '/layanan/keamanan-siber' },
  { name: 'Web3 dan blockchain', href: '/layanan/web3-blockchain' },
]

const socialLinks = [
  { name: 'WhatsApp', href: 'https://wa.me/6287730139582', icon: WhatsAppIcon },
  { name: 'Email', href: 'mailto:wahyuandikaputra.co.id@gmail.com', icon: Mail },
  { name: 'LinkedIn', href: 'https://linkedin.com/in/wahyu-andika-putra', icon: LinkedinIcon },
  { name: 'GitHub', href: 'https://github.com/andikaputradev', icon: GithubIcon },
  { name: 'Telegram', href: 'https://t.me/andikaputradev', icon: TelegramIcon },
  { name: 'Instagram', href: 'https://instagram.com/andikaputradev', icon: InstagramIcon },
  { name: 'TikTok', href: 'https://tiktok.com/@andikaputradev', icon: TikTokIcon },
  { name: 'Facebook', href: 'https://facebook.com/andikaputradev', icon: FacebookIcon },
  { name: 'X', href: 'https://x.com/andikaputradev', icon: XIcon },
]

const legalLinks = [
  { name: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
]

export function Footer({ hasBlog = false }: FooterProps) {
  const navigationLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Layanan', href: '/layanan' },
    ...(hasBlog ? [{ name: 'Blog', href: '/blog' }] : []),
    { name: 'Kontak', href: '/kontak' },
    { name: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  ]

  return (
    <footer className="z-10 w-full relative px-6 md:px-10 xl:px-12 pb-8">
      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 opacity-60" />

      {/* Top Section: Brand + Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
        {/* Left: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-1">
            <h2 className="leading-none md:text-6xl lg:text-7xl text-5xl font-semibold text-neutral-800 dark:text-zinc-100 tracking-tighter">
              Andika Putra Dev
            </h2>
          </div>
          <p className="md:text-2xl text-xl font-light italic text-zinc-500 dark:text-zinc-400">
            Website, aplikasi mobile, keamanan siber dan Web3
          </p>
        </div>

        {/* Right: Location & Time */}
        <div className="flex flex-col gap-4 lg:items-end lg:text-right">
          <div className="flex items-start gap-2 lg:flex-row-reverse lg:text-right">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse" />
            <p className="leading-snug md:text-xl text-zinc-700 dark:text-zinc-300 text-base font-light tracking-tight max-w-md">
              Menerima proyek baru pembuatan aplikasi dan website. Berbasis di Wonosobo / Semarang, Jawa Tengah, Indonesia.
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 lg:flex-row-reverse">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="opacity-50">
              <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2" opacity="0.5" />
              <path d="M12 6a1 1 0 0 1 1 1v4.586l2.707 2.707a1 1 0 0 1-1.414 1.414l-3-3A1 1 0 0 1 11 12V7a1 1 0 0 1 1-1" />
            </svg>
            <span className="text-sm font-medium">Waktu Indonesia Barat (WIB)</span>
          </div>
          <LiveClock />
        </div>
      </div>

      {/* Bottom Section: Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {/* Column 1: Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Navigasi</h3>
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-normal"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 2: Services */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Layanan</h3>
          {servicesList.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-normal"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Social & Contact */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Kontak dan Profil</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-2">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-700 dark:text-zinc-300 hover:text-orange-500 dark:hover:text-orange-400 transition-colors font-normal flex items-center gap-2 group py-0.5"
              >
                <link.icon className="w-4 h-4 text-zinc-500 group-hover:text-orange-500 transition-colors shrink-0" />
                <span>{link.name}</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all ml-auto" />
              </a>
            ))}
          </div>
        </div>

        {/* Column 4: Contact CTA */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Konsultasi proyek</h3>
          <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
            Kirimkan pesan kebutuhan sistem Anda. Saya membaca dan merespons secara langsung.
          </p>
          <a
            href="https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary rounded-full py-3 px-6 text-sm font-medium text-center inline-flex items-center justify-center gap-2 w-fit shadow-sm hover:shadow-md"
          >
            <span>Konsultasi lewat WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="mt-12 pt-8 border-t border-zinc-200/60 dark:border-zinc-800">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            &copy; {new Date().getFullYear()} Andika Putra Dev. Seluruh hak cipta dilindungi.
          </p>
          <nav className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-orange-500 dark:hover:text-orange-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
