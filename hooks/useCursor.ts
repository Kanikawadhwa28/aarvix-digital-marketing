import { useEffect } from "react";

// Custom gold cursor — just a single filled circle (no outer ring)
export function useCursor() {
  useEffect(() => {
    // Skip on touch devices (phones/tablets)
    if (window.matchMedia("(hover: none)").matches) return;

    const el = document.getElementById("cur");
    if (!el) return;
    const cur = el as HTMLDivElement;

    // Show the cursor dot (hidden by default on touch)
    cur.style.display = "block";

    const onMouseMove = (e: MouseEvent) => {
      cur.style.left = `${e.clientX}px`;
      cur.style.top = `${e.clientY}px`;
    };

    document.addEventListener("mousemove", onMouseMove);

    const hoverTargets = document.querySelectorAll(
      "a, button, .icard, .vcard, .cmpcard, .bcard, .ccard, .tcard2"
    );

    const grow = () => {
      cur.style.width = "18px";
      cur.style.height = "18px";
    };

    const shrink = () => {
      cur.style.width = "10px";
      cur.style.height = "10px";
    };

    hoverTargets.forEach((el) => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      hoverTargets.forEach((el) => {
        el.removeEventListener("mouseenter", grow);
        el.removeEventListener("mouseleave", shrink);
      });
    };
  }, []);
}