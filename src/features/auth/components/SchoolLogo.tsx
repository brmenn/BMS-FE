import { useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * The source logo is square (500x500), so every box it is dropped into is wider than the
 * artwork: `object-contain` keeps it from being stretched. Drop a replacement at
 * `public/school-logo.png` and it is picked up automatically; until then the monogram
 * keeps the layout from collapsing.
 */
export function SchoolLogo({ className = 'h-6 w-6' }: { className?: string }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        className={cn(
          className,
          'flex shrink-0 items-center justify-center rounded bg-slate-900 text-[10px] font-bold tracking-tight text-white',
        )}
      >
        BMS
      </span>
    )
  }

  return (
    <img
      alt="Logo BMS SMKS Muhammadiyah 1 Genteng"
      className={cn(className, 'shrink-0 object-contain')}
      onError={() => setFailed(true)}
      src="/school-logo.png"
    />
  )
}
