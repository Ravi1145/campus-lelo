import CityExamCollegesPage, { cityExamMetadata } from "@/components/mba/CityExamCollegesPage"

// Built from verified programme data — see src/data/mba/programAdmissions.ts.
// Previous version (with unsourced cut-offs) archived in docs/archive/replaced-pages-2026-10-04/.
const PATH = "/mba-colleges-in-pune-accepting-snap"

export const metadata = cityExamMetadata("snap", "Pune", PATH)
export const revalidate = 3600

export default function Page() {
  return <CityExamCollegesPage examSlug="snap" city="Pune" path={PATH} />
}
