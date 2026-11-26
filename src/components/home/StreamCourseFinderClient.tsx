"use client"

import { useId, useState } from "react"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, Cpu, GraduationCap, Palette, Pill, Scale, Search, Stethoscope, TrendingUp, type LucideIcon } from "lucide-react"

// Streams / Courses switcher with a search box. Every card of both tabs is in the HTML (the inactive tab is only
// hidden, as with the college tabs), so crawlers see all links. Typing filters whichever tab is open.

export interface FinderItem { name: string; sub: string; href: string; tint: string; icon?: string }

const ICONS: Record<string, LucideIcon> = { MBA: Briefcase, Engineering: Cpu, Medical: Stethoscope, Law: Scale, Design: Palette, Commerce: TrendingUp, Pharmacy: Pill, Arts: BookOpen, course: GraduationCap }

export default function StreamCourseFinderClient({ streams, courses }: { streams: FinderItem[]; courses: FinderItem[] }) {
  const id = useId()
  const [tab, setTab] = useState<"streams" | "courses">("streams")
  const [q, setQ] = useState("")
  const needle = q.trim().toLowerCase()
  const show = (it: FinderItem) => !needle || `${it.name} ${it.sub}`.toLowerCase().includes(needle)

  const grid = (items: FinderItem[], key: "streams" | "courses") => (
    <ul id={`${id}-${key}`} role="tabpanel" aria-labelledby={`${id}-tab-${key}`} hidden={tab !== key} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <li key={it.href} hidden={!show(it)}>
          <Link href={it.href} className="group flex h-full items-center gap-3 rounded-xl bg-white p-3.5 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:ring-[#012858]/30">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold ${it.tint}`} aria-hidden="true">{(() => { const I = ICONS[it.icon ?? it.name] ?? GraduationCap; return <I className="h-5 w-5" /> })()}</span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-[#012858]">{it.name}</span>
              <span className="block truncate text-xs text-gray-500">{it.sub}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-gray-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#C90D11]" aria-hidden="true" />
          </Link>
        </li>
      ))}
    </ul>
  )

  const empty = !(tab === "streams" ? streams : courses).some(show)

  return (
    <section aria-labelledby={`${id}-h`} className="bg-gray-50 py-10 sm:py-12">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <h2 id={`${id}-h`} className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Find your perfect stream and course</h2>
          <p className="mt-1.5 text-sm text-gray-600">Search streams and courses, then open the colleges that offer them.</p>
        </div>

        <div className="relative mx-auto mt-5 max-w-2xl">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
          <label htmlFor={`${id}-q`} className="sr-only">Search courses, streams or programmes</label>
          <input id={`${id}-q`} value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search courses, streams, or programmes..." autoComplete="off"
            className="min-h-12 w-full rounded-xl border border-gray-200 bg-white pl-11 pr-4 text-sm text-gray-900 shadow-sm focus:border-[#024692] focus:outline-none focus:ring-2 focus:ring-[#024692]/20" />
        </div>

        <div role="tablist" aria-label="Streams or courses" className="mx-auto mt-5 flex w-fit rounded-xl bg-white p-1 shadow-md ring-1 ring-gray-200">
          {(["streams", "courses"] as const).map((t) => (
            <button key={t} type="button" role="tab" id={`${id}-tab-${t}`} aria-selected={tab === t} aria-controls={`${id}-${t}`} onClick={() => setTab(t)}
              className={`min-h-10 rounded-lg px-8 text-sm font-bold capitalize transition-colors ${tab === t ? "bg-[#E0170F] text-white" : "text-[#012858] hover:bg-gray-50"}`}>
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {grid(streams, "streams")}
          {grid(courses, "courses")}
          {empty && <p className="py-6 text-center text-sm text-gray-600">Nothing matches “{q.trim()}”. Try a shorter word, or <Link href="/colleges" className="font-bold text-[#C90D11] hover:underline">browse every college</Link>.</p>}
        </div>

        <p className="mt-6 text-center">
          <Link href={tab === "streams" ? "/colleges" : "/courses"} className="inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11] hover:underline">
            {tab === "streams" ? "Browse all colleges" : "View all courses"} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </p>
      </div>
    </section>
  )
}
