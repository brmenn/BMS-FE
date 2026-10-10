export interface RoleProfile {
  name: string
  initials: string
  roleLabel: string
  identity: string
  email: string
  phone: string
  status: 'Aktif' | 'Nonaktif'
  lastLogin: string
}

const ROLE_PROFILES: Record<string, RoleProfile> = {
  'Super Admin': {
    name: 'Ir. H. Ahmad Dahlan, M.T.',
    initials: 'AD',
    roleLabel: 'Super Admin (K3)',
    identity: 'ID: SYS-00',
    email: 'dahlan@smkmuhi.sch.id',
    phone: '+62 812-1100-2200',
    status: 'Aktif',
    lastLogin: 'Sedang Aktif',
  },
  Admin: {
    name: 'Budi Santoso, S.Kom.',
    initials: 'BS',
    roleLabel: 'Admin (Staf Operasional)',
    identity: 'ID: ADM-02',
    email: 'budi@mail.com',
    phone: '+62 812-3344-5566',
    status: 'Aktif',
    lastLogin: 'Hari ini, 08:30 WIB',
  },
  'Guru & Karyawan': {
    name: 'Drs. Ahmad Fauzan, M.Pd.',
    initials: 'AF',
    roleLabel: 'Guru (Pendidik Tetap)',
    identity: 'NIP: 19780512 200312 1 002',
    email: 'ahmad@mail.com',
    phone: '+62 812-3456-7891',
    status: 'Aktif',
    lastLogin: 'Hari ini, 10:32 WIB',
  },
  Akuntansi: {
    name: 'Hendra Wijaya, S.Ak.',
    initials: 'HW',
    roleLabel: 'Staf Akuntansi',
    identity: 'ID: FIN-01',
    email: 'hendra@mail.com',
    phone: '+62 812-7788-9900',
    status: 'Aktif',
    lastLogin: '02 Okt 2026, 08:46',
  },
  Siswa: {
    name: 'Sinta Putri Lestari',
    initials: 'SL',
    roleLabel: 'Siswa (Peserta Didik)',
    identity: 'NISN: 0068192381',
    email: 'sinta@mail.com',
    phone: '+62 813-2233-4455',
    status: 'Aktif',
    lastLogin: 'Hari ini, 09:45 WIB',
  },
}

const DEFAULT_PROFILE: RoleProfile = {
  name: 'Pengguna BMS',
  initials: 'PB',
  roleLabel: 'Pengguna BMS',
  identity: 'ID: USR-0000',
  email: 'pengguna@smkmuhi.sch.id',
  phone: '+62 812-0000-0000',
  status: 'Aktif',
  lastLogin: 'Hari ini, 07:30 WIB',
}

export function getRoleProfile(role?: string): RoleProfile {
  if (!role) return DEFAULT_PROFILE
  return ROLE_PROFILES[role] ?? { ...DEFAULT_PROFILE, roleLabel: role }
}
