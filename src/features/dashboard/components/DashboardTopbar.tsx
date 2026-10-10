import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import avatar from '@/assets/logo/avatar.png'
import { ProfilePopover } from './ProfilePopover'
import { getRoleProfile } from './role-profiles'

const SCHOOL_NAME = 'SMKS Muhammadiyah 1 Genteng'

interface DashboardTopbarProps {
  role?: string
}

export function DashboardTopbar({ role }: DashboardTopbarProps) {
  const [open, setOpen] = useState(false)
  const profile = getRoleProfile(role)

  return (
    <header className="relative sticky top-0 z-10 flex h-16 w-full items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] bg-white px-6 shadow-[0px_1px_2px_#0000000d]">
      <div className="flex min-w-0 items-center gap-2">
        <p className="truncate text-base font-bold tracking-[-0.5px] text-[#121c2a] sm:text-xl sm:leading-7">
          {role ? (
            <>
              {role}&nbsp;&nbsp;|&nbsp;&nbsp;{SCHOOL_NAME}
            </>
          ) : (
            SCHOOL_NAME
          )}
        </p>
      </div>

      <div className="relative">
        <button
          aria-expanded={open}
          aria-haspopup="dialog"
          aria-label="Menu profil"
          className="flex shrink-0 items-center gap-2 rounded-xl border border-solid border-[#c3c6d766] bg-white px-3 py-2 text-[#434655] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
          onClick={() => setOpen((prev) => !prev)}
          type="button"
        >
          <img
            alt="Profil"
            className="h-7 w-7 rounded-full object-cover"
            src={avatar}
          />
          <ChevronDown
            className={cn('hidden h-4 w-4 transition-transform sm:block', open && 'rotate-180')}
            aria-hidden="true"
          />
        </button>

        {open ? <ProfilePopover onClose={() => setOpen(false)} profile={profile} /> : null}
      </div>
    </header>
  )
}

function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(' ')
}
