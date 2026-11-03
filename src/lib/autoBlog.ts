import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { blogs as staticBlogs } from "@/data/blogs"
import { buildComparisonBody } from "@/data/blog-posts/delhi-lead-guides"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { INSTITUTE_SHORT } from "@/data/mba/instituteLabels"
import type { ProgramAdmission } from "@/data/mba/types"

// Auto-blog: writes one new comparison guide per run from the verified programme records.
//
// It never asks a language model to write about a college. Every sentence about an institute comes from
// src/data/mba/programAdmissions.ts (exams, intake, notes, source link), so a guide can never say more than
// the data does. The queue is every comparable pair of verified programmes; adding a verified record
// automatically adds its pairs. A guide that fails the quality gate is saved for review instead of published.
//
// Env: AUTO_BLOG_ENABLED (default on; set "false" to stop), AUTO_BLOG_MODE ("publish" default, or "review" to
// save every guide as pending for approval in /admin/approvals), AUTO_BLOG_PER_RUN (1 to 3, default 1).

const NCR = ["Delhi", "Gurugram", "Ghaziabad", "Noida", "Greater Noida"]
const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "")
const shortOf = (p: ProgramAdmission) => INSTITUTE_SHORT[p.id] ?? p.institution.split(",")[0]
const AUTO_SUFFIX = "admission-compared"

export interface AutoTopic {
  slug: string
  title: string
  excerpt: string
  tags: string[]
  ids: [string, string]
  priority: number
}

/** Every pair worth comparing: same city, or Delhi against another NCR city, or two Dehradun programmes. */
export function autoBlogTopics(): AutoTopic[] {
  const usable = programAdmissions.filter((p) => p.examsAccepted.length > 0)
  const topics: AutoTopic[] = []
  for (let i = 0; i < usable.length; i++) {
    for (let j = i + 1; j < usable.length; j++) {
      const a = usable[i], b = usable[j]
      const sameCity = a.city === b.city
      const delhiVsNcr = (a.city === "Delhi" && NCR.includes(b.city)) || (b.city === "Delhi" && NCR.includes(a.city))
      if (!sameCity && !delhiVsNcr) continue
      const [x, y] = [a, b].sort((p, q) => shortOf(p).localeCompare(shortOf(q)))
      const priority = x.city === "Delhi" && y.city === "Delhi" ? 0 : delhiVsNcr ? 1 : 2
      topics.push({
        slug: `${slugify(shortOf(x))}-vs-${slugify(shortOf(y))}-${AUTO_SUFFIX}`,
        title: `${shortOf(x)} vs ${shortOf(y)}: Exams Accepted and Admission Compared`,
        excerpt: `${shortOf(x)} (${x.city}) and ${shortOf(y)} (${y.city}) compared on the entrance exams each lists on its own admission page, the intake the source refers to and the steps after the score.`,
        tags: [`${shortOf(x)} vs ${shortOf(y)}`, `${shortOf(x)} admission`, `${shortOf(y)} admission`, `${x.programType} admission ${x.city}`],
        ids: [x.id, y.id],
        priority,
      })
    }
  }
  const seen = new Set<string>()
  return topics
    .sort((m, n) => m.priority - n.priority || m.slug.localeCompare(n.slug))
    .filter((t) => (seen.has(t.slug) ? false : (seen.add(t.slug), true)))
}

export function autoBlogConfig() {
  const perRun = Math.min(3, Math.max(1, parseInt(process.env.AUTO_BLOG_PER_RUN || "1", 10) || 1))
  return { enabled: process.env.AUTO_BLOG_ENABLED !== "false", mode: process.env.AUTO_BLOG_MODE === "review" ? "review" : "publish", perRun }
}

export async function autoBlogState() {
  const admin = createAdminClient()
  const { data } = await admin.from("blogs").select("slug,status,created_at")
  const rows = (data ?? []) as { slug: string; status: string; created_at: string }[]
  const have = new Set([...rows.map((r) => r.slug), ...staticBlogs.map((b) => b.slug)])
  const topics = autoBlogTopics()
  const queue = topics.filter((t) => !have.has(t.slug))
  const written = rows.filter((r) => r.slug.endsWith(AUTO_SUFFIX))
  return { total: topics.length, queue, written, config: autoBlogConfig() }
}

export interface AutoRunResult { slug: string; title: string; status: "published" | "pending"; reason?: string }

export async function runAutoBlog(opts: { dry?: boolean } = {}): Promise<{ ran: boolean; message: string; results: AutoRunResult[] }> {
  const { queue, config } = await autoBlogState()
  if (!config.enabled) return { ran: false, message: "Auto-blog is switched off (AUTO_BLOG_ENABLED=false).", results: [] }
  if (queue.length === 0) return { ran: false, message: "The queue is empty: every comparable pair of verified programmes already has a guide.", results: [] }

  const admin = createAdminClient()
  const results: AutoRunResult[] = []
  for (const t of queue.slice(0, config.perRun)) {
    const [x, y] = t.ids.map((id) => programAdmissions.find((p) => p.id === id)!) as [ProgramAdmission, ProgramAdmission]
    const intro = `${shortOf(x)} (${x.city}) and ${shortOf(y)} (${y.city}) are compared here on what each one's own admission page says.`
    const body = buildComparisonBody([x.id, y.id], intro, [shortOf(x).split(" ")[0], shortOf(y).split(" ")[0]])
    const gates: string[] = []
    if (body.length < 1500) gates.push("body shorter than 1,500 characters")
    if (!x.source.url || !y.source.url) gates.push("a programme has no source link")
    const status: "published" | "pending" = config.mode === "publish" && gates.length === 0 ? "published" : "pending"
    const reason = gates.length ? gates.join("; ") : config.mode === "review" ? "review mode" : undefined
    results.push({ slug: t.slug, title: t.title, status, reason })
    if (opts.dry) continue
    const { error } = await admin.from("blogs").insert({
      slug: t.slug, title: t.title, excerpt: t.excerpt, content: body, category: "MBA", tags: t.tags,
      status, published_at: status === "published" ? new Date().toISOString() : null, read_time: 6,
    })
    if (error) throw new Error(`Could not save ${t.slug}: ${error.message}`)
    revalidatePath(`/blog/${t.slug}`)
  }
  if (!opts.dry) { revalidatePath("/blog"); revalidatePath("/sitemap.xml"); revalidatePath("/admin/auto-blog") }
  return { ran: !opts.dry, message: opts.dry ? "Dry run: nothing was saved." : `Saved ${results.length} guide(s).`, results }
}
