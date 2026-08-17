import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQS } from "@/data/faq";

export function Faq({
  heading = "Booking & policy questions",
  eyebrow = "FAQ",
}: {
  heading?: string;
  eyebrow?: string;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-4xl px-5 py-20 sm:px-8">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 text-4xl sm:text-5xl">{heading}</h2>

        <dl className="mt-10 divide-y divide-border border-y border-border">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <dt>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-display text-xl leading-snug text-foreground sm:text-2xl">
                      {f.q}
                    </span>
                    <ChevronDown
                      aria-hidden="true"
                      className={`h-5 w-5 shrink-0 text-gold transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </dt>
                <dd
                  className={`overflow-hidden text-sm leading-relaxed text-muted-foreground transition-all ${
                    isOpen ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  {f.a}
                </dd>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
