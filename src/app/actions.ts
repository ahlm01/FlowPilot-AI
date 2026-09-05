'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// Set this to the Production URL of your new "Send Approved Email" n8n webhook.
const N8N_SEND_EMAIL_WEBHOOK_URL = process.env.N8N_SEND_EMAIL_WEBHOOK_URL || 'https://fatir.app.n8n.cloud/webhook/send-approved-email'

export async function approveAndSendLead(lead: {
  id: number
  email: string
  name: string
  follow_up_email: string
}) {
  const supabase = await createClient()

  // 1. Actually send the email via n8n — this is the real "approve" gate.
  const res = await fetch(N8N_SEND_EMAIL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      to: lead.email,
      name: lead.name,
      email_content: lead.follow_up_email,
    }),
  })

  if (!res.ok) {
    console.error('Failed to send approved email:', await res.text())
    throw new Error('Failed to send email')
  }

  // 2. Only mark as Sent once the email actually went out.
  const { error } = await supabase
    .from('leads')
    .update({ status: 'Sent' })
    .eq('id', lead.id)

  if (error) {
    console.error('Error updating lead status:', error)
    throw new Error('Failed to update lead status')
  }

  revalidatePath('/')
}

// Kept for anything else that might still reference status updates without sending.
export async function updateLeadStatus(id: number, status: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('leads').update({ status }).eq('id', id)
  if (error) {
    console.error('Error updating lead status:', error)
    throw new Error('Failed to update lead status')
  }
  revalidatePath('/')
}