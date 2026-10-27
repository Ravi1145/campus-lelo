import RegionMbaPage, { regionMetadata } from "@/components/mba/RegionMbaPage"

// Generated from verified programme data: see src/data/mba/regionPages.ts
const PATH = "/mba-colleges-in-delhi-without-cat"

export const metadata = regionMetadata(PATH)
export const revalidate = 3600

export default function Page() {
  return <RegionMbaPage path={PATH} />
}
