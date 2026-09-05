'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function saveSettings(formData: FormData) {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('Not authenticated')
    }

    const settings = {
        user_id: user.id,
        full_name: formData.get('full_name') as string,
        company_name: formData.get('company_name') as string,
        phone: formData.get('phone') as string,
        contact_email: formData.get('contact_email') as string,
        updated_at: new Date().toISOString(),
    }

    const { error } = await supabase.from('user_settings').upsert(settings)

    if (error) {
        console.error('Failed to save settings:', error)
        throw new Error('Failed to save settings')
    }

    revalidatePath('/settings')
}