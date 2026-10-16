import { Building2 } from "lucide-react"
import { colleges as staticColleges } from "@/data/colleges"
import CollegeMarqueeCard from "./CollegeMarqueeCard"
import MarqueePause from "./MarqueePause"
import LoopClone from "@/components/ui/LoopClone"

interface MarqueeCollege { slug: string; name: string; shortName: string; logo?: string }

async function getMarqueeColleges(): Promise<MarqueeCollege[]> {
  try {
    const { createAdminClient } = await import('@/lib/supabase/admin')
    const admin = createAdminClient()
    const { data } = await admin
      .from('colleges')
      .select('slug, name, short_name, logo_url, cover_url')
      .eq('status', 'published')
      .order('featured_order', { ascending: true })
      .limit(20)
    if (data && data.length > 0) {
      return (data as { slug: string; name: string; short_name: string | null; logo_url: string | null; cover_url: string | null }[]).map(c => ({
        slug:      c.slug,
        name:      c.name,
        shortName: c.short_name ?? c.name,
        // Only use logo_url — never fall back to cover_url (banner photos break in 44×44px)
        logo:      c.logo_url ?? undefined,
      }))
    }
  } catch { /* fall through to static */ }

  // Static fallback — only use actual logos, never cover/banner images
  return staticColleges.slice(0, 20).map((c) => ({
    slug:      c.slug,
    name:      c.name,
    shortName: c.shortName,
    logo:      c.logo ?? undefined,  // c.image is a cover photo, not a logo
  }))
}

export default async function CollegeMarquee() {
  const COLLEGES = await getMarqueeColleges()

  return (
    <section aria-labelledby="marquee-heading" className="marquee-wrap section-ivory py-8 border-b border-gray-100">
      {/* Section title */}
      <div className="max-w-[calc(var(--container-7xl)+6rem)] mx-auto px-5 sm:px-8 lg:px-12 mb-6">
        <div className="flex items-center gap-3 justify-center">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200 max-w-[80px]" />
          <h2 id="marquee-heading" className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            Top Colleges in Pune
          </h2>
          <MarqueePause label="college logos" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200 max-w-[80px]" />
        </div>
      </div>

      {/* Marquee wrapper */}
      <div className="relative overflow-hidden">
        {/* Fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track — three identical sets; translating -1/3 loops seamlessly.
            Only the first set is exposed to screen readers / keyboard. */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          <div className="flex gap-4 pr-4">
            {COLLEGES.map((c) => (
              <CollegeMarqueeCard key={`${c.slug}-0`} college={c} />
            ))}
          </div>
          {/* Loop filler: added after load so it stays out of the server HTML */}
          <LoopClone>
            {[1, 2].map((set) => (
              <div key={set} className="flex gap-4 pr-4" aria-hidden="true" {...{ inert: true }}>
                {COLLEGES.map((c) => (
                  <CollegeMarqueeCard key={`${c.slug}-${set}`} college={c} />
                ))}
              </div>
            ))}
          </LoopClone>
        </div>
      </div>
    </section>
  )
}

