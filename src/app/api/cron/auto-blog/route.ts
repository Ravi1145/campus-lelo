import { NextRequest, NextResponse } from "next/server"
import { timingSafeEqual } from "node:crypto"
import { runAutoBlog } from "@/lib/autoBlog"

// Called once a day by Vercel Cron (see vercel.json). Vercel sends "Authorization: Bearer <CRON_SECRET>".
// Without CRON_SECRET set the route refuses every request. Add ?dry=1 to see what would be written.
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
    return NextResponse.json(await runAutoBlog({ dry }))
  } catch (e) {
    return NextResponse.json({ error: e instanceof Error ? e.message : "Auto-blog failed" }, { status: 500 })
  }
}
