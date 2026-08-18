export type Subcategory = {
  id: string;
  label: string;
  keywords?: string[]; // used for simple matching against product name/finish
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
      { id: "floor-tiles", label: "Floor Tiles", keywords: ["floor", "flooring"] },
      { id: "wall-tiles", label: "Wall Tiles", keywords: ["wall"] },
      { id: "bathroom-tiles", label: "Bathroom Tiles", keywords: ["bathroom"] },
      { id: "kitchen-tiles", label: "Kitchen Tiles", keywords: ["kitchen", "backsplash"] },
      { id: "outdoor-tiles", label: "Outdoor Tiles", keywords: ["outdoor", "terrace", "balcony"] },
      { id: "elevation-tiles", label: "Elevation Tiles", keywords: ["elevation", "exterior"] },
    ],
  },
  {
    id: "sanitaryware",
    label: "Sanitaryware",
    subcategories: [
      { id: "bathroom-sanitaryware", label: "Bathroom Sanitaryware", keywords: ["sanitary", "wc", "wash basin"] },
      { id: "sink", label: "Sink", keywords: ["sink"] },
      { id: "vanity", label: "Vanity", keywords: ["vanity"] },
      { id: "parking-tiles", label: "Parking tiles", keywords: ["parking"] },
    ],
  },
  {
    id: "marble-granite",
    label: "Marble & Granite",
    subcategories: [
      { id: "marble", label: "Marble", keywords: ["marble"] },
      { id: "granite", label: "Granite", keywords: ["granite"] },
    ],
  },
];
