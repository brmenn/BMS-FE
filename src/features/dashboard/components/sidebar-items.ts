import type { ComponentType } from 'react'
import dashboardIcon from '@/assets/icon/dashboard.svg'
import tabunganIcon from '@/assets/icon/tabungan.svg'
import penarikanIcon from '@/assets/icon/penarikan.svg'

export type SidebarIcon = string | ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
export type SidebarItem = {
  to?: string
  label: string
  icon?: SidebarIcon
}

export const defaultItems: SidebarItem[] = [
  { to: '/siswa/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/siswa/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/siswa/penarikan', label: 'Penarikan', icon: penarikanIcon },
]
