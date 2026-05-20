"use client";
import { useState, useEffect } from "react";
import styles from "./EnvelopeOverlay.module.css";

interface Props { onOpen: () => void; }

export default function EnvelopeOverlay({ onOpen }: Props) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);
    setTimeout(() => { setVisible(false); onOpen(); }, 900);
  };

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ""}`}
      onClick={handleOpen}
      role="button"
      aria-label="Open invitation"
    >
      <video className={styles.bgVideo} src="/videos/floral-frame.mp4" autoPlay loop muted playsInline />
      <div className={styles.tint} />

      <div className={styles.content}>
        <div className={styles.envelopeWrap}>
          <svg className={styles.envelopeSvg} viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#D2447F" floodOpacity="0.15" />
              </filter>
            </defs>
            {/* Envelope body */}
            <rect x="8" y="45" width="224" height="110" rx="4" fill="#fff0f5" filter="url(#paperShadow)" />
            {/* Flap */}
            <path d="M8,49 L120,108 L232,49 L232,45 Q232,41 228,41 L12,41 Q8,41 8,45Z" fill="#ffe0ec" />
            {/* Side folds */}
            <path d="M8,155 L90,100" stroke="rgba(210,68,127,0.2)" strokeWidth="0.8" fill="none" />
            <path d="M232,155 L150,100" stroke="rgba(210,68,127,0.2)" strokeWidth="0.8" fill="none" />
            {/* Wax seal — full-colour, no dark */}
            <circle cx="120" cy="100" r="20" fill="#FE569B" opacity="0.9"/>
            <circle cx="120" cy="100" r="16" fill="#D2447F"/>
            <text x="120" y="105" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#fff0f5" fontStyle="italic">J&amp;R</text>
            {/* Ribbon */}
            <path d="M106,41 Q120,28 134,41" stroke="#FE569B" strokeWidth="1.2" fill="none" />
            {/* Leaf sprigs */}
            <path d="M30,58 Q36,50 42,58 Q36,66 30,58Z" fill="#7DC23D" opacity="0.5" />
            <path d="M198,58 Q204,50 210,58 Q204,66 198,58Z" fill="#18C5B4" opacity="0.5" />
            {/* Tiny petals on envelope */}
            <circle cx="55" cy="75" r="4" fill="#FFDF46" opacity="0.35"/>
            <circle cx="185" cy="75" r="4" fill="#9991E7" opacity="0.35"/>
            <circle cx="40" cy="125" r="3" fill="#5CA9E0" opacity="0.3"/>
            <circle cx="200" cy="125" r="3" fill="#FE803D" opacity="0.3"/>
          </svg>
        </div>

        <p className={styles.youAreInvited}>You are Invited</p>
        <p className={styles.names}>Jaz &amp; Rahan</p>
        <p className={styles.date}>July 21 · 2026</p>

        <span className={styles.tapPrompt}>
          <span className={styles.tapLine} />
          tap to open
          <span className={styles.tapLine} />
        </span>
      </div>
    </div>
  );
}
