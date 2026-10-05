const TOKEN_KEY = 'bms.token'

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY)
}

/**
 * SPEC §29 — money-moving endpoints require an Idempotency-Key header.
 * Replaying the same key with the same payload returns the original response,
 * so a retried submit must reuse its key rather than mint a new one.
 */
export function newIdempotencyKey(): string {
  return crypto.randomUUID()
}
