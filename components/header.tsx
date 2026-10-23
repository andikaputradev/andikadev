"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import { Menu, ChevronDown, ArrowRight } from "lucide-react"
import dynamic from "next/dynamic"
import { ThemeToggle } from "@/components/theme-toggle"
import { buildWhatsAppUrl } from "@/lib/contact-services"

const MobileMenu = dynamic(() => import("./mobile-menu"), { ssr: false })

interface NavigationItem {
  href: string
  label: string
  children?: NavigationItem[]
  external?: boolean
}

interface HeaderProps {
  hasBlog?: boolean
}

export function Header({ hasBlog = false }: HeaderProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenOpened, setHasBeenOpened] = useState(false)
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({})
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)

  const navigationItems: NavigationItem[] = [
    { href: '/', label: 'Beranda' },
    { href: '/tentang', label: 'Tentang' },
    {
      href: '/layanan',
      label: 'Layanan',
      children: [
        { href: '/layanan/pembuatan-website', label: 'Pembuatan website' },
        { href: '/layanan/pembuatan-aplikasi', label: 'Pembuatan aplikasi' },
        { href: '/layanan/upload-play-store', label: 'Upload Play Store' },
        { href: '/layanan/keamanan-siber', label: 'Keamanan siber' },
        { href: '/layanan/web3-blockchain', label: 'Web3 dan blockchain' },
      ],
    },
    ...(hasBlog ? [{ href: '/blog', label: 'Blog' }] : []),
    { href: '/kontak', label: 'Kontak' },
  ]

  const handleDropdownEnter = (href: string | null) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    setActiveDropdown(href)
  }

  const handleDropdownLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setActiveDropdown(null), 200)
  }

  // Toggle submenu expansion
  const toggleSubmenu = (href: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [href]: !prev[href]
    }))
  }

  const handleToggleMenu = () => {
    setHasBeenOpened(true)
    setIsOpen(prev => !prev)
  }

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const headerClass =
    "flex md:mb-16 md:gap-0 z-50 mb-10 relative gap-x-6 gap-y-6 items-center justify-between pt-6 md:pt-10 xl:pt-12 px-6 md:px-10 xl:px-12"

  return (
    <header className={headerClass}>
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity">
        <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 border border-zinc-200/60 dark:border-zinc-700 shadow-xs">
          <Image
            src="/logo.png"
            alt="Logo Andika Putra Dev"
            width={32}
            height={32}
            priority
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-medium tracking-tight">ANDIKA<span className="text-zinc-400">DEV</span></span>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex uppercase text-xs font-medium text-zinc-500 dark:text-zinc-400 tracking-widest glass-nav rounded-full py-2 px-6 gap-x-8 items-center">
        {navigationItems.map((item) => (
          <div 
            key={item.href} 
            className="relative"
            onMouseEnter={() => handleDropdownEnter(item.children ? item.href : null)}
            onMouseLeave={handleDropdownLeave}
          >
            <Link
              href={item.href}
              className={cn(
                "hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-300 flex items-center gap-1 py-2",
                pathname === item.href || pathname?.startsWith(item.href + '/')
                  ? "text-zinc-900 dark:text-zinc-100 font-semibold"
                  : ""
              )}
            >
              {item.label}
              {item.children && (
                <ChevronDown className="w-3 h-3" />
              )}
            </Link>

            {/* Dropdown menu */}
            {item.children && (
              <>
                <div 
                  className="absolute left-0 right-0 top-full h-4"
                  onMouseEnter={() => handleDropdownEnter(item.href)}
                  onMouseLeave={handleDropdownLeave}
                />
                {activeDropdown === item.href && (
                  <div 
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-60 z-50"
                    onMouseEnter={() => handleDropdownEnter(item.href)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="rounded-xl shadow-xl py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "block px-5 py-3 text-sm font-medium tracking-wide transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-orange-500 normal-case",
                            pathname === child.href
                              ? "text-orange-500 bg-zinc-50 dark:bg-zinc-800 font-semibold"
                              : "text-zinc-600 dark:text-zinc-300"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </nav>

      <div className="hidden md:flex items-center gap-3">
        <ThemeToggle />
        <a 
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary flex items-center gap-2 group text-sm font-medium text-zinc-900 tracking-tight rounded-full py-3 px-6 transition-all hover:-translate-y-0.5"
        >
          <span className="text-sm font-medium tracking-tight">Konsultasi lewat WhatsApp</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Mobile Actions: Theme Toggle and Menu Button */}
      <div className="flex items-center gap-2 md:hidden">
        <ThemeToggle />
        <button
          className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          onClick={handleToggleMenu}
          onMouseEnter={() => import("./mobile-menu")}
          onTouchStart={() => import("./mobile-menu")}
          aria-label={isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
          aria-expanded={isOpen}
        >
          <Menu className="h-6 w-6 text-zinc-900 dark:text-zinc-100" />
        </button>
      </div>

      {/* Mobile Navigation Overlay (lazy-loaded with framer-motion) */}
      {hasBeenOpened && (
        <MobileMenu
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          pathname={pathname}
          navigationItems={navigationItems}
          expandedItems={expandedItems}
          toggleSubmenu={toggleSubmenu}
        />
      )}
    </header>
  )
}
