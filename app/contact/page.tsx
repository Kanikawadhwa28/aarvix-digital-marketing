"use client";

import { useState, useEffect, useRef, FormEvent, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import PageHero from "@/components/ui/PageHero";

/* ── Shared styles — top level so they apply to ALL sections ── */
const CONTACT_STYLES = `
  .cp-section {
    width: 100%;
    box-sizing: border-box;
    padding: 60px clamp(16px, 4vw, 40px);
  }
  @media (max-width: 600px) {
    .cp-section { padding: 40px 16px; }
  }

  /* ── Form ── */
  .cp-form {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
    box-sizing: border-box;
  }
  .cp-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    .cp-row { grid-template-columns: 1fr; gap: 12px; }
    .cp-form { gap: 12px; }
  }
  .cp-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    width: 100%;
    box-sizing: border-box;
    min-width: 0;
  }
  .cp-field label {
    font-size: 11px;
    font-weight: 700;
    color: var(--muted2, #888);
    letter-spacing: 0.08em;
    text-transform: uppercase;
    font-family: var(--disp, 'Syne', sans-serif);
  }
  .cp-field input,
  .cp-field textarea {
    width: 100%;
    box-sizing: border-box;
    background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 12px 14px;
    font-size: 16px; /* 16px prevents iOS zoom */
    color: var(--text, #f5f5f7);
    font-family: var(--body, 'DM Sans', sans-serif);
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    -webkit-appearance: none;
    appearance: none;
  }
  .cp-field input:focus,
  .cp-field textarea:focus {
    border-color: var(--gold, #FFD700);
    background: rgba(255,215,0,0.03);
  }
  .cp-field textarea {
    resize: vertical;
    min-height: 110px;
  }
  .cp-status     { font-size: 14px; color: var(--muted2,#888); padding: 10px 0; }
  .cp-status-ok  { color: #4caf50; }
  .cp-status-err { color: #f44336; }
  .cp-more       { font-size: 14px; color: var(--muted2,#888); margin: 0 0 8px; }

  /* ── Quick contact cards ── */
  .cp-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 18px;
    max-width: 680px;
    margin: 0 auto;
    width: 100%;
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    .cp-cards { grid-template-columns: 1fr; }
  }
  .cp-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px;
    padding: 22px 18px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    box-sizing: border-box;
    transition: border-color 0.25s, transform 0.25s;
  }
  .cp-card:hover {
    border-color: rgba(255,215,0,0.3);
    transform: translateY(-4px);
  }
  .cp-card h3 { font-size: 16px; font-weight: 700; color: var(--text,#f5f5f7); margin: 0; font-family: var(--disp,'Syne',sans-serif); }
  .cp-card p  { font-size: 13.5px; color: var(--muted2,#888); margin: 0; line-height: 1.55; }
  .cp-card-emoji { font-size: 28px; }
  .cp-note { font-size: 11.5px; color: var(--muted,#555); }

  /* ── Calendly banners ── */
  .cal-banner {
    background: rgba(255,215,0,0.05);
    border: 1px solid rgba(255,215,0,0.2);
    border-radius: 14px;
    padding: 18px 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .cal-banner-inner { display: flex; align-items: flex-start; gap: 14px; }
  .cal-icon  { font-size: 26px; flex-shrink: 0; }
  .cal-title { font-size: 15px; font-weight: 700; color: var(--text,#f5f5f7); margin: 0 0 4px; }
  .cal-sub   { font-size: 13px; color: var(--muted2,#888); margin: 0; }
  .cal-dismiss { background: none; border: none; cursor: pointer; color: var(--muted2,#888); font-size: 1.1rem; padding: 2px 4px; flex-shrink: 0; }
  .cal-actions { margin-top: 14px; display: flex; flex-direction: column; gap: 10px; }
  .cal-or { font-size: 12px; color: var(--muted2,#888); text-align: center; }
  .cal-priority { background: rgba(255,255,255,0.03); border-radius: 10px; padding: 14px; display: flex; flex-direction: column; gap: 10px; }
  .cal-priority p { font-size: 13px; color: var(--muted2,#888); margin: 0; }
  .cal-noslot {
    display: flex; align-items: center; justify-content: center;
    flex-wrap: wrap; gap: 12px; margin-top: 16px;
    padding: 12px 20px; border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px dashed rgba(255,255,255,0.1);
    box-sizing: border-box;
  }
  .cal-noslot span { font-size: 14px; color: var(--muted2,#888); }
`;

function WhatsAppIcon({ size = 20 }: { size?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width={size} height={size}
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }} aria-hidden="true">
      <path fill="#25D366" d="M4.9 43.3 7.6 33.5C5.9 31 5 28.1 5 25 5 13.9 13.9 5 25 5s20 8.9 20 20-8.9 20-20 20c-3 0-5.8-.7-8.3-1.9z"/>
      <path fill="#fff" d="M19.3 16c-.4-.9-.8-.9-1.2-.9h-1c-.4 0-.9.1-1.4.7-.5.5-1.8 1.7-1.8 4.2s1.8 4.9 2.1 5.2c.2.3 3.5 5.6 8.6 7.6 4.3 1.7 5.1 1.4 6 1.3.9-.1 2.9-1.2 3.3-2.3.4-1.1.4-2.1.3-2.3-.1-.2-.5-.4-.9-.6l-3.3-1.6c-.4-.2-.7-.3-1 .1-.3.4-1.2 1.5-1.4 1.8-.2.3-.5.3-.9.1-3.3-1.6-5.4-3.7-5.7-4.3-.3-.6.1-.9.4-1.1l.9-.9c.2-.2.3-.5.4-.8z"/>
    </svg>
  );
}

const CALENDLY_URL = "https://calendly.com/aarvixmarketing/30min";
const SCRIPT_ID    = "calendly-widget-js";
const CSS_ID       = "calendly-widget-css";
type BookingState  = "idle" | "booked" | "rebooked";

function CalendlyEmbed({ height = 600 }: { height?: number }) {
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
    <section className="cp-section reveal" id="book-a-call">
      <div className="tc" style={{ marginBottom: 20 }}>
        <span className="stag">Book a Meeting</span>
        <h2 className="sh">Pick a Time That Works for You</h2>
        <span className="gold-bar" />
        <p style={{ marginTop: 12, color: "var(--muted2, #888)", fontSize: 15 }}>
          Free 30-minute discovery call — no commitment required.
        </p>
      </div>

      {bookingState === "booked" && (
        <div className="cal-banner">
          <div className="cal-banner-inner">
            <div className="cal-icon">🎉</div>
            <div style={{ flex: 1 }}>
              <p className="cal-title">You&apos;re booked! See you soon.</p>
              <p className="cal-sub">Need another slot for a colleague or a follow-up?</p>
            </div>
            <button onClick={handleDismiss} aria-label="Dismiss" className="cal-dismiss">✕</button>
          </div>
          <div className="cal-actions">
            <button className="btn btn-y" onClick={handleDismiss}>Book Another Meeting →</button>
            <span className="cal-or">or</span>
            <div className="cal-priority">
              <p><strong>Already booked?</strong> Want to be seen as a priority client?</p>
              <a href="https://wa.me/919801458766?text=Hi%Aarvix!%20I%20already%20have%20a%20meeting%20booked%20and%20I%27d%20like%20to%20discuss%20priority%20onboarding."
                className="btn btn-y" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <WhatsAppIcon /> Message Us on WhatsApp →
              </a>
              <span className="cp-note">⚡ We reply within 24 hours.</span>
            </div>
          </div>
        </div>
      )}

      {bookingState === "rebooked" && (
        <div className="cal-banner">
          <div className="cal-banner-inner">
            <div className="cal-icon">✅</div>
            <div style={{ flex: 1 }}>
              <p className="cal-title">Another meeting booked!</p>
              <p className="cal-sub">You&apos;re all set. Want priority attention from our team?</p>
            </div>
            <button onClick={handleDismiss} aria-label="Dismiss" className="cal-dismiss">✕</button>
          </div>
          <div className="cal-actions">
            <div className="cal-priority">
              <p><strong>Get priority access</strong> — reach us directly on WhatsApp.</p>
              <a href="https://wa.me/919801458766?text=Hi%Aarvix!%20I%20already%20have%20a%20meeting%20booked%20and%20I%27d%20like%20to%20discuss%20priority%20onboarding."
                className="btn btn-y" target="_blank" rel="noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                <WhatsAppIcon /> Message Us on WhatsApp →
              </a>
              <span className="cp-note">⚡ We reply within 24 hours.</span>
            </div>
          </div>
        </div>
      )}

      <div
        ref={containerRef}
        style={{
          minWidth: 0,
          width: "100%",
          maxWidth: "100%",
          height: bookingState === "idle" ? height : 0,
          minHeight: bookingState === "idle" ? 420 : 0,
          overflow: "hidden",
          borderRadius: 16,
          border: bookingState === "idle" ? "1px solid rgba(255,255,255,0.08)" : "none",
          transition: "height 0.3s ease",
        }}
      />

      {bookingState === "idle" && (
        <div className="cal-noslot">
          <span>😕 Can&apos;t find a free slot?</span>
          <a href="https://wa.me/919801458766?text=Hi%20Aarvix!%20I%20checked%20the%20calendar%20but%20couldn%27t%20find%20a%20free%20slot.%20Can%20we%20sort%20a%20time%3F"
            target="_blank" rel="noreferrer" className="btn btn-y"
            style={{ fontSize: "0.85rem", padding: "8px 16px", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <WhatsAppIcon /> Text us on WhatsApp →
          </a>
        </div>
      )}
    </section>
  );
}

function ContactFormInner() {
  const searchParams    = useSearchParams();
  const [queryDefault, setQueryDefault] = useState("");
  const [sendStatus, setSendStatus] = useState<"idle" | "sending" | "sent" | "error" | "more">("idle");

  // Only read searchParams on client to avoid SSR/client HTML mismatch
  useEffect(() => {
    const presetQuery = searchParams.get("query") || "";
    const isCreator   = searchParams.get("creator") === "1";
    setQueryDefault(presetQuery || (isCreator ? "Creator " : ""));
  }, [searchParams]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendStatus === "sending") return;

    const raw     = new FormData(e.currentTarget);
    const name    = (raw.get("name")    || "").toString().trim();
    const email   = (raw.get("email")   || "").toString().trim();
    const phone   = (raw.get("phone")   || "").toString().trim();
    const query   = (raw.get("query")   || queryDefault || "").toString().trim();
    const message = (raw.get("message") || "").toString().trim();

    // Build FormData payload — more reliable than JSON with formsubmit.co
    const fd = new FormData();
    fd.append("name",     name);
    fd.append("email",    email);
    fd.append("phone",    phone   || "Not provided");
    fd.append("query",    query   || "General enquiry");
    fd.append("message",  message);
    fd.append("_subject", "New enquiry from Aarvix Digital Marketing website");
    fd.append("_captcha", "false");
    fd.append("_template","table");
    fd.append("_next",    ""); // prevent redirect

    setSendStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/aarvixmarketing@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });

      // FormSubmit sometimes returns non-200 even on success
      // Treat any completed fetch (no network error) as sent
      let isSuccess = true;
      try {
        const json = await res.json();
        // Only fail if explicitly told so
        if (json.success === false || json.success === "false") isSuccess = false;
      } catch {
        // Can't parse JSON — assume sent if status < 500
        if (res.status >= 500) isSuccess = false;
      }

      if (isSuccess) {
        setSendStatus("sent");
        e.currentTarget.reset();
        setQueryDefault("");
        setTimeout(() => setSendStatus("more"), 2500);
      } else {
        setSendStatus("error");
        setTimeout(() => setSendStatus("idle"), 4000);
      }
    } catch {
      // Actual network failure
      setSendStatus("error");
      setTimeout(() => setSendStatus("idle"), 4000);
    }
  };

  return (
    <section className="cp-section reveal vis" id="contact-form">
      <div className="tc" style={{ marginBottom: 20 }}>
        <span className="stag">Get in Touch</span>
        <h2 className="sh">Tell Us What You&apos;re Looking For</h2>
        <span className="gold-bar" />
      </div>

      <form className="cp-form" onSubmit={handleSubmit}>
        <div className="cp-row">
          <div className="cp-field">
            <label htmlFor="cf-name">Name*</label>
            <input id="cf-name" name="name" required placeholder="Your name" />
          </div>
          <div className="cp-field">
            <label htmlFor="cf-email">Email*</label>
            <input id="cf-email" name="email" type="email" required placeholder="you@example.com" />
          </div>
        </div>

        <div className="cp-row">
          <div className="cp-field">
            <label htmlFor="cf-phone">Phone (optional)</label>
            <input id="cf-phone" name="phone" type="tel" placeholder="+91 XXXXX XXXXX" />
          </div>
          <div className="cp-field">
            <label htmlFor="cf-query">Query*</label>
            <select
              id="cf-query"
              name="query"
              required
              value={queryDefault}
              onChange={e => setQueryDefault(e.target.value)}
              className={`cf-select${!queryDefault ? " cf-select-placeholder" : ""}`}
            >
              <option value="" disabled>Select campaign type…</option>
              <option value="Creator">Creator</option>
              <option value="Barter Collaborations">Barter Collaborations</option>
              <option value="Paid Influencer Campaigns">Paid Influencer Campaigns</option>
              <option value="Affiliate Campaigns">Affiliate Campaigns</option>
              <option value="Brand Awareness Campaigns">Brand Awareness Campaigns</option>
              <option value="UGC Content Creation">UGC Content Creation</option>
              <option value="Giveaway Campaigns">Giveaway Campaigns</option>
              <option value="Brand Ambassador Programs">Brand Ambassador Programs</option>
              <option value="Product Launch Promotions">Product Launch Promotions</option>
              <option value="Event Promotions">Event Promotions</option>
              <option value="Sponsored Posts">Sponsored Posts</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="cp-field">
          <label htmlFor="cf-message">Message*</label>
          <textarea id="cf-message" name="message" required rows={4} placeholder="Tell us more…" />
        </div>

        {sendStatus === "idle"    && <button type="submit" className="btn btn-y">Send Message →</button>}
        {sendStatus === "sending" && <div className="cp-status">Sending…</div>}
        {sendStatus === "sent"    && <div className="cp-status cp-status-ok">✅ Message sent! We'll get back to you soon.</div>}
        {sendStatus === "error"   && (
          <div className="cp-status cp-status-err">
            ⚠️ Something went wrong. Please try again or reach us on WhatsApp.
          </div>
        )}
        {sendStatus === "more"    && (
          <>
            <p className="cp-more">Do you have something more to send?</p>
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
      {/* Styles injected once at top level — apply to ALL sections */}
      <style>{CONTACT_STYLES}</style>

      <PageHero
        tag="Contact Us"
        h1="Let's Build Something Together"
        subtitle="Brands, creators, partners — we'd love to hear from you."
        buttons={[{ label: "Talk to Sales →", href: "#contact-form", variant: "gold" }]}
      />

      <Suspense fallback={null}>
        <ContactFormInner />
      </Suspense>

      {/* Quick contact cards */}
      <section className="cp-section reveal">
        <div className="cp-cards">
          <div className="cp-card">
            <div className="cp-card-emoji">🗓️</div>
            <h3>Schedule a Meeting</h3>
            <p>Free 30-minute discovery call. Pick a time that works for you.</p>
            <a href="#book-a-call" className="btn btn-y">Book a Call →</a>
            <span className="cp-note">No commitment required.</span>
          </div>
          <div className="cp-card">
            <div className="cp-card-emoji">💬</div>
            <h3>Chat on WhatsApp</h3>
            <p>Quickest way to reach us directly.</p>
            <a href="https://wa.me/919801458766?text=Hi%Aarvix%20Marketing%20Agency!%20I%20came%20across%20your%20website%20and%20I%27m%20interested%20in%20discussing%20a%20potential%20campaign%20or%20collaboration.%20Could%20we%20connect%3F"
              className="btn btn-y" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              <WhatsAppIcon /> Open WhatsApp →
            </a>
            <span className="cp-note">⚡ We reply within 24 hours.</span>
          </div>
        </div>
      </section>

      <CalendlyEmbed />

      {/* Team showcase removed from contact page as requested */}
    </>
  );
}