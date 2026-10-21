import { Outlet } from 'react-router-dom'
import { DashboardSidebar, type SidebarItem } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import dashboardIcon from '@/assets/icon/nav/dashboard.svg'
import tabunganIcon from '@/assets/icon/nav/tabungan.svg'
import penarikanIcon from '@/assets/icon/nav/penarikan.svg'
import pinjamanIcon from '@/assets/icon/nav/pinjaman.svg'
import pembayaranPinjamanIcon from '@/assets/icon/nav/pembayaran-pinjaman.svg'

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

        <main className="mx-auto flex w-full max-w-[1280px] flex-1 flex-col gap-6 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
