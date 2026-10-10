import { useState } from 'react'
import {
  ChevronDown,
  CreditCard,
  Eye,
  EyeOff,
  IdCard,
  Lock,
  Mail,
  Phone,
  User,
  UserPen,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  USER_ROLE_OPTIONS,
  type SuperAdminUser,
  type SuperAdminUserRole,
} from '../data/users'

export interface EditUserValue {
  name: string
  email: string
  phone: string
  identity: string
  rekening: string
  role: SuperAdminUserRole
  password: string
}

interface EditUserModalProps {
  user: SuperAdminUser
  onClose: () => void
  onSubmit: (value: EditUserValue) => void
}

const ROLE_GROUP: Record<SuperAdminUserRole, string> = {
  'Super Admin': 'Administrator',
  Admin: 'Administrator',
  Petugas: 'Kasir',
  Akuntansi: 'Keuangan',
  Guru: 'Pendidik',
  Siswa: 'Nasabah',
}

const inputClass =
  'h-12 w-full rounded-xl border border-[#c3c6d7] bg-white pl-10 pr-4 text-sm leading-5 text-[#121c2a] placeholder:text-[#6b7280] focus:border-[#2563eb] focus:outline-none'

const labelClass = 'text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]'

const fieldIconClass =
  'pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#737686]'

export function EditUserModal({ user, onClose, onSubmit }: EditUserModalProps) {
  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)
  const [phone, setPhone] = useState(user.phone ?? '')
  const [identity, setIdentity] = useState(user.identity)
  const [rekening, setRekening] = useState('')
  const [role, setRole] = useState<SuperAdminUserRole>(user.role)
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {}

    if (!name.trim()) nextErrors.name = 'Nama lengkap wajib diisi'
    if (!email.trim()) nextErrors.email = 'Email wajib diisi'
    else if (!email.includes('@')) nextErrors.email = 'Format email belum sesuai'
    if (!phone.trim()) nextErrors.phone = 'Nomor telepon wajib diisi'

    if (password || confirm) {
      if (password.length < 8) nextErrors.password = 'Password minimal 8 karakter'
      if (confirm !== password) nextErrors.confirm = 'Konfirmasi password belum sama'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      identity: identity.trim(),
      rekening: rekening.trim(),
      role,
      password,
    })
  }

  return (
    <div
      aria-labelledby="edit-user-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup formulir edit akun"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[608px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-2xl">
        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto p-6">
          <div className="flex items-center gap-2.5 border-b border-[#c3c6d7] pb-4">
            <UserPen className="h-5 w-5 shrink-0 text-[#004ac6]" aria-hidden="true" />
            <div className="flex min-w-0 flex-col">
              <h1
                className="text-lg font-semibold leading-[26px] text-[#121c2a]"
                id="edit-user-title"
              >
                Edit Data Akun
              </h1>
              <p className="text-xs leading-[18px] text-[#434655]">
                Identitas personal dan kredensial autentikasi pengguna baru
              </p>
            </div>
            <button
              aria-label="Tutup"
              className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="edit-name">
                Nama Lengkap <span className="text-[#ba1a1a]">*</span>
              </label>
              <div className="relative">
                <User className={fieldIconClass} aria-hidden="true" />
                <input
                  className={cn(inputClass, errors.name && 'border-[#ba1a1a]')}
                  id="edit-name"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Contoh: Drs. H. Bambang Sudiro, M.Pd."
                  value={name}
                />
              </div>
              {errors.name ? (
                <span className="text-xs leading-[18px] text-[#ba1a1a]">{errors.name}</span>
              ) : null}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-email">
                  Email <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Mail className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={cn(inputClass, errors.email && 'border-[#ba1a1a]')}
                    id="edit-email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="nama@smkmuhi.sch.id"
                    type="email"
                    value={email}
                  />
                </div>
                {errors.email ? (
                  <span className="text-xs leading-[18px] text-[#ba1a1a]">{errors.email}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-phone">
                  Nomor Telepon / WhatsApp <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Phone className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={cn(inputClass, errors.phone && 'border-[#ba1a1a]')}
                    id="edit-phone"
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="0812-3456-7890"
                    value={phone}
                  />
                </div>
                {errors.phone ? (
                  <span className="text-xs leading-[18px] text-[#ba1a1a]">{errors.phone}</span>
                ) : null}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-identity">
                  Nomor Induk (NBM / NUPTK)
                </label>
                <div className="relative">
                  <IdCard className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={inputClass}
                    id="edit-identity"
                    onChange={(event) => setIdentity(event.target.value)}
                    placeholder="19820415 200801 1 015"
                    value={identity}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-rekening">
                  Nomor Rekening ( Opsional )
                </label>
                <div className="relative">
                  <CreditCard className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={inputClass}
                    id="edit-rekening"
                    onChange={(event) => setRekening(event.target.value)}
                    placeholder="19820415 200801 1 015"
                    value={rekening}
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-4 pt-1 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-password">
                  Password <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Lock className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={cn(inputClass, 'pr-11', errors.password && 'border-[#ba1a1a]')}
                    id="edit-password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimal 8 karakter alfanumerik"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
                    onClick={() => setShowPassword((prev) => !prev)}
                    type="button"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <span className="text-xs leading-[18px] text-[#ba1a1a]">{errors.password}</span>
                ) : null}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className={labelClass} htmlFor="edit-confirm">
                  Konfirmasi Password <span className="text-[#ba1a1a]">*</span>
                </label>
                <div className="relative">
                  <Lock className={fieldIconClass} aria-hidden="true" />
                  <input
                    className={cn(inputClass, 'pr-11', errors.confirm && 'border-[#ba1a1a]')}
                    id="edit-confirm"
                    onChange={(event) => setConfirm(event.target.value)}
                    placeholder="Pastikan password sama persis"
                    type={showConfirm ? 'text' : 'password'}
                    value={confirm}
                  />
                  <button
                    aria-label={
                      showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'
                    }
                    className="absolute top-1/2 right-3 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
                    onClick={() => setShowConfirm((prev) => !prev)}
                    type="button"
                  >
                    {showConfirm ? (
                      <EyeOff className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Eye className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>
                {errors.confirm ? (
                  <span className="text-xs leading-[18px] text-[#ba1a1a]">{errors.confirm}</span>
                ) : null}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className={labelClass} htmlFor="edit-role">
                Role Pengguna &amp; Hak Akses
              </label>
              <div className="relative">
                <User className={fieldIconClass} aria-hidden="true" />
                <select
                  className={cn(inputClass, 'appearance-none pr-9 font-semibold')}
                  id="edit-role"
                  onChange={(event) => setRole(event.target.value as SuperAdminUserRole)}
                  value={role}
                >
                  {USER_ROLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#737686]"
                />
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-sm font-semibold leading-5 text-[#121c2a]">{role}</span>
                <span className="rounded bg-[#dee9fc] px-2 py-0.5 text-[10px] leading-5 text-[#434655]">
                  {ROLE_GROUP[role]}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-[#c3c6d7] bg-white px-6 py-4 sm:flex-row sm:justify-end">
          <button
            className="h-11 rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Batal
          </button>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#004ac6] px-6 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition hover:brightness-[0.98]"
            onClick={handleSubmit}
            type="button"
          >
            <UserPen className="h-4 w-4" aria-hidden="true" />
            Simpan Perubahan
          </button>
        </div>
      </div>
    </div>
  )
}
