// More institute fee guides (FORE and BIMTECH, 2027-29). Figures are copied from each institute's own admissions page,
// read on 3 Nov 2026. Seeded into Supabase by /api/cron/seed-guides; edit them in the admin Blogs panel afterwards.

const CTA = `<div class="cta"><p><strong>Comparing FORE, BIMTECH and other NCR offers?</strong> <a href="/mba-admission-in-delhi#lead-form">Get a free Delhi NCR MBA/PGDM shortlist</a>. A counsellor matches your score and budget to institutes and deadlines. Free, no obligation.</p></div>`

const PAYBACK = (fee: string, name: string) => `<h2 id="value">Is it worth it? How to work out payback</h2>
<p>Rankings do not tell you value for money. Use the institute's own documents:</p>
<ol>
<li><strong>Total cost:</strong> ${fee} for ${name}, plus personal and travel costs.</li>
<li><strong>Median salary:</strong> take the median (not the highest) from ${name}'s latest placement report, and note how many students were placed.</li>
<li><strong>Payback:</strong> total cost divided by the median annual salary gives a rough number of years to recover the fee, before tax.</li>
</ol>
<p>We do not publish placement figures we cannot source. Our guide on <a href="/blog/mba-placements-and-salary-how-to-read-reports">how to read a placement report</a> explains median vs average.</p>`

const METHOD = (src: string) => `<h2 id="method">How we researched this</h2>
<p><strong>Who:</strong> the CampusLelo editorial team. <strong>How:</strong> every fee, eligibility rule and exam on this page is copied from the institute's own website (${src}), read on 3 November 2026; the rank is from the NIRF 2025 list. <strong>Why:</strong> fee figures for the same institute differ by lakhs across education websites, so we show the official figure and exactly what it covers. Institutes revise fees: confirm on the official page before you pay. Read our <a href="/editorial-policy">editorial policy</a>; we correct errors with a dated note.</p>`

export const FORE_FEES_HTML = `<div class="quick-answer"><p><strong>Quick answer:</strong> FORE School of Management's official PGDM fee is Rs 23,24,000 for the self-sponsored category and Rs 27,83,750 for the company-sponsored category, plus a one-time registration fee of Rs 23,000. The fee includes tuition, exams, activities, library, books and reading material, IT services and an international immersion programme. FORE's fee page does not mention hostel and does not name the batch, although admissions are open for 2027-29.</p></div>

<p><em>Last reviewed 4 November 2026. Source: <a href="https://www.fsm.ac.in/admissions-in-pgdm" rel="nofollow noopener" target="_blank">FORE School of Management: PGDM admissions</a>.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#fee-table">FORE School of Management fee structure</a></li>
<li><a href="#what-it-covers">What the fee covers</a></li>
<li><a href="#compare">How FORE's fee compares in Delhi NCR</a></li>
<li><a href="#admission">Admission: exams, eligibility and rank</a></li>
<li><a href="#value">Is it worth it? How to work out payback</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="fee-table">FORE School of Management fee structure</h2>
<table>
<thead><tr><th>Category</th><th>PGDM fee as stated</th></tr></thead>
<tbody>
<tr><td>Self-sponsored</td><td>Rs 23,24,000</td></tr>
<tr><td>Company-sponsored</td><td>Rs 27,83,750</td></tr>
</tbody>
</table>
<h3>One-time registration fee: Rs 23,000</h3>
<table>
<thead><tr><th>Component</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Security deposit (refundable)</td><td>Rs 5,000</td></tr>
<tr><td>Library security (refundable)</td><td>Rs 3,000</td></tr>
<tr><td>Medical insurance</td><td>Rs 5,000</td></tr>
<tr><td>Journal subscription</td><td>Rs 2,500</td></tr>
<tr><td>Student activities</td><td>Rs 7,500</td></tr>
<tr><td><strong>Total</strong></td><td><strong>Rs 23,000</strong></td></tr>
</tbody>
</table>
<p>Two things to ask FORE in writing: which batch the fee applies to (the page does not say), and whether hostel is available and what it costs (the page does not mention it).</p>

<h2 id="what-it-covers">What the fee covers</h2>
<ul>
<li><strong>Included (per FORE):</strong> tuition, examination fee, extra and co-curricular activities, library, books and reading material, IT services and a complimentary International Immersion Programme.</li>
<li><strong>Separate:</strong> the Rs 23,000 registration fee above.</li>
<li><strong>Not stated:</strong> hostel, meals and commuting.</li>
</ul>

${CTA}

<h2 id="compare">How FORE's fee compares in Delhi NCR</h2>
<table>
<thead><tr><th>Institute</th><th>Official fee</th><th>Basis</th></tr></thead>
<tbody>
<tr><td><a href="/blog/mdi-gurgaon-fees-2027-29-pgdm-fee-structure-explained">MDI Gurgaon (PGDM)</a></td><td>Rs 26,55,310</td><td>Includes boarding and lodging</td></tr>
<tr><td>FORE (PGDM)</td><td>Rs 23,24,000 (self-sponsored)</td><td>Excludes the Rs 23,000 registration fee; hostel not mentioned</td></tr>
<tr><td><a href="/blog/imt-ghaziabad-fees-2027-29-pgdm-fee-structure-explained">IMT Ghaziabad (PGDM)</a></td><td>Rs 23,00,000</td><td>IMT says the fee covers boarding and lodging</td></tr>
<tr><td>IIFT (MBA IB)</td><td>Rs 19.73 lakh (2026-28 batch)</td><td>Hostel and mess extra</td></tr>
<tr><td><a href="/blog/bimtech-fees-2027-29-pgdm-fee-structure-explained">BIMTECH (PGDM)</a></td><td>Rs 14,00,000</td><td>Tuition only; hostel and mess extra</td></tr>
</tbody>
</table>
<p>Full sourced table: <a href="/blog/mba-in-delhi-ncr-2027-colleges-fees-cutoffs-admission">MBA in Delhi NCR 2027 guide</a>.</p>

<h2 id="admission">Admission: exams, eligibility and rank</h2>
<h3>Exams FORE accepts</h3>
<p>FORE's page lists CAT 2026, XAT 2027, or a valid GMAT score from a test taken between 1 January 2025 and 31 January 2027. MAT is not listed. See <a href="/mba-admission/fore-delhi-pgdm">FORE admission</a> and <a href="/mba-colleges-in-delhi-accepting-xat">Delhi colleges accepting XAT</a>.</p>
<h3>Eligibility</h3>
<ul>
<li>A bachelor's degree with at least 50% aggregate marks.</li>
<li>Final-year students must show 50% by 1 October 2027.</li>
</ul>
<h3>Cut-off, rank and one caution</h3>
<p>FORE does not publish a percentile cut-off we could verify. It is ranked 59 in the NIRF 2025 management category. Parts of FORE's FAQ still mention CAT 2025 and XAT 2026, so rely on the admission page for the current cycle.</p>

${PAYBACK("Rs 23,24,000 (self-sponsored), hostel not stated", "FORE")}

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>What is the fee of FORE School of Management?</h3>
<p>Rs 23,24,000 for self-sponsored students and Rs 27,83,750 for company-sponsored students, plus a one-time Rs 23,000 registration fee, according to FORE's admissions page.</p>
<h3>Does FORE's fee include hostel?</h3>
<p>FORE's page does not mention hostel, so ask the admission office what is offered and what it costs.</p>
<h3>What does the FORE fee include?</h3>
<p>Tuition, examination fee, activities, library, books and reading material, IT services and an international immersion programme.</p>
<h3>Which exams does FORE accept?</h3>
<p>CAT 2026, XAT 2027 or a valid GMAT score taken between 1 January 2025 and 31 January 2027.</p>
<h3>What percentage is required for FORE?</h3>
<p>At least 50% aggregate in the bachelor's degree. Final-year students must show 50% by 1 October 2027.</p>
<h3>Is FORE's registration fee refundable?</h3>
<p>Part of it is: Rs 5,000 security deposit and Rs 3,000 library security are refundable, according to FORE's page. The rest of the Rs 23,000 is not.</p>
<h3>What is the FORE NIRF ranking?</h3>
<p>FORE is ranked 59 in the NIRF 2025 management category.</p>

${METHOD("fsm.ac.in, PGDM admissions page")}`

export const BIMTECH_FEES_HTML = `<div class="quick-answer"><p><strong>Quick answer:</strong> BIMTECH's official PGDM tuition fee for the 2027-29 batch is Rs 14,00,000 for the PGDM core programme and the International Business, Insurance Business Management and Retail Management specialisations. Hostel and mess are extra: BIMTECH lists lodging at Rs 3,27,600 and boarding at Rs 1,68,000 for two years, plus a few smaller one-time charges and refundable deposits.</p></div>

<p><em>Last reviewed 4 November 2026. Source: <a href="https://www.bimtech.ac.in/admissions" rel="nofollow noopener" target="_blank">BIMTECH admissions page</a>.</em></p>

<h2 id="contents">In this guide</h2>
<ol>
<li><a href="#fee-table">BIMTECH fee structure 2027-29</a></li>
<li><a href="#what-it-covers">What the fee covers</a></li>
<li><a href="#compare">How BIMTECH's fee compares in Delhi NCR</a></li>
<li><a href="#admission">Admission: exams, eligibility and rank</a></li>
<li><a href="#value">Is it worth it? How to work out payback</a></li>
<li><a href="#faq">Frequently asked questions</a></li>
</ol>

<h2 id="fee-table">BIMTECH fee structure 2027-29</h2>
<h3>Programme tuition (full course)</h3>
<table>
<thead><tr><th>Programme</th><th>Merit</th><th>Supernumerary</th></tr></thead>
<tbody>
<tr><td>PGDM (core)</td><td>Rs 14,00,000</td><td>Rs 14,00,000</td></tr>
<tr><td>PGDM International Business</td><td>Rs 14,00,000</td><td>-</td></tr>
<tr><td>PGDM Insurance Business Management</td><td>Rs 14,00,000</td><td>-</td></tr>
<tr><td>PGDM Retail Management</td><td>Rs 14,00,000</td><td>-</td></tr>
</tbody>
</table>
<h3>Other charges BIMTECH lists</h3>
<table>
<thead><tr><th>Item</th><th>Amount</th></tr></thead>
<tbody>
<tr><td>Lodging (two years)</td><td>Rs 3,27,600</td></tr>
<tr><td>Boarding (two years)</td><td>Rs 1,68,000</td></tr>
<tr><td>Medical insurance</td><td>Rs 5,000 per year</td></tr>
<tr><td>Additional certification fee (one time, non-refundable)</td><td>Rs 20,000</td></tr>
<tr><td>E-database fee</td><td>Rs 10,000</td></tr>
<tr><td>Alumni membership</td><td>Rs 5,000</td></tr>
<tr><td>General security (refundable)</td><td>Rs 20,000</td></tr>
<tr><td>Library security (refundable)</td><td>Rs 15,000</td></tr>
</tbody>
</table>
<p><strong>A rough total on our arithmetic:</strong> tuition Rs 14,00,000 plus lodging Rs 3,27,600 plus boarding Rs 1,68,000 comes to Rs 18,95,600, before medical insurance, the one-time fees and the refundable deposits. BIMTECH does not publish one all-in total, so confirm the exact amount with the admission office.</p>

<h2 id="what-it-covers">What the fee covers</h2>
<p>BIMTECH's fee table is tuition. Security deposit, hostel and mess are additional, which is why a direct comparison with all-inclusive fees (MDI, IMT) needs the hostel figures added.</p>

${CTA}

<h2 id="compare">How BIMTECH's fee compares in Delhi NCR</h2>
<table>
<thead><tr><th>Institute</th><th>Official fee</th><th>Basis</th></tr></thead>
<tbody>
<tr><td><a href="/blog/mdi-gurgaon-fees-2027-29-pgdm-fee-structure-explained">MDI Gurgaon (PGDM)</a></td><td>Rs 26,55,310</td><td>Includes boarding and lodging</td></tr>
<tr><td><a href="/blog/fore-school-of-management-fees-pgdm-fee-structure-explained">FORE (PGDM)</a></td><td>Rs 23,24,000 (self-sponsored)</td><td>Hostel not mentioned</td></tr>
<tr><td><a href="/blog/imt-ghaziabad-fees-2027-29-pgdm-fee-structure-explained">IMT Ghaziabad (PGDM)</a></td><td>Rs 23,00,000</td><td>Includes boarding and lodging (per IMT)</td></tr>
<tr><td>IIFT (MBA IB)</td><td>Rs 19.73 lakh (2026-28 batch)</td><td>Hostel and mess extra</td></tr>
<tr><td>BIMTECH (PGDM)</td><td>Rs 14,00,000</td><td>Tuition only; about Rs 18.96 lakh with lodging and boarding</td></tr>
</tbody>
</table>

<h2 id="admission">Admission: exams, eligibility and rank</h2>
<h3>Exams BIMTECH accepts</h3>
<p>BIMTECH's page lists valid CAT 2026, XAT 2027, GMAT and CMAT 2027 scores, with MAT accepted for the Insurance and Retail programmes. Selection also includes an extempore round and a personal interview. See <a href="/mba-admission/bimtech-greater-noida-pgdm">BIMTECH admission</a>.</p>
<h3>Eligibility</h3>
<p>Graduation with at least 50% marks (10+2+3 pattern).</p>
<h3>Cut-off and rank</h3>
<p>BIMTECH publishes no official percentile cut-off. It is ranked 61 in the NIRF 2025 management category and is in Greater Noida. See <a href="/best-mba-colleges-in-greater-noida">best MBA colleges in Greater Noida</a>.</p>

${PAYBACK("about Rs 18.96 lakh including lodging and boarding (our arithmetic)", "BIMTECH")}

${CTA}

<h2 id="faq">Frequently asked questions</h2>
<h3>What is the fee of BIMTECH for 2027-29?</h3>
<p>Rs 14,00,000 tuition for the PGDM and its specialisations, according to BIMTECH's admissions page. Hostel and mess are additional.</p>
<h3>What are BIMTECH's hostel charges?</h3>
<p>Lodging is Rs 3,27,600 and boarding is Rs 1,68,000 for two years, as BIMTECH lists them.</p>
<h3>Does BIMTECH's fee include hostel?</h3>
<p>No. BIMTECH says the security deposit, hostel and mess charges are additional.</p>
<h3>Which exams does BIMTECH accept?</h3>
<p>Valid CAT 2026, XAT 2027, GMAT and CMAT 2027 scores. MAT is accepted for Insurance and Retail only.</p>
<h3>What percentage is needed for BIMTECH?</h3>
<p>At least 50% in graduation (10+2+3 pattern).</p>
<h3>Is BIMTECH cheaper than FORE or IMT?</h3>
<p>On tuition, yes: Rs 14 lakh against Rs 23.24 lakh (FORE) and Rs 23 lakh (IMT). With lodging and boarding added, BIMTECH is about Rs 18.96 lakh, which is still lower. FORE does not state hostel costs, so the comparison there is incomplete.</p>
<h3>What is the NIRF rank of BIMTECH?</h3>
<p>BIMTECH is ranked 61 in the NIRF 2025 management category.</p>

${METHOD("bimtech.ac.in, admissions page")}`
