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
  // Comedy
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

  // Example Finance creator (edit or duplicate this block)
  // {
  //   name: "Finance Creator Name",
  //   audience: "500K+",
  //   emoji: "💰",
  //   bg: "#001a0a",
  //   image: "finance-creator.png",
  //   instagram: "https://www.instagram.com/...",
  //   category: "Finance",
  // },

  // Example Parenting creator
  // {
  //   name: "Parenting Creator Name",
  //   audience: "300K+",
  //   emoji: "👨‍👩‍👧",
  //   bg: "#1a0a14",
  //   image: "parenting-creator.png",
  //   instagram: "https://www.instagram.com/...",
  //   category: "Parenting",
  // },
];