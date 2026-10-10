export type SuperAdminUserRole = 'Guru' | 'Siswa' | 'Admin' | 'Petugas' | 'Akuntansi' | 'Super Admin'

export type SuperAdminUserStatus = 'Aktif' | 'Nonaktif'

export interface UserInfoItem {
  label: string
  value: string
}

export interface UserActivity {
  id: string
  text: string
  time: string
  kind: 'transaksi' | 'otentikasi'
}

export interface SuperAdminUser {
  id: string
  name: string
  identity: string
  email: string
  username: string
  role: SuperAdminUserRole
  status: SuperAdminUserStatus
  lastLogin: string
  online?: boolean
  initials: string
  phone?: string
  roleLabel?: string
  info?: UserInfoItem[]
  activities?: UserActivity[]
}

export const USER_ROLE_OPTIONS: SuperAdminUserRole[] = [
  'Guru',
  'Siswa',
  'Admin',
  'Petugas',
  'Akuntansi',
  'Super Admin',
]

export const USER_STATUS_OPTIONS: SuperAdminUserStatus[] = ['Aktif', 'Nonaktif']

export const ROLE_BADGE_CLASS: Record<SuperAdminUserRole, string> = {
  Guru: 'border-[#bae6fd] bg-[#e0f2fe] text-[#075985]',
  Siswa: 'border-[#c7d2fe] bg-[#e0e7ff] text-[#3730a3]',
  Admin: 'border-[#fde68a] bg-[#fef3c7] text-[#92400e]',
  Petugas: 'border-[#e9d5ff] bg-[#f3e8ff] text-[#6b21a8]',
  Akuntansi: 'border-[#a5f3fc] bg-[#cffafe] text-[#155e75]',
  'Super Admin': 'border-[#a7f3d0] bg-[#d1fae5] text-[#065f46]',
}

export const ROLE_AVATAR_CLASS: Record<SuperAdminUserRole, string> = {
  Guru: 'bg-[#e0f2fe] text-[#075985]',
  Siswa: 'bg-[#e0e7ff] text-[#3730a3]',
  Admin: 'bg-[#fef3c7] text-[#92400e]',
  Petugas: 'bg-[#f3e8ff] text-[#6b21a8]',
  Akuntansi: 'bg-[#cffafe] text-[#155e75]',
  'Super Admin': 'bg-[#d1fae5] text-[#065f46]',
}

export const STATUS_BADGE_CLASS: Record<SuperAdminUserStatus, string> = {
  Aktif: 'border-[#a7f3d0] bg-[#ecfdf5] text-[#047857]',
  Nonaktif: 'border-[#fecdd3] bg-[#fff1f2] text-[#be123c]',
}

export const STATUS_DOT_CLASS: Record<SuperAdminUserStatus, string> = {
  Aktif: 'bg-[#10b981]',
  Nonaktif: 'bg-[#f43f5e]',
}

export const USER_SUMMARY = {
  total: '1.248',
  totalNote: 'Semua akun terdaftar',
  active: '1.210',
  activeBadge: '96.9% Aktif',
  activeNote: '96.9% Tingkat keaktifan',
  inactive: '38',
  inactiveBadge: 'Perhatian',
  inactiveNote: 'Akun ditangguhkan / alumni',
  staff: '12',
  staffBadge: 'Staf Otoritas',
  staffNote: '8 Kasir, 3 Akuntansi, 1 Kepala Lab',
}

export const SUPER_ADMIN_USERS: SuperAdminUser[] = [
  {
    id: 'USR-1001',
    name: 'Drs. Ahmad Fauzan, M.Pd.',
    identity: 'NIP: 19780512 200312 1 002',
    email: 'ahmad@mail.com',
    username: '@ahmadfauzan',
    role: 'Guru',
    status: 'Aktif',
    lastLogin: 'Hari ini, 10:32 WIB',
    initials: 'AF',
    phone: '+62 812-3456-7891',
    roleLabel: 'Guru (Pendidik Tetap)',
    info: [
      { label: 'Mata Pelajaran Diampu', value: 'Teknik Komputer & Jaringan (TKJ)' },
      { label: 'Unit Kerja / Cabang', value: 'SMKS Muhammadiyah 1 Genteng' },
      { label: 'Akses BMS Finansial', value: 'Level 2 (Input SPP & Rekap Siswa)' },
      { label: 'Peralatan Terdaftar', value: '2 Perangkat' },
    ],
    activities: [
      { id: 'ACT-1001-1', kind: 'transaksi', text: 'Verifikasi SPP Kelas XI TKJ 1', time: '08:14 WIB' },
      {
        id: 'ACT-1001-2',
        kind: 'otentikasi',
        text: 'Otentikasi Berhasil (Chrome / Windows 11)',
        time: '07:42 WIB',
      },
    ],
  },
  {
    id: 'USR-1002',
    name: 'Sinta Putri Lestari',
    identity: 'NISN: 0068192381',
    email: 'sinta@mail.com',
    username: '@sintaputri',
    role: 'Siswa',
    status: 'Aktif',
    lastLogin: 'Hari ini, 09:45 WIB',
    initials: 'SL',
  },
  {
    id: 'USR-1003',
    name: 'Budi Santoso, S.Kom.',
    identity: 'ID: ADM-02',
    email: 'budi@mail.com',
    username: '@budisantoso',
    role: 'Admin',
    status: 'Aktif',
    lastLogin: 'Hari ini, 08:30 WIB',
    initials: 'BS',
  },
  {
    id: 'USR-1004',
    name: 'Rina Melati, A.Md.',
    identity: 'ID: PTG-04',
    email: 'rina@mail.com',
    username: '@rinamelati',
    role: 'Petugas',
    status: 'Nonaktif',
    lastLogin: '01 Sep 2026, 14:10',
    initials: 'RM',
  },
  {
    id: 'USR-1005',
    name: 'Hendra Wijaya, S.Ak.',
    identity: 'ID: FIN-01',
    email: 'hendra@mail.com',
    username: '@hendrawijaya',
    role: 'Akuntansi',
    status: 'Aktif',
    lastLogin: '02 Okt 2026, 08:46',
    initials: 'HW',
  },
  {
    id: 'USR-1006',
    name: 'Ir. H. Ahmad Dahlan, M.T.',
    identity: 'ID: SYS-00',
    email: 'dahlan@smkmuhi.sch.id',
    username: 'Super Admin Root',
    role: 'Super Admin',
    status: 'Aktif',
    lastLogin: 'Sedang Aktif',
    online: true,
    initials: 'AD',
  },
  {
    id: 'USR-1007',
    name: 'Siti Rahmawati, S.E.',
    identity: 'ID: ADM-01',
    email: 'siti@mail.com',
    username: '@sitirahmawati',
    role: 'Admin',
    status: 'Aktif',
    lastLogin: 'Hari ini, 10:05 WIB',
    initials: 'SR',
  },
  {
    id: 'USR-1008',
    name: 'Drs. Bambang Suryadi',
    identity: 'NIP: 19750314 199903 2 004',
    email: 'bambang@mail.com',
    username: '@bambangsuryadi',
    role: 'Guru',
    status: 'Aktif',
    lastLogin: 'Hari ini, 07:58 WIB',
    initials: 'BS',
  },
  {
    id: 'USR-1009',
    name: 'Lestari Ningsih, S.Pd.',
    identity: 'NIP: 19821109 200812 2 006',
    email: 'ningsih@mail.com',
    username: '@lestariningsih',
    role: 'Guru',
    status: 'Nonaktif',
    lastLogin: '12 Sep 2026, 11:20',
    initials: 'LN',
  },
  {
    id: 'USR-1010',
    name: 'Dewi Anggraini',
    identity: 'NISN: 0071234567',
    email: 'dewi@mail.com',
    username: '@dwianggraini',
    role: 'Siswa',
    status: 'Aktif',
    lastLogin: 'Hari ini, 09:12 WIB',
    initials: 'DA',
  },
  {
    id: 'USR-1011',
    name: 'Rizky Ramadhan',
    identity: 'NISN: 0069988776',
    email: 'rizky@mail.com',
    username: '@rizkyramadhan',
    role: 'Siswa',
    status: 'Aktif',
    lastLogin: 'Kemarin, 15:40 WIB',
    initials: 'RR',
  },
  {
    id: 'USR-1012',
    name: 'Agus Salim, S.Kom.',
    identity: 'ID: PTG-05',
    email: 'agus@mail.com',
    username: '@agussalim',
    role: 'Petugas',
    status: 'Aktif',
    lastLogin: 'Hari ini, 08:05 WIB',
    initials: 'AS',
  },
  {
    id: 'USR-1013',
    name: 'Fitri Handayani',
    identity: 'ID: FIN-02',
    email: 'fitri@mail.com',
    username: '@fitrihandayani',
    role: 'Akuntansi',
    status: 'Aktif',
    lastLogin: '03 Okt 2026, 13:27',
    initials: 'FH',
  },
  {
    id: 'USR-1014',
    name: 'Muhammad Ilham',
    identity: 'NISN: 0065544332',
    email: 'ilham@mail.com',
    username: '@mhilham',
    role: 'Siswa',
    status: 'Nonaktif',
    lastLogin: '20 Agu 2026, 10:03',
    initials: 'MI',
  },
]

export function getInitials(name: string): string {
  const words = name
    .replace(/[.,]/g, ' ')
    .split(/\s+/)
    .filter(Boolean)

  if (words.length === 0) return '??'
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase()

  return (words[0][0] + words[1][0]).toUpperCase()
}

export function formatCount(value: number): string {
  return value.toLocaleString('id-ID')
}

const ROLE_LABEL: Record<SuperAdminUserRole, string> = {
  Guru: 'Guru (Pendidik Tetap)',
  Siswa: 'Siswa (Peserta Didik)',
  Admin: 'Admin (Staf Operasional)',
  Petugas: 'Petugas (Kasir BMS)',
  Akuntansi: 'Staf Akuntansi',
  'Super Admin': 'Super Admin (K3)',
}

const ROLE_PRIMARY_INFO: Record<SuperAdminUserRole, UserInfoItem> = {
  Guru: { label: 'Mata Pelajaran Diampu', value: 'Umum / Kesiswaan' },
  Siswa: { label: 'Kelas / Rombel', value: 'XI TKJ 1' },
  Admin: { label: 'Unit / Penempatan', value: 'Loket Kasir BMS' },
  Petugas: { label: 'Unit / Penempatan', value: 'Loket Kasir BMS' },
  Akuntansi: { label: 'Unit / Penempatan', value: 'Ruang Akuntansi BMS' },
  'Super Admin': { label: 'Lingkup Akses', value: 'Administrator Sistem BMS' },
}

const ROLE_ACCESS: Record<SuperAdminUserRole, string> = {
  Guru: 'Level 2 (Input SPP & Rekap Siswa)',
  Siswa: 'Level 1 (Lihat Saldo & Riwayat)',
  Admin: 'Level 3 (Kelola Transaksi & Rekap)',
  Petugas: 'Level 2 (Input SPP & Rekap Siswa)',
  Akuntansi: 'Level 4 (Jurnal & Laporan Keuangan)',
  'Super Admin': 'Level 5 (Akses Penuh Sistem)',
}

const ROLE_ACTIVITY_TEXT: Record<SuperAdminUserRole, string> = {
  Guru: 'Verifikasi SPP siswa',
  Siswa: 'Cek saldo tabungan',
  Admin: 'Verifikasi pembayaran SPP siswa',
  Petugas: 'Input setoran tabungan loket',
  Akuntansi: 'Posting jurnal umum harian',
  'Super Admin': 'Meninjau log audit sistem',
}

export interface UserDetailData {
  roleLabel: string
  phone: string
  info: UserInfoItem[]
  activities: UserActivity[]
}

export function resolveUserDetail(user: SuperAdminUser): UserDetailData {
  return {
    roleLabel: user.roleLabel ?? ROLE_LABEL[user.role],
    phone: user.phone ?? 'Belum terdaftar',
    info:
      user.info ??
      [
        ROLE_PRIMARY_INFO[user.role],
        { label: 'Unit Kerja / Cabang', value: 'SMKS Muhammadiyah 1 Genteng' },
        { label: 'Akses BMS Finansial', value: ROLE_ACCESS[user.role] },
        { label: 'Peralatan Terdaftar', value: '1 Perangkat' },
      ],
    activities:
      user.activities ??
      [
        {
          id: `${user.id}-LOG-1`,
          kind: 'transaksi',
          text: ROLE_ACTIVITY_TEXT[user.role],
          time: '08:14 WIB',
        },
        {
          id: `${user.id}-LOG-2`,
          kind: 'otentikasi',
          text: 'Otentikasi Berhasil (Chrome / Windows 11)',
          time: user.online ? 'Sedang Aktif' : '07:42 WIB',
        },
      ],
  }
}
