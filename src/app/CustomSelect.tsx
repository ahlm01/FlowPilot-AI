'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

/* ============================================================
   Custom dropdown — replaces native <select> so the open list
   can actually be styled (native select popups can't be).
   Drop this component into DashboardClient.tsx (or its own file
   and import it) and swap the two <select> elements for it.
   ============================================================ */

export function CustomSelect({
    value,
    onChange,
    options,
}: {
    value: string
    onChange: (val: string) => void
    options: string[]
}) {
    const [open, setOpen] = useState(false)
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    return (
        <div ref={ref} style={{ position: 'relative' }}>
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    fontSize: '13px', border: '1.5px solid var(--border)', borderRadius: '10px',
                    padding: '8px 14px', background: 'var(--surface-alt)', color: 'var(--text-primary)',
                    cursor: 'pointer', fontWeight: 500, minWidth: '130px', justifyContent: 'space-between'
                }}
            >
                {value}
                <ChevronDown size={14} color="var(--text-muted)" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s ease' }} />
            </button>

            {open && (
                <div style={{
                    position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0, zIndex: 20,
                    background: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)',
                    boxShadow: 'var(--card-shadow)', overflow: 'hidden', padding: '4px'
                }}>
                    {options.map((opt) => (
                        <div
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false) }}
                            style={{
                                padding: '9px 12px', fontSize: '13.5px', fontWeight: 500, borderRadius: '8px',
                                cursor: 'pointer', color: opt === value ? 'var(--accent-text)' : 'var(--text-primary)',
                                background: opt === value ? 'var(--accent-tint)' : 'transparent',
                                transition: 'background 0.12s ease'
                            }}
                            onMouseEnter={(e) => { if (opt !== value) e.currentTarget.style.background = 'var(--accent-tint-strong)' }}
                            onMouseLeave={(e) => { if (opt !== value) e.currentTarget.style.background = 'transparent' }}
                        >
                            {opt}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}