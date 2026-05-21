"use client";
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

export default function PhotoCarousel() {
  // Duplicate for seamless loop
  const all = [...CARDS, ...CARDS];

  return (
    <section id="photos" className={styles.section}>
      <div className={styles.header}>
        <p className="section-eyebrow">Our Moments</p>
        <h2 className="section-heading">Gallery</h2>
        <div className="ornament">✦</div>
        <p className={styles.note}>Pressed memories, coming soon</p>
      </div>

      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {all.map((c, i) => (
            <div
              key={i}
              className={`${styles.card} ${styles[c.tone]}`}
              style={{ height: c.h }}
            >
              <div className={styles.placeholder}>
                {/* Botanical bloom illustration as placeholder */}
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  aria-hidden="true"
                  className={styles.bloomIcon}
                >
                  {/* stem */}
                  <path
                    d="M24,44 Q23,32 24,20"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    fill="none"
                    opacity="0.55"
                  />
                  {/* leaves */}
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
                  {/* bloom petals */}
                  <ellipse cx="24" cy="18" rx="9" ry="8" fill="currentColor" opacity="0.25" />
                  <ellipse cx="24" cy="18" rx="6" ry="5.5" fill="currentColor" opacity="0.4" />
                  <circle cx="24" cy="18" r="2.5" fill="currentColor" opacity="0.85" />
                </svg>
              </div>
              {/* corner tab marks */}
              <span className={styles.tabTopLeft} aria-hidden="true" />
              <span className={styles.tabBottomRight} aria-hidden="true" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
