import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Link2, MessageCircle, Trash2 } from "lucide-react";
import { PageShell } from "@/components/Chrome";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CATALOG, formatPrice } from "@/data/catalog";
import { parseSharedIds, useWishlist } from "@/lib/wishlist";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { track } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";

const title = "My Marble Wishlist — Aarav Marble House";
const description =
  "Save marble, statues and house products you like, then share the list with family or send it straight to Aarav Marble House on WhatsApp.";

export const Route = createFileRoute("/wishlist")({
  validateSearch: (search: Record<string, unknown>): { ids?: string } =>
    typeof search.ids === "string" ? { ids: search.ids } : {},
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/wishlist` },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { ids: search } = Route.useSearch();
  const { ids: mine, remove, clear, shareQuery } = useWishlist();
  const [copied, setCopied] = useState(false);

  const shared = parseSharedIds(search);
  const isShared = shared.length > 0;
  const ids = isShared ? shared : mine;

  const items = ids
    .map((id) => CATALOG.find((i) => i.id === id))
    .filter((i): i is (typeof CATALOG)[number] => Boolean(i));
  const total = items.reduce((n, i) => n + i.price, 0);

  const shareUrl = `${SITE_URL}/wishlist?ids=${encodeURIComponent(isShared ? shared.join(",") : shareQuery)}`;
  const waMessage =
    `Namaste ${BUSINESS.name}!\n\nThis is my shortlist:\n` +
    items.map((i, n) => `${n + 1}. ${i.name} — ${formatPrice(i.price)} ${i.unit}`).join("\n") +
    `\n\nList link: ${shareUrl}\n\nPlease share availability and a final quotation.`;

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      track("share_wishlist", { method: "copy_link", items: items.length });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">{isShared ? "Shared list" : "Saved by you"}</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">
            {isShared ? "A shared marble shortlist" : "My marble wishlist"}
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {isShared
              ? "Someone shared these pieces with you. Add them to the cart or send the whole list to us on WhatsApp."
              : "Tap the heart on any product to save it here. Share the link with your family or send the list to us for a quotation."}
          </p>
        </header>

        {items.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-border py-5">
            <span className="text-sm text-muted-foreground">
              {items.length} item{items.length > 1 ? "s" : ""} · indicative from{" "}
              <span className="font-semibold text-foreground">{formatPrice(total)}</span>
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={copyLink}
                className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
              >
                <Link2 className="h-3.5 w-3.5" aria-hidden="true" />
                {copied ? "Link copied" : "Copy share link"}
              </button>
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("share_wishlist", { method: "whatsapp", items: items.length })}
                className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-4 py-2.5 text-xs font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Send list on WhatsApp
              </a>
              {!isShared && (
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex items-center gap-2 rounded-sm border border-border px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:border-destructive hover:text-destructive"
                >
                  <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
                  Clear
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        {items.length === 0 ? (
          <div className="rounded-sm border border-border bg-card p-12 text-center shadow-soft">
            <Heart className="mx-auto h-8 w-8 text-gold" aria-hidden="true" />
            <h2 className="mt-4 font-display text-3xl text-foreground">Nothing saved yet</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Browse the catalogue and tap the heart on any marble, statue or house product to build
              your shortlist.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Browse products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item) => (
              <div key={item.id} className="relative">
                <ProductCard item={item} />
                {!isShared && (
                  <button
                    type="button"
                    onClick={() => remove(item.id)}
                    aria-label={`Remove ${item.name} from wishlist`}
                    className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/90 text-muted-foreground backdrop-blur transition-colors hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
