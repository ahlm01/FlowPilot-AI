'use client'

import { useState, useTransition } from 'react'
import { changePassword } from './actions'
import PasswordInput from '@/components/ui/PasswordInput'

export default function PasswordForm() {
    const [isPending, startTransition] = useTransition()
    const [message, setMessage] = useState<{ type: 'error' | 'success'; text: string } | null>(null)

    function handleSubmit(formData: FormData) {
        setMessage(null)
        startTransition(async () => {
            const result = await changePassword(formData)
            if (result?.error) {
                setMessage({ type: 'error', text: result.error })
            } else {
                setMessage({ type: 'success', text: 'Password updated successfully.' })
            }
        })
    }

    const inputStyle: React.CSSProperties = {
        width: '100%', boxSizing: 'border-box', borderRadius: '12px', border: '1.5px solid var(--border)',
        background: 'var(--surface)', padding: '11px 14px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
    }
    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px'
    }

    return (
        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '360px' }}>
            <style>{`
        .pw-input:hover { border-color: #c7ccf0 !important; }
        .pw-input:focus { border-color: #5b6ef5 !important; box-shadow: 0 0 0 3px rgba(91,110,245,0.15); outline: none; }
        .pw-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .pw-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(79,70,229,0.35); }
        @keyframes msgIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .msg-in { animation: msgIn 0.3s ease both; }
      `}</style>

            <div>
                <label style={labelStyle}>New password</label>
                <PasswordInput name="new_password" required minLength={6} placeholder="••••••••" className="pw-input" inputStyle={inputStyle} />
            </div>
            <div>
                <label style={labelStyle}>Confirm new password</label>
                <PasswordInput name="confirm_password" required minLength={6} placeholder="••••••••" className="pw-input" inputStyle={inputStyle} />
            </div>

            {message && (
                <div className="msg-in" style={{
                    fontSize: '13.5px', fontWeight: 600,
                    color: message.type === 'error' ? '#e11d48' : '#047857'
                }}>
                    {message.text}
                </div>
            )}

            <button
                type="submit"
                disabled={isPending}
                className="pw-btn btn-shine"
                style={{
                    padding: '11px 22px', borderRadius: '12px', border: 'none', width: 'fit-content',
                    background: 'linear-gradient(135deg, #4f46e5, #17b6d4)', color: 'white',
                    cursor: isPending ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 700,
                    opacity: isPending ? 0.6 : 1
                }}
            >
                {isPending ? 'Updating…' : 'Update password'}
            </button>
        </form>
    )
}