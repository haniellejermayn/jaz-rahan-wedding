"use client";
import { useState } from "react";
import styles from "./Nav.module.css";

const links = [
  { href: "#welcome",   label: "Welcome" },
  { href: "#entourage", label: "Entourage" },
  { href: "#attire",    label: "Attire" },
  { href: "#venue",     label: "Venue" },
  { href: "#registry",  label: "Registry" },
  { href: "#rsvp",      label: "RSVP" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      <a href="#hero" className={styles.monogram}>J&amp;R</a>

      <ul className={styles.links}>
        {links.map((l) => (
          <li key={l.href}>
            <a href={l.href} className={styles.link}>{l.label}</a>
          </li>
        ))}
      </ul>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <span /><span /><span />
      </button>

      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
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
      </div>
    </nav>
  );
}
