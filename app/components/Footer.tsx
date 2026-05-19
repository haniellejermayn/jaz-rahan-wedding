import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.monogram}>Jaz &amp; Rahan</span>
      <div className={styles.divider} aria-hidden="true">
        <span /><span className={styles.dot}>✦</span><span />
      </div>
      <p className={styles.date}>July 21 · 2026</p>
      <p className={styles.made}>Made with love</p>
    </footer>
  );
}
