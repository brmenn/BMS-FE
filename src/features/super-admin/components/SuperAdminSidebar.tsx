import { DashboardSidebar, type SidebarItem } from '@/features/dashboard/components/DashboardSidebar'
import dashboardIcon from '@/assets/icon/dashboard.svg'

const SUPER_ADMIN_ITEMS: SidebarItem[] = [
  { to: '/super-admin/dashboard', label: 'Dashboard', icon: dashboardIcon },
]

export function SuperAdminSidebar() {
  return <DashboardSidebar items={SUPER_ADMIN_ITEMS} logo />
}