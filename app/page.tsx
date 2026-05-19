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
import Entourage from "./components/Entourage";
import Attire from "./components/Attire";
import DateTime from "./components/DateTime";
import Venue from "./components/Venue";
import Registry from "./components/Registry";
import RSVP from "./components/RSVP";
import RSVPFloat from "./components/RSVPFloat";
import Footer from "./components/Footer";

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

      <div style={{ visibility: opened ? "visible" : "hidden" }}>
        <Nav />
        <main>
          <Hero />
          <Countdown />
          <Welcome />
          <MusicPlayer audioRef={audioRef} />
          <PhotoCarousel />
          <FloralDivider />
          <Entourage />
          <FloralDivider dark />
          <Attire />
          <DateTime />
          <Venue />
          <Registry />
          <RSVP />
        </main>
        <Footer />
      </div>

      <RSVPFloat />
    </>
  );
}
