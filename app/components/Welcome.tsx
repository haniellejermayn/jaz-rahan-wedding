import styles from "./Welcome.module.css";

export default function Welcome() {
  return (
    <section id="welcome" className={styles.section}>
      <div className={styles.inner}>
        <div className={`${styles.card} reveal`}>
          {/* Decorative botanical corner — top left */}
          <svg
            className={`${styles.cornerSprig} ${styles.cornerTL}`}
            viewBox="0 0 160 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0,0 Q40,40 60,90 Q70,130 60,180" stroke="rgba(91,160,47,0.45)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M30,50 Q10,40 0,50" stroke="#5BA02F" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M0,50 Q14,38 30,50 Q14,62 0,50Z" fill="#7DC23D" opacity="0.55" />
            <g transform="translate(58,100)">
              <circle r="14" fill="#FE569B" opacity="0.22" />
              <circle r="9" fill="#FE569B" opacity="0.45" />
              <circle r="5" fill="#D2447F" opacity="0.75" />
              <circle r="2" fill="#FFDF46" />
            </g>
            <path d="M55,150 Q35,158 20,160" stroke="rgba(91,160,47,0.4)" strokeWidth="0.9" fill="none" />
            <g transform="translate(20,160)">
              <circle r="9" fill="#9991E7" opacity="0.3" />
              <circle r="5" fill="#A765CC" opacity="0.65" />
            </g>
            <g transform="translate(80,30)">
              <ellipse rx="8" ry="5" fill="#FFDF46" opacity="0.5" transform="rotate(0)" />
              <ellipse rx="8" ry="5" fill="#FFDF46" opacity="0.5" transform="rotate(60)" />
              <ellipse rx="8" ry="5" fill="#FFDF46" opacity="0.5" transform="rotate(120)" />
              <circle r="3.5" fill="#FEC135" />
            </g>
          </svg>

          {/* Decorative botanical corner — bottom right (mirrored) */}
          <svg
            className={`${styles.cornerSprig} ${styles.cornerBR}`}
            viewBox="0 0 160 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path d="M0,0 Q40,40 60,90 Q70,130 60,180" stroke="rgba(91,160,47,0.45)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
            <path d="M30,50 Q10,40 0,50" stroke="#5BA02F" strokeWidth="0.9" fill="none" opacity="0.5" />
            <path d="M0,50 Q14,38 30,50 Q14,62 0,50Z" fill="#18C5B4" opacity="0.55" />
            <g transform="translate(58,100)">
              <circle r="13" fill="#FE803D" opacity="0.28" />
              <circle r="8" fill="#FE803D" opacity="0.5" />
              <circle r="4" fill="#F67E00" opacity="0.78" />
              <circle r="1.8" fill="#FFDF46" />
            </g>
            <path d="M55,150 Q35,158 20,160" stroke="rgba(91,160,47,0.4)" strokeWidth="0.9" fill="none" />
            <g transform="translate(20,160)">
              <circle r="9" fill="#5CA9E0" opacity="0.32" />
              <circle r="5" fill="#0580E3" opacity="0.6" />
            </g>
            <g transform="translate(80,30)">
              <circle r="9" fill="#A765CC" opacity="0.3" />
              <circle r="5" fill="#9991E7" opacity="0.65" />
            </g>
          </svg>

          <p className="section-eyebrow">A Note From Us</p>
          <h2 className={`section-heading ${styles.heading}`}>
            Welcome,
            <br />
            <em className={styles.dear}>dear friends and family</em>
          </h2>
          <div className="ornament">✦</div>

          <p className={styles.text}>
            With gratitude and joy, we invite you to stand with us as we
            begin this new chapter together. <strong>Your company on
            our wedding day means a great deal to us</strong>, and we look
            forward to sharing it with you.
          </p>

          <p className={styles.sign}>
            With love,
            <span className={styles.signNames}>Rahan &amp; Jazmine</span>
          </p>
        </div>
      </div>
    </section>
  );
}