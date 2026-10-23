'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'

interface NavigationItem {
  href: string
  label: string
  children?: NavigationItem[]
}

interface NavigationProps {
  hasBlog?: boolean
}

export function Navigation({ hasBlog = false }: NavigationProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = React.useState(false)
  const [expandedItems, setExpandedItems] = React.useState<Record<string, boolean>>({})
  const [mounted, setMounted] = React.useState(false)

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

  React.useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  const toggleSubmenu = (href: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [href]: !prev[href],
    }))
  }

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  if (!mounted) {
    return null
  }

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
        {navigationItems.map((item) => (
          <div key={item.href} className="relative group">
            <Link
              href={item.href}
              className={cn(
                'text-base font-semibold transition-colors hover:text-foreground/80 flex items-center',
                pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href))
                  ? 'text-wp-gold'
                  : 'text-foreground/60',
              )}
            >
              {item.label}
              {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
            </Link>

            {item.children && (
              <div className="absolute left-0 mt-2 w-64 rounded-md shadow-lg py-2 bg-background border border-wp-gold/40 dark:border-wp-gold/50 opacity-0 group-hover:opacity-100 transition-all duration-300 invisible group-hover:visible">
                <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent" />
                {item.children.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className={cn(
                      'block px-4 py-3 text-base font-medium transition-colors hover:text-foreground/80 hover:bg-accent',
                      pathname === child.href ? 'text-foreground' : 'text-foreground/60',
                    )}
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}

        <a
          href="https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary rounded-full py-2.5 px-5 text-sm font-medium inline-flex items-center gap-2"
        >
          <span>Konsultasi lewat WhatsApp</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
        aria-expanded={isOpen}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 min-h-screen w-screen z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-[20px]"
            onClick={() => setIsOpen(false)}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
            className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-2xl overflow-y-auto"
          >
            <div className="absolute top-4 right-4 z-50 w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Tutup menu navigasi"
                  className="hover:bg-white/20 dark:hover:bg-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>
            </div>

            <div className="flex min-h-screen items-center justify-center bg-white/50 dark:bg-black/50 backdrop-blur-xl py-20">
              <div className="w-full max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
                <nav className="flex flex-col items-center justify-center space-y-6">
                  {navigationItems.map((item) => (
                    <div key={item.href} className="w-full text-center">
                      {item.children ? (
                        <>
                          <button
                            onClick={() => toggleSubmenu(item.href)}
                            aria-expanded={expandedItems[item.href] || false}
                            className={cn(
                              'text-3xl font-medium transition-colors hover:text-foreground/80 inline-flex items-center p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                              pathname && (pathname === item.href || pathname.startsWith(item.href + '/'))
                                ? 'text-foreground'
                                : 'text-foreground/60',
                            )}
                          >
                            {item.label}
                            {expandedItems[item.href] ? (
                              <ChevronUp className="w-6 h-6 ml-2" />
                            ) : (
                              <ChevronDown className="w-6 h-6 ml-2" />
                            )}
                          </button>

                          {expandedItems[item.href] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 space-y-4"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className={cn(
                                    'block text-2xl font-medium transition-colors hover:text-foreground/80 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                                    pathname === child.href ? 'text-foreground' : 'text-foreground/60',
                                  )}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={cn(
                            'text-3xl font-medium transition-colors hover:text-foreground/80 inline-flex items-center py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500',
                            pathname === item.href ? 'text-foreground' : 'text-foreground/60',
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}

                  <a
                    href="https://wa.me/6287730139582?text=Halo%20Wahyu%20Andika%20Putra%2C%20saya%20ingin%20berkonsultasi%20mengenai%20kebutuhan%20proyek."
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="mt-6 btn-primary rounded-full py-3.5 px-8 text-sm font-semibold flex items-center justify-center gap-3 text-zinc-900 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  >
                    <span>Konsultasi lewat WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </nav>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}
