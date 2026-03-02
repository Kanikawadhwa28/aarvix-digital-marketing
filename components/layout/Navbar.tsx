"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import BrandLogo from "@/components/ui/BrandLogo";

const NAV_ITEMS = [
  {
    label: "Top Creators",
    links: [
      { icon: "😄", text: "Comedy",   href: "/#top-creators" },
      { icon: "💰", text: "Finance",  href: "/#top-creators" },
      { icon: "👶", text: "Parenting",href: "/#top-creators" },
      { icon: "💄", text: "Beauty",   href: "/#top-creators" },
      { icon: "👗", text: "Fashion",  href: "/#top-creators" },
      { icon: "💪", text: "Fitness",  href: "/#top-creators" },
      { icon: "🍕", text: "Food",     href: "/#top-creators" },
      { icon: "🎮", text: "Gaming",   href: "/#top-creators" },
      { icon: "📱", text: "Tech",     href: "/#top-creators" },
      { icon: "✈️", text: "Travel",   href: "/#top-creators" },
    ],
    wide: true,
    matchPaths: ["/"],
  },
  {
    label: "For Creators",
    links: [
      { icon: "🌟", text: "Join Community", href: "/for-creators" },
      { icon: "📣", text: "Live Campaigns", href: "/for-creators" },
      { icon: "💸", text: "Get Paid",       href: "/for-creators" },
    ],
    matchPaths: ["/for-creators"],
  },
  {
    label: "For Brands",
    links: [
      { icon: "🏢", text: "Brand Campaigns", href: "/for-brands" },
    ],
    matchPaths: ["/for-brands"],
  },
  {
    label: "Products",
    links: [
      { icon: "📊", text: "Dashboard",        href: "/platform#products" },
      { icon: "💲", text: "Fair Price Index", href: "/platform#products" },
      { icon: "🎯", text: "Competitor Tracker",href: "/platform#products" },
    ],
    matchPaths: ["/platform"],
  },
  {
    label: "Our Work",
    links: [
      { icon: "📁", text: "Case Studies", href: "/platform#work" },
      { icon: "✍️", text: "Blog",         href: "/platform#blog" },
      { icon: "📖", text: "Guides",       href: "/platform#guides" },
    ],
    matchPaths: ["/platform"],
  },
  {
    label: "Contact",
    links: [
      { icon: "👥", text: "Meet the Team", href: "/team" },
      { icon: "🚀", text: "Join Us",       href: "/contact" },
      { icon: "📞", text: "Talk to Sales", href: "/contact" },
    ],
    matchPaths: ["/contact", "/team"],
  },
];

const ChevronDown = ({ open }: { open?: boolean }) => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function Navbar() {
  const pathname = usePathname();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobOpen, setMobOpen]     = useState(false);
  const [scrolled, setScrolled]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobOpen(false); setOpenIndex(null); }, [pathname]);

  const isActive = (item: typeof NAV_ITEMS[0]) =>
    item.matchPaths.some(p => pathname === p || (p !== "/" && pathname.startsWith(p)));

  return (
    <>
      <style>{`
        #nav {
          position: fixed;
          top: 0; left: 0;
          width: 100%; max-width: 100vw;
          z-index: 1000;
          padding: 0 clamp(16px, 4vw, 3.5%);
          transition: background .4s ease, border-color .4s ease, backdrop-filter .4s ease;
          overflow: visible; /* CRITICAL: must be visible for dropdowns */
        }
        #nav.scrolled {
          background: rgba(5,5,8,.93);
          backdrop-filter: blur(22px);
          border-bottom: 1px solid rgba(255,255,255,.06);
        }

        /* Override globals.css grid layout — nav needs flex */
        #nav .nav-inner {
          display: flex !important;
          align-items: center !important;
          height: 66px !important;
          gap: 0 !important;
          grid-template-columns: unset !important;
        }

        /* ── LOGO ── */
        a.nav-logo {
          display: flex;
          align-items: center;
          gap: 7px;
          text-decoration: none;
          flex-shrink: 0;
          margin-right: 20px;
        }
        a.nav-logo .nav-logo-text {
          font-family: var(--disp, 'Syne', sans-serif);
          font-size: 20px;
          font-weight: 800;
          color: var(--text, #f5f5f7);
          letter-spacing: -0.5px;
          white-space: nowrap;
          line-height: 1;
        }
        a.nav-logo .nav-logo-text em { color: var(--gold, #FFD700); font-style: normal; }
        .nav-logo-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: var(--gold, #FFD700);
          flex-shrink: 0;
          animation: pdot 2s infinite;
        }
        @keyframes pdot {
          0%,100% { box-shadow: 0 0 0 0 rgba(255,215,0,.4); }
          50%      { box-shadow: 0 0 0 7px transparent; }
        }

        /* ── DESKTOP NAV LINKS ── */
        .nav-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
          flex: 1;
        }
        .nav-item {
          position: relative;
        }
        .nav-a {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          font-size: 12.5px;
          font-weight: 500;
          color: rgba(255,255,255,.65);
          border-radius: 8px;
          transition: all .2s;
          cursor: pointer;
          font-family: var(--body, 'DM Sans', sans-serif);
          white-space: nowrap;
          user-select: none;
        }
        .nav-item:hover > .nav-a,
        .nav-item.active > .nav-a {
          color: var(--text, #fff);
          background: rgba(255,255,255,.05);
        }
        .nav-item.active > .nav-a {
          color: var(--gold, #FFD700) !important;
          background: rgba(255,215,0,.1) !important;
        }

        /* ── DROPDOWN ── */
        .nav-drop {
        position: absolute;
        top: 100%; /* flush — no gap */
        left: 50%;
        transform: translateX(-50%) translateY(-4px);
        background: #0b0b0e;
        border: 1px solid rgba(255,255,255,.08);
        border-radius: 16px; padding: 10px;
        min-width: 190px;
        opacity: 0; visibility: hidden; pointer-events: none;
        /* hide with 200ms delay so cursor can travel to dropdown */
        transition: opacity .15s ease, transform .15s ease, visibility 0s linear .2s;
        box-shadow: 0 24px 60px rgba(0,0,0,.95), 0 0 0 1px rgba(255,215,0,.05);
        z-index: 9000;
}
        .nav-item::after {
        content: '';
        position: absolute;
        top: 100%; left: -24px; right: -24px;
        height: 16px; /* fills the gap between label and dropdown */
        background: transparent;
}
        .nav-drop.wide { min-width: 320px; }
        .nav-drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }

        /* Show on hover */
        .nav-item:hover > .nav-drop {
        opacity: 1; visibility: visible; pointer-events: all;
        transform: translateX(-50%) translateY(4px);
        transition: opacity .15s ease, transform .15s ease, visibility 0s linear 0s;
}

        .nav-drop a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 8px;
          font-size: 12px;
          color: #888;
          text-decoration: none;
          transition: all .16s;
          font-family: var(--body, 'DM Sans', sans-serif);
        }
        .nav-drop a:hover { color: #fff; background: rgba(255,215,0,.06); }
        .nav-drop-ic {
          width: 26px; height: 26px;
          border-radius: 6px;
          background: rgba(255,255,255,.04);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; flex-shrink: 0;
          transition: background .16s;
        }
        .nav-drop a:hover .nav-drop-ic { background: var(--gold, #FFD700); }

        /* ── RIGHT SIDE ── */
        .nav-r {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: auto;
          flex-shrink: 0;
        }
        .nav-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 10px 5px 8px;
          background: rgba(0,0,0,.6);
          border: 1px solid rgba(255,215,0,.3);
          border-radius: 50px;
          backdrop-filter: blur(12px);
          white-space: nowrap; flex-shrink: 0;
          animation: badge-bob 3s ease-in-out infinite;
        }
        @keyframes badge-bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
        .nav-badge-fire { font-size: 14px; }
        .nav-badge-num  { font-family: var(--disp,'Syne',sans-serif); font-size: 12px; font-weight: 800; color: var(--gold,#FFD700); }
        .nav-badge-lbl  { font-size: 10px; color: rgba(255,255,255,.55); }

        .btn-cta {
          padding: 8px 18px; border-radius: 8px;
          font-size: 12.5px; font-weight: 700;
          background: var(--gold,#FFD700); color: #000;
          text-decoration: none; transition: all .22s;
          box-shadow: 0 4px 18px rgba(255,215,0,.28);
          font-family: var(--body,'DM Sans',sans-serif);
          white-space: nowrap; flex-shrink: 0;
        }
        .btn-cta:hover { background: #ffe84d; transform: translateY(-1px); }

        /* Small CTA — mobile only */
        .btn-cta-sm {
          display: none;
          padding: 6px 11px; border-radius: 8px;
          font-size: 11px; font-weight: 700;
          background: var(--gold,#FFD700); color: #000;
          text-decoration: none; white-space: nowrap;
          flex-shrink: 0;
          font-family: var(--body,'DM Sans',sans-serif);
          transition: background .2s;
        }
        .btn-cta-sm:hover { background: #ffe84d; }

        /* ── HAMBURGER ── */
        .hbg {
          display: none;
          flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px; margin-left: 8px;
          flex-shrink: 0; border-radius: 8px;
          transition: background .2s;
        }
        .hbg:hover { background: rgba(255,255,255,.07); }
        .hbg span {
          display: block; width: 20px; height: 2px;
          background: var(--text,#fff); border-radius: 2px;
          transition: all .3s;
        }

        /* ── MOBILE DRAWER ── */
        .mob-nav {
          position: fixed; inset: 0;
          background: rgba(0,0,0,.98);
          z-index: 999;
          display: flex; flex-direction: column;
          padding: 82px clamp(16px,4vw,28px) 40px;
          transform: translateX(100%);
          transition: transform .38s cubic-bezier(.4,0,.2,1);
          overflow-y: auto; overflow-x: hidden;
        }
        .mob-nav.open { transform: translateX(0); }

        /* ── RESPONSIVE ── */
        @media (max-width: 860px) {
          .nav-links   { display: none !important; }
          .nav-badge   { display: none !important; }
          .btn-cta     { display: none !important; }
          .btn-cta-sm  { display: inline-flex !important; }
          .hbg         { display: flex !important; }
          a.nav-logo .nav-logo-text { font-size: 15px; }
          a.nav-logo { margin-right: 0; }
        }
      `}</style>

      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">

          {/* Logo */}
          <a href="/" className="nav-logo">
            <BrandLogo />
            <div className="nav-logo-text">
              Avenue <em>Marketing Agency</em>
            </div>
            <div className="nav-logo-dot" />
          </a>

          {/* Desktop links */}
          <ul className="nav-links">
            {NAV_ITEMS.map((item) => (
              <li key={item.label} className={`nav-item${isActive(item) ? " active" : ""}`}>
                <span className="nav-a">
                  {item.label} <ChevronDown />
                </span>
                <div className={`nav-drop${item.wide ? " wide" : ""}`}>
                  {item.wide ? (
                    <div className="nav-drop-grid">
                      {item.links.map((link) => (
                        <a key={link.text} href={link.href}>
                          <span className="nav-drop-ic">{link.icon}</span>
                          {link.text}
                        </a>
                      ))}
                    </div>
                  ) : (
                    item.links.map((link) => (
                      <a key={link.text} href={link.href}>
                        <span className="nav-drop-ic">{link.icon}</span>
                        {link.text}
                      </a>
                    ))
                  )}
                </div>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nav-r">
            <div className="nav-badge">
              <span className="nav-badge-fire">🔥</span>
              <div>
                <div className="nav-badge-num">7,50,000+</div>
                <div className="nav-badge-lbl">Creators</div>
              </div>
            </div>
            <a href="/contact" className="btn-cta">Talk to Us</a>
            <a href="/contact" className="btn-cta-sm">Talk to Us</a>

            <div className="hbg" onClick={() => setMobOpen(p => !p)} aria-label="Toggle menu">
              <span style={mobOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
              <span style={mobOpen ? { opacity: 0 } : {}} />
              <span style={mobOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mob-nav${mobOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <div key={item.label} style={{ borderBottom: "1px solid #111" }}>
            <button
              onClick={() => setOpenIndex(prev => prev === i ? null : i)}
              style={{
                width: "100%", background: "none", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                fontFamily: "var(--disp,'Syne',sans-serif)",
                fontSize: 17, fontWeight: 700,
                color: isActive(item) ? "var(--gold,#FFD700)" : "#fff",
                padding: "14px 0",
              }}
            >
              {item.label}
              <ChevronDown open={openIndex === i} />
            </button>

            {openIndex === i && (
              <div style={{ paddingBottom: 10 }}>
                {item.links.map((link) => (
                  <a
                    key={link.text}
                    href={link.href}
                    onClick={() => { setOpenIndex(null); setMobOpen(false); }}
                    style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "9px 12px", fontSize: 14,
                      color: "rgba(255,255,255,.65)", borderRadius: 8, textDecoration: "none",
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{link.icon}</span>
                    {link.text}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}

        <div style={{ marginTop: 28 }}>
          <a
            href="/contact"
            onClick={() => setMobOpen(false)}
            style={{
              display: "block", textAlign: "center",
              padding: "14px", borderRadius: 999,
              background: "var(--gold,#FFD700)", color: "#000",
              fontWeight: 800, fontSize: 15, textDecoration: "none",
              fontFamily: "var(--disp,'Syne',sans-serif)",
            }}
          >
            Talk to Us →
          </a>
        </div>
      </div>
    </>
  );
}