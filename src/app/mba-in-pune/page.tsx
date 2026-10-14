import { collegeHref } from "@/lib/collegeHref"
import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema, generateCollegeListSchema } from "@/lib/seo"
import { CheckCircle, TrendingUp, BookOpen, Users, Award, IndianRupee, GraduationCap, Briefcase } from "lucide-react"
import { safeJsonLd } from "@/lib/jsonld"
import RelatedMbaSearches from "@/components/mba/RelatedMbaSearches"

export const metadata: Metadata = genMeta({
  title: "MBA in Pune 2026 | Best Colleges, Fees, Admission & Scope",
  description: "Complete guide to MBA in Pune 2026 to 120+ colleges, fees ₹1.25L–₹8.5L/yr, CAT/SNAP/MAH-CET cutoffs, placements ₹7. SIBM, SCMHRD, PUMBA, MIT-SOM compared.",
  path: "/mba-in-pune",
  keywords: [
    "mba in pune",
    "mba pune",
    "mba in pune 2026",
    "mba admission in pune",
    "mba in pune fees",
    "mba in pune salary",
    "mba in pune eligibility",
    "mba course in pune",
    "mba program pune",
    "mba degree pune",
    "best mba in pune",
    "mba in pune placement",
    "mba college in pune",
    "mba colleges in pune 2026",
    "pgdm in pune",
    "symbiosis mba pune",
    "sibm pune mba",
    "cat colleges pune mba",
    "snap mba pune",
    "mah cet mba pune",
  ],
})

export const revalidate = 300

const TOP_COLLEGES = [
  { rank: 1,  name: "SIBM Pune: Symbiosis Institute of Business Management", nirf: null,  naac: "A+", fees: "₹8.5L/2yr", avgPkg: "Not published", exam: "SNAP 60+ %ile",          slug: "sibm-symbiosis-institute-business-management-pune",  highlight: "India's #1 private MBA for Pune"        },
  { rank: 2,  name: "SCMHRD: Symbiosis Centre for Management & HRD",         nirf: null,  naac: "A+", fees: "₹8.2L/2yr", avgPkg: "Not published", exam: "SNAP 55+ %ile",          slug: "scmhrd-symbiosis-centre-management-hrd",           highlight: "Best for HR & Operations"                },
  { rank: 3,  name: "PUMBA: Pune University MBA (Government)",                nirf: null,naac: "A+", fees: "₹1.25L/yr", avgPkg: "Not published", exam: "MAH-CET 80+ %ile",       slug: "pumba-pune-university-mba",                        highlight: "Best value MBA in Pune"                  },
  { rank: 4,  name: "SCIT: Symbiosis Centre for Information Technology",      nirf: null,naac: "A+", fees: "₹7L/2yr",  avgPkg: "Not published", exam: "SNAP 50+ %ile",          slug: "symbiosis-centre-information-technology-pune",     highlight: "Best MBA+IT combo"                       },
  { rank: 5,  name: "MIT School of Management (MIT-SOM)",                      nirf: null,naac: "A+", fees: "₹5.5L/2yr", avgPkg: "Not published", exam: "CAT / MAT / CMAT",       slug: "mit-school-of-management-pune",                    highlight: "Best ROI after PUMBA"                    },
  { rank: 6,  name: "FLAME University: School of Business",                   nirf: null,naac: "A+", fees: "₹12L/2yr", avgPkg: "Not published", exam: "CAT 75+ %ile / GMAT",    slug: "flame-university-pune",                            highlight: "Liberal arts + MBA"                      },
  { rank: 7,  name: "BIMM: Balaji Institute of Modern Management",            nirf: null,naac: "A",  fees: "₹5L/2yr",  avgPkg: "Not published", exam: "CAT / MAT / CMAT",      slug: "balaji-institute-of-modern-management-pune",       highlight: "Best budget private MBA"                 },
  { rank: 8,  name: "Indira Institute of Management Pune (IIMP)",              nirf: null,naac: "A",  fees: "₹4.2L/2yr", avgPkg: "Not published", exam: "CAT / MAT / CMAT",     slug: "indira-institute-of-management-pune",              highlight: "Highest ROI in Pune"                     },
  { rank: 9,  name: "COEP: College of Engineering Pune (MBA program)",        nirf: null,  naac: "A+", fees: "₹1.8L/yr", avgPkg: "Not published", exam: "MAH-CET / CAT",          slug: "coep-college-of-engineering-pune",                  highlight: "Government"                    },
  { rank: 10, name: "Suryadatta Institute of Management",                      nirf: null,naac: "B+", fees: "₹2.8L/2yr", avgPkg: "Not published", exam: "MAT / CMAT",           slug: "suryadatta-institute-management-pune",              highlight: "Most affordable option"                  },
]

const SPECIALIZATIONS = [
  { name: "MBA in Finance",       href: "/mba-colleges-in-pune-for-finance",       desc: "Banking, BFSI, investment banking, corporate finance" },
  { name: "MBA in HR",            href: "/mba-colleges-in-pune-for-hr",            desc: "Human resources, talent acquisition, L&D" },
  { name: "MBA in Marketing",     href: "/mba-colleges-in-pune-for-marketing",     desc: "Brand management, digital marketing, FMCG" },
  { name: "MBA in IT/Systems",    href: "/mba-colleges-in-pune-for-it",            desc: "IT management, tech consulting, product" },
  { name: "MBA in Operations",    href: "/mba-colleges-in-pune-for-operations",    desc: "Supply chain, manufacturing, logistics" },
  { name: "MBA in Analytics",     href: "/mba-colleges-in-pune-for-business-analytics", desc: "Data science, business intelligence, fintech" },
  { name: "Executive MBA",        href: "/mba-colleges-in-pune-executive",         desc: "For working professionals with 5+ years experience" },
  { name: "PGDM in Pune",        href: "/pgdm-in-pune",                           desc: "AICTE-approved diploma: how it differs from an MBA" },
]

const EXAMS = [
  { name: "CAT 2026",     date: "24 Nov 2026",   accepted: "Most Pune MBA colleges",           cutoff: "60–85 %ile" },
  { name: "SNAP 2026",    date: "Dec 6/13/20",   accepted: "Symbiosis group only (SIBM, SCMHRD, SCIT)", cutoff: "50–60 %ile" },
  { name: "MAH-CET 2026", date: "Mar 2026",      accepted: "PUMBA, government MBA colleges",   cutoff: "80–95 %ile" },
  { name: "CMAT 2026",    date: "Jan 2026",       accepted: "MIT-SOM, BIMM, Indira, Suryadatta", cutoff: "75–85 %ile" },
  { name: "MAT 2026",     date: "Feb / May / Sep / Dec", accepted: "Most private MBA colleges",  cutoff: "500+ score" },
  { name: "XAT 2026",     date: "5 Jan 2026",    accepted: "Select Pune colleges",              cutoff: "70+ %ile" },
]

const FAQS = [
  {
    question: "How to get MBA admission in Pune 2026?",
    answer: "To get MBA admission in Pune 2026: (1) Appear in CAT (Nov 2026), SNAP (Dec 2026), or MAH-CET (Mar 2026), most Pune colleges accept any of these. (2) Apply to colleges, SIBM/SCMHRD via Symbiosis portal; PUMBA via DTE Maharashtra; private colleges directly. (3) Attend GD-PI rounds (Feb–Apr 2026). (4) Accept offer letter and pay fees. Government college PUMBA has the best value (₹1.25L/yr).",
  },
  {
    question: "What is the eligibility for MBA in Pune?",
    answer: "Eligibility for MBA in Pune: Minimum 50% aggregate in any graduation (45% for SC/ST/OBC-NC). No specific stream requirement, engineers, commerce, arts graduates all eligible. Valid score in CAT/SNAP/MAH-CET/CMAT/MAT/XAT. Work experience not mandatory (except Executive MBA which requires 5+ years). Final-year students can apply provisionally.",
  },
  {
    question: "What is the fee for MBA in Pune 2026?",
    answer: "MBA fees in Pune 2026: Government: PUMBA ₹1.25L/yr (best value). Autonomous private: MIT-SOM ₹5.5L total, BIMM ₹5L total, Indira ₹4.2L total. Deemed universities: SIBM Pune ₹8.5L/2yr, SCMHRD ₹8.2L/2yr, FLAME ₹12L/2yr. Fees include tuition but may exclude hostel (₹80K–1.4L/yr extra). Scholarships available at most institutes for merit students.",
  },
  {
    question: "What is the salary after MBA from Pune?",
    answer: "Finance and consulting specializations command highest salaries. Pune's IT corridor (Hinjewadi) offers ₹15 for MBA+IT roles. Average across all Pune MBA colleges is ₹9.",
  },
  {
    question: "Is MBA in Pune worth it in 2026?",
    answer: "Yes: MBA in Pune is excellent value in 2026. Pune's 500+ IT companies, manufacturing giants (Tata, Bajaj, KPIT), and growing startup ecosystem create strong MBA demand. SIBM Pune ROI: fees ₹8.5L → (3.3x ROI in Year 1). PUMBA ROI: fees ₹2.5L total → (4x ROI). Even mid-tier colleges like MIT-SOM offer strong 2x ROI.",
  },
  {
    question: "Which is better: MBA from SIBM Pune or IIM Indore?",
    answer: "IIM Indore has stronger national brand and higher average placement (₹35+ LPA). SIBM Pune offers comparable fees (₹8.5L vs ₹22L at IIM Indore) with near-equal placement in Pune-Mumbai corridor. For Pune/Mumbai jobs: SIBM Pune is often preferred by local recruiters. For national/international placements: IIM Indore is better. Budget and target geography should decide.",
  },
  {
    question: "What is the difference between MBA and PGDM in Pune?",
    answer: "MBA (Master of Business Administration) is a university-affiliated degree from Savitribai Phule Pune University (SPPU). PGDM (Post Graduate Diploma in Management) is an AICTE-approved diploma from autonomous institutes. Both are equally valid for employment. Top PGDM institutes in Pune like SCMHRD, MIT-SOB often have better industry connections. PGDM fees tend to be higher but placements are comparable or better.",
  },
  {
    question: "Can I do MBA in Pune without CAT?",
    answer: "Yes. You can do MBA in Pune without CAT by using: (1) MAH-CET: accepted by PUMBA and 80+ Pune colleges, (2) SNAP, for all Symbiosis colleges, (3) CMAT, accepted by MIT-SOM, BIMM, Indira Institute, (4) MAT, accepted by most private colleges, (5) XAT, some colleges accept. Management quota direct admission is also available at private colleges without entrance exam.",
  },
]

export default function MBAInPune() {
  const faqSchema = generateFAQSchema(FAQS)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA in Pune", url: "/mba-in-pune" },
  ])
  const listSchema = generateCollegeListSchema(
    TOP_COLLEGES.map(c => ({ name: c.name, slug: c.slug, description: c.highlight })),
    "Best MBA Colleges in Pune 2026"
  )

  return (
    <>
      <script id="faq-schema"        type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script id="list-schema"       type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(listSchema) }} />

      <div className="min-h-screen" style={{ background: "#F6F8FB" }}>

        {/* ── Hero ── */}
        <section style={{ background: "#011B40" }} className="px-6 py-12">
          <div className="max-w-5xl mx-auto">
            <nav className="text-xs mb-4" style={{ color: "rgba(255,255,255,0.50)" }}>
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-white">MBA in Pune</span>
            </nav>
            <h1 className="font-bold text-white mb-3" style={{ fontSize: "clamp(1.75rem, 4vw, 2.6rem)", lineHeight: "1.2" }}>
              MBA in Pune 2026
            </h1>
            <p className="mb-6 text-base" style={{ color: "rgba(255,255,255,0.68)", lineHeight: "1.65", maxWidth: "640px" }}>
              120+ MBA colleges in Pune, fees ₹1.25L–₹8.5L/yr, placements ₹7, NAAC A+ institutes.
              Compare SIBM, SCMHRD, PUMBA, MIT-SOM and find your best-fit MBA program.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/mba-colleges-in-pune"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: "#E0170F" }}>
                View All MBA Colleges →
              </Link>
              <Link href="/counselling"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.80)" }}>
                Free Counselling
              </Link>
            </div>
          </div>
        </section>

        {/* ── Quick stats ── */}
        <section className="px-6 py-8 bg-white border-b" style={{ borderColor: "#E5E9F0" }}>
          <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
            {[
              { icon: GraduationCap, value: "120+",      label: "MBA colleges in Pune"     },
              { icon: IndianRupee,   value: "₹1.25L/yr", label: "Lowest fees (PUMBA govt)" },
              { icon: Users,         value: "6 exams",   label: "CAT · SNAP · MAH-CET +"   },
            ].map(({ icon: Icon, value, label }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ background: "#FFF4F2" }}>
                  <Icon className="w-4.5 h-4.5" style={{ color: "#E0170F" }} strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-bold text-base leading-none" style={{ color: "#0F172A" }}>{value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#475569" }}>{label}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

          {/* ── Top 10 Colleges table ── */}
          <section>
            <h2 className="font-bold text-2xl mb-2" style={{ color: "#0F172A" }}>
              Top 10 MBA Colleges in Pune 2026
            </h2>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>Ranked by NIRF, placement average, and value. Updated Oct 2026.</p>

            <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "#E5E9F0" }}>
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr style={{ background: "#F6F8FB", borderBottom: "1px solid #E5E9F0" }}>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>#</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>College</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>NAAC</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>Fees</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>Avg Pkg</th>
                    <th className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>Exam</th>
                  </tr>
                </thead>
                <tbody>
                  {TOP_COLLEGES.map((c, i) => (
                    <tr key={c.rank} style={{ borderBottom: i < TOP_COLLEGES.length - 1 ? "1px solid #F1F5F9" : undefined }}>
                      <td className="px-4 py-3.5 font-bold text-xs" style={{ color: "#E0170F" }}>{c.rank}</td>
                      <td className="px-4 py-3.5">
                        <Link href={collegeHref(c.slug)} className="font-semibold hover:underline" style={{ color: "#011B40" }}>
                          {c.name}
                        </Link>
                        {c.nirf && <span className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded" style={{ background: "#EEF2FF", color: "#4338CA" }}>NIRF #{c.nirf}</span>}
                        <p className="text-xs mt-0.5" style={{ color: "#64748B" }}>{c.highlight}</p>
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

          {/* ── Specializations ── */}
          <section>
            <h2 className="font-bold text-2xl mb-2" style={{ color: "#0F172A" }}>MBA Specializations in Pune</h2>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>Choose a specialization to see colleges, fees, and career scope.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SPECIALIZATIONS.map(s => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="rounded-xl p-4 transition-shadow hover:shadow-md border bg-white"
                  style={{ borderColor: "#E5E9F0" }}
                >
                  <p className="font-semibold text-sm mb-1" style={{ color: "#011B40" }}>{s.name}</p>
                  <p className="text-xs" style={{ color: "#64748B" }}>{s.desc}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Entrance exams ── */}
          <section>
            <h2 className="font-bold text-2xl mb-2" style={{ color: "#0F172A" }}>Entrance Exams for MBA in Pune 2026</h2>
            <p className="text-sm mb-6" style={{ color: "#475569" }}>Most Pune colleges accept multiple exams, apply to the one that fits your score.</p>
            <div className="rounded-2xl border overflow-hidden" style={{ borderColor: "#E5E9F0" }}>
              <table className="w-full text-sm bg-white">
                <thead>
                  <tr style={{ background: "#F6F8FB", borderBottom: "1px solid #E5E9F0" }}>
                    {["Exam", "Date 2026", "Accepted by", "Cutoff (Pune avg)"].map(h => (
                      <th key={h} className="text-left px-4 py-3 font-semibold text-xs" style={{ color: "#475569" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {EXAMS.map((e, i) => (
                    <tr key={e.name} style={{ borderBottom: i < EXAMS.length - 1 ? "1px solid #F1F5F9" : undefined }}>
                      <td className="px-4 py-3.5 font-bold text-sm" style={{ color: "#011B40" }}>{e.name}</td>
                      <td className="px-4 py-3.5 text-xs" style={{ color: "#475569" }}>{e.date}</td>
                      <td className="px-4 py-3.5 text-xs" style={{ color: "#475569" }}>{e.accepted}</td>
                      <td className="px-4 py-3.5 text-xs font-semibold" style={{ color: "#E0170F" }}>{e.cutoff}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/mba-cutoff-pune" className="text-sm font-medium" style={{ color: "#E0170F" }}>View all cutoffs →</Link>
              <Link href="/mba-admission-process-pune" className="text-sm font-medium" style={{ color: "#E0170F" }}>Admission process →</Link>
            </div>
          </section>

          {/* ── Key links ── */}
          <section>
            <h2 className="font-bold text-2xl mb-6" style={{ color: "#0F172A" }}>Explore MBA in Pune by Category</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  heading: "By Budget",
                  links: [
                    { label: "MBA Under ₹5 Lakh (Pune)",  href: "/mba-colleges-in-pune-under-5-lakh"  },
                    { label: "MBA Under ₹10 Lakh (Pune)", href: "/mba-colleges-in-pune-under-10-lakh" },
                    { label: "MBA Under ₹15 Lakh (Pune)", href: "/mba-colleges-in-pune-under-15-lakh" },
                    { label: "Low Fees MBA Colleges",      href: "/mba-colleges-in-pune-low-fees"     },
                    { label: "Government MBA Pune",        href: "/mba-colleges-in-pune"              },
                  ],
                },
                {
                  heading: "By Exam Score",
                  links: [
                    { label: "MBA with CAT Score",       href: "/mba-colleges-in-pune-accepting-cat"   },
                    { label: "MBA with CMAT Score",      href: "/mba-colleges-in-pune-accepting-cmat"  },
                    { label: "MBA with MAH-CET",         href: "/mba-colleges-in-pune-accepting-mh-cet"},
                    { label: "MBA with 50 Percentile",   href: "/mba-colleges-in-pune-cutoff-50-percentile" },
                    { label: "MBA Without Entrance Exam",href: "/mba-colleges-in-pune-without-entrance-exam" },
                  ],
                },
                {
                  heading: "By Placement",
                  links: [
                    { label: "MBA Highest Package Pune", href: "/mba-colleges-in-pune"   },
                    { label: "MBA 100% Placement Pune",  href: "/mba-colleges-in-pune"},
                    { label: "MBA Placements in Pune",   href: "/mba-colleges-in-pune"                   },
                    { label: "Best MBA Colleges Pune",   href: "/mba-colleges-pune"                },
                    { label: "Top 10 MBA Colleges Pune", href: "/top-10-mba-colleges-in-pune"           },
                  ],
                },
              ].map(({ heading, links }) => (
                <div key={heading} className="bg-white rounded-2xl border p-5" style={{ borderColor: "#E5E9F0" }}>
                  <h3 className="font-semibold text-sm mb-3" style={{ color: "#011B40" }}>{heading}</h3>
                  <ul className="space-y-2">
                    {links.map(l => (
                      <li key={l.href}>
                        <Link href={l.href} className="text-xs hover:underline" style={{ color: "#475569" }}>
                          <span style={{ color: "#E0170F" }}>›</span> {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* ── FAQ ── */}
          <section>
            <h2 className="font-bold text-2xl mb-6" style={{ color: "#0F172A" }}>Frequently Asked Questions: MBA in Pune</h2>
            <div className="space-y-4">
              {FAQS.map(({ question, answer }) => (
                <div key={question} className="bg-white rounded-xl p-5 border" style={{ borderColor: "#E5E9F0" }}>
                  <h3 className="font-semibold text-sm mb-2" style={{ color: "#011B40" }}>{question}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>{answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Final CTA ── */}
          <section className="rounded-2xl px-8 py-10 text-center" style={{ background: "#011B40" }}>
            <h2 className="font-bold text-xl text-white mb-2">Get Free MBA Counselling for Pune 2026</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(255,255,255,0.60)" }}>Free phone counselling, or an expert video session for ₹199.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/counselling"
                className="px-6 py-3 rounded-xl font-semibold text-white text-sm transition-opacity hover:opacity-90"
                style={{ background: "#E0170F" }}>
                Book Free Session →
              </Link>
              <Link href="/mba-colleges-in-pune"
                className="px-6 py-3 rounded-xl font-semibold text-sm transition-colors hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.20)", color: "rgba(255,255,255,0.80)" }}>
                Browse All MBA Colleges
              </Link>
            </div>
          </section>

        </div>
      </div>
      <RelatedMbaSearches path="/mba-in-pune" />
    </>
  )
}
