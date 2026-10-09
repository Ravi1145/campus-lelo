// GEO / AI-search audit: measures the signals AI search systems can actually read.
//   node scripts/geo-audit.mjs [base-url]     (default https://campuslelo.com)
const BASE = (process.argv[2] || "https://campuslelo.com").replace(/\/$/, "")
const get = async (p) => { const r = await fetch(BASE + p, { redirect: "follow" }); return { status: r.status, text: await r.text(), url: r.url } }
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<noscript[\s\S]*?<\/noscript>/g, " ").replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
const words = (t) => (t ? t.split(/\s+/).filter(Boolean).length : 0)

// 1. Crawler access
const robots = (await get("/robots.txt")).text
const BOTS = ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bytespider", "Bingbot", "cohere-ai"]
const access = BOTS.map((b) => {
  const block = robots.split(/\n(?=User-Agent:)/i).find((s) => new RegExp(`User-Agent:\\s*${b}\\b`, "i").test(s))
  return { bot: b, listed: !!block, blocked: block ? /Disallow:\s*\/\s*$/m.test(block) : false }
})
console.log("1) CRAWLER ACCESS (robots.txt)")
access.forEach((a) => console.log(`   ${a.bot.padEnd(18)} ${a.blocked ? "BLOCKED" : a.listed ? "allowed (explicit)" : "allowed (default *)"}`))

// 2. Machine-readable guides
console.log("\n2) AI FILES")
for (const p of ["/llms.txt", "/llms-full.txt", "/api/ai-context", "/sitemap.xml"]) { const r = await get(p); console.log(`   ${p.padEnd(18)} ${r.status}  ${(r.text.length / 1024).toFixed(0)} KB`) }

// 3. Page checks
const PAGES = ["/", "/mba", "/mba-exam-calendar", "/counselling", "/exams/cat", "/mba-vs-pgdm", "/mba-cutoff-delhi-ncr", "/blog/mba-fees-in-india-guide", "/blog/mba-cutoff-vs-percentile-explained", "/blog/how-to-choose-an-mba-college-in-india", "/mba-colleges-in-pune", "/colleges/coep-college-of-engineering-pune"]
console.log("\n3) PER-PAGE SIGNALS (raw HTML, no JavaScript executed)")
console.log("   " + ["page".padEnd(44), "words", "SSR", "q-H2", "list/tbl", "date", "author", "schema types"].join("  "))
const rows = []
for (const p of PAGES) {
  const r = await get(p)
  const h = r.text, t = strip(h)
  const h2 = [...h.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => strip(m[1]))
  const qh = h2.filter((x) => /\?$|^(what|how|which|who|when|why|is|are|can|do|does)\b/i.test(x)).length
  const types = new Set()
  for (const m of h.matchAll(/<script[^>]+application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) { try { const j = JSON.parse(m[1]); for (const x of [].concat(j)) [].concat(x["@type"]).forEach((y) => types.add(y)) } catch {} }
  const row = {
    p, words: words(t), ssr: words(t) > 300, qh: `${qh}/${h2.length}`,
    struct: (h.match(/<table/g) || []).length + "/" + (h.match(/<ul|<ol/g) || []).length,
    date: /dateModified|datePublished|<time/.test(h), author: /"author"|rel="author"|byline/i.test(h) ,
    types: [...types].join(",").slice(0, 60),
  }
  rows.push(row)
  console.log("   " + [p.padEnd(44), String(row.words).padStart(5), row.ssr ? "yes" : "NO ", row.qh.padStart(4), row.struct.padStart(8), row.date ? "yes " : "no  ", row.author ? "yes   " : "no    ", row.types].join("  "))
}

// 4. Passage citability on guides: paragraphs (or paragraph + following list) in the ideal 134-167 word range
console.log("\n4) PASSAGE CITABILITY (blocks under each H2; ideal 134-167 words, direct answer in first 60)")
for (const p of ["/blog/mba-fees-in-india-guide", "/blog/mba-cutoff-vs-percentile-explained", "/mba-vs-pgdm", "/counselling"]) {
  const h = (await get(p)).text
  const body = h.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, "")
  const parts = body.split(/<h2[^>]*>/).slice(1).map((s) => { const [head, ...rest] = s.split(/<\/h2>/); return { head: strip(head), n: words(strip(rest.join(" ").split(/<h2/)[0])) } })
  const ideal = parts.filter((x) => x.n >= 100 && x.n <= 200).length
  console.log(`   ${p.padEnd(44)} sections ${String(parts.length).padStart(2)} · 100-200 words: ${String(ideal).padStart(2)} · median ${String([...parts.map((x) => x.n)].sort((a, b) => a - b)[Math.floor(parts.length / 2)] ?? 0).padStart(3)} words`)
}

// 5. Entity signals
const home = (await get("/")).text
const sameAs = [...home.matchAll(/"sameAs":\s*(\[[^\]]*\]|"[^"]*")/g)].flatMap((m) => { try { return [].concat(JSON.parse(m[1])) } catch { return [] } })
console.log("\n5) ENTITY / BRAND SIGNALS")
console.log("   Organization sameAs:", [...new Set(sameAs)].join(", ") || "none")
for (const [name, re] of [["YouTube", /youtube\.com/i], ["LinkedIn", /linkedin\.com/i], ["Wikipedia/Wikidata", /wikipedia\.org\/wiki\/(?!Pune)|wikidata/i], ["Reddit", /reddit\.com/i]]) console.log(`   ${name.padEnd(20)} ${re.test(sameAs.join(" ")) ? "linked" : "NOT linked"}`)
const person = rows.some((r) => /Person/.test(r.types))
console.log(`   Person schema on any audited page: ${person ? "yes" : "no"}`)
console.log(`   Author line on guides: ${(await get("/blog/mba-fees-in-india-guide")).text.match(/CampusLelo Editorial Team/) ? "\"CampusLelo Editorial Team\" (no individual, no credentials)" : "not found"}`)
