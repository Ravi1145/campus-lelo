// Cluster + segment the harvested MBA/PGDM queries.
// Run:  node docs/keywords/cluster.mjs
// In : docs/keywords/raw-suggestions.json  (from harvest.mjs)
// Out: docs/keywords/mba-keywords.csv, docs/keywords/mba-clusters.json, src/data/mba/keywordClusters.ts
import fs from "node:fs"
import path from "node:path"

const here = path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"))
const root = path.resolve(here, "../..")
const raw = JSON.parse(fs.readFileSync(path.join(here, "raw-suggestions.json"), "utf8"))

// ── What exists on the site (routes + blog slugs) ───────────────────────────
const routes = new Set(fs.readdirSync(path.join(root, "src/app"), { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => "/" + d.name))
// Pages that redirect elsewhere (next.config.ts) must never be a keyword target
const redirected = new Set([...fs.readFileSync(path.join(root, "next.config.ts"), "utf8").matchAll(/source:\s*"(\/[a-z0-9-]+)"/g)].map((m) => m[1]))
for (const m of fs.readFileSync(path.join(root, "src/data/retiredPages.ts"), "utf8").matchAll(/source:\s*"(\/[a-z0-9-]+)"/g)) redirected.add(m[1])
const has = (u) => routes.has(u) && !redirected.has(u)
const BLOG = "/blog/mba-colleges-delhi-ncr-noida-guide"

// ── Dimension detectors ─────────────────────────────────────────────────────
const LOCATIONS = [
  ["greater noida", /greater noida/], ["noida", /\bnoida\b/], ["gurgaon", /gurgaon|gurugram/], ["delhi ncr", /\bncr\b/],
  ["delhi", /\bdelhi\b/], ["lucknow", /lucknow/], ["dehradun", /dehradun|\bdoon\b|\bupes\b|graphic era/], ["uttarakhand", /uttarakhand|kashipur|roorkee|haridwar/], ["uttar pradesh", /uttar pradesh|\bup\b|aktu|upsee|uptac/], ["ghaziabad", /ghaziabad/], ["pune", /\bpune\b|\bpumba\b|\bsibm\b|scmhrd|mit wpu|\bsymbiosis\b/], ["mumbai", /mumbai|nmims|spjimr|welingkar|\bjbims\b/],
  ["bangalore", /bangalore|bengaluru/], ["hyderabad", /hyderabad|\bisb\b/],
]
const EXAMS = [
  ["mah-mba-cet", /mah[- ]?(mba )?cet|mba cet|mh[- ]?cet mba|maharashtra cet/], ["cuet-pg", /cuet/], ["nmat", /nmat/], ["snap", /\bsnap\b/], ["xat", /\bxat\b/],
  ["cmat", /\bcmat\b/], ["gmat", /\bgmat\b/], ["atma", /\batma\b/], ["cat", /\bcat\b(?! food)/], ["mat", /^mat\b|\bmat (exam|20\d\d|score|result|registration|cutoff|syllabus)/],
]
const SPECS = [
  ["marketing", /marketing/], ["finance", /finance|banking/], ["hr", /\bhr\b|human resource/], ["business-analytics", /analytics/], ["data-science", /data science/],
  ["operations", /operations/], ["supply-chain", /supply chain|logistics/], ["international-business", /international business/], ["entrepreneurship", /entrepreneur/],
  ["healthcare", /healthcare|hospital/], ["digital-marketing", /digital marketing/],
]
const TOPICS = [
  ["comparison", /\bvs\b|versus|\bor pgdm\b|which is better|difference|equal to|compare/],
  ["no-exam-direct", /without (cat|entrance|exam|cet|mat|gmat|xat|cmat|snap)|no entrance|direct admission|management quota|spot admission|without any/],
  ["cutoff-percentile", /cut ?off|percentile|required score|score needed|marks needed|minimum score|good score|score vs|rank needed/],
  ["placements-salary", /placement|package|salary|\blpa\b|recruiter|\bjobs?\b|\bctc\b|highest package/],
  ["fees-funding", /fee|cost|scholarship|\bloan\b|affordable|cheap|\broi\b|worth it|lakh|low budget/],
  ["exam-dates-prep", /exam date|registration|syllabus|exam pattern|pattern|preparation|prepare|\bresult\b|admit card|notification|application form|last date|attempts|mock|books|strategy|slot|sections|\bform\b/],
  ["mode-format", /distance|online|executive|part[- ]?time|weekend|working professional|one year|1[- ]year|evening|correspondence|flexi/],
  ["eligibility-profile", /eligib|criteria|qualification|age limit|after (btech|b tech|bcom|b com|bsc|ba|engineering|graduation|12th|bba|bca)|work experience|work ex\b|freshers?|non[- ]?engineer|backlog|percentage required|marks required/],
  ["admission-process", /admission|apply|process|counselling|selection|gd pi|\bwat\b|interview|documents/],
  ["best-top-ranking", /\bbest\b|\btop\b|ranking|\brank\b|nirf|\blist\b|good|famous|leading|tier/],
  ["campus-life", /hostel|girls|women|campus|accommodation/],
  ["course-basics", /syllabus|subjects|course details|duration|full form|meaning|what is|specializations?|branches|types of|scope|career|after mba/],
]
const INTENT = (kw, topic) => {
  if (/\b(apply|admission|registration|form|direct admission|last date|enrol)\b/.test(kw) || topic === "no-exam-direct") return "transactional"
  if (/(best|top|list|vs|versus|compare|ranking|fees|cutoff|placement|package|review|worth)/.test(kw)) return "commercial"
  if (topic === "college-specific") return "navigational"
  return "informational"
}
const FUNNEL = { informational: "awareness", commercial: "consideration", transactional: "decision", navigational: "consideration" }

const COLLEGE = /\b(sibm|scmhrd|mit[- ]wpu|symbiosis|fms|iift|bimtech|jaipuria|iim\w*|xlri|nmims|ipe|great lakes|welingkar|flame|pumba|imt|mdi|jbims|spjimr|isb|amity|jims|lbsim|mica|tapmi|sp jain|xime|ximb|vit|christ|ashoka)\b/

const hasMba = /\b(mba|pgdm|b[- ]?schools?|iim\w*|xlri|sibm|scmhrd|fms|iift|bimtech|nmims|imt|mdi|flame|welingkar|spjimr|symbiosis|jbims|great lakes|ipe|pumba|business school)\b/
const examContext = /(exam|date|registration|syllabus|pattern|result|cut ?off|percentile|score|admit|college|eligib|prepar|form|notification|attempt|vs|fees|colleges)/

function classify(kw) {
  const loc = LOCATIONS.find(([, r]) => r.test(kw))?.[0] ?? null
  const exam = EXAMS.find(([, r]) => r.test(kw))?.[0] ?? null
  const spec = SPECS.find(([, r]) => r.test(kw))?.[0] ?? null
  let topic = TOPICS.find(([, r]) => r.test(kw))?.[0] ?? null
  if (!topic && spec) topic = "specialization"
  if (!topic && COLLEGE.test(kw)) topic = "college-specific"
  if (topic === "best-top-ranking" && COLLEGE.test(kw) && !/best|top|list/.test(kw)) topic = "college-specific"
  if (!topic) topic = "general"
  if (spec && ["general", "best-top-ranking", "course-basics"].includes(topic)) topic = "specialization"
  if (COLLEGE.test(kw) && ["general", "course-basics"].includes(topic)) topic = "college-specific"
  return { loc, exam, spec, topic }
}

function relevant(kw) {
  if (hasMba.test(kw)) return true
  const e = EXAMS.find(([, r]) => r.test(kw))
  return !!e && examContext.test(kw)
}

// ── Landing-page mapping (best existing URL for a query; null = gap) ────────
const OTHER_CITIES = /\b(mumbai|bangalore|bengaluru|hyderabad|kolkata|chennai|ahmedabad|jaipur|indore|nagpur|chandigarh|coimbatore|bhopal|kochi|goa|patna|ranchi|vizag|visakhapatnam|surat|vadodara|nashik|thane|navi mumbai|telangana|kerala|karnataka|tamil nadu|gujarat|rajasthan|uttar pradesh|new zealand|usa|canada|abroad|australia|uk|germany|dubai)\b/
function landing(kw, c) {
  const P = (u) => (has(u) ? u : null)
  // Cities and countries we have no pages for — leave unmapped (listed as gaps), don't point at another city's page
  if (OTHER_CITIES.test(kw)) return null
  // ── Delhi / Delhi NCR / Gurugram / Noida / Greater Noida: dedicated region pages ──────────
  const NCRLOC = ["delhi", "delhi ncr", "gurgaon", "noida", "greater noida"]
  if (NCRLOC.includes(c.loc)) {
    const ex = ["cat", "xat", "gmat", "cmat"].includes(c.exam) ? c.exam : null
    if (/without|no entrance|direct admission|management quota|non[- ]?cat|other than cat/.test(kw)) return P("/mba-colleges-in-delhi-ncr-without-cat")
    if (/cut ?off|percentile/.test(kw)) return c.loc === "noida" || c.loc === "greater noida" ? P("/mba-cutoff-uttar-pradesh") : P("/mba-cutoff-delhi-ncr")
    if (ex && /accept|college|score|admission/.test(kw)) return c.loc === "delhi" && ex === "cat" ? P("/mba-colleges-in-delhi-accepting-cat") : P(`/mba-colleges-in-delhi-ncr-accepting-${ex}`)
    if (/pgdm/.test(kw)) return c.loc === "noida" || c.loc === "greater noida" ? P("/pgdm-colleges-noida") : P("/pgdm-colleges-in-delhi-ncr")
    if (c.loc === "greater noida") return P("/mba-colleges-in-greater-noida")
    if (c.loc === "noida") return P("/mba-colleges-noida")
    if (c.loc === "delhi") return P("/mba-colleges-in-delhi")
    return P("/mba-colleges-in-delhi-ncr") // delhi ncr, gurgaon
  }
  const slugExam = c.exam === "cuet-pg" ? null : c.exam
  // Exam-led queries → exam hub / topic pages
  if (slugExam && (c.topic === "exam-dates-prep" || c.topic === "cutoff-percentile" || !hasMba.test(kw) || /exam|syllabus|registration|date/.test(kw))) {
    if (/syllabus|pattern|sections|marking/.test(kw)) return `/exams/${slugExam}/syllabus`
    if (/percentile|score|cut ?off/.test(kw)) return `/exams/${slugExam}/score-vs-percentile`
    if (/prepar|strategy|books|mock/.test(kw)) return `/exams/${slugExam}/preparation`
    if (/college|accept/.test(kw) && c.loc === "pune") return P(`/mba-colleges-in-pune-accepting-${slugExam === "mah-mba-cet" ? "mh-cet" : slugExam}`) ?? `/exams/${slugExam}/colleges`
    if (/college|accept/.test(kw)) return `/exams/${slugExam}/colleges`
    return `/exams/${slugExam}`
  }
  if (slugExam && /accept|colleges/.test(kw) && c.loc === "pune") return P(`/mba-colleges-in-pune-accepting-${slugExam === "mah-mba-cet" ? "mh-cet" : slugExam}`)
  if (c.topic === "comparison" && /pgdm|mba/.test(kw)) return "/mba-vs-pgdm"

  const loc = c.loc
  if (loc === "pune" || (!loc && /pune/.test(kw))) {
    if (c.spec) return P(`/mba-colleges-in-pune-for-${c.spec === "business-analytics" ? "business-analytics" : c.spec}`)
    if (/online/.test(kw)) return P("/mba-colleges-in-pune-online")
    if (/part[- ]?time/.test(kw)) return P("/mba-colleges-in-pune-part-time")
    if (/weekend/.test(kw)) return P("/mba-colleges-in-pune-weekend")
    if (/executive|working professional/.test(kw)) return P("/mba-colleges-in-pune-executive")
    if (/girls|women/.test(kw)) return P("/mba-colleges-in-pune-for-girls")
    if (/hostel/.test(kw)) return P("/mba-colleges-in-pune-with-hostel")
    if (/scholarship/.test(kw)) return P("/mba-colleges-in-pune-scholarship")
    if (/pgdm/.test(kw)) return P("/pgdm-colleges-pune")
    if (/without cat/.test(kw)) return P("/mba-admission-pune-without-cat")
    if (/without|no entrance/.test(kw)) return P("/mba-colleges-in-pune-without-entrance-exam")
    if (/direct admission|management quota/.test(kw)) return P("/mba-colleges-in-pune-direct-admission")
    if (/highest package/.test(kw)) return P("/mba-colleges-in-pune-highest-package")
    if (c.topic === "placements-salary") return P("/mba-placements-pune")
    if (/90 percentile/.test(kw)) return P("/mba-colleges-in-pune-cutoff-90-percentile")
    if (/70 percentile/.test(kw)) return P("/mba-colleges-in-pune-cutoff-70-percentile")
    if (/50 percentile/.test(kw)) return P("/mba-colleges-in-pune-cutoff-50-percentile")
    if (c.topic === "cutoff-percentile") return P("/mba-cutoff-pune")
    const lakh = kw.match(/under (\d+) ?lakh/)
    if (lakh) return P(`/mba-colleges-in-pune-under-${lakh[1]}-lakh`)
    if (c.topic === "fees-funding") return P("/low-fees-mba-colleges-pune")
    if (c.topic === "admission-process" || c.topic === "eligibility-profile") return P("/mba-admission-process-pune")
    if (/top 10|top ten/.test(kw)) return P("/top-10-mba-colleges-in-pune")
    if (c.topic === "best-top-ranking") return P("/best-mba-colleges-pune")
    return P("/mba-colleges-in-pune")
  }
  if (loc === "noida" || loc === "greater noida") {
    if (/pgdm/.test(kw)) return P("/pgdm-colleges-noida")
    if (c.topic === "cutoff-percentile" || c.topic === "no-exam-direct" || c.topic === "eligibility-profile" || c.topic === "admission-process") return BLOG
    return P("/mba-colleges-noida")
  }
  if (loc === "delhi" || loc === "delhi ncr" || loc === "gurgaon") {
    if (c.topic === "cutoff-percentile") return P("/mba-cutoff-delhi-ncr")
    return BLOG
  }
  if (loc === "dehradun") return c.topic === "cutoff-percentile" ? P("/mba-cutoff-uttarakhand") : P("/mba-colleges-in-dehradun")
  if (loc === "uttarakhand") return c.topic === "cutoff-percentile" ? P("/mba-cutoff-uttarakhand") : P("/mba-colleges-in-uttarakhand")
  if (loc === "lucknow") return c.topic === "cutoff-percentile" ? P("/mba-cutoff-uttar-pradesh") : P("/mba-colleges-in-lucknow")
  if (loc === "uttar pradesh") return c.topic === "cutoff-percentile" ? P("/mba-cutoff-uttar-pradesh") : c.topic === "admission-process" ? "/blog/mba-admission-in-uttar-pradesh" : P("/mba-colleges-in-uttar-pradesh")
  if (loc === "ghaziabad") return c.topic === "cutoff-percentile" ? P("/mba-cutoff-delhi-ncr") : P("/mba-colleges-in-delhi-ncr")
  if (loc === "mumbai" && c.topic === "cutoff-percentile") return P("/mba-cutoff-mumbai")
  if (loc) return null // Bangalore / Hyderabad / other Mumbai topics — no page yet
  // Location-less / national queries
  if (/vs|pgdm/.test(kw) && /pgdm/.test(kw) && c.topic === "comparison") return "/mba-vs-pgdm"
  if (/pgdm/.test(kw) && /full form|meaning|what is|equal|valid|recogni[sz]ed/.test(kw)) return "/mba-vs-pgdm"
  if (/entrance|exam/.test(kw) && /list|india|which|types/.test(kw)) return "/exams"
  return null
}

// ── Build rows ──────────────────────────────────────────────────────────────
const rows = []
for (const [kw, meta] of Object.entries(raw)) {
  if (!relevant(kw)) continue
  if (kw.length < 6 || kw.length > 90) continue
  if (/\b(porn|sex|jobs? vacancy|meme)\b/.test(kw)) continue
  const c = classify(kw)
  const intent = INTENT(kw, c.topic)
  rows.push({ keyword: kw, ...c, intent, funnel: FUNNEL[intent], signal: Math.max(1, 11 - meta.bestRank) + Math.min(meta.seeds.length, 3), landing: landing(kw, c) })
}

// Cluster key: exam-led queries cluster by exam×topic; others by topic×location
const GEO = { "greater noida": "noida", noida: "noida", gurgaon: "delhi-ncr", "delhi ncr": "delhi-ncr", delhi: "delhi-ncr" }
const geoOf = (r) => (r.loc ? GEO[r.loc] ?? r.loc : "india")
function clusterKey(r) {
  if (r.exam && (r.topic === "exam-dates-prep" || r.topic === "cutoff-percentile" || !hasMba.test(r.keyword))) return `exam:${r.exam}:${r.topic === "cutoff-percentile" ? "score" : "exam-info"}`
  if (r.topic === "specialization") return `specialization:${r.spec ?? "general"}:${geoOf(r)}`
  return `${r.topic}:${geoOf(r)}`
}
const groups = new Map()
for (const r of rows) { const k = clusterKey(r); r.cluster = k; (groups.get(k) ?? groups.set(k, []).get(k)).push(r) }

// Fold tiny clusters (<4 queries) into the parent topic:india cluster
for (const [k, list] of [...groups]) {
  if (list.length >= 4) continue
  const topic = k.startsWith("exam:") ? "general" : k.split(":")[0]
  const parent = `${topic}:india`
  if (parent === k) continue
  groups.delete(k)
  for (const r of list) r.cluster = parent
  ;(groups.get(parent) ?? groups.set(parent, []).get(parent)).push(...list)
}

const CLUSTER_NAMES = {
  "best-top-ranking": "Best / top MBA colleges", "fees-funding": "MBA fees, scholarships & loans", "cutoff-percentile": "MBA cut-offs & percentiles",
  "placements-salary": "MBA placements & salary", "no-exam-direct": "MBA without entrance exam / direct admission", "exam-dates-prep": "MBA entrance exam dates & prep",
  "mode-format": "Executive, online, part-time MBA", "eligibility-profile": "MBA eligibility & profile", "admission-process": "MBA admission process",
  "campus-life": "MBA hostel, girls & campus", "course-basics": "MBA course basics & career", comparison: "MBA vs PGDM & comparisons",
  specialization: "MBA specialisations", "college-specific": "College-specific MBA queries", general: "General MBA queries",
}
const pretty = (k) => {
  if (k.startsWith("exam:")) { const [, e, t] = k.split(":"); return `${e.toUpperCase().replace("-", " ")} ${t === "score" ? "score, percentile & cut-off" : "dates, syllabus & prep"}` }
  const [t, a, b] = k.split(":")
  if (t === "specialization") return `MBA in ${a.replace(/-/g, " ")}${b && b !== "india" ? ` — ${b}` : ""}`
  return `${CLUSTER_NAMES[t] ?? t}${a && a !== "india" ? ` — ${a}` : ""}`
}

// Gap clusters → the article written for them (src/data/blog-posts/mba-india-guides.ts)
const B = (slug) => `/blog/${slug}`
const ARTICLE_FOR = {
  "fees-funding:india": { url: B("mba-fees-in-india-guide"), supporting: ["/low-fees-mba-colleges-pune", "/mba-colleges-noida"] },
  "placements-salary:india": { url: B("mba-placements-and-salary-how-to-read-reports"), supporting: ["/mba-placements-pune", "/mba-colleges-noida"] },
  "best-top-ranking:india": { url: B("how-to-choose-an-mba-college-in-india"), supporting: ["/mba-colleges-pune", "/mba-colleges-noida", "/compare"] },
  "exam:cuet-pg:score": { url: B("cuet-pg-mba-colleges-and-cutoff-explained"), supporting: ["/blog/mba-cutoff-vs-percentile-explained", "/mba-counselling"] },
  "cutoff-percentile:india": { url: B("mba-cutoff-vs-percentile-explained"), supporting: ["/mba-cutoff-pune", "/mba-cutoff-delhi-ncr"] },
  "admission-process:india": { url: B("mba-admission-process-in-india"), supporting: ["/mba-admission-process-pune", "/exams"] },
  "eligibility-profile:india": { url: B("mba-eligibility-criteria-in-india"), supporting: ["/exams", "/mba-admission-process-pune"] },
  "no-exam-direct:india": { url: B("mba-without-cat-india"), supporting: ["/mba-admission-pune-without-cat", "/mba-colleges-in-pune-without-entrance-exam"] },
  "mode-format:india": { url: B("executive-online-part-time-mba-india"), supporting: ["/mba-colleges-in-pune-executive", "/mba-colleges-in-pune-online", "/mba-colleges-in-pune-part-time"] },
  "specialization:india": { url: B("mba-specialisations-explained"), supporting: ["/mba-colleges-in-pune-for-marketing", "/mba-colleges-in-pune-for-finance"] },
  "exam-dates-prep:india": { url: B("mba-entrance-exams-in-india"), supporting: ["/exams", "/exams/cat"] },
  "course-basics:india": { url: B("mba-entrance-exams-in-india"), supporting: ["/mba-vs-pgdm"] },
}
for (const sp of ["marketing", "finance", "hr", "business-analytics", "data-science", "operations", "supply-chain", "international-business", "entrepreneurship", "healthcare"]) ARTICLE_FOR[`specialization:${sp}:india`] = ARTICLE_FOR["specialization:india"]

const clusters = []
for (const [id, list] of groups) {
  list.sort((a, b) => b.signal - a.signal)
  const counts = {}
  for (const r of list) if (r.landing) counts[r.landing] = (counts[r.landing] ?? 0) + 1
  const ranked = Object.entries(counts).sort((a, b) => b[1] - a[1])
  const covered = list.filter((r) => r.landing).length
  clusters.push({
    id, name: pretty(id), size: list.length, signal: list.reduce((s, r) => s + r.signal, 0),
    intent: Object.entries(list.reduce((m, r) => ((m[r.intent] = (m[r.intent] ?? 0) + 1), m), {})).sort((a, b) => b[1] - a[1])[0][0],
    pillar: covered / list.length >= 0.5 ? ranked[0]?.[0] ?? null : ARTICLE_FOR[id]?.url ?? null,
    supporting: covered / list.length >= 0.5 ? ranked.slice(1, 5).map(([u]) => u) : ARTICLE_FOR[id]?.supporting ?? [],
    article: !!ARTICLE_FOR[id] && covered / list.length < 0.5,
    coverage: Math.round((covered / list.length) * 100),
    keywords: list.slice(0, 14).map((r) => r.keyword),
  })
}
clusters.sort((a, b) => b.signal - a.signal)

// ── Outputs ─────────────────────────────────────────────────────────────────
const esc = (s) => `"${String(s ?? "").replace(/"/g, '""')}"`
const csv = ["keyword,cluster,topic,location,exam,specialisation,intent,funnel_stage,signal,target_url,page_status"]
const byId = new Map(clusters.map((c) => [c.id, c]))
for (const r of rows.sort((a, b) => a.cluster.localeCompare(b.cluster) || b.signal - a.signal)) {
  const cl = byId.get(r.cluster)
  const url = r.landing ?? cl?.pillar ?? ""
  const status = r.landing ? "page exists" : cl?.pillar ? (cl.article ? "new article" : "cluster pillar") : "GAP — page needed"
  csv.push([r.keyword, r.cluster, r.topic, r.loc ?? "", r.exam ?? "", r.spec ?? "", r.intent, r.funnel, r.signal, url, status].map(esc).join(","))
}
fs.writeFileSync(path.join(here, "mba-keywords.csv"), "﻿" + csv.join("\n"))
fs.writeFileSync(path.join(here, "mba-clusters.json"), JSON.stringify(clusters, null, 1))

// Compact data for the site: only clusters with a real landing page; top queries only
const siteClusters = clusters.filter((c) => c.pillar && c.size >= 4).map(({ id, name, intent, pillar, supporting, keywords, size }) => ({ id, name, intent, pillar, supporting, size, keywords: keywords.slice(0, 10) }))
const ts = `// GENERATED by docs/keywords/cluster.mjs from real Google India autocomplete suggestions.
// Autocomplete shows what people type; it has no search-volume data.
// Do not edit by hand — re-run harvest.mjs + cluster.mjs.
export interface KeywordCluster {
  id: string
  name: string
  intent: "informational" | "commercial" | "transactional" | "navigational"
  /** Best existing page for this cluster */
  pillar: string
  /** Other pages that serve the cluster */
  supporting: string[]
  /** Number of harvested queries in the cluster */
  size: number
  /** Real queries, strongest signal first */
  keywords: string[]
}

export const keywordClusters: KeywordCluster[] = ${JSON.stringify(siteClusters, null, 2)}
`
fs.writeFileSync(path.join(root, "src/data/mba/keywordClusters.ts"), ts)

console.log("relevant queries:", rows.length, " clusters:", clusters.length, " site clusters:", siteClusters.length)
console.log("gap clusters (no page for <50% of queries):")
for (const c of clusters.filter((c) => c.coverage < 50).slice(0, 25)) console.log(`  ${String(c.size).padStart(4)}  ${c.id}  cov=${c.coverage}%  e.g. ${c.keywords.slice(0, 3).join(" | ")}`)
