"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import styles from "./Nav.module.css";

const links = [
  { href: "#welcome", label: "Welcome" },
  { href: "#entourage", label: "Entourage" },
  { href: "#attire", label: "Attire" },
  { href: "#venue", label: "Venue" },
  { href: "#registry", label: "Registry" },
  { href: "#rsvp", label: "RSVP" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // ── Portal is client-only; mark mounted to avoid SSR mismatch ──
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Lock body scroll while drawer is open ──
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // ── Close on Escape ──
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const scrollTop = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const drawer =
    mounted &&
    createPortal(
      <div
        className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
        aria-hidden={!open}
      >
        {/* Close button lives inside the drawer so it's above z-index 200 */}
        <button
          className={styles.drawerClose}
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <span />
          <span />
        </button>

        <ul className={styles.drawerLinks}>
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={styles.drawerLink}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>,
      document.body,
    );

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" onClick={scrollTop} className={styles.monogram}>
          R&amp;J
        </Link>

        <ul className={styles.links}>
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className={styles.link}>
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {drawer}
    </>
  );
}
