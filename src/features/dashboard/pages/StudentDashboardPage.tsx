import { Link } from 'react-router-dom'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronRight,
  Clock,
  Info,
  PiggyBank,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DashboardSidebar } from '../components/DashboardSidebar'
import { DashboardTopbar } from '../components/DashboardTopbar'

type Transaction = {
  id: string
  type: 'setoran' | 'penarikan'
  title: string
  status: 'Berhasil' | 'Selesai'
  date: string
  amount: string
  source: string
}

const transactions: Transaction[] = [
  {
    id: 'TRX-20260928-001',
    type: 'setoran',
    title: '+ Setoran Tabungan',
    status: 'Berhasil',
    date: '28 September 2026, 10:32 WIB',
    amount: '+Rp 100.000',
    source: 'Kasir Bank Mini Muhi',
  },
  {
    id: 'WD-20260920-002',
    type: 'penarikan',
    title: '- Penarikan Tabungan',
    status: 'Selesai',
    date: '20 September 2026, 14:15 WIB',
    amount: '-Rp 50.000',
    source: 'Penarikan Mandiri Siswa',
  },
  {
    id: 'TRX-20260915-004',
    type: 'setoran',
    title: '+ Setoran Tabungan',
    status: 'Berhasil',
    date: '15 September 2026, 09:10 WIB',
    amount: '+Rp 50.000',
    source: 'Setoran Rutin Wali Kelas',
  },
]

export function StudentDashboardPage() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar />
        <main className="flex w-full max-w-[1280px] flex-col gap-6 p-6">
          <section className="flex flex-col gap-1 pt-1">
            <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
              Selamat datang, Adinda
            </h1>
            <p className="text-base leading-6 tracking-[0] text-[#434655]">
              Kelola tabunganmu dengan mudah.
            </p>
          </section>

          <section className="relative flex w-full flex-col items-start overflow-hidden rounded-2xl bg-[#2563eb] p-8 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]">
            <PiggyBank
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-8 h-[180px] w-[190px] opacity-10"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 right-32 h-64 w-64 rounded-full bg-white/5 blur-[20px]"
            />
            <div className="relative flex w-full flex-wrap items-center justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-white/80">
                  No: 8820-019-332
                </span>
                <span className="pt-1 text-sm font-medium leading-5 text-white/80">
                  Total Saldo Tabungan
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold leading-[44px] tracking-[-0.9px] text-white">
                    Rp 1.250.000
                  </span>
                  <span className="text-xs leading-[18px] text-white/70">IDR</span>
                </div>
                <div className="flex items-center gap-1.5 pt-1">
                  <RefreshCw className="h-3.5 w-3.5 shrink-0 text-white/80" aria-hidden="true" />
                  <span className="text-xs leading-[18px] text-white/80">
                    Saldo saat ini telah sinkron dengan kasir sekolah
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  className="flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#eff6ff]"
                  type="button"
                >
                  <ArrowDownToLine className="h-4 w-4 text-[#2563eb]" aria-hidden="true" />
                  <span className="text-base font-semibold leading-6 text-[#2563eb]">
                    Setor Tabungan
                  </span>
                </button>
                <button
                  className="flex items-center gap-2 rounded-xl border border-solid border-white/40 px-5 py-2.5 backdrop-blur-[2px] transition-colors hover:bg-white/10"
                  type="button"
                >
                  <ArrowUpFromLine className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  <span className="text-base font-medium leading-6 text-white">
                    Ajukan Penarikan
                  </span>
                </button>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col gap-6 sm:flex-row">
            <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 pt-1.5">
                  <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#434655]">
                    TOTAL SETORAN
                  </span>
                  <span className="text-2xl font-bold leading-8 tracking-[-0.24px] text-[#121c2a]">
                    Rp 1.500.000
                  </span>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0063291a]">
                  <ArrowDownToLine className="h-[17px] w-[17px] text-[#006329]" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 border-t border-solid border-[#c3c6d799] pt-3">
                <span className="flex items-center gap-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                  <TrendingUp className="h-2 w-3.5" aria-hidden="true" />
                  +12%
                </span>
                <span className="text-xs leading-[18px] text-[#434655]">
                  Akumulasi setoran berhasil
                </span>
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-4 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-1.5 pt-1.5">
                  <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#434655]">
                    TOTAL PENARIKAN
                  </span>
                  <span className="text-2xl font-bold leading-8 tracking-[-0.24px] text-[#121c2a]">
                    Rp 250.000
                  </span>
                </div>
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#e6eeff]">
                  <ArrowUpFromLine className="h-[17px] w-[17px] text-[#004ac6]" aria-hidden="true" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 border-t border-solid border-[#c3c6d799] pt-3">
                <span className="flex items-center gap-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  1 Pengajuan
                </span>
                <span className="text-xs leading-[18px] text-[#434655]">
                  Total penarikan selesai
                </span>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col gap-2 rounded-2xl border border-solid border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] pb-4">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold leading-[26px] text-[#121c2a]">
                  Riwayat Transaksi
                </h2>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Daftar transaksi tabungan siswa terakhir yang tercatat
                </p>
              </div>
              <Link
                className="flex items-center gap-1.5 text-sm font-semibold leading-5 text-[#004ac6] hover:underline"
                to="/riwayat"
              >
                Lihat Semua
                <ChevronRight className="h-3 w-3" aria-hidden="true" />
              </Link>
            </div>

            <div className="flex flex-col pb-2">
              {transactions.map((trx, index) => (
                <div
                  className={cn(
                    'flex flex-wrap items-center justify-between gap-4 rounded-xl px-3 py-4',
                    index > 0 && 'border-t border-solid border-[#c3c6d7b2]',
                  )}
                  key={trx.id}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={cn(
                        'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                        trx.type === 'setoran' ? 'bg-[#007f3626]' : 'bg-[#e6eeff]',
                      )}
                    >
                      {trx.type === 'setoran' ? (
                        <ArrowDownToLine className="h-3.5 w-3.5 text-[#006329]" aria-hidden="true" />
                      ) : (
                        <ArrowUpFromLine className="h-3.5 w-3.5 text-[#004ac6]" aria-hidden="true" />
                      )}
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-base font-semibold leading-6 text-[#121c2a]">
                          {trx.title}
                        </span>
                        <span
                          className={cn(
                            'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px]',
                            trx.status === 'Berhasil'
                              ? 'border-solid border-[#a7f3d0] bg-[#ecfdf5] text-[#047857]'
                              : 'border-solid border-[#bfdbfe] bg-[#eff6ff] text-[#1d4ed8]',
                          )}
                        >
                          {trx.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs leading-[18px] text-[#434655]">
                        <span>{trx.date}</span>
                        <span aria-hidden="true">•</span>
                        <span className="font-mono text-[11px] text-[#737686]">{trx.id}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-5">
                    <div className="flex flex-col items-end gap-0.5">
                      <span
                        className={cn(
                          'text-lg font-bold leading-[26px]',
                          trx.type === 'setoran' ? 'text-[#006329]' : 'text-[#121c2a]',
                        )}
                      >
                        {trx.amount}
                      </span>
                      <span className="text-[11px] leading-[16.5px] text-[#434655]">
                        {trx.source}
                      </span>
                    </div>
                    <button
                      className="rounded-xl border border-solid border-[#c3c6d7] bg-white px-3.5 py-1.5 text-base font-medium leading-6 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                      type="button"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-2 border-t border-solid border-[#c3c6d799] pt-3">
              <Info className="h-[15px] w-[15px] shrink-0 text-[#434655]" aria-hidden="true" />
              <p className="text-xs leading-[18px] text-[#434655]">
                Setoran baru dapat diproses di loket administrasi BMS gedung A setiap jam sekolah.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
