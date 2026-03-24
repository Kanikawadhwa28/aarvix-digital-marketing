"use client";

import { useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17" cy="7" r="1.2" fill="currentColor" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


const FOOTER_COLS = [
  {
    title: "Company",
    links: ["About Us", "Our Team", "For Brands", "For Creators", "Platform", "Blog"],
  },
  {
    title: "Platform",
    links: ["Blogs", "Our Work"],
  },
  {
    title: "Top Niches",
    links: ["Fashion & Lifestyle", "Food & Travel", "Beauty & Skincare", "Gaming", "Finance & Edu"],
  },
];

const TERMS_TEXT = `All proprietary brand identifiers, creator-originated intellectual assets, and campaign-specific material disseminated across the digital infrastructure of this platform shall unequivocally remain under the exclusive proprietorial dominion of their respectively designated originating entities — Aarvix Digital Marketing hereby categorically disclaims any assertion of ownership, co-ownership, or affiliated rights over any third-party intellectual property showcased, referenced, or otherwise represented herein. The brands, creators, and associated campaign executions exhibited hereinabove collectively encompass entities with whom Aarvix Digital Marketing has engaged in direct, indirect, circumstantial, or prospectively anticipated collaborative undertakings, inclusive of those currently traversing the formalised onboarding continuum in anticipation of forthcoming strategic and commercial partnerships. The deliberate curation and public dissemination of said content serves an exclusively amplificatory purpose — specifically, the systematic augmentation of socio-digital visibility, the optimisation of deal-acquisition probability, and the facilitation of expansive, mutually beneficial professional network proliferation — with unconditional and unambiguous attribution ceremoniously accorded to all featured proprietorial parties without exception. Aarvix Digital Marketing unwaveringly conducts the totality of its operational, commercial, and interpersonal engagements in strict accordance with an inviolable institutional ethos predicated upon trust, radical transparency, and scrupulous conscientious adherence to the intellectual, creative, and contractual rights and entitlements of every collaborating, affiliated, or prospectively associated entity. Should any disputes, apprehensions, or contentions materialise with respect to the representation, utilisation, or contextualisation of any featured content, brand identity, or creator-associated intellectual property, the immediate initiation of formal correspondence addressed to aarvixmarketing@gmail.com shall be received with the utmost urgency and resolved with uncompromising expedience and demonstrable good faith.`;

export default function Footer() {
  const pathname = usePathname();
  const [showTerms, setShowTerms] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const getHref = (link: string, colTitle: string) => {
    if (colTitle === "Top Niches") return "/#top-creators";
    if (link === "About Us") return "/about";
    if (link === "Our Team") return "/team";
    if (link === "For Brands") return "/for-brands";
    if (link === "For Creators") return "/for-creators";
    if (link === "Platform") return "/platform";
    if (link === "Blog") return "/platform#blog";
    if (["Blogs"].includes(link)) return "/platform#blog";
    if (link === "Our Work") return "/platform#work";
    if (link === "Case Studies") return "/platform#work";
    return "/";
  };

  const handleFooterClick = () => {
    const now = Date.now();
    if (now - lastClickTime < 400) {
      const next = clickCount + 1;
      setClickCount(next);
      if (next >= 3) {
        setShowTerms(true);
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  // Terms link — feeds into the same 3-click counter
  const handleTermsClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (showTerms) {
      setShowTerms(false);
      setClickCount(0);
    } else {
      handleFooterClick();
    }
  };

  const shouldShowTerms = showTerms && !pathname.startsWith("/for-creators");

  return (
    <footer onClick={handleFooterClick}>
      <div className="ft-top">
        {/* Brand column */}
        <div className="ft-brand">
          <h4>
            Aarvix Digital <em>Marketing</em>
          </h4>
          <p>
            Aarvix Digital Marketing connects 7,50,000+ creators with brands that demand real ROI and
            meaningful barter collaborations — powered by data, run by experts.
          </p>
          <div className="socials">
            <a href="https://www.instagram.com/aarvix_marketing_agency?igsh=MXd3MjZtemptMjh0cw=="
              className="soc soc-ig" target="_blank" rel="noreferrer" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="https://www.linkedin.com/"
              className="soc soc-li" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {FOOTER_COLS.map((col) => (
          <div key={col.title} className="ft-col">
            <h5>{col.title}</h5>
            {col.links.map((link) => (
              <a key={link} href={getHref(link, col.title)}>{link}</a>
            ))}
          </div>
        ))}
      </div>

      <div className="ft-bot">
        <p>© 2026 Aarvix Digital Marketing. All rights reserved.</p>
        <div className="ft-bot-links">
          <a href="#">Privacy</a>
          <a href="#" onClick={handleTermsClick}>Terms</a>
          <a href="#">Cookies</a>
        </div>
      </div>

      {/* Terms — revealed on clicking Terms link or triple-clicking footer */}
      {shouldShowTerms && (
        <p style={{
          margin: "8px auto 0",
          maxWidth: 860,
          padding: "0 16px 16px",
          fontSize: 9,
          lineHeight: 1.6,
          color: "var(--muted, #444)",
          textAlign: "justify",
          cursor: "default",
        }}>
          {TERMS_TEXT}
        </p>
      )}
    </footer>
  );
}