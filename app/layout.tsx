import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ClientProviders from "@/components/ClientProviders";
import BackToTop from "@/components/ui/BackToTop";

export const metadata: Metadata = {
  title: "Aarvix Digital Marketing — Influencer & Barter Collaboration Agency",
  description: "Aarvix Digital Marketing connects brands with access to 7,50,000 creators for high-ROI and barter collaborations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ClientProviders>
          <div id="sprog" />
          <BackToTop />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}