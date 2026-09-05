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
        <div className="app-bg" style={{ minHeight: '100vh', display: 'flex', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&display=swap');
        .font-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .app-bg {
          background-color: #f4f5fb;
          background-image:
            radial-gradient(circle at 8% 10%, rgba(91,110,245,0.16) 0%, transparent 42%),
            radial-gradient(circle at 96% 6%, rgba(23,182,212,0.14) 0%, transparent 40%),
            radial-gradient(circle at 45% 100%, rgba(167,139,250,0.12) 0%, transparent 48%),
            radial-gradient(circle, #cfd4ea 1.4px, transparent 1.4px);
          background-size: auto, auto, auto, 20px 20px;
        }

        .profile-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
        .profile-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(15,23,42,0.09); }
        .avatar-ring { transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .profile-card:hover .avatar-ring { transform: scale(1.08) rotate(-4deg); }
      `}</style>
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '760px', margin: '0 auto' }}>
                <h1 className="font-display fade-up" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#12162b' }}>
                    Profile
                </h1>

                <div className="profile-card fade-up" style={{
                    animationDelay: '80ms',
                    background: 'white', borderRadius: '20px', padding: '24px 28px', marginBottom: '20px',
                    boxShadow: '0 12px 32px rgba(15,23,42,0.06)', display: 'flex', alignItems: 'center', gap: '16px'
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
                        <p style={{ fontSize: '15px', fontWeight: 700, color: '#12162b' }}>{user.email}</p>
                        {joined && <p style={{ fontSize: '13px', color: '#94a3c0', marginTop: '2px' }}>Member since {joined}</p>}
                    </div>
                </div>

                <div className="fade-up" style={{
                    animationDelay: '160ms',
                    background: 'white', borderRadius: '20px', padding: '24px 28px',
                    boxShadow: '0 12px 32px rgba(15,23,42,0.06)'
                }}>
                    <h2 className="font-display" style={{ fontSize: '16px', fontWeight: 700, marginBottom: '4px', color: '#12162b' }}>
                        Change password
                    </h2>
                    <p style={{ fontSize: '13px', color: '#94a3c0', marginBottom: '18px' }}>
                        Choose a new password for your account.
                    </p>
                    <PasswordForm />
                </div>
            </main>
        </div>
    )
}