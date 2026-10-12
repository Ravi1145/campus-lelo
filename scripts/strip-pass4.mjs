// Pass 4: for the remaining lines that carry a package or NIRF figure, drop just the sentences that carry it
// (inside quoted strings, or in JSX text lines), then tidy punctuation left by earlier passes.
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const SKIP = /placements[\\/]page|placement.*page\.tsx|highest-package|scholarships|top-placement|with-100-placement|AlumniQA|ScholarshipFinder|[\\/]data[\\/]/

const NUM = String.raw`(?:₹|Rs\.?\s?)?\s?\d[\d.,]*`
const RANGE = String.raw`${NUM}(?:\s?[–—-]\s?(?:₹|Rs\.?\s?)?\d[\d.,]*)?`
const FIG = new RegExp(String.raw`${RANGE}\s?(?:LPA|L\.?P\.?A\.?)|\bNIRF\s*(?:rank(?:ed|ing|ings)?\s*)?(?:#|no\.?\s*)?\s*\d+`, "i")

const SENT = /(?<=[.!?])\s+(?=[A-Z₹(0-9"'<])/
const dropSentences = (text) => text.split(SENT).filter((s) => !FIG.test(s)).join(" ").trim()

const leftovers = fs.readFileSync(path.join(root, "docs/figure-leftovers.txt"), "utf8").split("\n").filter(Boolean)
const byFile = {}
for (const l of leftovers) {
  const m = l.match(/^(.+?):(\d+): /)
  if (m && !SKIP.test(m[1])) (byFile[m[1]] ??= new Set()).add(+m[2])
}

let changed = 0
for (const [f, set] of Object.entries(byFile)) {
  const p = path.join(root, f)
  const raw = fs.readFileSync(p, "utf8")
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const lines = raw.replace(/\r\n/g, "\n").split("\n")
  for (const n of set) {
    const orig = lines[n - 1]
    if (!FIG.test(orig)) continue
    let l = orig
    // quoted strings
    l = l.replace(/"([^"\n]*)"/g, (m, inner) => {
      if (!FIG.test(inner)) return m
      const kept = dropSentences(inner)
      return '"' + (kept || "See the college's official website for current details.") + '"'
    })
    // JSX text lines that still carry the figure
    if (FIG.test(l)) {
      const lead = l.match(/^\s*/)[0]
      const kept = dropSentences(l.trim())
      l = lead + kept
    }
    if (l !== orig) { lines[n - 1] = l; changed++ }
  }
  fs.writeFileSync(p, lines.join("\n").replace(/\n/g, nl))
}

// Safe text tidy across pages touched by the earlier passes
function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.tsx?$/.test(e.name)) acc.push(q)
  }
  return acc
}
let tidied = 0
for (const f of [...walk(path.join(root, "src/app")), ...walk(path.join(root, "src/components"))]) {
  const raw = fs.readFileSync(f, "utf8")
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const t = raw.replace(/\r\n/g, "\n")
  const u = t
    .replace(/\(\s*,\s+/g, "(")
    .replace(/([A-Za-z]) \(\)(?! =>)(?!\s*\{)(?!\s*[,;)])/g, "$1")
    .replace(/([a-z]) with,\s/g, "$1 with ")
  if (u !== t) { fs.writeFileSync(f, u.replace(/\n/g, nl)); tidied++ }
}
console.log("lines changed:", changed, "files tidied:", tidied)
