// Indexing audit: crawls every URL in /sitemap.xml and checks it is indexable,
// then looks for built pages that are missing from the sitemap and classifies them.
//
//   npm run build && npx next start -p 4400        (in one terminal)
//   node scripts/seo-index-audit.mjs               (in another; optional: BASE url as 1st arg)
//
// Exit code 1 if the sitemap lists anything that is not a clean, indexable 200.
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const BASE = (process.argv[2] || "http://localhost:4400").replace(/\/$/, "")
const PROD = process.env.NEXT_PUBLIC_BASE_URL || "https://campuslelo.com"
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

const xml = await (await fetch(`${BASE}/sitemap.xml`)).text()
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
const inSitemap = new Set(urls.map((u) => new URL(u).pathname.replace(/\/$/, "") || "/"))
console.log(`sitemap: ${urls.length} URLs (${new Set(urls).size} unique)`)

async function probe(pathname) {
  const r = await fetch(BASE + pathname, { redirect: "manual" })
  const out = { path: pathname, status: r.status, loc: r.headers.get("location") || "", noindex: /noindex/i.test(r.headers.get("x-robots-tag") || ""), canonical: "", title: "", h1: false }
  if (r.status === 200 && (r.headers.get("content-type") || "").includes("html")) {
    const h = await r.text()
    out.canonical = (h.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/) || [])[1] || ""
    const mr = (h.match(/<meta[^>]+name="robots"[^>]+content="([^"]+)"/) || [])[1] || ""
    if (/noindex/i.test(mr)) out.noindex = true
    out.title = (h.match(/<title[^>]*>([^<]*)<\/title>/) || [])[1] || ""
    out.h1 = /<h1[\s>]/.test(h)
  }
  return out
}
async function pool(items, fn, n = 10) {
  const res = []
  let i = 0
  await Promise.all(Array.from({ length: n }, async () => { while (i < items.length) res.push(await fn(items[i++])) }))
  return res
}

const rows = await pool(urls.map((u) => new URL(u).pathname), probe)
const self = (r) => PROD + (r.path === "/" ? "" : r.path)
const problems = {
  "not a 200 (404 / redirect)": rows.filter((r) => r.status !== 200),
  "noindex but listed": rows.filter((r) => r.status === 200 && r.noindex),
  "no canonical": rows.filter((r) => r.status === 200 && !r.canonical),
  "canonical points elsewhere": rows.filter((r) => r.status === 200 && r.canonical && r.canonical.replace(/\/$/, "") !== self(r)),
  "no <title>": rows.filter((r) => r.status === 200 && !r.title.trim()),
  "no <h1>": rows.filter((r) => r.status === 200 && !r.h1),
}
const titles = {}
rows.filter((r) => r.status === 200).forEach((r) => (titles[r.title] ||= []).push(r.path))
problems["duplicate <title>"] = Object.entries(titles).filter(([t, p]) => t && p.length > 1).map(([t, p]) => ({ path: p.join(", "), status: 200, loc: t }))

let bad = 0
for (const [k, v] of Object.entries(problems)) {
  console.log(`\n${v.length === 0 ? "OK  " : "FAIL"} ${k}: ${v.length}`)
  v.slice(0, 15).forEach((r) => console.log(`     ${r.status} ${r.path}${r.loc ? " → " + r.loc : ""}${r.canonical && k.startsWith("canonical") ? " | " + r.canonical : ""}`))
  if (v.length) bad++
}
const longTitles = rows.filter((r) => r.title.length > 70).length
console.log(`\nnote: ${longTitles} titles are longer than 70 characters (they get cut off in search results)`)

// Built pages that the sitemap does not list
try {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, ".next/prerender-manifest.json"), "utf8"))
  const appRoutes = JSON.parse(fs.readFileSync(path.join(root, ".next/app-path-routes-manifest.json"), "utf8"))
  const built = new Set(Object.keys(manifest.routes).map((r) => r.replace(/\/$/, "") || "/"))
  for (const [k, v] of Object.entries(appRoutes)) if (k.endsWith("/page") && !/\[/.test(v)) built.add(v.replace(/\/$/, "") || "/")
  const skip = /^\/(admin|api|embed|_not-found|_global-error)|\.(txt|xml|csv|json|png|ico)$|\/(csv|opengraph-image|icon|apple-icon)$/
  const missing = [...built].filter((p) => !inSitemap.has(p) && !skip.test(p)).sort()
  const probed = await pool(missing, probe, 8)
  const buckets = { "indexable 200 — should it be in the sitemap?": [], "redirects (fine)": [], "noindex (fine)": [], "404 / error": [] }
  for (const r of probed) {
    if (r.status >= 300 && r.status < 400) buckets["redirects (fine)"].push(r)
    else if (r.status === 200 && r.noindex) buckets["noindex (fine)"].push(r)
    else if (r.status === 200) buckets["indexable 200 — should it be in the sitemap?"].push(r)
    else buckets["404 / error"].push(r)
  }
  console.log(`\nbuilt pages not in the sitemap: ${missing.length}`)
  for (const [k, v] of Object.entries(buckets)) {
    console.log(`  ${k}: ${v.length}`)
    if (!k.includes("fine")) v.forEach((r) => console.log(`     ${r.status} ${r.path}`))
  }
  if (buckets["indexable 200 — should it be in the sitemap?"].length) bad++
} catch (e) {
  console.log("\n(skipped missing-page check — run `npm run build` first)", e.message)
}

console.log(bad ? "\nRESULT: needs attention" : "\nRESULT: clean")
process.exit(bad ? 1 : 0)
