import { NavLink } from 'react-router-dom'
import { Banknote, HandCoins, LayoutDashboard, Wallet, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SidebarItem = { to: string; label: string; icon: LucideIcon }

const defaultItems: SidebarItem[] = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tabungan', label: 'Tabungan', icon: Wallet },
  { to: '/penarikan/guru', label: 'Penarikan', icon: Banknote },
  { to: '/pinjaman/guru', label: 'Pinjaman', icon: HandCoins },
]

interface DashboardSidebarProps {
  items?: SidebarItem[]
  logo?: boolean
}

export function DashboardSidebar({ items = defaultItems, logo = false }: DashboardSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col gap-6 border-r border-solid border-[#c3c6d7] bg-white p-4 shadow-[0px_1px_2px_#0000000d] lg:flex">
      {logo ? (
        <div className="flex h-16 w-full items-center justify-center">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className="h-14 w-auto"
            src="/logoTitle.png"
          />
        </div>
      ) : (
        <div className="h-[50px] w-full" />
      )}
      <nav className="flex w-full flex-col gap-1.5">
        {items.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                isActive
                  ? 'bg-[#eff4ff] text-[#004ac6]'
                  : 'text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a]',
              )
            }
            end={to === '/dashboard'}
            key={to}
            to={to}
          >
            <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap text-base font-medium leading-6 tracking-[0]">{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
