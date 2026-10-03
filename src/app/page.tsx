import { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"
import dynamic from "next/dynamic"

// ── Critical above-fold sections (server-render immediately) ──────────────────
import HeroSection from "@/components/home/HeroSection"
import CollegeMarquee from "@/components/home/CollegeMarquee"
import BrowseByStream from "@/components/home/BrowseByStream"
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
import QuickAnswer from "@/components/seo/QuickAnswer"
import { generateMetadata as genMeta, generateOrganizationSchema, generateWebSiteSchema, generateFAQSchema, generateLocalBusinessSchema, generateItemListSchema } from "@/lib/seo"

export const metadata: Metadata = genMeta({
  title: "Best Colleges in Pune 2026 | Rankings, Fees & Reviews | CampusLelo",
  description: "Compare 100+ colleges in Pune — COEP (NIRF #49), SIBM (NIRF #13), AFMC (NIRF #4). Fees ₹15K–25L/yr, placements up to ₹65 LPA. Free AI counsellor for 2026 admissions.",
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
  { question: "Which is the best BTech college in Pune in 2026?", answer: "COEP (College of Engineering Pune) is the best B.Tech college in Pune in 2026 — NIRF Rank 49, NAAC A+, fees ₹80K–1.8L/yr, average placement ₹12 LPA, highest ₹45 LPA. MHT-CET cutoff: 97+ percentile for CSE. Followed by PICT (best for CS/IT), VIT Pune (NIRF #101), and SIT Pune (₹9.8 LPA avg placement)." },
  { question: "What is the best MBA college in Pune in 2026?", answer: "SIBM Pune (Symbiosis Institute of Business Management) is the best MBA college in Pune with NIRF Rank 13 and average placement of ₹28 LPA. Admission via SNAP 2026 (60+ percentile). Fees: ₹16–22L total. Recruiters include McKinsey, BCG, Deloitte, and P&G." },
  { question: "Which is the best medical college in Pune?", answer: "AFMC Pune (NIRF Rank 4, NAAC A++) is the best medical college in Pune with near-zero fees (₹50,000 total). Requires 650+ NEET score + AFMC entrance test. BJ Medical College (NIRF #18) is the best government option for state quota at 625+ NEET score and fees ₹60K–1.2L/yr." },
  { question: "What are the fees for engineering colleges in Pune 2026?", answer: "Engineering fees in Pune 2026: Government (COEP) ₹80K–1.8L/yr; Autonomous private (PICT, VIT Pune) ₹1.4L–2.2L/yr; Deemed universities (SIT Pune, MIT-WPU) ₹2L–4.8L/yr; Private colleges ₹95K–1.7L/yr. SC/ST/OBC categories get full fee waiver/concession at government colleges under EBC and government scholarship schemes." },
  { question: "What entrance exam is required for Pune colleges in 2026?", answer: "MHT-CET 2026 (April–May) for engineering at SPPU-affiliated colleges; JEE Main 2026 for COEP, SIT, MIT-WPU; NEET 2026 (May 3) for AFMC and BJ Medical College; CAT 2026 (November) and SNAP 2026 (December) for MBA at SIBM Pune; SET 2026 (May) for Symbiosis programs." },
  { question: "Which Pune college has the highest placement package in 2026?", answer: "SIBM Pune leads with ₹28 LPA average MBA placement and McKinsey/BCG offers. For engineering, COEP has the highest average (₹12 LPA) with individual offers reaching ₹45 LPA from Goldman Sachs and Google. PICT's CS branch sees highest median salary of ₹10 LPA with product company offers reaching ₹40+ LPA." },
  { question: "How to get admission in COEP Pune 2026?", answer: "For COEP Pune 2026 admission: Score 97+ percentile in MHT-CET (April–May 2026) or qualify JEE Main Session 1/2. Register on MHT-CET CAP portal after results (June 2026). Fill document verification at facilitation centre. Choose COEP in preference list during CAP Round 1 (July 2026). COEP is a government college — fees are just ₹80,000–1.8L/year." },
  { question: "What is the difference between COEP, PICT, and VIT Pune?", answer: "COEP: Government, NIRF #49, NAAC A+, fees ₹80K–1.8L/yr, avg placement ₹12 LPA — best overall value. PICT: Autonomous private, NAAC A, fees ₹1.4L–1.9L/yr, avg placement ₹7.5 LPA — best for CS/IT focus. VIT Pune: Autonomous, NIRF #101, NAAC A+, fees ₹1.6L–2.2L/yr, avg placement ₹8.5 LPA — best for Mechanical and Electronics. For CS/IT, COEP > PICT > VIT Pune. For Mechanical, COEP > VIT Pune > JSPM." },
  { question: "Which is the No. 1 college in Pune in 2026?", answer: "AFMC (Armed Forces Medical College) holds the highest NIRF rank among Pune colleges at #4 nationally. Among engineering colleges, COEP is #1 in Pune (NIRF #49). Among MBA colleges, SIBM Pune is #1 (NIRF #13). For arts and science, Fergusson College (Est. 1885) is the most prestigious. For design, Symbiosis Institute of Design (SID) is ranked among India's top 5." },
  { question: "Which colleges in Pune are NAAC A+ accredited in 2026?", answer: "NAAC A+ colleges in Pune (2026): AFMC (A++), COEP, MIT-WPU, SIT Pune (Symbiosis), VIT Pune, Cummins College, Fergusson College, SP College, Garware College, SIBM Pune, SID (Symbiosis Institute of Design), and MIT-ADT University. NAAC A+ is the second-highest grade and indicates excellent academic quality, infrastructure, and student outcomes." },
  { question: "When does college admission start in Pune for 2026?", answer: "Pune college admissions 2026 timeline: MHT-CET exam — April 20–May 15, 2026. NEET — May 3, 2026. MHT-CET results — June 2026. CAP Round 1 (engineering) — July 2026. Arts, Commerce, Science (CUET-based) — June–July 2026. MBA (CAT/SNAP-based) — December 2026 for the 2027 batch. Direct admissions (management quota) open in July–August 2026 after CAP rounds." },
  { question: "Which colleges in Pune have hostel facilities in 2026?", answer: "Top Pune colleges with hostel in 2026: COEP (₹55K–70K/yr), VIT Pune (₹80K–1L/yr), SIT Pune (₹1.1L–1.4L/yr), MIT-WPU (₹90K–1.2L/yr), SIBM Pune MBA (₹1.2L–1.6L/yr), AFMC (free hostel for all students), BJ Medical College (₹60K–75K/yr), Fergusson College (₹40K–55K/yr), SMCW (₹1.85L/yr, mandatory for outstation). Apply immediately after admission — government college hostels fill within days." },
  { question: "What is the cheapest college in Pune for engineering in 2026?", answer: "The cheapest engineering colleges in Pune 2026: COEP (₹80,000/year — government), AISSMS COE (₹1.1L/year), JSPM RSCOE (₹1.2L/year), Indira College of Engineering (₹95K/year). SC/ST/OBC students at government colleges get full fee waiver through state government scholarships. EBC (Economically Backward Class) scholarship available for annual family income below ₹8 lakh." },
  { question: "Which areas of Pune have the most colleges?", answer: "Major college hubs in Pune 2026: Shivajinagar / Deccan — COEP, SP College, Fergusson College, Garware College. Katraj / Dhankawadi — PICT, Sinhgad COE. Bibwewadi — VIT Pune. Akurdi / Pimpri-Chinchwad — DY Patil Engineering, AISSMS. Lavale / Mulshi — Symbiosis campus (SIBM, SIT, SID, SMCW). Alandi — MIT-ADT campus (MITAOE, MIT ACS). Hadapsar / Loni Kalbhor — MIT-ID, MITWPU satellite. Erandwane — SCACS, other Sinhgad colleges." },
]

export default function HomePage() {
  return (
    <>
      <Script
        id="org-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateOrganizationSchema()) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateWebSiteSchema()) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqData)) }}
      />
      <Script
        id="local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      <Script
        id="top-colleges-list"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateItemListSchema([
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

      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* AEO Quick Answer — featured snippet target for "best college in pune" queries */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <QuickAnswer
            question="Which is the best college in Pune in 2026?"
            answer="COEP (College of Engineering Pune) is the best engineering college in Pune — NIRF #49, NAAC A+, government college with fees ₹80K–1.8L/yr and average placement ₹12 LPA. For MBA, SIBM Pune (NIRF #13, avg ₹28 LPA) is the top choice. For medicine, AFMC Pune (NIRF #4) is the highest-ranked college overall in Pune."
            note="Based on NIRF 2025 rankings and 2024–25 placement reports. Updated October 2026."
          />
        </div>

        {/* 2. Trust strip — partner college marquee */}
        <CollegeMarquee />

        {/* 3. Browse by Stream */}
        <BrowseByStream />

        {/* 4. Featured Colleges */}
        <FeaturedColleges />

        {/* 5. Featured Courses */}
        <FeaturedCourses />

        {/* 6. AI Finder band */}
        <AIFinderBand />

        {/* 7. How it works */}
        <HowItWorks />

        {/* 8. Exams & Deadlines */}
        <ExamCalendar />
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
        <PuneCollegeGuide />
      </main>
    </>
  )
}
