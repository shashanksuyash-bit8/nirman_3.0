/**
 * Data store for Dreamscape - Dream Vacation Designer
 */

const VACATION_DATA = {
  destinations: [
    {
      id: "bora-bora",
      name: "Bora Bora",
      country: "French Polynesia",
      region: "South Pacific",
      vibe: "tropical",
      vibeLabel: "Tropical Sanctuary",
      badge: "World's Best Island Escape",
      tagline: "Azure lagoons & private overwater sanctuaries under Mount Otemanu",
      image: "assets/images/bora-bora.jpg",
      basePriceUSD: 5400,
      durationDays: 7,
      rating: 4.98,
      reviewCount: 184,
      season: "May to October (Dry Season)",
      weather: "28°C / 82°F · Gentle Trade Winds",
      flightHub: "Papeete (PPT) + Private Sea Plane",
      highlights: [
        "Private glass-floor overwater bungalow",
        "Polynesian outrigger canoe breakfast delivered to your deck",
        "Manta ray & coral reef snorkeling safari",
        "Sunset catamaran champagne cruise across the lagoon"
      ],
      description: "Rising dramatically from velvet turquoise seas, Bora Bora is the quintessential Polynesian paradise. Retreat to your suspended villa above crystal lagoons, where stingrays glide beneath glass floors and Mount Otemanu silhouettes every evening sunset.",
      includedPerks: [
        "VIP Fast-Track & Flower Lei Arrival",
        "Daily Gourmet Buffet & Lagoon-side Dining",
        "Private Outrigger Boat Transfers",
        "Stand-up Paddleboards & Seabobs"
      ]
    },
    {
      id: "kyoto",
      name: "Kyoto & Arashiyama",
      country: "Japan",
      region: "East Asia",
      vibe: "cultural",
      vibeLabel: "Cultural Odyssey",
      badge: "Timeless Heritage",
      tagline: "Ancient wooden pagodas, bamboo sanctuaries & private Kaiseki feasts",
      image: "assets/images/kyoto.jpg",
      basePriceUSD: 4800,
      durationDays: 8,
      rating: 4.96,
      reviewCount: 215,
      season: "March - May & October - November",
      weather: "19°C / 66°F · Crisp Autumn / Spring",
      flightHub: "Osaka Kansai (KIX) + Shinkansen Green Car",
      highlights: [
        "Exclusive after-hours private access to Gion temples",
        "Traditional 300-year-old Ryokan stay with private forest onsen",
        "10-course Kaiseki dinner with Kyoto tea master",
        "Dawn walking meditation through Arashiyama bamboo forest"
      ],
      description: "Kyoto awakens your senses to centuries of refined Japanese aesthetics. From whispering bamboo groves and vibrant autumn Japanese maples to meditative moss rock gardens and discreet geisha teahouses, every second is poetry in motion.",
      includedPerks: [
        "Private English-speaking Master Historian Guide",
        "JR Shinkansen First Class Green Car Rail Passes",
        "Private Cedar Wood Onsen Soak Sessions",
        "Bespoke Kimono Tailoring & Tea Ceremony"
      ]
    },
    {
      id: "amalfi",
      name: "Amalfi Coast & Positano",
      country: "Italy",
      region: "Southern Europe",
      vibe: "romantic",
      vibeLabel: "Coastal Glamour",
      badge: "Riviera Elegance",
      tagline: "Pastel cliffside villas cascading into the azure Mediterranean sea",
      image: "assets/images/amalfi.jpg",
      basePriceUSD: 6200,
      durationDays: 7,
      rating: 4.99,
      reviewCount: 310,
      season: "April to October",
      weather: "26°C / 79°F · Mediterranean Sun",
      flightHub: "Naples (NAP) + Private Chauffeur / Riva Yacht",
      highlights: [
        "Private Riva boat charter to Capri & Blue Grotto",
        "Balcony suites draped in magenta bougainvillea over Positano bay",
        "Clifftop Michelin dining overlooking the illuminated coast",
        "Ravello classical concert tickets in Villa Rufolo gardens"
      ],
      description: "The crown jewel of the Italian Riviera. Positano clings to sheer cliffs above sparkling cobalt waters, scented with wild lemon groves and sea spray. Indulge in sunset Aperol spritzes on your private terrace before cruising along Capri's limestone sea stacks.",
      includedPerks: [
        "Private Mercedes S-Class Amalfi Coastal Chauffeur",
        "Full-Day Private Riva Aquarama Boat Charter",
        "Wine Cellar Tasting in ancient Amalfi vineyards",
        "Reserved Front-Row Sun Loungers at exclusive beach clubs"
      ]
    },
    {
      id: "swiss-alps",
      name: "Zermatt & Swiss Alps",
      country: "Switzerland",
      region: "Central Europe",
      vibe: "alpine",
      vibeLabel: "Alpine Sanctuary",
      badge: "Ultimate Mountain Escape",
      tagline: "Chalet luxury, private Matterhorn helicopter tours & fireside fondue",
      image: "assets/images/swiss-alps.jpg",
      basePriceUSD: 5900,
      durationDays: 6,
      rating: 4.97,
      reviewCount: 168,
      season: "December - April (Ski) & July - September (Hike)",
      weather: "-2°C to 18°C · Crisp Mountain Air",
      flightHub: "Zurich (ZRH) + Glacier Express Excellence Class",
      highlights: [
        "Private ski-in / ski-out luxury chalet with outdoor heated onsen pool",
        "Scenic helicopter flight around Matterhorn summits",
        "Glacier Express Excellence Class panoramic journey",
        "Curated artisanal Swiss cheese & rare Valais wine pairing"
      ],
      description: "Nestled in the shadow of the mythical Matterhorn, Zermatt offers an unspoiled alpine haven where horse-drawn carriages glide past snow-dusted timber chalets. Unwind in steaming outdoor thermal pools as the golden alpine twilight glazes the mountain ridges.",
      includedPerks: [
        "Glacier Express Excellence Class Guaranteed Seats",
        "VIP Ski Pass & Private World-Cup Certified Ski Instructor",
        "Daily Private Chalet Chef & Fireside Champagne Service",
        "Thermal Alpine Spa & Herbal Steam Sanctuary Access"
      ]
    },
    {
      id: "iceland",
      name: "Reykjavik & Golden South",
      country: "Iceland",
      region: "Northern Europe",
      vibe: "nordic",
      vibeLabel: "Nordic Wonder",
      badge: "Celestial Aurora Retreat",
      tagline: "Vibrant emerald northern lights, glass igloos & steaming geothermal lagoons",
      image: "assets/images/iceland.jpg",
      basePriceUSD: 5100,
      durationDays: 6,
      rating: 4.95,
      reviewCount: 142,
      season: "September to April (Aurora) / June to August (Midnight Sun)",
      weather: "1°C / 34°F · Crisp Arctic Atmosphere",
      flightHub: "Keflavik (KEF) + Super Jeep Expedition",
      highlights: [
        "Glass-domed aurora suite stargazing from your bed",
        "Private geothermal lagoon soak beneath emerald Northern Lights",
        "Glacier ice cave exploration & snowmobile trek",
        "Private modified Super Jeep traversing black volcanic sands"
      ],
      description: "A land of otherworldly elemental magic where fire meets glacial ice. Soak in warm mineral waters under curtains of dancing emerald aurora, traverse black sand coastlines, and step inside blue ice caverns carved by thousand-year-old glaciers.",
      includedPerks: [
        "Private Super Jeep 4x4 with Arctic Expedition Specialist",
        "The Retreat at Blue Lagoon Exclusive Spa Access",
        "Aurora Alert Wake-up Concierge & Pro Night Photography Gear",
        "Helicopter Flight over active volcanic fields"
      ]
    },
    {
      id: "serengeti",
      name: "Serengeti & Ngorongoro",
      country: "Tanzania",
      region: "East Africa",
      vibe: "safari",
      vibeLabel: "Wild Wilderness",
      badge: "Great Wildlife Odyssey",
      tagline: "Infinity plunge pools, sunset fire pits & the Great Migration across golden plains",
      image: "assets/images/serengeti.jpg",
      basePriceUSD: 7500,
      durationDays: 8,
      rating: 4.99,
      reviewCount: 228,
      season: "June to October & December to March",
      weather: "25°C / 77°F · Warm African Sun",
      flightHub: "Kilimanjaro (JRO) + Private Bush Plane to Serengeti Airstrip",
      highlights: [
        "Sunrise hot air balloon safari drifting over migrating herds",
        "Tented luxury lodge with private infinity plunge pool & fire pit",
        "Big Five game drives with master Maasai trackers",
        "Starlit bush banquet beneath the Milky Way with private naturalist"
      ],
      description: "Witness earth's greatest spectacle in untamed luxury. From your elevated wooden deck, watch elephants graze as the sun sets in blazing ochre hues. Fall asleep to the gentle rumble of distant lions wrapped in Egyptian cotton sheets in an ultra-luxury eco-lodge.",
      includedPerks: [
        "Private Bush Plane Charter Flights between reserves",
        "Dedicated Custom 4x4 Safari Land Cruiser & Expert Ranger",
        "Sunrise Hot Air Balloon Flight with Champagne Breakfast in Bush",
        "All National Park & Ngorongoro Crater Conservation Permits"
      ]
    },
    {
      id: "rajasthan",
      name: "Rajasthan (Udaipur & Jaipur)",
      country: "India",
      region: "South Asia",
      vibe: "royal",
      vibeLabel: "Royal Regal Heritage",
      badge: "Land of Maharajas",
      tagline: "Floating white marble palaces on Lake Pichola & golden sandstone forts",
      image: "assets/images/rajasthan.jpg",
      basePriceUSD: 5200,
      durationDays: 8,
      rating: 4.99,
      reviewCount: 196,
      season: "October to March (Royal Winter)",
      weather: "24°C / 75°F · Pleasant Sunny Days",
      flightHub: "Jaipur / Udaipur Airport + Private Vintage Rolls Royce Chauffeur",
      highlights: [
        "Stay at the iconic Taj Lake Palace floating on Lake Pichola",
        "Private after-hours tour of Jaipur's Amber Fort and City Palace",
        "Sunrise hot air balloon drifting over the Aravali hills and royal palaces",
        "Royal dinner with Mewar culinary heritage and traditional sitar music under the stars"
      ],
      description: "Immerse yourself in the opulent legacy of Maharajas and royal dynasties. Glide across serene Lake Pichola by royal barge to your floating marble palace, explore pink-hued heritage courtyards in Jaipur, and dine like royalty under starry desert skies.",
      includedPerks: [
        "Private Vintage Car & Chauffeur for Inter-City Royal Transit",
        "Exclusive Private Heritage Historian Escort & Palace Passes",
        "Private Sunset Royal Boat Cruise on Lake Pichola",
        "Ayurvedic Royal Palace Spa & Rose Water Rituals"
      ]
    }
  ],

  tiers: [
    {
      id: "curated",
      name: "Curated Explorer",
      tagline: "Refined boutique elegance with personalized freedom",
      multiplier: 1.0,
      priceBadge: "Standard Luxe",
      accentColor: "#38bdf8",
      features: [
        "Handpicked 5-Star Boutique Hotels & Resorts",
        "Daily Private Sightseeing Excursion with Local Specialist",
        "Curated Daily Breakfast & Welcome Dinner",
        "Executive Private Airport Transfers",
        "Flexible daily leisure hours for spontaneous discovery",
        "Digital Smart Concierge App with 24/7 travel support"
      ]
    },
    {
      id: "signature",
      name: "Signature Luxury",
      tagline: "The gold standard of world-class bespoke travel",
      multiplier: 1.45,
      isPopular: true,
      priceBadge: "Most Popular",
      accentColor: "#e2b874",
      features: [
        "Premium Ocean/Mountain View Suites & Private Villas",
        "Private Dedicated Chauffeur & Luxury Vehicle for Entire Stay",
        "Guaranteed Table Reservations at Top Michelin-Starred Restaurants",
        "Exclusive Fast-Track Airport Immigrations & Lounge Access",
        "Curated Signature Activity (e.g. Private Yacht or Scenic Flight)",
        "Dedicated 24/7 Personal Travel Concierge & Daily Itinerary Adjustments"
      ]
    },
    {
      id: "haute",
      name: "Haute Elegance / Royal Tier",
      tagline: "Unrivaled presidential luxury and private aviation access",
      multiplier: 2.15,
      priceBadge: "Ultra Elite",
      accentColor: "#a855f7",
      features: [
        "Presidential Water Villa / Penthouse Chalet with Private Pool",
        "Chartered Private Aviation & Helicopter Mountain/Island Transfers",
        "Dedicated Personal Butler & Private In-Suite Michelin Trained Chef",
        "Closed-door private access to monuments, historical reserves & wineries",
        "All-inclusive world-class vintage wines & bespoke gastronomic experiences",
        "On-call Travel Doctor, Private Security and Bespoke Luggage Forwarding"
      ]
    }
  ],

  addOns: [
    {
      id: "helicopter",
      name: "Scenic Helicopter Aerial Tour",
      icon: "🚁",
      category: "Adventure",
      priceUSD: 650,
      desc: "45-minute private flight capturing panoramic aerial viewpoints and remote landing."
    },
    {
      id: "yacht",
      name: "Private Sunset Yacht Charter",
      icon: "⛵",
      category: "Romance",
      priceUSD: 850,
      desc: "3-hour sunset cruise with Bollinger champagne, fresh oysters and canapés."
    },
    {
      id: "michelin",
      name: "Chef's Table Michelin 3-Star Tasting",
      icon: "🍽️",
      category: "Gastronomy",
      priceUSD: 480,
      desc: "Multi-course gastronomic journey with grand cru wine pairing and head chef visit."
    },
    {
      id: "spa",
      name: "Private Thermal Spa & Herbal Ritual",
      icon: "🧖",
      category: "Wellness",
      priceUSD: 390,
      desc: "Half-day restorative sanctuary treatment with mineral bath and aromatherapy."
    },
    {
      id: "photographer",
      name: "Dedicated Editorial Travel Photographer",
      icon: "📷",
      category: "Memories",
      priceUSD: 550,
      desc: "3-hour editorial photoshoot producing 50 high-resolution retouched heirloom portraits."
    },
    {
      id: "balloon",
      name: "Sunrise Hot Air Balloon Expedition",
      icon: "🎈",
      category: "Excursion",
      priceUSD: 720,
      desc: "Drift peacefully at dawn above breathtaking valleys with post-flight champagne toast."
    }
  ],

  flightClasses: [
    { id: "land_only", name: "Land Only (I will arrange flights)", priceMultiplier: 0 },
    { id: "business", name: "Commercial Business Class Flight", priceMultiplier: 2800 },
    { id: "first", name: "Commercial International First Class", priceMultiplier: 6400 },
    { id: "private", name: "Private Jet Charter Access", priceMultiplier: 18500 }
  ],

  currencies: {
    USD: { symbol: "$", rate: 1.0, label: "USD - US Dollar" },
    INR: { symbol: "₹", rate: 84.0, label: "INR - Indian Rupee" },
    EUR: { symbol: "€", rate: 0.92, label: "EUR - Euro" },
    GBP: { symbol: "£", rate: 0.79, label: "GBP - British Pound" },
    JPY: { symbol: "¥", rate: 152.0, label: "JPY - Japanese Yen" },
    AUD: { symbol: "A$", rate: 1.54, label: "AUD - Australian Dollar" }
  },

  itineraries: {
    "bora-bora": [
      {
        day: "Day 01",
        title: "Papeete Arrival & Lagoon Seaplane Arrival",
        desc: "Arrive at Tahiti International where your personal liaison welcomes you with fresh tiare flower leis. Board your private amphibious seaplane for a 45-minute flight soaring over the Society Islands archipelago before touching down gracefully on the crystalline waters of Bora Bora. Check in to your overwater glass-bottom bungalow.",
        stay: "Four Seasons Bora Bora - Otemanu Overwater Villa",
        tags: ["Lei Greeting", "Seaplane Transfer", "Lagoon Check-in"]
      },
      {
        day: "Day 02",
        title: "Canoe Breakfast & Manta Sanctuary Snorkel",
        desc: "Awaken to a traditional Polynesian outrigger canoe rowing up to your deck laden with tropical fruits, fresh croissants, and island coffee. In the afternoon, embark with your private marine biologist on a boat expedition to encounter gentle manta rays and blacktip reef sharks in protected coral gardens.",
        stay: "Overwater Villa Deck",
        tags: ["Canoe Breakfast", "Marine Biology", "Coral Garden"]
      },
      {
        day: "Day 03",
        title: "Private Motu Picnic & Polynesian Wellness",
        desc: "Escape to a secluded uninhabited islet (motu) with pure white powder sand. Your private island chef prepares Tahitian poisson cru marinated in freshly squeezed coconut milk. Indulge in an afternoon Monoi oil outdoor massage as gentle ocean breezes drift through coconut palms.",
        stay: "Private Motu Islet Sanctuary",
        tags: ["Private Island", "Poisson Cru", "Monoi Spa"]
      },
      {
        day: "Day 04",
        title: "Sunset Catamaran & Starlit Overwater Dining",
        desc: "Board a luxury 50-foot catamaran as the sun dips below the South Pacific horizon, igniting the sky in blazing shades of tangerine and violet. Return to a torchlit overwater deck for a four-course feast featuring local mahi-mahi paired with French vintage champagne.",
        stay: "Lagoon Overwater Deck",
        tags: ["Catamaran Cruise", "Sunset Champagne", "Gourmet Dinner"]
      },
      {
        day: "Day 05",
        title: "Helicopter Over Mount Otemanu & Island Farewell",
        desc: "Take to the skies in a private twin-engine helicopter for sweeping views of the volcanic peak of Mount Otemanu and the Tupai heart-shaped atoll. Conclude with a farewell Polynesian fire-dance performance under the southern constellations.",
        stay: "Four Seasons Presidential Suite",
        tags: ["Helicopter Tour", "Fire Dance", "Farewell Toast"]
      }
    ],

    "kyoto": [
      {
        day: "Day 01",
        title: "Shinkansen First-Class Arrival & Gion Lanterns",
        desc: "Board the Shinkansen bullet train in Tokyo or Osaka, settling into your first-class Green Car. On arrival in Kyoto, a private chauffeur whisks you to a preserved 250-year-old Sukiya-style Ryokan in Higashiyama. Stroll through the cobblestone alleys of Gion as paper lanterns flicker to life.",
        stay: "Hoshinoya Kyoto / Traditional Machiya Villa",
        tags: ["Bullet Train", "Historic Ryokan", "Gion Evening Walk"]
      },
      {
        day: "Day 02",
        title: "Dawn Bamboo Walk & Private Kinkaku-ji Viewing",
        desc: "Experience the Arashiyama bamboo forest in serene dawn solitude before public gates open. Continue to the Golden Pavilion (Kinkaku-ji) with private access to inner temple gardens accompanied by a revered Zen historian scholar.",
        stay: "Riverside Ryokan with Cedar Bathtub",
        tags: ["Zen Meditation", "Golden Pavilion", "Historian Guide"]
      },
      {
        day: "Day 03",
        title: "Private Tea Master Ceremony & 10-Course Kaiseki",
        desc: "Enter a centuries-old samurai tea pavilion for an intimate Chanoyu tea ritual led by a 15th-generation Grand Master. In the evening, savor an unforgettable 10-course Kaiseki banquet highlighting Matsutake mushrooms and Wagyu beef.",
        stay: "Arashiyama Riverside Suite",
        tags: ["Tea Ceremony", "Kaiseki Banquet", "Wagyu Tasting"]
      },
      {
        day: "Day 04",
        title: "Fushimi Inari Torii Gates & Mount Kurama Forest Trek",
        desc: "Ascend through the iconic vermilion Torii gates of Fushimi Inari along a private mountain trail that bypasses common paths. Afterwards, journey to Mount Kurama for rejuvenating natural sulfur hot springs under whispering cedars.",
        stay: "Mount Kurama Natural Onsen Lodge",
        tags: ["Torii Gates", "Sulfur Springs", "Mountain Trek"]
      },
      {
        day: "Day 05",
        title: "Artisanal Craft Workshops & Kimono Masterclass",
        desc: "Meet living national treasure craftsmen: a master swordsmith and a Nishijin silk weaver. Choose your bespoke silk kimono tailored by third-generation artisans before an evening private boat cruise on the Oi River.",
        stay: "Private Higashiyama Villa",
        tags: ["Silk Weaving", "Katana Forge", "Oi River Cruise"]
      }
    ],

    "amalfi": [
      {
        day: "Day 01",
        title: "Naples Chauffeur & Cliffside Check-in at Positano",
        desc: "Arrive at Naples where your private driver welcomes you in a leather-appointed Mercedes S-Class. Traverse the spectacular Amalfi cliff highway carved high above the Mediterranean. Check in to your clifftop villa overlooking Positano's pastel amphitheater.",
        stay: "Le Sirenuse / Villa Treville Positano",
        tags: ["Private Chauffeur", "Cliffside Villa", "Limoncello Welcome"]
      },
      {
        day: "Day 02",
        title: "Private Riva Boat Charter to Capri & Blue Grotto",
        desc: "Step aboard an authentic mahogany Riva Aquarama yacht. Glide past the dramatic Faraglioni sea stacks to the ethereal azure glow of the Blue Grotto. Anchor in secluded turquoise coves for swimming followed by lunch at La Fontelina.",
        stay: "Cliff Balcony Suite",
        tags: ["Riva Yacht", "Capri Island", "Blue Grotto"]
      },
      {
        day: "Day 03",
        title: "Ravello Clifftop Gardens & Villa Rufolo Sunset Concert",
        desc: "Ascend to Ravello, perched 350 meters above the sea. Wander through the medieval gardens of Villa Cimbrone to the Infinity Terrace. Enjoy front-row tickets to an open-air classical symphony suspended between sky and sea.",
        stay: "Belmond Hotel Caruso Ravello",
        tags: ["Infinity Terrace", "Classical Symphony", "Villa Cimbrone"]
      },
      {
        day: "Day 04",
        title: "Organic Lemon Grove Tour & Clifftop Michelin Dinner",
        desc: "Stroll beneath fragrant trellises in family-owned centuries-old lemon orchards. Learn secrets of limoncello crafting from the estate's patriarch. Conclude with dinner at a 2-Michelin starred clifftop restaurant.",
        stay: "Private Terrace with Jacuzzi",
        tags: ["Lemon Groves", "Michelin Dining", "Wine Pairing"]
      },
      {
        day: "Day 05",
        title: "Path of the Gods Helicopter Flight & Coastline Farewell",
        desc: "Begin with a sunrise helicopter flight above the Amalfi coastline and Mount Vesuvius. Spend a leisurely afternoon lounging on private sunbeds at Da Adolfo beach cove with chilled Prosecco.",
        stay: "Villa Treville Master Residence",
        tags: ["Helicopter Tour", "Da Adolfo", "Prosecco Toast"]
      }
    ],

    "swiss-alps": [
      {
        day: "Day 01",
        title: "Glacier Express Excellence Class & Zermatt Arrival",
        desc: "Board the legendary Glacier Express in St. Moritz or Chur in Excellence Class, enjoying a 5-course wine-paired lunch while gazing out 180-degree panoramic windows. Arrive in car-free Zermatt greeted by an electric horse carriage.",
        stay: "The Omnia / Chalet Zermatt Peak",
        tags: ["Glacier Express", "Panoramic Rail", "Electric Carriage"]
      },
      {
        day: "Day 02",
        title: "Matterhorn Glacier Paradise & Private Ski Guide",
        desc: "Ascend Europe's highest cable car to 3,883 meters. Carve untracked corduroy snow on year-round glacier pistes with an Olympic alpine instructor. Stop for truffle fondue at Chez Vrony with panoramic peak views.",
        stay: "Heated Infinity Hot Tub Terrace",
        tags: ["Glacier Paradise", "Private Ski Guide", "Chez Vrony"]
      },
      {
        day: "Day 03",
        title: "Helicopter Alpine Tour & Peak Landing",
        desc: "Board an Air Zermatt helicopter for an adrenaline-laced sweep around the sheer North Face of the Matterhorn. Land on an alpine glacier for a champagne picnic in the silence of high altitude.",
        stay: "Chalet Fireplace Master Suite",
        tags: ["Air Zermatt", "Glacier Landing", "Champagne Picnic"]
      },
      {
        day: "Day 04",
        title: "Alpine Thermal Spa & Fireside Raclette Feast",
        desc: "Dedicate the day to deep wellness in a pine-wood sauna and cedar outdoor thermal pool surrounded by falling snow. In the evening, your private chef melts heritage Valais raclette over glowing birch logs.",
        stay: "Private Spa Chalet",
        tags: ["Alpine Spa", "Thermal Pool", "Fireside Raclette"]
      },
      {
        day: "Day 05",
        title: "Gornergrat Sunset Train & Stargazing Observatory",
        desc: "Ride the historic cogwheel train to Gornergrat at 3,135 meters. Watch the sunset turn the Matterhorn golden rose before exploring the alpine observatory and marveling at the Milky Way.",
        stay: "3100 Kulmhotel Gornergrat Suite",
        tags: ["Cogwheel Railway", "Matterhorn Sunset", "Observatory"]
      }
    ],

    "iceland": [
      {
        day: "Day 01",
        title: "Super Jeep Pickup & Private Retreat at Blue Lagoon",
        desc: "Touch down at Keflavik where a custom Arctic Super Jeep on 44-inch tires awaits. Whisk away to The Retreat at Blue Lagoon for private access to subterranean geothermal mineral waters and silica scrub rituals.",
        stay: "The Retreat Hotel at Blue Lagoon",
        tags: ["Super Jeep", "Geothermal Lagoon", "Silica Ritual"]
      },
      {
        day: "Day 02",
        title: "Golden Circle Geysers & Langjökull Glacier Snowmobiling",
        desc: "Witness the roaring Gullfoss waterfall and Strokkur geyser eruption. Continue into the glacial interior of Langjökull for an exhilarating high-speed snowmobile safari across eternal snowfields.",
        stay: "Luxury Wilderness Lodge",
        tags: ["Golden Circle", "Snowmobile Safari", "Gullfoss Falls"]
      },
      {
        day: "Day 03",
        title: "South Coast Waterfalls & Black Sand Basalt Beach",
        desc: "Stand behind the roaring curtain of Seljalandsfoss waterfall and marvel at Skógafoss. Wander the volcanic black sands of Reynisfjara beach with towering basalt columns and crashing North Atlantic waves.",
        stay: "Glass Igloo Dome Suite",
        tags: ["Black Sand Beach", "Basalt Columns", "Waterfall Walk"]
      },
      {
        day: "Day 04",
        title: "Crystal Blue Ice Cave & Aurora Borealis Hunt",
        desc: "Venture inside the glowing blue crystal caverns of Vatnajökull glacier with certified ice speleologists. When darkness falls, relax in an outdoor geothermal hot spring as vibrant emerald Aurora Borealis ribbons dance overhead.",
        stay: "Geothermal Stargazing Retreat",
        tags: ["Crystal Ice Cave", "Glacier Speleology", "Aurora Borealis"]
      },
      {
        day: "Day 05",
        title: "Helicopter Volcano Safari & Reykjavik Gastronomy",
        desc: "Soar over active geothermal fissures, steaming crater lakes, and moss-blanketed lava fields. Conclude in Reykjavik with a 7-course modern Nordic dinner pairing smoked arctic char with rare birch liquors.",
        stay: "Reykjavik Luxury Penthouse",
        tags: ["Volcano Flight", "Nordic Tasting", "Reykjavik Nightlife"]
      }
    ],

    "serengeti": [
      {
        day: "Day 01",
        title: "Kilimanjaro Bush Flight to Serengeti Golden Plains",
        desc: "Step aboard your private Cessna Grand Caravan bush plane from Kilimanjaro, soaring over the Great Rift Valley. Land on a remote dirt airstrip in the central Serengeti where your custom safari vehicle and Maasai ranger welcome you.",
        stay: "Singita Sasakwa Lodge / Four Seasons Safari Lodge",
        tags: ["Bush Flight", "Private Land Cruiser", "Maasai Welcome"]
      },
      {
        day: "Day 02",
        title: "Dawn Big Five Tracking & Endless Savanna Safari",
        desc: "Embark as first light touches the golden savannah grasses. Track prides of lions, leopards resting in acacia branches, and herds of African elephants. Enjoy a hot bush breakfast cooked over open coals under a baobab tree.",
        stay: "Luxury Tented Pavilion with Plunge Pool",
        tags: ["Big Five Safari", "Bush Breakfast", "Leopard Sighting"]
      },
      {
        day: "Day 03",
        title: "Sunrise Hot Air Balloon Drift & Champagne Toast",
        desc: "Ascend at dawn in a wicker hot air balloon basket, floating silently alongside the Great Migration of millions of wildebeest and zebras. Celebrate landing with chilled champagne and an outdoor banquet in the wild.",
        stay: "Serengeti View Suite with Fire Pit",
        tags: ["Hot Air Balloon", "Great Migration", "Bush Champagne"]
      },
      {
        day: "Day 04",
        title: "Ngorongoro Crater Eden & Ancient Caldera Descent",
        desc: "Descend 600 meters into the floor of the world's largest unbroken volcanic caldera. Encounter rare black rhinos, hippos wallowing in soda lakes, and thousands of pink flamingos in this lost world sanctuary.",
        stay: "Ngorongoro Crater Clifftop Lodge",
        tags: ["Ngorongoro Crater", "Black Rhino", "Pink Flamingos"]
      },
      {
        day: "Day 05",
        title: "Maasai Cultural Dialogue & Starlit Boma Banquet",
        desc: "Engage in an authentic, respectful cultural exchange at an ancestral Maasai village. In the evening, gather around a crackling boma fire pit for grilled venison and storytelling beneath the canopy of southern stars.",
        stay: "Singita Serengeti Luxury Suite",
        tags: ["Maasai Heritage", "Boma Fire Pit", "Starry Night Sky"]
      }
    ],

    "rajasthan": [
      {
        day: "Day 01",
        title: "Royal Arrival & Lake Pichola Barge to Taj Lake Palace",
        desc: "Touch down in Udaipur where your private royal escort greets you with marigold garlands and rose water spritz. Board a ceremonial royal barge across the mirrored waters of Lake Pichola to check into the Taj Lake Palace, shimmering like a white marble jewel.",
        stay: "Taj Lake Palace - Grand Royal Suite",
        tags: ["Royal Barge", "Lake Pichola", "Marigold Welcome"]
      },
      {
        day: "Day 02",
        title: "City Palace Private Chambers & Sunset Lake Cruise",
        desc: "Embark on an after-hours tour of Udaipur City Palace's private mirrored courtyards led by the Royal Trust curator. In the late afternoon, cruise Lake Pichola on a private teak solar yacht as the golden sun illuminates Jag Mandir palace.",
        stay: "Taj Lake Palace Waterfront Suite",
        tags: ["City Palace", "Private Curator", "Sunset Yacht"]
      },
      {
        day: "Day 03",
        title: "Vintage Car Expedition to Jaipur & Rambagh Palace",
        desc: "Journey in a restored vintage motorcar or private luxury helicopter across Rajasthan's Aravali ranges to Jaipur, the Pink City. Arrive at Rambagh Palace, former residence of the Maharaja of Jaipur, welcomed by royal drummers and peacocks.",
        stay: "Rambagh Palace - Maharaja Suite",
        tags: ["Vintage Rolls Royce", "Pink City", "Rambagh Palace"]
      },
      {
        day: "Day 04",
        title: "Private Amber Fort Sunrise & Hawa Mahal High Tea",
        desc: "Experience the majestic Amber Fort at dawn before visitors arrive. Marvel at the mirror mosaics of Sheesh Mahal with private access. Enjoy imperial high tea overlooking the intricate honeycomb façade of Hawa Mahal.",
        stay: "Rambagh Palace Royal Pavilions",
        tags: ["Amber Fort", "Sheesh Mahal", "Royal High Tea"]
      },
      {
        day: "Day 05",
        title: "Hot Air Balloon Flight & Starlit Sand Dune Banquet",
        desc: "Drift peacefully at sunrise in a hot air balloon over fortress walls and desert villages. In the evening, retreat to a luxury starlit desert camp for a multi-course Mewari royal feast accompanied by sarangi and sitar virtuosos under the desert galaxy.",
        stay: "Sujan Rajmahal Palace / Luxury Desert Camp",
        tags: ["Balloon Safari", "Desert Camp", "Royal Feast"]
      }
    ]
  },

  reviews: [
    {
      id: "rev-1",
      destinationId: "bora-bora",
      destinationName: "Bora Bora",
      author: "Lord Julian & Lady Evelyn Vance",
      location: "London, UK",
      avatar: "assets/images/bora-bora.jpg",
      tier: "Haute Elegance",
      rating: 5,
      date: "September 2026",
      headline: "The most celestial escape of our lifetime",
      quote: "Dreamscape crafted an itinerary beyond our wildest dreams. Waking up in our overwater villa with canoe breakfast drifting up to our deck and private helicopter flights over Mount Otemanu was pure perfection."
    },
    {
      id: "rev-2",
      destinationId: "kyoto",
      destinationName: "Kyoto & Arashiyama",
      author: "Marcus & Dr. Mei Lin Chen",
      location: "San Francisco, CA",
      avatar: "assets/images/kyoto.jpg",
      tier: "Signature Luxury",
      rating: 5,
      date: "August 2026",
      headline: "Unmatched cultural depth and absolute serenity",
      quote: "The after-hours private viewing of Gion's ancient temple accompanied by a master historian was transcendent. Everything flowed seamlessly, from the first-class Shinkansen cars to the riverside onsen."
    },
    {
      id: "rev-3",
      destinationId: "amalfi",
      destinationName: "Amalfi Coast & Positano",
      author: "Sofia Rostova & Matteo Moretti",
      location: "Milan, Italy",
      avatar: "assets/images/amalfi.jpg",
      tier: "Signature Luxury",
      rating: 5,
      date: "July 2026",
      headline: "Pure Italian coastal romance done flawlessly",
      quote: "The private Riva yacht day trip to Capri and the front-row cliffside Michelin reservations made us feel like royalty. The live price calculator made tailoring our add-ons an effortless pleasure."
    },
    {
      id: "rev-4",
      destinationId: "swiss-alps",
      destinationName: "Zermatt & Swiss Alps",
      author: "Alexander & Ingrid Bergström",
      location: "Stockholm, Sweden",
      avatar: "assets/images/swiss-alps.jpg",
      tier: "Haute Elegance",
      rating: 5,
      date: "June 2026",
      headline: "Matterhorn views from a steaming heated hot tub",
      quote: "Sitting in our outdoor hot tub on the chalet balcony as the Matterhorn turned rose gold at dusk is etched into our hearts forever. The private chef's raclette was Michelin caliber."
    },
    {
      id: "rev-5",
      destinationId: "rajasthan",
      destinationName: "Rajasthan (Udaipur & Jaipur)",
      author: "Countess Eleonora & Prince Maximilian",
      location: "Vienna, Austria",
      avatar: "assets/images/rajasthan.jpg",
      tier: "Haute Elegance",
      rating: 5,
      date: "October 2026",
      headline: "Fit for emperors — pure royal magic on Lake Pichola",
      quote: "Gliding across Lake Pichola on the royal barge at sunset while rose petals showered from the palace terrace was mesmerizing. The private sunrise access to Amber Fort and dinner at Rambagh Palace surpassed any luxury experience on Earth."
    }
  ]
};
