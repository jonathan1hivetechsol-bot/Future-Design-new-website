"use client";

import React, { useEffect, useState } from "react";

const demoAreas = [
  "DHA Lahore",
  "Gulberg",
  "Bahria Town",
  "Model Town",
  "Samanabad",
  "Johar Town",
  "Garden Town",
  "Township",
  "Islampura",
  "Sabzazar",
  "Cantt",
  "Shadman",
  "Nishtar Colony",
  "Wapda Town",
  "Town Square",
  "Faisal Town",
  "Awan Town",
  "DHA Phase 5",
  "Valencia",
  "Anarkali",
];

export default function OrderStrip({
  intervalMs = 10000,
  showMs = 1500,
}: {
  intervalMs?: number;
  showMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [viewportWidth, setViewportWidth] = useState<number>(1024);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // show once shortly after mount to avoid SSR mismatch
    let showTimeout: ReturnType<typeof setTimeout> | null = null;
    let hideTimeout: ReturnType<typeof setTimeout> | null = null;
    let tickInterval: ReturnType<typeof setInterval> | null = null;

    const startCycle = () => {
      // show immediately
      setVisible(true);
      hideTimeout = setTimeout(() => setVisible(false), showMs);

      // then schedule repeating
      tickInterval = setInterval(() => {
        setIndex((i) => (i + 1) % demoAreas.length);
        setVisible(true);
        if (hideTimeout) clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => setVisible(false), showMs);
      }, intervalMs);
    };

    // start after a short delay so user sees page first
    showTimeout = setTimeout(startCycle, 1200);

    return () => {
      if (showTimeout) clearTimeout(showTimeout);
      if (hideTimeout) clearTimeout(hideTimeout);
      if (tickInterval) clearInterval(tickInterval);
    };
  }, [intervalMs, showMs]);

  const isMobile = viewportWidth && viewportWidth < 768;

  const styleContainer: React.CSSProperties = {
    position: "fixed",
    zIndex: 90,
    right: isMobile ? 12 : 24,
    bottom: isMobile ? 80 : 64,
    display: "flex",
    alignItems: "center",
    pointerEvents: "none",
  };

  const stripStyle: React.CSSProperties = {
    pointerEvents: "auto",
    transform: visible ? "translateX(0)" : "translateX(120%)",
    transition: "transform 320ms cubic-bezier(.2,.9,.3,1), opacity 200ms ease",
    opacity: visible ? 1 : 0,
    background: "linear-gradient(90deg,#ffffff,#f8fafc)",
    border: "1px solid rgba(0,0,0,0.06)",
    boxShadow: "0 6px 20px rgba(2,6,23,0.08)",
    padding: "8px 14px",
    borderRadius: 9999,
    fontSize: 13,
    color: "#111827",
    display: "flex",
    gap: 10,
    alignItems: "center",
    minWidth: 160,
    maxWidth: isMobile ? "calc(100vw - 56px)" : 320,
  };

  const badgeStyle: React.CSSProperties = {
    background: "#ef4444",
    color: "#fff",
    borderRadius: 9999,
    padding: "6px 8px",
    fontSize: 12,
    fontWeight: 700,
  };

  return (
    <div style={styleContainer} aria-hidden>
      <div style={stripStyle}>
        <div style={badgeStyle}>1</div>
        <div style={{ lineHeight: 1 }}>
          <div style={{ fontWeight: 600 }}>Order received</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>{`from ${demoAreas[index]}`}</div>
        </div>
      </div>
    </div>
  );
}
