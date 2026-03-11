export const CREATOR_CATEGORIES = [
  "Comedy",
  "Finance",
  "Parenting",
  "Beauty",
  "Fashion",
  "Fitness",
  "Food",
  "Gaming",
  "Tech",
  "Travel",
] as const;

export type CreatorCategory = (typeof CREATOR_CATEGORIES)[number];

export type Creator = {
  name: string;
  audience: string;
  emoji: string;
  bg: string;
  image?: string;
  instagram?: string;
  category: CreatorCategory;
};

// Edit this list to add/remove creators in each category.
// - image: place a matching file in /public/images/creators (e.g. Zayan.png)
// - audience: this is the follower / audience count text
export const creators: Creator[] = [
  // Comedy (keep your real ones here + add placeholders as needed)
  { name: "Zayan Saifi",        audience: "11.4M+", emoji: "🌟", bg: "#1a0a00", image: "Zayan.png",     instagram: "https://www.instagram.com/zaynsaifi?igsh=ZXBkN2owbG4wam9v", category: "Comedy" },
  { name: "Bharti Singh",       audience: "9.4M+",  emoji: "😄", bg: "#1a000a", image: "Bharti.png",    instagram: "https://www.instagram.com/bharti.laughterqueen?igsh=MWhqb2Nqcjl2cXkydQ==", category: "Comedy" },
  { name: "Nazim Ahmad",        audience: "6.7M+",  emoji: "🎭", bg: "#001a0a", image: "Nazim.png",     instagram: "https://www.instagram.com/nazim4hmed?igsh=MW12ZjdoODd6cGZmZA==", category: "Comedy" },
  { name: "Wasim Ahmad",        audience: "3.1M+",  emoji: "🎬", bg: "#0a001a", image: "Wasim.png",     instagram: "https://www.instagram.com/wasim.r2h?igsh=MTgwYTNyd2cyYnhnOQ==", category: "Comedy" },
  { name: "Nishu Tiwari",       audience: "1.6M+",  emoji: "💃", bg: "#1a1000", image: "Nishu.png",     instagram: "https://www.instagram.com/inishutiwari?igsh=MWNlMXNtNzltM2N2eA==", category: "Comedy" },
  { name: "Harsh Limbachiyaa",  audience: "1.6M+",  emoji: "😂", bg: "#001018", image: "Harsh.png",     instagram: "https://www.instagram.com/haarshlimbachiyaa30?igsh=bjBvamduZG56cmdm", category: "Comedy" },
  { name: "Sneha Sachdeva",     audience: "1.2M+",  emoji: "✨", bg: "#180010", image: "Sneha.png",     instagram: "https://www.instagram.com/snehasachdeva26?igsh=aG12bGg0cm1veDZn", category: "Comedy" },
  { name: "Abhishek Kashiap",   audience: "1M+",    emoji: "🎯", bg: "#001a14", image: "Abhishek.png",  instagram: "https://www.instagram.com/abhishek_d91.king?igsh=NG5vbml4MjFsd3Q3", category: "Comedy" },
  { name: "Mohit Narang",       audience: "569K+",  emoji: "👗", bg: "#140010", image: "Mohit.png",     instagram: "https://www.instagram.com/mohit_d91.king?igsh=MWFwMWR6ZzZmMm56NA==", category: "Comedy" },
  { name: "Sonia Rawat",        audience: "556K+",  emoji: "💄", bg: "#1a0808", image: "Soniya.png",    instagram: "https://www.instagram.com/hii_soni_d91?igsh=NTJzd3JvMzF4bXd0", category: "Comedy" },
  { name: "Mayank Kaushik",     audience: "227K+",  emoji: "📱", bg: "#080a1a", image: "Mayank.png",    instagram: "https://www.instagram.com/imayankkaushik?igsh=MTBhNnRzYzk4NHNrdA==", category: "Comedy" },
  { name: "Aayush Sapra",       audience: "206K+",  emoji: "🏋️", bg: "#001810", image: "Aayush.png",   instagram: "https://www.instagram.com/aayushsapra2?igsh=MXBudGNzdmQ0MGJwOA==", category: "Comedy" },

  // Finance (sample 4)
  { name: "Finance Creator 1", audience: "500K+",  emoji: "💰", bg: "#001a0a", category: "Finance" },
  { name: "Finance Creator 2", audience: "1.2M+",  emoji: "📈", bg: "#0a1a10", category: "Finance" },
  { name: "Finance Creator 3", audience: "320K+",  emoji: "🏦", bg: "#001018", category: "Finance" },
  { name: "Finance Creator 4", audience: "2.1M+",  emoji: "🧾", bg: "#0a0f1a", category: "Finance" },

  // Parenting (sample 4)
  { name: "Parenting Creator 1", audience: "280K+", emoji: "👨‍👩‍👧", bg: "#1a0a14", category: "Parenting" },
  { name: "Parenting Creator 2", audience: "900K+", emoji: "🍼",       bg: "#120a1a", category: "Parenting" },
  { name: "Parenting Creator 3", audience: "410K+", emoji: "🧸",       bg: "#0f0a12", category: "Parenting" },
  { name: "Parenting Creator 4", audience: "1.5M+", emoji: "🏡",       bg: "#0a121a", category: "Parenting" },

  // Beauty (sample 4)
  { name: "Beauty Creator 1", audience: "650K+", emoji: "💄", bg: "#1a0808", category: "Beauty" },
  { name: "Beauty Creator 2", audience: "2.6M+", emoji: "✨", bg: "#1a0f0a", category: "Beauty" },
  { name: "Beauty Creator 3", audience: "430K+", emoji: "🧴", bg: "#140010", category: "Beauty" },
  { name: "Beauty Creator 4", audience: "980K+", emoji: "💅", bg: "#180010", category: "Beauty" },

  // Fashion (sample 4)
  { name: "Fashion Creator 1", audience: "720K+", emoji: "👗", bg: "#140010", category: "Fashion" },
  { name: "Fashion Creator 2", audience: "1.8M+", emoji: "👜", bg: "#1a0010", category: "Fashion" },
  { name: "Fashion Creator 3", audience: "350K+", emoji: "👟", bg: "#0a001a", category: "Fashion" },
  { name: "Fashion Creator 4", audience: "540K+", emoji: "🕶️", bg: "#001018", category: "Fashion" },

  // Fitness (sample 4)
  { name: "Fitness Creator 1", audience: "1.1M+", emoji: "💪", bg: "#001810", category: "Fitness" },
  { name: "Fitness Creator 2", audience: "480K+", emoji: "🏋️", bg: "#001a14", category: "Fitness" },
  { name: "Fitness Creator 3", audience: "260K+", emoji: "🥗", bg: "#001a00", category: "Fitness" },
  { name: "Fitness Creator 4", audience: "3.2M+", emoji: "🏃", bg: "#0a1a10", category: "Fitness" },

  // Food (sample 4)
  { name: "Food Creator 1", audience: "890K+", emoji: "🍕", bg: "#1a0a00", category: "Food" },
  { name: "Food Creator 2", audience: "420K+", emoji: "🍜", bg: "#1a1200", category: "Food" },
  { name: "Food Creator 3", audience: "1.9M+", emoji: "🍰", bg: "#180e00", category: "Food" },
  { name: "Food Creator 4", audience: "310K+", emoji: "☕", bg: "#0d0d00", category: "Food" },

  // Gaming (sample 4)
  { name: "Gaming Creator 1", audience: "2.4M+", emoji: "🎮", bg: "#080a1a", category: "Gaming" },
  { name: "Gaming Creator 2", audience: "560K+", emoji: "🕹️", bg: "#000a1a", category: "Gaming" },
  { name: "Gaming Creator 3", audience: "740K+", emoji: "🎧", bg: "#00051f", category: "Gaming" },
  { name: "Gaming Creator 4", audience: "1.3M+", emoji: "🏆", bg: "#001a1a", category: "Gaming" },

  // Tech (sample 4)
  { name: "Tech Creator 1", audience: "1.7M+", emoji: "📱", bg: "#080a1a", category: "Tech" },
  { name: "Tech Creator 2", audience: "980K+", emoji: "💻", bg: "#001a1a", category: "Tech" },
  { name: "Tech Creator 3", audience: "420K+", emoji: "🤖", bg: "#0a0f1a", category: "Tech" },
  { name: "Tech Creator 4", audience: "2.9M+", emoji: "⚡", bg: "#001018", category: "Tech" },

  // Travel (sample 4)
  { name: "Travel Creator 1", audience: "1.4M+", emoji: "✈️", bg: "#001018", category: "Travel" },
  { name: "Travel Creator 2", audience: "610K+", emoji: "🏝️", bg: "#000a1a", category: "Travel" },
  { name: "Travel Creator 3", audience: "390K+", emoji: "🗺️", bg: "#001a14", category: "Travel" },
  { name: "Travel Creator 4", audience: "2.2M+", emoji: "⛰️", bg: "#0a121a", category: "Travel" },
];