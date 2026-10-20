import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import PageSchema from "@/components/seo/PageSchema"

export const metadata: Metadata = genMeta({
  title: "Pune College ROI Calculator 2026: Is Your College Worth the Fees? | CampusLelo",
  description: "Calculate the return on investment for any Pune college. Enter fees, expected salary and loan details to see break-even time, net ROI and 10-year earning potential. Compare COEP, SIBM, VIT Pune and more.",
  path: "/roi-calculator",
  keywords: [
    "pune college roi calculator",
    "is engineering college worth it pune",
    "college fee vs salary pune",
    "mba roi calculator pune",
    "coep fees vs placement roi",
    "engineering college investment return pune 2026",
    "should i take education loan pune college",
  ],
})

export default function ROICalculatorLayout({ children }: { children: React.ReactNode }) {
  return <>
    <PageSchema name="College ROI Calculator" path="/roi-calculator" description="Estimate break-even and return on investment for a college." />
    {children}
  </>
}
