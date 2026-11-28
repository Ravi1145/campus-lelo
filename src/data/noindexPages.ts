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
  // Added 28 Nov 2026: a content-similarity check found these share more than 60% of their wording with a stronger page
  // (one template, only the keyword swapped). Kept out of search so Google sees one page per topic, not many copies.
  "/mba-colleges-in-delhi-ncr-accepting-cat",
  "/mba-colleges-in-delhi-ncr-accepting-gmat",
  "/pgdm-colleges-in-delhi-ncr",
  "/mba-colleges-in-delhi-ncr-accepting-cmat",
  "/mba-colleges-in-delhi-accepting-cat",
  "/pgdm-colleges-in-delhi",
  "/mba-colleges-in-delhi-accepting-gmat",
  "/pgdm-colleges-in-uttar-pradesh",
  "/mba-colleges-in-pune-accepting-mat",
  "/mba-colleges-in-pune-accepting-gmat",
  "/cutoffs/mht-cet/sit-pune-symbiosis-institute-of-technology",
  "/cutoffs/mht-cet/pict-pune-institute-computer-technology",
  "/cutoffs/mht-cet/jspm-narhe-technical-campus-pune",
  "/cutoffs/jee/mit-wpu-mit-world-peace-university",
  "/cutoffs/jee/coep-college-of-engineering-pune",
  "/cutoffs/neet/afmc-armed-forces-medical-college-pune",
  "/cutoffs/neet/bj-government-medical-college-pune",
  "/mba-colleges-in-pune-part-time",
  "/mba-colleges-in-pune-online",
  "/mba-colleges-in-pune-for-supply-chain",
  "/mba-colleges-in-pune-for-data-science",
  "/mba-colleges-in-pune-cutoff-70-percentile",
  "/mba-colleges-in-pune-for-international-business",
  "/mba-colleges-in-pune-without-entrance-exam",
  "/mba-colleges-in-pune-low-fees",
  "/mba-colleges-in-pune-for-girls",
  "/mba-colleges-in-pune-under-15-lakh",
  "/mba-colleges-in-pune-cutoff-50-percentile",
  "/mba-colleges-in-pune-cutoff-90-percentile",
  "/mba-colleges-in-pune-under-20-lakh",
  "/mba-colleges-in-pune-weekend",
]

/** Every URL under these prefixes (the index pages /courses, /compare and /career-paths themselves stay indexed). */
export const noindexPrefixes: string[] = ["/courses/", "/compare/", "/career-paths/"]

export function isNoindexPath(pathname: string): boolean {
  return noindexExact.includes(pathname) || noindexPrefixes.some((p) => pathname.startsWith(p) && pathname.length > p.length)
}
