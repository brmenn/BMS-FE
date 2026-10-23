import { useEffect } from 'react'
import { History, X } from 'lucide-react'

export interface ActivityLogEntry {
  id: number
  badge: string
  badgeClass: string
  name: string
  action: string
  amount?: string
  ref?: string
  highlight1?: string
  action2?: string
  highlight2?: string
  tag: string
  tagClass?: string
  module: string
  time: string
  status: string
  dot: string
  statusColor: string
}

interface ActivityLogModalProps {
  activities: ActivityLogEntry[]
  onClose: () => void
}

export function ActivityLogModal({ activities, onClose }: ActivityLogModalProps) {
  useEffect(() => {
    const { body } = document
    const previousOverflow = body.style.overflow
    body.style.overflow = 'hidden'

    return () => {
      body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <div
      aria-labelledby="activity-log-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup semua aktivitas"
        className="absolute inset-0 cursor-default bg-[#121c2a]/45"
        onClick={onClose}
        type="button"
      />

      <div className="modal-enter relative flex max-h-[90vh] w-full max-w-[760px] flex-col overflow-hidden rounded-2xl border border-[#c3c6d766] bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[#c3c6d799] px-6 py-5">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#dee9fc] bg-[#eff4ff] shadow-[0px_1px_2px_#0000000d]">
              <History className="h-5 w-5 text-[#004ac6]" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-0.5">
              <h1
                className="text-xl font-semibold leading-[25px] tracking-[-0.1px] text-[#121c2a]"
                id="activity-log-title"
              >
                Semua Aktivitas
              </h1>
              <p className="text-xs leading-[18px] text-[#434655]">
                Catatan audit log transaksi dan perubahan hak akses secara realtime
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

        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-6">
          {activities.map((activity) => (
            <div
              className="flex flex-col gap-3 border-b border-[#e6eeff] px-1 py-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
              key={activity.id}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.badgeClass}`}
                >
                  <span className="text-[11px] font-bold leading-[14px] tracking-[0.44px]">
                    {activity.badge}
                  </span>
                </div>
                <div className="flex min-w-0 flex-col gap-1">
                  <p className="text-sm leading-5 text-[#121c2a]">
                    <span className="font-bold text-[#004ac6]">{activity.name}</span>{' '}
                    <span className="font-medium">{activity.action}</span>{' '}
                    {activity.amount && (
                      <span className="font-bold text-[#121c2a]">{activity.amount}</span>
                    )}
                    {activity.ref && (
                      <span className="font-bold text-[#737686]"> {activity.ref}</span>
                    )}
                    {activity.highlight1 && (
                      <>
                        {' '}
                        <span className="font-semibold text-[#121c2a]">{activity.highlight1}</span>{' '}
                        <span className="font-medium">{activity.action2}</span>{' '}
                        <span className="font-bold text-[#004ac6]">{activity.highlight2}</span>
                      </>
                    )}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 text-xs leading-[18px] text-[#737686]">
                    <span
                      className={`inline-flex items-center rounded-[4px] px-2 py-0.5 text-[11px] font-semibold leading-[16.5px] ${
                        activity.tagClass ?? 'bg-[#e6eeff] text-[#434655]'
                      }`}
                    >
                      {activity.tag}
                    </span>
                    <span>•</span>
                    <span>{activity.module}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start gap-1 sm:items-end">
                <span className="text-xs font-bold leading-4 tracking-[0.24px] text-[#121c2a]">
                  {activity.time}
                </span>
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full ${activity.dot}`} aria-hidden="true" />
                  <span className={`text-[11px] font-semibold leading-[16.5px] ${activity.statusColor}`}>
                    {activity.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c3c6d799] bg-white px-6 py-4">
          <span className="text-xs leading-[18px] text-[#434655]">
            Menampilkan {activities.length} aktivitas terbaru
          </span>
          <button
            className="inline-flex h-10 items-center justify-center rounded-xl border border-[#c3c6d7] bg-white px-5 text-sm font-medium leading-5 text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
            onClick={onClose}
            type="button"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  )
}
