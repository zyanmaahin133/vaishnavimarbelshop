import { MessageCircle } from "lucide-react";
import { MESSAGE_TEMPLATES, templateLink } from "@/lib/templates";
import { track } from "@/lib/analytics";

export function QuickTemplates() {
  return (
    <section className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <p className="eyebrow">One-click enquiry</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">Pick a ready WhatsApp message</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Tap a preset and WhatsApp opens with the right questions already typed — just fill in the
          blanks and send.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MESSAGE_TEMPLATES.map((t) => (
            <a
              key={t.id}
              href={templateLink(t)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => track("whatsapp_template", { template: t.id })}
              className="group flex flex-col justify-between gap-4 rounded-sm border border-border bg-card p-5 shadow-soft transition-all hover:-translate-y-1 hover:border-gold hover:shadow-lift"
            >
              <div>
                <h3 className="font-display text-2xl leading-tight text-foreground">{t.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.blurb}</p>
              </div>
              <span className="inline-flex items-center gap-2 self-start rounded-sm bg-whatsapp px-4 py-2.5 text-xs font-semibold text-whatsapp-foreground transition-opacity group-hover:opacity-90">
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Send on WhatsApp
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
