import { Metadata } from "next"
import Link from "next/link"
import dynamic from "next/dynamic"

// ── Critical above-fold sections (server-render immediately) ──────────────────
import HeroSection from "@/components/home/HeroSection"
import CollegeMarquee from "@/components/home/CollegeMarquee"
import BrowseByStream from "@/components/home/BrowseByStream"
import ExamGuidesBand from "@/components/home/ExamGuidesBand"
import FeaturedColleges from "@/components/home/FeaturedColleges"

// ── Below-fold sections (lazy load — don't block initial paint) ───────────────
const FeaturedCourses     = dynamic(() => import("@/components/home/FeaturedCourses"))
const AIFinderBand        = dynamic(() => import("@/components/home/AIFinderBand"))
const HowItWorks          = dynamic(() => import("@/components/home/HowItWorks"))
const ExamCalendar        = dynamic(() => import("@/components/home/ExamCalendar"))
const HomepageNewsSection = dynamic(() => import("@/components/home/HomepageNewsSection"))
const TestimonialsSection = dynamic(() => import("@/components/home/TestimonialsSection"))
const RankingTables       = dynamic(() => import("@/components/home/RankingTables"))
const FAQSection          = dynamic(() => import("@/components/home/FAQSection"))
const GuidesScrollSection = dynamic(() => import("@/components/home/GuidesScrollSection"))
import PuneCollegeGuide from "@/components/home/PuneCollegeGuide"
import WhatIsCampusLelo from "@/components/home/WhatIsCampusLelo"
import NextSteps from "@/components/seo/NextSteps"
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateLocalBusinessSchema, generateItemListSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Pune 2026 | Rankings, Fees & Reviews | CampusLelo",
  description: "Compare 100+ colleges in Pune by fees, courses, exams and cut-offs. Sourced MBA exam dates, free shortlist and counselling for 2026–27 admissions.",
  path: "/",
  keywords: [
    "colleges in pune 2026",
    "best college in pune 2026",
    "top colleges in pune 2026",
    "top 10 colleges in pune 2026",
    "best engineering college in pune 2026",
    "best btech college in pune 2026",
    "best mba college in pune 2026",
    "best medical college in pune 2026",
    "top engineering colleges pune 2026",
    "engineering colleges in pune",
    "colleges in pune with fees 2026",
    "pune college list 2026",
    "pune university colleges list 2026",
    "naac a+ colleges in pune 2026",
    "nirf ranked colleges pune 2026",
    "government colleges in pune 2026",
    "private colleges in pune 2026",
    "college admission pune 2026",
    "mht-cet colleges pune 2026",
    "low fee colleges pune 2026",
    "coep pune admission 2026",
    "sibm pune 2026",
    "government engineering college pune",
    "sppu affiliated colleges 2026",
    "colleges in pune with hostel 2026",
    "bca colleges in pune 2026",
    "bba colleges in pune 2026",
    "design colleges in pune 2026",
    "direct admission colleges pune 2026",
  ],
})

const faqData = [
  { question: "What are the fees for engineering colleges in Pune 2026?", answer: "Engineering fees in Pune 2026: Government (COEP) ₹80K–1.8L/yr; Autonomous private (PICT, VIT Pune) ₹1.4L–2.2L/yr; Deemed universities (SIT Pune, MIT-WPU) ₹2L–4.8L/yr; Private colleges ₹95K–1.7L/yr. SC/ST/OBC categories get full fee waiver/concession at government colleges under EBC and government scholarship schemes." },
  { question: "What entrance exam is required for Pune colleges in 2026?", answer: "MHT-CET 2026 (April–May) for engineering at SPPU-affiliated colleges; JEE Main 2026 for COEP, SIT, MIT-WPU; NEET 2026 (May 3) for AFMC and BJ Medical College; CAT 2026 (November) and SNAP 2026 (December) for MBA at SIBM Pune; SET 2026 (May) for Symbiosis programs." },
  { question: "How to get admission in COEP Pune 2026?", answer: "For COEP Pune 2026 admission: Score 97+ percentile in MHT-CET (April–May 2026) or qualify JEE Main Session 1/2. Register on MHT-CET CAP portal after results (June 2026). Fill document verification at facilitation centre. Choose COEP in preference list during CAP Round 1 (July 2026). COEP is a government college — fees are just ₹80,000–1.8L/year." },
  { question: "Which colleges in Pune are NAAC A+ accredited in 2026?", answer: "NAAC A+ colleges in Pune (2026): AFMC (A++), COEP, MIT-WPU, SIT Pune (Symbiosis), VIT Pune, Cummins College, Fergusson College, SP College, Garware College, SIBM Pune, SID (Symbiosis Institute of Design), and MIT-ADT University. NAAC A+ is the second-highest grade and indicates excellent academic quality, infrastructure, and student outcomes." },
  { question: "When does college admission start in Pune for 2026?", answer: "Pune college admissions 2026 timeline: MHT-CET exam — April 20–May 15, 2026. NEET — May 3, 2026. MHT-CET results — June 2026. CAP Round 1 (engineering) — July 2026. Arts, Commerce, Science (CUET-based) — June–July 2026. MBA (CAT/SNAP-based) — December 2026 for the 2027 batch. Direct admissions (management quota) open in July–August 2026 after CAP rounds." },
  { question: "Which colleges in Pune have hostel facilities in 2026?", answer: "Top Pune colleges with hostel in 2026: COEP (₹55K–70K/yr), VIT Pune (₹80K–1L/yr), SIT Pune (₹1.1L–1.4L/yr), MIT-WPU (₹90K–1.2L/yr), SIBM Pune MBA (₹1.2L–1.6L/yr), AFMC (free hostel for all students), BJ Medical College (₹60K–75K/yr), Fergusson College (₹40K–55K/yr), SMCW (₹1.85L/yr, mandatory for outstation). Apply immediately after admission — government college hostels fill within days." },
  { question: "What is the cheapest college in Pune for engineering in 2026?", answer: "The cheapest engineering colleges in Pune 2026: COEP (₹80,000/year — government), AISSMS COE (₹1.1L/year), JSPM RSCOE (₹1.2L/year), Indira College of Engineering (₹95K/year). SC/ST/OBC students at government colleges get full fee waiver through state government scholarships. EBC (Economically Backward Class) scholarship available for annual family income below ₹8 lakh." },
  { question: "Which areas of Pune have the most colleges?", answer: "Major college hubs in Pune 2026: Shivajinagar / Deccan — COEP, SP College, Fergusson College, Garware College. Katraj / Dhankawadi — PICT, Sinhgad COE. Bibwewadi — VIT Pune. Akurdi / Pimpri-Chinchwad — DY Patil Engineering, AISSMS. Lavale / Mulshi — Symbiosis campus (SIBM, SIT, SID, SMCW). Alandi — MIT-ADT campus (MITAOE, MIT ACS). Hadapsar / Loni Kalbhor — MIT-ID, MITWPU satellite. Erandwane — SCACS, other Sinhgad colleges." },
]

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
          { name: "COEP Pune — College of Engineering Pune", url: "/colleges/coep-pune" },
          { name: "SIBM Pune — Symbiosis Institute of Business Management", url: "/colleges/sibm-pune" },
          { name: "AFMC Pune — Armed Forces Medical College", url: "/colleges/afmc-pune" },
          { name: "PICT Pune — Pune Institute of Computer Technology", url: "/colleges/pict-pune" },
          { name: "VIT Pune — Vishwakarma Institute of Technology", url: "/colleges/vit-pune" },
          { name: "SIT Pune — Symbiosis Institute of Technology", url: "/colleges/sit-pune" },
          { name: "SCMHRD Pune — Symbiosis Centre for Management and HRD", url: "/colleges/scmhrd-pune" },
          { name: "MIT-WPU Pune — MIT World Peace University", url: "/colleges/mit-wpu-pune" },
          { name: "PUMBA Pune — Department of Management Sciences", url: "/colleges/pumba-pune" },
          { name: "BJ Medical College Pune", url: "/colleges/bj-medical-college-pune" },
        ])) }}
      />

      <div>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Trust strip — partner college marquee */}
        <CollegeMarquee />

        {/* 3. Browse by Stream */}
        <BrowseByStream />
        <ExamGuidesBand />

        {/* 4. Featured Colleges */}
        <FeaturedColleges />

        {/* 5. Featured Courses */}
        <FeaturedCourses />

        {/* 6. AI Finder band */}
        <AIFinderBand />

        {/* 7. How it works */}
        <HowItWorks />

        {/* 8. Exams & Deadlines */}
        <ExamCalendar generatedAt={Date.now()} />
        <HomepageNewsSection />

        {/* 9. Social proof */}
        <TestimonialsSection />

        {/* 10. NIRF rankings */}
        <RankingTables />

        {/* 11. FAQ + Final CTA */}
        <FAQSection />

        {/* 12. Guides */}
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
            { href: "/events", label: "Admission events" },
            { href: "/news", label: "Admission news" },
            { href: "/qa", label: "Student Q&A" },
            { href: "/ask", label: "Ask a question" },
            { href: "/ai-counselor", label: "AI career counsellor" },
            { href: "/ai-finder", label: "AI college finder" },
            { href: "/predictor", label: "College predictor" },
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
