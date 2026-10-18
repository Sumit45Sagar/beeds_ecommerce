// Atelier Customization Flow Dataset (Exact Figma 1:1 Pixel Reproduction)

export const FLOW_CATEGORIES = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'numerology', label: 'Numerology' },
  { id: 'zodiac', label: 'Zodiac' },
  { id: 'planetary', label: 'Planetary' },
  { id: 'profession', label: 'Profession' }
];

export const FLOW_STEPS = [
  { num: 1, id: 'purpose', label: 'PURPOSE', zodiacLabel: 'CHOOSE' },
  { num: 2, id: 'intention', label: 'INTENTION', zodiacLabel: 'CRYSTALS' },
  { num: 3, id: 'birth', label: 'BIRTH', zodiacLabel: 'BEADS' },
  { num: 4, id: 'charm', label: 'CHARM', zodiacLabel: 'CHARM' },
  { num: 5, id: 'review', label: 'REVIEW', zodiacLabel: 'REVIEW' }
];

export const PURPOSES_DATA = [
  {
    num: '01',
    id: 'love',
    title: 'LOVE & RELATIONSHIPS',
    shortTitle: 'Love & Relationships',
    description: 'Invite tenderness, partnership and self-worth.',
    icon: '/assets/studio1_img_1.png',
    intentions: [
      { id: 'open-the-heart', title: 'OPEN THE HEART', badge: '', desc: 'Selected when your purpose is love & relationships and you want to work with open the heart.' },
      { id: 'attract-love', title: 'ATTRACT LOVE', badge: 'Love Magnet', desc: 'Traditionally associated with attract love.' },
      { id: 'attract-partnership', title: 'ATTRACT PARTNERSHIP', badge: '', desc: 'Selected when your purpose is love & relationships and you want to work with attract partnership.' },
      { id: 'self-love', title: 'SELF-LOVE', badge: '', desc: 'Selected when your purpose is love & relationships and you want to work with self-love.' },
      { id: 'relationship-harmony', title: 'RELATIONSHIP HARMONY', badge: 'Harmony Heart', desc: 'Traditionally associated with relationship harmony.' },
      { id: 'heal-after-heartache', title: 'HEAL AFTER HEARTACHE', badge: '', desc: 'Selected when your purpose is love & relationships and you want to work with heal after heartache.' },
      { id: 'attract-new-relationship', title: 'ATTRACT A NEW RELATIONSHIP', badge: 'New Love Bloom', desc: 'Traditionally associated with attract a new relationship.' },
      { id: 'strengthen-existing', title: 'STRENGTHEN EXISTING RELATIONSHIP', badge: 'Forever Bond', desc: 'Traditionally associated with strengthen existing relationship.' },
      { id: 'passion-romance', title: 'PASSION & ROMANCE', badge: 'Passion Flame', desc: 'Traditionally associated with passion & romance.' },
      { id: 'trust-connection', title: 'TRUST & CONNECTION', badge: 'Heart Connection', desc: 'Traditionally associated with trust & connection.' },
      { id: 'heal-heartbreak', title: 'HEAL FROM HEARTBREAK', badge: 'Heart Renewal', desc: 'Traditionally associated with heal from heartbreak.' },
      { id: 'let-go-past', title: 'LET GO OF PAST LOVE', badge: 'Release & Renew', desc: 'Traditionally associated with let go of past love.' },
      { id: 'open-my-heart', title: 'OPEN MY HEART', badge: 'Open Heart', desc: 'Traditionally associated with open my heart.' },
      { id: 'self-worth', title: 'SELF-WORTH & APPRECIATION', badge: 'Heart of Confidence', desc: 'Traditionally associated with self-worth & appreciation.' },
      { id: 'long-term-love', title: 'LONG-TERM LOVE / COMMITMENT', badge: 'Eternal Love', desc: 'Traditionally associated with long-term love / commitment.' }
    ],
    defaultIntentionId: 'open-the-heart',
    baseStrandName: 'OPEN THE HEART',
    defaultCrystals: [
      { id: 'rose-quartz', name: 'Rose Quartz', color: '#E8B4B8', count: 13, pricePerBead: 7, active: true, img: '/assets/studio3_img_1.jpg' },
      { id: 'rhodonite', name: 'Rhodonite', color: '#C86D7A', count: 1, pricePerBead: 28, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'strawberry-quartz', name: 'Strawberry Quartz', color: '#D95368', count: 1, pricePerBead: 100, active: true, img: '/assets/studio3_img_3.jpg' },
      { id: 'moonstone', name: 'Moonstone', color: '#EDEBF5', count: 1, pricePerBead: 23, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '02',
    id: 'money',
    title: 'MONEY & ABUNDANCE',
    shortTitle: 'Money & Abundance',
    description: 'Align with wealth, flow and material ease.',
    icon: '/assets/studio1_img_2.png',
    intentions: [
      { id: 'attract-wealth', title: 'ATTRACT WEALTH', badge: 'Wealth Magnet', desc: 'Traditionally associated with drawing sudden windfalls and commercial luck.' },
      { id: 'financial-abundance', title: 'FINANCIAL ABUNDANCE', badge: 'Abundance Aura', desc: 'Focuses consistent income streams and dissolves scarcity anxiety.' },
      { id: 'increase-opportunities', title: 'INCREASE OPPORTUNITIES', badge: 'Opportunity Flow', desc: 'Opens unexpected synchronicities, investor doors and business leads.' },
      { id: 'business-growth', title: 'BUSINESS GROWTH', badge: 'Business Prosperity', desc: 'Expands client reach, strategic negotiation and merchant grace.' },
      { id: 'startup-success', title: 'STARTUP SUCCESS', badge: 'Founder Band', desc: 'For builders & founders: builds perseverance, capital attraction and grit.' },
      { id: 'money-mindset', title: 'MONEY MINDSET', badge: 'Prosperity Mindset', desc: 'Clears ancestral money blocks and aligns with wealthy deservingness.' },
      { id: 'success-achievement', title: 'SUCCESS & ACHIEVEMENT', badge: 'Success Fortune', desc: 'Magnifies career elevation, exam triumph and professional praise.' },
      { id: 'luck-opportunity', title: 'LUCK & OPPORTUNITY', badge: 'Lucky Prosperity', desc: 'Auspicious planetary alignment for timing and high-value decisions.' }
    ],
    defaultIntentionId: 'increase-opportunities',
    baseStrandName: 'OPPORTUNITY FLOW',
    defaultCrystals: [
      { id: 'green-aventurine', name: 'Green Aventurine', color: '#2E8B57', count: 12, pricePerBead: 8, active: true, img: '/assets/green_aventurine_beads.jpg' },
      { id: 'citrine', name: 'Golden Citrine', color: '#E8B830', count: 3, pricePerBead: 29, active: true, img: '/assets/studio3_img_6.jpg' },
      { id: 'pyrite', name: 'Iron Pyrite', color: '#B59E5F', count: 1, pricePerBead: 45, active: true, img: '/assets/pyrite_beads_macro.jpg' }
    ]
  },
  {
    num: '03',
    id: 'career',
    title: 'CAREER & SUCCESS',
    shortTitle: 'Career & Success',
    description: 'Support ambition, recognition and skilled work.',
    icon: '/assets/studio1_img_3.png',
    intentions: [
      { id: 'leadership', title: 'EXECUTIVE LEADERSHIP', badge: 'Sovereign Presence', desc: 'Commands unforced authority, boardroom respect and calm decision-making.' },
      { id: 'public-speaking', title: 'CHARISMA & INFLUENCE', badge: 'Throat Prana', desc: 'Awakens magnetic speech, persuasive negotiation and audience rapport.' },
      { id: 'promotion', title: 'PROMOTION & HONORS', badge: 'Ascent Crown', desc: 'Clears political bottlenecks and accelerates deserved organizational ascension.' },
      { id: 'creative-breakthrough', title: 'INNOVATION & VISION', badge: 'Genius Matrix', desc: 'Unlocks lateral problem-solving, architectural design and patent insights.' }
    ],
    defaultIntentionId: 'leadership',
    baseStrandName: 'EXECUTIVE ASCENT',
    defaultCrystals: [
      { id: 'tiger-eye', name: 'Golden Tiger Eye', color: '#9A652A', count: 11, pricePerBead: 5.75, active: true, img: '/assets/studio3_img_5.jpg' },
      { id: 'pyrite', name: 'Peruvian Pyrite', color: '#B59E5F', count: 4, pricePerBead: 45, active: true, img: '/assets/pyrite_beads_macro.jpg' },
      { id: 'hematite', name: 'Solar Hematite', color: '#444248', count: 1, pricePerBead: 20, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '04',
    id: 'confidence',
    title: 'CONFIDENCE & POWER',
    shortTitle: 'Confidence & Power',
    description: 'Stand in your voice, will and presence.',
    icon: '/assets/studio1_img_4.png',
    intentions: [
      { id: 'solar-will', title: 'SOLAR PLEXUS FIRE', badge: 'Manipura Ignite', desc: 'Ignites unwavering gut confidence and terminates self-doubt cycles.' },
      { id: 'boundary-mastery', title: 'UNAPOLOGETIC BOUNDARIES', badge: 'Shield of Self', desc: 'Empowers saying sacred "No" without guilt or emotional compromise.' },
      { id: 'courage-action', title: 'FEARLESS ACTION', badge: 'Warrior Stance', desc: 'Propels decisive movement through stagnation, hesitation and doubt.' }
    ],
    defaultIntentionId: 'solar-will',
    baseStrandName: 'SOLAR SOVEREIGNTY',
    defaultCrystals: [
      { id: 'sunstone', name: 'Sunstone', color: '#DF7A4A', count: 12, pricePerBead: 12, active: true, img: '/assets/studio3_img_6.jpg' },
      { id: 'carnelian', name: 'Carnelian', color: '#C64D24', count: 3, pricePerBead: 15, active: true, img: '/assets/studio3_img_3.jpg' },
      { id: 'tiger-eye', name: 'Tiger Eye', color: '#9A652A', count: 1, pricePerBead: 5.75, active: true, img: '/assets/studio3_img_5.jpg' }
    ]
  },
  {
    num: '05',
    id: 'personal-power',
    title: 'CONFIDENCE & PERSONAL POWER',
    shortTitle: 'Confidence & Personal Power',
    description: 'Stand in voice, will and presence.',
    icon: '/assets/studio1_img_5.png',
    intentions: [
      { id: 'royal-sovereignty', title: 'ROYAL SOVEREIGNTY', badge: 'Aura of Command', desc: 'Radiates majestic inner authority, composure and magnetic charisma.' },
      { id: 'inner-fire', title: 'UNBREAKABLE WILL', badge: 'Indomitable', desc: 'Terminates procrastination and anchors unstoppable execution.' }
    ],
    defaultIntentionId: 'royal-sovereignty',
    baseStrandName: 'SOVEREIGN WILL',
    defaultCrystals: [
      { id: 'carnelian', name: 'Carnelian', color: '#C64D24', count: 12, pricePerBead: 15, active: true, img: '/assets/studio3_img_3.jpg' },
      { id: 'citrine', name: 'Citrine', color: '#E8B830', count: 3, pricePerBead: 29, active: true, img: '/assets/studio3_img_6.jpg' },
      { id: 'pyrite', name: 'Pyrite', color: '#B59E5F', count: 1, pricePerBead: 45, active: true, img: '/assets/pyrite_beads_macro.jpg' }
    ]
  },
  {
    num: '06',
    id: 'protection',
    title: 'PROTECTION & GROUNDING',
    shortTitle: 'Protection & Grounding',
    description: 'Feel held, bounded and rooted.',
    icon: '/assets/studio1_img_6.png',
    intentions: [
      { id: 'evil-eye', title: 'EVIL EYE SHIELD', badge: 'Nazar Shield', desc: 'Deflects envy, psychic intrusion and toxic atmospheric vibrations.' },
      { id: 'root-grounding', title: 'EARTH EMBODIMENT', badge: 'Muladhara Anchor', desc: 'Grounds hyperactive nervous systems into steady planetary stability.' },
      { id: 'aura-seal', title: 'AURA FORTRESS', badge: 'Etheric Armor', desc: 'Seals energy leaks caused by crowded cities and screen fatigue.' }
    ],
    defaultIntentionId: 'evil-eye',
    baseStrandName: 'ETHERIC FORTRESS',
    defaultCrystals: [
      { id: 'black-tourmaline', name: 'Black Tourmaline', color: '#1B1A1E', count: 12, pricePerBead: 12, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'smoky-quartz', name: 'Smoky Quartz', color: '#4A403A', count: 3, pricePerBead: 18, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'hematite', name: 'Hematite', color: '#444248', count: 1, pricePerBead: 20, active: true, img: '/assets/studio3_img_5.jpg' }
    ]
  },
  {
    num: '07',
    id: 'focus',
    title: 'FOCUS & CLARITY',
    shortTitle: 'Focus & Clarity',
    description: 'Quiet noise so decisions feel clean.',
    icon: '/assets/studio1_img_7.png',
    intentions: [
      { id: 'deep-work', title: 'DEEP FLOW STATE', badge: 'Monk Focus', desc: 'Sustains undisturbed multi-hour attention on masterwork and complex tasks.' },
      { id: 'mental-fog', title: 'DISSOLVE BRAIN FOG', badge: 'Clarity Matrix', desc: 'Clears cognitive burnout, overstimulation and mental paralysis.' }
    ],
    defaultIntentionId: 'deep-work',
    baseStrandName: 'DIAMOND MIND',
    defaultCrystals: [
      { id: 'fluorite', name: 'Rainbow Fluorite', color: '#4B8B82', count: 11, pricePerBead: 16, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'clear-quartz', name: 'Himalayan Clear Quartz', color: '#ECEEF5', count: 4, pricePerBead: 10, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'sodalite', name: 'Deep Sodalite', color: '#273C64', count: 1, pricePerBead: 25, active: true, img: '/assets/studio3_img_7.jpg' }
    ]
  },
  {
    num: '08',
    id: 'calm',
    title: 'CALM & EMOTIONAL BALANCE',
    shortTitle: 'Calm & Emotional Balance',
    description: 'Soften intensity and restore evenness.',
    icon: '/assets/studio1_img_8.png',
    intentions: [
      { id: 'anxiety-relief', title: 'NERVOUS SYSTEM PEACE', badge: 'Somatic Stillness', desc: 'Downregulates racing pulses, breath shallowness and fight-or-flight states.' },
      { id: 'emotional-equanimity', title: 'EQUANIMITY IN CRISIS', badge: 'Calm Witness', desc: 'Maintains dignified composure and neutrality during turbulent storms.' }
    ],
    defaultIntentionId: 'anxiety-relief',
    baseStrandName: 'SERENE WATERS',
    defaultCrystals: [
      { id: 'amethyst', name: 'Amethyst', color: '#7B43B8', count: 12, pricePerBead: 14, active: true, img: '/assets/studio3_img_1.jpg' },
      { id: 'lepidolite', name: 'Lepidolite', color: '#A0769A', count: 3, pricePerBead: 18, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'white-howlite', name: 'White Howlite', color: '#E4E2DD', count: 1, pricePerBead: 15, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '09',
    id: 'sleep',
    title: 'SLEEP & RELAXATION',
    shortTitle: 'Sleep & Relaxation',
    description: 'Unwind the nervous system toward rest.',
    icon: '/assets/studio1_img_9.png',
    intentions: [
      { id: 'deep-delta', title: 'DELTA WAVE REPOSE', badge: 'Deep Sleep', desc: 'Facilitates fast sleep onset, restorative slumber and lucid dreaming.' },
      { id: 'night-anxiety', title: 'CALM MIDNIGHT AURA', badge: 'Night Sanctuary', desc: 'Prevents 3 AM awakening spikes and overthinking spirals.' }
    ],
    defaultIntentionId: 'deep-delta',
    baseStrandName: 'MOONLIT SLUMBER',
    defaultCrystals: [
      { id: 'selenite', name: 'Selenite', color: '#F2F1F8', count: 11, pricePerBead: 12, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'amethyst', name: 'Amethyst', color: '#9D78C4', count: 4, pricePerBead: 14, active: true, img: '/assets/studio3_img_1.jpg' },
      { id: 'blue-lace', name: 'Blue Lace Agate', color: '#97ADC4', count: 1, pricePerBead: 30, active: true, img: '/assets/studio3_img_7.jpg' }
    ]
  },
  {
    num: '10',
    id: 'energy',
    title: 'ENERGY & VITALITY',
    shortTitle: 'Energy & Vitality',
    description: 'Rekindle stamina and everyday aliveness.',
    icon: '/assets/studio1_img_10.png',
    intentions: [
      { id: 'physical-stamina', title: 'CELLULAR VITALITY', badge: 'Kundalini Sparks', desc: 'Revitalizes chronic lethargy and boosts physical endurance.' },
      { id: 'passion-drive', title: 'PASSION & INSPIRATION', badge: 'Creative Fire', desc: 'Rekindles sensual vitality, zeal for projects and life sparkle.' }
    ],
    defaultIntentionId: 'physical-stamina',
    baseStrandName: 'PRANIC SURGE',
    defaultCrystals: [
      { id: 'red-jasper', name: 'Red Jasper', color: '#A03227', count: 12, pricePerBead: 10, active: true, img: '/assets/studio3_img_7.jpg' },
      { id: 'carnelian', name: 'Carnelian', color: '#C64D24', count: 3, pricePerBead: 15, active: true, img: '/assets/studio3_img_3.jpg' },
      { id: 'bloodstone', name: 'Bloodstone', color: '#2B4A39', count: 1, pricePerBead: 22, active: true, img: '/assets/studio3_img_2.jpg' }
    ]
  },
  {
    num: '11',
    id: 'spiritual',
    title: 'SPIRITUAL GROWTH',
    shortTitle: 'Spiritual Growth',
    description: 'Deepen practice, insight and inner listening.',
    icon: '/assets/studio1_img_11.png',
    intentions: [
      { id: 'sacred-mantra', title: 'JAPA & MEDITATION', badge: 'Sadhana Key', desc: 'Anchors rhythmic mantra chanting and stills the oscillating intellect.' },
      { id: 'higher-consciousness', title: 'HIGHER CONSCIOUSNESS', badge: 'Crown Portal', desc: 'Awakens transcendental witness state and non-dual awareness.' }
    ],
    defaultIntentionId: 'sacred-mantra',
    baseStrandName: 'SACRED WITNESS',
    defaultCrystals: [
      { id: 'lapis', name: 'Lapis Lazuli', color: '#1E3F78', count: 11, pricePerBead: 24, active: true, img: '/assets/studio3_img_7.jpg' },
      { id: 'labradorite', name: 'Labradorite', color: '#4B555D', count: 4, pricePerBead: 20, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'amethyst', name: 'Amethyst', color: '#7B43B8', count: 1, pricePerBead: 14, active: true, img: '/assets/studio3_img_1.jpg' }
    ]
  },
  {
    num: '12',
    id: 'spiritual-intuition',
    title: 'SPIRITUAL GROWTH & INTUITION',
    shortTitle: 'Spiritual Growth & Intuition',
    description: 'Deepen practice, insight and inner listening.',
    icon: '/assets/studio1_img_12.png',
    intentions: [
      { id: 'third-eye', title: 'AJNA THIRD EYE', badge: 'Inner Sight', desc: 'Heightens subtle gut instincts, prophetic dreams and psychic radar.' },
      { id: 'divine-grace', title: 'DEVOTIONAL SURRENDER', badge: 'Crown Sahasrara', desc: 'Creates deep alignment with higher cosmic order and karmic blessings.' }
    ],
    defaultIntentionId: 'third-eye',
    baseStrandName: 'COSMIC THIRD EYE',
    defaultCrystals: [
      { id: 'amethyst', name: 'Amethyst', color: '#7B43B8', count: 12, pricePerBead: 14, active: true, img: '/assets/studio3_img_1.jpg' },
      { id: 'moonstone', name: 'Moonstone', color: '#EDEBF5', count: 3, pricePerBead: 23, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'clear-quartz', name: 'Clear Quartz', color: '#ECEEF5', count: 1, pricePerBead: 10, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '13',
    id: 'new-beginnings',
    title: 'NEW BEGINNINGS',
    shortTitle: 'New Beginnings',
    description: 'Mark a threshold with intention.',
    icon: '/assets/studio1_img_13.png',
    intentions: [
      { id: 'fresh-start', title: 'SACRED THRESHOLD', badge: 'Clean Slate', desc: 'Dissolves lingering energetic ties to past failures and initiates rebirth.' },
      { id: 'new-path', title: 'COURAGE TO BEGIN', badge: 'Pathfinder', desc: 'Instills cheerful confidence when embarking on unfamiliar ventures.' }
    ],
    defaultIntentionId: 'fresh-start',
    baseStrandName: 'DAWN EMBODIMENT',
    defaultCrystals: [
      { id: 'amazonite', name: 'Amazonite', color: '#5DBBBE', count: 12, pricePerBead: 16, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'moonstone', name: 'Moonstone', color: '#EDEBF5', count: 3, pricePerBead: 23, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'green-aventurine', name: 'Green Aventurine', color: '#2E8B57', count: 1, pricePerBead: 8, active: true, img: '/assets/green_aventurine_beads.jpg' }
    ]
  },
  {
    num: '14',
    id: 'transformation',
    title: 'NEW BEGINNINGS & TRANSFORMATION',
    shortTitle: 'New Beginnings & Transformation',
    description: 'Mark a threshold with intention.',
    icon: '/assets/studio1_img_13.png',
    intentions: [
      { id: 'alchemical-shift', title: 'ALCHEMICAL METAMORPHOSIS', badge: 'Phoenix Rise', desc: 'Converts difficult emotional grief into pure spiritual fuel.' },
      { id: 'breaking-patterns', title: 'TRANSCEND KARMIC CYCLES', badge: 'Karmic Cleanser', desc: 'Snaps repetitive habit loops and installs sovereign self-command.' }
    ],
    defaultIntentionId: 'alchemical-shift',
    baseStrandName: 'PHOENIX TRANSMUTATION',
    defaultCrystals: [
      { id: 'malachite', name: 'Malachite', color: '#1B6A45', count: 11, pricePerBead: 32, active: true, img: '/assets/studio3_img_2.jpg' },
      { id: 'labradorite', name: 'Labradorite', color: '#4B555D', count: 4, pricePerBead: 20, active: true, img: '/assets/studio3_img_7.jpg' },
      { id: 'black-tourmaline', name: 'Black Tourmaline', color: '#1B1A1E', count: 1, pricePerBead: 12, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '15',
    id: 'communication',
    title: 'COMMUNICATION & EXPRESSION',
    shortTitle: 'Communication & Expression',
    description: 'Speak with clarity and heart.',
    icon: '/assets/studio1_img_8.png',
    intentions: [
      { id: 'truth-speaker', title: 'TRUTH EMBODIED', badge: 'Vishuddha Bell', desc: 'Frees constriction in throat and empowers expressing authentic voice.' },
      { id: 'diplomacy-grace', title: 'ELOQUENT DIPLOMACY', badge: 'Honeyed Speech', desc: 'Softens confrontational communication while maintaining iron conviction.' }
    ],
    defaultIntentionId: 'truth-speaker',
    baseStrandName: 'SOVEREIGN VOICE',
    defaultCrystals: [
      { id: 'aquamarine', name: 'Aquamarine', color: '#7AC5CD', count: 12, pricePerBead: 28, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'blue-lace', name: 'Blue Lace Agate', color: '#97ADC4', count: 3, pricePerBead: 30, active: true, img: '/assets/studio3_img_7.jpg' },
      { id: 'clear-quartz', name: 'Clear Quartz', color: '#ECEEF5', count: 1, pricePerBead: 10, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  },
  {
    num: '16',
    id: 'overall-balance',
    title: 'OVERALL BALANCE',
    shortTitle: 'Overall Balance',
    description: 'A whole-bracelet composition for harmony.',
    icon: '/assets/studio1_img_9.png',
    intentions: [
      { id: 'chakra-alignment', title: '7-CHAKRA ALIGNMENT', badge: 'Holistic Harmony', desc: 'Tunes all seven energy centers into one resonant octave of wellness.' },
      { id: 'pranic-homeostasis', title: 'PRANIC HOMEOSTASIS', badge: 'Golden Mean', desc: 'Equalizes excess heat and cold in the physical and etheric bodies.' }
    ],
    defaultIntentionId: 'chakra-alignment',
    baseStrandName: 'SACRED MATRIX',
    defaultCrystals: [
      { id: 'clear-quartz', name: 'Clear Quartz', color: '#ECEEF5', count: 12, pricePerBead: 10, active: true, img: '/assets/studio3_img_4.jpg' },
      { id: 'amethyst', name: 'Amethyst', color: '#7B43B8', count: 2, pricePerBead: 14, active: true, img: '/assets/studio3_img_1.jpg' },
      { id: 'green-aventurine', name: 'Green Aventurine', color: '#2E8B57', count: 2, pricePerBead: 8, active: true, img: '/assets/green_aventurine_beads.jpg' }
    ]
  },
  {
    num: '17',
    id: 'overall-positive-energy',
    title: 'OVERALL BALANCE & POSITIVE ENERGY',
    shortTitle: 'Overall Balance & Positive Energy',
    description: 'A whole-bracelet composition for harmony.',
    icon: '/assets/studio1_img_10.png',
    intentions: [
      { id: 'joy-bliss', title: 'ANANDA VIBRATION', badge: 'Pure Radiance', desc: 'Infuses everyday routines with buoyant gratitude, laughter and joy.' },
      { id: 'aura-illumination', title: 'SOLAR LIGHT BODY', badge: 'Luminous Shield', desc: 'Dissolves gloomy psychic clouds and surrounds you with auspicious light.' }
    ],
    defaultIntentionId: 'joy-bliss',
    baseStrandName: 'SOLAR ANANDA',
    defaultCrystals: [
      { id: 'citrine', name: 'Citrine', color: '#E8B830', count: 10, pricePerBead: 29, active: true, img: '/assets/studio3_img_6.jpg' },
      { id: 'sunstone', name: 'Sunstone', color: '#DF7A4A', count: 4, pricePerBead: 12, active: true, img: '/assets/studio3_img_3.jpg' },
      { id: 'clear-quartz', name: 'Clear Quartz', color: '#ECEEF5', count: 2, pricePerBead: 10, active: true, img: '/assets/studio3_img_4.jpg' }
    ]
  }
];

export const ZODIAC_SIGNS = [
  { num: '01', id: 'aries', name: 'ARIES', sanskrit: 'मेष', dates: 'Mar 21 – Apr 19', traits: 'Action · Courage · Confidence · Vitality', stone: 'Red Jasper', price: 10, color: '#A03227', img: '/assets/studio3_img_7.jpg' },
  { num: '02', id: 'taurus', name: 'TAURUS', sanskrit: 'वृषभ', dates: 'Apr 20 – May 20', traits: 'Love · Stability · Abundance · Balance', stone: 'Rose Quartz', price: 7, color: '#E8B4B8', img: '/assets/studio3_img_1.jpg' },
  { num: '03', id: 'gemini', name: 'GEMINI', sanskrit: 'मिथुन', dates: 'May 21 – Jun 20', traits: 'Clarity · Communication · Adaptability · Focus', stone: 'Green Aventurine', price: 8, color: '#2E8B57', img: '/assets/green_aventurine_beads.jpg' },
  { num: '04', id: 'cancer', name: 'CANCER', sanskrit: 'कर्क', dates: 'Jun 21 – Jul 22', traits: 'Intuition · Emotional balance · Nurturing · Calm', stone: 'Moonstone', price: 23, color: '#EDEBF5', img: '/assets/studio3_img_4.jpg' },
  { num: '05', id: 'leo', name: 'LEO', sanskrit: 'सिंह', dates: 'Jul 23 – Aug 22', traits: 'Confidence · Leadership · Vitality · Success', stone: 'Citrine', price: 29, color: '#E8B830', img: '/assets/studio3_img_6.jpg' },
  { num: '06', id: 'virgo', name: 'VIRGO', sanskrit: 'कन्या', dates: 'Aug 23 – Sep 22', traits: 'Focus · Organization · Clarity · Calm', stone: 'Fluorite', price: 16, color: '#4B8B82', img: '/assets/studio3_img_2.jpg' },
  { num: '07', id: 'libra', name: 'LIBRA', sanskrit: 'तुला', dates: 'Sep 23 – Oct 22', traits: 'Harmony · Relationships · Balance · Compassion', stone: 'Lepidolite', price: 18, color: '#A0769A', img: '/assets/studio3_img_2.jpg' },
  { num: '08', id: 'scorpio', name: 'SCORPIO', sanskrit: 'वृश्चिक', dates: 'Oct 23 – Nov 21', traits: 'Transformation · Grounding · Protection · Strength', stone: 'Black Tourmaline', price: 12, color: '#1B1A1E', img: '/assets/studio3_img_4.jpg' },
  { num: '09', id: 'sagittarius', name: 'SAGITTARIUS', sanskrit: 'धनु', dates: 'Nov 22 – Dec 21', traits: 'Optimism · Growth · Adventure · Confidence', stone: 'Golden Citrine', price: 29, color: '#E8B830', img: '/assets/studio3_img_6.jpg' },
  { num: '10', id: 'capricorn', name: 'CAPRICORN', sanskrit: 'मकर', dates: 'Dec 22 – Jan 19', traits: 'Discipline · Grounding · Protection · Ambition', stone: 'Garnet', price: 72, color: '#7E1925', img: '/assets/studio3_img_7.jpg' },
  { num: '11', id: 'aquarius', name: 'AQUARIUS', sanskrit: 'कुम्भ', dates: 'Jan 20 – Feb 18', traits: 'Intuition · Originality · Clarity · Focus', stone: 'Amethyst', price: 14, color: '#7B43B8', img: '/assets/studio3_img_1.jpg' },
  { num: '12', id: 'pisces', name: 'PISCES', sanskrit: 'मीन', dates: 'Feb 19 – Mar 20', traits: 'Intuition · Sensitivity · Calm · Spiritual growth', stone: 'Aquamarine', price: 28, color: '#7AC5CD', img: '/assets/studio3_img_4.jpg' }
];

export const CHARMS_DATA = [
  {
    id: 'om',
    name: 'OM',
    glyph: 'ॐ',
    subtitle: 'The Om charm — a quiet seal at the clasp.',
    material: 'Gold',
    price: 60
  },
  {
    id: 'sriyantra',
    name: 'SRIYANTRA',
    glyph: '✡',
    subtitle: 'The Sriyantra charm — geometry of abundance at the clasp.',
    material: 'Gold',
    price: 60
  }
];

export const THREADS_DATA = [
  {
    id: 'korean-elastic',
    name: 'KOREAN ELASTIC THREAD',
    badge: 'Free-size fit',
    desc: 'Korean elastic thread · 6.5" (Free-size fit)',
    price: 20
  },
  {
    id: 'steel-core',
    name: 'STEEL CORE THREAD',
    badge: 'Cut to your wrist size',
    desc: 'Steel core thread · Cut to your wrist size',
    price: 180
  }
];

export const ADDONS_DATA = {
  box: 44,
  clasp: 10,
  cz: 6
};

// Mulank calculation & planetary stone map
export const calculateVedicProfile = (day, month, year) => {
  const d = parseInt(day, 10) || 14;
  const m = parseInt(month, 10) || 8;
  const y = parseInt(year, 10) || 1995;

  const sumDigits = (n) => {
    let s = String(n).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    while (s > 9) {
      s = String(s).split('').reduce((acc, digit) => acc + parseInt(digit, 10), 0);
    }
    return s;
  };

  const mulank = sumDigits(d);
  const bhagyank = sumDigits(d + m + y);

  const mulankMap = {
    1: { stone: 'Ruby', price: 80, desc: 'Rooted will and a clean start.', color: '#9E2A2B', img: '/assets/studio3_img_7.jpg' },
    2: { stone: 'Moonstone', price: 23, desc: 'Tender intuition and serenity.', color: '#EDEBF5', img: '/assets/studio3_img_4.jpg' },
    3: { stone: 'Golden Citrine', price: 29, desc: 'Wisdom, speech and higher expansion.', color: '#E8B830', img: '/assets/studio3_img_6.jpg' },
    4: { stone: 'Hessonite', price: 50, desc: 'Strategic breakthroughs and resilience.', color: '#4A403A', img: '/assets/studio3_img_2.jpg' },
    5: { stone: 'Tiger Eye', price: 5.75, desc: 'Mulank 5 is calibrated with Tiger Eye for focus through change.', color: '#9A652A', img: '/assets/studio3_img_5.jpg' },
    6: { stone: 'White Quartz', price: 15, desc: 'Aura illumination and harmonious beauty.', color: '#ECEEF5', img: '/assets/studio3_img_4.jpg' },
    7: { stone: 'Cat Eye', price: 40, desc: 'Mystical detachment and intuitive insight.', color: '#4B555D', img: '/assets/studio3_img_2.jpg' },
    8: { stone: 'Black Tourmaline', price: 12, desc: 'Discipline and grounded karmic shield.', color: '#1B1A1E', img: '/assets/studio3_img_4.jpg' },
    9: { stone: 'Carnelian', price: 15, desc: 'Courage, vitality and noble action.', color: '#C64D24', img: '/assets/studio3_img_3.jpg' }
  };

  const bhagyankMap = {
    1: { stone: 'Garnet', price: 72, desc: 'Number 1 is calibrated with Garnet for rooted will and a clean start.', color: '#7E1925', img: '/assets/studio3_img_7.jpg' },
    2: { stone: 'Pearl', price: 50, desc: 'Emotional depth and gentle composure.', color: '#EDEBF5', img: '/assets/studio3_img_4.jpg' },
    3: { stone: 'Yellow Topaz', price: 45, desc: 'Intellectual mastery and expansive vision.', color: '#E8B830', img: '/assets/studio3_img_6.jpg' },
    4: { stone: 'Smoky Quartz', price: 18, desc: 'Grounding chaotic thoughts into steady form.', color: '#4A403A', img: '/assets/studio3_img_2.jpg' },
    5: { stone: 'Green Aventurine', price: 8, desc: 'Commercial acuity and prosperous speech.', color: '#2E8B57', img: '/assets/green_aventurine_beads.jpg' },
    6: { stone: 'Rose Quartz', price: 7, desc: 'Heart magnetism and peaceful attraction.', color: '#E8B4B8', img: '/assets/studio3_img_1.jpg' },
    7: { stone: 'Amethyst', price: 14, desc: 'Spiritual contemplation and inner sanctum.', color: '#7B43B8', img: '/assets/studio3_img_1.jpg' },
    8: { stone: 'Iron Pyrite', price: 45, desc: 'Unyielding perseverance and material manifestation.', color: '#B59E5F', img: '/assets/pyrite_beads_macro.jpg' },
    9: { stone: 'Red Jasper', price: 10, desc: 'Fearless defense and sustained physical stamina.', color: '#A03227', img: '/assets/studio3_img_7.jpg' }
  };

  // Zodiac by Month & Day
  const getZodiac = (dayNum, monthNum) => {
    if ((monthNum === 3 && dayNum >= 21) || (monthNum === 4 && dayNum <= 19)) return ZODIAC_SIGNS[0];
    if ((monthNum === 4 && dayNum >= 20) || (monthNum === 5 && dayNum <= 20)) return ZODIAC_SIGNS[1];
    if ((monthNum === 5 && dayNum >= 21) || (monthNum === 6 && dayNum <= 20)) return ZODIAC_SIGNS[2];
    if ((monthNum === 6 && dayNum >= 21) || (monthNum === 7 && dayNum <= 22)) return ZODIAC_SIGNS[3];
    if ((monthNum === 7 && dayNum >= 23) || (monthNum === 8 && dayNum <= 22)) return ZODIAC_SIGNS[4]; // Leo
    if ((monthNum === 8 && dayNum >= 23) || (monthNum === 9 && dayNum <= 22)) return ZODIAC_SIGNS[5];
    if ((monthNum === 9 && dayNum >= 23) || (monthNum === 10 && dayNum <= 22)) return ZODIAC_SIGNS[6];
    if ((monthNum === 10 && dayNum >= 23) || (monthNum === 11 && dayNum <= 21)) return ZODIAC_SIGNS[7];
    if ((monthNum === 11 && dayNum >= 22) || (monthNum === 12 && dayNum <= 21)) return ZODIAC_SIGNS[8];
    if ((monthNum === 12 && dayNum >= 22) || (monthNum === 1 && dayNum <= 19)) return ZODIAC_SIGNS[9];
    if ((monthNum === 1 && dayNum >= 20) || (monthNum === 2 && dayNum <= 18)) return ZODIAC_SIGNS[10];
    return ZODIAC_SIGNS[11];
  };

  return {
    mulank,
    mulankInfo: mulankMap[mulank] || mulankMap[5],
    bhagyank,
    bhagyankInfo: bhagyankMap[bhagyank] || bhagyankMap[1],
    zodiac: getZodiac(d, m)
  };
};

// Full Master Crystal Catalog for Customization Studio Edit Modal
export const FULL_CRYSTAL_CATALOG = [
  { id: 'amethyst', name: 'Amethyst', pricePerBead: 45, img: '/assets/crystals/amethyst.png', color: '#7B43B8' },
  { id: 'black-tourmaline', name: 'Black Tourmaline', pricePerBead: 55, img: '/assets/crystals/black_tourmaline.png', color: '#1B1A1E' },
  { id: 'blue-lace-agate', name: 'Blue Lace Agate', pricePerBead: 1187.50, img: '/assets/crystals/blue_lace_agate.png', color: '#7FA1B8' },
  { id: 'carnelian', name: 'Carnelian', pricePerBead: 40, img: '/assets/crystals/carnelian.png', color: '#D44A1E' },
  { id: 'fluorite', name: 'Fluorite', pricePerBead: 45, img: '/assets/crystals/fluorite.png', color: '#4B8B82' },
  { id: 'garnet', name: 'Garnet', pricePerBead: 180, img: '/assets/crystals/garnet_catalog.png', color: '#7E1925' },
  { id: 'green-aventurine', name: 'Green Aventurine', pricePerBead: 87.50, img: '/assets/crystals/green_aventurine_catalog.png', color: '#2E8B57' },
  { id: 'hematite', name: 'Hematite', pricePerBead: 11.25, img: '/assets/crystals/hematite.png', color: '#444248' },
  { id: 'rose-quartz', name: 'Rose Quartz', pricePerBead: 17.50, img: '/assets/crystals/rose_quartz.png', color: '#E8B4B8' },
  { id: 'strawberry-quartz', name: 'Strawberry Quartz', pricePerBead: 250, img: '/assets/crystals/strawberry_quartz.png', color: '#D95368' },
  { id: 'citrine', name: 'Citrine', pricePerBead: 65, img: '/assets/studio3_img_6.jpg', color: '#E8B830' },
  { id: 'clear-quartz', name: 'Clear Quartz', pricePerBead: 35, img: '/assets/studio3_img_4.jpg', color: '#ECEEF5' },
  { id: 'tiger-eye', name: 'Tiger Eye', pricePerBead: 40, img: '/assets/studio3_img_5.jpg', color: '#9A652A' },
  { id: 'moonstone', name: 'Moonstone', pricePerBead: 85, img: '/assets/studio3_img_4.jpg', color: '#EDEBF5' },
  { id: 'rhodonite', name: 'Rhodonite', pricePerBead: 75, img: '/assets/studio3_img_2.jpg', color: '#C86D7A' },
  { id: 'pyrite', name: 'Pyrite', pricePerBead: 45, img: '/assets/pyrite_beads_macro.jpg', color: '#B59E5F' },
  { id: 'sodalite', name: 'Sodalite', pricePerBead: 50, img: '/assets/studio3_img_7.jpg', color: '#273C64' },
  { id: 'lepidolite', name: 'Lepidolite', pricePerBead: 38, img: '/assets/studio3_img_2.jpg', color: '#A0769A' }
];

// Helper to return recommended 4 crystals for an intention
export const getRecommendedCrystalsForIntention = (purposeId, intentionId) => {
  if (purposeId === 'money') {
    return [
      { id: 'green-aventurine', name: 'Green Aventurine', pricePerBead: 87.50, img: '/assets/crystals/green_aventurine.png', color: '#2E8B57', count: 6, active: true },
      { id: 'citrine', name: 'Golden Citrine', pricePerBead: 65, img: '/assets/studio3_img_6.jpg', color: '#E8B830', count: 5, active: true },
      { id: 'pyrite', name: 'Pyrite', pricePerBead: 45, img: '/assets/pyrite_beads_macro.jpg', color: '#B59E5F', count: 4, active: true },
      { id: 'tiger-eye', name: 'Tiger Eye', pricePerBead: 40, img: '/assets/studio3_img_5.jpg', color: '#9A652A', count: 3, active: true }
    ];
  }
  if (purposeId === 'career') {
    return [
      { id: 'tiger-eye', name: 'Tiger Eye', pricePerBead: 40, img: '/assets/studio3_img_5.jpg', color: '#9A652A', count: 6, active: true },
      { id: 'pyrite', name: 'Pyrite', pricePerBead: 45, img: '/assets/pyrite_beads_macro.jpg', color: '#B59E5F', count: 5, active: true },
      { id: 'carnelian', name: 'Carnelian', pricePerBead: 40, img: '/assets/crystals/carnelian.png', color: '#D44A1E', count: 4, active: true },
      { id: 'hematite', name: 'Hematite', pricePerBead: 11.25, img: '/assets/crystals/hematite.png', color: '#444248', count: 3, active: true }
    ];
  }
  if (purposeId === 'protection') {
    return [
      { id: 'black-tourmaline', name: 'Black Tourmaline', pricePerBead: 55, img: '/assets/crystals/black_tourmaline.png', color: '#1B1A1E', count: 6, active: true },
      { id: 'amethyst', name: 'Amethyst', pricePerBead: 45, img: '/assets/crystals/amethyst.png', color: '#7B43B8', count: 5, active: true },
      { id: 'hematite', name: 'Hematite', pricePerBead: 11.25, img: '/assets/crystals/hematite.png', color: '#444248', count: 4, active: true },
      { id: 'clear-quartz', name: 'Clear Quartz', pricePerBead: 35, img: '/assets/studio3_img_4.jpg', color: '#ECEEF5', count: 3, active: true }
    ];
  }
  if (purposeId === 'focus') {
    return [
      { id: 'fluorite', name: 'Fluorite', pricePerBead: 45, img: '/assets/crystals/fluorite.png', color: '#4B8B82', count: 6, active: true },
      { id: 'sodalite', name: 'Sodalite', pricePerBead: 50, img: '/assets/studio3_img_7.jpg', color: '#273C64', count: 5, active: true },
      { id: 'clear-quartz', name: 'Clear Quartz', pricePerBead: 35, img: '/assets/studio3_img_4.jpg', color: '#ECEEF5', count: 4, active: true },
      { id: 'amethyst', name: 'Amethyst', pricePerBead: 45, img: '/assets/crystals/amethyst.png', color: '#7B43B8', count: 3, active: true }
    ];
  }
  // Default: Love & Relationships (Exact match to Figma screenshots: Rose Quartz 5, Strawberry Quartz 5, Green Aventurine 4, Garnet 4)
  return [
    { id: 'rose-quartz', name: 'Rose Quartz', pricePerBead: 17.50, img: '/assets/crystals/rose_quartz.png', color: '#E8B4B8', count: 5, active: true },
    { id: 'strawberry-quartz', name: 'Strawberry Quartz', pricePerBead: 250, img: '/assets/crystals/strawberry_quartz.png', color: '#D95368', count: 5, active: true },
    { id: 'green-aventurine', name: 'Green Aventurine', pricePerBead: 87.50, img: '/assets/crystals/green_aventurine.png', color: '#2E8B57', count: 4, active: true },
    { id: 'garnet', name: 'Garnet', pricePerBead: 180, img: '/assets/crystals/garnet.png', color: '#7E1925', count: 4, active: true }
  ];
};

