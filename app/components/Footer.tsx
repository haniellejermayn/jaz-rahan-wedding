import styles from "./Footer.module.css";

const petals = [
  { bg: "#FE569B", w: 11, h: 17 },
  { bg: "#9991E7", w: 15, h: 11 },
  { bg: "#FE803D", w: 11, h: 17 },
  { bg: "#FFDF46", w: 17, h: 11 },
  { bg: "#7DC23D", w: 11, h: 17 },
  { bg: "#5CA9E0", w: 15, h: 11 },
  { bg: "#D2447F", w: 11, h: 17 },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.monogram}>Rahan &amp; Jaz</span>
      <div className={styles.divider} aria-hidden="true">
        <span />
        <span className={styles.dot}>✦</span>
        <span />
      </div>
      <p className={styles.date}>July 21 · 2026</p>
      <div className={styles.petals} aria-hidden="true">
        {petals.map((p, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{ background: p.bg, width: p.w, height: p.h }}
          />
        ))}
      </div>
      <p className={styles.made}>
        made with <em>♡</em>
      </p>
    </footer>
  );
}
