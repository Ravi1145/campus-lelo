import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST   || 'smtp.gmail.com',
  port:   Number(process.env.SMTP_PORT  || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Lead values are user-typed — escape before putting them in HTML
function escapeHtml(value: unknown): string {
  return String(value)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
}

const OMIT_FROM_EMAIL = new Set(['website']) // honeypot

/** Returns true only if an email was actually handed to the SMTP server. */
export async function sendLeadEmail(data: Record<string, unknown>): Promise<boolean> {
  const to = process.env.LEAD_EMAIL || process.env.SMTP_USER
  if (!to) return false

  const rows = Object.entries(data)
    .filter(([k, v]) => !OMIT_FROM_EMAIL.has(k) && v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `<tr><td style="padding:4px 8px;font-weight:600;color:#555;white-space:nowrap">${escapeHtml(k.replace(/_/g, ' '))}</td><td style="padding:4px 8px">${escapeHtml(v)}</td></tr>`)
    .join('')

  const subjectName = String(data.name ?? 'Unknown').replace(/[\r\n]+/g, ' ').slice(0, 60)
  const subjectSource = String(data.source ?? 'site').replace(/[\r\n]+/g, ' ').slice(0, 30)

  await transporter.sendMail({
    from:    `"CampusLelo Leads" <${process.env.SMTP_USER}>`,
    to,
    subject: `🎓 New Lead — ${subjectName} (${subjectSource})`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:600px">
        <h2 style="background:#011B40;color:#fff;padding:16px;margin:0;border-radius:8px 8px 0 0">
          New Lead from CampusLelo
        </h2>
        <table style="width:100%;border-collapse:collapse;border:1px solid #e5e7eb;border-top:none">
          ${rows}
        </table>
        <p style="color:#999;font-size:12px;margin-top:12px">Sent from campuslelo.com</p>
      </div>
    `,
  })
  return true
}
