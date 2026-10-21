import type { ComponentType } from 'react'
import dashboardIcon from '@/assets/icon/nav/dashboard.svg'
import tabunganIcon from '@/assets/icon/nav/tabungan.svg'
import penarikanIcon from '@/assets/icon/nav/penarikan.svg'

export type SidebarIcon = string | ComponentType<{ className?: string; 'aria-hidden'?: boolean | 'true' | 'false' }>
export type SidebarItem = {
  to?: string
  label: string
  icon?: SidebarIcon
  disabled?: boolean
}

export const defaultItems: SidebarItem[] = [
  { to: '/siswa/dashboard', label: 'Dashboard', icon: dashboardIcon },
  { to: '/siswa/tabungan', label: 'Tabungan', icon: tabunganIcon },
  { to: '/siswa/penarikan', label: 'Penarikan', icon: penarikanIcon },
]
