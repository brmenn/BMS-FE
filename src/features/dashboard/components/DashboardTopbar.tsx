import { type ReactNode } from 'react'
import { ChevronDown, Landmark } from 'lucide-react'

const defaultBrand = (
  <div className="flex min-w-0 items-center gap-2">
    <Landmark className="h-[18px] w-[22px] shrink-0 text-[#121c2a]" aria-hidden="true" />
    <p className="truncate text-base font-bold tracking-[-0.5px] text-[#121c2a] sm:text-xl sm:leading-7">
      SMKS Muhammadiyah 1 Genteng
    </p>
  </div>
)

interface DashboardTopbarProps {
  brand?: ReactNode
}

export function DashboardTopbar({ brand = defaultBrand }: DashboardTopbarProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] bg-white px-6 shadow-[0px_1px_2px_#0000000d]">
      {brand}
      <button
        aria-label="Menu profil"
        className="flex shrink-0 items-center gap-2 rounded-xl border border-solid border-[#c3c6d766] bg-white px-3 py-2 text-[#434655] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
        type="button"
      >
        <img
          alt="Profil"
          className="h-7 w-7 rounded-full object-cover"
          src="/avatar.png"
        />
        <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden="true" />
      </button>
    </header>
  )
}
