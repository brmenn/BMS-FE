import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { DashboardPreview } from './DashboardPreview'
import { Reveal } from './Reveal'
import lumba from '@/assets/logo/lumba.png'

export function HeroSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-white" id="beranda">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col justify-center px-4 pl-10 pt-6 pb-10 sm:px-8 sm:pl-16 sm:pt-8 sm:pb-16 lg:pb-28 lg:min-h-[calc(100vh-71px)]">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-[280px_1fr] lg:gap-24">
          <Reveal className="flex justify-center lg:justify-start">
            <img
              alt="Maskot BMS membawa kalkulator dan buku"
              className="w-[190px] object-contain lg:w-[248px]"
              src={lumba}
            />
          </Reveal>

          <div className="flex flex-col items-start gap-6 lg:justify-self-end">
            <Reveal delay={100}>
              <h1 className="max-w-[820px] text-[28px] leading-[36px] font-bold tracking-[-0.95px] text-[#121c2a] sm:text-[32px] sm:leading-[40px] lg:text-[38px] lg:leading-[46px]">
                Kelola Tabungan Sekolah dengan Lebih Mudah
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="max-w-[700px] text-[15px] leading-[23px] text-[#64748b] sm:text-[16.5px] sm:leading-[27px]">
                BMS (Bimbingan Manajemen Siswa) adalah platform digital yang dirancang untuk
                memudahkan pengelolaan administrasi dan keuangan secara terintegrasi. BMS membantu
                pengguna mengelola tabungan, penarikan dana, pinjaman, serta informasi tagihan siswa
                dalam satu sistem yang praktis, transparan, dan efisien.
              </p>
            </Reveal>

            <Reveal delay={340}>
              <div className="flex flex-col items-start gap-[15px] sm:flex-row sm:items-center">
                <Link
                  className="flex h-[52px] w-full items-center justify-center gap-3 rounded-[10px] bg-[#2563eb] px-6 text-[17.6px] font-medium text-white shadow-[0px_1.26px_2.51px_#0000000d] transition-colors hover:bg-[#1d4ed8] sm:w-[187px]"
                  to="/login"
                >
                  <span>Login</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>

                <a
                  className="inline-flex h-[52px] w-full items-center justify-center rounded-[10px] border border-[#e5e7eb] bg-white px-[25px] text-[17.6px] font-medium text-[#121c2a] transition-colors hover:border-[#2563eb] hover:bg-[#eff4ff] sm:w-auto"
                  href="#tentang"
                >
                  Tentang Kami
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1091px] px-4 pt-12 pb-14 sm:px-6 sm:pb-20 lg:pb-24">
        <Reveal delay={420}>
          <DashboardPreview />
        </Reveal>
      </div>
    </section>
  )
}
