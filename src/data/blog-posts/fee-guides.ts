// Institute fee guides for the 2027-29 batch. Figures are copied from each institute's own fee page or official PDF,
// read on 3 Nov 2026, with what each figure includes. Seeded into Supabase by /api/cron/seed-guides; edit them in the
// admin Blogs panel afterwards (the seed never overwrites an existing slug).

const CTA = `<div class="cta"><p><strong>Comparing MDI, IMT and other NCR offers?</strong> <a href="/mba-admission-in-delhi#lead-form">Get a free Delhi NCR MBA/PGDM shortlist</a>. A counsellor matches your score and budget to institutes and deadlines. Free, no obligation.</p></div>`

const PAYBACK = (fee: string, name: string) => `<h2 id="value">Is it worth it? How to work out payback</h2>
<p>Rankings do not tell you value for money. Use the institute's own documents:</p>
<ol>
<li><strong>Total cost:</strong> ${fee} for ${name}, plus personal and travel costs.</li>
<li><strong>Median salary:</strong> take the median (not the highest) from ${name}'s latest placement report, and note how many students were placed.</li>
<li><strong>Payback:</strong> total cost divided by the median annual salary gives a rough number of years to recover the fee, before tax.</li>
</ol>
<p>We do not publish placement figures we cannot source. Our guide on <a href="/blog/mba-placements-and-salary-how-to-read-reports">how to read a placement report</a> explains median vs average.</p>`

const METHOD = (src: string) => `<h2 id="method">How we researched this</h2>
<p><strong>Who:</strong> the CampusLelo editorial team. <strong>How:</strong> every fee, eligibility rule and deadline on this page is copied from the institute's own website or official fee PDF (${src}), read on 3 November 2026; the rank is from the NIRF 2025 list. <strong>Why:</strong> fee figures for the same institute differ by lakhs across education websites, so we show the official figure, its batch and exactly what it covers. Institutes revise fees: confirm on the official page before you pay. Spotted something out of date? Read our <a href="/editorial-policy">editorial policy</a>; we correct errors with a dated note.</p>`

export const MDI_FEES_HTML = `<div class="quick-answer"><p><strong>Quick answer:</strong> MDI Gurgaon's official fee for the two-year PGDM, PGDM-HRM and PGDM-Business Analytics (2027-29 batch) is Rs 26,55,310: Rs 13,48,905 in the first year and Rs 13,06,405 in the second. It includes tuition (Rs 19,23,010), boarding, lodging, learning material, activities, library, an alumni fee and a security deposit. MDI says fees are subject to revision. Applications close on 28 November 2026.</p></div>

<p><em>Last reviewed 4 November 2026. Source: <a href="https://mdi.ac.in/admissions/post-graduate-diploma-in-management-pgdm" rel="nofollow noopener" target="_blank">MDI Gurgaon PGDM admissions page</a>.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#fee-table">MDI Gurgaon fee structure 2027-29</a></li>
<li><a href="#what-it-covers">What the fee covers</a></li>
<li><a href="#compare">How MDI's fee compares in Delhi NCR</a></li>
<li><a href="#admission">Admission: exams, eligibility and deadline</a></li>
<li><a href="#value">Is it worth it? How to work out payback</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="fee-table">MDI Gurgaon fee structure 2027-29</h2>
<p>The table applies to the PGDM, PGDM-HRM and PGDM-Business Analytics programmes. MDI's page shows no separate figure for PGDM-IB.</p>
<table>
<thead><tr><th>Component</th><th>Total for two years</th></tr></thead>
<tbody>
<tr><td>Tuition</td><td>Rs 19,23,010</td></tr>
<tr><td>Lodging</td><td>Rs 2,19,500</td></tr>
<tr><td>Boarding</td><td>Rs 2,08,400</td></tr>
<tr><td>Learning material</td><td>Rs 1,24,000</td></tr>
<tr><td>Library</td><td>Rs 75,400</td></tr>
<tr><td>Student activities</td><td>Rs 62,500</td></tr>
<tr><td>Security deposit (first year only)</td><td>Rs 27,500</td></tr>
<tr><td>Alumni fee (first year only)</td><td>Rs 15,000</td></tr>
<tr><td><strong>Total</strong></td><td><strong>Rs 26,55,310</strong></td></tr>
</tbody>
</table>
<h3>By year</h3>
<table>
<thead><tr><th>Year</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>First year</td><td>Rs 13,48,905</td></tr>
<tr><td>Second year</td><td>Rs 13,06,405</td></tr>
<tr><td>Two-year total</td><td>Rs 26,55,310</td></tr>
</tbody>
</table>
<p>The same page lists a total of USD 38,668 for NRI candidates and shows the fee in instalments. The refund terms for the security deposit are not stated on the page.</p>

<h2 id="what-it-covers">What the fee covers</h2>
<p>Unlike many institutes that quote tuition alone, MDI's total includes boarding (meals) and lodging (hostel). That matters when you compare it with fees quoted without hostel.</p>
<ul>
<li><strong>Included:</strong> tuition, boarding, lodging, learning material, student activities, library, the alumni fee and a security deposit.</li>
<li><strong>Not included:</strong> personal expenses, travel and a laptop, which you should budget for separately.</li>
<li><strong>Subject to revision:</strong> MDI states it may revise fees.</li>
</ul>

${CTA}

<h2 id="compare">How MDI's fee compares in Delhi NCR</h2>
<p>Official figures we verified for the 2027 intake, on the basis each institute states:</p>
<table>
<thead><tr><th>Institute</th><th>Official fee</th><th>Basis</th></tr></thead>
<tbody>
<tr><td>MDI Gurgaon (PGDM)</td><td>Rs 26,55,310</td><td>Includes boarding and lodging</td></tr>
<tr><td>FORE (PGDM)</td><td>Rs 23,24,000 (self-sponsored)</td><td>Excludes a Rs 23,000 registration fee; hostel not mentioned</td></tr>
<tr><td><a href="/blog/imt-ghaziabad-fees-2027-29-pgdm-fee-structure-explained">IMT Ghaziabad (PGDM)</a></td><td>Rs 23,00,000</td><td>IMT says the fee covers boarding and lodging</td></tr>
<tr><td>IIFT (MBA IB)</td><td>Rs 19.73 lakh (2026-28 batch)</td><td>Hostel and mess extra</td></tr>
<tr><td>BIMTECH (PGDM)</td><td>Rs 14,00,000</td><td>Tuition only; hostel and mess extra</td></tr>
</tbody>
</table>
<p>The full table, with sources, is in our <a href="/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission">MBA in Delhi NCR 2027 guide</a>.</p>

<h2 id="admission">Admission: exams, eligibility and deadline</h2>
<h3>Which exam MDI accepts</h3>
<p>MDI's admission page requires CAT 2026 for its PGDM programmes. Only PGDM-IB also accepts a GMAT score, and the page says Indian candidates cannot apply on the basis of GMAT; that route is for NRI and international applicants. More on our <a href="/mdi-gurgaon-pgdm-admission">MDI Gurgaon PGDM admission</a> page.</p>
<h3>Eligibility</h3>
<ul>
<li>At least 50% in Class X and Class XII.</li>
<li>A bachelor's degree with at least 50% (or equivalent CGPA): minimum three years for PGDM, PGDM-HRM, PGDM-BA and PGDM-BFS; minimum four years for PGDM-IB.</li>
<li>Final-year students completing their degree by 30 June 2027 may apply.</li>
</ul>
<h3>Cut-off and selection</h3>
<p>MDI does not publish a fixed percentile cut-off. Shortlisting for the writing test, group discussion and interview uses CAT scores together with the application profile. See <a href="/mba-cutoff-delhi-ncr">MBA cut-offs in Delhi NCR</a>.</p>
<h3>Deadline and rank</h3>
<p>MDI's page gives 28 November 2026 as the last date to apply for the 2027-29 batch. MDI is ranked 9 in the NIRF 2025 management category.</p>

${PAYBACK("Rs 26,55,310 including hostel", "MDI")}

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>What is the total fee of MDI Gurgaon for 2027-29?</h3>
<p>Rs 26,55,310 for the two-year PGDM, PGDM-HRM and PGDM-Business Analytics, according to MDI's admissions page. It is subject to revision.</p>
<h3>Does MDI's fee include hostel?</h3>
<p>Yes. The total includes boarding (Rs 2,08,400) and lodging (Rs 2,19,500) for two years.</p>
<h3>What is MDI's first-year fee?</h3>
<p>Rs 13,48,905 for the first year and Rs 13,06,405 for the second year.</p>
<h3>What is MDI's tuition fee alone?</h3>
<p>Rs 19,23,010 for the two years. The rest of the total covers boarding, lodging, learning material, activities, library, the alumni fee and a security deposit.</p>
<h3>Can I join MDI with a GMAT score?</h3>
<p>Not as an Indian candidate for the main PGDM. MDI requires CAT 2026; only PGDM-IB accepts GMAT, and only for NRI and international applicants, according to its admission page.</p>
<h3>What is the last date to apply to MDI for 2027-29?</h3>
<p>MDI's admission page lists 28 November 2026 as the application deadline.</p>
<h3>What percentage do I need for MDI?</h3>
<p>At least 50% in Class X, Class XII and graduation (or equivalent CGPA).</p>
<h3>What is MDI's CAT cut-off?</h3>
<p>MDI does not publish a fixed percentile cut-off. It shortlists on CAT scores together with the application profile.</p>

${METHOD("mdi.ac.in, PGDM admissions page")}`

export const IMT_FEES_HTML = `<div class="quick-answer"><p><strong>Quick answer:</strong> IMT Ghaziabad's official fee for the two-year PGDM (2027-29 batch) is Rs 23,00,000: Rs 13,00,000 in the first year and Rs 10,00,000 in the second. That includes a Rs 50,000 admission fee, Rs 22,27,000 tuition, an Rs 8,000 alumni membership and a refundable Rs 15,000 caution deposit. IMT says the programme fee covers boarding and lodging, and calls the structure provisional. Applications close on 27 November 2026.</p></div>

<p><em>Last reviewed 4 November 2026. Source: <a href="https://www.imt.edu/admissions/fees/" rel="nofollow noopener" target="_blank">IMT Ghaziabad fees page</a> and its PGDM fee structure PDF for 2027-29.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#fee-table">IMT Ghaziabad fee structure 2027-29</a></li>
<li><a href="#what-it-covers">What the fee covers</a></li>
<li><a href="#compare">How IMT's fee compares in Delhi NCR</a></li>
<li><a href="#admission">Admission: exams, eligibility and deadline</a></li>
<li><a href="#value">Is it worth it? How to work out payback</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="fee-table">IMT Ghaziabad fee structure 2027-29</h2>
<p>The table applies to the two-year PGDM, PGDM Financial Management, PGDM Marketing and PGDM Banking and Financial Services programmes.</p>
<table>
<thead><tr><th>Component</th><th>First year</th><th>Second year</th><th>Total</th></tr></thead>
<tbody>
<tr><td>Admission fee</td><td>Rs 50,000</td><td>-</td><td>Rs 50,000</td></tr>
<tr><td>Tuition</td><td>Rs 12,27,000</td><td>Rs 10,00,000</td><td>Rs 22,27,000</td></tr>
<tr><td>Lifetime alumni membership</td><td>Rs 8,000</td><td>-</td><td>Rs 8,000</td></tr>
<tr><td>Caution money deposit (refundable)</td><td>Rs 15,000</td><td>-</td><td>Rs 15,000</td></tr>
<tr><td><strong>Total</strong></td><td><strong>Rs 13,00,000</strong></td><td><strong>Rs 10,00,000</strong></td><td><strong>Rs 23,00,000</strong></td></tr>
</tbody>
</table>
<p>IMT's PDF says the fee structure is provisional and subject to revision. The same PDF has a separate fee table for the PGDM Dual Country Programme with IMT Dubai, which is charged partly in UAE dirhams.</p>

<h2 id="what-it-covers">What the fee covers</h2>
<p>IMT's fee FAQ says the programme fee covers all expenses, including tuition, boarding, lodging and academic materials such as books, course packs and case studies, with four meals a day. So, unlike tuition-only figures, IMT's Rs 23 lakh is close to an all-inclusive number.</p>
<ul>
<li><strong>Included (per IMT):</strong> tuition, boarding, lodging, academic materials, meals.</li>
<li><strong>Refundable:</strong> the Rs 15,000 caution deposit.</li>
<li><strong>Not included:</strong> personal expenses, travel and a laptop.</li>
</ul>

${CTA}

<h2 id="compare">How IMT's fee compares in Delhi NCR</h2>
<table>
<thead><tr><th>Institute</th><th>Official fee</th><th>Basis</th></tr></thead>
<tbody>
<tr><td><a href="/blog/mdi-gurgaon-fees-2027-29-pgdm-fee-structure-explained">MDI Gurgaon (PGDM)</a></td><td>Rs 26,55,310</td><td>Includes boarding and lodging</td></tr>
<tr><td>FORE (PGDM)</td><td>Rs 23,24,000 (self-sponsored)</td><td>Excludes a Rs 23,000 registration fee; hostel not mentioned</td></tr>
<tr><td>IMT Ghaziabad (PGDM)</td><td>Rs 23,00,000</td><td>IMT says the fee covers boarding and lodging</td></tr>
<tr><td>IIFT (MBA IB)</td><td>Rs 19.73 lakh (2026-28 batch)</td><td>Hostel and mess extra</td></tr>
<tr><td>BIMTECH (PGDM)</td><td>Rs 14,00,000</td><td>Tuition only; hostel and mess extra</td></tr>
</tbody>
</table>
<p>Full sourced table: <a href="/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission">MBA in Delhi NCR 2027 guide</a>.</p>

<h2 id="admission">Admission: exams, eligibility and deadline</h2>
<h3>Which exams IMT accepts</h3>
<p>IMT's admission page lists CAT 2026, XAT 2027 and GMAT scores for the two-year PGDM at Ghaziabad (CMAT is listed only for IMT Nagpur). After the score comes a common test and personal interview round. More on our <a href="/mba-admission/imt-ghaziabad-pgdm">IMT Ghaziabad admission</a> page.</p>
<h3>Eligibility</h3>
<ul>
<li>A bachelor's degree of at least three years in any discipline with at least 50% aggregate marks.</li>
<li>Final-year students can apply with a provisional certificate.</li>
</ul>
<h3>Cut-off and selection</h3>
<p>IMT does not publish an official percentile cut-off; shortlisting is reported to combine the entrance score with academics, work experience and profile. See <a href="/mba-cutoff-delhi-ncr">MBA cut-offs in Delhi NCR</a>.</p>
<h3>Deadline and rank</h3>
<p>IMT's page gives 27 November 2026 as the last date to apply. IMT Ghaziabad is ranked 30 in the NIRF 2025 management category.</p>

${PAYBACK("Rs 23,00,000 including boarding and lodging (per IMT)", "IMT Ghaziabad")}

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>What is the total fee of IMT Ghaziabad for 2027-29?</h3>
<p>Rs 23,00,000 for the two-year PGDM programmes, according to IMT's official fee PDF: Rs 13,00,000 in the first year and Rs 10,00,000 in the second. The structure is provisional.</p>
<h3>Does IMT Ghaziabad's fee include hostel and food?</h3>
<p>Yes. IMT says the programme fee covers tuition, boarding, lodging and academic materials, with four meals a day.</p>
<h3>What is IMT Ghaziabad's tuition fee?</h3>
<p>Rs 22,27,000 over two years: Rs 12,27,000 in the first year and Rs 10,00,000 in the second.</p>
<h3>Is any part of the IMT fee refundable?</h3>
<p>The Rs 15,000 caution money deposit is refundable, according to the fee PDF.</p>
<h3>Which exams does IMT Ghaziabad accept?</h3>
<p>CAT 2026, XAT 2027 and GMAT for the Ghaziabad PGDM. CMAT is listed only for IMT Nagpur.</p>
<h3>What is the last date to apply to IMT Ghaziabad?</h3>
<p>IMT's admission page lists 27 November 2026 as the last date to apply.</p>
<h3>What percentage is needed for IMT Ghaziabad?</h3>
<p>A three-year bachelor's degree with at least 50% aggregate marks.</p>
<h3>Is IMT Ghaziabad cheaper than MDI Gurgaon?</h3>
<p>Yes, on the official figures: IMT's 2027-29 PGDM is Rs 23,00,000 and MDI's is Rs 26,55,310, and both include boarding and lodging.</p>

${METHOD("imt.edu, fees page and PGDM fee structure PDF")}`
