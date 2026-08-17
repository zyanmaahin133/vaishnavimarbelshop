import { validateCatalogSearch } from "@/lib/catalog-search";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Catalog } from "@/components/Catalog";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { CATEGORIES, categoryBySlug } from "@/data/content";
import { CATALOG } from "@/data/catalog";
import { SITE_URL, absUrl } from "@/lib/site";

export const Route = createFileRoute("/category/$slug")({
  validateSearch: validateCatalogSearch,
  loader: ({ params }) => {
    const category = categoryBySlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Category not found — Aarav Marble House" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const c = loaderData.category;
    const url = `${SITE_URL}/category/${params.slug}`;
    return {
      meta: [
        { title: c.title },
        { name: "description", content: c.description },
        { property: "og:title", content: c.title },
        { property: "og:description", content: c.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:image", content: absUrl(c.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: absUrl(c.image) },
      ],
      links: [{ rel: "canonical", href: `/category/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: c.label, path: `/category/${params.slug}` },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: c.label,
            description: c.description,
            url,
          }),
        },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-28 text-center">
        <h1 className="font-display text-4xl">Category not found</h1>
        <Link to="/products" className="mt-6 inline-block text-sm underline">
          Back to products
        </Link>
      </div>
    </PageShell>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const count = CATALOG.filter((i) => i.group === category.id).length;
  const others = CATEGORIES.filter((c) => c.slug !== category.slug);

  return (
    <PageShell>
      <section className="relative isolate overflow-hidden">
        <img
          src={category.image}
          alt={`${category.label} — ${category.intro}`}
          width={1600}
          height={900}
          sizes="100vw"
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="hero-veil absolute inset-0 -z-10" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <p className="text-xs uppercase tracking-widest text-gold">{count} items listed</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-tight text-primary-foreground sm:text-6xl">
            {category.label}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-primary-foreground/80">
            {category.intro}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Products", to: "/products" },
            { label: category.label },
          ]}
        />

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {category.body.map((para: string) => (
            <p key={para.slice(0, 30)} className="text-sm leading-relaxed text-muted-foreground">
              {para}
            </p>
          ))}
        </div>

        <div className="mt-14">
          <Catalog initialGroup={category.id} lockGroup showIntro={false} />
        </div>

        <section className="mt-20 border-t border-border pt-10">
          <h2 className="font-display text-3xl">Other categories</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {others.map((o) => (
              <Link
                key={o.slug}
                to="/category/$slug"
                params={{ slug: o.slug }}
                className="rounded-sm border border-border bg-card p-5 shadow-soft transition-colors hover:border-gold"
              >
                <h3 className="font-display text-2xl text-foreground">{o.label}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.intro}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageShell>
  );
}
