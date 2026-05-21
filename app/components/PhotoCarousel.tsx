"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PhotoCarousel.module.css";

// Placeholder cards with varying heights for editorial feel
const CARDS = [
  { h: 300, tone: "rose" },
  { h: 240, tone: "violet" },
  { h: 280, tone: "tangerine" },
  { h: 260, tone: "sunray" },
  { h: 320, tone: "leaf" },
  { h: 250, tone: "sky" },
  { h: 290, tone: "berry" },
  { h: 270, tone: "teal" },
];

// pixels per second — gentle ambient drift
const AUTO_SPEED = 22;
// how long after a user interaction before auto-scroll resumes
const RESUME_DELAY_MS = 1400;

export default function PhotoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  // Show two passes of cards so we can seamlessly loop
  const cards = [...CARDS, ...CARDS];

  // ── Drag state held in refs so it doesn't trigger re-renders ──
  const dragging = useRef(false);
  const startX = useRef(0);
  const startScroll = useRef(0);
  const moved = useRef(false);

  // ── Auto-scroll bookkeeping ──
  const rafId = useRef<number | null>(null);
  const halfWidth = useRef(0);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reduced, setReduced] = useState(false);

  // ── Measure the width of one full pass of cards (the duplicate trick) ──
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const measure = () => {
      // scrollWidth is the total width of the duplicated track;
      // halve it to get one full set.
      halfWidth.current = el.scrollWidth / 2;
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    // Re-measure when web fonts settle (changes card width metrics)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }

    return () => ro.disconnect();
  }, []);

  // ── Detect prefers-reduced-motion ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Pause / resume helpers ──
  const pause = () => {
    pausedRef.current = true;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const scheduleResume = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    resumeTimer.current = setTimeout(() => {
      pausedRef.current = false;
      resumeTimer.current = null;
    }, RESUME_DELAY_MS);
  };

  // ── The ambient auto-scroll loop ──
  useEffect(() => {
    if (reduced) return; // honor user preference

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp big jumps
      lastTime = now;

      const el = trackRef.current;
      if (el && !pausedRef.current && !dragging.current && halfWidth.current > 0) {
        el.scrollLeft += AUTO_SPEED * dt;
        // Seamless wrap: jump back by one full pass when we cross half.
        // Because the content is duplicated, this is visually invisible.
        if (el.scrollLeft >= halfWidth.current) {
          el.scrollLeft -= halfWidth.current;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduced]);

  // ── Backward-wrap: if the user manually scrolls past 0, jump to halfway
  //    so they can keep going backward without hitting a wall.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const onScroll = () => {
      if (halfWidth.current > 0 && el.scrollLeft <= 0.5) {
        el.scrollLeft = halfWidth.current - 1;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  // ── Cleanup any pending resume on unmount ──
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // ── Pointer-based drag-to-scroll for desktop mouse.
  //    Touch uses the browser's native scroll (we just pause auto-scroll
  //    via pointer-enter/leave events, which fire for touch too).
  const onPointerEnter = () => pause();
  const onPointerLeave = () => {
    if (!dragging.current) scheduleResume();
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pause();
    if (e.pointerType === "touch") return;
    const el = trackRef.current;
    if (!el) return;
    dragging.current = true;
    moved.current = false;
    startX.current = e.clientX;
    startScroll.current = el.scrollLeft;
    el.setPointerCapture(e.pointerId);
    el.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const el = trackRef.current;
    if (!el) return;
    const dx = e.clientX - startX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    el.scrollLeft = startScroll.current - dx;
  };

  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) {
      scheduleResume();
      return;
    }
    const el = trackRef.current;
    if (!el) return;
    dragging.current = false;
    try {
      el.releasePointerCapture(e.pointerId);
    } catch { /* ignore */ }
    el.style.cursor = "";
    scheduleResume();
  };

  // Suppress click-through if the user just dragged
  const onCardClick = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      moved.current = false;
    }
  };

  // ── Wheel / trackpad horizontal scroll: just pause auto-scroll briefly ──
  const onWheel = () => {
    pause();
    scheduleResume();
  };

  // ── Arrow button hops ──
  const scrollByAmount = (dir: 1 | -1) => {
    pause();
    const el = trackRef.current;
    if (!el) {
      scheduleResume();
      return;
    }
    const amount = el.clientWidth * 0.8 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
    scheduleResume();
  };

  return (
    <section id="photos" className={styles.section}>
      <div className={styles.header}>
        <p className="section-eyebrow">Our Moments</p>
        <h2 className="section-heading">Gallery</h2>
        <div className="ornament">✦</div>
        <p className={styles.note}>Pressed memories, coming soon</p>
      </div>

      <div className={styles.carouselWrap}>
        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowPrev}`}
          onClick={() => scrollByAmount(-1)}
          aria-label="Previous photos"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9,1 L3,7 L9,13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div
          ref={trackRef}
          className={styles.track}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onWheel={onWheel}
          role="region"
          aria-label="Photo gallery — auto-scrolling, swipe or drag to take control"
          tabIndex={0}
        >
          {cards.map((c, i) => (
            <div
              key={i}
              className={`${styles.card} ${styles[c.tone]}`}
              style={{ height: c.h }}
              onClick={onCardClick}
              aria-hidden={i >= CARDS.length}
            >
              <div className={styles.placeholder}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className={styles.bloomIcon}
                >
                  <path d="M24,44 Q23,32 24,20" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.55"/>
                  <path d="M24,32 Q16,28 12,22 Q18,26 24,32Z" fill="currentColor" opacity="0.35"/>
                  <path d="M24,32 Q32,28 36,22 Q30,26 24,32Z" fill="currentColor" opacity="0.35"/>
                  <ellipse cx="24" cy="18" rx="9" ry="8" fill="currentColor" opacity="0.25"/>
                  <ellipse cx="24" cy="18" rx="6" ry="5.5" fill="currentColor" opacity="0.4"/>
                  <circle cx="24" cy="18" r="2.5" fill="currentColor" opacity="0.85"/>
                </svg>
              </div>
              <span className={styles.tabTopLeft} aria-hidden="true" />
              <span className={styles.tabBottomRight} aria-hidden="true" />
            </div>
          ))}
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => scrollByAmount(1)}
          aria-label="Next photos"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M5,1 L11,7 L5,13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <p className={styles.hint}>Swipe or drag to explore</p>
    </section>
  );
}
