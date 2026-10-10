import { useEffect } from 'react'
import { LogOut, Settings } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import type { RoleProfile } from './role-profiles'

interface ProfilePopoverProps {
  profile: RoleProfile
  onClose: () => void
}

const STATUS_CLASS = {
  Aktif: 'bg-[#dcfce7] text-[#166534]',
  Nonaktif: 'bg-[#fee2e2] text-[#b91c1c]',
} as const

export function ProfilePopover({ profile, onClose }: ProfilePopoverProps) {
  const navigate = useNavigate()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const handleLogout = () => {
    onClose()
    navigate('/login')
  }

  return (
    <>
      <button
        aria-hidden="true"
        className="fixed inset-0 z-20 cursor-default"
        onClick={onClose}
        tabIndex={-1}
        type="button"
      />

      <div
        aria-label="Detail profil pengguna"
        className="absolute top-[calc(100%+8px)] right-0 z-30 flex max-h-[calc(100vh-6rem)] w-[293px] max-w-[calc(100vw-2rem)] flex-col overflow-y-auto rounded-2xl border border-[#c3c6d7] bg-white px-6 pt-6 shadow-[0px_20px_40px_-12px_#00000026]"
        role="dialog"
      >
        <div className="flex flex-col items-center border-b border-[#c3c6d7] pb-6">
          <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#dbe1ff] text-3xl font-bold leading-[38px] tracking-[-0.45px] text-[#004ac6] shadow-[0_0_0_4px_#dbe1ff80]">
            {profile.initials}
          </span>
          <h2 className="mt-4 text-center text-xl font-semibold leading-7 tracking-[-0.1px] text-[#121c2a]">
            {profile.name}
          </h2>
          <span className="mt-1 inline-flex rounded-full bg-[#dee9fc] px-3 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#004ac6]">
            {profile.roleLabel}
          </span>
          <p className="mt-2 text-center text-xs leading-[18px] text-[#434655]">
            {profile.identity}
          </p>
        </div>

        <dl className="flex flex-col gap-4 py-5">
          <div className="flex items-center justify-between gap-3">
            <dt className="text-sm leading-5 text-[#434655]">Email Terdaftar</dt>
            <dd className="text-right text-sm leading-5 font-medium break-all text-[#121c2a]">
              {profile.email}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-sm leading-5 text-[#434655]">No WhatsApp</dt>
            <dd className="text-right text-sm leading-5 font-medium text-[#121c2a]">
              {profile.phone}
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-sm leading-5 text-[#434655]">Status Akun</dt>
            <dd>
              <span
                className={cn(
                  'inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px]',
                  STATUS_CLASS[profile.status],
                )}
              >
                {profile.status}
              </span>
            </dd>
          </div>
          <div className="flex items-center justify-between gap-3">
            <dt className="text-sm leading-5 text-[#434655]">Login Terakhir</dt>
            <dd className="text-right text-sm leading-5 font-medium text-[#121c2a]">
              {profile.lastLogin}
            </dd>
          </div>
        </dl>

        <div className="flex flex-col gap-1 border-t border-[#d9e3f6] pt-4 pb-3">
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium leading-5 text-[#434655] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            <Settings className="h-[15px] w-[15px] shrink-0" aria-hidden="true" />
            Pengaturan Akun
          </button>
          <button
            className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-left text-sm font-medium leading-5 text-[#ba1a1a] transition-colors hover:bg-[#fff1f2]"
            onClick={handleLogout}
            type="button"
          >
            <LogOut className="h-[15px] w-[15px] shrink-0" aria-hidden="true" />
            Keluar
          </button>
        </div>
      </div>
    </>
  )
}
