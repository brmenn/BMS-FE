import { ChevronDown } from 'lucide-react'

export function SuperAdminTopbar() {
  return (
    <header className="sticky top-0 z-10 flex h-[65px] w-full items-center justify-between border-b border-[#c3c6d7] bg-white px-6 shadow-[0px_1px_2px_#0000000d]">
      <div className="flex items-center gap-2">
        <div className="flex flex-col items-start">
          <span className="text-lg font-semibold leading-6 tracking-[-0.45px] text-[#121c2a]">
            BMS Super Admin
          </span>
        </div>
        <p className="text-base font-bold leading-7 tracking-[-0.5px] text-[#121c2a] sm:text-xl">
          |&nbsp;&nbsp; SMKS Muhammadiyah 1 Genteng
        </p>
      </div>
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