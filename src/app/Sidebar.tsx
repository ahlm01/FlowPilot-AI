'use client'

import { useState, useId, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Inbox, BarChart3, Settings as SettingsIcon, User, Menu, X, Sun, Moon } from 'lucide-react'

const navItems = [
    { label: 'Leads', href: '/', icon: Inbox },
    { label: 'Analytics', href: '/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/settings', icon: SettingsIcon },
    { label: 'Profile', href: '/profile', icon: User },
]

function FlowMark({ size = 30 }: { size?: number }) {
    // Unique per render so two FlowMarks on the same page (desktop sidebar +
    // mobile top bar) never collide on the same gradient id.
    const gradId = `flowGradSidebar-${useId()}`
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id={gradId} x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path
                d="M20 120 C 55 120, 55 80, 90 80 C 125 80, 125 40, 160 40"
                fill="none"
                stroke={`url(#${gradId})`}
                strokeWidth="9"
                strokeLinecap="round"
            />
            <circle cx="20" cy="120" r="13" fill="#5b6ef5" />
            <circle cx="90" cy="80" r="15" fill="#3aa0e0" />
            <circle cx="160" cy="40" r="13" fill="#17b6d4" />
        </svg>
    )
}

export default function Sidebar() {
    const pathname = usePathname()
    const [mobileOpen, setMobileOpen] = useState(false)
    // null until mounted, so we never render a toggle state that could
    // mismatch the theme the blocking init script already applied.
    const [theme, setTheme] = useState<'light' | 'dark' | null>(null)

    useEffect(() => {
        const current = document.documentElement.getAttribute('data-theme')
        setTheme(current === 'dark' ? 'dark' : 'light')
    }, [])

    function toggleTheme() {
        const next = theme === 'dark' ? 'light' : 'dark'
        setTheme(next)
        document.documentElement.setAttribute('data-theme', next)
        try {
            localStorage.setItem('flowpilot-theme', next)
        } catch {
            // localStorage unavailable (private browsing, etc.) — theme just
            // won't persist across visits, which is fine.
        }
    }

    return (
        <>
            <style>{`
        .nav-item {
          position: relative;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .nav-item:hover {
          background: var(--accent-tint-strong) !important;
          transform: translateX(2px);
        }
        .nav-item .nav-icon {
          transition: transform 0.2s ease;
        }
        .nav-item:hover .nav-icon {
          transform: scale(1.12);
        }
        .signout-btn {
          transition: background 0.18s ease, color 0.18s ease;
        }
        .signout-btn:hover {
          background: rgba(225, 29, 72, 0.12) !important;
          color: #e11d48 !important;
        }
        .logo-mark {
          transition: transform 0.3s ease;
        }
        .logo-mark:hover {
          transform: scale(1.08);
        }
        .mobile-menu-btn {
          transition: background 0.15s ease;
        }
        .mobile-menu-btn:hover {
          background: var(--accent-tint-strong) !important;
        }
      `}</style>

            {/* Mobile-only top bar with hamburger toggle */}
            <header className="mobile-topbar">
                <div style={{ display: 'flex', alignItems: 'center', gap: '9px' }}>
                    <FlowMark size={22} />
                    <span className="font-display" style={{ fontWeight: 700, fontSize: '15.5px', letterSpacing: '-0.02em' }}>FlowPilot</span>
                </div>
                <button
                    type="button"
                    className="mobile-menu-btn"
                    onClick={() => setMobileOpen(true)}
                    aria-label="Open menu"
                    style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '36px', height: '36px', borderRadius: '10px', border: 'none',
                        background: 'transparent', color: 'var(--text-primary)', cursor: 'pointer'
                    }}
                >
                    <Menu size={20} />
                </button>
            </header>

            {/* Backdrop shown behind the drawer on mobile */}
            {mobileOpen && (
                <div className="sidebar-backdrop" onClick={() => setMobileOpen(false)} />
            )}

            <aside className={`app-sidebar${mobileOpen ? ' mobile-open' : ''}`} style={{
                width: '240px', flexShrink: 0, background: 'var(--surface)', borderRight: '1px solid var(--border-soft)',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'sticky', top: 0, height: '100vh'
            }}>
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 22px 24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div className="logo-mark">
                                <FlowMark />
                            </div>
                            <span className="font-display" style={{ fontWeight: 700, fontSize: '16.5px', letterSpacing: '-0.02em' }}>FlowPilot</span>
                        </div>
                        <button
                            type="button"
                            className="mobile-menu-btn mobile-only-close"
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                            style={{
                                display: 'none', alignItems: 'center', justifyContent: 'center',
                                width: '32px', height: '32px', borderRadius: '9px', border: 'none',
                                background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer'
                            }}
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <nav style={{ padding: '4px 12px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {navItems.map((item) => {
                            const active = pathname === item.href
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="nav-item"
                                    onClick={() => setMobileOpen(false)}
                                    style={{
                                        display: 'flex', alignItems: 'center', gap: '10px',
                                        padding: '10px 12px', borderRadius: '10px', fontSize: '14px', fontWeight: 600,
                                        color: active ? 'var(--accent-text)' : 'var(--text-secondary)',
                                        background: active ? 'var(--accent-tint)' : 'transparent',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <item.icon size={16} className="nav-icon" />
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div style={{ padding: '16px', borderTop: '1px solid var(--border-soft)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="theme-toggle-btn"
                        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600,
                            color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '9px 10px', borderRadius: '10px'
                        }}
                    >
                        {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                    </button>
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="signout-btn" style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600,
                            color: 'var(--text-muted)', background: 'transparent', border: 'none', cursor: 'pointer', padding: '9px 10px', borderRadius: '10px'
                        }}>
                            <LogOut size={14} /> Sign out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}