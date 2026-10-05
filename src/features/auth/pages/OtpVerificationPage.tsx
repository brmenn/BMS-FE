import { useEffect, useRef, useState, type ClipboardEvent, type FormEvent, type KeyboardEvent } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { ApiError } from '@/lib/api/errors'
import { requestPasswordReset, verifyPasswordResetOtp } from '@/lib/api/passwordReset'
import { ResetProgressPanel, type ResetStepDefinition } from '../components/ResetProgressPanel'

const OTP_LENGTH = 6
const OTP_TTL_SECONDS = 300

const steps: ResetStepDefinition[] = [
  { title: '1. Masukkan Email', description: 'Permintaan dikirim via email yang telah dimasukkan' },
  { title: '2. Verifikasi OTP', description: 'Kode autentikasi 6-digit berhasil divalidasi' },
  { title: '3. Password Baru', description: 'Buat password baru dengan kombinasi aman' },
]

export function OtpVerificationPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = (location.state as { email?: string } | null)?.email ?? ''

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [timeRemaining, setTimeRemaining] = useState(OTP_TTL_SECONDS)
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  useEffect(() => {
    if (timeRemaining <= 0) return

    const timer = window.setInterval(() => {
      setTimeRemaining((current) => Math.max(current - 1, 0))
    }, 1000)

    return () => window.clearInterval(timer)
  }, [timeRemaining])

  useEffect(() => {
    if (!email) navigate('/forgot-password', { replace: true })
  }, [email, navigate])

  const verify = useMutation({
    mutationFn: (code: string) => verifyPasswordResetOtp(email, code),
    onSuccess: (result) => {
      navigate('/forgot-password/new-password', {
        state: { email, resetToken: result.reset_token },
        replace: true,
      })
    },
  })

  const resend = useMutation({
    mutationFn: () => requestPasswordReset(email),
    onSuccess: () => {
      setOtp(Array(OTP_LENGTH).fill(''))
      setTimeRemaining(OTP_TTL_SECONDS)
      inputRefs.current[0]?.focus()
    },
  })

  const formattedTime = `${String(Math.floor(timeRemaining / 60)).padStart(2, '0')}:${String(timeRemaining % 60).padStart(2, '0')}`

  const updateOtpValue = (index: number, value: string) => {
    const nextValue = value.replace(/\D/g, '').slice(-1)
    const nextOtp = [...otp]
    nextOtp[index] = nextValue
    setOtp(nextOtp)

    if (nextValue && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      event.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault()

    const pastedValue = event.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (!pastedValue) return

    const nextOtp = Array<string>(OTP_LENGTH).fill('')
    pastedValue.split('').forEach((character, index) => {
      nextOtp[index] = character
    })

    setOtp(nextOtp)
    inputRefs.current[Math.min(pastedValue.length, OTP_LENGTH) - 1]?.focus()
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      inputRefs.current[otp.findIndex((value) => !value)]?.focus()
      return
    }

    verify.mutate(code)
  }

  const statusMessage = verify.isError
    ? verify.error instanceof ApiError
      ? verify.error.code === 'INVALID_OTP'
        ? 'Kode OTP salah atau telah kedaluwarsa.'
        : verify.error.isValidation
          ? 'Kode OTP tidak valid.'
          : verify.error.message
      : 'Terjadi kesalahan.'
    : null

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-[#f8f9ff] p-4">
      <div className="flex w-full max-w-6xl flex-col items-stretch overflow-hidden rounded-2xl border border-solid border-slate-200 bg-white shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] lg:flex-row">
        <ResetProgressPanel
          currentStep={2}
          description="Perbarui kredensial akun bendahara atau staf institusi BMS SMKS Muhammadiyah 1 Genteng untuk memastikan proteksi data transaksi, SPP siswa, dan buku kas utama sekolah."
          heading={
            <>
              Amankan Akun Anda dengan
              <br />
              Kata Sandi Kuat
            </>
          }
          steps={steps}
        />

        <section className="flex w-full flex-1 items-center justify-center bg-white p-6 sm:p-12">
          <form
            className="flex w-full max-w-md flex-col items-start gap-6"
            noValidate
            onSubmit={handleSubmit}
          >
            <div className="flex w-full flex-col items-start gap-2">
              <h1 className="text-2xl font-bold tracking-[-0.75px] text-[#121c2a] sm:text-3xl">
                Masukkan kode OTP
              </h1>
              <p className="text-sm font-normal leading-5 text-[#434655]">
                Masukkan kode OTP yang telah dikirim melalui WhatsApp Anda
              </p>
            </div>

            <div className="flex w-full flex-col items-start gap-8">
              <div className="flex w-full flex-col items-start gap-3">
                <label
                  className="text-xs font-medium tracking-[0.24px] text-[#434655]"
                  htmlFor="otp-0"
                >
                  Kode Verifikasi Keamanan
                </label>

                <div aria-label="Kode Verifikasi Keamanan" className="flex w-full items-start justify-between gap-2" role="group">
                  {otp.map((value, index) => (
                    <input
                      key={`otp-${index}`}
                      aria-label={`Digit ${index + 1} dari ${OTP_LENGTH}`}
                      autoComplete={index === 0 ? 'one-time-code' : 'off'}
                      className={`flex h-12 w-full flex-1 items-center justify-center rounded-xl border-2 border-solid bg-[#eff4ff] text-center font-mono text-xl font-bold shadow-sm transition-all focus:outline-none sm:h-[52px] sm:text-2xl ${
                        value || index === 0
                          ? 'border-blue-600 ring-4 ring-blue-100'
                          : 'border-[#bababa]'
                      }`}
                      id={`otp-${index}`}
                      inputMode="numeric"
                      maxLength={1}
                      name={`otp-${index}`}
                      onChange={(event) => updateOtpValue(index, event.target.value)}
                      onKeyDown={(event) => handleKeyDown(event, index)}
                      onPaste={handlePaste}
                      ref={(element) => {
                        inputRefs.current[index] = element
                      }}
                      type="text"
                      value={value}
                    />
                  ))}
                </div>

                <div className="w-full border-y border-[#c3c6d74c] py-2">
                  <div className="flex items-center justify-center gap-1.5">
                    <Clock className="h-4 w-4 text-[#434655]" aria-hidden="true" />
                    <p className="text-xs">
                      <span className="font-medium text-[#434655]">Kode berlaku selama </span>
                      <span className="font-bold text-[#121c2a]">{formattedTime}</span>
                    </p>
                  </div>
                </div>

                <div className="flex w-full items-center justify-center gap-1">
                  <span className="text-xs text-[#434655]">Belum menerima kode?</span>
                  <button
                    className="text-xs font-semibold text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={timeRemaining > 0 || resend.isPending}
                    onClick={() => resend.mutate()}
                    type="button"
                  >
                    Kirim ulang
                  </button>
                </div>

                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-blue-600 shadow-md transition-all hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
                  disabled={verify.isPending}
                  type="submit"
                >
                  <span className="text-sm font-semibold text-white">
                    {verify.isPending ? 'Memverifikasi...' : 'Verifikasi OTP'}
                  </span>
                  {!verify.isPending && <ArrowRight className="h-4 w-4 text-white" />}
                </button>
              </div>

              <div className="flex w-full flex-col items-start gap-3 pt-2">
                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-solid border-transparent transition-colors hover:bg-slate-50"
                  onClick={() => navigate('/login')}
                  type="button"
                >
                  <ArrowLeft className="h-3 w-3 text-[#434655]" aria-hidden="true" />
                  <span className="text-sm font-medium text-[#434655]">Kembali ke Login</span>
                </button>
              </div>

              <div className="w-full border-t border-slate-200 pt-3">
                <div aria-live="polite" className="text-xs text-[#434655]" role="status">
                  {statusMessage ? `Preview Status: ${statusMessage}` : 'Preview Status:'}
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
