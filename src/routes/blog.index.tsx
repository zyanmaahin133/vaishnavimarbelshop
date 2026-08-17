import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { POSTS } from "@/data/content";
import { SITE_URL, absUrl } from "@/lib/site";
import catHouse from "@/assets/cat-house.jpg";

const title = "Marble Blog — Buying Guides, Care Tips & Vastu | Aarav Marble House";
const description =
  "Practical marble guides from Newtown, Kolkata: Makrana vs Italian marble, choosing a home mandir, and how to clean and re-polish marble flooring correctly.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/blog` },
      { property: "og:image", content: absUrl(catHouse) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(catHouse) },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ]),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Blog" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Journal</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">Marble guides & advice</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Everything we get asked in the showroom, written down: how stones compare, what carving
            really costs, and how to keep marble looking new.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.slug}
              className="group overflow-hidden rounded-sm border border-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/blog/$slug" params={{ slug: p.slug }}>
                <img
                  src={p.image}
                  alt={`Article cover — ${p.title}`}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">
                  {new Date(p.date).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}{" "}
                  · {p.readTime}
                </p>
                <h2 className="mt-2 font-display text-2xl leading-tight text-foreground">
                  <Link to="/blog/$slug" params={{ slug: p.slug }} className="hover:underline">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
