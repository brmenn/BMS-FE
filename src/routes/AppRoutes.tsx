import { Navigate, Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { NewPasswordPage } from '@/features/auth/pages/NewPasswordPage'
import { OtpVerificationPage } from '@/features/auth/pages/OtpVerificationPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { StudentDashboardPage } from '@/features/dashboard/pages/StudentDashboardPage'
import { StaffDashboardPage } from '@/features/dashboard/pages/StaffDashboardPage'
import { DetailPinjamanPage } from '@/features/pinjaman/pages/DetailPinjamanPage'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { GuruKaryawanLayout } from '@/components/layout/GuruKaryawanLayout'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<StudentDashboardPage />} />
      <Route path="/dashboard/guru" element={<StaffDashboardPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password/otp" element={<OtpVerificationPage />} />
      <Route path="/forgot-password/new-password" element={<NewPasswordPage />} />

      <Route element={<GuruKaryawanLayout />}>
        <Route path="/pinjaman" element={<DetailPinjamanPage />} />
        <Route path="/pinjaman/guru" element={<DetailPinjamanPage />} />
        <Route path="/pinjaman/:id" element={<DetailPinjamanPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
