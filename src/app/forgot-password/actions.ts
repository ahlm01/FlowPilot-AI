'use server'

import { createClient } from '@/utils/supabase/server'

export async function requestPasswordReset(formData: FormData) {
    const email = formData.get('email') as string
    const origin = formData.get('origin') as string

    if (!email) {
        return { error: 'Please enter your email address.' }
    }

    const supabase = await createClient()

    // Always resolve the same way whether or not the account exists —
    // this avoids leaking which emails are registered.
    await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${origin}/auth/callback?next=/reset-password`,
    })

    return { success: true }
}
