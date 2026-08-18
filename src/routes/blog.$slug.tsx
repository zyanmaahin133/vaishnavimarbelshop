import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { postBySlug, POSTS } from "@/data/content";
import { BUSINESS } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = postBySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Article not found — Aarav Marble House" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const p = loaderData.post;
    const url = `${SITE_URL}/blog/${params.slug}`;
    return {
      meta: [
        { title: `${p.title} | Aarav Marble House` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "og:image", content: absUrl(p.image) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: absUrl(p.image) },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blog" },
            { name: p.title, path: `/blog/${params.slug}` },
          ]),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            image: absUrl(p.image),
            author: { "@type": "Organization", name: BUSINESS.name },
            publisher: { "@type": "Organization", name: BUSINESS.name },
            mainEntityOfPage: url,
          }),
        },
      ],
    };
  },
  notFoundComponent: PostNotFound,
  component: BlogPostPage,
});

function PostNotFound() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl px-5 py-28 text-center">
        <h1 className="font-display text-4xl">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block text-sm underline">
          Back to the blog
        </Link>
      </div>
    </PageShell>
  );
}

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const others = POSTS.filter((p) => p.slug !== post.slug);

  return (
    <PageShell>
      <article className="mx-auto max-w-3xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs
          items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
        />

        <header className="mt-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">
            {new Date(post.date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · {post.readTime}
          </p>
          <h1 className="mt-3 text-3xl leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{post.excerpt}</p>
        </header>

        <img
          src={post.image}
          alt={`Cover image for the article: ${post.title}`}
          loading="lazy"
          width={1600}
          height={900}
          className="mt-10 w-full rounded-sm border border-border object-cover"
        />

        <div className="mt-10 space-y-6 text-base leading-relaxed text-muted-foreground">
          {post.body.map((para: string) => (
            <p key={para.slice(0, 30)}>{para}</p>
          ))}
        </div>

        <div className="mt-12 rounded-sm border border-border bg-secondary/50 p-7">
          <h2 className="font-display text-2xl text-foreground">Need a recommendation?</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Send us your room area and budget and we will shortlist stones the same day.
          </p>
          <Link
            to="/contact"
            className="mt-5 inline-block rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90"
          >
            Contact us
          </Link>
        </div>

        <section className="mt-16 border-t border-border pt-8">
          <h2 className="font-display text-2xl">More reading</h2>
          <ul className="mt-4 space-y-3">
            {others.map((o) => (
              <li key={o.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: o.slug }}
                  className="text-sm text-foreground underline-offset-4 hover:underline"
                >
                  {o.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </PageShell>
  );
}
