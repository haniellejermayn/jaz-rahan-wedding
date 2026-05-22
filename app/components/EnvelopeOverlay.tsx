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

    // Phase 1 (0–1200ms): seal breaks, flap folds, card emerges
    setOpening(true);

    // Phase 2 (1200ms): card zooms forward, page begins fading in
    setTimeout(() => {
      setExiting(true);
      onOpen();
    }, 1200);

    // Phase 3 (2300ms): overlay removed
    setTimeout(() => {
      setVisible(false);
    }, 2300);
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

        <div className={styles.envelopeStage}>
          <svg
            className={styles.envelopeSvg}
            viewBox="0 0 280 220"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="envBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffafc" />
                <stop offset="55%" stopColor="#ffeaf3" />
                <stop offset="100%" stopColor="#fbcfe1" />
              </linearGradient>

              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff5fa" />
                <stop offset="100%" stopColor="#f9bcd5" />
              </linearGradient>

              <linearGradient id="envInside" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3a1226" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#5a1a3a" stopOpacity="0.18" />
              </linearGradient>

              <radialGradient id="sealGrad" cx="0.36" cy="0.32" r="0.7">
                <stop offset="0%" stopColor="#ff8fb9" />
                <stop offset="55%" stopColor="#FE569B" />
                <stop offset="100%" stopColor="#A82A65" />
              </radialGradient>

              <filter id="paperShadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="8"
                  floodColor="#7a1f4a"
                  floodOpacity="0.16"
                />
              </filter>

              <filter id="sealGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" />
              </filter>
            </defs>

            {/* Ambient pink halo */}
            <ellipse
              cx="140"
              cy="115"
              rx="155"
              ry="100"
              fill="#FE569B"
              opacity="0.08"
              filter="url(#sealGlow)"
            />

            {/* === Envelope body === */}
            <g filter="url(#paperShadow)">
              <rect
                x="20"
                y="30"
                width="240"
                height="170"
                rx="10"
                fill="url(#envBody)"
              />
            </g>

            {/* === Interior "well" (dark wedge visible when flap opens) === */}
            <path
              d="M28,38 L140,128 L252,38 L252,54 L142,144 L138,144 L28,54 Z"
              fill="url(#envInside)"
            />

            {/* === Subtle inner letterpress border === */}
            <rect
              x="28"
              y="38"
              width="224"
              height="154"
              rx="5"
              fill="none"
              stroke="rgba(180,50,100,0.16)"
              strokeWidth="0.5"
            />

            {/* === Bottom V-crease (anchors composition) === */}
            <path
              d="M28,192 L140,128 L252,192"
              stroke="rgba(180,50,100,0.22)"
              strokeWidth="0.7"
              fill="none"
              strokeLinejoin="round"
            />

            {/* === Botanical accents along bottom (full palette) === */}
            <g opacity="0.78">
              {/* Left sprig */}
              <path
                d="M42,160 Q48,154 54,160 Q48,166 42,160Z"
                fill="#7DC23D"
              />
              <path
                d="M54,160 Q60,156 66,160"
                stroke="#5a9a2e"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="38" cy="168" r="2.4" fill="#FEC135" />
              <circle cx="38" cy="168" r="1" fill="#F67E00" opacity="0.9" />
              <circle cx="62" cy="166" r="1.6" fill="#5CA9E0" />
              {/* Right sprig (mirrored, different colors) */}
              <path
                d="M226,160 Q232,154 238,160 Q232,166 226,160Z"
                fill="#18C5B4"
              />
              <path
                d="M214,160 Q220,156 226,160"
                stroke="#0e9a8c"
                strokeWidth="0.5"
                fill="none"
              />
              <circle cx="242" cy="168" r="2.4" fill="#9991E7" />
              <circle cx="242" cy="168" r="1" fill="#A765CC" opacity="0.9" />
              <circle cx="218" cy="166" r="1.6" fill="#FE803D" />
            </g>

            {/* === TOP FLAP — animates open via scaleY(0) === */}
            <g className={styles.envelopeFlap}>
              <path
                d="
                  M20,40
                  Q20,30 30,30
                  L250,30
                  Q260,30 260,40
                  L260,46
                  Q260,52 256,54
                  L146,126
                  Q140,130 134,126
                  L24,54
                  Q20,52 20,46
                  Z"
                fill="url(#envFlap)"
                stroke="rgba(180,50,100,0.28)"
                strokeWidth="0.6"
                filter="url(#paperShadow)"
              />

              {/* Inner letterpress border on flap */}
              <path
                d="M30,40 L250,40 L250,46 L141,124 L30,46 Z"
                fill="none"
                stroke="rgba(180,50,100,0.12)"
                strokeWidth="0.4"
              />

              {/* Top-edge paper sheen */}
              <path
                d="M32,33 L248,33"
                stroke="rgba(255,255,255,0.55)"
                strokeWidth="0.8"
                fill="none"
              />

              {/* Decorative ribbon arch at top */}
              <path
                d="M112,38 Q140,22 168,38"
                stroke="#D2447F"
                strokeWidth="1.2"
                fill="none"
                opacity="0.75"
                strokeLinecap="round"
              />

              {/* Floral accents on flap shoulders */}
              <g opacity="0.78">
                <path
                  d="M40,52 Q46,46 52,52 Q46,58 40,52Z"
                  fill="#7DC23D"
                />
                <circle cx="58" cy="60" r="1.8" fill="#FEC135" />
                <circle cx="34" cy="62" r="1.4" fill="#5CA9E0" />

                <path
                  d="M228,52 Q234,46 240,52 Q234,58 228,52Z"
                  fill="#18C5B4"
                />
                <circle cx="222" cy="60" r="1.8" fill="#A765CC" />
                <circle cx="246" cy="62" r="1.4" fill="#FE803D" />
              </g>
            </g>

            {/* === WAX SEAL — separate group; pulses and fades === */}
            <g className={styles.envelopeSeal}>
              {/* Soft outer halo */}
              <circle
                cx="140"
                cy="100"
                r="42"
                fill="#FE569B"
                opacity="0.25"
                filter="url(#sealGlow)"
              />

              {/* Cast shadow */}
              <ellipse
                cx="140"
                cy="103"
                rx="31"
                ry="30"
                fill="rgba(100,20,60,0.4)"
              />

              {/* Wax body with 3D radial gradient */}
              <circle cx="140" cy="100" r="30" fill="url(#sealGrad)" />

              {/* Scalloped wax rim */}
              <circle
                cx="140"
                cy="100"
                r="30"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
                strokeDasharray="2 2.5"
              />

              {/* Inner embossed ring */}
              <circle
                cx="140"
                cy="100"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.42)"
                strokeWidth="0.7"
              />

              {/* Glossy highlight (3D wax cue) */}
              <ellipse
                cx="129"
                cy="91"
                rx="9"
                ry="6"
                fill="rgba(255,255,255,0.28)"
              />

              {/*
                ⤵ MONOGRAM PLACEHOLDER
                Inner usable area is ~44px diameter (radius ≈ 22).
                Replace this <g> with your monogram paths when ready —
                center on (140, 100), fill="#fff5f9" for contrast.
              */}
              <g className={styles.sealMonogram}>
                <text
                  x="140"
                  y="115"
                  textAnchor="middle"
                  fontFamily="Pinyon Script, Georgia, serif"
                  fontStyle="italic"
                  fontSize="36"
                  fill="#fff5f9"
                  opacity="0.95"
                >
                  &amp;
                </text>
              </g>
            </g>
          </svg>

          {/* === The emerging card — HTML for flexible styling === */}
          <div className={styles.invitationCard} aria-hidden="true">
            <div className={styles.cardFrame}>
              <div className={styles.cardOrnament}>
                <span style={{ background: "#FFDF46" }} />
                <span style={{ background: "#FE569B" }} />
                <span style={{ background: "#7DC23D" }} />
              </div>
              <p className={styles.cardLabel}>save the date</p>
              <p className={styles.cardMonogram}>
                R<i>&amp;</i>J
              </p>
              <span className={styles.cardDivider} />
              <p className={styles.cardDateLine}>21 · 07 · 2026</p>
              <div className={styles.cardOrnament}>
                <span style={{ background: "#9991E7" }} />
                <span style={{ background: "#FE569B" }} />
                <span style={{ background: "#18C5B4" }} />
              </div>
            </div>
          </div>
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