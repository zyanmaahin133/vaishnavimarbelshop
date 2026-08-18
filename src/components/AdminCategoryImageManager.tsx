import React, { useMemo, useState } from 'react';
import useCategoryImages from '../hooks/use-category-images';
import { CATEGORIES } from '../data/category-product-images';

export const AdminCategoryImageManager: React.FC = () => {
  const { getImages, addImage, updateImage, removeImage, setFeatured, resetToDefaults, saveToServer, serverAvailable, serverSyncStatus } = useCategoryImages();
  const [category, setCategory] = useState<string>(CATEGORIES[0] || 'tiles/floor');
  const images = getImages(category);

  const [newUrl, setNewUrl] = useState('');
  const [newAlt, setNewAlt] = useState('');

  const onAdd = () => {
    if (!newUrl) return;
    addImage(category, { src: newUrl, alt: newAlt });
    setNewUrl('');
    setNewAlt('');
  };

  return (
    <div style={{ padding: 12, border: '1px solid #eee', borderRadius: 8 }}>
      <h3>Category Image Manager</h3>
      <div style={{ marginBottom: 8 }}>
        <label>
          Category:{' '}
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 220px', gap: 12 }}>
        <div>
          <h4>Images ({images.length})</h4>
          <div style={{ display: 'grid', gap: 8 }}>
            {images.map((img) => (
              <div key={img.id} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <img src={img.src} alt={img.alt} style={{ width: 80, height: 56, objectFit: 'cover', borderRadius: 4 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13 }}>{img.alt || img.id}</div>
                  <div style={{ marginTop: 6 }}>
                    <button onClick={() => setFeatured(category, img.id)} style={{ marginRight: 8 }}>
                      {img.featured ? '★ Featured' : 'Set featured'}
                    </button>
                    <button
                      onClick={() => {
                        const newAlt = prompt('Alt text', img.alt || '');
                        if (newAlt !== null) updateImage(category, img.id, { alt: newAlt });
                      }}
                      style={{ marginRight: 8 }}
                    >
                      Edit
                    </button>
                    <button onClick={() => removeImage(category, img.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4>Add Image</h4>
          <div style={{ display: 'grid', gap: 8 }}>
            <input
              placeholder="Image URL (public/images/...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
            />
            <input placeholder="Alt text" value={newAlt} onChange={(e) => setNewAlt(e.target.value)} />
            <button onClick={onAdd}>Add Image</button>

            <div style={{ marginTop: 12 }}>
              <button onClick={() => resetToDefaults()}>Reset to defaults</button>
            </div>

            <div style={{ marginTop: 12, fontSize: 13, color: '#666' }}>
              Tip: place images under <code>public/images/categories/{'{category}'}</code> so the placeholder
              structure matches the defaults.
            </div>

            <div style={{ marginTop: 12 }}>
              <button
                onClick={async () => {
                  const ok = await saveToServer({ commitMessage: `Admin: update category images (${category})`, mergeLocal: true });
                  if (!ok.ok) alert(`Save failed: ${ok.error}`);
                  else alert('Saved to GitHub');
                }}
                disabled={!serverAvailable || serverSyncStatus === 'syncing'}
              >
                {serverSyncStatus === 'syncing' ? 'Saving...' : 'Save to server (GitHub)'}
              </button>
              {!serverAvailable && <div style={{ color: 'red', marginTop: 8 }}>Server persistence unavailable (GITHUB_TOKEN not set).</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCategoryImageManager;
