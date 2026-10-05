/** SPEC §42 — the single response envelope for the whole API. */
export type ApiMeta = Record<string, unknown>

export interface ApiSuccess<T> {
  success: true
  data: T
  meta?: ApiMeta
  request_id: string
}

export interface ApiErrorPayload {
  code: string
  message: string
  fields?: Record<string, string>
  context?: Record<string, unknown>
}

export interface ApiErrorBody {
  success: false
  error: ApiErrorPayload
  request_id: string
}

/** SPEC §66 pagination metadata, carried on `meta` of a paginated list. */
export interface Pagination {
  current_page: number
  per_page: number
  total: number
  last_page: number
  from: number | null
  to: number | null
}

export interface Paginated<T> {
  items: T[]
  pagination: Pagination
}

/** Money always arrives as an exact string ("100000.00"), never a JSON number. */
export type Money = string

export interface ListParams {
  page?: number
  per_page?: number
  search?: string
  sort?: string
  [key: string]: string | number | boolean | undefined | null
}
