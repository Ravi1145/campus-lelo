# UI/UX & User-Flow Audit — CampusLelo

**Date:** 5 Oct 2026 · **Method:** UI/UX Pro Max checklist (accessibility, touch, performance, style, layout, typography & colour, forms, navigation), with automated in-browser measurements at 1024px and 375px plus manual journey testing.
**Design direction (from the skill's design engine):** *Trust & Authority + Conversion* page pattern, *Accessible & Ethical* style. This is the right fit for an education-decision product. Brand colours come from the logo (see `globals.css`).

---

## 1. User-flow tests

| # | Journey | Before | After |
|---|---|---|---|
| F1 | Header search "MBA colleges" | **0 results**: search needed the whole phrase inside one field | Word-based search: 52–74 results, dedicated MBA institutes ranked first, "Best match" sort (`src/lib/collegeSearch.ts`) |
| F2 | Search "engineering colleges with hostel" | 0 results | 39 results, all with hostels (hostel / government / private / deemed understood) |
| F3 | Hero finder → `/colleges?stream=MBA&exam=CAT` | `exam` ignored; stream chip showed "All"; BBA/BCA/MCA/Design showed everything | `stream`, `exam`, `type`, `hostel` URL params applied; course-like streams matched as keywords; exam match is partial ("CAT" ↔ "CAT 2026") |
| F4 | Compare: add 2 colleges → "Compare Now" | Landed on an **empty** compare form; floating bar covered it | Both colleges pre-selected from the URL; instant 10-row facts table (no AI wait); bar hidden on `/compare` |
| F5 | `/colleges` first load | Only "Loading colleges from database…" in the HTML (crawlers saw no colleges; slow phones saw a spinner) | Server-rendered list of all colleges as the fallback (104 colleges in the HTML); interactive grid takes over after load |
| F6 | Counselling booking form | Labels not linked to fields | `htmlFor`/`id` linked, errors announced (`role="alert"`), numeric keypad and autofill on the phone field; tapping a label focuses its field (tested) |
| F7 | Exit popup | Fired after 25s on **phones** (intrusive interstitial) and on the **back button** | Desktop only (exit intent or 25s); back button no longer hijacked |
| F8 | Lead bar submit | Showed "submitted" even when the API rejected the lead | Confirms only on success |
| F9 | Lead bar vs header | Bar covered the top of the header and hid the logo | Header and content offset by the bar's height (`--leadbar-h`) |

## 2. Measurements (homepage, before → after)

| Check (skill priority) | Before | After |
|---|---|---|
| Contrast failures (≥4.5:1 text) | 84 desktop / 81 mobile | **11** after the palette change (then the WhatsApp button and exam pills were fixed too) |
| Text under 12px | 304 | **0** (117 hardcoded 9–11px sizes raised to 12px in 44 files) |
| Skip link | ✗ | ✓ first Tab stop, jumps to `#main-content` (tested) |
| Visible keyboard focus | Removed in ~95 places | Global `:focus-visible` ring (3px royal blue) |
| Reduced motion | No support; 3 auto-scrolling marquees | `prefers-reduced-motion` stops marquees and shortens transitions |
| Horizontal scroll | None | None |
| H1 / heading order | 1 H1, no skips | Unchanged ✓ |
| Image alt / dimensions | All present | Unchanged ✓ |
| Hero finder labels | 2 selects unlabelled; placeholder grey 2.6:1 | `aria-label`s added; placeholder contrast 4.76:1 |
| Hero layout at 640–1279px | Selects squeezed to "Sele…" | Stacked full width until 1280px |

The dev server cached old CSS during testing; the production build was checked directly and contains the new rules.

## 3. Content accuracy & trust (pattern: Trust & Authority)

| Finding | Status |
|---|---|
| Hero: "500+ Colleges Listed" / "Compare 500+ colleges" (the site profiles about 104) | Fixed → "100+ Colleges Profiled" |
| Hero: "100% Verified Information" (this session found many unverified claims) | Fixed → "Sourced — Exam & Admission Data" |
| Stream cards showed hardcoded counts (Engineering 120, MBA 68) | Fixed → computed from data with the same rules as `/colleges` |
| "50,000+ students guided" / "50K+ Students Guided" | **Needs owner confirmation** — can't be verified from the codebase |
| Testimonials name students with outcomes ("Placed at ₹26 LPA" after SIBM) that a 2026-launched platform can't yet have produced | **Needs owner decision** — remove or replace with real, consented testimonials |
| SIBM in the Supabase database still lists CAT/XAT (static data was fixed earlier) | **Needs approval** — production data change |

## 4. "More informative" additions
- **Homepage "Upcoming entrance exams" band:** next date for each MBA/PGDM exam from the sourced data (past cycles worded as "2027 dates awaited", GMAT "year-round"), with links to every exam guide plus MBA vs PGDM, the Delhi NCR cut-offs, compare and the editorial policy.
- **Compare page:** instant side-by-side facts table.
- **`/colleges`:** a full college list visible immediately.

## 5. Still open (prioritised)

| Priority | Item | Why | Effort |
|---|---|---|---|
| High | Emoji used as icons (~717 occurrences in 124 public files; heaviest in `AdmissionPosterHero`, engineering and MBA landing pages) | Inconsistent rendering across devices; skill rule "no emoji icons" | 1–2 days (swap for Lucide icons, file by file) |
| High | Floating UI on mobile: lead bar + header (~112px) + WhatsApp + chat bubbles + compare bar | Covers about 16–25% of a phone screen; can hide focused fields | Half day (merge WhatsApp and chat into one button; hide the lead bar after scroll) |
| High | Two competing primary CTAs in the hero (Find Colleges + WhatsApp) | Skill rule "one primary action per screen" | 1 hour (make WhatsApp secondary) |
| Medium | College profile has 11 CTAs (5 "Compare", 2 "Enquire") | Choice overload | Half day |
| Medium | Touch targets under 44px on mobile (nav links, "View all", 22px dismiss buttons) | Mis-taps | Half day |
| Medium | `/api/colleges` sends 229KB to every listing visit | Slow on 3G | Half day (paginate or trim fields) |
| Medium | "Top Rated" sort and stars use hardcoded ratings | Trust (see the earlier review-schema fix) | Depends on the review system |
| Low | Hero photo has an orange arrow baked into the image | Off-palette after the rebrand | Image edit |
| Low | A duplicate React key warning (`coep-college-of-engineering-pune`) from a global component | Dev-only warning | 1 hour |
