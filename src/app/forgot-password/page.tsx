"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { requestPasswordReset } from "./actions";

function FlowMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flowGradForgot" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path d="M20 120 C 55 120, 55 80, 90 80 C 125 80, 125 40, 160 40"
                fill="none" stroke="url(#flowGradForgot)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="20" cy="120" r="13" fill="#5b6ef5" />
            <circle cx="90" cy="80" r="15" fill="#3aa0e0" />
            <circle cx="160" cy="40" r="13" fill="#17b6d4" />
        </svg>
    );
}

export default function ForgotPasswordPage() {
    const [isPending, startTransition] = useTransition();
    const [sent, setSent] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(formData: FormData) {
        setError("");
        formData.set("origin", window.location.origin);
        startTransition(async () => {
            const result = await requestPasswordReset(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                setSent(true);
            }
        });
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: "24px" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&display=swap');
        .font-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }
        .fp-input { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .fp-input:hover { border-color: #c7ccf0; }
        .fp-input:focus { border-color: #5b6ef5; box-shadow: 0 0 0 4px rgba(91,110,245,0.12); outline: none; }
        .fp-btn { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .fp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(79,70,229,0.35); }
        .fp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

            <div style={{
                maxWidth: "420px", width: "100%", background: "white", borderRadius: "20px",
                padding: "40px 36px", boxShadow: "0 12px 32px rgba(15,23,42,0.08)"
            }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <FlowMark size={32} />
                </div>

                {sent ? (
                    <div style={{ textAlign: "center" }}>
                        <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "10px" }}>
                            Check your email
                        </h1>
                        <p style={{ color: "#5b6382", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                            If an account exists for that address, we&apos;ve sent a link to reset your password.
                        </p>
                        <Link href="/login" style={{
                            display: "inline-block", padding: "11px 24px", borderRadius: "12px",
                            background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                            fontWeight: 700, fontSize: "14px", textDecoration: "none"
                        }}>
                            Back to login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "8px", textAlign: "center" }}>
                            Reset your password
                        </h1>
                        <p style={{ color: "#5b6382", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "26px", textAlign: "center" }}>
                            Enter your email and we&apos;ll send you a link to set a new password.
                        </p>

                        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div>
                                <label htmlFor="email" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    Email
                                </label>
                                <input
                                    id="email" name="email" type="email" required placeholder="you@business.com"
                                    className="fp-input"
                                    style={{
                                        width: "100%", boxSizing: "border-box", borderRadius: "13px", background: "#f7f8fc",
                                        border: "1.5px solid #e7e9f5", padding: "13px 17px", fontSize: "15px", color: "#12162b"
                                    }}
                                />
                            </div>

                            {error && (
                                <div style={{
                                    borderRadius: "10px", border: "1px solid #fecdd3", background: "#fff1f2",
                                    padding: "11px 15px", fontSize: "14px", color: "#e11d48"
                                }}>
                                    {error}
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="fp-btn" style={{
                                width: "100%", borderRadius: "13px", border: "none", cursor: "pointer",
                                background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                                fontSize: "15px", fontWeight: 700, padding: "13px", marginTop: "4px",
                                boxShadow: "0 8px 20px rgba(79,70,229,0.25)"
                            }}>
                                {isPending ? "Sending…" : "Send reset link"}
                            </button>
                        </form>

                        <p style={{ color: "#5b6382", fontSize: "13.5px", marginTop: "20px", textAlign: "center" }}>
                            <Link href="/login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
                                Back to login
                            </Link>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
}
