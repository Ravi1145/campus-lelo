"use client"
import { collegeHref } from "@/lib/collegeHref"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu, X, ChevronDown, Sparkles, PhoneCall,
  Search, Calculator, BarChart3, BookOpen, Award, Compass,
  Building2, TrendingUp, Star, MessageCircle, LineChart, Gift,
  GraduationCap, Newspaper, MapPin, Headphones,
} from "lucide-react"
import { cn } from "@/lib/utils"

// ── Mega-menu data ────────────────────────────────────────────
const streams = [
  {
    label: "Engineering", href: "/colleges?stream=Engineering", apiStream: "Engineering",
    staticLinks: [
      { name: "Engineering Colleges Guide 2026 →", href: "/engineering-colleges-pune" },
      { name: "Top 10 Engineering Colleges →",     href: "/top-10-engineering-colleges-in-pune" },
      { name: "Placement Rankings 2026 →",          href: "/engineering-colleges-pune" },
      { name: "Low Fees Colleges →",               href: "/low-fees-engineering-colleges-pune" },
      { name: "All Engineering Colleges →",         href: "/colleges?stream=Engineering" },
    ],
    courses: [
      { name: "B.Tech Computer Engineering", href: "/courses/btech-computer-engineering-pune" },
      { name: "B.Tech Mechanical",           href: "/courses/btech-mechanical-engineering-pune" },
      { name: "All Engineering Courses →",   href: "/courses" },
    ],
    exams: [
      { name: "MHT-CET",     href: "/exams/mht-cet" },
      { name: "JEE Main",    href: "/exams/jee-main" },
      { name: "JEE Advanced",href: "/exams/jee-advanced" },
    ],
  },
  {
    label: "MBA", href: "/mba-in-pune", apiStream: "MBA",
    staticLinks: [
      { name: "MBA in Pune 2026 →",         href: "/mba-in-pune" },
      { name: "PGDM in Pune →",             href: "/pgdm-in-pune" },
      { name: "Top 10 MBA Colleges →",      href: "/top-10-mba-colleges-in-pune" },
      { name: "MBA Finance →",              href: "/mba-colleges-in-pune-for-finance" },
      { name: "MBA HR →",                   href: "/mba-colleges-in-pune-for-hr" },
      { name: "MBA Colleges Accepting CAT →", href: "/mba-colleges-in-pune-accepting-cat" },
      { name: "All MBA guides →",             href: "/mba" },
      { name: "MBA Counselling (free) →",      href: "/mba-counselling" },
      { name: "MBA Colleges Delhi NCR →",     href: "/mba-colleges-in-delhi-ncr" },
      { name: "MBA Colleges Delhi →",         href: "/mba-colleges-in-delhi" },
      { name: "MBA Colleges Greater Noida →", href: "/mba-colleges-in-greater-noida" },
      { name: "MBA vs PGDM →",              href: "/mba-vs-pgdm" },
      { name: "MBA Cutoff Delhi NCR →",     href: "/mba-cutoff-delhi-ncr" },
      { name: "MBA Cutoff Mumbai →",        href: "/mba-cutoff-mumbai" },
      { name: "MBA Colleges Uttar Pradesh →", href: "/mba-colleges-in-uttar-pradesh" },
      { name: "MBA Colleges Lucknow →",     href: "/mba-colleges-in-lucknow" },
      { name: "MBA Colleges Dehradun →",    href: "/mba-colleges-in-dehradun" },
      { name: "MBA Colleges Uttarakhand →", href: "/mba-colleges-in-uttarakhand" },
      { name: "MBA Cutoff Noida & UP →",    href: "/mba-cutoff-uttar-pradesh" },
      { name: "MBA Cutoff Uttarakhand →",   href: "/mba-cutoff-uttarakhand" },
      { name: "All MBA Colleges →",         href: "/colleges?stream=MBA" },
    ],
    courses: [
      { name: "MBA: Master of Business Administration", href: "/courses/mba-pune-master-business-administration" },
      { name: "All Management Courses →",               href: "/courses" },
    ],
    exams: [
      { name: "CAT",  href: "/exams/cat" },
      { name: "MAH MBA CET", href: "/exams/mah-mba-cet" },
      { name: "SNAP", href: "/exams/snap" },
      { name: "XAT",  href: "/exams/xat" },
      { name: "CMAT", href: "/exams/cmat" },
      { name: "MAT",  href: "/exams/mat" },
      { name: "NMAT", href: "/exams/nmat" },
    ],
  },
  {
    label: "Medical", href: "/colleges?stream=Medical", apiStream: "Medical",
    staticLinks: [
      { name: "Medical Colleges Guide →", href: "/medical-colleges-pune" },
      { name: "All Medical Colleges →",   href: "/colleges?stream=Medical" },
    ],
    courses: [
      { name: "MBBS",                  href: "/courses/mbbs-pune-bachelor-medicine-surgery" },
      { name: "All Medical Courses →", href: "/courses" },
    ],
    exams: [{ name: "NEET", href: "/exams/neet" }],
  },
  {
    label: "Arts & Science", href: "/colleges?stream=Arts+%26+Science", apiStream: "Arts & Science",
    staticLinks: [
      { name: "Arts & Science Colleges →",     href: "/arts-colleges-pune" },
      { name: "All Arts & Science Colleges →", href: "/colleges?stream=Arts+%26+Science" },
    ],
    courses: [
      { name: "BCA",                    href: "/courses/bca-bachelor-computer-applications-pune" },
      { name: "All Science Courses →",  href: "/courses" },
    ],
    exams: [
      { name: "MHT-CET",   href: "/exams/mht-cet" },
      { name: "All Exams →",href: "/exams" },
    ],
  },
  {
    label: "Law", href: "/law-colleges-pune", apiStream: "Law",
    staticLinks: [
      { name: "Law Colleges Guide →", href: "/law-colleges-pune" },
      { name: "All Law Colleges →",   href: "/colleges?stream=Law" },
    ],
    courses: [
      { name: "LLB: Bachelor of Laws", href: "/courses" },
      { name: "BA LLB (5-year)",        href: "/courses" },
    ],
    exams: [
      { name: "CLAT",       href: "/exams" },
      { name: "MH-CET Law", href: "/exams" },
    ],
  },
  {
    label: "Design", href: "/design-colleges-pune", apiStream: "Design",
    staticLinks: [
      { name: "Design Colleges Guide →", href: "/design-colleges-pune" },
      { name: "All Design Colleges →",   href: "/design-colleges-pune" },
    ],
    courses: [
      { name: "B.Des: Bachelor of Design", href: "/courses" },
      { name: "B.Arch",                     href: "/courses" },
    ],
    exams: [
      { name: "NATA",    href: "/exams" },
      { name: "NID DAT", href: "/exams" },
    ],
  },
]

const tools = [
  { label: "College Predictor",    href: "/predictor",                              icon: GraduationCap, desc: "Find colleges by your score",   color: "text-orange-600 bg-orange-50" },
  { label: "Compare Colleges",     href: "/compare",                                icon: BarChart3,     desc: "Side-by-side comparison",        color: "text-blue-600 bg-blue-50" },
  { label: "ROI Calculator",       href: "/roi-calculator",                         icon: Calculator,    desc: "Calculate education returns",     color: "text-green-600 bg-green-50" },
  { label: "Fees Calculator",      href: "/pune-college-fees-calculator",           icon: Calculator,    desc: "Total course fee estimator",      color: "text-yellow-600 bg-yellow-50" },
  { label: "Placement Comparator", href: "/colleges",      icon: TrendingUp,    desc: "Compare placement data",          color: "text-indigo-600 bg-indigo-50" },
  { label: "Admission Deadlines",  href: "/pune-admission-deadline-tracker-2026",   icon: Star,          desc: "2026 deadline tracker",           color: "text-red-600 bg-red-50" },
  { label: "AI College Finder",    href: "/ai-finder",                              icon: Sparkles,      desc: "AI-powered matching",             color: "text-pink-600 bg-pink-50" },
  { label: "AI Career Counselor",  href: "/ai-counselor",                           icon: Sparkles,      desc: "Chat with Aarav AI",              color: "text-orange-600 bg-orange-50" },
  { label: "Free Counselling",     href: "/counselling",                            icon: PhoneCall,     desc: "Talk to an expert",               color: "text-teal-600 bg-teal-50" },
]

const explore = [
  { label: "News & Updates", href: "/news",         icon: Newspaper },
  { label: "Cutoffs 2026",   href: "/cutoffs",      icon: LineChart },
  { label: "Scholarships",   href: "/scholarships", icon: Gift },
  { label: "Community Q&A",  href: "/qa",           icon: MessageCircle },
  { label: "Career Paths",   href: "/career-paths", icon: TrendingUp },
  { label: "Blog & Guides",  href: "/blog",         icon: BookOpen },
  { label: "Entrance Exams", href: "/exams",        icon: Compass },
  { label: "All Courses",    href: "/courses",      icon: Star },
  { label: "All Colleges",   href: "/colleges",     icon: Building2 },
]

type CollegeLink = { name: string; href: string }

// ── Component ──────────────────────────────────────────────────
export default function Header() {
  const [mobileOpen,     setMobileOpen]     = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [scrolled,       setScrolled]       = useState(false)
  const [searchQuery,    setSearchQuery]    = useState("")
  const [liveColleges,   setLiveColleges]   = useState<Record<string, CollegeLink[]>>({})
  const fetchedStreams = useRef<Set<string>>(new Set())
  const pathname  = usePathname()
  const router    = useRouter()
  const timerRef  = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setActiveDropdown(null) }, [pathname])
  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  const fetchStreamColleges = async (label: string, apiStream: string) => {
    if (fetchedStreams.current.has(label)) return
    fetchedStreams.current.add(label)
    try {
      const res = await fetch(`/api/colleges?stream=${encodeURIComponent(apiStream)}&limit=5`)
      if (!res.ok) return
      const data = await res.json()
      const cols: CollegeLink[] = (data.colleges ?? []).slice(0, 5).map((c: { name: string; shortName?: string; slug: string }) => ({
        name: c.shortName ?? c.name, href: collegeHref(c.slug),
      }))
      if (cols.length) setLiveColleges(prev => ({ ...prev, [label]: cols }))
    } catch {}
  }

  const open  = (id: string) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setActiveDropdown(id)
    const s = streams.find(x => x.label === id)
    if (s) fetchStreamColleges(s.label, s.apiStream)
  }
  const close = () => { timerRef.current = setTimeout(() => setActiveDropdown(null), 130) }
  const keep  = () => { if (timerRef.current) clearTimeout(timerRef.current) }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) router.push(`/colleges?search=${encodeURIComponent(searchQuery.trim())}`)
  }

  const navTabCls = (id: string) => cn(
    "h-full px-3.5 text-sm font-medium flex items-center gap-1 border-b-2 transition-colors whitespace-nowrap",
    activeDropdown === id
      ? "text-orange-500 border-orange-500"
      : "text-[#012858] hover:text-orange-500 border-transparent"
  )

  return (
    <>
      <header style={{ top: "var(--leadbar-h, 0px)" }} className={cn(
        "fixed left-0 right-0 z-50 header-glass transition-[box-shadow,top] duration-200",
        scrolled ? "shadow-md" : "border-b border-gray-100"
      )}>

        {/* ══ TOP BAR ══════════════════════════════════════════ */}
        <div className="bg-transparent border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[70px] flex items-center gap-4">

            {/* Logo */}
            <Link href="/" className="flex-shrink-0 mr-3">
              <Image src="/logo.webp" alt="CampusLelo: Pehle Dekho. Samjho. Phir Choose Karo." height={52} width={172} className="h-12 w-auto" priority unoptimized />
            </Link>

            {/* Search bar — desktop */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 items-center max-w-xl mx-2">
              <div className="flex w-full rounded-xl overflow-hidden" style={{ border: "1.5px solid #E5E9F0" }}>
                <div className="flex items-center pl-3 bg-white">
                  <Search className="w-4 h-4 flex-shrink-0" style={{ color: "#94A3B8" }} />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search colleges, courses, exams and locations"
                  placeholder="Search colleges, courses, exams, locations..."
                  className="flex-1 px-3 py-2.5 text-sm bg-white outline-none"
                  style={{ color: "#0F172A" }}
                />
                <button type="submit"
                  className="px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
                  style={{ background: "#E0170F" }}>
                  Search
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto">
              {/* Pune picker */}
              <button className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 flex-shrink-0"
                style={{ border: "1.5px solid #E5E9F0", color: "#012858" }}>
                <MapPin className="w-3.5 h-3.5" style={{ color: "#E0170F" }} />
                Pune
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {/* Compare */}
              <Link href="/compare" className="hidden lg:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-50 flex-shrink-0"
                style={{ border: "1.5px solid #E5E9F0", color: "#012858" }}>
                <BarChart3 className="w-3.5 h-3.5" />
                Compare
              </Link>

              {/* AI Finder */}
              <Link href="/ai-finder" className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
                style={{ background: "#E0170F" }}>
                <Sparkles className="w-4 h-4" />
                <span className="hidden lg:inline">AI Finder</span>
              </Link>

              {/* Free Counselling */}
              <Link href="/counselling" className="hidden md:flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90 flex-shrink-0"
                style={{ background: "#012858" }}>
                <Headphones className="w-4 h-4" />
                <span className="hidden lg:inline">Free Counselling</span>
              </Link>

              {/* Mobile: search icon + hamburger */}
              <button type="button" aria-label="Search colleges" className="md:hidden p-2 rounded-lg hover:bg-gray-100" style={{ color: "#012858" }} onClick={() => router.push("/colleges")}>
                <Search className="w-5 h-5" />
              </button>
              <button type="button" aria-label="Open menu" aria-expanded={mobileOpen} className="lg:hidden p-2 rounded-lg hover:bg-gray-100" style={{ color: "#012858" }} onClick={() => setMobileOpen(true)}>
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* ══ BOTTOM NAV (desktop) ══════════════════════════════ */}
        <nav aria-label="Main navigation" className="hidden lg:block bg-transparent border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-11 gap-0">

              {/* Home */}
              <Link href="/" className={cn(
                "h-full px-3.5 text-sm font-semibold flex items-center border-b-2 transition-colors",
                pathname === "/" ? "text-orange-500 border-orange-500" : "text-[#012858] hover:text-orange-500 border-transparent"
              )}>Home</Link>

              {/* Stream dropdowns */}
              {streams.map(stream => (
                <div key={stream.label} onMouseEnter={() => open(stream.label)} onMouseLeave={close} className="relative h-full flex items-center">
                  <button className={navTabCls(stream.label)}>
                    {stream.label}
                    <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === stream.label && "rotate-180")} />
                  </button>

                  {activeDropdown === stream.label && (
                    <div onMouseEnter={keep} onMouseLeave={close}
                      className="absolute top-full left-0 mt-0 w-[min(580px,calc(100vw-2rem))] bg-white rounded-b-2xl shadow-2xl z-50 p-5"
                      style={{ border: "1px solid #E5E9F0", borderTop: "2px solid #E0170F" }}>
                      <div className="grid grid-cols-3 gap-6">
                        {/* Top Colleges */}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                            <Building2 className="w-3 h-3" /> Top Colleges
                          </p>
                          <ul className="space-y-1">
                            {(liveColleges[stream.label] ?? []).map((c, i) => (
                              <li key={i}><Link href={c.href} className="block py-1 text-sm font-medium truncate transition-colors hover:text-orange-500" style={{ color: "#012858" }}>{c.name}</Link></li>
                            ))}
                            {!liveColleges[stream.label] && (
                              <li>{[1,2,3].map(i => <div key={i} className="h-4 bg-gray-100 rounded animate-pulse mb-2 w-4/5" />)}</li>
                            )}
                            {(liveColleges[stream.label]?.length ?? 0) > 0 && <li className="border-t border-gray-100 my-2" />}
                            {stream.staticLinks.map((c, i) => (
                              <li key={i}><Link href={c.href} className="block py-0.5 text-xs transition-colors hover:text-orange-500" style={{ color: "#64748B" }}>{c.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                        {/* Courses */}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                            <BookOpen className="w-3 h-3" /> Courses
                          </p>
                          <ul className="space-y-1">
                            {stream.courses.map((c, i) => (
                              <li key={i}><Link href={c.href} className="block py-1 text-sm transition-colors hover:text-orange-500" style={{ color: "#012858" }}>{c.name}</Link></li>
                            ))}
                          </ul>
                        </div>
                        {/* Exams */}
                        <div>
                          <p className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-1.5" style={{ color: "#94A3B8" }}>
                            <Compass className="w-3 h-3" /> Exams
                          </p>
                          <ul className="space-y-1">
                            {stream.exams.map(e => (
                              <li key={e.name}><Link href={e.href} className="block py-1 text-sm transition-colors hover:text-orange-500" style={{ color: "#012858" }}>{e.name}</Link></li>
                            ))}
                          </ul>
                          <Link href="/predictor" className="mt-3 block text-xs font-semibold px-3 py-2 rounded-lg transition-colors hover:bg-orange-100" style={{ background: "#FFF4F2", color: "#E0170F" }}>
                            🎯 Predict your college →
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Tools */}
              <div onMouseEnter={() => open("tools")} onMouseLeave={close} className="relative h-full flex items-center">
                <button className={navTabCls("tools")}>
                  Tools <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === "tools" && "rotate-180")} />
                </button>
                {activeDropdown === "tools" && (
                  <div onMouseEnter={keep} onMouseLeave={close}
                    className="absolute top-full left-0 mt-0 w-[min(440px,calc(100vw-2rem))] bg-white rounded-b-2xl shadow-2xl z-50 p-4"
                    style={{ border: "1px solid #E5E9F0", borderTop: "2px solid #E0170F" }}>
                    <div className="grid grid-cols-2 gap-2">
                      {tools.map(t => (
                        <Link key={t.href} href={t.href} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                          <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0", t.color)}>
                            <t.icon className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold group-hover:text-orange-500 transition-colors" style={{ color: "#012858" }}>{t.label}</p>
                            <p className="text-xs" style={{ color: "#94A3B8" }}>{t.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Explore */}
              <div onMouseEnter={() => open("explore")} onMouseLeave={close} className="relative h-full flex items-center">
                <button className={navTabCls("explore")}>
                  Explore <ChevronDown className={cn("w-3.5 h-3.5 transition-transform", activeDropdown === "explore" && "rotate-180")} />
                </button>
                {activeDropdown === "explore" && (
                  <div onMouseEnter={keep} onMouseLeave={close}
                    className="absolute top-full left-0 mt-0 w-72 bg-white rounded-b-2xl shadow-2xl z-50 p-2"
                    style={{ border: "1px solid #E5E9F0", borderTop: "2px solid #E0170F" }}>
                    <div className="grid grid-cols-2 gap-0.5">
                      {explore.map(e => (
                        <Link key={e.href} href={e.href}
                          className="flex items-center gap-2.5 px-3 py-2.5 text-sm rounded-lg transition-colors hover:bg-orange-50 hover:text-orange-500"
                          style={{ color: "#012858" }}>
                          <e.icon className="w-4 h-4 flex-shrink-0" style={{ color: "#94A3B8" }} />
                          {e.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="w-px h-5 mx-2 flex-shrink-0" style={{ background: "#E5E9F0" }} />

              {/* Right links */}
              {[
                { label: "Blogs",           href: "/blog" },
                { label: "Events",          href: "/events" },
                { label: "Placements",      href: "/colleges" },
                { label: "Admission Guide", href: "/admission-guide" },
              ].map(item => (
                <Link key={item.href} href={item.href} className={cn(
                  "h-full px-3 text-sm font-medium flex items-center border-b-2 transition-colors whitespace-nowrap",
                  pathname.startsWith(item.href)
                    ? "text-orange-500 border-orange-500"
                    : "text-[#012858] hover:text-orange-500 border-transparent"
                )}>{item.label}</Link>
              ))}

            </div>
          </div>
        </nav>
      </header>

      {/* ══ MOBILE SLIDE-OVER ═════════════════════════════════ */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[200] lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 left-0 h-full w-[320px] max-w-full bg-white flex flex-col shadow-2xl">

            {/* Mobile header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image src="/logo.webp" alt="CampusLelo" height={44} width={146} className="h-10 w-auto" priority unoptimized />
              </Link>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-gray-100" style={{ color: "#012858" }}>
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile search */}
            <form onSubmit={handleSearch} className="p-3 border-b border-gray-100">
              <div className="flex rounded-xl overflow-hidden" style={{ border: "1.5px solid #E5E9F0" }}>
                <div className="flex items-center pl-3"><Search className="w-4 h-4" style={{ color: "#94A3B8" }} /></div>
                <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search colleges, courses..." className="flex-1 px-2 py-2.5 text-sm outline-none bg-white" />
                <button type="submit" className="px-4 text-sm font-semibold text-white" style={{ background: "#E0170F" }}>Go</button>
              </div>
            </form>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto">
              <Link href="/" onClick={() => setMobileOpen(false)}
                className="flex items-center px-4 py-3 text-sm font-semibold border-b border-gray-100 transition-colors"
                style={{ color: pathname === "/" ? "#E0170F" : "#012858" }}>Home</Link>

              {streams.map(stream => (
                <div key={stream.label} className="border-b border-gray-100">
                  <button
                    onClick={() => {
                      const next = mobileExpanded === stream.label ? null : stream.label
                      setMobileExpanded(next)
                      if (next) fetchStreamColleges(stream.label, stream.apiStream)
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-gray-50"
                    style={{ color: "#012858" }}
                  >
                    {stream.label}
                    <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === stream.label && "rotate-180")} style={{ color: "#94A3B8" }} />
                  </button>
                  {mobileExpanded === stream.label && (
                    <div className="bg-gray-50 px-4 pb-3 space-y-1">
                      {(liveColleges[stream.label] ?? []).map((c, i) => (
                        <Link key={i} href={c.href} onClick={() => setMobileOpen(false)}
                          className="block py-1.5 text-sm font-medium truncate hover:text-orange-500" style={{ color: "#012858" }}>{c.name}</Link>
                      ))}
                      {!liveColleges[stream.label] && <div className="space-y-1.5 py-1">{[1,2,3].map(i => <div key={i} className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />)}</div>}
                      {stream.staticLinks.map((c, i) => (
                        <Link key={i} href={c.href} onClick={() => setMobileOpen(false)}
                          className="block py-1 text-xs hover:text-orange-500" style={{ color: "#64748B" }}>{c.name}</Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Tools accordion */}
              <div className="border-b border-gray-100">
                <button onClick={() => setMobileExpanded(mobileExpanded === "tools" ? null : "tools")}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-semibold hover:bg-gray-50" style={{ color: "#012858" }}>
                  Tools
                  <ChevronDown className={cn("w-4 h-4 transition-transform", mobileExpanded === "tools" && "rotate-180")} style={{ color: "#94A3B8" }} />
                </button>
                {mobileExpanded === "tools" && (
                  <div className="bg-gray-50 px-4 pb-3 space-y-0.5">
                    {tools.map(t => (
                      <Link key={t.href} href={t.href} onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 py-2 text-sm hover:text-orange-500" style={{ color: "#012858" }}>
                        <t.icon className="w-4 h-4" style={{ color: "#94A3B8" }} /> {t.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Static links */}
              {[
                { label: "Blogs",           href: "/blog",            icon: Newspaper },
                { label: "Events",          href: "/events",          icon: Star },
                { label: "Placements",      href: "/colleges",      icon: TrendingUp },
                { label: "Admission Guide", href: "/admission-guide", icon: BookOpen },
                { label: "Scholarships",    href: "/scholarships",    icon: Gift },
                { label: "Community Q&A",   href: "/qa",              icon: MessageCircle },
              ].map(e => (
                <Link key={e.href} href={e.href} onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-orange-500"
                  style={{ color: "#012858" }}>
                  <e.icon className="w-4 h-4" style={{ color: "#94A3B8" }} /> {e.label}
                </Link>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="p-3 border-t border-gray-100 grid grid-cols-2 gap-2">
              <Link href="/ai-finder" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#E0170F" }}>
                <Sparkles className="w-4 h-4" /> AI Finder
              </Link>
              <Link href="/counselling" onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-bold text-white"
                style={{ background: "#012858" }}>
                <Headphones className="w-4 h-4" /> Counselling
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
