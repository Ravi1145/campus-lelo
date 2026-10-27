# Why campuslelo.com is not ranking yet, and how it turns into leads (27 Oct 2026)

Source: Search Console export of 27 Oct (last 3 months, web search). No SEO tool is connected, so volume,
difficulty and backlinks are not measured. Numbers below are from that export unless stated.

## What the data says
| Fact | Number | What it means |
|---|---|---|
| Site first seen by Google | 11-12 Oct | The domain is about 2 weeks old to Google. |
| Impressions per day | 113 average until 21 Oct, 492 average since 22 Oct | Google started testing the site in more results. This is the good news. |
| Average position | 74 on 20 Oct, 37 on 25 Oct | Moving up, but still page 4 on average. |
| Total | about 4,300 impressions, 21 clicks (0.5% CTR) | Almost no one sees us on page 1. |
| Where impressions sit | 78% at positions 51-100, 13 impressions at positions 1-3 | The pages are indexed but ranked too low to be clicked. |
| Mobile vs desktop | Mobile: position 23, CTR 2.5%. Desktop: position 64, CTR 0.15% | Clicks come from mobile. Desktop impressions are mostly deep results. |
| Country | 84% India; Brazil, US, Bangladesh and others make up the rest | Some impressions are irrelevant to admissions. |
| www vs apex | 112 pages appear under both, 26% of impressions are on www URLs | Google still holds old www URLs. Our pages, sitemap and canonicals use only the apex domain, and www redirects with a 308, so this will merge over time. |
| Delhi-intent queries | "mba colleges in delhi ncr" 56 impressions, position 41, 2 clicks. "mba colleges in delhi" and "best mba colleges in delhi" sit at positions 46-54 | Delhi is where we are closest to page 1 for lead-intent searches. |

## The issues, in order of impact
1. **No links from other sites.** Google trusts a new domain by who links to it. Careers360, Shiksha, Collegedunia and the rest have thousands of links; we have almost none. This is the main reason pages sit at positions 50-100. Fix: `docs/keywords/LINK-OUTREACH.md`. Owner action.
2. **Domain age.** Two weeks. Even good pages usually take 1-3 months to settle. Nothing in code shortens this.
3. **Impressions are on the wrong searches.** The most-seen queries are generic ("mba entrance exam", "mba admission", "btech entrance exam 2025") and Pune-based, where the giants rank. Admission-intent Delhi searches get few impressions because few pages targeted them until now. Fix: the 100-keyword plan and the new Delhi pages below.
4. **Three Pune MBA pages compete with each other** (`/mba-colleges-in-pune`, `/mba-colleges-pune`, `/top-10-mba-colleges-in-pune`). Titles are now separated; a merge is still open.
5. **www/apex duplication** in Google's index (above). Self-corrects.
6. **The old domain collegepune.com** still serves a competing site. Legal route, owner action.
7. **No sourced fees or placements**, which are the most-searched MBA phrases. This is a deliberate trade for trust and cannot be fixed without official sources.

What is not wrong: titles, descriptions, H1s, canonicals, alt text, schema, sitemap, HTTPS and speed all pass on all 431 pages.

## What was built from this (27 Oct)
- `docs/keywords/DELHI-100-LEAD-KEYWORDS.md` and `.csv`: 100 Delhi-first lead keywords, each mapped to a page.
- New landing pages with a lead form: `/mba-admission-in-delhi`, `/pgdm-admission-in-delhi`.
- New Delhi exam pages: `/mba-colleges-in-delhi-accepting-xat`, `/mba-colleges-in-delhi-accepting-gmat`, `/mba-colleges-in-delhi-without-cat`.
- 20 Delhi-focused guides (`src/data/blog-posts/delhi-lead-guides.ts`), 8 live now and 12 scheduled between 30 Oct and 10 Nov.
- Auto-publishing: guides carry a `publishAt` date; a daily GitHub workflow redeploys so they appear on time (needs one secret from the owner).

## From impressions to leads
leads = impressions x click-through rate x form conversion. Today: about 4,300 impressions x 0.5% = 21 clicks, so at any realistic form conversion that is roughly zero to one lead. The only ways up are (a) more impressions on lead-intent searches, (b) a higher position and so a higher CTR, and (c) a form people complete.

Done for (c): the Delhi admission pages put a free-shortlist form in the sidebar on desktop and a call-to-action block in the page body for mobile, where most clicks come from.
Next for (c): track `generate_lead` events in Google Analytics so we can see conversion per page (the form already sends the event), and add a click-to-WhatsApp option if the owner wants it.

Targets (not forecasts): get the Delhi admission pages to page 1-2 for 10-15 of the Tier A keywords, and the daily impressions to 1,000+, before expecting steady leads. Re-export Search Console on 10 Nov and 24 Nov to check.
