/**
 * Lightweight, dependency-free analytics layer.
 *
 * Events are pushed to `window.dataLayer` (GTM), forwarded to `gtag` and
 * `fbq` when present, and mirrored to a local ring buffer so conversions can
 * be inspected in the browser console via `window.__vmAnalytics`.
 */

export type AnalyticsEvent =
  | "add_to_cart"
  | "remove_from_cart"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "share_wishlist"
  | "whatsapp_template"
  | "begin_checkout"
  | "whatsapp_submit";

type Payload = Record<string, string | number | boolean | undefined>;

type W = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
  __vmAnalytics?: { event: AnalyticsEvent; payload: Payload; at: string }[];
};

const MAX_BUFFER = 50;

export function track(event: AnalyticsEvent, payload: Payload = {}) {
  if (typeof window === "undefined") return;
  const w = window as W;
  const enriched: Payload = {
    currency: "INR",
    page_path: window.location.pathname,
    ...payload,
  };

  try {
    w.dataLayer = w.dataLayer ?? [];
    w.dataLayer.push({ event, ...enriched });
    w.gtag?.("event", event, enriched);
    if (event === "add_to_cart") w.fbq?.("track", "AddToCart", enriched);
    if (event === "begin_checkout") w.fbq?.("track", "InitiateCheckout", enriched);
    if (event === "whatsapp_submit") w.fbq?.("track", "Lead", enriched);

    w.__vmAnalytics = [
      ...(w.__vmAnalytics ?? []),
      { event, payload: enriched, at: new Date().toISOString() },
    ].slice(-MAX_BUFFER);
  } catch {
    /* analytics must never break the UI */
  }
}

export const trackAddToCart = (p: {
  item_id: string;
  item_name: string;
  price: number;
  quantity: number;
}) => track("add_to_cart", { ...p, value: p.price * p.quantity });

export const trackBeginCheckout = (p: { items: number; quantity: number; value: number }) =>
  track("begin_checkout", { ...p, method: "whatsapp" });

export const trackWhatsAppSubmit = (p: { source: string; item_name?: string; value?: number }) =>
  track("whatsapp_submit", p);
