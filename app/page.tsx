"use client";
import { useState, useRef, useEffect } from "react";
import { useScrollReveal } from "./lib/useScrollReveal";
import { useSmoothAnchors } from "./lib/useSmoothAnchors";
import EnvelopeOverlay from "./components/EnvelopeOverlay";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Countdown from "./components/Countdown";
import Welcome from "./components/Welcome";
import MusicPlayer from "./components/MusicPlayer";
import PhotoCarousel from "./components/PhotoCarousel";
import FloralDivider from "./components/FloralDivider";
import FairyLightsDivider from "./components/FairyLightsDivider";
import Entourage from "./components/Entourage";
import Attire from "./components/Attire";
import DateTime from "./components/DateTime";
import Venue from "./components/Venue";
import Registry from "./components/Registry";
import RSVP from "./components/RSVP";
import RSVPFloat from "./components/RSVPFloat";
import Footer from "./components/Footer";

/* Ambient floating petals — sprinkled across the page */
const PETALS = [
  { left: "8%",  size: 7,  color: "#FE569B", duration: 22, delay: 0  },
  { left: "18%", size: 5,  color: "#9991E7", duration: 28, delay: 4  },
  { left: "28%", size: 8,  color: "#FE803D", duration: 24, delay: 9  },
  { left: "38%", size: 4,  color: "#FFDF46", duration: 30, delay: 2  },
  { left: "48%", size: 6,  color: "#7DC23D", duration: 26, delay: 12 },
  { left: "58%", size: 5,  color: "#5CA9E0", duration: 25, delay: 6  },
  { left: "68%", size: 7,  color: "#FE569B", duration: 27, delay: 14 },
  { left: "78%", size: 4,  color: "#A765CC", duration: 23, delay: 8  },
  { left: "88%", size: 6,  color: "#FEC135", duration: 29, delay: 11 },
  { left: "95%", size: 5,  color: "#FE569B", duration: 24, delay: 16 },
  { left: "13%", size: 4,  color: "#18C5B4", duration: 31, delay: 19 },
  { left: "53%", size: 5,  color: "#FE803D", duration: 26, delay: 21 },
];

export default function Home() {
  const [opened, setOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  useScrollReveal();
  useSmoothAnchors();

  useEffect(() => {
    const id = setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 300);
    return () => clearTimeout(id);
  }, []);

  const handleOpen = () => {
    setOpened(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 400);
  };

  return (
    <>
      <EnvelopeOverlay onOpen={handleOpen} />

      <div
        style={{
          opacity: opened ? 1 : 0,
          transition: "opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1)",
          pointerEvents: opened ? "auto" : "none",
        }}
      >
        {/* Ambient floating petals across whole page */}
        <div className="ambient-petals" aria-hidden="true">
          {PETALS.map((p, i) => (
            <span
              key={i}
              style={{
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: p.color,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
        </div>

        <Nav />
        <main>
          <Hero />
          <Countdown />
          <div data-edge-flush><FloralDivider /></div>
          <Welcome />
          <div data-edge-flush><FairyLightsDivider /></div>
          <MusicPlayer audioRef={audioRef} />
          <div data-edge-flush><FloralDivider /></div>
          <PhotoCarousel />
          <div data-edge-flush><FairyLightsDivider /></div>
          <Entourage />
          <div data-edge-flush><FloralDivider /></div>
          <Attire />
          <div data-edge-flush><FairyLightsDivider /></div>
          <DateTime />
          <div data-edge-flush><FloralDivider /></div>
          <Venue />
          <div data-edge-flush><FairyLightsDivider /></div>
          <Registry />
          <div data-edge-flush><FloralDivider dark /></div>
          <RSVP />
        </main>
        <Footer />
      </div>

      <RSVPFloat />
    </>
  );
}