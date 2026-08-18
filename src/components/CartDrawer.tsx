import { Minus, Plus, MessageCircle, Trash2, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { whatsappLink } from "@/lib/business";
import { formatPrice } from "@/data/catalog";
import { trackBeginCheckout } from "@/lib/analytics";

export function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear, total, orderMessage, note, setNote, delivery, setDelivery } =
    useCart();

  if (!open) return null;

  const message = orderMessage();

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-foreground/50"
      />
      <aside className="relative flex h-full w-full max-w-md flex-col bg-card shadow-lift">
        <header className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-2xl">Your booking list</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close cart">
            <X className="h-5 w-5 text-muted-foreground hover:text-foreground" />
          </button>
        </header>

        {lines.length === 0 ? (
          <p className="p-8 text-sm text-muted-foreground">
            Your list is empty. Add marble, statues or house products and send the whole list to us
            on WhatsApp in one message.
          </p>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-border overflow-y-auto">
              {lines.map((l) => (
                <li key={l.id} className="flex gap-3 p-4">
                  <img
                    src={l.image}
                    alt={l.name}
                    loading="lazy"
                    width={96}
                    height={96}
                    className="h-20 w-20 shrink-0 rounded-sm object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-lg text-foreground">{l.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatPrice(l.price)} {l.unit}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${l.name}`}
                        onClick={() => setQty(l.id, l.qty - 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-border"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-sm">{l.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${l.name}`}
                        onClick={() => setQty(l.id, l.qty + 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-sm border border-border"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Remove ${l.name}`}
                        onClick={() => remove(l.id)}
                        className="ml-auto text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border bg-secondary/40 p-5">
              <label className="block">
                <span className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  Delivery address / location
                </span>
                <input
                  value={delivery}
                  onChange={(e) => setDelivery(e.target.value)}
                  placeholder="Flat 2B, Salt Lake Sector V, Kolkata"
                  className="w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-ring"
                />
              </label>
              <label className="mt-4 block">
                <span className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                  Custom note
                </span>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Sizes, finish, delivery date or any special instruction"
                  className="w-full resize-none rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-ring"
                />
              </label>
              <p className="mt-2 text-xs text-muted-foreground">
                Both are added to your WhatsApp message along with the items and total.
              </p>

              <div className="mt-4 rounded-sm border border-border bg-background p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
                    WhatsApp message preview
                  </span>
                  <span
                    className={`text-[0.65rem] tabular-nums ${
                      message.length > 1000 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {message.length} chars
                  </span>
                </div>
                <pre className="mt-2 max-h-40 overflow-y-auto whitespace-pre-wrap font-sans text-xs leading-relaxed text-foreground">
                  {message}
                </pre>
              </div>
            </div>


            <footer className="border-t border-border p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-muted-foreground">
                  Indicative total
                </span>
                <span className="font-display text-2xl text-foreground">{formatPrice(total)}</span>
              </div>
              <a
                href={whatsappLink(message)}
                onClick={() =>
                  trackBeginCheckout({
                    items: lines.length,
                    quantity: lines.reduce((n, l) => n + l.qty, 0),
                    value: total,
                  })
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Book on WhatsApp
              </a>
              <button
                type="button"
                onClick={clear}
                className="mt-3 w-full text-center text-xs text-muted-foreground underline-offset-4 hover:underline"
              >
                Clear list
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Prices are indicative. Final quotation is confirmed on WhatsApp.
              </p>
            </footer>
          </>
        )}
      </aside>
    </div>
  );
}
