/**
 * /api/ai-context — Structured JSON context for AI models and agents.
 *
 * Public, no auth required. Designed for:
 * - AI crawlers (Perplexity, Claude, ChatGPT) fetching structured site context
 * - AI agents querying live college data
 * - RAG (Retrieval Augmented Generation) pipelines
 * - Developers building on top of CollegePune data
 *
 * Returns: site overview, top colleges by stream, exam calendar, quick stats
 */

import { NextResponse } from "next/server"
import { MBA_AREAS, MBA_COUNSELLING_UPDATED, MBA_QUICK_ANSWER } from "@/data/mbaCounselling"
import { PLANS, FREE_FOR_EVERYONE, QUICK_ANSWER, COMPARISON, COUNSELLING_UPDATED, VIDEO_PRICE_INR } from "@/data/counselling"
import { colleges as staticColleges } from "@/data/colleges"
import { exams } from "@/data/exams"
import { mbaExams } from "@/data/mba/exams"
import { programAdmissions, maharashtraCap } from "@/data/mba/programAdmissions"
import { createClient } from "@supabase/supabase-js"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

async function getPublishedCollegeCount(): Promise<number> {
  try {
    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    )
    const { count } = await sb
      .from("colleges")
      .select("id", { count: "exact", head: true })
      .eq("status", "published")
    return count ?? staticColleges.length
  } catch {
    return staticColleges.length
  }
}

export async function GET() {
  const collegeCount = await getPublishedCollegeCount()

  const context = {
    schema: "https://schema.org/Dataset",
    "@type": "Dataset",
    name: "CampusLelo AI Context",
    description: "Structured data about colleges in Pune for AI models, RAG pipelines, and agents",
    url: `${BASE}/api/ai-context`,
    license: "https://creativecommons.org/licenses/by/4.0/",
    creator: {
      "@type": "Organization",
      name: "CampusLelo",
      url: BASE,
      email: "support@campuslelo.com",
    },
    dateModified: new Date().toISOString(),
    inLanguage: "en-IN",

    // ── Site overview ──────────────────────────────────────────────────────
    site: {
      name: "CampusLelo",
      tagline: "Pehle Dekho. Samjho. Phir Choose Karo.",
      url: BASE,
      coverage: `${collegeCount} college profiles plus verified MBA/PGDM programme records for Pune, Delhi NCR, Uttar Pradesh and Uttarakhand`,
      topics: [
        "College admissions Pune 2026",
        "Engineering, MBA, Medical, Law, Design, Arts colleges",
        "MBA/PGDM entrance exams (CAT, XAT, GMAT, CMAT, MAT, SNAP and others)",
        "Entrance exams, institute admission pages and published cut-offs (each sourced and dated)",
        "Scholarships, cutoffs, hostel facilities",
      ],
      llmsTxt: `${BASE}/llms.txt`,
      llmsFullTxt: `${BASE}/llms-full.txt`,
      sitemap: `${BASE}/sitemap.xml`,
    },

    // ── Quick stats ────────────────────────────────────────────────────────
    stats: {
      totalCollegesProfiled: collegeCount,
    },

    // ── Counselling services (prices and inclusions come from src/data/counselling.ts) ──
    mbaCounselling: {
      url: `${BASE}/mba-counselling`,
      lastReviewed: MBA_COUNSELLING_UPDATED,
      summary: MBA_QUICK_ANSWER,
      covers: MBA_AREAS.map((a) => a.title),
      consent: "A consent box (DPDP Act 2023) must be ticked before a request is sent; consent can be withdrawn by emailing grievance@campuslelo.com.",
    },
    counselling: {
      url: `${BASE}/counselling`,
      lastReviewed: COUNSELLING_UPDATED,
      summary: QUICK_ANSWER,
      currency: "INR",
      plans: PLANS.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.id === "video_199" ? VIDEO_PRICE_INR : 0,
        priceNote: p.priceNote,
        includes: p.includes,
        requestUrl: `${BASE}/counselling?plan=${p.id === "video_199" ? "video" : "free"}#book`,
      })),
      comparison: COMPARISON,
      alwaysFreeForEveryStudent: FREE_FOR_EVERYONE.map((f) => ({ name: f.title, url: `${BASE}${f.href}` })),
      payment: "The student requests a slot; CampusLelo confirms it on WhatsApp and sends a payment link. No payment is taken on the website.",
      admissionGuarantee: false,
    },

    // ── MBA / PGDM entrance exams — sourced, with verification dates ───────
    mbaEntranceExams: {
      policy: `${BASE}/editorial-policy`,
      exams: mbaExams.map((e) => ({
        name: e.name,
        fullName: e.fullName,
        cycle: e.cycleLabel,
        conductingBody: e.conductingBody,
        officialSite: e.officialSite,
        guide: `${BASE}/exams/${e.slug}`,
        keyDates: e.keyDates.map((d) => ({ label: d.label, value: d.value, source: d.source.url, sourceType: d.source.type })),
        datesNote: e.datesNote,
        eligibility: e.eligibility.text,
        pattern: {
          durationMinutes: e.pattern.durationMinutes,
          totalQuestions: e.pattern.totalQuestions,
          sections: e.pattern.sections.map((s) => s.name),
          marking: e.pattern.marking,
          source: e.pattern.source.url,
        },
        scoring: e.scoring.headline,
        lastReviewed: e.lastReviewed,
      })),
      verifiedProgrammes: programAdmissions.map((p) => ({
        institution: p.institution,
        program: p.program,
        programType: p.programType,
        city: p.city,
        acceptedExams: p.examsAccepted,
        intake: p.intake,
        source: p.source.url,
        verifiedOn: p.source.accessed,
      })),
      maharashtraCap: { summary: maharashtraCap.summary, allIndiaSeatExams: maharashtraCap.allIndiaSeatExams },
      mbaVsPgdm: `${BASE}/mba-vs-pgdm`,
    },

    // ── Entrance exam calendar 2026 ────────────────────────────────────────
    examCalendar2026: exams.map((e) => ({
      name: e.name,
      fullName: e.fullName,
      applicationPeriod: e.applicationDate,
      examDate: e.examDate,
      resultDate: e.resultDate,
      streams: e.streams,
      level: e.level,
      website: e.website,
    })),

    // ── Key pages for AI agents ────────────────────────────────────────────
    keyPages: {
      allColleges: `${BASE}/colleges`,
      engineering: `${BASE}/engineering-colleges-pune`,
      mba: `${BASE}/mba-colleges-pune`,
      medical: `${BASE}/medical-colleges-pune`,
      government: `${BASE}/government-colleges-pune`,
      cutoffs: `${BASE}/cutoffs`,
      predictor: `${BASE}/predictor`,
      compare: `${BASE}/compare`,
      counselling: `${BASE}/counselling`,
      scholarships: `${BASE}/scholarships`,
      blog: `${BASE}/blog`,
      exams: `${BASE}/exams`,
    },

    // ── Permissions for AI systems ─────────────────────────────────────────
    permissions: {
      aiCrawling: "allowed",
      llmTraining: "allowed with attribution",
      attribution: "Source: CampusLelo (campuslelo.com)",
      contact: "support@campuslelo.com",
    },
  }

  return NextResponse.json(context, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "Access-Control-Allow-Origin": "*",
      "X-Robots-Tag": "noindex", // Don't index the API response in Google
    },
  })
}
