// Which dedicated guide pages exist for a verified institute (keyed by ProgramAdmission.id).
// Used by the /mba-searches topic index and anywhere a page links to an institute's fee or deadline guide.
// A guide is added here only after its figures are verified against the institute's own page.

/** Official fee guides (2027-29 batch). */
export const FEE_GUIDES: Record<string, string> = {
  "mdi-gurugram-pgdm": "/blog/mdi-gurgaon-fees-2027-29-pgdm-fee-structure-explained",
  "imt-ghaziabad-pgdm": "/blog/imt-ghaziabad-fees-2027-29-pgdm-fee-structure-explained",
  "fore-delhi-pgdm": "/blog/fore-school-of-management-fees-pgdm-fee-structure-explained",
  "bimtech-greater-noida-pgdm": "/blog/bimtech-fees-2027-29-pgdm-fee-structure-explained",
}

/** Dedicated cut-off pages. Other institutes link to the regional cut-off page when we hold a record for them. */
export const CUTOFF_PAGES: Record<string, string> = {
  "fms-delhi-mba": "/fms-delhi-cat-cutoff",
  "iift-delhi-mba-ib": "/iift-cat-cutoff",
}

/** Institutes whose own admission page gave a verified last date to apply. */
export const DEADLINE_GUIDE = "/blog/mba-pgdm-application-deadlines-2027-intake-delhi-ncr"
export const VERIFIED_DEADLINES = new Set(["mdi-gurugram-pgdm", "imt-ghaziabad-pgdm"])

export const XAT_GUIDE = "/blog/xat-2027-colleges-in-delhi-ncr-pgdm-mba-list-and-deadline"
