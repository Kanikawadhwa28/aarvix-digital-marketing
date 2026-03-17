// src/data/team.ts
// Drop your photos in public/images/team/ and update the img paths below.
// Remove background from images before saving (use remove.bg or Photoshop).

export type TeamMember = {
  id: string;
  name: string;
  title: string;
  emoji: string;
  img: string;          // e.g. "/images/team/yaman-khan.png"
  bio: string;
  shortBio: string;
  instagramUrl: string;
};

export const teamMembers: TeamMember[] = [
  {
    id: "yaman",
    name: "Yaman Khan",
    title: "Founder",
    emoji: "🦁",
    img: "/images/team/yaman-khan.png",
    bio: "Oversees strategy, campaign execution and creator network. Ensures seamless delivery from brief to performance.",
    shortBio: "Oversees strategy and scales the creator network sustainably.",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    id: "sunny",
    name: "Sunny Kumar",
    title: "Co-founder",
    emoji: "☀️",
    img: "/images/team/sunny-kumar.png",
    bio: "Leads creator strategy and brand alignment across campaigns. Focused on building long-term partnerships, not one-off promotions.",
    shortBio: "Leads creator strategy and long-term brand partnerships across key categories.",
    instagramUrl: "https://www.instagram.com/",
  },
  {
    id: "shubham",
    name: "Shubham Chaudhary",
    title: "Creative Lead",
    emoji: "🎨",
    img: "/images/team/shubham-chaudhary.png",
    bio: "Bridges brand goals with creator authenticity. Hands-on across strategy, selection and execution.",
    shortBio: "Ensures every campaign feels authentic to creators while delivering brand KPIs.",
    instagramUrl: "https://www.instagram.com/",
  },
];