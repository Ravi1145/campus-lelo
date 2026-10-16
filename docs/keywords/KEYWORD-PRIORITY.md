# Keyword priority: high demand, low difficulty (16 Oct 2026)

No SEO tool is connected, so search volume and keyword difficulty (KD) are NOT measured here.
Two proxies stand in, and both are only directional:

- Demand proxy: autocomplete prominence (signal 2-13 in mba-keywords.csv). It ranks phrases against each other; it is not a monthly volume.
- Difficulty proxy: who holds the first results page (large aggregators vs. institute sites, PDFs, forums).
  Few aggregator pages, or results that answer a different question, means easier.

Get real volume and KD by connecting Ahrefs or Similarweb (both are listed as needing authorisation), or from Search Console after indexing.

## Segments (what to build first)

| Segment | Example searches | Demand proxy | Difficulty proxy | Our page | Status |
|---|---|---|---|---|---|
| Institute cut-off / eligibility | fms delhi cat cutoff, iift cat cutoff, mdi gurgaon admission | Medium | Low (official PDFs, thin aggregator pages) | /fms-delhi-cat-cutoff, /iift-cat-cutoff, /mdi-gurgaon-pgdm-admission | Live |
| Region + exam | mba colleges in dehradun accepting cat, mba in delhi ncr without cat | Medium-High | Low-Medium | region pages | Live |
| Per-programme admission | doon university mba admission, dit dehradun mba, glbimr pgdm | Low-Medium | Low | /mba-admission/<id> (26 now) | Live, Doon added |
| Exam-acceptance articles | cmat colleges delhi ncr, xat colleges delhi ncr | Medium | Medium | blog articles 44-55 | Live |
| Hindi / Hinglish explainers | mba kya hai, pgdm kya hai, mba aur pgdm mein fark | High | Low-Medium | /mba-vs-pgdm (new Hindi section) | Added |
| Free tools after 12th | free psychometric test after 12th | High | Medium | /psychometric-test (H1 now matches) | Added |
| Fees / placements / ranking | mba fees in pune, placement, nirf | High | High (aggregators) | none | Not servable without sourced data |
| Head terms | best mba colleges in pune/delhi | Highest | High | hubs | Long-term |

## Not done on purpose

- No fee, placement or ranking pages: we hold no sourced figures, and the site policy is verified data only.
- No keyword stuffing of the home page.

## Open items

1. collegepune.com (old domain) still serves a duplicate site. Add a 301 from collegepune.com and www to campuslelo.com in the Vercel domains settings or at the DNS host. This needs the owner's account.
2. Request indexing for the new pages in Search Console.
3. CUET PG guide: needs NTA's official notice as the source.
