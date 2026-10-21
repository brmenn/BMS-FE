import { BookOpen } from 'lucide-react'
import { DashboardSidebar, type SidebarItem } from './DashboardSidebar'
import { defaultItems } from './sidebar-items'
import logoAK from '@/assets/logo/logoAK.png'

const AKUNTANSI_ITEMS: SidebarItem[] = [
  ...defaultItems.map((item) => ({
    ...item,
    to: item.to?.replace('/siswa/', '/akuntansi/'),
  })),
  { to: '/akuntansi/isi-jurnal', label: 'Isi Jurnal', icon: BookOpen },
]

export function AkuntansiSidebar() {
  return (
    <DashboardSidebar
      items={AKUNTANSI_ITEMS}
      logo
      logoSrc={logoAK}
      logoClassName="h-[76px] w-[76px]"
    />
  )
}
