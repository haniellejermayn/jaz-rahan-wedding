import styles from "./Attire.module.css";

const guestPalette = [
  { name: "Rose",      hex: "#FE569B" },
  { name: "Violet",    hex: "#9991E7" },
  { name: "Tangerine", hex: "#FE803D" },
  { name: "Sunray",    hex: "#FFDF46" },
  { name: "Leaf",      hex: "#7DC23D" },
  { name: "Sky",       hex: "#5CA9E0" },
];

const bridalPalette = [
  { name: "Berry",     hex: "#D2447F" },
  { name: "Plum",      hex: "#A765CC" },
  { name: "Ember",     hex: "#F67E00" },
  { name: "Amber",     hex: "#FEC135" },
  { name: "Teal",      hex: "#18C5B4" },
  { name: "Cobalt",    hex: "#0580E3" },
];

export default function Attire() {
  return (
    <section id="attire" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Dress the Part</p>
        <h2 className="section-heading reveal delay-1">Dress Code</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.theme} reveal delay-2`}>Garden Formal</p>

        <div className={styles.columns}>
          <div className={`${styles.col} reveal-left delay-2`}>
            <span className={styles.colRule} />
            <h3 className={styles.colHeading}>Gentlemen</h3>
            <p className={styles.colBody}>
              Barong Tagalog in your assigned colour, or a tailored suit.
              We encourage the vibrant palette below — let your outfit
              reflect the joy of the day.
            </p>
          </div>

          <div className={styles.colDivider} aria-hidden="true">
            <span />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="#FE569B" opacity="0.5">
              <path d="M4,0 L4.7,3 L8,4 L4.7,5 L4,8 L3.3,5 L0,4 L3.3,3Z"/>
            </svg>
            <span />
          </div>

          <div className={`${styles.col} reveal-right delay-2`}>
            <span className={styles.colRule} />
            <h3 className={styles.colHeading}>Ladies</h3>
            <p className={styles.colBody}>
              Floor-length gowns or elegant midi dresses. Floral prints
              are warmly welcomed. Please reserve white and ivory for
              the bride.
            </p>
          </div>
        </div>

        {/* Guest Palette */}
        <div className={`${styles.paletteWrap} reveal delay-3`}>
          <p className={styles.paletteLabel}>Guest Palette</p>
          <div className={styles.swatches}>
            {guestPalette.map((c) => (
              <div key={c.name} className={styles.swatchItem}>
                <div className={styles.swatch} style={{ background: c.hex }} aria-label={c.name} />
                <span className={styles.swatchName}>{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bridal Party Palette */}
        <div className={`${styles.paletteWrap} reveal delay-3`}>
          <p className={styles.paletteLabel}>Bridesmaids &amp; Entourage</p>
          <div className={styles.swatches}>
            {bridalPalette.map((c) => (
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
