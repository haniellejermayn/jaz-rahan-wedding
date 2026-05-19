import styles from "./DateTime.module.css";

const timeline = [
  { time: "1:30 PM", label: "Doors Open",     note: "Guests are invited to be seated" },
  { time: "2:00 PM", label: "Ceremony",        note: "The exchange of vows" },
  { time: "4:00 PM", label: "Cocktail Hour",   note: "Garden reception & light bites" },
  { time: "5:00 PM", label: "Reception",       note: "Dinner, dancing & celebration" },
];

export default function DateTime() {
  return (
    <section id="datetime" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Mark Your Calendar</p>
        <h2 className="section-heading reveal delay-1">The Day</h2>
        <div className="ornament reveal delay-2">✦</div>

        <div className={`${styles.dateBlock} reveal delay-2`}>
          <span className={styles.dateSub}>Tuesday</span>
          <span className={styles.dateMain}>July 21</span>
          <span className={styles.dateYear}>2026</span>
        </div>

        <div className={styles.timeline}>
          {timeline.map((t, i) => (
            <div key={i} className={`${styles.row} reveal`} style={{ transitionDelay: `${0.1 + i * 0.1}s` }}>
              <div className={styles.timeCol}>
                <span className={styles.time}>{t.time}</span>
              </div>
              <div className={styles.stemCol} aria-hidden="true">
                <span className={styles.dot} />
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
