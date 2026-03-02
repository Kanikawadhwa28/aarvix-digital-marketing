"use client";

import { useEffect, useState, useRef } from "react";

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

const IgIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="13" height="13">
    <defs>
      <linearGradient id="igG" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433"/>
        <stop offset="50%" stopColor="#dc2743"/>
        <stop offset="100%" stopColor="#bc1888"/>
      </linearGradient>
    </defs>
    <path fill="url(#igG)" d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.975.975 1.246 2.242 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.975.975-2.242 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.975-.975-1.246-2.242-1.308-3.608C2.175 15.584 2.163 15.204 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.975-.975 2.242-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.333.014 7.053.072 5.775.131 4.602.425 3.635 1.392 2.667 2.36 2.373 3.532 2.314 4.81 2.256 6.09 2.242 6.498 2.242 12c0 5.502.014 5.91.072 7.19.059 1.278.353 2.451 1.32 3.418.968.968 2.14 1.262 3.418 1.32C8.333 23.986 8.741 24 12 24s3.667-.014 4.947-.072c1.278-.059 2.451-.353 3.418-1.32.968-.968 1.262-2.14 1.32-3.418.058-1.28.072-1.688.072-7.19 0-5.502-.014-5.91-.072-7.19-.059-1.278-.353-2.451-1.32-3.418C19.398.425 18.225.131 16.947.072 15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
  </svg>
);

// ── CENTERED MODAL — works on all screen sizes ────────────────────────────────
function ReelModal({ c, onClose }: { c: typeof CAMPAIGNS[0]; onClose: () => void }) {
  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Load Instagram embed script
  useEffect(() => {
    const tryProcess = () => {
      const w = window as typeof window & { instgrm?: { Embeds: { process: () => void } } };
      if (w.instgrm) {
        w.instgrm.Embeds.process();
      } else if (!document.getElementById("ig-embed-js")) {
        const script = document.createElement("script");
        script.id = "ig-embed-js";
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => (window as any).instgrm?.Embeds.process();
        document.body.appendChild(script);
      }
    };
    setTimeout(tryProcess, 80);
  }, []);

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .reel-backdrop {
          position: fixed; inset: 0; z-index: 9999;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          box-sizing: border-box;
          overflow-y: auto;
        }
        .reel-box {
          position: relative;
          width: min(400px, calc(100vw - 32px));
          max-height: calc(100vh - 32px);
          border-radius: 18px;
          overflow: hidden;
          background: #000;
          box-shadow: 0 8px 32px rgba(0,0,0,.9), 0 0 0 1px rgba(255,215,0,.18);
          animation: modalIn .25s ease forwards;
          display: flex;
          flex-direction: column;
        }
        .reel-close {
          position: absolute; top: 10px; right: 10px; z-index: 10;
          background: rgba(0,0,0,0.75); border: none; cursor: pointer;
          color: #fff; font-size: 16px;
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          backdrop-filter: blur(4px); transition: background .2s;
        }
        .reel-close:hover { background: rgba(255,50,50,.5); }
        .reel-footer {
          padding: 10px 16px;
          display: flex; align-items: center; justify-content: space-between;
          font-size: 12px; color: #888;
          background: #0a0a0a;
          border-top: 1px solid rgba(255,255,255,.06);
          flex-shrink: 0;
        }
        /* Force embed to not overflow */
        .reel-box .instagram-media {
          max-width: 100% !important;
          min-width: 0 !important;
          width: 100% !important;
          margin: 0 !important;
        }
        .reel-box iframe {
          width: 100% !important;
          min-width: 0 !important;
          max-width: 100% !important;
        }
      `}</style>

      {/* Backdrop — click outside to close */}
      <div className="reel-backdrop" onClick={onClose}>
        <div className="reel-box" onClick={e => e.stopPropagation()}>
          <button className="reel-close" onClick={onClose} aria-label="Close">✕</button>

          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink={`${c.reelUrl}?utm_source=ig_embed&utm_campaign=loading`}
            data-instgrm-version="14"
            style={{
              background: "#fff", border: 0, borderRadius: 0,
              margin: 0, padding: 0, display: "block",
              width: "100%", minWidth: 0, maxWidth: "100%",
            }}
          />

          <div className="reel-footer">
            <span style={{ fontWeight: 700, color: "var(--gold,#ffd700)" }}>{c.brand}</span>
            <span>{c.stat}</span>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Video preview card ────────────────────────────────────────────────────────
function ReelCard({ c, big, onPlay }: { c: typeof CAMPAIGNS[0]; big?: boolean; onPlay: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const resume = () => v.play().catch(() => {});
    v.addEventListener("pause", resume);
    return () => v.removeEventListener("pause", resume);
  }, []);

  return (
    <div className={`vcard${big ? " vbig" : ""}`} style={{ cursor: "pointer" }} onClick={onPlay}>
      <div
        className="vcard-bg"
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
              objectFit: "contain", opacity: 0,
              transition: "opacity 0.3s ease", zIndex: 2,
            }}
            onCanPlay={e => { (e.target as HTMLVideoElement).style.opacity = "1"; }}
          />
        )}
      </div>

      <div className="vcard-ov" />
      <div className="vcard-lbl">{c.label}</div>
      <div className="play-ring" style={{ pointerEvents: "none" }}>
        <svg width="17" height="17" viewBox="0 0 24 24">
          <polygon points="5 3 19 12 5 21 5 3" fill="#000" />
        </svg>
      </div>
      <div style={{
        position: "absolute", top: 12, right: 12,
        background: "rgba(0,0,0,0.65)", borderRadius: 8,
        padding: "4px 8px", fontSize: 11, color: "#fff",
        display: "flex", alignItems: "center", gap: 5,
        backdropFilter: "blur(4px)", zIndex: 3,
      }}>
        <IgIcon /> Tap to play
      </div>
      <div className="vcard-meta">
        <div className="vcard-brand">{c.brand}</div>
        <div className="vcard-stat">{c.stat}</div>
      </div>
    </div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export default function VideoGallery() {
  const [activeReel, setActiveReel] = useState<typeof CAMPAIGNS[0] | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setActiveReel(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="video-gallery" className="vid-bg reveal">
      <div className="tc" style={{ marginBottom: 44 }}>
        <span className="stag">Portfolio</span>
        <h2 className="sh">Our <em>Recent Work</em> — Brands We Work With</h2>
        <p className="ssub" style={{ margin: "10px auto 0" }}>
          Real campaigns. Real results. Click to explore.
        </p>
      </div>

      <div className="vid-grid">
        {CAMPAIGNS.map((c) =>
          c.reelUrl ? (
            <ReelCard key={c.title} c={c} big={c.big} onPlay={() => setActiveReel(c)} />
          ) : (
            <div key={c.title} className={`vcard${c.big ? " vbig" : ""}`}>
              <div className="vcard-bg" style={{
                height: c.big ? 300 : 210, background: c.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: c.big ? 90 : 64,
              }}>
                {c.icon}
              </div>
              <div className="vcard-ov" />
              <div className="vcard-lbl">{c.label}</div>
              <div className="play-ring">
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <polygon points="5 3 19 12 5 21 5 3" fill="#000" />
                </svg>
              </div>
              <div className="vcard-meta">
                <div className="vcard-brand">{c.brand}</div>
                <div className="vcard-stat">{c.stat}</div>
                <div className="vcard-hint">▶ Click for campaign details</div>
              </div>
            </div>
          )
        )}
      </div>

      <p style={{
        marginTop: 32, textAlign: "center", fontSize: 9,
        color: "var(--muted,#555)", maxWidth: 640,
        marginLeft: "auto", marginRight: "auto", lineHeight: 1.6,
      }}>
        * All proprietary content, intellectual assets, and brand identifiers showcased hereinabove remain the exclusive intellectual property of their respective proprietorial entities. Avenue Marketing Agency curates and disseminates said campaigns solely for the purposes of amplifying socio-digital visibility and exemplifying superlative influencer-driven marketing executions. Entities seeking inclusion within our curated portfolio are cordially invited to initiate correspondence at their earliest convenience.
      </p>

      {activeReel && <ReelModal c={activeReel} onClose={() => setActiveReel(null)} />}
    </section>
  );
}