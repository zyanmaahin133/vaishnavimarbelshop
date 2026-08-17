import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MessageCircle, ChevronLeft } from "lucide-react";
import { SiteFooter, SiteHeader, WhatsAppFab } from "@/components/Chrome";
import { BUSINESS, bookingLink } from "@/lib/business";
import { itemTemplateLink, templateForItem } from "@/lib/templates";
import { CATALOG, formatPrice, getCatalogItem, groupLabel } from "@/data/catalog";
import { SITE_URL, absUrl } from "@/lib/site";
import { breadcrumbJsonLd } from "@/components/Breadcrumbs";

const describe = (name: string, group: string, finish: string, price: string) =>
  `${name} price ${price} at ${BUSINESS.name}, Newtown, Kolkata. ${group} · ${finish}. Book on WhatsApp for sizes, availability and a final quotation.`;

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const item = getCatalogItem(params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Item not found — Aarav Marble House" }, { name: "robots", content: "noindex" }],
      };
    }
    const { item } = loaderData;
    const priceLabel = `${formatPrice(item.price)}${item.unit ? ` ${item.unit}` : ""}`;
    const title = `${item.name} Price ${formatPrice(item.price)} — ${BUSINESS.name}`;
    const description = describe(item.name, groupLabel(item.group), item.finish, priceLabel);
    const path = `/product/${params.slug}`;
    const url = `${SITE_URL}${path}`;

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { property: "og:url", content: url },
        { property: "og:image", content: absUrl(item.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: absUrl(item.image) },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Products", path: "/products" },
            { name: groupLabel(item.group), path: "/products" },
            { name: item.name, path },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: item.name,
            image: absUrl(item.image),
            description,
            category: groupLabel(item.group),
            brand: { "@type": "Brand", name: BUSINESS.name },
            offers: {
              "@type": "Offer",
              price: item.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
              url,
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: ItemNotFound,
  component: ProductPage,
});

function ItemNotFound() {
  return (
    <div className="min-h-screen bg-background">
      <main className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="font-display text-4xl text-foreground">Item not found</h1>
        <p className="mt-3 text-muted-foreground">
          This piece is no longer listed. Browse the full catalogue instead.
        </p>
        <Link to="/" className="mt-6 inline-block text-sm underline">
          Back to catalogue
        </Link>
      </main>
    </div>
  );
}

function ProductPage() {
  const { item } = Route.useLoaderData();
  const priceLabel = `${formatPrice(item.price)}${item.unit ? ` ${item.unit}` : ""}`;
  const related = CATALOG.filter((i) => i.group === item.group && i.id !== item.id).slice(0, 4);

  return (
    <div id="top" className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 sm:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Catalogue
        </Link>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div className="overflow-hidden rounded-sm border border-border bg-secondary">
            <img
              src={item.image}
              alt={`${item.name} — ${item.finish}`}
              width={1024}
              height={768}
              sizes="(min-width: 768px) 50vw, 100vw"
              decoding="async"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              {groupLabel(item.group)}
            </span>
            <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
              {item.name}
            </h1>
            <p className="mt-3 text-sm text-muted-foreground">{item.finish}</p>

            <div className="mt-8 border-y border-border py-5">
              <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
                Starting rate
              </span>
              <span className="font-display text-3xl text-foreground">
                {formatPrice(item.price)}
              </span>
              {item.unit ? (
                <span className="ml-2 text-sm text-muted-foreground">{item.unit}</span>
              ) : null}
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              {describe(item.name, groupLabel(item.group), item.finish, priceLabel)}
            </p>

            <a
              href={bookingLink(item.name, priceLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-sm bg-whatsapp px-6 py-3 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Book on WhatsApp
            </a>

            <a
              href={itemTemplateLink(item.name, item.group, priceLabel)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex w-fit items-center gap-2 rounded-sm border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <MessageCircle className="h-4 w-4 text-whatsapp" aria-hidden="true" />
              One-click preset: {templateForItem(item.name, item.group).label}
            </a>
          </div>
        </div>

        {related.length ? (
          <section className="mt-20">
            <h2 className="font-display text-2xl text-foreground">More in {groupLabel(item.group)}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/product/$slug"
                  params={{ slug: r.id }}
                  className="group overflow-hidden rounded-sm border border-border bg-card shadow-soft"
                >
                  <img
                    src={r.image}
                    alt={`${r.name} — ${r.finish}, ${formatPrice(r.price)}`}
                    loading="lazy"
                    decoding="async"
                    width={640}
                    height={480}
                    sizes="(min-width: 1024px) 15rem, 45vw"
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <h3 className="font-display text-lg text-foreground">{r.name}</h3>
                    <p className="text-xs text-muted-foreground">{formatPrice(r.price)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <SiteFooter />
      <WhatsAppFab />
    </div>
  );
}
