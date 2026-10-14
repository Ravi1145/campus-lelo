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
      coverage: "108+ colleges in Pune, Maharashtra, India",
      topics: [
        "College admissions Pune 2026",
        "Engineering, MBA, Medical, Law, Design, Arts colleges",
        "MHT-CET, JEE, NEET, SNAP, CAT entrance exams",
        "NIRF rankings, NAAC grades, fees, placements",
        "Scholarships, cutoffs, hostel facilities",
      ],
      llmsTxt: `${BASE}/llms.txt`,
      llmsFullTxt: `${BASE}/llms-full.txt`,
      sitemap: `${BASE}/sitemap.xml`,
    },

    // ── Quick stats ────────────────────────────────────────────────────────
    stats: {
      totalCollegesProfiled: collegeCount,
      totalCollegesInPune: "800+",
      engineeringCollegesInPune: "400+",
      mbaCollegesInPune: "100+",
      medicalCollegesInPune: "50+",
      studentsEnrolledPerYear: "~5 lakh",
      affiliatingUniversity: "SPPU (Savitribai Phule Pune University)",
    },

    // ── Top colleges by stream ─────────────────────────────────────────────
    topColleges: {
      engineering: [
        {
          rank: 1,
          name: "College of Engineering Pune (COEP)",
          slug: "coep-college-of-engineering-pune",
          url: `${BASE}/colleges/coep-college-of-engineering-pune`,
          type: "Government Autonomous",
          nirfRank: 49,
          naac: "A+",
          feesPerYear: "₹80K–₹1.8L",
          avgPlacementLPA: 12,
          highestPlacementLPA: 45,
          admissionExam: "MHT-CET (97+ %ile CSE), JEE Main",
          established: 1854,
        },
        {
          rank: 2,
          name: "Vishwakarma Institute of Technology (VIT Pune)",
          slug: "vit-pune-vishwakarma-institute-of-technology",
          url: `${BASE}/colleges/vit-pune-vishwakarma-institute-of-technology`,
          type: "Autonomous (SPPU)",
          nirfRank: 101,
          naac: "A+",
          feesPerYear: "₹1.6L–₹2.2L",
          avgPlacementLPA: 8.5,
          admissionExam: "MHT-CET (90+ %ile), JEE Main",
        },
        {
          rank: 3,
          name: "Pune Institute of Computer Technology (PICT)",
          slug: "pict-pune-institute-of-computer-technology",
          url: `${BASE}/colleges/pict-pune-institute-of-computer-technology`,
          type: "Autonomous (SPPU)",
          naac: "A",
          feesPerYear: "₹1.4L–₹1.9L",
          avgPlacementLPA: 7.5,
          admissionExam: "MHT-CET (94+ %ile CS), JEE Main",
          note: "Best CS/IT focused college in Pune",
        },
        {
          rank: 4,
          name: "Symbiosis Institute of Technology (SIT Pune)",
          slug: "symbiosis-institute-of-technology-pune",
          url: `${BASE}/colleges/symbiosis-institute-of-technology-pune`,
          type: "Symbiosis Deemed University",
          naac: "A+",
          feesPerYear: "₹3.6L–₹4.8L",
          avgPlacementLPA: 9.8,
          admissionExam: "SET (Symbiosis Entrance Test), JEE Main",
        },
        {
          rank: 5,
          name: "MIT World Peace University (MIT-WPU)",
          slug: "mit-wpu-mit-world-peace-university",
          url: `${BASE}/colleges/mit-wpu-mit-world-peace-university`,
          type: "Deemed University",
          naac: "A+",
          feesPerYear: "₹2L–₹3.8L",
          avgPlacementLPA: 7.2,
          admissionExam: "MHT-CET (82+ %ile), JEE Main",
        },
      ],
      mba: [
        {
          rank: 1,
          name: "Symbiosis Institute of Business Management (SIBM Pune)",
          slug: "sibm-symbiosis-institute-business-management-pune",
          url: `${BASE}/colleges/sibm-symbiosis-institute-business-management-pune`,
          nirfRank: 13,
          naac: "A++",
          feesTotal: "₹22L",
          avgPlacementLPA: 28,
          highestPlacementLPA: 65,
          admissionExam: "SNAP (Symbiosis International University)",
          topRecruiters: ["McKinsey", "BCG", "P&G", "Deloitte", "Amazon"],
        },
        {
          rank: 2,
          name: "SCMHRD: Symbiosis Centre for Management and HRD",
          slug: "scmhrd-symbiosis-centre-management-hrd",
          url: `${BASE}/colleges/scmhrd-symbiosis-centre-management-hrd`,
          nirfRank: 20,
          feesTotal: "₹18L",
          avgPlacementLPA: 22,
          admissionExam: "SNAP (Symbiosis International University)",
        },
        {
          rank: 3,
          name: "PUMBA: Pune University MBA (Government)",
          slug: "pumba-pune-university-mba",
          url: `${BASE}/colleges/pumba-pune-university-mba`,
          type: "Government (SPPU)",
          feesTotal: "₹2.8L",
          avgPlacementLPA: 12,
          admissionExam: "Maharashtra MBA CAP: MAH MBA CET; All-India seats via CAT/XAT/CMAT/MAT/ATMA/GMAT",
          note: "Cheapest MBA in Pune",
        },
      ],
      medical: [
        {
          rank: 1,
          name: "Armed Forces Medical College (AFMC)",
          slug: "afmc-armed-forces-medical-college-pune",
          url: `${BASE}/colleges/afmc-armed-forces-medical-college-pune`,
          nirfRank: 4,
          naac: "A++",
          type: "Government (Defence)",
          feesTotal: "₹50,000 for 4.5 years",
          neetCutoff: "655+ (General)",
          seats: 150,
          note: "Only for defence personnel dependents",
        },
        {
          rank: 2,
          name: "BJ Government Medical College (BJMC)",
          slug: "bj-medical-college-pune",
          url: `${BASE}/colleges/bj-medical-college-pune`,
          nirfRank: 18,
          naac: "A+",
          type: "Government",
          feesPerYear: "₹60K–₹1.2L",
          neetCutoff: "625+ (General, State quota)",
          seats: 200,
        },
      ],
      government: [
        { name: "COEP", stream: "Engineering", nirfRank: 49, url: `${BASE}/colleges/coep-college-of-engineering-pune` },
        { name: "AFMC", stream: "Medical", nirfRank: 4, url: `${BASE}/colleges/afmc-armed-forces-medical-college-pune` },
        { name: "BJ Medical College", stream: "Medical", nirfRank: 18, url: `${BASE}/colleges/bj-medical-college-pune` },
        { name: "Fergusson College", stream: "Arts & Science", naac: "A+", url: `${BASE}/colleges/fergusson-college-pune` },
        { name: "SP College", stream: "Arts & Science", naac: "A+", url: `${BASE}/colleges/sp-college-pune-sir-parashurambhau-college` },
        { name: "PUMBA", stream: "MBA", url: `${BASE}/colleges/pumba-pune-university-mba` },
        { name: "ILS Law College", stream: "Law", url: `${BASE}/colleges/ils-law-college-pune` },
      ],
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

    // ── Key MHT-CET cutoffs 2025 (General, CSE branch) ───────────────────
    cutoffs2025: {
      mhtCet: [
        { college: "COEP", branch: "Computer Engineering", percentile: 97.8 },
        { college: "PICT", branch: "Computer Engineering", percentile: 94.0 },
        { college: "VIT Pune", branch: "Computer Engineering", percentile: 91.5 },
        { college: "MIT-COE", branch: "Computer Engineering", percentile: 88.0 },
        { college: "MIT-WPU", branch: "Computer Engineering", percentile: 82.0 },
        { college: "JSPM RSCOE", branch: "Computer Engineering", percentile: 74.0 },
        { college: "AISSMS COE", branch: "Computer Engineering", percentile: 70.0 },
      ],
      neet: [
        { college: "AFMC", marks: 655, category: "General" },
        { college: "BJ Medical College", marks: 625, category: "General (State quota)" },
        { college: "DY Patil Medical", marks: 570, category: "Management quota" },
      ],
      snap: [
        { college: "SIBM Pune", percentile: 60, category: "General" },
        { college: "SCMHRD", percentile: 65, category: "General" },
      ],
    },

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
