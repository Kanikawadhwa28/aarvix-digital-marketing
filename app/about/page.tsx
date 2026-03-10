import PageHero from "@/components/ui/PageHero";
import TeamCards from "@/components/ui/TeamCards";

export default function AboutPage() {
  return (
    <>
      {/* Hero styled like the team page hero */}
      <section className="team-hero reveal">
        <div className="team-hero-bg" />
        <PageHero
          tag="About Us"
          h1="About AARVIX"
          subtitle="AARVIX is an influencer marketing agency that helps brands grow through creator collaborations and high-impact social media campaigns."
          buttons={[
            { label: "Work With AARVIX →", href: "/for-brands", variant: "gold" },
            { label: "Talk to Our Team →", href: "/contact", variant: "outline" },
          ]}
        />
      </section>

      {/* Main about content, matching the team-page body styling */}
      <section className="team-bg reveal">
        <div className="tc" style={{ marginBottom: 24 }}>
          <span className="stag">About AARVIX</span>
          <h2 className="sh">Creators + Strategy + Content = Brand Growth.</h2>
          <span className="gold-bar" />
        </div>

        <div className="about-grid">
          <div className="about-block">
            <h3>Who We Are</h3>
            <p>
              AARVIX is an influencer marketing agency that helps brands grow through creator collaborations
              and high-impact social media campaigns. We connect brands with the right influencers and content
              creators to build authentic promotion, reach targeted audiences, and create content that drives
              engagement.
            </p>
            <p style={{ marginTop: 12 }}>
              Instead of traditional advertising, we help brands use trusted creators to promote products,
              build social proof, and reach millions of potential customers.
            </p>
          </div>

          <div className="about-block">
            <h3>What We Do</h3>
            <ul>
              <li>Influencer marketing campaigns</li>
              <li>Creator collaborations</li>
              <li>Viral reels strategy</li>
              <li>Brand growth through social media</li>
            </ul>
          </div>

          <div className="about-block">
            <h3>Our Mission</h3>
            <p>
              To help brands grow faster by using the power of creators and authentic digital marketing.
            </p>
          </div>

          <div className="about-block">
            <h3>Why Brands Work With Us</h3>
            <ul>
              <li>Access to a growing network of creators</li>
              <li>Campaign strategy and execution</li>
              <li>Authentic promotion that builds trust</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Meet the team section moved here from Contact page */}
      <section className="team-bg reveal">
        <div className="tc" style={{ marginBottom: 18 }}>
          <span className="stag">Leadership</span>
          <h2 className="sh">Meet the Team</h2>
          <span className="gold-bar" />
        </div>
        <TeamCards size="large" />
      </section>

      <section className="reveal" style={{ textAlign: "center" }}>
        <span className="stag">Work With Us</span>
        <h2 className="sh">Ready to grow with creators?</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          Whether you&apos;re a brand planning your next campaign or a creator looking to collaborate, AARVIX
          helps you turn content into measurable growth.
        </p>
        <span className="gold-bar" />
        <div style={{ marginTop: 30, display: "flex", justifyContent: "center", gap: 12 }}>
          <a href="/for-brands" className="btn btn-y">
            For Brands →
          </a>
          <a href="/for-creators" className="btn btn-o">
            For Creators →
          </a>
        </div>
      </section>
    </>
  );
}


