import {
  Banknote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  FileText,
  Landmark,
  Search,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'
import {
  CASH_FLOW_TRANSACTIONS,
  type CashFlowTransaction,
  type MethodKind,
} from '@/features/laporan-arus-kas/data/transactions'

const METHOD_ICONS: Record<MethodKind, typeof Landmark> = {
  transfer: Landmark,
  tunai: Banknote,
}

export function LaporanArusKasPage() {
  const totalMasuk = CASH_FLOW_TRANSACTIONS.filter((item) => item.direction === 'masuk').reduce(
    (sum, item) => sum + item.amount,
    0,
  )
  const totalKeluar = CASH_FLOW_TRANSACTIONS.filter(
    (item) => item.direction === 'keluar',
  ).reduce((sum, item) => sum + item.amount, 0)
  const saldo = totalMasuk - totalKeluar

  return (
    <div className="flex w-full flex-col gap-6 p-4 sm:p-8 lg:px-16 lg:pb-16">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl leading-8 font-semibold tracking-[-0.24px] text-[#121c2a]">
          Laporan Arus Kas
        </h1>
        <p className="max-w-[672px] text-sm leading-5 text-[#737686]">
          Ringkasan mutasi kas masuk dan kas keluar yang telah dibukukan oleh admin beserta
          rincian detail setiap transaksi.
        </p>
      </header>

      <section aria-label="Ringkasan arus kas" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <SummaryCard
          icon={TrendingUp}
          iconClass="bg-[#ecfdf5] text-[#006329]"
          label="Total Kas Masuk"
          note={`${CASH_FLOW_TRANSACTIONS.filter((item) => item.direction === 'masuk').length} transaksi penerimaan`}
          value={formatMoney(totalMasuk)}
          valueClass="text-[#006329]"
        />
        <SummaryCard
          icon={TrendingDown}
          iconClass="bg-[#fef2f2] text-[#ba1a1a]"
          label="Total Kas Keluar"
          note={`${CASH_FLOW_TRANSACTIONS.filter((item) => item.direction === 'keluar').length} transaksi pengeluaran`}
          value={formatMoney(totalKeluar)}
          valueClass="text-[#ba1a1a]"
        />
        <SummaryCard
          icon={Wallet}
          iconClass="bg-[#eff4ff] text-[#004ac6]"
          label="Saldo Kas"
          note="Saldo kas setelah mutasi terakhir"
          value={formatMoney(saldo)}
          valueClass="text-[#004ac6]"
        />
      </section>

      <section
        aria-labelledby="tabel-arus-kas-heading"
        className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7e6] bg-white shadow-[0px_1px_2px_#0000000d]"
      >
        <h2 id="tabel-arus-kas-heading" className="sr-only">
          Tabel mutasi arus kas
        </h2>

        <div className="flex flex-wrap items-center gap-2 border-b border-[#c3c6d74c] bg-[#f8f9ff] p-4">
          <button
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c3c6d799] bg-white px-3.5 text-xs leading-[18px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            type="button"
          >
            Semua Mutasi
            <ChevronDown className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c3c6d799] bg-white px-3.5 text-xs leading-[18px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            type="button"
          >
            Oktober 2026
            <ChevronDown className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
          </button>
          <div className="relative min-w-[200px] flex-1">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#737686]"
              aria-hidden="true"
            />
            <input
              aria-label="Cari referensi atau nama pengguna"
              className="h-10 w-full rounded-xl border border-[#c3c6d799] bg-white pr-3 pl-10 text-sm leading-5 text-[#121c2a] placeholder:text-[#737686] focus:border-[#2563eb] focus:outline-none"
              placeholder="Cari referensi / nama..."
              type="search"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#c3c6d74c] bg-[#f8f9ff]">
                <th
                  scope="col"
                  className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  REFERENSI
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  TANGGAL
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  NAMA PENGGUNA
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  JENIS TRANSAKSI
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  NOMINAL
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  STATUS
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]"
                >
                  AKSI
                </th>
              </tr>
            </thead>
            <tbody>
              {CASH_FLOW_TRANSACTIONS.map((row) => (
                <TransactionRow key={row.id} row={row} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#c3c6d74c] bg-[#f8f9ff] px-4 py-3">
          <span className="text-xs leading-[18px] text-[#434655]">
            Menampilkan 1 - {CASH_FLOW_TRANSACTIONS.length} dari{' '}
            {CASH_FLOW_TRANSACTIONS.length} transaksi tervalidasi
          </span>
          <div className="flex items-center gap-1.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c3c6d766] opacity-40">
              <ChevronLeft className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
            </span>
            <span className="flex h-7 items-center justify-center rounded-lg bg-[#004ac6] px-2.5 text-xs leading-[18px] font-semibold text-white">
              1
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c3c6d766] opacity-40">
              <ChevronRight className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}

function SummaryCard({
  icon: Icon,
  iconClass,
  label,
  value,
  valueClass,
  note,
}: {
  icon: typeof Wallet
  iconClass: string
  label: string
  value: string
  valueClass: string
  note: string
}) {
  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-[#c3c6d74c] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
      <div className="flex items-center gap-3">
        <span className={cn('flex h-10 w-10 items-center justify-center rounded-xl', iconClass)}>
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <span className="text-[11px] leading-[14px] font-semibold tracking-[0.44px] text-[#737686]">
          {label}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <strong className={cn('text-2xl leading-8 font-bold tracking-[-0.24px]', valueClass)}>
          {value}
        </strong>
        <span className="text-xs leading-[18px] text-[#737686]">{note}</span>
      </div>
    </article>
  )
}

function TransactionRow({ row }: { row: CashFlowTransaction }) {
  const MethodIcon = METHOD_ICONS[row.method]
  const isMasuk = row.direction === 'masuk'

  return (
    <tr className="border-b border-[#c3c6d733] last:border-b-0">
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <MethodIcon className="h-4 w-4 shrink-0 text-[#737686]" aria-hidden="true" />
          <span className="font-mono text-sm leading-5 font-medium whitespace-nowrap text-[#121c2a]">
            {row.reference}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm leading-5 whitespace-nowrap text-[#434655]">
        {row.dateLabel}
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col items-start">
          <span className="text-sm leading-5 font-medium text-[#121c2a]">{row.userName}</span>
          <span className="text-[11px] leading-[14px] text-[#737686]">{row.group}</span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col items-start">
          <span className="text-sm leading-5 text-[#121c2a]">{row.transactionType}</span>
          <span className="text-[11px] leading-[14px] text-[#737686]">{row.transactionNote}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        <span
          className={cn(
            'text-sm leading-5 font-semibold whitespace-nowrap',
            isMasuk ? 'text-[#006329]' : 'text-[#ba1a1a]',
          )}
        >
          {isMasuk ? '+' : '−'} {formatMoney(row.amount)}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center gap-1 rounded-full bg-[#7ffc97] px-2.5 py-0.5 text-[10px] leading-[14px] font-bold tracking-[0.24px] text-[#002109]">
          <CircleCheck className="h-3 w-3" aria-hidden="true" />
          {row.status}
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <Link
          className="inline-flex items-center gap-1 rounded-xl border border-[#c3c6d799] px-2.5 py-1.5 text-xs leading-[18px] font-semibold text-[#004ac6] transition-colors hover:bg-[#f8f9ff]"
          to={`/admin/laporan-arus-kas/transaksi/${row.id}`}
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Detail
        </Link>
      </td>
    </tr>
  )
}
