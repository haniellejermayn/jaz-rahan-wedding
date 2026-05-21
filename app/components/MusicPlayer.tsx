"use client";
import { useEffect, useRef, useState, useCallback, RefObject } from "react";
import styles from "./MusicPlayer.module.css";

interface Props {
  audioRef: RefObject<HTMLAudioElement | null>;
}

const fmt = (s: number) => {
  if (!s || isNaN(s) || !isFinite(s)) return "—:——";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

export default function MusicPlayer({ audioRef }: Props) {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–100
  const [duration, setDuration] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Use a ref for the dragging flag so the timeupdate handler sees the
  // current value without re-attaching listeners (which would call
  // a.load() again and restart playback). This is the fix for the
  // "restart" bug.
  const draggingRef = useRef(false);
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Attach audio listeners ONCE on mount ──
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    // Force metadata load only once, on mount
    a.load();

    const syncDuration = () => {
      if (a.duration && isFinite(a.duration)) setDuration(a.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      // While the user is dragging the thumb, don't let timeupdate
      // overwrite the visual progress — let the pointer drive it.
      if (!draggingRef.current && a.duration) {
        setProgress((a.currentTime / a.duration) * 100);
      }
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", syncDuration);
    a.addEventListener("durationchange", syncDuration);
    a.addEventListener("canplay", syncDuration);

    // If metadata already arrived, grab duration right now
    syncDuration();

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", syncDuration);
      a.removeEventListener("durationchange", syncDuration);
      a.removeEventListener("canplay", syncDuration);
    };
  }, [audioRef]);

  // ── Play / pause ──
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
    } else {
      a.pause();
    }
  };

  // ── Convert clientX → percent (0–1) along the track ──
  const pctFromClientX = useCallback((clientX: number) => {
    const bar = trackRef.current;
    if (!bar) return 0;
    const { left, width } = bar.getBoundingClientRect();
    if (width <= 0) return 0;
    return Math.min(Math.max((clientX - left) / width, 0), 1);
  }, []);

  // ── Commit a seek to the audio element (only on release / tap) ──
  const commitSeek = useCallback(
    (pct: number) => {
      const a = audioRef.current;
      if (a && a.duration && isFinite(a.duration)) {
        a.currentTime = pct * a.duration;
      }
    },
    [audioRef],
  );

  // ── Pointer handlers (one set, works for mouse + touch + pen) ──
  // Visual progress updates immediately on every move for smoothness;
  // the audio is only actually seeked on release. This eliminates the
  // "lag while dragging" feel that comes from seeking on every move.
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    try {
      target.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    draggingRef.current = true;
    setDragging(true);
    const pct = pctFromClientX(e.clientX);
    setProgress(pct * 100);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const pct = pctFromClientX(e.clientX);
    setProgress(pct * 100);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const target = e.currentTarget;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    const pct = pctFromClientX(e.clientX);
    setProgress(pct * 100);
    commitSeek(pct);
    draggingRef.current = false;
    setDragging(false);
  };

  const onPointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const target = e.currentTarget;
    try {
      target.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
    // commit whatever the last visual progress is so audio matches the UI
    commitSeek(progress / 100);
    draggingRef.current = false;
    setDragging(false);
  };

  // ── Keyboard support: arrow keys jog by 5s ──
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    let dt = 0;
    if (e.key === "ArrowRight") dt = 5;
    else if (e.key === "ArrowLeft") dt = -5;
    else if (e.key === "Home") {
      a.currentTime = 0;
      return;
    } else if (e.key === "End") {
      a.currentTime = a.duration - 0.1;
      return;
    } else return;
    e.preventDefault();
    a.currentTime = Math.min(Math.max(a.currentTime + dt, 0), a.duration);
  };

  const currentSecs = duration ? (progress / 100) * duration : 0;

  return (
    <section id="music" className={styles.section}>
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" loop />

      <p className="section-eyebrow reveal">Setting the Mood</p>
      <h2 className="section-heading reveal delay-1">Our Song</h2>
      <div className="ornament reveal delay-2">✦</div>

      <div className={`${styles.player} reveal delay-3`}>
        {/* Album art placeholder + track info side by side */}
        <div className={styles.trackRow}>
          <div className={styles.albumArt} aria-hidden="true">
            {/* Simple botanical monogram as stand-in art */}
            <svg
              viewBox="0 0 60 60"
              xmlns="http://www.w3.org/2000/svg"
              className={styles.artSvg}
            >
              <circle cx="30" cy="30" r="28" fill="#fff0f5" />
              <path
                d="M30,48 Q28,36 30,24 Q32,36 30,48Z"
                stroke="#FE569B"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M30,36 Q22,30 18,24"
                stroke="#FE569B"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M18,24 Q20,18 26,22 Q22,28 18,24Z"
                fill="#D2447F"
                opacity="0.7"
              />
              <path
                d="M30,36 Q38,30 42,24"
                stroke="#FE569B"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M42,24 Q40,18 34,22 Q38,28 42,24Z"
                fill="#D2447F"
                opacity="0.7"
              />
              <circle cx="30" cy="24" r="2.5" fill="#FFDF46" opacity="0.8" />
              <text
                x="30"
                y="55"
                textAnchor="middle"
                fontFamily="Georgia,serif"
                fontSize="6"
                fill="#9991E7"
                fontStyle="italic"
                opacity="0.6"
              >
                R&amp;J
              </text>
            </svg>
          </div>

          <div className={styles.trackInfo}>
            <span className={styles.trackName}>Ikaw at Ako</span>
            <span className={styles.trackArtist}>
              Moira Dela Torre & Jason Marvin
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          ref={trackRef}
          className={`${styles.progressBar} ${dragging ? styles.dragging : ""}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onKeyDown={onKeyDown}
          role="slider"
          tabIndex={0}
          aria-label="Seek"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={styles.track} />
          <div className={styles.fill} style={{ width: `${progress}%` }} />
          <div
            className={styles.thumb}
            style={{ left: `${progress}%` }}
            aria-hidden="true"
          />
        </div>

        {/* Timestamps */}
        <div className={styles.times}>
          <span>{fmt(currentSecs)}</span>
          <span>{fmt(duration)}</span>
        </div>

        {/* Controls */}
        <button
          className={`${styles.playBtn} ${playing ? styles.playing : ""}`}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="1" y="1" width="4" height="12" rx="1" />
              <rect x="9" y="1" width="4" height="12" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2,1 L13,7 L2,13Z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
