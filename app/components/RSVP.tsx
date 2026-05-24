import styles from "./RSVP.module.css";

export default function RSVP() {
  return (
    <section id="rsvp" className={styles.section}>
      {/* Top decorative sprig — small floral garland */}
      <svg className={styles.topSprig} viewBox="0 0 220 88" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M0,40 Q55,18 110,30 Q165,18 220,40" stroke="rgba(91,160,47,0.5)" strokeWidth="1.3" fill="none" strokeLinecap="round"/>
        <path d="M0,52 Q55,30 110,42 Q165,30 220,52" stroke="rgba(149,185,122,0.4)" strokeWidth="0.9" fill="none"/>
        {/* Left blossom */}
        <g transform="translate(40,28)">
          <circle r="11" fill="#FE569B" opacity="0.25"/>
          <circle r="7"  fill="#FE569B" opacity="0.5"/>
          <circle r="3.5" fill="#D2447F" opacity="0.78"/>
          <circle r="1.5" fill="#FFDF46"/>
        </g>
        {/* Centre big bloom */}
        <g transform="translate(110,28)">
          <circle r="14" fill="#FE803D" opacity="0.22"/>
          <circle r="9"  fill="#FE803D" opacity="0.5"/>
          <circle r="5"  fill="#F67E00" opacity="0.78"/>
          <circle r="2"  fill="#FFDF46"/>
        </g>
        {/* Right blossom */}
        <g transform="translate(180,28)">
          <circle r="11" fill="#9991E7" opacity="0.28"/>
          <circle r="7"  fill="#9991E7" opacity="0.5"/>
          <circle r="3.5" fill="#A765CC" opacity="0.78"/>
          <circle r="1.5" fill="#FFDF46"/>
        </g>
        {/* Leaves */}
        <path d="M76,46 Q60,38 50,48 Q60,56 76,46Z" fill="#7DC23D" opacity="0.55"/>
        <path d="M144,46 Q160,38 170,48 Q160,56 144,46Z" fill="#18C5B4" opacity="0.55"/>
        {/* Accent dots */}
        <circle cx="15"  cy="42" r="2" fill="#FFDF46" opacity="0.7"/>
        <circle cx="205" cy="42" r="2" fill="#FFDF46" opacity="0.7"/>
        <circle cx="78"  cy="20" r="1.5" fill="#5CA9E0" opacity="0.7"/>
        <circle cx="142" cy="20" r="1.5" fill="#5CA9E0" opacity="0.7"/>
      </svg>

      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Kindly Reply</p>
        <h2 className="section-heading reveal delay-1">RSVP</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.prose} reveal delay-2`}>
          To help us prepare with care, please let us know if you will be
          joining us.
        </p>

        {/* Prominent deadline — the focal piece of this section */}
        <div className={`${styles.deadlineBlock} reveal delay-3`}>
          <span className={styles.deadlineEyebrow}>Please Reply By</span>
          <span className={styles.deadlineDate}>June 21, 2026</span>
          <span className={styles.deadlineNote}>One month before the wedding</span>
        </div>

        <div className={`${styles.qrWrap} reveal delay-3`}>
          <div className={styles.qrBox}>
            <svg width="110" height="110" viewBox="0 0 100 100" fill="none" aria-label="QR code placeholder">
              <rect x="8"  y="8"  width="30" height="30" rx="3" stroke="#2a2520" strokeWidth="2.5" fill="none"/>
              <rect x="15" y="15" width="16" height="16" fill="#2a2520"/>
              <rect x="62" y="8"  width="30" height="30" rx="3" stroke="#2a2520" strokeWidth="2.5" fill="none"/>
              <rect x="69" y="15" width="16" height="16" fill="#2a2520"/>
              <rect x="8"  y="62" width="30" height="30" rx="3" stroke="#2a2520" strokeWidth="2.5" fill="none"/>
              <rect x="15" y="69" width="16" height="16" fill="#2a2520"/>
              <rect x="46" y="8"  width="8" height="8" fill="#2a2520"/>
              <rect x="46" y="20" width="8" height="8" fill="#2a2520" opacity="0.5"/>
              <rect x="62" y="46" width="8" height="8" fill="#2a2520"/>
              <rect x="76" y="46" width="8" height="8" fill="#2a2520" opacity="0.6"/>
              <rect x="62" y="60" width="8" height="8" fill="#2a2520" opacity="0.7"/>
              <rect x="84" y="60" width="8" height="8" fill="#2a2520"/>
              <rect x="46" y="62" width="8" height="8" fill="#2a2520" opacity="0.8"/>
              <rect x="46" y="76" width="8" height="8" fill="#2a2520"/>
              <rect x="60" y="76" width="8" height="8" fill="#2a2520" opacity="0.5"/>
              <rect x="76" y="72" width="8" height="8" fill="#2a2520" opacity="0.7"/>
              <rect x="84" y="84" width="8" height="8" fill="#2a2520"/>
            </svg>
            <p className={styles.qrLabel}>Scan to RSVP</p>
            <p className={styles.qrSub}>Replace with your actual QR code</p>
          </div>
        </div>

        <p className={`${styles.or} reveal delay-3`}>or</p>

        <a
          href="https://forms.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-elegant btn-gold reveal delay-3`}
        >
          RSVP via Google Form
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path d="M1.5,9.5 L9.5,1.5M3.5,1.5h6v6"/>
          </svg>
        </a>

        <p className={`${styles.footNote} reveal delay-3`}>
          Replace the link above with your actual Google Form URL
        </p>
      </div>
    </section>
  );
}
