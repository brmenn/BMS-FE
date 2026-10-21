import { Outlet } from 'react-router-dom'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import { adminItems } from '@/components/dashboard/admin-sidebar-items'

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