export type BlogCategory =
  | "Strategy"
  | "Case Study"
  | "How-To"
  | "Industry Report"
  | "Platform";

export type BlogPost = {
  id: string;
  title: string;
  category: BlogCategory;
  icon: string;
  image?: string; // path in /public/images/blogs/
  date: string;
  readTime?: string;
  excerpt?: string;
  content?: string;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    id: "barter-collab-2025",
    icon: "🤝",
    image: "Poster1.png",
    category: "Industry Report",
    title: "Wait — Brands Are Running Campaigns Without Paying Creators?!",
    excerpt: "Barter collabs are blowing up in India and here's exactly how it works.",
    content: "In 2026, more Indian brands than ever are running full influencer campaigns without spending a single rupee on creator fees. The model is simple — a brand sends its product or offers its service, and the creator posts genuine content in return. No invoice. No payment terms. Just a real collaboration built on mutual value. We've seen this work across fashion, food, beauty, and even fintech. The key is finding the right creator — someone who actually wants to use your product, not just someone chasing free stuff. Aarvix has facilitated hundreds of these deals and the results often rival paid campaigns because the content feels authentic. If you're a small brand sitting on great product but a tight budget, barter might just be your best move in 2026.",
    date: "Feb 20",
    readTime: "6 min",
    featured: true,
  },
  {
    id: "micro-vs-mega",
    icon: "🎯",
    image: "Poster2.png",
    category: "Strategy",
    title: "This 50K Creator Outperformed a 5M One. Here's Why 🤯",
    excerpt: "The follower count myth — finally exposed with real data.",
    content: "A fashion brand came to us with a simple ask to get them as much reach as possible. We suggested two creators: one with 5 million followers and one with 50,000. The brand was skeptical about the smaller one. The result? The 50K creator's post drove 4x more website clicks, 3x more DMs to the brand, and a 12% conversion rate. The 5M creator's post got impressive views but almost no action. Why? Because the smaller creator had spent years building a community that actually trusted her opinion. Her followers weren't just scrolling as they were listening. Reach is vanity. Relevance is reality. Always has been.",
    date: "Feb 12",
    readTime: "5 min",
  },
  {
    id: "creator-brief-template",
    icon: "💡",
    image: "Poster3.png",
    category: "How-To",
    title: "Creators Loved This Brief So Much They Posted Extra Content for Free 😭🙌",
    excerpt: "The exact format we use to brief creators — and why it works.",
    content: "Most brand briefs do one of two things they're either so vague the creator has no idea what to make, or so controlling the creator loses all creative spark. Both produce bad content. The brief that works does three things: it tells the creator what the brand stands for (not just what it sells), it gives one clear message to communicate, and then it gets out of the way. We've seen creators post a second piece of content for free with no ask, no prompting simply because they genuinely loved working with a brand that trusted them. That's what a good brief unlocks. Not just content. Enthusiasm.",
    date: "Feb 5",
    readTime: "4 min",
  },
  {
    id: "zepto-7m-views",
    icon: "🚀",
    image: "Poster4.png",
    category: "Case Study",
    title: "7 Million Views. No Massive Budget. How?! 👀",
    excerpt: "The Zepto campaign that nobody saw coming and what you can steal from it.",
    content: "When Zepto came to us, the goal was simple to drive awareness for their new cafe offering. The instinct might be to go big, but we went specific. We identified a tight cluster of food creators who had genuine audiences in Zepto's delivery cities. The brief was loose — try the product, show your real reaction, that's it. What followed was a series of reels that felt like real people discovering something good, not like ads. The numbers came in fast. 7 million views across the campaign. Thousands of comments from people tagging friends. Orders spiking in campaign cities. The lesson? A great product, the right creator, and a brief that doesn't kill creativity will outperform any big budget production every single time.",
    date: "Jan 28",
    readTime: "5 min",
  },
  {
    id: "reels-vs-shorts",
    icon: "📱",
    image: "Poster5.png",
    category: "Platform",
    title: "We Tested Reels vs. Shorts for Indian Brands. The Winner Surprised Us 😮",
    excerpt: "If you're putting all your budget in one platform, you need to read this.",
    content: "Everyone assumes Instagram Reels wins in India. The audience is there, the creators are there, the culture is there. But when we tracked campaign performance across both platforms for 6 months, YouTube Shorts consistently delivered longer watch times, higher saves, and better recall especially for product led content. Reels still wins on reach and virality. If you want a moment, go Reels. If you want someone to actually remember your product a week later, Shorts is punching above its weight. The smart move? Don't pick one. A creator who does both and there are plenty gives you the best of both worlds without doubling your budget.",
    date: "Jan 20",
    readTime: "5 min",
  },
];