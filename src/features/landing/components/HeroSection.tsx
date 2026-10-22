import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { DashboardPreview } from './DashboardPreview'
import { Reveal } from './Reveal'
import lumba from '@/assets/logo/lumba.png'

const TRUST_METRICS = [
  { target: 2450, prefix: '', suffix: '+', label: 'Siswa & Guru Aktif', tone: 'text-[#004ac6]' },
  { target: 150, prefix: '', suffix: '+', label: 'Total Transaksi Tercatat', tone: 'text-[#121c2a]' },
  { target: 98, prefix: '', suffix: '%', label: 'Transaksi Berhasil', tone: 'text-[#006329]' },
  { target: 0, prefix: 'Rp ', suffix: '', label: 'Biaya Admin Bulanan', tone: 'text-[#004ac6]' },
] as const

function CountUp({
  target,
  prefix = '',
  suffix = '',
  duration = 1800,
}: {
  target: number
  prefix?: string
  suffix?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    let raf = 0
    const start = performance.now()
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [started, target, duration])

  const formatted = new Intl.NumberFormat('id-ID').format(value)
  return (
    <span ref={ref}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

export function HeroSection() {
  return (
    <section
      className="flex min-h-[115vh] w-full flex-col overflow-x-clip border-b border-[#e5e7eb] bg-white"
      id="beranda"
    >
      <div className="mx-auto flex w-full max-w-[1403px] flex-1 flex-col px-4 pt-16 pb-12 sm:px-8 sm:pt-20 sm:pb-16 lg:px-[92px] lg:pt-24 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] lg:gap-10 xl:grid-cols-[minmax(0,480px)_minmax(0,1fr)] xl:gap-12">
          <Reveal className="flex justify-center lg:justify-start">
            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[72%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,#009dff40,transparent_72%)] blur-[36px]"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-1/2 h-10 w-[86%] -translate-x-1/2 rounded-[100%] bg-[#009dff]/75 blur-[22px]"
              />
              <img
                alt="Maskot BMS mengenakan seragam sekolah"
                className="relative w-[170px] object-contain drop-shadow-[0_40px_40px_rgba(0,157,255,0.65)] lg:-mt-12 lg:-mb-16 lg:ml-6 lg:w-[230px] xl:ml-10 xl:w-[330px]"
                src={lumba}
              />
            </div>
          </Reveal>

          <div className="flex flex-col items-start gap-[19px] xl:pt-6">
            <Reveal delay={100}>
              <h1 className="text-[32px] leading-[42px] font-bold tracking-[-0.52px] text-[#121c2a] sm:text-[40px] sm:leading-[50px] lg:text-[36px] lg:leading-[46px] xl:text-[45.7px] xl:leading-[52px]">
                Tabungan Sekolah Tertata,
                <br className="hidden sm:block" />{' '}
                <span>
                  Kelola <span className="text-[#0048ad]">Lebih Mudah</span>
                </span>
              </h1>
            </Reveal>

            <Reveal delay={220}>
              <p className="max-w-[720px] text-[16px] leading-[27px] text-[#64748b] sm:text-[17.5px] sm:leading-[29px] xl:text-[18.5px] xl:leading-[30.1px]">
                BMS (Bimbingan Manajemen Siswa) menyatukan administrasi dan keuangan sekolah dalam
                satu platform digital. Kelola tabungan, penarikan, pinjaman, dan tagihan siswa
                dengan praktis. Pencatatan lebih rapi, pengelolaan lebih transparan.
              </p>
            </Reveal>

            <Reveal delay={340} className="w-full">
              <nav
                aria-label="Navigasi utama"
                className="flex w-full flex-col items-stretch gap-[15px] pt-2 sm:flex-row sm:items-center sm:pt-3"
              >
                <Link
                  className="flex h-[55px] w-full shrink-0 items-center justify-center gap-2.5 rounded-[10.05px] bg-[#2563eb] text-[17.6px] font-medium text-white shadow-[0px_1.26px_2.51px_#0000000d] transition-colors hover:bg-[#1d4ed8] sm:ml-4 sm:w-[187px]"
                  to="/login"
                >
                  <span className="whitespace-nowrap">Masuk</span>
                  <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </Link>

                <a
                  className="inline-flex h-[55px] w-full items-center justify-center self-start rounded-[10.05px] border border-[#e5e7eb] bg-white px-[25px] text-[17.6px] font-medium whitespace-nowrap text-[#121c2a] transition-colors hover:border-[#2563eb] hover:bg-[#eff4ff] sm:w-auto"
                  href="#tentang"
                >
                  Tentang Kami
                </a>
              </nav>
            </Reveal>

            <Reveal delay={460} className="w-full">
              <section
                aria-label="Metrik kepercayaan"
                className="grid w-full grid-cols-2 gap-x-4 gap-y-5 border-t border-[#c3c6d7] pt-7 sm:flex sm:gap-4 sm:pt-8"
              >
                {TRUST_METRICS.map((metric) => (
                  <div key={metric.label} className="flex min-w-0 flex-col items-start sm:flex-1">
                    <strong className={`text-2xl leading-8 font-bold tracking-[-0.24px] ${metric.tone}`}>
                      <CountUp prefix={metric.prefix} suffix={metric.suffix} target={metric.target} />
                    </strong>
                    <span className="text-xs leading-[18px] text-[#434655]">{metric.label}</span>
                  </div>
                ))}
              </section>
            </Reveal>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[1091px] pt-32 sm:pt-48 lg:pt-64">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-64 -top-24 h-[400px] w-[400px] rounded-full bg-[#009dff]/20 blur-[32px] sm:-right-96 sm:-top-36 sm:h-[680px] sm:w-[680px]"
          />
          <Reveal delay={420} className="relative">
            <DashboardPreview />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
