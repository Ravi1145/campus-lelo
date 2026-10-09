"use client"

import { useEffect, useState } from "react"

// Renders its children only after the page has loaded. Used for the duplicate cards that
// make a CSS marquee loop seamlessly: they are visual filler, so they stay out of the
// server HTML (smaller pages, fewer DOM nodes) and are added right after hydration.
export default function LoopClone({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 0)
    return () => window.clearTimeout(id)
  }, [])
  return ready ? <>{children}</> : null
}
