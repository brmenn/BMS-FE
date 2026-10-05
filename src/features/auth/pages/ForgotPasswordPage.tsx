import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/lib/api/errors'
import { requestPasswordReset } from '@/lib/api/passwordReset'
import { ResetProgressPanel, type ResetStepDefinition } from '../components/ResetProgressPanel'

const steps: ResetStepDefinition[] = [
  { title: '1. Masukkan Email', description: 'Masukkan email yang terdaftar' },
  { title: '2. Verifikasi OTP', description: 'Masukkan kode OTP yang dikirim ke WhatsApp' },
  { title: '3. Buat Password Baru', description: 'Buat password baru untuk akun Anda' },
]

export function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const request = useMutation({
    mutationFn: (value: string) => requestPasswordReset(value),
    onSuccess: (_result, variable) => {
      navigate('/forgot-password/otp', { state: { email: variable }, replace: true })
    },
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    request.mutate(email)
  }

  const statusMessage = request.isError
    ? request.error instanceof ApiError
      ? request.error.isValidation
        ? 'Email tidak valid.'
        : request.error.message
      : 'Terjadi kesalahan.'
    : null

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8f9ff] p-4">
      <div className="flex w-full max-w-6xl flex-col items-stretch overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] lg:flex-row">
        <ResetProgressPanel
          currentStep={1}
          description="Masukkan email terdaftar untuk memulai reset password. Setelah email ditemukan, kami akan mengirim OTP untuk verifikasi sebelum Anda membuat password baru."
          heading="Masukkan email anda"
          steps={steps}
        />

        <section className="flex w-full flex-1 items-center justify-center bg-white p-6 sm:p-12">
          <div className="flex w-full max-w-md flex-col items-start gap-6">
            <div className="flex w-full flex-col items-start gap-2">
              <h2 className="text-2xl font-bold tracking-[-0.75px] text-[#121c2a] sm:text-3xl">
                Masukkan Email
              </h2>
              <p className="text-sm font-normal leading-5 text-[#434655]">
                Silakan masukkan email yang terhubung dengan akun BMS Anda.
              </p>
            </div>

            <form className="flex w-full flex-col items-start gap-8 sm:gap-24" noValidate onSubmit={handleSubmit}>
              <div className="flex w-full flex-col items-start gap-1.5">
                <label className="text-sm font-medium leading-5 text-[#121c2a]" htmlFor="email">
                  Masukkan email
                </label>
                <input
                  aria-label="Email"
                  autoComplete="email"
                  className="flex h-12 w-full items-center justify-center rounded-xl border border-solid border-slate-200 bg-white px-4 text-sm font-normal text-[#121c2a] outline-none transition-all placeholder:text-[#737686] focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  id="email"
                  inputMode="email"
                  name="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email yang terdaftar."
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div className="flex w-full flex-col items-start gap-3 pt-2">
                <button
                  aria-label="Kirim OTP"
                  className="relative flex h-12 w-full items-center justify-center gap-2 rounded-xl border-0 bg-blue-600 shadow-md transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={request.isPending}
                  type="submit"
                >
                  <span className="relative flex items-center justify-center text-sm font-semibold text-white">
                    {request.isPending ? 'Mengirim...' : 'Kirim OTP'}
                  </span>
                  {!request.isPending && <ArrowRight className="h-4 w-4 text-white" />}
                </button>

                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-solid border-transparent transition-colors hover:bg-slate-50"
                  onClick={() => navigate('/login')}
                  type="button"
                >
                  <ArrowLeft className="h-3 w-3 text-[#434655]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#434655]">Kembali ke Login</span>
                </button>
              </div>

              <div
                aria-live="polite"
                className="w-full border-t border-slate-200 pt-3"
                role="status"
              >
                <span className="text-xs font-normal text-[#434655]">
                  {statusMessage ?? 'Preview Status:'}
                </span>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
