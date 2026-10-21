import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  BadgeCheck,
  BookOpen,
  GraduationCap,
  Landmark,
  Scale,
  ShieldCheck,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

const NARRATIVE: { icon: LucideIcon; text: string }[] = [
  {
    icon: BookOpen,
    text: 'Bank Mini Sekolah membantu digitalisasi proses tabungan siswa sehingga informasi saldo, transaksi, dan pengajuan penarikan dapat dikelola dengan lebih sederhana.',
  },
  {
    icon: ShieldCheck,
    text: 'Sistem ini dirancang khusus untuk lingkungan pendidikan, memudahkan petugas sekolah dalam melakukan pembukuan kas yang rapi sekaligus melatih kebiasaan menabung siswa secara teratur dan bertanggung jawab.',
  },
]

const VALUE_PILLS: { icon: LucideIcon; label: string }[] = [
  { icon: Scale, label: 'Akuntabel & Transparan' },
  { icon: GraduationCap, label: 'Edukasi Finansial Karakter' },
  { icon: Landmark, label: 'Sistem Bank Mini Terpadu' },
]

export function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden bg-white py-14 lg:py-18" id="tentang">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-8 bottom-10 h-[400px] w-[400px] rounded-full bg-[#6db1ff33] blur-[32px]"
      />

      <div className="relative mx-auto flex w-full max-w-[1120px] flex-col gap-10 px-4 sm:px-6">
        <Reveal>
          <h2 className="font-jakarta text-[28px] leading-[36px] font-bold tracking-[-1px] text-[#0b1c30] sm:text-[36px] sm:leading-[44px]">
            Tentang Kami
          </h2>
        </Reveal>

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="order-2 lg:order-1 lg:col-span-6">
            <Reveal>
              <RekeningBookMockup />
            </Reveal>
          </div>

          <div className="order-1 flex flex-col items-start gap-4 lg:order-2 lg:col-span-6">
            <Reveal delay={100}>
              <span className="inline-flex items-center gap-1 rounded-full bg-[#dbe1ff] px-2 py-0.5">
                <Landmark className="h-3 w-3 text-[#004ac6]" aria-hidden="true" />
                <span className="font-jakarta text-[11px] font-bold leading-4 tracking-[0.6px] text-[#004ac6]">
                  TENTANG BANK MINI SEKOLAH
                </span>
              </span>
            </Reveal>

            <Reveal delay={200}>
              <h3 className="font-jakarta text-[24px] leading-[30px] font-bold tracking-[-0.4px] text-[#0b1c30] sm:text-[34px] sm:leading-[42px]">
                Semua kebutuhan tabungan siswa dalam{' '}
                <span className="text-[#004ac6] underline">satu sistem.</span>
              </h3>
            </Reveal>

            <div className="flex w-full flex-col gap-4">
              {NARRATIVE.map((item, index) => {
                const Icon = item.icon

                return (
                  <Reveal key={item.text} delay={260 + index * 120}>
                    <div className="flex w-full items-start gap-2 rounded-2xl border border-[#e5eeff99] bg-white/80 p-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#dbe1ff]">
                        <Icon className="h-3 w-3 text-[#004ac6]" aria-hidden="true" />
                      </span>
                      <p className="font-jakarta text-[15px] leading-[22px] text-[#434655]">{item.text}</p>
                    </div>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={500}>
              <div className="flex flex-wrap items-center gap-1 pt-1">
                {VALUE_PILLS.map((pill) => {
                  const Icon = pill.icon

                  return (
                    <span
                      key={pill.label}
                      className="inline-flex items-center gap-1 rounded-full bg-[#e5eeff] px-2 py-0.5"
                    >
                      <Icon className="h-3 w-3 text-[#434655]" aria-hidden="true" />
                      <span className="font-jakarta text-[11px] leading-4 font-semibold text-[#434655]">
                        {pill.label}
                      </span>
                    </span>
                  )
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

function RekeningBookMockup() {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -left-12 -top-4 -bottom-4 right-4 rounded-3xl bg-[linear-gradient(23deg,rgba(0,74,198,0.15)_0%,rgba(108,248,187,0.2)_50%,rgba(99,46,205,0.1)_100%)] opacity-75 blur-xl"
      />

      <div className="relative flex w-full max-w-[400px] flex-col gap-3.5 rounded-3xl border border-[#e5eeff99] bg-white p-5 shadow-[0px_25px_50px_-12px_#00000040]">
        <div className="flex items-center justify-between gap-3 border-b border-[#e5eeff] pb-2">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#dbe1ff]">
              <BookOpen className="h-4 w-4 text-[#004ac6]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start">
              <span className="font-jakarta text-base leading-5 font-bold text-[#0b1c30]">
                Buku Rekening Digital
              </span>
              <span className="font-mono text-[11px] leading-4 text-[#434655]">ID: 2026-K-841</span>
            </span>
          </div>

          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/60 px-2 py-0.5">
            <span className="h-2 w-2 rounded-full bg-[#006c49]" aria-hidden="true" />
            <span className="font-jakarta text-[10px] leading-4 font-bold text-[#00714d]">
              Terverifikasi Real-Time
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-1 rounded-2xl border border-[#e5eeff] bg-[#eff4ff] p-2">
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-1">
              <BadgeCheck className="h-3 w-3 text-[#434655]" aria-hidden="true" />
              <span className="font-jakarta text-[9px] leading-[14px] font-bold tracking-[0.5px] text-[#434655]">
                STATUS VALIDASI BUKU
              </span>
            </span>
            <ShieldCheck className="h-3.5 w-3.5 text-[#004ac6]/75" aria-hidden="true" />
          </div>
          <p className="font-jakarta text-[13px] leading-5 font-semibold text-[#0b1c30]">
            Tervalidasi oleh Petugas Bank Mini
          </p>
          <span className="flex items-center gap-1.5">
            <Landmark className="h-3 w-3 shrink-0 text-[#434655]" aria-hidden="true" />
            <span className="font-jakarta text-[10px] leading-4 text-[#434655]">
              SMK Unggulan Terpadu • Unit Praktik Perbankan
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-1 pt-1">
          <LedgerRow
            icon={ArrowDownToLine}
            label="Total Setoran Masuk"
            tone="in"
            value="Rp 1.850.000"
          />
          <LedgerRow
            icon={ArrowUpFromLine}
            label="Total Penarikan Dana"
            tone="out"
            value="Rp 400.000"
          />

          <div className="mt-1 flex items-center justify-between gap-3 rounded-2xl bg-[#004ac6] p-2 shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]">
            <span className="flex items-center gap-2">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10">
                <Wallet className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              </span>
              <span className="font-jakarta text-base leading-6 font-bold text-white">
                Sisa Saldo Kas
              </span>
            </span>
            <span className="font-jakarta text-base leading-6 font-extrabold text-white">
              Rp 1.450.000
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function LedgerRow({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: LucideIcon
  label: string
  value: string
  tone: 'in' | 'out'
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-white/40 bg-[#eff4ffb2] p-2">
      <span className="flex min-w-0 items-center gap-2">
        <span
          className={cn(
            'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg',
            tone === 'in' ? 'bg-white/60' : 'bg-[#ffdad6]',
          )}
        >
          <Icon
            className={cn('h-3 w-3', tone === 'in' ? 'text-[#006c49]' : 'text-[#ba1a1a]')}
            aria-hidden="true"
          />
        </span>
        <span className="font-jakarta text-[13px] leading-5 font-medium text-[#434655]">{label}</span>
      </span>
      <span
        className={cn(
          'font-jakarta text-[13px] leading-5 font-bold',
          tone === 'in' ? 'text-[#006c49]' : 'text-[#ba1a1a]',
        )}
      >
        {value}
      </span>
    </div>
  )
}
