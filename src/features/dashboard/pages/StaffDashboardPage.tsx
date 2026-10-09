import {
  AlarmClock,
  ArrowDownToLine,
  ArrowUpFromLine,
  ChevronRight,
  Clock,
  CreditCard,
  HandCoins,
  Info,
  Receipt,
  SlidersHorizontal,
  Wallet,
} from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'
import staffDashboardPlaceholder from '@/placeholders/dashboard-guru.json'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'
import pinjamanIcon from '@/assets/icon/pinjaman.svg'
import pembayaranPinjamanIcon from '@/assets/icon/pembayaran-pinjaman.svg'
import avatar from '@/assets/logo/avatar.png'
import { DashboardSidebar, type SidebarItem } from '../components/DashboardSidebar'
import { DashboardTopbar } from '../components/DashboardTopbar'

const navItems: SidebarItem[] = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/guru/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/guru/penarikan', label: 'Penarikan', icon: penarikanIcon },
  { to: '/guru/pinjaman', label: 'Pinjaman', icon: pinjamanIcon },
  { to: '/guru/pembayaran-pinjaman', label: 'Pembayaran Pinjaman', icon: pembayaranPinjamanIcon },
]

const activityIcon: Record<string, { icon: typeof Wallet; box: string }> = {
  SETORAN: { icon: ArrowDownToLine, box: 'bg-[#007f3626] text-[#006329]' },
  PEMBAYARAN: { icon: Receipt, box: 'bg-[#e6eeff] text-[#004ac6]' },
  PENARIKAN: { icon: ArrowUpFromLine, box: 'bg-[#fee2e2] text-[#ba1a1a]' },
}

export function StaffDashboardPage() {
  const { data } = useQuery({
    queryKey: ['dashboard-guru'],
    queryFn: () => Promise.resolve(staffDashboardPlaceholder),
  })
  const dash = data ?? staffDashboardPlaceholder
  const alert = dash.dueDateAlert
  const installment = dash.nextInstallment

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={navItems} logo />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Guru & Karyawan" />
        <main className="flex w-full max-w-[1030px] flex-col gap-8 p-8">
          <section className="flex w-full flex-wrap items-center gap-4 rounded-2xl border border-solid border-[#f59e0b4c] bg-[#f59e0b1a] p-5 shadow-[0px_1px_3px_#d977060f]">
            <div className="flex min-w-0 flex-1 flex-wrap items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#f59e0b33] shadow-[0px_1px_2px_#0000000d]">
                <AlarmClock className="h-5 w-4 text-[#92400e]" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-semibold leading-6 tracking-[-0.4px] text-[#451a03]">
                    {alert.title}
                  </h2>
                  <span className="inline-flex items-center gap-1 rounded-full border border-solid border-[#f59e0b4c] bg-[#f59e0b33] px-2.5 py-0.5 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#92400e]">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {alert.badge}
                  </span>
                </div>
                <p className="text-xs leading-[16.5px] text-[#78350fcc]">
                  Angsuran ke-{alert.installmentNumber} sebesar{' '}
                  <span className="font-semibold text-[#451a03]">{formatMoney(alert.amount)}</span>{' '}
                  akan jatuh tempo dalam {alert.daysRemaining} hari ({alert.dueDate}).
                  <br />
                  {alert.note}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                className="flex h-10 items-center gap-1.5 rounded-xl bg-[#d97706] px-4 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#b45309]"
                type="button"
              >
                <Wallet className="h-3 w-4 text-white" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-white">
                  Bayar Sekarang
                </span>
              </button>
              <button
                className="flex h-10 items-center gap-1 rounded-xl border border-solid border-[#f59e0b4c] bg-[#f59e0b26] px-3.5 transition-colors hover:bg-[#f59e0b33]"
                type="button"
              >
                <span className="text-xs font-medium leading-4 tracking-[0.24px] text-[#78350f]">
                  Lihat Rincian Cicilan
                </span>
                <ChevronRight className="h-3 w-3 text-[#78350f]" aria-hidden="true" />
              </button>
            </div>
          </section>

          <section className="flex w-full flex-col gap-4 rounded-2xl border border-solid border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a] md:flex-row md:items-center">
            <div className="flex w-full flex-col justify-between gap-5 rounded-2xl border border-solid border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a] md:min-h-[233px] md:w-[307px] md:shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <img
                    alt={dash.profile.name}
                    className="h-9 w-9 rounded-xl object-cover ring-2 ring-[#004ac633]"
                    src={avatar}
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#62df7d]" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold leading-5 text-[#121c2a]">
                    {dash.profile.name}
                  </p>
                  <p className="truncate text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                    {dash.profile.meta}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#434655]">
                  SISA TAGIHAN
                </span>
                <span className="text-2xl font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                  {formatMoney(dash.remainingBills.amount)}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#434655]">
                  CICILAN BERIKUTNYA
                </span>
                <span className="text-2xl font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                  {formatMoney(dash.remainingBills.nextInstallment)}
                </span>
              </div>
            </div>

            <div className="relative flex w-full flex-1 flex-col gap-4 overflow-hidden rounded-2xl border-2 border-solid border-[#2563eb] bg-white p-6 shadow-[0px_2px_4px_-2px_#1725540d,0px_4px_6px_-1px_#17255412]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-[#2563eb1a] blur-[12px]"
              />
              <div className="relative grid grid-cols-2 gap-x-6 gap-y-3">
                <div className="flex items-center">
                  <span className="text-xs font-bold leading-4 tracking-[0.6px] text-[#434655]">
                    SALDO TABUNGAN
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                    {formatMoney(dash.savings.balance)}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-xs font-bold leading-4 tracking-[0.6px] text-[#434655]">
                    TOTAL PINJAMAN
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                    {formatMoney(dash.savings.totalLoan)}
                  </span>
                </div>
              </div>
              <div className="relative grid grid-cols-2 gap-x-6 border-t border-solid border-[#e2e8f0] pt-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="flex items-center gap-1.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#4f5c8e]">
                    <span className="h-2 w-2 rounded-full bg-[#4f5c8e]" aria-hidden="true" />
                    {dash.savings.loanStatus}
                  </span>
                  <span className="text-[11px] leading-[14px] tracking-[0.44px] text-[#434655]">
                    {dash.savings.tenor}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                    {dash.savings.balanceStatus}
                  </span>
                  <span className="text-[11px] leading-[14px] tracking-[0.44px] text-[#434655]">
                    {dash.savings.interest}
                  </span>
                </div>
              </div>
              <div className="relative border-t border-solid border-[#e2e8f0] pt-3">
                <p className="text-xs leading-[18px] text-[#434655]">
                  Nomor Rekening Tabungan:{' '}
                  <span className="font-medium text-[#121c2a]">{dash.savings.accountNo}</span>
                </p>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-col rounded-2xl border border-solid border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                className="flex h-12 items-center gap-2.5 rounded-xl bg-[#2563eb] px-8 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] transition-colors hover:bg-[#1d4ed8]"
                type="button"
              >
                <ArrowDownToLine className="h-4 w-4 text-white" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-white">Setor Tabungan</span>
              </button>
              <button
                className="flex h-12 items-center gap-2.5 rounded-xl border border-solid border-[#c3c6d74c] bg-[#eff4ff] px-7 transition-colors hover:bg-[#e0eaff]"
                type="button"
              >
                <ArrowUpFromLine className="h-3.5 w-3.5 text-[#004ac6]" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-[#004ac6]">Ajukan Penarikan</span>
              </button>
              <button
                className="flex h-12 items-center gap-2.5 rounded-xl border border-solid border-[#e2e8f0] bg-white px-9 transition-colors hover:bg-[#f8f9ff]"
                type="button"
              >
                <HandCoins className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-[#121c2a]">Lihat Pinjaman</span>
              </button>
              <button
                className="flex h-12 items-center gap-2.5 rounded-xl border border-solid border-[#e2e8f0] bg-white px-10 transition-colors hover:bg-[#f8f9ff]"
                type="button"
              >
                <Receipt className="h-4 w-[15px] text-[#121c2a]" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-[#121c2a]">
                  Pembayaran Cicilan
                </span>
              </button>
            </div>
          </section>

          <section className="grid w-full grid-cols-1 gap-8 lg:grid-cols-12">
            <div className="flex flex-col gap-6 rounded-2xl border border-solid border-[#e2e8f0] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a] lg:col-span-5">
              <div className="flex items-start justify-between gap-4 border-b border-solid border-[#e2e8f0] pb-4">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                    Cicilan Berikutnya
                  </h3>
                  <p className="text-xs leading-[18px] text-[#434655]">
                    Rincian kewajiban angsuran aktif
                  </p>
                </div>
                <button
                  className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6] hover:underline"
                  type="button"
                >
                  Lihat semua &gt;
                </button>
              </div>

              <div className="flex flex-col gap-4 rounded-xl border border-solid border-[#c3c6d74c] bg-[#eff4ff] p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#434655]">
                      STATUS TAGIHAN
                    </span>
                    <span className="text-base font-semibold leading-6 text-[#121c2a]">
                      Cicilan ke-{String(installment.number).padStart(2, '0')}
                    </span>
                  </div>
                  <span className="inline-flex rounded-full border border-solid border-[#c3c6d766] bg-[#e6eeff] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#4f5c8e]">
                    {installment.status}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-[15px] w-[13.5px] shrink-0 text-[#4f5c8e]" aria-hidden="true" />
                  <p className="text-xs leading-[18px] text-[#434655]">
                    Jatuh tempo {installment.dueDate} ({installment.daysRemaining} hari lagi)
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm leading-5 text-[#434655]">Pokok Angsuran</span>
                  <span className="text-sm font-medium leading-5 text-[#121c2a]">
                    {formatMoney(installment.principal)}
                  </span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm leading-5 text-[#434655]">
                    Jasa / Bunga Koperasi ({installment.interestRate}%)
                  </span>
                  <span className="text-sm font-medium leading-5 text-[#121c2a]">
                    {formatMoney(installment.interest)}
                  </span>
                </div>
                <div className="border-t border-solid border-[#e2e8f0]" />
                <div className="flex items-center justify-between gap-4">
                  <span className="text-base font-semibold leading-6 text-[#121c2a]">
                    Total Pembayaran
                  </span>
                  <span className="text-lg font-bold leading-[26px] text-[#004ac6]">
                    {formatMoney(installment.total)}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-solid border-[#c3c6d733] bg-[#eff4ff99] p-3.5">
                <Info className="mt-0.5 h-[15px] w-[15px] shrink-0 text-[#434655]" aria-hidden="true" />
                <p className="text-xs leading-[18px] text-[#434655]">
                  {installment.paymentNote}
                </p>
              </div>

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] transition-colors hover:bg-[#1d4ed8]"
                type="button"
              >
                <CreditCard className="h-4 w-4 text-white" aria-hidden="true" />
                <span className="text-sm font-semibold leading-5 text-white">Bayar Sekarang</span>
              </button>
            </div>

            <div className="flex flex-col gap-5 rounded-2xl border border-solid border-[#e2e8f0] bg-white p-7 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a] lg:col-span-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-solid border-[#e2e8f0] pb-5">
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-xl font-semibold leading-7 text-[#121c2a]">
                    Aktivitas Terbaru
                  </h3>
                  <p className="text-sm leading-5 text-[#434655]">
                    Mutasi rekening dan status transaksi paling baru
                  </p>
                </div>
                <button
                  className="flex items-center gap-1.5 rounded-lg border border-solid border-[#e2e8f0] px-3.5 py-1.5 transition-colors hover:bg-[#f8f9ff]"
                  type="button"
                >
                  <SlidersHorizontal className="h-3 w-3 text-[#434655]" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-4 tracking-[0.5px] text-[#434655]">
                    Filter Mutasi
                  </span>
                </button>
              </div>

              <div className="w-full overflow-x-auto">
                <table className="w-full border-collapse text-left">
                  <thead>
                    <tr className="border-b border-solid border-[#e2e8f0]">
                      <th className="px-3 py-2.5 text-[11px] font-semibold tracking-[0.34px] text-[#434655]">
                        TANGGAL
                      </th>
                      <th className="px-3 py-2.5 text-[11px] font-semibold tracking-[0.34px] text-[#434655]">
                        TRANSAKSI
                      </th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-semibold tracking-[0.34px] text-[#434655]">
                        NOMINAL
                      </th>
                      <th className="px-3 py-2.5 text-[11px] font-semibold tracking-[0.34px] text-[#434655]">
                        STATUS
                      </th>
                      <th className="px-3 py-2.5 text-right text-[11px] font-semibold tracking-[0.34px] text-[#434655]">
                        AKSI
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {dash.recentActivities.map((row) => {
                      const meta = activityIcon[row.type] ?? activityIcon.SETORAN
                      const RowIcon = meta.icon
                      const isCredit = row.type === 'SETORAN'
                      return (
                        <tr className="border-b border-solid border-[#e2e8f0]" key={row.id}>
                          <td className="px-3 py-3 align-top">
                            <div className="text-[13px] font-medium leading-[15.5px] text-[#121c2a]">
                              {row.date}
                            </div>
                            <div className="text-[11px] leading-[13.9px] text-[#434655]">
                              {row.time}
                            </div>
                          </td>
                          <td className="px-3 py-3 align-middle">
                            <div className="flex items-center gap-2.5">
                              <span
                                className={cn(
                                  'flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
                                  meta.box,
                                )}
                              >
                                <RowIcon className="h-4 w-4" aria-hidden="true" />
                              </span>
                              <div>
                                <div className="text-[13px] font-medium leading-[15.5px] text-[#121c2a]">
                                  {row.title}
                                </div>
                                <div className="whitespace-nowrap text-[11px] leading-[13.9px] text-[#434655]">
                                  {row.subtitle}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td
                            className={cn(
                              'whitespace-nowrap px-3 py-3 text-right text-[13px] font-semibold',
                              isCredit ? 'text-[#006329]' : 'text-[#ba1a1a]',
                            )}
                          >
                            {isCredit ? '+' : '-'}
                            {formatMoney(row.amount)}
                          </td>
                          <td className="px-3 py-3">
                            <span
                              className={cn(
                                'inline-flex whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-semibold tracking-[0.34px]',
                                row.status === 'BERHASIL'
                                  ? 'bg-[#dcfce7] text-[#15803d]'
                                  : 'bg-[#dce1ff] text-[#071747]',
                              )}
                            >
                              {row.status === 'BERHASIL' ? 'Berhasil' : 'Selesai'}
                            </span>
                          </td>
                          <td className="px-3 py-3 text-right">
                            <button
                              className="whitespace-nowrap text-[11px] font-semibold tracking-[0.34px] text-[#004ac6] underline hover:no-underline"
                              type="button"
                            >
                              [ Lihat Resi ]
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <span className="text-sm leading-5 text-[#434655]">{dash.activityFooter}</span>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
