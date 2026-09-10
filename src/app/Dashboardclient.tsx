'use client'

import { useState, useMemo, useEffect } from 'react'
import {
    Users,
    AlertTriangle,
    Search,
    ArrowUpDown,
    X,
    Send,
    Mail,
    Target,
    Wand2,
    TrendingUp
} from 'lucide-react'
import { approveAndSendLead } from './actions'
import { CustomSelect } from './CustomSelect'
import Sidebar from './Sidebar'

// Animates a number counting up from 0 on mount — used for stat cards.
function CountUp({ value, delay = 0 }: { value: number; delay?: number }) {
    const [display, setDisplay] = useState(0)
    useEffect(() => {
        let frame: number
        let timeout: ReturnType<typeof setTimeout>
        const duration = 1500
        timeout = setTimeout(() => {
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
    return <>{display}</>
}

type Lead = {
    id: number
    created_at: string
    name: string
    email: string
    business_type: string
    budget: string
    request: string
    score: number
    priority: string
    intent: string
    recommended_action: string
    follow_up_email: string
    status: string
}

const priorityColor = (p: string) =>
    p === 'High' ? { bg: 'var(--badge-danger-bg)', fg: 'var(--badge-danger-fg)', dot: 'var(--badge-danger-dot)' } :
        p === 'Medium' ? { bg: 'var(--badge-warning-bg)', fg: 'var(--badge-warning-fg)', dot: 'var(--badge-warning-dot)' } :
            { bg: 'var(--badge-neutral-bg)', fg: 'var(--badge-neutral-fg)', dot: 'var(--badge-neutral-dot)' }

const scoreColor = (s: number) =>
    s >= 80 ? { bg: 'var(--badge-success-bg)', fg: 'var(--badge-success-fg)' } :
        s >= 50 ? { bg: 'var(--badge-warning-bg)', fg: 'var(--badge-warning-fg)' } :
            { bg: 'var(--badge-neutral-bg)', fg: 'var(--badge-neutral-fg)' }

const statusColor = (s: string) =>
    s === 'New' ? { bg: 'var(--badge-info-bg)', fg: 'var(--badge-info-fg)' } : { bg: 'var(--badge-success-bg)', fg: 'var(--badge-success-fg)' }

// Builds a real 7-day lead-trend series from actual created_at timestamps —
// no placeholder/fake data, just grouped counts per day.
function getTrendData(leads: Lead[]) {
    const days = 7
    const today = new Date()
    const data: { label: string; count: number }[] = []
    for (let i = days - 1; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dayKey = d.toISOString().slice(0, 10)
        const label = d.toLocaleDateString('en-US', { weekday: 'short' })
        const count = leads.filter(l => l.created_at.slice(0, 10) === dayKey).length
        data.push({ label, count })
    }
    return data
}

export default function DashboardClient({ initialLeads }: { initialLeads: Lead[] }) {
    const [leads, setLeads] = useState<Lead[]>(initialLeads)
    const [statusFilter, setStatusFilter] = useState('All')
    const [priorityFilter, setPriorityFilter] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [sortConfig, setSortConfig] = useState<{ key: keyof Lead, direction: 'asc' | 'desc' }>({ key: 'score', direction: 'desc' })
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [hoverPoint, setHoverPoint] = useState<number | null>(null)

    const filteredAndSortedLeads = useMemo(() => {
        let filtered = leads.filter(lead => {
            const matchStatus = statusFilter === 'All' || lead.status === statusFilter
            const matchPriority = priorityFilter === 'All' || lead.priority === priorityFilter
            const q = searchQuery.trim().toLowerCase()
            const matchSearch = q === '' ||
                lead.name.toLowerCase().includes(q) ||
                lead.email.toLowerCase().includes(q) ||
                lead.business_type.toLowerCase().includes(q)
            return matchStatus && matchPriority && matchSearch
        })
        filtered.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1
            if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1
            return 0
        })
        return filtered
    }, [leads, statusFilter, priorityFilter, searchQuery, sortConfig])

    const handleSort = (key: keyof Lead) => {
        setSortConfig(current => ({
            key,
            direction: current.key === key && current.direction === 'desc' ? 'asc' : 'desc'
        }))
    }

    const handleApproveAndSend = async (lead: Lead) => {
        setIsUpdating(true)
        try {
            await approveAndSendLead({
                id: lead.id,
                email: lead.email,
                name: lead.name,
                follow_up_email: lead.follow_up_email,
            })
            setLeads(current => current.map(l => l.id === lead.id ? { ...l, status: 'Sent' } : l))
            setSelectedLead(null)
        } catch (error) {
            console.error('Failed to send email:', error)
            alert('Failed to send the email. Please try again.')
        } finally {
            setIsUpdating(false)
        }
    }

    const totalLeads = leads.length
    const highPriority = leads.filter(l => l.priority === 'High').length
    const newLeads = leads.filter(l => l.status === 'New').length
    const sentLeads = leads.filter(l => l.status === 'Sent').length

    const pipelineStages = [
        { key: 'new', label: 'New', count: newLeads, color: '#17b6d4' },
        { key: 'sent', label: 'Sent', count: sentLeads, color: '#10b981' },
    ]

    const insightText =
        highPriority > 0
            ? `You have ${highPriority} high-priority lead${highPriority > 1 ? 's' : ''} waiting on a reply`
            : newLeads > 0
                ? `${newLeads} new lead${newLeads > 1 ? 's' : ''} ready to review`
                : totalLeads > 0
                    ? 'All caught up — no leads waiting right now'
                    : null

    const trend = getTrendData(leads)
    const maxTrend = Math.max(1, ...trend.map(t => t.count))
    const chartW = 560
    const chartH = 140
    const stepX = chartW / (trend.length - 1)
    const points = trend.map((t, i) => {
        const x = i * stepX
        const y = chartH - (t.count / maxTrend) * (chartH - 24) - 4
        return { x, y, ...t }
    })
    const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
    const areaPath = `${linePath} L ${chartW} ${chartH} L 0 ${chartH} Z`

    return (
        <div className="app-bg" style={{ minHeight: '100vh', color: 'var(--text-primary)', display: 'flex' }}>
            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes modalIn { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }
        @keyframes overlayIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @keyframes flowTravel { 0% { left: -8%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { left: 106%; opacity: 0; } }
        @keyframes drawLine { from { stroke-dashoffset: 800; } to { stroke-dashoffset: 0; } }
        @keyframes rowFadeIn { from { opacity: 0; } to { opacity: 1; } }
        .lead-row-in { animation: rowFadeIn 0.4s ease both; }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }
        .stat-card { transition: transform 0.25s var(--ease-smooth), box-shadow 0.25s var(--ease-smooth); }
        .stat-card:hover { transform: translateY(-5px) scale(1.012); box-shadow: var(--card-shadow-hover); }
        .stat-card-bar {
          position: absolute; top: 0; left: 18px; right: 18px; height: 3px; border-radius: 0 0 4px 4px;
          transform: scaleX(0); transform-origin: left; transition: transform 0.35s var(--ease-smooth);
        }
        .stat-card:hover .stat-card-bar { transform: scaleX(1); }
        .btn-primary { transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease; }
        .btn-primary:hover:not(:disabled) { transform: translateY(-2px); box-shadow: var(--accent-glow-strong); }
        .view-btn { transition: all 0.2s var(--ease-smooth); }
        .view-btn:hover { background: var(--accent-gradient); color: white; transform: translateX(2px); box-shadow: var(--accent-glow); }
        .pulse-dot { animation: pulse 1.5s ease-in-out infinite; }
        .flow-pulse { animation: flowTravel 3s cubic-bezier(0.65,0,0.35,1) infinite; }
        .trend-line { stroke-dasharray: 800; animation: drawLine 1.4s cubic-bezier(0.16,1,0.3,1) both; }
        .nav-item:hover:not(.nav-disabled) { background: var(--accent-tint-strong) !important; }
        .search-input:focus { border-color: #5b6ef5 !important; box-shadow: 0 0 0 3px rgba(91,110,245,0.12); }
        .trend-point { transition: r 0.2s var(--ease-smooth); cursor: pointer; }
        .trend-point:hover { r: 6; }
        .trend-tooltip { transition: opacity 0.15s ease, transform 0.15s var(--ease-smooth); }

        @keyframes blobDrift1 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-16px, 14px) scale(1.08); } }
        @keyframes blobDrift2 { 0%, 100% { transform: translate(0,0) scale(1); } 50% { transform: translate(12px, -10px) scale(1.12); } }
        .glow-blob {
          position: absolute; border-radius: 999px; filter: blur(32px); pointer-events: none;
        }
        .glow-blob-1 {
          width: 260px; height: 260px; background: rgba(255,255,255,0.28); top: -90px; right: -60px;
          animation: blobDrift1 7s ease-in-out infinite;
        }
        .glow-blob-2 {
          width: 200px; height: 200px; background: rgba(94,234,212,0.45); bottom: -70px; right: 160px;
          animation: blobDrift2 8s ease-in-out infinite;
        }
        .stat-card::after {
          content: ''; position: absolute; inset: 0; border-radius: 18px; padding: 1px;
          background: linear-gradient(135deg, rgba(79,70,229,0.18), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.25s ease;
        }
        .stat-card:hover::after { opacity: 1; }
        .stat-icon { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .stat-card:hover .stat-icon { transform: scale(1.14) rotate(-6deg); }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .welcome-gradient {
          background: linear-gradient(270deg, #4338ca, #6d28d9, #17b6d4, #06b6d4, #4338ca);
          background-size: 400% 400%;
          animation: gradientShift 14s ease infinite;
        }

        .lead-row {
          transition: background 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
        }
        .lead-row:hover {
          background: var(--accent-tint-strong) !important;
          transform: scale(1.006);
          box-shadow: 0 6px 18px rgba(79,70,229,0.08);
          position: relative;
          z-index: 1;
        }
        .lead-avatar { transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1); }
        .lead-row:hover .lead-avatar { transform: scale(1.08) rotate(-3deg); }

        .search-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .search-input:hover { border-color: #c7ccf0 !important; }
      `}</style>

            <Sidebar />

            {/* Main content */}
            <main className="app-main" style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '1120px', margin: '0 auto' }}>

                {/* Topbar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '26px', gap: '16px' }}>
                    <div style={{ position: 'relative', flex: 1, maxWidth: '360px' }}>
                        <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search leads by name, email, business…"
                            className="search-input"
                            style={{
                                width: '100%', boxSizing: 'border-box', borderRadius: '12px', border: '1.5px solid var(--border)',
                                background: 'var(--surface)', padding: '10px 14px 10px 40px', fontSize: '13.5px', outline: 'none', color: 'var(--text-primary)'
                            }}
                        />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            height: '36px', width: '36px', borderRadius: '999px',
                            background: 'linear-gradient(135deg,#4f46e5,#17b6d4)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 700, fontSize: '13px', color: 'white'
                        }}>
                            A
                        </div>
                    </div>
                </div>

                {/* Greeting header */}
                <div className="fade-up welcome-gradient" style={{
                    borderRadius: '22px', padding: '30px 32px', marginBottom: '24px', position: 'relative', overflow: 'hidden',
                    boxShadow: '0 18px 40px rgba(67, 56, 202, 0.28)'
                }}>
                    <div className="glow-blob glow-blob-1" />
                    <div className="glow-blob glow-blob-2" />
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <h1 className="font-display" style={{ fontSize: '26px', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', margin: 0 }}>
                            Welcome back 👋
                        </h1>
                        <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14.5px', marginTop: '6px' }}>
                            Here&apos;s what&apos;s happening with your leads today.
                        </p>
                        {insightText && (
                            <div style={{
                                marginTop: '16px', display: 'inline-flex', alignItems: 'center', gap: '8px',
                                background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.22)',
                                borderRadius: '999px', padding: '7px 16px', fontSize: '13px', fontWeight: 600, color: 'white',
                                backdropFilter: 'blur(6px)'
                            }}>
                                <span className="pulse-dot" style={{ width: '6px', height: '6px', borderRadius: '999px', background: '#5eead4' }} />
                                {insightText}
                            </div>
                        )}
                    </div>
                </div>

                {/* Stat cards */}
                <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '20px' }}>
                    {[
                        { label: 'Total Leads', value: totalLeads, icon: Users, grad: 'linear-gradient(135deg,#4f46e5,#818cf8)' },
                        { label: 'High Priority', value: highPriority, icon: AlertTriangle, grad: 'linear-gradient(135deg,#f43f5e,#fb7185)' },
                        { label: 'New', value: newLeads, icon: TrendingUp, grad: 'linear-gradient(135deg,#17b6d4,#5eead4)' },
                        { label: 'Sent', value: sentLeads, icon: Send, grad: 'linear-gradient(135deg,#10b981,#34d399)' },
                    ].map((s, i) => (
                        <div key={s.label} className="stat-card fade-up" style={{
                            animationDelay: `${i * 80}ms`,
                            background: 'var(--surface)', borderRadius: '18px', padding: '20px', position: 'relative',
                            boxShadow: 'var(--card-shadow)',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <div className="stat-card-bar" style={{ background: s.grad }} />
                            <div>
                                <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 600, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.03em' }}>{s.label}</p>
                                <p className="font-data" style={{ fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}><CountUp value={s.value} delay={i * 100 + 200} /></p>
                            </div>
                            <div className="stat-icon" style={{
                                height: '42px', width: '42px', borderRadius: '13px', background: s.grad,
                                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                            }}>
                                <s.icon size={19} color="white" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lead trend chart — built from real created_at data */}
                <div className="fade-up" style={{
                    animationDelay: '150ms',
                    background: 'var(--surface)', borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Last 7 days
                    </p>
                    <p className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '18px', color: 'var(--text-primary)' }}>
                        New leads over time
                    </p>

                    <svg viewBox={`0 0 ${chartW} ${chartH + 24}`} style={{ width: '100%', height: 'auto', overflow: 'visible' }}>
                        <defs>
                            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#5b6ef5" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#17b6d4" stopOpacity="0" />
                            </linearGradient>
                            <linearGradient id="lineStroke" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%" stopColor="#4f46e5" />
                                <stop offset="100%" stopColor="#17b6d4" />
                            </linearGradient>
                        </defs>

                        <path d={areaPath} fill="url(#areaFill)" />
                        <path d={linePath} fill="none" stroke="url(#lineStroke)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="trend-line" />

                        {points.map((p, i) => (
                            <g key={i}>
                                {hoverPoint === i && (
                                    <line x1={p.x} y1={p.y} x2={p.x} y2={chartH} stroke="#4f46e5" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
                                )}
                                <circle
                                    cx={p.x} cy={p.y} r={hoverPoint === i ? 6 : 4}
                                    fill="var(--surface)" stroke="#4f46e5" strokeWidth="2"
                                    className="trend-point"
                                    onMouseEnter={() => setHoverPoint(i)}
                                    onMouseLeave={() => setHoverPoint(current => current === i ? null : current)}
                                />
                                {hoverPoint === i && (
                                    <g className="trend-tooltip">
                                        <rect x={p.x - 24} y={p.y - 34} width="48" height="24" rx="8" fill="var(--text-primary)" opacity="0.92" />
                                        <text x={p.x} y={p.y - 18} textAnchor="middle" fontSize="12" fontWeight="700" fill="var(--surface)" fontFamily="-apple-system, sans-serif">
                                            {p.count}
                                        </text>
                                    </g>
                                )}
                                <text x={p.x} y={chartH + 20} textAnchor="middle" fontSize="11" fill="var(--text-muted)" fontFamily="-apple-system, sans-serif">
                                    {p.label}
                                </text>
                            </g>
                        ))}
                    </svg>
                </div>

                {/* Pipeline tracker */}
                <div className="fade-up" style={{
                    animationDelay: '220ms',
                    background: 'var(--surface)', borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                        Pipeline
                    </p>
                    <p className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '22px', color: 'var(--text-primary)' }}>
                        Where your leads are right now
                    </p>
                    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        {pipelineStages.map((stage, i) => (
                            <div key={stage.key} style={{ display: 'flex', alignItems: 'center', flex: i < pipelineStages.length - 1 ? 1 : 'none' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', minWidth: '76px' }}>
                                    <div style={{ width: '12px', height: '12px', borderRadius: '999px', background: stage.color, boxShadow: `0 0 12px 2px ${stage.color}55` }} />
                                    <div style={{ textAlign: 'center' }}>
                                        <p className="font-data" style={{ fontSize: '22px', fontWeight: 700, lineHeight: 1, color: 'var(--text-primary)' }}>{stage.count}</p>
                                        <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px' }}>{stage.label}</p>
                                    </div>
                                </div>
                                {i < pipelineStages.length - 1 && (
                                    <div style={{ position: 'relative', height: '1px', flex: 1, margin: '0 14px', background: 'var(--border)', overflow: 'hidden', transform: 'translateY(-20px)' }}>
                                        <div className="flow-pulse" style={{
                                            position: 'absolute', top: '50%', transform: 'translateY(-50%)', width: '40px', height: '1px',
                                            background: 'linear-gradient(90deg, #4f46e5, #17b6d4)'
                                        }} />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Table card */}
                <div className="fade-up" style={{
                    animationDelay: '290ms',
                    background: 'var(--surface)', borderRadius: '22px', overflow: 'hidden',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <div style={{
                        padding: '22px 26px', borderBottom: '1px solid var(--border-soft)',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px'
                    }}>
                        <h2 className="font-display" style={{ fontWeight: 700, fontSize: '18px', letterSpacing: '-0.01em', color: 'var(--text-primary)' }}>All Leads</h2>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <CustomSelect
                                value={statusFilter === 'All' ? 'All Status' : statusFilter}
                                onChange={(val) => setStatusFilter(val === 'All Status' ? 'All' : val)}
                                options={['All Status', 'New', 'Sent']}
                            />
                            <CustomSelect
                                value={priorityFilter === 'All' ? 'All Priority' : priorityFilter}
                                onChange={(val) => setPriorityFilter(val === 'All Priority' ? 'All' : val)}
                                options={['All Priority', 'High', 'Medium', 'Low']}
                            />
                        </div>
                    </div>

                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ background: 'var(--surface-alt)' }}>
                                    <th style={thStyle}>Lead</th>
                                    <th style={thStyle}>Business</th>
                                    <th style={{ ...thStyle, cursor: 'pointer' }} onClick={() => handleSort('score')}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                            Score <ArrowUpDown size={12} />
                                        </span>
                                    </th>
                                    <th style={thStyle}>Priority</th>
                                    <th style={thStyle}>Status</th>
                                    <th style={{ ...thStyle, textAlign: 'right' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedLeads.length > 0 ? filteredAndSortedLeads.map((lead, i) => {
                                    const pc = priorityColor(lead.priority)
                                    const sc = scoreColor(lead.score)
                                    const stc = statusColor(lead.status)
                                    return (
                                        <tr key={lead.id} className="lead-row lead-row-in" style={{ borderTop: '1px solid var(--border-soft)', animationDelay: `${Math.min(i, 10) * 35}ms` }}>
                                            <td style={tdStyle}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <div className="lead-avatar" style={{
                                                        height: '38px', width: '38px', borderRadius: '12px',
                                                        background: 'linear-gradient(135deg,#4f46e5,#17b6d4)',
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        fontWeight: 700, fontSize: '14px', color: 'white', flexShrink: 0
                                                    }}>
                                                        {lead.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)' }}>{lead.name}</div>
                                                        <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{lead.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 500 }}>{lead.business_type}</div>
                                                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Budget: {lead.budget}</div>
                                            </td>
                                            <td style={tdStyle}>
                                                <div className="font-data" style={{
                                                    height: '36px', width: '36px', borderRadius: '11px', display: 'flex',
                                                    alignItems: 'center', justifyContent: 'center', fontSize: '15px', fontWeight: 700,
                                                    background: sc.bg, color: sc.fg
                                                }}>
                                                    {lead.score}
                                                </div>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                                    padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                                                    background: pc.bg, color: pc.fg
                                                }}>
                                                    <span className={lead.priority === 'High' ? 'pulse-dot' : ''} style={{
                                                        height: '6px', width: '6px', borderRadius: '999px', background: pc.dot
                                                    }} />
                                                    {lead.priority}
                                                </span>
                                            </td>
                                            <td style={tdStyle}>
                                                <span style={{
                                                    padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 700,
                                                    background: stc.bg, color: stc.fg
                                                }}>
                                                    {lead.status}
                                                </span>
                                            </td>
                                            <td style={{ ...tdStyle, textAlign: 'right' }}>
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="view-btn"
                                                    style={{
                                                        color: 'var(--accent-text)', background: 'var(--accent-tint)', border: 'none',
                                                        padding: '9px 18px', borderRadius: '11px', cursor: 'pointer',
                                                        fontSize: '13px', fontWeight: 700
                                                    }}
                                                >
                                                    View Details →
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                }) : (
                                    <tr>
                                        <td colSpan={6} style={{ padding: '64px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                            <Search size={32} style={{ margin: '0 auto 12px', display: 'block', color: 'var(--text-muted)' }} />
                                            No leads found matching your filters.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal */}
            {selectedLead && (
                <div style={{ position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <div
                        style={{ position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.45)', backdropFilter: 'blur(6px)', animation: 'overlayIn 0.2s ease' }}
                        onClick={() => setSelectedLead(null)}
                    />

                    <div style={{
                        position: 'relative', background: 'var(--surface)', borderRadius: '24px',
                        boxShadow: '0 30px 60px rgba(15,23,42,0.25)', maxWidth: '640px', width: '100%',
                        maxHeight: '88vh', display: 'flex', flexDirection: 'column',
                        animation: 'modalIn 0.28s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{
                            background: 'linear-gradient(120deg, #4338ca, #4f46e5, #17b6d4)',
                            padding: '26px 28px', borderRadius: '24px 24px 0 0',
                            display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'
                        }}>
                            <div>
                                <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 800, color: 'white', letterSpacing: '-0.01em' }}>{selectedLead.name}</h3>
                                <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginTop: '4px' }}>
                                    {selectedLead.email} &nbsp;•&nbsp; {selectedLead.business_type}
                                </p>
                            </div>
                            <button onClick={() => setSelectedLead(null)} style={{
                                background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', color: 'white',
                                borderRadius: '10px', padding: '8px', display: 'flex'
                            }}>
                                <X size={20} />
                            </button>
                        </div>

                        <div style={{ padding: '24px 28px', overflowY: 'auto' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '22px', flexWrap: 'wrap' }}>
                                {(() => {
                                    const sc = scoreColor(selectedLead.score)
                                    const pc = priorityColor(selectedLead.priority)
                                    const stc = statusColor(selectedLead.status)
                                    return (
                                        <>
                                            <span style={pillStyle(sc.bg, sc.fg)}>Score: {selectedLead.score}</span>
                                            <span style={pillStyle(pc.bg, pc.fg)}>Priority: {selectedLead.priority}</span>
                                            <span style={pillStyle(stc.bg, stc.fg)}>Status: {selectedLead.status}</span>
                                        </>
                                    )
                                })()}
                            </div>

                            <div style={{ ...sectionStyle, background: 'var(--surface-alt)', border: '1px solid var(--border-soft)' }}>
                                <div style={sectionHeader}>
                                    <Target size={14} color="var(--text-secondary)" />
                                    <h4 style={sectionTitle}>Lead Intent</h4>
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: 1.6 }}>
                                    {selectedLead.intent || 'No intent specified.'}
                                </p>
                            </div>

                            <div style={{ ...sectionStyle, background: 'var(--accent-tint)', border: '1px solid var(--accent-tint)' }}>
                                <div style={sectionHeader}>
                                    <Wand2 size={14} color="var(--accent-text)" />
                                    <h4 style={{ ...sectionTitle, color: 'var(--accent-text)' }}>AI Recommended Action</h4>
                                </div>
                                <p style={{ fontSize: '14px', color: 'var(--accent-text)', lineHeight: 1.6 }}>
                                    {selectedLead.recommended_action || 'No recommended action.'}
                                </p>
                            </div>

                            <div style={{ ...sectionStyle, background: 'var(--surface)', border: '1px solid var(--border-soft)', marginBottom: 0 }}>
                                <div style={sectionHeader}>
                                    <Mail size={14} color="var(--text-secondary)" />
                                    <h4 style={sectionTitle}>Draft Follow-up Email</h4>
                                </div>
                                <div style={{
                                    fontSize: '13.5px', color: 'var(--text-primary)', whiteSpace: 'pre-wrap',
                                    fontFamily: 'ui-monospace, SFMono-Regular, monospace', lineHeight: 1.7,
                                    background: 'var(--surface-alt)', padding: '16px', borderRadius: '12px', border: '1px solid var(--border-soft)'
                                }}>
                                    {selectedLead.follow_up_email || 'No email draft available.'}
                                </div>
                            </div>
                        </div>

                        <div style={{
                            padding: '18px 28px', borderTop: '1px solid var(--border-soft)', background: 'var(--surface-alt)',
                            display: 'flex', justifyContent: 'flex-end', gap: '10px', borderRadius: '0 0 24px 24px'
                        }}>
                            <button onClick={() => setSelectedLead(null)} style={{
                                padding: '11px 20px', borderRadius: '12px', border: '1px solid var(--border)',
                                background: 'var(--surface)', cursor: 'pointer', fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)'
                            }}>
                                Cancel
                            </button>
                            <button
                                onClick={() => handleApproveAndSend(selectedLead)}
                                disabled={isUpdating || selectedLead.status === 'Sent'}
                                className="btn-primary btn-shine"
                                style={{
                                    padding: '11px 22px', borderRadius: '12px', border: 'none',
                                    background: 'linear-gradient(135deg, #4f46e5, #17b6d4)', color: 'white',
                                    cursor: (isUpdating || selectedLead.status === 'Sent') ? 'not-allowed' : 'pointer',
                                    fontSize: '14px', fontWeight: 700,
                                    opacity: (isUpdating || selectedLead.status === 'Sent') ? 0.55 : 1,
                                    display: 'flex', alignItems: 'center', gap: '8px',
                                    boxShadow: '0 6px 16px rgba(79,70,229,0.3)'
                                }}
                            >
                                <Send size={15} />
                                {isUpdating ? 'Sending...' : selectedLead.status === 'Sent' ? 'Already Sent' : 'Approve & Send'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const thStyle: React.CSSProperties = {
    padding: '14px 26px', textAlign: 'left', fontSize: '11.5px', fontWeight: 700,
    color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em'
}
const tdStyle: React.CSSProperties = { padding: '18px 26px' }
const sectionStyle: React.CSSProperties = { borderRadius: '16px', padding: '18px', marginBottom: '14px' }
const sectionHeader: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }
const sectionTitle: React.CSSProperties = {
    fontSize: '11.5px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: 'var(--text-secondary)'
}
const pillStyle = (bg: string, fg: string): React.CSSProperties => ({
    padding: '6px 13px', borderRadius: '999px', fontSize: '12px', fontWeight: 700, background: bg, color: fg
})