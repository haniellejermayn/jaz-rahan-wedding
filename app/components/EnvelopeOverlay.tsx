"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./EnvelopeOverlay.module.css";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeOverlay({ onOpen }: Props) {
  const [visible, setVisible] = useState(true);
  const [closing, setClosing] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    const v = videoRef.current;
    if (v && v.paused) v.play().catch(() => {});

    setClosing(true);
    setTimeout(() => {
      setVisible(false);
      onOpen();
    }, 900);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {}); // works on desktop/android, silently fails on iOS
  }, []);

  // On desktop/android, autoplay works fine — try immediately
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    v.play()
      .then(() => setVideoReady(true))
      .catch(() => {
        // Autoplay blocked (iOS) — video stays opacity:0 until tap
        // handleOpen will start it on first user gesture
      });
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${closing ? styles.closing : ""}`}
      onClick={handleOpen}
      role="button"
      aria-label="Open invitation"
    >
      <video
        ref={videoRef}
        className={styles.bgVideo} // always opacity: 0.22, no conditional class
        src="/videos/floral-frame.mp4"
        loop
        muted
        playsInline
        preload="auto"
        disablePictureInPicture
        onPlaying={() => {}}
      />
      {/* Sits exactly over the video, blocks the native play button from being tappable
        but is itself transparent so the video shows through visually */}
      <div className={styles.videoBlocker} aria-hidden="true" />
      <div className={styles.tint} />

      <div className={styles.content}>
        <p className={styles.youAreInvited}>You are cordially invited to</p>

        <div className={styles.envelopeWrap}>
          <svg
            className={styles.envelopeSvg}
            viewBox="0 0 240 160"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <filter
                id="paperShadow"
                x="-10%"
                y="-10%"
                width="120%"
                height="130%"
              >
                <feDropShadow
                  dx="0"
                  dy="8"
                  stdDeviation="12"
                  floodColor="#D2447F"
                  floodOpacity="0.18"
                />
              </filter>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff5f9" />
                <stop offset="100%" stopColor="#ffe8f1" />
              </linearGradient>
              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff0f6" />
                <stop offset="100%" stopColor="#ffd8e8" />
              </linearGradient>
            </defs>

            {/* Envelope body */}
            <rect
              x="8"
              y="45"
              width="224"
              height="110"
              rx="4"
              fill="url(#envBody)"
              filter="url(#paperShadow)"
            />
            {/* Inner border (letterpress) */}
            <rect
              x="14"
              y="51"
              width="212"
              height="98"
              rx="2"
              fill="none"
              stroke="rgba(210,68,127,0.2)"
              strokeWidth="0.5"
            />
            {/* Flap */}
            <path
              d="M8,49 L120,108 L232,49 L232,45 Q232,41 228,41 L12,41 Q8,41 8,45Z"
              fill="url(#envFlap)"
            />
            {/* Side folds */}
            <path
              d="M8,155 L90,100"
              stroke="rgba(210,68,127,0.2)"
              strokeWidth="0.8"
              fill="none"
            />
            <path
              d="M232,155 L150,100"
              stroke="rgba(210,68,127,0.2)"
              strokeWidth="0.8"
              fill="none"
            />

            {/* Wax seal with layered glow */}
            <circle cx="120" cy="100" r="24" fill="#FE569B" opacity="0.25" />
            <circle cx="120" cy="100" r="20" fill="#FE569B" opacity="0.95" />
            <circle cx="120" cy="100" r="17" fill="#D2447F" />
            <circle
              cx="120"
              cy="100"
              r="17"
              fill="none"
              stroke="rgba(255, 240, 245, 0.4)"
              strokeWidth="0.6"
              strokeDasharray="1 2"
            />
            <text
              x="120"
              y="106"
              textAnchor="middle"
              fontFamily="Georgia, serif"
              fontSize="13"
              fontStyle="italic"
              fill="#fff0f5"
            >
              R&amp;J
            </text>

            {/* Ribbon flourish */}
            <path
              d="M100,41 Q120,24 140,41"
              stroke="#FE569B"
              strokeWidth="1.4"
              fill="none"
              opacity="0.85"
            />

            {/* Leaf sprigs */}
            <path
              d="M28,58 Q36,48 44,58 Q36,68 28,58Z"
              fill="#7DC23D"
              opacity="0.6"
            />
            <path
              d="M196,58 Q204,48 212,58 Q204,68 196,58Z"
              fill="#18C5B4"
              opacity="0.6"
            />

            {/* Tiny petals on envelope */}
            <circle cx="55" cy="75" r="4.5" fill="#FFDF46" opacity="0.5" />
            <circle cx="55" cy="75" r="2" fill="#FEC135" opacity="0.8" />

            <circle cx="185" cy="75" r="4.5" fill="#9991E7" opacity="0.5" />
            <circle cx="185" cy="75" r="2" fill="#A765CC" opacity="0.8" />

            <circle cx="40" cy="128" r="3.5" fill="#5CA9E0" opacity="0.45" />
            <circle cx="40" cy="128" r="1.5" fill="#0580E3" opacity="0.8" />

            <circle cx="200" cy="128" r="3.5" fill="#FE803D" opacity="0.45" />
            <circle cx="200" cy="128" r="1.5" fill="#F67E00" opacity="0.8" />
          </svg>
        </div>

        <div className={styles.namesWrap}>
          <span className={styles.namesRule} />
          <p className={styles.names}>
            Rahan <span className={styles.ampersand}>&amp;</span> Jaz
          </p>
          <span className={styles.namesRule} />
        </div>

        <p className={styles.date}>Tuesday · July 21 · 2026</p>

        <span className={styles.tapPrompt}>
          <span className={styles.tapLine} />
          tap to open
          <span className={styles.tapLine} />
        </span>
      </div>
    </div>
  );
}
