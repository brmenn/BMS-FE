import { useState } from 'react'
import {
  Banknote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Coins,
  Download,
  FileText,
  Landmark,
  Search,
  TriangleAlert,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BayarCicilanModal } from '@/components/roles/guru/BayarCicilanModal'
import { ReceiptModal } from '@/components/roles/guru/ReceiptModal'
import type { ReceiptData } from '@/components/roles/guru/receipt-data'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'

interface PaymentMethod {
  label: string
  icon: LucideIcon
}

interface InstallmentRow {
  cicilan: string
  code: string
  date: string
  nominal: string
  method: PaymentMethod
  denda?: { note: string; extra: string; green: string }
}

const INSTALLMENTS: InstallmentRow[] = [
  {
    cicilan: 'Cicilan 01',
    code: 'TRX-20261001-001',
    date: '10 Mei 2026',
    nominal: 'Rp 420.000',
    method: { label: 'Transfer BSI', icon: Landmark },
  },
  {
    cicilan: 'Cicilan 02',
    code: 'TRX-20260610-002',
    date: '10 Jun 2026',
    nominal: 'Rp 420.000',
    method: { label: 'Cash (Kasir)', icon: Banknote },
  },
  {
    cicilan: 'Cicilan 03',
    code: 'TRX-20260710-003',
    date: '10 Jul 2026',
    nominal: 'Rp 420.000',
    method: { label: 'Transfer BSI', icon: Landmark },
  },
  {
    cicilan: 'Cicilan 04',
    code: 'TRX-20260822-004',
    date: '22 Agu 2026',
    nominal: 'Rp 420.000',
    method: { label: 'Transfer BSI', icon: Landmark },
    denda: { note: 'Denda keterlambatan terbayar', extra: '+ Denda Rp 15.000', green: '(Lunas)' },
  },
]

export function PembayaranPinjamanPage() {
  const [selected, setSelected] = useState<InstallmentRow | null>(null)
  const [payOpen, setPayOpen] = useState(false)
  const loading = useSimulatedLoading()

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Pembayaran Pinjaman</h1>

      {loading ? (
        <PageSkeleton variant="detail" />
      ) : (
        <>

      <section
        aria-labelledby="tagihan-heading"
        className="flex flex-col gap-4 overflow-hidden rounded-2xl border-2 border-[#fca5a5] bg-[#fef2f2] p-6 shadow-[0px_4px_12px_#dc26260f]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#fecaca] pb-3">
          <div className="flex items-center gap-2">
            <TriangleAlert className="h-4 w-4 text-[#7f1d1d]" aria-hidden="true" />
            <h2
              className="text-base font-bold leading-6 tracking-[0.4px] text-[#7f1d1d]"
              id="tagihan-heading"
            >
              TAGIHAN MELEWATI TENGGAT WAKTU
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dc2626] px-2.5 py-1 shadow-[0px_1px_2px_#0000000d]">
            <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
            <span className="text-[11px] font-bold leading-[14px] tracking-[0.55px] text-white">
              TERLAMBAT 5 HARI
            </span>
          </span>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <OverdueInfo label="Informasi Pinjaman" value="Cicilan ke-8" note="Nomor: #PJ-2026-001" />
          <OverdueInfo
            danger
            label="Batas Waktu Jatuh Tempo"
            value="10 September 2026"
            note="Keterlambatan: 5 hari"
          />
        </div>

        <div className="flex flex-col divide-y divide-[#c3c6d74c] rounded-xl border border-[#fca5a5cc] bg-white px-4 py-2 shadow-[0px_1px_2px_#0000000d]">
          <BreakdownRow label="Pokok Cicilan" value="Rp 400.000" />
          <BreakdownRow label="Total Bunga 1%" value="Rp 4.000" />
          <div className="flex items-center justify-between py-3">
            <span className="text-base font-bold leading-6 text-[#7f1d1d]">
              Total Tagihan Menunggak
            </span>
            <span className="text-xl font-bold leading-7 tracking-[-0.1px] text-[#dc2626]">
              Rp 404.000
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3">
          <button
            className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#dc2626] px-6 shadow-[0px_4px_12px_#dc262640] transition-colors hover:bg-[#b91c1c]"
            onClick={() => setPayOpen(true)}
            type="button"
          >
            <Banknote className="h-4 w-4 text-white" aria-hidden="true" />
            <span className="text-sm font-semibold leading-5 text-white">
              Bayar Cicilan Sekarang
            </span>
          </button>
        </div>
      </section>

      <section
        aria-labelledby="riwayat-heading"
        className="flex flex-col justify-between gap-4 rounded-2xl border border-[#c3c6d74c] bg-white p-6 shadow-[0px_1px_2px_#0000000d] sm:flex-row sm:items-center"
      >
        <div className="flex flex-col gap-1">
          <h2
            className="text-2xl font-semibold leading-8 tracking-[-0.24px] text-[#121c2a]"
            id="riwayat-heading"
          >
            Riwayat Pembayaran Pinjaman
          </h2>
          <p className="max-w-[672px] text-sm leading-5 text-[#434655]">
            Catatan rekapitulasi bukti setoran cicilan pinjaman Anda yang telah tervalidasi di
            sistem kasir/bendahara sekolah.
          </p>
        </div>

        <button
          className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl bg-[#004ac6] px-4 text-sm font-medium leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#0040b3] sm:self-center"
          type="button"
        >
          <Download className="h-3.5 w-3.5 text-white" aria-hidden="true" />
          Ekspor Rekap PDF
        </button>
      </section>

      <PaymentTable selected={selected} onSelect={setSelected} />

      {selected ? (
        <ReceiptModal data={buildInstallmentReceipt(selected)} onClose={() => setSelected(null)} />
      ) : null}

      {payOpen ? <BayarCicilanModal onClose={() => setPayOpen(false)} /> : null}
        </>
      )}
    </div>
  )
}

function OverdueInfo({
  label,
  value,
  note,
  danger = false,
}: {
  label: string
  value: string
  note: string
  danger?: boolean
}) {
  return (
    <div className="flex flex-col gap-1 rounded-xl border border-[#fca5a599] bg-white/80 p-3 backdrop-blur-sm">
      <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#7f1d1d]">
        {label}
      </span>
      <span className={cn('text-sm font-bold leading-5', danger ? 'text-[#dc2626]' : 'text-[#121c2a]')}>
        {value}
      </span>
      <span className={cn('text-xs leading-[18px]', danger ? 'text-[#b91c1c]' : 'text-[#737686]')}>
        {note}
      </span>
    </div>
  )
}

function BreakdownRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-xs leading-[18px] text-[#434655]">{label}</span>
      <span className="text-xs font-medium leading-[18px] text-[#121c2a]">{value}</span>
    </div>
  )
}

function PaymentTable({
  selected,
  onSelect,
}: {
  selected: InstallmentRow | null
  onSelect: (row: InstallmentRow) => void
}) {
  return (
    <section
      aria-labelledby="tabel-riwayat-heading"
      className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7e6] bg-white shadow-[0px_1px_2px_#0000000d]"
    >
      <h2 id="tabel-riwayat-heading" className="sr-only">
        Tabel riwayat pembayaran pinjaman
      </h2>

      <div className="flex flex-wrap items-center gap-2 border-b border-[#c3c6d74c] bg-[#f8f9ff] p-4">
        <FilterPill label="Dibayar / Lunas" />
        <FilterPill label="Tahun: 2026" />
        <div className="relative min-w-[200px] flex-1">
          <Search
            className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#737686]"
            aria-hidden="true"
          />
          <input
            aria-label="Cari no resi atau kode"
            className="h-10 w-full rounded-xl border border-[#c3c6d799] bg-white pl-10 pr-3 text-sm leading-5 text-[#121c2a] placeholder:text-[#737686] focus:border-[#2563eb] focus:outline-none"
            placeholder="Cari no resi / kode..."
            type="search"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c3c6d74c] bg-[#eff4ff] px-4 py-2.5">
        <span className="text-[13px] font-medium leading-5 text-[#434655]">
          Rekapitulasi Validasi:
        </span>
        <span className="text-[13px] font-semibold leading-5 text-[#004ac6]">
          Total Terbayar: Rp 1.260.000
          <span className="font-normal text-[#434655]"> (3 dari 24 Cicilan Terlunasi)</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="table-stagger w-full min-w-[760px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#c3c6d74c] bg-[#f8f9ff]">
              <th scope="col" className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                CICILAN
              </th>
              <th scope="col" className="px-4 py-3 text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                TANGGAL BAYAR
              </th>
              <th scope="col" className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                NOMINAL
              </th>
              <th scope="col" className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                METODE
              </th>
              <th scope="col" className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                STATUS
              </th>
              <th scope="col" className="px-4 py-3 text-center text-[10px] font-semibold tracking-[0.47px] text-[#434655]">
                AKSI
              </th>
            </tr>
          </thead>
          <tbody>
            {INSTALLMENTS.map((row) => (
              <InstallmentRowComponent
                key={row.cicilan}
                onSelect={() => onSelect(row)}
                row={row}
                selected={selected?.cicilan === row.cicilan}
              />
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#c3c6d74c] bg-[#f8f9ff] px-4 py-3">
        <span className="text-xs leading-[18px] text-[#434655]">
          Menampilkan 1 - 4 dari 4 transaksi tervalidasi
        </span>
        <div className="flex items-center gap-1.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c3c6d766] opacity-40">
            <ChevronLeft className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
          </span>
          <span className="flex h-7 items-center justify-center rounded-lg bg-[#004ac6] px-2.5 text-xs font-semibold leading-[18px] text-white">
            1
          </span>
          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#c3c6d766] opacity-40">
            <ChevronRight className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
          </span>
        </div>
      </div>
    </section>
  )
}

function FilterPill({ label }: { label: string }) {
  return (
    <button
      className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#c3c6d799] bg-white px-3.5 text-xs font-normal leading-[18px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
      type="button"
    >
      {label}
      <ChevronDown className="h-3.5 w-3.5 text-[#121c2a]" aria-hidden="true" />
    </button>
  )
}

function InstallmentRowComponent({
  row,
  selected,
  onSelect,
}: {
  row: InstallmentRow
  selected: boolean
  onSelect: () => void
}) {
  const MethodIcon = row.method.icon

  return (
    <tr
      className={cn(
        'border-b border-[#c3c6d733] last:border-b-0',
        selected && 'border-l-[3px] border-l-[#2563eb] bg-[#dbe1ff33]',
      )}
    >
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Coins
            className={cn('h-4 w-4 shrink-0', selected ? 'text-[#004ac6]' : 'text-[#737686]')}
            aria-hidden="true"
          />
          <span className="flex flex-col items-start">
            <span
              className={cn(
                'text-sm leading-5',
                selected ? 'font-semibold text-[#004ac6]' : 'font-medium text-[#121c2a]',
              )}
            >
              {row.cicilan}
            </span>
            {row.denda ? (
              <span className="text-[11px] leading-[14px] text-[#434655]">{row.denda.note}</span>
            ) : null}
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-sm leading-5 text-[#434655]">{row.date}</td>
      <td className="px-4 py-4 text-center">
        <div className="flex flex-col items-center">
          <span className="text-sm font-semibold leading-5 text-[#121c2a]">{row.nominal}</span>
          {row.denda ? (
            <span className="text-xs font-semibold leading-5 tracking-[0.38px] text-[#006329]">
              {row.denda.extra} <span className="font-normal">{row.denda.green}</span>
            </span>
          ) : null}
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center gap-1 rounded-md bg-[#e6eeff] px-2 py-1">
          <MethodIcon className="h-3 w-3 text-[#434655]" aria-hidden="true" />
          <span className="text-xs leading-[18px] whitespace-nowrap text-[#434655]">
            {row.method.label}
          </span>
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="inline-flex items-center rounded-full bg-[#7ffc97] px-2.5 py-0.5 text-[10px] font-bold leading-[14px] tracking-[0.24px] text-[#002109]">
          DIBAYAR
        </span>
      </td>
      <td className="px-4 py-4 text-center">
        <button
          className={cn(
            'inline-flex items-center gap-1 rounded-xl px-2.5 py-1.5 text-xs font-semibold leading-[18px] transition-colors',
            selected
              ? 'bg-[#004ac6] text-white shadow-[0px_1px_2px_#0000000d] hover:bg-[#0040b3]'
              : 'border border-[#c3c6d799] text-[#004ac6] hover:bg-[#f8f9ff]',
          )}
          onClick={onSelect}
          type="button"
        >
          <FileText className="h-3.5 w-3.5" aria-hidden="true" />
          Lihat Resi
        </button>
      </td>
    </tr>
  )
}

function buildInstallmentReceipt(row: InstallmentRow): ReceiptData {
  return {
    status: 'BERHASIL',
    watermark: 'LUNAS',
    rows: [
      { label: 'Kode', value: row.code, mono: true },
      { label: 'Nama', value: 'Drs. H. Ahmad Dahlan, M.Pd.' },
      { label: 'Role', value: 'Guru Tetap' },
      { label: 'Jenis', value: 'Pembayaran Cicilan' },
      { label: 'Pinjaman', value: 'PJ-2026-001', mono: true },
      { label: 'Cicilan', value: row.cicilan.replace('Cicilan', 'Ke-') },
      { label: 'Nominal', value: row.nominal, accent: true },
      { label: 'Metode', value: row.method.label },
      { label: 'Tanggal', value: row.date },
      { label: 'Petugas', value: 'Admin BMS (Kasir Ibu Siti)' },
    ],
  }
}