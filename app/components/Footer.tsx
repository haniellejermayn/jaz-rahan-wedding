import styles from "./Footer.module.css";

const flowers = [
  { color: "#D2447F", dark: "#a8305f", size: 22 },
  { color: "#7DC23D", dark: "#5a9a2e", size: 18 },
  { color: "#FE569B", dark: "#c93d7a", size: 24 },
  { color: "#9991E7", dark: "#6d63cc", size: 20 },
  { color: "#FFDF46", dark: "#e5b800", size: 26 },
  { color: "#FE803D", dark: "#d45e1a", size: 20 },
  { color: "#5CA9E0", dark: "#2e7ec4", size: 22 },
  { color: "#7DC23D", dark: "#5a9a2e", size: 18 },
  { color: "#FE569B", dark: "#c93d7a", size: 20 },
];

function Flower({ color, dark, size }: { color: string; dark: string; size: number }) {
  const r = size / 2;
  const pr = r * 0.42;   // petal radius
  const cr = r * 0.22;   // center dot radius
  const dist = r * 0.44; // petal center offset from origin

  // 5 petals at 72° apart, starting from top
  const petals = Array.from({ length: 5 }, (_, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    const cx = Math.cos(angle) * dist;
    const cy = Math.sin(angle) * dist;
    return <ellipse key={i} cx={cx} cy={cy} rx={pr} ry={pr * 1.35} transform={`rotate(${i * 72}, ${cx}, ${cy})`} fill={color} opacity="0.85" />;
  });

  return (
    <svg
      className={styles.flower}
      width={size}
      height={size}
      viewBox={`${-r} ${-r} ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {petals}
      <circle cx="0" cy="0" r={cr * 1.4} fill={dark} opacity="0.5" />
      <circle cx="0" cy="0" r={cr} fill={dark} />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.namesWrap}>
        <span className={styles.namesRule} />
        <p className={styles.names}>
          Rahan <span className={styles.ampersand}>&amp;</span> Jazmine
        </p>
        <span className={styles.namesRule} />
      </div>
      <div className={styles.divider} aria-hidden="true">
        <span />
        <span className={styles.dot}>✦</span>
        <span />
      </div>
      <p className={styles.date}>July 21 · 2026</p>
      <div className={styles.flowers} aria-hidden="true">
        {flowers.map((f, i) => (
          <Flower key={i} color={f.color} dark={f.dark} size={f.size} />
        ))}
      </div>
      <p className={styles.made}>
        made with <em>♡</em>
      </p>
    </footer>
  );
}