import { api } from './client'

interface RequestResetResult {
  message: string
}

interface VerifyResetResult {
  reset_token: string
}

interface ConfirmResetResult {
  message: string
}

/** Always 202 — the API never reveals whether the email exists. */
export async function requestPasswordReset(email: string): Promise<RequestResetResult> {
  return api.post<RequestResetResult>('/auth/password/reset/request', { email })
}

/** Returns the single-use `reset_token` that authorises the confirm step. */
export async function verifyPasswordResetOtp(email: string, otp: string): Promise<VerifyResetResult> {
  return api.post<VerifyResetResult>('/auth/password/reset/verify', { email, otp })
}

export async function confirmPasswordReset(
  resetToken: string,
  password: string,
  passwordConfirmation: string,
): Promise<ConfirmResetResult> {
  return api.post<ConfirmResetResult>('/auth/password/reset/confirm', {
    reset_token: resetToken,
    password,
    password_confirmation: passwordConfirmation,
  })
}
