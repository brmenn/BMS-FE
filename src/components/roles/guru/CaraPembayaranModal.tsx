import {
  BookOpen,
  CardSim,
  CircleCheck,
  CreditCard,
  ListOrdered,
  Percent,
  Phone,
  PiggyBank,
  Scale,
  TriangleAlert,
  X,
} from 'lucide-react'

const SUMMARY_ITEMS = [
  { label: 'NAMA PEMINJAM', value: 'Drs. H. Ahmad Dahlan, M.Pd.', note: 'Guru Kejuruan AKL' },
  { label: 'TOTAL PINJAMAN', value: 'Rp 10.000.000', note: 'Plafon Disetujui' },
  { label: 'TENOR PINJAMAN', value: 'Maksimal 24 Bulan', note: 'Cicilan Fleksibel' },
  { label: 'SUKU BUNGA', value: '1% per Bulan', note: 'Flat Proposional' },
]

function OverviewPanel() {
  return (
    <div className="flex flex-col xl:flex-row xl:items-stretch rounded-xl border border-[#c3c6d74c] bg-[#eff4ff] p-4">
      <div className="grid gap-4 sm:grid-cols-2 xl:flex xl:flex-1">
        {SUMMARY_ITEMS.map((item, index) => (
          <div
            className={
              index === 0
                ? 'flex flex-col pr-3'
                : 'flex flex-col border-l border-[#c3c6d74c] px-3'
            }
            key={item.label}
          >
            <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#434655]">
              {item.label}
            </span>
            <span className="mt-0.5 text-xs font-semibold leading-[18px] text-[#121c2a]">
              {item.value}
            </span>
            <span className="text-[10px] leading-[15px] text-[#737686]">{item.note}</span>
          </div>
        ))}
      </div>
      <div className="mt-1.5 flex flex-col border-l border-[#c3c6d74c] py-1 pl-3 xl:mt-0">
        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#434655]">
          STATUS PINJAMAN
        </span>
        <span className="mt-2 inline-flex w-fit items-center gap-1 rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-2.5 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#047857]">
          <CircleCheck className="h-3 w-3" aria-hidden="true" />
          Aktif
        </span>
      </div>
    </div>
  )
}

function BreakdownRow({
  label,
  value,
  note,
  className,
}: {
  label: string
  value: string
  note?: string
  className?: string
}) {
  return (
    <div className={`flex items-center justify-between gap-2 ${className ?? ''}`}>
      <span className="text-[11px] leading-[18px] text-[#434655]">{label}</span>
      <span className="flex items-baseline gap-1 whitespace-nowrap">
        <span className="text-[11px] font-medium leading-[18px] text-[#121c2a]">{value}</span>
        {note ? (
          <span className="text-[10px] font-medium leading-[18px] text-[#737686]">{note}</span>
        ) : null}
      </span>
    </div>
  )
}

export function CaraPembayaranModal({ onClose }: { onClose: () => void }) {
  return (
    <div
      aria-labelledby="cara-pembayaran-title"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup tata cara pembayaran"
        className="absolute inset-0 cursor-default bg-[#121c2a]/55"
        onClick={onClose}
        type="button"
      />

      <div className="modal-enter relative flex max-h-[92vh] w-full max-w-[940px] flex-col overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white shadow-2xl">
        <div className="flex items-center justify-between gap-3 border-b border-[#c3c6d733] px-7 pb-4 pt-6">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#eff4ff] shadow-[0px_1px_2px_#0000000d]">
              <BookOpen className="h-[21px] w-[21px] text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex flex-col">
              <span className="text-lg font-bold leading-[26px] tracking-[-0.45px] text-[#121c2a]" id="cara-pembayaran-title">
                Cara Pembayaran Pinjaman
              </span>
              <p className="text-xs leading-[18px] text-[#434655]">
                Panduan pembayaran pinjaman guru dan karyawan BMS SMKS Muhammadiyah 1 Genteng
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-7 py-5">
          <OverviewPanel />

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
                <span className="text-base font-bold leading-6 text-[#121c2a]">
                  Pilihan Metode Pembayaran
                </span>
              </div>
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                Pilih salah satu metode pada setiap jadwal pembayaran
              </span>
            </div>

            <div className="grid items-stretch gap-3.5 lg:grid-cols-3">
              <div className="flex flex-col rounded-xl border-2 border-[#004ac666] bg-white p-4 shadow-[0px_1px_2px_#0000000d]">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex w-fit rounded-full bg-[#eff4ff] px-2.5 py-0.5 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                    Rekomendasi Pelunasan
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#004ac61a]">
                    <CardSim className="h-4 w-4 text-[#004ac6]" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-0.5">
                  <span className="text-base font-bold leading-6 text-[#121c2a]">
                    Bayar Pokok + Bunga
                  </span>
                  <p className="text-xs leading-[16.5px] text-[#434655]">
                    Pembayaran mencakup angsuran pokok pinjaman dan bunga yang berlaku pada periode
                    tersebut.
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-1.5 rounded-lg border border-[#c3c6d74c] bg-[#eff4ffb2] p-3">
                  <BreakdownRow label="Angsuran pokok:" note="(contoh)" value="Rp 500.000" />
                  <BreakdownRow label="Bunga ilustrasi:" value="Rp 100.000" />
                  <div className="flex items-center justify-between gap-2 border-t border-[#c3c6d74c] pt-1.5">
                    <span className="text-[11px] font-semibold leading-[18px] text-[#004ac6]">
                      Total pembayaran:
                    </span>
                    <span className="text-[13px] font-bold leading-[18px] text-[#004ac6]">
                      Rp 600.000
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="text-[11px] leading-[18px] text-[#737686]">
                      Sisa pokok setelah bayar:
                    </span>
                    <span className="text-[11px] font-semibold leading-[18px] text-[#121c2a]">
                      Rp 9.500.000
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  <div className="border-t border-[#c3c6d733] pt-2.5">
                    <p className="text-[11px] leading-[17.9px] text-[#434655]">
                      Pokok pinjaman berkurang sesuai nominal pokok yang dibayar. Bunga tetap
                      berjalan selama pokok pinjaman masih tersisa dan dihitung sesuai ketentuan
                      BMS.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-xl border border-[#fde68a] bg-white p-4 shadow-[0px_1px_2px_#0000000d]">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex w-fit rounded-full border border-[#fde68a] bg-[#fffbeb] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#92400e]">
                    Fleksibilitas Ringan
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fef3c7]">
                    <Percent className="h-4 w-4 text-[#b45309]" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-0.5">
                  <span className="text-base font-bold leading-6 text-[#121c2a]">
                    Bayar Bunga Saja
                  </span>
                  <p className="text-xs leading-[16.5px] text-[#434655]">
                    Pembayaran hanya mencakup bunga pinjaman pada periode tersebut tanpa membayar
                    pokok.
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-1.5 rounded-lg border border-[#fef3c7] bg-[#fffbeb80] p-3">
                  <BreakdownRow label="Pembayaran bunga:" note="(contoh)" value="Rp 100.000" />
                  <BreakdownRow label="Pembayaran pokok:" value="Rp 0" />
                  <div className="flex items-center justify-between gap-2 border-t border-[#fde68a99] pt-1.5">
                    <span className="text-[11px] font-semibold leading-[18px] text-[#92400e]">
                      Total pembayaran:
                    </span>
                    <span className="text-[13px] font-bold leading-[18px] text-[#92400e]">
                      Rp 100.000
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-2 pt-0.5">
                    <span className="text-[11px] font-medium leading-[18px] text-[#78350f]">
                      Sisa pokok pinjaman:
                    </span>
                    <span className="flex items-baseline gap-1">
                      <span className="text-[11px] font-bold leading-[18px] text-[#121c2a]">
                        Rp 10.000.000
                      </span>
                      <span className="text-[10px] font-bold leading-[18px] text-[#b45309]">
                        (Tetap)
                      </span>
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  <div className="flex flex-col gap-2 border-t border-[#c3c6d733] pt-2.5">
                    <p className="text-[11px] leading-[17.9px] text-[#434655]">
                      Pokok pinjaman tidak berkurang. Bunga tetap berjalan setiap bulan selama pokok
                      pinjaman belum lunas.
                    </p>
                    <div className="flex items-start gap-1.5 rounded-lg border border-[#fde68a] bg-[#fffbeb] p-2">
                      <TriangleAlert
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#b45309]"
                        aria-hidden="true"
                      />
                      <p className="text-[10.5px] leading-[13.1px] text-[#92400e]">
                        Pokok pinjaman belum berkurang. Bunga tetap berjalan selama pokok pinjaman
                        masih tersisa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col rounded-xl border border-[#a7f3d0] bg-white p-4 shadow-[0px_1px_2px_#0000000d]">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex w-fit rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#065f46]">
                    Potong Pokok
                  </span>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d1fae5]">
                    <PiggyBank className="h-4 w-4 text-[#059669]" aria-hidden="true" />
                  </span>
                </div>
                <div className="mt-3 flex flex-col gap-0.5">
                  <span className="text-base font-bold leading-6 text-[#121c2a]">
                    Bayar Pokok Saja
                  </span>
                  <p className="text-xs leading-[16.5px] text-[#434655]">
                    Pembayaran dialokasikan untuk mengurangi pokok pinjaman tanpa membayar bunga
                    dalam transaksi tersebut.
                  </p>
                </div>
                <div className="mt-3 flex flex-col gap-1.5 rounded-lg border border-[#d1fae5] bg-[#ecfdf580] p-3">
                  <BreakdownRow label="Pembayaran pokok:" note="(contoh)" value="Rp 500.000" />
                  <BreakdownRow label="Bunga transaksi:" value="Rp 0" />
                  <div className="flex items-center justify-between gap-2 border-t border-[#a7f3d099] pt-1.5">
                    <span className="text-[11px] font-semibold leading-[18px] text-[#065f46]">
                      Total pembayaran:
                    </span>
                    <span className="text-[13px] font-bold leading-[18px] text-[#065f46]">
                      Rp 500.000
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-2 pt-0.5">
                    <span className="text-[11px] leading-[18px] text-[#737686]">
                      Sisa pokok setelah bayar:
                    </span>
                    <span className="text-[11px] font-semibold leading-[18px] text-[#121c2a]">
                      Rp 9.500.000
                    </span>
                  </div>
                </div>
                <div className="mt-auto pt-3">
                  <div className="flex flex-col gap-2 border-t border-[#c3c6d733] pt-2.5">
                    <p className="text-[11px] leading-[17.9px] text-[#434655]">
                      Jika pokok pinjaman belum lunas, bunga tetap berjalan sesuai sisa pokok dan
                      ketentuan BMS. Jika seluruh pokok sudah dilunasi hingga Rp0, bunga terputus
                      sesuai ketentuan BMS.
                    </p>
                    <div className="rounded-r border-l-2 border-[#059669] bg-[#ecfdf5e6] px-2 py-1.5">
                      <p className="text-[10.5px] leading-[13.1px] text-[#064e3b]">
                        Bunga terputus setelah pokok pinjaman lunas. Jika pokok belum lunas, bunga
                        tetap berjalan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2.5 rounded-xl border border-[#c3c6d74c] bg-[#eff4ff99] p-4">
            <div className="flex items-center gap-2">
              <Scale className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
              <span className="text-sm font-bold leading-5 text-[#121c2a]">
                Prinsip &amp; Ketentuan Bunga Pinjaman BMS
              </span>
            </div>
            <div className="mt-0.5 grid gap-3.5 sm:grid-cols-2">
              <div className="flex items-start gap-2.5 rounded-lg border border-[#a7f3d0] bg-white p-2.5">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#059669]" aria-hidden="true" />
                <p className="text-xs font-medium leading-[15px] text-[#121c2a]">
                  Pokok pinjaman lunas — bunga berhenti sesuai ketentuan BMS.
                </p>
              </div>
              <div className="flex items-start gap-2.5 rounded-lg border border-[#fde68a] bg-white p-2.5">
                <TriangleAlert
                  className="mt-0.5 h-4 w-4 shrink-0 text-[#d97706]"
                  aria-hidden="true"
                />
                <p className="text-xs font-medium leading-[15px] text-[#121c2a]">
                  Pokok pinjaman belum lunas — bunga tetap berjalan sebesar 1% per bulan sesuai sisa
                  pokok dan ketentuan BMS.
                </p>
              </div>
            </div>
            <p className="text-[11px] italic leading-[16.5px] text-[#737686]">
              *Catatan: Nominal di atas hanya contoh ilustrasi. Perhitungan aktual mengikuti saldo
              pokok, jadwal pembayaran, dan ketentuan resmi BMS SMKS Muhammadiyah 1 Genteng.
              Pembayaran pokok saja tidak otomatis menghapus bunga yang sudah menjadi kewajiban.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <ListOrdered className="h-4 w-4 text-[#121c2a]" aria-hidden="true" />
              <span className="text-sm font-bold leading-5 text-[#121c2a]">
                5 Langkah Alur Pembayaran
              </span>
            </div>
            <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
              {[
                'Periksa detail pinjaman dan kewajiban pembayaran periode ini.',
                'Pilih salah satu dari tiga metode pembayaran.',
                'Periksa rincian pokok dan bunga yang berlaku.',
                'Lakukan pembayaran melalui petugas atau teller BMS.',
                'Simpan bukti pembayaran dan periksa status transaksi.',
              ].map((text, index) => (
                <div
                  className="flex flex-col gap-2 rounded-xl border border-[#c3c6d74c] bg-[#eff4ffcc] p-3"
                  key={text}
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#004ac6] text-[11px] font-bold leading-[14px] tracking-[0.44px] text-white">
                    {index + 1}
                  </span>
                  <p className="text-[11.5px] leading-[15.8px] text-[#121c2a]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c3c6d733] bg-[#eff4ff80] px-7 py-4">
          <div className="flex max-w-[480px] items-center gap-2">
            <Phone className="h-3.5 w-3.5 shrink-0 text-[#737686]" aria-hidden="true" />
            <p className="text-xs leading-[18px] text-[#737686]">
              Butuh bantuan perhitungan? Hubungi loket teller Lab AKL BMS SMKS Muhammadiyah 1
              Genteng.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="flex h-10 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
              onClick={onClose}
              type="button"
            >
              Tutup
            </button>
            <button
              className="flex h-10 items-center justify-center gap-1.5 rounded-xl bg-[#004ac6] px-6 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#003ba0]"
              onClick={onClose}
              type="button"
            >
              <CircleCheck className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              Mengerti
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
