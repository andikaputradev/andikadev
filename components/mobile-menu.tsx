"use client"

import { useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { X, ChevronDown, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NavigationItem {
  href: string
  label: string
  children?: NavigationItem[]
  external?: boolean
}

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  pathname: string | null
  navigationItems: NavigationItem[]
  expandedItems: Record<string, boolean>
  toggleSubmenu: (href: string) => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  pathname,
  navigationItems,
  expandedItems,
  toggleSubmenu,
}: MobileMenuProps) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="md:hidden fixed inset-0 min-h-screen w-screen z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-white/30 backdrop-blur-[20px]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="absolute inset-0 glass-panel overflow-y-auto"
          >
            <div className="absolute top-6 right-6 z-50">
              <button
                onClick={onClose}
                aria-label="Tutup menu navigasi"
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
              >
                <X className="h-6 w-6 text-zinc-900" />
              </button>
            </div>

            <div className="flex min-h-screen items-center justify-center py-20 px-6">
              <nav className="flex flex-col items-center justify-center space-y-6 w-full max-w-sm">
                {navigationItems.map((item) => (
                  <div key={item.href} className="text-center w-full">
                    {item.children ? (
                      <>
                        <button
                          onClick={() => toggleSubmenu(item.href)}
                          aria-expanded={expandedItems[item.href] || false}
                          className={cn(
                            "text-3xl font-light tracking-tight transition-colors hover:text-orange-500 inline-flex items-center gap-2 p-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                            pathname?.startsWith(item.href)
                              ? "text-orange-500"
                              : "text-zinc-900"
                          )}
                        >
                          {item.label}
                          <ChevronDown
                            className={cn(
                              "w-6 h-6 transition-transform",
                              expandedItems[item.href] && "rotate-180"
                            )}
                          />
                        </button>

                        <AnimatePresence>
                          {expandedItems[item.href] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 space-y-3 overflow-hidden"
                            >
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={onClose}
                                  className={cn(
                                    "block text-xl font-light transition-colors hover:text-orange-500 py-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                                    pathname === child.href
                                      ? "text-orange-500"
                                      : "text-zinc-500"
                                  )}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className={cn(
                          "text-3xl font-light tracking-tight transition-colors hover:text-orange-500 block py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
                          pathname === item.href
                            ? "text-orange-500"
                            : "text-zinc-900"
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
                  onClick={onClose}
                  className="mt-8 btn-primary rounded-full py-3.5 px-8 text-sm font-semibold flex items-center justify-center gap-3 text-zinc-900 shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                >
                  <span>Konsultasi lewat WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </nav>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
