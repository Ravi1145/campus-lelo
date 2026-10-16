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
import FeaturedCourses from "@/components/home/FeaturedCourses"

// ── Below-fold sections (lazy load — don't block initial paint) ───────────────
const AIFinderBand        = dynamic(() => import("@/components/home/AIFinderBand"))
const HowItWorks          = dynamic(() => import("@/components/home/HowItWorks"))
const HomepageNewsSection = dynamic(() => import("@/components/home/HomepageNewsSection"))
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"))
const FAQSection          = dynamic(() => import("@/components/home/FAQSection"))
import NextSteps from "@/components/seo/NextSteps"
import WhatIsCampusLelo from "@/components/home/WhatIsCampusLelo"
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

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
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
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd({
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${BASE_URL}/#webpage`,
          url: BASE_URL,
          name: "Colleges and MBA in Pune, Noida and Delhi NCR | CampusLelo",
          description: "Compare colleges in Pune, Noida, Greater Noida and Delhi NCR by fees and entrance exams. MBA exam dates and cut-offs link to official sources.",
          inLanguage: "en-IN",
          dateModified: latestCheck,
          isPartOf: { "@id": `${BASE_URL}/#website` },
          publisher: { "@id": `${BASE_URL}/#organization` },
          speakable: { "@type": "SpeakableSpecification", cssSelector: ["#hero-heading", "#what-is-q", ".quick-answer"] },
        }) }}
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
        <FeaturedCourses />
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


        {/* A short, self-contained answer to "What is CampusLelo?" (what assistants and snippets quote) */}
        <WhatIsCampusLelo />

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
            { href: "/psychometric-test", label: "Psychometric test" },
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
        <details className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
          <summary className="inline-flex min-h-11 cursor-pointer items-center rounded-full bg-white px-5 text-sm font-bold text-[#012858] ring-1 ring-gray-200 hover:ring-[#012858]">Browse every city, exam and course guide</summary>
          <NextSteps
            title="City, exam and course guides"
            steps={[
              { href: "/mba", label: "MBA and PGDM guide" },
              { href: "/fms-delhi-cat-cutoff", label: "FMS Delhi CAT cutoff" },
              { href: "/iift-cat-cutoff", label: "IIFT CAT cutoff" },
              { href: "/mdi-gurgaon-pgdm-admission", label: "MDI Gurgaon PGDM admission" },
              { href: "/admission-guide", label: "Pune admission guide" },
              { href: "/engineering-colleges-pune", label: "Engineering colleges in Pune" },
              { href: "/mba-colleges-in-pune", label: "MBA colleges in Pune" },
              { href: "/medical-colleges-pune", label: "Medical colleges in Pune" },
              { href: "/law-colleges-pune", label: "Law colleges in Pune" },
              { href: "/design-colleges-pune", label: "Design colleges in Pune" },
              { href: "/bba-colleges-pune", label: "BBA colleges in Pune" },
              { href: "/bca-colleges-pune", label: "BCA colleges in Pune" },
              { href: "/arts-colleges-pune", label: "Arts colleges in Pune" },
              { href: "/government-colleges-pune", label: "Government colleges in Pune" },
              { href: "/naac-a-plus-colleges-pune", label: "NAAC A+ colleges in Pune" },
              { href: "/colleges-in-pune-with-hostel", label: "Colleges with hostel in Pune" },
              { href: "/mht-cet-colleges-pune", label: "MHT-CET colleges" },
              { href: "/jee-main-colleges-pune", label: "JEE Main colleges" },
              { href: "/neet-colleges-pune", label: "NEET colleges" },
              { href: "/mba-colleges-in-pune-accepting-cat", label: "MBA colleges accepting CAT" },
              { href: "/mba-colleges-in-pune-accepting-snap", label: "MBA colleges accepting SNAP" },
              { href: "/mba-colleges-in-pune-accepting-mh-cet", label: "MBA colleges accepting MAH-CET" },
              { href: "/mba-colleges-in-delhi-ncr", label: "MBA colleges in Delhi NCR" },
              { href: "/mba-colleges-noida", label: "MBA colleges in Noida" },
              { href: "/mba-colleges-in-greater-noida", label: "MBA colleges in Greater Noida" },
              { href: "/pgdm-colleges-noida", label: "PGDM colleges in Noida" },
              { href: "/engineering-colleges-noida", label: "Engineering colleges in Noida" },
              { href: "/mba-colleges-in-uttar-pradesh", label: "MBA colleges in Uttar Pradesh" },
              { href: "/mba-colleges-in-dehradun", label: "MBA colleges in Dehradun" },
              { href: "/scholarships", label: "Scholarships" },
              { href: "/pune-college-fees-calculator", label: "Fees calculator" },
              { href: "/pune-admission-deadline-tracker-2026", label: "Admission deadline tracker" },
            ]}
          />
        </details>
      </div>
    </>
  )
}
