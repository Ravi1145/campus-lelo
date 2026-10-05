import CityExamCollegesPage, { cityExamMetadata } from "@/components/mba/CityExamCollegesPage"

// Built from verified programme data — see src/data/mba/programAdmissions.ts.
// Previous version (with unsourced cut-offs) archived in docs/archive/replaced-pages-2026-10-04/.
const PATH = "/mba-colleges-in-pune-accepting-mh-cet"

export const metadata = cityExamMetadata("mah-mba-cet", "Pune", PATH)
export const revalidate = 3600

export default function Page() {
  return <CityExamCollegesPage examSlug="mah-mba-cet" city="Pune" path={PATH} />
}
