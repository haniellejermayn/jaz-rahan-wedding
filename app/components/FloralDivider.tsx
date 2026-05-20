import styles from "./FloralDivider.module.css";

interface Props { dark?: boolean; }

export default function FloralDivider({ dark: _dark = false }: Props) {
  // Always light now — no dark variant needed
  return (
    <div className={`${styles.wrap} ${styles.light}`} aria-hidden="true">
      <svg viewBox="0 0 375 80" xmlns="http://www.w3.org/2000/svg" className={styles.svg} preserveAspectRatio="xMidYMid slice">
        {/* Centre stem */}
        <path d="M0,40 Q95,36 188,40 Q280,44 375,40" stroke="rgba(254,86,155,0.3)" strokeWidth="1" fill="none"/>

        {/* Left — rose petal */}
        <path d="M55,40 Q44,26 36,18" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="36" cy="18" r="8" fill="#FE569B" opacity="0.2"/>
        <circle cx="36" cy="18" r="5" fill="#FE569B" opacity="0.35"/>
        <circle cx="36" cy="18" r="2.5" fill="#D2447F" opacity="0.65"/>

        {/* Left lower — violet */}
        <path d="M72,40 Q62,55 54,63" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="54" cy="63" r="7" fill="#9991E7" opacity="0.22"/>
        <circle cx="54" cy="63" r="4" fill="#9991E7" opacity="0.38"/>
        <circle cx="54" cy="63" r="2" fill="#A765CC" opacity="0.65"/>

        {/* Left leaf */}
        <path d="M40,40 Q26,34 16,28" stroke="rgba(125,194,61,0.4)" strokeWidth="1" fill="none"/>
        <path d="M16,28 Q24,18 34,26 Q24,36 16,28Z" fill="#7DC23D" opacity="0.5"/>

        {/* Centre — yellow sunray */}
        <path d="M178,40 Q168,22 161,13" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="161" cy="13" r="9"  fill="#FFDF46" opacity="0.25"/>
        <circle cx="161" cy="13" r="6"  fill="#FFDF46" opacity="0.4"/>
        <circle cx="161" cy="13" r="3"  fill="#FEC135" opacity="0.7"/>

        {/* Centre right — sky */}
        <path d="M198,40 Q208,20 215,12" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="215" cy="12" r="8"  fill="#5CA9E0" opacity="0.22"/>
        <circle cx="215" cy="12" r="5"  fill="#5CA9E0" opacity="0.38"/>
        <circle cx="215" cy="12" r="2.5" fill="#0580E3" opacity="0.65"/>

        {/* Centre star */}
        <circle cx="188" cy="40" r="3.5" fill="#FE569B" opacity="0.5"/>
        <circle cx="188" cy="40" r="1.5" fill="#FFDF46" opacity="0.9"/>

        {/* Right — tangerine */}
        <path d="M305,40 Q316,24 324,16" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="324" cy="16" r="8"  fill="#FE803D" opacity="0.22"/>
        <circle cx="324" cy="16" r="5"  fill="#FE803D" opacity="0.38"/>
        <circle cx="324" cy="16" r="2.5" fill="#F67E00" opacity="0.65"/>

        {/* Right lower — teal */}
        <path d="M320,40 Q330,56 338,64" stroke="rgba(125,194,61,0.45)" strokeWidth="1.2" fill="none"/>
        <circle cx="338" cy="64" r="7"  fill="#18C5B4" opacity="0.22"/>
        <circle cx="338" cy="64" r="4"  fill="#18C5B4" opacity="0.38"/>
        <circle cx="338" cy="64" r="2"  fill="#0580E3" opacity="0.65"/>

        {/* Right leaf */}
        <path d="M340,40 Q356,34 366,28" stroke="rgba(125,194,61,0.4)" strokeWidth="1" fill="none"/>
        <path d="M366,28 Q356,18 346,26 Q356,36 366,28Z" fill="#7DC23D" opacity="0.5"/>

        {/* Accent dots along stem */}
        <circle cx="110" cy="39" r="2" fill="#9991E7" opacity="0.3"/>
        <circle cx="145" cy="41" r="1.5" fill="#FE803D" opacity="0.3"/>
        <circle cx="230" cy="39" r="1.5" fill="#FFDF46" opacity="0.4"/>
        <circle cx="265" cy="41" r="2" fill="#7DC23D" opacity="0.3"/>
      </svg>
    </div>
  );
}
