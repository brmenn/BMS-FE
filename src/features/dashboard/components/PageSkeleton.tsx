import { Skeleton } from '@/components/ui/skeleton'

type PageSkeletonVariant = 'dashboard' | 'detail' | 'report' | 'list'

const variantConfig: Record<PageSkeletonVariant, { statCards: number; hasHero: boolean; hasChart: boolean }> = {
  dashboard: { statCards: 4, hasHero: true, hasChart: true },
  detail: { statCards: 2, hasHero: false, hasChart: false },
  report: { statCards: 3, hasHero: false, hasChart: false },
  list: { statCards: 0, hasHero: false, hasChart: false },
}

function PageHeaderSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-56 rounded-lg" />
        <Skeleton className="h-4 w-80 rounded-md" />
      </div>
      <Skeleton className="h-10 w-44 rounded-xl" />
    </div>
  )
}

function StatCardSkeleton() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#c3c6d7] bg-white p-6">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-28 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </div>
      <Skeleton className="h-8 w-36 rounded-lg" />
      <Skeleton className="h-3 w-44 rounded-md" />
    </div>
  )
}

function HeroCardSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6 rounded-2xl bg-[#eff4ff] p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-36 rounded-md" />
          <Skeleton className="h-4 w-44 rounded-md" />
          <Skeleton className="h-11 w-56 rounded-lg" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-36 rounded-xl" />
          <Skeleton className="h-11 w-40 rounded-xl" />
        </div>
      </div>
    </div>
  )
}

function ChartCardSkeleton() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-[#c3c6d7] bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-48 rounded-lg" />
          <Skeleton className="h-3 w-64 rounded-md" />
        </div>
        <Skeleton className="h-9 w-32 rounded-xl" />
      </div>
      <Skeleton className="h-[176px] w-full rounded-xl" />
    </div>
  )
}

function FilterBarSkeleton({ columns = 4 }: { columns?: number }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: columns }, (_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24 rounded-md" />
          <Skeleton className="h-11 w-full rounded-xl" />
        </div>
      ))}
    </div>
  )
}

function TableCardSkeleton({ rows = 5, columns = 7 }: { rows?: number; columns?: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-[#c3c6d7] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#c3c6d7]/50 p-6">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-5 w-52 rounded-lg" />
          <Skeleton className="h-3 w-72 rounded-md" />
        </div>
        <Skeleton className="h-10 w-36 rounded-xl" />
      </div>

      <div className="overflow-hidden">
        <div className="flex gap-4 border-b border-[#c3c6d7]/50 bg-[#eff4ff] px-6 py-4">
          {Array.from({ length: columns }, (_, index) => (
            <Skeleton key={index} className="h-3 flex-1 rounded-md" />
          ))}
        </div>
        {Array.from({ length: rows }, (_, rowIndex) => (
          <div className="flex gap-4 border-b border-[#c3c6d7]/30 px-6 py-5 last:border-b-0" key={rowIndex}>
            {Array.from({ length: columns }, (_, colIndex) => (
              <Skeleton
                className="h-4 flex-1 rounded-md"
                key={colIndex}
                style={{ opacity: 1 - rowIndex * 0.12 }}
              />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between gap-4 border-t border-[#c3c6d7]/50 bg-[#f8f9ff] p-4">
        <Skeleton className="h-3 w-44 rounded-md" />
        <div className="flex gap-2">
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton className="h-8 w-8 rounded-lg" key={index} />
          ))}
        </div>
      </div>
    </div>
  )
}

interface PageSkeletonProps {
  variant?: PageSkeletonVariant
  hasFilters?: boolean
  className?: string
}

export function PageSkeleton({
  variant = 'detail',
  hasFilters = false,
  className,
}: PageSkeletonProps) {
  const config = variantConfig[variant]

  return (
    <div
      aria-busy="true"
      aria-live="polite"
      className={className ?? 'flex w-full flex-col gap-6'}
      role="status"
    >
      <span className="sr-only">Memuat halaman…</span>

      <PageHeaderSkeleton />

      {config.hasHero ? <HeroCardSkeleton /> : null}

      {config.statCards > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: config.statCards }, (_, index) => (
            <StatCardSkeleton key={index} />
          ))}
        </div>
      ) : null}

      {hasFilters ? <FilterBarSkeleton /> : null}

      {config.hasChart ? <ChartCardSkeleton /> : null}

      <TableCardSkeleton />
    </div>
  )
}