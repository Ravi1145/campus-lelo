// Page and heading titles written as "A — B — C" become "A: B, C". fitTitle() in src/lib/seo.ts trims after ": ".
//   node scripts/humanize-titles.mjs [--write]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")
const SKIP = [/[\\/]admin[\\/]/, /scripts[\\/]/, /keywordClusters\.ts$/]
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.tsx?$/.test(e.name) && !SKIP.some((r) => r.test(q))) acc.push(q)
  }
  return acc
}
const fixTitle = (inner) => {
  let first = true
  return inner.replace(/ [—–] /g, () => { if (first) { first = false; return ": " } return ", " })
}
let files = 0, n = 0
for (const f of walk(path.join(root, "src"))) {
  const raw = fs.readFileSync(f, "utf8")
  if (!/ [—–] /.test(raw)) continue
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  let changed = false
  const out = raw.replace(/\r\n/g, "\n").split("\n").map((line) => {
    if (!/(^|[\s{,(])title\s*[:=]/.test(line)) return line
    const next = line.replace(/((?:^|[\s{,(])title\s*[:=]\s*)(`[^`\n]*`|"[^"\n]*"|'[^'\n]*')/g, (m, pre, lit) => {
      if (!/ [—–] /.test(lit)) return m
      n++
      return pre + lit[0] + fixTitle(lit.slice(1, -1)) + lit[lit.length - 1]
    })
    if (next !== line) changed = true
    return next
  })
  if (changed) { files++; if (WRITE) fs.writeFileSync(f, out.join("\n").replace(/\n/g, nl)) }
}
console.log(WRITE ? "WROTE" : "DRY RUN", "files:", files, "titles:", n)
