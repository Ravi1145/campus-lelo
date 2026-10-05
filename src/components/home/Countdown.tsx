"use client"

import { useEffect, useState } from "react"

// "in 12 days" badge computed in the visitor's browser (server time would go
// stale between ISR revalidations). Renders nothing until mounted.
export default function Countdown({ iso }: { iso: string }) {
  const [days, setDays] = useState<number | null>(null)
  useEffect(() => {
    const target = new Date(iso + "T00:00:00+05:30").getTime()
    setDays(Math.ceil((target - Date.now()) / 86_400_000))
  }, [iso])
  if (days === null || days < 0) return null
  const text = days === 0 ? "Today" : days === 1 ? "Tomorrow" : `in ${days} days`
  const urgent = days <= 14
  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${urgent ? "bg-orange-50 text-orange-700" : "bg-blue-50 text-[#024692]"}`}>
      {text}
    </span>
  )
}
