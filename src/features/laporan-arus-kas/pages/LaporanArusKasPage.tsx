import { useState } from 'react'
import {
  Calendar,
  ChevronDown,
  Download,
  FileText,
  Filter,
  RefreshCw,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatMoney } from '@/lib/format'
import {
  CASH_FLOW_TRANSACTIONS,
  type CashFlowTransaction,
} from '@/features/laporan-arus-kas/data/transactions'
import { TransactionDetailModal } from '../components/TransactionDetailModal'

export function LaporanArusKasPage() {
  const [selectedTransaction, setSelectedTransaction] = useState<CashFlowTransaction | null>(null)

  const totalMasuk = 125000000
  const totalKeluar = 40000000
  const totalTabungan = 85000000

  return (
    <div className="flex w-full flex-col gap-6 p-4 sm:p-8 lg:px-16 lg:pb-16 bg-[#f8f9ff]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold tracking-[-0.6px] text-[#121c2a]">
            Laporan Arus Kas
          </h1>
          <p className="text-sm text-[#737686]">
            Lihat seluruh transaksi arus kas berdasarkan periode dan kelompok kas.
          </p>
        </div>
        <button
          className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#2563eb] px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#1d4ed8]"
          type="button"
        >
          <Download className="h-4 w-4" />
          Download Rekap
          <ChevronDown className="h-3 w-3 opacity-80" />
        </button>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-xs print:hidden">
        <div className="flex items-center justify-between border-b border-[#c3c6d7] pb-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-[#121c2a]" />
            <h2 className="text-base font-semibold text-[#121c2a]">Filter Laporan Kas</h2>
          </div>
          <span className="text-[11px] font-semibold tracking-[0.55px] text-[#737686]">
            PARAMETER AUDIT
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#121c2a]">Periode Tanggal</label>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#737686]" />
                <input
                  type="text"
                  defaultValue="01/10/2026"
                  className="h-11 w-full rounded-xl border border-[#c3c6d7] bg-white pr-3 pl-9 text-sm text-[#121c2a] focus:border-[#2563eb] focus:outline-hidden"
                />
              </div>
              <span className="text-[#737686]">-</span>
              <div className="relative flex-1">
                <Calendar className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-[#737686]" />
                <input
                  type="text"
                  defaultValue="31/10/2026"
                  className="h-11 w-full rounded-xl border border-[#c3c6d7] bg-white pr-3 pl-9 text-sm text-[#121c2a] focus:border-[#2563eb] focus:outline-hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#121c2a] text-center sm:text-left">
              Kelompok Kas
            </label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-xl border border-[#c3c6d7] bg-white px-3 pr-10 text-sm text-[#121c2a] focus:border-[#2563eb] focus:outline-hidden">
                <option>Semua Kelompok</option>
                <option>Siswa</option>
                <option>Guru & Karyawan</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#121c2a] text-center sm:text-left">
              Kategori Transaksi
            </label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-xl border border-[#c3c6d7] bg-white px-3 pr-10 text-sm text-[#121c2a] focus:border-[#2563eb] focus:outline-hidden">
                <option>Semua Kategori</option>
                <option>Setoran</option>
                <option>Cicilan</option>
                <option>Penarikan</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#121c2a] text-center sm:text-left">
              Metode Pembayaran
            </label>
            <div className="relative">
              <select className="h-11 w-full appearance-none rounded-xl border border-[#c3c6d7] bg-white px-3 pr-10 text-sm text-[#121c2a] focus:border-[#2563eb] focus:outline-hidden">
                <option>Semua Metode</option>
                <option>Cash / Tunai</option>
                <option>Transfer</option>
              </select>
              <ChevronDown className="absolute top-1/2 right-3.5 h-4 w-4 -translate-y-1/2 text-[#737686] pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-[#c3c6d7] pt-4">
          <button
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            type="button"
          >
            Reset
          </button>
          <button
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#2563eb] px-6 text-sm font-medium text-white shadow-xs transition-colors hover:bg-[#1d4ed8]"
            type="button"
          >
            <Filter className="h-4 w-4" />
            Terapkan Filter
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* TOTAL PEMASUKAN */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#00b01a] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold tracking-[0.55px] text-[#00af1a]">
              TOTAL PEMASUKAN
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00b01a]/10">
              <TrendingUp className="h-5 w-5 text-[#00af1a]" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 z-10">
            <strong className="text-3xl font-bold tracking-[-0.9px] text-[#121c2a]">
              {formatMoney(totalMasuk)}
            </strong>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-[#006329]/10 px-2 py-0.5 text-[11px] font-semibold text-[#006329]">
                <ShieldCheck className="h-3 w-3" />
                Tercatat
              </span>
              <span className="text-xs text-[#737686]">Periode 01 - 31 Okt 2026</span>
            </div>
          </div>
          {/* Hiasan Bulatan Seperempat (Pojok Kanan Bawah) */}
          <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#00b01a]/20 pointer-events-none" />
        </div>

        {/* TOTAL TABUNGAN */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold tracking-[0.55px] text-[#4f5c8e]">
              TOTAL TABUNGAN
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10">
              <Wallet className="h-5 w-5 text-[#2563eb]" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 z-10">
            <strong className="text-3xl font-bold tracking-[-0.9px] text-[#4f5c8e]">
              {formatMoney(totalTabungan)}
            </strong>
            <div className="flex items-center gap-2 text-xs text-[#4f5c8e]">
              <span>Kontribusi setoran tabungan</span>
            </div>
          </div>
          {/* Hiasan Bulatan Seperempat (Pojok Kanan Bawah) */}
          <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#eff4ff] opacity-80 pointer-events-none" />
        </div>

        {/* TOTAL PENGELUARAN */}
        <div className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-[#ba1a1a] bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between z-10">
            <span className="text-[11px] font-semibold tracking-[0.55px] text-[#ba1a1a]">
              TOTAL PENGELUARAN
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#ba1a1a]/10">
              <TrendingDown className="h-5 w-5 text-[#ba1a1a]" />
            </div>
          </div>
          <div className="mt-4 flex flex-col gap-2 z-10">
            <strong className="text-3xl font-bold tracking-[-0.9px] text-[#121c2a]">
              {formatMoney(totalKeluar)}
            </strong>
            <div className="flex items-center gap-2 text-xs text-[#737686]">
              <span>Simpanan & angsuran pegawai</span>
            </div>
          </div>
          {/* Hiasan Bulatan Seperempat (Pojok Kanan Bawah) */}
          <div className="absolute -right-14 -bottom-14 h-28 w-28 rounded-full bg-[#ba1a1a]/20 pointer-events-none" />
        </div>
      </div>

      {/* Section 1: Tabel Jurnal Transaksi */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#c3c6d7] p-6">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-[#121c2a]">Daftar Jurnal Transaksi Arus Kas</h3>
            <span className="inline-flex items-center rounded-full bg-[#eff4ff] px-2.5 py-0.5 text-[11px] font-semibold text-[#004ac6] border border-[#c3c6d7]">
              Live Data
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#c3c6d7] bg-white px-3 text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
              type="button"
            >
              <FileText className="h-3.5 w-3.5 text-[#121c2a]" />
              Detail
            </button>
            <button
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-[#c3c6d7] bg-white px-3 text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
              type="button"
            >
              <Download className="h-3.5 w-3.5 text-[#121c2a]" />
              Download
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#c3c6d7] bg-[#eff4ff]">
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">NO</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">KODE</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">TANGGAL</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">KATEGORI</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">KELOMPOK</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">METODE</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#434655]">NOMINAL</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">PETUGAS</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-[#434655]">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {CASH_FLOW_TRANSACTIONS.map((row, index) => {
                const isPositive = row.direction === 'masuk'
                return (
                  <tr key={row.id} className="border-t border-[#c3c6d7] hover:bg-[#f8f9ff]">
                    <td className="px-6 py-5 text-sm font-medium text-[#737686]">{index + 1}</td>
                    <td className="px-6 py-5 font-mono text-sm font-bold text-[#004ac6]">{row.reference}</td>
                    <td className="px-6 py-5 text-sm text-[#121c2a] whitespace-nowrap">{row.bookedAt}</td>
                    <td className="px-6 py-5">
                      <span
                        className={cn(
                          'inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap',
                          isPositive
                            ? 'bg-[#006329]/10 text-[#006329]'
                            : 'bg-[#ba1a1a]/10 text-[#ba1a1a]',
                        )}
                      >
                        {row.transactionType}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="inline-flex rounded-full bg-[#eff4ff] px-3 py-1 text-xs font-semibold text-[#2563eb] border border-[#c3c6d7] whitespace-nowrap">
                        {row.group}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-[#121c2a] whitespace-nowrap">{row.methodLabel}</td>
                    <td
                      className={cn(
                        'px-6 py-5 text-right font-mono text-base font-bold whitespace-nowrap',
                        isPositive ? 'text-[#006329]' : 'text-[#ba1a1a]',
                      )}
                    >
                      {isPositive ? `+ ${formatMoney(row.amount)}` : `- ${formatMoney(row.amount)}`}
                    </td>
                    <td className="px-6 py-5 text-sm text-[#121c2a]">{row.officerName}</td>
                    <td className="px-6 py-5 text-center">
                      <button
                        onClick={() => setSelectedTransaction(row)}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-[#c3c6d7] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#004ac6] hover:bg-[#eff4ff] shadow-xs"
                        type="button"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        Detail
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-[#c3c6d7] px-6 py-4 bg-white">
          <p className="text-xs text-[#737686]">
            Halaman <span className="font-semibold text-[#121c2a]">1</span> dari <span className="font-semibold text-[#121c2a]">5</span> (Total {CASH_FLOW_TRANSACTIONS.length} Entri Kas)
          </p>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-9 items-center justify-center rounded-xl border border-[#c3c6d7] px-3 text-xs font-semibold text-[#737686] opacity-50"
              disabled
              type="button"
            >
              Sebelumnya
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2563eb] text-xs font-semibold text-white"
              type="button"
            >
              1
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
              type="button"
            >
              2
            </button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#c3c6d7] text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
              type="button"
            >
              3
            </button>
            <button
              className="inline-flex h-9 items-center justify-center rounded-xl border border-[#c3c6d7] px-3 text-xs font-semibold text-[#121c2a] hover:bg-[#f8f9ff]"
              type="button"
            >
              Selanjutnya
            </button>
          </div>
        </div>
      </div>

      {/* Section 2: Rekapitulasi Arus Kas & Saldo Saat Ini */}
      <div className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#c3c6d7] p-6">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2563eb]/10">
              <Wallet className="h-5 w-5 text-[#2563eb]" />
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-[#121c2a]">Rekapitulasi Arus Kas & Saldo Saat Ini</h3>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006329]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#006329] border border-[#006329]/30">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#006329]" />
                  Kas Seimbang
                </span>
              </div>
              <p className="text-xs text-[#737686]">
                Rangkuman perbandingan total pemasukan, total pengeluaran, dan sisa saldo kas aktif di seluruh pos kas.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-2 rounded-xl border border-[#c3c6d7] bg-[#eff4ff] px-3 py-1.5 text-xs font-semibold text-[#737686]">
            <Calendar className="h-4 w-4 text-[#2563eb]" />
            Audit Kasir: 31 Okt 2026
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-[#c3c6d7] bg-[#eff4ff]">
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">NO</th>
                <th className="px-6 py-4 text-xs font-bold text-[#434655]">KOMPONEN POS / AKUN KAS</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#434655] whitespace-nowrap">TOTAL PEMASUKAN<br />(DEBIT)</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#434655] whitespace-nowrap">TOTAL PENGELUARAN<br />(KREDIT)</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-[#434655] whitespace-nowrap">JUMLAH KAS SAAT INI<br />(SALDO AKHIR)</th>
                <th className="px-6 py-4 text-center text-xs font-bold text-[#434655] whitespace-nowrap">STATUS<br />REKONSILIASI</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#c3c6d7] hover:bg-[#f8f9ff]">
                <td className="px-6 py-6 text-sm font-medium text-[#737686]">1</td>
                <td className="px-6 py-6 w-[320px]">
                  <div className="flex items-center gap-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-[#121c2a] leading-tight">Kas Tabungan & Setoran Siswa</span>
                      <span className="text-xs text-[#737686] leading-tight">Akun No: 101.01 • Simpanan & Biaya Siswa</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-mono text-base font-bold text-[#006329] whitespace-nowrap">Rp 85.000.000</td>
                <td className="px-6 py-6 text-right font-mono text-base font-bold text-[#ba1a1a] whitespace-nowrap">Rp 23.500.000</td>
                <td className="px-6 py-6 text-right font-mono text-lg font-bold text-[#004ac6] whitespace-nowrap">Rp 61.500.000</td>
                <td className="px-6 py-6 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006329]/10 px-3 py-1 text-xs font-semibold text-[#006329]">
                    <ShieldCheck className="h-4 w-4" />
                    Terverifikasi
                  </span>
                </td>
              </tr>
              <tr className="border-b border-[#c3c6d7] hover:bg-[#f8f9ff]">
                <td className="px-6 py-6 text-sm font-medium text-[#737686]">2</td>
                <td className="px-6 py-6 w-[320px]">
                  <div className="flex items-center gap-0">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-[#121c2a] leading-tight">Kas Simpan Pinjam Guru & Pegawai</span>
                      <span className="text-xs text-[#737686] leading-tight">Akun No: 101.02 • Payroll & Cicilan Pegawai</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-mono text-base font-bold text-[#006329] whitespace-nowrap">Rp 40.000.000</td>
                <td className="px-6 py-6 text-right font-mono text-base font-bold text-[#ba1a1a] whitespace-nowrap">Rp 15.000.000</td>
                <td className="px-6 py-6 text-right font-mono text-lg font-bold text-[#004ac6] whitespace-nowrap">Rp 25.000.000</td>
                <td className="px-6 py-6 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#006329]/10 px-3 py-1 text-xs font-semibold text-[#006329]">
                    <ShieldCheck className="h-4 w-4" />
                    Terverifikasi
                  </span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr className="bg-[#eff4ff]/90 border-t-2 border-[#004ac6]/30">
                <td className="px-6 py-6 text-sm font-bold text-[#004ac6]" colSpan={2}>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                    <span className="text-base font-bold text-[#004ac6]">TOTAL KESELURUHAN (GRAND TOTAL)</span>
                    <span className="text-xs text-[#737686] font-normal">(2 Akun Rekening Kas Sekolah)</span>
                  </div>
                </td>
                <td className="px-6 py-6 text-right font-mono text-lg font-bold text-[#006329] whitespace-nowrap">Rp 125.000.000</td>
                <td className="px-6 py-6 text-right font-mono text-lg font-bold text-[#ba1a1a] whitespace-nowrap">Rp 38.500.000</td>
                <td className="px-6 py-6 text-right font-mono text-xl font-bold text-[#004ac6] whitespace-nowrap">Rp 86.500.000</td>
                <td className="px-6 py-6 text-center whitespace-nowrap">
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-[#2563eb] px-3.5 py-1.5 text-xs font-bold text-white shadow-xs">
                    <RefreshCw className="h-3.5 w-3.5" />
                    Seimbang
                  </span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {selectedTransaction ? (
        <TransactionDetailModal
          onClose={() => setSelectedTransaction(null)}
          transaction={selectedTransaction}
        />
      ) : null}
    </div>
  )
}
