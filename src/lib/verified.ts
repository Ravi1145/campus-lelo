import type { College } from "@/types"

// Verified-data policy: placement packages, NIRF ranks and similar figures are shown only when
// they carry a source and a date. Until then they are removed from what the site renders,
// including meta descriptions, FAQ answers and structured data.
//
// Flip SHOW_UNVERIFIED_FIGURES only if every figure in the data has been sourced.
export const SHOW_UNVERIFIED_FIGURES = false

/** Money-per-annum packages ("₹12 LPA", "₹8–12 LPA", "12 LPA") and NIRF rank claims ("NIRF #49", "NIRF rank 13"). */
const FIGURE =
  /(?:₹|Rs\.?\s?|INR\s?)?\s?\d[\d.,]*\s?(?:[–—-]\s?(?:₹|Rs\.?\s?)?\d[\d.,]*\s?)?(?:LPA|L\.?P\.?A\.?|lakhs? per (?:annum|year)|lakh\/yr)\b|\bNIRF\s*(?:\d{4}\s*)?(?:rank(?:ing|ed)?\s*)?(?:#|no\.?\s*|:)?\s*\d+|\b(?:ranked|rank)\s*#?\d+\s*(?:in|by)\s*NIRF/i

/** Questions about placements and rankings are dropped whole: their answers are the claim. */
const FIGURE_QUESTION = /placement|package|salary|recruit|\bnirf\b|ranking|\brank\b|\blpa\b/i

export function hasFigure(text: string): boolean {
  return FIGURE.test(text)
}

/** Remove the sentences that carry a package or NIRF figure; keep the rest of the paragraph. */
export function scrubText(text: string): string {
  if (!text || !FIGURE.test(text)) return text
  const sentences = text.split(/(?<=[.!?])\s+(?=[A-Z₹(0-9"'])/)
  return sentences.filter((s) => !FIGURE.test(s)).join(" ").trim()
}

/** Scrub markdown/HTML article bodies: drop table rows, list items and sentences that carry a figure. */
export function scrubArticle(body: string): string {
  if (!body || !FIGURE.test(body)) return body
  let out = body
    // markdown table rows
    .split("\n")
    .filter((line) => !(line.trim().startsWith("|") && FIGURE.test(line)))
    .join("\n")
    // html table rows and list items
    .replace(/<tr>(?:(?!<\/tr>)[\s\S])*?<\/tr>/g, (m) => (FIGURE.test(m) ? "" : m))
    .replace(/<li>(?:(?!<\/li>)[\s\S])*?<\/li>/g, (m) => (FIGURE.test(m) ? "" : m))
    // markdown bullets
    .split("\n")
    .filter((line) => !(/^\s*[-*]\s/.test(line) && FIGURE.test(line)))
    .join("\n")
  // remaining paragraphs / lines: sentence level
  out = out
    .split("\n")
    .map((line) => (FIGURE.test(line) && !/^\s*[#<|]/.test(line) ? scrubText(line) : line))
    .join("\n")
  // inline html paragraphs
  out = out.replace(/<p>([\s\S]*?)<\/p>/g, (m, inner: string) => {
    if (!FIGURE.test(inner)) return m
    const kept = scrubText(inner)
    return kept ? `<p>${kept}</p>` : ""
  })
  return out
}

export function scrubDetails<T>(value: T): T {
  return SHOW_UNVERIFIED_FIGURES ? value : scrubDeep(value)
}

/** Like scrubDetails but keeps every key: only the text is cleaned (for data whose shape the UI depends on). */
export function scrubStrings<T>(value: T): T {
  if (SHOW_UNVERIFIED_FIGURES) return value
  if (typeof value === "string") return scrubText(value) as unknown as T
  if (Array.isArray(value)) {
    return value
      .map((v) => scrubStrings(v))
      .filter((v) => {
        if (typeof v === "string") return v !== ""
        // FAQ-style entries whose answer was entirely a figure claim are dropped
        if (v && typeof v === "object") {
          const o = v as Record<string, unknown>
          if (("answer" in o && o.answer === "") || ("a" in o && o.a === "")) return false
        }
        return true
      }) as unknown as T
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = scrubStrings(v)
    return out as T
  }
  return value
}

function scrubDeep<T>(value: T): T {
  if (typeof value === "string") return scrubText(value) as unknown as T
  if (Array.isArray(value)) {
    return value
      .map((v) => scrubDeep(v))
      .filter((v) => !(typeof v === "string" && v === "")) as unknown as T
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (k === "placements" || k === "rankings" || k === "topRecruiters" || k === "recruiters") continue
      out[k] = scrubDeep(v)
    }
    return out as T
  }
  return value
}

/**
 * Remove unsourced placement, package and NIRF figures from a college record.
 * Called where college data enters the app (static data and database rows).
 */
export function scrubCollege<C extends College>(c: C): C {
  if (SHOW_UNVERIFIED_FIGURES) return c
  const description = scrubText(c.description) || `${c.name} is a ${c.type.toLowerCase()} ${c.stream.toLowerCase()} institution in ${c.location}.`
  const faqs = (c.faqs ?? [])
    .filter((f) => !FIGURE_QUESTION.test(f.q))
    .map((f) => ({ q: f.q, a: scrubText(f.a) }))
    .filter((f) => f.a)
  return {
    ...c,
    nirfRank: null,
    avgPlacement: 0,
    highestPlacement: 0,
    topRecruiters: [],
    description,
    highlights: (c.highlights ?? []).filter((h) => !FIGURE.test(h)),
    tags: (c.tags ?? []).filter((t) => !FIGURE.test(t)),
    faqs,
    // Seeded student reviews and counts are unverified; real, moderated reviews load from the database
    reviews: [],
    reviewCount: 0,
    details: c.details ? scrubDeep(c.details) : c.details,
  }
}
