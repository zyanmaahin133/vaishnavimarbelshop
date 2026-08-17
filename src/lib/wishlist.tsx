import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { track } from "@/lib/analytics";

type WishlistApi = {
  ids: string[];
  has: (id: string) => boolean;
  toggle: (id: string, name?: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  count: number;
  shareQuery: string;
};

const WishlistContext = createContext<WishlistApi | null>(null);
const KEY = "amh-wishlist-v1";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setIds(JSON.parse(raw) as string[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {
      /* ignore */
    }
  }, [ids, hydrated]);

  const toggle = useCallback((id: string, name?: string) => {
    setIds((prev) => {
      if (prev.includes(id)) {
        track("remove_from_wishlist", { item_id: id, item_name: name });
        return prev.filter((x) => x !== id);
      }
      track("add_to_wishlist", { item_id: id, item_name: name });
      return [...prev, id];
    });
  }, []);

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo<WishlistApi>(
    () => ({
      ids,
      has: (id) => ids.includes(id),
      toggle,
      remove,
      clear,
      count: ids.length,
      shareQuery: ids.join(","),
    }),
    [ids, toggle, remove, clear],
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used inside WishlistProvider");
  return ctx;
}

export const parseSharedIds = (raw?: string) =>
  (raw ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 60);
