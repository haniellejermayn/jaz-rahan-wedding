import styles from "./Venue.module.css";

const MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.0045736209627!2d118.74288547502798!3d9.765679090328078!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33b563982e86ffed%3A0x45d1901a7d4247ca!2sCitystate%20Asturias%20Hotel%20Palawan!5e0!3m2!1sen!2sph!4v1779377041659!5m2!1sen!2sph";

const MAP_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=Citystate+Asturias+Hotel+Palawan&destination_place_id=ChIJ_f-GLpdjtTMRykJCfRqQ0UU";

export default function Venue() {
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Find Your Way</p>
        <h2 className="section-heading reveal delay-1">The Venue</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={`${styles.nameBlock} reveal delay-2`}>
          <h3 className={styles.venueName}>Citystate Asturias Hotel</h3>
          <p className={styles.venueLocation}>
            <span className={styles.locationRule} />
            Puerto Princesa · Palawan · Philippines
            <span className={styles.locationRule} />
          </p>
        </div>

        {/* Google Maps embed — framed with the design language */}
        <div className={`${styles.mapFrame} reveal delay-3`}>
          {/* Decorative corner sprigs around the map */}
          <svg className={`${styles.mapSprig} ${styles.sprigTL}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2,2 Q22,6 36,22 Q48,38 56,56" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6"/>
            <ellipse cx="14" cy="12" rx="5" ry="4.5" fill="#FE569B" opacity="0.55"/>
            <circle cx="14" cy="12" r="2" fill="#D2447F"/>
            <ellipse cx="38" cy="32" rx="4" ry="3.5" fill="#FFDF46" opacity="0.7"/>
            <path d="M28,42 Q22,38 18,40 Q22,46 28,42Z" fill="#7DC23D" opacity="0.6"/>
          </svg>
          <svg className={`${styles.mapSprig} ${styles.sprigTR}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M58,2 Q38,6 24,22 Q12,38 4,56" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6"/>
            <ellipse cx="46" cy="12" rx="5" ry="4.5" fill="#9991E7" opacity="0.55"/>
            <circle cx="46" cy="12" r="2" fill="#A765CC"/>
            <ellipse cx="22" cy="32" rx="4" ry="3.5" fill="#5CA9E0" opacity="0.7"/>
            <path d="M32,42 Q38,38 42,40 Q38,46 32,42Z" fill="#7DC23D" opacity="0.6"/>
          </svg>
          <svg className={`${styles.mapSprig} ${styles.sprigBL}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M2,58 Q22,54 36,38 Q48,22 56,4" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6"/>
            <ellipse cx="14" cy="48" rx="5" ry="4.5" fill="#FE803D" opacity="0.55"/>
            <circle cx="14" cy="48" r="2" fill="#F67E00"/>
            <ellipse cx="38" cy="28" rx="4" ry="3.5" fill="#7DC23D" opacity="0.7"/>
            <path d="M28,18 Q22,22 18,20 Q22,14 28,18Z" fill="#7DC23D" opacity="0.6"/>
          </svg>
          <svg className={`${styles.mapSprig} ${styles.sprigBR}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M58,58 Q38,54 24,38 Q12,22 4,4" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6"/>
            <ellipse cx="46" cy="48" rx="5" ry="4.5" fill="#FE569B" opacity="0.55"/>
            <circle cx="46" cy="48" r="2" fill="#D2447F"/>
            <ellipse cx="22" cy="28" rx="4" ry="3.5" fill="#FFDF46" opacity="0.7"/>
            <path d="M32,18 Q38,22 42,20 Q38,14 32,18Z" fill="#7DC23D" opacity="0.6"/>
          </svg>

          <div className={styles.mapShell}>
            <iframe
              src={MAP_EMBED_URL}
              title="Map to Citystate Asturias Hotel, Palawan"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className={styles.mapIframe}
            />
          </div>
        </div>

        <a
          href={MAP_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-elegant btn-dark reveal delay-3 ${styles.mapBtn}`}
        >
          Get Directions
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M1.5,9.5 L9.5,1.5M3.5,1.5h6v6"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
