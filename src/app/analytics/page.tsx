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
        <div className="app-bg" style={{ minHeight: '100vh', display: 'flex', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');
        .font-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }
        .font-data { font-family: 'JetBrains Mono', ui-monospace, monospace; }

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

        .stat-card { transition: transform 0.25s ease, box-shadow 0.25s ease; position: relative; }
        .stat-card:hover { transform: translateY(-4px) scale(1.01); box-shadow: 0 20px 40px rgba(79, 70, 229, 0.12); }
        .stat-card::after {
          content: ''; position: absolute; inset: 0; border-radius: 20px; padding: 1px;
          background: linear-gradient(135deg, rgba(79,70,229,0.18), transparent 60%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor; mask-composite: exclude; opacity: 0; transition: opacity 0.25s ease;
        }
        .stat-card:hover::after { opacity: 1; }

        .bar-col { transition: transform 0.2s ease; }
        .bar-col:hover { transform: translateY(-3px); }
        .bar-col:hover .bar-fill { filter: brightness(1.08); }
        .bar-fill { transition: height 0.9s cubic-bezier(0.16,1,0.3,1), filter 0.2s ease; }
        .priority-fill { transition: width 0.9s cubic-bezier(0.16,1,0.3,1); }
      `}</style>
            <Sidebar />
            <main style={{ flex: 1, minWidth: 0, padding: '28px 36px 48px', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 className="font-display fade-up" style={{ fontSize: '24px', fontWeight: 700, marginBottom: '6px', color: '#12162b' }}>
                    Analytics
                </h1>
                <p className="fade-up" style={{ animationDelay: '60ms', color: '#5b6382', fontSize: '14px', marginBottom: '24px' }}>
                    Real numbers from your lead pipeline.
                </p>

                <AnalyticsClient leads={leads ?? []} />
            </main>
        </div>
    )
}