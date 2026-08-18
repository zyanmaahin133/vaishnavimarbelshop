import { CATALOG, GROUPS, PRICE_BANDS, type GroupId } from "@/data/catalog";
import { isGroupId, isSortId, type SortId } from "@/lib/catalog-search";
import { useNavigate, useSearch } from "@tanstack/react-router";
import CategoryFilter from "@/components/CategoryFilter";
import { ProductCard } from "@/components/ProductCard";
import React, { useMemo } from "react";

const SORTS: { id: SortId; label: string }[] = [
  { id: "featured", label: "Sort: Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "name-asc", label: "Name: A to Z" },
  { id: "name-desc", label: "Name: Z to A" },
];

const PAGE_SIZE = 12;

type Props = {
  initialGroup?: GroupId;
  lockGroup?: boolean;
  showIntro?: boolean;
};

export function Catalog({ initialGroup = "types", lockGroup = false, showIntro = true }: Props) {
  const navigate = useNavigate();
  const search = useSearch({ strict: false }) as {
    group?: string;
    bands?: string;
    q?: string;
    sort?: string;
    page?: number;
    sub?: string;
  };

  const allGroupIds = GROUPS.map((g) => g.id);
  const group: GroupId = lockGroup
    ? initialGroup
    : isGroupId(search.group, allGroupIds)
    ? (search.group as GroupId)
    : initialGroup;
  const sort: SortId = isSortId(search.sort) ? search.sort : "featured";
  const query = search.q ?? "";
  const page = Math.max(1, Number(search.page) || 1);
  const sub = typeof search.sub === "string" ? search.sub : undefined;

  const activeGroup = GROUPS.find((g) => g.id === group)!;
  const groupBands = PRICE_BANDS[group];
  const bands = (search.bands ?? "")
    .split(",")
    .map((b) => b.trim())
    .filter((b) => groupBands.some((gb) => gb.id === b));

  /** Every filter lives in the URL so the exact view can be shared or bookmarked. */
  const setSearch = (patch: Record<string, string | number | undefined>) =>
    navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => {
        const next = { ...prev, ...patch } as Record<string, unknown>;
        for (const k of Object.keys(next)) {
          const v = next[k];
          if (v === undefined || v === "" || (k === "page" && Number(v) <= 1)) delete next[k];
        }
        return next;
      },
      replace: true,
      resetScroll: false,
    });

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = CATALOG.filter((item) => {
      if (item.group !== group) return false;
      if (q && !item.name.toLowerCase().includes(q)) return false;
      if (bands.length === 0 && !sub) return true;
      if (bands.length > 0) {
        const matchedBand = bands.some((id) => {
          const band = groupBands.find((b) => b.id === id);
          return band ? item.price >= band.min && item.price <= band.max : false;
        });
        if (!matchedBand) return false;
      }
      if (sub) {
        // simple matching: check if sub id or keywords appear in name or finish
        const inName = item.name.toLowerCase().includes(sub.toLowerCase());
        const inFinish = item.finish.toLowerCase().includes(sub.toLowerCase());
        return inName || inFinish;
      }
      return true;
    });

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name-asc") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "name-desc") sorted.sort((a, b) => b.name.localeCompare(a.name));

    return sorted;
  }, [group, query, bands, sort, sub]);

  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const paged = items.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold">Showing</div>
          <select
            value={group}
            onChange={(e) => setSearch({ group: e.target.value, page: 1 })}
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
          >
            {GROUPS.map((g) => (
              <option value={g.id} key={g.id}>
                {g.label}
              </option>
            ))}
          </select>

          <CategoryFilter />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={sort}
            onChange={(e) => setSearch({ sort: e.target.value })}
            className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
          >
            {SORTS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paged.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination controls omitted for brevity - existing pages handle page query param */}
    </div>
  );
}
