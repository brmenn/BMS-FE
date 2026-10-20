import type { LucideIcon } from 'lucide-react'
import {
  ArrowDownToLine,
  ArrowRight,
  ArrowUpFromLine,
  Check,
  PiggyBank,
  ReceiptText,
  Sparkles,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const FEATURES: { badge: string; icon: LucideIcon; title: string; description: string; action: string }[] =
  [
    {
      badge: 'SIMPANAN',
      icon: PiggyBank,
      title: 'Tabungan',
      description: 'Lihat saldo dan riwayat transaksi tabungan secara mudah.',
      action: 'Kelola Saldo',
    },
    {
      badge: 'TARIK TUNAI',
      icon: Wallet,
      title: 'Penarikan',
      description: 'Ajukan penarikan dan pantau proses persetujuannya.',
      action: 'Proses Pengajuan',
    },
    {
      badge: 'CATATAN',
      icon: ReceiptText,
      title: 'Riwayat Transaksi',
      description: 'Periksa aktivitas tabungan dengan informasi yang jelas.',
      action: 'Lihat Log Lengkap',
    },
  ]

const WITHDRAWAL_STEPS: {
  state: 'done' | 'active' | 'pending'
  title: string
  note: string
  badge?: string
  muted?: boolean
}[] = [
  {
    state: 'done',
    title: 'Verifikasi Wali Kelas',
    note: 'Konfirmasi tujuan penarikan dana',
    badge: 'Selesai',
  },
  {
    state: 'active',
    title: 'Persetujuan Bendahara',
    note: 'Pengecekan kas & otorisasi sistem',
    badge: 'Menunggu',
  },
  {
    state: 'pending',
    title: 'Pengambilan Tunai',
    note: 'Serah terima di loket sekolah resmi',
    badge: 'Antrean',
    muted: true,
  },
]

const RECENT_ACTIVITY: {
  title: string
  note: string
  amount: string
  status: string
  tone: 'in' | 'out'
}[] = [
  {
    title: 'Setoran Rutin',
    note: 'Hari ini, 09:15 WIB',
    amount: '+Rp 50.000',
    status: 'SUKSES',
    tone: 'in',
  },
  {
    title: 'Tarik Buku Paket',
    note: 'Kemarin, 13:40 WIB',
    amount: '-Rp 25.000',
    status: 'SELESAI',
    tone: 'out',
  },
]

const VISUALS = [SavingsVisual, WithdrawalVisual, HistoryVisual]

export function FeatureSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-white py-16 lg:py-20" id="fitur">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 px-4 sm:px-6">
        <div className="flex max-w-[672px] flex-col items-center gap-3 text-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#e9ddff] px-2 py-1 shadow-[0px_1px_2px_#0000000d]">
            <Sparkles className="h-3.5 w-3.5 text-[#23005c]" aria-hidden="true" />
            <span className="font-jakarta text-xs leading-4 font-semibold tracking-[0.6px] text-[#23005c]">
              FITUR UNGGULAN SEKOLAH
            </span>
          </span>
          <h2 className="font-jakarta text-[32px] leading-[40px] font-bold tracking-[-1px] text-[#0b1c30] sm:text-[40px] sm:leading-[48px]">
            Fitur Utama
          </h2>
          <p className="font-jakarta text-base leading-6 text-[#434655]">
            Fitur sederhana untuk kebutuhan transaksi tabungan siswa.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon
            const Visual = VISUALS[index] ?? HistoryVisual

            return (
              <article
                key={feature.title}
                className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-white shadow-[15px_20px_20px_-4px_#00000033,0px_10px_15px_-3px_#0000001a] transition-shadow hover:shadow-[18px_24px_24px_-4px_#00000040,0px_12px_18px_-3px_#0000001a]"
              >
                <span className="h-2 w-full shrink-0 bg-[#003ea8]" aria-hidden="true" />

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3 pb-4">
                    <span className="inline-flex rounded-full bg-[#dbe1ff] px-2 py-1">
                      <span className="font-jakarta text-xs leading-4 font-bold tracking-[0.6px] text-[#003ea8]">
                        {feature.badge}
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#dbe1ff80]">
                      <Icon className="h-5 w-5 text-[#003ea8]" aria-hidden="true" />
                    </span>
                  </div>

                  <h3 className="font-jakarta text-xl leading-7 font-semibold text-[#0b1c30]">
                    {feature.title}
                  </h3>
                  <p className="font-jakarta pt-1 pb-6 text-sm leading-5 text-[#434655]">
                    {feature.description}
                  </p>

                  <div className="flex flex-1 flex-col justify-end">
                    <Visual />
                  </div>

                  <button
                    className="mt-4 flex w-full items-center justify-center gap-1 rounded-xl bg-[#003ea8] px-4 py-3 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#003285]"
                    type="button"
                  >
                    <span className="font-jakarta text-sm leading-5 font-semibold text-white">
                      {feature.action}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  </button>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SavingsVisual() {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-[#e5eeff] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-jakarta text-xs leading-4 font-semibold text-[#434655]">
          Saldo Saat Ini
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#006c49]" aria-hidden="true" />
          <span className="font-jakarta text-xs leading-4 font-bold text-[#006c49]">Aktif</span>
        </span>
      </div>

      <span className="font-jakarta text-xl leading-7 font-extrabold tracking-[-0.5px] text-[#0b1c30]">
        Rp 1.450.000
      </span>

      <div className="flex flex-col gap-1.5 pt-2">
        <div className="flex items-center justify-between gap-3">
          <span className="font-jakarta text-xs leading-4 font-semibold text-[#434655]">
            Target Wisuda / Akhir Tahun
          </span>
          <span className="font-jakarta text-xs leading-4 font-bold text-[#004ac6]">72%</span>
        </div>
        <div
          className="h-3 w-full overflow-hidden rounded-full bg-[#d3e4fe]"
          role="progressbar"
          aria-label="Progres target tabungan"
          aria-valuenow={72}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="h-full w-[72%] rounded-full bg-[#004ac6]" />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-3">
          <span className="font-jakarta text-[11px] leading-4 text-[#434655]">
            Terkumpul Rp 1.450.000
          </span>
          <span className="font-jakarta text-[11px] leading-4 text-[#434655]">
            Target Rp 2.000.000
          </span>
        </div>
      </div>
    </div>
  )
}

function WithdrawalVisual() {
  return (
    <div className="flex flex-col gap-3 rounded-xl bg-[#e5eeff] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-jakarta text-xs leading-4 font-semibold text-[#434655]">
          Alur Verifikasi Bertingkat
        </span>
        <span className="font-jakarta text-xs leading-4 font-semibold text-[#003ea8]">
          Terkontrol Aman
        </span>
      </div>

      <div className="flex flex-col gap-2.5">
        {WITHDRAWAL_STEPS.map((step, index) => (
          <div
            className={cn('flex items-center gap-3', step.muted && 'opacity-60')}
            key={step.title}
          >
            <span
              className={cn(
                'flex h-6 w-6 shrink-0 items-center justify-center rounded-full',
                step.state === 'done' && 'bg-[#006329]',
                step.state === 'active' && 'bg-[#2563eb] text-xs font-bold text-white ring-4 ring-[#dbe1ff]',
                step.state === 'pending' && 'bg-[#d3e4fe] text-xs font-bold text-[#434655]',
              )}
              aria-hidden="true"
            >
              {step.state === 'done' ? <Check className="h-3 w-3 text-white" /> : index + 1}
            </span>

            <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <span className="flex min-w-0 flex-col">
                <span className="font-jakarta text-xs leading-4 font-semibold text-[#0b1c30]">
                  {step.title}
                </span>
                <span className="font-jakarta text-[11px] leading-4 text-[#434655]">
                  {step.note}
                </span>
              </span>
              <span
                className={cn(
                  'font-jakarta shrink-0 text-[11px] leading-4 font-semibold',
                  step.state === 'done' && 'text-[#006329]',
                  step.state === 'active' && 'rounded-full bg-[#dce1ff] px-2 py-0.5 text-[10px] text-[#071747]',
                  step.state === 'pending' && 'text-[10px] text-[#737686]',
                )}
              >
                {step.badge}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function HistoryVisual() {
  return (
    <div className="flex flex-col gap-2 rounded-xl bg-[#e5eeff] p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="font-jakarta text-xs leading-4 font-semibold text-[#434655]">
          Aktivitas Terkini
        </span>
        <span className="rounded bg-[#d3e4fe] px-2 py-0.5 font-jakarta text-[11px] leading-4 font-bold text-[#004ac6]">
          e-Bukti Valid
        </span>
      </div>

      {RECENT_ACTIVITY.map((activity) => (
        <div
          className="flex items-center justify-between gap-2 rounded-lg bg-white p-2"
          key={activity.title}
        >
          <span className="flex min-w-0 items-center gap-2">
            <span
              className={cn(
                'flex h-7 w-7 shrink-0 items-center justify-center rounded-full',
                activity.tone === 'in' ? 'bg-[#004ac6]' : 'bg-[#ffdad6]',
              )}
            >
              {activity.tone === 'in' ? (
                <ArrowDownToLine className="h-3 w-3 text-white" aria-hidden="true" />
              ) : (
                <ArrowUpFromLine className="h-3 w-3 text-[#ba1a1a]" aria-hidden="true" />
              )}
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="font-jakarta truncate text-xs leading-4 font-semibold text-[#0b1c30]">
                {activity.title}
              </span>
              <span className="font-jakarta truncate text-[10px] leading-[15px] text-[#434655]">
                {activity.note}
              </span>
            </span>
          </span>

          <span className="flex shrink-0 flex-col items-end gap-1">
            <span
              className={cn(
                'font-jakarta text-xs leading-4 font-bold',
                activity.tone === 'in' ? 'text-[#004ac6]' : 'text-[#ba1a1a]',
              )}
            >
              {activity.amount}
            </span>
            <span
              className={cn(
                'rounded px-2 py-0.5 font-jakarta text-[9px] leading-[13.5px] font-bold',
                activity.tone === 'in'
                  ? 'bg-[#d3e4fe] text-[#004ac6]'
                  : 'bg-[#dce9ff] text-[#434655]',
              )}
            >
              {activity.status}
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}
