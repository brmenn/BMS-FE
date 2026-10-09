import { Navigate, Route, Routes } from 'react-router-dom'
import { ForgotPasswordPage } from '@/features/auth/pages/ForgotPasswordPage'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { NewPasswordPage } from '@/features/auth/pages/NewPasswordPage'
import { OtpVerificationPage } from '@/features/auth/pages/OtpVerificationPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { StudentDashboardPage } from '@/features/dashboard/pages/StudentDashboardPage'
import { StaffDashboardPage } from '@/features/dashboard/pages/StaffDashboardPage'
import { AdminDashboardPage } from '@/features/dashboard/pages/AdminDashboardPage'
import { DetailPinjamanPage } from '@/features/pinjaman/pages/DetailPinjamanPage'
import { PembayaranPinjamanPage } from '@/features/pinjaman/pages/PembayaranPinjamanPage'
import { PenarikanPage } from '@/features/penarikan/pages/PenarikanPage'
import { StudentPenarikanPage } from '@/features/penarikan/pages/StudentPenarikanPage'
import { LandingPage } from '@/features/landing/pages/LandingPage'
import { GuruKaryawanLayout } from '@/components/layout/GuruKaryawanLayout'
import { IsiJurnalPage } from '@/features/jurnal/pages/IsiJurnalPage'
import { TabunganPage } from '@/features/tabungan/pages/TabunganPage'
import { TabunganSiswaPage } from '@/features/siswa/pages/TabunganSiswaPage'
import { SuperAdminDashboardPage } from '@/features/super-admin/pages/SuperAdminDashboardPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/forgot-password/otp" element={<OtpVerificationPage />} />
      <Route path="/forgot-password/new-password" element={<NewPasswordPage />} />

      {/* Super Admin */}
      <Route path="/super-admin/dashboard" element={<SuperAdminDashboardPage />} />

      {/* Siswa */}
      <Route path="/siswa" element={<Navigate to="/siswa/dashboard" replace />} />
      <Route path="/siswa/dashboard" element={<StudentDashboardPage />} />
      <Route path="/siswa/tabungan" element={<TabunganSiswaPage />} />
      <Route path="/siswa/penarikan" element={<StudentPenarikanPage />} />

      {/* Guru & Karyawan */}
      <Route path="/guru" element={<Navigate to="/guru/dashboard" replace />} />
      <Route path="/guru/dashboard" element={<StaffDashboardPage />} />
      <Route path="/guru/tabungan" element={<TabunganPage />} />
      <Route element={<GuruKaryawanLayout />}>
        <Route path="/guru/penarikan" element={<PenarikanPage />} />
        <Route path="/guru/pinjaman" element={<DetailPinjamanPage />} />
        <Route path="/guru/pinjaman/:id" element={<DetailPinjamanPage />} />
        <Route path="/guru/pembayaran-pinjaman" element={<PembayaranPinjamanPage />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/admin/dashboard" element={<AdminDashboardPage />} />

      {/* Akuntansi */}
      <Route path="/akuntansi" element={<Navigate to="/akuntansi/isi-jurnal" replace />} />
      <Route path="/akuntansi/isi-jurnal" element={<IsiJurnalPage />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
