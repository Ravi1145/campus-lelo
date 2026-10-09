import { z } from 'zod'

const phoneRegex = /^[6-9]\d{9}$/

export const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50).optional(),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  // Free text: forms send labels such as "Engineering" or "Arts & Science"; a strict enum silently dropped those leads
  stream: z.string().max(40).optional(),
  budget: z.string().optional(),
  exam_type: z.string().optional(),
  exam_score: z.string().optional(),
  career_goal: z.string().max(200).optional(),
  college_interest: z.string().optional(),
  course_interest: z.string().optional(),
  source: z.enum([
    'enquiry_form', 'college_page', 'exit_popup', 'ai_gate',
    'predictor', 'shortlist', 'counselling', 'lead_magnet', 'inline_form',
    'news_alert', 'lead_bar', 'scholarship_subscribe', 'qa_question',
    'ai_counselor', 'ai_finder', 'exam_page', 'mba_cluster',
  ]),
  message: z.string().max(500).optional(),
  page_url: z.string().optional(),
  // Attribution & context (no dedicated DB columns yet — folded into `message`
  // by buildLeadRecord until docs/migrations/2026-10-05-leads-attribution.sql is applied)
  program_type: z.enum(['MBA', 'PGDM', 'Both', 'Not sure']).optional(),
  city_preference: z.string().max(40).optional(),
  utm_source: z.string().max(80).optional(),
  utm_medium: z.string().max(80).optional(),
  utm_campaign: z.string().max(120).optional(),
  utm_content: z.string().max(120).optional(),
  // DPDP Act 2023: the visitor must tick the consent box; the server refuses leads without it
  consent: z.literal(true, { error: "Please tick the consent box so we can contact you" }),
  consent_version: z.string().max(20).optional(),
  // Honeypot — real users never see or fill this field
  website: z.string().max(200).optional(),
})

export const enquirySchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  college_name: z.string().min(2),
  college_slug: z.string().optional(),
  course: z.string().optional(),
  message: z.string().max(500).optional(),
  preferred_contact: z.enum(['whatsapp', 'call', 'email']).default('whatsapp'),
  preferred_time: z.enum(['morning', 'afternoon', 'evening']).optional(),
  consent: z.literal(true, { error: "Please tick the consent box so we can contact you" }),
  consent_version: z.string().max(20).optional(),
})

export const counsellingSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().regex(phoneRegex, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email().optional().or(z.literal('')),
  stream: z.string().optional(),
  preferred_date: z.string().optional(),
  preferred_time: z.enum(['morning', 'afternoon', 'evening']).optional(),
  exam_score: z.string().optional(),
  // Which counselling the student wants: free phone call or the paid video session
  plan: z.enum(['free_phone', 'video_199']).default('free_phone'),
  budget: z.string().max(60).optional(),
  city_preference: z.string().max(40).optional(),
  help_topics: z.array(z.string().max(40)).max(8).optional(),
  consent: z.literal(true, { error: "Please tick the consent box so we can contact you" }),
  consent_version: z.string().max(20).optional(),
  // Honeypot — real users never see or fill this field
  website: z.string().max(200).optional(),
})

export type LeadInput = z.infer<typeof leadSchema>
export type EnquiryInput = z.infer<typeof enquirySchema>
export type CounsellingInput = z.infer<typeof counsellingSchema>
