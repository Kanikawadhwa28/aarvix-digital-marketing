"use client";

import { useEffect } from "react";

// Words that scroll across the ticker strip
const TICKER_WORDS = [
  "7,50,000+ Creators",
  "500+ Brand Campaigns",
  "10B+ Total Reach",
  "Fair Price Index",
  "Competitor Tracking",
  "End-to-End Campaigns",
  "Real-Time Analytics",
];

export default function TickerSection() {
  useEffect(() => {
    const ticker = document.getElementById("tickerEl");
    if (!ticker) return;

    // Double the words so the loop looks seamless
    [...TICKER_WORDS, ...TICKER_WORDS].forEach((word) => {
      const div = document.createElement("div");
      div.className = "t-item";
      div.textContent = word;
      ticker.appendChild(div);
    });
  }, []);

  return (
    <div className="ticker">
      <div className="t-inner" id="tickerEl" />
    </div>
  );
}