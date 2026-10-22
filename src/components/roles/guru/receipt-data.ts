export interface ReceiptData {
  reference: string
  service: string
  datetime: string
  channel: string
  amount: string
  spelled: string
  amountLabel?: string
  entryLabel?: string
  entryKind?: 'in' | 'out'
  openingBalance: string
  depositAmount: string
  closingBalance: string
  customerName: string
  nisn: string
  classProgram: string
  accountNumber: string
  memo: string
  tellerName: string
  tellerId: string
}

const SATUAN = ['', 'Satu', 'Dua', 'Tiga', 'Empat', 'Lima', 'Enam', 'Tujuh', 'Delapan', 'Sembilan']

function terbilangAngka(n: number): string {
  if (n < 10) return SATUAN[n]
  if (n === 10) return 'Sepuluh'
  if (n === 11) return 'Sebelas'
  if (n < 20) return `${SATUAN[n - 10]} Belas`
  if (n < 100) return `${SATUAN[Math.floor(n / 10)]} Puluh ${terbilangAngka(n % 10)}`.trim()
  if (n === 100) return 'Seratus'
  if (n < 200) return `Seratus ${terbilangAngka(n - 100)}`.trim()
  if (n < 1_000) return `${SATUAN[Math.floor(n / 100)]} Ratus ${terbilangAngka(n % 100)}`.trim()
  if (n === 1_000) return 'Seribu'
  if (n < 2_000) return `Seribu ${terbilangAngka(n - 1_000)}`.trim()
  if (n < 1_000_000)
    return `${terbilangAngka(Math.floor(n / 1_000))} Ribu ${terbilangAngka(n % 1_000)}`.trim()
  if (n < 1_000_000_000)
    return `${terbilangAngka(Math.floor(n / 1_000_000))} Juta ${terbilangAngka(n % 1_000_000)}`.trim()
  return `${terbilangAngka(Math.floor(n / 1_000_000_000))} Miliar ${terbilangAngka(n % 1_000_000_000)}`.trim()
}

/** Menghasilkan tulisan terbilang, contoh: 500000 -> "Lima Ratus Ribu Rupiah". */
export function terbilangRupiah(value: number): string {
  return `${terbilangAngka(Math.trunc(value))} Rupiah`
}

export const DEFAULT_RECEIPT: ReceiptData = {
  reference: 'TRX-TBG-20261024-0089',
  service: 'Setoran Tabungan Reguler',
  datetime: '24 Okt 2026 • 09:42:15 WIB',
  channel: 'Teller Loket 01 (Offline)',
  amount: 'Rp 500.000',
  spelled: 'Lima Ratus Ribu Rupiah',
  amountLabel: 'NOMINAL SETORAN TABUNGAN',
  entryLabel: 'Setoran Masuk (+)',
  entryKind: 'in',
  openingBalance: 'Rp 1.250.000',
  depositAmount: '+ Rp 500.000',
  closingBalance: 'Rp 1.750.000',
  customerName: 'Adinda Putri Saharani',
  nisn: '0064218933',
  classProgram: 'XII RPL 1 (Rekayasa Perangkat Lunak)',
  accountNumber: '8820-019-332',
  memo: '"Setoran rutin tabungan saku mingguan via Loket Teller 1"',
  tellerName: 'Hendra Wijaya, S.Ak.',
  tellerId: 'NBM: 1048291',
}