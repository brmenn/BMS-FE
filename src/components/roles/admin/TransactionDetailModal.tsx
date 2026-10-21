import { useEffect, useState } from 'react'
import {
  Banknote,
  Check,
  Copy,
  Download,
  IdCard,
  Landmark,
  Printer,
  QrCode,
  ShieldCheck,
  Stamp,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'
import type { CashFlowTransaction } from '@/components/roles/admin/transactions'

interface TransactionDetailModalProps {
  transaction: CashFlowTransaction
  onClose: () => void
}

const fieldLabelClass = 'text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]'
const fieldValueClass = 'text-base font-semibold leading-6 text-[#121c2a]'
const fieldNoteClass = 'text-xs leading-[18px] text-[#737686]'
const sectionLabelClass = 'text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]'

export function TransactionDetailModal({ transaction, onClose }: TransactionDetailModalProps) {
  const [copiedRef, setCopiedRef] = useState(false)

  useEffect(() => {
    if (!copiedRef) return
    const timeout = window.setTimeout(() => setCopiedRef(false), 1500)
    return () => window.clearTimeout(timeout)
  }, [copiedRef])

  const MethodIcon = transaction.method === 'transfer' ? Landmark : Banknote
  const nominalHeading =
    transaction.direction === 'masuk' ? 'TOTAL NOMINAL KAS MASUK' : 'TOTAL NOMINAL KAS KELUAR'

  const handleCopyReference = async () => {
    try {
      await navigator.clipboard.writeText(transaction.reference)
      setCopiedRef(true)
    } catch {
      setCopiedRef(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      <div className="fixed inset-0 bg-[#000000]/40 print:hidden" onClick={onClose} />
      <article className="relative z-10 flex w-full max-w-[620px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-[0px_8px_32px_#00000026] scale-[0.45] sm:scale-[0.55] md:scale-[0.65] lg:scale-[0.72] origin-center transition-transform print:scale-100 print:shadow-none print:border-none print:max-w-none print:w-full print:my-0">
        <button
          className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition-colors hover:bg-[#f8f9ff] print:hidden"
          onClick={onClose}
          type="button"
        >
          <X className="h-5 w-5 text-[#737686]" aria-hidden="true" />
        </button>

        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <header className="flex w-full flex-col items-start gap-4 border-b border-[#d1fae5] bg-gradient-to-r from-[#ecfdf5] via-[#f0fdf4]/70 to-[#ecfdf5] px-8 py-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="inline-flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7ffc97] shadow-[0px_1px_2px_#0000000d]">
                <Check className="h-[18px] w-[18px] text-[#006329]" aria-hidden="true" />
              </span>
              <div className="flex flex-col items-start">
                <span className="text-[11px] leading-[14px] font-semibold tracking-[0.55px] whitespace-nowrap text-[#006329]">
                  STATUS TRANSAKSI
                </span>
                <strong
                  className="text-base leading-6 font-bold tracking-[-0.4px] whitespace-nowrap text-[#006329]"
                  id="receipt-title"
                >
                  {transaction.status}
                </strong>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-[#c3c6d780] bg-white/90 px-3 py-1.5">
              <ShieldCheck className="h-4 w-4 text-[#737686]" aria-hidden="true" />
              <span className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] whitespace-nowrap text-[#737686]">
                Terverifikasi Sistem
              </span>
            </div>
          </header>

          <div className="flex w-full flex-col gap-4 p-5 sm:p-6">
            <section
              aria-label="Ringkasan transaksi"
              className="flex w-full flex-col gap-4 border-b border-dashed border-[#c3c6d7] pb-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex flex-col items-start">
                <span className={sectionLabelClass}>NOMOR REFERENSI TRANSAKSI</span>
                <div className="mt-1 flex items-center gap-2">
                  <strong className="font-mono text-lg sm:text-xl leading-7 font-bold tracking-[-0.5px] whitespace-nowrap text-[#121c2a]">
                    {transaction.reference}
                  </strong>
                  <button
                    aria-label="Salin nomor referensi transaksi"
                    className="flex h-8 w-8 items-center justify-center rounded transition-colors hover:bg-[#f8f9ff] print:hidden"
                    onClick={handleCopyReference}
                    type="button"
                  >
                    {copiedRef ? (
                      <Check className="h-3.5 w-3.5 text-[#006329]" aria-hidden="true" />
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-[#737686]" aria-hidden="true" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col items-start sm:items-end">
                <span className={sectionLabelClass}>{nominalHeading}</span>
                <strong className="text-2xl sm:text-[28px] leading-9 font-bold tracking-[-0.7px] whitespace-nowrap text-[#004ac6]">
                  {formatMoney(transaction.amount)}
                </strong>
              </div>
            </section>

            <section
              aria-label="Rincian transaksi"
              className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-4"
            >
              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Nama Pengguna</span>
                <div className="flex flex-col gap-1">
                  <strong className={fieldValueClass}>{transaction.userName}</strong>
                  <p className={fieldNoteClass}>{transaction.userMeta}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Kelompok</span>
                <span className="mt-0.5 inline-flex w-fit items-center rounded-full bg-[#dee9fc] px-2.5 py-1 text-[11px] leading-[14px] font-medium tracking-[0.44px] whitespace-nowrap text-[#004ac6]">
                  {transaction.group}
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Jenis Transaksi</span>
                <div className="flex flex-col gap-1">
                  <strong className={fieldValueClass}>{transaction.transactionType}</strong>
                  <span className={fieldNoteClass}>{transaction.transactionNote}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Nominal Terbayar</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <strong className="text-base leading-6 font-bold whitespace-nowrap text-[#004ac6]">
                    {formatMoney(transaction.amount)}
                  </strong>
                  <span className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] whitespace-nowrap text-[#737686]">
                    {transaction.paidNote}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Metode Pembayaran</span>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5">
                    <MethodIcon className="h-[15px] w-[15px] text-[#121c2a]" aria-hidden="true" />
                    <strong className={cn(fieldValueClass, 'whitespace-nowrap')}>
                      {transaction.methodLabel}
                    </strong>
                  </div>
                  <p className={fieldNoteClass}>{transaction.methodNote}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className={fieldLabelClass}>Waktu Pembukuan</span>
                <div className="flex flex-col gap-1">
                  <strong className={fieldValueClass}>{transaction.bookedAt}</strong>
                  <p className={fieldNoteClass}>{transaction.bookedNote}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1 border-t border-[#c3c6d766] pt-2 sm:col-span-2">
                <span className={fieldLabelClass}>Petugas Validasi</span>
                <div className="flex w-full flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <IdCard className="h-[18px] w-[18px] text-[#121c2a]" aria-hidden="true" />
                    <strong className={cn(fieldValueClass, 'whitespace-nowrap')}>
                      {transaction.officerName}
                    </strong>
                    <span className={cn(fieldNoteClass, 'whitespace-nowrap')}>
                      {transaction.officerMeta}
                    </span>
                  </div>
                  <span className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] whitespace-nowrap text-[#737686]">
                    {transaction.officerTerminal}
                  </span>
                </div>
              </div>
            </section>

            <section aria-label="Verifikasi digital" className="flex w-full flex-col pt-3">
              <div className="flex w-full flex-col gap-4 rounded-xl border border-[#c3c6d799] bg-[#eff4ff] p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="inline-flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-[#c3c6d799] bg-white p-1">
                    <QrCode className="h-12 w-12 text-[#121c2a]" aria-hidden="true" />
                  </span>
                  <div className="flex flex-col items-start gap-1">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
                      <p className="text-xs leading-4 font-semibold tracking-[0.24px] text-[#121c2a]">
                        Tervalidasi Digital BMS SMKS Muhammadiyah 1 Genteng
                      </p>
                    </div>
                    <p className="text-xs leading-[18px] text-[#737686]">
                      Integritas enkripsi SHA-256 • Dokumen sah tanpa tanda tangan basah
                    </p>
                    <div className="flex flex-col items-start pt-0.5">
                      <span className="font-mono text-[11px] leading-[14px] font-bold tracking-[0.44px] text-[#c3c6d7]">
                        {transaction.hash}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex w-full flex-col items-start border-t border-[#c3c6d7] pt-4 sm:w-auto sm:items-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-4">
                  <Stamp className="h-6 w-6 text-[#737686]" aria-hidden="true" />
                  <span className="pt-1 text-[10px] leading-[15px] font-semibold tracking-[0.5px] whitespace-nowrap text-[#737686]">
                    SAH & SAHIH
                  </span>
                </div>
              </div>
            </section>
          </div>
        </div>

        <footer className="flex w-full flex-col items-start gap-4 border-t border-[#c3c6d799] bg-[#e6eeff] px-8 py-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
          <button
            className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl bg-[#2563eb] px-6 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
            onClick={() => window.print()}
            type="button"
          >
            <Printer className="h-4 w-4 text-white" aria-hidden="true" />
            <span className="text-sm leading-5 font-medium whitespace-nowrap text-white">
              Cetak Resi Transaksi
            </span>
          </button>

          <button
            className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-4 transition-colors hover:bg-[#f8f9ff]"
            onClick={() => window.print()}
            type="button"
          >
            <Download className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
            <span className="text-sm leading-5 font-medium whitespace-nowrap text-[#121c2a]">
              Unduh PDF
            </span>
          </button>
        </footer>
      </article>
    </div>
  )
}