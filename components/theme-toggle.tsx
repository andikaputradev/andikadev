'use client'

import { useTheme } from 'next-themes'
import { useSyncExternalStore } from 'react'
import { Sun, Moon } from 'lucide-react'

const emptySubscribe = () => () => {}

function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
}

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme()
  const mounted = useMounted()

  if (!mounted) {
    return (
      <div
        className={`w-9 h-9 rounded-full border border-zinc-200/60 dark:border-zinc-800 flex items-center justify-center opacity-0 ${className ?? ''}`}
        aria-hidden="true"
      />
    )
  }

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      title={isDark ? 'Ganti ke tema terang' : 'Ganti ke tema gelap'}
      className={`w-9 h-9 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white bg-white/60 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/80 backdrop-blur-sm transition-all hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${className ?? ''}`}
    >
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-400" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 -rotate-12 hover:rotate-0 text-zinc-700" />
      )}
    </button>
  )
}
