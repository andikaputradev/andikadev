import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link 
      href="/" 
      className={cn(
        "flex items-center gap-2.5 text-zinc-900 dark:text-zinc-100 hover:opacity-80 transition-opacity",
        className
      )}
    >
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
      <span className="text-lg font-medium tracking-tight">
        ANDIKA<span className="text-zinc-400">DEV</span>
      </span>
    </Link>
  )
}
