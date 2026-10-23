import { useState } from 'react'
import { CalendarDays, ChevronDown, RotateCcw, Search, SlidersHorizontal, X } from 'lucide-react'
import {
  DEFAULT_MUTATION_FILTER,
  type MutationFilter,
  type MutationType,
} from './filter-mutasi-data'

interface MonthOption {
  value: string
  label: string
}

interface FilterMutasiModalProps {
  initialFilter: MutationFilter
  monthOptions: MonthOption[]
  onApply: (filter: MutationFilter) => void
  onClose: () => void
}

const fieldLabelClass =
  'text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]'

const fieldClass =
  'h-11 w-full appearance-none rounded-xl border border-[#c3c6d7]/50 bg-[#f8f9ff] py-2 pr-10 pl-3 text-xs leading-[18px] text-[#121c2a] focus:border-[#2563eb] focus:outline-none'

export function FilterMutasiModal({
  initialFilter,
  monthOptions,
  onApply,
  onClose,
}: FilterMutasiModalProps) {
  const [draft, setDraft] = useState<MutationFilter>(initialFilter)

  const handleReset = () => setDraft(DEFAULT_MUTATION_FILTER)

  const handleApply = () => {
    onApply(draft)
    onClose()
  }

  return (
    <div
      aria-labelledby="filter-mutasi-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup filter mutasi"
        className="absolute inset-0 cursor-default bg-[#121c2a]/45"
        onClick={onClose}
        type="button"
      />

      <div className="modal-enter relative flex w-full max-w-[520px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d7]/60 px-6 py-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff4ff]">
              <SlidersHorizontal className="h-5 w-5 text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h2
                className="text-base font-semibold leading-6 text-[#121c2a]"
                id="filter-mutasi-title"
              >
                Filter Mutasi
              </h2>
              <p className="text-xs leading-[18px] text-[#434655]">
                Saring mutasi rekening berdasarkan jenis transaksi dan periode.
              </p>
            </div>
          </div>
          <button
            aria-label="Tutup"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[#737686] transition-colors hover:bg-[#f8f9ff] hover:text-[#121c2a]"
            onClick={onClose}
            type="button"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-col gap-5 px-6 py-5">
          <label className="flex flex-col gap-1.5">
            <span className={fieldLabelClass}>Cari Transaksi</span>
            <div className="relative">
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-3.5 h-[13.5px] w-[13.5px] -translate-y-1/2 text-[#737686]"
              />
              <input
                autoFocus
                className="h-11 w-full rounded-xl border border-[#c3c6d7]/50 bg-[#f8f9ff] py-2 pr-3 pl-10 text-xs text-[#121c2a] placeholder:text-[#737686] focus:border-[#2563eb] focus:outline-none"
                onChange={(event) =>
                  setDraft((prev) => ({ ...prev, query: event.target.value }))
                }
                placeholder="Cari transaksi..."
                type="search"
                value={draft.query}
              />
            </div>
          </label>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className={fieldLabelClass}>Jenis Transaksi</span>
              <div className="relative">
                <select
                  className={fieldClass}
                  onChange={(event) =>
                    setDraft((prev) => ({
                      ...prev,
                      type: event.target.value as MutationType,
                    }))
                  }
                  value={draft.type}
                >
                  <option value="SEMUA">Semua Transaksi</option>
                  <option value="SETORAN">Setoran</option>
                  <option value="PEMBAYARAN">Pembayaran</option>
                  <option value="PENARIKAN">Penarikan</option>
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 h-[9px] w-[14px] -translate-y-1/2 text-[#737686]"
                />
              </div>
            </label>

            <label className="flex flex-col gap-1.5">
              <span className={fieldLabelClass}>Bulan</span>
              <div className="relative">
                <CalendarDays
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3 h-[13.5px] w-[13.5px] -translate-y-1/2 text-[#737686]"
                />
                <select
                  className={`${fieldClass} pl-9`}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, month: event.target.value }))
                  }
                  value={draft.month}
                >
                  <option value="semua">Semua Bulan</option>
                  {monthOptions.map((month) => (
                    <option key={month.value} value={month.value}>
                      Bulan: {month.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 right-3 h-[9px] w-[14px] -translate-y-1/2 text-[#737686]"
                />
              </div>
            </label>
          </div>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-[#c3c6d7]/60 bg-[#f8f9ff] px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <button
            className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl px-3 text-xs font-medium leading-4 text-[#434655] transition-colors hover:bg-white"
            onClick={handleReset}
            type="button"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            Reset Filter
          </button>

          <div className="flex items-center gap-2">
            <button
              className="h-10 flex-1 rounded-xl border border-[#c3c6d7] bg-white px-4 text-xs font-medium leading-4 text-[#121c2a] transition-colors hover:bg-[#f8f9ff] sm:flex-none"
              onClick={onClose}
              type="button"
            >
              Batal
            </button>
            <button
              className="h-10 flex-1 rounded-xl bg-[#2563eb] px-4 text-xs font-semibold leading-4 text-white transition-colors hover:bg-[#1d4ed8] sm:flex-none"
              onClick={handleApply}
              type="button"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
