import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  CheckCircle2,
  LayoutDashboard,
  PiggyBank,
  Wallet,
} from 'lucide-react'
import { SchoolLogo } from '@/features/auth/components/SchoolLogo'
import { StudentPhoto } from './StudentPhoto'

const SIDEBAR_MAIN = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Tabungan', icon: PiggyBank, active: false },
  { label: 'Penarikan', icon: Wallet, active: false },
]

const TRANSACTIONS = [
  {
    title: 'Setoran Rutin',
    meta: '14 Mar 2026 • Petugas Teller 1',
    amount: '+Rp 50.000',
    tone: 'deposit',
  },
  {
    title: 'Penarikan Kas',
    meta: '08 Mar 2026 • Disetujui',
    amount: '-Rp 100.000',
    tone: 'withdrawal',
  },
] as const

export function DashboardPreview() {
  return (
    <div className="w-full overflow-hidden rounded-xl border border-[#cacaca] bg-[#fdfdfd] shadow-[0px_1px_2px_#0000000d]">
      <div className="flex items-center gap-1.5 self-stretch bg-[#0074e9] px-4 py-2.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>

      <div className="flex w-full flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 flex-col items-stretch border-r border-[#c3c6d7] bg-white p-4 lg:flex">
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center justify-center gap-2 px-2 py-1.5">
              <SchoolLogo className="h-9 w-14 object-contain" />
            </div>

            <nav className="flex w-full flex-col items-start gap-1.5" aria-label="Menu dasbor pratinjau">
              {SIDEBAR_MAIN.map((item) => (
                <SidebarLink key={item.label} {...item} />
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4 bg-[#fafaff] p-4 sm:p-5">
          <div className="-mx-4 -mt-4 flex flex-col gap-3 border-b border-[#c3c6d7] bg-white px-4 py-3 shadow-[0px_1px_2px_#0000000d] sm:-mx-5 sm:-mt-5 sm:px-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2">
                <span className="text-[17px] font-bold leading-6 text-[#121c2a]">BMS Siswa</span>
                <span className="rounded-full bg-[#dbe1ff] px-2 py-0.5 text-[9px] font-semibold leading-3 text-[#004ac6]">
                  SMK Muhi
                </span>
              </div>

              <div className="inline-flex items-center gap-3">
                <span className="relative flex items-center justify-center" aria-hidden="true">
                  <Bell className="h-4 w-4 text-[#434655]" />
                  <span className="absolute right-0 top-0 h-1.5 w-1.5 rounded-full bg-[#ba1a1a] ring-2 ring-white" />
                </span>
                <span className="h-6 w-px bg-[#c3c6d7]" />
                <StudentPhoto
                  alt="Adinda Putri"
                  className="h-8 w-8 rounded-[10px] text-[12px] ring-2 ring-[#004ac6]/20"
                  fallbackClassName="text-xs"
                />
                <span className="flex flex-col items-start">
                  <span className="text-[12px] font-semibold leading-4 text-[#121c2a]">Adinda Putri</span>
                  <span className="text-[9px] font-semibold leading-3 text-[#434655]">
                    XII RPL 1 • NISN 00642189
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-xl font-bold leading-8 tracking-[-0.75px] text-[#121c2a] sm:text-2xl">
              Selamat datang, Adinda
            </h2>
            <p className="text-[13px] leading-6 text-[#434655]">Kelola tabunganmu dengan mudah.</p>
          </div>

          <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#2563eb] p-5 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] sm:p-8">
            <div
              className="pointer-events-none absolute right-0 top-0 h-56 w-56 rounded-full bg-white/[0.05] blur-2xl"
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex min-w-0 flex-col items-start gap-1">
                <span className="text-[9px] font-semibold leading-3 text-white/80">No: 8820-019-332</span>
                <span className="text-[11px] font-medium leading-4 text-white/80">Total Saldo Tabungan</span>
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[28px] font-bold leading-9 tracking-[-0.72px] text-white sm:text-[30px]">
                    Rp 1.250.000
                  </span>
                  <span className="text-[10px] font-normal text-white/70">IDR</span>
                </span>
                <span className="mt-1 flex items-center gap-1.5">
                  <CheckCircle2 className="h-3 w-3 text-white/90" aria-hidden="true" />
                  <span className="text-[10px] leading-4 text-white/80">
                    Saldo saat ini telah sinkron dengan kasir sekolah
                  </span>
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11px] font-semibold leading-4 text-[#2563eb] shadow-[0px_1px_2px_#0000000d]">
                  <ArrowUpFromLine className="h-3 w-3" aria-hidden="true" />
                  Setor Tabungan
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-[11px] font-medium leading-4 text-white">
                  <ArrowDownToLine className="h-3 w-3" aria-hidden="true" />
                  Ajukan Penarikan
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <span className="text-xs font-semibold leading-4 text-[#121c2a]">Transaksi Terakhir</span>
              <span className="text-[11px] font-medium leading-4 text-[#2563eb]">Lihat Semua</span>
            </div>

            <div className="flex flex-col">
              {TRANSACTIONS.map((transaction) => (
                <div
                  key={transaction.title}
                  className="flex items-center justify-between gap-3 border-t border-[#f1f5f9] py-2.5 first:border-t-0"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded ${
                        transaction.tone === 'deposit' ? 'bg-[#ecfdf5]' : 'bg-[#f1f5f9]'
                      }`}
                    >
                      {transaction.tone === 'deposit' ? (
                        <ArrowUpFromLine className="h-2.5 w-2.5 text-[#059669]" aria-hidden="true" />
                      ) : (
                        <ArrowDownToLine className="h-2.5 w-2.5 text-[#1e293b]" aria-hidden="true" />
                      )}
                    </span>
                    <span className="flex flex-col items-start">
                      <span className="text-xs font-medium leading-4 text-[#121c2a]">{transaction.title}</span>
                      <span className="text-[10px] leading-4 text-[#64748b]">{transaction.meta}</span>
                    </span>
                  </div>

                  <span
                    className={`text-xs font-semibold leading-4 ${
                      transaction.tone === 'deposit' ? 'text-[#059669]' : 'text-[#1e293b]'
                    }`}
                  >
                    {transaction.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SidebarLink({
  label,
  icon: Icon,
  active = false,
}: {
  label: string
  icon: typeof LayoutDashboard
  active?: boolean
}) {
  return (
    <span
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 ${
        active ? 'bg-[#eff4ff] text-[#004ac6]' : 'text-[#434655]'
      }`}
    >
      <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      <span className={`text-sm leading-6 ${active ? 'font-medium' : ''}`}>{label}</span>
    </span>
  )
}
