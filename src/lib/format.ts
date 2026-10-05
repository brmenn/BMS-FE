const LOCALE = 'id-ID'

/**
 * Money crosses the wire as an exact string ("100000.00") to preserve rupiah
 * precision, so it is parsed into a number only at the moment of display.
 */
export function formatMoney(value: string | number | null | undefined, withSymbol = true): string {
  if (value === null || value === undefined || value === '') return withSymbol ? 'Rp0' : '0'

  const amount = typeof value === 'number' ? value : Number.parseFloat(value)
  if (Number.isNaN(amount)) return String(value)

  return new Intl.NumberFormat(LOCALE, {
    style: withSymbol ? 'currency' : 'decimal',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatNumber(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') return '0'
  const amount = typeof value === 'number' ? value : Number.parseFloat(value)
  if (Number.isNaN(amount)) return String(value)
  return new Intl.NumberFormat(LOCALE).format(amount)
}

export function formatDate(value: string | null | undefined, withTime = false): string {
  if (!value) return '-'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)

  return new Intl.DateTimeFormat(LOCALE, {
    dateStyle: 'medium',
    ...(withTime ? { timeStyle: 'short' as const } : {}),
  }).format(date)
}
