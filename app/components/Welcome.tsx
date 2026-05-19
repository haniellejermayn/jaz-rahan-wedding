import styles from "./Welcome.module.css";

export default function Welcome() {
  return (
    <section id="welcome" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">A Message From Us</p>
        <h2 className="section-heading reveal delay-1">Welcome</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.text} reveal delay-3`}>
          With hearts overflowing with gratitude and joy, we invite you to stand with
          us as we begin the most beautiful chapter of our lives together. Your presence
          is not just a gift — it is the very thing that makes this day complete.
        </p>

        <p className={`${styles.sign} reveal delay-3`}>— Jaz &amp; Rahan</p>
      </div>
    </section>
  );
}
