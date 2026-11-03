"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"

// Phone-only bottom bar: the two actions students take most (WhatsApp and a free counselling request) always one
// tap away. Hidden on admin pages and on the counselling page, which already shows the booking form. On phones it
// replaces the floating WhatsApp button (WhatsAppCTA hides itself below md).
const HIDE_ON = [/^\/admin/, /^\/counselling/]

export default function MobileActionBar() {
  const pathname = usePathname() ?? "/"
  if (HIDE_ON.some((r) => r.test(pathname))) return null
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917753831118"
  const text = encodeURIComponent("Hi CampusLelo, I need help with admission. Please guide me.")

  return (
    <>
      {/* Spacer so the bar never covers the end of the page */}
      <div aria-hidden="true" className="h-16 md:hidden" />
      <nav
        aria-label="Quick help"
        className="fixed inset-x-0 bottom-0 z-[95] grid grid-cols-[auto_1fr] gap-2 border-t border-gray-200 bg-white/95 backdrop-blur md:hidden"
        style={{
          paddingTop: "0.5rem",
          paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
          paddingLeft: "max(12px, env(safe-area-inset-left, 0px))",
          paddingRight: "max(12px, env(safe-area-inset-right, 0px))",
        }}
      >
        <a
          href={`https://wa.me/${wa}?text=${text}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-sm font-bold text-white"
          aria-label="Chat with a counsellor on WhatsApp"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.01c-.24.68-1.41 1.3-1.95 1.38-.5.07-1.13.1-1.82-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.2-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.15.12.32.02.51-.1.2-.15.32-.29.49-.15.17-.31.38-.44.51-.15.14-.3.3-.13.6.17.29.76 1.25 1.63 2.03 1.12 1 2.06 1.31 2.36 1.45.29.15.46.12.63-.07.17-.2.73-.85.92-1.14.2-.29.39-.24.66-.15.27.1 1.7.8 2 .95.29.14.48.22.55.34.07.12.07.68-.17 1.36Z"/></svg>
          WhatsApp
        </a>
        <Link
          href="/counselling#book"
          className="flex h-11 items-center justify-center gap-2 rounded-xl bg-[#E0170F] px-4 text-sm font-bold text-white"
        >
          Free counselling <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </nav>
    </>
  )
}
