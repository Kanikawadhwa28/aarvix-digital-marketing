"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";
import { brandCarouselItems } from "@/data/brands";
import { campaigns, type Campaign } from "@/data/campaigns";
import PageHero from "@/components/ui/PageHero";
import StepCards, { Step } from "@/components/ui/StepCards";

const HERO_BADGES = ["2.3x Avg ROI", "Access to 7,50,000 Creators", "500+ Campaigns"];

const STEPS: Step[] = [
  { num: "01", icon: "📋", title: "Share Your Brief", desc: "Tell us goals, audience, budget and timeline." },
  { num: "02", icon: "🔍", title: "Discover Creators", desc: "Browse 7.5L+ verified influencers across every niche." },
  { num: "03", icon: "🚀", title: "Launch Campaign", desc: "Contracts, briefs, approvals, payments in one place." },
  { num: "04", icon: "📈", title: "Measure & Scale", desc: "Real-time dashboards show exactly what's working." },
];

const PAINS = [
  { top: "😤 You're overpaying creators",          bottom: "✅ Fair Price Index shows real market rates" },
  { top: "😤 You can't prove ROI to your CFO",      bottom: "✅ Real-time dashboard with revenue attribution" },
  { top: "😤 You don't know what competitors are doing", bottom: "✅ Competitor tracker maps their creator strategy" },
];

// ── Instagram gradient icon ───────────────────────────────────────────────────
const IgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13">
    <defs>
      <linearGradient id="igG2" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#igG2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.425 3.635 1.392 2.667 2.36 2.373 3.532 2.314 4.81 2.256 6.09 2.242 6.498 2.242 12c0 5.502.014 5.91.072 7.19.059 1.278.353 2.451 1.32 3.418.968.968 2.14 1.262 3.418 1.32C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.451-.353 3.418-1.32.968-.968 1.262-2.14 1.32-3.418.058-1.28.072-1.688.072-7.19 0-5.502-.014-5.91-.072-7.19-.059-1.278-.353-2.451-1.32-3.418C19.398.425 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

// ── Campaign video card ───────────────────────────────────────────────────────
function CampaignCard({ c }: { c: Campaign }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const resume = () => v.play().catch(() => {});
    v.addEventListener("pause", resume);
    return () => v.removeEventListener("pause", resume);
  }, []);

  return (
    <div className="vcard" style={{ cursor: "default" }}>
      <div
        className="vcard-bg"
        style={{
          height: 210, position: "relative", overflow: "hidden",
          background: "#0d0d0d",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64,
        }}
      >
        {/* Emoji fallback */}
        <span style={{ position: "relative", zIndex: 1 }}>{c.emoji}</span>

        {/* Looping video on top */}
        {c.videoPreview && (
          <video
            ref={videoRef}
            src={c.videoPreview}
            muted loop playsInline autoPlay preload="auto"
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "contain", opacity: 0,
              transition: "opacity 0.3s ease", zIndex: 2,
            }}
            onCanPlay={e => { (e.target as HTMLVideoElement).style.opacity = "1"; }}
          />
        )}
      </div>

      <div className="vcard-ov" />
      <div className="vcard-lbl">{c.label}</div>

      <div className="vcard-meta">
        <div className="vcard-brand">{c.brand}</div>
        <div className="vcard-stat">{c.stat}</div>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ForBrandsPage() {
  // Only campaigns with video/reel for the case studies section
  const videoCampaigns = campaigns.filter(c => c.videoPreview || c.image);
  return (
    <>
      <PageHero
        tag="For Brands"
        h1="Run Campaigns That Actually Drive ROI"
        subtitle="Stop guessing. Start measuring. We have access to 7,50,000 creators on India&apos;s most data-driven influencer marketing platform."
        buttons={[
          { label: "Talk to Sales →", href: "/contact", variant: "gold" },
        ]}
      />

      <section className="reveal" style={{ paddingTop: 10 }}>
        <div className="hero-badges">
          {HERO_BADGES.map((b, i) => (
            <div key={b} className="hero-badge" style={{ animationDelay: `${i * 0.5}s` }}>{b}</div>
          ))}
        </div>
      </section>

      {/* Brand carousel */}
      <section className="reveal">
        <div className="tc" style={{ marginBottom: 40 }}>
          <span className="stag">Brands</span>
          <h2 className="sh">Trusted by India&apos;s Fastest-Growing Brands</h2>
          <span className="gold-bar" />
        </div>
        <div className="brand-3d-wrap">
          <div className="brand-3d">
            <div className="brand-ring">
              {brandCarouselItems.map((b, i) => (
                <div key={b.id} className="brand-card" style={{ "--i": i } as CSSProperties}>
                  <div className="brand-card-title">
                    {b.image ? (
                      <img src={`/images/brands/${b.image}`} alt={b.name}
                        style={{ width: 28, height: 28, objectFit: "contain", borderRadius: 4 }}
                        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
                      />
                    ) : (
                      <span>{b.emoji ?? ""}</span>
                    )}
                    {b.name}
                  </div>
                  <div className="brand-card-stat">{b.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="brand-stats">
          <div className="brand-stat"><div className="brand-stat-val">₹***</div><div className="brand-stat-label">Managed</div></div>
          <div className="brand-stat"><div className="brand-stat-val">3x</div><div className="brand-stat-label">Avg ROI</div></div>
          <div className="brand-stat"><div className="brand-stat-val">500+</div><div className="brand-stat-label">Campaigns</div></div>
        </div>
      </section>

      {/* Pain points */}
      <section className="reveal">
        <div className="tc" style={{ marginBottom: 32 }}>
          <span className="stag">Challenges</span>
          <h2 className="sh">Sound Familiar?</h2>
          <span className="gold-bar" />
        </div>
        <div className="pain-grid">
          {PAINS.map((p) => (
            <div key={p.top} className="pain-card">
              <div className="pain-top">{p.top}</div>
              <div className="pain-divider" />
              <div className="pain-bottom">{p.bottom}</div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="reveal">
        <div className="tc" style={{ marginBottom: 40 }}>
          <span className="stag">How It Works</span>
          <h2 className="sh">From Brief to <em>Measurable ROI</em></h2>
          <span className="gold-bar" />
        </div>
        <StepCards steps={STEPS} />
      </section>

      {/* Case studies — video cards */}
      <section id="video-gallery" className="vid-bg reveal">
        <div className="tc" style={{ marginBottom: 44 }}>
          <span className="stag">Case Studies</span>
          <h2 className="sh">Results We&apos;ve <em>Delivered</em></h2>
          <p className="ssub" style={{ margin: "10px auto 0" }}>
            Real campaigns. Real results. Tap to watch.
          </p>
        </div>

        <div className="vid-grid">
          {videoCampaigns.map((c) => (
            <CampaignCard key={c.id} c={c} />
          ))}
        </div>

        <p style={{
          marginTop: 32, textAlign: "center", fontSize: 9,
          color: "var(--muted,#555)", maxWidth: 640,
          marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
        }}>
          * All proprietary content, intellectual assets, and brand identifiers showcased hereinabove remain the exclusive intellectual property of their respective proprietorial entities. Aarvix Digital Marketing curates and disseminates said campaigns solely for the purposes of amplifying socio-digital visibility and exemplifying superlative influencer-driven marketing executions.
        </p>
      </section>

    </>
  );
}