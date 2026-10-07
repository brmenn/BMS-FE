import { Navigate, Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { NewPasswordPage } from '@/features/auth/pages/NewPasswordPage'
import { OtpVerificationPage } from '@/features/auth/pages/OtpVerificationPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { StudentDashboardPage } from '@/features/dashboard/pages/StudentDashboardPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<StudentDashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password/otp" element={<OtpVerificationPage />} />
      <Route path="/forgot-password/new-password" element={<NewPasswordPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
