import { type CSSProperties } from 'react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { defaultItems, type SidebarIcon, type SidebarItem } from './sidebar-items'
import logoTitle from '@/assets/logo/logoTitle.png'

export type { SidebarItem } from './sidebar-items'

const maskStyle = (src: string): CSSProperties => ({
  backgroundColor: 'currentColor',
  maskImage: `url("${src}")`,
  WebkitMaskImage: `url("${src}")`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
})

interface DashboardSidebarProps {
  items?: SidebarItem[]
  logo?: boolean
  logoSrc?: string
  variant?: 'default' | 'admin'
}

export function DashboardSidebar({
  items = defaultItems,
  logo = false,
  logoSrc = logoTitle,
  variant = 'default',
}: DashboardSidebarProps) {
  const itemBaseClass = 'flex items-center gap-3 rounded-xl px-4 py-3 transition-colors'
  const itemActiveClass =
    variant === 'admin' ? 'bg-[#eff4ff] font-semibold text-[#004ac6]' : 'bg-[#eff4ff] text-[#004ac6]'
  const itemInactiveClass =
    variant === 'admin'
      ? 'font-medium text-[#737686] hover:bg-[#f8f9ff] hover:text-[#121c2a]'
      : 'text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a]'

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col gap-6 border-r border-solid border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d] lg:flex">
      {logo ? (
        <div className="flex h-16 w-full items-center justify-center border-b border-solid border-[#c3c6d7]">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className="h-14 w-auto"
            src={logoSrc}
          />
        </div>
      ) : (
        <div className="h-16 w-full border-b border-solid border-[#c3c6d7]" />
      )}
      <nav className="flex w-full flex-col gap-1.5 px-4 pb-4">
        {items.map(({ to, label, icon, disabled }) => {
          const content = (
            <>
              <SidebarIconView icon={icon} />
              <span
                className={
                  variant === 'admin'
                    ? 'whitespace-normal text-sm leading-5 tracking-[0]'
                    : 'whitespace-nowrap text-base font-medium leading-6 tracking-[0]'
                }
              >
                {label}
              </span>
            </>
          )

          if (to) {
            return (
              <NavLink
                className={({ isActive }) =>
                  cn(itemBaseClass, isActive ? itemActiveClass : itemInactiveClass)
                }
                end={to.endsWith('/dashboard')}
                key={label}
                to={to}
              >
                {content}
              </NavLink>
            )
          }

          return disabled ? (
            <div
              aria-disabled="true"
              className={cn(itemBaseClass, itemInactiveClass, 'cursor-default')}
              key={label}
            >
              {content}
            </div>
          ) : (
            <a className={cn(itemBaseClass, itemInactiveClass)} href="#" key={label}>
              {content}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}

function SidebarIconView({ icon }: { icon?: SidebarIcon }) {
  if (!icon) return null

  if (typeof icon === 'string') {
    return (
      <span
        aria-hidden="true"
        className="h-[18px] w-[18px] shrink-0"
        style={maskStyle(icon)}
      />
    )
  }

  const Icon = icon
  return <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
}
