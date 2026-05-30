import styles from "./Venue.module.css";

type VenueData = {
  kind: string;
  name: string;
  location: string;
  image: string;
  alt: string;
  directionsUrl: string;
  /* sprig accent colors per venue, top-left going clockwise */
  sprigColors: [string, string, string, string];
};

const venues: VenueData[] = [
  {
    kind: "The Ceremony",
    name: "United Evangelical Church of Palawan",
    location: "Puerto Princesa · Palawan · Philippines",
    image: "/images/church.jpg",
    alt: "Map to United Evangelical Church of Palawan",
    // Replace with the exact pin / shared link if you have one
    directionsUrl: "https://maps.app.goo.gl/K1LhYq4GDtukUrX27?g_st=ic",
    sprigColors: ["#FE569B", "#9991E7", "#FE803D", "#7DC23D"],
  },
  {
    kind: "The Reception",
    name: "Citystate Asturias Hotel",
    location: "Puerto Princesa · Palawan · Philippines",
    image: "/images/reception.jpg",
    alt: "Map to Citystate Asturias Hotel, Palawan",
    directionsUrl: "https://maps.app.goo.gl/8EvWBqCjVttBiHVCA?g_st=ic",
    sprigColors: ["#5CA9E0", "#FFDF46", "#A765CC", "#18C5B4"],
  },
];

function CornerSprigs({ colors }: { colors: VenueData["sprigColors"] }) {
  const [tl, tr, bl, br] = colors;
  return (
    <>
      <svg className={`${styles.mapSprig} ${styles.sprigTL}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2,2 Q22,6 36,22 Q48,38 56,56" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="14" cy="12" rx="5" ry="4.5" fill={tl} opacity="0.55" />
        <circle cx="14" cy="12" r="2" fill={tl} />
        <ellipse cx="38" cy="32" rx="4" ry="3.5" fill="#FFDF46" opacity="0.7" />
        <path d="M28,42 Q22,38 18,40 Q22,46 28,42Z" fill="#7DC23D" opacity="0.6" />
      </svg>
      <svg className={`${styles.mapSprig} ${styles.sprigTR}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M58,2 Q38,6 24,22 Q12,38 4,56" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="46" cy="12" rx="5" ry="4.5" fill={tr} opacity="0.55" />
        <circle cx="46" cy="12" r="2" fill={tr} />
        <ellipse cx="22" cy="32" rx="4" ry="3.5" fill="#5CA9E0" opacity="0.7" />
        <path d="M32,42 Q38,38 42,40 Q38,46 32,42Z" fill="#7DC23D" opacity="0.6" />
      </svg>
      <svg className={`${styles.mapSprig} ${styles.sprigBL}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M2,58 Q22,54 36,38 Q48,22 56,4" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="14" cy="48" rx="5" ry="4.5" fill={bl} opacity="0.55" />
        <circle cx="14" cy="48" r="2" fill={bl} />
        <ellipse cx="38" cy="28" rx="4" ry="3.5" fill="#7DC23D" opacity="0.7" />
        <path d="M28,18 Q22,22 18,20 Q22,14 28,18Z" fill="#7DC23D" opacity="0.6" />
      </svg>
      <svg className={`${styles.mapSprig} ${styles.sprigBR}`} viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M58,58 Q38,54 24,38 Q12,22 4,4" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.6" />
        <ellipse cx="46" cy="48" rx="5" ry="4.5" fill={br} opacity="0.55" />
        <circle cx="46" cy="48" r="2" fill={br} />
        <ellipse cx="22" cy="28" rx="4" ry="3.5" fill="#FFDF46" opacity="0.7" />
        <path d="M32,18 Q38,22 42,20 Q38,14 32,18Z" fill="#7DC23D" opacity="0.6" />
      </svg>
    </>
  );
}

export default function Venue() {
  return (
    <section id="venue" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Find Your Way</p>
        <h2 className="section-heading reveal delay-1">The Venues</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={styles.venues}>
          {venues.map((v, i) => (
            <div key={v.name} className={`${styles.venue} reveal delay-2`}>
              <div className={styles.nameBlock}>
                <span className={styles.venueKind}>{v.kind}</span>
                <h3 className={styles.venueName}>{v.name}</h3>
                <p className={styles.venueLocation}>
                  <span className={styles.locationRule} />
                  {v.location}
                  <span className={styles.locationRule} />
                </p>
              </div>

              {/* Watercolor map — framed with the design language */}
              <div className={styles.mapFrame}>
                <CornerSprigs colors={v.sprigColors} />
                <div className={styles.mapShell}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={v.image}
                    alt={v.alt}
                    loading="lazy"
                    className={styles.mapImage}
                  />
                </div>
              </div>

              <a
                href={v.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`btn-elegant btn-dark ${styles.mapBtn}`}
              >
                Get Directions
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                  <path d="M1.5,9.5 L9.5,1.5M3.5,1.5h6v6" />
                </svg>
              </a>

              {i < venues.length - 1 && (
                <span className={styles.venueSeparator} aria-hidden="true">
                  <span /> ✦ <span />
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}