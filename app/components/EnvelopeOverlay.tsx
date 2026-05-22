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

    // Phase 1 — seal breaks, flap opens, card emerges (0–800ms)
    setOpening(true);

    // Phase 2 — start crossfade: page fades in while overlay fades out (800ms)
    setTimeout(() => {
      onOpen();
      setExiting(true);
    }, 800);

    // Phase 3 — unmount overlay after crossfade completes (1700ms)
    setTimeout(() => {
      setVisible(false);
    }, 1700);
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
            viewBox="0 0 280 200"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff8fb" />
                <stop offset="55%" stopColor="#ffeaf3" />
                <stop offset="100%" stopColor="#ffd2e3" />
              </linearGradient>

              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff3f8" />
                <stop offset="100%" stopColor="#ffc8dd" />
              </linearGradient>

              <linearGradient id="envLiner" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7c5d8" />
                <stop offset="100%" stopColor="#eaa5c0" />
              </linearGradient>

              <linearGradient id="cardGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffefb" />
                <stop offset="100%" stopColor="#fdf3e8" />
              </linearGradient>

              <radialGradient id="sealGrad" cx="0.36" cy="0.32" r="0.7">
                <stop offset="0%" stopColor="#ff8fb9" />
                <stop offset="55%" stopColor="#FE569B" />
                <stop offset="100%" stopColor="#A82A65" />
              </radialGradient>

              <filter
                id="paperShadow"
                x="-20%"
                y="-20%"
                width="140%"
                height="140%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="8"
                  floodColor="#7a1f4a"
                  floodOpacity="0.14"
                />
              </filter>

              <filter
                id="sealGlow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>

            {/* === Envelope body (back panel) === */}
            <g filter="url(#paperShadow)">
              <rect
                x="20"
                y="24"
                width="240"
                height="160"
                rx="8"
                ry="8"
                fill="url(#envBody)"
              />
              {/* Inner liner strip — peeks at the envelope opening */}
              <path
                d="M20,32 L20,52 L260,52 L260,32 Z"
                fill="url(#envLiner)"
                opacity="0.45"
              />
              {/* Subtle letterpress border */}
              <rect
                x="26"
                y="30"
                width="228"
                height="148"
                rx="4"
                ry="4"
                fill="none"
                stroke="rgba(180,50,100,0.13)"
                strokeWidth="0.5"
              />
            </g>

            {/* === Card hidden inside envelope (emerges on open) === */}
            <g className={styles.envelopeCard}>
              <rect
                x="40"
                y="52"
                width="200"
                height="110"
                rx="2"
                fill="url(#cardGrad)"
                stroke="rgba(180,50,100,0.15)"
                strokeWidth="0.4"
              />
              <rect
                x="46"
                y="58"
                width="188"
                height="98"
                rx="1"
                fill="none"
                stroke="rgba(180,50,100,0.22)"
                strokeWidth="0.4"
              />
              <text
                x="140"
                y="100"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontStyle="italic"
                fontSize="12"
                fill="#a04075"
                opacity="0.75"
              >
                Rahan &amp; Jaz
              </text>
              <line
                x1="105"
                y1="110"
                x2="175"
                y2="110"
                stroke="rgba(180,50,100,0.3)"
                strokeWidth="0.4"
              />
              <text
                x="140"
                y="124"
                textAnchor="middle"
                fontFamily="Jost, sans-serif"
                fontSize="6"
                fill="#a04075"
                opacity="0.65"
                letterSpacing="1.6"
              >
                JULY · 21 · 2026
              </text>
            </g>

            {/* === Bottom V-crease (anchors the seal point visually) === */}
            <path
              d="M22,180 L140,110 L258,180"
              stroke="rgba(180,50,100,0.18)"
              strokeWidth="0.7"
              fill="none"
              strokeLinejoin="round"
            />

            {/* === Decorative botanicals on envelope body === */}
            <g opacity="0.75">
              <path
                d="M38,140 Q44,134 50,140 Q44,146 38,140Z"
                fill="#7DC23D"
              />
              <path
                d="M48,144 Q53,141 58,144"
                stroke="#5a9a2e"
                strokeWidth="0.5"
                fill="none"
              />
              <path
                d="M230,140 Q236,134 242,140 Q236,146 230,140Z"
                fill="#18C5B4"
              />
              <path
                d="M222,144 Q227,141 232,144"
                stroke="#0e9a8c"
                strokeWidth="0.5"
                fill="none"
              />
            </g>
            <g>
              <circle cx="58" cy="160" r="3" fill="#FFDF46" opacity="0.55" />
              <circle cx="58" cy="160" r="1.3" fill="#FEC135" opacity="0.85" />
              <circle cx="222" cy="160" r="3" fill="#9991E7" opacity="0.55" />
              <circle cx="222" cy="160" r="1.3" fill="#A765CC" opacity="0.85" />
              <circle cx="40" cy="170" r="2.4" fill="#5CA9E0" opacity="0.5" />
              <circle cx="240" cy="170" r="2.4" fill="#FE803D" opacity="0.5" />
            </g>

            {/* === Top flap (animates open) === */}
            <g className={styles.envelopeFlap}>
              <path
                d="
                  M20,32
                  Q20,24 28,24
                  L252,24
                  Q260,24 260,32
                  L260,38
                  Q260,42 257,44
                  L146,116
                  Q140,120 134,116
                  L23,44
                  Q20,42 20,38
                  Z"
                fill="url(#envFlap)"
                stroke="rgba(180,50,100,0.2)"
                strokeWidth="0.6"
                filter="url(#paperShadow)"
              />
              {/* Inner border on flap */}
              <path
                d="M28,30 L252,30 L252,38 L141,114 L28,38 Z"
                fill="none"
                stroke="rgba(180,50,100,0.1)"
                strokeWidth="0.4"
              />
              {/* Top-edge highlight — paper-fold sheen */}
              <path
                d="M30,26 L250,26"
                stroke="rgba(255,255,255,0.45)"
                strokeWidth="0.8"
                fill="none"
              />
              {/* Botanical flourishes on flap shoulders */}
              <g opacity="0.7">
                <path
                  d="M36,46 Q42,40 48,46 Q42,52 36,46Z"
                  fill="#7DC23D"
                />
                <circle cx="50" cy="54" r="1.8" fill="#FEC135" opacity="0.7" />
                <path
                  d="M232,46 Q238,40 244,46 Q238,52 232,46Z"
                  fill="#18C5B4"
                />
                <circle cx="230" cy="54" r="1.8" fill="#A765CC" opacity="0.7" />
              </g>
              {/* Delicate ribbon flourish */}
              <path
                d="M114,30 Q140,18 166,30"
                stroke="#FE569B"
                strokeWidth="1.2"
                fill="none"
                opacity="0.65"
                strokeLinecap="round"
              />
            </g>

            {/* === WAX SEAL (separate group; fades independently) === */}
            <g className={styles.envelopeSeal}>
              <circle
                cx="140"
                cy="98"
                r="32"
                fill="#FE569B"
                opacity="0.18"
                filter="url(#sealGlow)"
              />
              <ellipse
                cx="140"
                cy="100"
                rx="26"
                ry="25"
                fill="rgba(120,30,70,0.3)"
              />
              <circle cx="140" cy="98" r="25" fill="url(#sealGrad)" />
              <circle
                cx="140"
                cy="98"
                r="25"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="1.8 2.4"
              />
              <circle
                cx="140"
                cy="98"
                r="19"
                fill="none"
                stroke="rgba(255,255,255,0.32)"
                strokeWidth="0.5"
              />
              <ellipse
                cx="132"
                cy="90"
                rx="8"
                ry="5"
                fill="rgba(255,255,255,0.2)"
              />

              {/*
                ⤵  MONOGRAM PLACEHOLDER
                Replace this <g> with your monogram SVG when ready.
                Center on (140, 98), recommended ~30×26px,
                fill cream/white (#fff5f9) for contrast against the wax.
              */}
              <g className={styles.sealMonogram}>
                <text
                  x="140"
                  y="105"
                  textAnchor="middle"
                  fontFamily="Pinyon Script, Georgia, serif"
                  fontStyle="italic"
                  fontSize="22"
                  fill="#fff5f9"
                  letterSpacing="-1"
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