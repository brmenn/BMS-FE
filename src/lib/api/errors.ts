import type { ApiErrorPayload } from './types'

/** A normalised API failure, so callers never inspect axios internals. */
export class ApiError extends Error {
  readonly status: number
  readonly code: string
  readonly fields: Record<string, string>
  readonly context: Record<string, unknown>
  readonly requestId: string | null

  constructor(status: number, payload: ApiErrorPayload, requestId: string | null) {
    super(payload.message)
    this.name = 'ApiError'
    this.status = status
    this.code = payload.code
    this.fields = payload.fields ?? {}
    this.context = payload.context ?? {}
    this.requestId = requestId
  }

  /** 422 — field-level validation; map straight onto form errors. */
  get isValidation(): boolean {
    return this.status === 422
  }

  get isUnauthenticated(): boolean {
    return this.status === 401
  }

  get isForbidden(): boolean {
    return this.status === 403
  }

  /** 409 — business-state conflict (INSUFFICIENT_BALANCE, DUPLICATE_TRANSACTION, ...). */
  get isConflict(): boolean {
    return this.status === 409
  }
}
