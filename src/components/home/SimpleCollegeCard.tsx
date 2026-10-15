"use client"

import { collegeHref } from "@/lib/collegeHref"
import { useState } from "react"
import Link from "next/link"
import { MapPin, Star } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

// Simple college card for the homepage rail: banner + name, three key facts,
// tags, rating and actions. The richer card lives in components/colleges.

const COLLEGE_BANNER = "/college-default-banner.jpg"

function abbrev(shortName: string): string {
  return shortName.split(/[\s\-]/)[0].slice(0, 5).toUpperCase()
}

export default function SimpleCollegeCard({ college, featured = false }: { college: College; featured?: boolean }) {
  const [logoError, setLogoError] = useState(false)

  const fees = college.feesRange.min > 0 || college.feesRange.max > 0
    ? formatFeesRange(college.feesRange.min, college.feesRange.max)
    : "On request"
  const hasPlacement = college.avgPlacement > 0
  const placement = hasPlacement ? formatCurrency(college.avgPlacement) : ""
  const extra = Math.max(0, college.entranceExams.length - 2)

  return (
    <Link href={collegeHref(college.slug)} className="group block h-full rounded-2xl">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all duration-300 hover:ring-[#012858]/40">
        {/* Header: logo, name, location, badges */}
        <div className="relative flex min-h-[8.75rem] flex-col justify-between p-4" style={{ backgroundImage: `url(${COLLEGE_BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#011B40]/75 to-[#012858]/80" />
          <div className="relative flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md">
              {college.logo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={college.logo} alt={`${college.name} logo`} width={48} height={48} loading="lazy" className="h-full w-full object-contain p-1" onError={() => setLogoError(true)} />
              ) : (
                <span className="px-1 text-center text-[10px] font-black leading-tight text-[#012858]">{abbrev(college.shortName)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="line-clamp-2 text-sm font-bold leading-snug text-white">{college.name}</h3>
              <p className="mt-1 flex items-center gap-1 text-xs text-white/85">
                <MapPin className="h-3 w-3 shrink-0 text-orange-300" aria-hidden="true" />
                <span className="truncate">{college.location}</span>
              </p>
            </div>
          </div>
          <div className="relative mt-3 flex flex-wrap gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold text-amber-950">
                <Star className="h-2.5 w-2.5 fill-current" aria-hidden="true" /> Featured
              </span>
            )}
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white ring-1 ring-white/30">NAAC {college.naac}</span>
            <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-semibold text-white ring-1 ring-white/30">{college.type}</span>
            {college.nirfRank && (
              <span className="rounded-full bg-[#E0170F] px-2.5 py-0.5 text-[11px] font-bold text-white">NIRF #{college.nirfRank}</span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col gap-3 p-4">
          <dl className="grid grid-cols-2 gap-2">
            <div className="min-h-[3.5rem] rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-gray-600">Fees</dt>
              <dd className="mt-0.5 text-xs font-bold leading-tight text-gray-900">{fees}</dd>
            </div>
            {hasPlacement && (
              <div className="rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
                <dt className="text-[10px] font-bold uppercase tracking-wide text-gray-600">Avg pkg</dt>
                <dd className="mt-0.5 text-xs font-bold leading-tight text-gray-900">{placement}</dd>
              </div>
            )}
            <div className="min-h-[3.5rem] rounded-lg bg-gray-50 px-3 py-2 ring-1 ring-gray-200">
              <dt className="text-[10px] font-bold uppercase tracking-wide text-gray-600">Courses</dt>
              <dd className="mt-0.5 text-xs font-bold leading-tight text-gray-900">{college.courses.length}</dd>
            </div>
          </dl>

          <div className="flex min-h-[3.25rem] flex-wrap content-start gap-1.5">
            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">{college.stream}</span>
            {college.entranceExams.slice(0, 2).map((e) => (
              <span key={e} className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-semibold text-gray-700">{e}</span>
            ))}
            {extra > 0 && <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-medium text-gray-600">+{extra} more</span>}
          </div>

          <div className="mt-auto flex flex-nowrap items-center gap-2 border-t border-gray-100 pt-3">
            {college.reviewCount > 0 && (
              <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-800">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                {college.rating.toFixed(1)}
              </span>
            )}
            <span className="ml-auto" />
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
            <span className="shrink-0 whitespace-nowrap rounded-lg bg-[#E0170F] px-3 py-2 text-xs font-bold text-white transition-colors group-hover:bg-[#C90D11]">Apply Now</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
