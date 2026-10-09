import { useEffect, type ReactNode } from 'react'
import { ReceiptText, X } from 'lucide-react'
import { formatMoney } from '@/lib/format'
import { cn } from '@/lib/utils'

export type WithdrawalStatus = 'MENUNGGU' | 'DISETUJUI' | 'SELESAI'

export interface WithdrawalRecord {
  id: string
  amount: number
  status: WithdrawalStatus
  dateTime: string
  dateLabel: string
  note: string
}

const STEP_TEMPLATE: Array<{
  status: WithdrawalStatus
  title: string
  description: ReactNode
}> = [
  {
    status: 'MENUNGGU',
    title: 'MENUNGGU',
    description: (
      <>
        Pengajuan sedang diperiksa
        <br />
        Admin.
      </>
    ),
  },
  {
    status: 'DISETUJUI',
    title: 'DISETUJUI',
    description: (
      <>
        Pengajuan telah disetujui &amp; siap
        <br />
        dicairkan.
      </>
    ),
  },
  {
    status: 'SELESAI',
    title: 'SELESAI',
    description: (
      <>
        Penarikan telah selesai &amp; saldo
        <br />
        dipotong.
      </>
    ),
  },
]

const ACTIVE_INDEX: Record<WithdrawalStatus, number> = {
  MENUNGGU: 0,
  DISETUJUI: 1,
  SELESAI: 2,
}

interface WithdrawalDetailModalProps {
  record: WithdrawalRecord
  onClose: () => void
}

export function WithdrawalDetailModal({ record, onClose }: WithdrawalDetailModalProps) {
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

  const activeIndex = ACTIVE_INDEX[record.status]

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#121c2a66] p-4 sm:items-center"
      onClick={onClose}
    >
      <div
        aria-describedby="withdrawal-subtitle"
        aria-labelledby="withdrawal-title"
        aria-modal="true"
        className="relative my-auto flex w-full max-w-[976px] flex-col rounded-2xl border border-[#c3c6d7] bg-white p-6"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="flex items-center justify-between gap-4 border-b border-[#c3c6d7] pb-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff4ff]">
              <ReceiptText className="h-5 w-[18px] text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-1">
              <h1 className="text-lg font-bold leading-[26px] text-[#121c2a]" id="withdrawal-title">
                Detail Penarikan
              </h1>
              <p className="text-xs leading-[18px] text-[#434655]" id="withdrawal-subtitle">
                Pengajuan Penarikan Siswa
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup detail penarikan"
            autoFocus
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#434655] transition-colors hover:bg-[#eff4ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#004ac6]"
            onClick={onClose}
            type="button"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </header>

        <section
          aria-label="Informasi penarikan"
          className="flex flex-col gap-6 border-b border-[#c3c6d7] py-6 sm:flex-row sm:flex-wrap sm:justify-center"
        >
          <article className="flex flex-1 basis-64 flex-col gap-1 pt-1">
            <h2 className="text-xs leading-[18px] text-[#434655]">Nominal Penarikan</h2>
            <p className="text-2xl font-bold leading-8 tracking-[-0.24px] text-[#121c2a]">
              {formatMoney(record.amount)}
            </p>
            <span className="inline-flex w-fit rounded border border-[#a7f3d0] bg-[#ecfdf5] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
              Bebas Biaya Admin
            </span>
          </article>

          <article className="flex flex-1 basis-64 flex-col gap-1 pt-1">
            <h2 className="text-xs leading-[18px] text-[#434655]">Nomor Referensi</h2>
            <p className="font-mono text-base font-bold leading-6 text-[#121c2a]">{record.id}</p>
            <p className="text-xs leading-[18px] text-[#737686]">
              Tunjukkan kode ini kepada kasir BMS
            </p>
          </article>

          <article className="flex flex-1 basis-64 flex-col gap-1 pt-1">
            <h2 className="text-xs leading-[18px] text-[#434655]">Tanggal &amp; Waktu Pengajuan</h2>
            <time className="text-base font-semibold leading-6 text-[#121c2a]" dateTime={record.dateTime}>
              {record.dateLabel.split(',')[0]}
            </time>
            <time className="text-xs leading-[18px] text-[#434655]" dateTime={record.dateTime}>
              {record.dateLabel.includes(',') ? `Pukul ${record.dateLabel.split(',')[1].trim()}` : ''}
            </time>
          </article>
        </section>

        <section aria-labelledby="verification-title" className="flex flex-col gap-6 py-6">
          <h2 className="text-base font-semibold leading-6 text-[#121c2a]" id="verification-title">
            Tahapan Verifikasi
          </h2>

          <ol className="relative flex flex-col gap-6 sm:flex-row sm:justify-between">
            <span
              aria-hidden="true"
              className="absolute top-4 bottom-4 left-4 w-0.5 bg-[#c3c6d7] sm:top-4 sm:right-10 sm:bottom-auto sm:left-10 sm:h-0.5 sm:w-auto"
            />
            {STEP_TEMPLATE.map((step, index) => {
              const isActive = index === activeIndex
              const isDone = index < activeIndex
              return (
                <li
                  aria-current={isActive ? 'step' : undefined}
                  aria-label={`Tahap ${index + 1} dari 3: ${step.title}`}
                  className="relative flex flex-1 flex-col items-start gap-2 pl-14 sm:items-center sm:pl-0"
                  key={step.status}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      'absolute top-0 left-0 flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold leading-5 sm:static',
                      isActive && 'bg-[#004ac6] text-white shadow-[0px_1px_2px_#0000000d,0px_0px_0px_4px_#dbe1ff]',
                      isDone && 'bg-[#004ac6] text-white',
                      !isActive && !isDone && 'border-2 border-[#737686] bg-[#dee9fc] text-[#737686]',
                    )}
                  >
                    {index + 1}
                  </span>

                  <div
                    className={cn(
                      'flex max-w-[200px] flex-col gap-0.5',
                      isActive ? 'items-start sm:items-center' : 'items-start',
                    )}
                  >
                    <span
                      className={cn(
                        'text-sm leading-5',
                        isActive
                          ? 'font-bold text-[#004ac6]'
                          : isDone
                            ? 'font-semibold text-[#121c2a]'
                            : 'font-semibold text-[#434655]',
                      )}
                    >
                      {step.title}
                    </span>
                    <p
                      className={cn(
                        'text-xs leading-[18px]',
                        isActive ? 'text-[#434655]' : 'text-[#737686]',
                      )}
                    >
                      {step.description}
                    </p>
                    {isActive ? (
                      <span className="mt-0.5 inline-flex w-fit rounded bg-[#fffbeb] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#b45309]">
                        Sedang Berlangsung
                      </span>
                    ) : null}
                  </div>
                </li>
              )
            })}
          </ol>
        </section>

        <footer className="flex flex-col items-start gap-4 border-t border-[#c3c6d7] pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <ReceiptText className="h-3.5 w-3.5 shrink-0 text-[#434655]" aria-hidden="true" />
            <p className="text-xs leading-[18px] text-[#434655]">
              Setelah status <strong className="font-bold text-[#121c2a]">DISETUJUI</strong>, ambil uang tunai
              maksimal dalam 2x24 jam.
            </p>
          </div>
          <button
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#c3c6d7] px-5 py-2.5 text-base font-medium leading-6 text-[#121c2a] transition-colors hover:bg-[#f7f9ff]"
            type="button"
          >
            <ReceiptText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="whitespace-nowrap">Lihat Resi Penarikan</span>
          </button>
        </footer>
      </div>
    </div>
  )
}
