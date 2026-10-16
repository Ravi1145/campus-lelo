// Display names and cut-off matching for the per-institute admission pages (/mba-admission/[id]).
// The names are labels only. Every fact on those pages is read from programAdmissions.ts and cutoffs.ts.

/** Short name people search for, keyed by ProgramAdmission.id */
export const INSTITUTE_SHORT: Record<string, string> = {
  "sibm-pune-mba": "SIBM Pune",
  "scmhrd-pune-mba": "SCMHRD Pune",
  "mitwpu-business-mba": "MIT-WPU",
  "iift-delhi-mba-ib": "IIFT Delhi",
  "bimtech-greater-noida-pgdm": "BIMTECH",
  "jaipuria-noida-pgdm": "Jaipuria Noida",
  "jbs-noida-mba": "JBS Noida",
  "sharda-greater-noida-mba": "Sharda University",
  "galgotias-greater-noida-mba-ba": "Galgotias University",
  "iim-lucknow-mba": "IIM Lucknow",
  "iim-kashipur-mba": "IIM Kashipur",
  "graphic-era-dehradun-mba": "Graphic Era Dehradun",
  "upes-dehradun-mba": "UPES Dehradun",
  "fms-delhi-mba": "FMS Delhi",
  "imi-delhi-pgdm": "IMI Delhi",
  "mdi-gurugram-pgdm": "MDI Gurgaon",
  "imt-ghaziabad-pgdm": "IMT Ghaziabad",
  "fore-delhi-pgdm": "FORE Delhi",
  "lbsim-delhi-pgdm": "LBSIM Delhi",
  "iitd-dms-mba": "IIT Delhi DMS",
  "fiib-delhi-pgdm": "FIIB Delhi",
  "bmu-gurugram-mba": "BML Munjal University",
  "glbimr-greater-noida-pgdm": "GL Bajaj Greater Noida",
  "dit-dehradun-mba": "DIT University Dehradun",
  "doon-university-mba": "Doon University",
  "amity-noida-mba": "Amity University Noida",
}

/** Text that appears in the matching entry of cutoffs.ts (institution field), keyed by ProgramAdmission.id */
export const CUTOFF_MATCH: Record<string, string> = {
  "iift-delhi-mba-ib": "IIFT",
  "bimtech-greater-noida-pgdm": "BIMTECH",
  "jaipuria-noida-pgdm": "Jaipuria Institute of Management, Noida",
  "jbs-noida-mba": "Jaypee Business School",
  "sharda-greater-noida-mba": "Sharda",
  "iim-lucknow-mba": "Lucknow",
  "iim-kashipur-mba": "Kashipur",
  "graphic-era-dehradun-mba": "Graphic Era",
  "upes-dehradun-mba": "UPES",
  "fms-delhi-mba": "FMS",
  "imi-delhi-pgdm": "IMI",
  "mdi-gurugram-pgdm": "MDI",
  "imt-ghaziabad-pgdm": "IMT",
}

/** City hub each institute belongs to */
export const CITY_HUB: Record<string, { href: string; label: string }> = {
  Pune: { href: "/mba-colleges-in-pune", label: "MBA colleges in Pune" },
  Noida: { href: "/mba-colleges-noida", label: "MBA colleges in Noida" },
  "Greater Noida": { href: "/mba-colleges-in-greater-noida", label: "MBA colleges in Greater Noida" },
  Delhi: { href: "/mba-colleges-in-delhi", label: "MBA colleges in Delhi" },
  Gurugram: { href: "/mba-colleges-in-gurugram", label: "MBA colleges in Gurugram" },
  Ghaziabad: { href: "/mba-colleges-in-ghaziabad", label: "MBA colleges in Ghaziabad" },
  Lucknow: { href: "/mba-colleges-in-lucknow", label: "MBA colleges in Lucknow" },
  Kashipur: { href: "/mba-colleges-in-uttarakhand", label: "MBA colleges in Uttarakhand" },
  Dehradun: { href: "/mba-colleges-in-dehradun", label: "MBA colleges in Dehradun" },
}
