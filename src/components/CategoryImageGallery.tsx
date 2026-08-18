import React from 'react';
import useCategoryImages from '../hooks/use-category-images';
import type { CategoryImage } from '../data/category-product-images';

type Props = {
  categorySlug: string;
  categoryTitle?: string;
  showAdmin?: boolean;
};

export const CategoryImageGallery: React.FC<Props> = ({ categorySlug, categoryTitle, showAdmin }) => {
  const { getImages } = useCategoryImages();
  const images = getImages(categorySlug) as CategoryImage[];

  const featured = images.find((i) => i.featured) ?? images[0];

  return (
    <div>
      {categoryTitle && <h2>{categoryTitle}</h2>}

      {featured ? (
        <div style={{ marginBottom: 12 }}>
          <img
            src={featured.src}
            alt={featured.alt || `${categorySlug} hero`}
            style={{ maxWidth: '100%', height: 'auto', borderRadius: 6 }}
          />
        </div>
      ) : null}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
        {images.length === 0 ? (
          <div>No images for this category yet.</div>
        ) : (
          images.map((img) => (
            <div key={img.id} style={{ border: '1px solid #eee', padding: 6, borderRadius: 6 }}>
              <img
                src={img.src}
                alt={img.alt || img.id}
                style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4 }}
              />
            </div>
          ))
        )}
      </div>

      {showAdmin && (
        <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
          Admin mode: use the Category Image Manager to add or edit images.
        </div>
      )}
    </div>
  );
};

export default CategoryImageGallery;
