"use client";

import { useState } from "react";

export default function NewsletterSection() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubscribe = async () => {
    if (status === "sending" || status === "sent") return;
    setStatus("sending");

    try {
      const res = await fetch("https://formsubmit.co/ajax/avenueteamofficial@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: "Newsletter Subscribe — Avenue Marketing Agency",
          message: "Someone visited the website and clicked Subscribe on the newsletter section.",
          _captcha: "false",
          _template: "table",
        }),
      });

      // Treat any completed fetch as success (formsubmit quirk)
      const ok = res.ok || res.status < 500;
      if (ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section className="nl-bg reveal">
      <span className="nl-ico">📬</span>
      <span className="stag" style={{ display: "block", textAlign: "center" }}>Stay Ahead</span>
      <h2 className="sh" style={{ textAlign: "center", fontSize: "clamp(24px,3vw,40px)" }}>
        Get Weekly <em>Influencer Marketing</em> Insights
      </h2>
      <p className="ssub" style={{ textAlign: "center", margin: "10px auto 0" }}>
        Join 12,000+ marketers. No spam. Unsubscribe anytime.
      </p>

      <div className="nl-form" style={{ display: "flex", justifyContent: "center" }}>
        <button
          type="button"
          className="btn btn-y"
          onClick={handleSubscribe}
          disabled={status === "sending" || status === "sent"}
        >
          {status === "idle"    && "Subscribe →"}
          {status === "sending" && "Sending…"}
          {status === "sent"    && "Subscribed ✓"}
          {status === "error"   && "Try again →"}
        </button>
      </div>

      {/* Post-subscribe CTA — only shown after successful subscribe */}
      {status === "sent" && (
        <div style={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          animation: "fadeUp .4s ease forwards",
        }}>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", margin: 0 }}>
            Want us to reach out to you directly?
          </p>
          <a
            href="/contact"
            className="btn btn-o"
            style={{ fontSize: 13, padding: "9px 22px" }}
          >
            Yes, Contact Me →
          </a>
        </div>
      )}

      <p className="nl-note">📋 Weekly insights • 📊 Campaign data • 🎯 Creator spotlights — every Tuesday</p>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}