import { useState } from 'react'
import { Check, Eye, EyeOff, KeyRound, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { resolveUserDetail, type SuperAdminUser } from '../data/users'

interface ResetPasswordModalProps {
  user: SuperAdminUser
  onClose: () => void
  onConfirm: (sendWhatsapp: boolean) => void
}

const UPPER = 'ABCDEFGHJKLMNPQRSTUVWXYZ'
const LOWER = 'abcdefghijkmnpqrstuvwxyz'
const DIGIT = '23456789'
const SYMBOL = '!@#$%&*'

function randomIndex(max: number): number {
  const buffer = new Uint32Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0] % max
}

function pickFrom(set: string): string {
  return set[randomIndex(set.length)]
}

function generatePassword(): string {
  const chars = [
    pickFrom(UPPER),
    pickFrom(UPPER),
    pickFrom(LOWER),
    pickFrom(LOWER),
    pickFrom(DIGIT),
    pickFrom(SYMBOL),
    pickFrom(SYMBOL),
  ]
  const all = UPPER + LOWER + DIGIT + SYMBOL
  for (let extra = 0; extra < 7; extra += 1) chars.push(pickFrom(all))

  for (let i = chars.length - 1; i > 0; i -= 1) {
    const j = randomIndex(i + 1)
    const temp = chars[i]
    chars[i] = chars[j]
    chars[j] = temp
  }

  return chars.join('')
}

const BAR_CLASS = {
  strong: 'bg-[#006329]',
  medium: 'bg-[#b45309]',
  weak: 'bg-[#be123c]',
} as const

const TEXT_CLASS = {
  strong: 'text-[#006329]',
  medium: 'text-[#b45309]',
  weak: 'text-[#be123c]',
} as const

export function ResetPasswordModal({ user, onClose, onConfirm }: ResetPasswordModalProps) {
  const detail = resolveUserDetail(user)
  const [initialPassword] = useState(generatePassword)
  const [password, setPassword] = useState(initialPassword)
  const [confirm, setConfirm] = useState(initialPassword)
  const [showPassword, setShowPassword] = useState(true)
  const [showConfirm, setShowConfirm] = useState(true)
  const [sendWhatsapp, setSendWhatsapp] = useState(true)

  const checks = {
    length: password.length >= 8,
    case: /[a-z]/.test(password) && /[A-Z]/.test(password),
    complex: /\d/.test(password) && /[^A-Za-z0-9]/.test(password),
  }
  const score = Number(checks.length) + Number(checks.case) + Number(checks.complex)
  const strength =
    score >= 3
      ? { label: 'Sangat Kuat', bars: 4, tone: 'strong' as const }
      : score === 2
        ? { label: 'Sedang', bars: 2, tone: 'medium' as const }
        : { label: 'Lemah', bars: 1, tone: 'weak' as const }

  const passwordsMatch = confirm.length > 0 && password === confirm
  const canSubmit = checks.length && checks.case && checks.complex && passwordsMatch

  const criteria = [
    { label: 'Min. 8 Karakter', met: checks.length },
    { label: 'Huruf Besar & Kecil', met: checks.case },
    { label: 'Angka & Simbol', met: checks.complex },
  ]

  return (
    <div
      aria-describedby="reset-password-description"
      aria-labelledby="reset-password-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup dialog reset password"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[500px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 p-6 pb-4">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#fde68a] bg-[#fffbeb] shadow-[0px_1px_2px_#0000000d]">
              <KeyRound className="h-5 w-5 text-[#d97706]" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h1 className="text-xl font-semibold leading-[25px] tracking-[-0.1px] text-[#121c2a]">
                Reset Password
              </h1>
              <p
                className="text-xs leading-[18px] text-[#434655]"
                id="reset-password-description"
              >
                Penetapan kredensial baru akun pengguna sekolah
              </p>
            </div>
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

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-6 py-2">
          <section className="flex flex-col gap-1.5">
            <h2 className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#434655]">
              PENGGUNA TERPILIH
            </h2>
            <div className="flex items-center gap-3.5 rounded-xl border border-[#c3c6d799] bg-[#f8f9ff] p-3.5 shadow-[0px_1px_2px_#0000000d]">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#004ac6] text-base font-semibold leading-6 text-white">
                {user.initials}
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold leading-6 text-[#121c2a]">
                    {user.name}
                  </h3>
                  <span className="inline-flex rounded-full bg-[#dbeafe] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#1e40af]">
                    {detail.roleLabel}
                  </span>
                </div>
                <p className="flex flex-wrap items-center gap-1 text-xs leading-[18px] text-[#434655]">
                  <span>{user.email} •</span>
                  <span className="font-mono text-[11px] text-[#737686]">{user.identity}</span>
                </p>
              </div>
            </div>
          </section>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-3">
                <label
                  className="text-sm font-medium leading-5 text-[#121c2a]"
                  htmlFor="reset-new-password"
                >
                  Password Baru
                </label>
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                  Minimal 8 karakter
                </span>
              </div>
              <div className="relative">
                <input
                  aria-describedby="password-requirements"
                  autoComplete="new-password"
                  className="h-12 w-full rounded-xl border border-[#c3c6d7] bg-white pr-12 pl-4 font-mono text-sm tracking-[1.4px] text-[#121c2a] outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_3px_#2563eb33]"
                  id="reset-new-password"
                  minLength={8}
                  onChange={(event) => setPassword(event.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                />
                <button
                  aria-controls="reset-new-password"
                  aria-label={showPassword ? 'Sembunyikan password baru' : 'Tampilkan password baru'}
                  className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
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
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                className="text-sm font-medium leading-5 text-[#121c2a]"
                htmlFor="reset-confirm-password"
              >
                Konfirmasi Password
              </label>
              <div className="relative">
                <input
                  aria-describedby="password-requirements"
                  autoComplete="new-password"
                  className={cn(
                    'h-12 w-full rounded-xl border border-[#c3c6d7] bg-white pr-12 pl-4 font-mono text-sm tracking-[1.4px] text-[#121c2a] outline-none focus:border-[#2563eb] focus:shadow-[0_0_0_3px_#2563eb33]',
                    confirm.length > 0 && !passwordsMatch && 'border-[#dc2626]',
                  )}
                  id="reset-confirm-password"
                  minLength={8}
                  onChange={(event) => setConfirm(event.target.value)}
                  type={showConfirm ? 'text' : 'password'}
                  value={confirm}
                />
                <button
                  aria-controls="reset-confirm-password"
                  aria-label={
                    showConfirm ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'
                  }
                  className="absolute top-1/2 right-3 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
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
              {confirm.length > 0 && !passwordsMatch ? (
                <span className="text-xs leading-[18px] text-[#dc2626]">
                  Konfirmasi password belum sama.
                </span>
              ) : null}
            </div>

            <section
              aria-labelledby="password-strength-title"
              className="flex flex-col gap-2 rounded-xl border border-[#c3c6d766] bg-[#f8f9ff] px-2.5 py-3.5"
              id="password-requirements"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]"
                  id="password-strength-title"
                >
                  Kekuatan Sandi:
                </h2>
                <div className="flex items-center gap-1">
                  {strength.tone === 'strong' ? (
                    <Check
                      aria-hidden="true"
                      className={cn('h-3.5 w-3.5', TEXT_CLASS[strength.tone])}
                    />
                  ) : null}
                  <strong
                    className={cn(
                      'text-[11px] font-bold leading-[14px] tracking-[0.44px]',
                      TEXT_CLASS[strength.tone],
                    )}
                  >
                    {strength.label}
                  </strong>
                </div>
              </div>

              <div
                aria-label={`Kekuatan sandi: ${strength.label}`}
                className="flex h-1.5 w-full items-center gap-1.5"
              >
                {[0, 1, 2, 3].map((index) => (
                  <span
                    className={cn(
                      'h-1.5 flex-1 rounded-full',
                      index < strength.bars ? BAR_CLASS[strength.tone] : 'bg-[#e6eeff]',
                    )}
                    key={index}
                  />
                ))}
              </div>

              <ul
                aria-label="Kriteria password"
                className="flex flex-wrap items-center justify-between gap-2 pt-1"
              >
                {criteria.map((item) => (
                  <li className="flex items-center gap-1" key={item.label}>
                    <Check
                      aria-hidden="true"
                      className={cn('h-3.5 w-3.5', item.met ? 'text-[#006329]' : 'text-[#c3c6d7]')}
                    />
                    <span
                      className={cn(
                        'text-[11px] font-medium leading-[16.5px]',
                        item.met ? 'text-[#006329]' : 'text-[#737686]',
                      )}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <div className="flex items-center gap-2">
              <button
                aria-checked={sendWhatsapp}
                aria-label="Kirim password baru via WhatsApp resmi"
                className={cn(
                  'flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border transition-colors',
                  sendWhatsapp
                    ? 'border-transparent bg-[#2563eb]'
                    : 'border-[#c3c6d7] bg-white',
                )}
                onClick={() => setSendWhatsapp((prev) => !prev)}
                role="switch"
                type="button"
              >
                {sendWhatsapp ? (
                  <Check className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                ) : null}
              </button>
              <div className="flex flex-wrap items-center gap-1.5">
                <p className="text-xs leading-[18px] text-[#121c2a]">
                  Kirim password baru via WhatsApp resmi
                </p>
                <span className="font-mono text-xs font-bold leading-[18px] text-[#004ac6]">
                  ({detail.phone})
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#c3c6d799] bg-white px-6 pt-4 pb-6">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Batal
          </button>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition hover:brightness-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!canSubmit}
            onClick={() => onConfirm(sendWhatsapp)}
            type="button"
          >
            <KeyRound className="h-4 w-4" aria-hidden="true" />
            Reset Password
          </button>
        </div>
      </div>
    </div>
  )
}
