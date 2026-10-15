"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { colleges as staticColleges } from "@/data/colleges"
import type { College } from "@/types"
import SimpleCollegeCard from "./SimpleCollegeCard"
import FilterTabs from "@/components/ui/FilterTabs"
import CardRail from "./CardRail"

const TABS = ["All", "Engineering", "MBA", "Medical", "Law", "Architecture", "Government"]
const CACHE_KEY = "cp_featured_colleges"
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

function getCached(): College[] | null {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY)
    if (!raw) return null
    const { data, ts } = JSON.parse(raw)
    if (Date.now() - ts > CACHE_TTL) return null
    return data
  } catch {
    return null
  }
}

function setCache(colleges: College[]) {
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: colleges, ts: Date.now() }))
  } catch {}
}

export default function FeaturedColleges() {
  const [activeTab, setActiveTab] = useState("All")
  const [allColleges, setAllColleges] = useState<College[]>([])
  const [featuredSet, setFeaturedSet] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cached = getCached()
    if (cached) {
      setAllColleges(cached)
      setLoading(false)
      return
    }

    fetch("/api/colleges/featured")
      .then((r) => r.json())
      .then((data) => {
        if (data.colleges?.length > 0) {
          setAllColleges(data.colleges)
          setFeaturedSet(new Set(data.featuredSlugs ?? []))
          setCache(data.colleges)
        } else {
          // client-side static fallback
          setAllColleges(staticColleges.slice(0, 12))
        }
      })
      .catch(() => setAllColleges(staticColleges.slice(0, 12)))
      .finally(() => setLoading(false))
  }, [])

  const filtered = allColleges
    .filter((c) => {
      if (activeTab === "All") return true
      if (activeTab === "Government") return c.type === "Government"
      if (activeTab === "MBA") return c.stream === "MBA" || c.stream === "Management"
      return c.stream === activeTab
    })
    .slice(0, 12)

  return (
    <section className="py-16 section-pearl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <p className="text-xs font-bold tracking-widest uppercase mb-2 flex items-center gap-2" style={{ color: "#C90D11" }}>
              Popular colleges
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: "#0F172A" }}>
              Featured Colleges in{" "}
              <span style={{ color: "#C90D11" }}>Pune</span>
            </h2>
            <p className="mt-1.5 text-sm" style={{ color: "#475569" }}>
              A mix of colleges across streams. Open a profile for courses, fees and accepted exams.
            </p>
          </div>
          <Link
            href="/colleges"
            className="hidden sm:flex items-center gap-1.5 font-semibold text-sm transition-opacity hover:opacity-80"
            style={{ color: "#C90D11" }}
          >
            View All Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Filter tabs */}
        <FilterTabs tabs={TABS} active={activeTab} onChange={setActiveTab} className="mb-6" />

        {/* Skeleton — only shown on very first load before any data */}
        {loading && (
          <div className="flex gap-3 sm:gap-5 pb-3 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0 overflow-x-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-[82vw] sm:w-72 h-64 bg-gray-100 rounded-2xl animate-pulse" />
            ))}
          </div>
        )}

        {/* College cards — featured always first */}
        {!loading && (
          <CardRail key={activeTab} label="featured colleges">
            {filtered.map((college) => (
              <div key={college.slug} className="relative h-full">
                <SimpleCollegeCard college={college} featured={featuredSet.has(college.slug)} />
              </div>
            ))}
          </CardRail>
        )}

        {/* Mobile view all */}
        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/colleges"
            className="inline-flex items-center gap-2 text-white font-semibold px-6 py-3 rounded-xl transition-opacity hover:opacity-90"
            style={{ background: "#E0170F" }}
          >
            View All Colleges <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </section>
  )
}
