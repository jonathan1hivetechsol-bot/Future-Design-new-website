"use client";

"use client";

import React, { useEffect, useRef } from "react";

/**
 * SectionFold - wraps a section component with a refined folding effect
 * Improvements:
 * - Uses IntersectionObserver to only animate when the section is visible
 * - Respects prefers-reduced-motion
 * - Pauses when document is hidden to save CPU
 * - Smooth easing with requestAnimationFrame
 */

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

interface SectionFoldProps {
  children: React.ReactNode;
  maxAngle?: number; // default 75
  threshold?: number; // intersection threshold
}

export default function SectionFold({ children, maxAngle = 75, threshold = 0.05 }: SectionFoldProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const innerRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const inViewRef = useRef(false);

  const prefersReduced = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const updateTargetFromRect = (rect: DOMRect) => {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    // progress increases as the section moves up out of view
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = clamp(raw, 0, 1);
    targetRef.current = p;
  };

  const step = () => {
    const t = targetRef.current;
    let c = currentRef.current;
    // eased interpolation
    const ease = 0.18;
    const diff = t - c;
    c = Math.abs(diff) < 0.0005 ? t : c + diff * ease;
    currentRef.current = c;

    const el = elRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    const angle = c * maxAngle;
    const shadow = c * 0.6;

    // Preserve layout height while folding to avoid the top card 'escaping' the section
    // Set a temporary minHeight on the container and hide overflow while active
    if (c > 0.0005) {
      const rect = el.getBoundingClientRect();
      // only set if not already set to avoid layout thrash
      if (!el.style.minHeight) el.style.minHeight = `${Math.ceil(rect.height)}px`;
      el.style.overflow = "hidden";
    } else {
      // when settled back to 0, remove temporary styles
      el.style.minHeight = "";
      el.style.overflow = "";
    }

    // write out transform and shadow on the inner wrapper
    inner.style.transform = `rotateX(${-angle}deg)`;
    inner.style.transformOrigin = "top center";
    inner.style.willChange = "transform";
    inner.style.boxShadow = `0 14px 40px rgba(0,0,0,${0.12 * shadow})`;
    // prevent content flicker when rotated
    inner.style.backfaceVisibility = "hidden";
    inner.style.webkitBackfaceVisibility = "hidden";

    // overlay shadow
    const overlay = el.querySelector("[data-fold-overlay]") as HTMLElement | null;
    if (overlay) overlay.style.opacity = `${0.45 * shadow}`;

    if (Math.abs(currentRef.current - targetRef.current) > 0.0005) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = null;
    }
  };

  useEffect(() => {
    if (prefersReduced) {
      // don't animate; ensure initial state
      if (innerRef.current) innerRef.current.style.transform = "none";
      return;
    }

    let observer: IntersectionObserver | null = null;

    const onIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        inViewRef.current = entry.isIntersecting && entry.intersectionRatio > 0;
        if (inViewRef.current) {
          // compute target based on rect immediately
          updateTargetFromRect(entry.boundingClientRect);
          if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
        } else {
          // when leaving view, reset target to 0 so it unfolds
          targetRef.current = 0;
          if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
        }
      });
    };

    observer = new IntersectionObserver(onIntersection, { threshold: Array.from({ length: 21 }, (_, i) => i / 20) });
    if (elRef.current) observer.observe(elRef.current);

    const onScroll = () => {
      if (!inViewRef.current) return;
      const rect = elRef.current!.getBoundingClientRect();
      updateTargetFromRect(rect);
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

    // start with one frame to set initial
    if (!rafRef.current) rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (observer && elRef.current) observer.unobserve(elRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={elRef} style={{ perspective: "1000px", position: "relative" }}>
      <div
        data-fold-overlay
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.25))",
          opacity: 0,
          zIndex: 20,
          transition: "opacity 160ms linear",
        }}
      />

      <div ref={innerRef} style={{ transformStyle: "preserve-3d", willChange: "transform" }}>
        {children}
      </div>
    </div>
  );
}
