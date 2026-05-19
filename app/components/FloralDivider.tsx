import styles from "./FloralDivider.module.css";

interface Props {
  dark?: boolean;
}

// Video removed — replaced with SVG botanical strip
export default function FloralDivider({ dark = false }: Props) {
  return (
    <div className={`${styles.wrap} ${dark ? styles.dark : styles.light}`} aria-hidden="true">
      <svg viewBox="0 0 375 80" xmlns="http://www.w3.org/2000/svg" className={styles.svg} preserveAspectRatio="xMidYMid slice">
        {/* Stem across centre */}
        <path d="M0,40 Q95,36 188,40 Q280,44 375,40" stroke={dark ? "#355c44" : "#aecfb8"} strokeWidth="1" fill="none" opacity="0.6"/>

        {/* Left sprig */}
        <path d="M60,40 Q50,25 42,18" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M42,18 Q48,10 56,18 Q50,26 42,18Z" fill={dark ? "#527a60" : "#7a9e86"} opacity="0.7"/>
        <path d="M80,40 Q70,55 62,62" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M62,62 Q68,70 76,62 Q70,54 62,62Z" fill={dark ? "#355c44" : "#aecfb8"} opacity="0.6"/>

        {/* Centre sprig */}
        <path d="M175,40 Q165,22 158,14" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M158,14 Q166,6 173,14 Q167,22 158,14Z" fill={dark ? "#527a60" : "#7a9e86"} opacity="0.7"/>
        <path d="M200,40 Q210,20 216,13" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M216,13 Q224,5 221,13 Q214,21 216,13Z" fill={dark ? "#355c44" : "#aecfb8"} opacity="0.6"/>
        <circle cx="188" cy="40" r="3" fill="#b8963e" opacity={dark ? "0.5" : "0.4"}/>

        {/* Right sprig */}
        <path d="M300,40 Q310,24 318,17" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M318,17 Q326,9 323,17 Q316,25 318,17Z" fill={dark ? "#527a60" : "#7a9e86"} opacity="0.7"/>
        <path d="M320,40 Q330,57 337,64" stroke={dark ? "#527a60" : "#7a9e86"} strokeWidth="1" fill="none"/>
        <path d="M337,64 Q345,72 342,64 Q334,56 337,64Z" fill={dark ? "#355c44" : "#aecfb8"} opacity="0.6"/>

        {/* Gold dots */}
        <circle cx="120" cy="38" r="2" fill="#b8963e" opacity="0.35"/>
        <circle cx="255" cy="42" r="2" fill="#b8963e" opacity="0.35"/>
        <circle cx="60"  cy="40" r="1.5" fill="#b8963e" opacity="0.25"/>
        <circle cx="315" cy="40" r="1.5" fill="#b8963e" opacity="0.25"/>
      </svg>
    </div>
  );
}
