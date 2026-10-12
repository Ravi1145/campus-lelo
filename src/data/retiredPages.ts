// Pages retired because their content was placement packages or rankings that we cannot source.
// Each 308-redirects to the nearest page that stays. Wired into next.config.ts and filtered out of the sitemap.
// The old page files are archived in docs/archive/retired-placement-pages-2026-10-09.
export const retiredPages: { source: string; destination: string }[] = [
  { source: "/placements", destination: "/colleges" },
  { source: "/mba-colleges-pune-placement", destination: "/mba-colleges-in-pune" },
  { source: "/pune-college-placement-comparator", destination: "/colleges" },
  { source: "/engineering-colleges-pune-placement", destination: "/engineering-colleges-pune" },
  { source: "/mba-colleges-in-pune-highest-package", destination: "/mba-colleges-in-pune" },
  { source: "/top-placement-colleges-pune", destination: "/colleges" },
  { source: "/mba-colleges-in-pune-with-100-placement", destination: "/mba-colleges-in-pune" },
  { source: "/btech-colleges-in-pune-with-placement", destination: "/btech-colleges-in-pune" },
  { source: "/mba-colleges-in-pune-average-package", destination: "/mba-colleges-in-pune" },
  { source: "/mba-placements-pune", destination: "/mba-colleges-in-pune" },
  { source: "/nirf-insights", destination: "/colleges" },
  { source: "/colleges-in-pune/nirf-ranked-colleges-pune", destination: "/colleges-in-pune" },
]
