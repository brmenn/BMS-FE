import { useEffect, useState } from 'react'

/**
 * Menyimulasikan proses pemuatan data pada halaman yang datanya masih statis,
 * sehingga skeleton loader tetap konsisten dengan halaman berbasis API.
 */
export function useSimulatedLoading(delay = 600) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timeout = window.setTimeout(() => setLoading(false), delay)
    return () => window.clearTimeout(timeout)
  }, [delay])

  return loading
}