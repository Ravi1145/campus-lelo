import MoreInCluster from "@/components/seo/MoreInCluster"
import type { Metadata } from "next"
import { generateMetadata as genMeta, generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo"
import SEOLandingPage from "@/components/seo/SEOLandingPage"
import { safeJsonLd } from "@/lib/jsonld"

export const metadata: Metadata = genMeta({
  title: "Computer Engineering Colleges in Pune 2026 | CS/IT BTech Admission",
  description: "Best computer engineering colleges in Pune 2026. Free admission guidance.",
  path: "/computer-engineering-colleges-pune",
  keywords: ["computer engineering colleges pune", "cs colleges pune", "it engineering colleges pune 2026", "best cs college pune"],
})

export const revalidate = 300

const colleges = [
  { name: "Pune Institute of Computer Technology (PICT)", location: "Dhankawadi", naac: "A", fees: "₹1.4L-1.9L/yr", placement: "Not published", slug: "pict-pune-institute-of-computer-technology" },
  { name: "College of Engineering Pune (COEP) - CSE", location: "Shivajinagar", naac: "A+", fees: "₹80K-1.8L/yr", placement: "Not published", slug: "coep-college-of-engineering-pune" },
  { name: "Vishwakarma Institute of Technology (VIT Pune)", location: "Bibwewadi", naac: "A+", fees: "₹1.6L-2.2L/yr", placement: "Not published", slug: "vit-pune-vishwakarma-institute-of-technology" },
  { name: "Symbiosis Institute of Technology (SIT)", location: "Lavale", naac: "A+", fees: "₹3.6L-4.8L/yr", placement: "Not published", slug: "symbiosis-institute-of-technology-pune" },
  { name: "MIT World Peace University - CSE/AIML", location: "Kothrud", naac: "A+", fees: "₹2.0L-3.8L/yr", placement: "Not published", slug: "mit-wpu-mit-world-peace-university" },
  { name: "Cummins College of Engineering for Women", location: "Karvenagar", naac: "A+", fees: "₹1.3L-1.75L/yr", placement: "Not published", slug: "cummins-college-of-engineering-pune" },
  { name: "JSPM RSCOE - Computer Engineering", location: "Tathawade", naac: "A", fees: "₹1.2L-1.7L/yr", placement: "Not published", slug: "jspm-rscoe-rajarshi-shahu-college-of-engineering" },
  { name: "AISSMS College of Engineering - CS/IT", location: "Kennedy Road", naac: "A", fees: "₹1.1L-1.55L/yr", placement: "Not published", slug: "aissms-college-of-engineering-pune" },
]

const faqs = [
  { q: "What is the MHT-CET cutoff for computer engineering in Pune?", a: "COEP CSE requires 99.5+ percentile. PICT requires 95-97 percentile. VIT Pune CS requires 88-92 percentile. MIT-WPU CS/AIML requires 75-85 percentile. JSPM RSCOE accepts 60-70 percentile for CS." },
  { q: "Is there any college in Pune that specializes only in computer engineering?", a: "Yes, PICT (Pune Institute of Computer Technology) is exclusively a computer and IT engineering college. It offers only CS, IT, and related branches, making it the most specialized CS college in Pune with exceptional industry connections." },
  { q: "What new CS specializations are available in Pune colleges for 2026?", a: "For 2026, several Pune colleges offer specialized CS branches: AI & Machine Learning (MIT-WPU, SIT Pune), Data Science (VIT Pune, MIT-WPU), Cyber Security (COEP, VIT Pune), Cloud Computing, and IoT Engineering. These have slightly lower cutoffs than core CSE." },
]

export default function ComputerEngineeringCollegesPunePage() {
  const faqSchema = generateFAQSchema(faqs.map(f => ({ question: f.q, answer: f.a })))
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Computer Engineering Colleges Pune", url: "/computer-engineering-colleges-pune" },
  ])
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Computer Engineering Colleges in Pune 2026",
    numberOfItems: colleges.length,
    itemListElement: colleges.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"}/colleges/${c.slug}`,
    })),
  }

  return (
    <>
      <script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(faqSchema) }} />
      <script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(breadcrumbSchema) }} />
      <script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(itemListSchema) }} />
      <SEOLandingPage
        breadcrumb={[{ label: "Computer Engineering Colleges in Pune", href: "/computer-engineering-colleges-pune" }]}
        h1="Computer Engineering Colleges in Pune 2026"
        subtitle="Find the best CS, IT, and AI/ML engineering colleges in Pune. Compare MHT-CET cutoffs, fees, placement packages, and new specializations for 2026 admission."
        heroStats={[
          { value: "25+", label: "CS/IT Colleges" },
          { value: "98%+", label: "Best Placement Rate" },
          { value: "99.5%ile", label: "COEP CSE Cutoff" },
        ]}
        introHeading="Computer Engineering Colleges in Pune: The Complete 2026 Guide"
        introParagraphs={[
          "Computer Engineering (CS/IT) is the most sought-after BTech branch in Pune, driven by the city's massive IT ecosystem in Hinjewadi, Magarpatta, and Kharadi tech parks. Pune colleges offering CS engineering produce graduates hired by Google, Microsoft, Amazon, Goldman Sachs, TCS Digital, and hundreds of product companies and startups.",
          "Pune has unique advantages for CS students: proximity to 600+ IT companies offering internships from second year, a thriving startup ecosystem with access to angel investors, and strong alumni networks at top tech firms. Colleges like PICT are entirely focused on CS/IT, while COEP's CSE department consistently produces IIT-equivalent placements.",
          "For 2026 admission, computer engineering seats in Pune are highly competitive. New specializations like AI & Machine Learning, Data Science, Cyber Security, and Cloud Computing have been added by several colleges, offering more options for students at slightly lower cutoffs than traditional CS. This guide covers all CS/IT colleges in Pune with real cutoff data.",
        ]}
        colleges={colleges}
        whyHeading="Why Study Computer Engineering in Pune?"
        whyPoints={[
          { title: "Direct Access to IT Jobs", description: "Hinjewadi IT Park (10 km from most colleges) hosts Infosys, Wipro, Cognizant, HSBC Tech, and 300+ companies - the world's most accessible IT employment hub for Pune CS students." },
          { title: "Highest Starting Salaries", description: "CS/IT engineers from top Pune colleges start at ₹6, with product companies offering ₹15 packages. The average salary for Pune CS graduates is 40% higher than national average." },
          { title: "AI & Emerging Tech Focus", description: "Pune colleges now offer AI/ML, Data Science, and Cyber Security specializations with industry-partnered curricula, preparing students for the next decade of tech evolution." },
          { title: "Internship Ecosystem", description: "Pune's IT density means CS students can secure internships at paid rates of ₹15,000-50,000/month from second year, gaining 2+ years of industry experience before graduation." },
          { title: "Startup & Entrepreneurship Support", description: "COEP's E-Cell, PICT's startup community, and MIT-WPU's incubator have launched 100+ funded startups, making Pune CS colleges excellent launchpads for entrepreneurial engineers." },
          { title: "Research & Higher Education Pathway", description: "Strong CS research labs at COEP and SIT Pune offer pathways to IIT/IISc M.Tech admission, international MS programs, and industry research roles at top product companies." },
        ]}
        admissionHeading="Computer Engineering Admission Process in Pune 2026"
        admissionSteps={[
          { step: "1", title: "Target MHT-CET PCM Score", description: "CS/IT is the most competitive branch. Target 95+ percentile for PICT, 99+ for COEP CSE, 85+ for VIT/MIT-WPU CS. JEE Main above 90 percentile also qualifies for premium college management quota." },
          { step: "2", title: "Apply on CAP Portal After Results", description: "Register on cetcell.mahacet.org after MHT-CET results. Verify documents and fill college-branch preferences. Put CS as first preference at all target colleges." },
          { step: "3", title: "Research Colleges Before CAP Round 1", description: "Visit college campuses, attend open days, research placement data on LinkedIn, and talk to current students before locking preferences. Use CampusLelo's comparison tool for data-driven decisions." },
          { step: "4", title: "Fill 50+ Preferences Strategically", description: "Fill preferences across tiers: dream colleges first (COEP/PICT), then realistic targets (VIT Pune, MIT-WPU), then safe options (JSPM, AISSMS). Never leave preferences blank." },
          { step: "5", title: "Accept Allotment or Upgrade in Next Round", description: "If Round 1 allots a lower-preference college, decide: accept to secure a seat (safer) or freeze/upgrade to wait for better options in Round 2. Floating option allows upgrades if better seat opens." },
        ]}
        faqs={faqs}
        ctaHeading="Which CS College in Pune Suits Your MHT-CET Score?"
        ctaSubtext="Enter your MHT-CET percentile and get a personalized list of computer engineering colleges in Pune where you have the best chance of admission."
      relatedGuides={[
        { label: "Best Engineering Colleges in Pune 2026", href: "/engineering-colleges-pune", icon: "🏛️" },
        { label: "Top 10 Engineering Colleges — Ranked", href: "/top-10-engineering-colleges-in-pune", icon: "🏆" },
        { label: "Placement Stats — Avg & Highest LPA", href: "/engineering-colleges-pune", icon: "💼" },
        { label: "Low Fees Engineering Colleges", href: "/low-fees-engineering-colleges-pune", icon: "💰" },
        { label: "Engineering Scholarships in Pune", href: "/engineering-colleges-pune-scholarship", icon: "🎓" },
        { label: "MHT-CET Colleges & Cutoffs 2026", href: "/mht-cet-colleges-pune", icon: "📝" },
        { label: "JEE Main Colleges in Pune", href: "/jee-colleges-pune", icon: "📚" },
        { label: "Government Colleges in Pune", href: "/government-colleges-pune", icon: "🏛️" },
      ]}
      />
      <MoreInCluster pool="btech" path="/computer-engineering-colleges-pune" />
    </>
  )
}
