import { api } from './client'
import { clearToken, setToken } from './token'
import type { Money } from './types'

export interface AuthUser {
  id: number
  username: string
  email: string | null
  full_name: string
  phone: string | null
  status: string | null
  last_login_at: string | null
  role: {
    id: number
    code: string | null
    name: string
  } | null
  student_profile: Record<string, unknown> | null
  employee_profile: Record<string, unknown> | null
  /** Only present on /auth/me and login. */
  permissions?: string[]
  created_at: string | null
}

export interface LoginPayload {
  identifier: string
  password: string
  device_name?: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  password_confirmation: string
  full_name: string
  phone?: string
  role: 'SISWA' | 'GURU' | 'KARYAWAN'
  student_number?: string
  class?: string
  academic_year?: string
  employee_number?: string
}

export interface LoginResult {
  token: string
  token_type: string
  user: AuthUser
}

interface MeResult {
  user: AuthUser
}

interface RegisterResult {
  user: AuthUser
}

export const authApi = {
  /** Returns the token and the user, and persists the token for later requests. */
  async login(payload: LoginPayload): Promise<LoginResult> {
    const result = await api.post<LoginResult>('/auth/login', payload)
    setToken(result.token)
    return result
  },

  /** Registration is public and issues no token: the user signs in afterwards. */
  async register(payload: RegisterPayload): Promise<AuthUser> {
    const { user } = await api.post<RegisterResult>('/auth/register', payload)
    return user
  },

  async me(): Promise<AuthUser> {
    const { user } = await api.get<MeResult>('/auth/me')
    return user
  },

  async logout(): Promise<void> {
    try {
      await api.post<{ message: string }>('/auth/logout')
    } finally {
      clearToken()
    }
  },

  async logoutAll(): Promise<void> {
    try {
      await api.post<{ message: string }>('/auth/logout-all')
    } finally {
      clearToken()
    }
  },
}

export type { Money }
