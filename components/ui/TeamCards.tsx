"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { teamMembers } from "@/data/team";

/*
  TeamCards — minimal version
  • Image replaces emoji as avatar
  • No Instagram link, no designation/title badge
  • Same card CSS as before — only the avatar area changed
  • Place transparent PNGs in public/images/team/ and update team.ts img paths
*/

type Props = { size?: "small" | "large" };

export default function TeamCards({ size = "large" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cardW   = size === "large" ? 280 : 210;
  const avatarS = size === "large" ? 100 : 76;
  const nameFs  = size === "large" ? 18  : 15;
  const bioFs   = size === "large" ? 13  : 12;

  return (
    <>
      <style>{`
        .tc-wrap { display: flex; gap: 20px; flex-wrap: wrap; justify-content: center; }
        .tc-card {
          background: rgba(255,255,255,.025);
          border: 1px solid rgba(255,255,255,.07);
          border-radius: 22px; padding: 28px 22px 22px;
          position: relative; overflow: hidden; cursor: default;
          transition: opacity .65s ease, transform .65s cubic-bezier(.23,1,.32,1),
                      border-color .25s, background .25s, box-shadow .25s;
        }
        .tc-card:hover {
          background: rgba(255,255,255,.042);
          border-color: rgba(229,183,92,.35) !important;
          box-shadow: 0 20px 48px rgba(0,0,0,.6);
          transform: translateY(-6px) !important;
        }
        .tc-card-bar {
          position: absolute; top: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, transparent, rgba(229,183,92,.5), transparent);
          opacity: .3; transition: opacity .25s;
        }
        .tc-card:hover .tc-card-bar { opacity: .9; }
        .tc-avatar-wrap { position: relative; margin: 0 auto 20px; }
        .tc-avatar-img {
          border-radius: 50%; overflow: hidden;
          border: 2px solid rgba(229,183,92,.2);
          transition: border-color .25s;
          background: rgba(255,255,255,.03);
        }
        .tc-card:hover .tc-avatar-img { border-color: rgba(229,183,92,.5); }
        .tc-avatar-img img {
          width: 100% !important; height: 100% !important;
          object-fit: cover; object-position: center top;
          display: block;
        }
        .tc-name {
          font-family: var(--disp,'Syne',sans-serif); font-weight: 900;
          letter-spacing: -.02em; color: #fff; line-height: 1.2;
          margin-bottom: 8px; text-align: center;
        }
        .tc-bio {
          color: rgba(255,255,255,.36); line-height: 1.7;
          margin-bottom: 0; min-height: 52px; text-align: center;
        }
      `}</style>

      <div ref={ref} className="tc-wrap">
        {teamMembers.map((m, i) => (
            <div
              key={m.id}
              className="tc-card"
              style={{
                width: cardW, flexBasis: cardW,
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(36px)",
                transitionDelay: `${0.18 + i * 0.12}s`,
              }}
            >
              <div className="tc-card-bar" />

              {/* Avatar */}
              <div className="tc-avatar-wrap" style={{ width: avatarS, height: avatarS }}>
                <div className="tc-avatar-img" style={{ width: avatarS, height: avatarS }}>
                  <Image
                    src={m.img}
                    alt={m.name}
                    width={avatarS}
                    height={avatarS}
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                  />
                </div>
              </div>

              {/* Name + bio only */}
              <div className="tc-name" style={{ fontSize: nameFs }}>{m.name}</div>
              <div className="tc-bio"  style={{ fontSize: bioFs }}>
                {m.shortBio}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}