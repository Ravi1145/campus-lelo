// Replaces spaced em/en dashes in visible text with commas, colons, periods or "to".
// They are one of the most reliable signs of machine-written copy. Page titles are skipped on purpose:
// fitTitle() in src/lib/seo.ts uses " — " to know which tail of a title it may drop.
//
//   node scripts/humanize-dashes.mjs           dry run
//   node scripts/humanize-dashes.mjs --write
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")
const DIRS = ["src/app", "src/components", "src/data", "src/lib"]
const SKIP_FILE = [/[\\/]admin[\\/]/, /[\\/]api[\\/]admin/, /scripts[\\/]/, /verified\.ts$/, /noindexPages\.ts$/, /clusterPools\.ts$/, /keywordClusters\.ts$/]

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.(tsx?|css)$/.test(e.name) && !SKIP_FILE.some((r) => r.test(q))) acc.push(q)
  }
  return acc
}

const counts = { to: 0, colon: 0, comma: 0, period: 0, skipped: 0 }

function convert(line) {
  const t = line.trim()
  // comments, regexes and page titles are left alone
  if (/^(\/\/|\/\*|\*|\{\/\*)/.test(t)) return line
  if (/<title|fitTitle|titleTemplate|og:title|\.replace\(|new RegExp|\/[^/\s]*\\[^/]*\//.test(line)) { if (/ [—–] /.test(line)) counts.skipped++; return line }
  let from = 0
  const tm = line.match(/(^|[\s{,(])title\s*[:=]\s*(`[^`]*`|"[^"]*"|'[^']*')/)
  if (tm) from = tm.index + tm[0].length
  // dash glued to a JSX expression, or left dangling at the end of a wrapped line
  line = line.replace(/\{" "\}[—–] /g, ": ").replace(/ [—–]$/, ",")
  // a pair of dashes around an aside ("A — b — c") becomes a pair of commas
  const found = line.match(/ [—–] /g) || []
  const pair = found.length === 2 && from === 0 && !/[₹\d%)}]\s[—–]\s[₹\d{]/.test(line)
  return line.replace(/ [—–] /g, (m, offset, whole) => {
    if (offset < from) return m
    if (pair) { counts.comma++; return ", " }
    const before = whole.slice(0, offset)
    const next = whole[offset + m.length] ?? ""
    const prev = before.slice(-1)
    // range between two expressions: {a} – {b}
    if (prev === "}" && next === "{") { counts.to++; return " to " }
    // numeric range: "₹5 – ₹10 lakh", "2 – 4 years"
    if (/[\d%LKk)]/.test(prev) && /[₹\d]/.test(next) && !/[A-Za-z]{3,}$/.test(before.slice(-6))) { counts.to++; return " to " }
    // words in the current clause
    const clause = before.split(/[.!?:>"'`{}\n]/).pop() ?? ""
    const words = clause.trim().split(/\s+/).filter(Boolean).length
    if (words <= 3) { counts.colon++; return ": " }
    if (/[a-z0-9(₹]/.test(next)) { counts.comma++; return ", " }
    counts.period++
    return ". "
  })
}

let changedFiles = 0
let total = 0
for (const d of DIRS) for (const f of walk(path.join(root, d))) {
  const raw = fs.readFileSync(f, "utf8")
  if (!/ [—–] /.test(raw)) continue
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const lines = raw.replace(/\r\n/g, "\n").split("\n")
  const out = lines.map(convert)
  if (process.argv.includes("--sample")) lines.forEach((l, i) => { if (out[i] !== l && Math.random() < 0.02) console.log(path.relative(root, f) + ":" + (i + 1) + "\n  - " + l.trim().slice(0, 170) + "\n  + " + out[i].trim().slice(0, 170)) })
  if (out.join("\n") !== lines.join("\n")) {
    changedFiles++
    if (WRITE) fs.writeFileSync(f, out.join("\n").replace(/\n/g, nl))
  }
}
total = counts.to + counts.colon + counts.comma + counts.period
console.log(WRITE ? "WROTE" : "DRY RUN", "files:", changedFiles, "replacements:", total, JSON.stringify(counts))
