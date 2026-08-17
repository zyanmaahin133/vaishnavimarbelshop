import { createFileRoute, Link } from "@tanstack/react-router";
import { mainCategories } from "@/data/categories";
import { PageShell } from "@/components/Chrome";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Vaishnavi Marble Shop" },
      { name: "description", content: "Browse all our marble, tiles, sanitaryware and home products" },
    ],
  }),
  component: CategoriesIndex,
});

function CategoriesIndex() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="mb-16 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
            Shop by Category
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our complete range of marble, tiles, and home products
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {mainCategories.map((category) => (
            <Link
              key={category.id}
              to="/categories/$categoryId"
              params={{ categoryId: category.id }}
              className="group block overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:shadow-md"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {category.name}
                </h2>
                {category.description && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {category.description}
                  </p>
                )}
                {category.subcategories && (
                  <p className="mt-4 text-xs text-gold font-semibold">
                    {category.subcategories.length} subcategories →
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
