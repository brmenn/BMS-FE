import { LayoutDashboard, Users, UserCog } from 'lucide-react'

export function SuperAdminSidebar() {
  return (
    <aside className="flex h-full w-full max-w-[264px] flex-col border-r border-[#c3c6d7] bg-white px-4 pb-4 shadow-[0px_1px_2px_#0000000d]">
      <header className="flex flex-col">
        <div className="-mx-4 flex h-[65px] items-center justify-center border-b border-[#c3c6d7]">
          <img
            alt="SMKS Muhammadiyah 1 Genteng"
            className="h-20 w-auto"
            src="/logoTitle.png"
          />
        </div>

        <nav className="flex flex-col gap-1.5 pt-3" aria-label="Menu dashboard super admin">
          <a
            className="flex items-center gap-3 rounded-xl bg-[#eff4ff] px-4 py-3"
            href="#dashboard"
            aria-current="page"
          >
            <span className="flex flex-col items-start">
              <LayoutDashboard className="h-[18px] w-[18px] text-[#004ac6]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start">
              <span className="text-base font-medium leading-6 text-[#004ac6]">Dashboard</span>
            </span>
          </a>

          <a className="flex items-center gap-3 rounded-xl px-4 py-3" href="#user-management">
            <span className="flex flex-col items-start">
              {/* Icon diubah dari 'Users' menjadi 'UserCog' untuk mencocokkan gambar yang diberikan */}
              <UserCog className="h-[18px] w-[18px] text-[#434655]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start">
              <span className="whitespace-nowrap text-base font-normal leading-6 text-[#434655]">User Management</span>
            </span>
            <span className="ml-auto inline-flex items-center rounded-full bg-[#004ac6] px-2 py-0.5">
              <span className="text-[11px] font-semibold leading-[16.5px] text-white">99+</span>
            </span>
          </a>
        </nav>
      </header>
    </aside>
  )
}