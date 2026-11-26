"use client"

import { collegeHref } from "@/lib/collegeHref"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, MapPin, Star } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

// Homepage college card, clean layout: logo tile and name on top, three-figure strip, tags, two buttons.
// No stock photo: the same campus image on every card added weight and no information (college.image holds
// third-party logos, not campus photos). Ratings and placement figures show only when the data is verified,
// so they are absent for now; the third figure falls back to the number of exams accepted.

function abbrev(shortName: string): string {
  return shortName.split(/[\s\-]/)[0].slice(0, 5).toUpperCase()
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-0 flex-1 px-2 text-center first:pl-0 last:pr-0">
      <p className="truncate text-[13px] font-extrabold leading-tight text-[#012858]">{value}</p>
      <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
    </div>
  )
}

export default function SimpleCollegeCard({ college, featured = false }: { college: College; featured?: boolean }) {
  const [logoError, setLogoError] = useState(false)

  const hasFees = college.feesRange.min > 0 || college.feesRange.max > 0
  // "₹1.3L to ₹1.8L/yr" becomes "₹1.3L – ₹1.8L" with the unit moved to the label, so it stays on one line
  const fees = hasFees ? formatFeesRange(college.feesRange.min, college.feesRange.max).replace(" to ", " – ").replace("/yr", "") : "On request"
  const hasPlacement = college.avgPlacement > 0

  return (
    <Link href={collegeHref(college.slug)} className="group block h-full rounded-2xl">
      <article className="relative flex h-full flex-col overflow-hidden rounded-2xl bg-white p-4 shadow-[0_2px_14px_-6px_rgba(1,40,88,0.25)] ring-1 ring-gray-200 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_30px_-14px_rgba(1,40,88,0.4)] group-hover:ring-[#012858]/30">

        {/* Top: logo tile, badges */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 ring-1 ring-gray-200">
            {college.logo && !logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={college.logo} alt={`${college.name} logo`} width={56} height={56} loading="lazy" className="h-full w-full object-contain p-1.5" onError={() => setLogoError(true)} />
            ) : (
              <span className="px-1 text-center text-[11px] font-black leading-tight text-[#012858]">{abbrev(college.shortName)}</span>
            )}
          </div>
          <div className="flex flex-wrap justify-end gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-900">
                <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Featured
              </span>
            )}
            <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-bold text-[#024692]">{college.type}</span>
          </div>
        </div>

        {/* Name and place */}
        <h3 className="mt-3 line-clamp-2 min-h-[2.6rem] text-[15px] font-bold leading-snug text-[#012858]">{college.name}</h3>
        <p className="mt-1 flex items-center gap-1 text-xs text-gray-600">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C90D11]" aria-hidden="true" />
          <span className="truncate">{college.location}</span>
        </p>

        {/* Figures */}
        <div className="mt-3 flex items-stretch divide-x divide-gray-200 rounded-xl bg-gray-50 px-3 py-2.5">
          <div className="min-w-0 flex-[1.8] pr-2 text-center">
            <p className="truncate text-[13px] font-extrabold leading-tight text-[#C90D11]">{fees}</p>
            <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-gray-500">Fees a year</p>
          </div>
          <Stat value={String(college.courses.length)} label="Courses" />
          {hasPlacement
            ? <Stat value={formatCurrency(college.avgPlacement)} label="Avg. package" />
            : <Stat value={String(college.entranceExams.length)} label="Exams" />}
        </div>

        {/* Tags */}
        <div className="mt-3 flex flex-nowrap gap-1.5 overflow-hidden">
          <span className="shrink-0 rounded-full bg-[#012858]/10 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{college.stream}</span>
          {college.entranceExams.slice(0, 2).map((e) => (
            <span key={e} className="shrink-0 rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-700">{e}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-auto flex items-center gap-2 pt-4">
          <CompareButton collegeSlug={college.slug} collegeName={college.shortName} className="flex-1 justify-center rounded-lg py-2.5 text-xs font-semibold" />
          <span className="inline-flex flex-1 items-center justify-center gap-1 whitespace-nowrap rounded-lg bg-[#E0170F] px-3 py-2.5 text-xs font-bold text-white transition-colors group-hover:bg-[#C90D11]">
            View details <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </span>
        </div>
      </article>
    </Link>
  )
}
