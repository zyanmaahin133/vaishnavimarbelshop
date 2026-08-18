import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Phone, Ruler, ShieldCheck, Truck, Hammer } from "lucide-react";
import { PageShell } from "@/components/Chrome";
import { Carousel } from "@/components/Carousel";
import { ShowroomHighlight } from "@/components/ShowroomHighlight";
import { ProductCard } from "@/components/ProductCard";
import { QuickTemplates } from "@/components/QuickTemplates";
import { Faq } from "@/components/Faq";
import { Reveal } from "@/components/Reveal";
import { CATALOG } from "@/data/catalog";
import { CATEGORIES, POSTS } from "@/data/content";
import { faqJsonLd } from "@/data/faq";
import { BUSINESS, organizationJsonLd, whatsappLink } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";
import heroImage from "@/assets/hero-marble.jpg";

const title = "Aarav Marble House — Marble, God Statues & Flooring in Newtown, Kolkata";
const description =
  "Makrana, Italian and imported marble, hand-carved Hindu god statues, flooring, mandirs and marble furniture. Live price list, add to cart and instant WhatsApp booking.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: absUrl(heroImage) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(heroImage) },
    ],
    links: [
      { rel: "canonical", href: "/" },
      { rel: "preload", as: "image", href: heroImage, fetchPriority: "high" },
    ],
    scripts: [
      { type: "application/ld+json", children: organizationJsonLd() },
      { type: "application/ld+json", children: faqJsonLd() },
    ],
  }),
  component: Index,
});

const FEATURED = [
  "types-calacatta-marble",
  "statues-radha-krishna",
  "house-marble-mandir",
  "types-onyx-marble",
  "house-marble-fountain",
]
  .map((id) => CATALOG.find((i) => i.id === id))
  .filter(Boolean) as typeof CATALOG;

const BESTSELLERS = [
  "types-makrana-marble",
  "statues-lord-ganesha",
  "house-marble-flooring",
  "types-italian-marble",
  "statues-lord-shiva",
  "house-marble-kitchen-countertop",
  "types-green-marble",
  "house-marble-dining-table",
]
  .map((id) => CATALOG.find((i) => i.id === id))
  .filter(Boolean) as typeof CATALOG;

const USPS = [
  { icon: Hammer, title: "Own carving workshop", text: "Murtis and carved work made in-house by Jaipur karigars." },
  { icon: Ruler, title: "Cut to your drawing", text: "Site measurement, cutting drawings and fitting by our own team." },
  { icon: ShieldCheck, title: "Transparent rates", text: "Published starting prices for every item, no hidden loading." },
  { icon: Truck, title: "Delivered all India", text: "Crated, foam-braced and insured transport from Newtown, Kolkata." },
];

function Index() {
  return (
    <PageShell>
      <h1 className="sr-only">
        Aarav Marble House — marble, Hindu god statues and marble house products in Newtown, Kolkata
      </h1>

      <Carousel items={FEATURED} heading="Featured marble and statues" />

      <section className="border-b border-border bg-secondary/50">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-display text-2xl leading-snug text-foreground sm:text-3xl">
            Tell us the room, the area and the budget — we will shortlist stones the same day.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Namaste ${BUSINESS.name}! I'd like a quotation.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp us
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 rounded-sm border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold"
            >
              <Phone className="h-4 w-4" aria-hidden="true" /> {BUSINESS.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="eyebrow">Categories</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">Four ways to buy marble from us</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, ci) => (
            <Reveal key={c.slug} delay={ci * 90}>
            <Link
              to="/category/$slug"
              params={{ slug: c.slug }}
              className="tilt-card group block h-full overflow-hidden rounded-sm border border-border bg-card shadow-soft"
            >
              <img
                src={c.image}
                alt={`${c.label} at ${BUSINESS.name} — ${c.intro}`}
                loading="lazy"
                width={1600}
                height={900}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="p-5">
                <h3 className="font-display text-2xl text-foreground">{c.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.intro}</p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest text-gold">
                  Explore →
                </span>
              </div>
            </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <ShowroomHighlight />

      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
          {USPS.map((u, ui) => (
            <Reveal key={u.title} delay={ui * 90}>
              <u.icon className="h-6 w-6 text-gold" aria-hidden="true" />
              <h3 className="mt-4 font-display text-2xl text-foreground">{u.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{u.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Most ordered</p>
            <h2 className="mt-3 text-4xl sm:text-5xl">Bestsellers this season</h2>
          </div>
          <Link
            to="/price-list"
            className="text-sm font-semibold text-gold underline-offset-4 hover:underline"
          >
            See the full price list →
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BESTSELLERS.map((item, bi) => (
            <Reveal key={item.id} delay={(bi % 4) * 80}>
              <ProductCard item={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <p className="eyebrow">From the journal</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Marble guides & advice</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {POSTS.map((p, pi) => (
              <Reveal key={p.slug} delay={pi * 90}>
              <Link
                to="/blog/$slug"
                params={{ slug: p.slug }}
                className="tilt-card group block h-full overflow-hidden rounded-sm border border-border bg-card shadow-soft"
              >
                <img
                  src={p.image}
                  alt={`Article cover — ${p.title}`}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {p.readTime}
                  </p>
                  <h3 className="mt-2 font-display text-2xl leading-tight text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.excerpt}</p>
                </div>
              </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <QuickTemplates />
      <Faq />
    </PageShell>
  );
}
