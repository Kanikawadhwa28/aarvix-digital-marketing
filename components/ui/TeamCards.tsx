"use client";

import { teamMembers } from "@/data/team";

type TeamCardsProps = {
  size?: "large" | "small";
};

export default function TeamCards({ size = "large" }: TeamCardsProps) {
  const isLarge = size === "large";
  return (
    <div className="team-grid">
      {teamMembers.map((member) => (
        <div key={member.id} className="tcard2 team-card">
          <div
            className="tm-photo"
            style={{
              width: isLarge ? 120 : 80,
              height: isLarge ? 120 : 80,
              fontSize: isLarge ? 42 : 32,
            }}
          >
            {member.emoji}
          </div>
          <div className="tm-name">{member.name}</div>
          <p className="tm-bio">{isLarge ? member.bio : member.shortBio}</p>
        </div>
      ))}
    </div>
  );
}


