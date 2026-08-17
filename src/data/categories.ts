export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  subcategories?: SubCategory[];
}

export interface SubCategory {
  id: string;
  name: string;
  image?: string;
  seoTopics?: string[];
}

export const mainCategories: Category[] = [
  {
    id: "tiles",
    name: "Tiles",
    image: "https://images.unsplash.com/photo-1553321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    description: "Explore our premium collection of tiles for every room",
    subcategories: [
      {
        id: "floor-tiles",
        name: "Floor Tiles",
        image: "https://images.unsplash.com/photo-1618788385297-9bb33e66a966?w=400&h=300&fit=crop",
        seoTopics: [
          "Vitrified Floor Tiles",
          "Porcelain Floor Tiles",
          "2×2 Floor Tiles",
          "4×2 Floor Tiles",
          "Marble Look Tiles",
          "Wooden Floor Tiles",
          "Anti-Skid Floor Tiles",
        ],
      },
      {
        id: "wall-tiles",
        name: "Wall Tiles",
        image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
        seoTopics: [
          "Living Room Wall Tiles",
          "Bedroom Wall Tiles",
          "Kitchen Wall Tiles",
          "Bathroom Wall Tiles",
          "Decorative Wall Tiles",
          "3D Wall Tiles",
        ],
      },
      {
        id: "bathroom-tiles",
        name: "Bathroom Tiles",
        image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
        seoTopics: [
          "Bathroom Floor Tiles",
          "Bathroom Wall Tiles",
          "Anti-Skid Bathroom Tiles",
          "Designer Bathroom Tiles",
          "Small Bathroom Tiles",
          "Marble Look Bathroom Tiles",
        ],
      },
      {
        id: "kitchen-tiles",
        name: "Kitchen Tiles",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        seoTopics: [
          "Kitchen Wall Tiles",
          "Kitchen Backsplash Tiles",
          "Kitchen Floor Tiles",
          "Designer Kitchen Tiles",
          "Easy-Clean Kitchen Tiles",
        ],
      },
      {
        id: "outdoor-tiles",
        name: "Outdoor Tiles",
        image: "https://images.unsplash.com/photo-1552324179-5f3c3d6b5f1b?w=400&h=300&fit=crop",
        seoTopics: [
          "Outdoor Floor Tiles",
          "Parking Tiles",
          "Anti-Skid Outdoor Tiles",
          "Terrace Tiles",
          "Balcony Tiles",
          "Garden Tiles",
        ],
      },
      {
        id: "elevation-tiles",
        name: "Elevation Tiles",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
        seoTopics: [
          "Exterior Wall Tiles",
          "Building Elevation Tiles",
          "Exterior Elevation Tiles",
          "Stone Look Elevation Tiles",
          "Modern Elevation Tiles",
        ],
      },
    ],
  },
  {
    id: "sanitaryware",
    name: "Sanitaryware",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    description: "High-quality bathroom fixtures and accessories",
    subcategories: [
      {
        id: "wc",
        name: "WC",
        seoTopics: ["Wall Hung WC", "One Piece WC"],
      },
      {
        id: "wash-basin",
        name: "Wash Basin",
        seoTopics: ["Counter Basin", "Wall Mounted Basin"],
      },
      {
        id: "bathroom-accessories",
        name: "Bathroom Accessories",
        seoTopics: ["Towel Racks", "Soap Dispensers", "Mirror Cabinets"],
      },
    ],
  },
  {
    id: "kitchen-sink",
    name: "Kitchen Sink",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    description: "Premium kitchen sinks for modern homes",
    subcategories: [
      {
        id: "stainless-steel",
        name: "Stainless Steel Sink",
        seoTopics: ["Single Bowl Sink", "Double Bowl Sink"],
      },
      {
        id: "designer-sink",
        name: "Designer Kitchen Sink",
        seoTopics: ["Undermount Sink", "Apron Front Sink"],
      },
    ],
  },
  {
    id: "bathroom-vanity",
    name: "Bathroom Vanity",
    image: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=300&fit=crop",
    description: "Stylish bathroom vanities with storage",
    subcategories: [
      {
        id: "vanity-unit",
        name: "Vanity Unit",
        seoTopics: ["Wall Mounted Vanity", "Floor Standing Vanity"],
      },
      {
        id: "designer-vanity",
        name: "Designer Bathroom Vanity",
        seoTopics: ["Modern Vanity", "Traditional Vanity"],
      },
    ],
  },
  {
    id: "parking-tiles",
    name: "Parking Tiles",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    description: "Heavy-duty tiles for parking areas",
    subcategories: [
      {
        id: "heavy-duty",
        name: "Heavy Duty Parking Tiles",
        seoTopics: ["Anti-Skid Parking Tiles", "Outdoor Parking Tiles"],
      },
      {
        id: "car-parking",
        name: "Car Parking Tiles",
        seoTopics: ["Industrial Parking Tiles"],
      },
    ],
  },
  {
    id: "marble-granite",
    name: "Marble & Granite",
    image: "https://images.unsplash.com/photo-1618788385297-9bb33e66a966?w=400&h=300&fit=crop",
    description: "Natural stone for premium finishes",
    subcategories: [
      {
        id: "marble",
        name: "Marble",
        seoTopics: [
          "Makrana Marble",
          "White Marble",
          "Italian Marble",
          "Black Marble",
          "Green Marble",
        ],
      },
      {
        id: "granite",
        name: "Granite",
        seoTopics: [
          "Kitchen Countertop Granite",
          "Staircase Granite",
          "Wall Granite",
        ],
      },
      {
        id: "marble-statues",
        name: "Marble Statues",
        seoTopics: [
          "Hindu God Statues",
          "Lord Ganesha",
          "Lord Shiva",
          "Krishna Statues",
        ],
      },
    ],
  },
];

export const marbleTypes = [
  "Makrana Marble",
  "White Marble",
  "Italian Marble",
  "Statuario Marble",
  "Calacatta Marble",
  "Carrara Marble",
  "Botticino Marble",
  "Onyx Marble",
  "Green Marble",
  "Rainforest Green Marble",
  "Forest Green Marble",
  "Black Marble",
  "Fantasy Black Marble",
  "Beige Marble",
  "Cream Marble",
  "Pink Marble",
  "Red Marble",
  "Brown Marble",
  "Yellow Marble",
  "Grey Marble",
  "Blue Marble",
  "Travertine Marble",
  "Imported Marble",
  "Natural Marble",
  "Engineered Marble",
  "Composite Marble",
];

export const marbleProducts = [
  "Marble Flooring",
  "Marble Slabs",
  "Marble Tiles",
  "Marble Staircase",
  "Marble Kitchen Countertop",
  "Marble Bathroom Countertop",
  "Marble Wash Basin",
  "Marble Dining Table",
  "Marble Center Table",
  "Marble Mandir",
  "Marble Fountain",
  "Marble Garden Statue",
  "Marble Showpiece",
];
