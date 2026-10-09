import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Headphones, Mail, MapPin, ShieldCheck } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { VIDEO_PRICE_INR } from "@/data/counselling"

export const revalidate = 86400

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

export const metadata: Metadata = genMeta({
  title: "About CampusLelo: College Discovery for Pune & Delhi NCR",
  description: "CampusLelo helps students choose colleges and entrance exams in Pune and Delhi NCR, with sourced MBA and PGDM data, free scholarship information and counselling.",
  path: "/about",
  keywords: ["about campuslelo", "campuslelo", "college discovery portal pune"],
})

const OFFER = [
  { title: "College discovery", desc: "Compare colleges by fees, exams accepted, NAAC and NIRF, placements and location.", href: "/colleges" },
  { title: "MBA and PGDM guidance", desc: "Entrance-exam dates, cut-offs where they are officially published, and city guides.", href: "/mba" },
  { title: "Scholarships and alumni", desc: "Scholarship information and alumni to talk to. Free for every student.", href: "/scholarships" },
  { title: "Counselling", desc: `Free phone counselling, or a one-to-one expert video session for ₹${VIDEO_PRICE_INR}.`, href: "/counselling" },
]

export default function AboutPage() {
  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "About", url: "/about" }])
  const aboutPage = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${BASE}/about`,
    url: `${BASE}/about`,
    name: "About CampusLelo",
    inLanguage: "en-IN",
    about: { "@type": "Organization", name: "CampusLelo", url: BASE, email: "support@campuslelo.com", areaServed: ["Pune", "Delhi NCR", "India"] },
  }

  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="about-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(aboutPage) }} />

      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
          <nav aria-label="Breadcrumb" className="mb-5 flex gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span><span className="text-white" aria-current="page">About</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">About CampusLelo</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg">
            CampusLelo is a college discovery portal for students in Pune and Delhi NCR. We help you compare colleges, understand entrance exams and get guidance — and we show where every fact comes from.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl space-y-14 px-4 py-12 sm:px-6">
        <section aria-labelledby="what-h">
          <h2 id="what-h" className="text-2xl font-extrabold text-[#012858]">What we do</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {OFFER.map((o) => (
              <li key={o.href} className="group relative rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
                <h3 className="font-extrabold text-[#012858]"><Link href={o.href} className="before:absolute before:inset-0 group-hover:text-[#C90D11]">{o.title}</Link></h3>
                <p className="mt-1.5 text-sm leading-relaxed text-gray-600">{o.desc}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="trust-h" className="rounded-3xl bg-white p-6 ring-1 ring-gray-200 sm:p-8">
          <h2 id="trust-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><ShieldCheck className="h-6 w-6 text-emerald-600" aria-hidden="true" /> How we handle facts</h2>
          <ul className="mt-4 space-y-3 text-gray-700">
            {[
              "Exam dates and cut-offs on our MBA and PGDM pages link to the exam body or institute, with the date we checked them.",
              "If a date or cut-off is not officially confirmed, we say so instead of publishing a guess.",
              "We never guarantee admission, and we do not publish unsourced placement or cut-off numbers.",
              "Found a mistake? Email us and we will check and correct it.",
            ].map((t) => (
              <li key={t} className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />{t}</li>
            ))}
          </ul>
          <Link href="/editorial-policy" className="group mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#C90D11]">Read the editorial policy <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></Link>
        </section>

        <section aria-labelledby="contact-h">
          <h2 id="contact-h" className="text-2xl font-extrabold text-[#012858]">Contact</h2>
          <ul className="mt-4 space-y-2 text-gray-800">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#E0170F]" aria-hidden="true" /><a href="mailto:support@campuslelo.com" className="font-semibold hover:underline">support@campuslelo.com</a></li>
            <li className="flex items-center gap-2"><MapPin className="h-4 w-4 text-[#E0170F]" aria-hidden="true" />Pune, Maharashtra, India</li>
            <li className="flex items-center gap-2"><Headphones className="h-4 w-4 text-[#E0170F]" aria-hidden="true" /><Link href="/counselling" className="font-semibold hover:underline">Book counselling</Link></li>
          </ul>
          <p className="mt-4 text-sm text-gray-600">Journalists: see the <Link href="/press" className="font-bold text-[#012858] underline-offset-2 hover:underline">press and media kit</Link>.</p>
        </section>
      </div>
    </>
  )
}
