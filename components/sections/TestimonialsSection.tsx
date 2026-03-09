"use client";

import { useEffect } from "react";

const TESTIMONIALS = [
  { quote: "Aarvix Digital Marketing's Fair Price Index saved us ₹18L on our first campaign. We now have full pricing transparency and our ROI has more than doubled.", result: "🔥 2x ROI Achieved", name: "Priya Sharma", role: "Head of Marketing, Navi", avatarLetter: "P", avatarBg: "linear-gradient(135deg,#FFD700,#ff8c00)" },
  { quote: "The competitor tracking feature is a game-changer. We discovered creators our competitors were using — and we onboarded them before their next campaign launched.", result: "🎯 3x Share of Voice", name: "Rahul Mehta", role: "CMO, Samsonite India", avatarLetter: "R", avatarBg: "linear-gradient(135deg,#4a90d9,#1565c0)" },
  { quote: "Coordinating 500+ gaming creators was seamlessly managed on the platform. Real-time tracking let us optimise mid-campaign and smash every single KPI.", result: "⚡ 15M Engagements", name: "Amit Kumar", role: "Growth Lead, BGMI", avatarLetter: "A", avatarBg: "linear-gradient(135deg,#66BB6A,#2e7d32)" },
  { quote: "12 nano-influencers found through Aarvix Digital Marketing each drove 5x better conversion than mega-influencers we were paying 20x more for. The data doesn't lie.", result: "📈 5x Conversion Rate", name: "Sneha Agarwal", role: "D2C Lead, Mamaearth", avatarLetter: "S", avatarBg: "linear-gradient(135deg,#f06292,#ad1457)" },
  { quote: "Samsung Galaxy launch hit 22M reach in 10 days. Best performance numbers we've ever seen — and the reporting dashboard made presenting to leadership effortless.", result: "📱 22M Reach, 10 Days", name: "Kiran Joshi", role: "Marketing Director, Samsung India", avatarLetter: "K", avatarBg: "linear-gradient(135deg,#29b6f6,#0277bd)" },
];

export default function TestimonialsSection() {
  useEffect(() => {
    const track = document.getElementById("tsti");
    const dotsContainer = document.getElementById("tdots");
    const cards = document.querySelectorAll<HTMLElement>(".tcard3");
    if (!track || !dotsContainer || !cards.length) return;

    let currentIndex = 0;

    // Create navigation dots
    cards.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "tdot2" + (i === 0 ? " on" : "");
      dot.onclick = () => goTo(i);
      dotsContainer.appendChild(dot);
    });

    const goTo = (n: number) => {
      // Clamp so we don't scroll past the last 3 cards
      currentIndex = Math.max(0, Math.min(n, cards.length - 3));
      const cardWidth = cards[0].offsetWidth + 18; // 18 = gap
      track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      dotsContainer.querySelectorAll(".tdot2").forEach((d, i) => {
        d.classList.toggle("on", i === currentIndex);
      });
    };

    // Arrow buttons
    document.querySelectorAll<HTMLElement>(".tnb").forEach((btn, idx) => {
      btn.onclick = () => goTo(currentIndex + (idx === 0 ? -1 : 1));
    });
  }, []);

  return (
    <section className="tsti-bg reveal">
      <div className="tc" style={{ marginBottom: 44 }}>
        <span className="stag">Social Proof</span>
        <h2 className="sh">Loved by <em>500+ Brands</em> Across India</h2>
      </div>

      <div className="tsti-wrap">
        <div className="tsti-track" id="tsti">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="tcard3">
              <div className="tq">&quot;</div>
              <p className="ttxt">{t.quote}</p>
              <div className="tres">{t.result}</div>
              <div className="tperson">
                <div className="tav" style={{ background: t.avatarBg }}>{t.avatarLetter}</div>
                <div>
                  <div className="tname">{t.name}</div>
                  <div className="trole">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="tsti-nav">
        <button className="tnb">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="tdots" id="tdots" />
        <button className="tnb">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
}