import styles from "./FloralDivider.module.css";

interface Props { dark?: boolean; }

export default function FloralDivider({ dark: _dark = false }: Props) {
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div className={styles.ruleLeft} />

      <svg
        viewBox="0 0 420 110"
        xmlns="http://www.w3.org/2000/svg"
        className={styles.svg}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Long graceful stem with gentle curve */}
        <path
          d="M10,58 Q100,50 210,58 Q320,66 410,58"
          stroke="#7DC23D"
          strokeWidth="1"
          fill="none"
          opacity="0.55"
        />

        {/* Far left — trailing leaf cluster */}
        <g opacity="0.85">
          <path d="M18,58 Q8,46 4,34" stroke="#7DC23D" strokeWidth="0.9" fill="none" opacity="0.5"/>
          <path d="M4,34 Q-2,28 6,22 Q14,28 4,34Z" fill="#7DC23D" opacity="0.55"/>
          <path d="M28,58 Q22,68 18,76" stroke="#7DC23D" strokeWidth="0.9" fill="none" opacity="0.5"/>
          <path d="M18,76 Q12,82 20,88 Q26,82 18,76Z" fill="#7DC23D" opacity="0.45"/>
        </g>

        {/* Left bloom — rose */}
        <g>
          <path d="M58,58 Q48,42 42,30" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="42" cy="30" rx="11" ry="10" fill="#FE569B" opacity="0.22"/>
          <ellipse cx="42" cy="30" rx="7"  ry="6.5" fill="#FE569B" opacity="0.4"/>
          <circle cx="42" cy="30" r="3.5" fill="#D2447F" opacity="0.75"/>
          <circle cx="42" cy="30" r="1.5" fill="#FFDF46" opacity="0.9"/>
          {/* tiny petal hints */}
          <ellipse cx="34" cy="26" rx="3" ry="2" fill="#FE569B" opacity="0.3" transform="rotate(-25 34 26)"/>
          <ellipse cx="50" cy="26" rx="3" ry="2" fill="#FE569B" opacity="0.3" transform="rotate(25 50 26)"/>
        </g>

        {/* Left lower — violet bud */}
        <g>
          <path d="M75,58 Q66,72 60,82" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="60" cy="82" rx="8" ry="7.5" fill="#9991E7" opacity="0.25"/>
          <ellipse cx="60" cy="82" rx="5" ry="4.5" fill="#9991E7" opacity="0.45"/>
          <circle cx="60" cy="82" r="2.5" fill="#A765CC" opacity="0.75"/>
        </g>

        {/* Sage leaf set */}
        <g opacity="0.85">
          <path d="M95,58 Q108,52 120,48" stroke="#7DC23D" strokeWidth="0.8" fill="none" opacity="0.5"/>
          <path d="M120,48 Q126,40 132,46 Q126,54 120,48Z" fill="#7DC23D" opacity="0.55"/>
          <path d="M105,58 Q112,66 118,72" stroke="#7DC23D" strokeWidth="0.8" fill="none" opacity="0.5"/>
          <path d="M118,72 Q124,76 122,84 Q116,80 118,72Z" fill="#7DC23D" opacity="0.45"/>
        </g>

        {/* Centre — sunray and tangerine pair */}
        <g>
          <path d="M178,58 Q170,38 164,22" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="164" cy="22" rx="10" ry="9" fill="#FFDF46" opacity="0.3"/>
          <ellipse cx="164" cy="22" rx="6.5" ry="6" fill="#FFDF46" opacity="0.55"/>
          <circle cx="164" cy="22" r="3.2" fill="#FEC135" opacity="0.85"/>
          <circle cx="164" cy="22" r="1.3" fill="#F67E00" opacity="0.95"/>
        </g>

        {/* Centre star ornament */}
        <g transform="translate(210 58)">
          <path d="M0,-9 L2,-2 L9,0 L2,2 L0,9 L-2,2 L-9,0 L-2,-2 Z" fill="#D2447F" opacity="0.55"/>
          <circle cx="0" cy="0" r="2" fill="#FFDF46" opacity="0.95"/>
        </g>

        {/* Centre right — tangerine */}
        <g>
          <path d="M242,58 Q250,40 256,24" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="256" cy="24" rx="10" ry="9.5" fill="#FE803D" opacity="0.25"/>
          <ellipse cx="256" cy="24" rx="6.5" ry="6" fill="#FE803D" opacity="0.45"/>
          <circle cx="256" cy="24" r="3.2" fill="#F67E00" opacity="0.85"/>
          <circle cx="256" cy="24" r="1.3" fill="#FFDF46" opacity="0.9"/>
          <ellipse cx="248" cy="20" rx="3" ry="2" fill="#FE803D" opacity="0.35" transform="rotate(-30 248 20)"/>
          <ellipse cx="264" cy="20" rx="3" ry="2" fill="#FE803D" opacity="0.35" transform="rotate(30 264 20)"/>
        </g>

        {/* Sage leaves right */}
        <g opacity="0.85">
          <path d="M278,58 Q286,68 292,76" stroke="#7DC23D" strokeWidth="0.8" fill="none" opacity="0.5"/>
          <path d="M292,76 Q298,82 296,90 Q290,84 292,76Z" fill="#7DC23D" opacity="0.5"/>
        </g>

        {/* Right — sky blue bloom */}
        <g>
          <path d="M310,58 Q318,42 324,30" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="324" cy="30" rx="10" ry="9" fill="#5CA9E0" opacity="0.25"/>
          <ellipse cx="324" cy="30" rx="6.5" ry="6" fill="#5CA9E0" opacity="0.45"/>
          <circle cx="324" cy="30" r="3.2" fill="#0580E3" opacity="0.8"/>
          <circle cx="324" cy="30" r="1.3" fill="#FFDF46" opacity="0.9"/>
        </g>

        {/* Right lower — leaf green */}
        <g>
          <path d="M340,58 Q350,72 358,82" stroke="#7DC23D" strokeWidth="1" fill="none" opacity="0.55"/>
          <ellipse cx="358" cy="82" rx="8" ry="7.5" fill="#7DC23D" opacity="0.3"/>
          <ellipse cx="358" cy="82" rx="5" ry="4.5" fill="#7DC23D" opacity="0.5"/>
          <circle cx="358" cy="82" r="2.5" fill="#18C5B4" opacity="0.7"/>
        </g>

        {/* Far right — trailing leaves */}
        <g opacity="0.85">
          <path d="M380,58 Q390,46 396,34" stroke="#7DC23D" strokeWidth="0.9" fill="none" opacity="0.5"/>
          <path d="M396,34 Q404,28 398,22 Q390,28 396,34Z" fill="#7DC23D" opacity="0.55"/>
          <path d="M388,58 Q394,68 398,76" stroke="#7DC23D" strokeWidth="0.9" fill="none" opacity="0.5"/>
          <path d="M398,76 Q404,82 396,88 Q390,82 398,76Z" fill="#7DC23D" opacity="0.45"/>
        </g>

        {/* Accent dots along stem */}
        <circle cx="130" cy="56" r="1.5" fill="#A765CC" opacity="0.5"/>
        <circle cx="148" cy="60" r="1" fill="#FEC135" opacity="0.55"/>
        <circle cx="196" cy="56" r="1" fill="#18C5B4" opacity="0.55"/>
        <circle cx="224" cy="60" r="1" fill="#FE569B" opacity="0.55"/>
        <circle cx="270" cy="56" r="1.5" fill="#FFDF46" opacity="0.6"/>
        <circle cx="292" cy="60" r="1" fill="#0580E3" opacity="0.5"/>
      </svg>

      <div className={styles.ruleRight} />
    </div>
  );
}
