export type CategoryImage = {
  id: string;
  src: string;
  alt?: string;
  featured?: boolean;
  tags?: string[];
};

// A list of SEO categories used across the app. Expand as needed.
export const CATEGORIES = [
  'tiles/floor',
  'tiles/wall',
  'tiles/bathroom',
  'tiles/kitchen',
  'tiles/outdoor',
  'tiles/elevation',
  'sanitaryware',
  'sink',
  'vanity',
  'parking-tiles',
  'marble-granite',
];

// Default placeholder images for each category. These use the recommended public path
// public/images/categories/<category>/*. Replace with real images when available.

const placeholder = (category: string, i: number) => ({
  id: `${category}--${i}`,
  src: `/images/categories/${category}/placeholder-${i + 1}.jpg`,
  alt: `${category} image ${i + 1}`,
  featured: i === 0,
});

export const DEFAULT_CATEGORY_IMAGES: Record<string, CategoryImage[]> = {
  'tiles/floor': [placeholder('tiles/floor', 0), placeholder('tiles/floor', 1)],
  'tiles/wall': [placeholder('tiles/wall', 0), placeholder('tiles/wall', 1)],
  'tiles/bathroom': [placeholder('tiles/bathroom', 0)],
  'tiles/kitchen': [placeholder('tiles/kitchen', 0)],
  'tiles/outdoor': [placeholder('tiles/outdoor', 0)],
  'tiles/elevation': [placeholder('tiles/elevation', 0)],
  sanitaryware: [placeholder('sanitaryware', 0)],
  sink: [placeholder('sink', 0)],
  vanity: [placeholder('vanity', 0)],
  'parking-tiles': [placeholder('parking-tiles', 0)],
  'marble-granite': [placeholder('marble-granite', 0)],
};

export default DEFAULT_CATEGORY_IMAGES;
