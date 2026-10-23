export type MutationType = 'SEMUA' | 'SETORAN' | 'PEMBAYARAN' | 'PENARIKAN'

export interface MutationFilter {
  query: string
  type: MutationType
  month: string
}

export const DEFAULT_MUTATION_FILTER: MutationFilter = {
  query: '',
  type: 'SEMUA',
  month: 'semua',
}
