"use client";

import { useEffect, useState } from "react";
import styles from "./Registry.module.css";

type Method = {
  id: string;
  label: string;
  holder: string;
  identifier: string;
  identifierLabel?: string;
  qrSrc?: string;
  qrLayout?: "square" | "portrait";
};

/* Real account details to be added later; the masked placeholders
   keep the card layout and Copy button intact in the meantime. */
const methods: Method[] = [
  {
    id: "gcash",
    label: "GCash",
    holder: "Hezekiah Jazmine Chua",
    identifier: "09190082621",
    identifierLabel: "Mobile",
    qrSrc: "/qr/gcash.png",
    qrLayout: "portrait",
  },
  {
    id: "maya",
    label: "Maya",
    holder: "Rahan Dale Dolor",
    identifier: "09189178065",
    identifierLabel: "Mobile",
    qrSrc: "/qr/maya.jpeg",
    qrLayout: "square",
  },
  {
    id: "bank",
    label: "BDO (Bank Transfer)",
    holder: "Rahan Dale Dolor",
    identifier: "011950180970",
    identifierLabel: "Account no.",
  },
];

export default function Registry() {
  const [copied, setCopied] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);
  const [qrOpen, setQrOpen] = useState<string | null>(null);

  const activeQr = methods.find((m) => m.id === qrOpen && m.qrSrc);

  useEffect(() => {
    if (!qrOpen) return;

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQrOpen(null);
    };

    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [qrOpen]);

  const handleCopy = async (id: string, value: string) => {
    const isPlaceholder = /[•]/.test(value);

    if (isPlaceholder) {
      setPending(id);
      setTimeout(() => setPending(null), 1800);
      return;
    }

    try {
      await navigator.clipboard.writeText(value.replace(/[\s•]/g, ""));
      setCopied(id);
      setTimeout(() => setCopied(null), 1800);
    } catch {
      /* clipboard may be unavailable; silently no-op */
    }
  };

  const maskIdentifier = (value: string) => {
    const clean = value.replace(/\s/g, "");

    if (clean.length <= 4) return clean;

    return `${clean.slice(0, 4)} ••• •${clean.slice(-3)}`;
  };

  return (
    <section id="registry" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">A Note on Gifts</p>
        <h2 className="section-heading reveal delay-1">With Love</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.prose} reveal delay-2`}>
          Your company at our wedding is gift enough. Should you wish to send a
          gift as we begin this new chapter, monetary gifts may be sent through
          the options below. Please know that your love, prayers, and presence
          are more than enough.
        </p>

        <div className={`${styles.methods} reveal delay-3`}>
          {methods.map((m) => (
            <div key={m.id} className={styles.methodCard}>
              <div className={styles.methodHeader}>
                <span className={styles.methodLabel}>{m.label}</span>

                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={() => handleCopy(m.id, m.identifier)}
                  aria-label={`Copy ${m.label} ${
                    m.identifierLabel ?? "number"
                  }`}
                >
                  {copied === m.id ? (
                    <>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                      >
                        <path
                          d="M1.5,5.5 L4.5,8.5 L9.5,2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Copied
                    </>
                  ) : pending === m.id ? (
                    <>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        aria-hidden="true"
                      >
                        <circle cx="5.5" cy="5.5" r="4" />
                        <path d="M5.5,3 V5.5 L7,7" strokeLinecap="round" />
                      </svg>
                      Soon
                    </>
                  ) : (
                    <>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 11 11"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.3"
                        aria-hidden="true"
                      >
                        <rect x="3.5" y="3.5" width="6" height="6" rx="0.8" />
                        <path d="M1.5,7.5 V2 a0.5,0.5 0 0 1 0.5,-0.5 H7" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <div className={styles.methodNumberRow}>
                <span className={styles.methodId}>
                  {maskIdentifier(m.identifier)}
                </span>

                {m.qrSrc && (
                  <button
                    type="button"
                    className={styles.qrBtn}
                    onClick={() => setQrOpen(m.id)}
                    aria-label={`Show ${m.label} QR code`}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      aria-hidden="true"
                    >
                      <rect x="1.5" y="1.5" width="3" height="3" />
                      <rect x="7.5" y="1.5" width="3" height="3" />
                      <rect x="1.5" y="7.5" width="3" height="3" />
                      <path d="M7.5,7.5 H10.5 V10.5 H8.8" />
                    </svg>
                    Show QR
                  </button>
                )}
              </div>

              <span className={styles.methodSub}>
                {m.identifierLabel && (
                  <>
                    {m.identifierLabel}
                    <span className={styles.subDot} aria-hidden="true">
                      ·
                    </span>
                  </>
                )}
                {m.holder}
              </span>
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal delay-3`}>
          <em>
            A heartfelt card and your company on the day are always enough.
          </em>
        </p>
      </div>

      {activeQr && (
        <div
          className={styles.qrModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeQr.label} QR code`}
          onClick={() => setQrOpen(null)}
        >
          <div
            className={styles.qrModalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={styles.qrCloseBtn}
              onClick={() => setQrOpen(null)}
              aria-label="Close QR code"
            >
              <span />
              <span />
            </button>

            <p className={styles.qrModalEyebrow}>Scan to Send</p>
            <h3 className={styles.qrModalTitle}>{activeQr.label}</h3>

            <img
              src={activeQr.qrSrc}
              alt={`${activeQr.label} QR code`}
              className={`${styles.qrModalImg} ${
                activeQr.qrLayout === "portrait"
                  ? styles.qrModalImgPortrait
                  : styles.qrModalImgSquare
              }`}
            />

            <p className={styles.qrModalSub}>{activeQr.holder}</p>
          </div>
        </div>
      )}
    </section>
  );
}
