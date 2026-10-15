"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Briefcase, Building2, Clock, Cpu, GraduationCap, Scale, Stethoscope } from "lucide-react"
import { courses } from "@/data/courses"
import CardRail from "./CardRail"
import Reveal from "./Reveal"

// Featured courses: one card per course in a scrolling rail, filtered by stream. Only the course
// name, level, length, stream and usual entrance exams are shown. Fee and salary figures are left out
// until each carries a source.

const STREAM_STYLE: Record<string, { icon: typeof Cpu; tile: string; band: string }> = {
  Engineering: { icon: Cpu, tile: "bg-blue-50 text-[#024692]", band: "#024692" },
  Management: { icon: Briefcase, tile: "bg-orange-50 text-orange-700", band: "#F4A53A" },
  Medical: { icon: Stethoscope, tile: "bg-red-50 text-[#C90D11]", band: "#E0170F" },
  Law: { icon: Scale, tile: "bg-violet-50 text-violet-700", band: "#7C3AED" },
  Architecture: { icon: Building2, tile: "bg-emerald-50 text-emerald-700", band: "#16A34A" },
}
const FALLBACK = { icon: GraduationCap, tile: "bg-slate-100 text-slate-700", band: "#64748B" }

const TABS = ["All", ...Array.from(new Set(courses.map((c) => c.stream)))]

export default function FeaturedCourses() {
  const [tab, setTab] = useState("All")
  const list = courses.filter((c) => tab === "All" || c.stream === tab).slice(0, 12)

  return (
    <section aria-labelledby="courses-heading" className="section-pearl px-4 py-10 sm:px-6 sm:py-12">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item flex flex-wrap items-end justify-between gap-3" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">Courses</p>
            <h2 id="courses-heading" className="mt-1 font-[family-name:var(--font-fraunces)] text-2xl font-bold text-[#012858] sm:text-3xl">Featured courses</h2>
            <p className="mt-1 text-sm text-gray-600">Course length, level and the entrance exams usually asked for.</p>
          </div>
          <Link href="/courses" className="inline-flex min-h-9 items-center gap-1.5 text-sm font-bold text-[#024692] hover:underline">View all courses <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        <div className="reveal-item mt-4 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Filter courses by stream" style={{ "--i": 1 } as React.CSSProperties}>
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`min-h-9 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors ${tab === t ? "bg-[#012858] text-white" : "bg-white text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]"}`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-4">
          <CardRail key={tab} label="featured courses" itemClassName="w-[78vw] sm:w-72">
            {list.map((c) => {
              const s = STREAM_STYLE[c.stream] ?? FALLBACK
              const Icon = s.icon
              return (
                <Link key={c.id} href={`/courses/${c.slug}`} className="group block h-full">
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow duration-300 group-hover:shadow-[0_12px_28px_-14px_rgba(1,40,88,0.45)]">
                    <span className="h-1" style={{ background: s.band }} aria-hidden="true" />
                    <div className="flex flex-1 flex-col p-4">
                      <div className="flex items-start gap-3">
                        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.tile} transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-105`}><Icon className="h-5 w-5" aria-hidden="true" /></span>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-[family-name:var(--font-fraunces)] text-lg font-bold leading-tight text-[#012858]">{c.name}</h3>
                          <p className="mt-0.5 line-clamp-2 text-xs text-gray-600">{c.fullName}</p>
                        </div>
                        <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold text-[#024692]">{c.level}</span>
                      </div>

                      <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
                        <div className="rounded-lg bg-gray-50 px-2.5 py-1.5"><dt className="text-gray-600">Stream</dt><dd className="font-semibold text-gray-900">{c.stream}</dd></div>
                        <div className="rounded-lg bg-gray-50 px-2.5 py-1.5"><dt className="flex items-center gap-1 text-gray-600"><Clock className="h-3 w-3" aria-hidden="true" />Length</dt><dd className="font-semibold text-gray-900">{c.duration}</dd></div>
                      </dl>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {c.entranceExams.slice(0, 3).map((e) => <span key={e} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700">{e}</span>)}
                        {c.entranceExams.length > 3 && <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600">+{c.entranceExams.length - 3}</span>}
                      </div>

                      <span className="mt-auto flex items-center justify-between pt-4 text-sm font-bold text-[#C90D11]">
                        View course
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[#024692] transition-colors group-hover:bg-[#012858] group-hover:text-white"><ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                      </span>
                    </div>
                  </article>
                </Link>
              )
            })}
          </CardRail>
        </div>
      </Reveal>
    </section>
  )
}
