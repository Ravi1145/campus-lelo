import FeaturedInstitutesTabs, { type FeaturedRow } from "./FeaturedInstitutesTabs"
import { nirf2025Management } from "@/data/mba/nirf2025"
import { nirf2025Engineering, nirf2025Medical, nirf2025Law, NIRF_CATEGORY_URL } from "@/data/mba/nirf2025Top"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { getMbaExam } from "@/data/mba/exams"

// Home-page "top colleges" block: the institutes NIRF 2025 ranks highest in each field, copied as published.
// Server component, so every tab's list is in the HTML for crawlers. Only management rows can show exams,
// and only where we have a verified programme record. Nothing here is re-ranked or estimated.

const examName = (slug: string) => getMbaExam(slug)?.name ?? slug.toUpperCase()
const byId = new Map(programAdmissions.map((p) => [p.id, p]))

const management: FeaturedRow[] = nirf2025Management.slice(0, 12).map((r) => {
  const rec = r.programId ? byId.get(r.programId) : undefined
  return {
    rank: r.rank, name: r.name, city: r.city, state: r.state, score: r.score,
    href: rec ? `/mba-admission/${rec.id}` : undefined,
    detail: rec && rec.examsAccepted.length ? `Exams: ${rec.examsAccepted.slice(0, 4).map(examName).join(", ")}` : undefined,
  }
})
const plain = (rows: { rank: number; name: string; city: string; state: string; score: number }[]): FeaturedRow[] => rows.map((r) => ({ ...r }))

export default function FeaturedColleges() {
  return (
    <FeaturedInstitutesTabs
      tabs={[
        { id: "mba", label: "MBA & PGDM", rows: management, source: NIRF_CATEGORY_URL.Management, more: { href: "/best-mba-colleges-in-india", label: "Best MBA colleges in India" } },
        { id: "eng", label: "Engineering", rows: plain(nirf2025Engineering), source: NIRF_CATEGORY_URL.Engineering },
        { id: "med", label: "Medical", rows: plain(nirf2025Medical), source: NIRF_CATEGORY_URL.Medical },
        { id: "law", label: "Law", rows: plain(nirf2025Law), source: NIRF_CATEGORY_URL.Law },
      ]}
      regions={[
        { href: "/best-mba-colleges-in-delhi", label: "Delhi" },
        { href: "/best-mba-colleges-in-noida", label: "Noida" },
        { href: "/best-mba-colleges-in-greater-noida", label: "Greater Noida" },
        { href: "/best-mba-colleges-in-uttar-pradesh", label: "Uttar Pradesh" },
        { href: "/best-mba-colleges-in-uttarakhand", label: "Uttarakhand" },
        { href: "/best-mba-colleges-in-haryana", label: "Haryana" },
        { href: "/best-mba-colleges-in-maharashtra", label: "Maharashtra" },
      ]}
    />
  )
}
