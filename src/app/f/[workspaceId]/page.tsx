"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

function FlowMark({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size * 0.8} viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="flowGradIntake" x1="0" y1="1" x2="1" y2="0">
                    <stop offset="0%" stopColor="#5b6ef5" />
                    <stop offset="100%" stopColor="#17b6d4" />
                </linearGradient>
            </defs>
            <path d="M20 120 C 55 120, 55 80, 90 80 C 125 80, 125 40, 160 40"
                fill="none" stroke="url(#flowGradIntake)" strokeWidth="9" strokeLinecap="round" />
            <circle cx="20" cy="120" r="13" fill="#5b6ef5" />
            <circle cx="90" cy="80" r="15" fill="#3aa0e0" />
            <circle cx="160" cy="40" r="13" fill="#17b6d4" />
        </svg>
    );
}

// Set this once you have your n8n Webhook node's production URL.
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || "https://fatir.app.n8n.cloud/webhook/lead-intake";

export default function IntakeFormPage() {
    const params = useParams();
    const workspaceId = params.workspaceId as string;

    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("submitting");
        setErrorMsg("");

        const form = e.currentTarget;
        const formData = new FormData(form);

        const payload = {
            workspace_id: workspaceId,
            name: formData.get("name"),
            email: formData.get("email"),
            business_type: formData.get("business_type"),
            request: formData.get("request"),
            budget: formData.get("budget"),
            submittedAt: new Date().toISOString(),
        };

        try {
            const res = await fetch(N8N_WEBHOOK_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!res.ok) throw new Error("Submission failed");
            setStatus("success");
            form.reset();
        } catch (err) {
            console.error(err);
            setStatus("error");
            setErrorMsg("Something went wrong sending your message. Please try again.");
        }
    }

    const inputStyle: React.CSSProperties = {
        width: "100%", boxSizing: "border-box", borderRadius: "12px", background: "#f7f8fc",
        border: "1.5px solid #e7e9f5", padding: "12px 16px", fontSize: "14.5px", color: "#12162b", outline: "none"
    };
    const labelStyle: React.CSSProperties = {
        display: "block", fontSize: "13px", fontWeight: 600, color: "#5b6382", marginBottom: "6px"
    };

    return (
        <div style={{ minHeight: "100vh", background: "#f7f8fc", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@600;700;800&display=swap');
        .font-display { font-family: 'Space Grotesk', -apple-system, sans-serif; }
        .intake-input:focus { border-color: #5b6ef5 !important; box-shadow: 0 0 0 3px rgba(91,110,245,0.12); }
        .intake-btn { transition: transform 0.15s ease, box-shadow 0.2s ease; }
        .intake-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 10px 22px rgba(79,70,229,0.3); }
        .intake-btn:disabled { opacity: 0.6; cursor: not-allowed; }
      `}</style>

            <div style={{ maxWidth: "480px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", justifyContent: "center", marginBottom: "24px" }}>
                    <FlowMark size={24} />
                    <span className="font-display" style={{ fontWeight: 700, fontSize: "15px", color: "#5b6382" }}>Powered by FlowPilot AI</span>
                </div>

                <div style={{ background: "white", borderRadius: "20px", padding: "36px", boxShadow: "0 12px 32px rgba(15,23,42,0.06)" }}>
                    {status === "success" ? (
                        <div style={{ textAlign: "center", padding: "20px 0" }}>
                            <div style={{ fontSize: "40px", marginBottom: "12px" }}>✓</div>
                            <h2 className="font-display" style={{ fontSize: "20px", fontWeight: 700, color: "#12162b", marginBottom: "8px" }}>
                                Thanks — we got it!
                            </h2>
                            <p style={{ color: "#5b6382", fontSize: "14px" }}>
                                We&apos;ll be in touch shortly.
                            </p>
                        </div>
                    ) : (
                        <>
                            <h1 className="font-display" style={{ fontSize: "22px", fontWeight: 700, color: "#12162b", marginBottom: "6px" }}>
                                Get in touch
                            </h1>
                            <p style={{ color: "#5b6382", fontSize: "14px", marginBottom: "24px" }}>
                                Tell us a bit about what you need — we&apos;ll respond fast.
                            </p>

                            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                                <div>
                                    <label style={labelStyle}>Name</label>
                                    <input name="name" required className="intake-input" style={inputStyle} placeholder="Your name" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Email</label>
                                    <input name="email" type="email" required className="intake-input" style={inputStyle} placeholder="you@email.com" />
                                </div>
                                <div>
                                    <label style={labelStyle}>Business type</label>
                                    <input name="business_type" required className="intake-input" style={inputStyle} placeholder="e.g. Handmade Jewelry" />
                                </div>
                                <div>
                                    <label style={labelStyle}>What do you need help with?</label>
                                    <textarea name="request" required rows={4} className="intake-input" style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} placeholder="Tell us about your project..." />
                                </div>
                                <div>
                                    <label style={labelStyle}>Budget</label>
                                    <input name="budget" required className="intake-input" style={inputStyle} placeholder="e.g. $1,000–$2,500" />
                                </div>

                                {status === "error" && (
                                    <div style={{ borderRadius: "10px", border: "1px solid #fecdd3", background: "#fff1f2", padding: "10px 14px", fontSize: "13px", color: "#e11d48" }}>
                                        {errorMsg}
                                    </div>
                                )}

                                <button type="submit" disabled={status === "submitting"} className="intake-btn" style={{
                                    width: "100%", borderRadius: "12px", border: "none", cursor: "pointer",
                                    background: "linear-gradient(90deg, #5b6ef5 0%, #17b6d4 100%)", color: "white",
                                    fontSize: "15px", fontWeight: 700, padding: "13px", marginTop: "4px",
                                    boxShadow: "0 8px 20px rgba(79,70,229,0.25)"
                                }}>
                                    {status === "submitting" ? "Sending…" : "Send message"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}