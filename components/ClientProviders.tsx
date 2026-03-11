"use client"; // MUST be here - hooks need browser APIs

import { useCursor } from "@/hooks/useCursor";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// This component runs all the global hooks ONCE for the whole app
// It lives in layout.tsx so every page gets these behaviors automatically
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useCursor();          // Custom gold cursor dot
  useScrollProgress();  // Progress bar + back-to-top button
  useScrollReveal();    // Fade-in animations on scroll

  return <>{children}</>;
}