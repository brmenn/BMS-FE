import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  CalendarCheck,
  CheckCircle2,
  CircleDashed,
  Clock3,
  FileText,
  Landmark,
  Receipt,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export type RiwayatPinjamanStatus = 'lunas' | 'menunggu' | 'belum-lunas'

export interface RiwayatPinjamanRecord {
  id: string
  date: string
  amount: string
  status: RiwayatPinjamanStatus
  actionLabel: string
}

const STATUS_META: Record<
  RiwayatPinjamanStatus,
  { label: string; icon: LucideIcon; badgeClass: string; textClass: string }
> = {
  menunggu: {
    label: 'Menunggu Konfirmasi',
    icon: Clock3,
    badgeClass: 'bg-[#fef3c7]/60 text-[#d97706]',
    textClass: 'text-[#d97706]',
  },
  lunas: {
    label: 'Lunas',
    icon: CheckCircle2,
    badgeClass: 'bg-[#d1fae5]/70 text-[#059669]',
    textClass: 'text-[#059669]',
  },
  'belum-lunas': {
    label: 'Belum Lunas',
    icon: CircleDashed,
    badgeClass: 'bg-[#fec7c7]/60 text-[#d90606]',
    textClass: 'text-[#d90606]',
  },
}

const METHOD_META: Record<RiwayatPinjamanStatus, { label: string; icon: LucideIcon; note: string }> = {
  menunggu: {
    label: 'Transfer BSI',
    icon: Landmark,
    note: 'Menunggu verifikasi bukti transfer dari kasir',
  },
  lunas: {
    label: 'Transfer BSI',
    icon: Landmark,
    note: 'Pembayaran telah diverifikasi dan dibukukan',
  },
  'belum-lunas': {
    label: 'Cash (Kasir)',
    icon: Banknote,
    note: 'Denda keterlambatan belum dilunasi',
  },
}

const fieldLabelClass = 'text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]'
const fieldValueClass = 'text-sm font-semibold leading-5 text-[#121c2a]'
const fieldNoteClass = 'text-xs leading-[18px] text-[#737686]'

interface RiwayatPinjamanModalProps {
  record: RiwayatPinjamanRecord
  onClose: () => void
  onPay?: () => void
}

export function RiwayatPinjamanModal({ record, onClose, onPay }: RiwayatPinjamanModalProps) {
  const status = STATUS_META[record.status]
  const StatusIcon = status.icon
  const method = METHOD_META[record.status]
  const MethodIcon = method.icon

  return (
    <div
      aria-labelledby="riwayat-pinjaman-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup detail riwayat pinjaman"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[560px] origin-center scale-[0.92] flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-2xl">
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6 [&::-webkit-scrollbar]:hidden">
          <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d7] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff]">
                <FileText className="h-4 w-4 text-[#2563eb]" aria-hidden="true" />
              </span>
              <div className="flex flex-col">
                <h1
                  className="text-lg font-semibold leading-[26px] text-[#121c2a]"
                  id="riwayat-pinjaman-title"
                >
                  Detail Riwayat Pinjaman
                </h1>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Rincian mutasi cicilan pinjaman Anda
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

          <section
            aria-label="Ringkasan cicilan"
            className="flex items-center justify-between gap-4 rounded-xl border border-[#c3c6d7]/40 bg-[#f8f9ff] p-4"
          >
            <div className="flex flex-col gap-1">
              <span className={fieldLabelClass}>KODE TRANSAKSI</span>
              <span className="font-mono text-lg leading-7 font-bold tracking-[-0.5px] text-[#004ac6]">
                {record.id}
              </span>
            </div>
            <span
              className={cn(
                'inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-4',
                status.badgeClass,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" aria-hidden="true" />
              {status.label}
            </span>
          </section>

          <section aria-label="Rincian cicilan" className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-1">
              <span className={fieldLabelClass}>Tanggal Bayar</span>
              <span className={cn(fieldValueClass, 'flex items-center gap-1.5')}>
                <CalendarCheck className="h-4 w-4 shrink-0 text-[#121c2a]" aria-hidden="true" />
                {record.date}
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className={fieldLabelClass}>Nominal Cicilan</span>
              <span className={cn(fieldValueClass, 'text-[#004ac6]')}>{record.amount}</span>
            </div>

            <div className="col-span-2 flex flex-col gap-1 border-t border-[#c3c6d7]/40 pt-4">
              <span className={fieldLabelClass}>Metode Pembayaran</span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1.5">
                  <MethodIcon className="h-4 w-4 shrink-0 text-[#121c2a]" aria-hidden="true" />
                  <span className={fieldValueClass}>{method.label}</span>
                </div>
                <span className={fieldNoteClass}>{method.note}</span>
              </div>
            </div>

            <div className="col-span-2 flex flex-col gap-1">
              <span className={fieldLabelClass}>Keterangan</span>
              <span className={fieldNoteClass}>
                Cicilan ini merupakan bagian dari pokok pinjaman Rp 8.000.000 dengan tenor 24 bulan
                dan bunga 1%.
              </span>
            </div>
          </section>

          <section
            aria-label="Verifikasi"
            className="flex items-center gap-3 rounded-xl border border-[#c3c6d7]/40 bg-[#eff4ff] p-4"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white">
              <Receipt className="h-5 w-5 text-[#121c2a]" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-semibold leading-4 text-[#121c2a]">
                Tervalidasi Digital BMS
              </span>
              <span className="text-xs leading-[18px] text-[#737686]">
                Integritas enkripsi SHA-256 • dokumen sah tanpa tanda tangan basah
              </span>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#c3c6d7] px-6 py-4 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Tutup
          </button>
          {onPay ? (
            <button
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition hover:bg-[#1d4ed8]"
              onClick={onPay}
              type="button"
            >
              Bayar Sekarang
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}