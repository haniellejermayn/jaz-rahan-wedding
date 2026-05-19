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
      {/* Small botanical leaf */}
      <svg
        className={styles.icon}
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M6,11 Q5,7 6,2 Q7,7 6,11Z" fill="#182e20" opacity="0.7" />
        <path d="M6,7 Q3,5 1,3 Q4,4 6,7Z" fill="#182e20" opacity="0.6" />
        <path d="M6,7 Q9,5 11,3 Q8,4 6,7Z" fill="#182e20" opacity="0.6" />
      </svg>

      <span className={styles.label}>RSVP</span>

      <span className={styles.pulse} aria-hidden="true" />
    </a>
  );
}
