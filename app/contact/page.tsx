"use client";

import { useState, useEffect, useRef, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";
import TeamCards from "@/components/ui/TeamCards";

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }} aria-hidden="true">
      <path fill="#25D366" d="M4.9 43.3 7.6 33.5C5.9 31 5 28.1 5 25 5 13.9 13.9 5 25 5s20 8.9 20 20-8.9 20-20 20c-3 0-5.8-.7-8.3-1.9z"/>
      <path fill="#fff" d="M19.3 16c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-.9.1-1.4.7-.5.5-1.8 1.7-1.8 4.2s1.8 4.9 2.1 5.2c.2.3 3.5 5.6 8.6 7.6 4.3 1.7 5.1 1.4 6 1.3.9-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.1-.2-.5-.4-.9-.6l-3.3-1.6c-.4-.2-.7-.3-1 .1-.3.4-1.2 1.5-1.4 1.8-.2.3-.5.3-.9.1-3.3-1.6-5.4-3.7-5.7-4.3-.3-.6.1-.9.4-1.1l.9-.9c.2-.2.3-.5.4-.8z"/>
    </svg>
  );
}

const CALENDLY_URL = "https://calendly.com/avenueteamofficial/30min";
const SCRIPT_ID    = "calendly-widget-js";
const CSS_ID       = "calendly-widget-css";
type BookingState  = "idle" | "booked" | "rebooked";

function CalendlyEmbed({ height = 700 }: { height?: number }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bookingState, setBookingState] = useState<BookingState>("idle");

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.event === "calendly.event_scheduled")
        setBookingState(prev => prev === "idle" ? "booked" : "rebooked");
      if (e.data?.event === "calendly.event_canceled") {
        setBookingState("idle");
        setTimeout(mountWidget, 50);
      }
    };
    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, []);

  const mountWidget = () => {
    if (!document.getElementById(CSS_ID)) {
      const link = document.createElement("link");
      link.id = CSS_ID; link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    const init = () => {
      const w = window as typeof window & { Calendly?: { initInlineWidget: (o: { url: string; parentElement: HTMLElement }) => void } };
      if (w.Calendly && containerRef.current) {
        containerRef.current.innerHTML = "";
        w.Calendly.initInlineWidget({ url: CALENDLY_URL, parentElement: containerRef.current });
      }
    };
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID; script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true; script.onload = init;
      document.body.appendChild(script);
    } else {
      const w = window as typeof window & { Calendly?: unknown };
      w.Calendly ? init() : document.getElementById(SCRIPT_ID)!.addEventListener("load", init, { once: true });
    }
  };

  useEffect(() => { mountWidget(); }, []);
  const handleDismiss = () => { setBookingState("idle"); setTimeout(mountWidget, 50); };

  return (
    <section className="cp-section reveal vis" id="book-a-call" suppressHydrationWarning>
      <div className="tc" style={{ marginBottom: 20 }}>
        <span className="stag">Book a Meeting</span>
        <h2 className="sh">Pick a Time That Works for You</h2>
        <span className="gold-bar" />
        <p style={{ marginTop: 12, color: "var(--muted2, #888)", fontSize: 15 }}>
          Free 30-minute discovery call — no commitment required.
        </p>
      </div>

      {bookingState === "booked" && (
        <div style={{
          background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: 14, padding: "18px 20px", marginBottom: 20, boxSizing: "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>🎉</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#f0ebe5", margin: "0 0 4px" }}>You&apos;re booked! See you soon.</p>
              <p style={{ fontSize: 13, color: "var(--muted2, #888)", margin: 0 }}>Need another slot for a colleague or a follow-up?</p>
            </div>
            <button onClick={handleDismiss} aria-label="Dismiss" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted2, #888)", fontSize: "1.1rem", lineHeight: 1, padding: "2px 4px", flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn btn-y" onClick={handleDismiss}>Book Another Meeting →</button>
            <span style={{ fontSize: 12, color: "var(--muted2,#888)", textAlign: "center" }}>or</span>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "var(--muted2,#888)", margin: 0 }}><strong>Already booked?</strong> Want to be seen as a priority client?</p>
              <a href="https://wa.me/919801458766?text=Hi%20Avenue!%20I%20already%20have%20a%20meeting%20booked%20and%20I%27d%20like%20to%20discuss%20priority%20onboarding."
                className="btn btn-y" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <WhatsAppIcon /> Message Us on WhatsApp →
              </a>
              <span style={{ fontSize: 12, color: "var(--muted, #666)" }}>⚡ We reply within 24 hours.</span>
            </div>
          </div>
        </div>
      )}

      {bookingState === "rebooked" && (
        <div style={{
          background: "rgba(255,215,0,0.06)", border: "1px solid rgba(255,215,0,0.2)",
          borderRadius: 14, padding: "18px 20px", marginBottom: 20, boxSizing: "border-box",
        }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <div style={{ fontSize: 28, flexShrink: 0 }}>✅</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: "#f0ebe5", margin: "0 0 4px" }}>Another meeting booked!</p>
              <p style={{ fontSize: 13, color: "var(--muted2, #888)", margin: 0 }}>You&apos;re all set. Want priority attention from our team?</p>
            </div>
            <button onClick={handleDismiss} aria-label="Dismiss" style={{ background: "none", border: "none", cursor: "pointer", color: "var(--muted2, #888)", fontSize: "1.1rem", lineHeight: 1, padding: "2px 4px", flexShrink: 0 }}>✕</button>
          </div>
          <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 10, padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ fontSize: 13, color: "var(--muted2,#888)", margin: 0 }}><strong>Get priority access</strong> — reach us directly on WhatsApp.</p>
              <a href="https://wa.me/919801458766?text=Hi%20Avenue!%20I%20already%20have%20a%20meeting%20booked%20and%20I%27d%20like%20to%20discuss%20priority%20onboarding."
                className="btn btn-y" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <WhatsAppIcon /> Message Us on WhatsApp →
              </a>
              <span style={{ fontSize: 12, color: "var(--muted, #666)" }}>⚡ We reply within 24 hours.</span>
            </div>
          </div>
        </div>
      )}

      <div ref={containerRef} style={{
        minWidth: 0, width: "100%", maxWidth: "100%",
        height: bookingState === "idle" ? height : 0,
        overflow: "hidden", borderRadius: 16,
        border: bookingState === "idle" ? "1px solid var(--border, rgba(255,255,255,0.08))" : "none",
        transition: "height 0.3s ease",
      }} />

      {bookingState === "idle" && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          flexWrap: "wrap", gap: 12, marginTop: 16, padding: "12px 20px",
          borderRadius: 12, background: "rgba(255,255,255,0.03)",
          border: "1px dashed rgba(255,255,255,0.1)", boxSizing: "border-box",
        }}>
          <span style={{ fontSize: 14, color: "var(--muted2,#888)" }}>😕 Can&apos;t find a free slot?</span>
          <a href="https://wa.me/919801458766?text=Hi%20Avenue!%20I%20checked%20the%20calendar%20but%20couldn%27t%20find%20a%20free%20slot.%20Can%20we%20sort%20a%20time%3F"
            target="_blank" rel="noreferrer" className="btn btn-y"
            style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <WhatsAppIcon /> Text us on WhatsApp →
          </a>
        </div>
      )}
    </section>
  );
}

type FieldErrors = { name?: string; email?: string; message?: string };

function ContactFormInner() {
  const searchParams = useSearchParams();
  const presetQuery  = searchParams.get("query") || "";
  const isCreator    = searchParams.get("creator") === "1";
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "more">("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const validate = (name: string, email: string, message: string): FieldErrors => {
    const errors: FieldErrors = {};
    if (!name.trim())    errors.name    = "Please enter your name";
    if (!email.trim())   errors.email   = "Please enter your email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Please enter a valid email";
    if (!message.trim()) errors.message = "Please enter a message";
    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendStatus === "sending") return;

    const data    = new FormData(e.currentTarget);
    const name    = (data.get("name")    || "").toString();
    const email   = (data.get("email")   || "").toString();
    const query   = (data.get("query")   || presetQuery || "").toString();
    const phone   = (data.get("phone")   || "").toString();
    const message = (data.get("message") || "").toString();

    // Validate first — highlight fields, don't show generic error
    const errors = validate(name, email, message);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Focus the first invalid field
      const firstKey = Object.keys(errors)[0] as keyof FieldErrors;
      const el = document.getElementById(`cf-${firstKey}`);
      el?.focus();
      return;
    }
    setFieldErrors({});
    setSendStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/avenueteamofficial@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name, email,
          phone:     phone   || "Not provided",
          query:     query   || "General enquiry",
          message,
          _subject:  "New enquiry from Avenue Marketing Agency website",
          _captcha:  "false",
          _template: "table",
        }),
      });
      if (res.ok) {
        setSendStatus("sent");
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setSendStatus("more"), 2500);
      } else {
        // Real server error — go back to idle so they can retry, no scary message
        setSendStatus("idle");
      }
    } catch {
      setSendStatus("idle");
    }
  };

  return (
    <section className="cp-section reveal vis" id="contact-form" suppressHydrationWarning>
      <style>{`
        #contact-form .cf-wrap {
          width: 100%;
          max-width: 680px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          box-sizing: border-box;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 0;
        }
        #contact-form .cf-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 600px) {
          #contact-form .cf-row { grid-template-columns: 1fr; }
        }
        #contact-form .cf-field {
          display: flex;
          flex-direction: column;
          gap: 4px;
          width: 100%;
          box-sizing: border-box;
          flex: unset;
          min-width: unset;
        }
        #contact-form .cf-field label {
          font-size: 12px;
          font-weight: 600;
          color: var(--muted2, #888);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }
        #contact-form .cf-field input,
        #contact-form .cf-field textarea {
          width: 100%;
          box-sizing: border-box;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 12px 14px;
          font-size: 15px;
          color: #f0ebe5;
          font-family: inherit;
          outline: none;
          transition: border-color 0.2s, background 0.2s;
          -webkit-appearance: none;
          max-width: 100%;
        }
        #contact-form .cf-field input:focus,
        #contact-form .cf-field textarea:focus {
          border-color: var(--gold, #FFD700);
          background: rgba(255,215,0,0.04);
        }
        #contact-form .cf-field input.cf-invalid,
        #contact-form .cf-field textarea.cf-invalid {
          border-color: #f44336;
          background: rgba(244,67,54,0.04);
        }
        #contact-form .cf-field textarea {
          resize: vertical;
          min-height: 110px;
        }
        #contact-form .cf-hint {
          font-size: 11.5px;
          color: #f44336;
          margin-top: 2px;
          min-height: 16px;
        }
        @media (max-width: 600px) {
          #contact-form .cf-field input,
          #contact-form .cf-field textarea { font-size: 16px; }
        }
        .cf-status-ok  { font-size: 14px; color: #4caf50; font-weight: 600; padding: 10px 0; }
        .cf-more       { font-size: 14px; color: var(--muted2, #888); margin: 0 0 8px; }
      `}</style>

      <div className="tc" style={{ marginBottom: 20 }}>
        <span className="stag">Get in Touch</span>
        <h2 className="sh">Tell Us What You&apos;re Looking For</h2>
        <span className="gold-bar" />
      </div>

      <form className="cf-wrap" onSubmit={handleSubmit} noValidate>
        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cf-name">Name*</label>
            <input
              id="cf-name" name="name" autoComplete="name"
              className={fieldErrors.name ? "cf-invalid" : ""}
              onChange={() => fieldErrors.name && setFieldErrors(p => ({ ...p, name: undefined }))}
            />
            {fieldErrors.name && <span className="cf-hint">{fieldErrors.name}</span>}
          </div>
          <div className="cf-field">
            <label htmlFor="cf-email">Email*</label>
            <input
              id="cf-email" name="email" type="email" autoComplete="email"
              className={fieldErrors.email ? "cf-invalid" : ""}
              onChange={() => fieldErrors.email && setFieldErrors(p => ({ ...p, email: undefined }))}
            />
            {fieldErrors.email && <span className="cf-hint">{fieldErrors.email}</span>}
          </div>
        </div>

        <div className="cf-row">
          <div className="cf-field">
            <label htmlFor="cf-phone">Phone (optional)</label>
            <input id="cf-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="cf-field">
            <label htmlFor="cf-query">Query</label>
            <input id="cf-query" name="query"
              defaultValue={presetQuery || (isCreator ? "Creator / Join as creator" : "")}
              placeholder="Campaign brief, partnership, support…" />
          </div>
        </div>

        <div className="cf-field">
          <label htmlFor="cf-message">Message*</label>
          <textarea
            id="cf-message" name="message" rows={4}
            className={fieldErrors.message ? "cf-invalid" : ""}
            onChange={() => fieldErrors.message && setFieldErrors(p => ({ ...p, message: undefined }))}
          />
          {fieldErrors.message && <span className="cf-hint">{fieldErrors.message}</span>}
        </div>

        {sendStatus === "idle"    && <button type="submit" className="btn btn-y">Send Message →</button>}
        {sendStatus === "sending" && <button className="btn btn-y" disabled style={{ opacity: 0.6, cursor: "not-allowed" }}>Sending…</button>}
        {sendStatus === "sent"    && <div className="cf-status-ok">✓ Message sent! We&apos;ll be in touch soon.</div>}
        {sendStatus === "more"    && (
          <>
            <p className="cf-more">Do you have something more to send?</p>
            <button type="submit" className="btn btn-y">Send Again →</button>
          </>
        )}
      </form>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        tag="Contact Us"
        h1="Let's Build Something Together"
        subtitle="Brands, creators, partners — we'd love to hear from you."
        buttons={[{ label: "Talk to Sales →", href: "#contact-form", variant: "gold" }]}
      />

      <Suspense fallback={null}>
        <ContactFormInner />
      </Suspense>

      <section className="cp-section reveal vis" suppressHydrationWarning>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 20,
          maxWidth: 680,
          margin: "0 auto",
          width: "100%",
          boxSizing: "border-box",
        }}>
          <div className="contact-card">
            <div className="contact-emoji">📅</div>
            <h3>Schedule a Meeting</h3>
            <p>Free 30-minute discovery call. Pick a time that works for you.</p>
            <a href="#book-a-call" className="btn btn-y">Book a Call →</a>
            <span className="contact-note">No commitment required.</span>
          </div>
          <div className="contact-card">
            <div className="contact-emoji">💬</div>
            <h3>Chat on WhatsApp</h3>
            <p>Quickest way to reach us directly.</p>
            <a href="https://wa.me/919801458766?text=Hi%20Avenue%20Marketing%20Agency!%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20potential%20campaign%20or%20collaboration.%20Could%20we%20connect%3F"
              className="btn btn-y" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <WhatsAppIcon /> Open WhatsApp →
            </a>
            <span className="contact-note">⚡ We reply within 24 hours.</span>
          </div>
        </div>
      </section>

      <CalendlyEmbed />

      <section className="cp-section reveal vis" suppressHydrationWarning>
        <div className="tc" style={{ marginBottom: 20 }}>
          <span className="stag">The People You'll Work With</span>
          <h2 className="sh">Meet the Team</h2>
          <span className="gold-bar" />
        </div>
        <TeamCards size="small" />
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a href="/team" className="btn btn-o">View Full Team Page →</a>
        </div>
      </section>
    </>
  );
}