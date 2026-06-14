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
                <stop offset="0%" stopColor="#fbf6ec" />
                <stop offset="100%" stopColor="#efe5d2" />
              </linearGradient>
              <linearGradient id="envFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f7f1e6" />
                <stop offset="100%" stopColor="#e5d9c1" />
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
                  floodColor="#2a2520"
                  floodOpacity="0.18"
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
              stroke="rgba(42,37,32,0.22)"
              strokeWidth="0.5"
            />

            {/* Side fold creases converging at center */}
            <path
              d="M8,30 L120,100 L232,30"
              stroke="rgba(42,37,32,0.18)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M8,158 L120,100 L232,158"
              stroke="rgba(42,37,32,0.18)"
              strokeWidth="0.5"
              fill="none"
            />

            {/* Botanical accents — small petals only, kept colorful */}
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
                stroke="rgba(42,37,32,0.28)"
                strokeWidth="0.5"
              />
            </g>

            {/* === WAX SEAL — champagne / antique gold === */}
            <g className={styles.envelopeSeal}>
              <circle cx="120" cy="96" r="22" fill="#d8c3a5" />
              <circle cx="120" cy="96" r="18" fill="#c5a98b" />
              <circle
                cx="120"
                cy="96"
                r="18"
                fill="none"
                stroke="rgba(247,241,230,0.65)"
                strokeWidth="0.5"
                strokeDasharray="1 2"
              />

              <g className={styles.sealMonogram}>
                <image
                  href="/RJ.png"
                  x="102"
                  y="82"
                  width="36"
                  height="28"
                  preserveAspectRatio="xMidYMid meet"
                  opacity="1"
                />
              </g>
            </g>
          </svg>
        </div>

        <div className={styles.namesWrap}>
          <span className={styles.namesRule} />
          <p className={styles.names}>
            <img
              src="/Rahan-Jazmine.png"
              alt="Rahan & Jazmine"
              className={styles.namesImg}
            />
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
