import { useState } from 'react'
import {
  ArrowRightLeft,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'
import { DashboardSidebar } from '../components/DashboardSidebar'
import { DashboardTopbar } from '../components/DashboardTopbar'
import { adminItems } from '../components/admin-sidebar-items'
import filterKasIcon from '@/assets/icon/filter-kas.svg'
import iconSearch from '@/assets/icon/icon-search.svg'
import iconFilterPeriod from '@/assets/icon/icon-filter-period.svg'
import iconAudit from '@/assets/icon/icon-audit.svg'
import iconRecap from '@/assets/icon/icon-recap.svg'
import iconStudentFund from '@/assets/icon/icon-student-fund.svg'
import iconStaffFund from '@/assets/icon/icon-staff-fund.svg'
import iconGrandTotal from '@/assets/icon/icon-grand-total.svg'
import iconCash from '@/assets/icon/icon-cash.svg'
import iconAtm from '@/assets/icon/icon-atm.svg'
import iconRecapGray from '@/assets/icon/icon-recap-gray.svg'
import iconPemasukan from '@/assets/icon/icon-pemasukan.svg'
import iconPengeluaran from '@/assets/icon/icon-pengeluaran.svg'

const SEARCH_ICON_MASK = `url("${iconSearch}") no-repeat center / contain`

type Kategori = 'Setoran' | 'Cicilan' | 'Penarikan'
type Kelompok = 'Siswa' | 'Guru'
type Metode = 'Cash' | 'Transfer' | 'Transfer BSI' | 'Payroll'

interface ArusKasTrx {
  code: string
  date: string
  kategori: Kategori
  kelompok: Kelompok
  metode: Metode
  amount: number
  petugas: string
}

const KATEGORI: Kategori[] = ['Setoran', 'Setoran', 'Cicilan', 'Penarikan', 'Setoran']
const KELOMPOK: Kelompok[] = ['Siswa', 'Guru']
const METODE: Metode[] = ['Cash', 'Transfer', 'Transfer BSI', 'Payroll']
const AMOUNTS = [500000, 420000, 300000, 150000, 1000000, 750000, 250000, 600000]

const TRANSACTIONS: ArusKasTrx[] = Array.from({ length: 48 }, (_, i) => {
  const day = (i % 31) + 1
  const kategori = KATEGORI[i % KATEGORI.length]
  const rawAmount = AMOUNTS[i % AMOUNTS.length]

  return {
    code: `TRX-${String(i + 1).padStart(3, '0')}`,
    date: `${String(day).padStart(2, '0')} Okt 2026`,
    kategori,
    kelompok: KELOMPOK[i % 2],
    metode: METODE[i % METODE.length],
    amount: kategori === 'Penarikan' ? -rawAmount : rawAmount,
    petugas: 'Admin (Siti R.)',
  }
})

const KATEGORI_OPTIONS = ['Semua Kategori', 'Setoran', 'Cicilan', 'Penarikan'] as const
const KELOMPOK_OPTIONS = ['Semua Kelompok', 'Siswa', 'Guru'] as const
const METODE_OPTIONS = ['Semua Metode', 'Cash', 'Transfer', 'Transfer BSI', 'Payroll'] as const

const PAGE_SIZE = 10

interface ArusKasFilter {
  from: string
  to: string
  kelompok: Kelompok | 'Semua Kelompok'
  kategori: Kategori | 'Semua Kategori'
  metode: Metode | 'Semua Metode'
}

const DEFAULT_FILTER: ArusKasFilter = {
  from: '01/10/2026',
  to: '31/10/2026',
  kelompok: 'Semua Kelompok',
  kategori: 'Semua Kategori',
  metode: 'Semua Metode',
}

const KATEGORI_BADGE: Record<Kategori, string> = {
  Setoran: 'bg-[#0063291a] text-[#006329]',
  Cicilan: 'bg-[#b7c4fd4c] text-[#4f5c8e]',
  Penarikan: 'bg-[#ffdad6] text-[#ba1a1a]',
}

const KELOMPOK_BADGE: Record<Kelompok, string> = {
  Siswa: 'bg-[#eff4ff] text-[#2563eb]',
  Guru: 'bg-[#dee9fc] text-[#434655]',
}

const METODE_ICON: Record<Metode, string> = {
  Cash: iconCash,
  Transfer: iconRecapGray,
  'Transfer BSI': iconRecapGray,
  Payroll: iconAtm,
}

const MONTHS_SHORT = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const MONTHS_FULL = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
]
const WEEKDAYS = ['M', 'S', 'S', 'R', 'K', 'J', 'S']

function formatRangeDate(value: string): string {
  const [day, month, year] = value.split('/')
  return `${day} ${MONTHS_SHORT[Number(month)]} ${year}`
}

function dayOfMonth(value: string): number {
  if (!value) return 0
  return Number(value.slice(0, 2))
}

function parseDdMmYyyy(value: string): Date | null {
  const [day, month, year] = value.split('/').map(Number)
  if (!day || !month || !year) return null
  return new Date(year, month - 1, day)
}

function toDdMmYyyy(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  return `${day}/${month}/${date.getFullYear()}`
}

const RECAP_ROWS = [
  {
    id: 1,
    name: 'Kas Tabungan & Setoran\nSiswa',
    akun: 'Akun No: 101.01 • Simpanan &\nBiaya Siswa',
    debit: 85000000,
    kredit: 23500000,
    saldo: 61500000,
  },
  {
    id: 2,
    name: 'Kas Simpan Pinjam Guru &\nPegawai',
    akun: 'Akun No: 101.02 • Payroll &\nCicilan Pegawai',
    debit: 40000000,
    kredit: 15000000,
    saldo: 25000000,
  },
]

type PeriodKey = 'minggu' | 'bulan' | 'tahun'

interface DatePickerProps {
  value: string
  label: string
  onChange: (value: string) => void
}

function DatePicker({ value, label, onChange }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const [monthOffset, setMonthOffset] = useState(0)
  const base = parseDdMmYyyy(value) ?? parseDdMmYyyy(DEFAULT_FILTER.from)!
  const view = new Date(base.getFullYear(), base.getMonth() + monthOffset, 1)
  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const selected = parseDdMmYyyy(value)

  const cells: (number | null)[] = Array.from({ length: firstDay }, () => null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)

  const handleOpen = () => {
    setMonthOffset(0)
    setOpen((o) => !o)
  }

  const handlePick = (d: number) => {
    onChange(toDdMmYyyy(new Date(year, month, d)))
    setOpen(false)
  }

  return (
    <div className="relative flex-1">
      <button
        type="button"
        aria-label={`Buka kalender ${label}`}
        aria-expanded={open}
        onClick={handleOpen}
        className="absolute left-2.5 top-1/2 flex h-8 w-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-lg text-[#737686] transition-colors hover:text-[#121c2a]"
      >
        <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
      </button>
      <input
        type="text"
        readOnly
        value={value}
        onFocus={handleOpen}
        aria-label={label}
        className="h-11 w-full cursor-pointer rounded-xl border border-solid border-[#c3c6d7] bg-white pl-9 pr-3 text-sm text-[#121c2a]"
      />
      {open && (
        <>
          <button
            type="button"
            aria-label="Tutup kalender"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 top-full z-20 mt-1 w-[248px] rounded-xl border border-solid border-[#c3c6d7] bg-white p-3 shadow-[0px_8px_24px_#00000014]">
            <div className="flex items-center justify-between pb-2">
              <button
                type="button"
                aria-label="Bulan sebelumnya"
                onClick={() => setMonthOffset((o) => o - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff]"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              </button>
              <p className="text-sm font-semibold leading-5 text-[#121c2a]">
                {MONTHS_FULL[month]} {year}
              </p>
              <button
                type="button"
                aria-label="Bulan berikutnya"
                onClick={() => setMonthOffset((o) => o + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff]"
              >
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 pb-1 text-center">
              {WEEKDAYS.map((w, i) => (
                <span key={i} className="text-[11px] font-semibold leading-4 text-[#737686]">
                  {w}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1 text-center">
              {cells.map((d, i) =>
                d === null ? (
                  <span key={`empty-${i}`} />
                ) : (
                  <button
                    key={d}
                    type="button"
                    onClick={() => handlePick(d)}
                    className={cn(
                      'flex h-8 w-8 items-center justify-center rounded-lg text-sm leading-5 transition-colors',
                      selected &&
                        selected.getFullYear() === year &&
                        selected.getMonth() === month &&
                        selected.getDate() === d
                        ? 'bg-[#2563eb] font-semibold text-white'
                        : 'text-[#121c2a] hover:bg-[#f8f9ff]',
                    )}
                  >
                    {d}
                  </button>
                ),
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function LaporanArusKasPage() {
  const [draft, setDraft] = useState<ArusKasFilter>(DEFAULT_FILTER)
  const [filter, setFilter] = useState<ArusKasFilter>(DEFAULT_FILTER)
  const [page, setPage] = useState(1)
  const [period, setPeriod] = useState<PeriodKey>('bulan')
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [downloadModule, setDownloadModule] = useState('Arus Kas')
  const [downloadFormat, setDownloadFormat] = useState<'pdf' | 'xlsx'>('pdf')

  const visible = TRANSACTIONS.filter((tx) => {
    const day = dayOfMonth(tx.date)
    const fromDay = filter.from ? dayOfMonth(filter.from) : 1
    const toDay = filter.to ? dayOfMonth(filter.to) : 31
    const inRange = day >= fromDay && day <= toDay
    const matchKelompok = filter.kelompok === 'Semua Kelompok' || tx.kelompok === filter.kelompok
    const matchKategori = filter.kategori === 'Semua Kategori' || tx.kategori === filter.kategori
    const matchMetode = filter.metode === 'Semua Metode' || tx.metode === filter.metode
    return inRange && matchKelompok && matchKategori && matchMetode
  })

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageRows = visible.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const applyFilter = () => {
    setFilter(draft)
    setPage(1)
  }

  const resetFilter = () => {
    setDraft(DEFAULT_FILTER)
    setFilter(DEFAULT_FILTER)
    setPage(1)
  }

  const periodButtons: { key: PeriodKey; label: string; caption: string }[] = [
    { key: 'minggu', label: 'Per\nMinggu', caption: 'W42 (Okt)' },
    { key: 'bulan', label: 'Per\nBulan', caption: 'Okt 2026' },
    { key: 'tahun', label: 'Per\nTahun', caption: '2026/2027' },
  ]

  const firstShown = visible.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const lastShown = Math.min(safePage * PAGE_SIZE, visible.length)

  const periodBar = (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-solid border-[#c3c6d799] bg-[#f8f9ff80] px-6 py-3">
      <div className="flex items-center gap-1.5">
        <img
          src={iconFilterPeriod}
          alt=""
          aria-hidden="true"
          className="h-[12px] w-[10px]"
        />
        <span className="whitespace-nowrap text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#737686]">
          Filter
          <br />
          Periode:
        </span>
        <div className="ml-2 flex items-center gap-1 rounded-xl border border-solid border-[#c3c6d7] bg-[#eff4ff] p-1">
          {periodButtons.map(({ key, label, caption }) => {
            const active = period === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setPeriod(key)}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg px-3 py-1 text-[11px] transition-colors',
                  active
                    ? 'bg-[#2563eb] text-white'
                    : 'text-[#737686] hover:bg-white/60',
                )}
              >
                <span className="whitespace-pre-line text-center leading-[14px]">{label}</span>
                <span
                  className={cn(
                    'rounded px-1 py-0.5 text-[10px] leading-[14px] tracking-[0.44px]',
                    active ? 'bg-[#ffffff33] text-white' : 'bg-[#ffffffcc] text-[#737686]',
                  )}
                >
                  {caption}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex h-8 items-center rounded-lg border border-solid border-[#c3c6d7] bg-white px-3">
          <span className="whitespace-nowrap text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#121c2a]">
            Bulan Ini (Oktober 2026)
          </span>
        </div>
        <p className="whitespace-pre-line text-xs leading-4 text-[#737686]">
          Menampilkan data {formatRangeDate(filter.from)} -{'\n'}
          {formatRangeDate(filter.to)}
        </p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={adminItems} logo logoClassName="h-16 w-auto" />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar brand="BMS" role="Admin" />

        <main className="flex w-full max-w-[1280px] flex-col gap-6 p-6 sm:p-8">
          {/* HEADER */}
          <header className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold leading-8 tracking-[-0.6px] text-[#121c2a]">
                Laporan Arus Kas
              </h1>
              <p className="text-sm leading-5 text-[#737686]">
                Lihat seluruh transaksi arus kas berdasarkan periode dan kelompok kas.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
              onClick={() => setShowDownloadModal(true)}
                className="flex h-10 items-center gap-2 rounded-xl bg-[#2563eb] px-4 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
                type="button"
              >
                <Download className="h-3 w-3" aria-hidden="true" />
                Download Rekap
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          </header>

          {/* FILTER CARD */}
          <section className="flex w-full flex-col gap-4 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
            <div className="flex items-center justify-between border-b border-solid border-[#c3c6d7] pb-4">
              <div className="flex items-center gap-2">
                <img
                  src={filterKasIcon}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4"
                />
                <h2 className="text-base font-semibold leading-6 text-[#121c2a]">
                  Filter Laporan Kas
                </h2>
              </div>
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">
                PARAMETER AUDIT
              </span>
            </div>

            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Periode Tanggal
                </span>
                <div className="flex w-full items-center gap-2">
                  <DatePicker
                    label="Periode awal"
                    value={draft.from}
                    onChange={(v) => setDraft((f) => ({ ...f, from: v }))}
                  />
                  <ArrowRightLeft className="h-4 w-4 shrink-0 text-[#737686]" aria-hidden="true" />
                  <DatePicker
                    label="Periode akhir"
                    value={draft.to}
                    onChange={(v) => setDraft((f) => ({ ...f, to: v }))}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Kelompok Kas
                </span>
                <select
                  value={draft.kelompok}
                  onChange={(e) =>
                    setDraft((f) => ({ ...f, kelompok: e.target.value as ArusKasFilter['kelompok'] }))
                  }
                  className="h-11 w-full rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-sm text-[#121c2a]"
                  aria-label="Filter kelompok kas"
                >
                  {KELOMPOK_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Kategori Transaksi
                </span>
                <select
                  value={draft.kategori}
                  onChange={(e) =>
                    setDraft((f) => ({ ...f, kategori: e.target.value as ArusKasFilter['kategori'] }))
                  }
                  className="h-11 w-full rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-sm text-[#121c2a]"
                  aria-label="Filter kategori transaksi"
                >
                  {KATEGORI_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Metode Pembayaran
                </span>
                <select
                  value={draft.metode}
                  onChange={(e) =>
                    setDraft((f) => ({ ...f, metode: e.target.value as ArusKasFilter['metode'] }))
                  }
                  className="h-11 w-full rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-sm text-[#121c2a]"
                  aria-label="Filter metode pembayaran"
                >
                  {METODE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-solid border-[#c3c6d7] pt-5">
              <button
                className="flex h-10 items-center rounded-xl border border-solid border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                type="button"
                onClick={resetFilter}
              >
                Reset
              </button>
              <button
                className="flex h-10 items-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
                type="button"
                onClick={applyFilter}
              >
                <span
                  aria-hidden="true"
                  className="inline-block h-3 w-3 shrink-0 bg-current text-white"
                  style={{ WebkitMask: SEARCH_ICON_MASK, mask: SEARCH_ICON_MASK }}
                />
                Terapkan Filter
              </button>
            </div>
          </section>

          {/* SUMMARY CARDS */}
          <section className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-solid border-[#00b01a] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#00af1a]">
                  TOTAL PEMASUKAN
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00b01a1a]">
                  <img src={iconPemasukan} alt="" aria-hidden="true" className="h-3 w-5" />
                </div>
              </div>
              <span className="pt-4 text-[36px] font-bold leading-[44px] tracking-[-0.9px] text-[#121c2a]">
                {formatMoney(125000000)}
              </span>
              <div className="flex w-full flex-wrap items-center gap-2 pt-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#0063291a] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                  <CheckCircle2 className="h-2.5 w-2.5" aria-hidden="true" />
                  Tercatat
                </span>
                <span className="text-xs leading-[18px] text-[#737686]">
                  Periode 01 - 31 Okt 2026
                </span>
              </div>
              <span className="pointer-events-none absolute -bottom-16 -right-14 h-28 w-28 rounded-full bg-[#00b01a] opacity-60" aria-hidden="true" />
            </div>

            <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">
                  TOTAL TABUNGAN
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb1a]">
                  <Wallet className="h-[15px] w-[15px] text-[#2563eb]" aria-hidden="true" />
                </div>
              </div>
              <span className="pt-4 text-[36px] font-bold leading-[44px] tracking-[-0.9px] text-[#4f5c8e]">
                {formatMoney(85000000)}
              </span>
              <div className="flex w-full items-center gap-1.5 pt-2">
                <svg
                  width="11"
                  height="9"
                  viewBox="0 0 11 9"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M5.5 9L2 7.1V4.1L0 3L5.5 0L11 3V7H10V3.55L9 4.1V7.1L5.5 9ZM5.5 4.85L8.925 3L5.5 1.15L2.075 3L5.5 4.85ZM5.5 7.8625L8 6.5125V4.625L5.5 6L3 4.625V6.5125L5.5 7.8625Z"
                    fill="#4F5C8E"
                  />
                </svg>
                <span className="text-xs leading-[18px] text-[#4f5c8e]">
                  Kontribusi setoran tabungan
                </span>
              </div>
              <span className="pointer-events-none absolute -bottom-16 -right-14 h-28 w-28 rounded-full bg-[#eff4ff] opacity-60" aria-hidden="true" />
            </div>

            <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-solid border-[#ba1a1a] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#ba1a1a]">
                  TOTAL PENGELUARAN
                </span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ba1a1a1a]">
                  <img src={iconPengeluaran} alt="" aria-hidden="true" className="h-3 w-5" />
                </div>
              </div>
              <span className="pt-4 text-[36px] font-bold leading-[44px] tracking-[-0.9px] text-[#121c2a]">
                {formatMoney(40000000)}
              </span>
              <div className="flex w-full items-center gap-1.5 pt-2">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="shrink-0"
                >
                  <path
                    d="M1 9.5C0.725 9.5 0.489583 9.40208 0.29375 9.20625C0.0979166 9.01042 0 8.775 0 8.5V3C0 2.725 0.0979166 2.48958 0.29375 2.29375C0.489583 2.09792 0.725 2 1 2H3V1C3 0.725 3.09792 0.489583 3.29375 0.29375C3.48958 0.0979166 3.725 0 4 0H6C6.275 0 6.51042 0.0979166 6.70625 0.29375C6.90208 0.489583 7 0.725 7 1V2H9C9.275 2 9.51042 2.09792 9.70625 2.29375C9.90208 2.48958 10 2.725 10 3V8.5C10 8.775 9.90208 9.01042 9.70625 9.20625C9.51042 9.40208 9.275 9.5 9 9.5H1V9.5M1 8.5H9V8.5V8.5V3V3V3H1V3V3V8.5V8.5V8.5V8.5M4 2H6V1V1V1H4V1V1V2V2M1 8.5V8.5V8.5V3V3V3V3V3V3V8.5V8.5V8.5V8.5V8.5"
                    fill="#4F5C8E"
                  />
                </svg>
                <span className="text-xs leading-[18px] text-[#ba1a1a]">
                  Simpanan &amp; angsuran pegawai
                </span>
              </div>
              <span className="pointer-events-none absolute -bottom-16 -right-14 h-28 w-28 rounded-full bg-[#ba1a1a] opacity-60" aria-hidden="true" />
            </div>
          </section>

          {/* DATA TABLE */}
          <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d]">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] p-6">
              <div className="flex min-w-0 flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h2 className="whitespace-nowrap text-lg font-semibold leading-[26px] text-[#121c2a]">
                    Daftar Jurnal Transaksi Arus Kas
                  </h2>
                  <span className="rounded-full border border-solid border-[#c3c6d7] bg-[#eff4ff] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                    Live Data
                  </span>
                </div>
                <p className="text-xs leading-[18px] text-[#737686]">
                  Menampilkan {pageRows.length} dari {visible.length} transaksi
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <p className="text-xs leading-[18px] text-[#737686]">
                  Menampilkan {firstShown}–{lastShown} dari {visible.length} transaksi
                </p>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    className="flex h-9 items-center gap-1.5 rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                    type="button"
                  >
                    <span
                      aria-hidden="true"
                      className="inline-block h-3 w-3 shrink-0 bg-current text-[#737686]"
                      style={{ WebkitMask: SEARCH_ICON_MASK, mask: SEARCH_ICON_MASK }}
                    />
                    Detail
                  </button>
                  <button
                  className="flex h-9 items-center gap-1.5 rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                  type="button"
                  onClick={() => setShowDownloadModal(true)}
                >
                  <Download className="h-3.5 w-3.5 text-[#737686]" aria-hidden="true" />
                  Download
                </button>
                </div>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[958px] text-left">
                <thead>
                  <tr className="border-b border-solid border-[#c3c6d7] bg-[#eff4ff]">
                    {[
                      'NO',
                      'KODE',
                      'TANGGAL',
                      'KATEGORI',
                      'KELOMPOK',
                      'METODE',
                      'NOMINAL',
                      'PETUGAS',
                      'AKSI',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={cn(
                          'whitespace-nowrap px-4 py-3 text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#434655]',
                          i === 0 && 'text-center',
                          (i === 6 || i === 7) && 'text-right',
                          i === 8 && 'text-center',
                        )}
                        scope="col"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {pageRows.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-10 text-center text-sm text-[#737686]">
                        Tidak ada transaksi
                      </td>
                    </tr>
                  )}

                  {pageRows.map((tx, index) => {
                    const no = (safePage - 1) * PAGE_SIZE + index + 1
                    const MethodIcon = METODE_ICON[tx.metode]
                    const isNegative = tx.amount < 0

                    return (
                      <tr
                        className={cn(
                          index > 0 && 'border-t border-solid border-[#c3c6d7]',
                        )}
                        key={tx.code}
                      >
                        <td className="px-4 py-[18px] text-center text-sm font-medium text-[#737686]">
                          {no}
                        </td>
                        <td className="px-4 py-[18px] font-mono text-sm font-bold text-[#004ac6]">
                          {tx.code}
                        </td>
                        <td className="px-4 py-[18px] text-sm text-[#121c2a]">
                          {tx.date}
                        </td>
                        <td className="px-4 py-[18px]">
                          <span
                            className={cn(
                              'inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px]',
                              KATEGORI_BADGE[tx.kategori],
                            )}
                          >
                            {tx.kategori}
                          </span>
                        </td>
                        <td className="px-4 py-[18px]">
                          <span
                            className={cn(
                              'inline-flex rounded-full border border-solid border-[#c3c6d7] px-2.5 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px]',
                              KELOMPOK_BADGE[tx.kelompok],
                            )}
                          >
                            {tx.kelompok}
                          </span>
                        </td>
                        <td className="px-4 py-[18px]">
                          <span className="inline-flex items-center gap-1.5 whitespace-nowrap text-sm text-[#121c2a]">
                            <img src={MethodIcon} alt="" aria-hidden="true" className="h-3.5 w-auto" />
                            {tx.metode}
                          </span>
                        </td>
                        <td
                          className={cn(
                            'whitespace-nowrap px-4 py-[18px] text-right text-sm font-semibold',
                            isNegative ? 'text-[#ba1a1a]' : 'text-[#006329]',
                          )}
                        >
                          {isNegative ? '-' : ''}
                          {formatMoney(Math.abs(tx.amount))}
                        </td>
                        <td className="whitespace-nowrap px-4 py-[18px] text-right text-sm text-[#121c2a]">
                          {tx.petugas}
                        </td>
                        <td className="px-4 py-[14px] text-center">
                          <button
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6] transition-colors hover:bg-[#eff4ff]"
                            type="button"
                          >
                            <span
                              aria-hidden="true"
                              className="inline-block h-3 w-3 shrink-0 bg-current text-[#004ac6]"
                              style={{ WebkitMask: SEARCH_ICON_MASK, mask: SEARCH_ICON_MASK }}
                            />
                            Detail
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-solid border-[#c3c6d7] bg-white px-6 py-4">
              <p className="text-xs leading-[18px] text-[#737686]">
                Halaman{' '}
                <span className="font-semibold text-[#121c2a]">{safePage}</span>
                {' '}dari{' '}
                <span className="font-semibold text-[#121c2a]">{totalPages}</span>
                {' '}(Total {visible.length} Entri Kas)
              </p>

              <div className="flex items-center gap-1.5">
                <button
                  className={cn(
                    'flex h-9 items-center rounded-xl border border-solid border-[#c3c6d7] px-3 text-xs font-semibold leading-4 tracking-[0.24px]',
                    safePage === 1
                      ? 'cursor-not-allowed text-[#737686] opacity-50'
                      : 'text-[#737686] transition-colors hover:bg-[#f8f9ff]',
                  )}
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Sebelumnya
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold leading-4 tracking-[0.24px]',
                      n === safePage
                        ? 'border-solid border-[#2563eb] bg-[#2563eb] text-white'
                        : 'border-solid border-[#c3c6d7] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]',
                    )}
                    type="button"
                    aria-current={n === safePage ? 'page' : undefined}
                    onClick={() => setPage(n)}
                  >
                    {n}
                  </button>
                ))}

                <button
                  className={cn(
                    'flex h-9 items-center rounded-xl border border-solid border-[#c3c6d7] px-3 text-xs font-semibold leading-4 tracking-[0.24px]',
                    safePage === totalPages
                      ? 'cursor-not-allowed text-[#737686] opacity-50'
                      : 'text-[#121c2a] transition-colors hover:bg-[#f8f9ff]',
                  )}
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Selanjutnya
                </button>
              </div>
            </div>

            {periodBar}
          </section>

          {/* REKAPITULASI */}
          <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d]">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] p-6">
              <div className="flex items-start gap-3">
                <span className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-[#eff4ff]">
                  <img
                    src={iconRecap}
                    alt=""
                    aria-hidden="true"
                    className="h-5 w-5"
                  />
                </span>
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                      Rekapitulasi Arus Kas &amp; Saldo Saat Ini
                    </h2>
                    <span className="inline-flex items-center gap-1 rounded-full border border-solid border-[#00632933] bg-[#0063291a] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#006329]" aria-hidden="true" />
                      Kas Seimbang
                    </span>
                  </div>
                  <p className="max-w-[680px] text-xs leading-[18px] text-[#737686]">
                    Rangkuman perbandingan total pemasukan, total pengeluaran, dan sisa saldo kas
                    aktif di seluruh pos kas.
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-solid border-[#c3c6d7] bg-[#eff4ff] px-3 py-1.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                <img src={iconAudit} alt="" aria-hidden="true" className="h-5 w-auto" />
                Audit Kasir: 31 Okt 2026
              </span>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full min-w-[958px] text-left">
                <thead>
                  <tr className="border-b border-solid border-[#c3c6d7] bg-[#eff4ff]">
                    <th className="whitespace-nowrap px-5 py-5 text-center text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      NO
                    </th>
                    <th className="whitespace-nowrap px-5 py-5 text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      KOMPONEN POS / AKUN KAS
                    </th>
                    <th className="whitespace-pre-line px-5 py-3 text-right text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      TOTAL{' '}
                      <br />
                      PEMASUKAN
                      <br />
                      (DEBIT)
                    </th>
                    <th className="whitespace-pre-line px-5 py-3 text-right text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      TOTAL{' '}
                      <br />
                      PENGELUARAN
                      <br />
                      (KREDIT)
                    </th>
                    <th className="whitespace-pre-line px-5 py-3 text-right text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      JUMLAH KAS SAAT INI
                      <br />
                      (SALDO AKHIR)
                    </th>
                    <th className="whitespace-nowrap px-5 py-3 text-center text-[11px] font-bold leading-[14px] tracking-[0.55px] text-[#434655]" scope="col">
                      STATUS
                      <br />
                      REKONSILIASI
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {RECAP_ROWS.map((row) => (
                    <tr key={row.id}>
                      <td className="px-5 py-8 text-center text-sm font-medium text-[#737686]">
                        {row.id}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-solid border-[#c3c6d7] bg-[#eff4ff]">
                            {row.id === 1 ? (
                              <img
                                src={iconStudentFund}
                                alt=""
                                aria-hidden="true"
                                className="h-[14px] w-auto"
                              />
                            ) : (
                              <img
                                src={iconStaffFund}
                                alt=""
                                aria-hidden="true"
                                className="h-[15px] w-[15px]"
                              />
                            )}
                          </span>
                          <div className="whitespace-pre-line text-sm">
                            <strong className="font-semibold leading-5 text-[#121c2a]">
                              {row.name}
                            </strong>
                            <span className="block text-xs leading-[18px] text-[#737686]">
                              {row.akun}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-8 text-right font-mono text-sm font-bold text-[#006329]">
                        {formatMoney(row.debit)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-8 text-right font-mono text-sm font-bold text-[#ba1a1a]">
                        {formatMoney(row.kredit)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-8 text-right font-mono text-base font-bold text-[#004ac6]">
                        {formatMoney(row.saldo)}
                      </td>
                      <td className="px-5 py-8 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#0063291a] px-2.5 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#006329]">
                          <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                          Terverifikasi
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>

                <tfoot>
                  <tr className="border-t-2 border-solid border-[#004ac633] bg-[#eff4ffe6]">
                    <td className="px-5 py-6" colSpan={2}>
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-3.5">
                          <img
                            src={iconGrandTotal}
                            alt=""
                            aria-hidden="true"
                            className="h-[15px] w-[15px]"
                          />
                          <span className="text-center text-base font-bold leading-6 tracking-[0.4px] text-[#004ac6]">
                            TOTAL
                            <br />
                            KESELURUHAN
                            <br />
                            (GRANDTOTAL)
                          </span>
                        </span>
                        <span className="pr-3 text-xs leading-[18px] text-[#737686]">
                          (2 Akun
                          <br />
                          Rekening Kas
                          <br />
                          Sekolah)
                        </span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-5 py-6 text-right font-mono text-base font-bold text-[#006329]">
                      {formatMoney(125000000)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-6 text-right font-mono text-base font-bold text-[#ba1a1a]">
                      {formatMoney(38500000)}
                    </td>
                    <td className="whitespace-nowrap px-5 py-6 text-right font-mono text-xl font-bold tracking-[-0.1px] text-[#004ac6]">
                      {formatMoney(86500000)}
                    </td>
                    <td className="px-5 py-6 text-center">
                      <span className="inline-flex items-center gap-1 rounded-md bg-[#2563eb] px-2.5 py-1 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-white">
                        <CheckCircle2 className="h-3 w-3" aria-hidden="true" />
                        Seimbang
                      </span>
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {periodBar}
          </section>
        
        </main>

        {/* POP-UP DOWNLOAD LAPORAN */}
        {showDownloadModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
            onClick={() => setShowDownloadModal(false)}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="download-title"
              className="w-full max-w-[440px] overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* HEADER */}
              <div className="flex items-center justify-between border-b border-[#e5e7eb] px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#bfdbfe] bg-[#eff4ff]">
                    <Download className="h-4 w-4 text-[#004ac6]" />
                  </div>
                  <div>
                    <h2 id="download-title" className="text-base font-semibold text-[#121c2a]">
                      Download Laporan
                    </h2>
                    <p className="text-[11px] text-[#737686]">
                      BMS SMKS Muhammadiyah 1 Genteng
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  aria-label="Tutup pop-up"
                  className="rounded-lg p-1.5 text-[#737686] hover:bg-[#f3f4f6]"
                >
                  <span className="text-xl leading-none">×</span>
                </button>
              </div>

              <div className="space-y-5 p-5">
                {/* PILIH MODUL */}
                <div>
                  <p className="mb-2 text-[10px] font-semibold tracking-wider text-[#737686]">
                    PILIH MODUL LAPORAN
                  </p>

                  <div className="grid grid-cols-3 rounded-xl border border-[#dbe3f5] bg-[#eff4ff] p-1">
                    {['Arus Kas', 'Tabungan Siswa', 'Petugas Piket'].map((module) => (
                      <button
                        key={module}
                        type="button"
                        onClick={() => setDownloadModule(module)}
                        className={`rounded-lg px-1.5 py-2 text-[10px] font-medium transition-colors ${
                          downloadModule === module
                            ? 'bg-white text-[#004ac6] shadow-sm'
                            : 'text-[#737686] hover:bg-white/60'
                        }`}
                      >
                        {module}
                      </button>
                    ))}
                  </div>
                </div>

                {/* PILIH FORMAT */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-sm font-medium text-[#121c2a]">
                      Pilih format laporan
                    </p>
                    <span className="text-[10px] text-[#737686]">Diperlukan</span>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setDownloadFormat('pdf')}
                      className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left ${
                        downloadFormat === 'pdf'
                          ? 'border-[#0052cc] bg-[#f8f9ff]'
                          : 'border-[#e0e3eb] bg-white'
                      }`}
                    >
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 border-[#0052cc]">
                        {downloadFormat === 'pdf' && (
                          <span className="h-2 w-2 rounded-full bg-[#0052cc]" />
                        )}
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#fecaca] bg-[#fff5f5] text-[#ef4444]">
                        <FileText className="h-5 w-5" />
                      </span>

                      <span>
                        <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#121c2a]">
                          Dokumen PDF (.pdf)
                          <span className="rounded-full bg-[#dbeafe] px-2 py-0.5 text-[10px] font-medium text-[#004ac6]">
                            Resmi
                          </span>
                        </span>
                        <span className="mt-1 block text-[11px] leading-4 text-[#737686]">
                          Format standar cetak, laporan resmi bertandatangan digital
                        </span>
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setDownloadFormat('xlsx')}
                      className={`flex w-full items-start gap-3 rounded-xl border-2 p-3 text-left ${
                        downloadFormat === 'xlsx'
                          ? 'border-[#0052cc] bg-[#f8f9ff]'
                          : 'border-[#e0e3eb] bg-white'
                      }`}
                    >
                      <span className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border-2 border-[#737686]">
                        {downloadFormat === 'xlsx' && (
                          <span className="h-2 w-2 rounded-full bg-[#0052cc]" />
                        )}
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] text-[#059669]">
                        <FileText className="h-5 w-5" />
                      </span>

                      <span>
                        <span className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#121c2a]">
                          Spreadsheet Excel (.xlsx)
                          <span className="rounded-full bg-[#d1fae5] px-2 py-0.5 text-[10px] font-medium text-[#047857]">
                            Rekap
                          </span>
                        </span>
                        <span className="mt-1 block text-[11px] leading-4 text-[#737686]">
                          Format data mentah untuk pengolahan formula dan rekap lanjutan
                        </span>
                      </span>
                    </button>
                  </div>
                </div>

                {/* RINGKASAN DATA */}
                <div className="rounded-xl border border-[#dbe3f5] bg-[#f4f7ff] p-3.5">
                  <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                    <p className="text-[10px] font-semibold tracking-wide text-[#737686]">
                      DATA YANG DIUNDUH:
                    </p>
                    <span className="rounded-full bg-[#e1ebff] px-2.5 py-1 text-[10px] font-medium text-[#004ac6]">
                      Laporan {downloadModule}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-[10px] text-[#737686]">Periode Laporan</p>
                      <p className="text-[11px] font-medium text-[#121c2a]">
                        {formatRangeDate(filter.from)} - {formatRangeDate(filter.to)}
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#737686]">Total Entri / Baris</p>
                      <p className="text-[11px] font-medium text-[#121c2a]">
                        {visible.length} Transaksi Tercatat
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#737686]">Estimasi Ukuran File</p>
                      <p className="text-[11px] font-medium text-[#121c2a]">
                        {downloadFormat === 'pdf' ? '~1.4 MB' : '~850 KB'} (Siap unduh)
                      </p>
                    </div>

                    <div>
                      <p className="text-[10px] text-[#737686]">Otoritas Penandatangan</p>
                      <p className="text-[11px] font-medium text-[#121c2a]">
                        Siti Rahmawati, S.E.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FOOTER */}
              <div className="flex items-center justify-between gap-3 border-t border-[#e5e7eb] bg-[#f8f9ff] px-5 py-4">
                <button
                  type="button"
                  onClick={() => setShowDownloadModal(false)}
                  className="h-10 rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium text-[#121c2a] hover:bg-[#eff4ff]"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowDownloadModal(false)
                    // BE akan menyambungkan proses unduh melalui API.
                  }}
                  className="flex h-10 items-center justify-center gap-2 rounded-xl bg-[#0052cc] px-4 text-xs font-semibold text-white hover:bg-[#0041a8]"
                >
                  <Download className="h-3.5 w-3.5" />
                  Download Laporan (.{downloadFormat})
                </button>
              </div>
            </div>
          </div>
        )
      }
      </div>
    </div>
  )
}