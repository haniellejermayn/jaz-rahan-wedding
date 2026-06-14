"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./PhotoCarousel.module.css";

/* ──────────────────────────────────────────────────────────────
   ADD YOUR PHOTOS HERE  ←  this is the only part you touch
   ──────────────────────────────────────────────────────────────
   1. Drop the image files into your /public folder
        e.g.  public/gallery/01.jpg
   2. List them below. Each entry can be either:
        • a plain string:        "/gallery/01.jpg"
        • or { src, alt }:       { src: "/gallery/02.jpg", alt: "Beach sunset" }
      (use the object form if you want alt text for accessibility)

   Every card is the SAME HEIGHT; each photo's WIDTH follows its
   aspect ratio (landscapes wide, portraits narrow). No cropping,
   no stretching, no dimensions to type in. Click any photo for a
   full-screen view.
   ────────────────────────────────────────────────────────────── */
type Photo = string | { src: string; alt?: string };

const PHOTOS: Photo[] = [
  "/gallery/01.jpg",
  "/gallery/02.jpg",
  "/gallery/03.jpg",
  "/gallery/04.jpg",
  "/gallery/05.jpg",
  "/gallery/06.jpg",
  "/gallery/07.jpg",
  "/gallery/08.jpg",
];

// Paper tints, cycled as a loading colour / mat / fallback behind each photo
const TONES = [
  "rose",
  "violet",
  "tangerine",
  "sunray",
  "leaf",
  "sky",
  "berry",
  "teal",
] as const;

const AUTO_SPEED = 40; // px/s
const RESUME_DELAY_MS = 1200;
const DRAG_FRICTION = 0.88; // momentum decay per frame

export default function PhotoCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null); // the clipping window
  const trackRef = useRef<HTMLDivElement>(null); // the moving strip

  // Duplicate the set so the infinite loop is seamless
  const slides = [...PHOTOS, ...PHOTOS];

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

  // ── Lightbox (full-screen viewer) state ──
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const lightboxOpenRef = useRef(false); // mirror of the above for the rAF loop
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const isOpen = lightboxIndex !== null;

  const isPaused = () =>
    hoveredRef.current ||
    touchingRef.current ||
    draggingRef.current ||
    lightboxOpenRef.current;

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
  // Widths are image-driven now, so this re-measures whenever the track
  // changes size (e.g. as photos finish loading) via the ResizeObserver.
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

  // ── Lightbox handlers ──
  const openLightbox = (photoIndex: number) => {
    lightboxOpenRef.current = true;
    setLightboxIndex(photoIndex);
  };
  const closeLightbox = () => {
    lightboxOpenRef.current = false;
    setLightboxIndex(null);
  };
  const showPrev = () =>
    setLightboxIndex((idx) =>
      idx === null ? idx : (idx - 1 + PHOTOS.length) % PHOTOS.length,
    );
  const showNext = () =>
    setLightboxIndex((idx) => (idx === null ? idx : (idx + 1) % PHOTOS.length));

  // Click vs. drag: if the pointer moved, it was a drag — ignore the click.
  const onCardClick = (photoIndex: number, src: string) => {
    if (moved.current) {
      moved.current = false;
      return;
    }
    if (src) openLightbox(photoIndex);
  };

  // ── Keyboard (Esc / ← / →) + body scroll lock while the viewer is open ──
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") showPrev();
      else if (e.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen]);

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

  // ── Current photo shown in the viewer ──
  const lbPhoto = lightboxIndex !== null ? PHOTOS[lightboxIndex] : null;
  const lbSrc = lbPhoto
    ? typeof lbPhoto === "string"
      ? lbPhoto
      : lbPhoto.src
    : "";
  const lbAlt = lbPhoto
    ? typeof lbPhoto === "string"
      ? ""
      : (lbPhoto.alt ?? "")
    : "";

  return (
    <>
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
          <p className={styles.note}>Pressed memories</p>
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
              {slides.map((p, i) => {
                const src = typeof p === "string" ? p : p.src;
                const alt = typeof p === "string" ? "" : (p.alt ?? "");
                const tone = TONES[i % TONES.length];
                const isClone = i >= PHOTOS.length;

                return (
                  <div
                    key={i}
                    className={`${styles.card} ${styles[tone]}`}
                    onClick={() => onCardClick(i % PHOTOS.length, src)}
                    aria-hidden={isClone}
                  >
                    {src ? (
                      <img
                        src={src}
                        alt={alt}
                        className={styles.photo}
                        draggable={false}
                      />
                    ) : (
                      // Fallback shown for any entry left without a src
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
                    )}
                    <span className={styles.tabTopLeft} aria-hidden="true" />
                    <span
                      className={styles.tabBottomRight}
                      aria-hidden="true"
                    />
                  </div>
                );
              })}
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

        <p className={styles.hint}>Swipe or drag to explore · tap to enlarge</p>
      </section>

      {/* ── Full-screen photo viewer ── */}
      {lightboxIndex !== null && (
        <div
          className={styles.lightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            ref={closeBtnRef}
            type="button"
            className={styles.lbClose}
            onClick={closeLightbox}
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5,5 L15,15 M15,5 L5,15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {PHOTOS.length > 1 && (
            <button
              type="button"
              className={styles.lbPrev}
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous photo"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9,1 L3,7 L9,13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}

          <img
            className={styles.lbImage}
            src={lbSrc}
            alt={lbAlt}
            draggable={false}
            onClick={(e) => e.stopPropagation()}
          />

          {PHOTOS.length > 1 && (
            <button
              type="button"
              className={styles.lbNext}
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next photo"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M5,1 L11,7 L5,13"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      )}
    </>
  );
}
