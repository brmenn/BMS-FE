import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Check, Printer, ReceiptText, X } from 'lucide-react'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'

export interface DashboardTransaction {
  id: string
  type: string
  title: string
  status: string
  date: string
  amount: number
  source: string
  teller: string
}

interface TransactionDetailModalProps {
  transaction: DashboardTransaction
  student: { fullName: string; classProgram: string }
  onClose: () => void
}

export function TransactionDetailModal({
  transaction,
  student,
  onClose,
}: TransactionDetailModalProps) {
  const isDeposit = transaction.type === 'SETORAN'
  const statusLabel =
    transaction.status === 'BERHASIL'
      ? 'Berhasil'
      : transaction.status === 'MENUNGGU'
        ? 'Menunggu'
        : 'Selesai'

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown as unknown as EventListener)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown as unknown as EventListener)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        aria-label="Tutup detail transaksi"
        className="absolute inset-0 cursor-default bg-[#121c2a]/45"
        onClick={onClose}
        type="button"
      />

      <div
        aria-describedby="transaction-status"
        aria-labelledby="transaction-title"
        aria-modal="true"
        className="modal-enter relative z-10 flex w-[468px] max-w-[calc(100%-32px)] flex-col items-start gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_8px_10px_-6px_#1725540a,0px_20px_25px_-5px_#1725541a]"
        role="dialog"
      >
        <header className="flex w-full items-center justify-between border-b border-[#c3c6d7] pb-3">
          <div className="inline-flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#ecfdf5]">
              <ReceiptText className="h-[13px] w-3 text-[#047857]" aria-hidden="true" />
            </span>
            <h1 className="text-base leading-6 font-bold text-[#121c2a]" id="transaction-title">
              Detail Transaksi
            </h1>
          </div>

          <div className="flex items-center gap-2">
            <div
              aria-label={`Status transaksi: ${statusLabel.toLowerCase()}`}
              className="inline-flex items-center gap-1 rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-3 py-1"
              id="transaction-status"
              role="status"
            >
              <Check className="h-3 w-3 text-[#047857]" aria-hidden="true" />
              <span className="text-[11px] leading-[14px] font-bold tracking-[0.44px] text-[#047857]">
                {statusLabel}
              </span>
            </div>

            <button
              aria-label="Tutup detail transaksi"
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#f5f7fa] text-[#737b89] transition-colors hover:bg-[#edf0f4] hover:text-[#303846]"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <section
          aria-labelledby="transaction-amount-title"
          className="flex w-full flex-col items-center gap-1 rounded-xl border border-[#c3c6d7] bg-[#eff4ff] py-4"
        >
          <h2 className="text-xs leading-[18px] text-[#434655]" id="transaction-amount-title">
            Nominal Transaksi
          </h2>
          <p
            className={cn(
              'text-2xl leading-8 font-bold tracking-[-0.24px]',
              isDeposit ? 'text-[#16a34a]' : 'text-[#121c2a]',
            )}
          >
            {formatMoney(transaction.amount)}
          </p>
          <p className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-[#737686]">
            Biaya Administrasi: Rp 0 (Gratis)
          </p>
        </section>

        <section
          aria-labelledby="transaction-information-title"
          className="flex w-full flex-col gap-2.5"
        >
          <h2 className="sr-only" id="transaction-information-title">
            Informasi transaksi
          </h2>
          <dl className="flex w-full flex-col gap-2.5">
            <DetailRow label="Kode Transaksi" value={transaction.id} mono />
            <DetailRow label="Jenis" value={isDeposit ? 'Setoran Tabungan' : 'Penarikan Tabungan'} strong />
            <DetailRow label="Waktu" value={transaction.date} />
            <DetailRow
              label="Nama Siswa"
              value={`${student.fullName} (${student.classProgram})`}
            />
            <DetailRow label="Petugas Teller" value={transaction.teller} last />
          </dl>
        </section>

        <section aria-labelledby="receipt-action-title" className="flex w-full flex-col items-start pt-4">
          <h2 className="sr-only" id="receipt-action-title">
            Aksi resi transaksi
          </h2>
          <div className="flex w-full flex-col items-start border-t border-[#c3c6d7] pt-4">
            <button
              aria-label="Lihat atau cetak resi transaksi"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#004ac6] px-4 py-2.5 text-base leading-6 font-medium text-[#004ac6] transition-colors hover:bg-[#f5f8ff] active:bg-[#eaf0ff]"
              onClick={() => window.print()}
              type="button"
            >
              <Printer className="h-[15px] w-[15px] shrink-0" aria-hidden="true" />
              <span>Lihat / Cetak Resi</span>
            </button>
          </div>
        </section>
      </div>
    </div>,
    document.body,
  )
}

function DetailRow({
  label,
  value,
  mono = false,
  strong = false,
  last = false,
}: {
  label: string
  value: string
  mono?: boolean
  strong?: boolean
  last?: boolean
}) {
  return (
    <div
      className={cn(
        'flex w-full items-start justify-between gap-4 py-1',
        !last && 'border-b border-dashed border-[#c3c6d7]',
      )}
    >
      <dt className="text-sm leading-5 text-[#434655]">{label}</dt>
      <dd
        className={cn(
          'text-right text-sm leading-5 text-[#121c2a]',
          mono && 'font-mono font-bold',
          strong && 'font-semibold',
        )}
      >
        {value}
      </dd>
    </div>
  )
}
