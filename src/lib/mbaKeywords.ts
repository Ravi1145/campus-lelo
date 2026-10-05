import { keywordClusters, type KeywordCluster } from "@/data/mba/keywordClusters"

// Helpers over the harvested keyword clusters (src/data/mba/keywordClusters.ts).
// Used for: page meta keywords, "Related searches" interlinking and the /mba hub.

// Queries naming a specific institute or university. Our guides are generic, so these
// are kept in the data (for planning college pages) but not shown as chips / meta keywords.
const BRAND = /\b(bimtech|xlri|iift|iim\w*|ipe|flame|great lakes|nmims|imt|mdi|jbims|spjimr|welingkar|symbiosis|sibm|scmhrd|fms|jmi|bhu|allahabad|pgcet|isb|amity|jaipuria|mit[- ]wpu|pumba|xime|tapmi|mica|lbsim|jims|ashoka|christ|vit|sp jain|bits|du|jnu|ignou|mumbai|bangalore|bengaluru|hyderabad|kolkata|chennai|ahmedabad|jaipur|lucknow|indore|nagpur|chandigarh|coimbatore|bhopal|kochi|goa|patna|surat|nashik|thane|telangana|kerala|karnataka|gujarat|rajasthan|new zealand|usa|canada|abroad|australia|uk|germany|dubai)\b/i
export const isBrandQuery = (kw: string) => BRAND.test(kw)
export const generic = (kws: string[]) => kws.filter((k) => !isBrandQuery(k))
// Exam clusters point at exam pages, so a chip naming a city would land on the wrong page
const CITY = /\b(pune|noida|greater noida|delhi|ncr|gurgaon|gurugram)\b/i
export const chipKeywords = (c: { id: string; keywords: string[] }) => generic(c.keywords).filter((k) => !(c.id.startsWith("exam:") && CITY.test(k)))

const norm = (p: string) => p.replace(/\/+$/, "") || "/"

const topicOf = (c: KeywordCluster) => (c.id.startsWith("exam:") ? "exam" : c.id.split(":")[0])
const geoOf = (c: KeywordCluster) => c.id.split(":").pop() ?? "india"

/** Clusters this page serves (as pillar or supporting page). */
export function clustersForPath(path: string): KeywordCluster[] {
  const p = norm(path)
  return keywordClusters.filter((c) => c.pillar === p || c.supporting.includes(p))
}

/** Real queries for the page's own clusters — for <meta keywords>. */
export function keywordsForPath(path: string, limit = 10): string[] {
  const own = clustersForPath(path).filter((c) => c.pillar === norm(path))
  const src = own.length ? own : clustersForPath(path)
  return Array.from(new Set(src.flatMap((c) => chipKeywords(c).slice(0, 6)))).slice(0, limit)
}

export interface RelatedSearch { label: string; href: string }

/**
 * Searches related to a page: other clusters that share its topic (different
 * city), its city (different topic) or its exam, each linking to that
 * cluster's page. Anchor text is a real query.
 */
export function relatedSearches(path: string, limit = 12): RelatedSearch[] {
  const p = norm(path)
  const own = clustersForPath(p)
  const ownIds = new Set(own.map((c) => c.id))

  const scored = keywordClusters
    .filter((c) => !ownIds.has(c.id) && c.pillar !== p)
    .map((c) => {
      let score = 0
      for (const o of own) {
        if (topicOf(o) === topicOf(c)) score += 2
        if (geoOf(o) === geoOf(c)) score += 2
        if (o.id.startsWith("exam:") && c.id.startsWith("exam:") && o.id.split(":")[1] === c.id.split(":")[1]) score += 3
      }
      if (c.pillar.startsWith("/blog/")) score += 1 // national guides are always useful
      return { c, score }
    })
    .sort((a, b) => b.score - a.score || b.c.size - a.c.size)

  const seenLabel = new Set<string>()
  const pillarCount = new Map<string, number>()
  const pick = (list: typeof scored, max: number): RelatedSearch[] => {
    const out: RelatedSearch[] = []
    for (const { c } of list) {
      if ((pillarCount.get(c.pillar) ?? 0) >= 2) continue // spread links across pages
      for (const kw of chipKeywords(c).slice(0, 2)) {
        if (out.length >= max || seenLabel.has(kw) || (pillarCount.get(c.pillar) ?? 0) >= 2) continue
        seenLabel.add(kw)
        pillarCount.set(c.pillar, (pillarCount.get(c.pillar) ?? 0) + 1)
        out.push({ label: kw, href: c.pillar })
      }
      if (out.length >= max) break
    }
    return out
  }
  // Keep a few slots for the national guides so city and exam pages always link up to them
  const GUIDE_SLOTS = 3
  const guides = pick(scored.filter(({ c }) => c.pillar.startsWith("/blog/")), GUIDE_SLOTS)
  const rest = pick(scored.filter(({ c }) => !c.pillar.startsWith("/blog/")), limit - guides.length)
  // Interleave so guide links are not all at the end
  const out: RelatedSearch[] = []
  for (let i = 0; i < Math.max(rest.length, guides.length); i++) {
    if (rest[i * 3]) out.push(rest[i * 3])
    if (rest[i * 3 + 1]) out.push(rest[i * 3 + 1])
    if (rest[i * 3 + 2]) out.push(rest[i * 3 + 2])
    if (guides[i]) out.push(guides[i])
  }
  return out.slice(0, limit)
}

/** Clusters grouped for the /mba hub. */
export function hubGroups() {
  const byGeo = (g: string) => keywordClusters.filter((c) => !c.id.startsWith("exam:") && !c.id.startsWith("specialization:") && geoOf(c) === g)
  return {
    cities: [
      { key: "pune", title: "MBA & PGDM in Pune", clusters: byGeo("pune") },
      { key: "noida", title: "MBA & PGDM in Noida and Greater Noida", clusters: byGeo("noida") },
      { key: "delhi-ncr", title: "MBA & PGDM in Delhi and NCR", clusters: byGeo("delhi-ncr") },
    ],
    exams: keywordClusters.filter((c) => c.id.startsWith("exam:")),
    topics: keywordClusters.filter((c) => !c.id.startsWith("exam:") && !c.id.startsWith("specialization:") && geoOf(c) === "india"),
    specialisations: keywordClusters.filter((c) => c.id.startsWith("specialization:")),
  }
}
