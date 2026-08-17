import { MessageCircle, Plus } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { BUSINESS, bookingLink } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { WishlistButton } from "@/components/WishlistButton";
import { formatPrice, type CatalogItem } from "@/data/catalog";
import { trackWhatsAppSubmit } from "@/lib/analytics";

export function ProductCard({ item }: { item: CatalogItem }) {
  const priceLabel = `${formatPrice(item.price)}${item.unit ? ` ${item.unit}` : ""}`;
  const { add } = useCart();

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-card shadow-soft transition-all duration-500 hover:-translate-y-1 hover:shadow-lift">
      <Link to="/product/$slug" params={{ slug: item.id }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
          <img
            src={item.image}
            alt={`${item.name} — ${item.finish}, ${priceLabel} at ${BUSINESS.name}, Newtown, Kolkata`}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 24rem, (min-width: 640px) 45vw, 92vw"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      </Link>
      <WishlistButton id={item.id} name={item.name} className="absolute left-3 top-3 z-10" />

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="font-display text-2xl leading-tight text-foreground">
            <Link to="/product/$slug" params={{ slug: item.id }} className="hover:underline">
              {item.name}
            </Link>
          </h3>
          <p className="mt-1 text-xs text-muted-foreground">{item.finish}</p>
        </div>

        <div className="mt-auto pt-2">
          <div>
            <span className="block text-[0.65rem] uppercase tracking-widest text-muted-foreground">
              Starting
            </span>
            <span className="font-display text-xl text-foreground">{formatPrice(item.price)}</span>
            {item.unit ? (
              <span className="ml-1 text-xs text-muted-foreground">{item.unit}</span>
            ) : null}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              type="button"
              onClick={() =>
                add({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  unit: item.unit,
                  image: item.image,
                })
              }
              aria-label={`Add ${item.name} to booking list`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add to cart
            </button>
            <a
              href={bookingLink(item.name, priceLabel)}
              onClick={() =>
                trackWhatsAppSubmit({
                  source: "product_card",
                  item_name: item.name,
                  value: item.price,
                })
              }
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Book ${item.name} on WhatsApp with ${BUSINESS.name}`}
              className="inline-flex items-center gap-1.5 rounded-sm bg-whatsapp px-3 py-2 text-xs font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
              Book
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
