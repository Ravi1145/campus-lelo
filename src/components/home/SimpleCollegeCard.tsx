"use client"

import { collegeHref } from "@/lib/collegeHref"
import { useState } from "react"
import Link from "next/link"
import { BookOpen, ClipboardCheck, IndianRupee, MapPin, Star, TrendingUp } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency } from "@/lib/utils"

// Homepage college card: photo on top (Featured badge and rating when we have them), logo
// overlapping the photo, name and place, three facts with icons, tags, and two buttons.
// Ratings and placement figures show only when the data is verified, so they are absent
// for now; the third fact falls back to the number of accepted entrance exams.
// The photo is a shared campus image: college.image holds third-party logos, not campus photos,
// so it is not used here. Add a real campus photo per college and show it instead.

const COLLEGE_BANNER = "/college-default-banner.jpg"

function abbrev(shortName: string): string {
  return shortName.split(/[\s\-]/)[0].slice(0, 5).toUpperCase()
}

function Fact({ icon: Icon, value, label }: { icon: typeof BookOpen; value: string; label: string }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center text-center">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#012858]/10 text-[#012858]"><Icon className="h-4 w-4" aria-hidden="true" /></span>
      <span className="mt-1.5 text-[13px] font-bold leading-tight text-gray-900">{value}</span>
      <span className="mt-0.5 text-[11px] leading-tight text-gray-600">{label}</span>
    </div>
  )
}

export default function SimpleCollegeCard({ college, featured = false }: { college: College; featured?: boolean }) {
  const [logoError, setLogoError] = useState(false)

  const hasFees = college.feesRange.min > 0 || college.feesRange.max > 0
  const fees = hasFees ? formatFeesRange(college.feesRange.min, college.feesRange.max) : "On request"
  const hasPlacement = college.avgPlacement > 0
  const extra = Math.max(0, college.entranceExams.length - 2)

  return (
    <Link href={collegeHref(college.slug)} className="group block h-full rounded-3xl">
      <article className="flex h-full flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-gray-200 transition-colors duration-300 group-hover:ring-[#012858]/40">
        {/* Photo */}
        <div className="relative h-36 overflow-hidden bg-[#011B40]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={COLLEGE_BANNER} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          {featured && (
            <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-400 px-2.5 py-1 text-[11px] font-bold text-amber-950">
              <Star className="h-3 w-3 fill-current" aria-hidden="true" /> Featured
            </span>
          )}
          {college.reviewCount > 0 && (
            <span className="absolute right-3 top-3 rounded-xl bg-white px-2.5 py-1 text-center shadow-sm">
              <span className="flex items-center gap-1 text-sm font-bold text-gray-900"><Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />{college.rating.toFixed(1)}</span>
              <span className="block text-[10px] text-gray-600">({college.reviewCount} reviews)</span>
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col px-4 pb-4">
          {/* Logo overlaps the photo */}
          <div className="relative z-10 -mt-8 flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-white shadow-sm">
            {college.logo && !logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={college.logo} alt={`${college.name} logo`} width={64} height={64} loading="lazy" className="h-full w-full object-contain p-1.5" onError={() => setLogoError(true)} />
            ) : (
              <span className="px-1 text-center text-[11px] font-black leading-tight text-[#012858]">{abbrev(college.shortName)}</span>
            )}
          </div>

          <h3 className="mt-2 line-clamp-2 min-h-[2.75rem] text-base font-bold leading-snug text-[#012858]">{college.name}</h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-gray-600">
            <MapPin className="h-3.5 w-3.5 shrink-0 text-[#C90D11]" aria-hidden="true" />
            <span className="truncate">{college.location}</span>
          </p>

          {/* Facts */}
          <div className="mt-4 flex items-start gap-2 border-y border-gray-100 py-3">
            <Fact icon={IndianRupee} value={fees} label="Fee range" />
            <Fact icon={BookOpen} value={String(college.courses.length)} label="Courses" />
            {hasPlacement
              ? <Fact icon={TrendingUp} value={formatCurrency(college.avgPlacement)} label="Avg. placement" />
              : <Fact icon={ClipboardCheck} value={String(college.entranceExams.length)} label={college.entranceExams.length === 1 ? "Entrance exam" : "Entrance exams"} />}
          </div>

          {/* Tags */}
          <div className="mt-3 flex min-h-[3.25rem] flex-wrap content-start gap-1.5">
            <span className="rounded-full bg-[#012858]/10 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{college.stream}</span>
            {college.entranceExams.slice(0, 2).map((e) => (
              <span key={e} className="rounded-full bg-[#012858]/10 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{e}</span>
            ))}
            {extra > 0 && <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">+{extra} more</span>}
          </div>

          {/* Actions */}
          <div className="mt-auto flex items-center gap-2 pt-3">
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} className="flex-1 justify-center rounded-xl py-2.5 text-sm font-semibold" />
            <span className="flex-1 whitespace-nowrap rounded-xl bg-[#E0170F] px-3 py-2.5 text-center text-sm font-bold text-white transition-colors group-hover:bg-[#C90D11]">View details</span>
          </div>
        </div>
      </article>
    </Link>
  )
}
