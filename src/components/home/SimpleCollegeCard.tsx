"use client"

import { collegeHref } from "@/lib/collegeHref"
import { useState } from "react"
import Link from "next/link"
import { BookOpen, ClipboardCheck, IndianRupee, MapPin, Star, TrendingUp } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

// Compact homepage college card: photo, logo overlapping it with the name beside it, one row of
// three facts, one row of tags, two buttons. Ratings and placement figures show only when the data
// is verified, so they are absent for now; the third fact falls back to the number of exams accepted.
// The photo is a shared campus image: college.image holds third-party logos, not campus photos,
// so it is not used here. Add a real campus photo per college and show it instead.

const COLLEGE_BANNER = "/college-default-banner.webp"

function abbrev(shortName: string): string {
  return shortName.split(/[\s\-]/)[0].slice(0, 5).toUpperCase()
}

function Fact({ icon: Icon, value, label, grow }: { icon: typeof BookOpen; value: string; label: string; grow?: boolean }) {
  return (
    <div className={`flex min-w-0 items-center gap-2 ${grow ? "flex-[1.7]" : "flex-1"}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#012858]/10 text-[#012858]"><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <span className="min-w-0">
        <span className="block text-xs font-bold leading-tight text-gray-900">{value}</span>
        <span className="block text-[10px] leading-tight text-gray-600">{label}</span>
      </span>
    </div>
  )
}

export default function SimpleCollegeCard({ college, featured = false }: { college: College; featured?: boolean }) {
  const [logoError, setLogoError] = useState(false)

  const hasFees = college.feesRange.min > 0 || college.feesRange.max > 0
  const fees = hasFees ? formatFeesRange(college.feesRange.min, college.feesRange.max) : "On request"
  const hasPlacement = college.avgPlacement > 0

  return (
    <Link href={collegeHref(college.slug)} className="group block h-full rounded-2xl">
      <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-colors duration-300 group-hover:ring-[#012858]/40">
        {/* Photo */}
        <div className="relative h-28 overflow-hidden bg-[#011B40]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COLLEGE_BANNER} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {featured && (
            <span className="absolute left-2.5 top-2.5 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-bold text-amber-950">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Featured
            </span>
          )}
          <span className="absolute right-2.5 top-2.5 rounded-full bg-white px-2.5 py-0.5 text-[11px] font-semibold text-gray-800">{college.type}</span>
        </div>

        <div className="flex flex-1 flex-col px-3.5 pb-3.5">
          {/* Logo overlaps the photo; name and place sit beside it */}
          <div className="flex items-start gap-3">
            <div className="relative z-10 -mt-7 flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white shadow-sm ring-4 ring-white">
              {college.logo && !logoError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={college.logo} alt={`${college.name} logo`} width={56} height={56} loading="lazy" className="h-full w-full object-contain p-1.5" onError={() => setLogoError(true)} />
              ) : (
                <span className="px-1 text-center text-[10px] font-black leading-tight text-[#012858]">{abbrev(college.shortName)}</span>
              )}
            </div>
            <div className="min-w-0 flex-1 pt-2">
              <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-[#012858]">{college.name}</h3>
              <p className="mt-0.5 flex items-center gap-1 text-[11px] text-gray-600">
                <MapPin className="h-3 w-3 shrink-0 text-[#C90D11]" aria-hidden="true" />
                <span className="truncate">{college.location}</span>
              </p>
            </div>
            {college.reviewCount > 0 && (
              <span className="mt-2 shrink-0 rounded-lg bg-amber-50 px-2 py-1 text-center">
                <span className="flex items-center gap-1 text-xs font-bold text-gray-900"><Star className="h-3 w-3 fill-amber-400 text-amber-400" aria-hidden="true" />{college.rating.toFixed(1)}</span>
                <span className="block text-[9px] text-gray-600">({college.reviewCount} reviews)</span>
              </span>
            )}
          </div>

          {/* Facts: one row */}
          <div className="mt-3 flex items-center gap-2 border-t border-gray-100 pt-3">
            <Fact icon={IndianRupee} value={fees} label="Fee range" grow />
            <Fact icon={BookOpen} value={String(college.courses.length)} label="Courses" />
            {hasPlacement
              ? <Fact icon={TrendingUp} value={formatCurrency(college.avgPlacement)} label="Avg. placement" />
              : <Fact icon={ClipboardCheck} value={String(college.entranceExams.length)} label="Exams" />}
          </div>

          {/* Tags: one row, no wrapping */}
          <div className="mt-3 flex flex-nowrap gap-1.5 overflow-hidden">
            <span className="shrink-0 rounded-full bg-[#012858]/10 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{college.stream}</span>
            {college.entranceExams.slice(0, 2).map((e) => (
              <span key={e} className="shrink-0 rounded-full bg-[#012858]/10 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{e}</span>
            ))}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 pt-3">
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} className="flex-1 justify-center rounded-lg py-2 text-xs font-semibold" />
            <span className="flex-1 whitespace-nowrap rounded-lg bg-[#E0170F] px-3 py-2 text-center text-xs font-bold text-white transition-colors group-hover:bg-[#C90D11]">View details</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
