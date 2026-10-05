import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { leadSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'
import { isAllowedOrigin } from '@/lib/csrf'
import { timingSafeEqual, createHash } from 'crypto'
import { rateLimit } from '@/lib/ratelimit'
import { buildLeadRecord, isSpam } from '@/lib/leads'

function safeEqual(a: string, b: string): boolean {
  try {
    const ha = createHash('sha256').update(a).digest()
    const hb = createHash('sha256').update(b).digest()
    return timingSafeEqual(ha, hb)
  } catch { return false }
}

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
  }
  // 10 submissions per IP per 10 minutes. Generous because many students share
  // carrier-NAT IPs; the honeypot below catches most bots.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown'
  if (!rateLimit(`leads:${ip}`, 10, 10 * 60_000).allowed) {
    return NextResponse.json({ success: false, message: 'Too many requests. Please try again in a few minutes or call us.' }, { status: 429 })
  }
  try {
    const body = await req.json()
    const validated = leadSchema.parse(body)
    const referer = req.headers.get('referer') ?? ''

    // Honeypot filled → bot. Pretend success so it doesn't retry; store nothing.
    if (isSpam(validated)) {
      return NextResponse.json({ success: true, message: 'Thank you! Our counsellor will contact you within 2 hours.' })
    }

    const record = buildLeadRecord(validated, referer)
    let saved = false
    try {
      const admin = createAdminClient()
      const { error } = await admin.from('leads').insert(record)
      if (error) console.error('[leads] Supabase insert error:', error.message)
      else saved = true
    } catch (dbErr) {
      console.error('[leads] Supabase unavailable:', dbErr)
    }

    let emailed = false
    try {
      emailed = await sendLeadEmail({ ...validated, message: record.message ?? undefined, page_url: record.page_url ?? '' })
    } catch (emailErr) {
      console.error('[leads] email failed:', emailErr)
    }

    // Only claim success if the lead reached at least one destination
    if (!saved && !emailed) {
      return NextResponse.json(
        { success: false, message: 'We could not save your request. Please try again or WhatsApp us.' },
        { status: 503 },
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Our counsellor will contact you within 2 hours.',
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Lead save error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  // Timing-safe comparison prevents brute-force timing attacks
  const adminKey = req.headers.get('x-admin-key') ?? ''
  const envKey   = process.env.ADMIN_PASSWORD ?? ''
  if (!adminKey || !envKey || !safeEqual(adminKey, envKey)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const limit = Math.min(Number(searchParams.get('limit') ?? '200'), 500) // cap at 500

  const admin = createAdminClient()
  const { data, error } = await admin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) return NextResponse.json({ leads: [], total: 0 })
  return NextResponse.json({ leads: data ?? [], total: data?.length ?? 0 })
}
