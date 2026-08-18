export type Subcategory = {
  id: string;
  label: string;
  keywords?: string[];
};

export type Category = {
  id: string;
  label: string;
  subcategories: Subcategory[];
};

export const TAXONOMY: Category[] = [
  {
    id: "tiles",
    label: "Tiles",
    subcategories: [
      { id: "floor-tiles", label: "Floor Tiles", keywords: ["floor", "flooring", "vitrified", "porcelain"] },
      { id: "wall-tiles", label: "Wall Tiles", keywords: ["wall", "living", "bedroom", "3d"] },
      { id: "bathroom-tiles", label: "Bathroom Tiles", keywords: ["bathroom", "anti-skid"] },
      { id: "kitchen-tiles", label: "Kitchen Tiles", keywords: ["kitchen", "backsplash"] },
      { id: "outdoor-tiles", label: "Outdoor Tiles", keywords: ["outdoor", "terrace", "balcony", "garden"] },
      { id: "elevation-tiles", label: "Elevation Tiles", keywords: ["elevation", "exterior", "facade"] },
    ],
  },
  {
    id: "sanitaryware",
    label: "Sanitaryware",
    subcategories: [
      { id: "bathroom-sanitaryware", label: "Bathroom Sanitaryware", keywords: ["sanitary", "wc"] },
      { id: "wall-hung-wc", label: "Wall Hung WC", keywords: ["wall hung", "concealed"] },
      { id: "one-piece-wc", label: "One Piece WC", keywords: ["one piece", "coupled"] },
      { id: "wash-basin", label: "Wash Basin", keywords: ["wash basin", "basin", "pedestal"] },
      { id: "counter-basin", label: "Counter Basin", keywords: ["counter", "table top"] },
      { id: "bathroom-accessories", label: "Bathroom Accessories", keywords: ["accessories", "towel", "soap", "mirror"] },
    ],
  },
  {
    id: "kitchen-sink",
    label: "Kitchen Sink",
    subcategories: [
      { id: "kitchen-sink", label: "Kitchen Sink", keywords: ["sink"] },
      { id: "stainless-steel-sink", label: "Stainless Steel Sink", keywords: ["stainless", "steel"] },
      { id: "single-bowl-sink", label: "Single Bowl Sink", keywords: ["single", "bowl"] },
      { id: "double-bowl-sink", label: "Double Bowl Sink", keywords: ["double", "bowl"] },
      { id: "designer-kitchen-sink", label: "Designer Kitchen Sink", keywords: ["designer", "undermount", "apron"] },
    ],
  },
  {
    id: "bathroom-vanity",
    label: "Bathroom Vanity",
    subcategories: [
      { id: "bathroom-vanity", label: "Bathroom Vanity", keywords: ["vanity"] },
      { id: "vanity-unit", label: "Bathroom Vanity Unit", keywords: ["unit", "storage"] },
      { id: "wall-mounted-vanity", label: "Wall Mounted Vanity", keywords: ["wall mounted", "floating"] },
      { id: "designer-vanity", label: "Designer Bathroom Vanity", keywords: ["designer", "luxury"] },
      { id: "wash-basin-vanity", label: "Wash Basin Vanity", keywords: ["basin", "combo"] },
    ],
  },
  {
    id: "parking-tiles",
    label: "Parking Tiles",
    subcategories: [
      { id: "parking-floor-tiles", label: "Parking Floor Tiles", keywords: ["parking", "floor"] },
      { id: "heavy-duty-parking-tiles", label: "Heavy Duty Parking Tiles", keywords: ["heavy", "duty"] },
      { id: "outdoor-parking-tiles", label: "Outdoor Parking Tiles", keywords: ["outdoor", "parking"] },
      { id: "anti-skid-parking-tiles", label: "Anti-Skid Parking Tiles", keywords: ["anti-skid", "non-slip"] },
      { id: "car-parking-tiles", label: "Car Parking Tiles", keywords: ["car", "garage", "basement"] },
    ],
  },
  {
    id: "marble-granite",
    label: "Marble & Granite",
    subcategories: [
      { id: "marble", label: "Marble", keywords: ["marble"] },
      { id: "white-marble", label: "White Marble", keywords: ["white", "makrana"] },
      { id: "italian-marble", label: "Italian Marble", keywords: ["italian", "carrara"] },
      { id: "floor-marble", label: "Floor Marble", keywords: ["floor", "marble"] },
      { id: "wall-marble", label: "Wall Marble", keywords: ["wall", "cladding"] },
      { id: "granite", label: "Granite", keywords: ["granite"] },
      { id: "black-granite", label: "Black Granite", keywords: ["black", "granite"] },
      { id: "white-granite", label: "White Granite", keywords: ["white", "granite"] },
      { id: "kitchen-granite", label: "Kitchen Granite", keywords: ["kitchen", "countertop"] },
      { id: "staircase-granite", label: "Staircase Granite", keywords: ["staircase", "stairs"] },
      { id: "countertop-granite", label: "Countertop Granite", keywords: ["countertop", "granite"] },
    ],
  },
];
