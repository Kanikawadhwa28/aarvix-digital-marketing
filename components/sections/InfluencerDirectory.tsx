"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { creators } from "@/data/creators";

const CATEGORY_TABS = ["All", "Comedy", "Finance", "Parenting", "Beauty", "Fashion", "Fitness", "Food", "Gaming", "Tech", "Travel"] as const;

type Category = (typeof CATEGORY_TABS)[number];

type Card = {
  name: string;
  category: Category;
  followers: string;
  emoji: string;
  bg: string;
  image?: string;
};

const comedyCards: Card[] = creators.map((c) => ({
  name: c.name,
  category: "Comedy",
  followers: c.audience,
  emoji: c.emoji,
  bg: c.bg,
  image: c.image,
}));

const placeholder = (category: Category, baseEmoji: string): Card[] => [
  { name: `${category} Creator 1`, category, followers: "250K+", emoji: baseEmoji, bg: "#1a0f0a" },
  { name: `${category} Creator 2`, category, followers: "480K+", emoji: baseEmoji, bg: "#0a0f1a" },
  { name: `${category} Creator 3`, category, followers: "120K+", emoji: baseEmoji, bg: "#1a0a14" },
  { name: `${category} Creator 4`, category, followers: "600K+", emoji: baseEmoji, bg: "#001a00" },
];

const CATEGORY_MAP: Record<Category, Card[]> = {
  All: [
    // Real comedy creators first
    ...comedyCards,
    // Representative placeholders from other categories
    ...placeholder("Finance", "💰"),
    ...placeholder("Beauty", "💄"),
    ...placeholder("Fashion", "👗"),
    ...placeholder("Fitness", "💪"),
  ],
  Comedy: comedyCards.length ? comedyCards : placeholder("Comedy", "😂"),
  Finance: placeholder("Finance", "💰"),
  Parenting: placeholder("Parenting", "👨‍👩‍👧"),
  Beauty: placeholder("Beauty", "💄"),
  Fashion: placeholder("Fashion", "👗"),
  Fitness: placeholder("Fitness", "💪"),
  Food: placeholder("Food", "🍕"),
  Gaming: placeholder("Gaming", "🎮"),
  Tech: placeholder("Tech", "📱"),
  Travel: placeholder("Travel", "✈️"),
};

export default function InfluencerDirectory() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const normalizedFromQuery = categoryParam
    ? (categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase())
    : null;

  const [active, setActive] = useState<Category>("All");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    if (!normalizedFromQuery) return;
    if (CATEGORY_TABS.includes(normalizedFromQuery as Category)) {
      setActive(normalizedFromQuery as Category);
      setVisibleCount(4);
    }
  }, [normalizedFromQuery]);

  const cards = CATEGORY_MAP[active] ?? [];
  const showLoadMore = cards.length > visibleCount;

  return (
    <>
      <style>{`
        /* 2 columns on mobile so 2 cards always visible */
        @media (max-width: 860px) {
          .inf-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .icard-photo {
            aspect-ratio: 1 / 1 !important;
          }
          .icard-img {
            font-size: 42px !important;
          }
        }
        @media (max-width: 560px) {
          .inf-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 10px !important;
          }
          .icard-info {
            padding: 9px 10px 11px !important;
          }
          .icard-name {
            font-size: 12px !important;
          }
          .icard-cat {
            font-size: 9.5px !important;
          }
          .icard-meta {
            font-size: 10px !important;
          }
          .ov-f {
            font-size: 20px !important;
          }
          .ov-er {
            font-size: 10px !important;
          }
          .ov-cta {
            font-size: 11px !important;
            padding: 6px 12px !important;
          }
        }
      `}</style>

      <section id="top-creators" className="inf-bg reveal">
        <div className="tc" style={{ marginBottom: 14 }}>
          <span className="stag">Discover Creators</span>
          <h2 className="sh">We have access to 7,50,000 <em>creators</em> across India</h2>
          <p className="ssub" style={{ margin: "10px auto 28px" }}>
            Browse by niche — cards are for browsing only; no profiles open from here.
          </p>
        </div>

        {/* Category tabs */}
        <div className="cat-row">
          {CATEGORY_TABS.map((cat) => (
            <button
              key={cat}
              className={`catb${active === cat ? " on" : ""}`}
              onClick={() => {
                setActive(cat);
                setVisibleCount(4);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="inf-grid">
          {cards.slice(0, visibleCount).map((inf) => (
            <div key={`${inf.name}-${inf.category}`} className="icard">
              <div className="icard-photo">

                <div
                  className="icard-img"
                  style={{
                    background: inf.image
                      ? "#000"
                      : `linear-gradient(135deg,${inf.bg},#0d0d0d)`,
                    backgroundImage: inf.image
                      ? `url(/images/creators/${inf.image})`
                      : undefined,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {!inf.image && (
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 48,
                      }}
                    >
                      {inf.emoji}
                    </span>
                  )}
                </div>

                <div className="icard-ov">
                  <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 8 }}>{inf.emoji}</div>
                  <div className="ov-f">{inf.followers}</div>
                  <div className="ov-er" style={{ marginBottom: 12 }}>Audience size</div>
                </div>

              </div>

              {/* Always-visible card info */}
              <div className="icard-info">
                <div className="icard-name">{inf.name}</div>
                <div className="icard-cat">{inf.category}</div>
                <div className="icard-meta">
                  <span>📸 {inf.followers} followers</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {showLoadMore && (
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <button
              className="btn btn-w"
              onClick={() => setVisibleCount((c) => c + 4)}
            >
              Load more creators →
            </button>
          </div>
        )}
      </section>
    </>
  );
}