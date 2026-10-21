import type { ReactNode } from 'react'
import logoKet from '@/assets/logo/logoKet.png'
import maps from '@/assets/logo/maps.png'

const INFO_LINKS = [
  { label: 'Beranda', href: '#beranda' },
  { label: 'Fitur', href: '#fitur' },
  { label: 'Tentang BMS', href: '#tentang' },
  { label: 'Testimoni', href: '#ulasan' },
]

const SOCIAL_LINKS = [
  { label: 'WhatsApp', href: 'https://wa.me/6281234567890', icon: WhatsAppIcon },
  { label: 'TikTok', href: 'https://www.tiktok.com/', icon: TikTokIcon },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: InstagramIcon },
] as const

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-[#e5e7eb] bg-[#2563eb] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-10 px-4 py-10 sm:px-6 md:flex-row md:gap-12 md:px-[60px]">
        <div className="flex w-full flex-col items-start gap-4 md:w-[200px] md:shrink-0">
          <span className="flex h-14 w-28 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img
              alt="Logo Bank Mini Sekolah"
              className="h-full w-full object-contain"
              src={logoKet}
            />
          </span>
          <p className="text-[13px] leading-5 text-white/80">
            Bersama membangun kebiasaan menabung untuk masa depan yang lebih baik.
          </p>
        </div>

        <FooterColumn title="INFORMASI">
          <nav className="flex flex-col items-start gap-4" aria-label="Informasi">
            {INFO_LINKS.map((link) => (
              <a
                key={link.label}
                className="text-base leading-6 text-white transition-opacity hover:opacity-75"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </FooterColumn>

        <FooterColumn title="SOSIAL MEDIA">
          <div className="flex w-full flex-col items-start gap-5">
            <p className="text-sm leading-5 text-white/80">
              Ikuti akun resmi sekolah untuk info terbaru.
            </p>
            <div className="flex items-center gap-3">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    aria-label={social.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/10 text-white transition-colors hover:bg-white/20"
                    href={social.href}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                )
              })}
            </div>
          </div>
        </FooterColumn>

        <FooterColumn title="MAPS">
          <div className="flex w-full flex-col items-start gap-2">
            <span className="text-sm font-semibold leading-normal text-white">
              SMKS MUHAMMADIYAH 1 GENTENG
            </span>
            <img
              alt="Peta lokasi SMKS Muhammadiyah 1 Genteng"
              className="h-[200px] w-full rounded-lg object-cover"
              loading="lazy"
              src={maps}
            />
          </div>
        </FooterColumn>
      </div>

      <div className="flex w-full items-center justify-end px-4 pb-4 sm:px-8">
        <p className="text-right text-xs leading-[18px] text-white">
          © 2026 Bank Mini Sekolah. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-1">
      <span className="text-xl font-bold leading-6 text-white">{title}</span>
      <span className="h-[3px] w-[70px] rounded-full bg-white" aria-hidden="true" />
      {children}
    </div>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  )
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07Z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect height="20" rx="5" width="20" x="2" y="2" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}
