import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { formatPrice } from "@/data/catalog";
import { trackAddToCart, track } from "@/lib/analytics";


export type CartLine = {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  qty: number;
};

type CartApi = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  note: string;
  setNote: (v: string) => void;
  delivery: string;
  setDelivery: (v: string) => void;
  orderMessage: () => string;
};

const CartContext = createContext<CartApi | null>(null);
const KEY = "vm-cart-v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [delivery, setDelivery] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(lines));
    } catch {
      /* ignore */
    }
  }, [lines, hydrated]);

  const add: CartApi["add"] = useCallback((line, qty = 1) => {
    setLines((prev) => {
      const found = prev.find((l) => l.id === line.id);
      if (found) return prev.map((l) => (l.id === line.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { ...line, qty }];
    });
    trackAddToCart({
      item_id: line.id,
      item_name: line.name,
      price: line.price,
      quantity: qty,
    });
    setOpen(true);
  }, []);

  const setQty: CartApi["setQty"] = useCallback((id, qty) => {
    setLines((prev) =>
      qty <= 0 ? prev.filter((l) => l.id !== id) : prev.map((l) => (l.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove: CartApi["remove"] = useCallback((id) => {
    track("remove_from_cart", { item_id: id });
    setLines((prev) => prev.filter((l) => l.id !== id));
  }, []);


  const clear = useCallback(() => setLines([]), []);

  const value = useMemo<CartApi>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.price, 0);
    const orderMessage = () =>
      `Namaste ${BUSINESS.name}!\n\nI want to book these items:\n` +
      lines
        .map(
          (l, i) =>
            `${i + 1}. ${l.name} — ${l.qty} × ${formatPrice(l.price)}${l.unit ? ` ${l.unit}` : ""}`,
        )
        .join("\n") +
      `\n\nIndicative total: ${formatPrice(total)}` +
      (delivery.trim() ? `\n\nDelivery / location: ${delivery.trim()}` : "") +
      (note.trim() ? `\nNote: ${note.trim()}` : "") +
      `\n\nPlease confirm availability, sizes and final quotation.`;

    return {
      lines,
      count,
      total,
      open,
      setOpen,
      add,
      setQty,
      remove,
      clear,
      note,
      setNote,
      delivery,
      setDelivery,
      orderMessage,
    };
  }, [lines, open, add, setQty, remove, clear, note, delivery]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export const cartWhatsAppLink = (message: string) => whatsappLink(message);
