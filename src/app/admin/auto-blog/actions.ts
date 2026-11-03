'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { runAutoBlog } from '@/lib/autoBlog'

async function requireSuperAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')
  const { data: profile } = await createAdminClient().from('profiles').select('role,is_active').eq('id', user.id).single()
  if (!profile || profile.role !== 'super_admin' || !profile.is_active) throw new Error('Only a super admin can run the auto-blog')
}

export async function runAutoBlogAction(formData: FormData) {
  await requireSuperAdmin()
  const dry = formData.get('dry') === '1'
  const result = await runAutoBlog({ dry })
  revalidatePath('/admin/auto-blog')
  const note = result.results.length
    ? result.results.map((r) => `${r.status}: ${r.slug}${r.reason ? ` (${r.reason})` : ''}`).join(' | ')
    : result.message
  redirect(`/admin/auto-blog?note=${encodeURIComponent(`${dry ? 'Dry run. ' : ''}${note}`)}`)
}
