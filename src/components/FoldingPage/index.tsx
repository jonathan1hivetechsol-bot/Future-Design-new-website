"use client";

import React, { useEffect, useRef } from "react";
import styles from "./FoldingPage.module.css";

/**
 * FoldingPage
 * - Fold effect driven by scroll position of this section in the viewport
 * - Optimized: uses requestAnimationFrame, minimal DOM writes via CSS variables
 * - Responsive and cross-browser friendly (uses transform, perspective)
 */

const clamp = (v: number, a = 0, b = 1) => Math.max(a, Math.min(b, v));

export default function FoldingPage() {
  const elRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  // Update target progress based on element position
  const updateTarget = () => {
    const el = elRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;

    // Compute a progress value that becomes >0 as the element enters the
    // viewport and reaches 1 as it moves further up. This is more responsive
    // to general page scrolling so users will see the fold while scrolling.
    // Formula: progress = (vh - rect.top) / (vh + rect.height)
    // - when rect.top >= vh (element below viewport) => progress <= 0
    // - when rect.top <= -rect.height (element fully past top) => progress >= 1
    const raw = (vh - rect.top) / (vh + rect.height);
    const p = clamp(raw, 0, 1);
    targetRef.current = p;
  };

  // Animation step - smooth current -> target and write CSS variables
  const step = () => {
    const t = targetRef.current;
    let c = currentRef.current;
    // simple easing
    const diff = t - c;
    if (Math.abs(diff) < 0.001) {
      c = t;
    } else {
      c = c + diff * 0.14; // easing factor
    }
    currentRef.current = c;

    const el = elRef.current;
    if (el) {
      // angle in degrees (0 -> 0deg, 1 -> 85deg)
      const angle = c * 85; // keep a little before 90 for realism
      const shadow = c * 0.6; // shadow opacity
      el.style.setProperty("--fold-angle", `${angle}deg`);
      el.style.setProperty("--fold-shadow-opacity", `${shadow}`);

      // Apply transforms to the top and bottom pieces using direct DOM references
      const top = el.querySelector("[data-fold='top']") as HTMLElement | null;
      const bottom = el.querySelector("[data-fold='bottom']") as HTMLElement | null;
      const foldShadow = el.querySelector("[data-role='fold-shadow']") as HTMLElement | null;

      // write transforms directly for best performance
      if (top) {
        // set explicit numeric rotation to avoid issues with CSS calc + var in some browsers
        top.style.transform = `rotateX(${-angle}deg)`;
        top.style.transformOrigin = 'bottom center';
        // subtle dynamic shadow
        top.style.boxShadow = `0 14px 40px rgba(0,0,0,${0.12 * shadow})`;
        top.style.setProperty("--top-shadow-opacity", `${shadow}`);
      }
      if (bottom) {
        // keep the back panel slightly recessed for realism
        bottom.style.transform = `translateZ(-1px)`;
        bottom.style.transformOrigin = 'top center';
      }
      if (foldShadow) {
        foldShadow.style.opacity = `${0.5 * shadow}`;
      }
    }

    // stop loop when stable
    if (Math.abs(currentRef.current - targetRef.current) > 0.0005) {
      rafRef.current = requestAnimationFrame(step);
    } else {
      rafRef.current = null;
    }
  };

  useEffect(() => {
    const onScroll = () => {
      updateTarget();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    const onResize = () => {
      updateTarget();
      if (!rafRef.current) rafRef.current = requestAnimationFrame(step);
    };

    // initial
    updateTarget();
    rafRef.current = requestAnimationFrame(step);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container} ref={elRef as any} style={{ perspective: "1200px" }}>
      <div className={styles.section}>
        {/* shadow overlay that intensifies with fold */}
        <div
          className={styles["fold-shadow"]}
          data-role="fold-shadow"
          style={{ opacity: 0 }}
        />

        {/* TOP PIECE - will rotate up on fold */}
        <div
          className={`${styles["fold-piece"]} ${styles.top}`}
          data-fold="top"
          style={{ transform: "rotateX(0deg)" }}
        >
          <div className={styles.topInner}>
            <h2 style={{ margin: 0, fontSize: 28 }}>Folding Page Demo</h2>
            <p style={{ marginTop: 12, color: "#6b7280" }}>
              Scroll down to see the page fold away like a sheet of paper. Scroll up
              to unfold it back smoothly. This demo uses CSS 3D transforms,
              perspective and requestAnimationFrame for smooth performance.
            </p>
            <div style={{ marginTop: 18 }}>
              <button
                style={{
                  background: "#dc2626",
                  color: "#fff",
                  padding: "10px 16px",
                  borderRadius: 8,
                  border: "none",
                }}
              >
                Get a Quote
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM PIECE - remains as the unfolding back panel */}
        <div
          className={`${styles["fold-piece"]} ${styles.bottom}`}
          data-fold="bottom"
        >
          <div className={styles.bottomInner}>
            <h3 style={{ margin: 0 }}>More Content Below</h3>
            <p style={{ marginTop: 12, color: "#6b7280" }}>
              Use this area for details, images, contact info, or long content. The
              fold effect is limited to this component so the rest of the page
              behaves normally.
            </p>

            <div style={{ marginTop: 20 }}>
              <div style={{ display: "grid", gap: 12 }}>
                <div style={{ background: "#f9fafb", padding: 12, borderRadius: 8 }}>
                  <strong>Quality Tiles</strong>
                  <div style={{ color: "#6b7280" }}>Imported from Europe with full guarantee.</div>
                </div>
                <div style={{ background: "#f9fafb", padding: 12, borderRadius: 8 }}>
                  <strong>Installation Support</strong>
                  <div style={{ color: "#6b7280" }}>Step-by-step guidance or professional installers.</div>
                </div>
              </div>
            </div>

            <div style={{ height: 600 }} /> {/* make it tall so scrolling is visible */}
          </div>
        </div>
      </div>
    </div>
  );
}
