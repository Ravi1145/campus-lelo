# GEO analysis: campuslelo.com

_Audited 2026-10-08 on the live site with `scripts/geo-audit.mjs` (re-runnable). Measured: robots.txt, raw HTML, structured data, headings, passage length. **Not measured:** actual citations in ChatGPT, Perplexity or Google AI Overviews. That needs a tracking tool (e.g. DataForSEO or Ahrefs Brand Radar); none is connected._

## Framing

Google's own position is that optimising for AI search is **still SEO**: helpful, original, well-sourced pages that answer the question. The scores below therefore grade SEO fundamentals as AI surfaces read them. Where popular GEO advice conflicts with Google, Google wins and the conflict is noted.

## 1. GEO readiness score: **61 / 100** (estimate against the five criteria)

| Criterion | Weight | Score | Why |
| --- | --- | --- | --- |
| Citability | 25% | 55 | Direct "quick answer" blocks exist on counselling, exam, MBA-vs-PGDM and cut-off pages. But most guide sections are 81–85 words (median), under the 134–167 sweet spot; only 1–3 of 6–10 sections per guide land in range. |
| Structural readability | 20% | 70 | Clean headings, tables on the exam, cut-off and counselling pages, FAQ schema. Question-style H2s are common on guides (4–5 of 9–10) but rare on hubs, city pages and college profiles (0 of 8–14). |
| Multi-modal content | 15% | 35 | Almost no original images, charts or video on guides. Tools (calendar, calculators, comparison) help. |
| Authority and brand | 20% | 50 | Sources and review dates on MBA pages are strong. Authors are a team name with no credentials, no Person schema, no dates on the homepage, `/mba`, city pages or college profiles. Off-site presence is thin. |
| Technical accessibility | 20% | 92 | Server-rendered (every audited page has 850–4,400 words of text in raw HTML), all AI crawlers allowed, sitemap and AI files present. |

## 2. Platform view (estimates, not measured citations)

| Platform | Est. | What drives it for this site |
| --- | --- | --- |
| Google AI Overviews | 65 | Mostly rankings: 92% of citations come from top-10 pages. The new MBA pages are days old, so rankings must come first. |
| ChatGPT | 45 | Leans on Wikipedia and Reddit. CampusLelo has no brand Wikipedia/Wikidata entry and no Reddit presence. |
| Perplexity | 45 | Leans on Reddit discussion and fresh, well-structured pages. Same gap. |
| Bing Copilot | 60 | Bing index plus IndexNow. IndexNow key is configured; confirm Bing Webmaster Tools has the sitemap. |

## 3. AI crawler access: good

GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, PerplexityBot, Google-Extended, Applebot-Extended, Bingbot and cohere-ai are all explicitly allowed. **CCBot** (Common Crawl, feeds many training sets) and **Bytespider** (ByteDance) are also allowed: that is a choice, not a defect. Block them only if you don't want training use.

## 4. llms.txt: present, but don't count on it

`/llms.txt` (13 KB), `/llms-full.txt` (14 KB, generated from site data) and `/api/ai-context` (27 KB JSON) all return 200. **Evidence check:** Google (Mueller, Illyes) and large studies show `llms.txt` is not a citation lever for major AI search. It is harmless and cheap because it is generated from the same data as the pages, so it stays. Do not expect ranking or citation gains from it, and put effort into the page-level items below.

## 5. Brand mentions: the biggest gap

Brand mentions correlate roughly 3× more with AI visibility than backlinks (Ahrefs, 75,000 brands). Current state:

| Signal | Status |
| --- | --- |
| Organization `sameAs` | Twitter, Facebook, Instagram, YouTube (+ LinkedIn if live). **Confirm each account exists and posts.** |
| Wikipedia / Wikidata entry for CampusLelo | None (the only Wikipedia link is the city of Pune, which is correct for the place). A Wikipedia article needs independent press coverage first; **do not create one yourself.** |
| Reddit | No presence. |
| YouTube content that mentions or explains the brand | Unknown; the channel is linked. |

## 6. Passage-level citability

Ideal: a self-contained 134–167-word block, with the direct answer in the first 40–60 words.

| Page | Sections | In 100–200 words | Median |
| --- | --- | --- | --- |
| /blog/mba-fees-in-india-guide | 10 | 3 | 81 |
| /blog/mba-cutoff-vs-percentile-explained | 9 | 2 | 85 |
| /mba-vs-pgdm | 6 | 1 | 170 |
| /counselling | 6 | 2 | 185 |

Short sections are not wrong, but they give an AI system less to quote on its own. The longest guide sections are tables and lists, which also extract well.

## 7. Server-side rendering: pass

AI crawlers do not run JavaScript. All 12 audited pages return 850+ words in raw HTML, including the filter-heavy college pages (the list is in the server HTML by design).

## 8. Top 5 highest-impact changes

1. **Give the guides a real author and reviewer.** Replace "CampusLelo Editorial Team" with a named person (role, experience, LinkedIn) plus a "reviewed by" line and Person schema. This is Google's "Who" test and the largest authority gap. *Needs you to supply real names and credentials; I will not invent them.*
2. **Show dates everywhere.** Add visible and structured "last updated" to the homepage, `/mba`, city and cluster pages, and college profiles (guides and exam pages already have it).
3. **Make hubs and college pages answer questions.** Question-style H2s plus a 134–167-word answer block ("Which is the best MBA college in Pune for X?") on `/mba-colleges-in-pune`, city pages and profiles. Use only facts already in the data.
4. **Build off-site mentions honestly.** YouTube explainers (CAT dates, MBA vs PGDM, reading a placement report), genuine helpful Reddit answers in r/CATpreparation and r/MBA_India disclosing who you are, and the press and calendar outreach in `docs/BACKLINK_STRATEGY.md`. This is the lever the studies point at.
5. **Add original visuals.** An exam-timeline graphic, a fee-breakdown chart and a CAP-round flow on the guides. Original media is what lifts selection rates, and it is yours alone.

## 9. Schema recommendations

Already in place: Organization, WebSite, LocalBusiness, FAQPage, Service (two offers), Dataset (calendar), WebPage with speakable, Article/BlogPosting, BreadcrumbList, CollegeOrUniversity.
To add: **Person** (named authors), **`dateModified`** on pages that lack it, **ProfilePage/`reviewedBy`** once reviewers exist, **LocalBusiness `openingHours`** (the audit's only LocalBusiness warning). Do not add FAQ markup to purely commercial pages; keep it where answers are real.

## 10. Content reformatting suggestions

- **Fees guide:** merge the short sections "Why does the same degree cost so much more…" (≈70 words) and "Is a costlier MBA always better?" into one 140-word block that opens with the answer.
- **Cut-off guide:** put a 45-word definition of "cut-off" first, then the table; open "What percentile do I need?" with the one-sentence answer ("There is no single percentile; it depends on…").
- **Homepage and `/mba`:** add a 50-word "What is CampusLelo?" answer block near the top (the audit found none).
- **College profiles:** open with a 60-word factual summary (type, NAAC, NIRF, fees range, exams accepted) before the tabs.

## Quick wins I can do in code now

Items 2 and 3 above, the `openingHours` field, and rewriting the section blocks in item 10. Items 1, 4 and 5 need information or content from you.
