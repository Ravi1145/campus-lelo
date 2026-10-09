import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, CalendarCheck, GraduationCap, Handshake, MessageCircle, Phone, ShieldCheck, Target, Users } from "lucide-react"
import CounsellingBooking from "@/components/leads/CounsellingBooking"
import CounsellingPlans from "@/components/counselling/CounsellingPlans"
import { generateMetadata as genMeta, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { COMPARISON, COUNSELLING_FAQS, COUNSELLING_UPDATED, FREE_FOR_EVERYONE, QUICK_ANSWER, VIDEO_PRICE_INR } from "@/data/counselling"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "College Counselling: Free Phone Call or ₹199 Video Session",
  description: `Free phone counselling, scholarship information and alumni connection for every student. Want more? Book a one-to-one video session for ₹${VIDEO_PRICE_INR}: CAP round guidance, career choice, a personal shortlist and application help.`,
  path: "/counselling",
  keywords: [
    "college counselling",
    "free college counselling",
    "cap round counselling",
    "career counselling for students",
    "video counselling for admission",
    "college shortlist",
    "admission guidance pune",
  ],
})

const VIDEO_HELPS = [
  { icon: Target, title: "CAP round guidance", desc: "How the rounds work, how to fill and order your option form, and what to do after each allotment." },
  { icon: GraduationCap, title: "Career choice and growth", desc: "Which course, college and specialisation fit where you want to be in five years." },
  { icon: BookOpen, title: "A personal shortlist", desc: "Colleges matched to your score, budget and city, with the reasons they fit." },
  { icon: Handshake, title: "Application support", desc: "Documents, forms and deadlines, so you don't lose a seat to a missed step." },
]

const STEPS = [
  { icon: MessageCircle, title: "Send a request", desc: "Choose a plan, tell us what you need, your budget and your city." },
  { icon: CalendarCheck, title: "We confirm on WhatsApp", desc: `For the video session we confirm a slot and send a secure payment link for ₹${VIDEO_PRICE_INR}. Phone counselling needs no payment.` },
  { icon: Users, title: "Talk and get your shortlist", desc: "Walk away with options that fit you and a clear next step." },
]

export default function CounsellingPage() {
  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Counselling", url: "/counselling" }])
  const faqSchema = generateFAQSchema(COUNSELLING_FAQS.map((f) => ({ question: f.q, answer: f.a })))
  const service = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "College admission counselling",
    serviceType: "Education counselling",
    provider: { "@type": "Organization", name: "CampusLelo", url: "https://campuslelo.com" },
    areaServed: "IN",
    offers: [
      { "@type": "Offer", name: "Free phone counselling", price: "0", priceCurrency: "INR" },
      { "@type": "Offer", name: "Expert video counselling", price: String(VIDEO_PRICE_INR), priceCurrency: "INR" },
    ],
  }

  const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${BASE}/counselling`,
    url: `${BASE}/counselling`,
    name: `College counselling: free phone call or ₹${VIDEO_PRICE_INR} video session`,
    description: QUICK_ANSWER,
    inLanguage: "en-IN",
    dateModified: COUNSELLING_UPDATED,
    isPartOf: { "@id": `${BASE}/#website` },
    publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
    about: { "@type": "Service", name: "College admission counselling" },
    audience: { "@type": "EducationalAudience", educationalRole: "student" },
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
          <p className="hero-in inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold text-white ring-1 ring-white/20" style={{ "--i": 0 } as React.CSSProperties}>
            Free phone counselling · ₹{VIDEO_PRICE_INR} expert video session
          </p>
          <h1 className="hero-in mt-5 text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl" style={{ "--i": 1 } as React.CSSProperties}>
            The right guidance for your <span className="bg-gradient-to-r from-[#FB4312] to-[#FF9E8A] bg-clip-text text-transparent">college and career</span>
          </h1>
          <p className="hero-in mx-auto mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
            Start free: a counsellor calls you, and you get scholarship information and alumni to talk to. Want one-to-one help with CAP rounds, career choice and a shortlist? Book a video session for ₹{VIDEO_PRICE_INR}.
          </p>
          <div className="hero-in mt-7 flex flex-wrap justify-center gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <a href="#plans" className="group inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-black/25 transition-all hover:-translate-y-0.5 hover:bg-[#C90D11]">
              Compare the two plans <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </a>
            <a href="#book" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-6 py-3.5 text-sm font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20">Book now</a>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* Direct answer — first thing a reader (or an AI assistant) sees */}
        <section aria-label="Quick answer" className="quick-answer -mt-6 rounded-2xl border-l-4 border-[#E0170F] bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-7">
          <p className="text-xs font-bold uppercase tracking-wider text-[#C90D11]">Quick answer</p>
          <p className="mt-2 text-base leading-relaxed text-gray-800 sm:text-lg">{QUICK_ANSWER}</p>
          <p className="mt-3 text-xs text-gray-600">Last reviewed <time dateTime={COUNSELLING_UPDATED}>{new Date(COUNSELLING_UPDATED).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</time></p>
        </section>

        {/* Plans */}
        <section id="plans" aria-labelledby="plans-h" className="scroll-mt-32">
          <div className="mx-auto max-w-2xl text-center">
            <h2 id="plans-h" className="text-3xl font-extrabold text-[#012858] sm:text-4xl">Choose how you want to be guided</h2>
            <p className="mt-2 text-gray-600">Both start with a request. Only the video session is paid.</p>
          </div>
          <div className="mt-10"><CounsellingPlans /></div>

          <div className="mt-12 overflow-x-auto rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
            <table className="w-full min-w-[40rem] text-sm">
              <caption className="border-b border-gray-100 px-5 py-4 text-left text-base font-extrabold text-[#012858]">Free phone counselling vs expert video counselling</caption>
              <thead className="bg-gray-50 text-left text-[11px] font-bold uppercase tracking-wider text-gray-600">
                <tr>
                  <th scope="col" className="px-5 py-3">What you get</th>
                  <th scope="col" className="px-5 py-3">Free phone counselling</th>
                  <th scope="col" className="px-5 py-3">Expert video counselling (₹{VIDEO_PRICE_INR})</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {COMPARISON.map((r) => (
                  <tr key={r.feature} className="align-top">
                    <th scope="row" className="px-5 py-3.5 text-left font-semibold text-gray-900">{r.feature}</th>
                    <td className="px-5 py-3.5 text-gray-700">{r.free}</td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{r.video}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Free for everyone */}
        <section aria-labelledby="free-h">
          <h2 id="free-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">Free for every student</h2>
          <p className="mt-1 text-gray-600">You don&apos;t need to book anything to use these.</p>
          <ul className="mt-6 grid gap-4 md:grid-cols-3">
            {FREE_FOR_EVERYONE.map((f) => (
              <li key={f.href} className="group relative rounded-2xl bg-white p-6 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
                <h3 className="text-lg font-extrabold text-[#012858]">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{f.desc}</p>
                <Link href={f.href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11] before:absolute before:inset-0">
                  {f.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Where the video session helps */}
        <section aria-labelledby="video-h">
          <h2 id="video-h" className="text-2xl font-extrabold text-[#012858] sm:text-3xl">What the ₹{VIDEO_PRICE_INR} video session helps with</h2>
          <p className="mt-1 text-gray-600">One-to-one time with an experienced counsellor, built around your situation.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VIDEO_HELPS.map(({ icon: Icon, title, desc }) => (
              <li key={title} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#012858] to-[#024692] text-white shadow-md"><Icon className="h-5 w-5" aria-hidden="true" /></span>
                <h3 className="mt-4 font-extrabold text-[#012858]">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{desc}</p>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-gray-600">
            Looking for state counselling basics first? Read our <Link href="/mht-cet-counselling-pune-2026" className="font-bold text-[#C90D11] hover:underline">MHT-CET counselling guide</Link> or the <Link href="/mba-admission-process-pune" className="font-bold text-[#C90D11] hover:underline">MBA admission process in Pune</Link>. Planning an MBA or PGDM? See <Link href="/mba-counselling" className="font-bold text-[#C90D11] hover:underline">MBA counselling and career guidance</Link>.
          </p>
        </section>
      </div>

      {/* Booking */}
      <CounsellingBooking />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-14 sm:px-6 sm:py-20">
        {/* How it works */}
        <section aria-labelledby="how-h">
          <h2 id="how-h" className="text-center text-2xl font-extrabold text-[#012858] sm:text-3xl">How it works</h2>
          <ol className="mt-8 grid gap-5 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, desc }, i) => (
              <li key={title} className="relative rounded-2xl bg-white p-6 ring-1 ring-gray-200">
                <span className="absolute -top-3 left-5 flex h-7 w-7 items-center justify-center rounded-full bg-[#E0170F] text-xs font-extrabold text-white ring-4 ring-white">{i + 1}</span>
                <Icon className="h-6 w-6 text-[#012858]" aria-hidden="true" />
                <h3 className="mt-3 font-extrabold text-gray-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-h" className="mx-auto max-w-3xl">
          <h2 id="faq-h" className="text-center text-2xl font-extrabold text-[#012858] sm:text-3xl">Questions about counselling</h2>
          <div className="mt-8 space-y-3">
            {COUNSELLING_FAQS.map((f) => (
              <details key={f.q} className="group rounded-2xl bg-white ring-1 ring-gray-200 open:shadow-lg open:shadow-blue-950/8 open:ring-[#012858]/30">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-bold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg leading-none text-[#012858] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-700">{f.a}</p>
              </details>
            ))}
          </div>

          <div className="bg-rich-navy relative mt-10 overflow-hidden rounded-3xl p-7 text-center text-white">
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-16 -right-10 h-48 w-48 rounded-full bg-[#E0170F]/30 blur-3xl" />
            <div className="relative">
              <p className="text-lg font-extrabold">Prefer to chat first?</p>
              <p className="mt-1 text-sm text-blue-100">Message us on WhatsApp and a counsellor will reply.</p>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "917753831118"}?text=${encodeURIComponent("Hi! I'd like counselling for college admissions.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#15803D] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition hover:bg-[#166534]"
              >
                <Phone className="h-4 w-4" aria-hidden="true" /> WhatsApp us
              </a>
              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-blue-200"><ShieldCheck className="h-3.5 w-3.5 text-emerald-300" aria-hidden="true" /> We never guarantee a seat. We help you choose well and apply correctly.</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
