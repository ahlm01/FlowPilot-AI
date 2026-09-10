import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '../Sidebar'
import PasswordForm from './PasswordForm'

export default async function ProfilePage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const joined = user.created_at
        ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
        : null

    return (
        <div className="app-bg" style={{ minHeight: '100vh', display: 'flex' }}>
            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .profile-card { transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.2s ease; }
        .profile-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,23,42,0.09); }
        .avatar-ring { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .profile-card:hover .avatar-ring { transform: scale(1.08) rotate(-4deg); }
      `}</style>
            <Sidebar />
            <main className="app-main" style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '760px', margin: '0 auto' }}>
                <h1 className="font-display fade-up" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: 'var(--text-primary)' }}>
                    Profile
                </h1>

                <div className="profile-card fade-up" style={{
                    animationDelay: '80ms',
                    background: 'var(--surface)', borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
                    boxShadow: 'var(--card-shadow)', display: 'flex', alignItems: 'center', gap: '16px'
                }}>
                    <div className="avatar-ring" style={{
                        height: '54px', width: '54px', borderRadius: '999px',
                        background: 'linear-gradient(135deg,#4f46e5,#17b6d4)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '20px', color: 'white', flexShrink: 0
                    }}>
                        {user.email?.[0]?.toUpperCase() ?? '?'}
                    </div>
                    <div>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{user.email}</p>
                        {joined && <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>Member since {joined}</p>}
                    </div>
                </div>

                <div className="fade-up" style={{
                    animationDelay: '160ms',
                    background: 'var(--surface)', borderRadius: '20px', padding: '24px 28px',
                    boxShadow: 'var(--card-shadow)'
                }}>
                    <h2 className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: 'var(--text-primary)' }}>
                        Change password
                    </h2>
                    <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '18px' }}>
                        Choose a new password for your account.
                    </p>
                    <PasswordForm />
                </div>
            </main>
        </div>
    )
}