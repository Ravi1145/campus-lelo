// Pass 3b: drop string items that carry a package figure from highlight arrays in data files,
// and fix up leftovers in a few known free-text spots.
import fs from "node:fs"

const NUM = String.raw`(?:₹|Rs\.?\s?)?\s?\d[\d.,]*`
const RANGE = String.raw`${NUM}(?:\s?[–—-]\s?(?:₹|Rs\.?\s?)?\d[\d.,]*)?`
const LPA = String.raw`${RANGE}\s?(?:LPA|L\.?P\.?A\.?)`
const files = ["src/data/btechColleges.ts", "src/data/mbaColleges.ts", "src/data/noidaColleges.ts", "src/data/blogCalendar.ts", "src/data/careerPaths.ts"]
for (const f of files) {
  const raw = fs.readFileSync(f, "utf8")
  const nl = raw.includes("\r\n") ? "\r\n" : "\n"
  let s = raw.replace(/\r\n/g, "\n")
  const before = s
  s = s.replace(new RegExp(String.raw`,\s*"[^"\n]*${LPA}[^"\n]*"`, "gi"), "")
  s = s.replace(new RegExp(String.raw`"[^"\n]*${LPA}[^"\n]*",\s*`, "gi"), "")
  fs.writeFileSync(f, s.replace(/\n/g, nl))
  console.log(f, before !== s ? "changed" : "same")
}
