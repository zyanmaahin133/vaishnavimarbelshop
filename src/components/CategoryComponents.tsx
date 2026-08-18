import { useMemo } from "react";
import { Link } from "@tanstack/react-router";
import { mainCategories } from "@/data/categories";

export function CategoryNav() {
  const categories = useMemo(() => mainCategories, []);

  return (
    <nav className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-8 overflow-x-auto py-4">
          <Link
            to="/categories"
            className="flex-shrink-0 font-semibold text-foreground hover:text-gold"
          >
            All Categories
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              to="/categories/$categoryId"
              params={{ categoryId: category.id }}
              className="flex-shrink-0 text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

export function CategoryCard({ category }: { category: (typeof mainCategories)[0] }) {
  return (
    <Link
      to="/categories/$categoryId"
      params={{ categoryId: category.id }}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg"
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
        <h3 className="text-xl font-bold text-foreground">{category.name}</h3>
        {category.description && (
          <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
        )}
        <span className="mt-4 inline-block text-xs uppercase tracking-widest text-gold font-semibold">
          Explore →
        </span>
      </div>
    </Link>
  );
}

export function SubcategoryCard({
  category,
  subcategory,
}: {
  category: (typeof mainCategories)[0];
  subcategory: (typeof mainCategories)[0]["subcategories"][0];
}) {
  return (
    <Link
      to="/categories/$categoryId/$subcategoryId"
      params={{
        categoryId: category.id,
        subcategoryId: subcategory.id,
      }}
      className="group block overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md"
    >
      {subcategory.image && (
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={subcategory.image}
            alt={subcategory.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      )}
      <div className="p-6">
        <h4 className="font-bold text-foreground">{subcategory.name}</h4>
        {subcategory.seoTopics && subcategory.seoTopics.length > 0 && (
          <p className="mt-2 text-xs text-gold font-semibold">
            {subcategory.seoTopics.length} items
          </p>
        )}
      </div>
    </Link>
  );
}
