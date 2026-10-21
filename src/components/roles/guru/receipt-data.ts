export interface ReceiptData {
  reference: string
  service: string
  datetime: string
  channel: string
  amount: string
  spelled: string
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

export const DEFAULT_RECEIPT: ReceiptData = {
  reference: 'TRX-TBG-20261024-0089',
  service: 'Setoran Tabungan Reguler',
  datetime: '24 Okt 2026 • 09:42:15 WIB',
  channel: 'Teller Loket 01 (Offline)',
  amount: 'Rp 500.000',
  spelled: 'Lima Ratus Ribu Rupiah',
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