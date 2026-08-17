import { createFileRoute, useParams, Link } from "@tanstack/react-router";
import { mainCategories } from "@/data/categories";
import { PageShell } from "@/components/Chrome";

export const Route = createFileRoute("/categories/$categoryId/$subcategoryId")({
  head: ({ params }) => {
    const category = mainCategories.find((c) => c.id === params.categoryId);
    const subcategory = category?.subcategories?.find(
      (s) => s.id === params.subcategoryId
    );
    return {
      meta: [
        {
          title: `${subcategory?.name} — Vaishnavi Marble Shop`,
        },
        {
          name: "description",
          content: `Browse our collection of ${subcategory?.name}`,
        },
      ],
    };
  },
  component: SubcategoryPage,
});

function SubcategoryPage() {
  const { categoryId, subcategoryId } = useParams({
    from: "/categories/$categoryId/$subcategoryId",
  });

  const category = mainCategories.find((c) => c.id === categoryId);
  const subcategory = category?.subcategories?.find(
    (s) => s.id === subcategoryId
  );

  if (!category || !subcategory) {
    return (
      <PageShell>
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold">Item not found</h1>
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
        {/* Breadcrumb */}
        <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
          <Link to="/categories" className="hover:text-foreground">
            Categories
          </Link>
          <span>/</span>
          <Link
            to="/categories/$categoryId"
            params={{ categoryId: category.id }}
            className="hover:text-foreground"
          >
            {category.name}
          </Link>
          <span>/</span>
          <span className="text-foreground">{subcategory.name}</span>
        </div>

        {/* Hero */}
        {subcategory.image && (
          <div className="mb-12 aspect-[16/9] overflow-hidden rounded-lg">
            <img
              src={subcategory.image}
              alt={subcategory.name}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <h1 className="text-5xl font-bold text-foreground sm:text-6xl">
          {subcategory.name}
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Explore our complete range of {subcategory.name.toLowerCase()}
        </p>

        {/* SEO Topics Grid */}
        {subcategory.seoTopics && subcategory.seoTopics.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-8 text-2xl font-bold text-foreground">
              Available Options
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {subcategory.seoTopics.map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-4 rounded-lg border border-border bg-card p-6 transition-all hover:border-gold hover:shadow-md"
                >
                  <div className="h-12 w-12 rounded-lg bg-gold/10 flex items-center justify-center">
                    <span className="text-lg">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{topic}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Click to view products
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-20 rounded-lg bg-secondary/50 p-12 text-center">
          <h3 className="text-2xl font-bold text-foreground">
            Looking for something specific?
          </h3>
          <p className="mt-2 text-muted-foreground">
            Contact us for custom orders and bulk purchases
          </p>
          <button className="mt-6 rounded-sm bg-gold px-8 py-3 font-semibold text-gold-foreground hover:opacity-90">
            Contact Us
          </button>
        </div>
      </div>
    </PageShell>
  );
}
