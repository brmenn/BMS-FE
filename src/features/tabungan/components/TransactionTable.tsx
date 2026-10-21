import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Banknote,
  CalendarDays,
  ChevronDown,
  Download,
  Landmark,
  Receipt,
  Search,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { ExportModal } from './ExportModal'

export type Transaction = {
  code: string
  date: string
  month: string
  type: string
  method: string
  amount: string
  status: string
  typeClass: 'deposit' | 'withdraw'
}

const transactions: Transaction[] = [
  { code: 'TRX-00123', date: '01 Okt 2026', month: '2026-10', type: 'Setoran', method: 'Transfer', amount: '+Rp 500.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00120', date: '25 Sep 2026', month: '2026-09', type: 'Penarikan', method: 'Tunai', amount: '-Rp 300.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00115', date: '10 Sep 2026', month: '2026-09', type: 'Setoran', method: 'Tunai', amount: '+Rp 1.000.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00108', date: '28 Agu 2026', month: '2026-08', type: 'Penarikan', method: 'Transfer', amount: '-Rp 500.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00101', date: '21 Agu 2026', month: '2026-08', type: 'Setoran', method: 'Tunai', amount: '+Rp 750.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00095', date: '14 Agu 2026', month: '2026-08', type: 'Penarikan', method: 'Tunai', amount: '-Rp 150.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00088', date: '07 Agu 2026', month: '2026-08', type: 'Setoran', method: 'Transfer', amount: '+Rp 250.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00081', date: '31 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Transfer', amount: '-Rp 900.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00074', date: '24 Jul 2026', month: '2026-07', type: 'Setoran', method: 'Tunai', amount: '+Rp 1.500.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00067', date: '17 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Tunai', amount: '-Rp 200.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00060', date: '10 Jul 2026', month: '2026-07', type: 'Setoran', method: 'Transfer', amount: '+Rp 350.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00053', date: '03 Jul 2026', month: '2026-07', type: 'Penarikan', method: 'Transfer', amount: '-Rp 450.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00046', date: '26 Jun 2026', month: '2026-06', type: 'Setoran', method: 'Tunai', amount: '+Rp 2.000.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00039', date: '19 Jun 2026', month: '2026-06', type: 'Penarikan', method: 'Transfer', amount: '-Rp 100.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00032', date: '12 Jun 2026', month: '2026-06', type: 'Setoran', method: 'Tunai', amount: '+Rp 800.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00025', date: '05 Jun 2026', month: '2026-06', type: 'Penarikan', method: 'Tunai', amount: '-Rp 650.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00018', date: '29 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Transfer', amount: '+Rp 1.250.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00011', date: '22 Mei 2026', month: '2026-05', type: 'Penarikan', method: 'Transfer', amount: '-Rp 400.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00004', date: '15 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Tunai', amount: '+Rp 175.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00003', date: '08 Mei 2026', month: '2026-05', type: 'Penarikan', method: 'Tunai', amount: '-Rp 275.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00002', date: '01 Mei 2026', month: '2026-05', type: 'Setoran', method: 'Transfer', amount: '+Rp 975.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00001', date: '24 Apr 2026', month: '2026-04', type: 'Penarikan', method: 'Tunai', amount: '-Rp 125.000', status: 'Selesai', typeClass: 'withdraw' },
  { code: 'TRX-00000', date: '17 Apr 2026', month: '2026-04', type: 'Setoran', method: 'Transfer', amount: '+Rp 425.000', status: 'Berhasil', typeClass: 'deposit' },
  { code: 'TRX-00999', date: '10 Apr 2026', month: '2026-04', type: 'Penarikan', method: 'Tunai', amount: '-Rp 550.000', status: 'Selesai', typeClass: 'withdraw' },
]

const PER_PAGE = 4

type TypeFilter = 'semua' | 'setoran' | 'penarikan'

const monthOptions = Array.from(new Set(transactions.map((t) => t.month)))
  .sort()
  .reverse()
  .map((value) => ({
    value,
    label: new Date(Number(value.slice(0, 4)), Number(value.slice(5, 7)) - 1, 1).toLocaleDateString(
      'id-ID',
      { month: 'long', year: 'numeric' },
    ),
  }))

const filterClass =
  'h-11 w-full appearance-none rounded-xl border border-[#c3c6d7]/50 bg-[#f8f9ff] py-2 pr-8 pl-3 text-xs leading-[18px] text-[#121c2a] focus:border-[#2563eb] focus:outline-none'

interface TransactionTableProps {
  onReceiptClick: (transaction: Transaction) => void
}

export function TransactionTable({ onReceiptClick }: TransactionTableProps) {
  const [query, setQuery] = useState('')
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('semua')
  const [monthFilter, setMonthFilter] = useState('semua')
  const [page, setPage] = useState(1)
  const [showExportModal, setShowExportModal] = useState(false)

  const visible = transactions.filter(
    (tx) =>
      (typeFilter === 'semua' ||
        tx.typeClass === (typeFilter === 'setoran' ? 'deposit' : 'withdraw')) &&
      (monthFilter === 'semua' || tx.month === monthFilter) &&
      (query.trim() === '' ||
        tx.code.toLowerCase().includes(query.trim().toLowerCase()) ||
        tx.type.toLowerCase().includes(query.trim().toLowerCase())),
  )
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE))
  const pageRows = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7]/30 bg-white shadow-[0px_1px_2px_#0000000d]">
      {/* HEADER */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#c3c6d7]/30 p-6">
        <div className="flex flex-col">
          <h2 className="text-lg font-bold leading-[26px] text-[#121c2a]">
            Riwayat Transaksi Tabungan
          </h2>
          <p className="text-xs leading-[18px] text-[#434655]">
            Daftar mutasi kredit dan debit rekening tabungan Anda.
          </p>
        </div>

        <button
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#eff4ff] px-4 text-xs font-medium leading-4 text-[#004ac6] transition-colors hover:bg-[#dee9fc]"
          onClick={() => setShowExportModal(true)}
          type="button"
        >
          <Download className="h-3 w-3 shrink-0" aria-hidden="true" />
          Ekspor Data
        </button>
      </div>

      {/* FILTER */}
      <div className="grid grid-cols-12 gap-3 px-6 pt-4">
        <div className="relative col-span-12 sm:col-span-5">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-[13.5px] w-[13.5px] -translate-y-1/2 text-[#737686]"
            aria-hidden="true"
          />
          <input
            className="h-11 w-full rounded-xl border border-[#c3c6d7]/50 bg-[#f8f9ff] py-2 pr-3 pl-10 text-xs text-[#121c2a] focus:border-[#2563eb] focus:outline-none"
            onChange={(event) => {
              setQuery(event.target.value)
              setPage(1)
            }}
            placeholder="Cari transaksi..."
            type="search"
            value={query}
          />
        </div>

        <div className="relative col-span-6 sm:col-span-3">
          <select
            aria-label="Filter jenis transaksi"
            className={filterClass}
            onChange={(event) => {
              setTypeFilter(event.target.value as TypeFilter)
              setPage(1)
            }}
            value={typeFilter}
          >
            <option value="semua">Semua Transaksi</option>
            <option value="setoran">Setoran</option>
            <option value="penarikan">Penarikan</option>
          </select>
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 h-[9px] w-[14px] -translate-y-1/2 text-[#737686]"
          />
        </div>

        <div className="relative col-span-6 sm:col-span-4">
          <select
            aria-label="Filter bulan transaksi"
            className={`${filterClass} pl-9`}
            onChange={(event) => {
              setMonthFilter(event.target.value)
              setPage(1)
            }}
            value={monthFilter}
          >
            <option value="semua">Semua Bulan</option>
            {monthOptions.map((month) => (
              <option key={month.value} value={month.value}>
                Bulan: {month.label}
              </option>
            ))}
          </select>
          <CalendarDays
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-3 h-[13.5px] w-[13.5px] -translate-y-1/2 text-[#737686]"
          />
          <ChevronDown
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 right-3 h-[9px] w-[14px] -translate-y-1/2 text-[#737686]"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-4 w-full overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-y border-[#c3c6d7]/30 bg-[#f8f9ff]">
              <th className="px-6 py-4 text-sm font-semibold leading-5 text-[#434655]">
                KODE TRANSAKSI
              </th>
              <th className="px-6 py-4 text-sm font-semibold leading-5 text-[#434655]">TANGGAL</th>
              <th className="px-6 py-4 text-sm font-semibold leading-5 text-[#434655]">JENIS</th>
              <th className="px-6 py-4 text-sm font-semibold leading-5 text-[#434655]">METODE</th>
              <th className="px-6 py-4 text-right text-sm font-semibold leading-5 text-[#434655]">
                NOMINAL
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold leading-5 text-[#434655]">
                STATUS
              </th>
              <th className="px-6 py-4 text-center text-sm font-semibold leading-5 text-[#434655]">
                AKSI
              </th>
            </tr>
          </thead>

          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td className="px-6 py-10 text-center text-base text-[#737686]" colSpan={7}>
                  Tidak ada transaksi
                </td>
              </tr>
            ) : (
              pageRows.map((transaction) => {
                const isDeposit = transaction.typeClass === 'deposit'
                const MethodIcon = transaction.method === 'Transfer' ? Landmark : Banknote

                return (
                  <tr key={transaction.code} className="border-b border-[#c3c6d7]/20 last:border-b-0">
                    <td className="px-6 py-5 font-mono text-sm leading-5 whitespace-nowrap text-[#004ac6]">
                      {transaction.code}
                    </td>
                    <td className="px-6 py-5 text-sm leading-5 whitespace-nowrap text-[#121c2a]">
                      {transaction.date}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          'inline-flex items-center gap-1.5 text-sm font-medium leading-5 whitespace-nowrap',
                          isDeposit ? 'text-[#006329]' : 'text-[#ba1a1a]',
                        )}
                      >
                        {isDeposit ? (
                          <ArrowDownToLine className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        ) : (
                          <ArrowUpFromLine className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex items-center gap-1.5 text-sm leading-5 whitespace-nowrap text-[#434655]">
                        <MethodIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
                        {transaction.method}
                      </span>
                    </td>
                    <td
                      className={cn(
                        'px-6 py-5 text-right font-mono text-sm font-bold leading-5 whitespace-nowrap',
                        isDeposit ? 'text-[#006329]' : 'text-[#ba1a1a]',
                      )}
                    >
                      {transaction.amount}
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <span className="inline-flex items-center justify-center rounded-full bg-[#d1fae5] px-3 py-1 text-sm font-semibold leading-5 text-[#006329]">
                          {transaction.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex justify-center">
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg border border-[#c3c6d7]/40 px-3.5 py-2 text-sm font-medium leading-5 text-[#004ac6] transition-colors hover:bg-[#f8f9ff]"
                          onClick={() => onReceiptClick(transaction)}
                          type="button"
                        >
                          <Receipt className="h-4 w-4 shrink-0" aria-hidden="true" />
                          Resi
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c3c6d7]/30 bg-[#f8f9ff] p-4">
        <span className="text-xs leading-[18px] text-[#434655]">
          {pageRows.length === 0
            ? 'Tidak ada transaksi'
            : `Menampilkan ${(page - 1) * PER_PAGE + 1}–${Math.min(page * PER_PAGE, visible.length)} dari ${visible.length} transaksi`}
        </span>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="inline-flex h-8 items-center justify-center rounded-lg border border-[#c3c6d7]/40 bg-white px-3 text-xs leading-[18px] text-[#737686] transition-colors hover:bg-[#f8f9ff] disabled:opacity-50"
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            type="button"
          >
            Sebelumnya
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              aria-current={page === n ? 'page' : undefined}
              className={cn(
                'flex h-8 min-w-8 items-center justify-center rounded-lg px-3 text-xs leading-[18px] transition-colors',
                page === n
                  ? 'bg-[#2563eb] font-semibold text-white'
                  : 'border border-[#c3c6d7]/40 bg-white text-[#434655] hover:bg-[#f8f9ff]',
              )}
              onClick={() => setPage(n)}
              type="button"
            >
              {n}
            </button>
          ))}

          <button
            className="inline-flex h-8 items-center justify-center rounded-lg border border-[#c3c6d7]/40 bg-white px-3 text-xs leading-[18px] text-[#434655] transition-colors hover:bg-[#f8f9ff] disabled:opacity-50"
            disabled={page === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            type="button"
          >
            Selanjutnya
          </button>
        </div>
      </div>

      {showExportModal ? <ExportModal onClose={() => setShowExportModal(false)} /> : null}
    </section>
  )
}