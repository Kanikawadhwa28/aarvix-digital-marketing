"use client";

import { useEffect } from "react";

const FAQS = [
  {
    q: "What exactly does Aarvix Digital Marketing do?",
    a: "We connect brands with the right creators for influencer marketing campaigns. Think of us as the bridge so we understand what a brand needs, find creators who genuinely fit, and make the collaboration happen. Simple, human, effective.",
  },
  {
    q: "How do you find the right creator for our brand?",
    a: "Through a mix of industry knowledge, our existing creator network, and research. We look at niche, audience fit, content style, and past work (not just follower count). Every recommendation is handpicked, not algorithm generated.",
  },
  {
    q: "We're a small brand then can we still work with you?",
    a: "Absolutely. Some of our best campaigns have been for smaller brands. We work with budgets of all sizes and are especially good at making barter collaborations work where product value replaces cash.",
  },
  {
    q: "What is a barter collaboration and how does it work?",
    a: "A barter collab means a creator receives your product or service in exchange for content so no cash changes hands. We handle the outreach, negotiation, and brief so the brand gets quality content and the creator gets real value.",
  },
  {
    q: "I'm a creator so how do I get brand deals through Avenue?",
    a: "Just reach out to us directly via the Contact page or WhatsApp. We work with creators across all sizes from nano to mega. If we think you're a good fit for a brand we're working with, we'll loop you in.",
  },
  {
    q: "What niches and industries do you work with?",
    a: "Fashion, beauty, food, travel, fitness, tech, gaming, finance, comedy, parenting — and more. If there's a creator community around it, we can work with it.",
  },
  {
    q: "How do we get started?",
    a: "Just contact us. No long forms, no demos. Tell us what you need (brand or creator) and we'll take it from there.",
  },
];

export default function FaqSection() {
  useEffect(() => {
    document.querySelectorAll<HTMLElement>(".faq-q").forEach((questionEl) => {
      questionEl.onclick = () => {
        const item = questionEl.parentElement;
        if (!item) return;
        const wasOpen = item.classList.contains("open");
        document.querySelectorAll<HTMLElement>(".faqitem").forEach((i) =>
          i.classList.remove("open")
        );
        if (!wasOpen) item.classList.add("open");
      };
    });
  }, []);

  const PlusIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );

  return (
    <section className="faq-bg reveal">
      <div className="tc">
        <span className="stag">FAQ</span>
        <h2 className="sh">Frequently Asked <em>Questions</em></h2>
        <span className="gold-bar" />
      </div>

      <div className="faq-wrap">
        {FAQS.map((faq) => (
          <div key={faq.q} className="faqitem">
            <div className="faq-q">
              <span className="faq-qt">{faq.q}</span>
              <span className="faq-ic"><PlusIcon /></span>
            </div>
            <div className="faq-a">
              <div className="faq-a-in">{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}