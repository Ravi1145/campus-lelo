"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, ArrowRight } from "lucide-react"

const QUICK = ["MBA with hostel", "Government engineering", "NAAC A++", "Low fees", "Law", "Design"]

// Header search for /colleges. Pushes ?search= which CollegeGrid reads — no
// useSearchParams here, so it doesn't force a client-side-rendering bailout.
export default function CollegesHeroSearch() {
  const router = useRouter()
  const [q, setQ] = useState("")

  const go = (value: string) => {
    const v = value.trim()
    router.push(v ? `/colleges?search=${encodeURIComponent(v)}` : "/colleges")
  }

  return (
    <div className="max-w-2xl">
      <form onSubmit={(e) => { e.preventDefault(); go(q) }} role="search" aria-label="Search colleges" className="flex gap-2 rounded-2xl bg-white p-2 shadow-2xl shadow-black/25">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <label htmlFor="colleges-hero-q" className="sr-only">Search colleges by name, course or exam</label>
          <input
            id="colleges-hero-q"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search college, course or exam — e.g. COEP, MBA, CAT"
            className="w-full rounded-xl bg-gray-50 py-3.5 pl-10 pr-3 text-sm text-gray-900 placeholder:text-gray-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#024692]/30"
          />
        </div>
        <button type="submit" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 text-sm font-bold text-white transition-colors hover:bg-[#C90D11]">
          <span className="hidden sm:inline">Search</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </button>
      </form>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-blue-200">Try:</span>
        {QUICK.map((s) => (
          <button key={s} type="button" onClick={() => go(s)} className="rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-white ring-1 ring-white/20 backdrop-blur transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#012858]">
            {s}
          </button>
        ))}
      </div>
    </div>
  )
}
