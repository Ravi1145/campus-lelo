# Backlink strategy for campuslelo.com

_Written 2026-10-05. Backlinks are links from other websites to yours. Search engines treat links from relevant, trusted sites as votes. They take months to build and nobody can guarantee a ranking._

## 1. What is already built (so there is something worth linking to)

| Asset | URL | Why people link to it |
| --- | --- | --- |
| MBA exam calendar (verified, CSV download, cite box) | `/mba-exam-calendar` | A single bookmarkable table of every MBA exam date; bloggers, coaching sites and students cite or share it |
| Embeddable calendar widget | `/embed/mba-exam-calendar` | Other sites paste it in; the embed code includes a credit link back to you |
| Published-cut-off pages | `/mba-cutoff-delhi-ncr`, `/mba-cutoff-pune` | Only officially published numbers, with what each measures — rare and quotable |
| Ten national MBA guides | `/blog/...`, hub at `/mba` | Reference-quality explainers for the biggest queries (fees, placements, cut-offs, eligibility…) |
| MBA vs PGDM, editorial policy | `/mba-vs-pgdm`, `/editorial-policy` | Trust and citation material |
| Press & media kit | `/press` | Journalists and bloggers can find boilerplate, topics, logos and contact in one place |

Everything on these pages is sourced. Keep it that way: **links follow trust, and one wrong date that gets quoted and corrected publicly costs more than ten links earn.**

## 2. Baseline first (free, 15 minutes)

1. **Google Search Console → Links.** Note "External links → Top linking sites" and total count. This is your free baseline and shows which pages already attract links.
2. Ahrefs/Semrush (if you have an account): record referring domains and the top 10 linked pages. The Ahrefs connector in this workspace is not authorised yet — authorise it in your connector settings and a competitor gap analysis can be added.
3. Put the numbers in `docs/templates/backlink-tracker.csv` (sheet "baseline") so progress is measurable.

## 3. Tactics, in the order to do them

### A. Quick wins (week 1) — profiles and citations you control
These are mostly `nofollow` or low-weight, but they confirm your identity to search engines and drive referral traffic. Use your real details only, and keep the name, address and phone **identical** everywhere.
- LinkedIn company page, YouTube channel, Medium or Substack. Link to `/mba` and `/mba-exam-calendar`.
- Google Business Profile **only if** you have a real, staffed office address customers can visit.
- Indian local directories such as Justdial and Sulekha: claim or create one listing.
- Add each real profile URL to the Organization `sameAs` list in `src/lib/seo.ts` (currently Twitter, Facebook, Instagram — confirm those accounts exist and are active before relying on them).

### B. Promote the calendar and widget (weeks 1–4) — the highest-leverage asset
Who benefits from embedding or citing a verified MBA exam calendar:
- CAT, XAT, SNAP and CMAT coaching blogs and YouTube mentors (they get asked "when is the exam?" constantly).
- College and department blogs that run admissions news; student clubs and alumni groups.
- Education bloggers and Telegram/WhatsApp community admins (links there are mostly nofollow, but they send real visitors, and some get cited later).
Ask for a link by offering the widget or the CSV (template 1).

### C. Resource-page link building (weeks 2–8)
Many universities, placement cells and coaching sites keep "useful links for MBA aspirants" pages. Find them with Google:
- `"MBA entrance exams" "useful links"`
- `"CAT" "resources" inurl:resources` or `"MBA aspirants" "helpful links"`
- `"MBA colleges in Pune" "resources"`
Pitch a specific page they should add (template 2). Offer value; do not ask for a favour with nothing in return.

### D. Fix what exists (ongoing)
- **Unlinked mentions:** set a Google Alert for `"CampusLelo"` and `"campuslelo.com"`. When someone mentions you without a link, send a short thank-you asking them to link (template 4). This converts best of all tactics.
- **Broken-link building:** on exam-resource pages, find dead outbound links (the "Check My Links" browser extension works). Email the owner the dead URL and suggest your matching page as a replacement (template 3).

### E. Digital PR (months 2–3)
Journalists link to data and clear answers, not to promotion.
- **Story angles you can back with your own data:** "Nine MBA entrance exams, one calendar: where the dates overlap this season", "MBA vs PGDM: what the difference really means for your degree", "What 'average package' hides: how to read a placement report".
- **Targets:** education and city desks at Pune and national newspapers and news sites, plus education newsletters. Send the story pitch (template 5) with a link to `/press`.
- **Expert-quote platforms:** sign up for free tiers of Qwoted and Featured, plus the "Source of Sources" email. Answer only questions where you have verified information.

### F. Partnerships (months 2–4)
- Colleges you list (for example the ones in `src/data/mba/programAdmissions.ts`) can link to "verified admission information" on your page if you share the data you verified. Never trade links for a better listing.
- Student communities and alumni associations: offer a guest explainer on MBA admissions.

### G. Guest articles (months 3+)
Write editorial pieces for education blogs and student publications — expert content with a bio link, not a keyword-stuffed ad. Ask the editor about their guidelines first; **never pay for placement**.

## 4. Anchor text (what the clickable words say)

| Type | Share | Example |
| --- | --- | --- |
| Brand | ~50% | "CampusLelo" |
| Bare URL | ~20% | campuslelo.com/mba |
| Generic | ~15% | "this calendar", "their guide" |
| Descriptive / partial match | ~15% | "MBA entrance exam calendar" |

Do not ask for exact-match phrases such as "best MBA colleges in Pune". A natural profile looks varied; a repeated keyword anchor looks manipulated.

## 5. What not to do

- **Do not buy links, join link exchanges or use private blog networks.** Google's spam policies target these, and the penalties can wipe out rankings you already have.
- Do not comment-spam, forum-spam or mass-submit to directories.
- Do not use automated outreach tools at scale or send the same email to hundreds of strangers.
- Do not offer a college a better listing in exchange for a link.
- Do not publish unsourced numbers to make a page "more linkable". Trust is the product.

## 6. Outreach templates

Replace anything in `[brackets]`. Send from a real person's address, keep it short, follow up once after 7 days, then stop.

**1. Embed / cite the calendar**
> Subject: Free MBA exam dates widget for [site name]
>
> Hi [Name],
> I read your [specific post]. Your readers probably ask when each MBA entrance exam happens, so I wanted to share something that may help: a verified calendar of CAT, XAT, SNAP, NMAT, CMAT, MAT and others, each date linked to the official source and marked clearly when it is not yet confirmed. It's free to embed (it updates itself) or download as CSV: campuslelo.com/mba-exam-calendar
> If it's useful, you are welcome to use it. Happy to fix anything you spot.
> [Your name], CampusLelo

**2. Resource-page addition**
> Subject: Suggestion for your MBA resources page
>
> Hi [Name],
> I found your page "[page title]" while looking for MBA admissions resources — it's a helpful list. One resource you may want to add is our verified MBA exam calendar (campuslelo.com/mba-exam-calendar). It lists registration and exam dates for nine exams with official links, and says plainly when a date isn't confirmed.
> Thanks for considering it,
> [Your name]

**3. Broken-link replacement**
> Subject: A broken link on [page title]
>
> Hi [Name],
> While reading [page URL] I noticed the link to "[link text]" now returns a 404 ([dead URL]). If it helps, a current page covering the same topic is [your URL]. Either way, I wanted you to know about the broken link.
> [Your name]

**4. Unlinked mention**
> Subject: Thanks for mentioning CampusLelo
>
> Hi [Name],
> Thanks for mentioning CampusLelo in [article]. If you can, please link the mention to [exact page] so readers can find the source easily. Thank you!
> [Your name]

**5. Journalist pitch**
> Subject: [One-line story angle — e.g. "Nine MBA entrance exams, one calendar: where dates clash this season"]
>
> Hi [Name],
> For your readers following MBA admissions: [two-sentence finding or explainer, with a number you can source]. We keep a sourced calendar of every major MBA entrance exam at campuslelo.com/mba-exam-calendar and can comment on how admissions work, from exam choice to reading placement reports. Press kit and contact: campuslelo.com/press.
> [Your name]

## 7. 30 / 60 / 90 days

| When | Do | Measure |
| --- | --- | --- |
| Days 1–7 | Baseline in Search Console; create the profiles in 3A; set Google Alerts; update `sameAs` | Baseline row in the tracker |
| Days 8–30 | 10 outreach emails/week to coaching blogs and resource pages (templates 1–2); 5 unlinked-mention checks | Emails sent, replies, links won |
| Days 31–60 | Find 20 resource pages and 10 broken-link opportunities; pitch 5 journalists with a data angle | New referring domains |
| Days 61–90 | One guest article; two partnership conversations; review which assets earned links and double down | Referring domains, referral clicks, rankings for the MBA clusters |

A realistic target is 5–15 relevant referring domains in 90 days from a standing start. Quality and relevance count more than quantity.

## 8. Tracking

Use `docs/templates/backlink-tracker.csv` (one row per prospect: contacted, replied, link live, link type, anchor, URL). Re-check live links monthly; links disappear.

KPIs: new referring domains per month, links to the calendar/guides specifically, referral sessions, impressions and position for the MBA query clusters in `docs/MBA_KEYWORD_CLUSTERS.md`.

## 9. Technical notes

- `/embed/*` is framable by other sites and set to `noindex`; every other page still blocks framing (`next.config.ts`).
- The widget's credit link points to `/mba-exam-calendar`. Check that the embed code on that page keeps the credit line.
- All three calendar outputs (page, CSV, widget) read the same verified data in `src/data/mba/exams.ts`, so a date fixed there is fixed everywhere.
