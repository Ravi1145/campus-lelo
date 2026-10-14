import { collegeRedirects } from "@/data/collegeRedirects"

/**
 * Link to a college profile. Some landing pages list colleges that have no profile page yet; for those,
 * link straight to the destination in collegeRedirects instead of sending visitors and crawlers
 * through a redirect.
 */
export function collegeHref(slug: string): string {
  return collegeRedirects[slug] ?? `/colleges/${slug}`
}
