import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { CATALOG, GROUPS, type CatalogItem, type GroupId } from "@/data/catalog";
import { CATEGORIES } from "@/data/content";
import { idbGet, idbSet, idbDel } from "./storage-indexeddb";

/**
 * Server-less content studio (IndexedDB-backed).
 *
 * Everything the admin edits lives in this browser (IndexedDB) — there is
 * no backend and no database. The draft can be exported as JSON so it can be
 * committed into the code later.
 */

export type ProductDraft = CatalogItem & {
  custom?: boolean;
  hidden?: boolean;
  imageHash?: string;
  images?: string[]; // data URLs for quick preview
  imageHashes?: string[]; // fingerprints for images stored in IDB
};

export type CategoryDraft = {
  slug: string;
  label: string;
  intro: string;
  image: string;
  imageHash?: string;
};

export type BrandDraft = { id: string; name: string; note: string };

export type AdminState = {
  products: ProductDraft[];
  categories: CategoryDraft[];
  brands: BrandDraft[];
};

const KEY = "amh-admin-studio-v1";

const baseState = (): AdminState => ({
  products: CATALOG.map((i) => ({ ...i, images: i.image ? [i.image] : [], imageHashes: i.imageHash ? [i.imageHash] : [] })),
  categories: CATEGORIES.map((c) => ({
    slug: c.slug,
    label: c.label,
    intro: c.intro,
    image: c.image,
  })),
  brands: CATALOG.filter((i) => i.group === "brands").map((i) => ({
    id: i.id,
    name: i.name,
    note: i.finish,
  })),
});

type AdminApi = AdminState & {
  ready: boolean;
  dirty: boolean;
  groups: typeof GROUPS;
  saveProduct: (p: ProductDraft) => void;
  deleteProduct: (id: string) => void;
  toggleHidden: (id: string) => void;
  moveProduct: (id: string, dir: -1 | 1) => void;
  saveCategory: (c: CategoryDraft) => void;
  moveCategory: (slug: string, dir: -1 | 1) => void;
  saveBrand: (b: BrandDraft) => void;
  deleteBrand: (id: string) => void;
  moveBrand: (id: string, dir: -1 | 1) => void;
  /** Returns the id of the record already using this image hash, if any. */
  findImageOwner: (hash: string, exceptId?: string) => string | null;
  reset: () => void;
  exportJson: () => string;
};

const AdminContext = createContext<AdminApi | null>(null);

function move<T>(list: T[], index: number, dir: -1 | 1): T[] {
  const next = index + dir;
  if (index < 0 || next < 0 || next >= list.length) return list;
  const copy = [...list];
  const [row] = copy.splice(index, 1);
  copy.splice(next, 0, row);
  return copy;
}

export function AdminStudioProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AdminState>(baseState);
  const [ready, setReady] = useState(false);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await idbGet(KEY);
        if (raw && mounted) {
          setState(raw as AdminState);
          setDirty(true);
        }
      } catch (err) {
        // Fallback to localStorage if IndexedDB fails for some reason
        try {
          const rawLS = window.localStorage.getItem(KEY);
          if (rawLS && mounted) {
            const parsed = JSON.parse(rawLS) as AdminState;
            if (parsed?.products?.length) {
              setState(parsed);
              setDirty(true);
            }
          }
        } catch {
          // ignore corrupt drafts
        }
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const commit = useCallback((next: AdminState) => {
    setState(next);
    setDirty(true);
    // Best-effort: try IndexedDB, fallback to localStorage on error
    idbSet(KEY, next).catch(() => {
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* quota exceeded or storage disabled */
      }
    });
  }, []);

  const api = useMemo<AdminApi>(() => {
    const withProducts = (products: ProductDraft[]) => commit({ ...state, products });

    return {
      ...state,
      ready,
      dirty,
      groups: GROUPS,
      saveProduct: (p) => {
        const exists = state.products.some((x) => x.id === p.id);
        withProducts(
          exists ? state.products.map((x) => (x.id === p.id ? { ...x, ...p } : x)) : [p, ...state.products],
        );
      },
      deleteProduct: (id) => withProducts(state.products.filter((x) => x.id !== id)),
      toggleHidden: (id) =>
        withProducts(state.products.map((x) => (x.id === id ? { ...x, hidden: !x.hidden } : x))),
      moveProduct: (id, dir) =>
        withProducts(move(state.products, state.products.findIndex((x) => x.id === id), dir)),
      saveCategory: (c) => {
        const exists = state.categories.some((x) => x.slug === c.slug);
        commit({
          ...state,
          categories: exists
            ? state.categories.map((x) => (x.slug === c.slug ? { ...x, ...c } : x))
            : [...state.categories, c],
        });
      },
      moveCategory: (slug, dir) =>
        commit({
          ...state,
          categories: move(state.categories, state.categories.findIndex((x) => x.slug === slug), dir),
        }),
      saveBrand: (b) => {
        const exists = state.brands.some((x) => x.id === b.id);
        commit({
          ...state,
          brands: exists ? state.brands.map((x) => (x.id === b.id ? { ...x, ...b } : x)) : [...state.brands, b],
        });
      },
      deleteBrand: (id) => commit({ ...state, brands: state.brands.filter((x) => x.id !== id) }),
      moveBrand: (id, dir) =>
        commit({ ...state, brands: move(state.brands, state.brands.findIndex((x) => x.id === id), dir) }),
      findImageOwner: (hash, exceptId) => {
        const p = state.products.find((x) => x.imageHashes?.includes(hash) && x.id !== exceptId);
        if (p) return p.name;
        const c = state.categories.find((x) => x.imageHash === hash && x.slug !== exceptId);
        return c ? c.label : null;
      },
      reset: () => {
        // remove from IDB and localStorage
        idbDel(KEY).catch(() => {});
        try {
          window.localStorage.removeItem(KEY);
        } catch {
          /* ignore */
        }
        setState(baseState());
        setDirty(false);
      },
      exportJson: () => JSON.stringify(state, null, 2),
    };
  }, [state, ready, dirty, commit]);

  return <AdminContext.Provider value={api}>{children}</AdminContext.Provider>;
}

export function useAdminStudio() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdminStudio must be used inside AdminStudioProvider");
  return ctx;
}

export const groupOf = (id: string): GroupId =>
  (GROUPS.find((g) => id.startsWith(g.id))?.id ?? "types") as GroupId;
