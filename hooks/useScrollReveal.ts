import { useEffect } from "react";

// This hook watches all elements with className="reveal"
// When they scroll into the viewport, it adds className="vis"
// Your CSS then animates them (fade in, slide up, etc.)
//
// IMPORTANT: Your CSS needs this to work:
// .reveal { opacity: 0; transform: translateY(30px); transition: all 0.6s; }
// .reveal.vis { opacity: 1; transform: translateY(0); }
export function useScrollReveal() {
  useEffect(() => {
    // IntersectionObserver fires a callback when elements enter/exit the screen
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Element is visible → add "vis" class to trigger CSS animation
            (entry.target as HTMLElement).classList.add("vis");

            // If it's the stats band, also trigger the number counters
            if ((entry.target as HTMLElement).classList.contains("stats-band")) {
              startStatsCounter();
            }
          }
        });
      },
      { threshold: 0.08 } // Trigger when 8% of element is visible
    );

    // Helper to (re)attach observer to all .reveal elements
    const watchAll = () => {
      const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
      revealEls.forEach((el) => observer.observe(el));
    };

    // Initial scan
    watchAll();

    // Also watch for new .reveal elements on client-side navigation
    const mo = new MutationObserver(() => {
      watchAll();
    });
    mo.observe(document.body, { childList: true, subtree: true });

    // Cleanup: stop watching when component unmounts
    return () => {
      observer.disconnect();
      mo.disconnect();
    };
  }, []);
}

// Helper: animates the stat numbers (750K+, 500+, etc.)
// Called automatically when the stats band scrolls into view
let statsDone = false; // Prevent running twice

function startStatsCounter() {
  if (statsDone) return; // Only run once
  statsDone = true;

  document.querySelectorAll<HTMLElement>(".sv").forEach((el) => {
    // Read the target number and suffix from data attributes
    // Example: <div class="sv" data-t="750" data-s="K+">0</div>
    const target = parseFloat(el.dataset.t || "0");
    const suffix = el.dataset.s || "";
    let current = 0;
    const duration = 2000; // 2 seconds to count up
    const step = target / (duration / 16); // how much to add each frame (~60fps)

    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = `${Math.round(current * 10) / 10}${suffix}`;

      if (current >= target) clearInterval(timer); // Stop when done
    }, 16);
  });
}