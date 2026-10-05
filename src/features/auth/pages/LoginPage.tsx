import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { authApi } from '@/lib/api/auth'
import { ApiError } from '@/lib/api/errors'
import { SchoolLogo } from '../components/SchoolLogo'

export function LoginPage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)

  const login = useMutation({
    mutationFn: () => authApi.login({ identifier: username, password, device_name: 'web' }),
    onSuccess: () => navigate('/', { replace: true }),
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    login.mutate()
  }

  const errorMessage =
    login.error instanceof ApiError
      ? login.error.isValidation || login.error.status === 401
        ? 'Username atau password salah.'
        : login.error.message
      : null

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#f8f9ff] p-4">
      <section className="w-full max-w-md">
        <div className="relative flex w-full flex-col items-center justify-center gap-6 rounded-2xl border border-solid border-[#c3c6d766] bg-white p-6 shadow-[0px_8px_10px_-6px_#1018281a,0px_20px_25px_-5px_#1018281a] sm:p-10">
          <SchoolLogo className="relative -mb-6 h-40 w-40" />

          <header className="relative flex w-full flex-col items-center">
            <h1 className="relative flex min-h-14 items-center justify-center self-stretch text-center text-xl font-bold leading-8 tracking-[-0.6px] text-[#121c2a] sm:text-2xl">
              Selamat Datang di BMS
            </h1>
            <p className="relative flex items-center justify-center text-center text-sm font-bold leading-5 tracking-[0] text-[#121c2a] sm:text-base">
              BMS SMKS MUHAMMADIYAH 1 GENTENG
            </p>
            <p className="relative flex items-center justify-center self-stretch pt-1 text-center text-xs font-normal leading-5 tracking-[0] text-[#434655] sm:text-sm">
              Silakan masuk untuk mengakses sistem BMS.
            </p>
          </header>

          <form className="relative flex w-full flex-col items-center gap-5" onSubmit={handleSubmit}>
            <div className="flex w-full flex-col gap-1.5">
              <label
                className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]"
                htmlFor="username"
              >
                Username
              </label>
              <div className="relative flex h-12 w-full items-center overflow-hidden rounded-xl border border-solid border-[#c3c6d766] bg-white pl-11 pr-4 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  aria-label="Username"
                  autoComplete="username"
                  className="w-full border-none bg-transparent p-0 text-sm font-normal text-[#121c2a] outline-none placeholder:text-[#737686]"
                  id="username"
                  name="username"
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Masukkan username"
                  required
                  type="text"
                  value={username}
                />
                <User className="pointer-events-none absolute left-4 h-4 w-4 text-[#737686]" aria-hidden="true" />
              </div>
            </div>

            <div className="flex w-full flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label
                  className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]"
                  htmlFor="password"
                >
                  Password
                </label>
                <button
                  className="text-[11px] font-semibold text-blue-600 hover:underline"
                  onClick={() => navigate('/forgot-password')}
                  type="button"
                >
                  Lupa Password?
                </button>
              </div>

              <div className="relative flex h-12 w-full items-center overflow-hidden rounded-xl border border-solid border-[#c3c6d766] bg-white pl-11 pr-12 transition-all focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                <input
                  aria-label="Password"
                  autoComplete="current-password"
                  className="w-full border-none bg-transparent p-0 text-sm font-normal text-[#121c2a] outline-none placeholder:text-[#737686]"
                  id="password"
                  name="password"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Masukkan password"
                  required
                  type={passwordVisible ? 'text' : 'password'}
                  value={password}
                />
                <Lock className="pointer-events-none absolute left-3.5 h-4 w-5 text-[#737686]" aria-hidden="true" />
                <button
                  aria-label={passwordVisible ? 'Sembunyikan password' : 'Tampilkan password'}
                  className="absolute right-3 flex h-full items-center justify-center text-[#737686] hover:text-[#121c2a]"
                  onClick={() => setPasswordVisible((visible) => !visible)}
                  type="button"
                >
                  {passwordVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className="w-full text-xs font-medium text-red-600" role="alert">
                {errorMessage}
              </p>
            )}

<button
                className="mt-2 flex h-[50px] w-full items-center justify-center gap-2 rounded-xl border-0 bg-blue-600 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a] transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={login.isPending}
                type="submit"
              >
                <span className="relative flex w-fit items-center justify-center whitespace-nowrap text-center text-base font-semibold leading-6 tracking-[0] text-white">
                  {login.isPending ? 'Memproses...' : 'Masuk'}
                </span>
                {!login.isPending ? <ArrowRight className="h-[13.5px] w-[13.5px] text-white" aria-hidden="true" /> : null}
              </button>

              <p className="pt-2 text-center text-sm">
                <span className="text-[#434655]">Belum memiliki akun? </span>
                <Link className="font-semibold text-blue-600 hover:underline" to="/register">
                  Daftar di sini
                </Link>
              </p>
            </form>
        </div>
      </section>
    </main>
  )
}
