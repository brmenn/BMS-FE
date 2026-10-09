export type CashDirection = 'masuk' | 'keluar'
export type MethodKind = 'transfer' | 'tunai'

export interface CashFlowTransaction {
  id: string
  reference: string
  amount: number
  direction: CashDirection
  dateLabel: string
  userName: string
  userMeta: string
  group: string
  transactionType: string
  transactionNote: string
  paidNote: string
  method: MethodKind
  methodLabel: string
  methodNote: string
  bookedAt: string
  bookedNote: string
  officerName: string
  officerMeta: string
  officerTerminal: string
  hash: string
  status: string
}

export const CASH_FLOW_TRANSACTIONS: CashFlowTransaction[] = [
  {
    id: '1',
    reference: 'TRX-20261001-001',
    amount: 420000,
    direction: 'masuk',
    dateLabel: '01 Okt 2026, 10:15',
    userName: 'Ahmad Fauzan',
    userMeta: 'NIP: 19820415 • Guru Tetap',
    group: 'Guru/Karyawan',
    transactionType: 'Pembayaran Cicilan',
    transactionNote: 'Angsuran Pinjaman Ke-5',
    paidNote: '(Lunas Sesuai Tagihan)',
    method: 'transfer',
    methodLabel: 'Transfer',
    methodNote: 'Bank Syariah Indonesia (BSI) • Ref: BSI-882193',
    bookedAt: '01 Oktober 2026, 10:15 WIB',
    bookedNote: 'Tercatat di Jurnal Penerimaan Kas',
    officerName: 'Admin BMS',
    officerMeta: '(Siti Rahmawati, S.E. - Kasir Pusat)',
    officerTerminal: 'Terminal Kasir 01',
    hash: 'HASH: 48F2-99AB-2026-BMS-01GEN',
    status: 'BERHASIL',
  },
  {
    id: '2',
    reference: 'TRX-20261002-014',
    amount: 150000,
    direction: 'keluar',
    dateLabel: '02 Okt 2026, 14:30',
    userName: 'Budi Santoso',
    userMeta: 'NIS: 2023045 • Siswa Kelas XI',
    group: 'Siswa',
    transactionType: 'Penarikan Tabungan',
    transactionNote: 'Penarikan Tabungan Sukarela',
    paidNote: '(Sesuai Jumlah Penarikan)',
    method: 'tunai',
    methodLabel: 'Tunai',
    methodNote: 'Kasir Sekolah • Kwitansi: KW-2026-014',
    bookedAt: '02 Oktober 2026, 14:30 WIB',
    bookedNote: 'Tercatat di Jurnal Pengeluaran Kas',
    officerName: 'Admin BMS',
    officerMeta: '(Siti Rahmawati, S.E. - Kasir Pusat)',
    officerTerminal: 'Terminal Kasir 01',
    hash: 'HASH: 7C1D-44EF-2026-BMS-02GEN',
    status: 'BERHASIL',
  },
  {
    id: '3',
    reference: 'TRX-20261003-021',
    amount: 250000,
    direction: 'masuk',
    dateLabel: '03 Okt 2026, 09:05',
    userName: 'Siti Aminah',
    userMeta: 'NIP: 19900112 • Guru Tetap',
    group: 'Guru/Karyawan',
    transactionType: 'Setoran Tabungan',
    transactionNote: 'Setoran Tunai Tabungan Bulanan',
    paidNote: '(Lunas Sesuai Setoran)',
    method: 'tunai',
    methodLabel: 'Tunai',
    methodNote: 'Kasir Sekolah • Kwitansi: KW-2026-021',
    bookedAt: '03 Oktober 2026, 09:05 WIB',
    bookedNote: 'Tercatat di Jurnal Penerimaan Kas',
    officerName: 'Admin BMS',
    officerMeta: '(Siti Rahmawati, S.E. - Kasir Pusat)',
    officerTerminal: 'Terminal Kasir 01',
    hash: 'HASH: A3B7-12CD-2026-BMS-03GEN',
    status: 'BERHASIL',
  },
  {
    id: '4',
    reference: 'TRX-20261005-033',
    amount: 75000,
    direction: 'masuk',
    dateLabel: '05 Okt 2026, 11:20',
    userName: 'Rina Wulandari',
    userMeta: 'NIS: 2024118 • Siswa Kelas X',
    group: 'Siswa',
    transactionType: 'Pembayaran Kegiatan',
    transactionNote: 'Uang Kegiatan Ekstrakurikuler',
    paidNote: '(Lunas Sesuai Tagihan)',
    method: 'transfer',
    methodLabel: 'Transfer',
    methodNote: 'Bank Rakyat Indonesia (BRI) • Ref: BRI-441208',
    bookedAt: '05 Oktober 2026, 11:20 WIB',
    bookedNote: 'Tercatat di Jurnal Penerimaan Kas',
    officerName: 'Admin BMS',
    officerMeta: '(Siti Rahmawati, S.E. - Kasir Pusat)',
    officerTerminal: 'Terminal Kasir 01',
    hash: 'HASH: D9E5-61F0-2026-BMS-04GEN',
    status: 'BERHASIL',
  },
]

export function getTransactionById(id: string | undefined): CashFlowTransaction {
  return CASH_FLOW_TRANSACTIONS.find((item) => item.id === id) ?? CASH_FLOW_TRANSACTIONS[0]
}
