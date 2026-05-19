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
      {/* Botanical left */}
      <svg ref={leftRef} className={`${styles.botanical} ${styles.botanicalLeft}`}
        viewBox="0 0 120 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60,490 Q55,380 65,280 Q50,220 60,100" stroke="#aecfb8" strokeWidth="1.5" fill="none" opacity="0.45"/>
        <path d="M60,420 Q25,390 10,355" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.4"/>
        <path d="M10,355 Q18,335 32,345 Q22,360 10,355Z" fill="#527a60" opacity="0.55"/>
        <path d="M60,360 Q95,330 108,300" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.4"/>
        <path d="M108,300 Q100,280 86,290 Q94,305 108,300Z" fill="#527a60" opacity="0.55"/>
        <path d="M60,290 Q28,260 18,228" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.35"/>
        <path d="M18,228 Q26,210 40,220 Q30,234 18,228Z" fill="#355c44" opacity="0.5"/>
        <path d="M60,230 Q88,205 100,175" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.35"/>
        <path d="M100,175 Q92,158 79,168 Q88,182 100,175Z" fill="#355c44" opacity="0.5"/>
        <path d="M60,170 Q32,148 24,118" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.25"/>
        <path d="M24,118 Q32,100 44,112 Q36,124 24,118Z" fill="#243d2e" opacity="0.5"/>
        <circle cx="60" cy="100" r="4" fill="#b8963e" opacity="0.4"/>
        <circle cx="10"  cy="355" r="3" fill="#b8963e" opacity="0.3"/>
        <circle cx="108" cy="300" r="3" fill="#b8963e" opacity="0.3"/>
      </svg>

      {/* Botanical right (mirror via CSS) */}
      <svg ref={rightRef} className={`${styles.botanical} ${styles.botanicalRight}`}
        viewBox="0 0 120 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M60,490 Q55,380 65,280 Q50,220 60,100" stroke="#aecfb8" strokeWidth="1.5" fill="none" opacity="0.45"/>
        <path d="M60,420 Q25,390 10,355" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.4"/>
        <path d="M10,355 Q18,335 32,345 Q22,360 10,355Z" fill="#527a60" opacity="0.55"/>
        <path d="M60,360 Q95,330 108,300" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.4"/>
        <path d="M108,300 Q100,280 86,290 Q94,305 108,300Z" fill="#527a60" opacity="0.55"/>
        <path d="M60,290 Q28,260 18,228" stroke="#aecfb8" strokeWidth="1.2" fill="none" opacity="0.35"/>
        <path d="M18,228 Q26,210 40,220 Q30,234 18,228Z" fill="#355c44" opacity="0.5"/>
        <circle cx="60" cy="100" r="4" fill="#b8963e" opacity="0.4"/>
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
            <path d="M5,0 L6,3.8 L10,5 L6,6.2 L5,10 L4,6.2 L0,5 L4,3.8Z" fill="#b8963e" opacity="0.65"/>
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
