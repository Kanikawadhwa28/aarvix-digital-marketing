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
  { name: "Bharti Singh",       audience: "9.4M+",  emoji: "😄", bg: "#1a000a", image: "Bharti.png", category: "Comedy" },
  { name: "Nazim Ahmad",        audience: "6.7M+",  emoji: "🎭", bg: "#001a0a", image: "Nazim.png",  category: "Comedy" },
  { name: "Wasim Ahmad",        audience: "3.1M+",  emoji: "🎬", bg: "#0a001a", image: "Wasim.png",  category: "Comedy" },
  { name: "Nishu Tiwari",       audience: "1.6M+",  emoji: "💃", bg: "#1a1000", image: "Nishu.png",  category: "Comedy" },
  { name: "Harsh Limbachiyaa",  audience: "1.6M+",  emoji: "😂", bg: "#001018", image: "Harsh.png",  category: "Comedy" },
  { name: "Sneha Sachdeva",     audience: "1.2M+",  emoji: "✨", bg: "#180010", image: "Sneha.png",  category: "Comedy" },
  { name: "Abhishek Kashiap",   audience: "1M+",    emoji: "🎯", bg: "#001a14", image: "Abhishek.png", category: "Comedy" },
  { name: "Mohit Narang",       audience: "569K+",  emoji: "🤩", bg: "#140010", image: "Mohit.png",    category: "Comedy" },
  { name: "Sonia Rawat",        audience: "556K+",  emoji: "💄", bg: "#1a0808", image: "Soniya.png",   category: "Comedy" },
  { name: "Mayank Kaushik",     audience: "227K+",  emoji: "📱", bg: "#080a1a", image: "Mayank.png",   category: "Comedy" },
  { name: "Aayush Sapra",       audience: "206K+",  emoji: "🏋️", bg: "#001810", image: "Aayush.png", category: "Comedy" },
  { name: "Tanmay Bhat",       audience: "2M+",  emoji: "😄", bg: "#1a000a", image: "Tanmay.png", category: "Comedy" },


  // Finance (sample 4)
  { name: "Rachana Phadke Ranade", audience: "1.2M+",  emoji: "💰", bg: "#001a0a", image: "Rachana.png" , category: "Finance" },
  { name: "Sakchi Jain", audience: "1.8M+",  emoji: "📈", bg: "#0a1a10", image: "Sakchi.png" , category: "Finance" },
  { name: "Pushkar Raj Thakur", audience: "2.8M+",  emoji: "🏦", bg: "#001018", image: "Pushkar.png" , category: "Finance" },
  { name: "Sharan Hegde", audience: "2.9M+",  emoji: "🧾", bg: "#0a0f1a", image: "Sharan.png" , category: "Finance" },

  // Parenting (sample 4)
  { name: "Ritu Rathee Taneja", audience: "1.4M+", emoji: "🧸", bg: "#0f0a12", image: "Ritu.png" , category: "Parenting" },
  { name: "Neha Dhupia", audience: "7M+", emoji: "🍼", bg: "#120a1a", image: "Neha.png" ,   category: "Parenting" },
  { name: "Smriti Khanna", audience: "1.5M+", emoji: "🏡", bg: "#0a121a", image: "Smriti.png" , category: "Parenting" },
  { name: "Payal", audience: "140K+", emoji: "👨‍👩‍👧", bg: "#1a0a14", image: "Payal.png" , category: "Parenting" },

  // Beauty (sample 4)
  { name: "Neetu Bisht", audience: "5.2M+", emoji: "🧴", bg: "#140010", image: "Neetu.png" , category: "Beauty" },
  { name: "Yashi Tank", audience: "1.5M+", emoji: "💄", bg: "#1a0808", image: "Yashi.png" , category: "Beauty" },
  { name: "Mrunal Panchal Sharma", audience: "6M+", emoji: "💅", bg: "#180010", image: "Mrunal.png" , category: "Beauty" },
  { name: "Shruti Yogi", audience: "585K+", emoji: "✨", bg: "#1a0f0a", image: "Shruti.png" , category: "Beauty" },

  // Fashion (sample 4)
  { name: "Kritika Khurana", audience: "1.8M+", emoji: "👗", bg: "#140010", image: "Kritika.png" , category: "Fashion" },
  { name: "Nancy Tyagi", audience: "3.1M+", emoji: "👜", bg: "#1a0010", image: "Nancy.png" , category: "Fashion" },
  { name: "Karron S Dhinggra", audience: "2.4M+", emoji: "👟", bg: "#0a001a", image: "Karron.png" , category: "Fashion" },
  { name: "Aashna Shroff", audience: "1M+", emoji: "🕶️", bg: "#001018", image: "Aashna.png" , category: "Fashion" },

  // Fitness (sample 4)
  { name: "Gaurav Taneja", audience: "3.4M+", emoji: "💪", bg: "#001810", image: "Gaurav.png" , category: "Fitness" },
  { name: "Sahil Khan", audience: "9.1M+", emoji: "🏋️", bg: "#001a14", image: "Sahil.png" , category: "Fitness" },
  { name: "Rohit Khatri", audience: "2.4M+", emoji: "🥗", bg: "#001a00", image: "Rohit.png" , category: "Fitness" },
  { name: "Yasmin Karachiwala", audience: "1.1M+", emoji: "🏃", bg: "#0a1a10", image: "Yasmin.png" , category: "Fitness" },

  // Food (sample 4)
  { name: "Kunal Kapur", audience: "4.1M+", emoji: "🍕", bg: "#1a0a00", image: "Kunal.png" , category: "Food" },
  { name: "Ranveer Brar", audience: "4.5M+", emoji: "🍜", bg: "#1a1200", image: "Ranveer.png" , category: "Food" },
  { name: "Kabita Singh", audience: "1.8M+", emoji: "🍰", bg: "#180e00", image: "Kabita.png" , category: "Food" },
  { name: "Sanjyot Keer", audience: "604K+", emoji: "☕", bg: "#0d0d00", image: "Sanjyot.png" , category: "Food" },

  // Gaming (sample 4)
  { name: "Nischay Malhan", audience: "13.3M+", emoji: "🎮", bg: "#080a1a", image: "Nischay.png" , category: "Gaming" },
  { name: "𝑨𝒋𝒆𝒚 𝑵𝒂𝒈𝒂𝒓", audience: "21.3M+", emoji: "🕹️", bg: "#000a1a", image: "𝑨𝒋𝒆𝒚.png" , category: "Gaming" },
  { name: "Ujjwal Chaurasia", audience: "1.7M+", emoji: "🎧", bg: "#00051f", image: "Ujjwal.png" , category: "Gaming" },
  { name: "Ajendra Variya", audience: "7.3M+", emoji: "🏆", bg: "#001a1a", image: "Ajendra.png" , category: "Gaming" },

  // Tech (sample 4)
  { name: "Jai Arora", audience: "3.7M+", emoji: "📱", bg: "#080a1a", image: "Jai.png", category: "Tech" },
  { name: "Gaurav Chaudhary", audience: "5.9M+", emoji: "💻", bg: "#001a1a", image: "GauravChaudhary.png" , category: "Tech" },
  { name: "Shlok Srivastava", audience: "4.3M+", emoji: "🤖", bg: "#0a0f1a", image: "Shlok.png" , category: "Tech" },
  { name: "Arun Prabhudesai", audience: "1.6M+", emoji: "⚡", bg: "#001018", image: "Arun.png" , category: "Tech" },

  // Travel (sample 4)
  { name: "Prerna Malhan", audience: "2.2M+", emoji: "🗺️", bg: "#001a14", image: "Prerna.png" , category: "Travel" },
  { name: "Brinda Sharma", audience: "1.6M+", emoji: "✈️", bg: "#001018", image: "Brinda.png" , category: "Travel" },
  { name: "Kamiya Jani", audience: "1M+", emoji: "🏝️", bg: "#000a1a", image: "Kamiya.png" , category: "Travel" },
  { name: "Isa Khan", audience: "1.6M+", emoji: "⛰️", bg: "#0a121a", image: "Isa.png" , category: "Travel" },
];