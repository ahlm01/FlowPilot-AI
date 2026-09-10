'use client'

import { useState, useEffect } from 'react'

type Lead = {
    id: number
    score: number
    priority: string
    status: string
    business_type: string
}

// Counts a number up from 0 on mount, with an optional start delay.
function CountUp({ value, delay = 0, suffix = '' }: { value: number; delay?: number; suffix?: string }) {
    const [display, setDisplay] = useState(0)
    useEffect(() => {
        let frame: number
        const timeout = setTimeout(() => {
            const duration = 1200
            const start = performance.now()
            function tick(now: number) {
                const progress = Math.min((now - start) / duration, 1)
                const eased = 1 - Math.pow(1 - progress, 3)
                setDisplay(Math.round(eased * value))
                if (progress < 1) frame = requestAnimationFrame(tick)
            }
            frame = requestAnimationFrame(tick)
        }, delay)
        return () => { cancelAnimationFrame(frame); clearTimeout(timeout) }
    }, [value, delay])
    return <>{display}{suffix}</>
}

export default function AnalyticsClient({ leads }: { leads: Lead[] }) {
    const [mounted, setMounted] = useState(false)
    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 100)
        return () => clearTimeout(t)
    }, [])

    const total = leads.length
    const sent = leads.filter((l) => l.status === 'Sent').length
    const conversionRate = total > 0 ? Math.round((sent / total) * 100) : 0

    const buckets = [
        { label: '0–49', min: 0, max: 49, color: '#94a3c0' },
        { label: '50–79', min: 50, max: 79, color: '#f97316' },
        { label: '80–100', min: 80, max: 100, color: '#10b981' },
    ]
    const scoreCounts = buckets.map((b) => ({
        ...b,
        count: leads.filter((l) => l.score >= b.min && l.score <= b.max).length,
    }))
    const maxScoreCount = Math.max(1, ...scoreCounts.map((b) => b.count))

    const priorities = [
        { label: 'High', color: '#f43f5e' },
        { label: 'Medium', color: '#f97316' },
        { label: 'Low', color: '#94a3c0' },
    ]
    const priorityCounts = priorities.map((p) => ({
        ...p,
        count: leads.filter((l) => l.priority === p.label).length,
    }))
    const maxPriorityCount = Math.max(1, ...priorityCounts.map((p) => p.count))

    const cardStyle: React.CSSProperties = {
        background: 'var(--surface)', borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
        boxShadow: 'var(--card-shadow)'
    }

    if (total === 0) {
        return (
            <div className="fade-up" style={{ ...cardStyle, textAlign: 'center', color: 'var(--text-muted)', padding: '48px' }}>
                No leads yet — analytics will populate once leads start coming in.
            </div>
        )
    }

    return (
        <div>
            <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '20px' }}>
                <div className="stat-card fade-up" style={{ ...cardStyle, animationDelay: '80ms' }}>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                        Total Leads
                    </p>
                    <p className="font-data" style={{ fontSize: '28px', fontWeight: 700 }}><CountUp value={total} delay={200} /></p>
                </div>
                <div className="stat-card fade-up" style={{ ...cardStyle, animationDelay: '160ms' }}>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                        Conversion Rate
                    </p>
                    <p className="font-data" style={{ fontSize: '28px', fontWeight: 700, color: '#047857' }}><CountUp value={conversionRate} delay={300} suffix="%" /></p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{sent} of {total} sent</p>
                </div>
                <div className="stat-card fade-up" style={{ ...cardStyle, animationDelay: '240ms' }}>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', marginBottom: '6px' }}>
                        Avg. Score
                    </p>
                    <p className="font-data" style={{ fontSize: '28px', fontWeight: 700 }}>
                        <CountUp value={Math.round(leads.reduce((sum, l) => sum + l.score, 0) / total)} delay={400} />
                    </p>
                </div>
            </div>

            <div className="fade-up" style={{ ...cardStyle, animationDelay: '320ms' }}>
                <p className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                    Score distribution
                </p>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px', height: '160px' }}>
                    {scoreCounts.map((b) => (
                        <div key={b.label} className="bar-col" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                            <span className="font-data" style={{ fontSize: '13px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>{b.count}</span>
                            <div className="bar-fill" style={{
                                width: '100%', maxWidth: '64px', borderRadius: '10px 10px 0 0',
                                background: b.color, height: mounted ? `${(b.count / maxScoreCount) * 110 + 6}px` : '0px'
                            }} />
                            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '10px' }}>{b.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="fade-up" style={{ ...cardStyle, animationDelay: '400ms' }}>
                <p className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '20px', color: 'var(--text-primary)' }}>
                    Priority breakdown
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {priorityCounts.map((p) => (
                        <div key={p.label}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-primary)' }}>{p.label}</span>
                                <span className="font-data" style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{p.count}</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', borderRadius: '999px', background: 'var(--border-soft)', overflow: 'hidden' }}>
                                <div className="priority-fill" style={{
                                    height: '100%', borderRadius: '999px', background: p.color,
                                    width: mounted ? `${(p.count / maxPriorityCount) * 100}%` : '0%'
                                }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}