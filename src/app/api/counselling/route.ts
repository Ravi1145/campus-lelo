import { NextRequest, NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { counsellingSchema } from '@/lib/validations'
import { createAdminClient } from '@/lib/supabase/admin'
import { sendLeadEmail } from '@/lib/mailer'
import { isAllowedOrigin } from '@/lib/csrf'
import { PLANS } from '@/data/counselling'

export async function POST(req: NextRequest) {
  if (!isAllowedOrigin(req)) {
    return NextResponse.json({ success: false, message: 'Forbidden' }, { status: 403 })
  }
  try {
    const body = await req.json()
    const validated = counsellingSchema.parse(body)
    const referer = req.headers.get('referer') ?? ''

    // Honeypot: bots fill the hidden field. Pretend success, store nothing.
    if (validated.website && validated.website.trim()) {
      return NextResponse.json({ success: true, bookingRef: 'BOOK-OK', plan: validated.plan, message: 'Request received.' })
    }

    const plan = PLANS.find((p) => p.id === validated.plan) ?? PLANS[0]
    const isVideo = plan.id === 'video_199'
    const messageLines = [
      `Plan: ${plan.recordLabel}`,
      isVideo ? 'Payment: send payment link after the slot is confirmed' : null,
      validated.help_topics?.length ? `Help needed: ${validated.help_topics.join(', ')}` : null,
      validated.preferred_date ? `Preferred date: ${validated.preferred_date}` : null,
      validated.preferred_time ? `Preferred time: ${validated.preferred_time}` : null,
      `Consent (DPDP): yes v${validated.consent_version ?? '-'} ${new Date().toISOString()}`,
    ].filter(Boolean).join('\n')

    const admin = createAdminClient()
    const { data, error } = await admin.from('leads').insert({
      name:             validated.name,
      phone:            validated.phone,
      email:            validated.email || null,
      stream:           validated.stream ?? null,
      exam_score:       validated.exam_score ?? null,
      budget:           validated.budget ?? null,
      college_interest: validated.city_preference ?? null,
      course_interest:  plan.recordLabel,
      source:           'counselling',
      page_url:         referer || null,
      message:          messageLines || null,
      status:           'new',
    }).select('id').single()

    if (error) console.error('[counselling] Supabase insert error:', error.message)

    const ref = data?.id ? `BOOK-${data.id.slice(-6).toUpperCase()}` : `BOOK-${Date.now().toString(36).toUpperCase()}`

    try {
      await sendLeadEmail({
        name:       validated.name,
        phone:      validated.phone,
        email:      validated.email,
        stream:     validated.stream,
        plan:       plan.recordLabel,
        budget:     validated.budget,
        city:       validated.city_preference,
        help_needed: validated.help_topics?.join(', '),
        preferred_date: validated.preferred_date,
        preferred_time: validated.preferred_time,
        source:     'counselling',
        page_url:   referer,
      })
    } catch (emailErr) {
      console.error('[counselling] email failed:', emailErr)
    }

    return NextResponse.json({
      success: true,
      bookingRef: ref,
      plan: plan.id,
      message: isVideo
        ? "Request received. We will confirm your slot on WhatsApp and send the payment link."
        : "Request received. A counsellor will call or WhatsApp you.",
    })
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ success: false, errors: error.issues }, { status: 400 })
    }
    console.error('Counselling booking error:', error)
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 })
  }
}
