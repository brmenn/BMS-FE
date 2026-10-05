import { useState, type FormEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/lib/api/errors'
import { confirmPasswordReset } from '@/lib/api/passwordReset'
import { ResetProgressPanel, type ResetStepDefinition } from '../components/ResetProgressPanel'

const steps: ResetStepDefinition[] = [
  { title: '1. Masukkan Email', description: 'Masukkan email yang terdaftar' },
  { title: '2. Verifikasi OTP', description: 'Kode autentikasi 6-digit berhasil divalidasi' },
  { title: '3. Password Baru', description: 'Buat password baru dengan kombinasi aman' },
]

export function NewPasswordPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { resetToken } = (location.state as { email?: string; resetToken?: string } | null) ?? {}

  const [password, setPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const passwordIsLongEnough = password.length >= 8
  const passwordHasLettersAndNumbers = /[A-Za-z]/.test(password) && /\d/.test(password)
  const passwordsMatch = password.length > 0 && confirmation.length > 0 && password === confirmation

  const confirm = useMutation({
    mutationFn: () => confirmPasswordReset(resetToken ?? '', password, confirmation),
    onSuccess: () => navigate('/login', { replace: true }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!passwordIsLongEnough || !passwordHasLettersAndNumbers) {
      return
    }

    if (!passwordsMatch) {
      return
    }

    if (!resetToken) {
      navigate('/forgot-password', { replace: true })
      return
    }

    confirm.mutate()
  }

  const statusMessage = confirm.isError
    ? confirm.error instanceof ApiError
      ? confirm.error.isValidation
        ? Object.values(confirm.error.fields)[0] ?? 'Password tidak memenuhi syarat.'
        : confirm.error.message
      : 'Terjadi kesalahan.'
    : null

  const requirements = [
    { label: 'Minimal 8 karakter', valid: passwordIsLongEnough },
    { label: 'Mengandung huruf dan angka', valid: passwordHasLettersAndNumbers },
    { label: 'Password harus sama dengan konfirmasi', valid: passwordsMatch },
  ]

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8f9ff] p-4">
      <section className="flex w-full max-w-6xl flex-col items-stretch overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] lg:flex-row">
        <ResetProgressPanel
          currentStep={3}
          description="Perbarui kredensial akun bendahara atau staf institusi BMS SMKS Muhammadiyah 1 Genteng untuk memastikan proteksi data transaksi, SPP siswa, dan buku kas utama sekolah."
          heading="Masukkan password baru yang aman"
          steps={steps}
        />

        <section className="flex w-full flex-1 items-center justify-center bg-white p-6 sm:p-12">
          <div className="flex w-full max-w-md flex-col items-start gap-6">
            <header className="flex w-full flex-col items-start gap-2">
              <h2 className="text-2xl font-bold tracking-[-0.75px] text-[#121c2a] sm:text-3xl">
                Buat Password Baru
              </h2>
              <p className="text-sm font-normal leading-5 text-[#434655]">
                Masukkan password baru untuk akun Anda.
              </p>
            </header>

            <form className="flex w-full flex-col items-start gap-5" noValidate onSubmit={handleSubmit}>
              <div className="flex w-full flex-col items-start gap-1.5">
                <label className="text-sm font-medium leading-5 text-[#121c2a]" htmlFor="new-password">
                  Password Baru
                </label>
                <div className="relative w-full">
                  <input
                    aria-describedby="password-requirements"
                    autoComplete="new-password"
                    className="flex h-12 w-full items-center rounded-xl border border-solid border-slate-200 bg-white px-4 pr-12 text-sm font-normal text-[#121c2a] outline-none transition-all placeholder:text-[#737686] focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    id="new-password"
                    name="password"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Masukkan password baru"
                    required
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                    className="absolute right-3 top-0 flex h-full items-center text-[#737686] hover:text-[#121c2a]"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col items-start gap-1.5">
                <label className="text-sm font-medium leading-5 text-[#121c2a]" htmlFor="confirm-password">
                  Konfirmasi Password
                </label>
                <div className="relative w-full">
                  <input
                    autoComplete="new-password"
                    className="flex h-12 w-full items-center rounded-xl border border-solid border-slate-200 bg-white px-4 pr-12 text-sm font-normal text-[#121c2a] outline-none transition-all placeholder:text-[#737686] focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
                    id="confirm-password"
                    name="confirmation"
                    onChange={(event) => setConfirmation(event.target.value)}
                    placeholder="Masukkan kembali password"
                    required
                    type={showConfirmation ? 'text' : 'password'}
                    value={confirmation}
                  />
                  <button
                    aria-label={showConfirmation ? 'Sembunyikan konfirmasi password' : 'Tampilkan konfirmasi password'}
                    className="absolute right-3 top-0 flex h-full items-center text-[#737686] hover:text-[#121c2a]"
                    onClick={() => setShowConfirmation((visible) => !visible)}
                    type="button"
                  >
                    {showConfirmation ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div
                className="flex w-full flex-col items-start gap-2 rounded-xl border border-solid border-slate-200 bg-[#eff4ff] p-3.5"
                id="password-requirements"
              >
                <h3 className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                  Syarat Kekuatan Sandi:
                </h3>
                {requirements.map((requirement) => (
                  <div key={requirement.label} className="flex w-full items-center gap-2">
                    {requirement.valid ? (
                      <Check className="h-4 w-4 text-blue-600" aria-hidden="true" />
                    ) : (
                      <span aria-hidden="true" className="h-4 w-4 rounded-full border border-[#bababa]" />
                    )}
                    <span className={`text-xs font-normal leading-[18px] ${requirement.valid ? 'text-blue-600' : 'text-[#737686]'}`}>
                      {requirement.label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex w-full flex-col items-start gap-3 pt-2">
                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 shadow-md transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={confirm.isPending}
                  type="submit"
                >
                  <span className="text-sm font-semibold text-white">Simpan Password</span>
                  <ArrowRight className="h-4 w-4 text-white" />
                </button>

                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-transparent transition-colors hover:bg-slate-50"
                  onClick={() => navigate('/login')}
                  type="button"
                >
                  <ArrowLeft className="h-3 w-3 text-[#434655]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#434655]">Kembali ke Login</span>
                </button>
              </div>

              <div className="w-full border-t border-slate-200 pt-3">
                <span aria-live="polite" className="text-xs text-[#434655]">
                  {statusMessage ? `Preview Status: ${statusMessage}` : 'Preview Status:'}
                </span>
              </div>
            </form>
          </div>
        </section>
      </section>
    </main>
  )
}
