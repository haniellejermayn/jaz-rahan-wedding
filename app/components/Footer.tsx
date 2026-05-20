import styles from "./Footer.module.css";

const petals = [
  { bg: "#FE569B", w: 10, h: 16 },
  { bg: "#9991E7", w: 14, h: 10 },
  { bg: "#FE803D", w: 10, h: 16 },
  { bg: "#FFDF46", w: 16, h: 10 },
  { bg: "#7DC23D", w: 10, h: 16 },
  { bg: "#5CA9E0", w: 14, h: 10 },
  { bg: "#D2447F", w: 10, h: 16 },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.monogram}>Jaz &amp; Rahan</span>
      <div className={styles.divider} aria-hidden="true">
        <span /><span className={styles.dot}>✦</span><span />
      </div>
      <p className={styles.date}>July 21 · 2026</p>
      <div className={styles.petals} aria-hidden="true">
        {petals.map((p, i) => (
          <div
            key={i}
            className={styles.petal}
            style={{ background: p.bg, width: p.w, height: p.h, borderRadius: "50%" }}
          />
        ))}
      </div>
      <p className={styles.made}>Made with love</p>
    </footer>
  );
}
