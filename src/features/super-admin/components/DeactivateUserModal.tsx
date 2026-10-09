import { useState } from 'react'
import { ShieldCheck, TriangleAlert, UserX, X } from 'lucide-react'
import { resolveUserDetail, type SuperAdminUser } from '../data/users'

interface DeactivateUserModalProps {
  user: SuperAdminUser
  onClose: () => void
  onConfirm: (reasonLabel: string) => void
}

const DEACTIVATION_REASONS = [
  'Penonaktifan Sementara / Cuti Dinas',
  'Mutasi / Pindah Tugas',
  'Lulus / Alumni',
  'Pelanggaran Kebijakan',
  'Alasan Lainnya',
]

function createReferenceId(): string {
  const now = new Date()
  const date = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate(),
  ).padStart(2, '0')}`
  const sequence = String(Math.floor(Math.random() * 90) + 10)
  return `SEC-DEACT-${date}-${sequence}`
}

export function DeactivateUserModal({ user, onClose, onConfirm }: DeactivateUserModalProps) {
  const detail = resolveUserDetail(user)
  const [reason, setReason] = useState(DEACTIVATION_REASONS[0])
  const [referenceId] = useState(createReferenceId)

  return (
    <div
      aria-labelledby="deactivate-dialog-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup dialog nonaktifkan user"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[512px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-[0px_25px_50px_-12px_#00000040]">
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-6 pb-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#ffdad6] shadow-[inset_0px_2px_4px_#0000000d]">
                <TriangleAlert className="h-5 w-5 text-[#ba1a1a]" aria-hidden="true" />
              </span>
              <div className="flex flex-col gap-0.5">
                <h1
                  className="text-xl font-bold leading-7 tracking-[-0.1px] text-[#121c2a]"
                  id="deactivate-dialog-title"
                >
                  Nonaktifkan User
                </h1>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Konfirmasi perubahan status akses akun
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

          <p
            className="mt-6 text-sm leading-[22.8px] text-[#121c2a]"
            id="deactivate-dialog-description"
          >
            Apakah Anda yakin ingin menonaktifkan akun berikut? Sesi aktif akan segera diputus dan
            hak akses transaksi dicabut sementara.
          </p>

          <article
            aria-label="Informasi akun target"
            className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#c3c6d780] bg-[#eff4ff] px-4 py-4"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#004ac633] bg-[#004ac61a] text-xl font-bold leading-7 tracking-[-0.1px] text-[#004ac6]">
                {user.initials}
              </span>
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-base font-bold leading-6 text-[#121c2a]">{user.name}</h2>
                  <span className="inline-flex rounded-full bg-[#dbeafe] px-2 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#1e40af]">
                    {detail.roleLabel}
                  </span>
                </div>
                <p className="break-words text-xs leading-[18px] text-[#434655]">
                  {user.email} • {user.identity}
                </p>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#d1fae5] px-2.5 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#065f46]">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#059669]" />
              Status: {user.status}
            </span>
          </article>

          <div className="mt-5 flex flex-col gap-1.5">
            <label
              className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#121c2a]"
              htmlFor="deactivation-reason"
            >
              Alasan Penonaktifan (Dicatat di Audit Trail K3):
            </label>
            <div className="relative">
              <select
                className="h-11 w-full appearance-none rounded-xl border border-[#c3c6d7] bg-white pr-10 pl-3.5 text-sm leading-5 text-[#121c2a] focus:border-[#2563eb] focus:outline-none"
                id="deactivation-reason"
                onChange={(event) => setReason(event.target.value)}
                value={reason}
              >
                {DEACTIVATION_REASONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 right-3.5 h-2.5 w-4 -translate-y-1/2 text-[#737686]"
                fill="none"
                viewBox="0 0 10 6.17"
              >
                <path
                  d="M1 1L5 5L9 1"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-[#c3c6d766] px-6 pt-5 pb-6">
          <button
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Batal
          </button>
          <button
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#ba1a1a] px-6 text-sm font-semibold leading-5 text-white shadow-[0px_1px_2px_#0000000d] transition hover:brightness-[0.98]"
            onClick={() => onConfirm(reason)}
            type="button"
          >
            <UserX className="h-4 w-4" aria-hidden="true" />
            Nonaktifkan Akun
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#c3c6d766] bg-white px-6 py-4">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#737686]" aria-hidden="true" />
            <span className="text-xs leading-[18px] text-[#737686]">Otoritas Super Admin K3</span>
          </div>
          <span className="font-mono text-xs leading-4 text-[#434655]">Ref ID: {referenceId}</span>
        </div>
      </div>
    </div>
  )
}
