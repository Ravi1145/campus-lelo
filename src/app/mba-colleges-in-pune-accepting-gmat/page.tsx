import CityExamCollegesPage, { cityExamMetadata } from "@/components/mba/CityExamCollegesPage"

// Built from verified programme data — see src/data/mba/programAdmissions.ts.
// Previous version (with unsourced cut-offs) archived in docs/archive/replaced-pages-2026-10-04/.
const PATH = "/mba-colleges-in-pune-accepting-gmat"

export const metadata = cityExamMetadata("gmat", "Pune", PATH)
export const revalidate = 3600

export default function Page() {
  return <CityExamCollegesPage examSlug="gmat" city="Pune" path={PATH} />
}
