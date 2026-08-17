import { ExternalLink, MapPin, Navigation } from "lucide-react";
import { BUSINESS, mapsEmbedSrc, mapsDirectionsLink, mapsPlaceLink } from "@/lib/business";

export function MapEmbed() {
  return (
    <section aria-labelledby="showroom-map" className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Find the yard</p>
            <h2 id="showroom-map" className="mt-3 text-3xl sm:text-4xl">
              Showroom location in Newtown, Kolkata
            </h2>
            <p className="mt-3 flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              {BUSINESS.address}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={mapsDirectionsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Get directions
            </a>
            <a
              href={mapsPlaceLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-border px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-gold hover:bg-gold-soft"
            >
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
              Open in Google Maps
            </a>
          </div>
        </div>

        <div className="mt-8 overflow-hidden rounded-sm border border-border shadow-soft">
          <iframe
            title={`Map of ${BUSINESS.name}, ${BUSINESS.address}`}
            src={mapsEmbedSrc()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full sm:h-[420px]"
          />
        </div>
      </div>
    </section>
  );
}
