import { useEffect } from 'react'
import {
  CalendarDays,
  ClipboardList,
  Download,
  Image as ImageIcon,
  MapPin,
  Printer,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface LaporanPiketDetail {
  id: number
  docNo: string
  tanggal: string
  jam: string
  sesi: string
  nama: string
  initials: string
  nis: string
  rol: string
  kelas: string
  aktivitas: 'Piket pagi' | 'Piket siang'
  kegiatan: string
  detail: string
  deskripsi: string
  jumlahFoto: number
  fotoJudul: string
  fotoLabel: string
  fotoWaktu: string
  lokasi: string
  lokasiDetail: string
  validator: string
  validatorMeta: string
  hash: string
  status: string
}

interface DetailLaporanPiketModalProps {
  laporan: LaporanPiketDetail
  onClose: () => void
}

export function DetailLaporanPiketModal({ laporan, onClose }: DetailLaporanPiketModalProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#121c2a66] p-4 [scrollbar-width:none] sm:items-center [&::-webkit-scrollbar]:hidden"
      onClick={onClose}
    >
      <div
        aria-labelledby="piket-detail-title"
        aria-modal="true"
        className="modal-enter relative my-auto flex max-h-[92vh] w-full max-w-[768px] flex-col overflow-hidden rounded-2xl border border-solid border-[#c3c6d7] bg-white"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        {/* HEADER */}
        <header className="flex items-center justify-between gap-4 border-b border-solid border-[#c3c6d7] px-6 py-5">
          <div className="flex min-w-0 items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-solid border-[#004ac633] bg-[#eff4ff]">
              <ClipboardList className="h-[18px] w-[18px] text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex min-w-0 flex-col gap-0.5">
              <h1
                className="text-lg font-bold leading-[26px] text-[#121c2a]"
                id="piket-detail-title"
              >
                Detail Laporan Petugas Piket
              </h1>
              <p className="flex flex-wrap items-center gap-1 text-xs leading-[18px] text-[#737686]">
                BMS SMKS Muhammadiyah 1 Genteng • No. Dokumen:
                <span className="font-mono text-[#434655]">{laporan.docNo}</span>
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup detail laporan piket"
            autoFocus
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-solid border-[#c3c6d7] text-[#434655] transition-colors hover:bg-[#eff4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004ac6]"
            onClick={onClose}
            type="button"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </header>

        {/* BODY */}
        <div className="flex flex-col gap-5 overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* STATUS BAR */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-solid border-[#c3c6d799] bg-[#eff4ff] px-3.5 py-3.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1">
                <span className="h-1.5 w-1.5 rounded-full bg-[#15803d]" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#15803d]">
                  {laporan.status}
                </span>
              </span>
              <span className="text-xs text-[#737686]">•</span>
              <span className="text-xs font-medium leading-[18px] text-[#434655]">
                {laporan.sesi}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <CalendarDays className="h-3.5 w-3.5 text-[#737686]" aria-hidden="true" />
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                  {laporan.tanggal} ({laporan.jam})
                </span>
              </span>
              <span className="inline-flex rounded-md bg-[#dee9fc] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                {laporan.kelas}
              </span>
            </div>
          </div>

          {/* PETUGAS + LOKASI */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-solid border-[#c3c6d7] bg-white p-4">
              <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#737686]">
                PETUGAS SISWA
              </span>
              <div className="flex items-center gap-3 pt-1">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#2563eb] text-sm font-bold leading-5 text-white">
                  {laporan.initials}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-bold leading-5 text-[#121c2a]">{laporan.nama}</span>
                  <span className="text-xs leading-[18px] text-[#737686]">
                    NIS: {laporan.nis} • {laporan.rol}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-1 flex-col gap-2 rounded-xl border border-solid border-[#c3c6d7] bg-white p-4">
              <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#737686]">
                LOKASI POS TUGAS
              </span>
              <div className="flex items-start gap-2.5 pt-1">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#004ac6]" aria-hidden="true" />
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                    {laporan.lokasi}
                  </span>
                  <span className="text-xs leading-[18px] text-[#737686]">
                    {laporan.lokasiDetail}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* KEGIATAN */}
          <div className="flex flex-col gap-[6.75px] rounded-xl border border-solid border-[#c3c6d7] bg-white p-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#004ac6]" aria-hidden="true" />
              <h2 className="text-base font-semibold leading-6 text-[#121c2a]">
                {laporan.kegiatan}
              </h2>
            </div>
            <p className="pl-4 text-sm leading-[22.8px] text-[#434655]">{laporan.deskripsi}</p>
          </div>

          {/* DOKUMENTASI */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ImageIcon className="h-3.5 w-3.5 text-[#737686]" aria-hidden="true" />
                <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                  Dokumentasi Foto Lapangan ({laporan.jumlahFoto} Foto Terlampir)
                </span>
              </div>
              <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                Format: HD JPEG
              </span>
            </div>

            <div className="flex items-start justify-center gap-3.5">
              <figure className="flex flex-1 flex-col overflow-hidden rounded-xl border border-solid border-[#c3c6d7] bg-[#eff4ff]">
                <div className="flex h-40 flex-col items-center justify-center gap-2 bg-[#dee9fc]">
                  <ImageIcon className="h-7 w-7 text-[#434655]" aria-hidden="true" />
                  <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]">
                    {laporan.fotoJudul}
                  </span>
                </div>
                <figcaption className="flex flex-col gap-0.5 border-t border-solid border-[#c3c6d7] bg-white p-3">
                  <span className="text-xs font-medium leading-[18px] text-[#121c2a]">
                    {laporan.fotoLabel}
                  </span>
                  <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                    {laporan.fotoWaktu}
                  </span>
                </figcaption>
              </figure>
            </div>
          </div>

          {/* VALIDASI */}
          <div className="flex items-center justify-between gap-4 rounded-xl border border-solid border-[#c3c6d7cc] bg-[#eff4ff80] p-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#e0e7ff]">
                <svg
                  width="22"
                  height="21"
                  viewBox="0 0 22 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M7.6 21L5.7 17.8L2.1 17L2.45 13.3L0 10.5L2.45 7.7L2.1 4L5.7 3.2L7.6 0L11 1.45L14.4 0L16.3 3.2L19.9 4L19.55 7.7L22 10.5L19.55 13.3L19.9 17L16.3 17.8L14.4 21L11 19.55L7.6 21ZM8.45 18.45L11 17.35L13.6 18.45L15 16.05L17.75 15.4L17.5 12.6L19.35 10.5L17.5 8.35L17.75 5.55L15 4.95L13.55 2.55L11 3.65L8.4 2.55L7 4.95L4.25 5.55L4.5 8.35L2.65 10.5L4.5 12.6L4.25 15.45L7 16.05L8.45 18.45ZM9.95 14.05L15.6 8.4L14.2 6.95L9.95 11.2L7.8 9.1L6.4 10.5L9.95 14.05Z"
                    fill="#006329"
                  />
                </svg>
              </span>
              <div className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold leading-[18px] text-[#121c2a]">
                  Tervalidasi oleh: {laporan.validator}
                </span>
                <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                  {laporan.validatorMeta}
                </span>
              </div>
            </div>
            <div className="hidden shrink-0 pt-0.5 sm:block">
              <span className="inline-flex rounded-md border border-solid border-[#c3c6d7] bg-white px-2.5 py-1">
                <span className="font-mono text-[11px] leading-[16.5px] text-[#737686]">
                  HASH: {laporan.hash}
                </span>
              </span>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-solid border-[#c3c6d7] bg-[#eff4ff66] px-6 py-4">
          <button
            className={cn(
              'inline-flex items-center gap-2 rounded-xl border border-solid border-[#c3c6d7] bg-white px-4 py-2.5 text-base font-normal leading-6 text-[#121c2a]',
              'transition-colors hover:bg-[#f8f9ff]',
            )}
            type="button"
          >
            <Download className="h-3 w-3" aria-hidden="true" />
            Unduh Lampiran PDF
          </button>

          <div className="flex items-center gap-3">
            <button
              className="inline-flex items-center justify-center rounded-xl border border-solid border-[#c3c6d7] bg-white px-5 py-2.5 text-base font-normal leading-6 text-[#737686] transition-colors hover:bg-[#f8f9ff]"
              onClick={onClose}
              type="button"
            >
              Tutup
            </button>
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-base font-normal leading-6 text-white shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
              type="button"
            >
              <Printer className="h-3.5 w-3.5" aria-hidden="true" />
              Cetak Laporan
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}
