import catTypes from "@/assets/cat-types.jpg";
import catStatues from "@/assets/cat-statues.jpg";
import catHouse from "@/assets/cat-house.jpg";
import catBrands from "@/assets/cat-brands.jpg";
import videoQuarry from "@/assets/video-quarry.jpg";
import videoCarving from "@/assets/video-carving.jpg";
import videoInstall from "@/assets/video-install.jpg";
import type { GroupId } from "@/data/catalog";

export type CategoryMeta = {
  id: GroupId;
  slug: string;
  label: string;
  title: string;
  description: string;
  intro: string;
  body: string[];
  image: string;
};

export const CATEGORIES: CategoryMeta[] = [
  {
    id: "types",
    slug: "marble-types",
    label: "Marble Types",
    title: "Marble Types & Price List — Makrana, Italian, Onyx | Aarav Marble House",
    description:
      "26 marble varieties with per sq ft rates: Makrana, Statuario, Calacatta, Carrara, Onyx, Green, Black and imported Italian marble. Book samples on WhatsApp.",
    intro:
      "Indian and imported marble blocks, gangsaw slabs and calibrated tiles — cut, polished and delivered to your drawing.",
    body: [
      "Aarav Marble House stocks 26 marble varieties in Newtown, Kolkata, from budget Makrana and Green marble at flooring rates through to Statuario, Calacatta and backlit Onyx for feature walls. Every slab is inspected for vein continuity before it leaves the yard, and book-matched pairs are numbered so your mason lays them in sequence.",
      "Rates on this page are indicative starting prices per square foot for standard 16–20 mm thickness in polished finish. Honed, leathered, sandblasted and antique finishes are available on request, as are custom sizes, edge profiles, CNC inlay and water-jet medallions.",
      "Not sure which stone suits your project? Send us the room area and usage — flooring, cladding, counters or stairs — and we will shortlist three stones inside your budget with photographs of the actual lots in stock.",
    ],
    image: catTypes,
  },
  {
    id: "statues",
    slug: "god-statues",
    label: "God Statues",
    title: "Marble God Statues Price — Ganesha, Krishna, Durga Murti | Aarav Marble House",
    description:
      "Hand-carved Makrana marble Hindu god statues — Ganesha, Shiva, Krishna, Durga, Lakshmi, Hanuman and more, 12 to 48 inches. See prices and book on WhatsApp.",
    intro:
      "Hand-carved murtis by Jaipur karigars in pure white Makrana marble, finished plain, gold-leafed or hand-painted.",
    body: [
      "Our murti workshop carves 23 standard deity forms — Ganesha, Shiva, Shivling, Shiv Parivar, Krishna, Radha Krishna, Ram Darbar, Hanuman, Vishnu, Lakshmi, Durga, Kali, Saraswati, Parvati, Kartikeya, Bal Gopal, Mahavir, Buddha and Sai Baba — in sizes from 12 inches for a home mandir up to 48 inches for temple installations.",
      "Prices shown are for the listed size in Makrana white marble. Gold-leaf ornament, natural mineral hand-painting, mukut and jewellery work, black granite Shivling bases and custom postures are quoted separately after we share a clay or digital mock-up for your approval.",
      "Every murti is carved to Shilpa Shastra proportions, sealed against weather when destined for outdoor gardens, and crated in wooden boxes with foam bracing for safe transport anywhere in India.",
    ],
    image: catStatues,
  },
  {
    id: "house",
    slug: "house-products",
    label: "House Products",
    title: "Marble Flooring, Mandir, Countertops & Furniture Prices | Aarav Marble House",
    description:
      "Marble flooring, staircases, kitchen countertops, wash basins, mandirs, dining tables, jali, pillars and fountains — supplied and fitted. Rates and WhatsApp booking.",
    intro:
      "Finished marble for the home: flooring, staircases, counters, mandirs, furniture, jali and garden pieces — supplied and fitted.",
    body: [
      "This is the made-to-measure side of the business. We take site measurements, prepare cutting drawings, fabricate at our Newtown unit and send our own fitting team for laying, polishing and finishing. Flooring, staircases, risers and treads, kitchen and bathroom counters, wash basins, name plates and window jharokhas all fall under this category.",
      "Carved work — mandirs, pooja room cladding, doors, pillars, columns, fireplaces, fountains and garden statues — is produced by the same karigars who carve our murtis, so the detailing and polish match across your project.",
      "Rates are per square foot for laid work and per piece for furniture and carved items. Final quotations depend on stone selection, thickness, edge profile, carving depth and site distance.",
    ],
    image: catHouse,
  },
  {
    id: "brands",
    slug: "brands",
    label: "Companies & Brands",
    title: "Marble Brands — RK Marble, Bhandari, Classic Marble Prices | Aarav Marble House",
    description:
      "Authorised stock from leading Indian and imported marble companies: RK Marble, Bhandari Marble Group, Classic Marble Company, Stonex, Petrosstone and more.",
    intro:
      "Authorised stock from India's leading marble houses, plus imported Italian and exotic lots.",
    body: [
      "If your architect has specified a particular marble house, we most likely carry it. We hold running stock from RK Marble, Bhandari Marble Group, Classic Marble Company, A-Class Marble, Elegant Marbles, Madhav Marbles, Millennium Marbles, The Quarry Gallery, Petrosstone, Stonex India, Marble Arch, Indian Natural Stones, Pacific Industries and Aditya Stonex.",
      "Buying through us means one invoice, one delivery and one point of accountability for lots that would otherwise come from several suppliers. We also arrange factory visits in Kishangarh and Rajasthan so you can select your own block or lot before cutting.",
      "Brand rates shown are indicative starting prices per square foot. Exotic and rare lots are priced per slab after viewing.",
    ],
    image: catBrands,
  },
];

export const categoryBySlug = (slug: string) => CATEGORIES.find((c) => c.slug === slug);
export const categoryById = (id: GroupId) => CATEGORIES.find((c) => c.id === id)!;

export type VideoItem = {
  id: string;
  title: string;
  description: string;
  poster: string;
  duration: string;
};

export const VIDEOS: VideoItem[] = [
  {
    id: "quarry",
    title: "Inside a Rajasthan marble quarry",
    description:
      "How raw blocks are cut from the hill in Makrana and Kishangarh, and what to look for when you select a block.",
    poster: videoQuarry,
    duration: "4:12",
  },
  {
    id: "carving",
    title: "Carving a Ganesha murti, start to finish",
    description:
      "Twelve days of chisel and polish work compressed into a short film from our murti workshop.",
    poster: videoCarving,
    duration: "6:05",
  },
  {
    id: "install",
    title: "Marble flooring installation walkthrough",
    description:
      "Base preparation, laying sequence, grouting and final machine polish on a 2,400 sq ft villa floor.",
    poster: videoInstall,
    duration: "5:38",
  },
];

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  body: string[];
};

export const POSTS: BlogPost[] = [
  {
    slug: "makrana-vs-italian-marble",
    title: "Makrana vs Italian marble: which one is right for your home?",
    excerpt:
      "Hardness, maintenance, cost per sq ft and how each stone ages over twenty years in an Indian home.",
    date: "2026-05-12",
    readTime: "6 min read",
    image: catTypes,
    body: [
      "Makrana marble is a calcite marble quarried in Nagaur district, famously used in the Taj Mahal. It is denser than most Indian marbles, takes a natural polish without chemical coating, and gets whiter with age rather than yellowing.",
      "Italian marbles — Statuario, Calacatta, Carrara, Botticino — are softer and more porous. They arrive resin-treated and mirror-polished, which gives that glass-like reflection, but the surface needs re-polishing every few years in high-traffic areas and must be sealed against turmeric, lemon and oil stains.",
      "As a rule of thumb: Makrana for pooja rooms, temples and floors that will be washed daily; Italian for living rooms, feature walls and areas where you want dramatic veining. Budget-wise Makrana starts around ₹180 per sq ft while Statuario and Calacatta begin at ₹850 and cross ₹1,200 for premium lots.",
    ],
  },
  {
    slug: "choosing-a-marble-mandir",
    title: "Choosing a marble mandir for your home: sizes, carving and vastu",
    excerpt:
      "Standard mandir sizes, dome and pillar options, and how much carving detail actually costs.",
    date: "2026-04-02",
    readTime: "5 min read",
    image: catHouse,
    body: [
      "A home mandir usually starts at 24 inches wide for an apartment niche and goes up to 6 feet for a dedicated pooja room. The price difference is driven far more by carving hours than by the marble itself — a plain-panel mandir and a fully carved dome-and-pillar mandir in the same stone can differ by three times.",
      "Vastu convention places the mandir on the north-east side of the home with the deity facing west or east. Keep at least 4 inches of clearance behind the murti for aarti, and plan a marble or granite base slab so the floor does not stain from oil lamps.",
      "We build mandirs in three tiers: plain jali-back, semi-carved with pillars, and fully carved with a dome, chhatri and inlay. Send us the niche dimensions and a reference photograph and we will return a drawing with a firm quotation.",
    ],
  },
  {
    slug: "marble-care-and-polish",
    title: "How to clean and re-polish marble flooring the right way",
    excerpt:
      "The everyday mistakes that dull a marble floor, and what a professional diamond polish actually involves.",
    date: "2026-02-18",
    readTime: "4 min read",
    image: catStatues,
    body: [
      "Acidic cleaners, phenyl and vinegar etch marble. Use a pH-neutral stone cleaner and a soft mop, wipe spills of turmeric, lemon, wine and oil immediately, and place mats at entrances so grit does not act as sandpaper underfoot.",
      "A professional re-polish runs a weighted machine through diamond abrasive grits from 50 up to 3000, followed by a crystallisation or penetrating sealer pass. Done properly it removes scratches rather than hiding them and lasts three to five years in a home.",
      "Avoid wax and acid-based 'instant shine' compounds sold door to door. They build a film that traps dirt and has to be stripped before any real polishing can happen.",
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
