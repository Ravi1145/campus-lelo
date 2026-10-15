"use client"

import { collegeHref } from "@/lib/collegeHref"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Award, BedDouble, Heart, MapPin, Star } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency, getNaacColor, getTypeColor, cn } from "@/lib/utils"
import { examLabel } from "@/lib/collegeFacets"

// Wide row card for the /colleges list: identity + four key facts + section
// links on the left, action column on the right.

const SHORTLIST_KEY = "shortlisted_colleges"
const safeLS = (k: string) => { try { return localStorage.getItem(k) } catch { return null } }

function abbrev(shortName: string): string {
  return shortName.split(/[\s\-]/)[0].slice(0, 5).toUpperCase()
}

const SECTION_LINKS = [
  { label: "Placement", tab: "placements" },
  { label: "Admission", tab: "admissions" },
  { label: "Facilities", tab: "facilities" },
  { label: "Ranking", tab: "rankings" },
]

function Fact({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <div className="mt-1 text-sm font-extrabold leading-snug text-gray-900">{children}</div>
    </div>
  )
}

export default function CollegeRowCard({ college }: { college: College }) {
  const [shortlisted, setShortlisted] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    try {
      const s = safeLS(SHORTLIST_KEY)
      if (s) setShortlisted(JSON.parse(s).includes(college.slug))
    } catch {}
  }, [college.slug])

  const toggleShortlist = () => {
    try {
      const s = safeLS(SHORTLIST_KEY)
      let list: string[] = s ? JSON.parse(s) : []
      list = shortlisted ? list.filter((x) => x !== college.slug) : [...list, college.slug]
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list))
      setShortlisted(!shortlisted)
    } catch {}
  }

  const href = collegeHref(college.slug)
  const exams = Array.from(new Set(college.entranceExams.map(examLabel).filter(Boolean)))
  const hasFees = college.feesRange.min > 0 || college.feesRange.max > 0

  return (
    <article className="group relative overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
      <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-gradient-to-b from-[#E0170F] to-[#024692] transition-transform duration-500 group-hover:scale-y-100" />

      <div className="flex flex-col lg:flex-row">
        {/* Main */}
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex items-start gap-3.5 sm:gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 ring-1 ring-gray-200 sm:h-16 sm:w-16">
              {college.logo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={college.logo} alt={`${college.name} logo`} width={64} height={64} loading="lazy" className="h-full w-full object-contain" onError={() => setLogoError(true)} />
              ) : (
                <span className="px-1 text-center text-[11px] font-black leading-tight text-[#012858]">{abbrev(college.shortName)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-extrabold leading-snug text-gray-900 sm:text-lg">
                {/* stretched link: the whole card opens the college, buttons sit above it */}
                <Link href={href} className="transition-colors before:absolute before:inset-0 before:z-0 group-hover:text-[#C90D11]">
                  {college.name}
                </Link>
              </h3>
              <div className="mt-1.5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs text-gray-600">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" />{college.location}</span>
                <span aria-hidden="true" className="text-gray-300">•</span>
                <span className={cn("rounded-full px-2 py-0.5 font-semibold", getTypeColor(college.type))}>{college.type}</span>
                <span className={cn("rounded-full px-2 py-0.5 font-bold", getNaacColor(college.naac))}>NAAC {college.naac}</span>
                {college.hostel && <span className="inline-flex items-center gap-1 font-semibold text-gray-700"><BedDouble className="h-3.5 w-3.5" aria-hidden="true" />Hostel</span>}
              </div>
            </div>
          </div>

          {/* Key facts */}
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 rounded-xl bg-gradient-to-b from-gray-50 to-white p-3.5 ring-1 ring-gray-100 sm:grid-cols-4">
            <Fact label="Exams accepted">
              {exams.length > 0 ? (
                <>
                  {exams[0]}
                  {exams.length > 1 && <span className="ml-1 text-xs font-bold text-[#024692]">+{exams.length - 1} more</span>}
                </>
              ) : "—"}
            </Fact>
            <Fact label="Annual fees"><span className="text-[#C90D11]">{hasFees ? formatFeesRange(college.feesRange.min, college.feesRange.max) : "On request"}</span></Fact>
            {college.avgPlacement > 0 && <Fact label="Avg package"><span className="text-[#024692]">{formatCurrency(college.avgPlacement)}</span></Fact>}
            <Fact label="Total courses">{college.courses.length} {college.courses.length === 1 ? "course" : "courses"}</Fact>
          </div>

          {/* Section links */}
          <nav aria-label={`${college.shortName} sections`} className="relative z-10 mt-3.5 flex flex-wrap items-center gap-y-1 text-xs font-bold text-[#024692]">
            {SECTION_LINKS.map((l, i) => (
              <span key={l.tab} className="flex items-center">
                {i > 0 && <span aria-hidden="true" className="mx-2.5 h-3 w-px bg-gray-300" />}
                <Link href={`${href}?tab=${l.tab}`} className="underline-offset-2 hover:text-[#C90D11] hover:underline">{l.label}</Link>
              </span>
            ))}
          </nav>
        </div>

        {/* Actions */}
        <div className="relative z-10 flex flex-row items-stretch gap-2 border-t border-gray-100 bg-gray-50/70 p-3.5 sm:p-4 lg:w-56 lg:shrink-0 lg:flex-col lg:justify-center lg:border-l lg:border-t-0">
          <div className="flex-1 lg:flex-none [&>button]:w-full [&>button]:justify-center [&>button]:bg-white [&>button]:py-2.5 [&>button]:text-[13px] [&>button]:font-bold">
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
          </div>
          <button
            type="button"
            onClick={toggleShortlist}
            aria-pressed={shortlisted}
            className={cn(
              "flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2.5 text-[13px] font-bold transition-all active:scale-95 lg:flex-none",
              shortlisted ? "border-[#E0170F] bg-[#E0170F] text-white" : "border-[#E0170F]/40 bg-white text-[#C90D11] hover:bg-[#E0170F] hover:text-white"
            )}
          >
            <Heart className={cn("h-4 w-4", shortlisted && "fill-current")} aria-hidden="true" />
            {shortlisted ? "Shortlisted" : "Shortlist"}
          </button>
          <Link href={href} className="flex flex-1 items-center justify-center rounded-lg bg-[#012858] px-3 py-2.5 text-[13px] font-bold text-white shadow-md transition-colors hover:bg-[#024692] lg:flex-none">
            Apply Now
          </Link>
          <p className="hidden items-center justify-center gap-1.5 pt-1 text-xs font-semibold text-gray-700 lg:flex">
            {college.nirfRank ? (
              <><Award className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" /> NIRF #{college.nirfRank}</>
            ) : college.reviewCount > 0 ? (
              <><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" /> {college.rating.toFixed(1)} ({college.reviewCount.toLocaleString()})</>
            ) : null}
          </p>
        </div>
      </div>
    </article>
  )
}
