import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { PageShell } from "@/components/Chrome";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { VIDEOS } from "@/data/content";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";
import videoQuarry from "@/assets/video-quarry.jpg";

const title = "Video Gallery — Marble Quarry, Murti Carving & Fitting | Aarav Marble House";
const description =
  "Watch how marble is quarried in Rajasthan, how our karigars carve a Ganesha murti, and how a marble floor is laid and polished by the Aarav Marble House team.";

export const Route = createFileRoute("/videos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/videos` },
      { property: "og:image", content: absUrl(videoQuarry) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(videoQuarry) },
    ],
    links: [{ rel: "canonical", href: "/videos" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Video Gallery", path: "/videos" },
        ]),
      },
    ],
  }),
  component: VideosPage,
});

function VideosPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pb-20 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Video Gallery" }]} />

        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Video gallery</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">See the work before you buy</h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Short films from the quarry, the carving workshop and live installations. Want a video
            walkthrough of a specific lot in stock? Ask on WhatsApp and we will shoot it for you the
            same day.
          </p>
        </header>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {VIDEOS.map((v) => (
            <article
              key={v.id}
              className="overflow-hidden rounded-sm border border-border bg-card shadow-soft"
            >
              <a
                href={whatsappLink(`Namaste ${BUSINESS.name}! Please send me the video: ${v.title}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block"
                aria-label={`Request the video: ${v.title}`}
              >
                <img
                  src={v.poster}
                  alt={`Video thumbnail — ${v.title}`}
                  loading="lazy"
                  width={1600}
                  height={900}
                  className="aspect-video w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gold text-accent-foreground shadow-lift">
                    <Play className="h-5 w-5" aria-hidden="true" />
                  </span>
                </span>
                <span className="absolute bottom-3 right-3 rounded-sm bg-primary/80 px-2 py-1 text-xs text-primary-foreground">
                  {v.duration}
                </span>
              </a>
              <div className="p-5">
                <h2 className="font-display text-2xl leading-tight text-foreground">{v.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {v.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </PageShell>
  );
}
