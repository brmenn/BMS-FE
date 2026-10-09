import { CircleCheck, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  STATUS_BADGE_CLASS,
  resolveUserDetail,
  type SuperAdminUser,
} from '../data/users'

interface UserDetailModalProps {
  user: SuperAdminUser
  onClose: () => void
  onEdit: () => void
}

export function UserDetailModal({ user, onClose, onEdit }: UserDetailModalProps) {
  const { roleLabel, phone, info, activities } = resolveUserDetail(user)

  return (
    <div
      aria-labelledby="user-detail-title"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
    >
      <button
        aria-label="Tutup detail user"
        className="absolute inset-0 cursor-default bg-[#121c2a]/50 backdrop-blur-sm"
        onClick={onClose}
        type="button"
      />

      <div className="relative flex max-h-[90vh] w-full max-w-[995px] flex-col overflow-hidden rounded-[25px] bg-[#f8f9ff] shadow-2xl">
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6 lg:px-8 lg:pb-8">
          <div className="grid gap-6 lg:grid-cols-12">
            <section className="flex h-fit flex-col self-start rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d] lg:col-span-4">
              <div className="flex flex-col items-center border-b border-[#c3c6d7] pb-6">
                <span className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-[#dbe1ff] text-3xl font-bold leading-[38px] tracking-[-0.45px] text-[#004ac6] shadow-[0_0_0_4px_#dbe1ff80]">
                  {user.initials}
                </span>
                <h2
                  className="mt-4 text-center text-xl font-semibold leading-7 tracking-[-0.1px] text-[#121c2a]"
                  id="user-detail-title"
                >
                  {user.name}
                </h2>
                <span className="mt-1 inline-flex rounded-full bg-[#dee9fc] px-3 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#004ac6]">
                  {roleLabel}
                </span>
                <p className="mt-2 text-center text-xs leading-[18px] text-[#434655]">{user.identity}</p>
              </div>

              <dl className="flex flex-col gap-4 pt-5">
                <DetailRow label="Email Terdaftar" value={user.email} />
                <DetailRow label="No WhatsApp" value={phone} />
                <div className="flex items-center justify-between gap-3">
                  <dt className="text-sm leading-5 text-[#434655]">Status Akun</dt>
                  <dd>
                    <span
                      className={cn(
                        'inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px]',
                        STATUS_BADGE_CLASS[user.status],
                      )}
                    >
                      {user.status}
                    </span>
                  </dd>
                </div>
                <DetailRow label="Login Terakhir" value={user.lastLogin} />
              </dl>
            </section>

            <div className="flex flex-col gap-6 lg:col-span-8">
              <section className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                    Informasi Akademik &amp; Kepegawaian
                  </h3>
                  <div className="flex items-center gap-2.5">
                    <button
                      className="rounded-[9px] border border-[#c3c6d7] bg-white px-3 py-1.5 text-[11px] font-medium leading-[15px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                      onClick={onClose}
                      type="button"
                    >
                      Kembali
                    </button>
                    <button
                      className="rounded-[9px] bg-[#2563eb] px-3.5 py-1.5 text-[11px] font-medium leading-[15px] text-white shadow-[0px_1px_2px_#0000000d] transition hover:brightness-[0.98]"
                      onClick={onEdit}
                      type="button"
                    >
                      Edit Akun
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {info.map((item) => (
                    <div
                      className="flex flex-col gap-1 rounded-xl border border-[#c3c6d780] bg-[#f8f9ff] p-4"
                      key={item.label}
                    >
                      <span className="text-xs leading-[18px] text-[#434655]">{item.label}</span>
                      <span className="text-sm leading-5 font-medium text-[#121c2a]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_#0000000d]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                    Log Aktivitas Terbaru
                  </h3>
                  <button
                    className="text-xs leading-4 font-semibold tracking-[0.24px] text-[#004ac6] transition-colors hover:underline"
                    type="button"
                  >
                    Lihat Semua Log
                  </button>
                </div>

                <div className="flex flex-col">
                  {activities.map((activity) => {
                    const Icon = activity.kind === 'transaksi' ? CircleCheck : ShieldCheck

                    return (
                      <div
                        className="flex items-center justify-between gap-3 border-b border-[#c3c6d766] py-2 last:border-b-0"
                        key={activity.id}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <Icon
                            aria-hidden="true"
                            className={cn(
                              'h-4 w-4 shrink-0',
                              activity.kind === 'transaksi' ? 'text-[#047857]' : 'text-[#004ac6]',
                            )}
                          />
                          <span className="text-sm leading-5 text-[#121c2a]">{activity.text}</span>
                        </div>
                        <span className="shrink-0 text-xs leading-[18px] text-[#434655]">
                          {activity.time}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-sm leading-5 text-[#434655]">{label}</dt>
      <dd className="text-right text-sm leading-5 font-medium text-[#121c2a]">{value}</dd>
    </div>
  )
}
