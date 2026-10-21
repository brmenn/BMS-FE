import dashboardIcon from '@/assets/icon/nav/dashboard.svg'
import laporanArusKasIcon from '@/assets/icon/nav/laporan-arus-kas.svg'
import walletPlusIcon from '@/assets/icon/nav/wallet-plus.svg'
import laporanPiketIcon from '@/assets/icon/nav/laporan-petugas-piket.svg'
import type { SidebarItem } from './sidebar-items'

export const adminItems: SidebarItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/admin/laporan-arus-kas', label: 'Laporan Arus Kas', icon: laporanArusKasIcon },
  { to: '/admin/tabungan', label: 'Laporan Tabungan Siswa', icon: walletPlusIcon },
  { to: '/admin/laporan-petugas-piket', label: 'Laporan Petugas Piket', icon: laporanPiketIcon },
]