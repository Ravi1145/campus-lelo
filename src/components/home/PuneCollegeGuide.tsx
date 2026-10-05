import Link from "next/link"

const streamLinks = [
  { label: "Best Engineering Colleges in Pune 2026",       href: "/engineering-colleges-pune",        count: "80+" },
  { label: "Best MBA Colleges in Pune 2026",               href: "/mba-colleges-in-pune",             count: "40+" },
  { label: "Best Medical Colleges in Pune 2026",           href: "/medical-colleges-pune",            count: "15+" },
  { label: "Best Law Colleges in Pune 2026",               href: "/law-colleges-pune",                count: "12+" },
  { label: "Best Design Colleges in Pune 2026",            href: "/design-colleges-pune",             count: "10+" },
  { label: "Best BCA Colleges in Pune 2026",               href: "/bca-colleges-pune",                count: "30+" },
  { label: "Best BBA Colleges in Pune 2026",               href: "/bba-colleges-pune",                count: "25+" },
  { label: "Best Arts Colleges in Pune 2026",              href: "/arts-colleges-pune",               count: "20+" },
  { label: "Government Colleges in Pune 2026",             href: "/government-colleges-pune",         count: "30+" },
  { label: "NAAC A+ Colleges in Pune 2026",                href: "/naac-a-plus-colleges-pune",        count: "25+" },
  { label: "Top Placement Colleges in Pune 2026",          href: "/top-placement-colleges-pune",      count: "15+" },
  { label: "Colleges in Pune with Hostel 2026",            href: "/colleges-in-pune-with-hostel",     count: "40+" },
]

const examLinks = [
  { label: "MHT-CET Colleges in Pune 2026",                href: "/mht-cet-colleges-pune" },
  { label: "JEE Main Colleges in Pune 2026",               href: "/jee-main-colleges-pune" },
  { label: "NEET Colleges in Pune 2026",                   href: "/neet-colleges-pune" },
  { label: "CAT Colleges in Pune 2026",                    href: "/mba-colleges-in-pune-accepting-cat" },
  { label: "SNAP Colleges in Pune 2026",                   href: "/mba-colleges-in-pune-accepting-snap" },
  { label: "MH-CET MBA Colleges Pune 2026",                href: "/mba-colleges-in-pune-accepting-mh-cet" },
]

const toolLinks = [
  { label: "College Predictor by Score",    href: "/predictor" },
  { label: "Compare Colleges Side-by-Side", href: "/compare" },
  { label: "MBA vs Engineering ROI",        href: "/roi-calculator" },
  { label: "Fees Calculator",               href: "/pune-college-fees-calculator" },
  { label: "AI College Finder",             href: "/ai-finder" },
  { label: "Admission Deadline Tracker",    href: "/pune-admission-deadline-tracker-2026" },
]

const resourceLinks = [
  { label: "Pune College Admission Guide 2026",   href: "/admission-guide" },
  { label: "College Placements in Pune 2026",     href: "/placements" },
  { label: "Scholarships for Pune Students 2026", href: "/scholarships" },
  { label: "Upcoming College Events 2026",        href: "/events" },
  { label: "Entrance Exam Calendar 2026",         href: "/exams" },
  { label: "Free Expert Counselling",             href: "/counselling" },
]

const noidaLinks = [
  { label: "Best Colleges in Noida 2026",         href: "/colleges-in-noida" },
  { label: "Engineering Colleges in Noida 2026",  href: "/engineering-colleges-noida" },
  { label: "MBA Colleges in Noida 2026",          href: "/mba-colleges-noida" },
  { label: "PGDM Colleges in Noida 2026",        href: "/pgdm-colleges-noida" },
  { label: "Colleges in Greater Noida",          href: "/colleges-in-greater-noida" },
  { label: "MBA in Noida",                       href: "/mba-in-noida" },
]

export default function PuneCollegeGuide() {
  return (
    <section className="section-ivory" aria-label="Pune College Guide">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">

        {/* Main heading — targets "colleges in pune 2026" and variants */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: "#012858" }}>
            Complete Guide to Colleges in Pune 2026
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-4">
            Pune is India&apos;s education hub with 500+ colleges across engineering, MBA, medical, law, design and arts streams.
            Whether you are targeting COEP with a 97+ MHT-CET percentile, SIBM Pune with CAT 98 percentile, or AFMC with a
            650+ NEET score — CampusLelo gives you verified fees, real placement data, NIRF rankings and 2026 cutoffs for
            every Pune college under one roof.
          </p>
          <p className="text-base text-gray-600 leading-relaxed">
            Pune colleges are affiliated to Savitribai Phule Pune University (SPPU), Symbiosis International University (SIU),
            MIT-ADT University, and DY Patil University — making Pune one of the most diverse higher education ecosystems in India.
            Use our free tools to compare colleges, predict your admission chances and get expert counselling on WhatsApp.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">

          {/* By Stream */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: "#E0170F" }}>
              Browse by Stream
            </h3>
            <ul className="grid sm:grid-cols-2 gap-1.5">
              {streamLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="flex items-center justify-between py-2 px-3 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors group"
                    style={{ color: "#012858" }}>
                    <span className="group-hover:underline">{link.label}</span>
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">{link.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right column */}
          <div className="space-y-7">

            {/* By Exam */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#E0170F" }}>
                By Entrance Exam
              </h3>
              <ul className="space-y-1">
                {examLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="block py-1.5 px-3 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      style={{ color: "#012858" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools */}
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#E0170F" }}>
                Free Tools
              </h3>
              <ul className="space-y-1">
                {toolLinks.map(link => (
                  <li key={link.href}>
                    <Link href={link.href}
                      className="block py-1.5 px-3 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                      style={{ color: "#012858" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "#E0170F" }}>
              Guides &amp; Resources
            </h3>
            <ul className="space-y-1 mb-6">
              {resourceLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href}
                    className="block py-1.5 px-3 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    style={{ color: "#012858" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Key facts box */}
            <div className="rounded-2xl p-4 text-sm space-y-2" style={{ background: "#F7F9FC", border: "1px solid #E5E9F0" }}>
              <p className="font-bold text-xs uppercase tracking-wider" style={{ color: "#012858" }}>Pune at a Glance</p>
              {[
                ["500+", "Colleges in Pune"],
                ["50+", "Courses & Streams"],
                ["NIRF #4", "Highest Ranked (AFMC)"],
                ["₹15K–25L", "Fee Range / Year"],
                ["₹85 LPA", "Highest MBA Package"],
              ].map(([val, label]) => (
                <div key={label} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
                  <span style={{ color: "#475569" }}>{label}</span>
                  <span className="font-bold text-xs" style={{ color: "#E0170F" }}>{val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Noida section */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: "#E0170F" }}>
              Also Explore — Noida &amp; Greater Noida
            </h3>
            <Link href="/colleges-in-noida" className="text-xs font-medium hover:underline" style={{ color: "#E0170F" }}>
              View all →
            </Link>
          </div>
          <ul className="grid sm:grid-cols-3 gap-1">
            {noidaLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href}
                  className="block py-1.5 px-3 rounded-lg text-sm hover:bg-orange-50 hover:text-orange-600 transition-colors"
                  style={{ color: "#012858" }}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom keyword-rich text — targets long-tail queries */}
        <div className="mt-10 pt-8 border-t border-gray-100 grid sm:grid-cols-3 gap-6 text-sm text-gray-500 leading-relaxed">
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Top Engineering Colleges in Pune 2026</h4>
            <p>
              COEP Pune (NIRF #49, NAAC A+), PICT (NAAC A), VIT Pune (NIRF #101, NAAC A+), SIT Pune (NAAC A+),
              Cummins College (NAAC A+), MIT-WPU and JSPM RSCOE are the top B.Tech colleges in Pune.
              Admission via MHT-CET 2026 (April–May) or JEE Main. Fees range from ₹80K to ₹4.5L per year.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Top MBA Colleges in Pune 2026</h4>
            <p>
              SIBM Pune (NIRF #13, avg ₹24 LPA), SCMHRD (NIRF #22, avg ₹19 LPA), PUMBA (government, ₹1.25L fees),
              MIT-SOM, DYPIM and Indira Institute are top MBA colleges in Pune. Admission via SNAP, CAT or MAH-MBA-CET 2026.
              Total fees range from ₹2.5L (PUMBA) to ₹24L (SIBM).
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-2">Pune College Admission 2026</h4>
            <p>
              MHT-CET 2026 (April–May) for engineering; NEET 2026 (May) for medical; CAT/SNAP/MAH-MBA-CET for MBA;
              CLAT/MH-CET Law for law; SET for Symbiosis UG programs. CAP Rounds start July 2026.
              Direct admission (management quota) opens after CAP rounds in August 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
