 "use client";

import { Suspense } from "react";
import PageHero from "@/components/ui/PageHero";
import StepCards, { Step } from "@/components/ui/StepCards";
import InfluencerDirectory from "@/components/sections/InfluencerDirectory";

const HERO_BADGES = ["Free to Join", "Get Paid on Time", "Top Brand Deals"];

const CREATOR_STEPS: Step[] = [
  { num: "01", icon: "🙋", title: "Create Profile", desc: "Join free and link your social platforms." },
  { num: "02", icon: "🔍", title: "Get Matched", desc: "Brands discover you by niche and audience." },
  { num: "03", icon: "🤝", title: "Collaborate", desc: "Receive briefs, create content, submit for review." },
  { num: "04", icon: "💸", title: "Get Paid", desc: "Payment within 3 days of approved delivery." },
];

export default function ForCreatorsPage() {

  return (
    <>
      <PageHero
        tag="For Creators"
        h1="Get Discovered. Get Paid. Grow Faster."
        subtitle="We have access to 7,50,000 creators already collaborating with India&apos;s top brands."
        buttons={[]}
      />

      <section className="reveal" style={{ paddingTop: 10 }}>
        <div className="hero-badges">
          {HERO_BADGES.map((b, i) => (
            <div key={b} className="hero-badge" style={{ animationDelay: `${i * 0.5}s` }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      <section className="reveal">
        <div className="tc" style={{ marginBottom: 26 }}>
          <span className="stag">Community</span>
          <h2 className="sh">Creators Already in the <em>Aarvix Digital Marketing</em> Network</h2>
          <p className="ssub" style={{ margin: "10px auto 0" }}>Explore top creators by category.</p>
          <span className="gold-bar" />
        </div>
        <Suspense fallback={<div style={{ textAlign: "center", marginTop: 24 }}>Loading creators…</div>}>
          <InfluencerDirectory />
        </Suspense>
      </section>

      <section className="reveal">
        <div className="tc" style={{ marginBottom: 32 }}>
          <span className="stag">Why Aarvix</span>
          <h2 className="sh">Why Creators Choose <em>Aarvix Digital Marketing</em></h2>
          <span className="gold-bar" />
        </div>
        <div className="benefit-grid">
          <div className="benefit-card">
            <div className="benefit-emoji">🌟</div>
            <h3>Get Discovered</h3>
            <p>Brands search for you by niche, audience size and engagement. No cold emailing, just inbound deals.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-emoji">💸</div>
            <h3>Get Paid Securely</h3>
            <p>Payments processed within 3 days of content approval. Secure, transparent and on time.</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-emoji">📈</div>
            <h3>Grow Your Brand</h3>
            <p>Access exclusive deals from 500+ top brands to level up your creator career.</p>
          </div>
        </div>
      </section>

      <section className="reveal">
        <div className="tc" style={{ marginBottom: 40 }}>
          <span className="stag">How It Works</span>
          <h2 className="sh">Turn Your <em>Audience</em> into Income</h2>
          <span className="gold-bar" />
        </div>
        <StepCards steps={CREATOR_STEPS} />
      </section>

      <section className="reveal">
        <div className="tc">
          <span className="stag">Next Step</span>
          <h2 className="sh">Ready to Start <em>Earning?</em></h2>
          <p className="ssub" style={{ margin: "10px auto 0" }}>
            Free forever. Zero commission on your earnings.
          </p>
          <span className="gold-bar" />
        </div>
        <div style={{ textAlign: "center", marginTop: 30 }}>
          <a href="/contact?creator=1" className="btn btn-y">
            Join as a Creator →
          </a>
        </div>
      </section>
    </>
  );
}