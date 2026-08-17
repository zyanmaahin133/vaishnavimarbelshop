import { validateCatalogSearch } from "@/lib/catalog-search";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Catalog } from "@/components/Catalog";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { SITE_URL, absUrl } from "@/lib/site";
import catTypes from "@/assets/cat-types.jpg";

const title = "Marble Price List 2026 — Rates per sq ft & per piece | Aarav Marble House";
const description =
  "Full marble price list from Newtown, Kolkata: marble types per sq ft, god statues, flooring, countertops, mandirs and brand stock. Filter by price band and book on WhatsApp.";

export const Route = createFileRoute("/price-list")({
  validateSearch: validateCatalogSearch,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/price-list` },
      { property: "og:image", content: absUrl(catTypes) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(catTypes) },
    ],
    links: [{ rel: "canonical", href: "/price-list" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Price List", path: "/price-list" },
        ]),
      },
    ],
  }),
  component: PriceListPage,
});

function PriceListPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Price List" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Rates · 2026</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Marble price list</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            All 89 items with indicative starting rates. Marble types and brands are quoted per
            square foot, statues and furniture per piece, and laid work per square foot including
            fitting. Switch category, filter by price band, add to cart and send the list on
            WhatsApp for a firm quotation.
          </p>
        </header>

        <div className="mt-12">
          <Catalog showIntro={false} />
        </div>
      </div>
    </PageShell>
  );
}
