import { useEffect, useMemo, useState, type MouseEvent } from 'react'
import {
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  Download,
  EllipsisVertical,
  Eye,
  KeyRound,
  ListFilter,
  Pencil,
  RotateCcw,
  Search,
  ShieldCheck,
  TriangleAlert,
  UserCheck,
  UserPlus,
  Users,
  UserX,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { SuperAdminSidebar } from '../components/SuperAdminSidebar'
import { SuperAdminTopbar } from '../components/SuperAdminTopbar'
import { UserFormModal, type UserFormValue } from '../components/UserFormModal'
import { UserDetailModal } from '../components/UserDetailModal'
import { ResetPasswordModal } from '../components/ResetPasswordModal'
import { DeactivateUserModal } from '../components/DeactivateUserModal'
import {
  ROLE_AVATAR_CLASS,
  ROLE_BADGE_CLASS,
  STATUS_BADGE_CLASS,
  STATUS_DOT_CLASS,
  SUPER_ADMIN_USERS,
  USER_ROLE_OPTIONS,
  USER_STATUS_OPTIONS,
  USER_SUMMARY,
  formatCount,
  getInitials,
  resolveUserDetail,
  type SuperAdminUser,
  type SuperAdminUserRole,
  type SuperAdminUserStatus,
} from '../data/users'

const PAGE_SIZE = 6
const MENU_WIDTH = 192
const MENU_HEIGHT = 184

type RoleFilter = 'all' | SuperAdminUserRole
type StatusFilter = 'all' | SuperAdminUserStatus

interface DialogState {
  mode: 'create' | 'edit' | 'view' | 'reset' | 'deactivate'
  user?: SuperAdminUser
}

interface MenuState {
  id: string
  top: number
  left: number
}

const summaryCards = [
  {
    label: 'SEMUA USER',
    icon: Users,
    iconBox: 'bg-[#eff4ff] text-[#004ac6]',
    value: USER_SUMMARY.total,
    badge: null,
    note: USER_SUMMARY.totalNote,
  },
  {
    label: 'USER AKTIF',
    icon: CircleCheck,
    iconBox: 'bg-[#ecfdf5] text-[#006329]',
    value: USER_SUMMARY.active,
    badge: USER_SUMMARY.activeBadge,
    badgeClass: 'bg-[#d1fae5] text-[#006329]',
    note: USER_SUMMARY.activeNote,
  },
  {
    label: 'USER NONAKTIF',
    icon: TriangleAlert,
    iconBox: 'bg-[#fffbeb] text-[#b45309]',
    value: USER_SUMMARY.inactive,
    badge: USER_SUMMARY.inactiveBadge,
    badgeClass: 'bg-[#fef3c7] text-[#b45309]',
    note: USER_SUMMARY.inactiveNote,
  },
  {
    label: 'ADMIN / PETUGAS',
    icon: ShieldCheck,
    iconBox: 'bg-[#eff6ff] text-[#004ac6]',
    value: USER_SUMMARY.staff,
    badge: USER_SUMMARY.staffBadge,
    badgeClass: 'bg-[#dbeafe] text-[#004ac6]',
    note: USER_SUMMARY.staffNote,
  },
]

const inputClass =
  'h-11 w-full rounded-xl border border-[#c3c6d7] bg-white text-sm leading-5 text-[#121c2a] placeholder:text-[#737686] focus:border-[#2563eb] focus:outline-none'

const selectClass =
  'h-11 w-full appearance-none rounded-xl border border-[#c3c6d7] bg-white pl-3.5 pr-9 text-sm leading-5 text-[#121c2a] focus:border-[#2563eb] focus:outline-none'

const tableHeaderClass =
  'px-4 py-4 text-[11px] font-bold leading-[16.5px] tracking-[0.55px] text-[#434655]'

function getPageItems(current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1)

  const items: (number | '...')[] = [1]
  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  if (start > 2) items.push('...')
  for (let page = start; page <= end; page += 1) items.push(page)
  if (end < total - 1) items.push('...')
  items.push(total)

  return items
}

function downloadCsv(rows: SuperAdminUser[], filename: string) {
  const header = [
    'No',
    'Nama Lengkap',
    'Identitas',
    'Email',
    'Username',
    'Role',
    'Status',
    'Terakhir Login',
  ]
  const body = rows.map((user, index) => [
    String(index + 1),
    user.name,
    user.identity,
    user.email,
    user.username,
    user.role,
    user.status,
    user.lastLogin,
  ])
  const csv = [header, ...body]
    .map((line) => line.map((cell) => `"${cell.replace(/"/g, '""')}"`).join(','))
    .join('\n')

  const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = filename
  anchor.click()
  URL.revokeObjectURL(url)
}

export function SuperAdminUserManagementPage() {
  const [users, setUsers] = useState<SuperAdminUser[]>(SUPER_ADMIN_USERS)
  const [query, setQuery] = useState('')
  const [role, setRole] = useState<RoleFilter>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [applied, setApplied] = useState({ query: '', role: 'all' as RoleFilter, status: 'all' as StatusFilter })
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [menu, setMenu] = useState<MenuState | null>(null)
  const [dialog, setDialog] = useState<DialogState | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  useEffect(() => {
    if (!notice) return undefined
    const timer = window.setTimeout(() => setNotice(null), 3500)
    return () => window.clearTimeout(timer)
  }, [notice])

  useEffect(() => {
    if (!menu) return undefined
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenu(null)
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [menu])

  const filtered = useMemo(() => {
    const keyword = applied.query.trim().toLowerCase()

    return users.filter((user) => {
      const matchKeyword =
        !keyword ||
        [user.name, user.email, user.username, user.identity].some((value) =>
          value.toLowerCase().includes(keyword),
        )
      const matchRole = applied.role === 'all' || user.role === applied.role
      const matchStatus = applied.status === 'all' || user.status === applied.status

      return matchKeyword && matchRole && matchStatus
    })
  }, [users, applied])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const startIndex = (currentPage - 1) * PAGE_SIZE
  const pageRows = filtered.slice(startIndex, startIndex + PAGE_SIZE)
  const pageIds = pageRows.map((user) => user.id)
  const allOnPageSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id))
  const selectedUsers = users.filter((user) => selectedIds.includes(user.id))
  const menuUser = menu ? users.find((user) => user.id === menu.id) : undefined

  const applyFilters = () => {
    setApplied({ query, role, status })
    setPage(1)
  }

  const resetFilters = () => {
    setQuery('')
    setRole('all')
    setStatus('all')
    setApplied({ query: '', role: 'all', status: 'all' })
    setPage(1)
  }

  const toggleAllOnPage = () => {
    setSelectedIds((prev) =>
      allOnPageSelected
        ? prev.filter((id) => !pageIds.includes(id))
        : Array.from(new Set([...prev, ...pageIds])),
    )
  }

  const selectAllFiltered = () => {
    setSelectedIds((prev) => Array.from(new Set([...prev, ...filtered.map((user) => user.id)])))
    setNotice(`${formatCount(filtered.length)} akun dipilih dari hasil filter.`)
  }

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const openMenu = (id: string, event: MouseEvent<HTMLButtonElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const left = Math.min(
      Math.max(rect.right - MENU_WIDTH, 8),
      Math.max(8, window.innerWidth - MENU_WIDTH - 8),
    )
    const openUp = rect.bottom + MENU_HEIGHT + 8 > window.innerHeight
    const top = openUp ? rect.top - MENU_HEIGHT - 6 : rect.bottom + 6

    setMenu((prev) => (prev?.id === id ? null : { id, top, left }))
  }

  const handleResetPassword = (user: SuperAdminUser) => {
    setMenu(null)
    setDialog({ mode: 'reset', user })
  }

  const handleResetPasswordConfirm = (user: SuperAdminUser, sendWhatsapp: boolean) => {
    const { phone } = resolveUserDetail(user)
    setDialog(null)
    setNotice(
      sendWhatsapp
        ? `Password ${user.name} berhasil direset dan dikirim via WhatsApp ke ${phone}.`
        : `Password ${user.name} berhasil direset.`,
    )
  }

  const handleToggleStatus = (user: SuperAdminUser) => {
    setMenu(null)

    if (user.status === 'Aktif') {
      setDialog({ mode: 'deactivate', user })
      return
    }

    setUsers((prev) =>
      prev.map((item) => (item.id === user.id ? { ...item, status: 'Aktif' } : item)),
    )
    setNotice(`Status ${user.name} diubah menjadi Aktif.`)
  }

  const handleDeactivateConfirm = (user: SuperAdminUser, reason: string) => {
    setUsers((prev) =>
      prev.map((item) =>
        item.id === user.id ? { ...item, status: 'Nonaktif', online: false } : item,
      ),
    )
    setDialog(null)
    setNotice(`Akun ${user.name} dinonaktifkan. Alasan: ${reason}.`)
  }

  const handleDialogSubmit = (value: UserFormValue) => {
    if (!dialog) return

    if (dialog.mode === 'create') {
      const newUser: SuperAdminUser = {
        id: `USR-${Date.now().toString().slice(-6)}`,
        ...value,
        initials: getInitials(value.name),
        lastLogin: 'Belum pernah login',
      }
      setUsers((prev) => [newUser, ...prev])
      setPage(1)
      setNotice(`User ${value.name} berhasil ditambahkan.`)
    } else if (dialog.user) {
      setUsers((prev) =>
        prev.map((user) =>
          user.id === dialog.user?.id
            ? { ...user, ...value, initials: getInitials(value.name) }
            : user,
        ),
      )
      setNotice(`Data ${value.name} berhasil diperbarui.`)
    }

    setDialog(null)
  }

  const rangeStart = filtered.length === 0 ? 0 : startIndex + 1
  const rangeEnd = Math.min(startIndex + PAGE_SIZE, filtered.length)

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <SuperAdminSidebar />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <SuperAdminTopbar />

        <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-6 p-6 sm:p-8">
          <section className="flex flex-col gap-4 border-b border-[#dee9fcb2] pb-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl leading-8 font-semibold tracking-[-0.6px] text-[#121c2a]">
                User Management
              </h1>
              <p className="max-w-[672px] text-sm leading-5 text-[#434655]">
                Kelola akun pengguna, role, status, dan hak akses pengguna BMS.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                className="flex h-11 items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-4 shadow-[0px_1px_2px_#0000000d] transition-colors hover:bg-[#f8f9ff]"
                onClick={() => downloadCsv(filtered, 'data-pengguna-bms.csv')}
                type="button"
              >
                <Download className="h-4 w-4 shrink-0 text-[#121c2a]" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  Export Data (Excel/CSV)
                </span>
              </button>
              <button
                className="flex h-11 items-center gap-2 rounded-xl bg-[#004ac6] px-5 shadow-[0px_2px_4px_-2px_#004ac633,0px_4px_6px_-1px_#004ac633] transition hover:brightness-[0.98]"
                onClick={() => setDialog({ mode: 'create' })}
                type="button"
              >
                <UserPlus className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-white">
                  Tambah User
                </span>
              </button>
            </div>
          </section>

          <section aria-label="Ringkasan pengguna" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {summaryCards.map((card) => {
              const Icon = card.icon

              return (
                <article
                  className="flex flex-col gap-3 rounded-2xl border border-[#c3c6d7] bg-white p-5 shadow-[0px_1px_2px_#0000000d]"
                  key={card.label}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold leading-4 tracking-[0.6px] text-[#434655]">
                      {card.label}
                    </span>
                    <span
                      className={cn(
                        'flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                        card.iconBox,
                      )}
                    >
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-2xl leading-8 font-bold tracking-[-0.24px] text-[#121c2a]">
                      {card.value}
                    </span>
                    {card.badge ? (
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 text-xs font-semibold leading-4',
                          card.badgeClass,
                        )}
                      >
                        {card.badge}
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs leading-[18px] text-[#434655]">{card.note}</p>
                </article>
              )
            })}
          </section>

          <section className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-5 shadow-[0px_1px_2px_#0000000d]">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative min-w-[240px] flex-1">
                <Search
                  aria-hidden="true"
                  className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#737686]"
                />
                <input
                  aria-label="Cari nama, email, atau username"
                  className={cn(inputClass, 'pl-10 pr-3.5')}
                  onChange={(event) => setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') applyFilters()
                  }}
                  placeholder="Cari nama / email / username..."
                  type="search"
                  value={query}
                />
              </div>

              <div className="w-[160px]">
                <select
                  aria-label="Filter role"
                  className={selectClass}
                  onChange={(event) => setRole(event.target.value as RoleFilter)}
                  value={role}
                >
                  <option value="all">Semua Role</option>
                  {USER_ROLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-[160px]">
                <select
                  aria-label="Filter status"
                  className={selectClass}
                  onChange={(event) => setStatus(event.target.value as StatusFilter)}
                  value={status}
                >
                  <option value="all">Semua Status</option>
                  {USER_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  className="flex h-11 items-center gap-2 rounded-xl bg-[#004ac6] px-4 shadow-[0px_1px_2px_#0000000d] transition hover:brightness-[0.98]"
                  onClick={applyFilters}
                  type="button"
                >
                  <ListFilter className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-white">
                    Filter
                  </span>
                </button>
                <button
                  className="flex h-11 items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-4 transition-colors hover:bg-[#f8f9ff]"
                  onClick={resetFilters}
                  type="button"
                >
                  <RotateCcw className="h-4 w-4 shrink-0 text-[#434655]" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#434655]">
                    Reset
                  </span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#d9e3f6] pt-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]">
                  Quick Filter Pills:
                </span>
                <span className="rounded-full border border-[#c3c6d7] bg-[#eff4ff] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6]">
                  Total Terpilih: {formatCount(filtered.length)} Akun
                </span>
                <span className="rounded-full border border-[#c3c6d7] bg-[#f8f9ff] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                  Role: {applied.role === 'all' ? 'Semua' : applied.role}
                </span>
                <span className="rounded-full border border-[#c3c6d7] bg-[#f8f9ff] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#434655]">
                  Status: {applied.status === 'all' ? 'Semua' : applied.status}
                </span>
                {selectedIds.length > 0 ? (
                  <span className="rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-3 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#047857]">
                    DICENTANG: {formatCount(selectedIds.length)} Akun
                  </span>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]">
                  Pilih Cepat:
                </span>
                <button
                  className="rounded-lg border border-[#c3c6d7] px-2.5 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#004ac6] transition-colors hover:bg-[#f8f9ff]"
                  onClick={selectAllFiltered}
                  type="button"
                >
                  Pilih Semua
                </button>
                <button
                  className={cn(
                    'rounded-lg border border-[#c3c6d7] px-2.5 py-1 text-[11px] font-medium leading-[14px] tracking-[0.44px] transition-colors',
                    selectedUsers.length > 0
                      ? 'text-[#121c2a] hover:bg-[#f8f9ff]'
                      : 'cursor-not-allowed text-[#737686] opacity-60',
                  )}
                  disabled={selectedUsers.length === 0}
                  onClick={() => downloadCsv(selectedUsers, 'user-terpilih-bms.csv')}
                  type="button"
                >
                  Export Selected
                </button>
              </div>
            </div>
          </section>

          <section className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-[0px_1px_2px_#0000000d]">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-[#c3c6d7] bg-[#eff4ff]">
                    <th className="w-[52px] px-6 py-4" scope="col">
                      <input
                        aria-label="Pilih semua user di halaman ini"
                        checked={allOnPageSelected}
                        className="h-4 w-4 accent-[#004ac6]"
                        onChange={toggleAllOnPage}
                        type="checkbox"
                      />
                    </th>
                    <th className={cn(tableHeaderClass, 'w-[56px] px-3')} scope="col">
                      NO
                    </th>
                    <th className={tableHeaderClass} scope="col">
                      NAMA LENGKAP &amp; AVATAR
                    </th>
                    <th className={tableHeaderClass} scope="col">
                      EMAIL / USERNAME
                    </th>
                    <th className={cn(tableHeaderClass, 'w-[124px]')} scope="col">
                      ROLE
                    </th>
                    <th className={cn(tableHeaderClass, 'w-[124px]')} scope="col">
                      STATUS
                    </th>
                    <th className={cn(tableHeaderClass, 'w-[132px]')} scope="col">
                      TERAKHIR LOGIN
                    </th>
                    <th className={cn(tableHeaderClass, 'w-[88px] text-right')} scope="col">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {pageRows.length === 0 ? (
                    <tr>
                      <td className="px-6 py-10 text-center" colSpan={8}>
                        <span className="text-sm leading-5 text-[#737686]">
                          Tidak ada pengguna yang cocok dengan filter saat ini.
                        </span>
                      </td>
                    </tr>
                  ) : (
                    pageRows.map((user, index) => {
                      const isSelected = selectedIds.includes(user.id)

                      return (
                        <tr
                          className={cn(
                            'border-t border-[#d9e3f6] transition-colors',
                            isSelected ? 'bg-[#004ac60d]' : 'hover:bg-[#f8f9ff]',
                          )}
                          key={user.id}
                        >
                          <td className="px-6 py-4">
                            <input
                              aria-label={`Pilih ${user.name}`}
                              checked={isSelected}
                              className="h-4 w-4 accent-[#004ac6]"
                              onChange={() => toggleRow(user.id)}
                              type="checkbox"
                            />
                          </td>
                          <td className="px-3 py-4 text-xs font-semibold leading-[18px] text-[#434655]">
                            {startIndex + index + 1}
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <span
                                className={cn(
                                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c3c6d7] text-xs font-semibold',
                                  ROLE_AVATAR_CLASS[user.role],
                                )}
                              >
                                {user.initials}
                              </span>
                              <div className="flex min-w-0 flex-col">
                                <span className="text-sm leading-5 font-semibold text-[#121c2a]">
                                  {user.name}
                                </span>
                                <span className="text-xs leading-[18px] text-[#434655]">
                                  {user.identity}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex flex-col">
                              <span className="text-sm leading-5 text-[#121c2a]">{user.email}</span>
                              <span className="text-xs leading-[18px] text-[#737686]">
                                {user.username}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={cn(
                                'inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-4',
                                ROLE_BADGE_CLASS[user.role],
                              )}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            <span
                              className={cn(
                                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold leading-4',
                                STATUS_BADGE_CLASS[user.status],
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={cn(
                                  'h-1.5 w-1.5 rounded-full',
                                  STATUS_DOT_CLASS[user.status],
                                )}
                              />
                              {user.status}
                            </span>
                          </td>
                          <td className="px-4 py-4">
                            {user.online ? (
                              <span className="inline-flex items-center gap-1.5 text-xs leading-[18px] font-semibold text-[#004ac6]">
                                <span
                                  aria-hidden="true"
                                  className="h-2 w-2 rounded-full bg-[#004ac6]"
                                />
                                {user.lastLogin}
                              </span>
                            ) : (
                              <span className="text-xs leading-[18px] text-[#434655]">
                                {user.lastLogin}
                              </span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-right">
                            <button
                              aria-haspopup="menu"
                              aria-expanded={menu?.id === user.id}
                              aria-label={`Aksi untuk ${user.name}`}
                              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-transparent text-[#434655] transition-colors hover:border-[#c3c6d7] hover:bg-white"
                              onClick={(event) => openMenu(user.id, event)}
                              type="button"
                            >
                              <EllipsisVertical className="h-4 w-4" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#c3c6d7] bg-[#f8f9ff] px-6 py-4">
              <p className="text-xs leading-[18px] text-[#434655]">
                Menampilkan{' '}
                <span className="font-semibold text-[#121c2a]">
                  {rangeStart} - {rangeEnd}
                </span>{' '}
                dari <span className="font-semibold text-[#121c2a]">{formatCount(filtered.length)}</span>{' '}
                pengguna
              </p>

              <div className="flex items-center gap-1">
                <button
                  aria-label="Halaman sebelumnya"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c3c6d7] bg-white text-[#121c2a] transition-colors hover:bg-[#f8f9ff] disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                  type="button"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                </button>

                {getPageItems(currentPage, totalPages).map((item, index) =>
                  item === '...' ? (
                    <span
                      className="flex h-8 items-center justify-center px-1.5 text-xs font-semibold text-[#434655]"
                      key={`ellipsis-${index}`}
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      aria-current={item === currentPage ? 'page' : undefined}
                      className={cn(
                        'flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-xs font-semibold transition-colors',
                        item === currentPage
                          ? 'bg-[#004ac6] text-white'
                          : 'border border-[#c3c6d7] bg-white text-[#121c2a] hover:bg-[#f8f9ff]',
                      )}
                      key={item}
                      onClick={() => setPage(item)}
                      type="button"
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  aria-label="Halaman berikutnya"
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#c3c6d7] bg-white text-[#121c2a] transition-colors hover:bg-[#f8f9ff] disabled:cursor-not-allowed disabled:opacity-40"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage(currentPage + 1)}
                  type="button"
                >
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </section>
        </main>
      </div>

      {menu && menuUser ? (
        <>
          <button
            aria-hidden="true"
            className="fixed inset-0 z-30 cursor-default"
            onClick={() => setMenu(null)}
            tabIndex={-1}
            type="button"
          />
          <div
            aria-label={`Menu aksi ${menuUser.name}`}
            className="fixed z-40 flex w-48 flex-col rounded-xl border border-[#c3c6d7] bg-white py-2 shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]"
            role="menu"
            style={{ top: menu.top, left: menu.left }}
          >
            <button
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition-colors hover:bg-[#f8f9ff]"
              onClick={() => {
                setMenu(null)
                setDialog({ mode: 'view', user: menuUser })
              }}
              role="menuitem"
              type="button"
            >
              <Eye className="h-4 w-4 shrink-0 text-[#334155]" aria-hidden="true" />
              <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#334155]">
                Lihat Detail
              </span>
            </button>
            <button
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition-colors hover:bg-[#f8f9ff]"
              onClick={() => {
                setMenu(null)
                setDialog({ mode: 'edit', user: menuUser })
              }}
              role="menuitem"
              type="button"
            >
              <Pencil className="h-4 w-4 shrink-0 text-[#334155]" aria-hidden="true" />
              <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#334155]">
                Edit User
              </span>
            </button>
            <button
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition-colors hover:bg-[#f8f9ff]"
              onClick={() => handleResetPassword(menuUser)}
              role="menuitem"
              type="button"
            >
              <KeyRound className="h-4 w-4 shrink-0 text-[#d97706]" aria-hidden="true" />
              <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#d97706]">
                Reset Password
              </span>
            </button>

            <div className="my-1 h-px w-full bg-[#c3c6d7]" aria-hidden="true" />

            <button
              className="flex w-full items-center gap-2.5 px-3.5 py-2 text-left transition-colors hover:bg-[#f8f9ff]"
              onClick={() => handleToggleStatus(menuUser)}
              role="menuitem"
              type="button"
            >
              {menuUser.status === 'Aktif' ? (
                <>
                  <UserX className="h-4 w-4 shrink-0 text-[#dc2626]" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#dc2626]">
                    Nonaktifkan User
                  </span>
                </>
              ) : (
                <>
                  <UserCheck className="h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
                  <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#047857]">
                    Aktifkan User
                  </span>
                </>
              )}
            </button>
          </div>
        </>
      ) : null}

      {dialog?.mode === 'deactivate' && dialog.user ? (
        <DeactivateUserModal
          onClose={() => setDialog(null)}
          onConfirm={(reason) => {
            if (dialog.user) handleDeactivateConfirm(dialog.user, reason)
          }}
          user={dialog.user}
        />
      ) : null}

      {dialog?.mode === 'reset' && dialog.user ? (
        <ResetPasswordModal
          onClose={() => setDialog(null)}
          onConfirm={(sendWhatsapp) => {
            if (dialog.user) handleResetPasswordConfirm(dialog.user, sendWhatsapp)
          }}
          user={dialog.user}
        />
      ) : null}

      {dialog?.mode === 'view' && dialog.user ? (
        <UserDetailModal
          onClose={() => setDialog(null)}
          onEdit={() => setDialog({ mode: 'edit', user: dialog.user })}
          user={dialog.user}
        />
      ) : null}

      {dialog && (dialog.mode === 'create' || dialog.mode === 'edit') ? (
        <UserFormModal
          mode={dialog.mode}
          onClose={() => setDialog(null)}
          onSubmit={handleDialogSubmit}
          user={dialog.user}
        />
      ) : null}

      {notice ? (
        <div
          className="fixed right-6 bottom-6 z-50 flex max-w-[360px] items-start gap-2 rounded-xl border border-[#a7f3d0] bg-[#ecfdf5] px-4 py-3 shadow-[0px_8px_16px_#0000001a]"
          role="status"
        >
          <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]" aria-hidden="true" />
          <span className="text-xs leading-[18px] text-[#047857]">{notice}</span>
        </div>
      ) : null}
    </div>
  )
}
