export interface SubCategory {
  id: string;
  name: string;
  image?: string;
  seoTopics?: string[];
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  subcategories?: SubCategory[];
}

export const mainCategories: Category[] = [
  {
    id: "tiles",
    name: "Tiles",
    image:
      "https://images.pexels.com/photos/7566201/pexels-photo-7566201.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "Explore our premium collection of tiles for every room",
    subcategories: [
      {
        id: "floor-tiles",
        name: "Floor Tiles",
        image:
          "https://images.pexels.com/photos/6175107/pexels-photo-6175107.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: [
          "Vitrified Floor Tiles",
          "Porcelain Floor Tiles",
          "2×2 Floor Tiles",
          "4×2 Floor Tiles",
          "Marble Look Floor Tiles",
          "Wooden Floor Tiles",
          "Anti-Skid Floor Tiles",
        ],
      },
      {
        id: "wall-tiles",
        name: "Wall Tiles",
        image:
          "https://images.pexels.com/photos/8141966/pexels-photo-8141966.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
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
        image:
          "https://images.pexels.com/photos/6903205/pexels-photo-6903205.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
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
        image:
          "https://images.pexels.com/photos/7173661/pexels-photo-7173661.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
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
        image:
          "https://images.pexels.com/photos/18273286/pexels-photo-18273286.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
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
        image:
          "https://images.pexels.com/photos/5502409/pexels-photo-5502409.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
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
    image:
      "https://images.pexels.com/photos/6908568/pexels-photo-6908568.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "High-quality bathroom fixtures and accessories",
    subcategories: [
      {
        id: "bathroom-sanitaryware",
        name: "Bathroom Sanitaryware",
        image:
          "https://images.pexels.com/photos/7167081/pexels-photo-7167081.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Wall Hung WC", "One Piece WC", "EWC", "Coupled Suite"],
      },
      {
        id: "wall-hung-wc",
        name: "Wall Hung WC",
        image:
          "https://images.pexels.com/photos/7545637/pexels-photo-7545637.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Wall Hung WC", "Concealed Cistern WC", "Rimless Wall Hung WC"],
      },
      {
        id: "one-piece-wc",
        name: "One Piece WC",
        image:
          "https://images.pexels.com/photos/6934237/pexels-photo-6934237.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["One Piece WC", "Two Piece WC", "Coupled Closet"],
      },
      {
        id: "wash-basin",
        name: "Wash Basin",
        image:
          "https://images.pexels.com/photos/6653889/pexels-photo-6653889.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Wall Mounted Basin", "Table Top Basin", "Counter Basin", "Pedestal Basin"],
      },
      {
        id: "counter-basin",
        name: "Counter Basin",
        image:
          "https://images.pexels.com/photos/33528567/pexels-photo-33528567.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Counter Top Basin", "Vanity Basin", "Semi Recessed Basin"],
      },
      {
        id: "bathroom-accessories",
        name: "Bathroom Accessories",
        image:
          "https://images.pexels.com/photos/709749/pexels-photo-709749.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Towel Racks", "Soap Dispensers", "Mirror Cabinets", "Robe Hooks"],
      },
    ],
  },
  {
    id: "kitchen-sink",
    name: "Kitchen Sink",
    image:
      "https://images.pexels.com/photos/7303780/pexels-photo-7303780.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "Premium kitchen sinks for modern homes",
    subcategories: [
      {
        id: "kitchen-sink",
        name: "Kitchen Sink",
        image:
          "https://images.pexels.com/photos/4682115/pexels-photo-4682115.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Stainless Steel Sink", "Single Bowl Sink", "Double Bowl Sink", "Designer Sink"],
      },
      {
        id: "stainless-steel-sink",
        name: "Stainless Steel Sink",
        image:
          "https://images.pexels.com/photos/15357336/pexels-photo-15357336.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["304 Grade Sink", "Handmade Sink", "Drawn Sink"],
      },
      {
        id: "single-bowl-sink",
        name: "Single Bowl Sink",
        image:
          "https://images.pexels.com/photos/10827397/pexels-photo-10827397.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Single Bowl with Drainboard", "Single Bowl Sink"],
      },
      {
        id: "double-bowl-sink",
        name: "Double Bowl Sink",
        image:
          "https://images.pexels.com/photos/7601272/pexels-photo-7601272.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Double Bowl with Drainboard", "Equal Bowl Sink", "60/40 Bowl Sink"],
      },
      {
        id: "designer-kitchen-sink",
        name: "Designer Kitchen Sink",
        image:
          "https://images.pexels.com/photos/10486145/pexels-photo-10486145.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Undermount Sink", "Apron Front Sink", "Quartz Sink"],
      },
    ],
  },
  {
    id: "bathroom-vanity",
    name: "Bathroom Vanity",
    image:
      "https://images.pexels.com/photos/10486220/pexels-photo-10486220.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "Stylish bathroom vanities with storage",
    subcategories: [
      {
        id: "bathroom-vanity",
        name: "Bathroom Vanity",
        image:
          "https://images.pexels.com/photos/15667601/pexels-photo-15667601.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Single Sink Vanity", "Double Sink Vanity", "Floating Vanity"],
      },
      {
        id: "vanity-unit",
        name: "Bathroom Vanity Unit",
        image:
          "https://images.pexels.com/photos/6835173/pexels-photo-6835173.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Floor Standing Vanity", "Vanity with Storage", "MDF Vanity Unit"],
      },
      {
        id: "wall-mounted-vanity",
        name: "Wall Mounted Vanity",
        image:
          "https://images.pexels.com/photos/29252365/pexels-photo-29252365.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Wall Hung Vanity", "Floating Vanity Unit", "Wall Mounted Sink Cabinet"],
      },
      {
        id: "designer-vanity",
        name: "Designer Bathroom Vanity",
        image:
          "https://images.pexels.com/photos/8134777/pexels-photo-8134777.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Modern Vanity", "Luxury Vanity", "Custom Vanity"],
      },
      {
        id: "wash-basin-vanity",
        name: "Wash Basin Vanity",
        image:
          "https://images.pexels.com/photos/6933773/pexels-photo-6933773.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Basin with Cabinet", "Vanity Sink Combo", "Counter Top Basin Vanity"],
      },
    ],
  },
  {
    id: "parking-tiles",
    name: "Parking Tiles",
    image:
      "https://images.pexels.com/photos/17012266/pexels-photo-17012266.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "Heavy-duty tiles for parking areas",
    subcategories: [
      {
        id: "parking-floor-tiles",
        name: "Parking Floor Tiles",
        image:
          "https://images.pexels.com/photos/9891098/pexels-photo-9891098.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Parking Floor Tiles", "Heavy Duty Floor Tiles", "Outdoor Parking Tiles"],
      },
      {
        id: "heavy-duty-parking-tiles",
        name: "Heavy Duty Parking Tiles",
        image:
          "https://images.pexels.com/photos/30756803/pexels-photo-30756803.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Heavy Duty Parking Tiles", "Anti-Skid Parking Tiles", "Industrial Parking Tiles"],
      },
      {
        id: "outdoor-parking-tiles",
        name: "Outdoor Parking Tiles",
        image:
          "https://images.pexels.com/photos/601066/pexels-photo-601066.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Outdoor Parking Tiles", "Open Parking Tiles", "Weather-Resistant Tiles"],
      },
      {
        id: "anti-skid-parking-tiles",
        name: "Anti-Skid Parking Tiles",
        image:
          "https://images.pexels.com/photos/220177/pexels-photo-220177.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Anti-Skid Parking Tiles", "Non-Slip Tiles", "Rough Surface Tiles"],
      },
      {
        id: "car-parking-tiles",
        name: "Car Parking Tiles",
        image:
          "https://images.pexels.com/photos/13311961/pexels-photo-13311961.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Car Parking Tiles", "Basement Parking Tiles", "Garage Floor Tiles"],
      },
    ],
  },
  {
    id: "marble-granite",
    name: "Marble & Granite",
    image:
      "https://images.pexels.com/photos/6634141/pexels-photo-6634141.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    description: "Natural stone for premium finishes",
    subcategories: [
      {
        id: "marble",
        name: "Marble",
        image:
          "https://images.pexels.com/photos/5623203/pexels-photo-5623203.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: [
          "White Marble",
          "Italian Marble",
          "Makrana Marble",
          "Floor Marble",
          "Wall Marble",
        ],
      },
      {
        id: "white-marble",
        name: "White Marble",
        image:
          "https://images.pexels.com/photos/4705843/pexels-photo-4705843.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Makrana White Marble", "Statuario Marble", "Calacatta Marble"],
      },
      {
        id: "italian-marble",
        name: "Italian Marble",
        image:
          "https://images.pexels.com/photos/6634153/pexels-photo-6634153.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Carrara Marble", "Botticino Marble", "Imported Italian Marble"],
      },
      {
        id: "floor-marble",
        name: "Floor Marble",
        image:
          "https://images.pexels.com/photos/4709046/pexels-photo-4709046.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Floor Marble Tiles", "Floor Marble Slabs", "Polished Floor Marble"],
      },
      {
        id: "wall-marble",
        name: "Wall Marble",
        image:
          "https://images.pexels.com/photos/3847500/pexels-photo-3847500.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Wall Marble Cladding", "Feature Wall Marble", "Marble Wall Panels"],
      },
      {
        id: "granite",
        name: "Granite",
        image:
          "https://images.pexels.com/photos/6788338/pexels-photo-6788338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: [
          "Black Granite",
          "White Granite",
          "Kitchen Granite",
          "Staircase Granite",
          "Countertop Granite",
        ],
      },
      {
        id: "black-granite",
        name: "Black Granite",
        image:
          "https://images.pexels.com/photos/36327398/pexels-photo-36327398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Absolute Black Granite", "Black Pearl Granite", "Premium Black Granite"],
      },
      {
        id: "white-granite",
        name: "White Granite",
        image:
          "https://images.pexels.com/photos/4709469/pexels-photo-4709469.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["White Galaxy Granite", "Moon White Granite", "Alaska White Granite"],
      },
      {
        id: "kitchen-granite",
        name: "Kitchen Granite",
        image:
          "https://images.pexels.com/photos/8583895/pexels-photo-8583895.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Kitchen Countertop Granite", "Kitchen Island Granite", "Polished Kitchen Granite"],
      },
      {
        id: "staircase-granite",
        name: "Staircase Granite",
        image:
          "https://images.pexels.com/photos/18325785/pexels-photo-18325785.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Staircase Granite Steps", "Granite Treads", "Anti-Skid Granite Stairs"],
      },
      {
        id: "countertop-granite",
        name: "Countertop Granite",
        image:
          "https://images.pexels.com/photos/10827398/pexels-photo-10827398.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
        seoTopics: ["Granite Countertop Slab", "Edge Profiled Countertop", "Custom Cut Countertop"],
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
