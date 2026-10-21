import { useState } from 'react'
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  Search,
  SlidersHorizontal,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import { adminItems } from '@/components/dashboard/admin-sidebar-items'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'
import { DetailLaporanPiketModal, type LaporanPiketDetail as LaporanPiket } from '@/components/roles/admin/DetailLaporanPiketModal'
import filterKasIcon from '@/assets/icon/report/filter-kas.svg'

const NAMA = ['Ahmad', 'Sinta', 'Budi', 'Dewi Susanti', 'Fajar Ramadhan']
const NIS = ['23001', '23014', '23027', '23033', '23048']
const AVATAR = ['AF', 'SR', 'BM', 'DS', 'FR']
const KELAS = ['XI AKL 1', 'XI AKL 2', 'X AKL 1', 'X TKJ 1']
const DETAIL_PAGI = [
  'Pencatatan setoran tabungan & presensi siswa',
  'Verifikasi kartu tabungan kelas XI',
  'Sinkronisasi presensi mandiri dan input slip setoran',
]
const DETAIL_SIANG = [
  'Rekapitulasi kas loket piket Gedung A',
  'Pelayanan pencatatan penarikan saldo mini bank',
]
const LOKASI = [
  { nama: 'Loket BMS', detail: 'Sebelah BTN, dan SuryaMart' },
  { nama: 'Gedung A - Lantai 1', detail: 'Dekat Ruang Tata Usaha' },
  { nama: 'Loket Mini Bank', detail: 'Depan Kantin Sekolah' },
]
const KEGIATAN_PAGI = 'Kegiatan Piket Pagi Terpadu & Rekapitulasi Loket Kasir'
const KEGIATAN_SIANG = 'Kegiatan Piket Siang & Pelayanan Loket Mini Bank'
const KEGIATAN_DETAIL =
  'Melakukan pengecekan kebersihan dan kedisiplinan kelas, membantu rekapitulasi setoran tabungan siswa loket lantai 1, serta pencatatan presensi kehadiran siswa terlambat pada gerbang utama SMK Muhammadiyah 1 Genteng.'
const VALIDATOR = 'Siti Rahmawati, S.E.'
const VALIDATOR_META =
  'Admin Keuangan & Kasir Pusat • Terhubung Buku Besar Bank Mini'

const TOTAL_LAPORAN = 48
const JUMLAH_PAGI = 28

const LAPORAN: LaporanPiket[] = Array.from({ length: TOTAL_LAPORAN }, (_, i) => {
  const pagi = i < JUMLAH_PAGI
  const day = (i % 28) + 1
  const idx = i % NAMA.length
  const lokasi = LOKASI[i % LOKASI.length]
  const tanggal = `${String(day).padStart(2, '0')} Okt 2026`
  return {
    id: i + 1,
    docNo: `PKT-202610${String(day).padStart(2, '0')}-${String((i % 9) + 1).padStart(2, '0')}`,
    tanggal,
    jam: pagi ? '07:00 - 11:30 WIB' : '12:30 - 15:45 WIB',
    sesi: pagi ? 'Sesi Piket Pagi' : 'Sesi Piket Siang',
    nama: NAMA[idx],
    initials: AVATAR[idx],
    nis: NIS[idx],
    rol: 'Petugas Piket Harian',
    kelas: KELAS[i % KELAS.length],
    aktivitas: pagi ? 'Piket pagi' : 'Piket siang',
    kegiatan: pagi ? KEGIATAN_PAGI : KEGIATAN_SIANG,
    detail: pagi ? DETAIL_PAGI[i % DETAIL_PAGI.length] : DETAIL_SIANG[i % DETAIL_SIANG.length],
    deskripsi: KEGIATAN_DETAIL,
    jumlahFoto: 1,
    fotoJudul: 'Pengecekan Disiplin Siswa',
    fotoLabel: 'Pengecekan Disiplin',
    fotoWaktu: `Foto diambil pukul ${pagi ? '07:18' : '13:05'} WIB`,
    lokasi: lokasi.nama,
    lokasiDetail: lokasi.detail,
    validator: VALIDATOR,
    validatorMeta: VALIDATOR_META,
    hash: `8F9B-PIKET-2026-${String((i % 9) + 1).padStart(2, '0')}-SMKM1`,
    status: 'Selesai Diverifikasi',
  }
})

const NAMA_OPTIONS = ['Semua Nama', ...NAMA]
const KELAS_OPTIONS = ['Semua Kelas', ...KELAS]
const PAGE_SIZE = 10

interface FilterPiket {
  from: string
  to: string
  nama: string
  kelas: string
}

const DEFAULT_FILTER: FilterPiket = {
  from: '01/10/2026',
  to: '31/10/2026',
  nama: 'Semua Nama',
  kelas: 'Semua Kelas',
}

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

export function LaporanPetugasPiketPage() {
  const [draft, setDraft] = useState<FilterPiket>(DEFAULT_FILTER)
  const [filter, setFilter] = useState<FilterPiket>(DEFAULT_FILTER)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<LaporanPiket | null>(null)
  const loading = useSimulatedLoading()

  const visible = LAPORAN.filter((l) => {
    const day = dayOfMonth(l.tanggal)
    const fromDay = filter.from ? dayOfMonth(filter.from) : 1
    const toDay = filter.to ? dayOfMonth(filter.to) : 31
    const inRange = day >= fromDay && day <= toDay
    const matchNama = filter.nama === 'Semua Nama' || l.nama === filter.nama
    const matchKelas = filter.kelas === 'Semua Kelas' || l.kelas === filter.kelas
    const query = search.trim().toLowerCase()
    const matchSearch =
      query === '' ||
      l.nama.toLowerCase().includes(query) ||
      l.kelas.toLowerCase().includes(query) ||
      l.detail.toLowerCase().includes(query)
    return inRange && matchNama && matchKelas && matchSearch
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
    setSearch('')
    setPage(1)
  }

  const jumlahPagi = visible.filter((l) => l.aktivitas === 'Piket pagi').length
  const jumlahSiang = visible.length - jumlahPagi

  const firstShown = visible.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const lastShown = Math.min(safePage * PAGE_SIZE, visible.length)

  const checkIcon = (
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
        d="M4.3 7.3L7.825 3.775L7.125 3.075L4.3 5.9L2.875 4.475L2.175 5.175L4.3 7.3ZM5 10C4.30833 10 3.65833 9.86875 3.05 9.60625C2.44167 9.34375 1.9125 8.9875 1.4625 8.5375C1.0125 8.0875 0.65625 7.55833 0.39375 6.95C0.13125 6.34167 0 5.69167 0 5C0 4.30833 0.13125 3.65833 0.39375 3.05C0.65625 2.44167 1.0125 1.9125 1.4625 1.4625C1.9125 1.0125 2.44167 0.65625 3.05 0.39375C3.65833 0.13125 4.30833 0 5 0C5.69167 0 6.34167 0.13125 6.95 0.39375C7.55833 0.65625 8.0875 1.0125 8.5375 1.4625C8.9875 1.9125 9.34375 2.44167 9.60625 3.05C9.86875 3.65833 10 4.30833 10 5C10 5.69167 9.86875 6.34167 9.60625 6.95C9.34375 7.55833 8.9875 8.0875 8.5375 8.5375C8.0875 8.9875 7.55833 9.34375 6.95 9.60625C6.34167 9.86875 5.69167 10 5 10ZM5 9C6.11667 9 7.0625 8.6125 7.8375 7.8375C8.6125 7.0625 9 6.11667 9 5C9 3.88333 8.6125 2.9375 7.8375 2.1625C7.0625 1.3875 6.11667 1 5 1C3.88333 1 2.9375 1.3875 2.1625 2.1625C1.3875 2.9375 1 3.88333 1 5C1 6.11667 1.3875 7.0625 2.1625 7.8375C2.9375 8.6125 3.88333 9 5 9Z"
        fill="#006329"
      />
    </svg>
  )

  const kpiCards = [
    {
      icon: (
        <svg
          width="18"
          height="20"
          viewBox="0 0 18 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M2 20C1.45 20 0.979167 19.8042 0.5875 19.4125C0.195833 19.0208 0 18.55 0 18V4C0 3.45 0.195833 2.97917 0.5875 2.5875C0.979167 2.19583 1.45 2 2 2H6.2C6.41667 1.4 6.77917 0.916667 7.2875 0.55C7.79583 0.183333 8.36667 0 9 0C9.63333 0 10.2042 0.183333 10.7125 0.55C11.2208 0.916667 11.5833 1.4 11.8 2H16C16.55 2 17.0208 2.19583 17.4125 2.5875C17.8042 2.97917 18 3.45 18 4V18C18 18.55 17.8042 19.0208 17.4125 19.4125C17.0208 19.8042 16.55 20 16 20H2ZM2 18H16V4H2V18ZM4 16H11V14H4V16ZM4 12H14V10H4V12ZM4 8H14V6H4V8ZM9 3.25C9.21667 3.25 9.39583 3.17917 9.5375 3.0375C9.67917 2.89583 9.75 2.71667 9.75 2.5C9.75 2.28333 9.67917 2.10417 9.5375 1.9625C9.39583 1.82083 9.21667 1.75 9 1.75C8.78333 1.75 8.60417 1.82083 8.4625 1.9625C8.32083 2.10417 8.25 2.28333 8.25 2.5C8.25 2.71667 8.32083 2.89583 8.4625 3.0375C8.60417 3.17917 8.78333 3.25 9 3.25ZM2 18V4V18Z"
            fill="#004AC6"
          />
        </svg>
      ),
      iconBg: 'bg-[#eff4ff]',
      label: 'Total Laporan Piket',
      value: `${visible.length} Laporan`,
      caption: 'Bulan Oktober 2026',
      captionClass: 'text-[#004ac6]',
      captionIcon: undefined,
    },
    {
      icon: (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M10 3V0H12V3H10ZM10 22V19H12V22H10ZM19 12V10H22V12H19ZM0 12V10H3V12H0ZM17.7 5.7L16.3 4.3L18.05 2.5L19.5 3.95L17.7 5.7ZM3.95 19.5L2.5 18.05L4.3 16.3L5.7 17.7L3.95 19.5ZM18.05 19.5L16.3 17.7L17.7 16.3L19.5 18.05L18.05 19.5ZM4.3 5.7L2.5 3.95L3.95 2.5L5.7 4.3L4.3 5.7ZM11 17C9.33333 17 7.91667 16.4167 6.75 15.25C5.58333 14.0833 5 12.6667 5 11C5 9.33333 5.58333 7.91667 6.75 6.75C7.91667 5.58333 9.33333 5 11 5C12.6667 5 14.0833 5.58333 15.25 6.75C16.4167 7.91667 17 9.33333 17 11C17 12.6667 16.4167 14.0833 15.25 15.25C14.0833 16.4167 12.6667 17 11 17ZM11 15C12.1167 15 13.0625 14.6125 13.8375 13.8375C14.6125 13.0625 15 12.1167 15 11C15 9.88333 14.6125 8.9375 13.8375 8.1625C13.0625 7.3875 12.1167 7 11 7C9.88333 7 8.9375 7.3875 8.1625 8.1625C7.3875 8.9375 7 9.88333 7 11C7 12.1167 7.3875 13.0625 8.1625 13.8375C8.9375 14.6125 9.88333 15 11 15Z"
            fill="#004AC6"
          />
        </svg>
      ),
      iconBg: 'bg-[#dee9fc]',
      label: 'Piket Pagi Terlaksana',
      value: `${jumlahPagi} Sesi`,
      caption: '100% Tervalidasi',
      captionClass: 'text-[#006329]',
      captionIcon: checkIcon,
    },
    {
      icon: (
        <svg
          width="20"
          height="16"
          viewBox="0 0 20 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M16.35 6.1L14.95 4.65L17.1 2.55L18.5 3.95L16.35 6.1ZM0 16V14H20V16H0ZM9 3V0H11V3H9ZM3.65 6.05L1.55 3.9L2.95 2.5L5.1 4.65L3.65 6.05ZM5.425 10H14.575C14.1917 9.1 13.5917 8.375 12.775 7.825C11.9583 7.275 11.0333 7 10 7C8.96667 7 8.04167 7.275 7.225 7.825C6.40833 8.375 5.80833 9.1 5.425 10ZM3 12C3 10.05 3.67917 8.39583 5.0375 7.0375C6.39583 5.67917 8.05 5 10 5C11.95 5 13.6042 5.67917 14.9625 7.0375C16.3208 8.39583 17 10.05 17 12H3Z"
            fill="#4F5C8E"
          />
        </svg>
      ),
      iconBg: 'bg-[#b7c4fd66]',
      label: 'Piket Siang\nTerlaksana',
      value: `${jumlahSiang} Sesi`,
      caption: '100% Tervalidasi',
      captionClass: 'text-[#006329]',
      captionIcon: checkIcon,
    },
    {
      icon: (
        <svg
          width="16"
          height="20"
          viewBox="0 0 16 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M6.95 13.55L12.6 7.9L11.175 6.475L6.95 10.7L4.85 8.6L3.425 10.025L6.95 13.55ZM8 20C5.68333 19.4167 3.77083 18.0875 2.2625 16.0125C0.754167 13.9375 0 11.6333 0 9.1V3L8 0L16 3V9.1C16 11.6333 15.2458 13.9375 13.7375 16.0125C12.2292 18.0875 10.3167 19.4167 8 20ZM8 17.9C9.73333 17.35 11.1667 16.25 12.3 14.6C13.4333 12.95 14 11.1167 14 9.1V4.375L8 2.125L2 4.375V9.1C2 11.1167 2.56667 12.95 3.7 14.6C4.83333 16.25 6.26667 17.35 8 17.9Z"
            fill="#006329"
          />
        </svg>
      ),
      iconBg: 'bg-[#7ffc9766]',
      label: 'Tingkat Kehadiran',
      value: '98.5%',
      caption: 'Tepat Waktu &\nAkurat',
      captionClass: 'text-[#006329]',
      captionIcon: undefined,
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={adminItems} logo variant="admin" />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Admin" />

        <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-7 p-8">
          {loading ? (
            <PageSkeleton variant="report" hasFilters />
          ) : (
            <>
          {/* HEADER */}
          <header className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl font-semibold leading-8 tracking-[-0.6px] text-[#121c2a]">
                Laporan Petugas Piket
              </h1>
              <p className="text-sm leading-5 text-[#737686]">
                Lihat dan kelola laporan kegiatan petugas piket berdasarkan tanggal, kelas, dan{' '}
                nama.
              </p>
            </div>

            <button
              className="flex h-11 items-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
              type="button"
            >
              <Download className="h-3 w-3" aria-hidden="true" />
              Unduh Laporan
              <span className="text-xs font-normal text-white/85">(Excel/PDF)</span>
            </button>
          </header>

          {/* SUMMARY CARDS */}
          <section className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 stagger-children stagger-children">
            {kpiCards.map((card) => (
              <div
                key={card.label}
                className="flex items-center gap-4 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]"
              >
                <div
                  className={cn(
                    'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
                    card.iconBg,
                  )}
                >
                  {card.icon}
                </div>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="whitespace-pre-line text-xs leading-[18px] text-[#737686]">
                    {card.label}
                  </span>
                  <span className="text-xl font-semibold leading-7 tracking-[-0.1px] text-[#121c2a]">
                    {card.value}
                  </span>
                  <span
                    className={cn(
                      'flex items-center gap-1 whitespace-pre-line text-[11px] font-medium leading-[14px] tracking-[0.44px]',
                      card.captionClass,
                    )}
                  >
                    {card.captionIcon}
                    {card.caption}
                  </span>
                </div>
              </div>
            ))}
          </section>

          {/* FILTER CARD */}
          <section className="flex w-full flex-col gap-4 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
            <div className="flex items-center justify-between border-b border-solid border-[#c3c6d7] pb-4">
              <div className="flex items-center gap-2">
                <img src={filterKasIcon} alt="" aria-hidden="true" className="h-4 w-4" />
                <h2 className="text-base font-semibold leading-6 text-[#121c2a]">
                  Filter Pencarian Laporan Piket
                </h2>
              </div>
              <SlidersHorizontal className="h-4 w-4 text-[#737686]" aria-hidden="true" />
            </div>

            <div className="flex w-full flex-wrap items-end gap-4">
              <div className="flex min-w-[300px] flex-1 flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Rentang Tanggal Piket
                </span>
                <div className="flex w-full items-center gap-2">
                  <DatePicker
                    label="Tanggal awal piket"
                    value={draft.from}
                    onChange={(v) => setDraft((f) => ({ ...f, from: v }))}
                  />
                  <span className="shrink-0 text-base leading-6 text-[#737686]">—</span>
                  <DatePicker
                    label="Tanggal akhir piket"
                    value={draft.to}
                    onChange={(v) => setDraft((f) => ({ ...f, to: v }))}
                  />
                </div>
              </div>

              <div className="flex w-36 flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Kelas
                </span>
                <select
                  value={draft.kelas}
                  onChange={(e) => setDraft((f) => ({ ...f, kelas: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-sm text-[#121c2a]"
                  aria-label="Filter kelas petugas piket"
                >
                  {KELAS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex w-44 flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Nama Petugas
                </span>
                <select
                  value={draft.nama}
                  onChange={(e) => setDraft((f) => ({ ...f, nama: e.target.value }))}
                  className="h-11 w-full rounded-xl border border-solid border-[#c3c6d7] bg-white px-3 text-sm text-[#121c2a]"
                  aria-label="Filter nama petugas piket"
                >
                  {NAMA_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ml-auto flex items-end gap-2.5">
                <button
                  className="flex h-11 items-center whitespace-nowrap rounded-xl border border-solid border-[#c3c6d7] bg-white px-4 text-sm font-medium leading-5 text-[#737686] transition-colors hover:bg-[#f8f9ff]"
                  type="button"
                  onClick={resetFilter}
                >
                  Reset
                </button>
                <button
                  className="flex h-11 items-center whitespace-nowrap rounded-xl bg-[#004ac6] px-4 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#0041a8]"
                  type="button"
                  onClick={applyFilter}
                >
                  Terapkan Filter
                </button>
              </div>
            </div>
          </section>

          {/* DATA TABLE */}
          <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-solid border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d]">
            <div className="flex w-full flex-wrap items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] p-4 px-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Tampilkan
                </span>
                <select
                  value={PAGE_SIZE}
                  className="h-9 rounded-lg border border-solid border-[#c3c6d7] bg-white px-3 text-xs leading-[18px] text-[#121c2a]"
                  aria-label="Jumlah entri per halaman"
                  disabled
                >
                  <option value={PAGE_SIZE}>{PAGE_SIZE}</option>
                </select>
                <span className="text-xs leading-[18px] text-[#737686]">
                  entri terpilih (Total {TOTAL_LAPORAN} Laporan)
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="flex h-9 items-center gap-2 rounded-lg border border-solid border-[#c3c6d7] bg-[#eff4ff] px-3">
                  <Search className="h-3.5 w-3.5 shrink-0 text-[#737686]" aria-hidden="true" />
                  <input
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value)
                      setPage(1)
                    }}
                    placeholder="Cari nama petugas, kelas..."
                    className="w-48 bg-transparent text-xs text-[#121c2a] outline-none placeholder:text-[#6b7280]"
                    aria-label="Cari nama petugas, kelas"
                  />
                </div>
                <button
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-solid border-[#c3c6d7] bg-white text-[#737686] transition-colors hover:bg-[#f8f9ff]"
                  type="button"
                  aria-label="Reset pencarian"
                  onClick={() => {
                    setSearch('')
                    setPage(1)
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 12C4.325 12 2.90625 11.4188 1.74375 10.2563C0.58125 9.09375 0 7.675 0 6C0 4.325 0.58125 2.90625 1.74375 1.74375C2.90625 0.58125 4.325 0 6 0C6.8625 0 7.6875 0.178125 8.475 0.534375C9.2625 0.890625 9.9375 1.4 10.5 2.0625V0H12V5.25H6.75V3.75H9.9C9.5 3.05 8.95312 2.5 8.25937 2.1C7.56562 1.7 6.8125 1.5 6 1.5C4.75 1.5 3.6875 1.9375 2.8125 2.8125C1.9375 3.6875 1.5 4.75 1.5 6C1.5 7.25 1.9375 8.3125 2.8125 9.1875C3.6875 10.0625 4.75 10.5 6 10.5C6.9625 10.5 7.83125 10.225 8.60625 9.675C9.38125 9.125 9.925 8.4 10.2375 7.5H11.8125C11.4625 8.825 10.75 9.90625 9.675 10.7437C8.6 11.5812 7.375 12 6 12Z"
                      fill="#737686"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="table-stagger w-full min-w-[958px] text-left">
                <thead>
                  <tr className="border-b border-solid border-[#c3c6d7] bg-[#eff4ff]">
                    {['NO', 'TANGGAL', 'PETUGAS', 'KELAS', 'AKTIVITAS', 'STATUS', 'AKSI'].map(
                      (h, i) => (
                        <th
                          key={h}
                          className={cn(
                            'whitespace-nowrap px-4 py-3 text-xs font-semibold leading-4 tracking-[0.24px] text-[#434655]',
                            (i === 0 || i === 5 || i === 6) && 'text-center',
                          )}
                          scope="col"
                        >
                          {h}
                        </th>
                      ),
                    )}
                  </tr>
                </thead>

                <tbody>
                  {pageRows.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-[#737686]">
                        Tidak ada laporan piket
                      </td>
                    </tr>
                  )}

                  {pageRows.map((l, index) => (
                    <tr
                      className={cn(index > 0 && 'border-t border-solid border-[#c3c6d799]')}
                      key={l.id}
                    >
                      <td className="px-4 py-6 text-center text-xs font-medium text-[#737686]">
                        {(safePage - 1) * PAGE_SIZE + index + 1}
                      </td>
                      <td className="px-4 py-6">
                        <span className="block text-sm font-medium leading-5 text-[#121c2a]">
                          {l.tanggal}
                        </span>
                        <span className="block text-xs leading-[18px] text-[#737686]">{l.jam}</span>
                      </td>
                      <td className="px-4 py-6">
                        <span className="block text-sm font-semibold leading-5 text-[#121c2a]">
                          {l.nama}
                        </span>
                        <span className="block text-xs leading-[18px] text-[#737686]">{l.rol}</span>
                      </td>
                      <td className="px-4 py-6">
<span className="inline-flex whitespace-nowrap rounded-md bg-[#dee9fc] px-2.5 py-1 text-xs font-medium leading-[18px] text-[#434655]">
                            {l.kelas}
                          </span>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={cn(
                              'h-1.5 w-1.5 shrink-0 rounded-full',
                              l.aktivitas === 'Piket pagi' ? 'bg-[#004ac6]' : 'bg-[#4f5c8e]',
                            )}
                            aria-hidden="true"
                          />
                          <span className="whitespace-nowrap text-sm font-medium leading-5 text-[#121c2a]">
                            {l.aktivitas}
                          </span>
                        </div>
                        <p className="mt-1 max-w-[300px] pl-3.5 text-xs leading-[18px] text-[#737686]">
                          {l.detail}
                        </p>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#15803d]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#15803d]" aria-hidden="true" />
                          {l.status}
                        </span>
                      </td>
                      <td className="px-4 py-6 text-center">
                        <button
                          className="inline-flex items-center gap-1.5 rounded-lg border border-solid border-[#004ac64c] bg-[#eff4ff] px-3 py-1.5 text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6] transition-colors hover:bg-[#dee9fc]"
                          type="button"
                          onClick={() => setSelected(l)}
                        >
                          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-solid border-[#c3c6d7] bg-white px-6 py-4">
              <p className="text-xs leading-[18px] text-[#737686]">
                Menampilkan{' '}
                <span className="font-semibold text-[#121c2a]">
                  {firstShown} - {lastShown}
                </span>{' '}
                dari <span className="font-semibold text-[#121c2a]">{visible.length}</span> laporan
                piket
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  className={cn(
                    'flex h-9 items-center gap-1.5 rounded-lg border border-solid border-[#c3c6d7] px-4 text-xs font-semibold leading-4 tracking-[0.24px]',
                    safePage === 1
                      ? 'cursor-not-allowed text-[#737686] opacity-50'
                      : 'text-[#121c2a] transition-colors hover:bg-[#f8f9ff]',
                  )}
                  type="button"
                  disabled={safePage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-lg border text-xs leading-[18px]',
                        n === safePage
                          ? 'border-solid border-[#004ac6] bg-[#004ac6] font-semibold text-white'
                          : 'border-solid border-transparent text-[#121c2a] transition-colors hover:bg-[#f8f9ff]',
                      )}
                      type="button"
                      aria-current={n === safePage ? 'page' : undefined}
                      onClick={() => setPage(n)}
                    >
                      {n}
                    </button>
                  ))}
                </div>

                <button
                  className={cn(
                    'flex h-9 items-center gap-1.5 rounded-lg border border-solid border-[#c3c6d7] px-4 text-xs font-semibold leading-4 tracking-[0.24px]',
                    safePage === totalPages
                      ? 'cursor-not-allowed text-[#737686] opacity-50'
                      : 'text-[#121c2a] transition-colors hover:bg-[#f8f9ff]',
                  )}
                  type="button"
                  disabled={safePage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  Selanjutnya
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
            </>
          )}
        </main>
      </div>

      {selected && <DetailLaporanPiketModal laporan={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}