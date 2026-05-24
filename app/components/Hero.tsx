"use client";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const arch1Ref = useRef<SVGSVGElement>(null);
  const arch2Ref = useRef<SVGSVGElement>(null);
  const sprigLeftRef = useRef<SVGSVGElement>(null);
  const sprigRightRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (arch1Ref.current)
        arch1Ref.current.style.transform = `translateY(${y * 0.08}px)`;
      if (arch2Ref.current)
        arch2Ref.current.style.transform = `translateY(${y * -0.04}px)`;
      if (sprigLeftRef.current)
        sprigLeftRef.current.style.transform = `translateY(${y * 0.22}px) rotate(${-y * 0.02}deg)`;
      if (sprigRightRef.current)
        sprigRightRef.current.style.transform = `scaleX(-1) translateY(${y * 0.22}px) rotate(${-y * 0.02}deg)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* Watercolor wash blobs */}
      <div className={styles.wash} aria-hidden="true" />

      {/* TOP BOTANICAL ARCH — frames the names from above */}
      <svg
        ref={arch1Ref}
        className={styles.archTop}
        viewBox="0 0 1000 320"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMin meet"
      >
        {/* Main arch stem */}
        <path
          d="M50,300 Q140,160 280,90 Q500,0 720,90 Q860,160 950,300"
          stroke="rgba(91,160,47,0.55)"
          strokeWidth="1.6"
          fill="none"
          strokeLinecap="round"
        />

        {/* Secondary trailing vine */}
        <path
          d="M70,300 Q160,180 300,120 Q500,40 700,120 Q840,180 930,300"
          stroke="rgba(149,185,122,0.42)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />

        {/* === LEFT SIDE FLOWERS === */}
        {/* Rose cluster */}
        <g transform="translate(150,220)">
          <circle r="22" fill="#FE569B" opacity="0.22" />
          <circle r="16" fill="#FE569B" opacity="0.42" />
          <circle r="10" fill="#D2447F" opacity="0.7" />
          <circle r="4" fill="#FFDF46" opacity="0.95" />
          <path
            d="M-6,-22 Q0,-30 6,-22 M-22,-6 Q-30,0 -22,6 M6,22 Q0,30 -6,22 M22,6 Q30,0 22,-6"
            stroke="#FE569B"
            strokeWidth="3"
            fill="none"
            opacity="0.35"
            strokeLinecap="round"
          />
        </g>

        {/* Violet petal cluster */}
        <g transform="translate(260,140)">
          <circle r="14" fill="#9991E7" opacity="0.3" />
          <circle r="9" fill="#9991E7" opacity="0.55" />
          <circle r="4" fill="#A765CC" opacity="0.85" />
          <circle r="1.5" fill="#FFDF46" />
        </g>

        {/* Yellow sun-bloom */}
        <g transform="translate(370,90)">
          <g opacity="0.55">
            <ellipse cx="0" cy="-13" rx="5" ry="9" fill="#FFDF46" />
            <ellipse
              cx="11"
              cy="-7"
              rx="9"
              ry="5"
              fill="#FFDF46"
              transform="rotate(45)"
            />
            <ellipse
              cx="13"
              cy="0"
              rx="5"
              ry="9"
              fill="#FFDF46"
              transform="rotate(90)"
            />
            <ellipse
              cx="7"
              cy="11"
              rx="9"
              ry="5"
              fill="#FFDF46"
              transform="rotate(135)"
            />
            <ellipse cx="0" cy="13" rx="5" ry="9" fill="#FFDF46" />
            <ellipse
              cx="-11"
              cy="7"
              rx="9"
              ry="5"
              fill="#FFDF46"
              transform="rotate(45)"
            />
            <ellipse cx="-13" cy="0" rx="5" ry="9" fill="#FFDF46" />
            <ellipse
              cx="-7"
              cy="-11"
              rx="9"
              ry="5"
              fill="#FFDF46"
              transform="rotate(135)"
            />
          </g>
          <circle r="7" fill="#FEC135" />
          <circle r="3" fill="#F67E00" />
        </g>

        {/* Leaf left */}
        <path
          d="M90,250 Q60,230 35,235 Q60,250 90,250Z"
          fill="#7DC23D"
          opacity="0.55"
        />
        <path
          d="M88,252 Q63,240 38,243"
          stroke="#5BA02F"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />

        {/* === CENTER FLOWERS === */}
        {/* Centre apex bloom */}
        <g transform="translate(500,40)">
          <circle r="20" fill="#FE569B" opacity="0.2" />
          <circle r="14" fill="#FE569B" opacity="0.4" />
          <circle r="9" fill="#D2447F" opacity="0.7" />
          <circle r="5" fill="#FE803D" opacity="0.7" />
          <circle r="2" fill="#FFDF46" />
          {/* Petals */}
          <path
            d="M0,-20 Q-7,-26 0,-32 Q7,-26 0,-20"
            fill="#FE569B"
            opacity="0.4"
          />
          <path d="M20,0 Q26,-7 32,0 Q26,7 20,0" fill="#FE569B" opacity="0.4" />
          <path d="M0,20 Q-7,26 0,32 Q7,26 0,20" fill="#FE569B" opacity="0.4" />
          <path
            d="M-20,0 Q-26,-7 -32,0 Q-26,7 -20,0"
            fill="#FE569B"
            opacity="0.4"
          />
        </g>

        {/* === RIGHT SIDE FLOWERS === */}
        {/* Sky blossom */}
        <g transform="translate(630,90)">
          <ellipse
            rx="11"
            ry="7"
            fill="#5CA9E0"
            opacity="0.32"
            transform="rotate(0)"
          />
          <ellipse
            rx="11"
            ry="7"
            fill="#5CA9E0"
            opacity="0.32"
            transform="rotate(60)"
          />
          <ellipse
            rx="11"
            ry="7"
            fill="#5CA9E0"
            opacity="0.32"
            transform="rotate(120)"
          />
          <circle r="4" fill="#0580E3" opacity="0.7" />
          <circle r="1.8" fill="#FFDF46" />
        </g>

        {/* Tangerine bud */}
        <g transform="translate(740,140)">
          <circle r="13" fill="#FE803D" opacity="0.28" />
          <circle r="8" fill="#FE803D" opacity="0.55" />
          <circle r="4" fill="#F67E00" opacity="0.85" />
        </g>

        {/* Plum cluster */}
        <g transform="translate(850,220)">
          <circle r="18" fill="#A765CC" opacity="0.22" />
          <circle r="12" fill="#A765CC" opacity="0.42" />
          <circle r="7" fill="#9991E7" opacity="0.7" />
          <circle r="3" fill="#FFDF46" />
        </g>

        {/* Leaf right */}
        <path
          d="M910,250 Q940,230 965,235 Q940,250 910,250Z"
          fill="#18C5B4"
          opacity="0.55"
        />
        <path
          d="M912,252 Q937,240 962,243"
          stroke="#5BA02F"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />

        {/* Small accent buds along stem */}
        <circle cx="200" cy="178" r="2.5" fill="#FFDF46" opacity="0.85" />
        <circle cx="800" cy="178" r="2.5" fill="#FFDF46" opacity="0.85" />
        <circle cx="320" cy="108" r="2" fill="#FE803D" opacity="0.7" />
        <circle cx="680" cy="108" r="2" fill="#FE803D" opacity="0.7" />
        <circle cx="430" cy="60" r="2" fill="#7DC23D" opacity="0.85" />
        <circle cx="570" cy="60" r="2" fill="#7DC23D" opacity="0.85" />
      </svg>

      {/* BOTTOM ECHO arch — softer, mirrored */}
      <svg
        ref={arch2Ref}
        className={styles.archBottom}
        viewBox="0 0 1000 180"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        preserveAspectRatio="xMidYMax meet"
      >
        <path
          d="M40,10 Q200,140 500,160 Q800,140 960,10"
          stroke="rgba(91,160,47,0.4)"
          strokeWidth="1.2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Scattered blooms along bottom arch */}
        <g transform="translate(200,110)" opacity="0.7">
          <circle r="11" fill="#FE569B" opacity="0.28" />
          <circle r="6" fill="#D2447F" opacity="0.6" />
          <circle r="2" fill="#FFDF46" />
        </g>
        <g transform="translate(380,148)" opacity="0.7">
          <circle r="9" fill="#9991E7" opacity="0.3" />
          <circle r="5" fill="#A765CC" opacity="0.65" />
        </g>
        <g transform="translate(500,156)" opacity="0.7">
          <circle r="10" fill="#FE803D" opacity="0.3" />
          <circle r="5" fill="#F67E00" opacity="0.7" />
          <circle r="2" fill="#FFDF46" />
        </g>
        <g transform="translate(620,148)" opacity="0.7">
          <circle r="9" fill="#5CA9E0" opacity="0.3" />
          <circle r="5" fill="#0580E3" opacity="0.6" />
        </g>
        <g transform="translate(800,110)" opacity="0.7">
          <circle r="11" fill="#FE569B" opacity="0.28" />
          <circle r="6" fill="#D2447F" opacity="0.6" />
          <circle r="2" fill="#FFDF46" />
        </g>

        {/* Leaves */}
        <path
          d="M120,60 Q90,52 70,60 Q90,68 120,60Z"
          fill="#7DC23D"
          opacity="0.5"
        />
        <path
          d="M880,60 Q910,52 930,60 Q910,68 880,60Z"
          fill="#18C5B4"
          opacity="0.5"
        />
        <path
          d="M280,135 Q260,122 245,128"
          stroke="#5BA02F"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
        <path
          d="M720,135 Q740,122 755,128"
          stroke="#5BA02F"
          strokeWidth="0.8"
          fill="none"
          opacity="0.4"
        />
      </svg>

      {/* LEFT trailing sprig with parallax */}
      <svg
        ref={sprigLeftRef}
        className={`${styles.sprig} ${styles.sprigLeft}`}
        viewBox="0 0 140 480"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M70,470 Q60,350 75,240 Q55,150 68,60"
          stroke="rgba(91,160,47,0.55)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M72,430 Q44,408 24,392"
          stroke="rgba(91,160,47,0.4)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M24,392 Q34,372 52,382 Q40,402 24,392Z"
          fill="#7DC23D"
          opacity="0.62"
        />
        <g transform="translate(20,310)">
          <circle r="13" fill="#FE569B" opacity="0.25" />
          <circle r="8" fill="#FE569B" opacity="0.5" />
          <circle r="4" fill="#D2447F" opacity="0.8" />
          <circle r="2" fill="#FFDF46" />
        </g>
        <path
          d="M70,250 Q92,230 108,212"
          stroke="rgba(91,160,47,0.4)"
          strokeWidth="1"
          fill="none"
        />
        <g transform="translate(108,212)">
          <circle r="11" fill="#9991E7" opacity="0.3" />
          <circle r="6" fill="#A765CC" opacity="0.65" />
          <circle r="2" fill="#FFDF46" />
        </g>
        <path
          d="M68,180 Q46,168 28,150"
          stroke="rgba(91,160,47,0.3)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M28,150 Q40,134 56,144 Q44,160 28,150Z"
          fill="#18C5B4"
          opacity="0.55"
        />
        <g transform="translate(76,100)">
          <ellipse
            rx="9"
            ry="5"
            fill="#FE803D"
            opacity="0.4"
            transform="rotate(0)"
          />
          <ellipse
            rx="9"
            ry="5"
            fill="#FE803D"
            opacity="0.4"
            transform="rotate(60)"
          />
          <ellipse
            rx="9"
            ry="5"
            fill="#FE803D"
            opacity="0.4"
            transform="rotate(120)"
          />
          <circle r="3" fill="#F67E00" opacity="0.85" />
        </g>
      </svg>

      {/* RIGHT trailing sprig — mirrored */}
      <svg
        ref={sprigRightRef}
        className={`${styles.sprig} ${styles.sprigRight}`}
        viewBox="0 0 140 480"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M70,470 Q60,350 75,240 Q55,150 68,60"
          stroke="rgba(91,160,47,0.55)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M72,430 Q44,408 24,392"
          stroke="rgba(91,160,47,0.4)"
          strokeWidth="1"
          fill="none"
        />
        <path
          d="M24,392 Q34,372 52,382 Q40,402 24,392Z"
          fill="#7DC23D"
          opacity="0.62"
        />
        <g transform="translate(22,330)">
          <ellipse
            rx="9"
            ry="5"
            fill="#FFDF46"
            opacity="0.5"
            transform="rotate(0)"
          />
          <ellipse
            rx="9"
            ry="5"
            fill="#FFDF46"
            opacity="0.5"
            transform="rotate(45)"
          />
          <ellipse
            rx="9"
            ry="5"
            fill="#FFDF46"
            opacity="0.5"
            transform="rotate(90)"
          />
          <ellipse
            rx="9"
            ry="5"
            fill="#FFDF46"
            opacity="0.5"
            transform="rotate(135)"
          />
          <circle r="4" fill="#FEC135" />
          <circle r="1.5" fill="#F67E00" />
        </g>
        <path
          d="M70,250 Q92,230 108,212"
          stroke="rgba(91,160,47,0.4)"
          strokeWidth="1"
          fill="none"
        />
        <g transform="translate(108,212)">
          <circle r="11" fill="#5CA9E0" opacity="0.32" />
          <circle r="6" fill="#0580E3" opacity="0.6" />
          <circle r="2" fill="#FFDF46" />
        </g>
        <path
          d="M68,180 Q46,168 28,150"
          stroke="rgba(91,160,47,0.3)"
          strokeWidth="0.9"
          fill="none"
        />
        <path
          d="M28,150 Q40,134 56,144 Q44,160 28,150Z"
          fill="#18C5B4"
          opacity="0.55"
        />
        <g transform="translate(76,100)">
          <circle r="11" fill="#A765CC" opacity="0.3" />
          <circle r="6" fill="#9991E7" opacity="0.6" />
          <circle r="2" fill="#FFDF46" />
        </g>
      </svg>

      <div className={styles.content}>
        <h1 className={styles.names}>
          <span className={styles.firstName}>Rahan</span>
          <span className={styles.ampersand} aria-hidden="true">
            <svg viewBox="0 0 80 60" xmlns="http://www.w3.org/2000/svg">
              <text
                x="40"
                y="50"
                textAnchor="middle"
                className={styles.ampGlyph}
              >
                &amp;
              </text>
            </svg>
          </span>
          <span className={styles.secondName}>Jazmine</span>
        </h1>

        <p className={styles.invitedLine}>
          <span /> invite you to celebrate <span />
        </p>

        <div className={styles.dateLine}>
          <span className={styles.dateMonth}>July</span>
          <span className={styles.dateNumber}>21</span>
          <span className={styles.dateYear}>2026</span>
        </div>

        <p className={styles.venue}>Citystate Asturias Hotel Palawan</p>
      </div>

      <a href="#welcome" className={styles.scrollCta} aria-label="Scroll down">
        <span className={styles.scrollLabel}>scroll to begin</span>
        <span className={styles.scrollArrow} aria-hidden="true">
          <svg viewBox="0 0 12 22" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6,1 L6,18 M2,14 L6,20 L10,14"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </a>
    </section>
  );
}
