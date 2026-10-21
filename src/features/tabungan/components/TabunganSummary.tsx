import { Copy, ShieldCheck, Wallet } from 'lucide-react'

const BALANCE = 'Rp 4.500.000'
const ACCOUNT_NO = 'GKR-001234'

export function TabunganSummary() {
  return (
    <article className="relative flex flex-col overflow-hidden rounded-2xl border border-[#004ac6]/20 bg-gradient-to-br from-[#eff4ff] via-white to-white p-8 shadow-[0px_1px_2px_#0000000d] lg:col-span-8">
      {/* Ambient decor */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -bottom-8 h-48 w-48 rounded-full bg-[#004ac6]/5 blur-[20px]"
      />
      {/* Watermark wallet */}
      <Wallet
        aria-hidden="true"
        className="pointer-events-none absolute top-4 right-4 h-[90px] w-[95px] text-[#004ac6]/5"
        strokeWidth={1}
      />

      <div className="relative flex flex-col gap-4 pb-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium leading-5 text-[#434655]">Saldo Tabungan</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-[#d1fae5] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#006329]" />
            Akun Aktif
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-[36px] font-bold leading-[44px] tracking-[-0.9px] text-[#121c2a]">
            {BALANCE}
          </p>

          <div className="flex items-center gap-2">
            <p className="text-sm leading-5 text-[#434655]">
              Rekening: <span className="font-semibold text-[#121c2a]">{ACCOUNT_NO}</span>
            </p>
            <button
              aria-label="Salin nomor rekening"
              className="flex items-center justify-center rounded p-1 text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
              onClick={() => navigator.clipboard?.writeText(ACCOUNT_NO)}
              type="button"
            >
              <Copy className="h-[13px] w-[11px]" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative mt-auto flex border-t border-[#c3c6d7]/30 pt-8 lg:items-center">
        <div className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-[13px] w-[11px] shrink-0 text-[#434655]" aria-hidden="true" />
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] whitespace-nowrap text-[#434655]">
            Diasuransikan LPS &amp; Audit Mutu
          </span>
        </div>
      </div>
    </article>
  )
}