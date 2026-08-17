import { Link } from "@tanstack/react-router";
import { mainCategories } from "@/data/categories";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-sm px-4 py-2 text-sm font-semibold text-foreground hover:text-gold transition-colors"
      >
        Categories
        <ChevronDown className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 rounded-sm border border-border bg-card shadow-lg z-50">
          <div className="p-4">
            <Link
              to="/categories"
              onClick={() => setIsOpen(false)}
              className="block rounded-sm px-4 py-2 text-sm font-medium text-foreground hover:bg-secondary"
            >
              All Categories
            </Link>
          </div>
          <div className="border-t border-border">
            {mainCategories.map((category) => (
              <div key={category.id} className="border-b border-border last:border-b-0">
                <Link
                  to="/categories/$categoryId"
                  params={{ categoryId: category.id }}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-secondary"
                >
                  {category.name}
                </Link>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="bg-secondary/30 px-4 py-2">
                    {category.subcategories.map((subcat) => (
                      <Link
                        key={subcat.id}
                        to="/categories/$categoryId/$subcategoryId"
                        params={{
                          categoryId: category.id,
                          subcategoryId: subcat.id,
                        }}
                        onClick={() => setIsOpen(false)}
                        className="block px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground"
                      >
                        • {subcat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
