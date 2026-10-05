import CityExamCollegesPage, { cityExamMetadata } from "@/components/mba/CityExamCollegesPage"

// Built from verified programme data — see src/data/mba/programAdmissions.ts.
// Previous version (with unsourced cut-offs) archived in docs/archive/replaced-pages-2026-10-04/.
const PATH = "/mba-colleges-in-pune-accepting-xat"

export const metadata = cityExamMetadata("xat", "Pune", PATH)
export const revalidate = 3600

export default function Page() {
  return <CityExamCollegesPage examSlug="xat" city="Pune" path={PATH} />
}
