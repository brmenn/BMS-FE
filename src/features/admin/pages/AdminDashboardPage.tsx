import { useState, type CSSProperties } from 'react'
import {
  ArrowRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ReceiptText,
  TrendingUp,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import dashboardAdminPlaceholder from '@/placeholders/dashboard-admin.json'
import arrowTopRightIcon from '@/assets/icon/misc/arrow-top-right.svg'
import arrowBottomRightIcon from '@/assets/icon/misc/arrow-bottom-right.svg'
import calendarClockIcon from '@/assets/icon/misc/calendar-clock.svg'
import calendarClockMoneyIcon from '@/assets/icon/misc/calendar-clock-money.svg'
import calendarXIcon from '@/assets/icon/misc/calendar-x.svg'
import walletPlusIcon from '@/assets/icon/nav/wallet-plus.svg'
import userBoardIcon from '@/assets/icon/misc/user-board.svg'
import buildingIcon from '@/assets/icon/misc/building.svg'
import briefcaseIcon from '@/assets/icon/misc/briefcase.svg'
import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar'
import { adminItems } from '@/components/dashboard/admin-sidebar-items'
import { DashboardTopbar } from '@/components/dashboard/DashboardTopbar'
import { PageSkeleton } from '@/components/dashboard/PageSkeleton'
import { useSimulatedLoading } from '@/lib/use-simulated-loading'

const dashboard = dashboardAdminPlaceholder

const summaryIcons = [
  { src: walletPlusIcon, width: '16px' },
  { src: userBoardIcon, width: '21px' },
  { src: buildingIcon, width: '21px' },
  { src: briefcaseIcon, width: '19px' },
] as const

const attentionTone = {
  amber: {
    card: 'border-[#fde68a] bg-gradient-to-r from-[#fffbeb]/40 to-white',
    iconBox: 'bg-[#fef3c7]',
    label: 'text-[#b45309]',
    icon: calendarClockIcon,
  },
  blue: {
    card: 'border-[#c3c6d7cc] bg-gradient-to-r from-[#eff4ff]/40 to-white',
    iconBox: 'bg-[#eff4ff]',
    label: 'text-[#004ac6]',
    icon: calendarClockMoneyIcon,
  },
  red: {
    card: 'border-[#fecaca] bg-gradient-to-r from-[#fef2f2]/40 to-white',
    iconBox: 'bg-[#fee2e2]',
    label: 'text-[#ba1a1a]',
    icon: calendarXIcon,
  },
} as const

const aggregateTone = {
  blue: {
    box: 'border-[#2563eb1a] bg-[#eff4ff]',
    label: 'text-[#737686]',
    value: 'text-[#004ac6]',
    icon: arrowTopRightIcon,
  },
  amber: {
    box: 'border-[#fde68a99] bg-[#fffbeb]',
    label: 'text-[#737686]',
    value: 'text-[#ff8c00]',
    icon: arrowBottomRightIcon,
  },
  green: {
    box: 'border-[#bbf7d0] bg-[#f0fdf4]',
    label: 'text-[#737686]',
    value: 'text-[#006329]',
    icon: walletPlusIcon,
  },
} as const

const typeTone = {
  Setoran: 'bg-[#eff4ff] text-[#2563eb]',
  Cicilan: 'bg-[#b7c4fd66] text-[#4f5c8e]',
  Penarikan: 'bg-[#fef3c7] text-[#b45309]',
} as const

const amountTone = {
  green: 'text-[#006329]',
  amber: 'text-[#b45309]',
  neutral: 'text-[#121c2a]',
} as const

const maskStyle = (src: string): CSSProperties => ({
  backgroundColor: 'currentColor',
  maskImage: `url("${src}")`,
  WebkitMaskImage: `url("${src}")`,
  maskRepeat: 'no-repeat',
  WebkitMaskRepeat: 'no-repeat',
  maskPosition: 'center',
  WebkitMaskPosition: 'center',
  maskSize: 'contain',
  WebkitMaskSize: 'contain',
})

const toPercent = (value: number, max: number) => ((value / max) * 100).toFixed(2) + '%'

const toAmountTitle = (label: string, value: number) => label + ': ' + value.toFixed(1) + 'M'

const toChartX = (index: number, total: number) => (index / (total - 1)) * 100

const toChartY = (value: number, max: number) => 100 - (value / max) * 100

const toChartLeft = (index: number, total: number) => toPercent(toChartX(index, total), 100)

const toChartTop = (value: number, max: number) => toPercent(toChartY(value, max), 100)

const toTooltipTop = (value: number, max: number) =>
  'calc(' + toPercent(toChartY(value, max), 100) + ' - 10px)'

const toSharpPath = (values: number[], max: number) => {
  const lastIndex = Math.max(values.length - 1, 1)

  return values
    .map((value, index) => {
      const x = (index / lastIndex) * 100
      const y = 100 - (value / max) * 100
      const command = index === 0 ? 'M' : 'L'

      return `${command} ${x.toFixed(2)},${y.toFixed(2)}`
    })
    .join(' ')
}

export function AdminDashboardPage() {
  const [activeRange, setActiveRange] = useState(dashboard.cashflow.activeRange)
  const [activePoint, setActivePoint] = useState<number | null>(null)
  const loading = useSimulatedLoading()

  const masukLinePath = toSharpPath(
    dashboard.cashflow.data.map((point) => point.masuk),
    dashboard.cashflow.max,
  )
  const masukAreaPath = `${masukLinePath} L100,100 L0,100 Z`
  const keluarLinePath = toSharpPath(
    dashboard.cashflow.data.map((point) => point.keluar),
    dashboard.cashflow.max,
  )
  const keluarAreaPath = `${keluarLinePath} L100,100 L0,100 Z`
  const activePointData = activePoint === null ? null : dashboard.cashflow.data[activePoint]

  return (
    <div className="min-h-screen w-full bg-[#f8f9ff]">
        <DashboardSidebar items={adminItems} logo variant="admin" />

      <div className="flex min-h-screen flex-col lg:pl-64">
        <DashboardTopbar role="Admin" />

        <main className="mx-auto flex w-full max-w-[1360px] flex-col gap-7 p-8">
          {loading ? (
            <PageSkeleton variant="dashboard" hasFilters />
          ) : (
            <>
          {/* SECTION HEADER */}
          <header className="flex flex-wrap items-center justify-between gap-6 pb-1">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-[30px] font-bold leading-[38px] tracking-[-0.75px] text-[#121c2a]">
                  Dashboard
                </h1>
                <span className="inline-flex rounded-full border border-[#007f364c] bg-[#007f3626] px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                  {dashboard.systemStatus}
                </span>
              </div>
              <p className="text-sm leading-5 text-[#737686]">
                Selamat datang, {dashboard.admin.name}. Pantau aktivitas dan kondisi keuangan BMS.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-3.5 py-2.5 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
                <CalendarDays className="h-4 w-4 shrink-0 text-[#737686]" aria-hidden="true" />
                <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#121c2a]">
                  {dashboard.admin.dateLabel}
                </span>
              </div>
            </div>
          </header>

          {/* SUMMARY CARDS */}
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 stagger-children stagger-children">
            {dashboard.summaryCards.map((card, index) => {
              const icon = summaryIcons[index] ?? summaryIcons[0]

              return (
                <div
                  className="flex h-[188px] flex-col items-start justify-between rounded-2xl border border-[#c3c6d7] bg-white p-6 shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]"
                  key={card.id}
                >
                  <div className="flex w-full items-start justify-between">
                    {'labelLines' in card && card.labelLines ? (
                      <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#737686]">
                        {card.labelLines.map((line) => (
                          <span className="block" key={line}>
                            {line}
                          </span>
                        ))}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#737686]">
                        {card.label}
                      </span>
                    )}

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eff4ff]">
                      <span
                        aria-hidden="true"
                        className="h-[18px] text-[#2563eb]"
                        style={{ ...maskStyle(icon.src), width: icon.width }}
                      />
                    </span>
                  </div>

                  <span className="text-2xl font-bold leading-8 tracking-[-0.6px] text-[#121c2a]">
                    {card.valueText}
                  </span>

                  <div className="w-full border-t border-[#c3c6d730] pt-4">
                    {'trend' in card && card.trend ? (
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="h-[13px] w-[8px] text-[#006329]" aria-hidden="true" />
                        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#006329]">
                          {card.trend}
                        </span>
                        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                          {card.trendNote}
                        </span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-[#006329]" aria-hidden="true" />
                        <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                          {card.trendNote}
                        </span>
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </section>

          {/* AKTIVITAS MEMBUTUHKAN PERHATIAN */}
          <section className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-[#b45309]" aria-hidden="true" />
                <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                  {dashboard.attention.title}
                </h2>
              </div>
              <p className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                {dashboard.attention.note}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-3 stagger-children stagger-children">
              {dashboard.attention.items.map((item) => {
                const tone = attentionTone[item.tone as keyof typeof attentionTone]

                return (
                  <div
                    className={cn(
                      'flex items-center justify-between gap-3 rounded-2xl border px-5 py-6',
                      tone.card,
                    )}
                    key={item.id}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={cn(
                          'flex h-12 w-[46px] shrink-0 items-center justify-center rounded-xl',
                          tone.iconBox,
                        )}
                      >
                        <span
                          aria-hidden="true"
                          className={cn('h-[20px] w-[21px]', tone.label)}
                          style={maskStyle(tone.icon)}
                        />
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className={cn('text-[11px] font-bold leading-[14px] tracking-[0.55px]', tone.label)}>
                          {item.label.map((line) => (
                            <span className="block" key={line}>
                              {line}
                            </span>
                          ))}
                        </span>
                        <span className="flex items-baseline gap-2">
                          <span className="text-[30px] font-bold leading-[30px] tracking-[-0.45px] text-[#121c2a]">
                            {item.count}
                          </span>
                          <span className="text-xs font-semibold leading-4 tracking-[0.24px] text-[#737686]">
                            {item.unit}
                          </span>
                        </span>
                      </div>
                    </div>

                    <button
                      className={cn(
                        'shrink-0 rounded-xl border px-4 py-2 text-xs font-semibold leading-4 tracking-[0.24px] shadow-[0px_1px_2px_#0000000d] transition-colors',
                        item.tone === 'amber' && 'border-[#fde68a] bg-white text-[#b45309] hover:bg-[#fffbeb]',
                        item.tone === 'blue' && 'border-[#2563eb33] bg-[#eff4ff] text-[#004ac6] hover:bg-[#e0eaff]',
                        item.tone === 'red' && 'border-[#fecaca] bg-[#fef2f2] text-[#ba1a1a] hover:bg-[#fee2e2]',
                      )}
                      type="button"
                    >
                      Lihat
                    </button>
                  </div>
                )
              })}
            </div>
          </section>

          {/* ARUS KAS */}
          <section className="flex w-full flex-col gap-6 rounded-2xl border border-[#c3c6d7] bg-white p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[#c3c6d799] pb-4">
              <div className="flex min-w-0 flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 shrink-0 text-[#2563eb]" aria-hidden="true" />
                  <h2 className="text-lg font-bold leading-[26px] tracking-[0.45px] text-[#121c2a]">
                    {dashboard.cashflow.title}
                  </h2>
                </div>
                <p className="text-xs leading-[18px] text-[#737686]">{dashboard.cashflow.subtitle}</p>
              </div>

              <div className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-2.5">
                <div className="inline-flex items-start gap-1 rounded-xl border border-[#c3c6d780] bg-[#eff4ff] p-1">
                  {dashboard.cashflow.ranges.map((range) => (
                    <button
                      className={cn(
                        'rounded-lg px-3 py-1.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] transition-colors',
                        activeRange === range
                          ? 'bg-white font-semibold text-[#2563eb] shadow-[0px_1px_2px_#0000000d]'
                          : 'text-[#737686] hover:text-[#121c2a]',
                      )}
                      key={range}
                      onClick={() => setActiveRange(range)}
                      type="button"
                    >
                      {range}
                    </button>
                  ))}
                </div>

                {dashboard.cashflow.filters.map((filter) => (
                  <button
                    className="inline-flex items-center gap-2 rounded-xl border border-[#c3c6d7] bg-white px-3.5 py-2 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                    key={filter}
                    type="button"
                  >
                    {filter}
                    <ChevronDown className="h-3 w-3 text-[#737686]" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col px-4 pt-6 pb-2">
              <div className="flex items-center justify-between border-b border-[#c3c6d766] px-2 pb-3">
                {dashboard.cashflow.data.map((point, index) => {
                  const isActive = activePoint === index

                  return (
                    <button
                      className={cn(
                        'rounded-md px-1 text-[11px] font-semibold leading-[16.5px] transition-colors',
                        isActive ? 'text-[#121c2a]' : 'text-[#737686] hover:text-[#121c2a]',
                      )}
                      key={point.day}
                      onMouseEnter={() => setActivePoint(index)}
                      onFocus={() => setActivePoint(index)}
                      type="button"
                    >
                      {point.day}
                    </button>
                  )
                })}
              </div>

              <div className="relative mt-7 h-[176px]">
                <div className="pointer-events-none absolute inset-0 flex flex-col justify-between">
                  {[0, 1, 2, 3].map((line) => (
                    <span className="h-px w-full bg-[#e7ebf2]" key={line} />
                  ))}
                </div>

                <svg
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 100"
                >
                  <defs>
                    <linearGradient id="cashflow-masuk" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#43b800" stopOpacity="0.16" />
                      <stop offset="55%" stopColor="#43b800" stopOpacity="0.05" />
                      <stop offset="100%" stopColor="#43b800" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="cashflow-keluar" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#f50b0b" stopOpacity="0.13" />
                      <stop offset="55%" stopColor="#f50b0b" stopOpacity="0.04" />
                      <stop offset="100%" stopColor="#f50b0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d={masukAreaPath} fill="url(#cashflow-masuk)" />
                  <path d={keluarAreaPath} fill="url(#cashflow-keluar)" />
                  <path
                    d={masukLinePath}
                    fill="none"
                    stroke="#43b800"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.75"
                    vectorEffect="non-scaling-stroke"
                  />
                  <path
                    d={keluarLinePath}
                    fill="none"
                    stroke="#f50b0b"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.75"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

                <div className="absolute inset-0">
                  {dashboard.cashflow.data.map((point, index) => {
                    const isActive = activePoint === index

                    return (
                      <button
                        aria-label={toAmountTitle('Masuk', point.masuk)}
                        className={cn(
                          'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#43b800] transition-all duration-150',
                          isActive
                            ? 'z-10 h-3 w-3 shadow-[0_0_0_4px_rgba(67,184,0,0.16)]'
                            : 'h-2.5 w-2.5 hover:scale-110',
                        )}
                        key={'masuk-' + point.day}
                        onMouseEnter={() => setActivePoint(index)}
                        onFocus={() => setActivePoint(index)}
                        style={{
                          left: toChartLeft(index, dashboard.cashflow.data.length),
                          top: toChartTop(point.masuk, dashboard.cashflow.max),
                        }}
                        type="button"
                      />
                    )
                  })}

                  {dashboard.cashflow.data.map((point, index) => {
                    const isActive = activePoint === index

                    return (
                      <button
                        aria-label={toAmountTitle('Keluar', point.keluar)}
                        className={cn(
                          'absolute -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-[#f50b0b] transition-all duration-150',
                          isActive
                            ? 'z-10 h-3 w-3 shadow-[0_0_0_4px_rgba(245,11,11,0.14)]'
                            : 'h-2.5 w-2.5 hover:scale-110',
                        )}
                        key={'keluar-' + point.day}
                        onMouseEnter={() => setActivePoint(index)}
                        onFocus={() => setActivePoint(index)}
                        style={{
                          left: toChartLeft(index, dashboard.cashflow.data.length),
                          top: toChartTop(point.keluar, dashboard.cashflow.max),
                        }}
                        type="button"
                      />
                    )
                  })}

                  {activePointData && activePoint !== null ? (
                    <div
                      className="pointer-events-none absolute z-20 min-w-[128px] -translate-x-1/2 -translate-y-full rounded-xl border border-[#dbe3ef] bg-white/95 px-3 py-2 shadow-[0_10px_24px_-12px_rgba(15,23,42,0.28)] backdrop-blur-sm"
                      style={{
                        left: toChartLeft(activePoint, dashboard.cashflow.data.length),
                        top: toTooltipTop(
                          Math.max(activePointData.masuk, activePointData.keluar),
                          dashboard.cashflow.max,
                        ),
                      }}
                    >
                      <span className="block text-[10px] font-semibold leading-[14px] tracking-[0.4px] text-[#8b93a7]">
                        {activePointData.day}
                      </span>
                      <span className="mt-1.5 flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-medium leading-[14px] text-[#737686]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#43b800]" aria-hidden="true" />
                          Masuk
                        </span>
                        <span className="text-[11px] font-bold leading-[14px] tabular-nums text-[#006329]">
                          {activePointData.masuk.toFixed(1)}M
                        </span>
                      </span>
                      <span className="mt-1 flex items-center justify-between gap-4">
                        <span className="flex items-center gap-1.5 text-[10px] font-medium leading-[14px] text-[#737686]">
                          <span className="h-1.5 w-1.5 rounded-full bg-[#f50b0b]" aria-hidden="true" />
                          Keluar
                        </span>
                        <span className="text-[11px] font-bold leading-[14px] tabular-nums text-[#b91c1c]">
                          {activePointData.keluar.toFixed(1)}M
                        </span>
                      </span>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              {dashboard.cashflow.aggregate.map((item) => {
                const tone = aggregateTone[item.tone as keyof typeof aggregateTone]
                const Icon = tone.icon

                return (
                  <div
                    className={cn(
                      'flex min-w-[240px] flex-1 items-center justify-between gap-4 rounded-xl border px-3.5 py-3.5',
                      tone.box,
                    )}
                    key={item.id}
                  >
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686]">
                        {item.label}
                      </span>
                      <span className={cn('text-base font-bold leading-6 tracking-[0]', tone.value)}>
                        {item.value}
                      </span>
                    </div>
                    <span
                      aria-hidden="true"
                      className={cn('h-[15px] w-[15px] shrink-0', tone.value)}
                      style={maskStyle(Icon)}
                    />
                  </div>
                )
              })}
            </div>
          </section>

          {/* TRANSAKSI TERBARU */}
          <section className="flex w-full flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white shadow-[0px_1px_2px_-1px_#1725540a,0px_1px_3px_#1725540a]">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c3c6d799] px-6 py-6">
              <div className="flex items-center gap-2">
                <ReceiptText className="h-5 w-5 text-[#2563eb]" aria-hidden="true" />
                <h2 className="text-lg font-semibold leading-[26px] text-[#121c2a]">
                  {dashboard.recentTransactions.title}
                </h2>
                <p className="text-xs leading-[18px] text-[#737686]">
                  {dashboard.recentTransactions.subtitle}
                </p>
              </div>
              <button
                className="inline-flex items-center gap-1.5 text-sm font-semibold leading-5 text-[#2563eb] transition-colors hover:underline"
                type="button"
              >
                {dashboard.recentTransactions.linkLabel}
                <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="table-stagger w-full min-w-[840px] border-collapse text-left">
                <thead className="bg-[#eff4ff]">
                  <tr className="border-b border-[#c3c6d7cc]">
                    <th className="px-6 py-3 text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">KODE</th>
                    <th className="px-6 py-3 text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">PENGGUNA</th>
                    <th className="px-6 py-3 text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">JENIS</th>
                    <th className="px-6 py-3 text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">KELOMPOK</th>
                    <th className="px-6 py-3 text-right text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">NOMINAL</th>
                    <th className="px-6 py-3 text-center text-[11px] font-semibold leading-[14px] tracking-[0.55px] text-[#737686]">STATUS / AKSI</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboard.recentTransactions.rows.map((row) => (
                    <tr className="border-t border-[#c3c6d766]" key={row.id}>
                      <td className="px-6 py-4 font-mono text-xs font-bold leading-4 tracking-[0.24px] text-[#004ac6]">
                        {row.id}
                      </td>
                      <td className="px-6 py-3">
                        <span className="block text-sm font-semibold leading-5 text-[#121c2a]">{row.user}</span>
                        <span className="block text-xs leading-[18px] text-[#737686]">{row.meta}</span>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px]',
                            typeTone[row.type as keyof typeof typeTone],
                          )}
                        >
                          {row.type}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        <span className="inline-flex items-center rounded-md bg-[#e6eeff] px-2 py-0.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#434655]">
                          {row.group}
                        </span>
                      </td>
                      <td
                        className={cn(
                          'px-6 py-3 text-right text-sm font-semibold leading-5',
                          amountTone[row.amountTone as keyof typeof amountTone],
                        )}
                      >
                        {row.amount}
                      </td>
                      <td className="px-6 py-3 text-center">
                        <span className="inline-flex items-center gap-1 rounded-full bg-[#dcfce7] px-2.5 py-1 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#15803d]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#c3c6d799] px-6 py-4">
              <p className="text-xs leading-[18px] text-[#737686]">
                {dashboard.recentTransactions.footerNote}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="rounded-lg border border-[#c3c6d7] px-3 py-1.5 text-[11px] font-semibold leading-[14px] tracking-[0.44px] text-[#737686] opacity-50"
                  disabled
                  type="button"
                >
                  Sebelumnya
                </button>
                <button
                  className="rounded-lg border border-[#c3c6d7] px-3 py-1.5 text-[11px] font-medium leading-[14px] tracking-[0.44px] text-[#121c2a] transition-colors hover:bg-[#f8f9ff]"
                  type="button"
                >
                  Berikutnya
                </button>
              </div>
            </div>
          </section>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
