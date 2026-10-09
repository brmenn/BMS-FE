import { useState } from 'react'
import {
  Banknote,
  Check,
  CircleDollarSign,
  Info,
  Landmark,
  Percent,
  ReceiptText,
  Wallet,
  X,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type PaymentScope = 'full' | 'principal' | 'interest'
type PaymentChannel = 'cash' | 'transfer'

interface ScopeOption {
  id: PaymentScope
  label: string
  note: string
  icon: LucideIcon
}

interface ChannelOption {
  id: PaymentChannel
  label: string
  note: string
  icon: LucideIcon
  badge?: string
  account?: string
}

const SCOPE_OPTIONS: ScopeOption[] = [
  {
    id: 'full',
    label: 'Bayar Keseluruhan',
    note: 'Bayar keseluruhan tagihan yang mencakup bunga dan pokok',
    icon: Wallet,
  },
  {
    id: 'principal',
    label: 'Bayar Tagihan Pokok',
    note: 'Membayar tagihan pokok peminjaman',
    icon: CircleDollarSign,
  },
  {
    id: 'interest',
    label: 'Bayar Bunga',
    note: 'Membayar tagihan bunga 1% setiap bulannya',
    icon: Percent,
  },
]

const CHANNEL_OPTIONS: ChannelOption[] = [
  {
    id: 'cash',
    label: 'Cash',
    note: 'Ambil di Loket Kasir BMS',
    icon: Banknote,
    badge: 'Cair Langsung di Sekolah',
  },
  {
    id: 'transfer',
    label: 'Transfer Bank',
    note: 'Kirim ke Rekening Bank Terdaftar',
    icon: Landmark,
    account: 'BSI - 7109283921 (Ahmad Dahlan)',
  },
]

export function BayarCicilanModal({ onClose }: { onClose: () => void }) {
  const [scope, setScope] = useState<PaymentScope>('full')
  const [channel, setChannel] = useState<PaymentChannel>('cash')

  return (
    <div
      aria-labelledby="bayar-cicilan-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup pembayaran cicilan"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[726px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-2xl">
        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#c3c6d74c] pb-3">
            <div className="flex flex-col gap-[5px] pt-1">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">
                PERIODE BULAN BERJALAN
              </span>
              <span
                className="text-base font-bold leading-6 text-[#121c2a]"
                id="bayar-cicilan-title"
              >
                TAGIHAN CICILAN SAAT INI
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex rounded-full border border-[#c3c6d74c] bg-[#eff4ff] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                BELUM JATUH TEMPO
              </span>
              <button
                aria-label="Tutup"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
                onClick={onClose}
                type="button"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-3 rounded-xl border border-[#c3c6d733] bg-[#f8f9ff] p-3.5 sm:grid-cols-2">
            <div className="flex flex-col gap-0.5 pb-0.5">
              <span className="text-xs leading-[18px] text-[#434655]">No. Kontrak</span>
              <span className="text-base font-semibold leading-6 text-[#121c2a]">#PJ-2026-001</span>
            </div>
            <div className="flex flex-col gap-0.5 pb-0.5">
              <span className="text-xs leading-[18px] text-[#434655]">Jatuh Tempo</span>
              <span className="text-base font-semibold leading-6 text-[#121c2a]">
                10 Oktober 2026
              </span>
            </div>
          </div>

          <div className="mt-4 flex flex-col rounded-xl border border-[#c3c6d74c] bg-white p-4">
            <div className="flex items-center justify-between border-b border-[#c3c6d733] pb-2">
              <span className="text-xs leading-[18px] text-[#434655]">Pokok Cicilan</span>
              <span className="text-xs font-medium leading-[18px] text-[#121c2a]">Rp 400.000</span>
            </div>
            <div className="flex items-center justify-between border-b border-[#c3c6d733] py-2">
              <span className="text-xs leading-[18px] text-[#434655]">Total Bunga 1%</span>
              <span className="text-xs font-medium leading-[18px] text-[#121c2a]">Rp 20.000</span>
            </div>
            <div className="flex items-center justify-between gap-3 pt-2.5">
              <span className="flex flex-col gap-0.5">
                <span className="text-xs leading-[18px] text-[#737686]">
                  Total Tagihan Bulan Ini
                </span>
                <span className="text-xl font-bold leading-7 tracking-[-0.1px] text-[#121c2a]">
                  Rp 420.000
                </span>
              </span>
              <ReceiptText className="h-[26px] w-[26px] shrink-0 text-[#2563eb]" aria-hidden="true" />
            </div>

            <div className="grid gap-3 py-5 sm:grid-cols-3">
              {SCOPE_OPTIONS.map((option) => {
                const Icon = option.icon
                const active = scope === option.id

                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-4 text-left transition-colors',
                      active
                        ? 'border-[#2563eb] bg-[#f8f9ff]'
                        : 'border-[#c3c6d766] bg-white hover:bg-[#f8f9ff]',
                    )}
                    key={option.id}
                    onClick={() => setScope(option.id)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border',
                        active ? 'border-transparent bg-[#2563eb]' : 'border-[#c3c6d7] bg-white',
                      )}
                    >
                      {active ? (
                        <Check className="h-3 w-3 text-white" aria-hidden="true" />
                      ) : null}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Icon
                          className="h-[15px] w-[15px] shrink-0 text-[#121c2a]"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                          {option.label}
                        </span>
                      </span>
                      <span className="text-[10px] leading-4 text-[#434655]">{option.note}</span>
                    </span>
                  </button>
                )
              })}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {CHANNEL_OPTIONS.map((option) => {
                const Icon = option.icon
                const active = channel === option.id

                return (
                  <button
                    aria-pressed={active}
                    className={cn(
                      'flex items-start gap-3 rounded-xl border p-4 text-left transition-colors',
                      active
                        ? 'border-[#2563eb] bg-[#f8f9ff]'
                        : 'border-[#c3c6d766] bg-white hover:bg-[#f8f9ff]',
                    )}
                    key={option.id}
                    onClick={() => setChannel(option.id)}
                    type="button"
                  >
                    <span
                      className={cn(
                        'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border',
                        active ? 'border-transparent bg-[#2563eb]' : 'border-[#c3c6d7] bg-white',
                      )}
                    >
                      {active ? (
                        <Check className="h-3 w-3 text-white" aria-hidden="true" />
                      ) : null}
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="flex items-center gap-2">
                        <Icon
                          className="h-[15px] w-[15px] shrink-0 text-[#121c2a]"
                          aria-hidden="true"
                        />
                        <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                          {option.label}
                        </span>
                      </span>
                      <span className="text-xs leading-4 text-[#434655]">{option.note}</span>
                      {option.badge ? (
                        <span className="mt-0.5 inline-flex w-fit rounded bg-[#007f361a] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                          {option.badge}
                        </span>
                      ) : null}
                      {option.account ? (
                        <span className="mt-0.5 inline-flex w-fit rounded bg-[#e6eeff] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                          {option.account}
                        </span>
                      ) : null}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#eff4ff] px-5 text-sm font-semibold leading-5 text-[#2563eb] transition-colors hover:bg-[#e2eaff]"
              type="button"
            >
              <Info className="h-4 w-4" aria-hidden="true" />
              Lihat Cara Pembayaran
            </button>
            <button
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-semibold leading-5 text-white shadow-[0px_4px_12px_#2563eb40] transition-colors hover:bg-[#1d4ed8]"
              type="button"
            >
              <Zap className="h-4 w-4" aria-hidden="true" />
              Bayar Sekarang
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
