"use client";
import { useState, useEffect, useMemo, useCallback } from "react";
import styles from "./RSVP.module.css";

/* ───────────────────────────────────────────────────────────────
   CONFIG
   ─────────────────────────────────────────────────────────────── */

/* Paste your deployed Google Apps Script Web App URL here.
   See RSVP_SETUP.md for the 5-minute setup. Leave as "" to run the
   form in preview mode (nothing is saved). */
const RSVP_ENDPOINT = "https://script.google.com/macros/s/AKfycbyaGFN1WXcS2TtRQAcZ7oVqGrqqRtWn-R6NNPLDNmzTvKZ8F9p1kY6QQuJPP-EDlXXa/exec";

/* The couple's real contact details, shown on the form (for trouble or
   changes) and in the confirmation. */
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

const MAX_PARTY_GUESTS = 20; // additional guests, excluding the respondent

type Guest = { firstName: string; lastName: string };
type Status = "idle" | "checking" | "confirmDuplicate" | "submitting" | "success" | "error";

type ServerName = { first: string; last: string };

const normalize = (s: string) =>
  s.trim().toLowerCase().replace(/\s+/g, " ");
const fullKey = (first: string, last: string) =>
  `${normalize(first)} ${normalize(last)}`.trim();

export default function RSVP() {
  /* ── Core fields ── */
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [attending, setAttending] = useState<"" | "yes" | "no">("");
  const [isGroup, setIsGroup] = useState<"" | "yes" | "no">("");
  const [groupCount, setGroupCount] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);

  /* ── Flow / submission state ── */
  const [status, setStatus] = useState<Status>("idle");
  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverMsg, setServerMsg] = useState("");
  const [dupMatches, setDupMatches] = useState<string[]>([]);

  /* ── Existing names (for the friendly real-time duplicate check) ── */
  const [existing, setExisting] = useState<ServerName[]>([]);

  /* Fetch the list of names already in the sheet on mount, so we can
     gently flag possible duplicates while the guest fills the form.
     Only names are returned by the script — never contact details. */
  useEffect(() => {
    if (!RSVP_ENDPOINT) return;
    let cancelled = false;
    fetch(`${RSVP_ENDPOINT}?action=names`)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && Array.isArray(data?.names)) setExisting(data.names);
      })
      .catch(() => {/* offline / not reachable — server still re-checks on submit */});
    return () => {
      cancelled = true;
    };
  }, []);

  /* Lock body scroll + allow Escape to dismiss while the success modal is open */
  useEffect(() => {
    if (!(status === "success" && modalOpen)) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [status, modalOpen]);

  const existingKeys = useMemo(
    () => new Set(existing.map((n) => fullKey(n.first, n.last))),
    [existing],
  );

  /* Keep the guests array length in sync with the chosen party size */
  useEffect(() => {
    const n = Math.min(Math.max(parseInt(groupCount || "0", 10) || 0, 0), MAX_PARTY_GUESTS);
    setGuests((prev) => {
      const next = prev.slice(0, n);
      while (next.length < n) next.push({ firstName: "", lastName: "" });
      return next;
    });
  }, [groupCount]);

  /* ── Derived: does it look like the respondent is already in the sheet? ── */
  const respondentAlready =
    firstName.trim() !== "" &&
    lastName.trim() !== "" &&
    existingKeys.has(fullKey(firstName, lastName));

  /* Which added guests appear to already be in the sheet */
  const guestAlready = useCallback(
    (g: Guest) =>
      g.firstName.trim() !== "" &&
      g.lastName.trim() !== "" &&
      existingKeys.has(fullKey(g.firstName, g.lastName)),
    [existingKeys],
  );

  const setGuest = (i: number, field: keyof Guest, value: string) =>
    setGuests((prev) => prev.map((g, idx) => (idx === i ? { ...g, [field]: value } : g)));

  /* Clear a single field's error the moment the guest starts fixing it,
     so the inline message and the summary stay accurate. */
  const clearError = (key: string) =>
    setErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });

  /* ── Validation — returns the error map so the caller can react ── */
  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.firstName = "Please enter your first name.";
    if (!lastName.trim()) e.lastName = "Please enter your last name.";
    if (!/^09\d{9}$/.test(contact.trim()))
      e.contact = "Please use an 11-digit number, e.g. 09123456789.";
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      e.email = "That email doesn't look quite right.";
    if (!attending) e.attending = "Please let us know if you can make it.";

    if (attending === "yes") {
      if (!isGroup) e.isGroup = "Please choose one.";
      if (isGroup === "yes" && !respondentAlready) {
        const n = parseInt(groupCount || "0", 10);
        if (!n || n < 1) e.groupCount = "How many guests are joining you?";
        guests.forEach((g, i) => {
          if (!g.firstName.trim() || !g.lastName.trim())
            e[`guest-${i}`] = "Please enter both names.";
        });
      }
    }
    setErrors(e);
    return e;
  };

  /* Scroll to and focus the first field that has an error. */
  const focusFirstError = (errs: Record<string, string>) => {
    if (typeof document === "undefined") return;
    const order = ["firstName", "lastName", "contact", "email", "attending", "isGroup", "groupCount"];
    guests.forEach((_, i) => order.push(`guest-${i}`));
    const firstKey = order.find((k) => errs[k]);
    if (!firstKey) return;
    const el = document.getElementById(`rsvp-field-${firstKey}`);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const focusable = el.matches("input, textarea, select, button")
      ? (el as HTMLElement)
      : el.querySelector<HTMLElement>("input, textarea, select, button");
    if (focusable) window.setTimeout(() => focusable.focus({ preventScroll: true }), 60);
  };

  /* ── Build the payload sent to the Apps Script ──
     Duplicate matching uses first + last name only (see fullKey). */
  const buildPayload = (confirmDuplicate: boolean) => ({
    confirmDuplicate,
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    contact: contact.trim(),
    email: email.trim(),
    attending: attending === "yes" ? "Yes" : "No",
    isGroup: attending === "yes" && isGroup === "yes" && !respondentAlready ? "Yes" : "No",
    guests:
      attending === "yes" && isGroup === "yes" && !respondentAlready
        ? guests.map((g) => ({ firstName: g.firstName.trim(), lastName: g.lastName.trim() }))
        : [],
  });

  const send = async (confirmDuplicate: boolean) => {
    setStatus(confirmDuplicate ? "submitting" : "checking");
    setServerMsg("");

    if (!RSVP_ENDPOINT) {
      // Preview mode — nothing is saved. Site owner: add RSVP_ENDPOINT.
      setServerMsg(
        "This RSVP form isn't connected to its spreadsheet yet. (If you're the site owner, add your Apps Script URL in RSVP.tsx.)",
      );
      setStatus("error");
      return;
    }

    try {
      const res = await fetch(RSVP_ENDPOINT, {
        method: "POST",
        // text/plain keeps this a "simple" request → no CORS preflight
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(buildPayload(confirmDuplicate)),
      });
      const data = await res.json();

      if (data.result === "duplicate") {
        setDupMatches(data.matches || []);
        setStatus("confirmDuplicate");
        return;
      }
      if (data.result === "success") {
        setStatus("success");
        setModalOpen(true);
        return;
      }
      throw new Error(data.message || "Unexpected response");
    } catch {
      setServerMsg(
        `We couldn't reach our RSVP list just now. Please try again in a moment, or message ${COUPLE.groom.name} or ${COUPLE.bride.name} directly (contacts below) and we'll add you ourselves.`,
      );
      setStatus("error");
    }
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e = validate();
    if (Object.keys(e).length > 0) {
      focusFirstError(e);
      return;
    }
    send(false);
  };

  const hasErrors = Object.keys(errors).length > 0;

  /* ───────────────────────── RENDER ───────────────────────── */

  return (
    <>
      <section id="rsvp" className={styles.section}>
        <div className={styles.inner}>
          <p className="section-eyebrow reveal">Kindly Reply</p>
          <h2 className="section-heading reveal delay-1">RSVP</h2>
          <div className="ornament reveal delay-2">✦</div>

          {status === "success" ? (
            /* Calm, settled confirmation that lives on the page after the
               celebratory modal is dismissed — so nothing ever vanishes. */
            <ConfirmedPanel firstName={firstName} attending={attending} />
          ) : (
            <>
              <p className={`${styles.prose} reveal delay-2`}>
                To help us prepare with care, please let us know if you will be joining us.
              </p>

              {/* Deadline — the focal piece, kept from the original design */}
              <div className={`${styles.deadlineBlock} reveal delay-3`}>
                <span className={styles.deadlineEyebrow}>Please Reply By</span>
                <span className={styles.deadlineDate}>June 30, 2026</span>
                <span className={styles.deadlineNote}>Three weeks before the wedding</span>
              </div>

              {/* ── The form ── (no .reveal on dynamic fields: the reveal
                  observer only runs once on mount, so fields added later
                  would never become visible). */}
              <form className={`${styles.form} reveal delay-3`} onSubmit={handleSubmit} noValidate>
                {/* Names — one field per row */}
                <Field id="rsvp-field-firstName" label="First Name" error={errors.firstName}>
                  <input
                    className={styles.input}
                    value={firstName}
                    onChange={(e) => { setFirstName(e.target.value); clearError("firstName"); }}
                    autoComplete="given-name"
                  />
                </Field>
                <Field id="rsvp-field-lastName" label="Last Name" error={errors.lastName}>
                  <input
                    className={styles.input}
                    value={lastName}
                    onChange={(e) => { setLastName(e.target.value); clearError("lastName"); }}
                    autoComplete="family-name"
                  />
                </Field>

                {/* Contact + email */}
                <Field id="rsvp-field-contact" label="Contact Number" hint="Main point of contact · 11 digits" error={errors.contact}>
                  <input
                    className={styles.input}
                    value={contact}
                    inputMode="numeric"
                    placeholder="09123456789"
                    maxLength={11}
                    onChange={(e) => { setContact(e.target.value.replace(/[^\d]/g, "")); clearError("contact"); }}
                    autoComplete="tel"
                  />
                </Field>

                <Field id="rsvp-field-email" label="Email" hint="Optional" error={errors.email}>
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    placeholder="you@email.com"
                    onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    autoComplete="email"
                  />
                </Field>

                {/* Attending? */}
                <Field id="rsvp-field-attending" label="Will you attend?" error={errors.attending}>
                  <Choice
                    name="attending"
                    value={attending}
                    onChange={(v) => {
                      setAttending(v as "yes" | "no");
                      setIsGroup("");
                      setGroupCount("");
                      clearError("attending");
                    }}
                    options={[
                      { value: "yes", label: "Joyfully accepts" },
                      { value: "no", label: "Regretfully declines" },
                    ]}
                  />
                </Field>

                {/* If respondent's name already appears in the sheet */}
                {attending && respondentAlready && (
                  <Note tone="warn">
                    We found a response already saved under <strong>{firstName} {lastName}</strong>.
                    If someone in your party replied for you, you may not need to submit again —
                    please check with them first. If this is a different person with the same name,
                    go right ahead.
                  </Note>
                )}

                {/* ── Attending = YES ── */}
                {attending === "yes" && (
                  <div className={styles.revealBlock}>
                    <Field id="rsvp-field-isGroup" label="Are you replying for a group or party?" hint="A couple, family, or friends replying together" error={errors.isGroup}>
                      <Choice
                        name="isGroup"
                        value={isGroup}
                        onChange={(v) => { setIsGroup(v as "yes" | "no"); clearError("isGroup"); }}
                        options={[
                          { value: "yes", label: "Yes, for a group" },
                          { value: "no", label: "Just myself" },
                        ]}
                      />
                    </Field>

                    {/* Group, and respondent is NOT already in the sheet → collect guests */}
                    {isGroup === "yes" && !respondentAlready && (
                      <div className={styles.revealBlock}>
                        <Note tone="info">
                          A gentle note: our venue can only welcome the guests named on your
                          invitation. Please add only those who were invited — and kindly note
                          that we&apos;re unable to accommodate children apart from those in the
                          entourage. Thank you so much for understanding.
                        </Note>

                        <Field id="rsvp-field-groupCount" label="How many guests are joining you?" hint="Not counting yourself" error={errors.groupCount}>
                          <input
                            className={`${styles.input} ${styles.inputNarrow}`}
                            value={groupCount}
                            inputMode="numeric"
                            placeholder="e.g. 2"
                            onChange={(e) => {
                              const raw = e.target.value.replace(/[^\d]/g, "");
                              const n = Math.min(parseInt(raw || "0", 10) || 0, MAX_PARTY_GUESTS);
                              setGroupCount(raw === "" ? "" : String(n));
                              clearError("groupCount");
                            }}
                          />
                        </Field>

                        {guests.map((g, i) => (
                          <div key={i} id={`rsvp-field-guest-${i}`} className={styles.guestCard}>
                            <span className={styles.guestTag}>Guest {i + 1}</span>
                            <div className={styles.row}>
                              <Field label="First Name" error={undefined}>
                                <input
                                  className={styles.input}
                                  value={g.firstName}
                                  onChange={(e) => { setGuest(i, "firstName", e.target.value); clearError(`guest-${i}`); }}
                                />
                              </Field>
                              <Field label="Last Name" error={errors[`guest-${i}`]}>
                                <input
                                  className={styles.input}
                                  value={g.lastName}
                                  onChange={(e) => { setGuest(i, "lastName", e.target.value); clearError(`guest-${i}`); }}
                                />
                              </Field>
                            </div>
                            {guestAlready(g) && (
                              <Note tone="warn" tight>
                                It looks like <strong>{g.firstName} {g.lastName}</strong> may have
                                already RSVP&apos;d. Please check with them before adding, to avoid
                                a double entry.
                              </Note>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Group, but respondent already appears in the sheet */}
                    {isGroup === "yes" && respondentAlready && (
                      <Note tone="warn">
                        Because a response already exists under your name, we haven&apos;t opened the
                        guest fields. If you still need to add people, please confirm with whoever
                        replied first, or message {COUPLE.groom.name} or {COUPLE.bride.name} (contacts
                        below) so we can update your party without duplicating it.
                      </Note>
                    )}
                  </div>
                )}

                {/* Server-side duplicate confirmation */}
                {status === "confirmDuplicate" && (
                  <Note tone="warn">
                    Our list shows a possible match already:
                    {dupMatches.length > 0 && (
                      <span className={styles.dupList}>{dupMatches.join(" · ")}</span>
                    )}
                    If that was you (or someone replying for you), you may be all set. To add this
                    response anyway, tap <em>Submit anyway</em> below and we&apos;ll flag it so we can
                    double-check.
                  </Note>
                )}

                {status === "error" && serverMsg && <Note tone="warn">{serverMsg}</Note>}

                {/* Summary nudge if any fields need attention */}
                {hasErrors && (
                  <Note tone="warn" tight>
                    Please double-check the highlighted fields above, then try again.
                  </Note>
                )}

                {/* Actions */}
                <div className={styles.actions}>
                  {status === "confirmDuplicate" ? (
                    <>
                      <button
                        type="button"
                        className={`btn-elegant btn-gold ${styles.submit}`}
                        onClick={() => send(true)}
                      >
                        Submit anyway
                      </button>
                      <button
                        type="button"
                        className={`btn-elegant btn-outline-light ${styles.cancel}`}
                        onClick={() => setStatus("idle")}
                      >
                        Go back
                      </button>
                    </>
                  ) : (
                    <button
                      type="submit"
                      className={`btn-elegant btn-gold ${styles.submit}`}
                      disabled={status === "checking" || status === "submitting"}
                    >
                      {status === "checking" || status === "submitting" ? "Sending…" : "Send RSVP"}
                      {status === "idle" && (
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                          <path d="M1.5,5.5h8M6,2l3.5,3.5L6,9" />
                        </svg>
                      )}
                    </button>
                  )}
                </div>

                {/* Couple's contact details for help / changes */}
                <CoupleHelp />
              </form>
            </>
          )}
        </div>
      </section>

      {/* Celebratory, centered confirmation — appears over a dimmed page */}
      {status === "success" && modalOpen && (
        <SuccessModal
          firstName={firstName}
          attending={attending}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}

/* ─────────────────── Small presentational helpers ─────────────────── */

function FbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5 21v-7.7h2.6l.4-3h-3V8.4c0-.87.24-1.46 1.49-1.46h1.6V4.25A21.6 21.6 0 0 0 14.25 4c-2.31 0-3.9 1.41-3.9 4v2.3H7.75v3h2.6V21h3.15Z" />
    </svg>
  );
}

/* One compact, full-width contact card — used in the form AND the
   confirmation, so they always look the same. */
function ContactPerson({
  name,
  role,
  phone,
  facebook,
}: {
  name: string;
  role: string;
  phone: string;
  facebook: string;
}) {
  return (
    <div className={styles.contactPerson}>
      <div className={styles.contactMain}>
        <span className={styles.contactRole}>{role}</span>
        <span className={styles.contactName}>{name}</span>
      </div>
      <div className={styles.contactReach}>
        <a className={styles.contactPhone} href={telHref(phone)}>{phone}</a>
        <a
          className={styles.fbBtn}
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Message ${name} on Facebook`}
        >
          <FbIcon />
        </a>
      </div>
    </div>
  );
}

/* The two stacked contact cards, reused everywhere. */
function CoupleContacts() {
  return (
    <div className={styles.contactGrid}>
      <ContactPerson {...COUPLE.groom} />
      <ContactPerson {...COUPLE.bride} />
    </div>
  );
}

function CoupleHelp() {
  return (
    <div className={styles.contacts}>
      <p className={styles.contactsIntro}>
        Trouble with the form, or need to change something? Reach us anytime —
        by call, text, or a message on Facebook.
      </p>
      <CoupleContacts />
    </div>
  );
}

function ConfirmedPanel({
  firstName,
  attending,
}: {
  firstName: string;
  attending: "" | "yes" | "no";
}) {
  return (
    <div className={styles.confirmedPanel}>
      <SprigMark />
      <p className={styles.confirmedLead}>
        Your RSVP is in{firstName ? `, ${firstName}` : ""}.
      </p>
      <p className={styles.confirmedProse}>
        {attending === "yes"
          ? "We can't wait to celebrate with you."
          : <>
              Thank you for letting us know,<br />
              you'll be dearly missed.
            </>} 
      </p>
      <div className={styles.confirmedContacts}>
        <p className={styles.reachLabel}>Need to change anything? Reach us:</p>
        <CoupleContacts />
      </div>
    </div>
  );
}

function SuccessModal({
  firstName,
  attending,
  onClose,
}: {
  firstName: string;
  attending: "" | "yes" | "no";
  onClose: () => void;
}) {
  return (
    <div
      className={styles.modalOverlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsvp-modal-title"
      onClick={onClose}
    >
      <div className={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className={styles.modalX}
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
            <path d="M1,1 L12,12 M12,1 L1,12" strokeLinecap="round" />
          </svg>
        </button>

        <SprigMark />
        <h3 id="rsvp-modal-title" className={styles.modalLead}>
          Thank You{firstName ? `, ${firstName}` : ""}
        </h3>
        <p className={styles.modalProse}>
          {attending === "yes"
            ? "We've received your response and can't wait to celebrate with you. Watch your messages for final details closer to the day."
            : "We've received your response. Thank you for letting us know — you'll be dearly missed."}
        </p>

        <div className={styles.modalContacts}>
          <p className={styles.reachLabel}>Need to change anything? Reach us anytime:</p>
          <CoupleContacts />
        </div>

        <button
          type="button"
          className={`btn-elegant btn-gold ${styles.modalClose}`}
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  children,
}: {
  id?: string;
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label id={id} className={styles.field}>
      <span className={styles.label}>
        {label}
        {hint && <span className={styles.hint}>{hint}</span>}
      </span>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </label>
  );
}

function Choice({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className={styles.choiceRow} role="radiogroup">
      {options.map((o) => (
        <button
          type="button"
          key={o.value}
          role="radio"
          aria-checked={value === o.value}
          className={`${styles.choice} ${value === o.value ? styles.choiceActive : ""}`}
          onClick={() => onChange(o.value)}
          data-name={name}
        >
          <span className={styles.choiceDot} aria-hidden="true" />
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Note({
  tone,
  tight,
  children,
}: {
  tone: "info" | "warn";
  tight?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className={`${styles.note} ${tone === "warn" ? styles.noteWarn : styles.noteInfo} ${tight ? styles.noteTight : ""}`}>
      <span className={styles.noteSprig} aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7,12 Q6,8 7,3" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.7" />
          <path d="M7,7 Q4,5.5 2,4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.55" />
          <path d="M7,7 Q10,5.5 12,4" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" opacity="0.55" />
          <circle cx="7" cy="2.5" r="1.2" fill="currentColor" opacity="0.75" />
        </svg>
      </span>
      <p>{children}</p>
    </div>
  );
}

function SprigMark() {
  return (
    <svg className={styles.successSprig} width="46" height="46" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M30,54 Q28,34 30,10" stroke="#5BA02F" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M30,30 Q18,24 8,18" stroke="#7DC23D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      <path d="M30,30 Q42,24 52,18" stroke="#7DC23D" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.6" />
      <g transform="translate(30,9)">
        <circle r="6" fill="#FE569B" opacity="0.25" />
        <circle r="3.5" fill="#FE569B" opacity="0.55" />
        <circle r="1.6" fill="#FFDF46" />
      </g>
      <circle cx="8" cy="18" r="3" fill="#9991E7" opacity="0.5" />
      <circle cx="52" cy="18" r="3" fill="#5CA9E0" opacity="0.5" />
    </svg>
  );
}