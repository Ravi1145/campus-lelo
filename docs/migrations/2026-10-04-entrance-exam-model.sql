-- ════════════════════════════════════════════════════════════════════════════
-- Entrance-exam & programme-admission model for MBA / PGDM SEO
-- Status: PROPOSED — NOT APPLIED. Review, then run in the Supabase SQL editor
-- against a staging project first. Additive only: no existing table is altered
-- or dropped (the legacy `exams` and `college_courses` tables are untouched).
--
-- Today public pages read the typed static files in src/data/mba/*.ts.
-- This schema mirrors those types so the admin panel can manage the data later.
-- Rules encoded here:
--   • every time-sensitive fact has a source + verified date
--   • acceptance is per PROGRAMME (and campus), not per college
--   • historical cut-offs and estimates are stored separately
-- ════════════════════════════════════════════════════════════════════════════

-- Sources ---------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS seo_sources (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label         text NOT NULL,
  url           text NOT NULL,
  source_type   text NOT NULL CHECK (source_type IN ('official', 'secondary')),
  accessed_on   date NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- Exams & cycles --------------------------------------------------------------
CREATE TABLE IF NOT EXISTS mba_exams (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug             text NOT NULL UNIQUE,            -- 'cat', 'mah-mba-cet' … (URL-stable)
  name             text NOT NULL,
  full_name        text NOT NULL,
  conducting_body  text NOT NULL,
  official_site    text NOT NULL,
  frequency        text,
  program_types    text[] NOT NULL DEFAULT '{MBA,PGDM}',
  summary          text,
  last_reviewed_on date NOT NULL,
  status           content_status NOT NULL DEFAULT 'draft',
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mba_exam_cycles (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id        uuid NOT NULL REFERENCES mba_exams(id) ON DELETE CASCADE,
  cycle_label    text NOT NULL,                     -- 'CAT 2026 (MBA/PGDM 2027–29)'
  exam_year      int  NOT NULL,
  admission_year text,                              -- '2027–29'
  notification_source_id uuid REFERENCES seo_sources(id),
  dates_note     text,                              -- shown when dates are unconfirmed
  UNIQUE (exam_id, exam_year)
);

CREATE TABLE IF NOT EXISTS mba_exam_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id    uuid NOT NULL REFERENCES mba_exam_cycles(id) ON DELETE CASCADE,
  event_type  text NOT NULL CHECK (event_type IN ('registration','admit_card','exam','answer_key','result','counselling','other')),
  label       text NOT NULL,
  starts_on   date,
  ends_on     date,
  display     text NOT NULL,                        -- human-readable value
  is_tentative boolean NOT NULL DEFAULT false,
  source_id   uuid NOT NULL REFERENCES seo_sources(id)
);

CREATE TABLE IF NOT EXISTS mba_exam_eligibility (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id   uuid NOT NULL REFERENCES mba_exam_cycles(id) ON DELETE CASCADE,
  text       text NOT NULL,
  fee_text   text,
  source_id  uuid NOT NULL REFERENCES seo_sources(id)
);

CREATE TABLE IF NOT EXISTS mba_exam_sections (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id    uuid NOT NULL REFERENCES mba_exam_cycles(id) ON DELETE CASCADE,
  position    int  NOT NULL,
  name        text NOT NULL,
  questions   int,
  minutes     int,
  notes       text,
  topics      text[] NOT NULL DEFAULT '{}',
  source_id   uuid NOT NULL REFERENCES seo_sources(id)
);

CREATE TABLE IF NOT EXISTS mba_exam_resources (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_id     uuid NOT NULL REFERENCES mba_exams(id) ON DELETE CASCADE,
  kind        text NOT NULL CHECK (kind IN ('official_mock','previous_paper','syllabus_pdf','notification','other')),
  label       text NOT NULL,
  url         text NOT NULL,
  source_id   uuid REFERENCES seo_sources(id)
);

-- Institutions, programmes, acceptance -----------------------------------------
-- Links to the existing `colleges` table where a profile page exists.
CREATE TABLE IF NOT EXISTS mba_programs (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  college_id     uuid REFERENCES colleges(id) ON DELETE SET NULL,
  institution    text NOT NULL,
  program_name   text NOT NULL,
  program_type   text NOT NULL CHECK (program_type IN ('MBA','PGDM')),
  city           text NOT NULL CHECK (city IN ('Pune','Noida','Greater Noida','Delhi')),
  campus         text,
  admission_route text NOT NULL CHECK (admission_route IN ('Direct (institute process)','Maharashtra CAP','University test (SNAP)')),
  approval_note  text,                              -- AICTE / university / AIU equivalence, with dates
  status         content_status NOT NULL DEFAULT 'draft',
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mba_program_exam_acceptance (
  program_id  uuid NOT NULL REFERENCES mba_programs(id) ON DELETE CASCADE,
  exam_id     uuid NOT NULL REFERENCES mba_exams(id) ON DELETE CASCADE,
  intake      text NOT NULL,                        -- '2027–29'
  conditions  text,                                 -- e.g. 'MAT only for Retail & Insurance'
  source_id   uuid NOT NULL REFERENCES seo_sources(id),
  verified_on date NOT NULL,
  PRIMARY KEY (program_id, exam_id, intake)
);

-- Cut-offs: historical (published) vs estimates — never mixed -------------------
CREATE TABLE IF NOT EXISTS mba_cutoffs_historical (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id  uuid NOT NULL REFERENCES mba_programs(id) ON DELETE CASCADE,
  exam_id     uuid NOT NULL REFERENCES mba_exams(id) ON DELETE CASCADE,
  year        int  NOT NULL,
  round       text,                                 -- 'CAP Round 1', 'Final merit list'
  category    text,                                 -- only when officially published
  value       numeric NOT NULL,
  unit        text NOT NULL CHECK (unit IN ('percentile','score','rank')),
  source_id   uuid NOT NULL REFERENCES seo_sources(id)
);

CREATE TABLE IF NOT EXISTS mba_cutoff_estimates (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id   uuid NOT NULL REFERENCES mba_programs(id) ON DELETE CASCADE,
  exam_id      uuid NOT NULL REFERENCES mba_exams(id) ON DELETE CASCADE,
  year         int  NOT NULL,
  low          numeric,
  high         numeric,
  unit         text NOT NULL CHECK (unit IN ('percentile','score','rank')),
  methodology  text NOT NULL,                       -- must be shown on the page
  label        text NOT NULL DEFAULT 'Estimate — not an official cut-off'
);

-- Fees & placements -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS mba_program_fees (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id  uuid NOT NULL REFERENCES mba_programs(id) ON DELETE CASCADE,
  intake      text NOT NULL,
  total_fee   int  NOT NULL,                        -- INR, whole programme
  includes    text,                                 -- 'tuition only', 'incl. hostel' …
  source_id   uuid NOT NULL REFERENCES seo_sources(id)
);

CREATE TABLE IF NOT EXISTS mba_placement_reports (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  program_id    uuid NOT NULL REFERENCES mba_programs(id) ON DELETE CASCADE,
  batch         text NOT NULL,                      -- '2024–26'
  median_ctc    int,
  average_ctc   int,
  highest_ctc   int,
  students_placed int,
  is_audited    boolean NOT NULL DEFAULT false,
  source_id     uuid NOT NULL REFERENCES seo_sources(id)
);

-- Content review log (drives "last reviewed" and the re-verification queue) -----
CREATE TABLE IF NOT EXISTS seo_content_reviews (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  entity_type  text NOT NULL,                       -- 'mba_exam', 'mba_program' …
  entity_id    uuid NOT NULL,
  reviewed_on  date NOT NULL,
  reviewer     text,
  next_review_due date,
  notes        text
);

CREATE INDEX IF NOT EXISTS idx_acceptance_exam ON mba_program_exam_acceptance (exam_id);
CREATE INDEX IF NOT EXISTS idx_programs_city_type ON mba_programs (city, program_type);
CREATE INDEX IF NOT EXISTS idx_events_cycle ON mba_exam_events (cycle_id);

-- RLS: public read of published rows only; writes via service role (admin panel).
ALTER TABLE mba_exams ENABLE ROW LEVEL SECURITY;
ALTER TABLE mba_programs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read published exams" ON mba_exams FOR SELECT USING (status = 'published');
CREATE POLICY "public read published programs" ON mba_programs FOR SELECT USING (status = 'published');
