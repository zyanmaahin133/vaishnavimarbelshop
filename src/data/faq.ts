export type FaqItem = { q: string; a: string };

export const FAQS: FaqItem[] = [
  {
    q: "How do I book marble or a statue on WhatsApp?",
    a: "Add the items you like to the cart, open the cart drawer, type your delivery location and any note, then tap “Book on WhatsApp”. The message arrives with every item, quantity and the indicative total already filled in, so we can quote immediately.",
  },
  {
    q: "Are the prices on the site final?",
    a: "The listed rates are starting rates per sq ft or per piece for the standard finish and thickness. Final price depends on the lot you select, thickness, edge profile, carving detail and fitting. We confirm a written final quotation on WhatsApp before any payment.",
  },
  {
    q: "Is there a minimum order quantity?",
    a: "No minimum for statues, furniture and showpieces. For flooring, slabs and tiles we usually supply from 100 sq ft onwards so the lot matches in shade and vein.",
  },
  {
    q: "Do you deliver outside Kolkata?",
    a: "Yes. We crate and foam-brace every order and ship insured across West Bengal and the rest of India from our Newtown yard. Delivery timelines and freight are confirmed with your quotation.",
  },
  {
    q: "Do you provide fitting and polishing?",
    a: "Our own fitting team handles flooring, staircases, countertops, mandirs and cladding in and around Kolkata, including site measurement, cutting drawings, laying, grinding and final polishing.",
  },
  {
    q: "How long does a custom carved statue or mandir take?",
    a: "Hand-carved murtis take roughly 3 to 6 weeks depending on size and detail; full marble mandirs and pooja rooms take 6 to 10 weeks. We share work-in-progress photos on WhatsApp at every stage.",
  },
  {
    q: "What payment terms do you accept?",
    a: "Cash, UPI and bank transfer. Standard terms are an advance to confirm the lot or start carving, and the balance before dispatch. GST invoice is provided on every order.",
  },
  {
    q: "What is your replacement or damage policy?",
    a: "Report transit damage with photos within 48 hours of delivery and we replace or repair the piece. Natural veining, shade variation and small filled pits are inherent to natural marble and are not treated as defects.",
  },
];

export const faqJsonLd = () =>
  JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  });
