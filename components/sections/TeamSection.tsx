"use client";

import TeamCards from "@/components/ui/TeamCards";

export default function TeamSection() {
  return (
    <section className="team-bg reveal">
      <div className="tc" style={{ marginBottom: 14 }}>
        <span className="stag">Meet the Team</span>
        <h2 className="sh">Built by Strategists Who Understand <em>Both Sides</em></h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          The team behind Aarvix Digital Marketing — a trusted influencer marketing partner
        </p>
      </div>
      <TeamCards size="large" />
    </section>
  );
}
