import { MessageCircle, Phone } from "lucide-react";
import heroImage from "@/assets/hero-marble.jpg";
import { BUSINESS, whatsappLink } from "@/lib/business";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
      <img
        src={heroImage}
        alt="Aarav Marble House showroom with book-matched white and gold marble slabs"
        width={1920}
        height={1080}
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="hero-veil absolute inset-0 -z-10" aria-hidden="true" />

      <div className="mx-auto w-full max-w-7xl px-5 py-28 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow">Newtown, Kolkata · Since 1994</p>
          <h1 className="mt-5 font-display text-5xl leading-[1.05] text-primary-foreground sm:text-7xl">
            Marble that carries
            <span className="text-gradient-gold"> your name</span> for generations
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-primary-foreground/80 sm:text-lg">
            Makrana, Italian and imported slabs, hand-carved murtis, flooring, mandirs and marble
            furniture — quarried, cut and finished under one roof, with transparent per-sq-ft rates.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={whatsappLink(
                `Namaste ${BUSINESS.name}! I'd like a quotation for marble. Please guide me.`,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Book on WhatsApp
            </a>
            <a
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-sm border border-primary-foreground/40 px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              View full catalogue
            </a>
            <a
              href={`tel:${BUSINESS.phone}`}
              className="inline-flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-primary-foreground/85 hover:text-primary-foreground"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {BUSINESS.phoneDisplay}
            </a>
          </div>

          <dl className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-primary-foreground/20 pt-8">
            {[
              ["90+", "Marble varieties"],
              ["23", "Murti designs"],
              ["30 yrs", "Of quarry trade"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="font-display text-3xl text-primary-foreground">{value}</dt>
                <dd className="mt-1 text-[0.7rem] uppercase tracking-widest text-primary-foreground/65">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
