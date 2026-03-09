import PageHero from "@/components/ui/PageHero";
import TeamSection from "@/components/sections/TeamSection";

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About Us"
        h1="About Aarvix Digital Marketing"
        subtitle="Aarvix Digital Marketing connects brands and creators through data-driven influencer campaigns and meaningful barter collaborations."
        buttons={[]}
      />

      <section className="reveal">
        <div className="tc" style={{ marginBottom: 24 }}>
          <span className="stag">Who We Are</span>
          <h2 className="sh">
            A creator-first, ROI-obsessed influencer marketing partner.
          </h2>
          <span className="gold-bar" />
        </div>
        <div className="about-grid">
          <div className="about-block">
            <h3>Our Story</h3>
            <p>
              Aarvix Digital Marketing was built to solve a simple problem: brands were spending heavily on influencer
              marketing without clear strategy or measurement, while creators struggled to find the right brand
              partnerships. We exist to align both sides and make every collaboration genuinely win–win.
            </p>
          </div>
          <div className="about-block">
            <h3>What We Do</h3>
            <p>
              We help brands plan, execute, and measure campaigns across Instagram, YouTube and beyond using a curated
              network of creators. From creator discovery and pricing intelligence to campaign management and reporting,
              Aarvix keeps everything under one roof.
            </p>
          </div>
          <div className="about-block">
            <h3>How We Work</h3>
            <p>
              Every brief is handled by a strategist who understands both brand goals and creator realities. We
              prioritise long–term relationships over one–off posts, focus on clear ROI, and operate with full
              transparency on expectations, deliverables, and outcomes.
            </p>
          </div>
        </div>
      </section>

      <TeamSection />

      <section className="reveal" style={{ textAlign: "center" }}>
        <span className="stag">Work With Us</span>
        <h2 className="sh">Brand, creator, or future teammate?</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          If you care about thoughtful collaborations and real outcomes, we&apos;d love to talk.
        </p>
        <span className="gold-bar" />
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 12 }}>
          <a href="/contact" className="btn btn-y">
            Contact Us →
          </a>
          <a href="/contact" className="btn btn-o">
            Join the Team →
          </a>
        </div>
      </section>
    </>
  );
}

