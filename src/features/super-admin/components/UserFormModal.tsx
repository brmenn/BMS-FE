import { useState } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
  type SuperAdminUser,
  type SuperAdminUserRole,
  type SuperAdminUserStatus,
} from '../data/users'

export interface UserFormValue {
  name: string
  email: string
  username: string
  identity: string
  role: SuperAdminUserRole
  status: SuperAdminUserStatus
}

type UserFormMode = 'create' | 'edit'

interface UserFormModalProps {
  mode: UserFormMode
  user?: SuperAdminUser
  onClose: () => void
  onSubmit: (value: UserFormValue) => void
}

const fieldClass =
  'h-11 w-full rounded-xl border border-[#c3c6d7] bg-white px-3.5 text-sm leading-5 text-[#121c2a] placeholder:text-[#737686] focus:border-[#2563eb] focus:outline-none'

const labelClass = 'text-xs font-semibold leading-[18px] text-[#434655]'

const MODE_TITLE: Record<UserFormMode, string> = {
  create: 'Tambah User',
  edit: 'Edit User',
}

export function UserFormModal({ mode, user, onClose, onSubmit }: UserFormModalProps) {
  const [name, setName] = useState(user?.name ?? '')
  const [email, setEmail] = useState(user?.email ?? '')
  const [username, setUsername] = useState(user?.username ?? '')
  const [identity, setIdentity] = useState(user?.identity ?? '')
  const [role, setRole] = useState<SuperAdminUserRole>(user?.role ?? 'Siswa')
  const [status, setStatus] = useState<SuperAdminUserStatus>(user?.status ?? 'Aktif')
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({})

  const handleSubmit = () => {
    const nextErrors: { name?: string; email?: string } = {}

    if (!name.trim()) nextErrors.name = 'Nama lengkap wajib diisi'
    if (!email.trim()) nextErrors.email = 'Email wajib diisi'
    else if (!email.includes('@')) nextErrors.email = 'Format email belum sesuai'

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const fallbackUsername = email.trim()
      ? `@${email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '')}`
      : ''

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      username: username.trim() || fallbackUsername,
      identity: identity.trim(),
      role,
      status,
    })
  }

  return (
    <div
      aria-labelledby="user-form-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup formulir user"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d74c] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-1">
            <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">
              USER MANAGEMENT
            </span>
            <h2 className="text-lg font-bold leading-6 text-[#121c2a]" id="user-form-title">
              {MODE_TITLE[mode]}
            </h2>
          </div>
          <button
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="user-form-name">
                Nama Lengkap <span className="text-[#dc2626]">*</span>
              </label>
              <input
                className={cn(fieldClass, errors.name && 'border-[#dc2626]')}
                id="user-form-name"
                onChange={(event) => setName(event.target.value)}
                placeholder="Contoh: Sinta Putri Lestari"
                value={name}
              />
              {errors.name ? (
                <span className="text-xs leading-[18px] text-[#dc2626]">{errors.name}</span>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="user-form-email">
                  Email <span className="text-[#dc2626]">*</span>
                </label>
                <input
                  className={cn(fieldClass, errors.email && 'border-[#dc2626]')}
                  id="user-form-email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="nama@mail.com"
                  type="email"
                  value={email}
                />
                {errors.email ? (
                  <span className="text-xs leading-[18px] text-[#dc2626]">{errors.email}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="user-form-username">
                  Username
                </label>
                <input
                  className={fieldClass}
                  id="user-form-username"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="@username"
                  value={username}
                />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="user-form-identity">
                ID / Identitas (NIP, NISN, atau ID Staf)
              </label>
              <input
                className={fieldClass}
                id="user-form-identity"
                onChange={(event) => setIdentity(event.target.value)}
                placeholder="Contoh: NISN: 0068192381"
                value={identity}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="user-form-role">
                  Role
                </label>
                <select
                  className={cn(fieldClass, 'appearance-none pr-8')}
                  id="user-form-role"
                  onChange={(event) => setRole(event.target.value as SuperAdminUserRole)}
                  value={role}
                >
                  {USER_ROLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="user-form-status">
                  Status
                </label>
                <select
                  className={cn(fieldClass, 'appearance-none pr-8')}
                  id="user-form-status"
                  onChange={(event) => setStatus(event.target.value as SuperAdminUserStatus)}
                  value={status}
                >
                  {USER_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#c3c6d74c] bg-[#f8f9ff] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            className="h-11 rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-semibold leading-5 text-[#434655] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Batal
          </button>
          <button
            className="h-11 rounded-xl bg-[#004ac6] px-5 text-sm font-semibold leading-5 text-white shadow-[0px_2px_4px_-2px_#004ac633,0px_4px_6px_-1px_#004ac633] transition hover:brightness-[0.98]"
            onClick={handleSubmit}
            type="button"
          >
            {mode === 'create' ? 'Simpan User' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  )
}
