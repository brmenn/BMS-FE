import { useState } from 'react'
import { cn } from '@/lib/utils'
import lumba from '@/assets/logo/lumba.png'

/**
 * The hero mockup and the dashboard preview both show the same student, so both
 * read from one asset in `src/assets/logo/`. Drop a replacement at
 * `src/assets/logo/lumba.png` and it is picked up everywhere; until then the initials
 * placeholder keeps the composition intact.
 */
export function StudentPhoto({
  className,
  fallbackClassName,
  initials = 'AP',
  src = lumba,
  alt = 'Siswa BMS sedang mengelola tabungan sekolah',
}: {
  className?: string
  fallbackClassName?: string
  initials?: string
  src?: string
  alt?: string
}) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          'flex shrink-0 items-center justify-center bg-gradient-to-br from-[#bbd6ff] via-[#83a4ff] to-[#3675ff] font-bold text-[#002c8e]',
          fallbackClassName ?? 'text-3xl',
          className,
        )}
      >
        {initials}
      </span>
    )
  }

  return (
    <img
      alt={alt}
      className={cn('shrink-0 object-cover', className)}
      onError={() => setFailed(true)}
      src={src}
    />
  )
}