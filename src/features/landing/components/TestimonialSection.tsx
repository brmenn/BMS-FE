import { CheckCircle2, Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { StudentPhoto } from './StudentPhoto'
import avatar from '@/assets/logo/avatar.png'
import lumba from '@/assets/logo/lumba.png'

const TESTIMONIALS = [
  {
    quote:
      '"Sangat praktis cek saldo dan setor uang saku tanpa harus antre lama di loket koperasi sekolah!"',
    initials: 'AP',
    name: 'Adinda Putri',
    role: 'Siswa XII RPL 1',
    avatar: lumba,
    avatarClassName: 'bg-[#dbe1ff] text-[#00174b]',
  },
  {
    quote:
      '"Sistem pencatatan digital ini sangat mendidik siswa gemar menabung dan transparan bagi bendahara."',
    initials: 'AD',
    name: 'Bpk. Drs. H. Ahmad Dahlan, M.Pd.',
    role: 'Guru Pembina',
    avatar,
    avatarClassName: 'bg-[#dce1ff] text-[#071747]',
  },
  {
    quote:
      '"Bisa memantau perkembangan tabungan anak secara online, aman dan sangat terpercaya."',
    initials: 'SR',
    name: 'Ibu Siti Rahmawati',
    role: 'Wali Murid',
    avatar,
    avatarClassName: 'bg-[#7ffc97] text-[#002109]',
  },
  {
    quote:
      '"Setiap transaksi tercatat otomatis, laporan kas koperasi jadi rapi tanpa perhitungan manual."',
    initials: 'FR',
    name: 'Fajar Ramadhan',
    role: 'Siswa XI AKL 2',
    avatar: lumba,
    avatarClassName: 'bg-[#ffe6d5] text-[#4a1d00]',
  },
  {
    quote:
      '"Riwayat setor dan tarik uang jelas semua, tidak ada lagi selisih kas di akhir bulan."',
    initials: 'NW',
    name: 'Ibu Nur Wulandari',
    role: 'Bendahara Koperasi',
    avatar,
    avatarClassName: 'bg-[#d3f5e6] text-[#00301d]',
  },
  {
    quote:
      '"Notifikasinya cepat, siswa langsung tahu saldo tabungannya bertambah setelah setor."',
    initials: 'RH',
    name: 'Raka Hermawan',
    role: 'Siswa X TKJ 1',
    avatar: lumba,
    avatarClassName: 'bg-[#e8dcff] text-[#23005a]',
  },
]

export function TestimonialSection() {
  return (
    <section className="w-full bg-white pt-16 sm:pt-20" id="ulasan">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-12 px-4 pb-16 sm:px-8 sm:pb-20">
        <header className="flex w-full max-w-[736px] flex-col items-center gap-2 text-center">
          <h2 className="text-[28px] leading-[36px] font-bold tracking-[-0.49px] text-[#121c2a] sm:text-[32.9px] sm:leading-[41.7px]">
            Rating &amp; Ulasan Pengguna
          </h2>
          <p className="text-base leading-6 text-[#434655] sm:text-[17.5px] sm:leading-[26.3px]">
            Dipercaya oleh siswa, guru pembimbing, dan wali murid SMKS Muhammadiyah 1 Genteng.
          </p>
        </header>

        <div className="flex w-full max-w-[842px] flex-col items-start gap-6 rounded-[18px] border-[1.1px] border-[#c3c6d799] bg-white p-6 shadow-[10px_16px_12px_#00000040] sm:p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <span className="flex items-baseline">
              <span className="text-5xl leading-[52.6px] font-bold text-[#121c2a]">4.9</span>
              <span className="text-xl leading-[30.7px] font-normal text-[#434655]">/5</span>
            </span>

            <span className="flex flex-col items-start gap-1">
              <StarRating />
              <span className="text-sm leading-[21.9px] font-semibold text-[#121c2a]">
                Berdasarkan 850+ Siswa &amp; Pengguna
              </span>
            </span>
          </div>

          <div className="flex w-full items-center gap-3 border-t border-[#c3c6d766] pt-6 md:w-auto md:border-t-0 md:border-l md:pt-0 md:pl-8">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#7ffc97]">
              <CheckCircle2 className="h-[18px] w-[18px] text-[#006329]" aria-hidden="true" />
            </span>
            <span className="flex flex-col items-start">
              <span className="text-xl leading-[30.7px] font-bold tracking-[-0.11px] text-[#006329]">
                99.4%
              </span>
              <span className="text-[13px] leading-[19.7px] text-[#434655]">
                Transaksi Terverifikasi Tepat Waktu
              </span>
            </span>
          </div>
        </div>

        <div className="group relative w-full overflow-hidden" aria-label="Carousel ulasan pengguna">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-white to-transparent"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-white to-transparent"
            aria-hidden="true"
          />

          <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[0, 1].map((copy) => (
              <div key={copy} aria-hidden={copy === 1} className="flex w-max gap-8 pr-8">
                {TESTIMONIALS.map((testimonial) => (
                  <article
                    key={testimonial.name}
                    className="flex w-[320px] shrink-0 flex-col justify-between gap-6 rounded-[18px] border-[1.1px] border-[#c3c6d766] bg-white p-7 shadow-[10px_16px_12px_#00000040] sm:w-[360px]"
                  >
                    <div className="flex w-full flex-col items-start gap-3">
                      <StarRating />
                      <p className="text-[15.3px] italic leading-[24.9px] text-[#121c2a]">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex w-full items-center gap-3 border-t border-[#c3c6d74c] pt-4">
                      <StudentPhoto
                        src={testimonial.avatar}
                        alt={`Foto profil ${testimonial.name}`}
                        initials={testimonial.initials}
                        className="h-11 w-11 rounded-full"
                        fallbackClassName={cn(
                          'rounded-full text-[15.3px] font-bold',
                          testimonial.avatarClassName,
                        )}
                      />
                      <span className="flex min-w-0 flex-col items-start">
                        <span className="text-[15.3px] leading-[21.9px] font-semibold text-[#121c2a]">
                          {testimonial.name}
                        </span>
                        <span className="text-[13px] leading-[19.7px] text-[#434655]">
                          {testimonial.role}
                        </span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            ))}
          </div>
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
