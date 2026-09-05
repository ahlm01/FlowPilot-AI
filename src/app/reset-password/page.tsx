"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { changePassword } from "../profile/actions";
import PasswordInput from "@/components/ui/PasswordInput";

function FlowMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flowGradReset" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path d="M20 120 C 55 120, 55 80, 90 80 C 125 80, 125 40, 160 40"
                fill="none" stroke="url(#flowGradReset)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="20" cy="120" r="13" fill="#5b6ef5" />
            <circle cx="90" cy="80" r="15" fill="#3aa0e0" />
            <circle cx="160" cy="40" r="13" fill="#17b6d4" />
        </svg>
    );
}

export default function ResetPasswordPage() {
    const [isPending, startTransition] = useTransition();
    const [done, setDone] = useState(false);
    const [error, setError] = useState("");

    function handleSubmit(formData: FormData) {
        setError("");
        startTransition(async () => {
            const result = await changePassword(formData);
            if (result?.error) {
                setError(result.error);
            } else {
                setDone(true);
            }
        });
    }

    const inputStyle: React.CSSProperties = {
        width: "100%", boxSizing: "border-box", borderRadius: "13px", background: "#f7f8fc",
        border: "1.5px solid #e7e9f5", padding: "13px 17px", fontSize: "15px", color: "#12162b"
    };

    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f8fc", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', padding: "24px" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&display=swap');
        .font-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }
        .rp-input { transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .rp-input:hover { border-color: #c7ccf0; }
        .rp-input:focus { border-color: #5b6ef5; box-shadow: 0 0 0 4px rgba(91,110,245,0.12); outline: none; }
        .rp-btn { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .rp-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 28px rgba(79,70,229,0.35); }
        .rp-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

            <div style={{
                maxWidth: "420px", width: "100%", background: "white", borderRadius: "20px",
                padding: "40px 36px", boxShadow: "0 12px 32px rgba(15,23,42,0.08)"
            }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                    <FlowMark size={32} />
                </div>

                {done ? (
                    <div style={{ textAlign: "center" }}>
                        <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "10px" }}>
                            Password updated
                        </h1>
                        <p style={{ color: "#5b6382", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "24px" }}>
                            Your password has been changed. You can now sign in with it.
                        </p>
                        <Link href="/login" style={{
                            display: "inline-block", padding: "11px 24px", borderRadius: "12px",
                            background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                            fontWeight: 700, fontSize: "14px", textDecoration: "none"
                        }}>
                            Go to login
                        </Link>
                    </div>
                ) : (
                    <>
                        <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "8px", textAlign: "center" }}>
                            Set a new password
                        </h1>
                        <p style={{ color: "#5b6382", fontSize: "14.5px", lineHeight: 1.6, marginBottom: "26px", textAlign: "center" }}>
                            Choose a new password for your account.
                        </p>

                        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            <div>
                                <label htmlFor="new_password" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    New password
                                </label>
                                <PasswordInput
                                    id="new_password" name="new_password" required minLength={6} placeholder="••••••••"
                                    className="rp-input" inputStyle={inputStyle}
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm_password" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    Confirm new password
                                </label>
                                <PasswordInput
                                    id="confirm_password" name="confirm_password" required minLength={6} placeholder="••••••••"
                                    className="rp-input" inputStyle={inputStyle}
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

                            <button type="submit" disabled={isPending} className="rp-btn" style={{
                                width: "100%", borderRadius: "13px", border: "none", cursor: "pointer",
                                background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                                fontSize: "15px", fontWeight: 700, padding: "13px", marginTop: "4px",
                                boxShadow: "0 8px 20px rgba(79,70,229,0.25)"
                            }}>
                                {isPending ? "Updating…" : "Update password"}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}
