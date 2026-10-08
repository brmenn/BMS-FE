import type { LucideIcon } from 'lucide-react'
import { HandCoins, LayoutDashboard, ReceiptText, Wallet } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  icon?: LucideIcon
  img?: string
  to?: string
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard },
{ label: 'Tabungan', img: '/Screenshot 2026-10-08 115431.png' },
  { label: 'Penarikan', icon: Wallet, to: '/penarikan/guru' },
  { label: 'Pinjaman', icon: HandCoins, to: '/pinjaman/guru' },
  { label: 'Pembayaran Pinjaman', icon: ReceiptText },
]

const navItemClass = 'flex w-full items-center gap-3.5 rounded-xl px-3 py-2.5 text-sm font-medium'
const navItemActiveClass = 'bg-[#eaf2ff] font-semibold text-[#2563eb]'
const navItemInactiveClass = 'text-[#64748b] hover:bg-[#f8fafc]'

export function GuruKaryawanLayout() {
  return (
    <div className="flex min-h-screen w-full bg-[#f3f7fb]">
      <aside
        className="sticky top-0 hidden h-screen w-[230px] shrink-0 flex-col border-r border-[#c3c6d7] bg-white px-5 pt-0 pb-5 lg:flex"
        aria-label="Navigasi utama"
      >
        <div className="-mx-5 flex h-16 items-start justify-center border-b border-[#c3c6d7] px-5">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className="h-14 w-auto object-contain"
            src="/logoTitle.png"
          />
        </div>

        <nav className="mt-4 flex w-full flex-col gap-1.5" aria-label="Menu guru dan karyawan">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                {item.img ? (
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-[18px] w-[18px] shrink-0 object-contain"
                    src={item.img}
                  />
                ) : Icon ? (
                  <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                ) : null}
                <span className="leading-5">{item.label}</span>
              </>
            )

            if (item.to) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(navItemClass, isActive ? navItemActiveClass : navItemInactiveClass)
                  }
                >
                  {content}
                </NavLink>
              )
            }

            return (
              <a key={item.label} href="#" className={cn(navItemClass, navItemInactiveClass)}>
                {content}
              </a>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopbar
          brand={
            <div className="flex min-w-0 items-center gap-2">
              <p className="truncate text-base font-bold tracking-[-0.5px] text-[#121c2a] sm:text-xl sm:leading-7">
                SMKS Muhammadiyah 1 Genteng
              </p>
            </div>
          }
        />

        <main className="flex flex-1 flex-col gap-6 p-4 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
