import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Award, BookOpen, Briefcase, Clock, Cog, FileText, GraduationCap, Stethoscope, TrendingUp, Trophy, Users, Wallet } from "lucide-react"
import MarqueePause from "./MarqueePause"
import LoopClone from "@/components/ui/LoopClone"
import { getAllBlogs } from "@/lib/db"
import { blogs as staticBlogs } from "@/data/blogs"

export const revalidate = 300

// ── Category badge colors ─────────────────────────────────────────────────
const CATEGORY_COLORS: Record<string, { bg: string; text: string; bar: string }> = {
  Engineering:    { bg: "bg-blue-50",    text: "text-blue-700",   bar: "from-blue-400 to-blue-600" },
  MBA:            { bg: "bg-orange-50",  text: "text-orange-700", bar: "from-orange-400 to-orange-600" },
  Exams:          { bg: "bg-purple-50",  text: "text-purple-700", bar: "from-purple-400 to-purple-600" },
  Medical:        { bg: "bg-red-50",     text: "text-red-700",    bar: "from-red-400 to-red-600" },
  Placements:     { bg: "bg-green-50",   text: "text-green-700",  bar: "from-green-400 to-green-600" },
  Scholarships:   { bg: "bg-teal-50",    text: "text-teal-700",   bar: "from-teal-400 to-teal-600" },
  Careers:        { bg: "bg-indigo-50",  text: "text-indigo-700", bar: "from-indigo-400 to-indigo-600" },
  "Fees & Finance": { bg: "bg-amber-50", text: "text-amber-700",  bar: "from-amber-400 to-amber-600" },
  "Student Life": { bg: "bg-pink-50",    text: "text-pink-700",   bar: "from-pink-400 to-pink-600" },
  Rankings:       { bg: "bg-cyan-50",    text: "text-cyan-700",   bar: "from-cyan-400 to-cyan-600" },
}

const DEFAULT_COLOR = { bg: "bg-gray-50", text: "text-gray-700", bar: "from-gray-400 to-gray-600" }

// ── Normalise static & DB blog to a unified shape ─────────────────────────
interface GuideCard {
  slug: string
  title: string
  excerpt: string
  author: string
  readTime: string
  category: string
  date: string
  image?: string
}

function normaliseStatic(b: typeof staticBlogs[0]): GuideCard {
  return {
    slug:     b.slug,
    title:    b.title,
    excerpt:  b.excerpt ?? "",
    author:   b.author ?? "CampusLelo",
    readTime: b.readTime ?? "5 min",
    category: b.category ?? "Guide",
    date:     b.date ?? b.publishedAt ?? "",
    image:    b.image,
  }
}

// ── Fetch: Supabase first, static fallback ────────────────────────────────
async function fetchGuides(): Promise<GuideCard[]> {
  try {
    const { blogs: dbBlogs } = await getAllBlogs({ status: "published", limit: 12 })
    if (dbBlogs && dbBlogs.length > 0) {
      return dbBlogs.map(b => ({
        slug:     b.slug,
        title:    b.title,
        excerpt:  b.excerpt ?? "",
        author:   b.author ?? "CampusLelo",
        readTime: b.read_time ?? "5 min",
        category: b.category ?? "Guide",
        date:     b.published_at ?? b.created_at ?? "",
        image:    b.image_url,
      }))
    }
  } catch {
    // fall through to static
  }
  return staticBlogs.map(normaliseStatic)
}

// ── Cover images ──────────────────────────────────────────────────────────
// Articles use their own cover when one is set (CMS `image_url`). Otherwise a
// campus or student photo is used, tinted in the category colour and cropped
// differently per article so a row of cards doesn't look repeated.
const CATEGORY_ICON: Record<string, React.ComponentType<{ className?: string }>> = {
  Engineering: Cog, MBA: Briefcase, Exams: FileText, Medical: Stethoscope, Placements: TrendingUp,
  Scholarships: Award, Careers: GraduationCap, "Fees & Finance": Wallet, "Student Life": Users, Rankings: Trophy,
}
const PHOTOS = [
  { src: "/college-default-banner.jpg", pos: "30% 50%" },
  { src: "/hero-students.webp", pos: "62% 22%" },
  { src: "/college-default-banner.jpg", pos: "72% 45%" },
  { src: "/hero-students.webp", pos: "55% 42%" },
]
const hash = (s: string) => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h }

function GuideCover({ guide, colors }: { guide: GuideCard; colors: { bar: string } }) {
  const photo = PHOTOS[hash(guide.slug) % PHOTOS.length]
  return (
    <div className="relative h-40 overflow-hidden bg-[#012858]">
      {guide.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={guide.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" />
      ) : (
        <Image
          src={photo.src}
          alt=""
          fill
          sizes="320px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          style={{ objectPosition: photo.pos }}
        />
      )}
      {/* category tint + bottom shade for legibility */}
      <div aria-hidden="true" className={`absolute inset-0 bg-gradient-to-br ${colors.bar} opacity-50 mix-blend-multiply`} />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#011B40]/80 via-[#011B40]/10 to-transparent" />
      {/* light sweep on hover */}
    </div>
  )
}

// ── Single guide card ─────────────────────────────────────────────────────
function GuideCard({ guide }: { guide: GuideCard }) {
  const colors = CATEGORY_COLORS[guide.category] ?? DEFAULT_COLOR
  const Icon = CATEGORY_ICON[guide.category] ?? BookOpen
  const initial = guide.author[0]?.toUpperCase() ?? "C"
  const date = guide.date ? new Date(guide.date) : null
  const dateText = date && !Number.isNaN(date.getTime()) ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : ""

  return (
    <Link
      href={`/blog/${guide.slug}`}
      className="group relative flex w-72 shrink-0 flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-blue-950/15 hover:ring-[#012858]/25 sm:w-80"
    >
      <div className="relative">
        <GuideCover guide={guide} colors={colors} />
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[#012858] shadow-md backdrop-blur">
          <Icon className="h-3.5 w-3.5 text-[#C90D11]" aria-hidden="true" />
          {guide.category}
        </span>
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/65 px-2.5 py-1 text-[11px] font-semibold text-white ring-1 ring-white/25 backdrop-blur">
          <Clock className="h-3 w-3" aria-hidden="true" />
          {guide.readTime}
        </span>
        {/* accent line draws in on hover */}
        <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[#E0170F] transition-transform duration-500 group-hover:scale-x-100" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <h3 className="line-clamp-3 text-[15px] font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-[#C90D11]">
          {guide.title}
        </h3>

        <p className="line-clamp-2 flex-1 text-xs leading-relaxed text-gray-600">{guide.excerpt}</p>

        <div className="mt-1 flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#012858] text-[11px] font-extrabold text-white">{initial}</span>
            <span className="min-w-0">
              <span className="block max-w-[120px] truncate text-xs font-semibold text-gray-800">{guide.author}</span>
              {dateText && <span className="block text-[11px] text-gray-500">{dateText}</span>}
            </span>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-xs font-bold text-[#C90D11]">
            Read <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </span>
        </div>
      </div>
    </Link>
  )
}

// ── Main section ──────────────────────────────────────────────────────────
export default async function GuidesScrollSection() {
  const guides = await fetchGuides()

  return (
    <section aria-labelledby="guides-heading" className="marquee-wrap py-14 section-pearl">
      <div className="mx-auto max-w-[calc(var(--container-7xl)+6rem)] px-5 sm:px-8 lg:px-12">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#012858] text-white">
              <BookOpen className="h-6 w-6" aria-hidden="true" />
            </span>
            <div>
              <h2 id="guides-heading" className="text-2xl font-extrabold leading-tight text-[#012858] sm:text-3xl">College Guides &amp; Insights</h2>
              <p className="mt-0.5 text-sm text-gray-600">Advice on admissions, fees, placements and career planning</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MarqueePause label="guides" />
            <Link href="/blog" className="group hidden items-center gap-1.5 text-sm font-bold text-[#C90D11] sm:inline-flex">
              All articles <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      {/* Scrolling row. The second set is a visual clone for the seamless loop —
          hidden from screen readers/keyboard, and dropped when motion is reduced
          (the row then scrolls by hand). Pauses on hover, focus or the button. */}
      {guides.length > 0 && (
        <div className="rail-fade overflow-hidden motion-reduce:overflow-x-auto">
          <div className="animate-guides-scroll ml-4 flex w-max py-3 sm:ml-6 lg:ml-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <div className="flex gap-4 pr-4">
              {guides.map((g) => <GuideCard key={g.slug} guide={g} />)}
            </div>
            <LoopClone>
              <div className="flex gap-4 pr-4 motion-reduce:hidden" aria-hidden="true" {...{ inert: true }}>
                {guides.map((g) => <GuideCard key={`${g.slug}-clone`} guide={g} />)}
              </div>
            </LoopClone>
          </div>
        </div>
      )}

      <div className="mt-4 text-center sm:hidden">
        <Link href="/blog" className="text-sm font-bold text-[#C90D11]">View all guides →</Link>
      </div>
    </section>
  )
}
