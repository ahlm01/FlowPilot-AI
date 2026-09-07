import Link from "next/link";

function FlowMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flowGradCheckEmail" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path d="M20 120 C 55 120, 55 80, 90 80 C 125 80, 125 40, 160 40"
                fill="none" stroke="url(#flowGradCheckEmail)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="20" cy="120" r="13" fill="#5b6ef5" />
            <circle cx="90" cy="80" r="15" fill="#3aa0e0" />
            <circle cx="160" cy="40" r="13" fill="#17b6d4" />
        </svg>
    );
}

export default function CheckEmailPage() {
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", padding: "24px" }}>
            <div style={{
                maxWidth: "420px", width: "100%", background: "white", borderRadius: "20px",
                padding: "40px 36px", textAlign: "center", boxShadow: "0 12px 32px rgba(15,23,42,0.08)"
            }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <FlowMark size={32} />
                </div>
                <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "10px" }}>
                    Check your email
                </h1>
                <p style={{ color: "#5b6382", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                    We&apos;ve sent a confirmation link to your inbox. Click it to activate your account, then come back and log in.
                </p>
                <Link href="/login" style={{
                    display: "inline-block", padding: "11px 24px", borderRadius: "12px",
                    background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                    fontWeight: 700, fontSize: "14px", textDecoration: "none"
                }}>
                    Back to login
                </Link>
            </div>
        </div>
    );
}