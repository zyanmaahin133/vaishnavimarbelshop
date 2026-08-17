import React, { useMemo } from "react";
import { TAXONOMY, type Category, type Subcategory } from "@/data/taxonomy";
import { useNavigate, useSearch } from "@tanstack/react-router";

export default function CategoryFilter({ group }: { group?: string }) {
  const navigate = useNavigate();
  const search = useSearch() as Record<string, unknown>;
  const currentSub = typeof search.sub === "string" ? search.sub : undefined;

  const allSubs = useMemo(() => TAXONOMY.flatMap((c) => c.subcategories), []);

  function setSub(sub?: string) {
    navigate({
      to: ".",
      search: (prev: Record<string, unknown>) => {
        const next = { ...prev } as Record<string, unknown>;
        if (sub) next["sub"] = sub;
        else delete next["sub"];
        return next;
      },
      replace: true,
      resetScroll: false,
    });
  }

  return (
    <div className="flex items-center gap-3">
      <label className="text-sm font-semibold">Filter:</label>
      <select
        value={currentSub ?? ""}
        onChange={(e) => setSub(e.target.value || undefined)}
        className="rounded-sm border border-border bg-background px-3 py-2 text-sm"
      >
        <option value="">All subcategories</option>
        {TAXONOMY.map((c: Category) => (
          <optgroup label={c.label} key={c.id}>
            {c.subcategories.map((s: Subcategory) => (
              <option value={s.id} key={s.id}>
                {s.label}
              </option>
            ))}
          </optgroup>
        ))}
      </select>
    </div>
  );
}
