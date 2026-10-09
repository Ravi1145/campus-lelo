import type { Metadata } from "next"
import Link from "next/link"
import { generateMetadata as genMeta, generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"
import sitemap from "@/app/sitemap"
import { colleges } from "@/data/colleges"
import { blogs } from "@/data/blogs"

export const revalidate = 3600

export const metadata: Metadata = genMeta({
  title: "Site Map: All CampusLelo Pages",
  description: "Every guide, college list, exam page and tool on CampusLelo in one place — Pune and Delhi NCR colleges, MBA and PGDM guides, exam calendars, counselling and scholarships.",
  path: "/site-map",
  keywords: ["campuslelo site map", "campuslelo pages"],
})

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

// Group rules, first match wins. Titles are generated from the URL, so a new page
// shows up here automatically the moment it is added to the XML sitemap.
const GROUPS: { title: string; test: (p: string) => boolean }[] = [
  { title: "Start here", test: (p) => ["/", "/colleges", "/mba", "/counselling", "/mba-counselling", "/ai-finder", "/compare", "/predictor", "/scholarships", "/alumni", "/exams", "/courses", "/blog", "/news", "/qa", "/events", "/placements", "/admission-guide"].includes(p) },
  { title: "MBA & PGDM", test: (p) => /mba|pgdm|^\/exams\/(cat|xat|snap|cmat|mat|nmat|atma|gmat|mah-mba-cet)/.test(p) },
  { title: "Engineering & B.Tech", test: (p) => /btech|engineering|jee|mht-cet|mechanical|computer|data-science|mtech|mca|bca|bsc-it/.test(p) },
  { title: "Medical, Law, Design & other streams", test: (p) => /medical|mbbs|neet|law|design|arts|commerce|bcom|bba|science|bsc|architecture|pharmacy/.test(p) },
  { title: "Fees, scholarships, rankings & cut-offs", test: (p) => /fee|scholarship|naac|nirf|top-|placement|cutoff|low-fee|government|private|hostel|sppu|deadline/.test(p) },
  { title: "Areas & cities", test: (p) => /noida|kothrud|hadapsar|wakad|hinjewadi|viman|aundh|baner|kharadi|nigdi|colleges-in-pune|pune/.test(p) },
]

const label = (p: string) =>
  p === "/" ? "Home" :
  p.split("/").filter(Boolean).slice(-2).join(" › ").replace(/-/g, " ").replace(/\b(\w)/g, (m) => m.toUpperCase()).replace(/\bMba\b/g, "MBA").replace(/\bPgdm\b/g, "PGDM").replace(/\bBtech\b/g, "B.Tech").replace(/\bMht Cet\b/g, "MHT-CET").replace(/\bJee\b/g, "JEE").replace(/\bNeet\b/g, "NEET").replace(/\bNaac\b/g, "NAAC").replace(/\bNirf\b/g, "NIRF").replace(/\bSppu\b/g, "SPPU").replace(/\bCat\b/g, "CAT").replace(/\bXat\b/g, "XAT").replace(/\bSnap\b/g, "SNAP").replace(/\bCmat\b/g, "CMAT").replace(/\bMat\b/g, "MAT").replace(/\bGmat\b/g, "GMAT").replace(/\bNmat\b/g, "NMAT").replace(/\bAtma\b/g, "ATMA")

export default async function SiteMapPage() {
  const entries = await sitemap()
  const paths = Array.from(new Set(entries.map((e) => new URL(e.url).pathname.replace(/\/$/, "") || "/")))

  // Detail-level pages are listed in their own sections (or reached from their parents)
  const skip = /^\/(colleges\/|cutoffs\/|compare\/|career-paths\/|courses\/|blog\/|exams\/[^/]+\/[^/]+$|colleges-in-pune\/)/
  const topLevel = paths.filter((p) => !skip.test(p) && p !== "/site-map")

  const used = new Set<string>()
  const groups = GROUPS.map((g) => {
    const items = topLevel.filter((p) => !used.has(p) && g.test(p)).sort((a, b) => a.localeCompare(b))
    items.forEach((p) => used.add(p))
    return { title: g.title, items }
  })
  const rest = topLevel.filter((p) => !used.has(p)).sort()
  if (rest.length) groups.push({ title: "More", items: rest })

  const collegeLinks = paths.filter((p) => p.startsWith("/colleges/") && p.split("/").length === 3)
  const nameOf = new Map(colleges.map((c) => [`/colleges/${c.slug}`, c.name]))
  const exams = paths.filter((p) => /^\/exams\/[^/]+$/.test(p))
  const careerPaths = paths.filter((p) => p.startsWith("/career-paths/"))
  const courses = paths.filter((p) => p.startsWith("/courses/"))
  const comparisons = paths.filter((p) => p.startsWith("/compare/"))
  const seoTopics = paths.filter((p) => p.startsWith("/colleges-in-pune/"))
  const cutoffHub = paths.filter((p) => p === "/cutoffs")

  const breadcrumb = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name: "Site map", url: "/site-map" }])

  const Section = ({ title, items, nameFor }: { title: string; items: string[]; nameFor?: (p: string) => string }) =>
    items.length === 0 ? null : (
      <section aria-label={title}>
        <h2 className="text-lg font-extrabold text-[#012858]">{title} <span className="text-sm font-medium text-gray-500">({items.length})</span></h2>
        <ul className="mt-3 grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <li key={p}><Link href={p} className="text-sm text-gray-800 underline-offset-2 hover:text-[#C90D11] hover:underline">{nameFor ? nameFor(p) : label(p)}</Link></li>
          ))}
        </ul>
      </section>
    )

  return (
    <>
      <script id="breadcrumb" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumb) }} />
      <div className="bg-rich-navy relative overflow-hidden">
        <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-14">
          <nav aria-label="Breadcrumb" className="mb-4 flex gap-1.5 text-xs text-blue-200">
            <Link href="/" className="hover:text-white">Home</Link><span aria-hidden="true">›</span><span className="text-white" aria-current="page">Site map</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">CampusLelo site map</h1>
          <p className="mt-3 max-w-2xl text-blue-100">Every guide, list and tool on the site, in one place. For search engines: the machine-readable version is at <a href={`${BASE}/sitemap.xml`} className="font-bold underline">/sitemap.xml</a>.</p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-10 px-4 py-12 sm:px-6">
        {groups.map((g) => <Section key={g.title} title={g.title} items={g.items} />)}
        <Section title="Entrance exams" items={exams} />
        <Section title="Blog and guides" items={blogs.map((b) => `/blog/${b.slug}`)} nameFor={(p) => blogs.find((b) => `/blog/${b.slug}` === p)?.title ?? label(p)} />
        <Section title="College topic lists" items={seoTopics} />
        <Section title="Course guides" items={courses} />
        <Section title="Career paths" items={careerPaths} />
        <Section title="College comparisons" items={comparisons} nameFor={(p) => label(p).replace(/ Vs /g, " vs ").split("›").pop()!.trim()} />
        <Section title="Cut-offs" items={cutoffHub} nameFor={() => "Cut-offs by exam and college"} />
        <Section title="College profiles" items={collegeLinks} nameFor={(p) => nameOf.get(p) ?? label(p)} />
      </div>
    </>
  )
}
