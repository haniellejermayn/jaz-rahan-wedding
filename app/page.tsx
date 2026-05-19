"use client";
import { useState } from "react";
import { useScrollReveal } from "./lib/useScrollReveal";
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
  useScrollReveal();

  return (
    <>
      <EnvelopeOverlay onOpen={() => setOpened(true)} />

      <div style={{ visibility: opened ? "visible" : "hidden" }}>
        <Nav />
        <main>
          <Hero />
          <Countdown />
          <Welcome />
          <MusicPlayer />
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
