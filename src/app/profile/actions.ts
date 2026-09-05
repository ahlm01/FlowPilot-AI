'use server'

import { createClient } from '@/utils/supabase/server'

export async function changePassword(formData: FormData) {
    const supabase = await createClient()

    const newPassword = formData.get('new_password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (!newPassword || newPassword.length < 6) {
        return { error: 'Password must be at least 6 characters.' }
    }

    if (newPassword !== confirmPassword) {
        return { error: 'Passwords do not match.' }
    }

    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
        return { error: error.message }
    }

    return { success: true }
}