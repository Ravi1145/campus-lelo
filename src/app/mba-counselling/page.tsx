import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, CalendarCheck, GraduationCap, IndianRupee, MessageCircle, Phone, ShieldCheck, Users } from "lucide-react"
import CounsellingBooking from "@/components/leads/CounsellingBooking"
import CounsellingPlans from "@/components/counselling/CounsellingPlans"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { VIDEO_PRICE_INR } from "@/data/counselling"
import { MBA_AREAS, MBA_CHECKS, MBA_COUNSELLING_UPDATED, MBA_FAQS, MBA_HELP_TOPICS, MBA_QUICK_ANSWER, MBA_STEPS } from "@/data/mbaCounselling"

export const revalidate = 3600

const PATH = "/mba-counselling"

export const metadata: Metadata = genMeta({
  title: "MBA Counselling: Free Admission & Career Guidance",
  description: `Free MBA and PGDM counselling for admission, exam choice and management career guidance. Optional one-to-one video session for ₹${VIDEO_PRICE_INR}. No guarantees.`,
  path: PATH,
  keywords: [
    "mba counselling",
    "mba admission counselling",
    "free mba counselling",
    "mba career guidance",
    "management career counselling",
    "pgdm counselling",
    "mba counselling pune",
    "mba counselling delhi ncr",
    "which mba exam to take",
  ],
})

const ICONS = [Briefcase, BookOpen, CalendarCheck, IndianRupee, GraduationCap, Users]
const STEP_ICONS = [MessageCircle, Phone, CalendarCheck]

const EXPLORE = [
  { href: "/mba", label: "MBA & PGDM hub: exams, colleges, cut-offs" },
  { href: "/mba-exam-calendar", label: "MBA exam calendar 2026–27" },
  { href: "/mba-colleges-in-pune", label: "MBA colleges in Pune" },
  { href: "/mba-colleges-in-delhi-ncr", label: "MBA colleges in Delhi NCR" },
  { href: "/mba-colleges-noida", label: "MBA colleges in Noida" },
  { href: "/mba-colleges-in-greater-noida", label: "MBA colleges in Greater Noida" },
  { href: "/mba-colleges-in-delhi-ncr-without-cat", label: "MBA in Delhi NCR without CAT" },
  { href: "/blog/mba-entrance-exams-in-india", label: "MBA entrance exams in India" },
  { href: "/blog/mba-eligibility-criteria-in-india", label: "MBA eligibility criteria" },
  { href: "/counselling", label: "All CampusLelo counselling plans" },
]

export default function MbaCounsellingPage() {
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
  const breadcrumb = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "MBA & PGDM", url: "/mba" },
    { name: "MBA counselling", url: PATH },
  ])
  const faqSchema = generateFAQSchema(MBA_FAQS.map((f) => ({ question: f.q, answer: f.a })))
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${BASE}${PATH}#service`,
    name: "MBA and PGDM admission counselling and career guidance",
    serviceType: "Education counselling",
    provider: { "@type": "Organization", name: "CampusLelo", url: BASE },
    areaServed: "IN",
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
    offers: [
      { "@type": "Offer", name: "Free phone counselling", price: "0", priceCurrency: "INR" },
      { "@type": "Offer", name: "Expert video counselling", price: String(VIDEO_PRICE_INR), priceCurrency: "INR" },
    ],
  }
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}${PATH}`,
    url: `${BASE}${PATH}`,
    name: "MBA counselling: free admission and career guidance",
    description: MBA_QUICK_ANSWER,
    inLanguage: "en-IN",
    dateModified: MBA_COUNSELLING_UPDATED,
    isPartOf: { "@id": `${BASE}/#website` },
    about: { "@id": `${BASE}${PATH}#service` },
    speakable: { "@type": "SpeakableSpecification", cssSelector: [".quick-answer"] },
  }

  return (
    <>
      <script id="webpage-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="service-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(service) }} />

      {/* Hero */}
      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E0170F]/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-20">
          <nav aria-label="Breadcrumb" className="mb-5 text-xs text-blue-200">
            <Link href="/" className="hover:underline">Home</Link> <span aria-hidden="true">/</span>{" "}
            <Link href="/mba" className="hover:underline">MBA &amp; PGDM</Link> <span aria-hidden="true">/</span> MBA counselling
          </nav>
          <h1 className="hero-in text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl" style={{ "--i": 0 } as React.CSSProperties}>
            MBA counselling for{" "}
            <span className="bg-gradient-to-r from-[#FB4312] to-[#FF9E8A] bg-clip-text text-transparent">admission and management careers</span>
          </h1>
          <p className="hero-in mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg" style={{ "--i": 1 } as React.CSSProperties}>
            Not sure whether to do an MBA or PGDM, which exam to take, or which college fits your score and budget? Talk to a counsellor for free, or book a one-to-one video session for ₹{VIDEO_PRICE_INR}.
          </p>
          <div className="hero-in mt-7 flex flex-wrap justify-center gap-3" style={{ "--i": 2 } as React.CSSProperties}>
            <a href="#book" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#C90D11]">
              Get free MBA counselling <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#plans" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20">Compare plans</a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* Direct answer */}
        <section aria-label="Quick answer" className="quick-answer -mt-6 rounded-2xl border-l-4 border-[#E0170F] bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">Quick answer</p>
          <p className="mt-2 text-base leading-relaxed text-gray-800 sm:text-lg">{MBA_QUICK_ANSWER}</p>
          <p className="mt-3 text-xs text-gray-600">Last reviewed <time dateTime={MBA_COUNSELLING_UPDATED}>{new Date(MBA_COUNSELLING_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></p>
        </section>

        {/* What it covers */}
        <section aria-labelledby="covers-h">
          <h2 id="covers-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">What MBA counselling and career guidance covers</h2>
          <p className="mt-1 text-gray-600">Advice built around your score, budget, city and where you want to work.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MBA_AREAS.map((a, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <li key={a.title} className="group relative rounded-2xl bg-white p-6 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#012858] to-[#024692] text-white shadow-md"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                  <h3 className="mt-4 text-lg font-extrabold text-[#012858]">{a.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{a.desc}</p>
                  <Link href={a.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11] before:absolute before:inset-0">
                    {a.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Plans */}
        <section id="plans" aria-labelledby="plans-h" className="scroll-mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="plans-h" className="text-3xl font-extrabold text-[#012858] sm:text-4xl">Choose how you want to be guided</h2>
            <p className="mt-2 text-gray-600">Both start with a request. Only the video session is paid, and only after your slot is confirmed.</p>
          </div>
          <div className="mt-10"><CounsellingPlans headingId="plans-h" /></div>
        </section>

        {/* Honest advice before booking */}
        <section aria-labelledby="checks-h" className="mx-auto max-w-3xl">
          <h2 id="checks-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Five things to check before you choose an MBA</h2>
          <p className="mt-1 text-gray-600">Useful whether or not you book counselling.</p>
          <ol className="mt-6 space-y-3">
            {MBA_CHECKS.map((c, i) => (
              <li key={c.q} className="flex gap-4 rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E0170F] text-sm font-extrabold text-white">{i + 1}</span>
                <div>
                  <h3 className="font-extrabold text-gray-900">{c.q}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-600">{c.a}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>

      {/* Booking form with DPDP consent */}
      <CounsellingBooking
        defaultStream="MBA"
        topicOptions={MBA_HELP_TOPICS}
        heading="Tell us about your MBA plans. We'll take it from there."
        intro="Share your exam, budget and preferred city so the first conversation starts with options, not questions."
      />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* How it works */}
        <section aria-labelledby="how-h">
          <h2 id="how-h" className="text-center text-2xl font-extrabold text-[#012858] sm:text-3xl">How it works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {MBA_STEPS.map((s, i) => {
              const Icon = STEP_ICONS[i]
              return (
                <li key={s.title} className="relative rounded-2xl bg-white p-6 ring-1 ring-gray-200">
                  <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E0170F] text-xs font-extrabold text-white ring-4 ring-white">{i + 1}</span>
                  <Icon className="h-6 w-6 text-[#012858]" aria-hidden="true" />
                  <h3 className="mt-3 font-extrabold text-gray-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{s.desc}</p>
                </li>
              )
            })}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-h" className="mx-auto max-w-3xl">
          <h2 id="faq-h" className="text-center text-2xl font-extrabold text-[#012858] sm:text-3xl">Questions about MBA counselling</h2>
          <div className="mt-8 space-y-3">
            {MBA_FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white ring-1 ring-gray-200 open:shadow-lg open:shadow-blue-950/8 open:ring-[#012858]/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg leading-none text-[#012858] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Explore */}
        <section aria-labelledby="explore-h">
          <h2 id="explore-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Explore MBA admission guides</h2>
          <ul className="mt-5 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {EXPLORE.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="flex items-center justify-between gap-3 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition hover:text-[#C90D11] hover:ring-[#012858]/30">
                  {l.label} <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 flex items-center gap-1.5 text-xs text-gray-600"><ShieldCheck className="h-3.5 w-3.5 text-emerald-600" aria-hidden="true" /> CampusLelo does not guarantee admission or placements. Your details are used only as described in the <Link href="/privacy" className="font-semibold underline">Privacy Notice</Link>.</p>
        </section>
      </div>
    </>
  )
}
