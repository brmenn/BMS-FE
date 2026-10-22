import { Wallet } from 'lucide-react'
import illustration from '@/assets/illustration/tablet-plant-margin.svg'

export function BrandPanel() {
  return (
    <aside className="relative hidden w-[356px] shrink-0 flex-col items-start overflow-hidden bg-[linear-gradient(180deg,#93c5fd_0%,#60a5fa_32%,#3b82f6_68%,#2563eb_100%)] p-10 lg:flex">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-24px] top-10 h-36 w-36 rotate-12 rounded-3xl border border-white/20 bg-white/10 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]" />
        <div className="absolute right-12 top-28 h-24 w-24 -rotate-12 rounded-2xl border border-white/30 bg-white/15 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]" />
        <div className="absolute right-2 top-48 h-20 w-20 rotate-45 rounded-2xl border border-white/20 bg-white/10 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]" />
        <div className="absolute right-[-16px] top-72 h-28 w-28 rotate-12 rounded-3xl border border-white/20 bg-white/10 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]" />
      </div>

      <div className="relative flex w-full shrink-0 flex-col items-start pb-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 shadow-[0px_1px_2px_#0000000d] backdrop-blur-[6px]">
          <Wallet aria-hidden="true" className="h-5 w-5 text-white" />
        </div>
      </div>

      <div className="relative flex w-full flex-1 flex-col items-start">
        <p className="max-w-[240px] text-[34px] font-extrabold leading-[42.5px] tracking-[-0.85px] text-white">
          One click to go
          <br />
          all digital.
        </p>
      </div>

      <img
        alt="Tablet menampilkan ringkasan tabungan sekolah"
        className="relative -mb-10 mt-auto w-[267px] max-w-full"
        src={illustration}
      />
    </aside>
  )
}
