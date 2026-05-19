"use client";
import { useState, useEffect } from "react";
import styles from "./EnvelopeOverlay.module.css";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeOverlay({ onOpen }: Props) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);

  const handleOpen = () => {
    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      onOpen();
    }, 900);
  };

  useEffect(() => {
    // Prevent scroll while overlay is up
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
      {/* Floral frame video — full background */}
      <video
        className={styles.bgVideo}
        src="/videos/floral-frame.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark tint so text reads clearly */}
      <div className={styles.tint} />

      {/* Centered envelope illustration */}
      <div className={styles.content}>
        <div className={styles.envelopeWrap}>
          <svg
            className={styles.envelopeSvg}
            viewBox="0 0 240 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter id="paperShadow" x="-10%" y="-10%" width="120%" height="130%">
                <feDropShadow dx="0" dy="6" stdDeviation="10" floodColor="#000" floodOpacity="0.25" />
              </filter>
            </defs>
            {/* Envelope body */}
            <rect x="8" y="45" width="224" height="110" rx="4" fill="#f7f2e9" filter="url(#paperShadow)" />
            {/* Flap */}
            <path d="M8,49 L120,108 L232,49 L232,45 Q232,41 228,41 L12,41 Q8,41 8,45Z" fill="#ede5d4" />
            {/* Side folds */}
            <path d="M8,155 L90,100" stroke="#d8cdb8" strokeWidth="0.8" fill="none" />
            <path d="M232,155 L150,100" stroke="#d8cdb8" strokeWidth="0.8" fill="none" />
            {/* Wax seal */}
            <circle cx="120" cy="100" r="20" fill="#243d2e" />
            <circle cx="120" cy="100" r="16" fill="#355c44" />
            <text x="120" y="105" textAnchor="middle" fontFamily="Georgia, serif" fontSize="11" fill="#d4b870" fontStyle="italic">J&amp;R</text>
            {/* Ribbon hint */}
            <path d="M106,41 Q120,28 134,41" stroke="#b8963e" strokeWidth="1.2" fill="none" />
            {/* Tiny leaf sprigs */}
            <path d="M30,58 Q36,50 42,58 Q36,66 30,58Z" fill="#527a60" opacity="0.4" />
            <path d="M198,58 Q204,50 210,58 Q204,66 198,58Z" fill="#527a60" opacity="0.4" />
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
