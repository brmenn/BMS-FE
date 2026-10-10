import type { ComponentType } from 'react'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'
import pembayaranPinjamanIcon from '@/assets/icon/pembayaran-pinjaman.svg'

export type SidebarIcon = string | ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
export type SidebarItem = {
  to?: string
  label: string
  icon?: SidebarIcon
  disabled?: boolean
}

export const adminItems: SidebarItem[] = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { label: 'Laporan Arus Kas', icon: penarikanIcon, disabled: true },
  { to: '/admin/tabungan', label: 'Laporan Tabungan Siswa', icon: tabunganIcon },
  { label: 'Laporan Petugas Piket', icon: pembayaranPinjamanIcon, disabled: true },
]

export const defaultItems: SidebarItem[] = [
  { to: '/siswa/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/siswa/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/siswa/penarikan', label: 'Penarikan', icon: penarikanIcon },
]
