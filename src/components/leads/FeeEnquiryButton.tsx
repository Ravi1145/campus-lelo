"use client"

import { useState } from "react"
import { createPortal } from "react-dom"
import { IndianRupee } from "lucide-react"
import EnquiryForm from "./EnquiryForm"

// "Get fee details" on college cards. Cards are whole-card links, so the click is stopped from reaching the link,
// and the enquiry form opens in a portal on document.body. The wrapper around the portal also stops clicks, because
// React bubbles portal events to their React ancestors (the card's link) even though they sit outside it in the DOM.
export default function FeeEnquiryButton({ collegeName, collegeSlug, courses }: { collegeName: string; collegeSlug: string; courses: string[] }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        type="button"
        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(true) }}
        className="inline-flex items-center gap-1 rounded-lg bg-[#E0170F] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#C90D11]"
        aria-label={`Get fee details for ${collegeName}`}
      >
        <IndianRupee className="h-3.5 w-3.5" aria-hidden="true" /> Get fee details
      </button>
      {open && typeof document !== "undefined" && createPortal(
        <div onClick={(e) => e.stopPropagation()} onKeyDown={(e) => e.stopPropagation()}>
          <EnquiryForm collegeName={collegeName} collegeSlug={collegeSlug} courses={courses} isOpen={open} onClose={() => setOpen(false)} />
        </div>,
        document.body,
      )}
    </>
  )
}
