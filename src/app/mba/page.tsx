import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen, Briefcase, CalendarClock, GitCompare, Headphones, MapPin, Sparkles } from "lucide-react"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import { chipKeywords, hubGroups } from "@/lib/mbaKeywords"
import { mbaExams, EXAM_TOPICS } from "@/data/mba/exams"
import { blogs } from "@/data/blogs"
import type { KeywordCluster } from "@/data/mba/keywordClusters"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "MBA & PGDM Guide 2027: Exams, Colleges & Cut-offs",
  description: "Everything about MBA and PGDM admissions in India: entrance exams and dates, colleges in Pune, Noida and Delhi NCR, cut-offs, fees, placements and how to choose, sourced, not guessed.",
  path: "/mba",
  keywords: ["mba", "mba admission 2027", "pgdm admission", "mba entrance exams", "mba colleges in india", "mba guide"],
})

const SPEC_PAGES = [
  ["Marketing", "/mba-colleges-in-pune-for-marketing"], ["Finance", "/mba-colleges-in-pune-for-finance"], ["HR", "/mba-colleges-in-pune-for-hr"],
  ["Business analytics", "/mba-colleges-in-pune-for-business-analytics"], ["Data science", "/mba-colleges-in-pune-for-data-science"],
  ["Operations", "/mba-colleges-in-pune-for-operations"], ["Supply chain", "/mba-colleges-in-pune-for-supply-chain"],
  ["International business", "/mba-colleges-in-pune-for-international-business"], ["Entrepreneurship", "/mba-colleges-in-pune-for-entrepreneurship"],
] as const

const titleOf = (path: string) => blogs.find((b) => `/blog/${b.slug}` === path)?.title

function QueryChips({ c, n = 3 }: { c: KeywordCluster; n?: number }) {
  return (
    <ul className="mt-3 flex flex-wrap gap-1.5">
      {chipKeywords(c).slice(0, n).map((k) => (
        <li key={k}><span className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs text-gray-700">{k}</span></li>
      ))}
    </ul>
  )
}

function ClusterCard({ c }: { c: KeywordCluster }) {
  return (
    <li className="group relative rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
      <h3 className="text-[15px] font-extrabold leading-snug text-[#012858]">
        <Link href={c.pillar} className="before:absolute before:inset-0 group-hover:text-[#C90D11]">{c.name}</Link>
      </h3>
      <QueryChips c={c} />
    </li>
  )
}

export default function MbaHubPage() {
  const g = hubGroups()
  const guides = Array.from(new Map(g.topics.filter((c) => c.pillar.startsWith("/blog/")).map((c) => [c.pillar, c])).values())
  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "MBA & PGDM guide", url: "/mba" }])
  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://campuslelo.com/mba",
    url: "https://campuslelo.com/mba",
    name: "MBA & PGDM in India: exams, colleges, cut-offs and guides",
    inLanguage: "en-IN",
    dateModified: "2026-10-05",
    isPartOf: { "@id": "https://campuslelo.com/#website" },
    publisher: { "@type": "Organization", name: "CampusLelo", url: "https://campuslelo.com" },
  }
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MBA & PGDM guides",
    itemListElement: guides.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `https://campuslelo.com${c.pillar}`, name: titleOf(c.pillar) ?? c.name })),
  }

  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <script id="webpage" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script id="item-list" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemList) }} />

      {/* Header */}
      <div className="bg-rich-navy relative overflow-hidden">
        <div aria-hidden="true" className="tracker-grid pointer-events-none absolute inset-0 opacity-[0.12]" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-[#E0170F]/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <nav aria-label="Breadcrumb" className="hero-in mb-5 flex gap-1.5 text-xs text-blue-200" style={{ "--i": 0 } as React.CSSProperties}>
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span><span className="text-white" aria-current="page">MBA &amp; PGDM guide</span>
          </nav>
          <h1 className="hero-in max-w-3xl text-3xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl" style={{ "--i": 1 } as React.CSSProperties}>
            MBA &amp; PGDM in India: exams, colleges, cut-offs and guides
          </h1>
          <p className="hero-in mt-4 max-w-2xl text-base leading-relaxed text-blue-100 sm:text-lg" style={{ "--i": 2 } as React.CSSProperties}>
            One place to start your MBA or PGDM search. Pick your city, your exam or your question, every page links to its official sources, and we show no number we cannot verify.
          </p>
          <p className="hero-in mt-3 text-xs text-blue-200" style={{ "--i": 2 } as React.CSSProperties}>Last updated <time dateTime="2026-10-05">5 October 2026</time></p>
          <div className="hero-in mt-7 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
            <Link href="/mba-vs-pgdm" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#012858] shadow-lg transition-transform hover:-translate-y-0.5"><GitCompare className="h-4 w-4" aria-hidden="true" /> MBA vs PGDM</Link>
            <Link href="/ai-finder" className="inline-flex items-center gap-2 rounded-xl bg-[#E0170F] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-black/25 transition-transform hover:-translate-y-0.5 hover:bg-[#C90D11]"><Sparkles className="h-4 w-4" aria-hidden="true" /> Find my MBA college</Link>
            <Link href="/counselling" className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-5 py-3 text-sm font-bold text-white ring-1 ring-white/25 transition-colors hover:bg-white/20"><Headphones className="h-4 w-4" aria-hidden="true" /> Free counselling</Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-16 px-4 py-14 sm:px-6 lg:px-8">
        {/* Topic guides */}
        <section aria-labelledby="guides-h">
          <h2 id="guides-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><BookOpen className="h-6 w-6 text-[#E0170F]" aria-hidden="true" /> Guides to your biggest MBA questions</h2>
          <p className="mt-1 text-sm text-gray-600">Fees, placements, cut-offs, eligibility, admission and more, explained step by step.</p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((c) => (
              <li key={c.pillar} className="group relative rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
                <h3 className="text-base font-extrabold leading-snug text-[#012858]">
                  <Link href={c.pillar} className="before:absolute before:inset-0 group-hover:text-[#C90D11]">{titleOf(c.pillar) ?? c.name}</Link>
                </h3>
                <QueryChips c={c} n={4} />
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-[#C90D11]">Read the guide <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" /></span>
              </li>
            ))}
            <li className="group relative rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10 hover:ring-[#012858]/25">
              <h3 className="text-base font-extrabold leading-snug text-[#012858]"><Link href="/mba-vs-pgdm" className="before:absolute before:inset-0 group-hover:text-[#C90D11]">MBA vs PGDM: which is better?</Link></h3>
              <p className="mt-2 text-sm text-gray-600">Degree or diploma, approval and equivalence, what the difference means for you.</p>
            </li>
          </ul>
        </section>

        {/* Cities */}
        <section aria-labelledby="cities-h">
          <h2 id="cities-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><MapPin className="h-6 w-6 text-[#E0170F]" aria-hidden="true" /> MBA &amp; PGDM by city</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {[
              ["MBA colleges in Delhi", "/mba-colleges-in-delhi"], ["MBA colleges in Delhi NCR", "/mba-colleges-in-delhi-ncr"], ["PGDM colleges in Delhi NCR", "/pgdm-colleges-in-delhi-ncr"],
              ["MBA colleges in Greater Noida", "/mba-colleges-in-greater-noida"], ["MBA colleges in Noida", "/mba-colleges-noida"], ["MBA without CAT in Delhi NCR", "/mba-colleges-in-delhi-ncr-without-cat"],
              ["MBA colleges in Pune", "/mba-colleges-in-pune"], ["MBA cut-offs in Mumbai", "/mba-cutoff-mumbai"], ["MBA colleges in Uttar Pradesh", "/mba-colleges-in-uttar-pradesh"], ["MBA colleges in Lucknow", "/mba-colleges-in-lucknow"], ["MBA colleges in Dehradun", "/mba-colleges-in-dehradun"], ["MBA colleges in Uttarakhand", "/mba-colleges-in-uttarakhand"], ["MBA cut-offs in Noida & UP", "/mba-cutoff-uttar-pradesh"], ["IIM Kashipur cut-off", "/mba-cutoff-uttarakhand"], ["MBA admission in UP", "/blog/mba-admission-in-uttar-pradesh"], ["MBA cut-offs in Pune", "/mba-cutoff-pune"], ["CUET PG for MBA", "/blog/cuet-pg-mba-colleges-and-cutoff-explained"],
            ].map(([label, href]) => (
              <li key={href}><Link href={href} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">{label}</Link></li>
            ))}
          </ul>
          <div className="mt-6 space-y-10">
            {g.cities.map((city) => (
              <div key={city.key}>
                <h3 className="text-lg font-extrabold text-gray-900">{city.title}</h3>
                <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {city.clusters.slice(0, 6).map((c) => <ClusterCard key={c.id} c={c} />)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Exams */}
        <section aria-labelledby="exams-h">
          <h2 id="exams-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><CalendarClock className="h-6 w-6 text-[#E0170F]" aria-hidden="true" /> MBA entrance exams</h2>
          <p className="mt-1 text-sm text-gray-600">Dates, pattern, eligibility, score vs percentile, preparation and accepting colleges, each with its official source. <Link href="/mba-exam-calendar" className="font-bold text-[#C90D11] hover:underline">See all dates in one calendar →</Link> Unsure which exam or college? <Link href="/mba-counselling" className="font-bold text-[#C90D11] hover:underline">Get free MBA counselling →</Link></p>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mbaExams.map((e) => (
              <li key={e.slug} className="rounded-2xl bg-white p-5 ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-950/10">
                <h3 className="text-base font-extrabold text-[#012858]"><Link href={`/exams/${e.slug}`} className="hover:text-[#C90D11]">{e.name}</Link> <span className="text-xs font-semibold text-gray-600">— {e.frequency}</span></h3>
                <p className="mt-1 line-clamp-2 text-sm text-gray-600">{e.summary}</p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {(Object.keys(EXAM_TOPICS) as (keyof typeof EXAM_TOPICS)[]).map((t) => (
                    <li key={t}><Link href={`/exams/${e.slug}/${t}`} className="inline-block rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-800 hover:bg-[#012858] hover:text-white">{EXAM_TOPICS[t]}</Link></li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Specialisations */}
        <section aria-labelledby="spec-h">
          <h2 id="spec-h" className="flex items-center gap-2 text-2xl font-extrabold text-[#012858]"><Briefcase className="h-6 w-6 text-[#E0170F]" aria-hidden="true" /> MBA specialisations</h2>
          <p className="mt-1 text-sm text-gray-600">New to specialisations? Start with <Link href="/blog/mba-specialisations-explained" className="font-bold text-[#C90D11] hover:underline">MBA specialisations explained</Link>, then see colleges in Pune.</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {SPEC_PAGES.map(([label, href]) => (
              <li key={href}><Link href={href} className="inline-block rounded-full bg-white px-4 py-2 text-sm font-semibold text-gray-800 ring-1 ring-gray-200 transition-all hover:-translate-y-0.5 hover:text-[#012858] hover:ring-[#012858]">MBA in {label}</Link></li>
            ))}
          </ul>
        </section>

        <p className="text-center text-sm text-gray-600">
          Every fact on these pages has a source and a review date. <Link href="/editorial-policy" className="font-bold text-[#012858] underline-offset-2 hover:underline">How we verify data</Link>
        </p>
      </div>
    </>
  )
}
