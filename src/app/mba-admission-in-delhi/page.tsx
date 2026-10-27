import DelhiAdmissionPage, { delhiAdmissionMetadata } from "@/components/mba/DelhiAdmissionPage"

// Built from verified programme records: see src/components/mba/DelhiAdmissionPage.tsx
export const metadata = delhiAdmissionMetadata("mba")
export const revalidate = 3600

export default function Page() {
  return <DelhiAdmissionPage kind="mba" />
}
