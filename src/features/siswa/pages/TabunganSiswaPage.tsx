import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronLeft,
  ChevronRight,
  Receipt,
} from 'lucide-react'
import { DashboardSidebar, type SidebarItem } from '@/components/dashboard/DashboardSidebar'
import { AkuntansiSidebar } from '@/components/dashboard/AkuntansiSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import { StudentBalanceCard } from '@/components/dashboard/StudentBalanceCard'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import {
  TransactionDetailModal,
  type DashboardTransaction,
} from '@/components/roles/siswa/TransactionDetailModal'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'
import dashboardIcon from '@/assets/icon/nav/dashboard.svg'
import tabunganIcon from '@/assets/icon/nav/tabungan.svg'
import penarikanIcon from '@/assets/icon/nav/penarikan.svg'
import './TabunganSiswaPage.css'

const NAMA_SISWA = { fullName: 'Adinda Putri', classProgram: 'XII RPL 1' }
const PETUGAS_TELLER = 'Ahmad Fauzi (BMS Loket 02)'

function toDetailTransaction(tx: Transaction): DashboardTransaction {
  return {
    id: tx.code,
    type: tx.jenis === 'setoran' ? 'SETORAN' : 'PENARIKAN',
    title: tx.jenis === 'setoran' ? '+ Setoran Tabungan' : '- Penarikan Tabungan',
    status: 'BERHASIL',
    date: `${tx.date}, ${tx.time}`,
    amount: Number(tx.amount.replace(/\D/g, '')),
    source: `${tx.method} ${tx.methodSub}`,
    teller: PETUGAS_TELLER,
  }
}

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
  const isAkuntansi = useLocation().pathname.startsWith('/akuntansi')
  const [filter, setFilter] = useState<FilterKey>('semua')
  const [page, setPage] = useState(1)
  const [detailTx, setDetailTx] = useState<Transaction | null>(null)
  const loading = useSimulatedLoading()

  const visible = TRANSACTIONS.filter(
    (tx) => filter === 'semua' || tx.jenis === filter,
  )
  const totalPages = Math.max(1, Math.ceil(visible.length / PER_PAGE))
  const pageRows = visible.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div className="siswa-page">
      {/* SIDEBAR */}
      {isAkuntansi ? <AkuntansiSidebar /> : <DashboardSidebar items={NAV_ITEMS} logo />}

      {/* AREA KANAN */}
      <div className="siswa-main lg:pl-64">
        {/* HEADER */}
        <DashboardTopbar role={isAkuntansi ? 'Akuntansi' : 'Siswa'} />

        {/* CONTENT */}
        <main className="siswa-content">
          <div className="siswa-content-inner">
            {loading ? (
              <PageSkeleton variant="detail" />
            ) : (
              <>
            {/* PAGE HEADER */}
            <header className="siswa-page-header">
              <h1 className="siswa-page-title">Tabungan</h1>
              <p className="siswa-page-subtitle">Kelola dan pantau tabunganmu</p>
            </header>

            {/* KARTU SALDO */}
            <StudentBalanceCard showActions={false} />

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
                  <table className="siswa-table table-stagger" role="table" aria-label="Daftar transaksi tabungan">
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
                            <td className="is-center">
                              <span
                                className={`siswa-cell-amount ${isPenarikan ? 'siswa-cell-amount--penarikan' : ''}`}
                              >
                                {tx.amount}
                              </span>
                            </td>
                            <td className="is-center">
                              <span className="siswa-cell-date">
                                {tx.date},<br />
                                {tx.time}
                              </span>
                            </td>
                            <td className="is-center">
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
                              <button
                                className="siswa-detail-btn"
                                type="button"
                                onClick={() => setDetailTx(tx)}
                              >
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
              </>
            )}
          </div>
        </main>
      </div>
      {detailTx && (
        <TransactionDetailModal
          transaction={toDetailTransaction(detailTx)}
          student={NAMA_SISWA}
          onClose={() => setDetailTx(null)}
        />
      )}
    </div>
  )
}