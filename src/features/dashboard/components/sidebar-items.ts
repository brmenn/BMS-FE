import { Banknote, HandCoins, LayoutDashboard, Wallet, type LucideIcon } from 'lucide-react'

export type SidebarItem = { to: string; label: string; icon: LucideIcon }

export const defaultItems: SidebarItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tabungan', label: 'Tabungan', icon: Wallet },
  { to: '/penarikan/siswa', label: 'Penarikan', icon: Banknote },
  { to: '/pinjaman/guru', label: 'Pinjaman', icon: HandCoins },
]
