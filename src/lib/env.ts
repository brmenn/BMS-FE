const rawBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim() ?? ''
const rawPrefix = import.meta.env.VITE_API_PREFIX?.trim() || '/api/v1'

/**
 * Empty VITE_API_BASE_URL means "same origin", so the Vite dev proxy forwards
 * /api to the Laravel server. In production set it to the public API origin.
 */
export const env = {
  apiBaseUrl: rawBaseUrl.replace(/\/+$/, ''),
  apiPrefix: rawPrefix.startsWith('/') ? rawPrefix.replace(/\/+$/, '') : `/${rawPrefix}`,
  appName: import.meta.env.VITE_APP_NAME?.trim() || 'Amburadul',
} as const

export const apiUrl = (path: string) => {
  const suffix = path.startsWith('/') ? path : `/${path}`
  return `${env.apiBaseUrl}${env.apiPrefix}${suffix}`
}
