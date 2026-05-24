import styles from "./FairyLightsDivider.module.css";

/**
 * A divider band that plays a short looping animation of fairy lights.
 * Designed to alternate with FloralDivider between content sections.
 *
 * The video is muted, plays inline, and loops silently. It has a poster
 * so it never flashes black before the first frame loads. mix-blend-mode
 * is applied via CSS so the video's cream background fuses seamlessly
 * with the page's ivory base.
 */
export default function FairyLightsDivider() {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.ruleLeft} />

      <div className={styles.videoFrame}>
        <video
          className={styles.video}
          src="/videos/fairy-lights.mp4"
          poster="/videos/fairy-lights-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          disablePictureInPicture
          controls={false}
        />
      </div>

      <div className={styles.ruleRight} />
    </div>
  );
}
