import styles from "./Attire.module.css";

const guestPalette = [
  { name: "Hot pink",        hex: "#FE569B" },
  { name: "Lavender",        hex: "#9991E7" },
  { name: "Tangerine",       hex: "#FE803D" },
  { name: "Butter yellow",   hex: "#FFDF46" },
  { name: "Fern green",      hex: "#7DC23D" },
  { name: "Cornflower blue", hex: "#5CA9E0" },
];

export default function Attire() {
  return (
    <section id="attire" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Dress the Part</p>
        <h2 className="section-heading reveal delay-1">Dress Code</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.theme} reveal delay-2`}>
          <span className={styles.themeOrn}>—</span>
          <strong>Garden Formal</strong>
          <span className={styles.themeOrn}>—</span>
        </p>

        <p className={`${styles.subtle} reveal delay-2`}>
          A celebration in full bloom &mdash; we hope you&rsquo;ll dress in
          colour, the way a garden does.
        </p>

        <div className={styles.columns}>
          <div className={`${styles.col} reveal-left delay-2`}>
            <svg className={styles.colIcon} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20,4 L26,12 L30,12 L30,20 L26,20 L26,36 L14,36 L14,20 L10,20 L10,12 L14,12 Z" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
              <path d="M20,12 L20,36" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
              <circle cx="20" cy="16" r="1.2" fill="currentColor"/>
              <circle cx="20" cy="22" r="1" fill="currentColor" opacity="0.7"/>
            </svg>
            <h3 className={styles.colHeading}>Gentlemen</h3>
            <p className={styles.colBody}>
              <strong>Barong Tagalog</strong> in your assigned colour from
              the palette below. We kindly ask that you wear a barong
              rather than a suit.
            </p>
          </div>

          <div className={styles.colDivider} aria-hidden="true">
            <span />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="6" fill="#FE569B" opacity="0.18"/>
              <circle cx="7" cy="7" r="3.5" fill="#D2447F" opacity="0.7"/>
              <circle cx="7" cy="7" r="1.6" fill="#FFDF46"/>
            </svg>
            <span />
          </div>

          <div className={`${styles.col} reveal-right delay-2`}>
            <svg className={styles.colIcon} viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M20,4 L14,14 L8,38 L32,38 L26,14 L20,4 Z" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinejoin="round"/>
              <path d="M14,14 L26,14" stroke="currentColor" strokeWidth="0.7" opacity="0.6"/>
              <path d="M20,4 L20,38" stroke="currentColor" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="1" fill="currentColor"/>
              <circle cx="16" cy="28" r="0.8" fill="currentColor" opacity="0.7"/>
              <circle cx="24" cy="28" r="0.8" fill="currentColor" opacity="0.7"/>
            </svg>
            <h3 className={styles.colHeading}>Ladies</h3>
            <p className={styles.colBody}>
              <strong>Floor-length gowns or elegant midi dresses</strong>.
              Floral prints are warmly welcomed. Please reserve white and
              ivory for the bride.
            </p>
          </div>
        </div>

        {/* Guest Palette — painterly blobs */}
        <div className={`${styles.paletteWrap} reveal delay-3`}>
          <p className={styles.paletteLabel}>
            <span className={styles.paletteRule} />
            Guest Palette
            <span className={styles.paletteRule} />
          </p>

          <div className={styles.swatchCard}>
            <div className={styles.swatches}>
              {guestPalette.map((c, i) => (
                <div
                  key={c.name}
                  className={styles.swatchItem}
                  style={{ animationDelay: `${0.4 + i * 0.08}s` }}
                >
                  <div
                    className={styles.swatch}
                    style={{ background: c.hex }}
                    aria-label={c.name}
                  />
                  <span className={styles.swatchName}>{c.name}</span>
                  <span className={styles.swatchHex}>{c.hex}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <p className={`${styles.footnote} reveal delay-3`}>
          <em>Please avoid wearing white, cream, or ivory &mdash;<br/>
          those shades belong to the bride.</em>
        </p>
      </div>
    </section>
  );
}