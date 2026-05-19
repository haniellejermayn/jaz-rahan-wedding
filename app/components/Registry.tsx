import styles from "./Registry.module.css";

export default function Registry() {
  return (
    <section id="registry" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Gifts &amp; Wishes</p>
        <h2 className="section-heading reveal delay-1">Registry</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.prose} reveal delay-2`}>
          Your presence at our celebration is the most treasured gift we could receive.
          Should you wish to bless us further, we have put together a small registry
          to guide you.
        </p>

        <a
          href="https://docs.google.com/spreadsheets"
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.registryLink} reveal delay-3`}
        >
          <div className={styles.linkLeft}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
              <rect x="2" y="3" width="16" height="14" rx="1.5"/>
              <path d="M2,7 L18,7"/>
              <path d="M7,7 L7,17"/>
              <path d="M7,10 L14,10"/>
              <path d="M7,13 L14,13"/>
            </svg>
            <div>
              <span className={styles.linkTitle}>Our Gift Registry</span>
              <span className={styles.linkSub}>View the full list</span>
            </div>
          </div>
          <svg className={styles.arrow} width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M2,11 L11,2M4.5,2H11V8.5"/>
          </svg>
        </a>

        <p className={`${styles.note} reveal delay-3`}>
          A card and your warm company on the day are always more than enough.
        </p>
      </div>
    </section>
  );
}
