import { useEffect } from 'react'
import { CircleCheck, Clock3, CreditCard, ReceiptText, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'

export interface InstallmentRecord {
  number: number
  date: string
  total: number
  status: string
}

interface InstallmentListModalProps {
  installments: InstallmentRecord[]
  remainingAmount: number
  nextAmount: number
  onClose: () => void
  onPay: () => void
}

export function InstallmentListModal({
  installments,
  remainingAmount,
  nextAmount,
  onClose,
  onPay,
}: InstallmentListModalProps) {
  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      body.style.overflow = previousOverflow
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      aria-labelledby="installment-list-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup daftar cicilan"
        className="absolute inset-0 cursor-default bg-[#121c2a]/45"
        onClick={onClose}
        type="button"
      />

      <div className="modal-enter relative flex max-h-[90vh] w-full max-w-[600px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d799] px-6 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#dee9fc] bg-[#eff4ff] shadow-[0px_1px_2px_#0000000d]">
              <ReceiptText className="h-5 w-5 text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h1
                className="text-xl font-semibold leading-[25px] tracking-[-0.1px] text-[#121c2a]"
                id="installment-list-title"
              >
                Semua Cicilan
              </h1>
              <p className="text-xs leading-[18px] text-[#434655]">
                Riwayat pembayaran dan kewajiban angsuran pinjaman Anda
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="flex flex-col gap-1 rounded-xl border border-[#c3c6d766] bg-[#f8f9ff] p-4">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                SISA TAGIHAN
              </span>
              <span className="text-lg font-bold leading-[26px] text-[#121c2a]">
                {formatMoney(remainingAmount)}
              </span>
            </div>
            <div className="flex flex-col gap-1 rounded-xl border border-[#dee9fc] bg-[#eff4ff] p-4">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                CICILAN BERIKUTNYA
              </span>
              <span className="text-lg font-bold leading-[26px] text-[#004ac6]">
                {formatMoney(nextAmount)}
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center justify-between gap-3 border-b border-[#d9e3f6] pb-2">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#434655]">
                RIWAYAT &amp; JADWAL CICILAN
              </span>
              <span className="text-[11px] font-medium leading-[14px] text-[#737686]">
                {installments.length} cicilan
              </span>
            </div>

            {installments.map((item) => {
              const paid = item.status === 'LUNAS'

              return (
                <div
                  className="flex items-center justify-between gap-3 border-b border-[#e6eeff] py-3.5 last:border-b-0"
                  key={item.number}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                        paid ? 'bg-[#ecfdf5] text-[#047857]' : 'bg-[#eff4ff] text-[#004ac6]',
                      )}
                    >
                      {paid ? (
                        <CircleCheck className="h-4 w-4" aria-hidden="true" />
                      ) : (
                        <Clock3 className="h-4 w-4" aria-hidden="true" />
                      )}
                    </span>
                    <div className="flex min-w-0 flex-col gap-0.5">
                      <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                        Cicilan {String(item.number).padStart(2, '0')}
                      </span>
                      <span className="text-xs leading-[18px] text-[#737686]">{item.date}</span>
                    </div>
                  </div>

                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                      {formatMoney(item.total)}
                    </span>
                    <span
                      className={cn(
                        'inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold leading-[14px] tracking-[0.24px]',
                        paid
                          ? 'bg-[#d1fae5] text-[#047857]'
                          : 'bg-[#eff4ff] text-[#004ac6]',
                      )}
                    >
                      {paid ? 'Lunas' : 'Belum jatuh tempo'}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c3c6d799] bg-white px-6 py-4">
          <span className="text-xs leading-[18px] text-[#434655]">
            Menampilkan {installments.length} cicilan
          </span>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-10 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
              onClick={onClose}
              type="button"
            >
              Tutup
            </button>
            <button
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition hover:bg-[#1d4ed8]"
              onClick={onPay}
              type="button"
            >
              <CreditCard className="h-4 w-4" aria-hidden="true" />
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
