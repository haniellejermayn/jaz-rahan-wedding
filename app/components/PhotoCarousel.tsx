"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PhotoCarousel.module.css";

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

const AUTO_SPEED = 40; // px/s
const RESUME_DELAY_MS = 1200;
const DRAG_FRICTION = 0.88; // momentum decay per frame

export default function PhotoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null); // the clipping window
  const trackRef = useRef<HTMLDivElement>(null); // the moving strip

  const cards = [...CARDS, ...CARDS];

  // ── Animation state (all refs — no re-renders in the loop) ──
  const offsetRef = useRef(0); // current translateX (negative = scrolled right)
  const halfWidth = useRef(0); // width of one full set of cards
  const rafId = useRef<number | null>(null);
  const lastTime = useRef<number | null>(null);

  // ── Pause flags ──
  const hoveredRef = useRef(false);
  const touchingRef = useRef(false);
  const draggingRef = useRef(false);
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Drag state ──
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const velocityRef = useRef(0); // px/frame for momentum
  const prevX = useRef(0);
  const moved = useRef(false);

  const [reduced, setReduced] = useState(false);

  const isPaused = () =>
    hoveredRef.current || touchingRef.current || draggingRef.current;

  // ── Apply transform ──
  const applyOffset = (x: number) => {
    if (!trackRef.current) return;
    trackRef.current.style.transform = `translateX(${x}px)`;
  };

  // ── Wrap offset so it stays within one full loop ──
  const wrapOffset = (x: number) => {
    const w = halfWidth.current;
    if (w <= 0) return x;
    // offset is negative; wrap when we've scrolled more than one full set
    if (x <= -w) return x + w;
    if (x > 0) return x - w;
    return x;
  };

  // ── Measure one full set width ──
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => {
      // The track has 2× cards; half its scrollWidth = one set
      halfWidth.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    if (document.fonts?.ready)
      document.fonts.ready.then(measure).catch(() => {});
    return () => ro.disconnect();
  }, []);

  // ── prefers-reduced-motion ──
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // ── Main rAF loop ──
  useEffect(() => {
    if (reduced) return;

    const tick = (now: number) => {
      const dt =
        lastTime.current === null
          ? 0
          : Math.min((now - lastTime.current) / 1000, 0.05);
      lastTime.current = now;

      if (!draggingRef.current) {
        if (!isPaused()) {
          // Auto-scroll
          offsetRef.current -= AUTO_SPEED * dt;
        } else if (Math.abs(velocityRef.current) > 0.3) {
          // Momentum coast after drag release (still "paused" by hover)
          offsetRef.current += velocityRef.current;
          velocityRef.current *= DRAG_FRICTION;
        }

        offsetRef.current = wrapOffset(offsetRef.current);
        applyOffset(offsetRef.current);
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [reduced]);

  // ── Cleanup ──
  useEffect(() => {
    return () => {
      if (resumeTimer.current) clearTimeout(resumeTimer.current);
    };
  }, []);

  // ── Hover (desktop) ──
  const onSectionEnter = () => {
    hoveredRef.current = true;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };
  const onSectionLeave = () => {
    hoveredRef.current = false;
    velocityRef.current = 0; // no ghost momentum when mouse leaves
  };

  // ── Touch (mobile) ──
  const touchStartX = useRef(0);
  const touchStartOffset = useRef(0);

  const onTouchStart = (e: React.TouchEvent) => {
    touchingRef.current = true;
    draggingRef.current = true;
    velocityRef.current = 0;
    touchStartX.current = e.touches[0].clientX;
    touchStartOffset.current = offsetRef.current;
    prevX.current = e.touches[0].clientX;
    moved.current = false;
    if (resumeTimer.current) {
      clearTimeout(resumeTimer.current);
      resumeTimer.current = null;
    }
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!draggingRef.current) return;
    const x = e.touches[0].clientX;
    const dx = x - touchStartX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    velocityRef.current = x - prevX.current; // track velocity each frame
    prevX.current = x;
    offsetRef.current = wrapOffset(touchStartOffset.current + dx);
    applyOffset(offsetRef.current);
  };

  const onTouchEnd = () => {
    draggingRef.current = false;
    touchingRef.current = false;
    // Momentum handled by rAF loop via velocityRef
    resumeTimer.current = setTimeout(() => {
      velocityRef.current = 0;
      resumeTimer.current = null;
    }, RESUME_DELAY_MS);
  };

  // ── Mouse drag (desktop) ──
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    draggingRef.current = true;
    moved.current = false;
    velocityRef.current = 0;
    dragStartX.current = e.clientX;
    dragStartOffset.current = offsetRef.current;
    prevX.current = e.clientX;
    viewportRef.current?.setPointerCapture(e.pointerId);
    if (viewportRef.current) viewportRef.current.style.cursor = "grabbing";
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || e.pointerType === "touch") return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) moved.current = true;
    velocityRef.current = e.clientX - prevX.current;
    prevX.current = e.clientX;
    offsetRef.current = wrapOffset(dragStartOffset.current + dx);
    applyOffset(offsetRef.current);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || e.pointerType === "touch") return;
    draggingRef.current = false;
    try {
      viewportRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    if (viewportRef.current) viewportRef.current.style.cursor = "";
    // Momentum will coast in rAF loop; auto-scroll resumes when mouse leaves
  };

  const onCardClick = (e: React.MouseEvent) => {
    if (moved.current) {
      e.preventDefault();
      moved.current = false;
    }
  };

  // ── Arrow hops ──
  const scrollByAmount = (dir: 1 | -1) => {
    const vp = viewportRef.current;
    if (!vp) return;
    const hop = vp.clientWidth * 0.75 * dir * -1; // negative = scroll right
    const target = wrapOffset(offsetRef.current + hop);
    // Animate the hop with a short eased tween
    const start = offsetRef.current;
    const startTime = performance.now();
    const DURATION = 420;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const animHop = (now: number) => {
      const t = Math.min((now - startTime) / DURATION, 1);
      offsetRef.current = start + (target - start) * ease(t);
      applyOffset(offsetRef.current);
      if (t < 1) requestAnimationFrame(animHop);
    };
    requestAnimationFrame(animHop);
  };

  return (
    <section
      id="photos"
      className={styles.section}
      onMouseEnter={onSectionEnter}
      onMouseLeave={onSectionLeave}
    >
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
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M9,1 L3,7 L9,13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* viewportRef clips overflow; trackRef moves via transform */}
        <div
          ref={viewportRef}
          className={styles.viewport}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onTouchCancel={onTouchEnd}
          role="region"
          aria-label="Photo gallery — auto-scrolling, swipe or drag to take control"
          tabIndex={0}
        >
          <div ref={trackRef} className={styles.track}>
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
                    <path
                      d="M24,44 Q23,32 24,20"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      fill="none"
                      opacity="0.55"
                    />
                    <path
                      d="M24,32 Q16,28 12,22 Q18,26 24,32Z"
                      fill="currentColor"
                      opacity="0.35"
                    />
                    <path
                      d="M24,32 Q32,28 36,22 Q30,26 24,32Z"
                      fill="currentColor"
                      opacity="0.35"
                    />
                    <ellipse
                      cx="24"
                      cy="18"
                      rx="9"
                      ry="8"
                      fill="currentColor"
                      opacity="0.25"
                    />
                    <ellipse
                      cx="24"
                      cy="18"
                      rx="6"
                      ry="5.5"
                      fill="currentColor"
                      opacity="0.4"
                    />
                    <circle
                      cx="24"
                      cy="18"
                      r="2.5"
                      fill="currentColor"
                      opacity="0.85"
                    />
                  </svg>
                </div>
                <span className={styles.tabTopLeft} aria-hidden="true" />
                <span className={styles.tabBottomRight} aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className={`${styles.arrow} ${styles.arrowNext}`}
          onClick={() => scrollByAmount(1)}
          aria-label="Next photos"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M5,1 L11,7 L5,13"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <p className={styles.hint}>Swipe or drag to explore</p>
    </section>
  );
}
