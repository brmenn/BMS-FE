import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DashboardPreview } from './DashboardPreview'
import { StudentPhoto } from './StudentPhoto'

export function HeroSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-white" id="beranda">
      <div className="mx-auto grid w-full max-w-[1160px] grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-12 lg:gap-x-12 lg:gap-y-12">
        <div className="lg:col-start-2 lg:col-end-5">
          <StudentPhoto
            alt="Adinda Putri, siswa kelas XII RPL 1"
            className="aspect-[0.67/1] w-full object-cover"
            fallbackClassName="text-5xl"
          />
        </div>

        <div className="flex flex-col items-start gap-6 lg:col-start-5 lg:col-end-12">
          <h1 className="text-3xl font-bold leading-[1.1] tracking-[-1.14px] text-[#121c2a] sm:text-[38px] lg:text-[45.7px] lg:leading-[45.7px]">
            Kelola Tabungan Sekolah dengan Lebih Mudah
          </h1>

          <p className="max-w-[620px] text-base leading-[26px] text-[#64748b] sm:text-[18.5px] sm:leading-[30.1px]">
            Platform digital untuk membantu siswa dan sekolah mengelola tabungan, transaksi, dan
            pengajuan penarikan secara lebih teratur.
          </p>

          <div className="flex w-full flex-col items-start gap-3 sm:w-auto sm:flex-row sm:items-center">
            <Link
              className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-[#2563eb] px-8 text-sm font-medium text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8] sm:w-[159px] sm:justify-between"
              to="/login"
            >
              Login
              <ArrowRight className="h-3 w-3" aria-hidden="true" />
            </Link>

            <a
              className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#e5e7eb] bg-white px-5 text-sm font-medium text-[#121c2a] transition-colors hover:border-[#2563eb] hover:bg-[#eff4ff] sm:w-auto"
              href="#tentang"
            >
              Tentang Kami
            </a>
          </div>
        </div>

        <div className="lg:col-start-1 lg:col-end-13">
          <DashboardPreview />
        </div>
      </div>
    </section>
  )
}
