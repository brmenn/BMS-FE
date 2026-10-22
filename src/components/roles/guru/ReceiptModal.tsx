import { CircleCheck, FileCheck2, Printer, QrCode, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import logoKet from '@/assets/logo/logoKet.png'
import type { ReceiptData, ReceiptRow } from './receipt-data'

export function ReceiptModal({ data, onClose }: { data: ReceiptData; onClose: () => void }) {
  return (
    <div
      aria-labelledby="receipt-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup bukti transaksi"
        className="absolute inset-0 cursor-default bg-[#121c2a]/45"
        onClick={onClose}
        type="button"
      />

      <div className="modal-enter relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 bg-[#004ac6] px-4 py-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-[18px] w-[18px] shrink-0 text-white" aria-hidden="true" />
            <p className="text-base font-semibold leading-6 text-white" id="receipt-title">
              Bukti Transaksi
              <br />
              Resmi
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-white/20 px-2 py-1 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-white">
              TERVALIDASI
            </span>
            <button
              aria-label="Tutup"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ReceiptContent rows={data.rows} status={data.status} watermark={data.watermark} />
        </div>

        <div className="shrink-0 bg-[#e6eeff] px-4 py-3 text-center">
          <p className="text-xs leading-4 text-[#434655]">
            Dokumen ini merupakan bukti pembayaran sah yang dikeluarkan oleh Kasir Keuangan SMKS
            Muhammadiyah 1 Genteng.
          </p>
        </div>
      </div>
    </div>
  )
}

function ReceiptContent({
  rows,
  status,
  watermark,
}: {
  rows: ReceiptRow[]
  status: string
  watermark: string
}) {
  return (
    <div className="relative flex flex-col items-center gap-2 px-6 pt-3 pb-4">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5"
      >
        <span className="inline-block -rotate-[25deg] rounded-3xl border-8 border-[#004ac6] p-4 text-4xl font-bold tracking-[-0.72px] text-[#004ac6]">
          {watermark}
        </span>
      </span>

      <img
        alt="Logo Bank Mini Sekolah"
        aria-hidden="true"
        className="h-20 w-auto max-w-[210px] object-contain"
        src={logoKet}
      />

      <div className="flex w-full flex-col items-center gap-1 border-b-2 border-dashed border-[#c3c6d799] pb-4 text-center">
        <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#121c2a]">
          SMKS MUHAMMADIYAH 1 GENTENG
        </p>
        <p className="text-[10px] leading-[15px] text-[#434655]">
          Jl. KH. Ahmad Dahlan No. 9, Genteng, Banyuwangi
        </p>
        <span className="mt-1 rounded-md bg-[#e6eeff] px-3 py-1 text-xs font-bold leading-4 tracking-[0.6px] text-[#121c2a]">
          BUKTI TRANSAKSI
        </span>
      </div>

      <dl className="flex w-full flex-col gap-2.5 border-b-2 border-dashed border-[#c3c6d799] pb-4">
        {rows.map((item) => (
          <div className="flex items-start justify-between gap-4" key={item.label}>
            <dt className="shrink-0 text-xs leading-[18px] text-[#434655]">{item.label}</dt>
            <dd
              className={cn(
                'text-right text-xs leading-[18px]',
                item.mono && 'font-mono',
                item.accent
                  ? 'text-base font-bold leading-6 text-[#004ac6]'
                  : 'font-semibold text-[#121c2a]',
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7ffc97] px-3 py-1">
            <CircleCheck className="h-3 w-3 text-[#002109]" aria-hidden="true" />
            <span className="text-xs font-bold leading-4 tracking-[0.6px] text-[#002109]">
              {status}
            </span>
          </span>
          <span className="font-mono text-[10px] leading-[15px] text-[#737686]">ID: BMS-M1G-OK</span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-[#c3c6d799] p-1">
            <QrCode className="h-10 w-10 text-[#121c2a]" aria-hidden="true" />
          </span>
          <span className="text-[9px] leading-[13.5px] text-[#737686]">Sah Bendahara</span>
        </div>
      </div>

      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004ac6] py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#0040b3]"
        type="button"
      >
        <Printer className="h-4 w-4 text-white" aria-hidden="true" />
        CETAK RESI
      </button>
    </div>
  )
}
