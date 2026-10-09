import { useState } from 'react'
import {
  Banknote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Coins,
  Download,
  FileCheck2,
  FileText,
  Landmark,
  Printer,
  QrCode,
  Search,
  TriangleAlert,
  X,
  type LucideIcon,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { BayarCicilanModal } from '@/features/pinjaman/components/BayarCicilanModal'

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

  return (
    <div className="flex flex-col gap-6">
      <h1 className="sr-only">Pembayaran Pinjaman</h1>

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

      {selected ? <ReceiptModal row={selected} onClose={() => setSelected(null)} /> : null}

      {payOpen ? <BayarCicilanModal onClose={() => setPayOpen(false)} /> : null}
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
        <table className="w-full min-w-[760px] border-collapse text-left">
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

function ReceiptModal({ row, onClose }: { row: InstallmentRow; onClose: () => void }) {
  return (
    <div
      aria-labelledby="receipt-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup bukti transaksi"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex shrink-0 items-center justify-between gap-3 bg-[#004ac6] px-4 py-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="h-[18px] w-[18px] shrink-0 text-white" aria-hidden="true" />
            <p className="text-base font-semibold leading-6 text-white" id="receipt-title">
              Bukti Transaksi
              <br />
              Resmi
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded bg-white/20 px-2 py-1 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-white">
              TERVALIDASI
            </span>
            <button
              aria-label="Tutup"
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15 text-white transition-colors hover:bg-white/30"
              onClick={onClose}
              type="button"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ReceiptContent row={row} />
        </div>

        <div className="shrink-0 bg-[#e6eeff] px-4 py-3 text-center">
          <p className="text-xs leading-4 text-[#434655]">
            Dokumen ini merupakan bukti pembayaran sah yang dikeluarkan oleh Kasir Keuangan SMKS
            Muhammadiyah 1 Genteng.
          </p>
        </div>
      </div>
    </div>
  )
}

function ReceiptContent({ row }: { row: InstallmentRow }) {
  const receiptRows = buildReceiptRows(row)

  return (
    <div className="relative flex flex-col items-center gap-2 px-6 pt-3 pb-4">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-5"
      >
        <span className="inline-block -rotate-[25deg] rounded-3xl border-8 border-[#004ac6] p-4 text-4xl font-bold tracking-[-0.72px] text-[#004ac6]">
          LUNAS
        </span>
      </span>

      <img
        alt="Logo Bank Mini Sekolah"
        aria-hidden="true"
        className="h-20 w-auto max-w-[210px] object-contain"
        src="/logoKet.png"
      />

      <div className="flex w-full flex-col items-center gap-1 border-b-2 border-dashed border-[#c3c6d799] pb-4 text-center">
        <p className="text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#121c2a]">
          SMKS MUHAMMADIYAH 1 GENTENG
        </p>
        <p className="text-[10px] leading-[15px] text-[#434655]">
          Jl. KH. Ahmad Dahlan No. 9, Genteng, Banyuwangi
        </p>
        <span className="mt-1 rounded-md bg-[#e6eeff] px-3 py-1 text-xs font-bold leading-4 tracking-[0.6px] text-[#121c2a]">
          BUKTI TRANSAKSI
        </span>
      </div>

      <dl className="flex w-full flex-col gap-2.5 border-b-2 border-dashed border-[#c3c6d799] pb-4">
        {receiptRows.map((item) => (
          <div className="flex items-start justify-between gap-4" key={item.label}>
            <dt className="shrink-0 text-xs leading-[18px] text-[#434655]">{item.label}</dt>
            <dd
              className={cn(
                'text-right text-xs leading-[18px]',
                item.mono && 'font-mono',
                item.accent
                  ? 'text-base font-bold leading-6 text-[#004ac6]'
                  : 'font-semibold text-[#121c2a]',
              )}
            >
              {item.value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="flex w-full items-center justify-between gap-3">
        <div className="flex flex-col items-center gap-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#7ffc97] px-3 py-1">
            <CircleCheck className="h-3 w-3 text-[#002109]" aria-hidden="true" />
            <span className="text-xs font-bold leading-4 tracking-[0.6px] text-[#002109]">
              BERHASIL
            </span>
          </span>
          <span className="font-mono text-[10px] leading-[15px] text-[#737686]">
            ID: BMS-M1G-OK
          </span>
        </div>

        <div className="flex flex-col items-center gap-1">
          <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-[#c3c6d799] p-1">
            <QrCode className="h-10 w-10 text-[#121c2a]" aria-hidden="true" />
          </span>
          <span className="text-[9px] leading-[13.5px] text-[#737686]">Sah Bendahara</span>
        </div>
      </div>

      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004ac6] py-3 text-base font-semibold leading-6 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#0040b3]"
        type="button"
      >
        <Printer className="h-4 w-4 text-white" aria-hidden="true" />
        CETAK RESI
      </button>
    </div>
  )
}

function buildReceiptRows(row: InstallmentRow): Array<{
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}> {
  return [
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
  ]
}