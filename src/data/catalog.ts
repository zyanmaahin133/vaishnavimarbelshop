import marbleWhite from "@/assets/marble-white.jpg";
import marbleItalian from "@/assets/marble-italian.jpg";
import marbleGreen from "@/assets/marble-green.jpg";
import marbleBlack from "@/assets/marble-black.jpg";
import marbleBeige from "@/assets/marble-beige.jpg";
import marblePink from "@/assets/marble-pink.jpg";
import marbleBrown from "@/assets/marble-brown.jpg";
import marbleGrey from "@/assets/marble-grey.jpg";
import statueGanesha from "@/assets/statue-ganesha.jpg";
import statueKrishna from "@/assets/statue-krishna.jpg";
import statueDurga from "@/assets/statue-durga.jpg";
import statueShiva from "@/assets/statue-shiva.jpg";
import productFlooring from "@/assets/product-flooring.jpg";
import productCountertop from "@/assets/product-countertop.jpg";
import productMandir from "@/assets/product-mandir.jpg";
import productFurniture from "@/assets/product-furniture.jpg";
import productFountain from "@/assets/product-fountain.jpg";
import productStaircase from "@/assets/product-staircase.jpg";
import brandShowroom from "@/assets/brand-showroom.jpg";

export type GroupId = "types" | "statues" | "house" | "brands";

export type CatalogItem = {
  id: string;
  name: string;
  group: GroupId;
  finish: string;
  price: number;
  unit: string;
  image: string;
};

export const GROUPS: { id: GroupId; label: string; blurb: string }[] = [
  {
    id: "types",
    label: "Marble Types",
    blurb: "Indian & imported blocks, slabs and tiles cut to your drawing.",
  },
  {
    id: "statues",
    label: "God Statues",
    blurb: "Hand-carved murtis by Jaipur karigars, in pure white Makrana.",
  },
  {
    id: "house",
    label: "House Products",
    blurb: "Flooring, counters, mandirs and furniture, supplied and fitted.",
  },
  {
    id: "brands",
    label: "Companies & Brands",
    blurb: "Authorised stock from India's leading marble houses.",
  },
];

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

type Seed = [name: string, price: number, finish: string, image: string];

const typeSeeds: Seed[] = [
  ["Makrana Marble", 180, "Polished · 16mm", marbleWhite],
  ["White Marble", 95, "Polished · 16mm", marbleWhite],
  ["Italian Marble", 420, "Mirror polish · 18mm", marbleItalian],
  ["Statuario Marble", 850, "Mirror polish · 20mm", marbleItalian],
  ["Calacatta Marble", 1250, "Book-match · 20mm", marbleItalian],
  ["Carrara Marble", 560, "Honed · 18mm", marbleItalian],
  ["Botticino Marble", 240, "Polished · 18mm", marbleBeige],
  ["Onyx Marble", 1650, "Backlit grade · 20mm", marblePink],
  ["Green Marble", 130, "Polished · 16mm", marbleGreen],
  ["Rainforest Green Marble", 320, "Polished · 18mm", marbleGreen],
  ["Forest Green Marble", 285, "Polished · 18mm", marbleGreen],
  ["Black Marble", 210, "Polished · 16mm", marbleBlack],
  ["Fantasy Black Marble", 480, "Book-match · 18mm", marbleBlack],
  ["Beige Marble", 110, "Polished · 16mm", marbleBeige],
  ["Cream Marble", 125, "Polished · 16mm", marbleBeige],
  ["Pink Marble", 145, "Polished · 16mm", marblePink],
  ["Red Marble", 165, "Polished · 16mm", marblePink],
  ["Brown Marble", 155, "Honed · 18mm", marbleBrown],
  ["Yellow Marble", 175, "Polished · 16mm", marbleBrown],
  ["Grey Marble", 140, "Honed · 18mm", marbleGrey],
  ["Blue Marble", 390, "Polished · 18mm", marbleGrey],
  ["Travertine Marble", 260, "Filled & honed", marbleBrown],
  ["Imported Marble", 640, "Mirror polish · 20mm", marbleItalian],
  ["Natural Marble", 120, "Polished · 16mm", marbleWhite],
  ["Engineered Marble", 220, "Calibrated · 15mm", marbleGrey],
  ["Composite Marble", 190, "Calibrated · 12mm", marbleBeige],
];

const statueSeeds: Seed[] = [
  ["Lord Ganesha", 18500, "Makrana white · 24 in", statueGanesha],
  ["Lord Shiva", 42000, "Makrana white · 36 in", statueShiva],
  ["Shivling", 9500, "Black granite & marble · 12 in", statueShiva],
  ["Shiv Parivar", 68000, "Makrana white · 36 in", statueShiva],
  ["Lord Krishna", 24000, "Makrana white · 30 in", statueKrishna],
  ["Radha Krishna", 55000, "Hand-painted · 36 in", statueKrishna],
  ["Lord Rama", 32000, "Makrana white · 30 in", statueKrishna],
  ["Sita Rama", 61000, "Hand-painted · 36 in", statueKrishna],
  ["Ram Darbar", 125000, "Hand-painted · 48 in", statueKrishna],
  ["Lord Hanuman", 27500, "Sindoor finish · 30 in", statueShiva],
  ["Lord Vishnu", 46000, "Makrana white · 36 in", statueDurga],
  ["Goddess Lakshmi", 21500, "Gold leaf detail · 24 in", statueDurga],
  ["Lakshmi Narayan", 72000, "Gold leaf detail · 36 in", statueDurga],
  ["Goddess Durga", 58000, "Hand-painted · 36 in", statueDurga],
  ["Maa Kali", 49000, "Hand-painted · 36 in", statueDurga],
  ["Goddess Saraswati", 23500, "Makrana white · 24 in", statueDurga],
  ["Goddess Parvati", 26000, "Makrana white · 24 in", statueDurga],
  ["Kartikeya", 34000, "Makrana white · 30 in", statueShiva],
  ["Bal Gopal", 7800, "Makrana white · 12 in", statueKrishna],
  ["Mahavir Jain", 39000, "Makrana white · 30 in", statueGanesha],
  ["Gautama Buddha", 16500, "Honed white · 24 in", statueGanesha],
  ["Sai Baba", 28500, "Hand-painted · 30 in", statueGanesha],
  ["Radha Rani", 22000, "Makrana white · 24 in", statueKrishna],
];

const houseSeeds: Seed[] = [
  ["Marble Flooring", 210, "Supplied & laid · per sq ft", productFlooring],
  ["Marble Slabs", 185, "Gangsaw slab · per sq ft", brandShowroom],
  ["Marble Tiles", 95, "600x600mm · per sq ft", productFlooring],
  ["Marble Staircase", 480, "Riser + tread · per sq ft", productStaircase],
  ["Marble Steps", 360, "Single piece · per running ft", productStaircase],
  ["Marble Kitchen Countertop", 640, "Edge profiled · per sq ft", productCountertop],
  ["Marble Bathroom Countertop", 520, "Cut-out included · per sq ft", productCountertop],
  ["Marble Wash Basin", 12500, "Carved single block · per piece", productCountertop],
  ["Marble Dining Table", 68000, "6-seater with base · per piece", productFurniture],
  ["Marble Center Table", 32000, "Brass base · per piece", productFurniture],
  ["Marble Side Table", 14500, "Round 18 in · per piece", productFurniture],
  ["Marble Sofa Table", 21000, "Console 48 in · per piece", productFurniture],
  ["Marble Mandir", 95000, "Carved dome & pillars · per piece", productMandir],
  ["Marble Pooja Room", 285000, "Full room cladding · per project", productMandir],
  ["Marble Door", 78000, "Carved frame + shutter · per piece", productMandir],
  ["Marble Window Frame", 26000, "Carved jharokha · per piece", productMandir],
  ["Marble Name Plate", 4500, "Engraved & inlaid · per piece", productFlooring],
  ["Marble Jali", 1250, "CNC lattice · per sq ft", productMandir],
  ["Marble Pillar", 34000, "Carved 8 ft · per piece", productStaircase],
  ["Marble Column", 42000, "Fluted 10 ft · per piece", productStaircase],
  ["Marble Fireplace", 88000, "Carved mantel · per piece", productFurniture],
  ["Marble Fountain", 145000, "3-tier carved · per piece", productFountain],
  ["Marble Garden Statue", 52000, "Weather-sealed · per piece", productFountain],
  ["Marble Planter", 9500, "Carved 24 in · per piece", productFountain],
  ["Marble Showpiece", 3200, "Inlay work · per piece", productFurniture],
];

const brandSeeds: Seed[] = [
  ["R K Marble", 320, "Kishangarh · Indian & imported", brandShowroom],
  ["Bhandari Marble Group", 380, "Kishangarh · full range", brandShowroom],
  ["Classic Marble Company", 720, "Imported Italian specialist", marbleItalian],
  ["A-Class Marble", 450, "Premium Italian & onyx", marbleItalian],
  ["Elegant Marbles", 540, "Imported natural stone", marbleWhite],
  ["Madhav Marbles", 240, "Indian granite & marble", marbleGreen],
  ["Millennium Marbles", 290, "Engineered & natural", marbleBeige],
  ["The Quarry Gallery", 980, "Rare exotic blocks", marbleBlack],
  ["Bhandari Marble World", 350, "Kishangarh · statues too", marbleWhite],
  ["Petrosstone", 610, "Imported slabs & quartz", marbleGrey],
  ["Stonex India", 420, "Quartz & marble", marbleWhite],
  ["Marble Arch", 560, "Designer imported stone", marbleItalian],
  ["Indian Natural Stones", 200, "Sandstone, marble, granite", marbleBrown],
  ["Pacific Industries", 260, "Granite & marble exporter", marbleBlack],
  ["Aditya Stonex", 300, "Quartz surfaces & marble", marbleGrey],
];

/** Unique per-item photos, resolved by catalog id (src/assets/items/<id>.jpg). */
const ITEM_IMAGES = import.meta.glob("../assets/items/*.jpg", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const imageFor = (id: string, fallback: string) =>
  ITEM_IMAGES[`../assets/items/${id}.jpg`] ?? fallback;

const build = (seeds: Seed[], group: GroupId, unit: string): CatalogItem[] =>
  seeds.map(([name, price, finish, image]) => {
    const id = `${group}-${slug(name)}`;
    return {
      id,
      name,
      group,
      finish,
      price,
      unit,
      image: imageFor(id, image),
    };
  });


export const CATALOG: CatalogItem[] = [
  ...build(typeSeeds, "types", "per sq ft"),
  ...build(statueSeeds, "statues", "onwards"),
  ...build(houseSeeds, "house", ""),
  ...build(brandSeeds, "brands", "per sq ft from"),
];

export type PriceBand = {
  id: string;
  label: string;
  min: number;
  max: number;
};

export const PRICE_BANDS: Record<GroupId, PriceBand[]> = {
  types: [
    { id: "t1", label: "Under ₹150 / sq ft", min: 0, max: 149 },
    { id: "t2", label: "₹150 – ₹350", min: 150, max: 350 },
    { id: "t3", label: "₹351 – ₹700", min: 351, max: 700 },
    { id: "t4", label: "Above ₹700", min: 701, max: Infinity },
  ],
  statues: [
    { id: "s1", label: "Under ₹20,000", min: 0, max: 19999 },
    { id: "s2", label: "₹20,000 – ₹40,000", min: 20000, max: 40000 },
    { id: "s3", label: "₹40,001 – ₹75,000", min: 40001, max: 75000 },
    { id: "s4", label: "Above ₹75,000", min: 75001, max: Infinity },
  ],
  house: [
    { id: "h1", label: "Under ₹1,000", min: 0, max: 999 },
    { id: "h2", label: "₹1,000 – ₹25,000", min: 1000, max: 25000 },
    { id: "h3", label: "₹25,001 – ₹90,000", min: 25001, max: 90000 },
    { id: "h4", label: "Above ₹90,000", min: 90001, max: Infinity },
  ],
  brands: [
    { id: "b1", label: "Under ₹300 / sq ft", min: 0, max: 299 },
    { id: "b2", label: "₹300 – ₹500", min: 300, max: 500 },
    { id: "b3", label: "₹501 – ₹800", min: 501, max: 800 },
    { id: "b4", label: "Above ₹800", min: 801, max: Infinity },
  ],
};

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const getCatalogItem = (id: string) => CATALOG.find((i) => i.id === id);

export const groupLabel = (id: GroupId) =>
  GROUPS.find((g) => g.id === id)?.label ?? "Marble";
