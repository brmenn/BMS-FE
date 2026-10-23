import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  CircleDashed,
  Clock3,
  HandCoins,
  TrendingDown,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { RiwayatPinjamanModal, type RiwayatPinjamanRecord } from '@/components/roles/guru/RiwayatPinjamanModal'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'

type HistoryStatus = 'lunas' | 'menunggu' | 'belum-lunas'

interface HistoryRow {
  id: string
  date: string
  amount: string
  status: HistoryStatus
  actionLabel: string
  actionTone: 'primary' | 'success' | 'danger'
}

const HISTORY_ROWS: HistoryRow[] = [
  {
    id: 'HST-2026-10',
    date: '10 Okt 2026',
    amount: 'Rp 420.000',
    status: 'menunggu',
    actionLabel: 'Lihat Status',
    actionTone: 'primary',
  },
  {
    id: 'HST-2026-09',
    date: '10 Sep 2026',
    amount: 'Rp 420.000',
    status: 'lunas',
    actionLabel: 'Lihat Detail',
    actionTone: 'success',
  },
  {
    id: 'HST-2026-08',
    date: '10 Agu 2026',
    amount: 'Rp 420.000',
    status: 'belum-lunas',
    actionLabel: 'Bayar Sekarang',
    actionTone: 'danger',
  },
  {
    id: 'HST-2026-07',
    date: '10 Jul 2026',
    amount: 'Rp 420.000',
    status: 'lunas',
    actionLabel: 'Lihat Detail',
    actionTone: 'success',
  },
  {
    id: 'HST-2026-06',
    date: '10 Jun 2026',
    amount: 'Rp 420.000',
    status: 'lunas',
    actionLabel: 'Lihat Detail',
    actionTone: 'success',
  },
  {
    id: 'HST-2026-05',
    date: '10 Mei 2026',
    amount: 'Rp 420.000',
    status: 'lunas',
    actionLabel: 'Lihat Detail',
    actionTone: 'success',
  },
  {
    id: 'HST-2026-04',
    date: '10 Apr 2026',
    amount: 'Rp 420.000',
    status: 'lunas',
    actionLabel: 'Lihat Detail',
    actionTone: 'success',
  },
]

const STATUS_META: Record<
  HistoryStatus,
  { label: string; icon: LucideIcon; badgeClass: string; iconClass: string }
> = {
  menunggu: {
    label: 'Menunggu Konfirmasi',
    icon: Clock3,
    badgeClass: 'bg-[#fef3c7]/60',
    iconClass: 'text-[#d97706]',
  },
  lunas: {
    label: 'Lunas',
    icon: CheckCircle2,
    badgeClass: 'bg-[#d1fae5]/70',
    iconClass: 'text-[#059669]',
  },
  'belum-lunas': {
    label: 'Belum Lunas',
    icon: CircleDashed,
    badgeClass: 'bg-[#fec7c7]/60',
    iconClass: 'text-[#d90606]',
  },
}

const ACTION_TONE: Record<HistoryRow['actionTone'], string> = {
  primary: 'bg-[#2563eb] text-white hover:bg-[#1d4ed8]',
  success: 'bg-[#059669] text-white hover:bg-[#047857]',
  danger: 'bg-[#dc2626] text-white hover:bg-[#b91c1c]',
}

const QUOTA_PERCENT = 20

const cardShell =
  'rounded-2xl border border-[#f1f5f9] bg-white shadow-[2px_4px_4px_rgba(0,0,0,0.25)]'

function StatusBadge({ status }: { status: HistoryStatus }) {
  const meta = STATUS_META[status]
  const Icon = meta.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-4',
        meta.badgeClass,
      )}
    >
      <Icon className={cn('h-3 w-3', meta.iconClass)} aria-hidden="true" />
      <span className={meta.iconClass}>{meta.label}</span>
    </span>
  )
}

function QuotaDonut() {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const dash = (QUOTA_PERCENT / 100) * circumference

  return (
    <div
      className="relative flex h-[120px] w-[120px] shrink-0 flex-col items-center justify-center"
      role="img"
      aria-label={`${QUOTA_PERCENT}% kuota tersisa`}
    >
      <svg className="absolute inset-0 h-[120px] w-[120px] -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          fill="none"
          r={radius}
          stroke="#e2e8f0"
          strokeWidth="12"
        />
        <circle
          cx="60"
          cy="60"
          fill="none"
          r={radius}
          stroke="#2563eb"
          strokeDasharray={`${dash} ${circumference - dash}`}
          strokeLinecap="round"
          strokeWidth="12"
        />
      </svg>
      <span className="text-[24px] font-bold leading-7 text-[#0f172a]">{QUOTA_PERCENT}%</span>
      <span className="text-xs font-medium leading-4 text-[#64748b]">tersisa</span>
    </div>
  )
}

export function DetailPinjamanPage() {
  const navigate = useNavigate()
  const [selectedRecord, setSelectedRecord] = useState<RiwayatPinjamanRecord | null>(null)
  const loading = useSimulatedLoading()

  const handleAction = (row: HistoryRow) => {
    if (row.status === 'belum-lunas') {
      navigate('/guru/pembayaran-pinjaman')
      return
    }

    setSelectedRecord(row)
  }

  return (
    <div className="flex flex-col gap-6">
      {loading ? (
        <PageSkeleton variant="report" />
      ) : (
        <>
      {/* KARTU RINGKASAN */}
      <section aria-label="Ringkasan pinjaman" className="flex flex-col gap-5 lg:flex-row lg:items-stretch">
        <article
          className={cn(
            cardShell,
            'relative flex min-h-[300px] flex-1 flex-col overflow-hidden p-6',
          )}
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-9 -bottom-16 h-[203px] w-[208px] rounded-full bg-[#004ac6]/20 blur-[20px]"
          />

          <div className="relative flex flex-col gap-1">
            <h1 className="text-xl font-bold leading-6 text-[#64748b]">
              Sisa Tagihan &amp; Kuota Pinjaman
            </h1>
            <p className="text-[30px] font-bold leading-9 tracking-[-0.75px] text-[#0f172a]">
              Rp 6.200.000
            </p>
          </div>

          <div className="relative mt-8 flex items-end justify-between gap-4">
            <div className="flex flex-col gap-1.5">
              <p className="text-base font-bold leading-6 text-[#64748b]">
                Kuota Pinjaman Tersisa
              </p>
              <p className="text-[26px] font-bold leading-8 tracking-[-0.5px] text-[#0f172a]">
                Rp 2.000.000
              </p>
              <p className="text-xs font-medium leading-4 text-[#64748b]">
                Limit kuota Rp 10.000.000
              </p>
            </div>

            <QuotaDonut />
          </div>
        </article>

        <div className="flex flex-1 flex-col gap-4">
          <article className={cn(cardShell, 'flex flex-1 flex-col justify-between gap-3 p-5')}>
            <div className="flex items-center justify-between gap-3">
              <span className="inline-flex rounded-full bg-[#fffbeb] px-2.5 py-0.5 text-xs font-semibold leading-4 text-[#b45309]">
                Jumlah Pinjaman
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff]">
                <Banknote className="h-4 w-4 text-[#2563eb]" aria-hidden="true" />
              </span>
            </div>

            <p className="text-xl font-bold leading-7 text-[#0f172a]">Rp 8.000.000</p>

            <p className="flex items-center gap-1.5 text-[11px] font-semibold leading-4 text-[#059669]">
              <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
              Disetujui &amp; Dicairkan penuh
            </p>
          </article>

          <article className={cn(cardShell, 'flex flex-1 flex-col justify-center gap-1 p-5')}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold leading-4 text-[#64748b]">Sisa Tagihan</span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#fef2f2]">
                <TrendingDown className="h-4 w-4 text-[#ef4444]" aria-hidden="true" />
              </span>
            </div>

            <p className="text-xl font-bold leading-7 text-[#ef4444]">Rp 6.200.000</p>
            <p className="text-[11px] font-medium leading-4 text-[#64748b]">
              16 Cicilan tersisa s/d 2028
            </p>
          </article>
        </div>
      </section>

      {/* RIWAYAT PEMBAYARAN */}
      <section aria-labelledby="riwayat-heading" className={cn(cardShell, 'flex flex-col gap-5 p-6')}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-[#eff6ff]">
              <HandCoins className="h-3.5 w-3.5 text-[#2563eb]" aria-hidden="true" />
            </span>
            <h2 className="text-sm font-bold leading-5 text-[#1e293b]" id="riwayat-heading">
              Riwayat Pinjaman
            </h2>
          </div>

          <Link
            className="inline-flex items-center gap-1 text-xs font-semibold leading-4 text-[#2563eb] hover:underline"
            to="/guru/pembayaran-pinjaman"
          >
            Lihat Semua Riwayat
            <ChevronRight className="h-3 w-3" aria-hidden="true" />
          </Link>
        </div>

        <div className="overflow-x-auto border-t border-[#3737374c]">
          <table className="table-stagger w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#3737374c]">
                <th
                  scope="col"
                  className="px-4 py-3 text-sm font-bold leading-5 text-[#535353]"
                >
                  Tanggal
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-bold leading-5 text-[#535353]"
                >
                  Jumlah
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-bold leading-5 text-[#535353]"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-sm font-bold leading-5 text-[#535353]"
                >
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {HISTORY_ROWS.map((row) => (
                <tr key={row.id} className="border-b border-[#f8fafc] last:border-b-0">
                  <td className="px-4 py-4 text-sm font-medium leading-5 text-[#334155]">
                    {row.date}
                  </td>
                  <td className="px-4 py-4 text-center text-sm font-medium leading-5 text-[#334155]">
                    {row.amount}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <StatusBadge status={row.status} />
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center">
                      <button
                        className={cn(
                          'inline-flex h-[30px] items-center justify-center gap-1 rounded-[8px] px-3 text-[11px] font-extrabold leading-4 shadow-[0px_0.63px_1.26px_rgba(0,0,0,0.05)] transition-colors',
                          ACTION_TONE[row.actionTone],
                        )}
                        onClick={() => handleAction(row)}
                        type="button"
                      >
                        {row.actionLabel}
                        <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRecord ? (
        <RiwayatPinjamanModal
          onClose={() => setSelectedRecord(null)}
          record={selectedRecord}
        />
      ) : null}
        </>
      )}
    </div>
  )
}