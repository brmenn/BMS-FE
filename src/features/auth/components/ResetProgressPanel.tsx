import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { SchoolLogo } from './SchoolLogo'

export type ResetStep = 1 | 2 | 3

export interface ResetStepDefinition {
  title: string
  description: string
}

interface ResetProgressPanelProps {
  steps: ResetStepDefinition[]
  currentStep: ResetStep
  heading: ReactNode
  description: ReactNode
}

const STEP_POSITIONS = ['top-[25px]', 'top-[109px]', 'top-[193px]']
const CONNECTOR_POSITIONS = ['top-[77px]', 'top-[161px]']

export function ResetProgressPanel({ steps, currentStep, heading, description }: ResetProgressPanelProps) {
  return (
    <aside className="relative flex w-full flex-[0_0_517.5px] flex-col items-start justify-around overflow-hidden self-stretch rounded-none bg-blue-600 p-12 max-md:min-h-[560px] max-md:w-full max-md:p-8">
      <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-500 opacity-25 blur-[32px]" />
      <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-blue-700 opacity-40 blur-[32px]" />

      <div className="relative flex w-full flex-[0_0_auto] flex-col items-start gap-[14.8px] pb-10">
        <header className="flex w-full flex-col items-start px-0 pb-[0.75px] pt-[16.45px]">
          <div className="flex w-full items-center gap-3 pb-[12.9px]">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-white" aria-hidden="true">
              <div className="absolute left-0 top-[calc(50%-24px)] h-12 w-12 rounded-2xl bg-white/5 shadow-[0px_2px_4px_-2px_#0000001a,0px_4px_6px_-1px_#0000001a]" />
              <SchoolLogo className="relative h-9 w-9" />
            </div>
            <div className="inline-flex flex-col items-center justify-center">
              <div className="font-bold text-base leading-5 tracking-[0] text-white">
                SMKS MUHAMMADIYAH 1 GENTENG
              </div>
              <div className="text-xs font-medium leading-4 tracking-[0] text-white/80">
                Sistem Manajemen Akun Sekolah
              </div>
            </div>
          </div>
          <h1 className="text-3xl font-bold leading-[37.5px] tracking-[-0.45px] text-white">{heading}</h1>
        </header>

        <p className="text-sm font-normal leading-[22.8px] tracking-[0] text-[#dbeafee6]">{description}</p>

        <ol className="relative h-[229.2px] w-full list-none p-0" aria-label="Tahapan reset password">
          {steps.map((step, index) => {
            const number = (index + 1) as ResetStep
            const isDone = number < currentStep
            const isActive = number === currentStep

            return (
              <li
                key={step.title}
                className={`absolute left-0 flex w-full items-start gap-3.5 ${STEP_POSITIONS[index]}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <div
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-[0px_1px_2px_#0000000d] ${
                    isActive
                      ? 'border-2 border-solid border-white bg-white/20 shadow-[inset_0px_2px_4px_2px_#0000000d]'
                      : 'bg-white'
                  }`}
                >
                  {isDone ? (
                    <Check className="h-[11px] w-[15px] text-blue-600" strokeWidth={3} aria-hidden="true" />
                  ) : (
                    <span className={`text-sm font-bold leading-5 ${isActive ? 'text-white' : 'text-blue-600'}`}>
                      {number}
                    </span>
                  )}
                </div>

                <div className="inline-flex flex-col items-start pt-0.5">
                  <div
                    className={`text-xs leading-4 tracking-[0.24px] text-white ${
                      isActive || isDone ? 'font-bold' : 'font-semibold'
                    }`}
                  >
                    {step.title}
                  </div>
                  <p
                    className={`text-xs leading-[18px] tracking-[0] ${
                      isActive ? 'font-medium text-white/90' : 'font-normal text-[#dbeafeb2]'
                    }`}
                  >
                    {step.description}
                  </p>
                </div>
              </li>
            )
          })}

          {CONNECTOR_POSITIONS.slice(0, steps.length - 1).map((position) => (
            <div key={position} className={`absolute left-4 h-4 w-0.5 bg-white/30 ${position}`} />
          ))}
        </ol>
      </div>
    </aside>
  )
}
