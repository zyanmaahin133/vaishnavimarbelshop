import { createFileRoute } from "@tanstack/react-router";
import { PageShell } from "@/components/Chrome";
import { Contact } from "@/components/Contact";
import { MapEmbed } from "@/components/MapEmbed";
import { ShowroomHighlight } from "@/components/ShowroomHighlight";
import { QuickTemplates } from "@/components/QuickTemplates";
import { Faq } from "@/components/Faq";
import { Breadcrumbs, breadcrumbJsonLd } from "@/components/Breadcrumbs";
import { BUSINESS, organizationJsonLd } from "@/lib/business";
import { SITE_URL, absUrl } from "@/lib/site";
import catBrands from "@/assets/cat-brands.jpg";

const title = "Contact Aarav Marble House — Newtown, Kolkata Marble Showroom & WhatsApp";
const description =
  "Visit our Newtown, Kolkata marble showroom, call +91 62918 28459 or send a WhatsApp enquiry for marble slabs, god statues, flooring and carved stone work.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/contact` },
      { property: "og:image", content: absUrl(catBrands) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: absUrl(catBrands) },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
    scripts: [
      {
        type: "application/ld+json",
        children: breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ]),
      },
      { type: "application/ld+json", children: organizationJsonLd() },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-7xl px-5 pt-10 sm:px-8">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact Us" }]} />
        <header className="mt-8 max-w-3xl">
          <p className="eyebrow">Contact us</p>
          <h1 className="mt-3 text-4xl leading-tight sm:text-6xl">
            Talk to the yard, not a call centre
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            Call, WhatsApp or send the form below — the same team that cuts and carries your stone
            answers it. Showroom open {BUSINESS.hours}.
          </p>
        </header>
      </div>
      <ShowroomHighlight />
      <QuickTemplates />
      <Contact />
      <MapEmbed />
      <Faq heading="Booking, delivery & policy FAQs" />
    </PageShell>
  );
}
