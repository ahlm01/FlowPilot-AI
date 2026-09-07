'use client'

import { useState, useId } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Inbox, BarChart3, Settings as SettingsIcon, User, Menu, X } from 'lucide-react'

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

    return (
        <>
            <style>{`
        .nav-item {
          position: relative;
          transition: background 0.2s ease, color 0.2s ease, transform 0.15s ease;
        }
        .nav-item:hover {
          background: #f5f7ff !important;
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
          background: #fef2f2 !important;
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
          background: #f5f7ff !important;
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
                        background: 'transparent', color: '#334155', cursor: 'pointer'
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
                width: '240px', flexShrink: 0, background: 'white', borderRight: '1px solid #eef0f6',
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
                                background: 'transparent', color: '#94a3c0', cursor: 'pointer'
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
                                        color: active ? '#4f46e5' : '#5b6382',
                                        background: active ? '#eef1ff' : 'transparent',
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

                <div style={{ padding: '16px', borderTop: '1px solid #eef0f6' }}>
                    <form action="/auth/signout" method="post">
                        <button type="submit" className="signout-btn" style={{
                            width: '100%', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: 600,
                            color: '#94a3c0', background: 'transparent', border: 'none', cursor: 'pointer', padding: '9px 10px', borderRadius: '10px'
                        }}>
                            <LogOut size={14} /> Sign out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}