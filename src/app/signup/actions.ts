'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (password !== confirmPassword) {
        redirect('/signup?message=' + encodeURIComponent('Passwords do not match.'))
    }

    if (password.length < 6) {
        redirect('/signup?message=' + encodeURIComponent('Password must be at least 6 characters.'))
    }

    const { data, error } = await supabase.auth.signUp({ email, password })

    if (error) {
        redirect('/signup?message=' + encodeURIComponent(error.message))
    }

    // If email confirmation is required, there's no session yet — send them to a "check your email" screen.
    if (data.user && !data.session) {
        redirect('/signup/check-email')
    }

    // If confirmation is disabled in your Supabase project, they're logged in immediately.
    redirect('/')
}