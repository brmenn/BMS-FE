import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import {
  ArrowRight,
  BadgeCheck,
  GraduationCap,
  IdCard,
  Mail,
  Phone,
  User,
} from 'lucide-react'
import { authApi, type RegisterPayload } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/errors'
import { cn } from '@/lib/utils'
import { BrandPanel } from '../components/BrandPanel'
import {
  Field,
  FieldError,
  FieldLabel,
  HintText,
  Input,
  PasswordInput,
  Select,
} from '../components/form-controls'

type UserType = 'SISWA' | 'GURU_KARYAWAN'

const CLASS_OPTIONS = ['X-A', 'X-B', 'XI-A', 'XI-B', 'XII-A', 'XII-B']
const ACADEMIC_YEAR = '2026/2027'

type FieldErrors = Record<string, string>

export function RegisterPage() {
  const navigate = useNavigate()

  const [userType, setUserType] = useState<UserType>('SISWA')
  const [nisn, setNisn] = useState('')
  const [className, setClassName] = useState('')
  const [employeeNumber, setEmployeeNumber] = useState('')
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [localErrors, setLocalErrors] = useState<FieldErrors>({})

  const isStudent = userType === 'SISWA'

  const register = useMutation({
    mutationFn: (payload: RegisterPayload) => authApi.register(payload),
    onSuccess: () => navigate('/login', { state: { registered: true } }),
  })

  const serverErrors: FieldErrors =
    register.error instanceof ApiError && register.error.fields
      ? (register.error.fields as FieldErrors)
      : {}

  const errors: FieldErrors = { ...serverErrors, ...localErrors }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    register.reset()

    const nextErrors: FieldErrors = {}

    if (!agreed) {
      nextErrors.terms = 'Anda harus menyetujui syarat & ketentuan layanan.'
    }

    if (password !== passwordConfirmation) {
      nextErrors.password_confirmation = 'Konfirmasi password tidak sama.'
    }

    setLocalErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload: RegisterPayload = {
      // The API requires a username but the design has no field for it, so it is
      // derived from the identity number the user already typed above.
      username: isStudent ? nisn : employeeNumber,
      email,
      password,
      password_confirmation: passwordConfirmation,
      full_name: fullName,
      phone: phone || undefined,
      role: isStudent ? 'SISWA' : 'GURU',
      ...(isStudent
        ? { student_number: nisn, class: className, academic_year: ACADEMIC_YEAR }
        : { employee_number: employeeNumber }),
    }

    register.mutate(payload)
  }

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f0f3f8] p-4 font-jakarta sm:p-8">
      <div className="flex w-full max-w-[1020px] flex-col overflow-hidden rounded-3xl border border-[#f1f5f9] bg-white shadow-[0px_20px_50px_#0000000f] lg:min-h-[696px] lg:flex-row">
        <BrandPanel />

        <section className="flex min-w-0 flex-1 flex-col gap-5 bg-white p-5 sm:p-10">
          <header className="flex flex-col gap-1">
            <h1 className="text-[22px] font-bold leading-[33px] tracking-[-0.55px] text-[#1e293b]">
              Daftar Akun Baru
            </h1>
            <p className="text-[13px] leading-4 text-[#64748b]">
              Pilih jenis pengguna untuk menyesuaikan data identitas akun Anda.
            </p>
          </header>

          <form className="flex w-full flex-col gap-[15px]" noValidate onSubmit={handleSubmit}>
            <fieldset className="flex w-full flex-col gap-3">
              <legend className="mb-2 text-[12px] font-bold leading-4 text-[#334155]">
                Jenis Pengguna <span className="text-[#ef4444]">*</span>
              </legend>

              <div
                aria-label="Jenis pengguna"
                className="flex w-full flex-col gap-3 sm:flex-row"
                role="radiogroup"
              >
                <UserTypeOption
                  active={isStudent}
                  description="NISN & Kelas"
                  label="Siswa"
                  onClick={() => setUserType('SISWA')}
                />
                <UserTypeOption
                  active={!isStudent}
                  description="NBM / ID Staf / TU"
                  label="Guru & Karyawan"
                  onClick={() => setUserType('GURU_KARYAWAN')}
                />
              </div>
            </fieldset>

            <section className="flex w-full flex-col gap-[14px] rounded-2xl border border-[#dbeafe] bg-[#f5f8ff] p-[17px_16px_16px]">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {isStudent ? (
                    <BadgeCheck aria-hidden="true" className="h-4 w-4 text-[#2563eb]" />
                  ) : (
                    <IdCard aria-hidden="true" className="h-4 w-4 text-[#2563eb]" />
                  )}
                  <h2 className="text-[12px] font-bold leading-4 text-[#1e3a8a]">
                    {isStudent ? 'Data Identitas Siswa' : 'Data Identitas Guru / Karyawan'}
                  </h2>
                </div>
                <span className="rounded-full bg-[#dbeafe]/70 px-2.5 py-0.5 text-[11px] font-semibold leading-[16.5px] text-[#2563eb]">
                  {isStudent ? 'Verifikasi Dapodik (10 Digit NISN)' : 'Verifikasi NBM / ID Staf'}
                </span>
              </div>

              {isStudent ? (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  <Field
                    error={errors.student_number}
                    hint="10 digit Nomor Induk Siswa Nasional"
                    htmlFor="nisn"
                    label="NISN"
                    required
                  >
                    <Input
                      aria-label="NISN"
                      id="nisn"
                      icon={<BadgeCheck className="h-4 w-4" />}
                      inputMode="numeric"
                      maxLength={10}
                      onChange={(event) => setNisn(event.target.value.replace(/\D/g, ''))}
                      placeholder="Masukkan 10 digit NISN aktif siswa"
                      required
                      value={nisn}
                    />
                  </Field>

                  <Field
                    error={errors.class}
                    hint="Tingkat kelas dan jurusan berjalan"
                    htmlFor="kelas"
                    label="Kelas"
                    required
                  >
                    <Select
                      aria-label="Kelas"
                      icon={<GraduationCap className="h-[18px] w-[18px]" />}
                      id="kelas"
                      onChange={(event) => setClassName(event.target.value)}
                      options={CLASS_OPTIONS}
                      placeholder="Pilih Kelas"
                      required
                      value={className}
                    />
                  </Field>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-1">
                  <FieldLabel htmlFor="nbm" label="NBM / ID Staf / TU" required />
                  <Input
                    aria-label="NBM"
                    id="nbm"
                    icon={<IdCard className="h-4 w-4" />}
                    onChange={(event) => setEmployeeNumber(event.target.value)}
                    placeholder="Masukkan nomor induk Anda"
                    required
                    value={employeeNumber}
                  />
                  <HintText>Nomor Baku Muhammadiyah (NBM) aktif</HintText>
                  <FieldError>{errors.employee_number}</FieldError>
                </div>
              )}
            </section>

            <div className="flex flex-col gap-1">
              <FieldLabel htmlFor="fullName" label="Nama Lengkap" required />
              <Input
                id="fullName"
                icon={<User className="h-4 w-4" />}
                onChange={(event) => setFullName(event.target.value)}
                placeholder="Masukkan nama lengkap sesuai identitas resmi"
                required
                value={fullName}
              />
              <FieldError>{errors.full_name}</FieldError>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field error={errors.email} htmlFor="email" label="Email" required>
                <Input
                  id="email"
                  icon={<Mail className="h-4 w-4" />}
                  inputMode="email"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Masukkan email aktif siswa"
                  required
                  type="email"
                  value={email}
                />
              </Field>

              <Field error={errors.phone} htmlFor="phone" label="No. Telepon / WhatsApp" required>
                <Input
                  id="phone"
                  icon={<Phone className="h-4 w-4" />}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="Contoh: 081234567890"
                  required
                  type="tel"
                  value={phone}
                />
              </Field>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Field error={errors.password} htmlFor="password" label="Kata Sandi" required>
                <PasswordInput
                  id="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Minimal 8 karakter"
                  show={showPassword}
                  toggle={() => setShowPassword((visible) => !visible)}
                  value={password}
                />
              </Field>

              <Field
                error={errors.password_confirmation}
                htmlFor="passwordConfirmation"
                label="Konfirmasi Kata Sandi"
                required
              >
                <PasswordInput
                  id="passwordConfirmation"
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  placeholder="Ulangi password"
                  show={showConfirmation}
                  toggle={() => setShowConfirmation((visible) => !visible)}
                  value={passwordConfirmation}
                />
              </Field>
            </div>

            <div className="flex items-start gap-2">
              <input
                checked={agreed}
                className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border border-[#cbd5e1] bg-white accent-[#2563eb]"
                id="terms"
                name="terms"
                onChange={(event) => setAgreed(event.target.checked)}
                type="checkbox"
              />
              <p className="text-[11px] leading-[15.1px] text-[#64748b]">
                Saya menyetujui{' '}
                <span className="font-bold text-[#2563eb]">syarat &amp; ketentuan layanan</span>{' '}
                BMS SMKS Muhammadiyah 1 Genteng serta kebijakan perlindungan data nasabah keuangan sekolah.
              </p>
            </div>

            {errors.terms ? <FieldError>{errors.terms}</FieldError> : null}

            {register.isError && !(register.error instanceof ApiError && register.error.isValidation) ? (
              <p className="text-[11px] leading-[15px] text-red-600" role="alert">
                {register.error instanceof ApiError ? register.error.message : 'Terjadi kesalahan.'}
              </p>
            ) : null}

            <button
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-4 py-3 shadow-[0px_2px_4px_-2px_#3b82f633,0px_4px_6px_-1px_#3b82f633] transition-colors hover:bg-[#1d4ed8] disabled:cursor-not-allowed disabled:opacity-70"
              disabled={register.isPending}
              type="submit"
            >
              {!register.isPending ? (
                <ArrowRight aria-hidden="true" className="h-4 w-4 text-white" />
              ) : null}
              <span className="text-[14px] font-bold leading-5 text-white">
                {register.isPending ? 'Mendaftarkan...' : 'Daftar Akun Sekarang'}
              </span>
            </button>

            <p className="text-center text-[12px] leading-4 text-[#64748b]">
              Sudah memiliki akun terdaftar?{' '}
              <Link className="font-bold text-[#2563eb] hover:underline" to="/login">
                Masuk di sini
              </Link>
            </p>
          </form>
        </section>
      </div>
    </main>
  )
}

function UserTypeOption({
  active,
  label,
  description,
  onClick,
}: {
  active: boolean
  label: string
  description: string
  onClick: () => void
}) {
  return (
    <button
      aria-pressed={active}
      className={cn(
        'flex flex-1 flex-col items-center justify-center rounded-xl px-3 transition-colors',
        active
          ? 'border-2 border-[#2563eb] bg-[#eff6ff]/20 py-[9px]'
          : 'border border-[#e2e8f0] bg-white py-[10px] hover:border-slate-300',
      )}
      onClick={onClick}
      type="button"
    >
      <span
        className={cn(
          'text-[14px] leading-[17.5px]',
          active ? 'font-bold text-[#2563eb]' : 'font-semibold text-[#334155]',
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          'mt-0.5 text-[10px] leading-[15px]',
          active ? 'font-medium text-[#3b82f6]' : 'font-normal text-[#94a3b8]',
        )}
      >
        {description}
      </span>
    </button>
  )
}
