"use client";

import { useEffect } from "react";

const ROW_1 = ["Zepto 🛒", "CoinDCX", "Aditya Birla", "BharatMatrimony", "Naukri.com", "Cashify", "Hostinger", "Kotak 811"];
const ROW_2 = ["AirtelPayBank", "Panel Station", "YouGov", "Flipkart 🛒", "TATA CLiQ", "boAt 🎧", "Samsung", "Snapdeal"];
const TIPS = ["500+ campaigns", "3x avg ROI", "₹*** managed", "Trusted partner", "#1 platform", "Top brand", "Since 2016", "Best results"];

export default function BrandMarquee() {
  useEffect(() => {
    const buildRow = (id: string, brands: string[]) => {
      const el = document.getElementById(id);
      if (!el) return;

      // Double brands = seamless loop (when first set ends, second set starts)
      [...brands, ...brands].forEach((brand, i) => {
        const chip = document.createElement("div");
        chip.className = "brand-chip";
        chip.textContent = brand;
        chip.dataset.tip = TIPS[i % TIPS.length]; // tooltip on hover
        el.appendChild(chip);
      });
    };

    buildRow("mq1", ROW_1);
    buildRow("mq2", ROW_2);
  }, []);

  return (
    <section className="mq-bg reveal" style={{ padding: "56px 0" }}>
      <div className="tc" style={{ marginBottom: 28, padding: "0 5%" }}>
        <h2 className="sh"><em>Turning Vision Into
        </em> Real Growth</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          Trusted by India&apos;s fastest-growing brands — from D2C startups to enterprise giants
        </p>
      </div>

      {/* Row 1 scrolls left */}
      <div className="mq-row">
        <div className="mq-track" id="mq1" />
      </div>

      {/* Row 2 scrolls right (CSS handles the reverse direction) */}
      <div className="mq-row" style={{ marginTop: 11 }}>
        <div className="mq-track r" id="mq2" />
      </div>
    </section>
  );
}