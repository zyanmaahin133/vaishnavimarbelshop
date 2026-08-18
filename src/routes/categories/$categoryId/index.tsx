import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { mainCategories } from "@/data/categories";
import { PageShell } from "@/components/Chrome";
import { ProductCard } from "@/components/ProductCard";

export const Route = createFileRoute("/categories/$categoryId/")({
  head: ({ params }) => {
    const category = mainCategories.find((c) => c.id === params.categoryId);
    return {
      meta: [
        { title: `${category?.name} — Vaishnavi Marble Shop` },
        {
          name: "description",
          content: category?.description || `Browse our ${category?.name} collection`,
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { categoryId } = useParams({ from: "/categories/$categoryId" });
  const category = mainCategories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Category not found</h1>
            <Link
              to="/categories"
              className="mt-6 inline-block text-gold hover:underline"
            >
              ← Back to categories
            </Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="mt-8">
            <Link
              to="/categories"
              className="text-sm text-gold hover:underline"
            >
              ← Back to categories
            </Link>
            <h1 className="mt-4 text-5xl font-bold text-foreground sm:text-6xl">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-4 text-lg text-muted-foreground">
                {category.description}
              </p>
            )}
          </div>
        </div>

        {/* Subcategories */}
        {category.subcategories && category.subcategories.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-3xl font-bold text-foreground">
              Subcategories
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.subcategories.map((subcat) => (
                <Link
                  key={subcat.id}
                  to="/categories/$categoryId/$subcategoryId"
                  params={{
                    categoryId: category.id,
                    subcategoryId: subcat.id,
                  }}
                  className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
                >
                  {subcat.image && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={subcat.image}
                        alt={subcat.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground">
                      {subcat.name}
                    </h3>
                    {subcat.seoTopics && subcat.seoTopics.length > 0 && (
                      <p className="mt-2 text-xs text-gold font-semibold">
                        {subcat.seoTopics.length} items →
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* SEO Topics List */}
        {category.subcategories && (
          <div className="mt-20 border-t border-border pt-12">
            <h2 className="mb-8 text-3xl font-bold text-foreground">
              Popular Items
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {category.subcategories.flatMap((subcat) =>
                subcat.seoTopics?.map((topic) => (
                  <div
                    key={`${subcat.id}-${topic}`}
                    className="rounded-lg border border-border/50 bg-card/50 px-4 py-3 transition-colors hover:bg-card hover:border-border"
                  >
                    <p className="text-sm font-medium text-foreground">
                      {topic}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </PageShell>
  );
}
