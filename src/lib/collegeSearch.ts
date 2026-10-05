import type { College } from "@/types"

// Word-based college search. The old filter required the WHOLE query to appear
// in one field, so natural queries like "MBA colleges" or "engineering colleges
// in pune" returned 0 results.

// Words that describe the search itself rather than narrowing it
const STOPWORDS = new Set([
  "college", "colleges", "university", "universities", "institute", "institutes",
  "in", "at", "near", "of", "for", "the", "a", "an", "and", "with", "top", "best",
  "list", "pune", "2025", "2026", "2027", "course", "courses",
  // intent words — every profile covers these, so they shouldn't narrow results
  "fees", "fee", "placement", "placements", "admission", "admissions", "cutoff", "cutoffs",
  "ranking", "rankings", "review", "reviews", "low", "cheap", "affordable",
])

// Query words that map to structured fields rather than text
const FLAG_TOKENS: Record<string, (c: College) => boolean> = {
  hostel: (c) => c.hostel, hostels: (c) => c.hostel,
  government: (c) => c.type === "Government", govt: (c) => c.type === "Government",
  private: (c) => c.type === "Private",
  deemed: (c) => c.type === "Deemed",
  autonomous: (c) => c.type === "Autonomous",
}

// Query word → stream it implies
const STREAM_SYNONYMS: Record<string, College["stream"][]> = {
  engineering: ["Engineering"], btech: ["Engineering"], "b.tech": ["Engineering"], be: ["Engineering"], tech: ["Engineering"],
  mba: ["MBA", "Management"], pgdm: ["MBA", "Management"], management: ["MBA", "Management"], bba: ["Management", "MBA"],
  medical: ["Medical"], mbbs: ["Medical"], medicine: ["Medical"], bds: ["Medical"],
  law: ["Law"], llb: ["Law"],
  architecture: ["Architecture"], barch: ["Architecture"], "b.arch": ["Architecture"],
  arts: ["Arts & Science"], science: ["Arts & Science"], commerce: ["Arts & Science"], bsc: ["Arts & Science"], bcom: ["Arts & Science"], ba: ["Arts & Science"],
}

export function tokenize(query: string): string[] {
  return query.toLowerCase().replace(/[^a-z0-9.+&\s-]/g, " ").split(/\s+/).filter((w) => w && !STOPWORDS.has(w))
}

function haystack(c: College): string {
  return [c.name, c.shortName, c.location, c.stream, c.type, c.affiliation, ...c.courses, ...c.specializations, ...c.entranceExams, ...c.tags]
    .filter(Boolean).join(" | ").toLowerCase()
}

function tokenMatches(c: College, token: string, hay: string): boolean {
  const flag = FLAG_TOKENS[token]
  if (flag) return flag(c)
  const streams = STREAM_SYNONYMS[token]
  if (streams && streams.includes(c.stream)) return true
  return hay.includes(token)
}

/** Filter + rank colleges for a free-text query. Empty / filler-only queries return all colleges. */
export function searchColleges(colleges: College[], query: string): College[] {
  const tokens = tokenize(query)
  if (!tokens.length) return colleges
  const scored: { c: College; score: number }[] = []
  for (const c of colleges) {
    const hay = haystack(c)
    if (!tokens.every((t) => tokenMatches(c, t, hay))) continue
    const name = `${c.name} ${c.shortName}`.toLowerCase()
    // Ranking: name hit (3) > primary-stream hit (2) > any other field (1).
    // So "MBA colleges" lists dedicated MBA institutes before universities that also offer an MBA.
    const score = tokens.reduce((s, t) => s + (name.includes(t) ? 3 : STREAM_SYNONYMS[t]?.includes(c.stream) ? 2 : 1), 0)
    scored.push({ c, score })
  }
  return scored.sort((a, b) => b.score - a.score).map((x) => x.c)
}
