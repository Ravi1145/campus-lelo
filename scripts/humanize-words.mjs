// Swaps words that read as machine-written for plain ones, in visible copy only.
//   node scripts/humanize-words.mjs [--write]
import fs from "node:fs"
import path from "node:path"

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1")), "..")
const WRITE = process.argv.includes("--write")
const SKIP = [/[\\/]admin[\\/]/, /SearchModal\.tsx$/, /[\\/]api[\\/]admin/, /prompts\.ts$/]

// [pattern, replacement]. Case of the first letter is carried over.
const RULES = [
  [/\balso serves as\b/g, "is also"],
  [/\bserves as\b/g, "is"],
  [/\bvibrant\b/gi, "lively"],
  [/\bcutting-edge\b/gi, "modern"],
  [/\bholistic\b/gi, "well-rounded"],
  [/\bcomprehensive\b/gi, "full"],
  [/\bempowering\b/gi, "supportive"],
  [/\bnestled in\b/gi, "set in"],
  [/\ba testament to\b/gi, "a sign of"],
  [/\bcrucial\b/gi, "important"],
  [/\bleveraging\b/gi, "using"],
  [/\bleverage\b/gi, "use"],
  [/\bDiscover Your Education Journey\b/g, "Start your college search"],
  [/\b(education|science education|MBA) landscape\b/gi, (m, a) => (a.toLowerCase() === "mba" ? "MBA options" : a)],
  [/\bThe Pune Recruitment Landscape\b/g, "Recruitment in Pune"],
  [/\bUnlock full data free\b/g, "See the full data free"],
  [/\bUnlock (\d{4}[–-]\d{4}) Cutoff Data\b/g, "See $1 cutoff data"],
  [/\bUnlocking…/g, "Loading…"],
  [/\b(counsellors help you|Don&apos;t) navigate\b/g, (m, a) => (a.startsWith("Don") ? "Don&apos;t handle" : "counsellors help you work through")],
]

function walk(d, acc = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const q = path.join(d, e.name)
    if (e.isDirectory()) walk(q, acc)
    else if (/\.tsx?$/.test(e.name) && !SKIP.some((r) => r.test(q))) acc.push(q)
  }
  return acc
}

const carry = (from, to) => (/^[A-Z]/.test(from) ? to.charAt(0).toUpperCase() + to.slice(1) : to)
let files = 0, total = 0
for (const f of walk(path.join(root, "src"))) {
  const raw = fs.readFileSync(f, "utf8")
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  let changed = false
  const out = raw.replace(/\r\n/g, "\n").split("\n").map((line) => {
    if (/^\s*(\/\/|\*|\/\*|\{\/\*)/.test(line)) return line
    let l = line
    for (const [re, rep] of RULES) {
      l = l.replace(re, (...a) => {
        total++
        const r = typeof rep === "function" ? rep(...a) : rep.replace(/\$1/g, a[1] ?? "")
        return carry(a[0], r)
      })
    }
    if (l !== line) changed = true
    return l
  })
  if (changed) { files++; if (WRITE) fs.writeFileSync(f, out.join("\n").replace(/\n/g, nl)) }
}
console.log(WRITE ? "WROTE" : "DRY RUN", "files:", files, "replacements:", total)
