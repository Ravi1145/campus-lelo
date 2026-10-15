import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"

// ── Critical above-fold sections (server-render immediately) ──────────────────
import HeroSection from "@/components/home/HeroSection"
import StartHere from "@/components/home/StartHere"
import { programAdmissions } from "@/data/mba/programAdmissions"
import { publishedCutoffs } from "@/data/mba/cutoffs"
import { mbaExams } from "@/data/mba/exams"
import BrowseByStream from "@/components/home/BrowseByStream"
import ExamGuidesBand from "@/components/home/ExamGuidesBand"
import FeaturedColleges from "@/components/home/FeaturedColleges"

// ── Below-fold sections (lazy load — don't block initial paint) ───────────────
const AIFinderBand        = dynamic(() => import("@/components/home/AIFinderBand"))
const HowItWorks          = dynamic(() => import("@/components/home/HowItWorks"))
const HomepageNewsSection = dynamic(() => import("@/components/home/HomepageNewsSection"))
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"))
const FAQSection          = dynamic(() => import("@/components/home/FAQSection"))
const GuidesScrollSection = dynamic(() => import("@/components/home/GuidesScrollSection"))
import PuneCollegeGuide from "@/components/home/PuneCollegeGuide"
import WhatIsCampusLelo from "@/components/home/WhatIsCampusLelo"
import NextSteps from "@/components/seo/NextSteps"
import { homeFaqs } from "@/data/homeFaqs"
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateLocalBusinessSchema, generateItemListSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Colleges & MBA in Pune, Noida, Delhi NCR | CampusLelo",
  description: "Compare colleges in Pune, Noida, Greater Noida and Delhi NCR by fees and entrance exams. Check MBA exam dates and cut-offs, then talk to a counsellor free.",
  path: "/",
  keywords: [
    "colleges in pune",
    "colleges in noida",
    "colleges in greater noida",
    "colleges in delhi ncr",
    "mba colleges in pune",
    "mba colleges in noida",
    "mba colleges in delhi ncr",
    "mba colleges in greater noida",
    "mba colleges in uttar pradesh",
    "mba colleges in dehradun",
    "mba cutoff delhi ncr",
    "mba entrance exam dates 2027",
    "cat 2026 exam date",
    "mba vs pgdm",
    "mba without cat",
    "engineering colleges in pune",
    "college admission pune 2026",
    "mht-cet colleges pune",
    "free college counselling",
    "mba counselling",
    "scholarships for students in india",
    "college shortlist by budget and exam score",
  ],
})

const faqData = homeFaqs.map((f) => ({ question: f.q, answer: f.a }))

const checkedDates = programAdmissions.map((p) => p.source.accessed).sort()
const latestCheck = checkedDates[checkedDates.length - 1]
const proof = {
  programmes: programAdmissions.length,
  exams: mbaExams.length,
  cutoffs: publishedCutoffs.length,
  checked: new Date(latestCheck + "T00:00:00Z").toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }),
}

export default function HomePage() {
  return (
    <>
      <script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateOrganizationSchema()) }}
      />
      <script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateWebSiteSchema()) }}
      />
      <script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateFAQSchema(faqData)) }}
      />
      <script
        id="local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateLocalBusinessSchema()) }}
      />
      <script
        id="top-colleges-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(generateItemListSchema([
          { name: "COEP Pune (College of Engineering Pune)", url: "/colleges/coep-college-of-engineering-pune" },
          { name: "SIBM Pune (Symbiosis Institute of Business Management)", url: "/colleges/sibm-symbiosis-institute-business-management-pune" },
          { name: "PICT Pune (Pune Institute of Computer Technology)", url: "/colleges/pict-pune-institute-of-computer-technology" },
          { name: "VIT Pune (Vishwakarma Institute of Technology)", url: "/colleges/vit-pune-vishwakarma-institute-of-technology" },
          { name: "SCMHRD Pune (Symbiosis Centre for Management and HRD)", url: "/colleges/scmhrd-symbiosis-centre-management-hrd" },
          { name: "MIT-WPU Pune (MIT World Peace University)", url: "/colleges/mit-wpu-mit-world-peace-university" },
        ])) }}
      />

      <div>
        {/* 1. Hero */}
        <HeroSection proof={proof} />

        {/* Tools and the proof behind them */}
        <StartHere proof={proof} />


        {/* 3. Browse by Stream */}
        <BrowseByStream />
        <ExamGuidesBand />

        {/* 4. Featured Colleges */}
        <FeaturedColleges />


        {/* 6. AI Finder band */}
        <AIFinderBand />

        {/* 7. How it works */}
        <HowItWorks />

        {/* Latest blog posts and the admission calendar */}
        <HomepageNewsSection />

        {/* Comparison tools and counselling (free call, video session) */}
        <TestimonialsSection />




        {/* 11. FAQ + Final CTA */}
        <FAQSection />

        {/* College guides and insights */}
        <GuidesScrollSection />


        {/* 13. Pune College Guide — SEO link hub + keyword-rich text */}
        <WhatIsCampusLelo />
        <PuneCollegeGuide />

        {/* 14. Explore: plain links to sections that otherwise have few inbound links */}
        <NextSteps
          title="Explore CampusLelo"
          steps={[
            { href: "/colleges-in-pune", label: "Colleges in Pune" },
            { href: "/colleges-in-noida", label: "Colleges in Noida" },
            { href: "/colleges-in-greater-noida", label: "Colleges in Greater Noida" },
            { href: "/career-paths", label: "Career paths" },
            { href: "/courses", label: "Courses" },
            { href: "/blog", label: "Blog and guides" },
            { href: "/exams", label: "Entrance exams" },
            { href: "/events", label: "Admission events" },
            { href: "/news", label: "Admission news" },
            { href: "/qa", label: "Student Q&A" },
            { href: "/ask", label: "Ask a question" },
            { href: "/ai-counselor", label: "AI career counsellor" },
            { href: "/ai-finder", label: "AI college finder" },
            { href: "/predictor", label: "College predictor" },
            { href: "/career-quiz", label: "Career quiz" },
            { href: "/career-types", label: "Career interest types" },
            { href: "/my-admission-plan", label: "My admission plan" },
            { href: "/mba-cutoff-checker", label: "MBA cut-off checker" },
            { href: "/mba-exam-acceptance", label: "MBA exam acceptance table" },
            { href: "/compare", label: "Compare colleges" },
            { href: "/roi-calculator", label: "Degree ROI calculator" },
            { href: "/about", label: "About CampusLelo" },
            { href: "/press", label: "Press kit" },
            { href: "/site-map", label: "Site map" },
          ]}
        />
      </div>
    </>
  )
}
