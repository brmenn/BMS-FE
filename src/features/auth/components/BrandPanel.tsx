import { SchoolLogo } from './SchoolLogo'

export function BrandPanel() {
  return (
    <aside className="relative hidden w-full max-w-[512px] shrink-0 flex-col items-start justify-between overflow-hidden bg-gradient-to-b from-[#bbd6ff] via-[#83a4ff] to-[#3675ff] p-12 lg:flex">
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/[0.05] blur-[32px]" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#60a5fa]/10 blur-[32px]" />

      <div className="relative flex w-full flex-0 flex-col items-start gap-5">
        <div className="flex w-full flex-col items-start pt-3">
          <SchoolLogo className="relative h-auto w-48" />

          <h1 className="mt-5 text-3xl font-bold leading-[38px] tracking-[-0.75px] text-[#002c8e]">
            Pendaftaran Akun Pengguna
            <br />
            BMS
          </h1>
        </div>

        <p className="max-w-md text-sm font-medium leading-[22.8px] text-[#03224b]">
          Sistem Informasi Tabungan &amp; Keuangan Sekolah. Satu gerbang akses mandiri untuk Siswa, Guru, dan
          Karyawan.
        </p>
      </div>

      <div className="relative h-[75px] w-full shrink-0" />
    </aside>
  )
}
