import PageSchema from "@/components/seo/PageSchema"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema name="AI College Finder" path="/ai-finder" description="Answer a few questions and get a shortlist of Pune colleges." />
      {children}
    </>
  )
}
