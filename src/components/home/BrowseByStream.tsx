import Link from "next/link"
import { colleges } from "@/data/colleges"
import { searchColleges } from "@/lib/collegeSearch"
import type { College } from "@/types"
import { Cpu, Briefcase, Activity, Scale, Palette, BookOpen, Pill, TrendingUp, ArrowUpRight } from "lucide-react"
import Reveal from "./Reveal"

// Eight streams as a mixed-size grid: the biggest tile for the most searched stream,
// a wide tile for MBA, then small ones. Counts come from the real college data.

type Tile = { name: string; icon: typeof Cpu; sub: string; exam: string; shape: string; tone: "navy" | "white" | "soft" }

const STREAMS: Tile[] = [
  { name: "Engineering", icon: Cpu,        sub: "B.Tech / BE",       exam: "MHT-CET / JEE", shape: "col-span-2 lg:row-span-2", tone: "navy" },
  { name: "MBA",         icon: Briefcase,  sub: "MBA / PGDM",        exam: "CAT / MAH-CET", shape: "col-span-2", tone: "white" },
  { name: "Medical",     icon: Activity,   sub: "MBBS / BDS",        exam: "NEET",          shape: "", tone: "soft" },
  { name: "Law",         icon: Scale,      sub: "LLB / BA LLB",      exam: "CLAT / MH-CET", shape: "", tone: "soft" },
  { name: "Design",      icon: Palette,    sub: "B.Des / BFA",       exam: "NID / NIFT",    shape: "", tone: "soft" },
  { name: "Arts",        icon: BookOpen,   sub: "BA / BFA",          exam: "CET / Board",   shape: "", tone: "soft" },
  { name: "Pharmacy",    icon: Pill,       sub: "B.Pharm / D.Pharm", exam: "MHT-CET",       shape: "", tone: "soft" },
  { name: "Commerce",    icon: TrendingUp, sub: "BCom / BBA",        exam: "Board / CET",   shape: "", tone: "soft" },
]

const STREAM_FIELD: Record<string, College["stream"][]> = {
  Engineering: ["Engineering"], MBA: ["MBA", "Management"], Medical: ["Medical"], Law: ["Law"], Arts: ["Arts & Science"],
}
function collegeCount(name: string): number {
  const streams = STREAM_FIELD[name]
  return streams ? colleges.filter((c) => streams.includes(c.stream)).length : searchColleges(colleges, name).length
}

// Line drawing behind the Engineering tile: a chip with pins that draws itself once.
function ChipArt() {
  return (
    <svg viewBox="0 0 200 200" className="absolute -bottom-6 -right-6 h-56 w-56 text-white/25 transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <rect className="sg-draw" pathLength={1} x="55" y="55" width="90" height="90" rx="10" />
      <rect className="sg-draw" pathLength={1} x="78" y="78" width="44" height="44" rx="5" />
      {[70, 90, 110, 130].map((p) => (
        <g key={p}>
          <path className="sg-draw" pathLength={1} d={`M${p} 55 V35`} />
          <path className="sg-draw" pathLength={1} d={`M${p} 145 V165`} />
          <path className="sg-draw" pathLength={1} d={`M55 ${p} H35`} />
          <path className="sg-draw" pathLength={1} d={`M145 ${p} H165`} />
        </g>
      ))}
    </svg>
  )
}

export default function BrowseByStream() {
  return (
    <section className="section-ivory px-4 py-16 sm:px-6 sm:py-20" aria-labelledby="streams-heading">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item mb-10 flex items-end justify-between gap-4" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <h2 id="streams-heading" className="text-3xl font-bold text-[#0F172A] sm:text-4xl">Browse by stream</h2>
            <p className="mt-1.5 text-sm text-gray-600 sm:text-base">Find colleges by your field of study</p>
          </div>
          <Link href="/colleges" className="shrink-0 text-sm font-semibold text-[#C90D11] hover:underline">View all →</Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:auto-rows-[10.5rem]">
          {STREAMS.map(({ name, icon: Icon, sub, exam, shape, tone }, i) => {
            const n = collegeCount(name)
            const big = tone === "navy"
            return (
              <Link
                key={name}
                href={`/colleges?stream=${encodeURIComponent(name)}`}
                className={`reveal-item group relative flex flex-col justify-between overflow-hidden rounded-3xl p-5 transition-colors duration-300 sm:p-6 ${shape} ${
                  big ? "bg-[#011B40] text-white min-h-[15rem]" : tone === "white" ? "bg-white ring-1 ring-gray-200 hover:ring-[#012858]/40" : "bg-[#F1F4F9] hover:bg-white ring-1 ring-transparent hover:ring-[#012858]/25"
                }`}
                style={{ "--i": i + 1 } as React.CSSProperties}
              >
                {big && <ChipArt />}
                {!big && (
                  <Icon className="absolute -bottom-3 -right-3 h-24 w-24 text-[#012858]/[0.07] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" strokeWidth={1.25} aria-hidden="true" />
                )}
                <div className="relative flex items-start justify-between">
                  <span className={`flex h-11 w-11 items-center justify-center rounded-full ${big ? "bg-white/15" : "bg-white ring-1 ring-gray-200"}`}>
                    <Icon className={`h-5 w-5 ${big ? "text-white" : "text-[#012858]"}`} strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  {big && <span className="whitespace-nowrap rounded-full bg-[#E0170F] px-2.5 py-1 text-[11px] font-bold text-white">Most popular</span>}
                  {!big && <ArrowUpRight className="h-5 w-5 text-gray-400 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C90D11]" aria-hidden="true" />}
                </div>
                <div className="relative">
                  <p className={`font-[family-name:var(--font-fraunces)] font-bold leading-tight ${big ? "text-3xl sm:text-4xl" : "text-lg sm:text-xl"}`}>{name}</p>
                  <p className={`mt-1 text-xs sm:text-sm ${big ? "text-blue-100" : "text-gray-600"}`}>{sub} · {exam}</p>
                  <p className={`mt-2 text-xs font-semibold ${big ? "text-orange-200" : "text-[#C90D11]"}`}>{n > 0 ? `${n} colleges` : "Explore"}</p>
                </div>
              </Link>
            )
          })}
        </div>
      </Reveal>
    </section>
  )
}
