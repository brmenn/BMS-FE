import { CheckCircle2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'

const TESTIMONIALS = [
  {
    quote:
      '"Sangat praktis cek saldo dan setor uang saku tanpa harus antre lama di loket koperasi sekolah!"',
    initials: 'AP',
    name: 'Adinda Putri',
    role: 'Siswa XII RPL 1',
    avatarClassName: 'bg-[#dbe1ff] text-[#00174b]',
  },
  {
    quote:
      '"Sistem pencatatan digital ini sangat mendidik siswa gemar menabung dan transparan bagi bendahara."',
    initials: 'AD',
    name: 'Bpk. Drs. H. Ahmad Dahlan, M.Pd.',
    role: 'Guru Pembina',
    avatarClassName: 'bg-[#dce1ff] text-[#071747]',
  },
  {
    quote:
      '"Bisa memantau perkembangan tabungan anak secara online, aman dan sangat terpercaya."',
    initials: 'SR',
    name: 'Ibu Siti Rahmawati',
    role: 'Wali Murid',
    avatarClassName: 'bg-[#7ffc97] text-[#002109]',
  },
]

export function TestimonialSection() {
  return (
    <section className="w-full bg-[#dfdfdf] pt-16 sm:pt-20" id="ulasan">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 px-4 pb-16 sm:px-8 sm:pb-20">
        <header className="flex w-full max-w-[672px] flex-col items-center gap-2 text-center">
          <h2 className="text-2xl font-bold leading-[38px] tracking-[-0.45px] text-black sm:text-[30px]">
            Rating &amp; Ulasan Pengguna
          </h2>
          <p className="text-base leading-6 text-black">
            Dipercaya oleh siswa, guru pembimbing, dan wali murid SMKS Muhammadiyah 1 Genteng.
          </p>
        </header>

        <div className="flex w-full max-w-[768px] flex-col items-start gap-6 rounded-2xl border border-[#c3c6d799] bg-white px-6 pb-6 pt-8 shadow-[0px_1px_2px_#0000000d] sm:gap-8 sm:px-8 sm:pb-8 sm:pt-10 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-baseline">
              <span className="text-[48px] font-bold leading-[48px] text-[#121c2a]">4.9</span>
              <span className="text-xl leading-7 text-[#434655]">/5</span>
            </span>

            <span className="flex flex-col items-start gap-2">
              <StarRating />
              <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                Berdasarkan 850+ Siswa &amp; Pengguna
              </span>
            </span>
          </div>

          <div className="flex w-full items-center gap-3 border-t border-[#c3c6d766] pt-6 md:w-auto md:border-l md:border-t-0 md:pl-8 md:pt-0">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#7ffc97]">
              <CheckCircle2 className="h-4 w-4 text-[#006329]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start">
              <span className="text-xl font-bold leading-7 tracking-[-0.1px] text-[#006329]">99.4%</span>
              <span className="text-xs leading-[18px] text-[#434655]">
                Transaksi Terverifikasi Tepat Waktu
              </span>
            </span>
          </div>
        </div>

        <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <article
              key={testimonial.name}
              className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-[#c3c6d766] bg-white p-6 shadow-[0px_1px_2px_#0000000d]"
            >
              <div className="flex w-full flex-col items-start gap-3">
                <StarRating />
                <p className="text-sm italic leading-[22.8px] text-[#121c2a]">{testimonial.quote}</p>
              </div>

              <div className="flex w-full items-center gap-3 border-t border-[#c3c6d74c] pt-4">
                <span
                  className={cn(
                    'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold',
                    testimonial.avatarClassName,
                  )}
                >
                  {testimonial.initials}
                </span>
                <span className="flex min-w-0 flex-col items-start">
                  <span className="text-sm font-semibold leading-5 text-[#121c2a]">
                    {testimonial.name}
                  </span>
                  <span className="text-xs leading-[18px] text-[#434655]">{testimonial.role}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StarRating() {
  return (
    <span className="flex items-center gap-0.5" aria-label="Rating 5 dari 5">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-[#facc15] text-[#facc15]"
          aria-hidden="true"
        />
      ))}
    </span>
  )
}
