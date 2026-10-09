import { useRef, useState, type DragEvent } from 'react'
import {
  BookOpen,
  CalendarClock,
  ChevronDown,
  Eye,
  ImagePlus,
  RotateCcw,
  Save,
  Trash2,
  Upload,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { DashboardSidebar, type SidebarItem } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import logoAK from '@/assets/logo/logoAK.png'

const NAV_ITEMS: SidebarItem[] = [
  { to: '/akuntansi/isi-jurnal', label: 'Isi Jurnal', icon: BookOpen },
]

const CLASS_OPTIONS = ['XI AKL 1', 'XI AKL 2', 'X AKL 1', 'X AKL 2', 'XII AKL 1']

const INITIAL_DESCRIPTION =
  'Penerimaan setoran kas tabungan wajib dan sukarela siswa kelas XI AKL 1 melalui loket utama Mini Bank SMK Muhi beserta pencatatan administrasi buku tabungan.'

const MAX_DESCRIPTION = 250

export function IsiJurnalPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [nama, setNama] = useState('Adinda Nur Safitri')
  const [kelas, setKelas] = useState('XI AKL 1')
  const [description, setDescription] = useState(INITIAL_DESCRIPTION)
  const [fileName, setFileName] = useState<string | null>('bukti_setoran_XI_AKL1_02okt.jpg')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [dragging, setDragging] = useState(false)

  const acceptFile = (files: FileList | null) => {
    const file = files?.[0]
    if (!file) return
    setFileName(file.name)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragging(false)
    acceptFile(event.dataTransfer.files)
  }

  const handleReset = () => {
    setNama('')
    setKelas('XI AKL 1')
    setDescription('')
    setFileName(null)
    setPreviewUrl(null)
  }

  const removeFile = () => {
    setFileName(null)
    setPreviewUrl(null)
  }

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <DashboardSidebar items={NAV_ITEMS} logo logoSrc={logoAK} />
      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Akuntansi" />

        <main className="flex w-full max-w-[1280px] flex-col gap-6 p-6 sm:p-8">
          <header className="flex flex-col gap-4 border-b border-[#d9e3f6b2] pb-2 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                Isi Jurnal &amp; Presensi Piket
              </h1>
              <p className="max-w-[768px] text-sm leading-5 text-[#434655]">
                Pencatatan presensi siswa/petugas piket lab mini bank sekaligus penginputan transaksi jurnal
                umum berpasangan (double-entry) dengan lampiran bukti transaksi fisik yang sah.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <button
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-5 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#f8f9ff]"
                onClick={handleReset}
                type="button"
              >
                <RotateCcw className="h-[15px] w-[15px] shrink-0 text-[#121c2a]" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-[#121c2a]">Reset Form</span>
              </button>
              <button
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-[#2563eb] px-6 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#1d4ed8]"
                type="button"
              >
                <Save className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-white">Simpan Jurnal &amp; Presensi</span>
              </button>
            </div>
          </header>

          <section className="flex flex-col gap-6 rounded-2xl border border-[#c3c6d799] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#d9e3f6] pb-3">
              <div className="flex flex-col">
                <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                  Data Presensi Petugas Piket (Siswa / Asisten Lab)
                </h2>
                <p className="text-xs leading-[18px] text-[#737686]">
                  Identifikasi personil siswa pelaksana loket operasional harian.
                </p>
              </div>
              <span className="inline-flex h-7 items-center justify-center rounded-md bg-[#d1fae5] px-2 text-[11px] font-bold leading-[14px] tracking-[0.44px] text-[#065f46]">
                4 / 4 Lengkap
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]"
                  htmlFor="nama-petugas"
                >
                  Nama Lengkap Siswa / Petugas Piket
                </label>
                <div className="relative flex h-12 items-center">
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3.5 text-[#737686]"
                  >
                    <User className="h-3 w-3" />
                  </span>
                  <input
                    className="h-12 w-full rounded-xl border border-[#c3c6d7] bg-[#eff4ff] pr-4 pl-10 text-sm text-[#434655] outline-none focus:border-[#2563eb]"
                    id="nama-petugas"
                    name="nama-petugas"
                    onChange={(event) => setNama(event.target.value)}
                    placeholder="Masukkan nama lengkap"
                    type="text"
                    value={nama}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:justify-end">
                <label
                  className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]"
                  htmlFor="id-petugas"
                >
                  NISN / ID Petugas Piket
                </label>
                <div className="relative flex h-12 items-center">
                  <select
                    className="h-12 w-full cursor-pointer appearance-none rounded-xl border border-[#c3c6d7] bg-[#eff4ff] pr-10 pl-4 text-sm text-[#121c2a] outline-none focus:border-[#2563eb]"
                    id="id-petugas"
                    name="id-petugas"
                    onChange={(event) => setKelas(event.target.value)}
                    value={kelas}
                  >
                    {CLASS_OPTIONS.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    aria-hidden="true"
                    className="pointer-events-none absolute right-3.5 h-4 w-4 text-[#737686]"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Shift &amp; Jadwal Loket
                </span>
                <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[#d9e3f6] bg-[#eff4ff] p-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white">
                    <CalendarClock className="h-4 w-4 text-[#004ac6]" aria-hidden="true" />
                  </span>
                  <span className="inline-flex items-center rounded-full bg-[#004ac61a] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                    Shift Pagi
                  </span>
                  <span className="text-sm leading-5 text-[#121c2a]">07:30 - 12:00 WIB</span>
                  <span className="text-xs leading-[18px] text-[#737686]">
                    (Loket 01 - Gedung Lab Akuntansi Lt. 1)
                  </span>
                </div>
              </div>
            </div>

            <div
              className={cn(
                'flex flex-col items-center gap-1 rounded-2xl border-2 border-dashed bg-[#f8f9ff] p-6 transition-colors',
                dragging ? 'border-[#2563eb] bg-[#eff4ff]' : 'border-[#c3c6d7]',
              )}
              onDragLeave={() => setDragging(false)}
              onDragOver={(event) => {
                event.preventDefault()
                setDragging(true)
              }}
              onDrop={handleDrop}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#eff4ff]">
                <ImagePlus className="h-[22px] w-[22px] text-[#004ac6]" aria-hidden="true" />
              </span>
              <p className="pt-2 text-center text-sm font-semibold leading-5 text-[#121c2a]">
                Import &amp; Unggah Foto Dokumentasi atau klik untuk telusuri
              </p>
              <p className="text-center text-xs leading-[18px] text-[#737686]">
                Mendukung format gambar dokumen: JPG, PNG, WEBP (Ukuran berkas maksimal 5MB)
              </p>
              <button
                className="mt-3 inline-flex h-9 items-center gap-2 rounded-xl border border-[#004ac633] bg-[#eff4ff] px-4 transition-colors hover:bg-[#e0eaff]"
                onClick={() => fileInputRef.current?.click()}
                type="button"
              >
                <Upload className="h-3 w-3 shrink-0 text-[#004ac6]" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6]">
                  Import / Ambil Foto Bukti
                </span>
              </button>
              <input
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={(event) => acceptFile(event.target.files)}
                ref={fileInputRef}
                type="file"
              />
            </div>

            {fileName ? (
              <div className="flex flex-wrap items-center gap-4 rounded-xl border border-[#c3c6d7] bg-[#eff4ff80] p-4">
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#c3c6d7] bg-[#e6eeff] shadow-[inset_0px_2px_4px_1px_#0000000d]">
                    {previewUrl ? (
                      <img
                        alt="Pratinjau bukti transaksi"
                        className="h-full w-full object-cover"
                        src={previewUrl}
                      />
                    ) : (
                      <ImagePlus className="h-6 w-6 text-[#737686]" aria-hidden="true" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-col gap-0.5">
                    <p className="truncate text-sm font-semibold leading-5 text-[#121c2a]">{fileName}</p>
                    <p className="text-xs leading-[18px] text-[#737686]">
                      Diupload hari ini pada pukul 08:15 WIB oleh Petugas Piket
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#c3c6d7] bg-white px-3 transition-colors hover:bg-[#f8f9ff]"
                    type="button"
                  >
                    <Eye className="h-3 w-3 shrink-0 text-[#121c2a]" aria-hidden="true" />
                    <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#121c2a]">
                      Lihat Pratinjau Penuh
                    </span>
                  </button>
                  <button
                    aria-label="Hapus foto bukti"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#ffdad6] bg-white transition-colors hover:bg-[#fff1f0]"
                    onClick={removeFile}
                    type="button"
                  >
                    <Trash2 className="h-3 w-3 text-[#ba1a1a]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            ) : null}

            <div className="flex flex-col gap-1.5">
              <label
                className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]"
                htmlFor="deskripsi"
              >
                Deskripsi / Keterangan Transaksi <span className="text-[#ba1a1a]">*</span>
              </label>
              <textarea
                className="min-h-[120px] w-full resize-none rounded-xl border border-[#c3c6d7] bg-white p-4 text-sm leading-[22.8px] text-[#121c2a] outline-none focus:border-[#2563eb]"
                id="deskripsi"
                maxLength={MAX_DESCRIPTION}
                name="deskripsi"
                onChange={(event) => setDescription(event.target.value)}
                rows={4}
                value={description}
              />
              <p className="self-end text-xs leading-[18px] text-[#737686]">
                {description.length} / {MAX_DESCRIPTION} karakter audit bank
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
