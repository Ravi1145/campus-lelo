# Ranking plan for campuslelo.com (written 21 Oct 2026)

Facts behind this plan: Search Console (17 Oct) shows the site was first seen by Google around 11 Oct,
average position ~68, 573 impressions, 10 clicks. Big education sites own the head terms. We have no
backlink or volume tool connected, so nothing below is a promise of a position or a date.

## 1. What is done (all live)
- Technical: HTTPS/HSTS, one canonical, title, description, H1 and OG image on every page (431 pages checked);
  alt text on all images; no skipped heading levels; JSON-LD on all tool and content pages; sitemap 430+ URLs.
- Content built from sourced data: NIRF 2025 best-college pages (India, Delhi, Noida, Greater Noida, 8 states),
  PGDM pages (India, Delhi, UP), per-programme admission pages (26), institute cut-off pages, Hindi/Hinglish pages,
  and from 21 Oct a CUET PG exam hub from NTA's own bulletin.
- Home page: Pune-only block replaced by NIRF 2025 top colleges (MBA, Engineering, Medical, Law), in the HTML.
- Weak or unsourced material removed from llms-full.txt and /api/ai-context.

## 2. What decides ranking from here (in order)
1. Links from real education sites (see LINK-OUTREACH.md). Target 10-20 in 4 weeks.
2. Google knowing the pages exist: sitemap + Request Indexing in Search Console (owner action).
3. Pages that beat the big sites on freshness and sourcing: official-bulletin pages (CUET PG, FMS, IIFT, Doon, DIT).
4. One page per search (avoid the three Pune MBA pages competing).
5. Time: re-export Search Console every 2 weeks and tune the pages that start to appear.

## 3. Search focus (proxies, not measured volume)
Win first: institute cut-off and admission pages, "accepting CAT/CMAT" by city, PGDM by city, CUET PG dates and pattern,
Hindi "MBA kya hai / PGDM kya hai". Later: "best MBA colleges in <city>". Not servable without sourced data: fees,
placements, Mumbai/Bangalore/Hyderabad.

## 4. Next builds (need sources, in order)
1. Refresh CUET PG the day NTA publishes the 2027 bulletin (dates, fee, registration).
2. Verified records for Mumbai/Bangalore/Hyderabad, then un-noindex the Karnataka/Tamil Nadu/Gujarat/West Bengal pages.
3. A named reviewer/author byline with Person schema (needs a real person's name from the owner).
4. Merge or re-target the three Pune MBA pages.

## 5. Owner actions (cannot be done from code)
- Search Console: submit sitemap, request indexing on the key pages.
- Links and brand profiles (LinkedIn, YouTube, Instagram, Google Business Profile) under "CampusLelo".
- Old domain collegepune.com: legal route.
