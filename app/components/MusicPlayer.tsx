"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./MusicPlayer.module.css";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef = useRef<number>(0);

  const tick = () => {
    const a = audioRef.current;
    if (!a || !a.duration) return;
    setProgress((a.currentTime / a.duration) * 100);
    if (!a.paused) rafRef.current = requestAnimationFrame(tick);
  };

  const togglePlay = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) {
      a.play().catch(() => {});
      setPlaying(true);
      rafRef.current = requestAnimationFrame(tick);
    } else {
      a.pause();
      setPlaying(false);
      cancelAnimationFrame(rafRef.current);
    }
  };

  useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

  return (
    <section id="music" className={styles.section}>
      <audio ref={audioRef} src="/audio/song.mp3" preload="metadata" />

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
        <div className={styles.trackInfo}>
          <span className={styles.trackName}>A Thousand Years</span>
          <span className={styles.trackArtist}>Christina Perri</span>
        </div>

        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${progress}%` }}
          />
        </div>

        <button
          className={`${styles.playBtn} ${playing ? styles.playing : ""}`}
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play"}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="2" y="1" width="4" height="14" rx="1" />
              <rect x="10" y="1" width="4" height="14" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3,1 L15,8 L3,15Z" />
            </svg>
          )}
        </button>
      </div>
    </section>
  );
}
