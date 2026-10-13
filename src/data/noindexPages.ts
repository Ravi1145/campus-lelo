// Pages kept out of search (X-Robots-Tag: noindex) and out of the sitemap until they carry enough sourced content.
// They stay reachable for visitors. To bring one back, delete it from this list and add real, sourced detail first.
// Reasons: very short after unsourced figures were removed, or one template repeated for many items.
export const noindexExact: string[] = [
  "/colleges-in-pune/colleges-in-shivajinagar-pune",
  "/colleges-in-pune/clat-colleges-pune",
  "/jee-main-colleges-pune",
  "/bcom-colleges-pune",
  "/colleges-viman-nagar-pune",
  "/pune-colleges-fees-under-1-lakh",
  "/btech-colleges-in-pune-under-5-lakh",
  "/btech-colleges-in-pune-under-10-lakh",
  "/sppu-affiliated-colleges-pune",
  "/sibm-vs-scmhrd-pune",
  "/vit-pune-vs-mit-wpu",
  "/coep-vs-pict-pune",
  "/neet-cutoff-pune-colleges",
  "/design-colleges-pune",
  "/data-science-colleges-pune",
  "/blog/highest-paying-jobs-after-engineering-pune-2026",
  "/blog/placement-records-pune-engineering-2025",
]

/** Every URL under these prefixes (the index pages /courses, /compare and /career-paths themselves stay indexed). */
export const noindexPrefixes: string[] = ["/courses/", "/compare/", "/career-paths/"]

export function isNoindexPath(pathname: string): boolean {
  return noindexExact.includes(pathname) || noindexPrefixes.some((p) => pathname.startsWith(p) && pathname.length > p.length)
}
