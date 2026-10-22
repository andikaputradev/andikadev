import Link from 'next/link'
import { contactHref } from '@/lib/contact-services'
import { ArrowUpRight } from 'lucide-react'
import { LiveClock } from './live-clock'

const navigationLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Projects', href: '/projects' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
]

const servicesList = [
  { name: 'Pembuatan Website', href: '/contact' },
  { name: 'Pembuatan Aplikasi Mobile', href: '/contact' },
  { name: 'Jasa Upload Play Store', href: '/contact' },
  { name: 'Keamanan Siber Defensif', href: '/contact' },
  { name: 'Web3 dan Blockchain', href: '/contact' },
]

const socialLinks = [
  { name: 'LinkedIn', href: 'https://linkedin.com/in/wahyu-andika-putra' },
  { name: 'GitHub', href: 'https://github.com/andikaputradev' },
  { name: 'WhatsApp', href: 'https://wa.me/6287730139582' },
]

const legalLinks = [
  { name: 'Privacy Policy', href: '/privacy-policy' },
  { name: 'Terms of Service', href: '/terms-of-service' },
]

export function Footer() {
  return (
    <footer className="z-10 w-full relative px-6 md:px-10 xl:px-12 pb-8">
      {/* Separator */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent mb-12 opacity-60" />

      {/* Top Section: Brand + Location */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-12">
        {/* Left: Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-start gap-1">
            <h2 className="leading-none md:text-6xl lg:text-7xl text-5xl font-semibold text-neutral-800 tracking-tighter">
              Andika Putra Dev
            </h2>
          </div>
          <p className="md:text-2xl text-xl font-light italic text-zinc-500">
            Website, aplikasi mobile, keamanan siber dan Web3
          </p>
        </div>

        {/* Right: Location & Time */}
        <div className="flex flex-col gap-4 lg:items-end lg:text-right">
          <div className="flex items-start gap-2 lg:flex-row-reverse lg:text-right">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 animate-pulse" />
            <p className="leading-snug md:text-xl text-zinc-700 text-base font-light tracking-tight max-w-md">
              Menerima proyek baru pembuatan aplikasi dan website. Berbasis di Jawa Tengah, Indonesia.
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-500 lg:flex-row-reverse">
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
              className="text-sm md:text-base text-zinc-700 hover:text-orange-500 transition-colors font-normal"
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
              className="text-sm md:text-base text-zinc-700 hover:text-orange-500 transition-colors font-normal"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Column 3: Social */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Terhubung</h3>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm md:text-base text-zinc-700 hover:text-orange-500 transition-colors font-normal flex items-center gap-2 group"
            >
              {link.name}
              <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
            </a>
          ))}
        </div>

        {/* Column 4: Contact CTA */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-widest mb-1">Mulai proyek</h3>
          <p className="text-sm text-zinc-500 mb-4">
            Kirimkan detail kebutuhan proyek Anda. Saya akan merespons dalam waktu 24 jam.
          </p>
          <Link
            href={contactHref('other')}
            className="btn-primary rounded-full py-3 px-6 text-sm font-medium text-center inline-flex items-center justify-center gap-2 w-fit"
          >
            Hubungi saya untuk diskusi proyek
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="mt-12 pt-8 border-t border-zinc-200/60">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {new Date().getFullYear()} Andika Putra Dev. Seluruh hak cipta dilindungi.
          </p>
          <nav className="flex items-center gap-6">
            {legalLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className="text-sm text-zinc-500 hover:text-orange-500 transition-colors"
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
