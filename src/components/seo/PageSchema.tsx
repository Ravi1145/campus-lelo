import { generateBreadcrumbSchema } from "@/lib/seo"
import { safeJsonLd } from "@/lib/jsonld"

const BASE = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"

/** WebPage + BreadcrumbList for pages that have no schema of their own. Server component. */
export default function PageSchema({ name, path, description }: { name: string; path: string; description: string }) {
  const webPage = {
    "@context": "https://schema.org", "@type": "WebPage", "@id": `${BASE}${path}`, url: `${BASE}${path}`, name, description, inLanguage: "en-IN",
    isPartOf: { "@id": `${BASE}/#website` }, publisher: { "@type": "Organization", name: "CampusLelo", url: BASE },
  }
  const crumbs = generateBreadcrumbSchema([{ name: "Home", url: "/" }, { name, url: path }])
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(webPage) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(crumbs) }} />
    </>
  )
}
