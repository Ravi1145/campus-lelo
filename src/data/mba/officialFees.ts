// Official programme fees for the MBA/PGDM band on the home page. Each figure is copied from the institute's own
// page or PDF (read 3 Nov 2026) and states exactly what it covers. Add a row only after the figure is verified.
// The long explanations live in the fee guides linked from each row.

export interface OfficialFee {
  id: string
  name: string
  city: string
  /** the figure as the institute states it */
  fee: string
  /** what the figure includes or leaves out */
  covers: string
  batch: string
  guide: string
  source: { label: string; url: string }
}

export const OFFICIAL_FEES: OfficialFee[] = [
  {
    id: "mdi-gurugram-pgdm", name: "MDI Gurgaon", city: "Gurugram", fee: "Rs 26.55 lakh", covers: "Two years, includes boarding and lodging", batch: "2027-29",
    guide: "/blog/mdi-gurgaon-fees-2027-29-pgdm-fee-structure-explained",
    source: { label: "MDI admissions page", url: "https://mdi.ac.in/admissions/post-graduate-diploma-in-management-pgdm" },
  },
  {
    id: "fore-delhi-pgdm", name: "FORE School of Management", city: "Delhi", fee: "Rs 23.24 lakh", covers: "Self-sponsored; hostel not mentioned on the page", batch: "Not named by FORE",
    guide: "/blog/fore-school-of-management-fees-pgdm-fee-structure-explained",
    source: { label: "FORE admissions page", url: "https://www.fsm.ac.in/admissions-in-pgdm" },
  },
  {
    id: "imt-ghaziabad-pgdm", name: "IMT Ghaziabad", city: "Ghaziabad", fee: "Rs 23.00 lakh", covers: "Two years, includes boarding and lodging (per IMT)", batch: "2027-29",
    guide: "/blog/imt-ghaziabad-fees-2027-29-pgdm-fee-structure-explained",
    source: { label: "IMT fees page", url: "https://www.imt.edu/admissions/fees/" },
  },
  {
    id: "iift-delhi-mba-ib", name: "IIFT (MBA IB)", city: "Delhi", fee: "Rs 19.73 lakh", covers: "Tuition and charges; hostel and mess extra", batch: "2026-28",
    guide: "/mba-admission/iift-delhi-mba-ib",
    source: { label: "IIFT MBA brochure", url: "https://www.iift.ac.in/uploads/manage-files/2026/10/brochure-mba-2027.pdf" },
  },
  {
    id: "bimtech-greater-noida-pgdm", name: "BIMTECH", city: "Greater Noida", fee: "Rs 14.00 lakh", covers: "Tuition only; hostel and mess extra", batch: "2027-29",
    guide: "/blog/bimtech-fees-2027-29-pgdm-fee-structure-explained",
    source: { label: "BIMTECH admissions page", url: "https://www.bimtech.ac.in/admissions" },
  },
  {
    id: "fms-delhi-mba", name: "FMS Delhi", city: "Delhi", fee: "Rs 65,075 a semester", covers: "Four semesters, about Rs 2.6 lakh; before hostel", batch: "2027-29 bulletin",
    guide: "/mba-admission/fms-delhi-mba",
    source: { label: "FMS information bulletin", url: "https://fms.edu/static/programmes/MBA_2027.pdf" },
  },
]
