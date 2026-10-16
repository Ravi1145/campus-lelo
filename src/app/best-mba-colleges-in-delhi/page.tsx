import BestMbaPage, { bestMetadata } from "@/components/mba/BestMbaPage"

// Built from the NIRF 2025 data and our verified programme records (src/data/mba/bestPages.ts)
const PATH = "/best-mba-colleges-in-delhi"

export const metadata = bestMetadata(PATH)
export const revalidate = 3600

export default function Page() {
  return <BestMbaPage path={PATH} />
}
