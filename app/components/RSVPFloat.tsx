"use client";
import { useState, useEffect } from "react";
import styles from "./RSVPFloat.module.css";

export default function RSVPFloat() {
  const [visible, setVisible] = useState(false);
  const [nearSection, setNearSection] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.6);
      const section = document.getElementById("rsvp");
      if (section) {
        setNearSection(
          section.getBoundingClientRect().top < window.innerHeight * 0.75,
        );
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = visible && !nearSection;

  return (
    <a
      href="#rsvp"
      className={`${styles.btn} ${show ? styles.visible : ""}`}
      aria-label="RSVP"
    >
      {/* Tiny botanical sprig — quieter than a pulse animation */}
      <svg
        className={styles.icon}
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M7,12 Q6,8 7,3"
          stroke="currentColor"
          strokeWidth="0.9"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M7,7 Q4,5.5 2,4"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <path
          d="M7,7 Q10,5.5 12,4"
          stroke="currentColor"
          strokeWidth="0.8"
          strokeLinecap="round"
          fill="none"
          opacity="0.55"
        />
        <circle cx="7" cy="2.5" r="1.2" fill="currentColor" opacity="0.75" />
      </svg>

      <span className={styles.label}>RSVP</span>
    </a>
  );
}
