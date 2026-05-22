import styles from "./SectionTransition.module.css";

interface Props {
  /** CSS color of the section ABOVE (top of strip). e.g. "var(--paper)" */
  from: string;
  /** CSS color of the section BELOW (bottom of strip). e.g. "var(--white)" */
  to: string;
  /** Optional override of the strip height (any CSS length). */
  height?: string;
}

/**
 * A purely decorative gradient strip that smooths the visible boundary
 * between two sections whose base colors differ. Drop it BETWEEN sections.
 *
 *   <Welcome />
 *   <SectionTransition from="var(--white)" to="var(--paper)" />
 *   <MusicPlayer />
 *
 * No-op when from === to; just skip it in those cases.
 */
export default function SectionTransition({ from, to, height }: Props) {
  return (
    <div
      aria-hidden="true"
      className={styles.transition}
      style={{
        background: `linear-gradient(to bottom, ${from} 0%, ${to} 100%)`,
        ...(height ? { height } : {}),
      }}
    />
  );
}