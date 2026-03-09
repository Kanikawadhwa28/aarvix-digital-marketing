"use client";

import { useEffect } from "react";
import { creators } from "@/data/creators";

const PER_PAGE = 4; // Number of creator cards visible at once

export default function CreatorNetwork() {
  useEffect(() => {
    const track = document.getElementById("csTrack");
    const dotsContainer = document.getElementById("csDots");
    if (!track || !dotsContainer) return;

    const totalPages = Math.ceil(creators.length / PER_PAGE);
    let currentPage = 0;

    // Build and inject creator cards for the current page
    const renderPage = () => {
      const start = currentPage * PER_PAGE;
      const slice = creators.slice(start, start + PER_PAGE);

      track.innerHTML = slice.map((c) => `
        <div class="ccard">
          <!-- Photo: shows image if available, falls back to emoji -->
          <div class="ccard-photo" style="background:linear-gradient(135deg,${c.bg},#0a0a0a);">
            ${c.image
              ? `<img
                  src="/images/creators/${c.image}"
                  alt="${c.name}"
                  style="width:100%;height:100%;object-fit:cover;border-radius:50%;"
                  onerror="this.style.display='none'"
                />`
              : c.emoji
            }
          </div>
          <div class="ccard-name">${c.name}</div>
          <div class="ccard-role">Influencer</div>
          <div class="ccard-aud">
            <span class="ccard-aud-lbl">Audience</span>
            <div class="ccard-aud-val">${c.audience}</div>
          </div>
        </div>
      `).join("");

      // Highlight the active dot for the current page
      dotsContainer.querySelectorAll(".csdot").forEach((dot, i) => {
        dot.classList.toggle("on", i === currentPage);
      });
    };

    // Dynamically create one dot per page
    for (let i = 0; i < totalPages; i++) {
      const dot = document.createElement("div");
      dot.className = "csdot" + (i === 0 ? " on" : "");
      dot.onclick = () => { currentPage = i; renderPage(); };
      dotsContainer.appendChild(dot);
    }

    // Initial render
    renderPage();

    // Left arrow — go to previous page (wraps around)
    document.querySelectorAll<HTMLElement>(".cs-arr.l").forEach(
      (btn) => (btn.onclick = () => {
        currentPage = (currentPage - 1 + totalPages) % totalPages;
        renderPage();
      })
    );

    // Right arrow — go to next page (wraps around)
    document.querySelectorAll<HTMLElement>(".cs-arr.r").forEach(
      (btn) => (btn.onclick = () => {
        currentPage = (currentPage + 1) % totalPages;
        renderPage();
      })
    );

    // Auto-advance to next page every 5 seconds
    const timer = setInterval(() => {
      currentPage = (currentPage + 1) % totalPages;
      renderPage();
    }, 5000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="creator-sec reveal">
      {/* Section header */}
      <div className="tc" style={{ marginBottom: 40 }}>
        <span className="stag">Creator Network</span>
        <h2 className="sh">Our <em>Top Creators</em> - Work with them</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          A curated network of India&apos;s most influential voices across every niche
        </p>
      </div>

      <div className="creator-slider">
        {/* Left navigation arrow */}
        <div className="cs-arr l">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </div>

        {/* Right navigation arrow */}
        <div className="cs-arr r">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="currentColor">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>

        {/* Cards are injected here by renderPage() */}
        <div className="cs-viewport">
          <div className="cs-track" id="csTrack" />
        </div>

        {/* Pagination dots — injected dynamically */}
        <div className="cs-dots" id="csDots" />
      </div>
    </section>
  );
}