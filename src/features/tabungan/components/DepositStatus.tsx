import { CheckCircle2, Receipt } from 'lucide-react'

interface DepositStatusProps {
  onReceiptClick: () => void
}

export function DepositStatus({ onReceiptClick }: DepositStatusProps) {
  return (
    <article className="flex flex-col gap-5 overflow-hidden rounded-2xl border border-[#a7f3d0]/80 bg-white p-6 shadow-[0px_1px_2px_#0000000d] lg:col-span-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#ecfdf5]">
            <CheckCircle2 className="h-5 w-5 text-[#006329]" aria-hidden="true" />
          </span>
          <div className="flex flex-col gap-1 pt-0.5">
            <h2 className="text-base font-bold leading-6 text-[#121c2a]">Setoran Berhasil</h2>
            <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
              Hari ini, 09:41 WIB
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 rounded-xl border border-[#c3c6d7]/30 bg-[#f8f9ff] p-4">
        <div className="flex items-baseline justify-between gap-3">
          <span className="text-xs leading-[18px] text-[#434655]">Nominal Setoran</span>
          <strong className="text-xl font-bold leading-7 tracking-[-0.1px] text-[#006329]">
            + Rp 500.000
          </strong>
        </div>

        <span className="h-px w-full bg-[#c3c6d7]/20" aria-hidden="true" />

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs leading-[18px] text-[#434655]">Saldo Anda sekarang:</span>
          <span className="text-xs font-semibold leading-[18px] text-[#121c2a]">
            Rp 5.000.000
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xs leading-[18px] text-[#434655]">Kode transaksi:</span>
          <span className="font-mono text-xs leading-4 tracking-[0.24px] text-[#004ac6]">
            TRX-20261001-001
          </span>
        </div>
      </div>

      <button
        className="mt-auto inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#004ac6]/30 bg-[#f8f9ff] text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6] transition-colors hover:bg-[#eff4ff]"
        onClick={onReceiptClick}
        type="button"
      >
        <Receipt className="h-[13.5px] w-[15px] shrink-0" aria-hidden="true" />
        Lihat Resi Tabungan
      </button>
    </article>
  )
}