import { MessageCircle, Navigation, Phone } from "lucide-react";
import {
  BUSINESS,
  SHOWROOM_IMAGE,
  mapsDirectionsLink,
  whatsappLink,
} from "@/lib/business";
import { trackWhatsAppSubmit } from "@/lib/analytics";

/** Highlighted, colour-framed photo of the real showroom front. */
export function ShowroomHighlight() {
  return (
    <section
      aria-labelledby="showroom-highlight"
      className="border-y border-border bg-primary text-primary-foreground"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:py-20">
        <div className="relative">
          <div className="absolute -inset-2 rounded-sm bg-gradient-to-br from-gold/70 via-gold/20 to-transparent" />
          <img
            src={SHOWROOM_IMAGE}
            alt={`${BUSINESS.name} showroom front at ${BUSINESS.address}`}
            loading="lazy"
            decoding="async"
            width={1600}
            height={1080}
            sizes="(min-width: 1024px) 40rem, 92vw"
            data-no-dim
            className="relative w-full rounded-sm object-cover shadow-lift"
          />
          <span className="absolute -bottom-3 left-4 rounded-sm bg-gold px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-primary">
            Our showroom
          </span>
        </div>

        <div>
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-gold">
            Visit us in person
          </p>
          <h2 id="showroom-highlight" className="mt-3 text-3xl sm:text-5xl">
            Two floors of marble, statues &amp; finished stone
          </h2>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-primary-foreground/80">
            Walk the yard, see the veins in daylight and check the carving finish yourself before you
            book. Loading, transport and fitting teams work out of the same address.
          </p>
          <p className="mt-6 text-sm font-medium text-primary-foreground/90">{BUSINESS.address}</p>
          <p className="mt-1 text-sm text-primary-foreground/70">{BUSINESS.hours}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(`Namaste ${BUSINESS.name}! I want to visit the showroom.`)}
              onClick={() => trackWhatsAppSubmit({ source: "showroom_highlight" })}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-5 py-3 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp {BUSINESS.phoneDisplay}
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 rounded-sm bg-gold px-5 py-3 text-sm font-semibold text-primary transition-opacity hover:opacity-90"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              Call now
            </a>
            <a
              href={mapsDirectionsLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/30 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <Navigation className="h-4 w-4" aria-hidden="true" />
              Directions
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
