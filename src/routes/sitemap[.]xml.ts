import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { CATALOG } from "@/data/catalog";
import { CATEGORIES, POSTS } from "@/data/content";
import { SITE_URL, absUrl } from "@/lib/site";

const BASE_URL = SITE_URL;

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  image?: { loc: string; title: string };
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "yearly", priority: "0.6" },
          { path: "/products", changefreq: "weekly", priority: "0.9" },
          { path: "/price-list", changefreq: "weekly", priority: "0.9" },
          { path: "/videos", changefreq: "monthly", priority: "0.5" },
          { path: "/blog", changefreq: "monthly", priority: "0.6" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          ...CATEGORIES.map((c) => ({
            path: `/category/${c.slug}`,
            changefreq: "weekly" as const,
            priority: "0.9",
          })),
          ...POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            changefreq: "monthly" as const,
            priority: "0.6",
          })),
          ...CATALOG.map((item) => ({
            path: `/product/${item.id}`,
            changefreq: "monthly" as const,
            priority: "0.8",
            image: {
              loc: absUrl(item.image),
              title: `${item.name} — ${item.finish}`,
            },
          })),
        ];

        const esc = (s: string) =>
          s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            e.image ? `    <image:image>` : null,
            e.image ? `      <image:loc>${esc(e.image.loc)}</image:loc>` : null,
            e.image ? `      <image:title>${esc(e.image.title)}</image:title>` : null,
            e.image ? `    </image:image>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
