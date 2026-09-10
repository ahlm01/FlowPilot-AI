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
        width: '100%', boxSizing: 'border-box', borderRadius: '12px', border: '1.5px solid var(--border)',
        background: 'var(--surface)', padding: '11px 14px', fontSize: '14px', outline: 'none', color: 'var(--text-primary)'
    }
    const labelStyle: React.CSSProperties = {
        display: 'block', fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '6px'
    }

    return (
        <div className="fade-up" style={{
            animationDelay: '140ms',
            background: 'var(--surface)', borderRadius: '20px', padding: '28px',
            boxShadow: 'var(--card-shadow)'
        }}>
            <div style={{ marginBottom: '4px' }}>
                <h2 className="font-display" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                    Signature details
                </h2>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '3px' }}>
                    Used on AI-drafted follow-up emails sent to your leads.
                </p>
            </div>
            <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginTop: '20px' }}>
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

            <div className="intake-card" style={{
                marginTop: '28px', padding: '22px 24px', borderRadius: '16px',
                background: 'linear-gradient(135deg, rgba(79,70,229,0.06), rgba(23,182,212,0.06))',
                border: '1px solid rgba(79,70,229,0.14)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        width: '22px', height: '22px', borderRadius: '7px',
                        background: 'linear-gradient(135deg, #4f46e5, #17b6d4)', flexShrink: 0
                    }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 8a3 3 0 1 0-2.83-4H15a3 3 0 0 0 0 6c.35 0 .69-.06 1-.17M6 12a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm0 0c.35 0 .69.06 1 .17m9 3.66c.31-.11.65-.17 1-.17a3 3 0 1 1-2.83 4M8.7 13.5l6.6-3.75m-6.6 6l6.6 3.75" />
                        </svg>
                    </span>
                    <label style={{ ...labelStyle, margin: 0 }}>Your personal intake link</label>
                </div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', margin: '0 0 14px', lineHeight: 1.5 }}>
                    Share this link with customers, or add it to your site — every submission comes straight into your Leads list, scoped to your account only.
                </p>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <input
                        readOnly
                        value={intakeLink}
                        placeholder="Loading your link…"
                        onFocus={(e) => e.currentTarget.select()}
                        style={{ ...inputStyle, fontSize: '13.5px' }}
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