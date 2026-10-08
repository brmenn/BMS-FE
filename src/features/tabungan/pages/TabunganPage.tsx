import { useState } from 'react'
import bmsLogo from '@/assets/bms-logo.png'
import { TabunganSummary } from '../components/TabunganSummary'
import { DepositStatus } from '../components/DepositStatus'
import { TransactionTable } from '../components/TransactionTable'
import { SetorTabunganModal } from '../components/SetorTabunganModal'
import './TabunganPage.css'

export function TabunganPage() {
    const [showSetorModal, setShowSetorModal] = useState(false)
  return (
    <div className="tabungan-page">

      {/* SIDEBAR */}
      <aside className="tabungan-sidebar">
        <div className="tabungan-logo">
          <img
            className="bms-logo"
            src={bmsLogo}
            alt="BMS"
          />
        </div>

        <nav className="tabungan-nav">

          <a href="#" className="nav-item">
            <span>▦</span>
            Dashboard
          </a>

          <a href="/tabungan" className="nav-item active">
            <span>▣</span>
            Tabungan
          </a>


          <a href="#" className="nav-item">
            <span>♜</span>
            Pinjaman
          </a>

          <a href="#" className="nav-item">
            <span>▣</span>
            Pembayaran Pinjaman
          </a>

        </nav>
      </aside>


      {/* AREA KANAN */}
      <main className="tabungan-main">

        {/* HEADER */}
        <header className="tabungan-header">

          <div className="header-title">
            <strong>BMS Guru & Karyawan</strong>
            <span>|</span>
            <strong>SMKS Muhammadiyah 1 Genteng</strong>
          </div>

          <div className="header-profile">

            <button className="notification-button">
              ♧
            </button>

            <div className="profile-circle">
              <img
                src="https://i.pravatar.cc/100?img=47"
                alt="Profile"
              />
            </div>

          </div>

        </header>


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