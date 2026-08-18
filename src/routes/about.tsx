import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { BUSINESS } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";
import workshop from "@/assets/about-workshop.jpg";

const title = "About Aarav Marble House — Marble House & Murti Karigars, Kishangarh";
const description =
  "Since 1994 Aarav Marble House has supplied Makrana, Italian and imported marble and hand-carved murtis from Kishangarh, with in-house cutting, carving and fitting teams.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/about` },
      { property: "og:image", content: absUrl(workshop) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(workshop) },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About Us", path: "/about" },
        ]),
      },
    ],
  }),
  component: AboutPage,
});

const MILESTONES: [string, string][] = [
  ["1994", "Started as a slab trading yard in the Kishangarh marble market."],
  ["2003", "Opened our own gangsaw cutting and polishing line."],
  ["2011", "Murti carving workshop set up with Jaipur karigars."],
  ["2019", "Imported Italian and exotic stone division added."],
  ["2024", "Fitting teams working across Rajasthan, Delhi NCR and Gujarat."],
];

function AboutPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About Us" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Kishangarh · Since 1994</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">
            Three decades of marble, cut and carved under one roof
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {BUSINESS.name} began as a small slab yard in the Kishangarh marble market and grew into
            a full-service marble house: quarry sourcing, gangsaw cutting, polishing, hand carving
            and on-site fitting. Because every stage happens with our own people, we can quote a
            firm rate, hold the finish consistent across a whole project and answer for the result.
          </p>
        </header>

        <img
          src={workshop}
          alt="Karigar hand-carving a white Makrana marble statue in the Aarav Marble House workshop"
          loading="lazy"
          width={1600}
          height={1000}
          className="mt-12 w-full rounded-sm border border-border object-cover"
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-2">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground">
            <h2 className="font-display text-3xl text-foreground">How we work</h2>
            <p>
              Every enquiry starts with the room, the area and the budget. We shortlist two or three
              stones, send photographs of the actual lots in stock, and only then quote. For flooring
              and counters we take site measurements and prepare cutting drawings so wastage stays
              under control.
            </p>
            <p>
              Murtis follow a different path: proportions to Shilpa Shastra, a mock-up for your
              approval, then carving, finishing and — where you want it — gold leaf or hand painting.
              Nothing is dispatched before you have seen photographs of the finished piece.
            </p>
            <p>
              Delivery is crated and foam-braced. Our fitting teams travel where needed, and we stay
              available afterwards for polishing, repair and extension work.
            </p>
          </div>

          <div>
            <h2 className="font-display text-3xl text-foreground">Milestones</h2>
            <ol className="mt-6 space-y-6 border-l border-border pl-6">
              {MILESTONES.map(([year, text]) => (
                <li key={year} className="relative">
                  <span className="absolute -left-[1.9rem] top-1.5 h-2.5 w-2.5 rounded-full bg-gold" />
                  <p className="font-display text-2xl text-foreground">{year}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="rounded-sm bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Browse products
          </Link>
          <Link
            to="/contact"
            className="rounded-sm border border-border px-6 py-3.5 text-sm font-semibold text-foreground hover:border-gold"
          >
            Talk to us
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
