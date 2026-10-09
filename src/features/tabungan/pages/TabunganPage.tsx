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
import { SetorTabunganModal } from '../components/SetorTabunganModal'
import './TabunganPage.css'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/guru/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/guru/penarikan', label: 'Penarikan', icon: penarikanIcon },
  { to: '/guru/pinjaman', label: 'Pinjaman', icon: pinjamanIcon },
  { to: '/guru/pembayaran-pinjaman', label: 'Pembayaran Pinjaman', icon: pembayaranPinjamanIcon },
]

export function TabunganPage() {
    const [showSetorModal, setShowSetorModal] = useState(false)
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

            <DepositStatus />

          </div>


          {/* RIWAYAT */}
          <TransactionTable />

          {showSetorModal && (
        <SetorTabunganModal
            onClose={() => setShowSetorModal(false)}
        />
        )}

        </section>

      </main>

    </div>
  )
}