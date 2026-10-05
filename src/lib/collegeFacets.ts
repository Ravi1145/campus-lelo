import { College } from "@/types"
import { searchColleges } from "@/lib/collegeSearch"

// Facet model for the /colleges filter sidebar: how each filter group reads its
// values off a college, and how a set of selections is applied.

export type FacetKey = "streams" | "courses" | "states" | "cities" | "areas" | "exams" | "types" | "fees" | "naac"

export interface FiltersState {
  streams: string[]
  courses: string[]
  states: string[]
  cities: string[]
  areas: string[]
  exams: string[]
  types: string[]
  fees: string[]
  naac: string[]
  hostel: boolean
  nirfRanked: boolean
}

export const DEFAULT_FILTERS: FiltersState = {
  streams: [], courses: [], states: [], cities: [], areas: [], exams: [], types: [], fees: [], naac: [],
  hostel: false, nirfRanked: false,
}

export const FACETS: { key: FacetKey; title: string; defaultOpen: boolean; fixedOrder?: boolean }[] = [
  { key: "streams", title: "Streams", defaultOpen: true },
  { key: "courses", title: "Course Groups", defaultOpen: true },
  { key: "states", title: "States", defaultOpen: false },
  { key: "cities", title: "Cities", defaultOpen: true },
  { key: "areas", title: "Localities", defaultOpen: false },
  { key: "exams", title: "Exams", defaultOpen: true },
  { key: "types", title: "Institute Type", defaultOpen: true },
  { key: "fees", title: "Annual Fees", defaultOpen: true, fixedOrder: true },
  { key: "naac", title: "NAAC Grade", defaultOpen: false, fixedOrder: true },
]

export function countActiveFilters(f: FiltersState): number {
  return FACETS.reduce((n, { key }) => n + f[key].length, 0) + (f.hostel ? 1 : 0) + (f.nirfRanked ? 1 : 0)
}

// ── Fee buckets (annual fees, by the lowest listed fee) ─────────────────────
const L = 100000
export const FEE_BUCKETS = [
  { label: "Less than 1 Lakh", max: 1 * L },
  { label: "1 - 2 Lakh", max: 2 * L },
  { label: "2 - 3 Lakh", max: 3 * L },
  { label: "3 - 5 Lakh", max: 5 * L },
  { label: "5 - 7 Lakh", max: 7 * L },
  { label: "7 - 10 Lakh", max: 10 * L },
  { label: "10 - 15 Lakh", max: 15 * L },
  { label: "15 - 20 Lakh", max: 20 * L },
  { label: "20 - 25 Lakh", max: 25 * L },
  { label: "Above 25 Lakh", max: Infinity },
]

function feeBucket(c: College): string | null {
  const { min, max } = c.feesRange
  if (!min && !max) return null
  return FEE_BUCKETS.find((b) => min < b.max)?.label ?? null
}

// ── Normalisers ─────────────────────────────────────────────────────────────
const slim = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "")

const COURSE_CANON: Record<string, string> = {
  btech: "B.Tech", be: "B.E.", mtech: "M.Tech", me: "M.E.", bsc: "B.Sc.", msc: "M.Sc.", bcom: "B.Com.", mcom: "M.Com.",
  ba: "B.A.", ma: "M.A.", phd: "Ph.D.", llb: "LL.B.", llm: "LL.M.", bdes: "B.Des.", mba: "MBA", bba: "BBA", bca: "BCA",
  mca: "MCA", pgdm: "PGDM", mms: "MMS", mbbs: "MBBS", md: "MD", ms: "MS", bds: "BDS", mds: "MDS", dnb: "DNB", diploma: "Diploma",
}
/** True if a free-text value is a known course group (e.g. "BBA", "b.tech") */
export function isCourseGroup(v: string): boolean {
  return slim(v) in COURSE_CANON
}
export function courseGroup(raw: string): string {
  return COURSE_CANON[slim(raw)] ?? raw.trim()
}

/** "CAT 2026" / "MHT-CET (PCM)" → "CAT" / "MHT-CET" */
export function examLabel(raw: string): string {
  return raw.replace(/\(.*?\)/g, "").replace(/\b20\d\d\b/g, "").replace(/\s+(UG)$/i, "").replace(/\s+/g, " ").trim()
}

/** Key used to compare labels regardless of case, spacing and hyphens */
export const keyOf = (facet: FacetKey, v: string) => (facet === "exams" || facet === "courses" ? slim(v) : v.toLowerCase().trim())

const STREAM_EXTRAS = ["Design", "Commerce"] as const
export const STREAM_FACET_VALUES = ["Engineering", "MBA", "Medical", "Arts & Science", "Management", "Law", "Architecture", ...STREAM_EXTRAS]
const streamTagCache = new WeakMap<College, string[]>()
function streamTags(c: College): string[] {
  const hit = streamTagCache.get(c)
  if (hit) return hit
  const tags: string[] = [c.stream]
  for (const x of STREAM_EXTRAS) if (searchColleges([c], x).length > 0) tags.push(x)
  streamTagCache.set(c, tags)
  return tags
}

function parseLocation(c: College): { area?: string; city?: string } {
  const parts = (c.location || "").split(",").map((s) => s.trim()).filter(Boolean)
  if (parts.length === 0) return {}
  if (parts.length === 1) return { city: parts[0] }
  return { area: parts[0], city: parts[parts.length - 1] }
}

function parseState(c: College): string | undefined {
  const last = (c.address || "").split(",").pop()?.replace(/\d+/g, "").trim()
  return last || undefined
}

export function facetValues(c: College, key: FacetKey): string[] {
  switch (key) {
    case "streams": return streamTags(c)
    case "courses": return Array.from(new Set(c.courses.map(courseGroup)))
    case "states": { const s = parseState(c); return s ? [s] : [] }
    case "cities": { const v = parseLocation(c).city; return v ? [v] : [] }
    case "areas": { const v = parseLocation(c).area; return v ? [v] : [] }
    case "exams": return Array.from(new Set(c.entranceExams.map(examLabel).filter(Boolean)))
    case "types": return [c.type]
    case "fees": { const b = feeBucket(c); return b ? [b] : [] }
    case "naac": return c.naac ? [c.naac] : []
  }
}

function matches(c: College, key: FacetKey, selected: string[]): boolean {
  if (selected.length === 0) return true
  const want = new Set(selected.map((s) => keyOf(key, s)))
  return facetValues(c, key).some((v) => want.has(keyOf(key, v)))
}

/** Apply every selected filter; `skip` leaves one facet out (used for faceted counts). */
export function applyFilters(list: College[], f: FiltersState, skip?: FacetKey): College[] {
  return list.filter((c) => {
    for (const { key } of FACETS) {
      if (key !== skip && !matches(c, key, f[key])) return false
    }
    if (f.hostel && !c.hostel) return false
    if (f.nirfRanked && c.nirfRank === null) return false
    return true
  })
}

export interface FacetOption { value: string; count: number }

/** Options for one facet with counts among colleges that pass all the OTHER filters. */
export function facetOptions(all: College[], scoped: College[], f: FiltersState, key: FacetKey): FacetOption[] {
  const counts = new Map<string, number>()
  const labelByKey = new Map<string, string>()
  const register = (v: string) => { const k = keyOf(key, v); if (!labelByKey.has(k)) labelByKey.set(k, v); return k }
  for (const c of all) for (const v of facetValues(c, key)) register(v)
  for (const c of applyFilters(scoped, f, key)) for (const v of facetValues(c, key)) {
    const k = register(v)
    counts.set(k, (counts.get(k) ?? 0) + 1)
  }
  // Selected values that no college matches (e.g. ?exam= from a link) still show up, ticked
  for (const s of f[key]) register(s)

  const opts = [...labelByKey.entries()].map(([k, value]) => ({ value, count: counts.get(k) ?? 0 }))
  if (key === "fees") return FEE_BUCKETS.map((b) => opts.find((o) => o.value === b.label)).filter(Boolean) as FacetOption[]
  if (key === "naac") {
    const order = ["A++", "A+", "A", "B++", "B+"]
    return opts.sort((a, b) => order.indexOf(a.value) - order.indexOf(b.value))
  }
  return opts.sort((a, b) => b.count - a.count || a.value.localeCompare(b.value))
}

export function isSelected(f: FiltersState, key: FacetKey, value: string): boolean {
  return f[key].some((s) => keyOf(key, s) === keyOf(key, value))
}
