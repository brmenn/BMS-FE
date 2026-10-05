import axios, { AxiosError, type AxiosRequestConfig, type AxiosResponse } from 'axios'
import { apiUrl, env } from '@/lib/env'
import { ApiError } from './errors'
import { clearToken, getToken } from './token'
import type { ApiErrorBody, ApiErrorPayload, ApiMeta } from './types'

export interface RequestOptions extends AxiosRequestConfig {
  /** Adds an Idempotency-Key header; pass the same key to safely retry. */
  idempotencyKey?: string
}

type UnauthorisedListener = () => void

const listeners = new Set<UnauthorisedListener>()

/** Subscribe to token expiry/revocation so the app can bounce to the login screen. */
export function onUnauthorised(listener: UnauthorisedListener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export const http = axios.create({
  baseURL: `${env.apiBaseUrl}${env.apiPrefix}`,
  headers: { Accept: 'application/json' },
})

http.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
  }
  return config
})

http.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError<ApiErrorBody>) => {
    const status = error.response?.status ?? 0
    const body = error.response?.data
    const requestId = body?.request_id ?? (error.response?.headers?.['x-request-id'] as string | undefined) ?? null

    if (status === 401) {
      clearToken()
      listeners.forEach((listener) => listener())
    }

    const payload: ApiErrorPayload = body?.error ?? {
      code: error.code === 'ECONNABORTED' ? 'TIMEOUT' : 'NETWORK_ERROR',
      message:
        error.code === 'ECONNABORTED'
          ? 'Permintaan melebihi batas waktu.'
          : 'Tidak dapat terhubung ke server.',
    }

    return Promise.reject(new ApiError(status, payload, requestId))
  },
)

/** Unwraps the `{ success, data, meta }` envelope so callers get `data` directly. */
async function request<T>(config: RequestOptions): Promise<T> {
  const { idempotencyKey, headers, ...rest } = config
  const response = await http.request<T>({
    ...rest,
    url: apiUrl(rest.url ?? ''),
    baseURL: undefined,
    headers: idempotencyKey ? { ...headers, 'Idempotency-Key': idempotencyKey } : headers,
  })
  return response.data
}

export const api = {
  get: <T>(url: string, config: RequestOptions = {}) => request<T>({ ...config, method: 'GET', url }),
  post: <T>(url: string, data?: unknown, config: RequestOptions = {}) =>
    request<T>({ ...config, method: 'POST', url, data }),
  patch: <T>(url: string, data?: unknown, config: RequestOptions = {}) =>
    request<T>({ ...config, method: 'PATCH', url, data }),
  put: <T>(url: string, data?: unknown, config: RequestOptions = {}) =>
    request<T>({ ...config, method: 'PUT', url, data }),
  delete: <T>(url: string, config: RequestOptions = {}) => request<T>({ ...config, method: 'DELETE', url }),
}

/** Builds query params, dropping empty values so the URL stays clean. */
export function toQuery(params: Record<string, unknown> = {}): Record<string, string> {
  return Object.fromEntries(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null && value !== '')
      .map(([key, value]) => [key, String(value)]),
  )
}

export type { ApiErrorPayload, ApiMeta }
