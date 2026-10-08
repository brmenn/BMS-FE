import type { ReactNode } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'

const INFO_LINKS = [
  { label: 'Tentang BMS', href: '#tentang' },
  { label: 'Bantuan', href: '#fitur' },
  { label: 'Kebijakan Privasi', href: '#tentang' },
  { label: 'Ketentuan Penggunaan', href: '#tentang' },
]

const CONTACTS = [
  {
    icon: MapPin,
    label: 'ALAMAT',
    lines: ['Jl. KH. Agus Salim No. XX', 'Genteng, Banyuwangi, Jawa Timur'],
    href: undefined,
  },
  {
    icon: Phone,
    label: 'TELEPON',
    lines: ['08xx-xxx-xxxx'],
    href: 'tel:+6281234567890',
  },
  {
    icon: Mail,
    label: 'EMAIL',
    lines: ['email@sekolah.sch.id'],
    href: 'mailto:email@sekolah.sch.id',
  },
] as const

export function LandingFooter() {
  return (
    <footer className="w-full border-t border-[#e5e7eb] bg-[#2563eb] text-white">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-10 px-4 py-10 sm:px-6 md:flex-row md:gap-12 md:px-[60px]">
        <div className="flex w-full flex-col items-start gap-4 md:w-[200px] md:shrink-0">
          <span className="flex h-20 w-44 items-center justify-center overflow-hidden rounded-2xl bg-white">
            <img
              alt="Logo Bank Mini Sekolah"
              className="h-full w-full object-contain"
              src="/logoKet.png"
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

        <FooterColumn title="HUBUNGI KAMI">
          <div className="flex w-full flex-col items-start gap-5">
            {CONTACTS.map((contact) => {
              const Icon = contact.icon
              const content = (
                <>
                  <span className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-white/80" aria-hidden="true" />
                    <span className="text-sm font-bold leading-5 text-white">{contact.label}</span>
                  </span>
                  {contact.lines.map((line) => (
                    <span key={line} className="text-sm leading-5 text-white">
                      {line}
                    </span>
                  ))}
                </>
              )

              return contact.href ? (
                <a
                  key={contact.label}
                  className="flex w-full flex-col items-start gap-1 transition-opacity hover:opacity-75"
                  href={contact.href}
                >
                  {content}
                </a>
              ) : (
                <div key={contact.label} className="flex w-full flex-col items-start gap-1">
                  {content}
                </div>
              )
            })}
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
              src="/maps.png"
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
