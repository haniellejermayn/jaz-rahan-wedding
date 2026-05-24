import styles from "./FairyLightsDivider.module.css";

/**
 * Animated fairy-lights divider that alternates with FloralDivider.
 *
 * Implementation note: this uses a transparent PNG sprite sheet
 * (`/images/fairy-lights-sprite.png`) animated by stepping the
 * background-position. PNG alpha plays nice with the ivory page
 * background — no chroma fringes or codec quirks the way a video
 * with mix-blend-mode would. The original source is Mom's animation,
 * preserved frame-for-frame; only background cream was keyed out.
 */
export default function FairyLightsDivider() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.ruleLeft} />
      <div className={styles.lights} />
      <div className={styles.ruleRight} />
    </div>
  );
}
