"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Heart, Star, ArrowUpRight, Award, BedDouble } from "lucide-react"
import { College } from "@/types"
import CompareButton from "@/components/ui/CompareButton"
import { formatFeesRange, formatCurrency, getNaacColor, getTypeColor, cn } from "@/lib/utils"

const COLLEGE_BANNER = "/college-default-banner.jpg"

const SHORTLIST_KEY = "shortlisted_colleges"

function safeLS(key: string): string | null {
  try { return localStorage.getItem(key) } catch { return null }
}

interface CollegeCardProps {
  college: College
  variant?: "default" | "compact" | "featured"
  /** "row" = horizontal card used by the list view on the colleges page */
  layout?: "grid" | "row"
  priority?: boolean
}

function abbrev(shortName: string): string {
  const first = shortName.split(/[\s\-]/)[0]
  return first.slice(0, 5).toUpperCase()
}

function Metric({ label, value, tone }: { label: string; value: string; tone?: "red" | "blue" }) {
  return (
    <div className="min-w-0 px-3 first:pl-0 last:pr-0">
      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">{label}</p>
      <p className={cn("mt-0.5 text-[13px] font-extrabold leading-tight break-words", tone === "red" ? "text-[#C90D11]" : tone === "blue" ? "text-[#024692]" : "text-gray-900")}>{value}</p>
    </div>
  )
}

export default function CollegeCard({ college, variant = "default", layout = "grid" }: CollegeCardProps) {
  const [isShortlisted, setIsShortlisted] = useState(false)
  const [logoError, setLogoError] = useState(false)

  useEffect(() => {
    try {
      const stored = safeLS(SHORTLIST_KEY)
      if (stored) setIsShortlisted(JSON.parse(stored).includes(college.slug))
    } catch {}
  }, [college.slug])

  const toggleShortlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      const stored = safeLS(SHORTLIST_KEY)
      let list: string[] = stored ? JSON.parse(stored) : []
      list = isShortlisted ? list.filter(s => s !== college.slug) : [...list, college.slug]
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify(list))
      setIsShortlisted(!isShortlisted)
    } catch {}
  }

  /* ── Compact variant ── */
  if (variant === "compact") {
    return (
      <Link href={`/colleges/${college.slug}`} className="block">
        <div className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-orange-200 hover:shadow-md transition-all group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex-shrink-0 flex items-center justify-center overflow-hidden">
            {college.logo && !logoError ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={college.logo}
                alt={`${college.name} logo`}
                width={40}
                height={40}
                className="object-contain p-0.5 bg-white rounded-lg"
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-xs font-black text-white leading-tight text-center tracking-tight">{abbrev(college.shortName)}</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
              {college.name}
            </p>
            <p className="text-xs text-gray-500">{college.location}</p>
          </div>
          <span className={cn("text-xs px-1.5 py-0.5 rounded font-semibold flex-shrink-0", getNaacColor(college.naac))}>
            {college.naac}
          </span>
        </div>
      </Link>
    )
  }

  /* ── Derived values ── */
  const feesText = college.feesRange.min > 0 || college.feesRange.max > 0
    ? formatFeesRange(college.feesRange.min, college.feesRange.max)
    : "On request"
  const placementText = college.avgPlacement > 0 ? formatCurrency(college.avgPlacement) : "—"
  const hasReviews = college.reviewCount > 0
  const extraCourses = Math.max(0, college.courses.length - 3)
  const row = layout === "row"

  const logo = (size: string) => (
    <div className={cn("relative shrink-0 flex items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white", size)}>
      {college.logo && !logoError ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={college.logo} alt={`${college.name} logo`} className="h-full w-full object-contain p-1.5" onError={() => setLogoError(true)} />
      ) : (
        <span className="px-1 text-center text-xs font-black leading-tight tracking-tight text-[#012858]">{abbrev(college.shortName)}</span>
      )}
    </div>
  )

  const banner = (
    <div className={cn("relative overflow-hidden", row ? "h-28 md:h-auto md:w-56 md:shrink-0" : "h-28")}>
      <div
        aria-hidden="true"
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
        style={{ backgroundImage: `url(${COLLEGE_BANNER})`, backgroundSize: "cover", backgroundPosition: "center" }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-[#011B40]/85 via-[#012858]/65 to-[#024692]/55" />
      {/* soft light sweep on hover */}
      <div aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 transition-all duration-700 group-hover:left-[120%] group-hover:opacity-100" />

      <div className="absolute left-3 top-3 flex items-center gap-1.5">
        {college.nirfRank ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[#E0170F] px-2.5 py-1 text-[11px] font-bold text-white shadow-md">
            <Award className="h-3 w-3" aria-hidden="true" /> NIRF #{college.nirfRank}
          </span>
        ) : (
          <span className="rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
            Est. {college.established}
          </span>
        )}
        {college.hostel && (
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
            <BedDouble className="h-3 w-3" aria-hidden="true" /> Hostel
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={toggleShortlist}
        aria-pressed={isShortlisted}
        aria-label={isShortlisted ? `Remove ${college.shortName} from shortlist` : `Add ${college.shortName} to shortlist`}
        className={cn(
          "absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-all active:scale-90",
          isShortlisted ? "bg-[#E0170F] text-white shadow-lg" : "bg-white/15 text-white ring-1 ring-white/25 backdrop-blur hover:bg-white hover:text-[#E0170F]"
        )}
      >
        <Heart className={cn("h-4 w-4 transition-transform", isShortlisted && "scale-110 fill-current")} aria-hidden="true" />
      </button>

      {row && <div className="absolute inset-0 hidden items-center justify-center md:flex">{logo("h-20 w-20")}</div>}
    </div>
  )

  const tags = (
    <div className="flex flex-wrap gap-1.5">
      <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-[#012858]">{college.stream}</span>
      {college.entranceExams.slice(0, 2).map((exam) => (
        <span key={exam} className="rounded-full bg-blue-50 px-2.5 py-1 text-[11px] font-semibold text-[#024692]">{exam}</span>
      ))}
      {extraCourses > 0 && (
        <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">+{extraCourses} courses</span>
      )}
    </div>
  )

  return (
    <Link href={`/colleges/${college.slug}`} className="group block h-full rounded-2xl focus-visible:outline-offset-4">
      <article
        className={cn(
          "relative flex h-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200 transition-all duration-300",
          "hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/15 hover:ring-[#012858]/25",
          row ? "flex-col md:flex-row" : "flex-col"
        )}
      >
        {/* accent line that draws in on hover */}
        <span aria-hidden="true" className="absolute inset-x-0 top-0 z-30 h-0.5 origin-left scale-x-0 bg-gradient-to-r from-[#E0170F] via-[#FB4312] to-[#024692] transition-transform duration-500 group-hover:scale-x-100" />

        {banner}

        <div className={cn("relative flex flex-1 flex-col px-4 pb-4", row ? "pt-4 md:pt-4" : "")}>
          {!row && <div className="-mt-9">{logo("h-[4.5rem] w-[4.5rem]")}</div>}
          {row && <div className="-mt-9 md:hidden">{logo("h-[4.5rem] w-[4.5rem]")}</div>}

          <h3 className={cn("font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-[#C90D11] line-clamp-2", row ? "mt-3 text-base md:mt-0 md:text-lg" : "mt-3 text-[15px]")}>
            {college.name}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
            <span className="inline-flex items-center gap-1 text-xs text-gray-600">
              <MapPin className="h-3.5 w-3.5 text-[#E0170F]" aria-hidden="true" /> {college.location}
            </span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-bold", getNaacColor(college.naac))}>NAAC {college.naac}</span>
            <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", getTypeColor(college.type))}>{college.type}</span>
          </div>

          <div className="mt-4 grid grid-cols-[1.5fr_1fr_1fr] divide-x divide-gray-200 rounded-xl bg-gradient-to-b from-gray-50 to-white py-2.5 pl-3 pr-0 ring-1 ring-gray-100">
            <Metric label="Annual fees" value={feesText} tone="red" />
            <Metric label="Avg package" value={placementText} tone="blue" />
            {hasReviews ? (
              <div className="min-w-0 px-3">
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Rating</p>
                <p className="mt-0.5 flex items-center gap-1 text-[13px] font-extrabold leading-tight text-gray-900">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" aria-hidden="true" />
                  {college.rating.toFixed(1)}
                  <span className="text-[11px] font-medium text-gray-500">({college.reviewCount.toLocaleString()})</span>
                </p>
              </div>
            ) : (
              <Metric label="Courses" value={`${college.courses.length}`} />
            )}
          </div>

          <div className="mt-3">{tags}</div>

          <div className="mt-auto flex items-center justify-between gap-2 border-t border-gray-100 pt-3.5">
            <span className="inline-flex items-center gap-1 text-sm font-bold text-[#012858] transition-colors group-hover:text-[#C90D11]">
              View details
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </span>
            <CompareButton collegeSlug={college.slug} collegeName={college.shortName} />
          </div>
        </div>
      </article>
    </Link>
  )
}

