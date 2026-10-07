export function AboutSection() {
  return (
    <section className="w-full border-b border-[#e5e7eb] bg-[#f5f5f5]" id="tentang">
      <div className="mx-auto flex w-full max-w-[1160px] flex-col items-start gap-8 px-4 py-12 sm:px-6 lg:gap-10 lg:py-[50px]">
        <h2 className="text-2xl font-bold leading-9 tracking-[-0.75px] text-[#121c2a] sm:text-[30px]">
          Tentang Kami
        </h2>

        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="order-2 flex flex-col items-start gap-3 rounded-xl border border-[#e5e7eb] bg-[#f8fafc] p-5 shadow-[0px_1px_2px_#0000000d] lg:order-1 lg:col-span-5">
            <div className="flex w-full items-center justify-between gap-3 border-b border-[#e5e7eb] pb-3">
              <span className="text-xs font-semibold leading-4 text-[#121c2a]">Buku Rekening Digital</span>
              <span className="font-mono text-[11px] leading-4 text-[#64748b]">ID: 2026-X-041</span>
            </div>

            <div className="flex w-full flex-col items-stretch gap-3">
              <div className="flex w-full flex-col items-start gap-0.5 rounded-lg border border-[#e5e7eb] bg-white p-3">
                <span className="text-[11px] leading-4 text-[#64748b]">Status Mutasi Buku</span>
                <span className="text-xs font-semibold leading-4 text-[#121c2a]">
                  Tervalidasi oleh Petugas Bank Mini
                </span>
                <span className="text-[11px] leading-4 text-[#64748b]">
                  SMK Unggulan Terpadu • Unit Praktik Perbankan
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <SummaryRow label="Total Setoran Masuk" value="Rp 1.850.000" />
                <SummaryRow label="Total Penarikan Dana" value="Rp 400.000" />
                <div className="flex items-start justify-between gap-4 border-t border-[#f1f5f9] pt-2">
                  <span className="text-xs leading-4 text-[#64748b]">Sisa Saldo Kas</span>
                  <span className="text-xs font-semibold leading-4 text-[#2563eb]">Rp 1.450.000</span>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 flex flex-col items-start gap-3.5 lg:order-2 lg:col-span-7">
            <span className="text-xs font-semibold leading-4 tracking-[0.6px] text-[#2563eb]">
              TENTANG BANK MINI SEKOLAH
            </span>
            <h3 className="text-2xl font-bold leading-9 tracking-[-0.75px] text-[#121c2a] sm:text-[30px]">
              Semua kebutuhan tabungan siswa dalam satu sistem.
            </h3>
            <p className="text-base leading-[26px] text-[#64748b]">
              Bank Mini Sekolah membantu digitalisasi proses tabungan siswa sehingga informasi saldo,
              transaksi, dan pengajuan penarikan dapat dikelola dengan lebih sederhana.
            </p>
            <p className="text-sm leading-[22.8px] text-[#64748b]">
              Sistem ini dirancang khusus untuk lingkungan pendidikan, memudahkan petugas sekolah dalam
              melakukan pembukuan kas yang rapi sekaligus melatih kebiasaan menabung siswa secara teratur
              dan bertanggung jawab.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs leading-4 text-[#64748b]">{label}</span>
      <span className="text-xs font-medium leading-4 text-[#121c2a]">{value}</span>
    </div>
  )
}
