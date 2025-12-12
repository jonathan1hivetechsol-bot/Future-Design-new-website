"use client";

import React, { useEffect, useRef } from "react";

interface SectionTopFoldProps {
  children: React.ReactNode;
  foldRatio?: number; // portion of section height to use as top (0..1)
  maxAngle?: number; // max fold angle in degrees
}

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function SectionTopFold({ children, foldRatio = 0.5, maxAngle = 75 }: SectionTopFoldProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const topRef = useRef<HTMLDivElement | null>(null); // top overlay wrapper
  const topInnerRef = useRef<HTMLDivElement | null>(null); // inner content inside top overlay
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // compute progress based on element rect
  function computeProgress(rect: DOMRect) {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const raw = (vh - rect.top) / (vh + rect.height);
    return clamp(raw, 0, 1);
  }

  function step() {
    const t = targetRef.current;
    let c = currentRef.current;
    const ease = 0.18;
    const diff = t - c;
    c = Math.abs(diff) < 0.0005 ? t : c + diff * ease;
    currentRef.current = c;

    const root = rootRef.current;
    const top = topRef.current;
    const topInner = topInnerRef.current;
    if (!root || !top || !topInner) return;

    const angle = c * maxAngle;
    const shadow = c * 0.6;

    // preserve layout while folding
    if (c > 0.0005) {
      const rect = root.getBoundingClientRect();
      if (!root.style.minHeight) root.style.minHeight = `${Math.ceil(rect.height)}px`;
      root.style.overflow = "hidden";
    } else {
      root.style.minHeight = "";
      root.style.overflow = "";
    }

    // topInner holds duplicate content; rotate around bottom
    topInner.style.transform = `rotateX(${-angle}deg)`;
    topInner.style.transformOrigin = "bottom center";
    topInner.style.backfaceVisibility = "hidden";
    topInner.style.boxShadow = `0 18px 48px rgba(0,0,0,${0.12 * shadow})`;

    // overlay shadow intensity
    const overlay = top.querySelector("[data-topfold-overlay]") as HTMLElement | null;
    if (overlay) overlay.style.opacity = `${0.55 * shadow}`;

    if (Math.abs(currentRef.current - targetRef.current) > 0.0005) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = null;
    }
  }

  useEffect(() => {
    if (prefersReduced) return; // no animation

    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
        if (inViewRef.current) {
          targetRef.current = computeProgress(entry.boundingClientRect);
          if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
        } else {
          targetRef.current = 0;
          if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
        }
      }
    }, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });

    observer.observe(root);

    const onScroll = () => {
      if (!inViewRef.current) return;
      if (!rootRef.current) return;
      const rect = rootRef.current.getBoundingClientRect();
      targetRef.current = computeProgress(rect);
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    const onVisibility = () => {
      if (document.hidden) {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else if (inViewRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    // first frame
    if (!rafRef.current) rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Determine top overlay height on mount and resize
  useEffect(() => {
    function measure() {
      const root = rootRef.current;
      const top = topRef.current;
      if (!root || !top) return;
      const rect = root.getBoundingClientRect();
      const topH = Math.max(60, Math.round(rect.height * foldRatio));
      top.style.height = `${topH}px`;
      top.style.pointerEvents = "none";
    }

    measure();
    window.addEventListener("resize", measure, { passive: true });
    return () => window.removeEventListener("resize", measure);
  }, [foldRatio]);

  return (
    <div ref={rootRef} style={{ position: "relative" }}>
      {/* top overlay duplicates children and is clipped to top height */}
      <div
        ref={topRef}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          overflow: "hidden",
          zIndex: 22,
          transformStyle: "preserve-3d",
        }}
      >
        <div data-topfold-overlay style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.25))", opacity: 0, transition: "opacity 160ms linear" }} />
        <div ref={topInnerRef} style={{ transformOrigin: "bottom center" }}>{children}</div>
      </div>

      {/* bottom content - rendered normally underneath */}
      <div style={{ position: "relative", zIndex: 10 }}>{children}</div>
    </div>
  );
}
