import { ChevronDown, Landmark, User } from 'lucide-react'

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] bg-white px-6 shadow-[0px_1px_2px_#0000000d]">
      <div className="flex min-w-0 items-center gap-2">
        <Landmark className="h-[18px] w-[22px] shrink-0 text-[#121c2a]" aria-hidden="true" />
        <p className="truncate text-base font-bold tracking-[-0.5px] text-[#121c2a] sm:text-xl sm:leading-7">
          BMS Siswa&nbsp;&nbsp; |&nbsp;&nbsp; SMKS Muhammadiyah 1 Genteng
        </p>
      </div>
      <button
        aria-label="Menu profil"
        className="flex shrink-0 items-center gap-2 rounded-xl border border-solid border-[#c3c6d766] bg-white px-3 py-2 text-[#434655] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
        type="button"
      >
        <User className="h-[18px] w-[18px]" aria-hidden="true" />
        <ChevronDown className="hidden h-4 w-4 sm:block" aria-hidden="true" />
      </button>
    </header>
  )
}
