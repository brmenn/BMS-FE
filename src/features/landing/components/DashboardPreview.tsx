import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Bell,
  CheckCircle2,
  LayoutDashboard,
  PiggyBank,
  Wallet,
} from 'lucide-react'
import logoKet from '@/assets/logo/logoKet.png'
import avatar from '@/assets/logo/avatar.png'
import screenshot from '@/assets/logo/screenshot.png'

const SIDEBAR_MAIN = [
  { label: 'Dashboard', icon: LayoutDashboard, img: undefined, active: true },
  { label: 'Tabungan', icon: PiggyBank, img: screenshot, active: false },
  { label: 'Penarikan', icon: Wallet, img: undefined, active: false },
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
    <div className="w-full overflow-hidden rounded-xl border border-[#cacaca] bg-[#fdfdfd] shadow-[10px_15px_30px_#00000080]">
      <div
        className="flex items-center gap-1.5 self-stretch border-b border-white bg-[#0074e9] px-4 py-2.5"
        aria-hidden="true"
      >
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
        <span className="h-2.5 w-2.5 rounded-full bg-white" />
      </div>

      <div className="flex w-full flex-col lg:flex-row">
        <aside className="hidden w-64 shrink-0 flex-col items-stretch border-r border-[#c3c6d7] bg-white p-4 lg:flex">
          <div className="-mx-4 -mt-4 flex h-16 shrink-0 items-center justify-center px-4">
            <img
              alt="Logo BMS Siswa"
              className="h-11 w-auto max-w-full object-contain"
              src={logoKet}
            />
          </div>

          <nav className="mt-6 flex w-full flex-col items-start gap-1.5" aria-label="Menu dasbor pratinjau">
            {SIDEBAR_MAIN.map((item) => (
              <SidebarLink key={item.label} {...item} />
            ))}
          </nav>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col gap-4 bg-[#fafaff] p-4 sm:p-5">
          <div className="-mx-4 -mt-4 flex h-[54px] shrink-0 items-center justify-between gap-3 border-b border-[#c3c6d7] bg-white px-4 shadow-[0px_1px_2px_#0000000d] sm:-mx-5 sm:-mt-5 sm:px-5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="truncate text-[15px] leading-[23px] font-bold tracking-[-0.08px] text-[#121c2a] sm:whitespace-nowrap sm:text-[16.9px]">
                BMS Siswa
              </span>
              <span className="inline-flex shrink-0 items-center rounded-full bg-[#dbe1ff] px-2 py-1 text-[9.3px] leading-[12px] font-semibold tracking-[0.37px] text-[#004ac6] whitespace-nowrap">
                SMK Muhi
              </span>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className="relative flex h-8 w-8 items-center justify-center">
                <Bell className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
                <span className="absolute top-1 right-1 h-[7px] w-[7px] rounded-full bg-[#ba1a1a] ring-[1.7px] ring-white" />
              </span>

              <span aria-hidden="true" className="h-[27px] w-px bg-[#c3c6d7]" />

              <div className="flex items-center gap-2.5">
                <div className="relative shrink-0">
                  <img
                    alt="Profil Adinda Putri"
                    className="h-[30px] w-[30px] rounded-[10px] object-cover shadow-[0px_0px_0px_1.7px_#004ac633]"
                    src={avatar}
                  />
                  <span
                    className="absolute -right-0.5 -bottom-0.5 h-2 w-2 rounded-full bg-[#62df7d] ring-[1.7px] ring-white"
                    aria-label="Sedang online"
                  />
                </div>
                <div className="flex min-w-0 flex-col items-start">
                  <span className="text-[11.8px] leading-[16px] font-semibold text-[#121c2a] whitespace-nowrap">
                    Adinda Putri
                  </span>
                  <span className="text-[9.3px] leading-[12px] font-semibold tracking-[0.37px] whitespace-nowrap text-[#434655]">
                    XII RPL 1 • NISN 00642189
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-1">
            <h2 className="text-[22px] font-bold leading-[30px] tracking-[-0.75px] text-[#121c2a] sm:text-[25px] sm:leading-[38px]">
              Selamat datang, Adinda
            </h2>
            <p className="text-[13px] leading-6 text-[#434655]">Kelola tabunganmu dengan mudah.</p>
          </div>

          <div className="relative flex flex-col gap-5 overflow-hidden rounded-2xl bg-[#2563eb] p-5 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] sm:p-8">
            <div
              className="pointer-events-none absolute top-0 right-32 h-64 w-64 rounded-full bg-white/[0.05] blur-[20px]"
              aria-hidden="true"
            />
            <Wallet
              className="pointer-events-none absolute -right-6 -bottom-8 h-36 w-36 text-white/10"
              strokeWidth={1}
              aria-hidden="true"
            />

            <div className="relative flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
              <div className="flex min-w-0 flex-col items-start gap-1">
                <span className="text-[9px] font-semibold tracking-[0.35px] leading-3 text-white/80">
                  No: 8820-019-332
                </span>
                <span className="text-[11px] font-medium leading-4 text-white/80">
                  Total Saldo Tabungan
                </span>
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[26px] font-bold leading-9 tracking-[-0.72px] text-white sm:text-[29px]">
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
                <button
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-white px-3.5 py-2 text-[11.3px] font-semibold leading-4 text-[#2563eb] shadow-[0px_1px_2px_#0000000d]"
                  type="button"
                >
                  <ArrowUpFromLine className="h-3 w-3" aria-hidden="true" />
                  Setor Tabungan
                </button>
                <button
                  className="inline-flex cursor-pointer items-center gap-1.5 rounded-lg border border-white/40 px-3.5 py-2 text-[11.3px] font-medium leading-4 text-white backdrop-blur-[1.4px]"
                  type="button"
                >
                  <ArrowDownToLine className="h-3 w-3" aria-hidden="true" />
                  Ajukan Penarikan
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-[#e5e7eb] bg-white p-3">
            <div className="flex items-center justify-between border-b border-[#f1f5f9] pb-2">
              <span className="text-xs font-semibold leading-4 text-[#121c2a]">Transaksi Terakhir</span>
              <span className="text-[11px] font-medium leading-[16.5px] text-[#2563eb]">Lihat Semua</span>
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
  img,
  active = false,
}: {
  label: string
  icon: typeof LayoutDashboard
  img?: string
  active?: boolean
}) {
  return (
    <span
      className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-base leading-6 ${
        active ? 'bg-[#eff4ff] font-medium text-[#004ac6]' : 'text-[#434655]'
      }`}
    >
      {img ? (
        <img alt="" aria-hidden="true" className="h-[18px] w-[18px] shrink-0 object-contain" src={img} />
      ) : (
        <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
      <span>{label}</span>
    </span>
  )
}
