import { useEffect, useState } from 'react'
import { Bot, Paperclip, SendHorizontal, ShieldCheck, Sparkles, X } from 'lucide-react'

const TOPIC_CHIPS = [
  'Cara buka rekening siswa?',
  'Berapa setoran awal minimal?',
  'Bagaimana cara tarik uang?',
  'Jam operasional loket teller',
]

const REQUIREMENT_ITEMS = ['Kartu Pelajar / NISN aktif', 'Formulir tanda tangan wali murid']

export function BmsAiAssistant() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <>
      {open ? <AssistantPanel onClose={() => setOpen(false)} /> : null}

      <button
        aria-expanded={open}
        aria-label="Tanya BMS AI - Bantuan Siswa Instan"
        className="fixed right-4 bottom-4 z-[90] flex min-h-[54px] min-w-[163px] cursor-pointer items-center gap-3 overflow-hidden rounded-full border-2 border-[#ffffff33] bg-[#004ac6] px-4 py-3 text-left shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a] transition-colors hover:bg-[#003fae] print:hidden"
        onClick={() => setOpen((prev) => !prev)}
        type="button"
      >
        <span className="relative inline-flex items-center justify-center">
          <Bot className="h-5 w-[18px] text-white" aria-hidden="true" />
          <span className="absolute -top-1 -right-1.5 h-3 w-3 rounded-full border-2 border-[#004ac6] bg-[#7ffc97]" aria-hidden="true" />
        </span>

        <span className="flex flex-col items-start">
          <span className="font-jakarta text-xs font-bold leading-[12px] tracking-[-0.3px] whitespace-nowrap text-white">
            Tanya BMS AI
          </span>
          <span className="pt-1 font-jakarta text-[10px] leading-[10px] text-[#dbe1ff]">
            Bantuan Siswa Instan
          </span>
        </span>
      </button>
    </>
  )
}

function AssistantPanel({ onClose }: { onClose: () => void }) {
  return (
    <section
      aria-label="BMS AI Assistant"
      className="fixed right-4 bottom-24 z-[95] flex h-[480px] max-h-[calc(100vh-7.5rem)] w-[360px] flex-col items-start overflow-hidden rounded-3xl border border-[#c3c6d799] bg-white shadow-[0px_20px_25px_-5px_#0000001a] print:hidden max-[452px]:w-[calc(100vw-32px)]"
    >
      {/* HEADER */}
      <header className="flex w-full items-center justify-between p-3 shadow-[0px_1px_2px_#0000000d] bg-[linear-gradient(90deg,rgba(0,74,198,1)_0%,rgba(37,99,235,1)_100%)]">
        <div className="inline-flex items-center gap-2.5">
          <span className="mb-[-2px] flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/15">
            <Bot className="h-[18px] w-[18px] text-white" aria-hidden="true" />
          </span>

          <div className="flex flex-col items-start">
            <div className="flex items-center gap-2">
              <span className="font-jakarta text-[15px] font-bold leading-5 whitespace-nowrap text-white">
                BMS AI Assistant
              </span>
              <span
                aria-label="Status layanan: online"
                className="rounded bg-[#ffffff33] px-1.5 py-0.5 font-jakarta text-[10px] font-bold leading-[14px] tracking-[0.5px] text-[#eeefff]"
              >
                ONLINE
              </span>
            </div>

            <p className="font-jakarta text-[11px] leading-[12px] text-[#ffffffcc]">
              Asisten Tabungan Siswa SMK MUTU
            </p>
          </div>
        </div>

        <button
          aria-label="Tutup BMS AI Assistant"
          className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg text-white transition-colors hover:bg-white/15"
          onClick={onClose}
          type="button"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </header>

      {/* CHAT AREA */}
      <div className="w-full flex-1 overflow-y-auto bg-[#f8f9ff] p-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <div className="flex justify-center pb-3">
          <span className="rounded-full bg-[#e6eeff] px-2.5 font-jakarta text-[11px] leading-5 text-[#434655]">
            Hari ini • Layanan Terpadu AI
          </span>
        </div>

        <div className="flex flex-col gap-5">
          {/* BOT SELAMAT DATANG */}
          <article aria-label="Pesan dari BMS Virtual Assistant" className="flex items-start gap-2.5">
            <BotAvatar />

            <div className="flex max-w-[280px] flex-col items-start gap-1">
              <div className="w-full rounded-tl-[2px] rounded-2xl border border-[#c3c6d766] bg-white p-3">
                <p className="font-jakarta text-xs leading-4 text-[#004ac6]">BMS Virtual Assistant</p>
                <p className="pt-1 font-jakarta text-xs leading-[19.5px] text-[#121c2a]">
                  Halo! Saya Asisten Virtual Bank Mini Sekolah (BMS). Ada yang bisa saya bantu terkait
                  informasi tabungan, penarikan, atau pembukaan rekening siswa?
                </p>
              </div>
              <time className="pl-1 font-jakarta text-[10px] leading-5 text-[#434655]" dateTime="10:41">
                Baru saja
              </time>
            </div>
          </article>

          {/* TOPIK POPULER */}
          <section aria-labelledby="popular-topics" className="flex flex-col gap-1.5 pl-9">
            <div className="flex items-center gap-1">
              <Sparkles className="h-[11px] w-[11px] text-[#434655]" aria-hidden="true" />
              <h2 className="font-jakarta text-[11px] font-bold leading-5 text-[#434655]" id="popular-topics">
                Topik Pertanyaan Populer:
              </h2>
            </div>

            <div className="flex flex-col items-start gap-1.5">
              {TOPIC_CHIPS.map((topic) => (
                <button
                  className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#c3c6d780] bg-white px-3 py-1.5 font-jakarta text-xs leading-4 text-[#121c2a] transition-colors hover:border-[#004ac6] hover:bg-[#eff4ff]"
                  key={topic}
                  type="button"
                >
                  {topic}
                </button>
              ))}
            </div>
          </section>

          {/* PESAN PENGGUNA */}
          <article aria-label="Pertanyaan pengguna" className="flex items-end justify-end">
            <div className="flex max-w-[260px] flex-col items-end gap-1">
              <div className="rounded-tr-[2px] rounded-2xl bg-[#004ac6] p-3">
                <p className="font-jakarta text-xs leading-[19.5px] text-white">
                  Berapa setoran awal minimal untuk buka rekening siswa?
                </p>
              </div>
              <time className="pr-1 font-jakarta text-[10px] leading-5 text-[#434655]" dateTime="10:42">
                10:42
              </time>
            </div>
          </article>

          {/* JAWABAN BOT */}
          <article aria-label="Jawaban dari BMS Virtual Assistant" className="flex items-start gap-2.5">
            <BotAvatar initial="P" />

            <div className="flex max-w-[280px] flex-col items-start gap-1">
              <div className="w-full rounded-tl-[2px] rounded-2xl border border-[#c3c6d766] bg-white p-3">
                <p className="font-jakarta text-xs leading-[19.5px] text-[#121c2a]">
                  Setoran awal di <strong className="font-bold">BMS SMKS Muhammadiyah 1 Genteng</strong>{' '}
                  adalah <strong className="font-bold">Rp 10.000,-</strong> tanpa biaya admin bulanan!
                </p>

                <aside aria-label="Persyaratan singkat" className="mt-1.5 flex flex-col gap-1 rounded-xl border border-[#dbe1ff80] bg-[#e6eeff] p-2">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="h-3 w-3 text-[#004ac6]" aria-hidden="true" />
                    <p className="font-jakarta text-xs leading-4 text-[#004ac6]">Persyaratan Singkat:</p>
                  </div>
                  <ul className="flex flex-col gap-0.5">
                    {REQUIREMENT_ITEMS.map((item) => (
                      <li className="flex items-start gap-2" key={item}>
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#434655]" aria-hidden="true" />
                        <p className="font-jakarta text-[11px] leading-[17.9px] text-[#434655]">{item}</p>
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>
              <time className="pl-1 font-jakarta text-[10px] leading-5 text-[#434655]" dateTime="10:43">
                10:43
              </time>
            </div>
          </article>
        </div>
      </div>

      {/* FOOTER INPUT */}
      <footer className="flex w-full flex-col gap-1.5 border-t border-[#c3c6d766] bg-white p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-[#c3c6d7] bg-[#f8f9ff] px-3 py-1.5">
          <button
            aria-label="Lampirkan file"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md text-[#434655] transition-colors hover:bg-[#e6eeff]"
            type="button"
          >
            <Paperclip className="h-4 w-4" aria-hidden="true" />
          </button>

          <label className="sr-only" htmlFor="bms-ai-question">
            Pertanyaan seputar BMS
          </label>
          <input
            autoComplete="off"
            className="w-full min-w-0 flex-1 border-0 bg-transparent p-0 font-jakarta text-xs text-[#737686] outline-none placeholder:text-[#737686]"
            id="bms-ai-question"
            type="text"
            placeholder="Ketik pertanyaan seputar BMS..."
          />

          <button
            aria-label="Kirim pertanyaan"
            className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-xl bg-[#004ac6] text-white transition-colors hover:bg-[#003fae]"
            type="button"
          >
            <SendHorizontal className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center justify-between px-1">
          <div className="inline-flex items-center gap-1">
            <ShieldCheck className="h-[11px] w-[10px] text-[#434655]" aria-hidden="true" />
            <p className="font-jakarta text-[10px] leading-4 text-[#434655]">
              Didukung AI BMS SMKS Muhammadiyah 1 Genteng
            </p>
          </div>
          <span className="font-jakarta text-[10px] leading-4 text-[#006329]">• Aktif 24 Jam</span>
        </div>
      </footer>
    </section>
  )
}

function BotAvatar({ initial }: { initial?: string }) {
  return (
    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#2563eb]">
      {initial ? (
        <span className="font-jakarta text-xs font-bold text-white">{initial}</span>
      ) : (
        <Bot className="h-4 w-4 text-white" aria-hidden="true" />
      )}
    </span>
  )
}
