import styles from "./Attire.module.css";

const palette = [
  { name: "Forest", hex: "#182e20" },
  { name: "Sage",   hex: "#355c44" },
  { name: "Laurel", hex: "#7a9e86" },
  { name: "Mist",   hex: "#d6eadb" },
  { name: "Ivory",  hex: "#f7f2e9" },
  { name: "Gold",   hex: "#b8963e" },
];

export default function Attire() {
  return (
    <section id="attire" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal" style={{ color: "#7a9e86" }}>Dress the Part</p>
        <h2 className="section-heading section-heading-light reveal delay-1">Dress Code</h2>
        <div className="ornament reveal delay-2" style={{ color: "#d4b870" }}>✦</div>

        <p className={`${styles.theme} reveal delay-2`}>Garden Formal</p>

        <div className={styles.columns}>
          <div className={`${styles.col} reveal-left delay-2`}>
            <span className={styles.colRule} />
            <h3 className={styles.colHeading}>Gentlemen</h3>
            <p className={styles.colBody}>
              Barong Tagalog or a dark tailored suit. We encourage earth and forest
              tones — think deep greens, warm navies, or rich browns.
            </p>
          </div>

          <div className={styles.colDivider} aria-hidden="true">
            <span />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="#b8963e" opacity="0.45">
              <path d="M4,0 L4.7,3 L8,4 L4.7,5 L4,8 L3.3,5 L0,4 L3.3,3Z"/>
            </svg>
            <span />
          </div>

          <div className={`${styles.col} reveal-right delay-2`}>
            <span className={styles.colRule} />
            <h3 className={styles.colHeading}>Ladies</h3>
            <p className={styles.colBody}>
              Floor-length gowns or elegant midi dresses. Floral prints are warmly
              welcomed. Please reserve white and ivory for the bride.
            </p>
          </div>
        </div>

        <div className={`${styles.paletteWrap} reveal delay-3`}>
          <p className={styles.paletteLabel}>Suggested Palette</p>
          <div className={styles.swatches}>
            {palette.map((c) => (
              <div key={c.name} className={styles.swatchItem}>
                <div className={styles.swatch} style={{ background: c.hex }} aria-label={c.name} />
                <span className={styles.swatchName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className={`${styles.footnote} reveal delay-3`}>
          Please avoid wearing white, cream, or ivory — those shades belong to the bride.
        </p>
      </div>
    </section>
  );
}
