/* ORBITAL — destination data.
   Budgets are approximate per-person, per-day costs in INR (stay + food + local transport),
   excluding the journey to the place. Always double-check current prices before you travel.
   hidden = how "undiscovered" the place feels, 1 (popular) to 5 (very few tourists). */

window.ORBITAL_DATA = [
  {
    id: "chopta", name: "Chopta", state: "Uttarakhand", country: "India", region: "North",
    vibes: ["mountain", "trek", "nature", "spiritual"], hidden: 4,
    budget: { low: 1200, mid: 2200, high: 4500 }, months: [3, 4, 5, 6, 9, 10, 11],
    tagline: "The mini Switzerland nobody queues for",
    desc: "A quiet meadow-and-forest saddle in Rudraprayag at about 2,600 m. Base for the Tungnath temple (the world's highest Shiva temple) and the Chandrashila summit trek, with rhododendron forests that bloom in spring.",
    colors: ["#0f3d3e", "#2dd4bf"], art: "mountain", lat: 30.4, lon: 79.0,
    from: "Delhi → Haridwar/Rishikesh by train, then ~6–7 h by shared taxi to Ukhimath/Chopta.",
    gems: [
      { name: "Chandrashila sunrise", note: "Start the 1.5 km climb from Tungnath around 4 am for a sunrise over Nanda Devi, Trishul and Chaukhamba." },
      { name: "Deoria Tal", note: "A mirror-like lake near Sari village; Chaukhamba reflects in the water on clear mornings." },
      { name: "Ukhimath winter seat", note: "Kedarnath's idol is worshipped here in winter. Far fewer visitors than the main shrine." }
    ],
    food: [
      { dish: "Aloo ke Gutke", note: "Spiced fried potatoes with jakhya tempering.", price: "₹80–120" },
      { dish: "Kafuli with Mandua roti", note: "Spinach-based Garhwali curry with finger millet bread.", price: "₹120–180" },
      { dish: "Jhangora kheer", note: "Barnyard millet pudding, a hill-festival classic.", price: "₹60–100" }
    ],
    tips: [
      "Book a camp or homestay in Chopta/Duggalbitta; options are few in peak May–June.",
      "Carry cash — ATMs are far and network is patchy.",
      "Winter (Dec–Feb) brings snow but the road can close; check conditions first."
    ]
  },
  {
    id: "ziro", name: "Ziro Valley", state: "Arunachal Pradesh", country: "India", region: "Northeast",
    vibes: ["culture", "nature", "food"], hidden: 5,
    budget: { low: 1500, mid: 2800, high: 5500 }, months: [3, 4, 9, 10, 11],
    tagline: "Rice-paddy plateau of the Apatani people",
    desc: "A UNESCO-tentative-listed highland plateau where the Apatani tribe practises a sustainable rice-and-fish farming system. Pine ridges, bamboo groves and Apatani villages make it feel like another planet.",
    colors: ["#1b4332", "#a3e635"], art: "forest", lat: 27.55, lon: 93.83,
    from: "Fly/train to Guwahati, then Naharlagun/Itanagar and a shared Sumo to Ziro (~9–10 h). Indian citizens need an Inner Line Permit (ILP).",
    gems: [
      { name: "Hari & Hapoli villages", note: "Walk between paddy fields and traditional bamboo houses; ask before photographing people." },
      { name: "Talley Valley Wildlife Sanctuary", note: "Dense subtropical forest north of Ziro with rich bird and orchid life." },
      { name: "Meghna Cave temple", note: "A Shiva shrine inside a limestone cave, locally revered and rarely crowded." }
    ],
    food: [
      { dish: "Pika Pila", note: "Fermented bamboo-shoot pickle, a staple Apatani condiment.", price: "₹40–80" },
      { dish: "Smoked pork with bamboo shoot", note: "Slow-smoked and cooked with local herbs.", price: "₹150–250" },
      { dish: "Apong (rice beer)", note: "Traditional fermented rice drink; try it at a homestay.", price: "₹50–100" }
    ],
    tips: [
      "Apply for the ILP online in advance (arunachalilp.com).",
      "The Ziro Festival of Music is usually held in late September — book a year ahead.",
      "Stay with a local family; homestays fund the community directly."
    ]
  },
  {
    id: "gokarna", name: "Gokarna", state: "Karnataka", country: "India", region: "South",
    vibes: ["beach", "spiritual", "food"], hidden: 3,
    budget: { low: 1000, mid: 2000, high: 4200 }, months: [10, 11, 12, 1, 2, 3],
    tagline: "Goa's calmer, wilder cousin",
    desc: "A temple town with a string of crescent beaches reached by cliff trails. You get sunsets, seafood shacks and a laid-back crowd, without the Goa party scale.",
    colors: ["#0c4a6e", "#fb923c"], art: "beach", lat: 14.55, lon: 74.32,
    from: "Train to Gokarna Road station (Konkan Railway), then a short auto ride. From Delhi, Mangaluru/Goa routes work too.",
    gems: [
      { name: "Kudle → Om → Half Moon → Paradise trail", note: "Hike beach to beach on cliff paths; Paradise beach is the least visited." },
      { name: "Mirjan Fort", note: "A 16th-century laterite fort near Aghanashini river, quiet and photogenic." },
      { name: "Maha Ganapati & Mahabaleshwar temples", note: "Ancient temples in the old town; visit early morning." }
    ],
    food: [
      { dish: "Fish thali", note: "Fresh kingfish or sardine fry, rice and coastal curry.", price: "₹150–300" },
      { dish: "Neer dosa with coconut chutney", note: "Lacy rice crepes, breakfast of the coast.", price: "₹50–90" },
      { dish: "Sol kadhi", note: "Cooling kokum-coconut drink after a spicy meal.", price: "₹30–60" }
    ],
    tips: [
      "Monsoon (Jun–Sep) closes most beach shacks and boat rides.",
      "Swim only in marked safe zones; currents can be strong.",
      "Take reusable bottles — beach clean-up groups are active."
    ]
  },
  {
    id: "gandikota", name: "Gandikota", state: "Andhra Pradesh", country: "India", region: "South",
    vibes: ["nature", "culture", "adventure"], hidden: 5,
    budget: { low: 900, mid: 1800, high: 3500 }, months: [10, 11, 12, 1, 2],
    tagline: "India's own canyon on the Pennar river",
    desc: "A red-gorge canyon carved by the Pennar river, often nicknamed the Grand Canyon of India. The 12th-century Gandikota fort sits on the rim, and sunrise colors the gorge in layers.",
    colors: ["#7c2d12", "#f59e0b"], art: "canyon", lat: 14.81, lon: 78.28,
    from: "Train to Kadapa or Yerraguntla, then ~1 h by cab. Hyderabad/Bengaluru road trips are common.",
    gems: [
      { name: "Gorge viewpoint at sunrise", note: "Arrive before 6 am; the cliff edge glows deep orange." },
      { name: "Madhavaraya & Ranganatha temples", note: "Chalukyan-style stonework inside the fort walls." },
      { name: "Belum Caves (2 h drive)", note: "One of the longest cave systems on the Indian subcontinent open to the public." }
    ],
    food: [
      { dish: "Ragi sangati with natu kodi curry", note: "Finger millet balls with spicy country-chicken curry.", price: "₹150–250" },
      { dish: "Pesarattu", note: "Green gram dosa, a popular Andhra breakfast.", price: "₹40–80" },
      { dish: "Gongura pickle with rice", note: "Tangy sorrel leaf chutney, Telugu soul food.", price: "₹60–120" }
    ],
    tips: [
      "Haritha tents and small guesthouses fill up on weekends; book ahead.",
      "Wear closed shoes for the rocky fort walk.",
      "Summers are very hot — plan Oct–Feb."
    ]
  },
  {
    id: "majuli", name: "Majuli", state: "Assam", country: "India", region: "Northeast",
    vibes: ["culture", "nature", "spiritual"], hidden: 4,
    budget: { low: 1100, mid: 2200, high: 4200 }, months: [11, 12, 1, 2, 3],
    tagline: "A living island of monasteries and masks",
    desc: "One of the world's largest river islands, on the Brahmaputra. It is the heart of Assam's Vaishnav satra culture, with dance, mask-making and bird-rich wetlands.",
    colors: ["#14532d", "#38bdf8"], art: "river", lat: 26.95, lon: 94.17,
    from: "Fly to Jorhat, then a ferry from Nimati Ghat (~1.5 h) to the island.",
    gems: [
      { name: "Samaguri Satra mask-making", note: "Watch artisans craft bamboo-and-clay Bhaona masks used in drama performances." },
      { name: "Auniati Satra", note: "A monastery with a museum of royal-era artifacts and daily prayers." },
      { name: "Chitadar Chuk bird walks", note: "Winter wetlands attract migratory birds; best early morning." }
    ],
    food: [
      { dish: "Masor Tenga", note: "Tangy fish curry with lemon or tomato.", price: "₹120–220" },
      { dish: "Pitha", note: "Rice-based sweets and snacks, especially around Bihu.", price: "₹30–80" },
      { dish: "Duck curry with ash gourd", note: "Local Mising community specialty.", price: "₹200–320" }
    ],
    tips: [
      "Ferry timings are fixed; reach the ghat early and verify the last return.",
      "Rent a cycle or scooter to explore; roads are flat and quiet.",
      "Brahmaputra floods affect the island in monsoon (Jun–Sep)."
    ]
  },
  {
    id: "spiti", name: "Spiti Valley", state: "Himachal Pradesh", country: "India", region: "North",
    vibes: ["mountain", "adventure", "spiritual"], hidden: 3,
    budget: { low: 1400, mid: 2600, high: 5500 }, months: [5, 6, 7, 8, 9, 10],
    tagline: "High-altitude cold desert and ancient gompas",
    desc: "A remote Himalayan valley of barren peaks, turquoise rivers and 1,000-year-old monasteries. Altitudes range from 3,000 to 4,500 m, so acclimatize well.",
    colors: ["#1e3a5f", "#e0f2fe"], art: "mountain", lat: 32.25, lon: 78.03,
    from: "Delhi → Shimla → Kinnaur → Kaza by road (via Manali opens late May/June). Allow 2 days.",
    gems: [
      { name: "Langza fossil village", note: "Find marine fossils on slopes, under the Chau Chau Kang Nilda peak." },
      { name: "Komic & Hikkim", note: "Among the world's highest villages connected by road; Hikkim has the highest post office." },
      { name: "Dhankar Lake trek", note: "A short, steep hike above Dhankar monastery to a glacial lake." }
    ],
    food: [
      { dish: "Thukpa", note: "Hearty Tibetan noodle soup.", price: "₹100–180" },
      { dish: "Tsampa & butter tea", note: "Roasted barley flour with salty butter tea; warms you at altitude.", price: "₹40–90" },
      { dish: "Chhurpi", note: "Hard yak/cow cheese, chewy local snack.", price: "₹30–80" }
    ],
    tips: [
      "Spend your first night at moderate altitude (Kalpa/Kaza) to acclimatize.",
      "Fuel only at Kaza and Reckong Peo — fill up before you go deeper.",
      "Mobile network: BSNL and Jio work only in a few towns."
    ]
  },
  {
    id: "tirthan", name: "Tirthan Valley", state: "Himachal Pradesh", country: "India", region: "North",
    vibes: ["nature", "trek", "food"], hidden: 4,
    budget: { low: 1200, mid: 2300, high: 4800 }, months: [3, 4, 5, 6, 9, 10, 11],
    tagline: "Trout streams at the edge of a national park",
    desc: "A forested valley near the Great Himalayan National Park (UNESCO World Heritage). Slow-paced hamlets, apple orchards and clear streams with homestays run by locals.",
    colors: ["#064e3b", "#86efac"], art: "forest", lat: 31.62, lon: 77.45,
    from: "Delhi → Aut (near Mandi) by overnight bus, then a cab to Tirthan/Gushaini (~1 h).",
    gems: [
      { name: "Serolsar Lake trek", note: "A day hike through oak forest to a sacred lake; local homestays can guide you." },
      { name: "Jibhi waterfall", note: "A short walk from the village, with riverside cafes and wooden temples." },
      { name: "Chehni Kothi", note: "A towering traditional tower-temple, a few km from Banjar." }
    ],
    food: [
      { dish: "Fresh trout fry", note: "Locally raised or caught in the Tirthan, lightly spiced.", price: "₹250–400" },
      { dish: "Siddu with ghee", note: "Steamed wheat bread with walnut or poppy filling.", price: "₹60–120" },
      { dish: "Himachali dham", note: "Traditional festival feast with rajma, madra and rice.", price: "₹150–250" }
    ],
    tips: [
      "Check trout fishing permits and rules; seasons are regulated.",
      "Book homestays directly; many are family-run with home-cooked meals.",
      "Roads can slip during monsoon — keep flexible dates."
    ]
  },
  {
    id: "meghalaya", name: "Nongriat & Dawki", state: "Meghalaya", country: "India", region: "Northeast",
    vibes: ["nature", "trek", "adventure"], hidden: 4,
    budget: { low: 1300, mid: 2500, high: 5000 }, months: [10, 11, 12, 1, 2, 3, 4],
    tagline: "Living root bridges and glass-clear rivers",
    desc: "Deep in the East Khasi Hills, villagers have guided rubber-tree roots into bridges that grow stronger over centuries. Nearby, the Umngot river at Dawki looks like floating boats in glass.",
    colors: ["#052e16", "#22d3ee"], art: "river", lat: 25.25, lon: 91.67,
    from: "Fly to Guwahati or Shillong; shared taxi to Sohra (Cherrapunji). Nongriat is a ~3,000-step descent from Tyrna.",
    gems: [
      { name: "Double-decker root bridge", note: "The famous two-level living bridge at Nongriat; swim in the nearby Rainbow Falls pools." },
      { name: "Mawlynnong", note: "Often cited as one of Asia's cleanest villages; stay in a tree-house homestay." },
      { name: "Shnongpdeng kayaking", note: "Paddle the Umngot and spot the riverbed 5 m below." }
    ],
    food: [
      { dish: "Jadoh", note: "Khasi rice cooked with pork or chicken.", price: "₹100–180" },
      { dish: "Dohneiiong", note: "Pork cooked with black sesame, a Khasi specialty.", price: "₹150–250" },
      { dish: "Tungrymbai", note: "Fermented soybean paste with pork.", price: "₹80–150" }
    ],
    tips: [
      "Start the Nongriat trek early; stairs are steep and slippery after rain.",
      "Carry cash — many villages have no card machines.",
      "Respect Khasi customs: ask before photographing locals and keep trails clean."
    ]
  },
  {
    id: "kutch", name: "Kutch", state: "Gujarat", country: "India", region: "West",
    vibes: ["culture", "desert", "food"], hidden: 3,
    budget: { low: 1100, mid: 2300, high: 5500 }, months: [11, 12, 1, 2],
    tagline: "White salt desert and 4,500-year-old cities",
    desc: "Kutch has the Great Rann salt flats, handicraft villages and Dholavira — an Indus Valley Civilization city declared a UNESCO World Heritage Site in 2021. Winters bring the Rann Utsav tent festival.",
    colors: ["#78350f", "#fde68a"], art: "desert", lat: 23.74, lon: 69.86,
    from: "Train to Bhuj (Kutch Express from Mumbai/Ahmedabad) or fly to Bhuj. Local taxis to Dholavira take ~4 h.",
    gems: [
      { name: "Dholavira", note: "Walk through a planned Harappan city with water reservoirs and a stepped signboard." },
      { name: "Hodka & Nirona craft villages", note: "Meet artisans of bell-metal, Rogan painting and block-print; buy directly." },
      { name: "Kala Dungar (Black Hill)", note: "Highest point in Kutch; view the Rann stretching to the horizon." }
    ],
    food: [
      { dish: "Kutchi dabeli", note: "Spiced potato in a bun with peanuts and pomegranate; invented here.", price: "₹30–60" },
      { dish: "Khichdi-kadhi", note: "Comfort rice-lentil with sour buttermilk curry.", price: "₹100–180" },
      { dish: "Bajra rotla with ghee", note: "Millet flatbread with jaggery and white butter.", price: "₹60–120" }
    ],
    tips: [
      "Border-area permits are needed for some sites — check at Bhuj collectorate or online.",
      "Visit the White Rann on a full-moon night during winter for the best glow.",
      "Buy handicrafts at craft villages; it supports artisans directly."
    ]
  },
  {
    id: "munsiyari", name: "Munsiyari", state: "Uttarakhand", country: "India", region: "North",
    vibes: ["mountain", "trek", "culture"], hidden: 4,
    budget: { low: 1100, mid: 2100, high: 4300 }, months: [3, 4, 5, 6, 9, 10, 11],
    tagline: "Face to face with the Panchachuli peaks",
    desc: "A Kumaon hill town facing the five Panchachuli summits. It is the traditional gateway to Milam Glacier and home to Johar valley culture.",
    colors: ["#1e293b", "#93c5fd"], art: "mountain", lat: 30.07, lon: 80.24,
    from: "Delhi → Kathgodam by train, then ~10 h by taxi via Almora–Thal. Allow a full day.",
    gems: [
      { name: "Khaliya Top trek", note: "A 5 km climb above the Himalayan treeline with wide views and meadows." },
      { name: "Maheshwari Kund", note: "A small high-altitude lake with a calm, spiritual atmosphere." },
      { name: "Tribal Heritage Museum", note: "Johar-Bhotia artefacts and photographs explaining trade-route history." }
    ],
    food: [
      { dish: "Jambu-tadka dal", note: "Dal tempered with a Himalayan herb; Kumaoni classic.", price: "₹80–140" },
      { dish: "Bhatt ki churkani", note: "Black soybean curry cooked in an iron pot.", price: "₹100–160" },
      { dish: "Aloo ke gutke with bhang chutney", note: "Hill-style potatoes with tangy hemp-seed chutney.", price: "₹80–120" }
    ],
    tips: [
      "The road is long; break the journey at Almora or Chaukori.",
      "Pre-arrange trek guides through local operators for Milam or Namik.",
      "Weather changes fast — carry layers year-round."
    ]
  },
  {
    id: "orchha", name: "Orchha", state: "Madhya Pradesh", country: "India", region: "Central",
    vibes: ["culture", "spiritual", "nature"], hidden: 4,
    budget: { low: 900, mid: 1800, high: 3800 }, months: [10, 11, 12, 1, 2, 3],
    tagline: "A medieval Bundela town frozen by the Betwa",
    desc: "A 16th-century capital with palaces, temples and royal chhatris along the Betwa river. Raja Ram Temple is unusual: Ram is worshipped as a king here.",
    colors: ["#7f1d1d", "#fbbf24"], art: "heritage", lat: 25.35, lon: 78.64,
    from: "Train to Jhansi (well connected from Delhi, ~4–5 h), then 30 min by auto or cab.",
    gems: [
      { name: "Chhatris at sunset", note: "Fourteen royal cenotaphs by the Betwa; watch vultures circle at dusk." },
      { name: "Jahangir Mahal", note: "Mughal-Rajput palace with intricate balconies and rooftop views." },
      { name: "Rafting on the Betwa", note: "Gentle seasonal rapids near Kachhua Ghat (check season)." }
    ],
    food: [
      { dish: "Poha-jalebi breakfast", note: "A Madhya Pradesh morning ritual.", price: "₹30–60" },
      { dish: "Dal bafla", note: "Baked wheat balls with ghee and lentils.", price: "₹100–180" },
      { dish: "Bhutte ka kees", note: "Grated corn cooked in milk and spices.", price: "₹50–90" }
    ],
    tips: [
      "Visit Raja Ram Temple in the evening for the arti.",
      "A combined ticket covers the fort complex; carry ID for Indian-rate tickets.",
      "Winter mornings are foggy — go late for photos."
    ]
  },
  {
    id: "tarkarli", name: "Tarkarli", state: "Maharashtra", country: "India", region: "West",
    vibes: ["beach", "food", "adventure"], hidden: 3,
    budget: { low: 1200, mid: 2400, high: 5000 }, months: [10, 11, 12, 1, 2, 3, 4, 5],
    tagline: "Clear water, a sea fort and Malvani flavors",
    desc: "A Konkan village where the Karli river meets the Arabian Sea. Clear-water snorkeling, dolphin cruises and the Sindhudurg sea fort built by Shivaji Maharaj.",
    colors: ["#075985", "#67e8f9"], art: "beach", lat: 16.02, lon: 73.47,
    from: "Train to Kudal or Sindhudurg station (Konkan Railway), then a 30–40 min cab.",
    gems: [
      { name: "Sindhudurg Fort", note: "A 17th-century island fort reachable by a short boat ride." },
      { name: "Devbag Sangam", note: "Beach where river meets sea; sunset boat ride and quiet sand." },
      { name: "Scuba & snorkeling at Tsunami Island", note: "One of the few places in Maharashtra with decent reef visibility." }
    ],
    food: [
      { dish: "Malvani fish thali", note: "Surmai or pomfret fry with solkadhi and rice.", price: "₹180–350" },
      { dish: "Kombdi vade", note: "Chicken curry with deep-fried puri-like bread.", price: "₹180–280" },
      { dish: "Sol kadhi", note: "Kokum coconut milk digestif.", price: "₹30–60" }
    ],
    tips: [
      "Water sports operate Oct–May; monsoon is closed.",
      "Choose a family-run Malvani homestay for the best meals.",
      "Dolphin watching is best early morning on a boat."
    ]
  },
  {
    id: "chettinad", name: "Chettinad", state: "Tamil Nadu", country: "India", region: "South",
    vibes: ["culture", "food"], hidden: 4,
    budget: { low: 1000, mid: 2000, high: 4500 }, months: [11, 12, 1, 2, 3],
    tagline: "Palatial mansions and the spiciest kitchens in India",
    desc: "Around Karaikudi lie 70+ villages with palatial mansions built by the Nattukottai Chettiar merchants, with Burma teak, Italian marble and Belgian glass. The cuisine is legendary.",
    colors: ["#431407", "#f97316"], art: "heritage", lat: 10.07, lon: 78.78,
    from: "Fly/train to Madurai or Trichy; Karaikudi is ~90 km from both.",
    gems: [
      { name: "Chettinad mansion stays", note: "Heritage hotels in Kanadukathan, Athangudi and Kothamangalam offer tours." },
      { name: "Athangudi tile workshops", note: "Watch handmade colored floor tiles being cast on glass." },
      { name: "Kanadukathan Chettinad Palace", note: "Ornate architecture on a grand scale; ask a local guide." }
    ],
    food: [
      { dish: "Chettinad pepper chicken", note: "Freshly ground spice, deeply peppery.", price: "₹200–350" },
      { dish: "Kuzhi paniyaram", note: "Dumpling-style savoury balls, steamed or pan-cooked.", price: "₹40–80" },
      { dish: "Kavuni arisi halwa", note: "Black rice sweet, once reserved for royalty.", price: "₹60–100" }
    ],
    tips: [
      "Antique markets in Karaikudi sell old brass and teak; bargain politely.",
      "Many mansions allow entry only with a guide — ask your hotel.",
      "Peak summer is hot; plan Nov–Mar."
    ]
  },
  {
    id: "sandakphu", name: "Sandakphu", state: "West Bengal", country: "India", region: "East",
    vibes: ["trek", "mountain", "adventure"], hidden: 3,
    budget: { low: 1500, mid: 2600, high: 5000 }, months: [4, 5, 10, 11, 12],
    tagline: "Four of the world's five highest peaks on one skyline",
    desc: "The highest point in West Bengal (≈3,636 m) on the Singalila ridge, from where Everest, Kangchenjunga, Lhotse and Makalu are visible. Many trekkers also spot red pandas in Singalila National Park.",
    colors: ["#312e81", "#e879f9"], art: "mountain", lat: 27.1, lon: 88.0,
    from: "Fly/train to Bagdogra/NJP, then ~3 h to Manebhanjan (trek start).",
    gems: [
      { name: "Sleeping Buddha view", note: "Kangchenjunga resembles a reclining Buddha from Phalut/Sandakphu." },
      { name: "Kalipokhri lake", note: "A small black pond on the route with yak grazing nearby." },
      { name: "Gurdum & Sabargram", note: "Quiet ridge villages with simple teahouses." }
    ],
    food: [
      { dish: "Dal-bhat-tarkari", note: "Unlimited rice-lentil-veg set at teahouses.", price: "₹150–250" },
      { dish: "Momos & thukpa", note: "Warm Himalayan staples.", price: "₹80–150" },
      { dish: "Tongba", note: "Warm millet beer sipped through a bamboo straw.", price: "₹100–180" }
    ],
    tips: [
      "Guides are mandatory within Singalila National Park.",
      "Book teahouses in advance for Oct–Nov peak season.",
      "Carry cash; there are no ATMs on the trek."
    ]
  },
  {
    id: "turtuk", name: "Turtuk", state: "Ladakh", country: "India", region: "North",
    vibes: ["culture", "mountain", "food"], hidden: 5,
    budget: { low: 1500, mid: 2800, high: 5200 }, months: [5, 6, 7, 8, 9],
    tagline: "The last village before the line — Balti culture in India",
    desc: "A village in the Shyok valley, historically part of Baltistan, with Balti language, apricot orchards and a distinct culture. It became accessible to tourists in 2010.",
    colors: ["#451a03", "#fcd34d"], art: "desert", lat: 34.84, lon: 76.82,
    from: "Leh → Khardung La → Nubra → Hunder → Turtuk (about 7–8 h from Leh). Inner Line Permit needed.",
    gems: [
      { name: "Turtuk Heritage House & Museum", note: "Small museum on Balti life, with old household items and photographs." },
      { name: "Apricot orchards in August", note: "Harvest season; locals dry fruit on rooftops." },
      { name: "Thang village viewpoint", note: "A rare spot with panoramic views near the border, accessible by road." }
    ],
    food: [
      { dish: "Balti khambir bread", note: "Local flatbread eaten with butter tea.", price: "₹30–60" },
      { dish: "Dried apricot & walnut", note: "Fresh from orchards; great snacks.", price: "₹100–200" },
      { dish: "Butter tea (po cha)", note: "Salty butter tea, a high-altitude staple.", price: "₹30–50" }
    ],
    tips: [
      "Carry ID and permit copies; checkpoints are strict.",
      "Respect local culture — dress modestly and ask before taking photos.",
      "Stock up on cash in Leh; ATMs are rare."
    ]
  },
  {
    id: "bandipur", name: "Bandipur", state: "Gandaki Province", country: "Nepal", region: "International",
    vibes: ["culture", "nature", "food"], hidden: 4,
    budget: { low: 1300, mid: 2500, high: 5000 }, months: [10, 11, 12, 2, 3, 4],
    tagline: "A car-free Newar hill town above the clouds",
    desc: "A well-preserved Newar bazaar town at 1,000 m between Kathmandu and Pokhara. Stone-paved lanes, old shopfronts and views of Annapurna and Dhaulagiri.",
    colors: ["#9a3412", "#fdba74"], art: "heritage", lat: 27.93, lon: 84.41,
    from: "Delhi → Kathmandu by flight, then ~4–5 h by tourist bus to Dumre and a short climb to Bandipur.",
    gems: [
      { name: "Siddha Gufa", note: "One of Nepal's largest caves, with stalactites; hire a local guide and torch." },
      { name: "Tundikhel viewpoint", note: "Grassy ridge for Himalayan sunsets and tea." },
      { name: "Thani Mai temple", note: "A hilltop shrine reached by a short forest walk." }
    ],
    food: [
      { dish: "Newari khaja set", note: "Beaten rice with buffalo meat, bean salad and pickles.", price: "NPR 400–700" },
      { dish: "Chatamari", note: "Newari rice-flour 'pizza' with toppings.", price: "NPR 150–300" },
      { dish: "Yomari", note: "Steamed rice-dough dumpling with sweet filling.", price: "NPR 80–150" }
    ],
    tips: [
      "Indians can enter Nepal visa-free with valid ID; confirm current rules before travel.",
      "The old bazaar is vehicle-free — pack light for the uphill stroll.",
      "Hotels fill in Oct–Nov; book early."
    ]
  }
];

/* Starter community tips (shown alongside visitor submissions) */
window.ORBITAL_SEED_SUBMISSIONS = [
  { id: "seed1", place: "Chopta", title: "Sunrise tea at Tungnath's last shop", note: "A tiny tea stall near the temple opens before dawn and serves hot ginger chai. Cheaper and warmer than the camps below.", category: "Local tip", rating: 5, author: "Orbital Team", votes: 12, date: "2026-09-12", seed: true },
  { id: "seed2", place: "Gokarna", title: "Paradise beach shack with no menu", note: "Order whatever the cook caught that morning. Ask for the lime-chilli fry.", category: "Food", rating: 4, author: "Orbital Team", votes: 8, date: "2026-09-18", seed: true },
  { id: "seed3", place: "Majuli", title: "Evening prayers at a satra", note: "Evenings are peaceful; sit at the back and listen to the borgeet singing.", category: "Culture", rating: 5, author: "Orbital Team", votes: 6, date: "2026-09-25", seed: true }
];
