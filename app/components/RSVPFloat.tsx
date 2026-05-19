"use client";
import { useState, useEffect } from "react";
import styles from "./RSVPFloat.module.css";

export default function RSVPFloat() {
  const [visible, setVisible] = useState(false);
  const [nearSection, setNearSection] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past the hero
      setVisible(window.scrollY > window.innerHeight * 0.6);

      // Fade out when the full RSVP section is in view (redundant then)
      const section = document.getElementById("rsvp");
      if (section) {
        const rect = section.getBoundingClientRect();
        setNearSection(rect.top < window.innerHeight * 0.75);
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
      <span className={styles.label}>RSVP</span>
      <span className={styles.pulse} aria-hidden="true" />
    </a>
  );
}
