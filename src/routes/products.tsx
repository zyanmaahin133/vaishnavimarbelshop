import { validateCatalogSearch } from "@/lib/catalog-search";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { Catalog } from "@/components/Catalog";
import { CATALOG } from "@/data/catalog";
import { CATEGORIES } from "@/data/content";
import { BUSINESS } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";
import catTypes from "@/assets/cat-types.jpg";

const title = "Marble Products — Slabs, Statues, Flooring & Brands | Aarav Marble House";
const description =
  "Explore 89 marble products across four categories: marble types, hand-carved god statues, marble house products and authorised brand stock, with prices and WhatsApp booking.";

export const Route = createFileRoute("/products")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/products` },
      { property: "og:image", content: absUrl(catTypes) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(catTypes) },
    ],
    links: [{ rel: "canonical", href: "/products" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ]),
      },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Products" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Complete range</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Marble products & categories</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {BUSINESS.name} carries 89 listed products across four categories. Each category page
            carries its own rates, price filters and WhatsApp booking, so you can go straight to the
            part of the yard you need.
          </p>
        </header>

        <div className="mt-14 space-y-8">
          {CATEGORIES.map((c) => {
            const count = CATALOG.filter((i) => i.group === c.id).length;
            const preview = CATALOG.filter((i) => i.group === c.id).slice(0, 6);
            return (
              <section
                key={c.slug}
                className="overflow-hidden rounded-sm border border-border bg-card shadow-soft lg:flex"
              >
                <img
                  src={c.image}
                  alt={`${c.label} — ${c.intro}`}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="h-56 w-full object-cover lg:h-auto lg:w-2/5"
                />
                <div className="flex-1 p-7">
                  <p className="text-xs uppercase tracking-widest text-gold">{count} items</p>
                  <h2 className="mt-2 font-display text-3xl text-foreground">{c.label}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.body[0]}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {preview.map((p) => (
                      <li
                        key={p.id}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                      >
                        {p.name}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    className="mt-6 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
                  >
                    View {c.label} & prices
                  </Link>
                </div>
              </section>
            );
          })}
        </div>

        <div className="mt-20">
          <Catalog />
        </div>
      </div>
    </PageShell>
  );
}
