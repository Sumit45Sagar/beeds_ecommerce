export const ATELIER_PURPOSES = [
  {
    id: "love",
    title: "LOVE",
    subtitle: "Rose quartz · Rhodonite",
    image: "/assets/studio-1purpose-desktop1440_img_2.png",
    description: "Invites heartfelt romance, empathy, gentle forgiveness and deep self-appreciation.",
    suggestedBeads: {
      primary: "Rose Quartz",
      secondary: "Amethyst",
      focal: "Citrine Focal"
    },
    defaultComposition: [
      { name: "Rose Quartz", count: 12, color: "#E8B4B8" },
      { name: "Amethyst", count: 5, color: "#8E51B8" },
      { name: "Citrine Focal", count: 1, color: "#E5A93C" }
    ],
    price: 2349
  },
  {
    id: "money",
    title: "MONEY",
    subtitle: "Pyrite · Citrine",
    image: "/assets/studio-1purpose-desktop1440_img_3.png",
    description: "Channels steady merchant wealth, golden opportunities, and expansive monetary flow.",
    suggestedBeads: {
      primary: "Pyrite",
      secondary: "Golden Citrine",
      focal: "Kuber Talisman"
    },
    defaultComposition: [
      { name: "Pyrite", count: 10, color: "#B59E5F" },
      { name: "Golden Citrine", count: 7, color: "#E8B830" },
      { name: "Kuber Talisman", count: 1, color: "#D9AE4F" }
    ],
    price: 2499
  },
  {
    id: "career",
    title: "CAREER",
    subtitle: "Tiger eye · Carnelian",
    image: "/assets/studio-1purpose-desktop1440_img_4.png",
    description: "Sharpens professional focus, charismatic leadership, and fearless strategic momentum.",
    suggestedBeads: {
      primary: "Tiger Eye",
      secondary: "Carnelian",
      focal: "Solar Hematite"
    },
    defaultComposition: [
      { name: "Tiger Eye", count: 11, color: "#9A652A" },
      { name: "Carnelian", count: 6, color: "#C64D24" },
      { name: "Solar Hematite", count: 1, color: "#545258" }
    ],
    price: 2249
  },
  {
    id: "confidence",
    title: "CONFIDENCE",
    subtitle: "Sunstone · Garnet",
    image: "/assets/studio-1purpose-desktop1440_img_5.png",
    description: "Radiates personal magnetism, dissolves imposter anxiety, and stokes inner sovereign fire.",
    suggestedBeads: {
      primary: "Sunstone",
      secondary: "Deep Garnet",
      focal: "Gold Spacer"
    },
    defaultComposition: [
      { name: "Sunstone", count: 10, color: "#DF7A4A" },
      { name: "Deep Garnet", count: 7, color: "#6A1A24" },
      { name: "Gold Spacer", count: 1, color: "#D9AE4F" }
    ],
    price: 2399
  },
  {
    id: "protection",
    title: "PROTECTION",
    subtitle: "Black tourmaline · Obsidian",
    image: "/assets/studio-1purpose-desktop1440_img_6.png",
    description: "Creates an impenetrable energetic boundary against jealousy, psychic fatigue, and negativity.",
    suggestedBeads: {
      primary: "Black Tourmaline",
      secondary: "Smoky Quartz",
      focal: "Silver Eye Bead"
    },
    defaultComposition: [
      { name: "Black Tourmaline", count: 12, color: "#1F1F24" },
      { name: "Smoky Quartz", count: 5, color: "#4A403A" },
      { name: "Silver Eye Bead", count: 1, color: "#C0B8C8" }
    ],
    price: 2299
  },
  {
    id: "peace",
    title: "INNER PEACE",
    subtitle: "Amethyst · Lepidolite",
    image: "/assets/11shopbypurpose-desktop_img_5.png",
    description: "Quiets chronic anxiety, harmonizes the nervous system, and opens deep restful meditation.",
    suggestedBeads: {
      primary: "Amethyst",
      secondary: "Clear Quartz",
      focal: "Lotus Charm"
    },
    defaultComposition: [
      { name: "Amethyst", count: 12, color: "#7B43B8" },
      { name: "Clear Quartz", count: 5, color: "#ECEEF5" },
      { name: "Lotus Charm", count: 1, color: "#D9AE4F" }
    ],
    price: 2399
  }
];

export const AVAILABLE_BEADS = [
  { id: "rose-quartz", name: "Rose Quartz", color: "#E8B4B8", aura: "Love & Empathy", priceDelta: 0 },
  { id: "amethyst", name: "Amethyst", color: "#7B43B8", aura: "Peace & Intuition", priceDelta: 40 },
  { id: "citrine", name: "Citrine Focal", color: "#E5A93C", aura: "Abundance & Joy", priceDelta: 80 },
  { id: "pyrite", name: "Pyrite Nugget", color: "#B59E5F", aura: "Wealth & Manifestation", priceDelta: 60 },
  { id: "tiger-eye", name: "Golden Tiger Eye", color: "#9A652A", aura: "Courage & Will", priceDelta: 30 },
  { id: "carnelian", name: "Sunset Carnelian", color: "#C64D24", aura: "Vitality & Drive", priceDelta: 40 },
  { id: "tourmaline", name: "Black Tourmaline", color: "#1E1C22", aura: "Psychic Shield", priceDelta: 50 },
  { id: "rudraksha", name: "Nepali Rudraksha", color: "#8B5226", aura: "Shiva Consciousness", priceDelta: 70 },
  { id: "gold-spacer", name: "24K Gold Spacer", color: "#D9AE4F", aura: "Harmonic Amplifier", priceDelta: 90 }
];

export const SIZES = [
  { id: "s", label: "S · 15 cm", desc: "Petite wrists (14–15.5 cm)", beadCount: 16 },
  { id: "m", label: "M · 16 cm", desc: "Standard wrist fit (16–17 cm)", beadCount: 18, isDefault: true },
  { id: "l", label: "L · 17.5 cm", desc: "Relaxed / broader fit (17.5–19 cm)", beadCount: 20 }
];
