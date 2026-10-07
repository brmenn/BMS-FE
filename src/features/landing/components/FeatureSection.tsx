import { PiggyBank, ReceiptText, Wallet } from 'lucide-react'

const FEATURES = [
  {
    icon: PiggyBank,
    title: 'Tabungan',
    description: 'Lihat saldo dan riwayat transaksi tabungan secara mudah.',
  },
  {
    icon: Wallet,
    title: 'Penarikan',
    description: 'Ajukan penarikan dan pantau proses persetujuannya.',
  },
  {
    icon: ReceiptText,
    title: 'Riwayat Transaksi',
    description: 'Periksa aktivitas tabungan dengan informasi yang jelas.',
  },
]

export function FeatureSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-[#2563eb]" id="fitur">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-start gap-8 px-4 py-12 sm:px-6 lg:gap-[30px] lg:py-20">
        <div className="flex w-full max-w-[576px] flex-col items-start gap-2">
          <h2 className="text-2xl font-bold leading-9 tracking-[-0.75px] text-white sm:text-[30px]">
            Fitur Utama
          </h2>
          <p className="text-base leading-[26px] text-white">
            Fitur sederhana untuk kebutuhan transaksi tabungan siswa.
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className="flex flex-col items-start gap-3 rounded-xl border border-[#e5e7eb] bg-white p-6 shadow-[0px_1px_2px_#0000000d] transition-shadow hover:shadow-[0px_6px_16px_-6px_#10182833]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#e2e8f0] bg-[#f1f5f9]">
                  <Icon className="h-[18px] w-[18px] text-[#004ac6]" aria-hidden="true" />
                </span>
                <h3 className="text-base font-semibold leading-6 text-[#121c2a]">{feature.title}</h3>
                <p className="text-sm leading-[22.8px] text-[#64748b]">{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
