"use client"

import { Children, useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Reveal from "./Reveal"

// Horizontal card rail: snap scrolling, prev/next buttons (desktop), edge fades,
// staggered reveal and hover lift. Each child becomes one card slot.
export default function CardRail({ children, label, itemClassName = "w-[82vw] sm:w-72" }: { children: React.ReactNode; label: string; itemClassName?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setCanPrev(el.scrollLeft > 4)
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4)
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => { el.removeEventListener("scroll", update); window.removeEventListener("resize", update) }
  }, [update, children])

  const scrollBy = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: reduce ? "auto" : "smooth" })
    // Re-check button state after the scroll settles (scroll events can be throttled)
    window.setTimeout(update, 400)
    window.setTimeout(update, 900)
  }

  const btn = "absolute top-1/2 z-20 hidden -translate-y-1/2 h-11 w-11 items-center justify-center rounded-full bg-white text-[#012858] shadow-lg ring-1 ring-gray-200 transition-all hover:bg-[#012858] hover:text-white disabled:pointer-events-none disabled:opacity-0 sm:flex"

  return (
    <div className="relative">
      <button type="button" onClick={() => scrollBy(-1)} disabled={!canPrev} aria-label={`Previous ${label}`} className={`${btn} -left-4`}>
        <ChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <Reveal>
        <div
          ref={ref}
          role="region"
          aria-label={label}
          className="rail-fade flex gap-4 sm:gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pt-2 pb-4 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {Children.toArray(children).map((child, i) => (
            <div key={i} className={`rail-card reveal-item relative flex-shrink-0 snap-start ${itemClassName}`} style={{ "--i": Math.min(i, 6) } as React.CSSProperties}>
              {child}
            </div>
          ))}
        </div>
      </Reveal>
      <button type="button" onClick={() => scrollBy(1)} disabled={!canNext} aria-label={`Next ${label}`} className={`${btn} -right-4`}>
        <ChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  )
}
