import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { defaultItems, type SidebarIcon, type SidebarItem } from './sidebar-items'
import logoKet from '@/assets/logo/logoKet.png'

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
  logoClassName?: string
  variant?: 'default' | 'admin'
}

export function DashboardSidebar({
  items = defaultItems,
  logo = false,
  logoSrc = logoKet,
  logoClassName,
  variant: _variant = 'default',
}: DashboardSidebarProps) {
  const location = useLocation()
  const itemBaseClass = 'relative z-10 flex items-center gap-3 rounded-xl px-4 py-3 transition-colors'
  const itemActiveClass = 'nav-active text-[#004ac6] font-medium'
  const itemInactiveClass = 'text-[#434655] hover:bg-[#f8f9ff] hover:text-[#121c2a] font-medium'

  const navRef = useRef<HTMLElement | null>(null)
  const [pill, setPill] = useState<{ top: number; height: number } | null>(null)

  // Ambil path aktif sebelumnya dari sessionStorage
  const getPrevPath = () => {
    try {
      return sessionStorage.getItem('sidebar-last-path')
    } catch {
      return null
    }
  }

  // Animasi pill: saat mount/route berubah, geser dari item sebelumnya ke item aktif
  useLayoutEffect(() => {
    const nav = navRef.current
    if (!nav) return

    const anchors = Array.from(nav.querySelectorAll<HTMLElement>('[data-navlink]'))
    if (anchors.length === 0) return

    const activeIndex = anchors.findIndex((anchor) => anchor.classList.contains('nav-active'))
    const active = activeIndex !== -1 ? anchors[activeIndex] : anchors[0]

    const target = { top: active.offsetTop, height: active.offsetHeight }

    // Cari item sebelumnya berdasarkan path tersimpan
    const prevPath = getPrevPath()
    let start = target
    if (prevPath) {
      const prevAnchor = anchors.find((a) => a.getAttribute('href') === prevPath || a.getAttribute('to') === prevPath)
      if (prevAnchor) {
        start = { top: prevAnchor.offsetTop, height: prevAnchor.offsetHeight }
      }
    }

    // Simpan path aktif sekarang untuk next navigation
    try {
      sessionStorage.setItem('sidebar-last-path', location.pathname)
    } catch {}

    // Mulai dari posisi sebelumnya, lalu animasi ke item aktif
    setPill(start)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setPill(target))
    })
  }, [location.pathname, items])

  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col gap-6 border-r border-solid border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d] lg:flex">
      {logo ? (
        <div className="flex h-16 w-full items-center justify-center border-b border-solid border-[#c3c6d7]">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className={logoClassName ?? 'h-6 w-auto'}
            src={logoSrc}
          />
        </div>
      ) : (
        <div className="h-16 w-full border-b border-solid border-[#c3c6d7]" />
      )}
      <nav ref={navRef} className="relative flex w-full flex-col gap-1.5 px-4 pb-4">
        {pill ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 left-4 rounded-xl bg-[#eff4ff] transition-[top,height] duration-300 ease-out"
            style={{ top: pill.top, height: pill.height }}
          />
        ) : null}
        {items.map(({ to, label, icon, disabled }) => {
          const content = (
            <>
              <SidebarIconView icon={icon} />
              <span className="whitespace-nowrap text-sm leading-5 tracking-[0]">
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
                data-navlink=""
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
