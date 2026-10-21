import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from '@/features/dashboard/components/DashboardSidebar'
import { DashboardTopbar } from '@/features/dashboard/components/DashboardTopbar'
import { adminItems } from '@/features/dashboard/components/admin-sidebar-items'

export function AdminLayout() {
  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
      <div className="print:hidden">
        <DashboardSidebar items={adminItems} logo />
      </div>

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Admin" />

        <main className="flex min-w-0 flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  )
}