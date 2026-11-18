"use client"

import { MessageCircle, Phone } from "lucide-react"

declare global {
  interface Window { dataLayer?: Record<string, unknown>[] }
}

// WhatsApp and Call buttons for college cards. Cards are whole-card links, and a link inside a link is invalid HTML,
// so these are buttons that stop the click and open the chat or dialler themselves. Each click is reported to the
// dataLayer with the college and the page, so contact clicks can be counted per college in Google Analytics.
const PHONE_E164 = "+917753831118"

export default function CardContactButtons({ collegeName, collegeSlug }: { collegeName: string; collegeSlug: string }) {
  const wa = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917753831118").replace(/\D/g, "")
  const report = (channel: "whatsapp" | "call") =>
    window.dataLayer?.push({ event: "contact_click", channel, college: collegeSlug, page: window.location.pathname })

  const open = (e: React.MouseEvent, channel: "whatsapp" | "call") => {
    e.preventDefault()
    e.stopPropagation()
    report(channel)
    if (channel === "whatsapp") {
      const text = encodeURIComponent(`Hi CampusLelo, I want admission and fee details for ${collegeName}.`)
      window.open(`https://wa.me/${wa}?text=${text}`, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = `tel:${PHONE_E164}`
    }
  }

  const base = "inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition-colors"
  return (
    <span className="inline-flex items-center gap-1.5">
      <button type="button" onClick={(e) => open(e, "whatsapp")} aria-label={`Chat on WhatsApp about ${collegeName}`} className={`${base} bg-[#25D366] text-white hover:bg-[#1ebe5d]`}>
        <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" /> WhatsApp
      </button>
      <button type="button" onClick={(e) => open(e, "call")} aria-label={`Call CampusLelo about ${collegeName}`} className={`${base} bg-white text-[#012858] ring-1 ring-gray-300 hover:ring-[#012858]`}>
        <Phone className="h-3.5 w-3.5" aria-hidden="true" /> Call
      </button>
    </span>
  )
}
