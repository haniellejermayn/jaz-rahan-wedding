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
  const trackRef = useRef<HTMLDivElement>(null);

  // ── Attach audio listeners ──
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;

    // Force metadata load immediately
    a.load();

    const syncDuration = () => {
      if (a.duration && isFinite(a.duration)) setDuration(a.duration);
    };
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onTime = () => {
      if (!dragging && a.duration) {
        setProgress((a.currentTime / a.duration) * 100);
      }
    };

    a.addEventListener("play", onPlay);
    a.addEventListener("pause", onPause);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", syncDuration);
    a.addEventListener("durationchange", syncDuration);
    a.addEventListener("canplay", syncDuration); // fallback

    // Already loaded? Grab duration right now
    syncDuration();

    return () => {
      a.removeEventListener("play", onPlay);
      a.removeEventListener("pause", onPause);
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", syncDuration);
      a.removeEventListener("durationchange", syncDuration);
      a.removeEventListener("canplay", syncDuration);
    };
  }, [audioRef, dragging]);

  // ── Play/pause ──
  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    a.paused ? a.play().catch(() => {}) : a.pause();
  };

  // ── Seek ──
  const seekTo = useCallback(
    (clientX: number) => {
      const bar = trackRef.current;
      const a = audioRef.current;
      if (!bar || !a || !a.duration) return;
      const { left, width } = bar.getBoundingClientRect();
      const pct = Math.min(Math.max((clientX - left) / width, 0), 1);
      a.currentTime = pct * a.duration;
      setProgress(pct * 100);
    },
    [audioRef],
  );

  const onMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    seekTo(e.clientX);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    setDragging(true);
    seekTo(e.touches[0].clientX);
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (dragging) seekTo(e.clientX);
    },
    [dragging, seekTo],
  );
  const onTouchMove = useCallback(
    (e: TouchEvent) => {
      if (dragging) seekTo(e.touches[0].clientX);
    },
    [dragging, seekTo],
  );
  const stopDrag = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", stopDrag);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", stopDrag);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", stopDrag);
    };
  }, [dragging, onMouseMove, onTouchMove, stopDrag]);

  const currentSecs = duration ? (progress / 100) * duration : 0;

  return (
    <section id="music" className={styles.section}>
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" loop />

      <p className="section-eyebrow reveal" style={{ color: "#7a9e86" }}>
        Setting the Mood
      </p>
      <h2 className="section-heading section-heading-light reveal delay-1">
        Our Song
      </h2>
      <div className="ornament reveal delay-2" style={{ color: "#d4b870" }}>
        ✦
      </div>

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
              <circle cx="30" cy="30" r="28" fill="#243d2e" />
              <path
                d="M30,48 Q28,36 30,24 Q32,36 30,48Z"
                stroke="#7a9e86"
                strokeWidth="1"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M30,36 Q22,30 18,24"
                stroke="#7a9e86"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M18,24 Q20,18 26,22 Q22,28 18,24Z"
                fill="#527a60"
                opacity="0.7"
              />
              <path
                d="M30,36 Q38,30 42,24"
                stroke="#7a9e86"
                strokeWidth="1"
                fill="none"
                opacity="0.6"
              />
              <path
                d="M42,24 Q40,18 34,22 Q38,28 42,24Z"
                fill="#527a60"
                opacity="0.7"
              />
              <circle cx="30" cy="24" r="2.5" fill="#b8963e" opacity="0.8" />
              <text
                x="30"
                y="55"
                textAnchor="middle"
                fontFamily="Georgia,serif"
                fontSize="6"
                fill="#7a9e86"
                fontStyle="italic"
                opacity="0.6"
              >
                J&amp;R
              </text>
            </svg>
          </div>

          <div className={styles.trackInfo}>
            <span className={styles.trackName}>A Thousand Years</span>
            <span className={styles.trackArtist}>Christina Perri</span>
          </div>
        </div>

        {/* Progress bar */}
        <div
          ref={trackRef}
          className={`${styles.progressBar} ${dragging ? styles.dragging : ""}`}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          role="slider"
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

        <p className={styles.hint}>Drop your track at /public/audio/song.mp3</p>
      </div>
    </section>
  );
}
