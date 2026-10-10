import { ClipboardList } from 'lucide-react'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import arusKasIcon from '@/assets/icon/arus-kas.svg'
import type { SidebarItem } from './sidebar-items'

export const adminItems: SidebarItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/admin/laporan-arus-kas', label: 'Laporan Arus Kas', icon: arusKasIcon },
  { label: 'Laporan Tabungan Siswa', icon: tabunganIcon },
  { label: 'Laporan Petugas Piket', icon: ClipboardList },
]