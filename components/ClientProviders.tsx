"use client"; // MUST be here - hooks need browser APIs

import { useScrollProgress } from "@/hooks/useScrollProgress";
import { useScrollReveal } from "@/hooks/useScrollReveal";

// This component runs all the global hooks ONCE for the whole app
// It lives in layout.tsx so every page gets these behaviors automatically
//
// Why a separate component?
// layout.tsx is a Server Component by default in Next.js App Router
// We can't use hooks in Server Components
// So we put all hook calls here and import this into layout.tsx
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  useScrollProgress();  // Progress bar + back-to-top button
  useScrollReveal();    // Fade-in animations on scroll

  // Just renders children - this component is invisible
  // It only runs the hooks as a side effect
  return <>{children}</>;
}