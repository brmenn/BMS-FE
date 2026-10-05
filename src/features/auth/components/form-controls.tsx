import type { ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const LABEL_CLASS = 'text-xs font-medium leading-4 tracking-[0.24px] text-[#121c2a]'
const CONTROL_CLASS =
  'flex h-12 w-full items-center rounded-xl border border-slate-200 bg-white text-sm text-[#121c2a] transition-colors outline-none focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-blue-100'
const INPUT_CLASS = 'w-full border-none bg-transparent p-0 text-sm outline-none placeholder:text-[#737686]'

export function FieldLabel({
  label,
  required,
  htmlFor,
}: {
  label: string
  required?: boolean
  htmlFor?: string
}) {
  return (
    <label className={LABEL_CLASS} htmlFor={htmlFor}>
      {label}
      {required ? <span className="text-[#ba1a1a]"> *</span> : null}
    </label>
  )
}

export function MutedText({ children }: { children: ReactNode }) {
  return <span className="font-normal text-[#434655]"> {children}</span>
}

export function HintText({ children }: { children: ReactNode }) {
  return <p className="text-xs leading-[18px] text-[#434655]">{children}</p>
}

export function FieldError({ children }: { children?: string }) {
  if (!children) return null
  return (
    <p className="text-xs text-red-600" role="alert">
      {children}
    </p>
  )
}

export function Field({
  label,
  required,
  hint,
  error,
  htmlFor,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  htmlFor?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <FieldLabel htmlFor={htmlFor} label={label} required={required} />
      {children}
      {hint ? <HintText>{hint}</HintText> : null}
      <FieldError>{error}</FieldError>
    </div>
  )
}

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
  icon?: ReactNode
  invalid?: boolean
}

export function Input({ icon, invalid, ...props }: InputProps) {
  return (
    <div className={cn(CONTROL_CLASS, invalid && 'border-red-300', 'px-4', icon && 'pl-10')}>
      {icon ? (
        <span className="pointer-events-none absolute left-3.5 text-[#737686] [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </span>
      ) : null}
      <input className={INPUT_CLASS} {...props} />
    </div>
  )
}

export function PasswordInput({
  show,
  toggle,
  ...props
}: InputProps & { show: boolean; toggle: () => void }) {
  return (
    <div className={cn(CONTROL_CLASS, 'relative pl-10 pr-11')}>
      <span className="pointer-events-none absolute left-3.5 text-[#737686]">
        <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
          <rect height="11" rx="2" width="16" x="4" y="11" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
      </span>
      <input className={INPUT_CLASS} type={show ? 'text' : 'password'} {...props} />
      <button
        aria-label={show ? 'Sembunyikan password' : 'Tampilkan password'}
        className="absolute right-3 flex h-full items-center text-[#737686] hover:text-[#121c2a]"
        onClick={toggle}
        type="button"
      >
        {show ? (
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 2l20 20" />
            <path d="M6.7 6.8A9.9 9.9 0 0 0 2 12c1.7 3.2 4.6 5.5 8 5.9 1.7.2 3.4-.1 4.9-1" />
            <path d="M9.9 5a10 10 0 0 1 4.1 1.3c3.4 1.7 6 5 8 5.7-.8 1.6-2 3-3.5 4.2" />
            <path d="M14.1 14.2a3 3 0 1 1-4.3-4.3" />
          </svg>
        ) : (
          <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
            <path d="M2 12s3.8-7 10-7 10 7 10 7-3.8 7-10 7-10-7-10-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  )
}

export function Select({
  options,
  placeholder,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { options: string[]; placeholder: string }) {
  return (
    <div className={cn(CONTROL_CLASS, 'relative pl-4 pr-10')}>
      <select className={cn(INPUT_CLASS, 'appearance-none cursor-pointer')} {...props}>
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-3.5 h-4 w-4 text-[#737686]"
      />
    </div>
  )
}
