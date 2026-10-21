import { type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-lg bg-[#e8ebf3]', className)}
      {...props}
    />
  )
}

export function SkeletonText({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return <Skeleton className={cn('h-3 w-full rounded-md', className)} {...props} />
}