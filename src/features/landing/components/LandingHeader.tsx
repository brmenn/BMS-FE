import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Tentang', href: '#tentang' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Rating', href: '#ulasan' },
]

export function LandingHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('#beranda')

  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-[#e5e7eb] bg-white shadow-[0px_6px_2px_#0000000d]">
      <div className="mx-auto flex h-[69px] w-full max-w-[1160px] items-center justify-between gap-6 px-4 sm:px-6">
        <a
          className="-ml-3 flex shrink-0 items-center sm:-ml-5"
          href="#beranda"
          onClick={() => setMenuOpen(false)}
        >
          <img
            alt="Logo Bank Mini Sekolah"
            className="h-11 w-auto object-contain sm:h-16"
            src="/logoKet.png"
          />
        </a>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Navigasi utama">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              className={`text-sm leading-[21px] transition-colors hover:text-[#2563eb] ${
                item.href === activeNav ? 'font-semibold text-[#2563eb]' : 'font-medium text-[#334155]'
              }`}
              href={item.href}
              onClick={() => setActiveNav(item.href)}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            className="text-[13px] font-medium leading-[19.5px] text-[#334155] transition-colors hover:text-[#2563eb]"
            to="/register"
          >
            Register
          </Link>
          <Link
            className="flex h-9 items-center justify-center rounded-lg border border-[#e5e7eb] bg-[#2961ef] px-4 text-[13px] font-medium leading-[19.5px] text-white transition-colors hover:bg-[#1d4ed8]"
            to="/login"
          >
            Masuk
          </Link>
        </div>

        <button
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#e5e7eb] text-[#334155] transition-colors hover:bg-slate-50 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          type="button"
        >
          {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {menuOpen ? (
        <nav
          className="flex flex-col items-start gap-1 border-t border-[#e5e7eb] bg-white px-4 py-4 md:hidden"
          aria-label="Navigasi utama (seluler)"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              className={`w-full rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[#eff4ff] ${
                item.href === activeNav
                  ? 'font-semibold text-[#2563eb]'
                  : 'font-medium text-[#334155]'
              }`}
              href={item.href}
              onClick={() => {
                setActiveNav(item.href)
                setMenuOpen(false)
              }}
            >
              {item.label}
            </a>
          ))}

          <div className="mt-3 flex w-full items-center gap-3">
            <Link
              className="flex h-9 flex-1 items-center justify-center rounded-lg border border-[#e5e7eb] px-4 text-[13px] font-medium text-[#334155]"
              to="/register"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
            <Link
              className="flex h-9 flex-1 items-center justify-center rounded-lg bg-[#2961ef] px-4 text-[13px] font-medium text-white"
              to="/login"
              onClick={() => setMenuOpen(false)}
            >
              Masuk
            </Link>
          </div>
        </nav>
      ) : null}
    </header>
  )
}
