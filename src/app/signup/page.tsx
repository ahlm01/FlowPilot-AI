"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useTransition } from "react";
import Link from "next/link";
import { signup } from "./actions";
import PasswordInput from "@/components/ui/PasswordInput";

function FlowMark({ size = 30 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flowGradSignup" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path d="M35 128 L100 92 L165 38"
                fill="none" stroke="url(#flowGradSignup)" strokeWidth="15" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="35" cy="128" r="15" fill="#5b6ef5" />
            <circle cx="100" cy="92" r="12" fill="#3aa0e0" />
            <circle cx="165" cy="38" r="15" fill="#17b6d4" />
        </svg>
    );
}

export default function SignupPage() {
    return (
        <Suspense fallback={null}>
            <SignupPageInner />
        </Suspense>
    );
}

function SignupPageInner() {
    const searchParams = useSearchParams();
    const message = searchParams.get("message");
    const [isPending, startTransition] = useTransition();

    function handleSubmit(formData: FormData) {
        startTransition(() => {
            signup(formData);
        });
    }

    return (
        <div style={{ minHeight: "100vh", width: "100%", position: "relative", overflow: "hidden", background: "#ffffff" }}>
            <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes semiIn {
          from { opacity: 0; transform: translateY(-50%) translateX(40px) scale(0.94); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0) scale(1); }
        }
        .semi-in { animation: semiIn 0.9s cubic-bezier(0.16,1,0.3,1) both; }

        @keyframes orbitSpin { from { transform: translate(-50%,-50%) rotate(0deg); } to { transform: translate(-50%,-50%) rotate(360deg); } }
        .orbit-ring { animation: orbitSpin 36s linear infinite; }

        @keyframes pulseCore {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.045); }
        }
        .orbit-core { animation: pulseCore 4.5s ease-in-out infinite; }

        @keyframes driftDot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        .login-input { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }
        .login-input:hover { border-color: #c7ccf0; }
        .login-input:focus {
          border-color: #5b6ef5;
          box-shadow: 0 0 0 4px rgba(91,110,245,0.12);
          outline: none;
        }
        .login-btn { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .login-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(79,70,229,0.35);
        }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        @media (max-width: 900px) {
          .orbit-graphic { display: none !important; }
        }
      `}</style>

            {/* Fills the top-right corner gap the main circle's curve can't reach */}
            <div style={{
                position: "absolute", top: "-20vh", right: "-20vh",
                width: "60vh", height: "60vh",
                borderRadius: "999px",
                background: "radial-gradient(circle, #b9cdf7 0%, #d9e0ff 60%, transparent 100%)"
            }} />

            {/* Large circle, mostly off-screen */}
            <div className="orbit-graphic semi-in" style={{
                position: "absolute", top: "50%", right: "calc(45vw - 115vh)", transform: "translateY(-50%)",
                width: "115vh", height: "115vh",
                borderRadius: "999px",
                background: "linear-gradient(115deg, #e3e8ff 0%, #b9cdf7 45%, #8fc0e8 100%)",
                filter: "drop-shadow(0 20px 44px rgba(91,110,245,0.25))"
            }} />

            <div className="orbit-graphic orbit-ring" style={{
                position: "absolute", top: "50%", left: "78vw",
                width: "46vh", height: "46vh", transform: "translate(-50%, -50%)",
                borderRadius: "999px", border: "2px dashed rgba(67,56,202,0.35)"
            }}>
                <div style={{ position: "absolute", top: "-13px", left: "50%", transform: "translateX(-50%)", width: "26px", height: "26px", borderRadius: "999px", background: "#5b6ef5", boxShadow: "0 0 0 7px rgba(91,110,245,0.18)", animation: "driftDot 3.4s ease-in-out infinite" }} />
                <div style={{ position: "absolute", top: "22%", right: "-11px", width: "21px", height: "21px", borderRadius: "999px", background: "#3aa0e0", boxShadow: "0 0 0 6px rgba(58,160,224,0.18)", animation: "driftDot 4.1s ease-in-out 0.6s infinite" }} />
                <div style={{ position: "absolute", bottom: "10%", left: "8%", width: "18px", height: "18px", borderRadius: "999px", background: "#17b6d4", boxShadow: "0 0 0 6px rgba(23,182,212,0.18)", animation: "driftDot 3.8s ease-in-out 1.1s infinite" }} />
            </div>

            <div className="orbit-graphic orbit-core" style={{
                position: "absolute", top: "50%", left: "78vw", transform: "translate(-50%, -50%)",
                width: "36vh", height: "36vh",
                borderRadius: "999px",
                background: "linear-gradient(135deg, #4f46e5 0%, #17b6d4 100%)",
                boxShadow: "0 0 50px rgba(79,70,229,0.4)"
            }} />

            {/* Form content */}
            <div style={{ position: "relative", zIndex: 1, minHeight: "100vh", display: "flex", flexDirection: "column", padding: "40px 5vw", maxWidth: "560px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FlowMark size={28} />
                    <span className="font-display" style={{ fontWeight: 700, fontSize: "17px", color: "#12162b", letterSpacing: "-0.02em" }}>
                        FlowPilot AI
                    </span>
                </div>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", maxWidth: "420px" }}>
                    <div className="fade-up">
                        <h1 className="font-display" style={{ fontSize: "38px", fontWeight: 700, color: "#12162b", margin: 0, letterSpacing: "-0.02em" }}>
                            Create your account
                        </h1>
                        <p style={{ color: "#5b6382", fontSize: "16.5px", marginTop: "10px", marginBottom: "36px" }}>
                            Start qualifying leads with AI in minutes.
                        </p>

                        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                            <div>
                                <label htmlFor="email" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    Email
                                </label>
                                <input
                                    id="email" name="email" type="email" required placeholder="you@business.com"
                                    className="login-input"
                                    style={{
                                        width: "100%", boxSizing: "border-box", borderRadius: "13px", background: "#f7f8fc",
                                        border: "1.5px solid #e7e9f5", padding: "13px 17px", fontSize: "15px", color: "#12162b"
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    Password
                                </label>
                                <PasswordInput
                                    id="password" name="password" required minLength={6} placeholder="••••••••"
                                    className="login-input"
                                    inputStyle={{
                                        width: "100%", boxSizing: "border-box", borderRadius: "13px", background: "#f7f8fc",
                                        border: "1.5px solid #e7e9f5", padding: "13px 17px", fontSize: "15px", color: "#12162b"
                                    }}
                                />
                            </div>

                            <div>
                                <label htmlFor="confirm_password" style={{ display: "block", fontSize: "13.5px", fontWeight: 600, color: "#5b6382", marginBottom: "7px" }}>
                                    Confirm password
                                </label>
                                <PasswordInput
                                    id="confirm_password" name="confirm_password" required minLength={6} placeholder="••••••••"
                                    className="login-input"
                                    inputStyle={{
                                        width: "100%", boxSizing: "border-box", borderRadius: "13px", background: "#f7f8fc",
                                        border: "1.5px solid #e7e9f5", padding: "13px 17px", fontSize: "15px", color: "#12162b"
                                    }}
                                />
                            </div>

                            {message && (
                                <div style={{
                                    borderRadius: "10px", border: "1px solid #fecdd3", background: "#fff1f2",
                                    padding: "11px 15px", fontSize: "14px", color: "#e11d48"
                                }}>
                                    {message}
                                </div>
                            )}

                            <button type="submit" disabled={isPending} className="login-btn" style={{
                                width: "100%", borderRadius: "13px", border: "none", cursor: "pointer",
                                background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                                fontSize: "15.5px", fontWeight: 700, padding: "14px", marginTop: "6px",
                                boxShadow: "0 8px 20px rgba(79,70,229,0.25)"
                            }}>
                                {isPending ? "Creating account…" : "Create account"}
                            </button>
                        </form>

                        <p style={{ color: "#5b6382", fontSize: "13.5px", marginTop: "20px" }}>
                            Already have an account?{" "}
                            <Link href="/login" style={{ color: "#4f46e5", fontWeight: 600, textDecoration: "none" }}>
                                Log in
                            </Link>
                        </p>
                    </div>
                </div>

                <p style={{ color: "#94a3c0", fontSize: "12.5px" }}>
                    FlowPilot AI · Lead intake &amp; qualification
                </p>
            </div>
        </div>
    );
}