"use client";

import { useEffect, useRef, useState } from "react";

const CHIPS = [
  "7,50,000+ Creators", "500+ Campaigns", "Barter Collabs",
  "Paid Campaigns", "UGC Content", "10+ Categories",
  "Comedy · Finance · Beauty", "48hr Turnaround",
  "Brand Ambassador", "Sponsored Posts", "Affiliate Campaigns",
  "Giveaway Campaigns", "Product Launches", "Event Promotions",
];

const WORDS: { text: string; gold?: boolean }[] = [
  { text: "Influencer" },
  { text: "Marketing," },
  { text: "Done" },
  { text: "Right.", gold: true },
];

export default function HeroSection() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const orbRef     = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const [loaded,  setLoaded]  = useState(false);

  // entrance
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 120);
    return () => clearTimeout(t);
  }, []);

  // sparkle canvas
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d")!;
    let W = 0, H = 0, raf = 0;
    type Sp = { x:number; y:number; size:number; phase:number; ts:number };
    const sps: Sp[] = [];

    function resize() {
      W = cv!.width  = cv!.offsetWidth;
      H = cv!.height = cv!.offsetHeight;
    }
    function drawStar(x:number, y:number, r:number, op:number) {
      ctx.save(); ctx.globalAlpha = op; ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i * Math.PI) / 4, rad = i % 2 === 0 ? r : r * .35;
        i === 0
          ? ctx.moveTo(Math.cos(a)*rad, Math.sin(a)*rad)
          : ctx.lineTo(Math.cos(a)*rad, Math.sin(a)*rad);
      }
      ctx.closePath();
      const g = ctx.createRadialGradient(0,0,0,0,0,r);
      g.addColorStop(0,   "rgba(244,208,111,1)");
      g.addColorStop(.5,  "rgba(229,183,92,.7)");
      g.addColorStop(1,   "rgba(201,151,43,0)");
      ctx.fillStyle = g; ctx.fill(); ctx.restore();
    }
    function frame() {
      ctx.clearRect(0, 0, W, H);
      sps.forEach(s => {
        s.phase += s.ts;
        drawStar(s.x, s.y, s.size, (Math.sin(s.phase) * .5 + .5) * .8);
      });
      raf = requestAnimationFrame(frame);
    }

    resize();
    for (let i = 0; i < 55; i++) sps.push({
      x: Math.random() * 3000, y: Math.random() * 2000,
      size: Math.random() * 5 + 2,
      phase: Math.random() * Math.PI * 2,
      ts: Math.random() * .018 + .006,
    });
    raf = requestAnimationFrame(frame);
    const ro = new ResizeObserver(resize); ro.observe(cv);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  // orb mousemove parallax
  useEffect(() => {
    const sec = sectionRef.current;
    const orb = orbRef.current;
    if (!sec || !orb) return;
    const onMove = (e: MouseEvent) => {
      const r = sec.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width  - .5) * 40;
      const y = ((e.clientY - r.top)  / r.height - .5) * 28;
      orb.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };
    sec.addEventListener("mousemove", onMove);
    return () => sec.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>{`
        .hero-cin {
          position: relative;
          width: 100%;
          height: 100vh;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: #000;
          text-align: center;
          padding: 0 clamp(16px,6vw,80px);
          padding-top: 80px;
        }
        .hero-cin canvas {
          position: absolute; inset: 0;
          width: 100%; height: 100%;
          pointer-events: none; z-index: 1;
        }

        /* ── ORB ── */
        .hero-orb {
          position: absolute;
          top: 68%; left: 50%;
          transform: translate(-50%, -50%);
          width: min(860px, 120vw);
          height: min(860px, 120vw);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          will-change: transform;
        }
        .hero-orb::before {
          content: ''; position: absolute; inset: 0; border-radius: 50%;
          background: radial-gradient(ellipse at center,
            rgba(201,151,43,.30)  0%,
            rgba(229,183,92,.15) 30%,
            rgba(244,208,111,.06) 60%,
            transparent 78%);
          transition: background .9s ease;
        }
        .hero-orb.hot::before {
          background: radial-gradient(ellipse at center,
            rgba(244,208,111,.62)  0%,
            rgba(229,183,92,.36)  28%,
            rgba(201,151,43,.18)  52%,
            transparent 72%);
        }

        /* ── ATMOSPHERE ── */
        .hero-atm {
          position: absolute;
          left: 50%; top: 50%;
          transform: translate(-50%, -50%);
          width: 90vw; height: 90vw;
          max-width: 900px; max-height: 900px;
          border-radius: 50%;
          pointer-events: none; z-index: 0; opacity: 0;
          background: radial-gradient(circle at center,
            rgba(201,151,43,.52)  0%,
            rgba(229,183,92,.26) 28%,
            rgba(244,208,111,.10) 52%,
            transparent 70%);
          filter: blur(8px);
          transition: opacity .8s ease;
        }
        .hero-atm.hot { opacity: 1; }
        @media (hover: none) {
          .hero-atm { opacity: 0.55; }
        }

        /* ── CONTENT ── */
        .hero-cin-inner {
          position: relative; z-index: 2;
          display: flex; flex-direction: column;
          align-items: center; max-width: 880px; width: 100%;
        }
        .hero-cin-tag {
          font-size: 11px; font-weight: 500;
          letter-spacing: .22em; text-transform: uppercase;
          color: #E5B75C; margin-bottom: 22px;
          opacity: 0; transform: translateY(12px);
          transition: opacity .5s ease .05s, transform .5s ease .05s;
        }
        .hero-cin-tag.in { opacity: 1; transform: none; }

        .hero-cin-h1 {
          font-family: var(--disp, 'Syne', sans-serif);
          font-size: clamp(46px, 8.5vw, 112px);
          font-weight: 900; line-height: 1.01;
          letter-spacing: -.03em; color: #fff;
          margin-bottom: 26px; perspective: 900px;
        }
        .hero-word {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px) rotateX(-30deg);
          transform-origin: 50% 100%;
          transition: opacity .65s cubic-bezier(.23,1,.32,1),
                      transform .7s cubic-bezier(.23,1,.32,1);
          margin-right: .22em;
        }
        .hero-word.em-word {
          background: linear-gradient(135deg,#F4D06F 0%,#E5B75C 45%,#C9972B 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-word.in { opacity: 1; transform: translateY(0) rotateX(0); }
        .hero-lb { display: block; height: 0; }

        .hero-cin-sub {
          font-size: clamp(15px,1.6vw,19px);
          color: rgba(255,255,255,.45);
          max-width: 520px; line-height: 1.8;
          margin-bottom: 38px;
          opacity: 0; transform: translateY(18px);
          transition: opacity .55s ease .55s, transform .55s ease .55s;
        }
        .hero-cin-sub.in { opacity: 1; transform: none; }

        .hero-cin-btns {
          display: flex; gap: 14px; flex-wrap: wrap;
          justify-content: center; margin-bottom: 46px;
          opacity: 0; transform: translateY(14px);
          transition: opacity .5s ease .7s, transform .5s ease .7s;
        }
        .hero-cin-btns.in { opacity: 1; transform: none; }

        .hero-btn-main {
          position: relative;
          padding: 16px 42px; border-radius: 999px;
          font-family: var(--disp,'Syne',sans-serif);
          font-size: clamp(15px,1.6vw,18px); font-weight: 800;
          color: #000;
          background: linear-gradient(135deg,#F4D06F 0%,#E5B75C 40%,#C9972B 100%);
          border: none; cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 10px;
          transition: transform .25s, box-shadow .25s, filter .25s;
          box-shadow: 0 4px 28px rgba(229,183,92,.38), 0 0 0 1px rgba(244,208,111,.2);
          overflow: hidden;
        }
        .hero-btn-main::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 55%);
          opacity: 0; transition: opacity .3s; border-radius: 999px;
        }
        .hero-btn-main:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 14px 45px rgba(229,183,92,.65);
          filter: brightness(1.07);
        }
        .hero-btn-main:hover::before { opacity: 1; }

        .hero-btn-sec {
          padding: 16px 36px; border-radius: 999px;
          font-size: clamp(14px,1.4vw,16px); font-weight: 500;
          color: rgba(255,255,255,.72);
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(255,255,255,.14);
          cursor: pointer; text-decoration: none;
          display: inline-flex; align-items: center; gap: 8px;
          transition: border-color .25s, color .25s, transform .25s, background .25s;
        }
        .hero-btn-sec:hover {
          border-color: rgba(229,183,92,.5); color: #F4D06F;
          background: rgba(229,183,92,.07); transform: translateY(-2px);
        }

        /* ── CHIP TICKER ── */
        .hero-ticker-wrap {
          width: 100%; overflow: hidden;
          position: relative; z-index: 2;
          opacity: 0; transition: opacity .6s ease .9s;
          mask-image: linear-gradient(to right,transparent 0%,#000 10%,#000 90%,transparent 100%);
          -webkit-mask-image: linear-gradient(to right,transparent 0%,#000 10%,#000 90%,transparent 100%);
        }
        .hero-ticker-wrap.in { opacity: 1; }
        .hero-ticker-track {
          display: flex; gap: 12px; width: max-content;
          animation: heroTick 30s linear infinite;
        }
        .hero-ticker-wrap:hover .hero-ticker-track { animation-play-state: paused; }
        @keyframes heroTick {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .hero-chip {
          display: inline-flex; align-items: center; gap: 7px;
          padding: 8px 16px;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(229,183,92,.18);
          border-radius: 999px; font-size: 12px; font-weight: 500;
          color: rgba(255,255,255,.58); white-space: nowrap; flex-shrink: 0;
        }
        .hero-chip::before { content: '✦'; font-size: 8px; color: #E5B75C; }

        @media (max-width: 600px) {
          .hero-cin { padding-top: 80px; }
          .hero-btn-main, .hero-btn-sec { padding: 14px 26px; font-size: 15px; }
        }
      `}</style>

      <section className="hero-cin" ref={sectionRef}>
        <canvas ref={canvasRef} aria-hidden="true" />
        <div className={`hero-atm${hovered ? " hot" : ""}`} aria-hidden="true" />
        <div ref={orbRef} className={`hero-orb${hovered ? " hot" : ""}`} aria-hidden="true" />

        <div className="hero-cin-inner">

          <span className={`hero-cin-tag${loaded ? " in" : ""}`}>
            Aarvix Digital Marketing
          </span>

          <h1 className="hero-cin-h1" aria-label="Influencer Marketing, Simplified">
            {WORDS.slice(0, 2).map((w, i) => (
              <span
                key={w.text}
                className={`hero-word${w.gold ? " em-word" : ""}${loaded ? " in" : ""}`}
                style={{ transitionDelay: `${.1 + i * .11}s` }}
              >{w.text}</span>
            ))}
            <span className="hero-lb" />
            {WORDS.slice(2).map((w, i) => (
              <span
                key={w.text}
                className={`hero-word${w.gold ? " em-word" : ""}${loaded ? " in" : ""}`}
                style={{ transitionDelay: `${.32 + i * .12}s` }}
              >{w.text}</span>
            ))}
          </h1>

          <p className={`hero-cin-sub${loaded ? " in" : ""}`}>
            We have access to 7,50,000+ creators across 10+ categories:
            connecting brands with the right audience.
          </p>

          <div
            className={`hero-cin-btns${loaded ? " in" : ""}`}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onTouchStart={() => setHovered(true)}
            onTouchEnd={() => setTimeout(() => setHovered(false), 600)}
          >
            <a href="/for-brands"   className="hero-btn-main">Join as a Brand →</a>
            <a href="/for-creators" className="hero-btn-sec">Join as Creator</a>
          </div>

          <div className={`hero-ticker-wrap${loaded ? " in" : ""}`}>
            <div className="hero-ticker-track">
              {[...CHIPS, ...CHIPS].map((c, i) => (
                <div key={i} className="hero-chip">{c}</div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}