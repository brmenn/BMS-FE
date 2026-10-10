import { useState } from 'react'
import { DashboardSidebar, type SidebarItem } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'
import pinjamanIcon from '@/assets/icon/pinjaman.svg'
import pembayaranPinjamanIcon from '@/assets/icon/pembayaran-pinjaman.svg'
import { TabunganSummary } from '../components/TabunganSummary'
import { DepositStatus } from '../components/DepositStatus'
import { TransactionTable } from '../components/TransactionTable'
import type { Transaction } from '../components/TransactionTable'
import { SetorTabunganModal } from '../components/SetorTabunganModal'
import { ReceiptModal } from '../components/ReceiptModal'
import type { ReceiptData } from '../components/receipt-data'
import { DEFAULT_RECEIPT } from '../components/receipt-data'
import './TabunganPage.css'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/guru/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/guru/penarikan', label: 'Penarikan', icon: penarikanIcon },
  { to: '/guru/pinjaman', label: 'Pinjaman', icon: pinjamanIcon },
  { to: '/guru/pembayaran-pinjaman', label: 'Pembayaran Pinjaman', icon: pembayaranPinjamanIcon },
]

function buildReceipt(tx: Transaction): ReceiptData {
  const signed = tx.amount.startsWith('-')
    ? `- ${tx.amount.slice(1)}`
    : `+ ${tx.amount.slice(1)}`
  const bare = tx.amount.startsWith('+') || tx.amount.startsWith('-')
    ? tx.amount.slice(1)
    : tx.amount

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
  const [showSetorModal, setShowSetorModal] = useState(false)
  const [receiptData, setReceiptData] = useState<ReceiptData | null>(null)

  return (
    <div className="tabungan-page">

      {/* SIDEBAR */}
      <DashboardSidebar items={NAV_ITEMS} logo />

      {/* AREA KANAN */}
      <main className="tabungan-main lg:pl-64">

        {/* HEADER */}
        <DashboardTopbar role="Guru & Karyawan" />

        {/* CONTENT */}
        <section className="tabungan-content">

          {/* TITLE */}
          <div className="tabungan-heading">

            <div>
              <h1>Tabungan</h1>
              <p>Kelola saldo dan riwayat tabungan Anda.</p>
            </div>

            <button className="semester-button">
            ▣ &nbsp; Semester Ganjil TA 2026/2027
            </button>

          </div>


          {/* CARD ATAS */}
          <div className="top-cards">

            <TabunganSummary 
            onSetorClick={() => setShowSetorModal(true)}
            />

            <DepositStatus
            onReceiptClick={() => setReceiptData(DEFAULT_RECEIPT)}
            />
          </div>


          {/* RIWAYAT */}
          <TransactionTable
            onReceiptClick={(transaction) => setReceiptData(buildReceipt(transaction))}
            />

          {showSetorModal && (
        <SetorTabunganModal
            onClose={() => setShowSetorModal(false)}
        />
        )}

        {receiptData && (
        <ReceiptModal
            data={receiptData}
            onClose={() => setReceiptData(null)}
        />
        )}

        </section>

      </main>

    </div>
  )
}