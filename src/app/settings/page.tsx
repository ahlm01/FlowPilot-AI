import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '../Sidebar'
import SettingsForm from './SettingsForm'

export default async function SettingsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: settings } = await supabase
        .from('user_settings')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()

    return (
        <div className="app-bg" style={{ minHeight: '100vh', display: 'flex' }}>
            <style>{`
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

        .settings-input {
          transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
        }
        .settings-input:hover { border-color: #c7ccf0 !important; }
        .settings-input:focus {
          border-color: #5b6ef5 !important;
          box-shadow: 0 0 0 3px rgba(91,110,245,0.15);
          outline: none;
        }
        .save-btn { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .save-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(79,70,229,0.35); }

        @keyframes popIn { from { opacity: 0; transform: scale(0.7); } to { opacity: 1; transform: scale(1); } }
        .pop-in { animation: popIn 0.35s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '760px', margin: '0 auto' }}>
                <h1 className="font-display fade-up" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', color: '#12162b' }}>
                    Settings
                </h1>
                <p className="fade-up" style={{ animationDelay: '60ms', color: '#5b6382', fontSize: '14px', marginBottom: '28px' }}>
                    Manage your account details and lead intake link.
                </p>

                <SettingsForm initialSettings={settings} userId={user.id} />
            </main>
        </div>
    )
}