import { useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Banknote, Bell, ChevronDown, ClipboardList, LayoutDashboard, Wallet } from 'lucide-react'
import { NavLink, Outlet } from 'react-router-dom'
import { cn } from '@/lib/utils'
import logoTitle from '@/assets/logo/logoTitle.png'
import avatar from '@/assets/logo/avatar.png'
import { ProfilePopover } from '@/features/dashboard/components/ProfilePopover'
import { getRoleProfile } from '@/features/dashboard/components/role-profiles'

interface AdminNavItem {
  label: string
  sub?: string
  icon: LucideIcon
  to?: string
}

const NAV_ITEMS: AdminNavItem[] = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Laporan Arus Kas', icon: Banknote, to: '/admin/laporan-arus-kas' },
  { label: 'Laporan Tabungan', sub: 'Siswa', icon: Wallet },
  { label: 'Laporan Petugas Piket', icon: ClipboardList },
]

const navItemClass = 'flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm'
const navItemActiveClass = 'bg-[#eff4ff] font-semibold text-[#004ac6] shadow-[0px_1px_2px_#0000000d]'
const navItemInactiveClass = 'font-medium text-[#737686] hover:bg-[#f8f9ff] hover:text-[#121c2a]'

export function AdminLayout() {
  const [profileOpen, setProfileOpen] = useState(false)
  const profile = getRoleProfile('Admin')

  return (
    <div className="flex min-h-screen w-full bg-[#f8f9ff]">
      <aside
        className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col bg-white shadow-[0px_1px_2px_#0000000d] lg:flex print:hidden"
        aria-label="Navigasi admin"
      >
        <div className="flex h-[72px] w-full shrink-0 items-center justify-center border-b border-[#c3c6d7] px-4">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className="h-14 w-auto object-contain"
            src={logoTitle}
          />
        </div>

        <nav className="mt-4 flex w-full flex-col gap-1.5 p-4" aria-label="Menu laporan">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon
            const content = (
              <>
                <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
                <span className="flex flex-col items-start leading-5">
                  <span>{item.label}</span>
                  {item.sub ? (
                    <span className="text-[11px] leading-[14px] font-medium">{item.sub}</span>
                  ) : null}
                </span>
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
        <header className="sticky top-0 z-20 flex h-[72px] w-full items-center justify-between gap-4 border-b border-[#c3c6d7] bg-white px-5 shadow-[0px_1px_2px_#0000000d] sm:px-8 print:hidden">
          <p className="truncate text-lg font-semibold tracking-[-0.45px] text-[#121c2a]">
            BMS&nbsp;&nbsp;Admin&nbsp;&nbsp;|&nbsp;&nbsp;SMKS Muhammadiyah 1 Genteng
          </p>

          <div className="flex items-center gap-5">
            <button
              aria-label="Notifikasi"
              className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors hover:bg-[#f8f9ff]"
              type="button"
            >
              <Bell className="h-5 w-5 text-[#121c2a]" aria-hidden="true" />
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#ba1a1a] text-[10px] font-bold leading-4 text-white">
                4
              </span>
            </button>

            <span aria-hidden="true" className="h-8 w-px bg-[#c3c6d7]" />

            <div className="relative">
              <button
                aria-expanded={profileOpen}
                aria-haspopup="dialog"
                aria-label="Menu profil"
                className="flex shrink-0 items-center gap-3 rounded-xl transition-colors hover:bg-[#f8f9ff]"
                onClick={() => setProfileOpen((prev) => !prev)}
                type="button"
              >
                <img
                  alt="Profil"
                  className="h-10 w-10 rounded-full bg-[#eff4ff] p-0.5 object-cover ring-2 ring-[#004ac633]"
                  src={avatar}
                />
                <ChevronDown
                  className={cn('hidden h-4 w-4 text-[#434655] sm:block', profileOpen && 'rotate-180')}
                  aria-hidden="true"
                />
              </button>
              {profileOpen ? (
                <ProfilePopover onClose={() => setProfileOpen(false)} profile={profile} />
              ) : null}
            </div>
          </div>
        </header>

        <main className="flex min-w-0 flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}