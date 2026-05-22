"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./EnvelopeOverlay.module.css";

interface Props {
  onOpen: () => void;
}

export default function EnvelopeOverlay({ onOpen }: Props) {
  const [visible, setVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleOpen = () => {
    if (opening) return;

    const v = videoRef.current;
    if (v && v.paused) v.play().catch(() => {});

    // Phase 1: seal fades, flap lifts open (0–1100ms)
    setOpening(true);

    // Phase 2: envelope drifts up and fades; page reveals behind (1200ms)
    setTimeout(() => {
      setExiting(true);
      onOpen();
    }, 1200);

    // Phase 3: overlay removed
    setTimeout(() => {
      setVisible(false);
    }, 2100);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play()
      .then(() => setVideoReady(true))
      .catch(() => {});
  }, []);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  if (!visible) return null;

  const overlayClasses = [
    styles.overlay,
    opening ? styles.opening : "",
    exiting ? styles.exiting : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className={overlayClasses}
      onClick={handleOpen}
      role="button"
      aria-label="Open invitation"
    >
      {!videoReady && (
        <img
          src="/videos/floral-frame-poster.jpg"
          alt=""
          className={styles.bgPoster}
          aria-hidden="true"
        />
      )}

      <video
        ref={videoRef}
        className={styles.bgVideo}
        style={{ opacity: videoReady ? 0.22 : 0 }}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster=""
        disablePictureInPicture
        controls={false}
      >
        <source src="/videos/floral-frame.mp4" type="video/mp4" />
      </video>

      <div className={styles.content}>
        <p className={styles.youAreInvited}>You are cordially invited to</p>

        <div className={styles.envelopeWrap}>
          <svg
            className={styles.envelopeSvg}
            viewBox="0 0 240 170"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff5f9" />
                <stop offset="100%" stopColor="#ffe0ed" />
              </linearGradient>
              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff0f6" />
                <stop offset="100%" stopColor="#ffd0e3" />
              </linearGradient>
              <filter
                id="paperShadow"
                x="-10%"
                y="-10%"
                width="120%"
                height="130%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="9"
                  floodColor="#D2447F"
                  floodOpacity="0.16"
                />
              </filter>
            </defs>

            {/* Envelope body */}
            <rect
              x="8"
              y="24"
              width="224"
              height="140"
              rx="6"
              fill="url(#envBody)"
              filter="url(#paperShadow)"
            />

            {/* Letterpress inner border */}
            <rect
              x="14"
              y="30"
              width="212"
              height="128"
              rx="3"
              fill="none"
              stroke="rgba(210,68,127,0.2)"
              strokeWidth="0.5"
            />

            {/* Side fold creases converging at center */}
            <path
              d="M8,30 L120,100 L232,30"
              stroke="rgba(210,68,127,0.18)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M8,158 L120,100 L232,158"
              stroke="rgba(210,68,127,0.18)"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Botanical accents — full palette, on body only */}
            <g opacity="0.72">
              <path d="M26,42 Q32,36 38,42 Q32,48 26,42Z" fill="#7DC23D" />
              <path
                d="M38,42 Q42,38 46,42"
                stroke="#5a9a2e"
                strokeWidth="0.5"
                fill="none"
              />
              <path d="M202,42 Q208,36 214,42 Q208,48 202,42Z" fill="#18C5B4" />
              <path
                d="M194,42 Q198,38 202,42"
                stroke="#0e9a8c"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
            <g>
              <circle cx="46" cy="62" r="3" fill="#FFDF46" opacity="0.55" />
              <circle cx="46" cy="62" r="1.3" fill="#FEC135" opacity="0.85" />
              <circle cx="194" cy="62" r="3" fill="#9991E7" opacity="0.55" />
              <circle cx="194" cy="62" r="1.3" fill="#A765CC" opacity="0.85" />
              <circle cx="30" cy="148" r="2.5" fill="#5CA9E0" opacity="0.5" />
              <circle cx="30" cy="148" r="1.1" fill="#0580E3" opacity="0.85" />
              <circle cx="210" cy="148" r="2.5" fill="#FE803D" opacity="0.5" />
              <circle cx="210" cy="148" r="1.1" fill="#F67E00" opacity="0.85" />
            </g>

            {/* === TOP FLAP — animates open === */}
            <g className={styles.envelopeFlap}>
              <path
                d="M8,30 Q8,24 14,24 L226,24 Q232,24 232,30 L120,104 L8,30 Z"
                fill="url(#envFlap)"
                stroke="rgba(210,68,127,0.25)"
                strokeWidth="0.5"
              />
            </g>

            {/* === WAX SEAL — separate group; flat 2D; fades on open === */}
            <g className={styles.envelopeSeal}>
              <circle cx="120" cy="96" r="22" fill="#FE569B" />
              <circle cx="120" cy="96" r="18" fill="#D2447F" />
              <circle
                cx="120"
                cy="96"
                r="18"
                fill="none"
                stroke="rgba(255,240,245,0.5)"
                strokeWidth="0.5"
                strokeDasharray="1 2"
              />

              {/*
                Monogram placeholder — swap in your monogram paths here.
                Center on (120, 96). Inner usable area ~36px (radius 18).
                Use fill="#fff5f9" for contrast against the wax.
              */}
              <g className={styles.sealMonogram}>
                <text
                  x="120"
                  y="101"
                  textAnchor="middle"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                  fontStyle="italic"
                  fontSize="14"
                  fill="#fff5f9"
                  letterSpacing="0.5"
                >
                  R&amp;J
                </text>
              </g>
            </g>
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