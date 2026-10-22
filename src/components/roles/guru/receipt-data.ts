export interface ReceiptRow {
  label: string
  value: string
  mono?: boolean
  accent?: boolean
}

export interface ReceiptData {
  status: string
  watermark: string
  rows: ReceiptRow[]
}
