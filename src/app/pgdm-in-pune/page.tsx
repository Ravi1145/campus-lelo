import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "PGDM in Pune 2026 | Best PGDM Colleges, Fees & Admission",
  description: "Complete guide to PGDM in Pune 2026 — AICTE-approved colleges, fees ₹3.8L–₹12L, placements ₹6.5–₹24 LPA. SCMHRD, MIT-SOB, BIMM, FLAME compared. PGDM vs MBA explained.",
  path: "/pgdm-in-pune",
  keywords: [
    "pgdm in pune",
    "pgdm pune",
    "pgdm in pune 2026",
    "pgdm colleges in pune",
    "best pgdm colleges in pune",
    "pgdm admission pune 2026",
    "pgdm fees in pune",
    "pgdm salary pune",
    "pgdm vs mba pune",
    "post graduate diploma management pune",
    "pgdm course pune",
    "aicte pgdm pune",
    "pgdm colleges pune 2026",
    "pgdm in pune placement",
    "scmhrd pgdm pune",
    "mba pgdm pune difference",
  ],
})

export const revalidate = 300

const COLLEGES = [
  { rank: 1, name: "SCMHRD – Symbiosis Centre for Management & HRD", location: "Hinjewadi", naac: "A+", fees: "₹8.2L (2yr)", avgPkg: "₹22 LPA", exam: "SNAP 55+ %ile",    slug: "scmhrd-symbiosis-centre-management-hrd",          highlight: "Best PGDM for HR & Operations" },
  { rank: 2, name: "FLAME University – School of Business",           location: "Lavale",     naac: "A+", fees: "₹12L (2yr)",  avgPkg: "₹14 LPA", exam: "CAT 75+ / GMAT",  slug: "flame-university-pune",                          highlight: "Liberal arts PGDM"             },
  { rank: 3, name: "MIT School of Business (MIT-SOB)",                location: "Kothrud",    naac: "A+", fees: "₹6.5L (2yr)", avgPkg: "₹10.5 LPA",exam: "CAT / MAT / CMAT",slug: "mit-school-of-business-pune",                    highlight: "Best ROI private PGDM"         },
  { rank: 4, name: "BIMM – Balaji Institute of Modern Management",    location: "Tathawade",  naac: "A",  fees: "₹5.5L (2yr)", avgPkg: "₹9.5 LPA", exam: "CAT / MAT / CMAT",slug: "balaji-institute-of-modern-management-pune",     highlight: "Budget PGDM with good placements" },
  { rank: 5, name: "AIMS Institute of Management",                    location: "Viman Nagar",naac: "A",  fees: "₹4.8L (2yr)", avgPkg: "₹8.5 LPA", exam: "CAT / MAT / CMAT",slug: "aims-institute-management-pune",                 highlight: "Affordable with industry focus" },
  { rank: 6, name: "IndSearch Institute of Management",               location: "Baner",      naac: "A",  fees: "₹4.5L (2yr)", avgPkg: "₹8 LPA",   exam: "CAT / MAT / CMAT",slug: "indsearch-institute-of-management-pune",            highlight: "70+ years of management education" },
  { rank: 7, name: "MAEER MIT Institute of Management",               location: "Kothrud",    naac: "A+", fees: "₹5.5L (2yr)", avgPkg: "₹9.2 LPA", exam: "CAT / MAT / CMAT",slug: "maeer-mit-institute-management-pune",            highlight: "MIT group, strong alumni" },
  { rank: 8, name: "Suryadatta Institute of Management",              location: "Wakad",      naac: "B+", fees: "₹3.8L (2yr)", avgPkg: "₹6.5 LPA", exam: "MAT / CMAT",      slug: "suryadatta-institute-management-pune",           highlight: "Most affordable PGDM in Pune" },
]

const COMPARISON = [
  { aspect: "Full name",       mba: "Master of Business Administration",       pgdm: "Post Graduate Diploma in Management"       },
  { aspect: "Awarded by",      mba: "Savitribai Phule Pune University (SPPU)", pgdm: "Autonomous institute (AICTE-approved)"     },
  { aspect: "Type",            mba: "Degree",                                  pgdm: "Diploma (equivalent to degree)"            },
  { aspect: "Duration",        mba: "2 years",                                 pgdm: "2 years"                                   },
  { aspect: "Fees (Pune)",     mba: "₹1.25L–₹8.5L/yr",                       pgdm: "₹2L–₹6L/yr"                               },
  { aspect: "Curriculum",      mba: "University-fixed syllabus",               pgdm: "Industry-driven, flexible curriculum"      },
  { aspect: "Top institutes",  mba: "SIBM, PUMBA, MIT-SOM",                   pgdm: "SCMHRD, FLAME, BIMM, MIT-SOB"             },
  { aspect: "Avg placement",   mba: "₹10–28 LPA (SIBM/PUMBA)",               pgdm: "₹9.5–22 LPA (BIMM/SCMHRD)"               },
  { aspect: "Recognition",     mba: "Degree valid everywhere",                 pgdm: "Diploma; MBA-equivalent only if AIU has granted it to the programme" },
]

const FAQS = [
  {
    question: "Is PGDM in Pune better than MBA?",
    answer: "PGDM and MBA are equivalent for employment purposes in India. PGDM from top Pune institutes like SCMHRD (NIRF #22) often has better industry-aligned curriculum and placements than many MBA colleges. Choose PGDM if: you want SCMHRD or MIT-SOB (which don't offer MBA). Choose MBA if: you want PUMBA (government, cheapest) or SIBM Pune (NIRF #13). Both give equal career outcomes.",
  },
  {
    question: "What is the eligibility for PGDM in Pune?",
    answer: "Eligibility for PGDM in Pune: Minimum 50% in any bachelor's degree (45% for SC/ST). Final-year students can apply provisionally. Must appear in CAT, SNAP, XAT, MAT, or CMAT. Work experience not mandatory but preferred by some institutes. PGDM programmes are open to engineering, commerce, arts, and science graduates.",
  },
  {
    question: "What is the fee for PGDM in Pune 2026?",
    answer: "PGDM fees in Pune 2026: Suryadatta ₹3.8L (2yr) — cheapest. AIMS/IndSearch ₹4.5–4.8L (2yr). BIMM ₹5.5L (2yr). MIT-SOB ₹6.5L (2yr). SCMHRD ₹8.2L (2yr). FLAME ₹12L (2yr) — most expensive. Note: SCMHRD's fee is justified by ₹22 LPA average placement. All fees are for 2-year full program.",
  },
  {
    question: "Is PGDM recognized by the government for jobs?",
    answer: "Yes. AICTE-approved PGDM from Pune institutes is fully recognized for government jobs, PSU recruitment, and private sector employment. It is treated as equivalent to MBA by UGC, AICTE, and all employers including UPSC and state government departments. SCMHRD, FLAME, MIT-SOB, BIMM are all AICTE-approved.",
  },
  {
    question: "What is the salary after PGDM from Pune?",
    answer: "PGDM placement in Pune 2026: SCMHRD ₹22 LPA avg (HR specialization), FLAME ₹14 LPA avg, MIT-SOB ₹10.5 LPA, BIMM ₹9.5 LPA, AIMS ₹8.5 LPA, Suryadatta ₹6.5 LPA. Finance and analytics specializations pay ₹12–25 LPA. IT-MBA/PGDM from SCMHRD and MIT-SOB can reach ₹18–30 LPA in Pune's tech corridor.",
  },
  {
    question: "Can I do PGDM in Pune without CAT?",
    answer: "Yes. You can get PGDM admission in Pune without CAT using: MAT (accepted by BIMM, Indira, Suryadatta), CMAT (accepted by most Pune PGDM institutes), XAT (some colleges), SNAP (for Symbiosis SCMHRD). Management quota direct admission is available at private institutes without entrance exam — fees are higher.",
  },
]

export default function PGDMInPune() {
  const faqSchema = generateFAQSchema(FAQS)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA in Pune", url: "/mba-in-pune" },
    { name: "PGDM in Pune", url: "/pgdm-in-pune" },
  ])

  return (
    <>
      <script id="faq-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />

      <div className="min-h-screen" style={{ background: "#F6F8FB" }}>

        {/* Hero */}
        <section style={{ background: "#011B40" }} className="px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/mba-in-pune" className="hover:text-white">MBA in Pune</Link>
              <span className="mx-2">/</span>
              <span className="text-white">PGDM in Pune</span>
            </nav>
            <h1 className="font-bold text-white mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.6rem)", lineHeight: "1.2" }}>
              PGDM in Pune 2026
            </h1>
            <p className="text-base mb-6" style={{ color: "rgba(255,255,255,0.68)", lineHeight: "1.65", maxWidth: "640px" }}>
              AICTE-approved PGDM programmes in Pune — fees ₹3.8L–₹12L, placements ₹6.5–₹22 LPA.
              Compare SCMHRD, FLAME, MIT-SOB, BIMM and find the right PGDM for your career.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/pgdm-colleges-pune"
                className="px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: "#E0170F" }}>
                View All PGDM Colleges →
              </Link>
              <Link href="/counselling"
                className="px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.80)" }}>
                Free Counselling
              </Link>
            </div>
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

          {/* College table */}
          <section>
            <h2 className="font-bold text-2xl mb-2" style={{ color: "#0F172A" }}>Best PGDM Colleges in Pune 2026</h2>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>Ranked by placements, NAAC grade, and value. Updated Oct 2026.</p>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E5E9F0" }}>
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr style={{ background: "#F6F8FB", borderBottom: "1px solid #E5E9F0" }}>
                    {["#", "College", "NAAC", "Fees", "Avg Pkg", "Exam"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {COLLEGES.map((c, i) => (
                    <tr key={c.rank} style={{ borderBottom: i < COLLEGES.length - 1 ? "1px solid #F1F5F9" : undefined }}>
                      <td className="px-4 py-3.5 font-bold text-xs" style={{ color: "#E0170F" }}>{c.rank}</td>
                      <td className="px-4 py-3.5">
                        <Link href={`/colleges/${c.slug}`} className="font-semibold hover:underline" style={{ color: "#011B40" }}>{c.name}</Link>
                        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{c.location} · {c.highlight}</p>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium" style={{ color: "#16A34A" }}>{c.naac}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold" style={{ color: "#0F172A" }}>{c.fees}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold" style={{ color: "#E0170F" }}>{c.avgPkg}</td>
                      <td className="px-4 py-3.5 text-xs" style={{ color: "#475569" }}>{c.exam}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* MBA vs PGDM */}
          <section>
            <h2 className="font-bold text-2xl mb-2" style={{ color: "#0F172A" }}>PGDM vs MBA in Pune — Key Differences</h2>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>Both are equivalent for employment. Here's what differs.</p>
            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E5E9F0" }}>
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr style={{ background: "#F6F8FB", borderBottom: "1px solid #E5E9F0" }}>
                    <th className="text-left px-4 py-3 font-semibold text-xs w-1/3" style={{ color: "#475569" }}>Aspect</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#011B40" }}>MBA</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#E0170F" }}>PGDM</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row, i) => (
                    <tr key={row.aspect} style={{ borderBottom: i < COMPARISON.length - 1 ? "1px solid #F1F5F9" : undefined }}>
                      <td className="px-4 py-3 font-semibold text-xs" style={{ color: "#0F172A" }}>{row.aspect}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{row.mba}</td>
                      <td className="px-4 py-3 text-xs" style={{ color: "#475569" }}>{row.pgdm}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* FAQs */}
          <section>
            <h2 className="font-bold text-2xl mb-6" style={{ color: "#0F172A" }}>Frequently Asked Questions — PGDM in Pune</h2>
            <div className="space-y-4">
              {FAQS.map(({ question, answer }) => (
                <div key={question} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E5E9F0" }}>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "#011B40" }}>{question}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Related links */}
          <section>
            <h2 className="font-bold text-xl mb-4" style={{ color: "#0F172A" }}>Related MBA / PGDM Pages</h2>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "MBA in Pune",           href: "/mba-in-pune"                        },
                { label: "MBA Colleges in Pune",  href: "/mba-colleges-in-pune"               },
                { label: "Best MBA Pune",         href: "/mba-colleges-pune"             },
                { label: "PGDM Colleges Pune",    href: "/pgdm-colleges-pune"                 },
                { label: "MBA Finance Pune",      href: "/mba-colleges-in-pune-for-finance"   },
                { label: "MBA HR Pune",           href: "/mba-colleges-in-pune-for-hr"        },
                { label: "MBA Marketing Pune",    href: "/mba-colleges-in-pune-for-marketing" },
                { label: "MBA Cutoff Pune 2026",  href: "/mba-cutoff-pune"                    },
                { label: "Free Counselling",      href: "/counselling"                        },
              ].map(l => (
                <Link key={l.href} href={l.href}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border"
                  style={{ border: "1px solid #E5E9F0", color: "#475569" }}>
                  {l.label}
                </Link>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-2xl px-8 py-10 text-center" style={{ background: "#011B40" }}>
            <h2 className="font-bold text-xl text-white mb-2">Not sure between MBA and PGDM?</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.60)" }}>Our counsellors help you choose the right programme — free, no spam.</p>
            <Link href="/counselling"
              className="inline-block px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
              style={{ background: "#E0170F" }}>
              Talk to a Counsellor →
            </Link>
          </section>
        </div>
      </div>
      <RelatedMbaSearches path="/pgdm-in-pune" />
    </>
  )
}
