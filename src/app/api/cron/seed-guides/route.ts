import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "node:crypto"
import { revalidatePath } from "next/cache"
import { createAdminClient } from "@/lib/supabase/admin"
import { researchGuides } from "@/data/blog-posts/research-guides"

// One-off seeding of the research guides into Supabase so they appear in the admin Blogs list and can be edited.
// Protected by CRON_SECRET (same as the auto-blog route). Idempotent: a guide whose slug already exists is left alone,
// so edits made in the admin panel are never overwritten. Add ?dry=1 to see what would be inserted.
export const dynamic = "force-dynamic"
export const maxDuration = 60

function authorised(req: NextRequest) {
  const secret = process.env.CRON_SECRET
  if (!secret) return false
  const given = req.headers.get("authorization") ?? ""
  const want = `Bearer ${secret}`
  return given.length === want.length && timingSafeEqual(Buffer.from(given), Buffer.from(want))
}

export async function GET(req: NextRequest) {
  if (!authorised(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  try {
    const dry = req.nextUrl.searchParams.get("dry") === "1"
    const admin = createAdminClient()
    const { data } = await admin.from("blogs").select("slug").in("slug", researchGuides.map((g) => g.slug))
    const have = new Set((data ?? []).map((r: { slug: string }) => r.slug))
    const todo = researchGuides.filter((g) => !have.has(g.slug))
    if (!dry) {
      for (const g of todo) {
        const { error } = await admin.from("blogs").insert({
          slug: g.slug, title: g.title, excerpt: g.excerpt, content: g.body, category: g.category, tags: g.tags,
          status: "published", published_at: new Date().toISOString(), read_time: 8,
        })
        if (error) throw new Error(`Could not save ${g.slug}: ${error.message}`)
        revalidatePath(`/blog/${g.slug}`)
      }
      revalidatePath("/blog"); revalidatePath("/sitemap.xml"); revalidatePath("/admin/blogs")
    }
    return NextResponse.json({ dry, inserted: dry ? [] : todo.map((g) => g.slug), wouldInsert: dry ? todo.map((g) => g.slug) : [], alreadyThere: Array.from(have) })
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Seeding failed" }, { status: 500 })
  }
}
