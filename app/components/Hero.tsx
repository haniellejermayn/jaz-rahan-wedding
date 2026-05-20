"use client";
import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const leftRef  = useRef<SVGSVGElement>(null);
  const rightRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY * 0.18;
      if (leftRef.current)  leftRef.current.style.transform  = `translateY(${y}px)`;
      if (rightRef.current) rightRef.current.style.transform = `scaleX(-1) translateY(${y}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      {/* LEFT botanical — lush, multi-colour flowers */}
      <svg ref={leftRef} className={`${styles.botanical} ${styles.botanicalLeft}`}
        viewBox="0 0 130 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        {/* Main stem */}
        <path d="M65,520 Q60,400 68,290 Q55,220 62,90" stroke="rgba(125,194,61,0.5)" strokeWidth="2" fill="none"/>
        {/* Rose flower ~380 */}
        <path d="M62,380 Q38,360 22,340" stroke="rgba(125,194,61,0.4)" strokeWidth="1.2" fill="none"/>
        <circle cx="22" cy="340" r="14" fill="#FE569B" opacity="0.22"/>
        <circle cx="22" cy="340" r="10" fill="#FE569B" opacity="0.28"/>
        <circle cx="22" cy="340" r="6"  fill="#D2447F" opacity="0.5"/>
        <circle cx="22" cy="340" r="3"  fill="#FFDF46" opacity="0.8"/>
        {/* Violet blossom ~300 */}
        <path d="M66,300 Q92,278 106,255" stroke="rgba(125,194,61,0.4)" strokeWidth="1.2" fill="none"/>
        <circle cx="106" cy="255" r="12" fill="#9991E7" opacity="0.22"/>
        <circle cx="106" cy="255" r="8"  fill="#9991E7" opacity="0.3"/>
        <circle cx="106" cy="255" r="4"  fill="#A765CC" opacity="0.55"/>
        <circle cx="106" cy="255" r="2"  fill="#FFDF46" opacity="0.9"/>
        {/* Leaf left ~440 */}
        <path d="M63,440 Q35,420 18,400" stroke="rgba(125,194,61,0.4)" strokeWidth="1" fill="none"/>
        <path d="M18,400 Q30,382 46,395 Q32,412 18,400Z" fill="#7DC23D" opacity="0.55"/>
        {/* Leaf right ~220 */}
        <path d="M64,220 Q90,205 102,188" stroke="rgba(125,194,61,0.4)" strokeWidth="1" fill="none"/>
        <path d="M102,188 Q90,172 76,182 Q88,196 102,188Z" fill="#18C5B4" opacity="0.5"/>
        {/* Sky blossom ~165 */}
        <path d="M63,165 Q38,150 24,132" stroke="rgba(125,194,61,0.3)" strokeWidth="1" fill="none"/>
        <circle cx="24" cy="132" r="10" fill="#5CA9E0" opacity="0.22"/>
        <circle cx="24" cy="132" r="7"  fill="#5CA9E0" opacity="0.3"/>
        <circle cx="24" cy="132" r="3"  fill="#0580E3" opacity="0.55"/>
        <circle cx="24" cy="132" r="1.5" fill="#FFDF46" opacity="0.9"/>
        {/* Tangerine bud */}
        <path d="M63,490 Q42,475 28,460" stroke="rgba(125,194,61,0.3)" strokeWidth="1" fill="none"/>
        <circle cx="28" cy="460" r="8"  fill="#FE803D" opacity="0.25"/>
        <circle cx="28" cy="460" r="5"  fill="#FE803D" opacity="0.4"/>
        <circle cx="28" cy="460" r="2.5" fill="#F67E00" opacity="0.7"/>
      </svg>

      {/* RIGHT botanical (mirrored by CSS scaleX) */}
      <svg ref={rightRef} className={`${styles.botanical} ${styles.botanicalRight}`}
        viewBox="0 0 130 520" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M65,520 Q60,400 68,290 Q55,220 62,90" stroke="rgba(125,194,61,0.5)" strokeWidth="2" fill="none"/>
        {/* Yellow sunflower ~360 */}
        <path d="M62,360 Q38,342 20,322" stroke="rgba(125,194,61,0.4)" strokeWidth="1.2" fill="none"/>
        <circle cx="20" cy="322" r="14" fill="#FFDF46" opacity="0.25"/>
        <circle cx="20" cy="322" r="10" fill="#FFDF46" opacity="0.32"/>
        <circle cx="20" cy="322" r="6"  fill="#FEC135" opacity="0.55"/>
        <circle cx="20" cy="322" r="3"  fill="#F67E00" opacity="0.8"/>
        {/* Leaf pair ~420 */}
        <path d="M63,420 Q40,402 22,388" stroke="rgba(125,194,61,0.4)" strokeWidth="1" fill="none"/>
        <path d="M22,388 Q34,370 50,382 Q36,398 22,388Z" fill="#7DC23D" opacity="0.5"/>
        {/* Teal cluster ~270 */}
        <path d="M65,270 Q91,252 106,232" stroke="rgba(125,194,61,0.4)" strokeWidth="1.2" fill="none"/>
        <circle cx="106" cy="232" r="11" fill="#18C5B4" opacity="0.22"/>
        <circle cx="106" cy="232" r="7"  fill="#18C5B4" opacity="0.32"/>
        <circle cx="106" cy="232" r="3.5" fill="#0580E3" opacity="0.55"/>
        <circle cx="106" cy="232" r="1.5" fill="#FFDF46" opacity="0.9"/>
        {/* Plum blossom ~155 */}
        <path d="M63,155 Q40,138 26,118" stroke="rgba(125,194,61,0.3)" strokeWidth="1" fill="none"/>
        <circle cx="26" cy="118" r="10" fill="#A765CC" opacity="0.22"/>
        <circle cx="26" cy="118" r="7"  fill="#A765CC" opacity="0.3"/>
        <circle cx="26" cy="118" r="3"  fill="#D2447F" opacity="0.55"/>
        <circle cx="26" cy="118" r="1.5" fill="#FFDF46" opacity="0.9"/>
      </svg>

      <div className={styles.content}>
        <p className={styles.prelude}>We are getting married</p>
        <h1 className={styles.names}>
          Jaz
          <span className={styles.ampersand}>&amp;</span>
          Rahan
        </h1>
        <div className={styles.heroDivider}>
          <span className={styles.dividerLine} />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M5,0 L6,3.8 L10,5 L6,6.2 L5,10 L4,6.2 L0,5 L4,3.8Z" fill="#FE569B" opacity="0.8"/>
          </svg>
          <span className={styles.dividerLine} />
        </div>
        <p className={styles.date}>Tuesday · July 21 · 2026</p>
        <p className={styles.venue}>Venue Placeholder · Philippines</p>
        <a href="#welcome" className={styles.scrollCta} aria-label="Scroll down">
          <span className={styles.scrollLabel}>scroll</span>
          <span className={styles.scrollArrow}>↓</span>
        </a>
      </div>
    </section>
  );
}
