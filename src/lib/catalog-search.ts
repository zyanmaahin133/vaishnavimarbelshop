import type { GroupId } from "@/data/catalog";

export type SortId = "featured" | "price-asc" | "price-desc" | "name-asc" | "name-desc";

export type CatalogSearch = {
  group?: string;
  bands?: string;
  q?: string;
  sort?: string;
  page?: number;
};

/**
 * Lenient parser for the shareable catalogue query string:
 * ?group=statues&bands=mid,premium&q=ganesha&sort=price-asc&page=2
 * Unknown values are kept as-is and validated in the component.
 */
export function validateCatalogSearch(search: Record<string, unknown>): CatalogSearch {
  const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  const page = Number(search["page"]);
  return {
    group: str(search["group"]),
    bands: str(search["bands"]),
    q: str(search["q"]),
    sort: str(search["sort"]),
    page: Number.isFinite(page) && page > 1 ? Math.floor(page) : undefined,
  };
}

export const SORT_IDS: SortId[] = [
  "featured",
  "price-asc",
  "price-desc",
  "name-asc",
  "name-desc",
];

export const isSortId = (v: string | undefined): v is SortId =>
  !!v && (SORT_IDS as string[]).includes(v);

export const isGroupId = (v: string | undefined, groups: GroupId[]): v is GroupId =>
  !!v && (groups as string[]).includes(v);
