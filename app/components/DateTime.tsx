import styles from "./DateTime.module.css";

const timeline = [
  { time: "1:30 PM", label: "Doors Open",    note: "Guests are invited to be seated", color: "#FE569B" },
  { time: "2:00 PM", label: "Ceremony",       note: "The exchange of vows",            color: "#9991E7" },
  { time: "4:00 PM", label: "Cocktail Hour",  note: "Garden reception & light bites",  color: "#FE803D" },
  { time: "5:00 PM", label: "Reception",      note: "Dinner, dancing & celebration",   color: "#7DC23D" },
];

export default function DateTime() {
  return (
    <section id="datetime" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Mark Your Calendar</p>
        <h2 className="section-heading reveal delay-1">The Day</h2>
        <div className="ornament reveal delay-2">✦</div>

        {/* Big date stamp — invitation card style */}
        <div className={`${styles.dateCard} reveal delay-2`}>
          <span className={styles.dateSub}>Tuesday</span>
          <div className={styles.dateRow}>
            <span className={styles.dateMonth}>July</span>
            <span className={styles.dateMain}>21</span>
            <span className={styles.dateYearV}>2026</span>
          </div>
          <span className={styles.dateOrnament} aria-hidden="true">
            <span /> <em>two o&apos;clock in the afternoon</em> <span />
          </span>
        </div>

        {/* Timeline */}
        <div className={styles.timeline}>
          {timeline.map((t, i) => (
            <div
              key={i}
              className={`${styles.row} reveal`}
              style={{ transitionDelay: `${0.1 + i * 0.1}s`, "--accent": t.color } as React.CSSProperties}
            >
              <div className={styles.timeCol}>
                <span className={styles.time}>{t.time}</span>
              </div>
              <div className={styles.stemCol} aria-hidden="true">
                <div className={styles.dot}>
                  <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="7" cy="7" r="6" fill={t.color} opacity="0.22"/>
                    <circle cx="7" cy="7" r="3.5" fill={t.color}/>
                    <circle cx="7" cy="7" r="1.4" fill="#FFDF46"/>
                  </svg>
                </div>
                {i < timeline.length - 1 && <span className={styles.stem} />}
              </div>
              <div className={styles.labelCol}>
                <span className={styles.eventLabel}>{t.label}</span>
                <span className={styles.eventNote}>{t.note}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
