// One-off codemod: removes unsourced placement-package and NIRF-rank claims from hand-written page source.
// Run:  node scripts/strip-unverified-figures.mjs          (dry run: prints what would change)
//       node scripts/strip-unverified-figures.mjs --write   (applies)
// Rules are conservative: they delete the claim, never invent replacement numbers.
// Leftover lines that need a human are listed in docs/figure-leftovers.txt.
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")

const SKIP = [/src[\\/]data[\\/](noidaColleges|mbaColleges|btechColleges|blogs|blogCalendar|careerPaths)\.ts$/,/src[\\/]lib[\\/]verified\.ts$/, /src[\\/]data[\\/]colleges\.ts$/, /src[\\/]app[\\/]api[\\/]/, /src[\\/]app[\\/]admin[\\/]/, /src[\\/]lib[\\/]ai[\\/]/, /docs[\\/]/, /scripts[\\/]/, /src[\\/]app[\\/]colleges[\\/]\[slug\][\\/]placements/]
const DIRS = ["src/app", "src/components", "src/data"]
const files = []
function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name)
    if (e.isDirectory()) walk(p)
    else if (/\.(tsx?|mjs)$/.test(e.name) && !SKIP.some((r) => r.test(p))) files.push(p)
  }
}
for (const d of DIRS) walk(path.join(root, d))

const NUM = String.raw`(?:₹|Rs\.?\s?)?\s?\d[\d.,]*`
const RANGE = String.raw`${NUM}(?:\s?[–—-]\s?(?:₹|Rs\.?\s?)?\d[\d.,]*)?`
const LPA = String.raw`${RANGE}\s?(?:LPA|L\.?P\.?A\.?)`
const hasFig = new RegExp(String.raw`${LPA}|\bNIRF\s*(?:rank(?:ed|ing|ings)?\s*)?(?:#|no\.?\s*)?\s*\d+|\bnirf:\s*\d+`, "i")

const counts = {}
const bump = (k, n = 1) => (counts[k] = (counts[k] ?? 0) + n)

/** Tidy only inside double-quoted string literals of a line we changed. */
function tidyLiterals(line) {
  return line.replace(/"([^"\n]*)"/g, (m, inner) => '"' + inner.replace(/\(\s*\)/g, "").replace(/,\s*,/g, ",").replace(/\s+([.,;:!?])/g, "$1").replace(/ {2,}/g, " ") + '"')
}

function balanced(line, tag) {
  const open = (line.match(new RegExp("<" + tag + "[\\s>]", "g")) || []).length
  const close = (line.match(new RegExp("</" + tag + ">", "g")) || []).length
  return open > 0 && open === close
}

function applyLine(line) {
  if (!hasFig.test(line)) return line
  let l = line
  const sub = (name, re, fn) => { l = l.replace(re, (...a) => { bump(name); return typeof fn === "function" ? fn(...a) : fn }) }
  // single-line FAQ entries whose answer carries the claim: drop the whole entry
  if (/^\s*\{\s*(?:question|q)\s*:\s*"[^\n]*"\s*,\s*(?:answer|a)\s*:\s*"[^\n]*"\s*\},?\s*$/.test(l)) { bump("faq"); return null }
  // single-line JSX rows / list items / paragraphs that exist to show the figure
  const t = l.trim().match(/^<(div|li|p|tr|span)[\s>]/)
  if (t && balanced(l, t[1]) && l.trim().endsWith("</" + t[1] + ">")) { bump("jsx"); return null }
  sub("tilepair", new RegExp(String.raw`\s*\["[^"\n]*${LPA}[^"\n]*",\s*"[^"\n]*"\],?`, "gi"), "")
  sub("prop", new RegExp(String.raw`\b(placement|avgPkg|avgPackage|highestPackage|highestPkg|avgPlacement|packageRange|salary|avg|highest|pkg|package|ctc)\s*:\s*"[^"\n]*${LPA}[^"\n]*"`, "gi"), (m, k) => k + ': "Not published"')
  sub("paren", new RegExp(String.raw`\s*\([^()"\n]*${LPA}[^()"\n]*\)`, "gi"), "")
  sub("tail", new RegExp(String.raw`\s*[,–—-]\s*(?:avg(?:erage)?\s*(?:package|placement|pkg)?\s*)?${LPA}(?:\s*avg(?:erage)?)?(?:\s*\([^()\n"]*\))?`, "gi"), "")
  sub("avgfrag", new RegExp(String.raw`\s*(?:with\s+)?(?:an?\s+)?(?:highest|average|avg)\s*(?:package|placement|pkg|salary)?\s*(?:of|at|is|:)?\s*${LPA}(?:\s*(?:and|,)\s*(?:a\s+)?(?:highest|average|avg)\s*(?:package|placement|pkg)?\s*(?:of|at|is|:)?\s*${LPA})?`, "gi"), "")
  sub("nirf", /\s*[,|·•–—-]?\s*NIRF\s*(?:Rank\s*)?#\s?\d+(?:\s*\([^()\n"]*\))?/gi, "")
  sub("nirf2", /\s*NIRF\s*(?:rank(?:ed|ing|ings)?\s*)?(?:#|no\.?\s*)?\s*\d+\b/gi, "")
  sub("nirfnum", /\bnirf:\s*\d+/g, "nirf: null")
  return l !== line ? tidyLiterals(l) : l
}

function apply(src) {
  // whole stat tiles that exist only to show a package
  const tiles = new RegExp(String.raw`\n[ \t]*\{\s*(?:value:\s*"[^"\n]*${LPA}[^"\n]*",\s*label:\s*"[^"\n]*"|label:\s*"[^"\n]*",\s*value:\s*"[^"\n]*${LPA}[^"\n]*")\s*\},?`, "gi")
  const s = src.replace(tiles, () => { bump("tile"); return "" })
  return s.split("\n").map(applyLine).filter((l) => l !== null).join("\n")
}

let changedFiles = 0
const leftovers = []
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8")
  if (!hasFig.test(raw)) continue
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  const before = raw.replace(/\r\n/g, "\n")
  const after = apply(before)
  if (after !== before) {
    changedFiles++
    if (WRITE) fs.writeFileSync(f, after.replace(/\n/g, nl))
  }
  after.split("\n").forEach((line, i) => { if (hasFig.test(line)) leftovers.push(`${path.relative(root, f)}:${i + 1}: ${line.trim().slice(0, 170)}`) })
}
console.log(WRITE ? "WROTE" : "DRY RUN", "files changed:", changedFiles, "of", files.length)
console.log("rule hits:", JSON.stringify(counts))
console.log("lines still carrying a figure:", leftovers.length)
fs.writeFileSync(path.join(root, "docs", "figure-leftovers.txt"), leftovers.join("\n"))
