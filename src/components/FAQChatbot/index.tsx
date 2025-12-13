"use client";

import React, { useMemo, useState, useEffect } from "react";
import { faqData } from "./data";

export default function FAQChatbot() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  // Use a stable initial value so server and client render the same markup
  const [viewportWidth, setViewportWidth] = useState<number>(1024);
  const isXs = viewportWidth < 360;
  const isSm = viewportWidth < 420;
  const chatBtnSize = isXs ? 40 : isSm ? 44 : 56;
  const chatSvgSize = chatBtnSize > 50 ? 28 : 20;

  const suggestions = useMemo(() => {
    if (!query) return faqData.slice(0, 6);
    const q = query.toLowerCase();
    return faqData.filter((f) => f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q)).slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // add a class to body when chat is open so other fixed buttons can react
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (open) {
      document.body.classList.add("faq-open");
    } else {
      document.body.classList.remove("faq-open");
    }
    return () => document.body.classList.remove("faq-open");
  }, [open]);

  return (
    <div>
      {/* Floating button (right bottom, above WhatsApp) */}
      {/* leave room for WhatsApp (bottom 84) + button height (56) + 12px gap on mobile */}
      <div style={{ position: "fixed", right: isMobile ? (isXs ? 8 : 12) : 20, bottom: isMobile ? (isXs ? 140 : 152) : 152, zIndex: 80 }}>
        <button
          onClick={() => setOpen((s) => !s)}
          aria-label="Open help chat"
          aria-expanded={open}
          className="flex items-center justify-center"
            style={{
            width: chatBtnSize,
            height: chatBtnSize,
            borderRadius: 9999,
            background: "linear-gradient(180deg,#2563eb,#004aad)",
            color: "#fff",
            boxShadow: "0 10px 30px rgba(2,6,23,0.16)",
            transition: "transform 160ms ease, box-shadow 160ms ease",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={chatSvgSize} height={chatSvgSize} viewBox="0 0 24 24" fill="none">
            <path d="M2 4.5A2.5 2.5 0 014.5 2h15A2.5 2.5 0 0122 4.5v11A2.5 2.5 0 0119.5 18H7.8L3 22V4.5z" fill="#fff" />
          </svg>
        </button>
      </div>

      {/* Panel */}
        {open && (
        <div
          role="dialog"
          aria-label="FAQ chatbot"
          style={{
            position: "fixed",
            right: isMobile ? 12 : 20,
            left: isMobile ? (isXs ? 8 : 12) : "auto",
            /* on mobile, anchor panel below header using `top` to avoid overlap; on desktop keep bottom anchoring */
            top: isMobile ? (isXs ? 72 : 88) : "auto",
            bottom: isMobile ? undefined : (isXs ? 200 : 240),
            /* narrower on mobile so it doesn't cover the header */
            width: isMobile ? (isXs ? "calc(100% - 64px)" : "calc(100% - 80px)") : 300,
            maxWidth: isSm ? "calc(100vw - 48px)" : "calc(100vw - 64px)",
            /* increase the top gap by limiting height so panel can't reach header */
            maxHeight: isMobile ? "calc(100vh - 260px)" : "calc(100vh - 340px)",
            overflowY: "auto",
            /* put panel below the header (header uses z-40), keep it above most content */
            zIndex: 30,
            boxShadow: "0 20px 50px rgba(2,6,23,0.18)",
            borderRadius: 10,
            /* visual indicator requested: red border */
            border: "2px solid #ef4444",
            background: "#fff",
            transform: "translateY(0)",
            transition: "transform 220ms cubic-bezier(.2,.9,.3,1), opacity 160ms ease",
            opacity: 1,
          }}
        >
          <div style={{ padding: 12, borderBottom: "1px solid #eef2ff", display: "flex", alignItems: "center", gap: 8, background: "linear-gradient(90deg,#eef2ff,#f8fafc)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 6px 18px rgba(2,6,23,0.06)" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M2 4.5A2.5 2.5 0 014.5 2h15A2.5 2.5 0 0122 4.5v11A2.5 2.5 0 0119.5 18H7.8L3 22V4.5z" fill="#2563eb" />
                </svg>
              </div>
              <div>
                <strong style={{ fontSize: isXs ? 13 : 15, display: "block" }}>Help & FAQs</strong>
                <small style={{ color: "#6b7280", fontSize: isXs ? 11 : 13 }}>Quick answers and chat</small>
              </div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button onClick={() => { setQuery(""); setSelected(null); }} aria-label="Clear search" style={{ background: "transparent", border: "none", cursor: "pointer", color: "#2563eb" }}>Clear</button>
              <button onClick={() => setOpen(false)} aria-label="Close" style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: 18 }}>✕</button>
            </div>
          </div>

          <div style={{ padding: isXs ? 8 : 12 }}>
            <div style={{ position: "relative" }}>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                aria-label="Search questions"
                style={{ width: "100%", padding: isXs ? '8px 32px 8px 10px' : '10px 36px 10px 12px', borderRadius: 10, border: "1px solid #eef2ff", background: "#fbfdff" }}
              />
              <svg style={{ position: "absolute", right: 10, top: 8 }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M21 21l-4.35-4.35" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="11" cy="11" r="6" stroke="#9CA3AF" strokeWidth="1.5" />
              </svg>
            </div>
          </div>

          <div style={{ maxHeight: isXs ? 260 : 340, overflowY: "auto", overflowX: "hidden", padding: isXs ? 8 : 12, display: "grid", gap: isXs ? 8 : 10 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {suggestions.slice(0, 6).map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(faqData.indexOf(s))}
                  style={{
                    padding: isXs ? "6px 10px" : "8px 12px",
                    borderRadius: 9999,
                    background: "#eef2ff",
                    border: "none",
                    cursor: "pointer",
                    color: "#1e3a8a",
                    fontSize: isXs ? 12 : 13,
                  }}
                >
                  {s.q}
                </button>
              ))}
            </div>

            {selected === null ? (
              <div style={{ color: "#334155" }}>
                <p style={{ marginBottom: 8, fontWeight: 600 }}>Popular questions</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 8 }}>
                  {faqData.slice(0, 8).map((f, idx) => (
                    <li key={idx}>
                      <button onClick={() => setSelected(idx)} style={{ textAlign: "left", width: "100%", background: "transparent", border: "1px solid #eef2ff", padding: 12, borderRadius: 10, cursor: "pointer" }}>
                        <strong style={{ display: "block", fontSize: 14 }}>{f.q}</strong>
                        <small style={{ color: "#6b7280" }}>{f.a.slice(0, 80)}{f.a.length > 80 ? "..." : ""}</small>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div>
                <h4 style={{ marginTop: 0 }}>{faqData[selected].q}</h4>
                <p style={{ color: "#374151" }}>{faqData[selected].a}</p>
                <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                  <button onClick={() => setSelected(null)} style={{ padding: "8px 12px", borderRadius: 8, border: "none", background: "#eef2ff", cursor: "pointer" }}>Back</button>
                  <a href={`https://wa.me/+923457777799?text=${encodeURIComponent("Hi, I need more help with: " + faqData[selected].q)}`} target="_blank" rel="noopener noreferrer" style={{ padding: "8px 12px", borderRadius: 8, background: "#25D366", color: "#fff", textDecoration: "none" }}>Chat on WhatsApp</a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
