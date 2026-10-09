import { useState, type FormEvent } from 'react'
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  Info,
  RefreshCw,
  Send,
  Wallet,
} from 'lucide-react'
import { formatMoney, formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'
import { DashboardSidebar } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import {
  WithdrawalDetailModal,
  type WithdrawalRecord,
  type WithdrawalStatus,
} from '../components/WithdrawalDetailModal'

const SALDO = 1_250_000
const QUICK_AMOUNTS = [50_000, 100_000, 200_000, 500_000]

const RIWAYAT: WithdrawalRecord[] = [
  {
    id: 'WD-20260928-001',
    amount: 100_000,
    status: 'MENUNGGU',
    dateTime: '2026-09-28T11:00:00+07:00',
    dateLabel: '28 Sep 2026, 11:00 WIB',
    note: 'Pengajuan dalam antrean verifikasi kasir.',
  },
  {
    id: 'WD-20260925-004',
    amount: 150_000,
    status: 'DISETUJUI',
    dateTime: '2026-09-25T09:30:00+07:00',
    dateLabel: '25 Sep 2026, 09:30 WIB',
    note: 'Disetujui Admin — Silakan ambil di kasir',
  },
  {
    id: 'WD-20260920-002',
    amount: 50_000,
    status: 'SELESAI',
    dateTime: '2026-09-20T14:15:00+07:00',
    dateLabel: '20 Sep 2026, 14:15 WIB',
    note: 'Dana telah diterima oleh siswa',
  },
]

const STATUS_STYLES: Record<WithdrawalStatus, string> = {
  MENUNGGU: 'border-[#fcd34d] bg-[#fef3c7] text-[#92400e]',
  DISETUJUI: 'border-[#93c5fd] bg-[#dbeafe] text-[#1e40af]',
  SELESAI: 'border-[#6ee7b7] bg-[#d1fae5] text-[#065f46]',
}

export function StudentPenarikanPage() {
  const [nominal, setNominal] = useState('100000')
  const [selectedRecord, setSelectedRecord] = useState<WithdrawalRecord | null>(null)

  const handleAmountChange = (value: string) => {
    setNominal(value.replace(/\D/g, '').slice(0, 9))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar logo />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar
          brand={
            <div className="flex min-w-0 items-center gap-2">
              <Wallet className="h-[18px] w-[22px] shrink-0 text-[#121c2a]" aria-hidden="true" />
              <p className="truncate text-base font-bold tracking-[-0.5px] text-[#121c2a] sm:text-xl sm:leading-7">
                BMS Siswa&nbsp;&nbsp;|&nbsp;&nbsp;SMKS Muhammadiyah 1 Genteng
              </p>
            </div>
          }
        />
        <main className="flex w-full max-w-[1280px] flex-col gap-6 p-6">
          <section className="flex flex-col gap-1" aria-labelledby="page-title">
            <h1
              className="text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]"
              id="page-title"
            >
              Penarikan
            </h1>
            <p className="text-base leading-6 text-[#434655]">
              Ajukan penarikan dari saldo tabunganmu
            </p>
          </section>

          <section
            aria-labelledby="saldo-title"
            className="relative w-full overflow-hidden rounded-2xl bg-[#2563eb] p-6 shadow-[0px_1px_2px_#0000000d]"
          >
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 rounded-full bg-white/5 blur-[20px]"
            />
            <div className="relative flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Wallet className="h-[18px] w-[19px] shrink-0 text-white" aria-hidden="true" />
                  <p className="text-sm font-medium leading-5 text-[#eeefffcc]" id="saldo-title">
                    Saldo Tersedia untuk Penarikan
                  </p>
                </div>
                <p className="text-[32px] font-bold leading-10 tracking-[-0.8px] text-white">
                  {formatMoney(SALDO)}
                </p>
                <p className="text-xs leading-[18px] text-[#eeefffe6]">
                  Maksimal penarikan tunai per pengajuan sesuai saldo aktif
                </p>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-[2px]">
                <BadgeCheck className="h-5 w-4 shrink-0 text-white" aria-hidden="true" />
                <span className="text-xs font-medium leading-4 tracking-[0.24px] text-white">
                  Buku Kas Siswa Terverifikasi
                </span>
              </div>
            </div>
          </section>

          <div className="grid gap-6 lg:grid-cols-12">
            <section
              aria-labelledby="withdraw-title"
              className="flex flex-col gap-5 rounded-xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d] lg:col-span-5"
            >
              <div className="flex items-center gap-2.5 border-b border-[#c3c6d7] pb-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#eff4ff]">
                  <Banknote className="h-4 w-4 text-[#004ac6]" aria-hidden="true" />
                </span>
                <h2 className="text-base font-semibold leading-6 text-[#121c2a]" id="withdraw-title">
                  Ajukan Penarikan
                </h2>
              </div>

              <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium leading-5 text-[#121c2a]" htmlFor="withdrawal-amount">
                    Nominal Penarikan
                  </label>
                  <div className="flex items-center overflow-hidden rounded-xl border border-[#c3c6d7] bg-white focus-within:border-[#2563eb]">
                    <span className="pl-4 pr-2 text-base font-semibold text-[#434655]" aria-hidden="true">
                      Rp
                    </span>
                    <input
                      aria-describedby="amount-help"
                      className="min-w-0 flex-1 bg-transparent py-3 pr-4 text-base text-[#121c2a] outline-none"
                      id="withdrawal-amount"
                      inputMode="numeric"
                      name="withdrawal-amount"
                      onChange={(event) => handleAmountChange(event.target.value)}
                      required
                      type="text"
                      value={nominal ? formatNumber(nominal) : ''}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs leading-[18px] text-[#434655]" id="amount-help">
                      Kelipatan Rp 10.000
                    </span>
                    <button
                      className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#004ac6] hover:underline"
                      onClick={() => setNominal(String(SALDO))}
                      type="button"
                    >
                      Tarik Semua
                    </button>
                  </div>
                </div>

                <div
                  aria-label="Pilihan nominal cepat"
                  className="grid grid-cols-2 gap-2"
                  role="group"
                >
                  {QUICK_AMOUNTS.map((amount) => {
                    const active = Number(nominal) === amount
                    return (
                      <button
                        className={cn(
                          'rounded-lg border px-3 py-1.5 text-xs leading-[18px] transition-colors',
                          active
                            ? 'border-[#004ac6] bg-[#eff4ff] font-medium text-[#004ac6]'
                            : 'border-[#c3c6d7] text-[#121c2a] hover:bg-[#f8f9ff]',
                        )}
                        key={amount}
                        onClick={() => setNominal(String(amount))}
                        type="button"
                      >
                        {formatMoney(amount)}
                      </button>
                    )
                  })}
                </div>

                <button
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
                  type="submit"
                >
                  <Send className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Ajukan Penarikan</span>
                </button>
              </form>

              <div className="flex items-start gap-3 rounded-xl border border-[#c3c6d799] bg-[#e6eeff] p-3.5">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#004ac6]" aria-hidden="true" />
                <p className="text-xs leading-[19.5px] text-[#434655]">
                  Pengambilan uang tunai dilakukan langsung di loket Tata Usaha / Bank Mini Sekolah dengan
                  menunjukkan <strong className="font-bold text-[#121c2a]">Kartu Pelajar</strong> atau kode
                  verifikasi penarikan.
                </p>
              </div>
            </section>

            <section
              aria-labelledby="history-title"
              className="flex flex-col gap-4 rounded-xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d] lg:col-span-7"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 border-b border-[#c3c6d7] pb-4">
                <div className="flex flex-col gap-1">
                  <h2 className="text-base font-semibold leading-6 text-[#121c2a]" id="history-title">
                    Riwayat Pengajuan
                  </h2>
                  <p className="text-xs leading-[18px] text-[#434655]">
                    Pantau status verifikasi dan pencairan kasir
                  </p>
                </div>
                <div className="flex items-center gap-1 rounded-md bg-[#f8f9ff] px-2 py-1">
                  <RefreshCw className="h-[9px] w-[9px] text-[#737686]" aria-hidden="true" />
                  <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                    Update realtime
                  </span>
                </div>
              </div>

              <div className="flex flex-col">
                {RIWAYAT.map((record, index) => (
                  <article
                    className={cn(
                      'flex flex-wrap items-center justify-between gap-4 py-4',
                      index > 0 && 'border-t border-[#c3c6d7]',
                    )}
                    key={record.id}
                  >
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-lg font-bold leading-[26px] text-[#121c2a]">
                          {formatMoney(record.amount)}
                        </span>
                        <span
                          className={cn(
                            'inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px]',
                            STATUS_STYLES[record.status],
                          )}
                        >
                          {record.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xs leading-[18px] text-[#737686]">
                          {record.id}
                        </span>
                        <span aria-hidden="true" className="text-xs text-[#737686]">
                          •
                        </span>
                        <time className="text-xs leading-[18px] text-[#737686]" dateTime={record.dateTime}>
                          {record.dateLabel}
                        </time>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {record.status !== 'MENUNGGU' ? (
                          <CheckCircle2
                            aria-hidden="true"
                            className={cn(
                              'h-3 w-3 shrink-0',
                              record.status === 'SELESAI' ? 'text-[#006329]' : 'text-[#004ac6]',
                            )}
                          />
                        ) : null}
                        <p
                          className={cn(
                            'text-xs leading-[18px]',
                            record.status === 'SELESAI'
                              ? 'text-[#006329]'
                              : record.status === 'DISETUJUI'
                                ? 'font-medium text-[#004ac6]'
                                : 'text-[#737686]',
                          )}
                        >
                          {record.note}
                        </p>
                      </div>
                    </div>

                    {record.status === 'SELESAI' ? (
                      <button
                        className="flex items-center gap-1.5 rounded-xl bg-[#eff4ff] px-4 py-2 text-sm font-medium leading-5 text-[#004ac6] transition-colors hover:bg-[#e0eaff]"
                        onClick={() => setSelectedRecord(record)}
                        type="button"
                      >
                        <Banknote className="h-4 w-4 shrink-0" aria-hidden="true" />
                        <span>Detail Resi</span>
                      </button>
                    ) : (
                      <button
                        className={cn(
                          'rounded-xl border border-[#004ac6] px-4 py-2 text-sm font-medium leading-5 text-[#004ac6] transition-colors hover:bg-[#f8f9ff]',
                          record.status === 'MENUNGGU' && 'bg-white',
                        )}
                        onClick={() => setSelectedRecord(record)}
                        type="button"
                      >
                        Lihat Status
                      </button>
                    )}
                  </article>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>

      {selectedRecord ? (
        <WithdrawalDetailModal onClose={() => setSelectedRecord(null)} record={selectedRecord} />
      ) : null}
    </div>
  )
}
