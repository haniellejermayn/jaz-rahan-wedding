"use client";
import { useState } from "react";
import styles from "./FAQ.module.css";

/* ───────────────────────────────────────────────────────────────
   The couple's contact details (kept in sync with RSVP.tsx).
   ─────────────────────────────────────────────────────────────── */
const COUPLE = {
  groom: {
    name: "Rahan",
    role: "Groom",
    phone: "0917 700 5942",
    facebook: "https://www.facebook.com/share/1HKeNAWaxD/?mibextid=wwXIfr",
  },
  bride: {
    name: "Jazmine",
    role: "Bride",
    phone: "0919 008 2621",
    facebook: "https://www.facebook.com/share/18oPU6Za5z/?mibextid=wwXIfr",
  },
} as const;

const telHref = (phone: string) => `tel:${phone.replace(/\D/g, "")}`;

/* ───────────────────────────────────────────────────────────────
   Thin-line icons — one per question, stroked in currentColor so
   they pick up each card's garden accent.
   ─────────────────────────────────────────────────────────────── */
type IconName =
  | "rsvp"
  | "indoors"
  | "guests"
  | "children"
  | "travel"
  | "clock"
  | "seating"
  | "food"
  | "contact";

function Icon({ name }: { name: IconName }) {
  const p = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  const wrap = (children: React.ReactNode) => (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {children}
    </svg>
  );

  switch (name) {
    case "rsvp": // envelope — send your reply
      return wrap(
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2" {...p} />
          <path d="M3.6,7 L12,13 L20.4,7" {...p} />
        </>,
      );
    case "indoors": // house with door
      return wrap(
        <>
          <path d="M3.5,11 L12,4 L20.5,11" {...p} />
          <path d="M5.6,9.4 V20 H18.4 V9.4" {...p} />
          <path d="M10,20 V14 H14 V20" {...p} />
        </>,
      );
    case "guests": // two people
      return wrap(
        <>
          <circle cx="9" cy="8" r="2.6" {...p} />
          <path d="M4.4,19 c0-3.2 2-4.9 4.6-4.9 s4.6,1.7 4.6,4.9" {...p} />
          <circle cx="16.4" cy="9.4" r="2.1" {...p} />
          <path d="M14,12.8 c2.2,-0.1 4.1,1.4 4.1,4" {...p} />
        </>,
      );
    case "children": // balloon
      return wrap(
        <>
          <ellipse cx="12" cy="8" rx="4.6" ry="5.4" {...p} />
          <path d="M10.8,13 L12,14.4 L13.2,13" {...p} />
          <path d="M12,14.4 c1.6,1.8 -1.1,3.4 0.4,5.6" {...p} />
        </>,
      );
    case "travel": // car — directions & parking
      return wrap(
        <>
          <path
            d="M5,14 l1.6,-4.6 a2,2 0 0 1 1.9,-1.3 h7 a2,2 0 0 1 1.9,1.3 L19,14"
            {...p}
          />
          <path
            d="M3.2,14 h17.6 a1,1 0 0 1 1,1 v2 a0.8,0.8 0 0 1 -0.8,0.8 h-1.4"
            {...p}
          />
          <path
            d="M5.4,17.8 H4 a0.8,0.8 0 0 1 -0.8,-0.8 v-2 a1,1 0 0 1 1,-1"
            {...p}
          />
          <circle cx="7.4" cy="17.4" r="1.7" {...p} />
          <circle cx="16.6" cy="17.4" r="1.7" {...p} />
        </>,
      );
    case "clock": // arrival & departure
      return wrap(
        <>
          <circle cx="12" cy="12" r="8.4" {...p} />
          <path d="M12,7 V12.3 L15.6,14.1" {...p} />
        </>,
      );
    case "seating": // side chair
      return wrap(
        <>
          <path d="M8,20 V4" {...p} />
          <path d="M8,13 H17 V20" {...p} />
          <path d="M8,16 H17" {...p} />
          <path d="M8,7 H13" {...p} />
        </>,
      );
    case "food": // plate with fork & knife
      return wrap(
        <>
          <circle cx="12.2" cy="13" r="4.8" {...p} />
          <circle cx="12.2" cy="13" r="2.6" {...p} />
          <path d="M4.4,8 V19" {...p} />
          <path d="M3.3,8 V11 M5.5,8 V11 M3.3,11 H5.5" {...p} />
          <path d="M19.8,8 c1.3,0.4 1.3,3.1 0,3.7 V19" {...p} />
        </>,
      );
    case "contact": // phone handset
      return wrap(
        <path
          d="M6.6,4.6 h2.1 a1,1 0 0 1 1,0.8 l0.5,2.3 a1,1 0 0 1 -0.3,1 l-1.2,1 a11,11 0 0 0 4.8,4.8 l1,-1.2 a1,1 0 0 1 1,-0.3 l2.3,0.5 a1,1 0 0 1 0.8,1 v2.1 a1.2,1.2 0 0 1 -1.3,1.2 A14.5,14.5 0 0 1 5.4,5.9 a1.2,1.2 0 0 1 1.2,-1.3 Z"
          {...p}
        />,
      );
  }
}

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5h2.2V5.3h-2.6c-2.3 0-3.6 1.4-3.6 3.7v1.8H8v3.1h2v6.8h3.2v-6.8h2.3l.4-3.1h-2.7V9.4c0-.6.3-.9 1.1-.9z" />
    </svg>
  );
}

/* ───────────────────────────────────────────────────────────────
   FAQ DATA
   Tone: concise, warm, polite. Edit answers freely below.
   ─────────────────────────────────────────────────────────────── */
type Faq = {
  id: string;
  icon: IconName;
  accent: string; // --accent  (light garden hue)
  accentDeep: string; // --accent-deep (stroke / open marker)
  question: string;
  answer: React.ReactNode;
};

const FAQS: Faq[] = [
  {
    id: "rsvp",
    icon: "rsvp",
    accent: "#FE569B",
    accentDeep: "#D2447F",
    question: "When should I RSVP by?",
    answer: (
      <p>
        Please submit the RSVP form above by <strong>June 30, 2026</strong>.
        Kindly respond whether or not you&rsquo;re able to join us, as this
        helps us finalize seating and meals.
      </p>
    ),
  },
  {
    id: "indoors",
    icon: "indoors",
    accent: "#9991E7",
    accentDeep: "#6d63cc",
    question: "Will the wedding be held indoors?",
    answer: (
      <p>
        Yes. Both the ceremony and reception will be held indoors, so you can
        come dressed comfortably, rain or shine.
      </p>
    ),
  },
  {
    id: "guests",
    icon: "guests",
    accent: "#FE803D",
    accentDeep: "#d45e1a",
    question: "May I bring a plus-one or extra guests?",
    answer: (
      <p>
        To keep our celebration intimate, seats are reserved for the{" "}
        <strong>guests named on your invitation</strong>. We&rsquo;re unable to
        accommodate plus-ones or additional guests, and kindly ask that
        invitations not be passed along. Thank you for understanding.
      </p>
    ),
  },
  {
    id: "children",
    icon: "children",
    accent: "#FEC135",
    accentDeep: "#F67E00",
    question: "Are children invited?",
    answer: (
      <p>
        Ours will be an <strong>adults-only celebration</strong>, except for
        children who are part of the entourage. We hope this gives parents a
        lovely evening to relax and enjoy.
      </p>
    ),
  },
  {
    id: "travel",
    icon: "travel",
    accent: "#7DC23D",
    accentDeep: "#5a9a2e",
    question: "How do I get there, and is parking available?",
    answer: (
      <p>
        <strong>Parking at the venue is limited</strong>, and transportation
        will not be provided. We suggest carpooling where possible, arranging
        your own ride, and allowing extra travel time.
      </p>
    ),
  },
  {
    id: "timing",
    icon: "clock",
    accent: "#5CA9E0",
    accentDeep: "#2e7ec4",
    question: "When should I arrive, and when may I leave?",
    answer: (
      <>
        <p>
          Doors open at <strong>1:30 PM</strong>. Please be seated before the
          ceremony begins at <strong>2:00 PM</strong>.
        </p>
        <p>
          We&rsquo;d love for you to stay through the whole celebration. If you
          need to leave early, please let Rahan or Jazmine know beforehand.
        </p>
      </>
    ),
  },
  {
    id: "seating",
    icon: "seating",
    accent: "#A765CC",
    accentDeep: "#7e3fa3",
    question: "Is seating assigned?",
    answer: (
      <p>
        Yes, <strong>reception seating is assigned</strong>. Our team will guide
        you to your table once you arrive.
      </p>
    ),
  },
  {
    id: "food",
    icon: "food",
    accent: "#18C5B4",
    accentDeep: "#0f9c8e",
    question: "What kind of food will be served?",
    answer: (
      <>
        <p>
          An <strong>assisted buffet</strong> will be served during the
          reception, with the catering team helping guests at the buffet.
        </p>
        <p>
          If you have any{" "}
          <strong>food allergies or dietary restrictions</strong>, please let
          Rahan or Jazmine know ahead of time so we can make arrangements for
          you.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    icon: "contact",
    accent: "#FE569B",
    accentDeep: "#c93d7a",
    question: "Who can I contact with questions?",
    answer: (
      <>
        <p>
          For anything at all, you&rsquo;re welcome to reach the couple
          directly:
        </p>
        <div className={styles.contacts}>
          {[COUPLE.groom, COUPLE.bride].map((c) => (
            <div key={c.role} className={styles.contactRow}>
              <span className={styles.cRole}>{c.role}</span>
              <span className={styles.cName}>{c.name}</span>
              <a className={styles.cPhone} href={telHref(c.phone)}>
                {c.phone}
              </a>
              <a
                className={styles.cFb}
                href={c.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Message ${c.name} on Facebook`}
              >
                <FbIcon />
              </a>
            </div>
          ))}
        </div>
      </>
    ),
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const toggle = (id: string) =>
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <section id="faqs" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">Good to Know</p>
        <h2 className="section-heading reveal delay-1">FAQs</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.intro} reveal delay-2`}>
          A few helpful details as you plan for the day.
        </p>

        <div className={styles.list}>
          {FAQS.map((f, i) => {
            const isOpen = !!open[f.id];
            const btnId = `faq-q-${f.id}`;
            const panelId = `faq-a-${f.id}`;
            return (
              <div
                key={f.id}
                className="reveal"
                style={{ transitionDelay: `${0.06 + i * 0.05}s` }}
              >
                <div
                  className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}
                  style={
                    {
                      "--accent": f.accent,
                      "--accent-deep": f.accentDeep,
                    } as React.CSSProperties
                  }
                >
                  <button
                    id={btnId}
                    className={styles.q}
                    onClick={() => toggle(f.id)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className={styles.chip}>
                      <Icon name={f.icon} />
                    </span>
                    <span className={styles.qText}>{f.question}</span>
                    <span className={styles.toggle} aria-hidden="true" />
                  </button>

                  <div
                    className={`${styles.panelWrap} ${isOpen ? styles.panelWrapOpen : ""}`}
                  >
                    <div className={styles.panel}>
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className={`${styles.panelInner} ${styles.a}`}
                      >
                        {f.answer}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
