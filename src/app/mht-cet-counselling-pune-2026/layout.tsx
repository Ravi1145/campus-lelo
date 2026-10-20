import PageSchema from "@/components/seo/PageSchema"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema name="MHT-CET counselling Pune 2026" path="/mht-cet-counselling-pune-2026" description="Guide to MHT-CET counselling for Pune colleges." />
      {children}
    </>
  )
}
