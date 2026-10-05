"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import type { PlanId } from "@/data/counselling"

export const PLAN_EVENT = "counselling-plan"

// Plan button. On /counselling it preselects the plan in the booking form and
// scrolls to it; from any other page it navigates to /counselling with the plan.
export default function PlanCta({ plan, children, className }: { plan: PlanId; children: React.ReactNode; className?: string }) {
  const pathname = usePathname()
  const href = `/counselling?plan=${plan === "video_199" ? "video" : "free"}#book`

  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        if (pathname !== "/counselling") return
        e.preventDefault()
        window.dispatchEvent(new CustomEvent<PlanId>(PLAN_EVENT, { detail: plan }))
        document.getElementById("book")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" })
      }}
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
    </Link>
  )
}
