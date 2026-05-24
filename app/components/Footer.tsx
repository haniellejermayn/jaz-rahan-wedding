import styles from "./Footer.module.css";

const petals = [
  { bg: "#D2447F", w: 10, h: 16 },
  { bg: "#7DC23D", w: 15, h: 10 },
  { bg: "#FE569B", w: 12, h: 18 },
  { bg: "#9991E7", w: 16, h: 10 },
  { bg: "#FFDF46", w: 13, h: 19 },
  { bg: "#FE803D", w: 10, h: 16 },
  { bg: "#5CA9E0", w: 16, h: 11 },
  { bg: "#7DC23D", w: 11, h: 17 },
  { bg: "#FE569B", w: 14, h: 10 },
];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.namesWrap}>
        <span className={styles.namesRule} />
        <p className={styles.names}>
          Rahan <span className={styles.ampersand}>&amp;</span> Jazmine
        </p>
        <span className={styles.namesRule} />
      </div>
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