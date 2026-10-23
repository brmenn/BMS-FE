import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpFromLine,
  CalendarRange,
  ChevronDown,
  Download,
  FileText,
  Filter,
  RotateCcw,
  Search,
  Table2,
  TrendingUp,
  Wallet,
  X,
} from 'lucide-react'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import { adminItems } from '@/components/dashboard/admin-sidebar-items'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'
import './AdminTabunganPage.css'

const students = [
  {
    no: 1,
    initials: 'AH',
    name: 'Ahmad',
    type: 'Siswa Reguler',
    nis: '23001',
    kelas: 'XI AKL 1',
    saldo: 'Rp 1.200.000',
    setoran: 'Rp 2.000.000',
    penarikan: 'Rp 800.000',
    status: 'Aktif',
    avatarBg: '#dbe1ff',
    avatarText: '#004ac6',
  },
  {
    no: 2,
    initials: 'SI',
    name: 'Sinta',
    type: 'Siswa Reguler',
    nis: '23002',
    kelas: 'XI AKL 1',
    saldo: 'Rp 850.000',
    setoran: 'Rp 1.000.000',
    penarikan: 'Rp 150.000',
    status: 'Aktif',
    avatarBg: '#b7c4fd',
    avatarText: '#435081',
  },
  {
    no: 3,
    initials: 'DI',
    name: 'Dinda',
    type: 'Siswa Reguler',
    nis: '23003',
    kelas: 'XI AKL 2',
    saldo: 'Rp 650.000',
    setoran: 'Rp 700.000',
    penarikan: 'Rp 50.000',
    status: 'Aktif',
    avatarBg: '#fce7f3',
    avatarText: '#9d174d',
  },
  {
    no: 4,
    initials: 'FR',
    name: 'Fajar Ramadhan',
    type: 'Siswa Reguler',
    nis: '23004',
    kelas: 'X TKJ 1',
    saldo: 'Rp 2.100.000',
    setoran: 'Rp 2.500.000',
    penarikan: 'Rp 400.000',
    status: 'Aktif',
    avatarBg: '#dbeafe',
    avatarText: '#1d4ed8',
  },
  {
    no: 5,
    initials: 'NA',
    name: 'Nabila Azzahra',
    type: 'Siswa Reguler',
    nis: '23005',
    kelas: 'XII BDP',
    saldo: 'Rp 450.000',
    setoran: 'Rp 600.000',
    penarikan: 'Rp 150.000',
    status: 'Aktif',
    avatarBg: '#fef3c7',
    avatarText: '#92400e',
  },
]

export function AdminTabunganPage() {
  const [showDownloadModal, setShowDownloadModal] = useState(false)
  const [format, setFormat] = useState<'pdf' | 'excel'>('pdf')
  const [modul, setModul] = useState('Tabungan Siswa')
  const loading = useSimulatedLoading()

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={adminItems} logo variant="admin" />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Admin" />

        <div className="mx-auto flex w-full max-w-[1360px] flex-col gap-7 p-4 sm:p-8">
          {loading ? (
            <PageSkeleton variant="detail" hasFilters />
          ) : (
            <>
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 flex-wrap">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-[-0.6px] text-[#121c2a]">Laporan Tabungan Siswa</h1>
          <p className="text-sm text-[#737686]">Lihat saldo, setoran, penarikan, dan histori tabungan setiap siswa.</p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#2563eb] px-4 text-sm font-medium text-white shadow-xs hover:bg-[#1d4ed8]"
            onClick={() => setShowDownloadModal(true)}
          >
            <Download size={16} />
            Unduh Rekap Excel/PDF
          </button>
        </div>
      </header>

          <section className="w-full rounded-xl border border-[#c3c6d7]/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
            <div className="flex flex-wrap items-end gap-3">
              <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24px] text-[#434655]">
                  <CalendarRange size={11} />
                  Tanggal
                </span>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-[#c3c6d7] bg-white px-3 text-[13px] text-[#121c2a] transition hover:bg-[#f8f9ff]"
                >
                  <span>06/12/2022</span>
                  <ChevronDown size={12} className="text-[#737686]" />
                </button>
              </div>

              <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24px] text-[#434655]">
                  <Filter size={11} />
                  Tingkat / Kelas
                </span>
                <button
                  type="button"
                  className="flex h-10 w-full items-center justify-between rounded-lg border border-[#c3c6d7] bg-white px-3 text-[13px] text-[#121c2a] transition hover:bg-[#f8f9ff]"
                >
                  <span>XI AKL 1</span>
                  <ChevronDown size={12} className="text-[#737686]" />
                </button>
              </div>

              <div className="flex min-w-[180px] flex-1 flex-col gap-1.5">
                <span className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.24px] text-[#434655]">
                  <Search size={11} />
                  Cari Siswa
                </span>
                <div className="relative w-full">
                  <Search
                    size={13}
                    className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[#737686]"
                  />
                  <input
                    type="text"
                    placeholder="Cari nama siswa atau NIS..."
                    className="h-10 w-full rounded-lg border border-[#c3c6d7] bg-white pr-3 pl-8 text-[13px] text-[#121c2a] outline-none placeholder:text-[#737686] focus:border-[#2563eb]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="flex h-10 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-[12px] font-semibold tracking-[0.24px] text-white shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition hover:bg-[#1d4ed8]"
                >
                  Terapkan Filter
                </button>
                <button
                  type="button"
                  aria-label="Reset filter"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#c3c6d7] bg-white text-[#434655] transition hover:bg-[#f8f9ff]"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </section>

          {/* Section Summary Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 stagger-children stagger-children">
            {/* TOTAL SALDO SISWA */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-[0.55px] text-[#004ac6]">TOTAL SALDO SISWA</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10">
                  <Wallet className="h-5 w-5 text-[#2563eb]" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 z-10">
                <strong className="text-2xl font-bold tracking-[-0.6px] text-[#004ac6]">
                  Rp 85.000.000
                </strong>
                <span className="text-xs text-[#737686]">Akumulasi saldo simpanan aktif 1.245 siswa</span>
              </div>
              <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#eff4ff] opacity-80 pointer-events-none" />
            </div>

            {/* TOTAL TRANSAKSI */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-[0.55px] text-[#737686]">TOTAL TRANSAKSI</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#737686]/10">
                  <ArrowDownToLine className="h-5 w-5 text-[#737686]" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 z-10">
                <div className="flex items-baseline gap-1.5">
                  <strong className="text-2xl font-bold tracking-[-0.6px] text-[#121c2a]">1.245</strong>
                  <span className="text-sm font-semibold text-[#737686]">transaksi</span>
                </div>
                <span className="text-xs text-[#737686]">Mutasi setoran & penarikan periode ini</span>
              </div>
              <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#f8f9ff] pointer-events-none" />
            </div>

            {/* TOTAL SETORAN */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#00b01a] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-[0.55px] text-[#00af1a]">TOTAL SETORAN</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00b01a]/10">
                  <ArrowDownToLine className="h-5 w-5 text-[#00af1a]" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 z-10">
                <strong className="text-2xl font-bold tracking-[-0.6px] text-[#121c2a]">
                  Rp 95.000.000
                </strong>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737686]">Arus Masuk Siswa</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#006329]/10 px-2 py-0.5 text-[11px] font-semibold text-[#006329]">
                    <TrendingUp className="h-3 w-3" />
                    +14.2% bln ini
                  </span>
                </div>
              </div>
              <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#00b01a]/20 pointer-events-none" />
            </div>

            {/* TOTAL PENARIKAN */}
            <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ba1a1a] bg-white p-6 shadow-xs">
              <div className="flex items-center justify-between z-10">
                <span className="text-[11px] font-semibold tracking-[0.55px] text-[#ba1a1a]">TOTAL PENARIKAN</span>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ba1a1a]/10">
                  <ArrowUpFromLine className="h-5 w-5 text-[#ba1a1a]" />
                </div>
              </div>
              <div className="mt-4 flex flex-col gap-2 z-10">
                <strong className="text-2xl font-bold tracking-[-0.6px] text-[#121c2a]">
                  Rp 10.000.000
                </strong>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#737686]">Pencairan Terverifikasi</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2563eb]/10 px-2 py-0.5 text-[11px] font-semibold text-[#004ac6]">
                    <FileText className="h-3 w-3" />
                    100% tervalidasi
                  </span>
                </div>
              </div>
              <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#ba1a1a]/20 pointer-events-none" />
            </div>
          </div>

          {/* Tabel Data Rekapitulasi Tabungan */}
          <div className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#c3c6d7] p-6">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-[#121c2a]">Data Rekapitulasi Tabungan</h2>
                <span className="inline-flex items-center rounded-full bg-[#eff4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#004ac6] border border-[#c3c6d7]">
                  1.245 Terdaftar
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#737686]">Tampilkan:</span>
                <button
                  type="button"
                  className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#c3c6d7] bg-white px-3 text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
                >
                  5 Baris
                  <ChevronDown size={12} className="text-[#737686]" />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="table-stagger w-full min-w-[900px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#c3c6d7] bg-[#eff4ff]">
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">NO</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">NAMA SISWA</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">NIS</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">KELAS</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">SALDO / SETORAN</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">TOTAL PENARIKAN</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">STATUS REKENING</th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.nis} className="border-t border-[#c3c6d7] hover:bg-[#f8f9ff]">
                      <td className="px-6 py-5 text-center text-sm font-medium text-[#737686]">{student.no}</td>
                      <td className="px-6 py-5 text-center">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="text-sm font-semibold text-[#121c2a]">{student.name}</span>
                          <span className="text-xs text-[#737686]">{student.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center font-mono text-sm font-bold text-[#004ac6]">{student.nis}</td>
                      <td className="px-6 py-5 text-center">
                        <span className="inline-flex rounded-full bg-[#eff4ff] px-3 py-1 text-xs font-semibold text-[#2563eb] border border-[#c3c6d7] whitespace-nowrap">
                          {student.kelas}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center font-mono text-base whitespace-nowrap">
                        <div className="flex flex-col items-center gap-0.5">
                          <span className="font-bold text-[#004ac6]">{student.saldo}</span>
                          <span className="text-[11px] text-[#006329]">Setoran: {student.setoran}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-center font-mono text-base font-bold text-[#ba1a1a] whitespace-nowrap">{student.penarikan}</td>
                      <td className="px-6 py-5 text-center whitespace-nowrap">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006329]/10 px-3 py-1 text-xs font-semibold text-[#006329]">
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-center">
                        <button
                          type="button"
                          className="inline-flex items-center gap-1.5 rounded-xl border border-[#c3c6d7] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#004ac6] hover:bg-[#eff4ff] shadow-xs"
                          onClick={() => setShowDownloadModal(true)}
                        >
                          Detail
                          <ArrowRight size={12} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-[#c3c6d7] px-6 py-4 bg-white">
              <p className="text-xs text-[#737686]">
                Menampilkan <span className="font-semibold text-[#121c2a]">1-5</span> dari <span className="font-semibold text-[#121c2a]">1.245</span> siswa
              </p>
              <div className="flex items-center gap-2">
                <button type="button" className="inline-flex h-9 items-center gap-1 justify-center rounded-xl border border-[#c3c6d7] px-3 text-xs font-semibold text-[#737686] opacity-50" disabled>
                  <ArrowLeft size={12} />
                  Sebelumnya
                </button>
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-xs font-semibold text-white">
                  1
                </button>
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]">
                  2
                </button>
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]">
                  3
                </button>
                <span className="text-xs text-[#737686]">...</span>
                <button type="button" className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]">
                  250
                </button>
                <button type="button" className="inline-flex h-9 items-center gap-1 justify-center rounded-xl border border-[#c3c6d7] px-3 text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]">
                  Selanjutnya
                  <ArrowRight size={12} />
                </button>
              </div>
            </div>
          </div>
            </>
          )}
        </div>
      </div>

      {showDownloadModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowDownloadModal(false)}
        >
          <div
            className="download-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-icon-box">
                  <Download size={13} />
                </div>
                <div>
                  <div className="modal-title">Download Laporan</div>
                  <p className="modal-subtitle">BMS SMKS Muhammadiyah 1 Genteng</p>
                </div>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={() => setShowDownloadModal(false)}
              >
                <X size={12} />
              </button>
            </div>

            <div className="modal-body">
              <div className="modul-filter">
                <span className="modul-filter-label">PILIH MODUL LAPORAN</span>
                <div className="tablist">
                  {['Arus Kas', 'Tabungan Siswa', 'Petugas Piket'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      className={`tablist-button${modul === item ? ' active' : ''}`}
                      onClick={() => setModul(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="format-options">
                <div className="format-options-header">
                  <span className="format-options-title">Pilih format laporan</span>
                  <span className="format-options-required">Diperlukan</span>
                </div>

                <button
                  type="button"
                  className={`format-option pdf${format === 'pdf' ? ' selected' : ''}`}
                  onClick={() => setFormat('pdf')}
                >
                  <span className="radio-circle">
                    <span className="radio-dot" />
                  </span>
                  <span className="format-badge pdf">
                    <FileText size={18} />
                  </span>
                  <span className="format-info">
                    <span className="format-info-header">
                      <span className="format-name">Dokumen PDF (.pdf)</span>
                      <span className="format-tag pdf">Resmi</span>
                    </span>
                    <span className="format-desc">
                      Format standar cetak, laporan resmi bertandatangan
                      <br />
                      digital
                    </span>
                  </span>
                </button>

                <button
                  type="button"
                  className={`format-option excel${format === 'excel' ? ' selected' : ''}`}
                  onClick={() => setFormat('excel')}
                >
                  <span className="radio-circle">
                    <span className="radio-dot" />
                  </span>
                  <span className="format-badge excel">
                    <Table2 size={17} />
                  </span>
                  <span className="format-info">
                    <span className="format-info-header">
                      <span className="format-name">Spreadsheet Excel (.xlsx)</span>
                      <span className="format-tag excel">Rekap</span>
                    </span>
                    <span className="format-desc">
                      Format data mentah untuk pengolahan formula dan rekap
                      <br />
                      lanjutan
                    </span>
                  </span>
                </button>
              </div>

              <div className="context-data">
                <div className="context-data-header">
                  <span className="context-data-label">DATA YANG DIUNDUH:</span>
                  <span className="context-data-pill">Laporan Tabungan Siswa</span>
                </div>
                <div className="context-data-grid">
                  <div className="context-data-item">
                    <span className="context-data-item-label">Periode Laporan</span>
                    <span className="context-data-item-value">01 Okt 2026 - 31 Okt 2026</span>
                  </div>
                  <div className="context-data-item">
                    <span className="context-data-item-label">Total Entri / Baris</span>
                    <span className="context-data-item-value">1.245 Transaksi Tercatat</span>
                  </div>
                  <div className="context-data-item">
                    <span className="context-data-item-label">Estimasi Ukuran File</span>
                    <span className="context-data-item-value">~1.4 MB (Siap unduh)</span>
                  </div>
                  <div className="context-data-item">
                    <span className="context-data-item-label">Otoritas Penandatangan</span>
                    <span className="context-data-item-value">Siti Rahmawati, S.E.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn-batal"
                onClick={() => setShowDownloadModal(false)}
              >
                Batal
              </button>
              <button type="button" className="btn-primary-download">
                <Download size={12} />
                Download Laporan (.{format === 'pdf' ? 'pdf' : 'xlsx'})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
