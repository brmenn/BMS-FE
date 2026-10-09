import { useState } from 'react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  PiggyBank,
  Plus,
  Receipt,
  User,
  Wallet,
} from 'lucide-react'
import { DashboardSidebar, type SidebarItem } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'
import './TabunganSiswaPage.css'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/siswa/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/siswa/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/siswa/penarikan', label: 'Penarikan', icon: penarikanIcon },
]

type Transaction = {
  jenis: 'setoran' | 'penarikan'
  code: string
  amount: string
  date: string
  time: string
  method: string
  methodSub: string
}

const TRANSACTIONS: Transaction[] = [
  {
    jenis: 'setoran',
    code: 'TRX-20261001-006',
    amount: '+Rp 25.000',
    date: '01 Okt 2026',
    time: '07:50 WIB',
    method: 'Tunai',
    methodSub: 'Kasir',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260930-015',
    amount: '+Rp 50.000',
    date: '30 Sep 2026',
    time: '15:30 WIB',
    method: 'Transfer',
    methodSub: 'Bank',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260928-002',
    amount: '+Rp 100.000',
    date: '28 Sep 2026',
    time: '10:05 WIB',
    method: 'Loket',
    methodSub: 'Kasir',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260925-018',
    amount: '+Rp 75.000',
    date: '25 Sep 2026',
    time: '13:25 WIB',
    method: 'Transfer',
    methodSub: 'Bank',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260922-011',
    amount: '+Rp 40.000',
    date: '22 Sep 2026',
    time: '08:45 WIB',
    method: 'Tunai',
    methodSub: 'Kasir',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260920-003',
    amount: '+Rp 50.000',
    date: '20 Sep 2026',
    time: '09:15 WIB',
    method: 'Transfer',
    methodSub: 'Bank',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260918-021',
    amount: '+Rp 25.000',
    date: '18 Sep 2026',
    time: '13:40 WIB',
    method: 'Loket',
    methodSub: 'Kasir',
  },
  {
    jenis: 'setoran',
    code: 'TRX-20260915-014',
    amount: '+Rp 100.000',
    date: '15 Sep 2026',
    time: '08:05 WIB',
    method: 'Transfer',
    methodSub: 'Bank',
  },
  {
    jenis: 'penarikan',
    code: 'TRX-20261003-004',
    amount: '-Rp 50.000',
    date: '03 Okt 2026',
    time: '11:10 WIB',
    method: 'Loket',
    methodSub: 'Kasir',
  },
  {
    jenis: 'penarikan',
    code: 'TRX-20261001-001',
    amount: '-Rp 75.000',
    date: '01 Okt 2026',
    time: '10:20 WIB',
    method: 'Loket',
    methodSub: 'Kasir',
  },
  {
    jenis: 'penarikan',
    code: 'TRX-20260927-012',
    amount: '-Rp 100.000',
    date: '27 Sep 2026',
    time: '14:45 WIB',
    method: 'Transfer',
    methodSub: 'Bank',
  },
  {
    jenis: 'penarikan',
    code: 'TRX-20260924-007',
    amount: '-Rp 30.000',
    date: '24 Sep 2026',
    time: '09:10 WIB',
    method: 'Tunai',
    methodSub: 'Kasir',
  },
]

const PER_PAGE = 4

const FILTERS = [
  { key: 'semua', label: 'Semua' },
  { key: 'setoran', label: 'Setoran' },
  { key: 'penarikan', label: 'Penarikan' },
] as const

type FilterKey = (typeof FILTERS)[number]['key']

export function TabunganSiswaPage() {
  const [filter, setFilter] = useState<FilterKey>('semua')
  const [page, setPage] = useState(1)

  const visible = TRANSACTIONS.filter(
    (tx) => filter === 'semua' || tx.jenis === filter,
  )
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE))
  const pageRows = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="siswa-page">
      {/* SIDEBAR */}
      <DashboardSidebar items={NAV_ITEMS} logo />

      {/* AREA KANAN */}
      <div className="siswa-main lg:pl-64">
        {/* HEADER */}
        <DashboardTopbar role="Siswa" />

        {/* CONTENT */}
        <main className="siswa-content">
          <div className="siswa-content-inner">
            {/* PAGE HEADER */}
            <header className="siswa-page-header">
              <h1 className="siswa-page-title">Tabungan</h1>
              <p className="siswa-page-subtitle">Kelola dan pantau tabunganmu</p>
            </header>

            {/* KARTU SALDO */}
            <section className="siswa-saldo-card" aria-labelledby="saldo-title">
              <span className="siswa-decor-blob siswa-decor-blob--med" aria-hidden="true" />
              <span className="siswa-decor-blob siswa-decor-blob--huge" aria-hidden="true" />
              <div className="siswa-saldo-watermark" aria-hidden="true">
                <Wallet className="siswa-saldo-wallet" strokeWidth={1} />
              </div>

              <div className="siswa-saldo-inner">
                <div className="siswa-saldo-left">
                  <div className="siswa-saldo-label">
                    <span className="siswa-saldo-label-icon" aria-hidden="true">
                      <PiggyBank size={12} />
                    </span>
                    <span id="saldo-title">SALDO TABUNGAN</span>
                  </div>

                  <p className="siswa-saldo-amount">Rp 1.250.000</p>

                  <div className="siswa-saldo-meta">
                    <span className="siswa-pill">
                      <CreditCard size={14} aria-hidden="true" />
                      <span>No. Rekening:</span>
                      <strong>8820-019-332</strong>
                    </span>
                    <span className="siswa-pill siswa-pill--plain">
                      <User size={14} aria-hidden="true" />
                      <span>a.n Adinda Putri</span>
                    </span>
                  </div>
                </div>

                <button className="siswa-btn-setor" type="button">
                  <span className="siswa-btn-setor-icon" aria-hidden="true">
                    <Plus size={14} />
                  </span>
                  <span>Setor Tabungan</span>
                </button>
              </div>
            </section>

            {/* RIWAYAT TABUNGAN */}
            <section className="siswa-riwayat" aria-labelledby="riwayat-title">
              <div className="siswa-riwayat-head">
                <div>
                  <h2 className="siswa-riwayat-title" id="riwayat-title">
                    Riwayat Tabungan
                  </h2>
                  <p className="siswa-riwayat-subtitle">
                    Daftar transaksi mutasi tabungan di kasir dan loket BMS
                  </p>
                </div>

                <div className="siswa-filter-tabs" role="group" aria-label="Filter transaksi">
                  {FILTERS.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      className={`siswa-filter-btn ${filter === item.key ? 'active' : ''}`}
                      aria-pressed={filter === item.key}
                      onClick={() => {
                        setFilter(item.key)
                        setPage(1)
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="siswa-table-card">
                <div className="siswa-table-wrap">
                  <table className="siswa-table" role="table" aria-label="Daftar transaksi tabungan">
                    <thead>
                      <tr>
                        <th scope="col">Jenis Transaksi</th>
                        <th scope="col">Kode Transaksi</th>
                        <th scope="col" className="is-center">Nominal</th>
                        <th scope="col">Tanggal &amp; Waktu</th>
                        <th scope="col">Metode Pembayaran</th>
                        <th scope="col" className="is-center">Status</th>
                        <th scope="col" className="is-center">Aksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pageRows.length === 0 && (
                        <tr>
                          <td colSpan={7} className="is-center">
                            <span className="siswa-empty-row">Tidak ada transaksi</span>
                          </td>
                        </tr>
                      )}
                      {pageRows.map((tx, index) => {
                        const isPenarikan = tx.jenis === 'penarikan'
                        return (
                          <tr key={`${tx.code}-${index}`}>
                            <td>
                              <div className="siswa-cell-jenis">
                                <span
                                  className={`siswa-icon-box ${isPenarikan ? 'siswa-icon-box--penarikan' : ''}`}
                                  aria-hidden="true"
                                >
                                  {isPenarikan ? (
                                    <ArrowUpFromLine size={14} />
                                  ) : (
                                    <ArrowDownToLine size={14} />
                                  )}
                                </span>
                                <strong>
                                  {isPenarikan ? (
                                    'Penarikan'
                                  ) : (
                                    <>
                                      Setoran
                                      <br />
                                      Tabungan
                                    </>
                                  )}
                                </strong>
                              </div>
                            </td>
                            <td className="is-center">
                              <span className="siswa-cell-code">{tx.code}</span>
                            </td>
                            <td>
                              <span
                                className={`siswa-cell-amount ${isPenarikan ? 'siswa-cell-amount--penarikan' : ''}`}
                              >
                                {tx.amount}
                              </span>
                            </td>
                            <td>
                              <span className="siswa-cell-date">
                                {tx.date},<br />
                                {tx.time}
                              </span>
                            </td>
                            <td>
                              <span className="siswa-cell-method">
                                {tx.method} {tx.methodSub}
                              </span>
                            </td>
                            <td className="is-center">
                              <span className="siswa-status">
                                <span className="siswa-status-dot" aria-hidden="true" />
                                Berhasil
                              </span>
                            </td>
                            <td className="is-center">
                              <button className="siswa-detail-btn" type="button">
                                <Receipt size={12} aria-hidden="true" />
                                <span>Detail Resi</span>
                              </button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="siswa-pagination">
                  <p className="siswa-page-info">
                    {pageRows.length === 0
                      ? 'Tidak ada transaksi'
                      : `Menampilkan ${(page - 1) * PER_PAGE + 1}–${Math.min(
                          page * PER_PAGE,
                          visible.length,
                        )} dari ${visible.length} transaksi tabungan`}
                  </p>
                  <nav className="siswa-pagination-controls" aria-label="Paginasi transaksi">
                    <button
                      className="siswa-icon-btn"
                      type="button"
                      aria-label="Halaman sebelumnya"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                    >
                      <ChevronLeft size={14} aria-hidden="true" />
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                      <button
                        key={n}
                        className={`siswa-num-btn ${page === n ? 'active' : ''}`}
                        type="button"
                        aria-label={`Halaman ${n}`}
                        aria-current={page === n ? 'page' : undefined}
                        onClick={() => setPage(n)}
                      >
                        {n}
                      </button>
                    ))}
                    <button
                      className="siswa-icon-btn"
                      type="button"
                      aria-label="Halaman berikutnya"
                      onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                      disabled={page >= totalPages}
                    >
                      <ChevronRight size={14} aria-hidden="true" />
                    </button>
                  </nav>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}