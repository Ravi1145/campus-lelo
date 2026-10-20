import PageSchema from "@/components/seo/PageSchema"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageSchema name="AI Career Counselor" path="/ai-counselor" description="Ask an AI counsellor about Pune colleges and careers." />
      {children}
    </>
  )
}
