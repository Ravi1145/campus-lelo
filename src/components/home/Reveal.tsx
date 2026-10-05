"use client"

import { useLayoutEffect, useRef } from "react"

// Adds a staggered "rise in" animation to children marked .reveal-item when
// the block scrolls into view. Content is fully visible in the server HTML
// (crawlable, no-JS safe); the hide-then-animate only happens client-side for
// blocks that start off-screen. Reduced-motion users get no movement (globals.css).
export default function Reveal({ children, className = "", as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" | "section" }) {
  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) return // already visible — don't hide it
    el.dataset.reveal = "pending"
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          el.dataset.reveal = "in"
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return <Tag ref={ref as React.Ref<never>} className={className}>{children}</Tag>
}
