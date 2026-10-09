import { SlidersHorizontal, UserPlus, ArrowRight, TrendingUp } from 'lucide-react'
import { SuperAdminSidebar } from '../components/SuperAdminSidebar'
import { SuperAdminTopbar } from '../components/SuperAdminTopbar'

const roleData = [
  { label: 'Siswa', count: '980 Siswa', percent: 78.5, color: 'bg-[#2563eb]' },
  { label: 'Guru (Pendidik)', count: '120 Guru', percent: 9.6, color: 'bg-[#0284c7]' },
  { label: 'Karyawan / Tendik', count: '96 Karyawan', percent: 7.7, color: 'bg-[#4f46e5]' },
  { label: 'Admin / Petugas Kasir', count: '12 Admin', percent: 1.0, color: 'bg-[#f59e0b]' },
  { label: 'Super Admin / K3', count: '1 Super Admin', percent: 0.1, color: 'bg-[#e11d48]' },
]

const financeData = [
  { title: 'KAS SISWA', value: 'Rp 85.000.000', desc: 'Saldo riil kas loket siswa', textColor: 'text-[#121c2a]' },
  { title: 'KAS GURU / KARYAWAN', value: 'Rp 40.500.000', desc: 'Simpan pinjam pendidik & tendik', textColor: 'text-[#121c2a]' },
  { title: 'TOTAL PINJAMAN', value: 'Rp 45.000.000', desc: '18 pinjaman aktif berjalan', textColor: 'text-[#b45309]' },
  { title: 'TOTAL TABUNGAN', value: 'Rp 125.000.000', desc: 'Akumulasi saldo 1.245 rekening', textColor: 'text-[#047857]' },
]

const activities = [
  {
    id: 1,
    badge: '01',
    badgeClass: 'bg-[#eff6ff] text-[#2563eb]',
    name: 'Admin 01 (Siti Rahmawati, S.E.)',
    action: 'menambahkan transaksi setoran tabungan',
    amount: 'Rp 500.000',
    ref: '(JR-001)',
    tag: 'Kasir Loket',
    module: 'Modul Transaksi Tabungan',
    time: '10:32 WIB',
    status: 'Sukses',
    dot: 'bg-[#10b981]',
    statusColor: 'text-[#047857]',
  },
  {
    id: 2,
    badge: '02',
    badgeClass: 'bg-[#eef2ff] text-[#4f46e5]',
    name: 'Admin 02 (Budi Santoso)',
    action: 'menyetujui pengajuan penarikan',
    amount: 'Rp 200.000',
    ref: '(WD-20261002-04)',
    tag: 'Otorisasi Kasir',
    module: 'Penarikan Rekening Siswa',
    time: '10:15 WIB',
    status: 'Diverifikasi',
    dot: 'bg-[#10b981]',
    statusColor: 'text-[#047857]',
  },
  {
    id: 3,
    badge: 'K3',
    badgeClass: 'bg-[#fff1f2] text-[#e11d48]',
    name: 'Super Admin (Ir. H. Ahmad Dahlan, M.T.)',
    action: 'mengubah role pengguna',
    highlight1: 'Karyawan',
    action2: 'menjadi',
    highlight2: 'Staf Akuntansi',
    tag: 'Hak Akses',
    tagClass: 'bg-[#ffe4e6] text-[#9f1239]',
    module: 'User ID: USR-88219 (Drs. Bambang S.)',
    time: '09:45 WIB',
    status: 'Disimpan',
    dot: 'bg-[#3b82f6]',
    statusColor: 'text-[#1d4ed8]',
  },
  {
    id: 4,
    badge: 'RM',
    badgeClass: 'bg-[#fffbeb] text-[#d97706]',
    name: 'Petugas (Rina Melati)',
    action: 'mencatat pembayaran cicilan pinjaman ke-3',
    amount: 'Rp 420.000',
    tag: 'Simpan Pinjam',
    module: 'Kontrak: LN-202604-012',
    time: '09:20 WIB',
    status: 'Lunas Angsuran',
    dot: 'bg-[#10b981]',
    statusColor: 'text-[#047857]',
  },
]

export function SuperAdminDashboardPage() {
  return (
    <div className="flex min-h-screen w-full bg-[#f8f9ff]">
      <div className="hidden md:flex md:w-[264px]">
        <SuperAdminSidebar />
      </div>

      <div className="flex w-full flex-col">
        <SuperAdminTopbar />

        <main id="dashboard" className="flex flex-col gap-5 px-4 py-6 sm:px-6 lg:px-8">
          <section className="flex flex-col gap-4 border-b border-[#dee9fcb2] pb-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-1">
              <h1 className="text-[30px] font-extrabold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                Dashboard
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-4 shadow-[0px_1px_2px_#0000000d] hover:brightness-[0.98]"
              >
               
<SlidersHorizontal className="h-[13.5px] w-[13.5px] text-[#121c2a]" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-[#121c2a]">Konfigurasi Sistem</span>
              </button>
              <button
                type="button"
                className="flex h-11 items-center gap-2 rounded-xl bg-[#2563eb] px-5 shadow-[0px_2px_4px_-2px_#3b82f633,0px_4px_6px_-1px_#3b82f633] hover:brightness-[0.98]"
              >
                <UserPlus className="h-3 w-[16.5px] text-white" aria-hidden="true" />
                <span className="text-sm font-medium leading-5 text-white">Tambah Pengguna</span>
              </button>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_303px]">
            <article className="grid gap-6 rounded-2xl border border-[#c3c6d7b2] bg-white px-6 py-5 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a] sm:grid-cols-[1fr_1px_1fr]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <h2 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#434655]">
                    TOTAL PENGGUNA
                  </h2>
                </div>
                <div className="flex flex-col items-start">
                  <div className="text-[30px] font-extrabold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                    1.248
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="text-xs leading-[18px] text-[#737686]">Semua akun terdaftar</p>
                  <div className="flex items-center gap-2 border-t border-[#e6eeff] pt-3">
                    <TrendingUp className="h-3.5 w-3.5 shrink-0 text-[#047857]" aria-hidden="true" />
                    <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#047857]">
                      +24 pengguna baru bulan ini
                    </p>
                  </div>
                </div>
              </div>

              <div className="hidden h-full w-px bg-[#e6eeff] sm:block" aria-hidden="true" />

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold leading-6 text-[#121c2a]">Status Sistem</h2>
                  <span className="text-[11px] font-medium leading-[16.5px] text-[#737686]">
                    Diperbarui: Baru saja
                  </span>
                </div>
                <div className="flex flex-col gap-2.5">
                  {[
                    { text: 'Sistem Normal', sub: 'Latensi 18ms • Uptime 99.98%' },
                    { text: 'Database Terhubung', sub: 'Primary Synced', subColor: 'text-[#047857]' },
                    { text: 'Notifikasi WhatsApp Aktif', sub: 'Gateway API Online' },
                    { text: 'Audit Log Aktif', sub: 'TLS 1.3 & Hash Chain Valid', subColor: 'text-[#047857]' },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between rounded-xl border border-[#dee9fc99] bg-[#eff4ff80] px-2.5 py-2"
                      role="status"
                    >
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" aria-hidden="true" />
                        <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                          {item.text}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#737686] ${
                          item.subColor ?? ''
                        }`}
                      >
                        {item.sub}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <div className="flex flex-col gap-5">
              <article className="flex flex-col gap-2 rounded-2xl border border-[#c3c6d7b2] bg-white px-5 pb-4 pt-8 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#434655]">
                  AKTIVITAS HARI INI
                </h2>
                <div className="flex flex-col items-start">
                  <div className="text-[30px] font-extrabold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                    86
                  </div>
                  <p className="text-xs leading-[18px] text-[#737686]">Aktivitas tercatat</p>
                </div>
              </article>
              <article className="flex flex-col gap-2 rounded-2xl border border-[#c3c6d7b2] bg-white px-5 pb-4 pt-8 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
                <h2 className="text-xs font-semibold uppercase tracking-[0.6px] text-[#434655]">
                  ADMIN / PETUGAS
                </h2>
                <div className="flex flex-col items-start">
                  <div className="text-[30px] font-extrabold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                    12
                  </div>
                  <p className="text-xs leading-[18px] text-[#737686]">Akun operasional bertugas</p>
                </div>
              </article>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-2">
            <article className="flex flex-col gap-5 rounded-2xl border border-[#c3c6d7b2] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold leading-6 text-[#121c2a]">Pengguna Berdasarkan Role</h2>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Distribusi 1.248 akun terdaftar pada sistem BMS
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {roleData.map((role) => (
                  <div key={role.label} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`h-2.5 w-2.5 rounded-full ${role.color}`} aria-hidden="true" />
                        <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                          {role.label}
                        </span>
                      </div>
                      <span className="text-xs font-medium leading-4 tracking-[0.24px] text-[#434655]">
                        {role.count} • {role.percent}%
                      </span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-[#e6eeff]">
                      <div
                        className={`h-full ${role.color}`}
                        style={{ width: `${role.percent}%` }}
                        role="progressbar"
                        aria-label={role.label}
                        aria-valuenow={role.percent}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7b2] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold leading-6 text-[#121c2a]">
                  Ringkasan Keuangan Menyeluruh
                </h2>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Agregasi data kas dan perbankan mini bank sekolah
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {financeData.map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col gap-1 rounded-xl border border-[#dee9fccc] bg-[#eff4ff99] p-4"
                  >
                    <h3 className="text-[11px] font-bold uppercase leading-[14px] tracking-[0.55px] text-[#737686]">
                      {item.title}
                    </h3>
                    <div className={`text-xl font-bold leading-7 tracking-[-0.1px] ${item.textColor}`}>
                      {item.value}
                    </div>
                    <p className="text-xs leading-[18px] text-[#737686]">{item.desc}</p>
                  </article>
                ))}
              </div>
            </article>
          </section>

          <section className="flex flex-col gap-5 rounded-2xl border border-[#c3c6d7b2] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-bold leading-6 text-[#121c2a]">Aktivitas Terbaru</h2>
                <p className="text-xs leading-[18px] text-[#434655]">
                  Catatan audit log transaksi dan perubahan hak akses secara realtime
                </p>
              </div>
              <button
                type="button"
                className="flex items-center gap-1.5 rounded-lg border border-[#c3c6d7] px-3 py-1.5 hover:brightness-[0.98]"
              >
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#004ac6]">
                  Lihat Semua
                </span>
                <ArrowRight className="h-[10.67px] w-[10.67px] text-[#004ac6]" aria-hidden="true" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-[#e6eeff]">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-3 px-2 py-3 sm:flex-row sm:items-center sm:justify-between"
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
          </section>
        </main>
      </div>
    </div>
  )
}