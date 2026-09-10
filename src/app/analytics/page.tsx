import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import Sidebar from '../Sidebar'
import AnalyticsClient from './AnalyticsClient'

export default async function AnalyticsPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: leads } = await supabase
        .from('leads')
        .select('*')
        .eq('user_id', user.id)

    return (
        <div className="app-bg" style={{ minHeight: '100vh', display: 'flex' }}>
            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        .stat-card { transition: transform 0.25s var(--ease-smooth), box-shadow 0.25s var(--ease-smooth); position: relative; }
        .stat-card:hover { transform: translateY(-5px) scale(1.012); box-shadow: var(--card-shadow-hover); }
        .stat-card::after {
          content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px;
          background: linear-gradient(135deg, rgba(79,70,229,0.18), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.25s ease;
        }
        .stat-card:hover::after { opacity: 1; }

        .bar-col { transition: transform 0.2s var(--ease-smooth); cursor: default; }
        .bar-col:hover { transform: translateY(-3px); }
        .bar-col:hover .bar-fill { filter: brightness(1.1); box-shadow: 0 8px 18px -4px currentColor; }
        .bar-fill { transition: height 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.2s ease, box-shadow 0.2s ease; }
        .priority-fill { transition: width 0.9s cubic-bezier(0.16,1,0.3,1); position: relative; overflow: hidden; }
        .priority-fill::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
          transform: translateX(-100%); animation: sheen 2.6s ease-in-out infinite;
        }
        @keyframes sheen { 0%, 20% { transform: translateX(-100%); } 60%, 100% { transform: translateX(200%); } }
      `}</style>
            <Sidebar />
            <main className="app-main" style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 className="font-display fade-up" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
                    Analytics
                </h1>
                <p className="fade-up" style={{ animationDelay: '60ms', color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                    Real numbers from your lead pipeline.
                </p>

                <AnalyticsClient leads={leads ?? []} />
            </main>
        </div>
    )
}