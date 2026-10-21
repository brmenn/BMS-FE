import type { ReactNode } from 'react'
import { Check, CreditCard, Landmark, ShieldCheck, Wallet } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Reveal } from './Reveal'

const LEDGER_ROWS: {
  title: string
  code: string
  amount: string
  dot: string
  amountClass: string
}[] = [
  {
    title: 'Setor Tunai Kasir',
    code: 'TRX-2026-0891',
    amount: '+Rp 50.000',
    dot: 'bg-[#006329]',
    amountClass: 'text-[#006329]',
  },
  {
    title: 'Tabungan Wajib',
    code: 'TRX-2026-0742',
    amount: '+Rp 25.000',
    dot: 'bg-[#004ac6]',
    amountClass: 'text-[#004ac6]',
  },
]

const BALANCE_BULLETS = [
  '24/7 cek saldo online mandiri',
  'Notifikasi transaksi via SMS & Portal',
  'Enkripsi PIN rekening anti-penyalahgunaan',
]

const WITHDRAWAL_BULLETS = [
  'Prosedur persetujuan guru wali/kasir aman',
  'Konfirmasi slip penarikan digital',
  'Pencegahan penarikan tanpa izin ortu',
]

const WITHDRAWAL_FLOW: {
  step: 'done' | 'active' | 'pending'
  title: string
  status: string
  muted?: boolean
}[] = [
  { step: 'done', title: '1. Pengajuan Siswa', status: 'Selesai' },
  { step: 'active', title: '2. Verifikasi Guru Wali', status: 'Menunggu' },
  { step: 'pending', title: '3. Pengambilan Kasir', status: 'Antrean', muted: true },
]

const FEATURE_BULLETS = {
  ledger: [
    'Riwayat transaksi real-time',
    'Cetak bukti resi instan digital / thermal',
    'Rekapitulasi otomatis buku kas sekolah',
  ],
  withdrawal: WITHDRAWAL_BULLETS,
}

export function AdvantageSection() {
  return (
    <section className="w-full bg-white py-16 lg:py-20" id="keunggulan">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-12 px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="flex flex-col items-start gap-1.5">
              <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#004ac6]">
                PILAR UTAMA SISTEM
              </span>
              <h2 className="text-[24px] leading-8 font-bold tracking-[-0.6px] text-[#121c2a] sm:text-[30px] sm:leading-[38px] sm:tracking-[-0.75px]">
                Kemudahan Ekosistem Kasir & Siswa
              </h2>
            </div>
            <p className="max-w-[448px] text-sm leading-5 text-[#434655]">
              Dirancang sesuai SOP akuntansi kejuruan untuk menjamin integritas buku kas sekolah tanpa
              kerumitan administrasi.
            </p>
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-3">
          <Reveal className="h-full" delay={140}>
            <BentoCard label="Sistem Ledger" title="Transaksi Lebih Teratur">
            <p className="text-sm leading-[22.8px] text-[#434655]">
              Catat dan pantau aktifitas tabungan dengan jelas dan akurat.
            </p>
            <div className="flex flex-col gap-2.5 rounded-xl border border-[#c3c6d799] bg-[#f8f9ff] px-4 py-4">
              <div className="flex items-center justify-between border-b border-[#c3c6d766] pb-2">
                <span className="text-[11px] font-semibold leading-4 tracking-[0.44px] text-[#434655]">
                  WAKTU / BUKTI
                </span>
                <span className="text-[11px] font-semibold leading-4 tracking-[0.44px] text-[#434655]">
                  STATUS
                </span>
              </div>

              {LEDGER_ROWS.map((row) => (
                <div
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#c3c6d74c] bg-white p-2"
                  key={row.code}
                >
                  <span className="flex min-w-0 items-center gap-2.5">
                    <span className={cn('h-2 w-2 shrink-0 rounded-full', row.dot)} aria-hidden="true" />
                    <span className="flex min-w-0 flex-col">
                      <span className="text-xs leading-[18px] font-medium text-[#121c2a]">
                        {row.title}
                      </span>
                      <span className="text-[11px] leading-[18px] text-[#434655]">{row.code}</span>
                    </span>
                  </span>
                  <span
                    className={cn(
                      'shrink-0 text-xs leading-[18px] font-semibold',
                      row.amountClass,
                    )}
                  >
                    {row.amount}
                  </span>
                </div>
              ))}
            </div>
            <BulletList items={FEATURE_BULLETS.ledger} />
          </BentoCard>
          </Reveal>

          <Reveal className="h-full" delay={280}>
            <BentoCard
              accent
              label="Multi-Platform"
              tag="FAVORIT USER"
              title="Informasi Saldo"
            >
            <p className="text-sm leading-[22.8px] text-[#434655]">
              Siswa dapat melihat saldo tabungan mereka dengan mudah kapan saja.
            </p>
            <div className="flex flex-col gap-2 rounded-xl bg-[linear-gradient(161deg,rgba(0,74,198,1)_0%,rgba(37,99,235,1)_50%,rgba(79,92,142,1)_100%)] p-5 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]">
              <div className="flex items-start justify-between gap-3">
                <span className="flex flex-col items-start gap-0.5">
                  <span className="text-xs leading-4 font-medium tracking-[0.6px] text-white/80">
                    BMS CARD VIRTUAL
                  </span>
                  <span className="text-sm leading-5 font-semibold text-white">
                    SMKS Muhammadiyah 1 Genteng
                  </span>
                </span>
                <CreditCard className="h-5 w-5 shrink-0 text-white" aria-hidden="true" />
              </div>

              <div className="flex flex-col gap-0.5 pt-3">
                <span className="text-xs leading-4 text-white/75">Saldo Tabungan Aktif</span>
                <span className="text-2xl leading-8 font-bold tracking-[-0.6px] text-white">
                  Rp 1.250.000
                </span>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/20 pt-3">
                <span className="font-mono text-xs leading-4 text-white">NISN: 0064928172</span>
                <span className="rounded bg-white/25 px-2 py-0.5 text-[10px] leading-4 font-bold text-white">
                  TERVERIFIKASI
                </span>
              </div>
            </div>
            <BulletList items={BALANCE_BULLETS} />
            </BentoCard>
          </Reveal>

          <Reveal className="h-full" delay={420}>
            <BentoCard label="SOP Terbimbing" title="Proses Penarikan">
            <p className="text-sm leading-[22.8px] text-[#434655]">
              Pengajuan penarikan dana dapat dipantau status verifikasinya.
            </p>
            <div className="flex flex-col gap-3 rounded-xl border border-[#c3c6d799] bg-[#f8f9ff] px-4 py-4">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-[#434655]" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 text-[#121c2a]">
                  Alur Verifikasi Penarikan
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {WITHDRAWAL_FLOW.map((flow, index) => (
                  <div
                    className={cn('flex items-center gap-3', flow.muted && 'opacity-60')}
                    key={flow.title}
                  >
                    <span
                      className={cn(
                        'flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold',
                        flow.step === 'done' &&
                          'bg-[#006329] text-white',
                        flow.step === 'active' &&
                          'bg-[#2563eb] text-white ring-4 ring-[#dbe1ff]',
                        flow.step === 'pending' && 'bg-[#dee9fc] text-[#434655]',
                      )}
                      aria-hidden="true"
                    >
                      {flow.step === 'done' ? <Check className="h-3 w-3 text-white" /> : index + 1}
                    </span>

                    <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                      <span className="truncate text-xs font-semibold leading-4 text-[#121c2a]">
                        {flow.title}
                      </span>
                      <span
                        className={cn(
                          'shrink-0 text-[11px] font-semibold leading-4',
                          flow.step === 'done' && 'text-[#006329]',
                          flow.step === 'active' && 'rounded-full bg-[#dce1ff] px-2 py-0.5 text-[10px] text-[#071747]',
                          flow.step === 'pending' && 'text-[10px] text-[#737686]',
                        )}
                      >
                        {flow.status}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <BulletList items={FEATURE_BULLETS.withdrawal} />
            </BentoCard>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function BentoCard({
  label,
  title,
  tag,
  accent = false,
  children,
}: {
  label: string
  title: string
  tag?: string
  accent?: boolean
  children: ReactNode
}) {
  return (
    <article
      className={cn(
        'relative flex h-full flex-1 flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]',
        accent ? 'border-2 border-[#004ac633]' : 'border border-[#c3c6d7b2]',
      )}
    >
      <span
        className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-[9999px] bg-[#dbe1ff33]"
        aria-hidden="true"
      />

      {tag ? (
        <span className="absolute top-0 right-0 rounded-bl-xl bg-[#2563eb] px-3 py-1 text-[11px] font-bold leading-5 tracking-[0.55px] text-white">
          {tag}
        </span>
      ) : null}

      <div className="relative flex flex-col gap-1.5 pb-6">
        <div className="flex items-center justify-between gap-3">
          <span
            className={cn(
              'flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl',
              accent ? 'bg-[#2563eb] shadow-[0px_2px_4px_-2px_#2563eb33,0px_4px_6px_-1px_#2563eb33]' : 'border border-[#dbe1ff] bg-[#eff4ff]',
            )}
          >
            {accent ? (
              <Wallet className="h-6 w-6 text-white" aria-hidden="true" />
            ) : (
              <Landmark className="h-6 w-6 text-[#004ac6]" aria-hidden="true" />
            )}
          </span>
          <span
            className={cn(
              'inline-flex rounded-full px-3 py-1 text-[11px] font-semibold leading-4 tracking-[0.44px]',
              accent ? 'bg-[#dbe1ff] text-[#004ac6]' : 'bg-[#e6eeff] text-[#004ac6]',
            )}
          >
            {label}
          </span>
        </div>
        <h3 className="pt-4 text-xl leading-7 font-bold tracking-[-0.1px] text-[#121c2a]">{title}</h3>
      </div>

      <div className="relative flex flex-1 flex-col gap-4">{children}</div>
    </article>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="mt-auto flex flex-col gap-2.5 border-t border-[#c3c6d766] pt-4">
      {items.map((item) => (
        <span className="flex items-center gap-2.5" key={item}>
          <Check className="h-3.5 w-3.5 shrink-0 text-[#004ac6]" aria-hidden="true" />
          <span className="text-xs leading-[18px] text-[#121c2a]">{item}</span>
        </span>
      ))}
    </div>
  )
}
