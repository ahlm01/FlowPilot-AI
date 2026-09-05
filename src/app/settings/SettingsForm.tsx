'use client'

import { useState, useTransition, useEffect } from 'react'
import { saveSettings } from './actions'

type Settings = {
    full_name?: string | null
    company_name?: string | null
    phone?: string | null
    contact_email?: string | null
} | null

export default function SettingsForm({ initialSettings, userId }: { initialSettings: Settings; userId: string }) {
    const [isPending, startTransition] = useTransition()
    const [saved, setSaved] = useState(false)
    const [origin, setOrigin] = useState('')
    const [copied, setCopied] = useState(false)

    useEffect(() => {
        setOrigin(window.location.origin)
    }, [])

    const intakeLink = origin ? `${origin}/f/${userId}` : ''

    async function handleCopyLink() {
        if (!intakeLink) return
        try {
            await navigator.clipboard.writeText(intakeLink)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch {
            // clipboard API unavailable; user can still select and copy manually
        }
    }

    function handleSubmit(formData: FormData) {
        setSaved(false)
        startTransition(async () => {
            await saveSettings(formData)
            setSaved(true)
        })
    }

    const inputStyle: React.CSSProperties = {
        width: '100%', boxSizing: 'border-box', borderRadius: '12px', border: '1.5px solid #e7e9f5',
        background: 'white', padding: '11px 14px', fontSize: '14px', outline: 'none', color: '#12162b'
    }
    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: '12.5px', fontWeight: 600, color: '#5b6382', marginBottom: '6px'
    }

    return (
        <div className="fade-up" style={{
            animationDelay: '140ms',
            background: 'white', borderRadius: '20px', padding: '28px',
            boxShadow: '0 12px 32px rgba(15,23,42,0.06)'
        }}>
            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                    <label style={labelStyle}>Full name</label>
                    <input name="full_name" defaultValue={initialSettings?.full_name ?? ''} placeholder="Ahlam Amjad" className="settings-input" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Company name</label>
                    <input name="company_name" defaultValue={initialSettings?.company_name ?? ''} placeholder="FlowPilot AI" className="settings-input" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Phone</label>
                    <input name="phone" defaultValue={initialSettings?.phone ?? ''} placeholder="03008699881" className="settings-input" style={inputStyle} />
                </div>
                <div>
                    <label style={labelStyle}>Contact email</label>
                    <input name="contact_email" type="email" defaultValue={initialSettings?.contact_email ?? ''} placeholder="you@business.com" className="settings-input" style={inputStyle} />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="save-btn"
                        style={{
                            padding: '11px 22px', borderRadius: '12px', border: 'none',
                            background: 'linear-gradient(135deg, #4f46e5, #17b6d4)', color: 'white',
                            cursor: isPending ? 'not-allowed' : 'pointer', fontSize: '14px', fontWeight: 700,
                            opacity: isPending ? 0.6 : 1
                        }}
                    >
                        {isPending ? 'Saving…' : 'Save settings'}
                    </button>
                    {saved && !isPending && (
                        <span className="pop-in" style={{ fontSize: '13.5px', color: '#047857', fontWeight: 600 }}>Saved ✓</span>
                    )}
                </div>
            </form>

            <div style={{
                marginTop: '24px', padding: '14px 16px', borderRadius: '12px',
                background: '#fff7ed', border: '1px solid #fed7aa', fontSize: '13px', color: '#9a3412', lineHeight: 1.6
            }}>
                Note: this saves your signature info for future use in the app. Your n8n workflow's AI prompt
                currently has the signature hardcoded — update that prompt separately if you want generated emails
                to pull from here automatically.
            </div>

            <div style={{ marginTop: '28px', paddingTop: '24px', borderTop: '1px solid #eef0f8' }}>
                <label style={labelStyle}>Your personal intake link</label>
                <p style={{ fontSize: '13px', color: '#5b6382', margin: '0 0 12px', lineHeight: 1.5 }}>
                    Share this link with customers, or add it to your site — every submission comes straight into your Leads list, scoped to your account only.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        readOnly
                        value={intakeLink}
                        placeholder="Loading your link…"
                        onFocus={(e) => e.currentTarget.select()}
                        style={{ ...inputStyle, background: '#f7f8fc', color: '#12162b', fontSize: '13.5px' }}
                    />
                    <button
                        type="button"
                        onClick={handleCopyLink}
                        disabled={!intakeLink}
                        style={{
                            flexShrink: 0, padding: '11px 18px', borderRadius: '12px', border: 'none',
                            background: copied ? '#047857' : 'linear-gradient(135deg, #4f46e5, #17b6d4)',
                            color: 'white', fontSize: '13.5px', fontWeight: 700,
                            cursor: intakeLink ? 'pointer' : 'not-allowed', opacity: intakeLink ? 1 : 0.6,
                            transition: 'background 0.15s ease'
                        }}
                    >
                        {copied ? 'Copied ✓' : 'Copy link'}
                    </button>
                </div>
            </div>
        </div>
    )
}