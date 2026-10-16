import Link from "next/link"
import { colleges } from "@/data/colleges"
import { searchColleges } from "@/lib/collegeSearch"
import type { College } from "@/types"
import { ArrowRight, BarChart3, BookOpen, Building2, GraduationCap, Pill, Palette, Scale, Stethoscope } from "lucide-react"
import Reveal from "./Reveal"

// Browse by stream: Engineering as the large feature card, MBA as the wide card, then six smaller cards.
// Counts come from the real college data. No stock photos: the artwork is drawn in SVG.

type Item = { name: string; sub: string; icon: typeof GraduationCap; tint: string; ink: string }

const ENGINEERING = { name: "Engineering", sub: "B.Tech / BE / MHT-CET / JEE" }
const MBA: Item = { name: "MBA", sub: "MBA / PGDM / CAT / MAT / MAH-CET", icon: GraduationCap, tint: "bg-blue-50", ink: "text-[#024692]" }
const PAIR: Item[] = [
  { name: "Medical", sub: "MBBS / BDS / NEET", icon: Stethoscope, tint: "bg-red-50", ink: "text-[#C90D11]" },
  { name: "Law", sub: "LLB / BA LLB / CLAT / MH-CET", icon: Scale, tint: "bg-blue-50", ink: "text-[#024692]" },
]
const ROW: Item[] = [
  { name: "Design", sub: "B.Des / BFA / NID / NIFT", icon: Palette, tint: "bg-orange-50", ink: "text-orange-700" },
  { name: "Arts", sub: "BA / BFA / CET / Board", icon: BookOpen, tint: "bg-violet-50", ink: "text-violet-700" },
  { name: "Pharmacy", sub: "B.Pharm / D.Pharm / MHT-CET", icon: Pill, tint: "bg-emerald-50", ink: "text-emerald-700" },
  { name: "Commerce", sub: "B.Com / BBA / Board / CET", icon: BarChart3, tint: "bg-red-50", ink: "text-[#C90D11]" },
]

const STREAM_FIELD: Record<string, College["stream"][]> = {
  Engineering: ["Engineering"], MBA: ["MBA", "Management"], Medical: ["Medical"], Law: ["Law"], Arts: ["Arts & Science"],
}
function collegeCount(name: string): number {
  const streams = STREAM_FIELD[name]
  return streams ? colleges.filter((c) => streams.includes(c.stream)).length : searchColleges(colleges, name).length
}
const href = (name: string) => `/colleges?stream=${encodeURIComponent(name)}`

function Count({ name }: { name: string }) {
  const n = collegeCount(name)
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C90D11]">
      <Building2 className="h-3 w-3 text-gray-500" aria-hidden="true" />
      {n > 0 ? `${n} colleges` : "Explore"}
    </span>
  )
}

function Arrow() {
  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#024692] transition-colors duration-300 group-hover:bg-[#012858] group-hover:text-white">
      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
    </span>
  )
}

function SmallCard({ item, i }: { item: Item; i: number }) {
  const Icon = item.icon
  return (
    <li className="reveal-item" style={{ "--i": i } as React.CSSProperties}>
      <Link href={href(item.name)} className="group flex h-full items-center gap-2 rounded-xl bg-white p-2.5 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(1,40,88,0.45)]">
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${item.tint} ${item.ink} transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105`}><Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" /></span>
        <span className="min-w-0 flex-1">
          <span className="block font-[family-name:var(--font-fraunces)] text-sm font-bold leading-tight text-[#012858]">{item.name}</span>
          <span className="block text-[11px] leading-snug text-gray-600">{item.sub}</span>
          <span className="mt-1 block"><Count name={item.name} /></span>
        </span>
        <span className="self-end"><Arrow /></span>
      </Link>
    </li>
  )
}

// Skyline and circuit drawing behind the Engineering card: lines draw once when the section scrolls into view.
function Skyline() {
  return (
    <svg viewBox="0 0 360 300" className="pointer-events-none absolute bottom-0 right-0 h-full max-h-[8rem] w-auto text-blue-200/45" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
      {[[160, 120, 60, 180], [226, 70, 54, 230], [284, 140, 60, 160], [100, 170, 52, 130], [20, 200, 70, 100]].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect className="sg-draw" pathLength={1} x={x} y={y} width={w} height={h} style={{ animationDelay: `${0.2 + i * 0.12}s` }} />
          {Array.from({ length: Math.floor(h / 28) }).map((_, r) => <line key={r} className="sg-draw" pathLength={1} x1={x + 8} y1={y + 18 + r * 28} x2={x + w - 8} y2={y + 18 + r * 28} style={{ animationDelay: `${0.5 + i * 0.12}s` }} />)}
        </g>
      ))}
      <rect className="sg-draw" pathLength={1} x="236" y="22" width="34" height="34" rx="6" />
      <path className="sg-draw" pathLength={1} d="M253 22 V8 M253 56 V70 M236 39 H222 M270 39 H284" />
    </svg>
  )
}

export default function BrowseByStream() {
  return (
    <section className="section-ivory px-5 py-6 sm:px-8 lg:px-12 sm:py-8" aria-labelledby="streams-heading">
      <Reveal className="mx-auto max-w-7xl">
        <div className="reveal-item mb-3 flex items-end justify-between gap-4" style={{ "--i": 0 } as React.CSSProperties}>
          <div>
            <p className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-[#C90D11]"><span className="h-0.5 w-6 bg-[#E0170F]" aria-hidden="true" />Explore programmes</p>
            <h2 id="streams-heading" className="mt-1.5 text-xl font-bold leading-tight text-[#012858] sm:text-2xl">Browse by stream</h2>
            <p className="mt-0.5 text-sm text-gray-600">Find colleges by your field of study</p>
          </div>
          <Link href="/colleges" className="inline-flex min-h-9 shrink-0 items-center gap-1.5 text-sm font-bold text-[#024692] hover:underline">View all <ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>

        <ul className="grid gap-2.5 lg:grid-cols-12">
          {/* Engineering: the feature card */}
          <li className="reveal-item lg:col-span-5 lg:row-span-2" style={{ "--i": 1 } as React.CSSProperties}>
            <Link href={href("Engineering")} className="group relative flex h-full min-h-[9rem] flex-col justify-between overflow-hidden rounded-2xl bg-[#012858] p-3.5 text-white">
              <Skyline />
              <div className="relative">
                <span className="block h-0.5 w-6 bg-[#F4604A]" aria-hidden="true" />
                <h3 className="mt-2 font-[family-name:var(--font-fraunces)] text-2xl font-bold leading-tight">{ENGINEERING.name}</h3>
                <p className="mt-1 text-xs text-blue-100">{ENGINEERING.sub}</p>
                <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold"><Building2 className="h-3.5 w-3.5 text-blue-200" aria-hidden="true" />{collegeCount("Engineering")} colleges</p>
              </div>
              <div className="relative mt-3 flex items-end justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#F4604A] px-3.5 py-1.5 text-xs font-bold text-white transition-colors group-hover:bg-[#E0170F]">Explore Engineering <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
                <span className="hidden -rotate-6 font-[family-name:var(--font-fraunces)] text-sm italic leading-tight text-blue-100 sm:block">Build a<br />better tomorrow</span>
              </div>
            </Link>
          </li>

          <li className="lg:col-span-7">
            <ul className="grid h-full gap-2.5">
              {/* MBA: the wide card */}
              <li className="reveal-item" style={{ "--i": 2 } as React.CSSProperties}>
                <Link href={href("MBA")} className="group relative flex h-full items-center gap-2.5 overflow-hidden rounded-xl bg-white p-2.5 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-shadow duration-300 hover:shadow-[0_12px_28px_-14px_rgba(1,40,88,0.45)]">
                  <span className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 rounded-full bg-orange-50" aria-hidden="true" />
                  <span className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${MBA.tint} ${MBA.ink} transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105`}><GraduationCap className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" /></span>
                  <span className="relative min-w-0 flex-1">
                    <span className="block font-[family-name:var(--font-fraunces)] text-base font-bold text-[#012858]">{MBA.name}</span>
                    <span className="block break-words text-[11px] text-gray-600">{MBA.sub}</span>
                    <span className="mt-1 block"><Count name="MBA" /></span>
                  </span>
                  <span className="relative hidden -rotate-3 text-right font-[family-name:var(--font-fraunces)] text-sm italic leading-tight text-[#012858] md:block">Leaders create<br />opportunities</span>
                  <span className="relative self-end"><Arrow /></span>
                </Link>
              </li>
              <li>
                <ul className="grid h-full gap-2.5 sm:grid-cols-2">{PAIR.map((it, i) => <SmallCard key={it.name} item={it} i={i + 3} />)}</ul>
              </li>
            </ul>
          </li>
        </ul>

        <ul className="mt-2.5 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">{ROW.map((it, i) => <SmallCard key={it.name} item={it} i={i + 5} />)}</ul>
      </Reveal>
    </section>
  )
}
