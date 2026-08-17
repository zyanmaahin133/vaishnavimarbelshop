import { useCallback, useEffect, useMemo, useState } from 'react';
import DEFAULT_CATEGORY_IMAGES, { CategoryImage } from '../data/category-product-images';

const STORAGE_KEY = 'vaishnavimar-category-images-v1';

type UseCategoryImagesReturn = {
  getImages: (category: string) => CategoryImage[];
  addImage: (category: string, img: Omit<CategoryImage, 'id'>) => CategoryImage;
  updateImage: (category: string, id: string, changes: Partial<CategoryImage>) => void;
  removeImage: (category: string, id: string) => void;
  setFeatured: (category: string, id: string) => void;
  resetToDefaults: () => void;
  saveToServer: (options?: { commitMessage?: string; mergeLocal?: boolean }) => Promise<{ ok: boolean; error?: string }>; // saves current state to GitHub via server API
  serverAvailable: boolean;
  serverSyncStatus: 'idle' | 'syncing' | 'error';
};

function readStorage(): Record<string, CategoryImage[]> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, CategoryImage[]>;
  } catch (e) {
    console.warn('Failed to read category images from storage', e);
    return {};
  }
}

function writeStorage(data: Record<string, CategoryImage[]>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Failed to write category images to storage', e);
  }
}

async function fetchServerData() {
  try {
    const res = await fetch('/api/category-images');
    if (!res.ok) return null;
    const payload = await res.json();
    return payload.data as Record<string, CategoryImage[]>;
  } catch (e) {
    return null;
  }
}

export default function useCategoryImages(): UseCategoryImagesReturn {
  const [state, setState] = useState<Record<string, CategoryImage[]>>(() => {
    const fromStorage = typeof window !== 'undefined' ? readStorage() : {};
    return { ...DEFAULT_CATEGORY_IMAGES, ...fromStorage } as Record<string, CategoryImage[]>;
  });

  const [serverAvailable, setServerAvailable] = useState<boolean>(true);
  const [serverSyncStatus, setServerSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');

  useEffect(() => {
    writeStorage(state);
  }, [state]);

  useEffect(() => {
    // try to load server data on mount and merge with local
    (async () => {
      try {
        const server = await fetchServerData();
        if (!server) return setServerAvailable(false);
        setState((prev) => ({ ...prev, ...server }));
      } catch (e) {
        setServerAvailable(false);
      }
    })();
  }, []);

  const getImages = useCallback(
    (category: string) => {
      return state[category] ?? DEFAULT_CATEGORY_IMAGES[category] ?? [];
    },
    [state]
  );

  const addImage = useCallback((category: string, img: Omit<CategoryImage, 'id'>) => {
    const id = `${category}--${Date.now()}`;
    const newImg: CategoryImage = { id, ...img };
    setState((prev) => {
      const next = { ...(prev || {}) };
      next[category] = [...(next[category] || DEFAULT_CATEGORY_IMAGES[category] || []), newImg];
      return next;
    });
    return newImg;
  }, []);

  const updateImage = useCallback((category: string, id: string, changes: Partial<CategoryImage>) => {
    setState((prev) => {
      const next = { ...(prev || {}) };
      next[category] = (next[category] || []).map((it) => (it.id === id ? { ...it, ...changes } : it));
      return next;
    });
  }, []);

  const removeImage = useCallback((category: string, id: string) => {
    setState((prev) => {
      const next = { ...(prev || {}) };
      next[category] = (next[category] || []).filter((it) => it.id !== id);
      return next;
    });
  }, []);

  const setFeatured = useCallback((category: string, id: string) => {
    setState((prev) => {
      const next = { ...(prev || {}) };
      next[category] = (next[category] || []).map((it) => ({ ...it, featured: it.id === id }));
      return next;
    });
  }, []);

  const resetToDefaults = useCallback(() => {
    setState({ ...DEFAULT_CATEGORY_IMAGES });
  }, []);

  const saveToServer = useCallback(async ({ commitMessage, mergeLocal }: { commitMessage?: string; mergeLocal?: boolean } = {}) => {
    setServerSyncStatus('syncing');
    try {
      // read server current
      const server = await fetchServerData();
      if (!server) {
        setServerAvailable(false);
        setServerSyncStatus('error');
        return { ok: false, error: 'Server unavailable' };
      }

      const toSave = mergeLocal ? { ...server, ...state } : state;

      const res = await fetch('/api/category-images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: toSave, commitMessage }),
      });

      if (!res.ok) {
        const payload = await res.json().catch(() => ({}));
        setServerSyncStatus('error');
        return { ok: false, error: payload.error || 'Server save failed' };
      }

      setServerSyncStatus('idle');
      setServerAvailable(true);
      return { ok: true };
    } catch (e: any) {
      setServerSyncStatus('error');
      setServerAvailable(false);
      return { ok: false, error: String(e.message || e) };
    }
  }, [state]);

  return useMemo(
    () => ({ getImages, addImage, updateImage, removeImage, setFeatured, resetToDefaults, saveToServer, serverAvailable, serverSyncStatus }),
    [getImages, addImage, updateImage, removeImage, setFeatured, resetToDefaults, saveToServer, serverAvailable, serverSyncStatus]
  );
}
