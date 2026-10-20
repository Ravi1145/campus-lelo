import { Metadata } from "next"
import { generateMetadata as genMeta } from "@/lib/seo"
import PageSchema from "@/components/seo/PageSchema"

export const metadata: Metadata = genMeta({
  title: "Pune College Predictor 2026: MHT-CET, JEE, NEET, CAT | CampusLelo",
  description: "Free Pune college predictor 2026. Enter your MHT-CET percentile, JEE Main rank, NEET score or CAT percentile and instantly see which engineering, MBA and medical colleges in Pune you can get, based on 2020–2026 cutoff data.",
  path: "/predictor",
  keywords: [
    "pune college predictor",
    "mht cet college predictor pune 2026",
    "jee main colleges pune predictor",
    "neet college predictor pune",
    "cat college predictor pune",
    "which college will i get in pune",
    "college admission predictor pune 2026",
    "mht cet percentile to college pune",
  ],
})

export default function PredictorLayout({ children }: { children: React.ReactNode }) {
  return <>
    <PageSchema name="College Predictor" path="/predictor" description="Predict which Pune colleges your exam score can get you." />
    {children}
  </>
}
