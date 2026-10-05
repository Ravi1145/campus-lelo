import type { LeadInput } from "./validations"

/**
 * Pure helpers for lead capture (kept separate from the route so they can be
 * unit-tested). The `leads` table has no attribution columns yet, so UTM,
 * programme, city and consent details are appended to `message`.
 */

export function isSpam(input: Pick<LeadInput, "website">): boolean {
  return Boolean(input.website && input.website.trim())
}

export function attributionLine(input: LeadInput): string {
  const parts: string[] = []
  if (input.exam_type) parts.push(`exam: ${input.exam_type}${input.exam_score ? ` ${input.exam_score}` : ""}`)
  if (input.program_type) parts.push(`program: ${input.program_type}`)
  if (input.city_preference) parts.push(`city: ${input.city_preference}`)
  const utm = [input.utm_source, input.utm_medium, input.utm_campaign, input.utm_content]
  if (utm.some((v) => v && v !== "none" && v !== "organic")) parts.push(`utm: ${utm.map((v) => v || "-").join("/")}`)
  if (input.consent !== undefined) parts.push(`consent: ${input.consent ? "yes" : "no"}`)
  return parts.length ? `[${parts.join(" | ")}]` : ""
}

export function buildLeadRecord(input: LeadInput, referer: string) {
  const attribution = attributionLine(input)
  const message = [input.message, attribution].filter(Boolean).join(" ").slice(0, 1000) || null
  return {
    // `name` is NOT NULL in the base schema — never send null
    name: input.name?.trim() || "Website visitor",
    phone: input.phone,
    email: input.email || null,
    stream: input.stream ?? null,
    college_interest: input.college_interest ?? input.city_preference ?? null,
    course_interest: input.course_interest ?? input.program_type ?? null,
    budget: input.budget ?? null,
    exam_type: input.exam_type ?? null,
    exam_score: input.exam_score ?? null,
    career_goal: input.career_goal ?? null,
    source: input.source ?? "website",
    message,
    page_url: referer || input.page_url || null,
    status: "new" as const,
  }
}
