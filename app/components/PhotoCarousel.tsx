"use client";
import styles from "./PhotoCarousel.module.css";

// Placeholder cards with varying heights for editorial feel
const CARDS = [
  { h: 300 }, { h: 240 }, { h: 280 }, { h: 260 },
  { h: 320 }, { h: 250 }, { h: 290 }, { h: 270 },
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
        <p className={styles.note}>Photos coming soon</p>
      </div>

      <div className={styles.trackWrap}>
        <div className={styles.track}>
          {all.map((c, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ height: c.h }}
            >
              {/* Replace this div with <Image> once photos are ready */}
              <div className={styles.placeholder}>
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect x="2" y="5" width="28" height="22" rx="2" stroke="#9991E7" strokeWidth="1.2"/>
                  <circle cx="11" cy="13" r="3" stroke="#9991E7" strokeWidth="1.2"/>
                  <path d="M2,21 L10,15 L17,21 L23,16 L30,21" stroke="#9991E7" strokeWidth="1.2" fill="none"/>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
