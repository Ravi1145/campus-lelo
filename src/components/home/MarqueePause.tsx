"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

// Pause/play control for an auto-scrolling marquee (WCAG 2.2.2). Toggles
// data-marquee-paused on the nearest .marquee-wrap; the CSS does the rest.
export default function MarqueePause({ label }: { label: string }) {
  const [paused, setPaused] = useState(false)
  return (
    <button
      type="button"
      aria-pressed={paused}
      aria-label={`${paused ? "Play" : "Pause"} ${label}`}
      onClick={(e) => {
        const wrap = e.currentTarget.closest(".marquee-wrap")
        wrap?.setAttribute("data-marquee-paused", String(!paused))
        setPaused(!paused)
      }}
      className="inline-flex h-7 w-7 items-center justify-center rounded-full text-gray-500 ring-1 ring-gray-200 transition-colors hover:bg-gray-100 hover:text-[#012858] motion-reduce:hidden"
    >
      {paused ? <Play className="h-3.5 w-3.5" aria-hidden="true" /> : <Pause className="h-3.5 w-3.5" aria-hidden="true" />}
    </button>
  )
}
