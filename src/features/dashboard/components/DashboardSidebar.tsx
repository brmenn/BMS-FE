import { NavLink } from 'react-router-dom'
import { Banknote, LayoutDashboard, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/tabungan', label: 'Tabungan', icon: Wallet },
  { to: '/penarikan', label: 'Penarikan', icon: Banknote },
]

export function DashboardSidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col gap-6 border-r border-solid border-[#c3c6d7] bg-white p-4 shadow-[0px_1px_2px_#0000000d] lg:flex">
      <div className="h-[50px] w-full" />
      <nav className="flex w-full flex-col gap-1.5">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors',
                isActive
                  ? 'bg-[#eff4ff] text-[#004ac6]'
                  : 'text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a]',
              )
            }
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
