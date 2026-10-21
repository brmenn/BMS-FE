import { useState } from 'react'
import { CalendarDays } from 'lucide-react'
import './TabunganPage.css'
import { DashboardSidebar, type SidebarItem } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import dashboardIcon from '@/assets/icon/nav/dashboard.svg'
import tabunganIcon from '@/assets/icon/nav/tabungan.svg'
import penarikanIcon from '@/assets/icon/nav/penarikan.svg'
import pinjamanIcon from '@/assets/icon/nav/pinjaman.svg'
import pembayaranPinjamanIcon from '@/assets/icon/nav/pembayaran-pinjaman.svg'
import { TabunganSummary } from '@/components/roles/guru/TabunganSummary'
import { DepositStatus } from '@/components/roles/guru/DepositStatus'
import { TransactionTable } from '@/components/roles/guru/TransactionTable'
import type { Transaction } from '@/components/roles/guru/TransactionTable'
import { ReceiptModal } from '@/components/roles/guru/ReceiptModal'
import type { ReceiptData } from '@/components/roles/guru/receipt-data'
import { DEFAULT_RECEIPT } from '@/components/roles/guru/receipt-data'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/guru/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/guru/penarikan', label: 'Penarikan', icon: penarikanIcon },
  { to: '/guru/pinjaman', label: 'Pinjaman', icon: pinjamanIcon },
  { to: '/guru/pembayaran-pinjaman', label: 'Pembayaran Pinjaman', icon: pembayaranPinjamanIcon },
]

function buildReceipt(tx: Transaction): ReceiptData {
  const bare = tx.amount.slice(1).trim()
  const signed = `${tx.amount.startsWith('-') ? '-' : '+'} ${bare}`

  return {
    ...DEFAULT_RECEIPT,
    reference: tx.code,
    service: `${tx.type} Tabungan Reguler`,
    datetime: `${tx.date} • 09:42:15 WIB`,
    channel: `Teller Loket 01 (${tx.method})`,
    amount: bare,
    depositAmount: signed,
  }
}

export function TabunganPage() {
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)
  const loading = useSimulatedLoading()

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={NAV_ITEMS} logo />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Guru & Karyawan" />

        <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 p-8">
          {loading ? (
            <PageSkeleton variant="detail" hasFilters />
          ) : (
            <>
          {/* HEADER */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-col gap-0.5">
              <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                Tabungan
              </h1>
              <p className="text-sm leading-5 text-[#434655]">
                Kelola saldo dan riwayat tabungan Anda.
              </p>
            </div>

            <div className="inline-flex items-center gap-2 rounded-xl border border-[#c3c6d7]/30 bg-white px-3.5 py-1.5 shadow-[0px_1px_2px_#0000000d]">
              <CalendarDays className="h-[13.5px] w-[13.5px] shrink-0 text-[#434655]" aria-hidden="true" />
              <span className="text-xs font-semibold leading-4 tracking-[0.24px] whitespace-nowrap text-[#434655]">
                Semester Ganjil TA 2026/2027
              </span>
            </div>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-12 gap-6 lg:grid-rows-[338px]">
            <TabunganSummary />
            <DepositStatus onReceiptClick={() => setReceiptData(DEFAULT_RECEIPT)} />
          </div>

          {/* RIWAYAT */}
          <TransactionTable
            onReceiptClick={(transaction) => setReceiptData(buildReceipt(transaction))}
          />

        {receiptData ? (
          <ReceiptModal data={receiptData} onClose={() => setReceiptData(null)} />
        ) : null}
            </>
          )}
        </main>
      </div>
    </div>
  )
}