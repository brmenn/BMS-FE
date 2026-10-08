import { useState, type FormEvent, type ReactNode } from 'react'
import { BadgeCheck, Banknote, Check, Clock, Download, Landmark, Send, Wallet } from 'lucide-react'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'

type WithdrawMethod = 'cash' | 'transfer'

const SALDO = 1_250_000
const MAX_AMOUNT = 1_250_000
const QUICK_AMOUNTS = [100_000, 250_000, 500_000, 1_000_000]

const TRACKING_STEPS: Array<{
  title: string
  description: string
  note?: string
  active: boolean
}> = [
  {
    title: 'MENUNGGU',
    description: 'Pengajuan Anda sedang diperiksa oleh Admin/Kasir BMS',
    note: 'Estimasi verifikasi ± 15 menit pada jam kerja sekolah.',
    active: true,
  },
  {
    title: 'DISETUJUI',
    description: 'Dana siap diambil di loket kasir / diproses transfer',
    active: false,
  },
  {
    title: 'SELESAI',
    description: 'Penarikan berhasil dicairkan dan dibukukan',
    active: false,
  },
]

export function PenarikanPage() {
  const [nominal, setNominal] = useState('1000000')
  const [method, setMethod] = useState<WithdrawMethod>('cash')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className="flex flex-col gap-6">
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
        className="relative w-full overflow-hidden rounded-2xl bg-[#1d4ed8] p-6 shadow-[0px_1px_2px_#0000000d]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-10 -right-8 h-48 w-48 rounded-full bg-white/5 blur-2xl"
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

          <div className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2.5">
            <BadgeCheck className="h-5 w-4 shrink-0 text-white" aria-hidden="true" />
            <span className="text-xs font-medium leading-4 tracking-[0.24px] text-white">
              Buku Kas Siswa Terverifikasi
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        <form
          className="flex flex-col gap-5 rounded-2xl border border-[#c3c6d74c] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1 border-b border-[#c3c6d733] pb-4">
            <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
              Formulir Pengajuan Dana
            </h2>
            <p className="text-xs leading-[18px] text-[#434655]">
              Lengkapi data nominal dan mekanisme pencairan dana.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <label className="text-sm font-medium leading-5 text-[#121c2a]" htmlFor="nominal">
              Nominal Penarikan <span className="text-[#ba1a1a]">*</span>
            </label>

            <div className="relative">
              <span
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-base font-semibold text-[#434655]"
              >
                Rp
              </span>
              <input
                aria-describedby="nominal-help"
                className="h-12 w-full rounded-xl border border-[#c3c6d799] bg-white pr-4 pl-12 text-xl font-semibold tracking-[-0.1px] text-[#121c2a] focus:border-[#2563eb] focus:outline-none"
                id="nominal"
                inputMode="numeric"
                max={MAX_AMOUNT}
                min={1}
                name="nominal"
                onChange={(event) => setNominal(event.target.value)}
                required
                step={1000}
                type="number"
                value={nominal}
              />
            </div>

            <div className="flex flex-col gap-2">
              <p className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]" id="nominal-help">
                Pilih Cepat Nominal:
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_AMOUNTS.map((amount) => (
                  <button
                    className={cn(
                      'rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-[0.24px] transition-colors',
                      Number(nominal) === amount
                        ? 'border-[#2563eb4c] bg-[#2563eb1a] text-[#2563eb]'
                        : 'border-[#c3c6d766] bg-[#eff4ff] text-[#121c2a] hover:bg-[#e0eaff]',
                    )}
                    key={amount}
                    onClick={() => setNominal(String(amount))}
                    type="button"
                  >
                    {formatMoney(amount)}
                  </button>
                ))}
                <button
                  className={cn(
                    'rounded-lg border px-3 py-1.5 text-xs font-semibold tracking-[0.24px] transition-colors',
                    Number(nominal) === MAX_AMOUNT
                      ? 'border-[#2563eb4c] bg-[#2563eb1a] text-[#2563eb]'
                      : 'border-[#c3c6d766] bg-[#eff4ff] text-[#004ac6] hover:bg-[#e0eaff]',
                  )}
                  onClick={() => setNominal(String(MAX_AMOUNT))}
                  type="button"
                >
                  Tarik Maksimal
                </button>
              </div>
            </div>
          </div>

          <fieldset className="flex flex-col gap-2 p-0">
            <legend className="p-0 text-sm font-medium leading-5 text-[#121c2a]">
              Metode Penarikan <span className="text-[#ba1a1a]">*</span>
            </legend>

            <div className="flex flex-col gap-3 pt-2">
              <MethodOption
                checked={method === 'cash'}
                description={
                  <>
                    Ambil di Loket Kasir BMS
                    <br />
                    Gedung 1
                  </>
                }
                icon={Banknote}
                label="Cash"
                badge="Cair Langsung di Sekolah"
                badgeClassName="bg-[#007f361a] text-[#006329]"
                name="metode-penarikan"
                onChange={() => setMethod('cash')}
                value="cash"
              />
              <MethodOption
                checked={method === 'transfer'}
                description={
                  <>
                    Kirim ke Rekening Bank
                    <br />
                    Terdaftar
                  </>
                }
                icon={Landmark}
                label="Transfer Bank"
                badge="BSI - 7109283921 (Ahmad Dahlan)"
                badgeClassName="bg-[#e6eeff] text-[#434655]"
                name="metode-penarikan"
                onChange={() => setMethod('transfer')}
                value="transfer"
              />
            </div>
          </fieldset>

          <button
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#2563eb] shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
            type="submit"
          >
            <Send className="h-4 w-4 text-white" aria-hidden="true" />
            <span className="text-sm font-semibold leading-5 text-white">Ajukan Penarikan</span>
          </button>
        </form>

        <section
          aria-labelledby="tracking-title"
          className="flex flex-col gap-6 rounded-2xl border border-[#c3c6d74c] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]"
        >
          <div className="flex flex-col gap-1.5 border-b border-[#c3c6d733] pb-4">
            <p className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#2563eb]">
              STATUS TERKINI
            </p>
            <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]" id="tracking-title">
              Pelacakan Penarikan Dana
            </h2>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c3c6d74c] bg-[#eff4ff] p-3.5">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                Kode Referensi Transaksi
              </span>
              <span className="font-mono text-sm font-bold leading-5 text-[#121c2a]">
                TRX-WD-20261001-042
              </span>
            </div>
            <span className="rounded-md border border-[#c3c6d766] bg-white px-2.5 py-1 text-[11px] font-semibold tracking-[0.44px] text-[#434655]">
              12 Menit lalu
            </span>
          </div>

          <ol className="relative flex flex-col gap-8">
            <span
              aria-hidden="true"
              className="absolute top-2 bottom-2 left-3.5 w-0.5 rounded-full bg-[#c3c6d74c]"
            />
            {TRACKING_STEPS.map((step) => (
              <li className="relative flex flex-col gap-1.5 pl-9" key={step.title}>
                <span
                  aria-label={step.active ? 'Status menunggu' : `Status ${step.title.toLowerCase()}`}
                  className={cn(
                    'absolute top-0 left-0 flex h-7 w-7 items-center justify-center rounded-full',
                    step.active
                      ? 'bg-[#2563eb] shadow-[0px_0px_0px_4px_#2563eb33]'
                      : 'border-2 border-[#c3c6d766] bg-[#d9e3f6]',
                  )}
                >
                  {step.active ? (
                    <Clock className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                  ) : (
                    <Check className="h-3.5 w-3.5 text-[#434655]" aria-hidden="true" />
                  )}
                </span>

                {step.active ? (
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold leading-5 text-[#2563eb]">{step.title}</span>
                    <span className="rounded bg-[#2563eb1a] px-2 py-0.5 text-[11px] font-semibold tracking-[0.44px] text-[#2563eb]">
                      Aktif
                    </span>
                  </div>
                ) : (
                  <span className="text-sm font-semibold leading-5 text-[#434655]">
                    {step.title}
                  </span>
                )}

                <p
                  className={cn(
                    step.active
                      ? 'text-sm leading-[19.2px] text-[#121c2a]'
                      : 'text-xs leading-[16.5px] text-[#737686]',
                  )}
                >
                  {step.description}
                </p>
                {step.note ? (
                  <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                    {step.note}
                  </p>
                ) : null}
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-2 border-t border-[#c3c6d733] pt-2">
            <button
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#c3c6d766] bg-white transition-colors hover:bg-[#f8f9ff]"
              type="button"
            >
              <Download className="h-3 w-3 text-[#121c2a]" aria-hidden="true" />
              <span className="text-sm font-medium leading-5 text-[#121c2a]">
                Unduh Bukti Pengajuan
              </span>
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}

function MethodOption({
  checked,
  label,
  description,
  badge,
  badgeClassName,
  icon: Icon,
  name,
  value,
  onChange,
}: {
  checked: boolean
  label: string
  description: ReactNode
  badge: string
  badgeClassName: string
  icon: typeof Banknote
  name: string
  value: string
  onChange: () => void
}) {
  return (
    <label
      className="flex cursor-pointer items-start gap-3 rounded-xl border border-[#c3c6d766] bg-white p-4 transition-colors focus-within:outline-2 focus-within:outline-[#2563eb] focus-within:outline-offset-2"
    >
      <input
        checked={checked}
        className="sr-only"
        name={name}
        onChange={onChange}
        type="radio"
        value={value}
      />
      <span
        aria-hidden="true"
        className={cn(
          'mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border',
          checked
            ? 'border-[#2563eb] bg-[#2563eb] shadow-[inset_0_0_0_4px_#ffffff]'
            : 'border-[#c3c6d7] bg-white',
        )}
      >
        {checked ? <Check className="h-2.5 w-2.5 text-white" /> : null}
      </span>

      <span className="flex min-w-0 flex-col gap-1.5">
        <span className="flex items-center gap-2">
          <Icon className="h-[15px] w-[15px] shrink-0 text-[#121c2a]" aria-hidden="true" />
          <span className="text-sm font-semibold leading-5 text-[#121c2a]">{label}</span>
        </span>
        <span className="text-xs leading-[16.5px] text-[#434655]">{description}</span>
        <span
          className={cn(
            'self-start rounded px-2 py-0.5 text-[11px] font-semibold tracking-[0.44px]',
            badgeClassName,
          )}
        >
          {badge}
        </span>
      </span>
    </label>
  )
}
