-- Lead attribution & consent columns — PROPOSED, NOT APPLIED.
-- Additive only. Until applied, /api/leads folds these values into `message`
-- as "[exam: … | program: … | city: … | utm: … | consent: …]" (see src/lib/leads.ts).
-- After applying, update buildLeadRecord() to write the columns directly.

ALTER TABLE leads ADD COLUMN IF NOT EXISTS program_type     text;   -- MBA | PGDM | Both | Not sure
ALTER TABLE leads ADD COLUMN IF NOT EXISTS city_preference  text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_source       text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_medium       text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_campaign     text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS utm_content      text;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_given    boolean;
ALTER TABLE leads ADD COLUMN IF NOT EXISTS consent_at       timestamptz;

CREATE INDEX IF NOT EXISTS idx_leads_source_created ON leads (source, created_at DESC);
