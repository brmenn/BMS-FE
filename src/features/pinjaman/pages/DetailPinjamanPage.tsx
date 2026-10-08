import type { LucideIcon } from 'lucide-react'
import {
  Banknote,
  CalendarDays,
  ChevronRight,
  CircleCheck,
  ClipboardList,
  Clock3,
  FileText,
  TrendingDown,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PaymentStatus = 'lunas' | 'menunggu'

interface SummaryCard {
  label: string
  labelClassName?: string
  icon: LucideIcon
  iconBoxClassName: string
  amount: string
  amountClassName: string
  caption?: string
  status?: string
}

const SUMMARY_CARDS: SummaryCard[] = [
  {
    label: 'Jumlah Pinjaman',
    labelClassName: 'bg-[#fffbeb] text-[#b45309]',
    icon: Banknote,
    iconBoxClassName: 'bg-[#eff6ff] text-[#2563eb]',
    amount: 'Rp 8.000.000',
    amountClassName: 'text-[#0f172a]',
    status: 'Disetujui & Dicairkan penuh',
  },
  {
    label: 'Sisa Tagihan',
    icon: TrendingDown,
    iconBoxClassName: 'bg-[#fef2f2] text-[#ef4444]',
    amount: 'Rp 6.200.000',
    amountClassName: 'text-[#ef4444]',
    caption: '16 Cicilan tersisa s/d 2028',
  },
]

const LOAN_DETAILS: Array<{ label: string; value: string }> = [
  { label: 'Jumlah pinjaman', value: 'Rp 8.000.000' },
  { label: 'Tenor', value: '24 bulan' },
  { label: 'Cicilan per bulan', value: 'Rp 420.000' },
  { label: 'Bunga', value: '1%' },
  { label: 'Tanggal mulai', value: '10 Jan 2026' },
  { label: 'Jatuh tempo berikutnya', value: '10 Okt 2026' },
]

interface ScheduleRow {
  month: string
  dueDate: string
  installment: string
  status: PaymentStatus
}

const SCHEDULE_ROWS: ScheduleRow[] = [
  { month: 'Oktober 2026', dueDate: '10 Okt 2026', installment: 'Rp 420.000', status: 'lunas' },
  { month: 'November 2026', dueDate: '10 Nov 2026', installment: 'Rp 420.000', status: 'menunggu' },
  { month: 'Desember 2026', dueDate: '10 Des 2026', installment: 'Rp 420.000', status: 'menunggu' },
]

interface HistoryRow {
  date: string
  amount: string
  status: PaymentStatus
}

const HISTORY_ROWS: HistoryRow[] = [
  { date: '10 Sep 2026', amount: 'Rp 420.000', status: 'lunas' },
  { date: '10 Agu 2026', amount: 'Rp 420.000', status: 'lunas' },
  { date: '10 Jul 2026', amount: 'Rp 420.000', status: 'lunas' },
]

const STATUS_META: Record<PaymentStatus, { label: string; icon: LucideIcon; className: string }> = {
  lunas: {
    label: 'Lunas',
    icon: CircleCheck,
    className: 'bg-[#d1fae5]/70 text-[#059669]',
  },
  menunggu: {
    label: 'Menunggu',
    icon: Clock3,
    className: 'bg-[#fef3c7]/60 text-[#d97706]',
  },
}

const cardShell =
  'relative w-full rounded-2xl border border-[#f1f5f9] bg-white p-6 shadow-[0px_2px_12px_-4px_rgba(30,41,59,0.04)]'

function SectionHeader({
  icon: Icon,
  title,
  actionLabel,
}: {
  icon: LucideIcon
  title: string
  actionLabel?: string
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#eff6ff] text-[#2563eb]">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <h2 className="text-sm font-bold leading-5 text-[#1e293b]">{title}</h2>
      </div>
      {actionLabel ? (
        <a
          href="#"
          className="inline-flex items-center gap-1 text-xs font-semibold leading-4 text-[#2563eb] hover:underline"
        >
          {actionLabel}
          <ChevronRight className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : null}
    </div>
  )
}

function StatusBadge({ status }: { status: PaymentStatus }) {
  const meta = STATUS_META[status]
  const Icon = meta.icon

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold leading-4',
        meta.className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {meta.label}
    </span>
  )
}

function SummaryCard({ card }: { card: SummaryCard }) {
  const Icon = card.icon

  return (
    <article className={cn(cardShell, 'flex flex-col gap-3')}>
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold leading-4',
            card.labelClassName ?? 'font-semibold text-[#64748b]',
          )}
        >
          {card.label}
        </span>
        <span
          className={cn(
            'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
            card.iconBoxClassName,
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      </div>

      <p className={cn('text-xl font-bold leading-7', card.amountClassName)}>{card.amount}</p>

      {card.status ? (
        <p className="flex items-center gap-1.5 text-[11px] font-semibold leading-4 text-[#059669]">
          <CircleCheck className="h-3 w-3" aria-hidden="true" />
          {card.status}
        </p>
      ) : null}
      {card.caption ? (
        <p className="text-[11px] font-medium leading-4 text-[#64748b]">{card.caption}</p>
      ) : null}
    </article>
  )
}

export function DetailPinjamanPage() {
  return (
    <div className="flex flex-col gap-6">
      <section aria-label="Ringkasan pinjaman" className="grid gap-5 lg:grid-cols-2">
        <article className={cn(cardShell, 'flex min-h-[248px] flex-col justify-between gap-6')}>
          <div className="flex items-center justify-between gap-3">
            <h1 className="text-xl font-bold leading-6 text-[#64748b]">Sudah Dibayar (8 Cicilan)</h1>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eff6ff] text-[#2563eb]">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>

          <p className="text-[30px] font-bold leading-9 tracking-[-0.75px] text-[#0f172a]">
            Rp 3.000.000
          </p>

          <div
            className="flex items-center gap-3"
            role="progressbar"
            aria-label="Progress pembayaran"
            aria-valuenow={38.5}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext="38,5%"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#ecfdf5] text-[#10b981]">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span className="h-3 flex-1 overflow-hidden rounded-full bg-[#e0e3e6]">
              <span className="block h-full w-[38.5%] rounded-full bg-[#10b981]" />
            </span>
            <span className="text-xs font-bold leading-4 text-[#334155]">38,5%</span>
          </div>
        </article>

        <div className="flex flex-col gap-4">
          {SUMMARY_CARDS.map((card) => (
            <SummaryCard key={card.label} card={card} />
          ))}
        </div>
      </section>

      <section aria-labelledby="detail-pinjaman-heading" className={cn(cardShell, 'flex flex-col gap-5')}>
        <SectionHeader icon={FileText} title="Detail Pinjaman" />
        <h2 id="detail-pinjaman-heading" className="sr-only">
          Detail Pinjaman
        </h2>

        <dl className="flex w-full max-w-xl flex-col">
          {LOAN_DETAILS.map((row) => (
            <div key={row.label} className="flex items-center py-1.5">
              <dt className="w-48 shrink-0 text-sm font-medium leading-5 text-[#64748b]">
                {row.label}
              </dt>
              <span className="w-4 shrink-0 text-center text-sm text-[#94a3b8]" aria-hidden="true">
                :
              </span>
              <dd className="text-sm font-semibold leading-5 text-[#1e293b]">{row.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="jadwal-pembayaran-heading" className={cn(cardShell, 'flex flex-col gap-4')}>
        <SectionHeader icon={CalendarDays} title="Jadwal Pembayaran" actionLabel="Lihat Semua Jadwal" />
        <h2 id="jadwal-pembayaran-heading" className="sr-only">
          Jadwal Pembayaran
        </h2>

        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[560px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#f1f5f9]">
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Bulan
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Jatuh Tempo
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Cicilan
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {SCHEDULE_ROWS.map((row) => (
                <tr key={row.month} className="border-b border-[#f8fafc] last:border-b-0">
                  <td className="px-4 py-4 text-sm font-semibold leading-5 text-[#1e293b]">
                    {row.month}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium leading-5 text-[#475569]">
                    {row.dueDate}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium leading-5 text-[#334155]">
                    {row.installment}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="riwayat-pembayaran-heading" className={cn(cardShell, 'flex flex-col gap-4')}>
        <SectionHeader
          icon={ClipboardList}
          title="Riwayat Pembayaran"
          actionLabel="Lihat Semua Riwayat"
        />
        <h2 id="riwayat-pembayaran-heading" className="sr-only">
          Riwayat Pembayaran
        </h2>

        <div className="-mx-6 overflow-x-auto px-6">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#f1f5f9]">
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Tanggal
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Jumlah
                </th>
                <th scope="col" className="px-4 py-3 text-sm font-bold leading-5 text-[#94a3b8]">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {HISTORY_ROWS.map((row) => (
                <tr key={row.date} className="border-b border-[#f8fafc] last:border-b-0">
                  <td className="px-4 py-4 text-sm font-medium leading-5 text-[#334155]">
                    {row.date}
                  </td>
                  <td className="px-4 py-4 text-sm font-medium leading-5 text-[#334155]">
                    {row.amount}
                  </td>
                  <td className="px-4 py-4">
                    <StatusBadge status={row.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
