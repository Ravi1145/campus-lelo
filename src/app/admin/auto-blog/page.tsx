import Link from 'next/link'
import PageHeader from '@/components/admin/PageHeader'
import { autoBlogState } from '@/lib/autoBlog'
import { runAutoBlogAction } from './actions'

export const revalidate = 0

export default async function AutoBlogPage({ searchParams }: { searchParams: Promise<{ note?: string }> }) {
  const { note } = await searchParams
  const { total, queue, written, config } = await autoBlogState()
  const published = written.filter((w) => w.status === 'published').length
  const pending = written.filter((w) => w.status === 'pending').length
  const secretSet = Boolean(process.env.CRON_SECRET)

  return (
    <div>
      <PageHeader
        title="Auto-blog"
        subtitle="One comparison guide a day, written from the verified programme data. No AI-written claims about colleges."
      />

      {note && <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">{note}</div>}

      <div className="mb-6 grid gap-3 sm:grid-cols-4">
        {[
          ['Status', config.enabled ? 'On' : 'Off'],
          ['Mode', config.mode === 'publish' ? 'Publishes automatically' : 'Saves for review'],
          ['Queue', `${queue.length} of ${total} topics left`],
          ['Written', `${published} live, ${pending} pending`],
        ].map(([k, v]) => (
          <div key={k} className="rounded-xl bg-white p-4 ring-1 ring-gray-200">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{k}</p>
            <p className="mt-1 text-base font-bold text-gray-900">{v}</p>
          </div>
        ))}
      </div>

      {!secretSet && (
        <div className="mb-6 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900">
          <strong>Daily schedule is not active yet.</strong> Add an environment variable named <code>CRON_SECRET</code> (any long random string) in Vercel
          and redeploy. Vercel Cron then calls <code>/api/cron/auto-blog</code> every day at 06:00 IST. Until then, use the buttons below.
        </div>
      )}

      <div className="mb-8 flex flex-wrap gap-3">
        <form action={runAutoBlogAction}>
          <input type="hidden" name="dry" value="1" />
          <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">Preview next guide (saves nothing)</button>
        </form>
        <form action={runAutoBlogAction}>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700">Write the next guide now</button>
        </form>
        <Link href="/admin/approvals" className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-50">Review pending guides</Link>
      </div>

      <h2 className="mb-2 text-lg font-extrabold text-gray-900">Next in the queue</h2>
      {queue.length === 0 ? (
        <p className="text-sm text-gray-600">Every comparable pair of verified programmes already has a guide. Add a verified programme record and new topics appear here.</p>
      ) : (
        <ol className="space-y-2">
          {queue.slice(0, 15).map((t, i) => (
            <li key={t.slug} className="rounded-lg bg-white px-4 py-3 text-sm ring-1 ring-gray-200">
              <span className="mr-2 font-bold text-gray-500">{i + 1}.</span>{t.title}
              <span className="block text-xs text-gray-500">/blog/{t.slug}</span>
            </li>
          ))}
        </ol>
      )}

      <h2 className="mb-2 mt-8 text-lg font-extrabold text-gray-900">How it works</h2>
      <ul className="list-disc space-y-1 pl-5 text-sm text-gray-700">
        <li>Each topic is a pair of verified programmes in the same city, or Delhi against another NCR city. The text, exams, intake and source links are read from the verified records.</li>
        <li>A guide that fails the quality gate (too short, or a missing source link) is saved as pending for your approval instead of going live.</li>
        <li>Set <code>AUTO_BLOG_MODE=review</code> to save every guide as pending, <code>AUTO_BLOG_ENABLED=false</code> to stop, and <code>AUTO_BLOG_PER_RUN</code> (1 to 3) for guides per day.</li>
      </ul>
    </div>
  )
}
