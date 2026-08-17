import { useState } from "react";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { BUSINESS, whatsappLink } from "@/lib/business";
import { trackWhatsAppSubmit } from "@/lib/analytics";

const INTERESTS = [
  "Marble Types",
  "God Statues",
  "House Products",
  "Brand / Company stock",
];

export function Contact() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [interest, setInterest] = useState(INTERESTS[0]);
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");

  const message = `Namaste ${BUSINESS.name}!

Name: ${name || "-"}
City: ${city || "-"}
Interested in: ${interest}
Budget: ${budget || "-"}
Requirement: ${details || "-"}

Please send me a quotation.`;

  return (
    <section id="contact" className="border-t border-border bg-secondary/60">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-28">
        <div>
          <p className="eyebrow">Booking & enquiry</p>
          <h2 className="mt-3 text-4xl sm:text-5xl">Send your requirement</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Fill this in and it opens WhatsApp with your details already typed. Site measurements,
            loading and transport across India can all be arranged.
          </p>

          <ul className="mt-10 space-y-5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-muted-foreground">{BUSINESS.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`tel:${BUSINESS.phone}`} className="text-foreground hover:text-gold">
                {BUSINESS.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <a href={`mailto:${BUSINESS.email}`} className="text-foreground hover:text-gold">
                {BUSINESS.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-muted-foreground">{BUSINESS.hours}</span>
            </li>
          </ul>
        </div>

        <form
          className="rounded-sm border border-border bg-card p-7 shadow-soft"
          onSubmit={(e) => {
            e.preventDefault();
            trackWhatsAppSubmit({ source: "contact_form", item_name: interest });
            window.open(whatsappLink(message), "_blank", "noopener,noreferrer");
          }}

        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Your name">
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={inputClass}
                placeholder="Ramesh Sharma"
              />
            </Field>
            <Field label="City">
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className={inputClass}
                placeholder="Jaipur"
              />
            </Field>
          </div>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field label="Interested in">
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className={inputClass}
              >
                {INTERESTS.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </Field>
            <Field label="Approx. budget">
              <input
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={inputClass}
                placeholder="₹2,00,000"
              />
            </Field>
          </div>

          <div className="mt-5">
            <Field label="Requirement details">
              <textarea
                rows={4}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className={`${inputClass} resize-none`}
                placeholder="1200 sq ft Italian marble flooring + one 30 inch Ganesha murti"
              />
            </Field>
          </div>

          <button
            type="submit"
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-whatsapp px-6 py-3.5 text-sm font-semibold text-whatsapp-foreground transition-opacity hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            Send on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            No spam — it just opens your WhatsApp with the message ready.
          </p>
        </form>
      </div>
    </section>
  );
}

const inputClass =
  "w-full rounded-sm border border-input bg-background px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-gold focus:ring-1 focus:ring-ring";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[0.65rem] font-semibold uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
