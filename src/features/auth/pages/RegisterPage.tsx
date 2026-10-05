import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { ArrowRight, BadgeCheck, CreditCard, IdCard, Mail, Phone, User } from 'lucide-react'
import { authApi, type RegisterPayload } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/errors'
import { BrandPanel } from '../components/BrandPanel'
import {
  Field,
  FieldError,
  FieldLabel,
  HintText,
  Input,
  MutedText,
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
  const [accountNumber, setAccountNumber] = useState('')
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
    <main className="flex min-h-screen w-full bg-[#f8f9ff]">
      <BrandPanel />

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex w-full justify-center px-5 py-8 sm:px-10 lg:px-12">
          <div className="flex w-full max-w-[672px] flex-col gap-8">
            <header className="flex flex-col gap-1">
              <h1 className="text-2xl font-bold leading-8 tracking-[-0.6px] text-[#121c2a]">Daftar Akun Baru</h1>
              <p className="text-sm leading-5 text-[#434655]">
                Pilih jenis pengguna untuk menyesuaikan data identitas akun Anda.
              </p>
            </header>

            <form className="flex w-full flex-col gap-6" noValidate onSubmit={handleSubmit}>
              <fieldset className="flex w-full flex-col gap-2.5">
                <legend className="mb-1 text-sm font-semibold leading-5">
                  <span className="text-[#121c2a]">Jenis Pengguna</span>
                  <span className="text-[#ba1a1a]"> *</span>
                </legend>

                <div className="flex w-full flex-col gap-3 sm:flex-row">
                  <UserTypeOption
                    active={isStudent}
                    description="NISN & Kelas"
                    label="Siswa"
                    onClick={() => setUserType('SISWA')}
                  />
                  <UserTypeOption
                    active={!isStudent}
                    description="NBM / NUPTK / ID Staf / TU"
                    label="Guru & Karyawan"
                    onClick={() => setUserType('GURU_KARYAWAN')}
                  />
                </div>
              </fieldset>

              <section className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-[#eff4ff]/80 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    {isStudent ? (
                      <BadgeCheck className="h-4 w-[17px] text-[#004ac6]" aria-hidden="true" />
                    ) : (
                      <IdCard className="h-4 w-4 text-[#004ac6]" aria-hidden="true" />
                    )}
                    <span className="text-base font-semibold leading-6 text-[#121c2a]">
                      {isStudent ? 'Data Identitas Siswa' : 'Data Identitas Guru / Pendidik'}
                    </span>
                  </div>
                  <span className="rounded-full bg-[#004ac6]/10 px-2 py-0.5 text-[11px] font-medium tracking-[0.44px] text-[#004ac6]">
                    {isStudent ? 'Verifikasi Dapodik (10 Digit NISN)' : 'Verifikasi GTK / NUPTK'}
                  </span>
                </div>

                {isStudent ? (
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <Field
                      error={errors.student_number}
                      hint="10 digit Nomor Induk Siswa Nasional"
                      label="NISN"
                      required
                    >
                      <Input
                        aria-label="NISN"
                        icon={<BadgeCheck className="h-4 w-4" />}
                        inputMode="numeric"
                        maxLength={10}
                        onChange={(event) => setNisn(event.target.value.replace(/\D/g, ''))}
                        placeholder="Masukkan 10 digit NISN aktif siswa"
                        required
                        value={nisn}
                      />
                    </Field>

                    <Field error={errors.class} hint="Tingkat kelas dan jurusan berjalan" label="Kelas" required>
                      <Select
                        aria-label="Kelas"
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
                    <FieldLabel label="NBM / NUPTK" required />
                    <Input
                      aria-label="NBM / NUPTK"
                      icon={<IdCard className="h-4 w-4" />}
                      inputMode="numeric"
                      onChange={(event) => setEmployeeNumber(event.target.value)}
                      placeholder="Masukkan 18 digit NBM atau 16 digit NUPTK"
                      required
                      value={employeeNumber}
                    />
                    <HintText>Nomor Baku Muhammadiyah atau NUPTK aktif</HintText>
                    <FieldError>{errors.employee_number}</FieldError>
                  </div>
                )}
              </section>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5 sm:col-span-2">
                  <FieldLabel label="Nama Lengkap" required />
                  <Input
                    icon={<User className="h-4 w-4" />}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Masukkan nama lengkap sesuai identitas resmi"
                    required
                    value={fullName}
                  />
                  <FieldError>{errors.full_name}</FieldError>
                </div>

                <Field error={errors.email} label="Email" required>
                  <Input
                    icon={<Mail className="h-4 w-4" />}
                    inputMode="email"
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder={isStudent ? 'Masukkan email aktif siswa' : 'Masukkan email aktif sekolah / pribadi'}
                    required
                    type="email"
                    value={email}
                  />
                </Field>

                <Field error={errors.phone} label="No. Telepon / WhatsApp" required>
                  <Input
                    icon={<Phone className="h-4 w-4" />}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="Contoh: 081234567890"
                    required
                    type="tel"
                    value={phone}
                  />
                </Field>

                <div className="flex flex-col gap-1 sm:col-span-2">
                  <FieldLabel label="No. Rekening" required={false} />
                  <MutedText>(Opsional)</MutedText>
                  <Input
                    icon={<CreditCard className="h-4 w-4" />}
                    inputMode="numeric"
                    onChange={(event) => setAccountNumber(event.target.value)}
                    placeholder="Masukkan nomor rekening buku tabungan lama jika ada"
                    value={accountNumber}
                  />
                  <HintText>
                    Kosongkan jika ingin sistem membuatkan nomor rekening baru secara otomatis.
                  </HintText>
                </div>

                <Field error={errors.password} label="Password" required>
                  <PasswordInput
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Minimal 8 karakter"
                    show={showPassword}
                    toggle={() => setShowPassword((visible) => !visible)}
                    value={password}
                  />
                </Field>

                <Field error={errors.password_confirmation} label="Konfirmasi Password" required>
                  <PasswordInput
                    onChange={(event) => setPasswordConfirmation(event.target.value)}
                    placeholder="Ulangi password"
                    show={showConfirmation}
                    toggle={() => setShowConfirmation((visible) => !visible)}
                    value={passwordConfirmation}
                  />
                </Field>
              </div>

              <div className="flex items-start gap-3 pt-2">
                <input
                  checked={agreed}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded-md border border-slate-200 accent-blue-600"
                  onChange={(event) => setAgreed(event.target.checked)}
                  type="checkbox"
                />
                <p className="text-xs leading-[18px] text-[#434655]">
                  Saya menyetujui{' '}
                  <span className="font-medium text-[#004ac6]">syarat &amp; ketentuan layanan</span> BMS SMKS
                  Muhammadiyah 1 Genteng serta kebijakan perlindungan data nasabah keuangan sekolah.
                </p>
              </div>

              {errors.terms ? <FieldError>{errors.terms}</FieldError> : null}

              {register.isError && !(register.error instanceof ApiError && register.error.isValidation) ? (
                <p className="text-xs text-red-600" role="alert">
                  {register.error instanceof ApiError ? register.error.message : 'Terjadi kesalahan.'}
                </p>
              ) : null}

              <button
                className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={register.isPending}
                type="submit"
              >
                {!register.isPending ? (
                  <ArrowRight className="h-[12.3px] w-[15px] text-white" aria-hidden="true" />
                ) : null}
                <span className="text-sm font-medium text-white">
                  {register.isPending ? 'Mendaftarkan...' : 'Daftar Akun Sekarang'}
                </span>
              </button>

              <p className="pt-2 text-center text-sm">
                <span className="text-[#434655]">Sudah memiliki akun terdaftar? </span>
                <Link className="font-semibold text-[#004ac6] hover:underline" to="/login">
                  Masuk di sini
                </Link>
              </p>
            </form>
          </div>
        </div>

        <footer className="mt-auto w-full border-t border-slate-200 px-5 py-6 sm:px-10 lg:px-12">
          <div className="mx-auto flex w-full max-w-[672px] flex-col gap-2.5">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-xs font-semibold tracking-[0.24px] text-[#434655]">Kebijakan Privasi</span>
              <span className="text-xs font-semibold text-[#434655]">•</span>
              <span className="text-xs font-semibold tracking-[0.24px] text-[#434655]">Ketentuan Layanan</span>
              <span className="text-xs font-semibold text-[#434655]">•</span>
              <span className="text-xs font-semibold tracking-[0.24px] text-[#434655]">Pusat Bantuan</span>
            </div>
            <p className="text-xs leading-[18px] text-[#737686]">
              © 2026 BMS SMKS Muhammadiyah 1 Genteng. Hak cipta dilindungi.
            </p>
          </div>
        </footer>
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
      className={`flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl border-2 px-4 py-3.5 transition-colors ${
        active
          ? 'border-[#004ac6] bg-[#dbe1ff]/20 shadow-[0px_0px_0px_2px_#004ac633]'
          : 'border-slate-200 bg-white hover:border-slate-300'
      }`}
      onClick={onClick}
      type="button"
    >
      <span className={`text-base font-semibold leading-6 ${active ? 'text-[#004ac6]' : 'text-[#121c2a]'}`}>
        {label}
      </span>
      <span
        className={`text-[11px] font-semibold leading-[14px] tracking-[0.44px] ${
          active ? 'text-[#004ac6]/80' : 'text-[#121c2a]'
        }`}
      >
        {description}
      </span>
    </button>
  )
}
