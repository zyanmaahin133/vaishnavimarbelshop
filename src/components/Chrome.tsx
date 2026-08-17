import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Heart, Menu, MessageCircle, Phone, ShoppingBag, X } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { CartDrawer } from "@/components/CartDrawer";
import { CATEGORIES } from "@/data/content";
import { SOCIALS } from "@/lib/socials";
import { Facebook, Instagram, ShoppingCart } from "lucide-react";

const SOCIAL_ICON = { instagram: Instagram, facebook: Facebook, shopify: ShoppingCart, whatsapp: MessageCircle } as const;

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/price-list", label: "Price List" },
  { to: "/videos", label: "Video Gallery" },
  { to: "/blog", label: "Blog" },
  { to: "/contact", label: "Contact Us" },
] as const;

const linkBase =
  "relative py-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-0.5 after:h-[2px] after:scale-x-0 after:bg-gold after:transition-transform hover:after:scale-x-100";
const linkActive = "text-foreground after:scale-x-100";

export function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const { count, setOpen } = useCart();
  const { count: saved } = useWishlist();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMenu(false);
  }, [pathname]);

  return (
    <>
      <div className="hidden bg-primary text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-2 text-xs sm:px-8">
          <p className="text-primary-foreground/70">{BUSINESS.address}</p>
          <div className="flex items-center gap-6">
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-1.5 hover:text-gold"
            >
              <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {BUSINESS.phoneDisplay}
            </a>
            <span className="text-primary-foreground/70">{BUSINESS.hours}</span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-border bg-background/90 shadow-soft backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <img src="/logo.svg" alt="VAISHNAVI MARBLE" className="h-10 w-10 rounded-sm object-contain" />
            <div className="flex flex-col leading-none">
              <span className="font-display text-xl tracking-wide text-foreground sm:text-2xl">
                {BUSINESS.name}
              </span>
              <span className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground sm:text-[0.7rem]">
                {BUSINESS.tagline}
              </span>
            </div>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-5 lg:flex xl:gap-7">
            {NAV.map((n) =>
              n.to === "/products" ? (
                <div key={n.to} className="group relative">
                  <Link
                    to={n.to}
                    activeProps={{ className: linkActive }}
                    className={`${linkBase} inline-flex items-center gap-1`}
                  >
                    {n.label}
                    <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus:visible group-focus:opacity-100">
                    <ul className="overflow-hidden rounded-sm border border-border bg-card py-1 shadow-lift">
                      {CATEGORIES.map((c) => (
                        <li key={c.slug}>
                          <Link
                            to="/category/$slug"
                            params={{ slug: c.slug }}
                            className="block px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-gold-soft hover:text-foreground"
                          >
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <Link
                  key={n.to}
                  to={n.to}
                  activeOptions={{ exact: n.to === "/" }}
                  activeProps={{ className: linkActive }}
                  className={linkBase}
                >
                  {n.label}
                </Link>
              ),
            )}
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={whatsappLink(`Namaste ${BUSINESS.name}! I'd like a marble quotation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-sm bg-whatsapp px-4 py-2.5 text-xs font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90 sm:inline-flex"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <Link
              to="/wishlist"
              aria-label={`Wishlist, ${saved} saved items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <Heart className="h-4 w-4" aria-hidden="true" />
              {saved > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-accent-foreground">
                  {saved}
                </span>
              )}
            </Link>
            <a
              href={`tel:${BUSINESS.phone}`}
              aria-label={`Call ${BUSINESS.name}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Open cart, ${count} items`}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <ShoppingBag className="h-4 w-4" aria-hidden="true" />
              {count > 0 && (
                <span className="absolute -right-1.5 -top-1.5 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[0.65rem] font-bold text-accent-foreground">
                  {count}
                </span>
              )}
            </button>
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={menu}
              className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-border text-foreground lg:hidden"
            >
              {menu ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {menu && (
          <nav aria-label="Mobile" className="border-t border-border bg-card lg:hidden">
            <ul className="mx-auto max-h-[70vh] max-w-7xl overflow-y-auto px-5 py-2 sm:px-8">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link
                    to={n.to}
                    onClick={() => setMenu(false)}
                    activeOptions={{ exact: n.to === "/" }}
                    activeProps={{ className: "text-gold" }}
                    className="block border-b border-border/60 py-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {n.label}
                  </Link>
                </li>
              ))}
              {CATEGORIES.map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/category/$slug"
                    params={{ slug: c.slug }}
                    onClick={() => setMenu(false)}
                    className="block border-b border-border/60 py-3 pl-4 text-sm text-muted-foreground"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <CartDrawer />
    </>
  );
}


export function SiteFooter() {
  return (
    <footer className="mt-auto bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4">
        <div>
          <p className="font-display text-2xl">
            {BUSINESS.name} <span className="text-gradient-gold">{BUSINESS.tagline}</span>
          </p>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
            Marble house and murti karigars in Newtown, Kolkata since 1994 — slabs, statues, flooring and
            carved stone work delivered across India.
          </p>
          <ul className="mt-5 flex items-center gap-3">
            {SOCIALS.map((s) => {
              const Icon = SOCIAL_ICON[s.id];
              return (
                <li key={s.id}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${s.label} — ${s.handle}`}
                    title={`${s.label} · ${s.handle}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-primary-foreground/25 text-primary-foreground/80 transition-all hover:-translate-y-0.5 hover:shadow-lift"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-gold">Pages</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-primary-foreground">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-gold">Categories</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            {CATEGORIES.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/category/$slug"
                  params={{ slug: c.slug }}
                  className="hover:text-primary-foreground"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs uppercase tracking-widest text-gold">Reach us</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
            <li>{BUSINESS.address}</li>
            <li>
              <a href={`tel:${BUSINESS.phone}`} className="hover:text-primary-foreground">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary-foreground">
                {BUSINESS.email}
              </a>
            </li>
            <li>{BUSINESS.hours}</li>
            <li>
              <Link to="/admin" className="hover:text-primary-foreground">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs text-primary-foreground/50">
        © {new Date().getFullYear()} {BUSINESS.name}. All rights reserved.
      </div>
    </footer>
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-3">
      <a
        href={`tel:${BUSINESS.phone}`}
        aria-label={`Call ${BUSINESS.name}`}
        className="inline-flex items-center justify-center rounded-full bg-primary p-4 text-primary-foreground shadow-lift transition-transform hover:scale-105"
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
      </a>
      <a
        href={whatsappLink(`Namaste ${BUSINESS.name}! I'd like to book a marble enquiry.`)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Vaishnavi Marble on WhatsApp"
        className="inline-flex items-center justify-center rounded-full bg-whatsapp p-4 text-whatsapp-foreground shadow-lift transition-transform hover:scale-105"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
      </a>
    </div>
  );
}

/** Back-compat alias used by older imports. */
export const WhatsAppFab = FloatingActions;

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div id="top" className="flex min-h-screen flex-col bg-background">
      <a href="#main" className="skip-link rounded-sm focus:skip-link-visible">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </main>
      <SiteFooter />
      <FloatingActions />
    </div>
  );
}
