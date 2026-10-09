import { Outlet } from 'react-router-dom'
import { DashboardSidebar, type SidebarItem } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'
import pinjamanIcon from '@/assets/icon/pinjaman.svg'
import pembayaranPinjamanIcon from '@/assets/icon/pembayaran-pinjaman.svg'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/guru/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/guru/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/guru/penarikan', label: 'Penarikan', icon: penarikanIcon },
  { to: '/guru/pinjaman', label: 'Pinjaman', icon: pinjamanIcon },
  { to: '/guru/pembayaran-pinjaman', label: 'Pembayaran Pinjaman', icon: pembayaranPinjamanIcon },
]

export function GuruKaryawanLayout() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={NAV_ITEMS} logo />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Guru & Karyawan" />

        <main className="flex w-full max-w-[1280px] flex-1 flex-col gap-6 p-6 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
