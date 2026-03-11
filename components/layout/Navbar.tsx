"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import BrandLogo from "@/components/ui/BrandLogo";

type NavLinkItem = {
  type: "link";
  label: string;
  href: string;
  matchPaths: string[];
};

type NavDropdownItem = {
  type: "dropdown";
  label: string;
  links: { icon: string; text: string; href: string }[];
  wide?: boolean;
  matchPaths: string[];
};

type NavItem = NavLinkItem | NavDropdownItem;

const NAV_ITEMS: NavItem[] = [
  { type: "link", label: "Home", href: "/", matchPaths: ["/"] },
  {
    type: "dropdown", label: "Top Creators",
    links: [
      { icon: "⭐", text: "Creators",  href: "/for-creators" },
      { icon: "😄", text: "Comedy",    href: "/for-creators?category=comedy" },
      { icon: "💰", text: "Finance",   href: "/for-creators?category=finance" },
      { icon: "👶", text: "Parenting", href: "/for-creators?category=parenting" },
      { icon: "💄", text: "Beauty",    href: "/for-creators?category=beauty" },
      { icon: "👗", text: "Fashion",   href: "/for-creators?category=fashion" },
      { icon: "💪", text: "Fitness",   href: "/for-creators?category=fitness" },
      { icon: "🍕", text: "Food",      href: "/for-creators?category=food" },
      { icon: "🎮", text: "Gaming",    href: "/for-creators?category=gaming" },
      { icon: "📱", text: "Tech",      href: "/for-creators?category=tech" },
      { icon: "✈️", text: "Travel",    href: "/for-creators?category=travel" },
    ],
    wide: true, matchPaths: ["/for-creators"],
  },
  {
    type: "dropdown", label: "For Brands",
    links: [{ icon: "🏢", text: "Brand Campaigns", href: "/for-brands" }],
    matchPaths: ["/for-brands"],
  },
  {
    type: "dropdown", label: "Our Work",
    links: [
      { icon: "📁", text: "Campaigns", href: "/platform#work" },
      { icon: "✍️", text: "Blogs",     href: "/platform#blog" },
    ],
    matchPaths: ["/platform"],
  },
  { type: "link", label: "About Us", href: "/about", matchPaths: ["/about"] },
  {
    type: "dropdown", label: "Contact",
    links: [{ icon: "🚀", text: "Contact Us", href: "/contact" }],
    matchPaths: ["/contact"],
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
  const router   = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [mobOpen, setMobOpen]     = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobOpen(false); setOpenIndex(null); }, [pathname]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node))
        setOpenIndex(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const isActive = (item: NavItem) =>
    item.matchPaths.some(p => pathname === p || (p !== "/" && pathname.startsWith(p)));

  const toggleDesktop = (i: number) => setOpenIndex(prev => prev === i ? null : i);

  /*
   * handleMobileLink — closes menu first, then navigates.
   * Using router.push so hash links (#work, #blog) also trigger close
   * even though they don't change pathname (useEffect[pathname] wouldn't fire).
   */
  const handleMobileLink = (href: string) => {
    setMobOpen(false);
    setOpenIndex(null);
    // Let state update paint first so the menu closes instantly,
    // then navigate (helps on slower devices / search-param-only routes).
    requestAnimationFrame(() => router.push(href));
  };

  return (
    <>
      <style>{`
        #nav {
          position: fixed; top: 0; left: 0;
          width: 100%; max-width: 100vw; z-index: 1000;
          padding: 0 clamp(16px, 4vw, 3.5%);
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,151,43,.2);
          transition: background .4s ease, border-color .4s ease, backdrop-filter .4s ease;
          overflow: visible;
        }
        #nav.scrolled {
          background: rgba(0,0,0,.97);
          backdrop-filter: blur(28px);
          border-bottom: 1px solid rgba(229,183,92,.3);
          box-shadow: 0 4px 32px rgba(0,0,0,.8), 0 1px 0 rgba(255,215,0,.08);
        }
        #nav .nav-inner {
          display: flex !important; align-items: center !important;
          height: 66px !important; gap: 0 !important;
          grid-template-columns: unset !important;
        }
        a.nav-logo {
          display: flex; align-items: center; gap: 9px;
          text-decoration: none; flex-shrink: 0; margin-right: 24px;
        }
        a.nav-logo .nav-logo-text {
          font-family: var(--disp, 'Syne', sans-serif);
          font-size: 20px; font-weight: 800;
          background: linear-gradient(135deg, #F4D06F 0%, #E5B75C 40%, #C9972B 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          letter-spacing: 0.5px; white-space: nowrap; line-height: 1;
        }
        .nav-logo-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: linear-gradient(135deg, #C9972B, #F4D06F);
          flex-shrink: 0; animation: pdot 2s infinite;
        }
        @keyframes pdot {
          0%,100% { box-shadow: 0 0 0 0 rgba(229,183,92,.5); }
          50%      { box-shadow: 0 0 0 8px transparent; }
        }
        .nav-links {
          display: flex; align-items: center; gap: 2px;
          list-style: none; margin: 0; padding: 0; flex: 1;
        }
        .nav-item { position: relative; }
        .nav-a {
          display: flex; align-items: center; gap: 4px;
          padding: 7px 12px; font-size: 12.5px; font-weight: 500;
          color: rgba(255,255,255,.65); border-radius: 8px;
          transition: all .2s; cursor: pointer;
          font-family: var(--body, 'DM Sans', sans-serif);
          white-space: nowrap; user-select: none;
          background: none; border: none;
        }
        .nav-item:hover > .nav-a { color: #F4D06F; background: rgba(229,183,92,.1); }
        .nav-item.active > .nav-a,
        .nav-item.open > .nav-a {
          color: #F4D06F !important; background: rgba(201,151,43,.15) !important;
          text-shadow: 0 0 12px rgba(244,208,111,.3);
        }
        .nav-drop {
          position: absolute; top: 100%; left: 50%;
          transform: translateX(-50%) translateY(-4px);
          background: #050505; border: 1px solid rgba(201,151,43,.25);
          border-radius: 16px; padding: 10px; min-width: 190px;
          opacity: 0; visibility: hidden; pointer-events: none;
          transition: opacity .18s ease, transform .18s ease, visibility 0s linear .18s;
          box-shadow: 0 24px 60px rgba(0,0,0,.97), 0 0 0 1px rgba(229,183,92,.04), 0 8px 32px rgba(201,151,43,.08);
          z-index: 9000;
        }
        .nav-drop.wide { min-width: 320px; }
        .nav-drop-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 2px; }
        .nav-item.open > .nav-drop {
          opacity: 1; visibility: visible; pointer-events: all;
          transform: translateX(-50%) translateY(4px);
          transition: opacity .18s ease, transform .18s ease, visibility 0s linear 0s;
        }
        .nav-drop a {
          display: flex; align-items: center; gap: 8px;
          padding: 8px 10px; border-radius: 8px;
          font-size: 12px; color: rgba(255,255,255,.55); text-decoration: none;
          transition: all .16s; font-family: var(--body, 'DM Sans', sans-serif);
        }
        .nav-drop a:hover { color: #F4D06F; background: rgba(184,134,11,.14); }
        .nav-drop-ic {
          width: 26px; height: 26px; border-radius: 6px;
          background: rgba(201,151,43,.08);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; flex-shrink: 0; transition: background .16s;
        }
        .nav-drop a:hover .nav-drop-ic { background: linear-gradient(135deg, #C9972B, #F4D06F); }
        .nav-r { display: flex; align-items: center; gap: 8px; margin-left: auto; flex-shrink: 0; }
        .nav-badge {
          display: flex; align-items: center; gap: 6px;
          padding: 5px 10px 5px 8px; background: rgba(0,0,0,.8);
          border: 1px solid rgba(201,151,43,.4); border-radius: 50px;
          backdrop-filter: blur(12px); white-space: nowrap; flex-shrink: 0;
          animation: badge-bob 3s ease-in-out infinite;
        }
        @keyframes badge-bob { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-3px);} }
        .nav-badge-fire { font-size: 14px; }
        .nav-badge-num {
          font-family: var(--disp,'Syne',sans-serif); font-size: 12px; font-weight: 800;
          background: linear-gradient(135deg, #E5B75C, #F4D06F);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .nav-badge-lbl { font-size: 10px; color: rgba(255,255,255,.55); }
        .btn-cta {
          padding: 8px 20px; border-radius: 8px; font-size: 12.5px; font-weight: 700;
          background: linear-gradient(135deg, #F4D06F 0%, #E5B75C 40%, #C9972B 100%);
          color: #000; text-decoration: none; transition: all .22s;
          box-shadow: 0 4px 20px rgba(229,183,92,.3), 0 0 0 1px rgba(244,208,111,.15);
          font-family: var(--body,'DM Sans',sans-serif); white-space: nowrap; flex-shrink: 0;
        }
        .btn-cta:hover { filter: brightness(1.08); transform: translateY(-1px); box-shadow: 0 6px 28px rgba(229,183,92,.45); }
        .btn-cta-sm {
          display: none; padding: 6px 12px; border-radius: 8px;
          font-size: 11px; font-weight: 700;
          background: linear-gradient(135deg, #C9972B, #F4D06F);
          color: #000; text-decoration: none; white-space: nowrap; flex-shrink: 0;
          font-family: var(--body,'DM Sans',sans-serif); transition: all .2s;
          box-shadow: 0 3px 14px rgba(229,183,92,.25);
        }
        .btn-cta-sm:hover { transform: translateY(-1px); box-shadow: 0 5px 20px rgba(229,183,92,.4); }
        .hbg {
          display: none; flex-direction: column; gap: 5px;
          cursor: pointer; padding: 8px; margin-left: 8px;
          flex-shrink: 0; border-radius: 8px; transition: background .2s;
        }
        .hbg:hover { background: rgba(229,183,92,.1); }
        .hbg span {
          display: block; width: 20px; height: 2px;
          background: linear-gradient(90deg, #C9972B, #F4D06F);
          border-radius: 2px; transition: all .3s;
        }
        .mob-nav {
          position: fixed; inset: 0; background: #000; z-index: 9995;
          display: flex; flex-direction: column;
          padding: 82px clamp(16px,4vw,28px) 40px;
          transform: translateX(100%);
          transition: transform .38s cubic-bezier(.4,0,.2,1);
          overflow-y: auto; overflow-x: hidden;
          border-left: 1px solid rgba(201,151,43,.2);
          pointer-events: none;
        }
        .mob-nav.open { transform: translateX(0); pointer-events: auto; }
        .mob-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; justify-content: space-between;
          font-family: var(--disp,'Syne',sans-serif); font-size: 17px; font-weight: 700;
          padding: 14px 0; text-align: left;
        }
        .mob-sub-btn {
          width: 100%; background: none; border: none; cursor: pointer;
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; font-size: 14px; text-align: left;
          color: rgba(255,255,255,.65); border-radius: 8px;
          font-family: var(--body,'DM Sans',sans-serif);
        }
        .mob-sub-btn:hover { background: rgba(229,183,92,.07); color: #F4D06F; }
        @media (max-width: 860px) {
          .nav-links  { display: none !important; }
          .nav-badge  { display: none !important; }
          .btn-cta    { display: none !important; }
          .btn-cta-sm { display: inline-flex !important; }
          .hbg        { display: flex !important; }
          a.nav-logo .nav-logo-text { font-size: 15px; }
          a.nav-logo { margin-right: 0; }
        }
      `}</style>

      {/* ── DESKTOP NAV ── */}
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <BrandLogo />
            <div className="nav-logo-text">Aarvix Digital Marketing</div>
            <div className="nav-logo-dot" />
          </Link>

          <ul className="nav-links" ref={navRef}>
            {NAV_ITEMS.map((item, i) => (
              <li key={item.label} className={["nav-item", isActive(item) ? "active" : "", openIndex === i ? "open" : ""].filter(Boolean).join(" ")}>
                {item.type === "link" ? (
                  <Link href={item.href} className="nav-a"
                    style={{ color: pathname === item.href ? "#F4D06F" : undefined, background: pathname === item.href ? "rgba(201,151,43,.15)" : undefined }}>
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button className="nav-a" onClick={() => toggleDesktop(i)} aria-expanded={openIndex === i}>
                      {item.label} <ChevronDown open={openIndex === i} />
                    </button>
                    <div className={`nav-drop${item.wide ? " wide" : ""}`}>
                      {item.wide ? (
                        <div className="nav-drop-grid">
                          {item.links.map(link => (
                            <a key={link.text} href={link.href} onClick={() => setOpenIndex(null)}>
                              <span className="nav-drop-ic">{link.icon}</span>{link.text}
                            </a>
                          ))}
                        </div>
                      ) : (
                        item.links.map(link => (
                          <a key={link.text} href={link.href} onClick={() => setOpenIndex(null)}>
                            <span className="nav-drop-ic">{link.icon}</span>{link.text}
                          </a>
                        ))
                      )}
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>

          <div className="nav-r">
            <div className="nav-badge">
              <span className="nav-badge-fire">🔥</span>
              <div>
                <div className="nav-badge-num">7,50,000+</div>
                <div className="nav-badge-lbl">Creators</div>
              </div>
            </div>
            <Link href="/contact" className="btn-cta">Join Us</Link>
            <Link href="/contact" className="btn-cta-sm">Join Us</Link>
            <div className="hbg" onClick={() => setMobOpen(p => !p)} aria-label="Toggle menu">
              <span style={mobOpen ? { transform: "rotate(45deg) translate(5px,5px)" } : {}} />
              <span style={mobOpen ? { opacity: 0 } : {}} />
              <span style={mobOpen ? { transform: "rotate(-45deg) translate(5px,-5px)" } : {}} />
            </div>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`mob-nav${mobOpen ? " open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <div key={item.label} style={{ borderBottom: "1px solid rgba(184,134,11,.2)" }}>
            {item.type === "link" ? (
              <button
                className="mob-btn"
                style={{ color: pathname === item.href ? "#F4D06F" : "rgba(218,165,32,.8)" }}
                onClick={() => handleMobileLink(item.href)}
              >
                {item.label}
              </button>
            ) : (
              <>
                <button
                  className="mob-btn"
                  style={{ color: isActive(item) ? "#F4D06F" : "rgba(218,165,32,.8)" }}
                  onClick={() => setOpenIndex(prev => prev === i ? null : i)}
                >
                  {item.label}
                  <ChevronDown open={openIndex === i} />
                </button>

                {openIndex === i && (
                  <div style={{ paddingBottom: 10 }}>
                    {item.links.map(link => (
                      <button
                        key={link.text}
                        className="mob-sub-btn"
                        onClick={() => handleMobileLink(link.href)}
                      >
                        <span style={{ fontSize: 16 }}>{link.icon}</span>{link.text}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        <div style={{ marginTop: 28 }}>
          <button
            onClick={() => handleMobileLink("/contact")}
            style={{
              width: "100%", border: "none", cursor: "pointer",
              display: "block", textAlign: "center", padding: "14px", borderRadius: 999,
              background: "linear-gradient(135deg, #F4D06F 0%, #E5B75C 40%, #C9972B 100%)",
              color: "#000", fontWeight: 800, fontSize: 15,
              fontFamily: "var(--disp,'Syne',sans-serif)",
              boxShadow: "0 4px 20px rgba(229,183,92,.3)",
            }}
          >
            Join Us →
          </button>
        </div>
      </div>
    </>
  );
}