import { Link } from 'react-router-dom'
import { ArrowUpFromLine, RefreshCw } from 'lucide-react'
import { formatMoney } from '@/lib/format'
import screenshot from '@/assets/logo/screenshot.png'
import dashboardPlaceholder from '@/placeholders/dashboard.json'

const { student, balance } = dashboardPlaceholder

interface StudentBalanceCardProps {
  /** Tampilkan tautan "Ajukan Penarikan" di sisi kanan. */
  showActions?: boolean
}

export function StudentBalanceCard({ showActions = true }: StudentBalanceCardProps) {
  return (
    <section className="relative flex w-full flex-col items-start overflow-hidden rounded-2xl bg-[#2563eb] p-8 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-8 h-[180px] w-[190px] object-contain opacity-10"
        src={screenshot}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-16 right-32 h-64 w-64 rounded-full bg-white/5 blur-[20px]"
      />
      <div className="relative flex w-full flex-wrap items-center justify-between gap-6">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-white/80">
            No. Rekening: {student.accountNo}
          </span>
          <span className="pt-1 text-sm font-medium leading-5 text-white/80">
            Total Saldo Tabungan
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold leading-[44px] tracking-[-0.9px] text-white">
              {formatMoney(balance.amount)}
            </span>
            <span className="text-xs leading-[18px] text-white/70">{balance.currency}</span>
          </div>
          <div className="flex items-center gap-1.5 pt-1">
            <RefreshCw className="h-3.5 w-3.5 shrink-0 text-white/80" aria-hidden="true" />
            <span className="text-xs leading-[18px] text-white/80">{balance.syncNote}</span>
          </div>
        </div>

        {showActions ? (
          <div className="flex flex-wrap items-center gap-3">
            <Link
              className="flex items-center gap-2 rounded-xl border border-solid border-white/40 px-5 py-2.5 backdrop-blur-[2px] transition-colors hover:bg-white/10"
              to="/siswa/penarikan"
            >
              <ArrowUpFromLine className="h-3.5 w-3.5 text-white" aria-hidden="true" />
              <span className="text-base font-medium leading-6 text-white">Ajukan Penarikan</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  )
}