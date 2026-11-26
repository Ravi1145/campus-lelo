"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Compass, Landmark, Search } from "lucide-react"

// "Find colleges near you": a city search plus one tile per city we actually cover. Every tile links to a page that
// exists; MBA-only city pages are labelled so students are not surprised. Typing filters the tiles, and Enter on a
// city we do not list searches the college directory. All tiles are in the HTML (filtering only hides them).

interface City { name: string; href: string; note: string }

const CITIES: City[] = [
  { name: "Pune", href: "/colleges-in-pune", note: "All streams" },
  { name: "Noida", href: "/colleges-in-noida", note: "All streams" },
  { name: "Greater Noida", href: "/colleges-in-greater-noida", note: "All streams" },
  { name: "Delhi", href: "/mba-colleges-in-delhi", note: "MBA and PGDM" },
  { name: "Delhi NCR", href: "/mba-colleges-in-delhi-ncr", note: "MBA and PGDM" },
  { name: "Gurugram", href: "/mba-colleges-in-gurugram", note: "MBA and PGDM" },
  { name: "Ghaziabad", href: "/mba-colleges-in-ghaziabad", note: "MBA and PGDM" },
  { name: "Lucknow", href: "/mba-colleges-in-lucknow", note: "MBA and PGDM" },
  { name: "Dehradun", href: "/mba-colleges-in-dehradun", note: "MBA and PGDM" },
]

export default function FindNearYou() {
  const router = useRouter()
  const [q, setQ] = useState("")
  const needle = q.trim().toLowerCase()
  const matches = (c: City) => !needle || c.name.toLowerCase().includes(needle)
  const anyMatch = CITIES.some(matches)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const hit = CITIES.find(matches)
    router.push(hit && needle ? hit.href : `/colleges${needle ? `?search=${encodeURIComponent(q.trim())}` : ""}`)
  }

  return (
    <section aria-labelledby="near-h" className="bg-white py-10 sm:py-12">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <h2 id="near-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Find colleges near you</h2>
          <p className="mt-1.5 text-sm text-gray-600">Search by city to <span className="font-bold text-[#C90D11]">explore top colleges</span> in your area.</p>
        </div>

        <form onSubmit={submit} role="search" aria-label="Find colleges by city" className="mx-auto mt-5 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
            <label htmlFor="near-q" className="sr-only">Search city or location</label>
            <input id="near-q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search city or location..." autoComplete="off"
              className="min-h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 shadow-sm focus:border-[#024692] focus:outline-none focus:ring-2 focus:ring-[#024692]/20" />
          </div>
        </form>

        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {CITIES.map((c) => (
            <li key={c.name} hidden={!matches(c)}>
              <Link href={c.href} className="group flex h-full flex-col items-center rounded-2xl bg-white px-3 py-5 text-center ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(1,40,88,0.35)] hover:ring-[#012858]/30">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-[#024692] ring-1 ring-blue-100 transition-colors group-hover:bg-[#012858] group-hover:text-white">
                  <Landmark className="h-6 w-6" aria-hidden="true" />
                </span>
                <span className="mt-3 text-sm font-bold text-[#012858]">{c.name}</span>
                <span className="mt-0.5 text-[11px] text-gray-500">{c.note}</span>
              </Link>
            </li>
          ))}
          <li hidden={!!needle && anyMatch}>
            <Link href={needle ? `/colleges?search=${encodeURIComponent(q.trim())}` : "/colleges"} className="group flex h-full flex-col items-center rounded-2xl bg-white px-3 py-5 text-center ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-14px_rgba(1,40,88,0.35)] hover:ring-[#012858]/30">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-[#C90D11] ring-1 ring-red-100 transition-colors group-hover:bg-[#E0170F] group-hover:text-white">
                <Compass className="h-6 w-6" aria-hidden="true" />
              </span>
              <span className="mt-3 text-sm font-bold text-[#012858]">{needle ? `Search “${q.trim()}”` : "Explore all"}</span>
              <span className="mt-0.5 text-[11px] text-gray-500">College directory</span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
