import styles from "./Venue.module.css";

export default function Venue() {
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Find Your Way</p>
        <h2 className="section-heading reveal delay-1">The Venue</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={`${styles.nameBlock} reveal delay-2`}>
          <h3 className={styles.venueName}>Venue Name Placeholder</h3>
          <p className={styles.venueAddress}>
            123 Venue Street<br />
            City, Province<br />
            Philippines
          </p>
        </div>

        {/* Illustrated map placeholder */}
        <div className={`${styles.mapFrame} reveal delay-3`} aria-label="Map placeholder">
          <svg viewBox="0 0 340 190" xmlns="http://www.w3.org/2000/svg" className={styles.mapSvg} aria-hidden="true">
            <rect width="340" height="190" fill="#fce4ee"/>
            {/* Grid roads */}
            <line x1="0" y1="95" x2="340" y2="95" stroke="#b0cdb8" strokeWidth="8"/>
            <line x1="170" y1="0" x2="170" y2="190" stroke="#b0cdb8" strokeWidth="5"/>
            <line x1="0" y1="140" x2="340" y2="140" stroke="#c4ddc9" strokeWidth="2.5" opacity="0.7"/>
            <line x1="0" y1="52" x2="340" y2="52" stroke="#c4ddc9" strokeWidth="2" opacity="0.5"/>
            <line x1="85"  y1="0" x2="85"  y2="190" stroke="#c4ddc9" strokeWidth="2" opacity="0.5"/>
            <line x1="255" y1="0" x2="255" y2="190" stroke="#c4ddc9" strokeWidth="2" opacity="0.5"/>
            {/* Tree clusters */}
            <circle cx="40"  cy="35"  r="12" fill="#9991E7" opacity="0.35"/>
            <circle cx="55"  cy="30"  r="9"  fill="#9991E7" opacity="0.25"/>
            <circle cx="295" cy="160" r="11" fill="#9991E7" opacity="0.3"/>
            <circle cx="310" cy="168" r="8"  fill="#9991E7" opacity="0.2"/>
            <circle cx="28"  cy="165" r="9"  fill="#9991E7" opacity="0.25"/>
            <circle cx="315" cy="32"  r="10" fill="#9991E7" opacity="0.3"/>
            {/* Pin */}
            <path d="M170,45 C158,45 148,55 148,67 C148,83 170,105 170,105 C170,105 192,83 192,67 C192,55 182,45 170,45Z" fill="#FE569B"/>
            <circle cx="170" cy="67" r="9" fill="#fdf9f6" opacity="0.92"/>
          </svg>
          <p className={styles.mapLabel}>Map coming soon</p>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-elegant btn-dark reveal delay-3 ${styles.mapBtn}`}
        >
          Open in Google Maps
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M1.5,9.5 L9.5,1.5M3.5,1.5h6v6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
