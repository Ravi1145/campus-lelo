"use client"
import { searchColleges } from "@/lib/collegeSearch"
import { useState, useEffect, useMemo, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { colleges as localColleges } from "@/data/colleges"
import { College } from "@/types"
import CollegeCard from "./CollegeCard"
import CollegeRowCard from "./CollegeRowCard"
import CollegeFilters from "./CollegeFilters"
import {
  DEFAULT_FILTERS, FACETS, STREAM_FACET_VALUES, applyFilters, countActiveFilters, courseGroup, facetOptions, isCourseGroup,
  type FacetKey, type FacetOption, type FiltersState,
} from "@/lib/collegeFacets"
import { SlidersHorizontal, LayoutGrid, Rows3, ArrowUpDown, X, Search, ChevronDown, Headphones } from "lucide-react"
import { cn } from "@/lib/utils"
import InlineLeadForm from "@/components/leads/InlineLeadForm"

type SortOption = "relevance" | "rating" | "fees_low" | "fees_high" | "placement" | "nirf"
const PAGE = 20

export default function CollegeGrid() {
  const router = useRouter()
  const searchParams = useSearchParams()
  // Start with the built-in list so the page renders instantly and is in the
  // server HTML (crawlable); database colleges are merged in after load.
  const [allColleges, setAllColleges] = useState<College[]>(localColleges)
  // With a search query, keep the search ranking ("Best match") unless the user picks another sort
  const [sortBy, setSortBy] = useState<SortOption>(() => (searchParams.get("search") ? "relevance" : "rating"))
  const [viewMode, setViewMode] = useState<"list" | "grid">("list")
  const [filters, setFilters] = useState<FiltersState>(DEFAULT_FILTERS)
  const [mobileFilters, setMobileFilters] = useState(false)
  const [visible, setVisible] = useState(PAGE)

  const searchQuery = searchParams.get("search") || ""

  // New search from the header while already on /colleges → rank by relevance again
  useEffect(() => {
    if (searchQuery) setSortBy("relevance")
  }, [searchQuery])

  // URL filters used across the site: hero finder (?stream=&exam=), header menus
  // (?stream=), redirects (?type=Government) and ?hostel=1.
  const streamParam = searchParams.get("stream") || ""
  const examParam = searchParams.get("exam") || ""
  const typeParam = searchParams.get("type") || ""
  const hostelParam = searchParams.get("hostel") || ""
  const normalizedStream = streamParam === "Arts" ? "Arts & Science" : streamParam
  const streamIsFacet = STREAM_FACET_VALUES.includes(normalizedStream)
  const streamIsCourse = !streamIsFacet && !!normalizedStream && isCourseGroup(normalizedStream)
  // Anything else ("Pharmacy"…) is matched as a keyword
  const streamKeyword = normalizedStream && !streamIsFacet && !streamIsCourse ? normalizedStream : ""
  useEffect(() => {
    setFilters((f) => ({
      ...f,
      streams: streamIsFacet ? [normalizedStream] : [],
      courses: streamIsCourse ? [courseGroup(normalizedStream)] : [],
      exams: examParam ? [examParam] : [],
      types: typeParam ? [typeParam] : [],
      hostel: hostelParam === "1" || hostelParam === "true",
    }))
  }, [normalizedStream, streamIsFacet, streamIsCourse, examParam, typeParam, hostelParam])

  // ── Fetch from the colleges API, supplement with local static data ──
  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const backendRes = await fetch("/api/colleges")
          .then((r) => (r.ok ? r.json() : { colleges: [] }))
          .catch(() => ({ colleges: [] }))
        const backendColleges: College[] = backendRes.colleges ?? []
        const names = new Set(backendColleges.map((c) => c.name.toLowerCase().trim()))
        const slugs = new Set(backendColleges.map((c) => c.slug))
        const localOnly = localColleges.filter((c) => !names.has(c.name.toLowerCase().trim()) && !slugs.has(c.slug))
        if (!cancelled) setAllColleges([...backendColleges, ...localOnly])
      } catch {
        if (!cancelled) setAllColleges(localColleges)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  // Colleges after the free-text search / keyword (before sidebar facets)
  const scoped = useMemo(() => {
    let r = [...allColleges]
    if (streamKeyword) r = searchColleges(r, streamKeyword)
    if (searchQuery) r = searchColleges(r, searchQuery)
    return r
  }, [allColleges, streamKeyword, searchQuery])

  // Sidebar options with live counts (each group counts against the other groups' selections)
  const options = useMemo(() => {
    const o = {} as Record<FacetKey, FacetOption[]>
    for (const { key } of FACETS) o[key] = facetOptions(allColleges, scoped, filters, key)
    return o
  }, [allColleges, scoped, filters])

  const filteredColleges = useMemo(() => {
    const result = [...applyFilters(scoped, filters)]
    switch (sortBy) {
      case "rating": result.sort((a, b) => b.rating - a.rating); break
      case "fees_low": result.sort((a, b) => a.feesRange.min - b.feesRange.min); break
      case "fees_high": result.sort((a, b) => b.feesRange.max - a.feesRange.max); break
      case "placement": result.sort((a, b) => b.avgPlacement - a.avgPlacement); break
      case "nirf": result.sort((a, b) => (a.nirfRank ?? 9999) - (b.nirfRank ?? 9999)); break
    }
    return result
  }, [scoped, filters, sortBy])

  // Re-run the card entrance animation and reset paging whenever the result set changes
  const signature = `${sortBy}|${searchQuery}|${streamKeyword}|${viewMode}|${JSON.stringify(filters)}`
  useEffect(() => { setVisible(PAGE) }, [signature])

  const dropParam = useCallback((name: string) => {
    const p = new URLSearchParams(searchParams.toString())
    p.delete(name)
    const qs = p.toString()
    router.replace(qs ? `/colleges?${qs}` : "/colleges", { scroll: false })
  }, [router, searchParams])

  const clearAll = () => {
    setFilters(DEFAULT_FILTERS)
    router.replace("/colleges", { scroll: false })
  }

  // Removable chips for everything that narrows the list
  const chips: { key: string; label: string; onRemove: () => void }[] = []
  if (searchQuery) chips.push({ key: "q", label: `“${searchQuery}”`, onRemove: () => dropParam("search") })
  if (streamKeyword) chips.push({ key: "kw", label: streamKeyword, onRemove: () => dropParam("stream") })
  for (const { key } of FACETS) {
    for (const v of filters[key]) {
      chips.push({
        key: `${key}-${v}`,
        label: key === "naac" ? `NAAC ${v}` : v,
        onRemove: () => setFilters((f) => ({ ...f, [key]: f[key].filter((x) => x !== v) })),
      })
    }
  }
  if (filters.hostel) chips.push({ key: "hostel", label: "Hostel", onRemove: () => setFilters((f) => ({ ...f, hostel: false })) })
  if (filters.nirfRanked) chips.push({ key: "nirf", label: "NIRF ranked", onRemove: () => setFilters((f) => ({ ...f, nirfRanked: false })) })

  const shown = filteredColleges.slice(0, visible)
  const filterCount = countActiveFilters(filters)

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="lg:w-72 lg:shrink-0">
          <CollegeFilters filters={filters} onChange={setFilters} options={options} mobileOpen={mobileFilters} onMobileClose={() => setMobileFilters(false)} resultCount={filteredColleges.length} />
        </div>

        <div className="min-w-0 flex-1">
          {/* Toolbar */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-sm ring-1 ring-gray-200">
            <button
              type="button"
              onClick={() => setMobileFilters(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-[#012858] px-4 py-2 text-sm font-bold text-white shadow-md lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" aria-hidden="true" /> Filters
              {filterCount > 0 && <span className="rounded-full bg-[#E0170F] px-1.5 text-xs">{filterCount}</span>}
            </button>

            <p className="text-sm text-gray-600" aria-live="polite">
              <span className="text-lg font-extrabold text-[#012858]">{filteredColleges.length}</span>{" "}
              {filteredColleges.length === 1 ? "college" : "colleges"} found
              {searchQuery && <> for <span className="font-semibold text-[#C90D11]">&ldquo;{searchQuery}&rdquo;</span></>}
            </p>

            <div className="ml-auto flex items-center gap-2">
              <label htmlFor="college-sort" className="sr-only">Sort colleges</label>
              <div className="relative">
                <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-500" aria-hidden="true" />
                <select
                  id="college-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="cursor-pointer appearance-none rounded-xl bg-gray-50 py-2 pl-9 pr-8 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 hover:ring-[#012858] focus:outline-none focus:ring-2 focus:ring-[#024692]"
                >
                  {searchQuery && <option value="relevance">Best match</option>}
                  <option value="rating">Top rated</option>
                  <option value="nirf">NIRF rank</option>
                  <option value="placement">Best placement</option>
                  <option value="fees_low">Fees: low to high</option>
                  <option value="fees_high">Fees: high to low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" aria-hidden="true" />
              </div>
              <div className="flex rounded-xl bg-gray-100 p-1" role="group" aria-label="Layout">
                {([["list", Rows3, "List view"], ["grid", LayoutGrid, "Grid view"]] as const).map(([m, Icon, label]) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={viewMode === m}
                    aria-label={label}
                    onClick={() => setViewMode(m)}
                    className={cn("rounded-lg p-1.5 transition-all", viewMode === m ? "bg-white text-[#012858] shadow" : "text-gray-500 hover:text-gray-800")}
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Active filter chips */}
          {chips.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Active:</span>
              {chips.map((c) => (
                <button
                  key={c.key}
                  type="button"
                  onClick={c.onRemove}
                  aria-label={`Remove filter ${c.label}`}
                  className="fade-in group inline-flex items-center gap-1.5 rounded-full bg-blue-50 py-1 pl-3 pr-2 text-xs font-bold text-[#012858] ring-1 ring-blue-100 transition-all hover:bg-[#012858] hover:text-white"
                >
                  {c.label}
                  <X className="h-3.5 w-3.5 rounded-full bg-white/70 p-0.5 text-[#012858] group-hover:bg-white/20 group-hover:text-white" aria-hidden="true" />
                </button>
              ))}
              <button type="button" onClick={clearAll} className="ml-1 text-xs font-bold text-[#C90D11] underline-offset-2 hover:underline">Clear all</button>
            </div>
          )}

          {/* Results */}
          {filteredColleges.length === 0 ? (
            <div className="hero-in rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-200 sm:p-16">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-50 to-orange-50 ring-1 ring-gray-200">
                <Search className="h-9 w-9 text-[#012858]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-extrabold text-[#012858]">No colleges match these filters</h3>
              <p className="mx-auto mt-2 max-w-md text-sm text-gray-600">Try removing a filter or searching a broader term. Or tell us what you need and a counsellor will shortlist for you, free.</p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <button type="button" onClick={clearAll} className="rounded-xl bg-[#E0170F] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-red-900/20 hover:bg-[#C90D11]">Clear all filters</button>
                <a href="/counselling" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]">
                  <Headphones className="h-4 w-4" aria-hidden="true" /> Free counselling
                </a>
              </div>
            </div>
          ) : (
            <>
              <div key={signature} className={cn("grid gap-4", viewMode === "grid" ? "grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
                {shown.map((college, idx) => (
                  <div key={college.slug} className="contents">
                    <div className="hero-in h-full" style={{ "--i": Math.min(idx % PAGE, 8) } as React.CSSProperties}>
                      {viewMode === "grid" ? <CollegeCard college={college} /> : <CollegeRowCard college={college} />}
                    </div>
                    {(idx === 5 || idx === 17) && filteredColleges.length > idx + 1 && (
                      <div className="col-span-full"><InlineLeadForm context="Browse colleges in Pune" /></div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show more */}
              <div className="mt-8 text-center">
                <p className="text-xs font-medium text-gray-600">Showing {shown.length} of {filteredColleges.length}</p>
                <div className="mx-auto mt-2 h-1 w-48 overflow-hidden rounded-full bg-gray-200" aria-hidden="true">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#E0170F] to-[#024692] transition-all duration-500" style={{ width: `${(shown.length / filteredColleges.length) * 100}%` }} />
                </div>
                {shown.length < filteredColleges.length && (
                  <button
                    type="button"
                    onClick={() => setVisible((v) => v + PAGE)}
                    className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-[#012858] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-950/20 transition-all hover:-translate-y-0.5 hover:bg-[#024692]"
                  >
                    Show {Math.min(PAGE, filteredColleges.length - shown.length)} more colleges
                    <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
