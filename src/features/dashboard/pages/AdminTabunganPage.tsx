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
import { DashboardSidebar } from '../components/DashboardSidebar'
import { DashboardTopbar } from '../components/DashboardTopbar'
import { adminItems } from '../components/sidebar-items'
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

  return (
    <div className="laporan-tabungan-page">
      <DashboardSidebar items={adminItems} logo variant="admin" />

      <div className="laporan-tabungan-main lg:pl-64">
        <DashboardTopbar role="Admin" />

        <div className="laporan-tabungan-content">
          <header className="laporan-header">
            <div className="laporan-header-text">
              <h1>Laporan Tabungan Siswa</h1>
              <p>Lihat saldo, setoran, penarikan, dan histori tabungan setiap siswa.</p>
            </div>

            <div className="laporan-header-actions">
              <button type="button" className="btn-cetak">
                <FileText size={20} />
                Cetak Buku Besar
              </button>
              <button
                type="button"
                className="btn-unduh"
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

          <section className="section-summary">
            <div className="summary-card">
              <div className="summary-top">
                <div className="summary-info">
                  <span className="summary-label">TOTAL SALDO SISWA</span>
                  <p className="summary-value">
                    Rp
                    <br />
                    85.000.000
                  </p>
                </div>
                <div className="summary-icon saldo">
                  <Wallet size={19} />
                </div>
              </div>
              <div className="summary-bottom">
                <div className="summary-bottom-left">
                  <ArrowDownToLine size={14} />
                  <span>
                    Akumulasi saldo simpanan
                    <br />
                    aktif 1.245 siswa
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <div className="summary-info">
                  <span className="summary-label">TOTAL TRANSAKSI</span>
                  <div className="summary-value-transaksi">
                    <span className="angka">1.245</span>
                    <span className="satuan">transaksi</span>
                  </div>
                </div>
                <div className="summary-icon transaksi">
                  <ArrowDownToLine size={20} />
                </div>
              </div>
              <div className="summary-bottom">
                <div className="summary-bottom-left">
                  <ArrowDownToLine size={14} />
                  <span>
                    Mutasi setoran & penarikan
                    <br />
                    periode ini
                  </span>
                </div>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <div className="summary-info">
                  <span className="summary-label">TOTAL SETORAN</span>
                  <p className="summary-value setoran">
                    Rp
                    <br />
                    95.000.000
                  </p>
                </div>
                <div className="summary-icon setoran">
                  <ArrowDownToLine size={16} />
                </div>
              </div>
              <div className="summary-bottom">
                <span className="summary-bottom-left">
                  <span>
                    Arus Masuk
                    <br />
                    Siswa
                  </span>
                </span>
                <span className="summary-badge up">
                  <TrendingUp size={10} />
                  +14.2% bln ini
                </span>
              </div>
            </div>

            <div className="summary-card">
              <div className="summary-top">
                <div className="summary-info">
                  <span className="summary-label">TOTAL PENARIKAN</span>
                  <p className="summary-value penarikan">
                    Rp
                    <br />
                    10.000.000
                  </p>
                </div>
                <div className="summary-icon penarikan">
                  <ArrowUpFromLine size={11} />
                </div>
              </div>
              <div className="summary-bottom">
                <span className="summary-bottom-left">
                  <span>
                    Pencairan
                    <br />
                    Terverifikasi
                  </span>
                </span>
                <span className="summary-badge valid">
                  <FileText size={11} />
                  100% tervalidasi
                </span>
              </div>
            </div>
          </section>

          <section className="section-tabel">
            <div className="table-toolbar">
              <div className="table-toolbar-left">
                <h2>Data Rekapitulasi Tabungan</h2>
                <span className="badge-terdaftar">1.245 Terdaftar</span>
              </div>
              <div className="table-toolbar-right">
                <span className="toolbar-label">Tampilkan:</span>
                <div className="select-baris">
                  5 Baris
                  <ChevronDown size={12} />
                </div>
              </div>
            </div>

            <div className="responsive-table">
              <table className="laporan-table">
                <thead>
                  <tr>
                    <th className="col-no">No</th>
                    <th className="col-nama">Nama Siswa</th>
                    <th className="col-nis">NIS</th>
                    <th className="col-kelas">Kelas</th>
                    <th className="col-saldo">Saldo Saat Ini</th>
                    <th className="col-setoran">Total Setoran</th>
                    <th className="col-penarikan">Total Penarikan</th>
                    <th className="col-status">
                      Status
                      <br />
                      Rekening
                    </th>
                    <th className="col-aksi">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) => (
                    <tr key={student.nis}>
                      <td className="col-no">{student.no}</td>
                      <td className="col-nama">
                        <div className="nama-cell">
                          <div>
                            <div className="nama">{student.name}</div>
                            <div className="tipe">{student.type}</div>
                          </div>
                        </div>
                      </td>
                      <td className="col-nis">{student.nis}</td>
                      <td className="col-kelas">
                        <span className="badge-kelas">{student.kelas}</span>
                      </td>
                      <td className="col-saldo">{student.saldo}</td>
                      <td className="col-setoran">{student.setoran}</td>
                      <td className="col-penarikan">{student.penarikan}</td>
                      <td className="col-status">
                        <span
                          className={`badge-status ${
                            student.status === 'Aktif' ? 'aktif' : 'tertunda'
                          }`}
                        >
                          {student.status}
                        </span>
                      </td>
                      <td className="col-aksi">
                        <button
                          type="button"
                          className="btn-lihat-detail"
                          onClick={() => setShowDownloadModal(true)}
                        >
                          <span className="btn-lihat-detail-text">
                            Lihat
                            <br />
                            Detail
                          </span>
                          <ArrowRight size={9} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-footer">
              <p className="pagination-info">
                Menampilkan <span className="angka">1-5</span> dari{' '}
                <span className="angka">1.245</span> siswa
              </p>
              <div className="pagination-controls">
                <button type="button" className="btn-page-nav disabled">
                  <ArrowLeft size={8} />
                  Sebelumnya
                </button>
                <button type="button" className="btn-page active">
                  1
                </button>
                <button type="button" className="btn-page">
                  2
                </button>
                <button type="button" className="btn-page">
                  3
                </button>
                <span className="page-ellipsis">...</span>
                <button type="button" className="btn-page">
                  250
                </button>
                <button type="button" className="btn-page-nav">
                  Selanjutnya
                  <ArrowRight size={8} />
                </button>
              </div>
            </div>
          </section>
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
