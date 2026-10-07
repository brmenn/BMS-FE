import { Banknote, CheckCircle2, Wallet } from 'lucide-react'

const ADVANTAGES = [
  {
    icon: Banknote,
    title: 'Transaksi Lebih Teratur',
    description: 'Catat dan pantau aktifitas tabungan dengan jelas dan akurat.',
  },
  {
    icon: Wallet,
    title: 'Informasi Saldo',
    description: 'Siswa dapat melihat saldo tabungan mereka dengan mudah kapan saja.',
  },
  {
    icon: CheckCircle2,
    title: 'Proses Penarikan',
    description: 'Pengajuan penarikan dana dapat dipantai status verifikasinya.',
  },
]

export function AdvantageSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-[#f5f5f5]" id="keunggulan">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-start gap-8 px-4 py-12 sm:px-6 lg:gap-12 lg:py-20">
        <div className="flex w-full max-w-[576px] flex-col items-start gap-2">
          <h2 className="text-2xl font-bold leading-9 tracking-[-0.75px] text-[#121c2a] sm:text-[30px]">
            Keunggulan
          </h2>
          <p className="text-base leading-[26px] text-[#64748b]">
            Fitur sederhana untuk kebutuhan transaksi tabungan siswa.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ADVANTAGES.map((advantage) => {
            const Icon = advantage.icon

            return (
              <article
                key={advantage.title}
                className="flex flex-col items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#2563eb] p-6 shadow-[0px_1px_2px_#0000000d] transition-shadow hover:shadow-[0px_6px_16px_-6px_#10182833]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f1f5f9]">
                  <Icon className="h-[18px] w-[18px] text-[#004ac6]" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold leading-6 text-white">{advantage.title}</h3>
                <p className="text-sm leading-[22.8px] text-white">{advantage.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
