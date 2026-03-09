"use client";

import { useEffect, useRef } from "react";

const CAMPAIGNS = [
  {
    title: "Zepto — 45M+ Views",
    sub: "booming", label: "FOOD", brand: "Zepto",
    stat: "🔥 7M Views •Creator", icon: "🎬",
    bg: "linear-gradient(135deg,#1a0000,#0d0d00)", big: true,
    reelUrl: "https://www.instagram.com/reel/DSaNrL3gh6e/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoPreview: "/videos/zepto-preview.mp4",
  },
  {
    title: "Kotak Mahindra Bank Ltd — 37.7M+",
    sub: "Finance", label: "FINANCE", brand: "Kotak Mahindra Bank Ltd",
    stat: "🌟 37.7M+ Views", icon: "🧳",
    bg: "linear-gradient(135deg,#0d0d00,#1a1800)",
    reelUrl: "https://www.instagram.com/reel/DUVZqFMCMZU/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoPreview: "/videos/kotak-preview.mp4",
  },
  {
    title: "Kalyan Matrimonial — 1.3M+ Views",
    sub: "MATCHMAKING,JEWELLERS", label: "Matrimonial Service", brand: "Kalyan Matrimony",
    stat: "1.3M+ Views", icon: "🎧",
    bg: "linear-gradient(135deg,#000a1a,#00051f)",
    reelUrl: "https://www.instagram.com/reel/DPDDEXTk5Fz/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoPreview: "/videos/Kalyan-preview.mp4",
  },
  {
    title: "FLIPKART — 72.7M+ Engagements",
    sub: "E-COMMERCE", label: "E-COMMERCE", brand: "FLIPKART",
    stat: "⚡ 72.7M+ Engagements", icon: "🎮",
    bg: "linear-gradient(135deg,#001400,#001a00)",
    reelUrl: "https://www.instagram.com/reel/DUkO96YCJy7/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoPreview: "/videos/flipkart-preview.mp4",
  },
  {
    title: "boAt — 8.9M+ Views",
    sub: "electronics", label: "D2C", brand: "boAt",
    stat: "📱 8.9M+ Views", icon: "📱",
    bg: "linear-gradient(135deg,#001a1a,#000d0d)",
    reelUrl: "https://www.instagram.com/reel/DUkbTuYDA2b/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==",
    videoPreview: "/videos/boat-preview.mp4",
  },
];

// ── Video preview card ────────────────────────────────────────────────────────
function ReelCard({ c, big }: { c: typeof CAMPAIGNS[0]; big?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`vcard${big ? " vbig" : ""}`} style={{ cursor: "default" }}>
      <div
        className="vcard-bg"
        ref={containerRef}
        style={{
          height: big ? 300 : 210, background: c.bg,
          position: "relative", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: big ? 90 : 64,
        }}
      >
        <span style={{ position: "relative", zIndex: 1 }}>{c.icon}</span>
        {c.videoPreview && (
          <video
            ref={videoRef}
            src={c.videoPreview}
            muted loop playsInline autoPlay preload="auto"
            style={{
              position: "absolute", inset: 0,
              width: "100%", height: "100%",
              objectFit: "cover", opacity: 0,
              transition: "opacity 0.3s ease", zIndex: 2,
            }}
            onCanPlay={e => { (e.target as HTMLVideoElement).style.opacity = "1"; }}
          />
        )}
      </div>

      <div className="vcard-ov" />
      <div className="vcard-lbl">{c.label}</div>
      <div className="vcard-meta">
        <div className="vcard-brand">{c.brand}</div>
        <div className="vcard-stat">{c.stat}</div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function VideoGallery() {
  return (
    <section id="video-gallery" className="vid-bg reveal">
      <div className="tc" style={{ marginBottom: 44 }}>
        <span className="stag">Portfolio</span>
        <h2 className="sh">Our <em>Recent Work</em> — Brands We Work With</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          Real campaigns. Real results. Videos autoplay and loop as you scroll.
        </p>
      </div>

      <div className="vid-grid">
        {CAMPAIGNS.map((c) =>
          <ReelCard key={c.title} c={c} big={c.big} />
        )}
      </div>

      <p style={{
        marginTop: 32, textAlign: "center", fontSize: 9,
        color: "var(--muted,#555)", maxWidth: 640,
        marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
      }}>
        * All proprietary content, intellectual assets, and brand identifiers showcased hereinabove remain the exclusive intellectual property of their respective proprietorial entities. Aarvix Digital Marketing curates and disseminates said campaigns solely for the purposes of amplifying socio-digital visibility and exemplifying superlative influencer-driven marketing executions. Entities seeking inclusion within our curated portfolio are cordially invited to initiate correspondence at their earliest convenience.
      </p>
    </section>
  );
}