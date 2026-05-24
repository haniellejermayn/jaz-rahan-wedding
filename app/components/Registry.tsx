"use client";
import { useState } from "react";
import styles from "./Registry.module.css";

type Method = {
  id: string;
  label: string;       // e.g. "GCash"
  holder: string;      // account-holder name
  identifier: string;  // mobile number / account number
  identifierLabel?: string; // e.g. "Mobile" or "Account no."
};

/* Real account details to be added later; the masked placeholders
   keep the card layout and Copy button intact in the meantime. */
const methods: Method[] = [
  {
    id: "gcash",
    label: "GCash",
    holder: "Coming soon",
    identifier: "•••• ••• ••••",
    identifierLabel: "Mobile",
  },
  {
    id: "maya",
    label: "Maya",
    holder: "Coming soon",
    identifier: "•••• ••• ••••",
    identifierLabel: "Mobile",
  },
  {
    id: "bank",
    label: "Bank Transfer",
    holder: "Coming soon",
    identifier: "•••• •••• ••••",
    identifierLabel: "Account no.",
  },
];

export default function Registry() {
  const [copied, setCopied] = useState<string | null>(null);
  const [pending, setPending] = useState<string | null>(null);

  const handleCopy = async (id: string, value: string) => {
    // Detect placeholder values (masked bullets) — show "Soon" feedback
    // instead of writing an empty string to the clipboard.
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

  return (
    <section id="registry" className={styles.section}>
      <div className={styles.inner}>
        <p className="section-eyebrow reveal">A Note on Gifts</p>
        <h2 className="section-heading reveal delay-1">With Love</h2>
        <div className="ornament reveal delay-2">✦</div>

        <p className={`${styles.prose} reveal delay-2`}>
          <strong>Your company at our wedding is gift enough.</strong>{" "}
          Should you wish to mark our new chapter with something more,
          we have chosen to forgo a traditional registry &mdash; a
          monetary gift would be warmly appreciated.
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
                  aria-label={`Copy ${m.label} ${m.identifierLabel ?? "number"}`}
                >
                  {copied === m.id ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                        <path d="M1.5,5.5 L4.5,8.5 L9.5,2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Copied
                    </>
                  ) : pending === m.id ? (
                    <>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                        <circle cx="5.5" cy="5.5" r="4" />
                        <path d="M5.5,3 V5.5 L7,7" strokeLinecap="round" />
                      </svg>
                      Soon
                    </>
                  ) : (
                    <>
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                        <rect x="3.5" y="3.5" width="6" height="6" rx="0.8" />
                        <path d="M1.5,7.5 V2 a0.5,0.5 0 0 1 0.5,-0.5 H7" />
                      </svg>
                      Copy
                    </>
                  )}
                </button>
              </div>

              <span className={styles.methodId}>{m.identifier}</span>
              <span className={styles.methodSub}>
                {m.identifierLabel && (
                  <>
                    {m.identifierLabel}
                    <span className={styles.subDot} aria-hidden="true">·</span>
                  </>
                )}
                {m.holder}
              </span>
            </div>
          ))}
        </div>

        <p className={`${styles.note} reveal delay-3`}>
          <em>
            A heartfelt card and your company on the day are always
            enough.
          </em>
        </p>
      </div>
    </section>
  );
}
