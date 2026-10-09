import RegionMbaPage, { regionMetadata } from "@/components/mba/RegionMbaPage"

// Generated from verified programme data — see src/data/mba/regionPages.ts
// (the earlier hand-written page, with unsourced fees and packages, is archived in docs/archive/replaced-noida-2026-10-09)
const PATH = "/mba-colleges-noida"

export const metadata = regionMetadata(PATH)
export const revalidate = 3600

export default function Page() {
  return <RegionMbaPage path={PATH} />
}
