/**
 * Social + storefront profiles. Used in the header, footer, and in the
 * Organization JSON-LD `sameAs` array so Meta / Google link the brand
 * to the same business entity.
 */
export type Social = {
  id: "instagram" | "facebook" | "shopify" | "whatsapp";
  label: string;
  handle: string;
  url: string;
};

export const SOCIALS: Social[] = [
  {
    id: "instagram",
    label: "Instagram",
    handle: "@aaravmarblehouse",
    url: "https://www.instagram.com/aaravmarblehouse",
  },
  {
    id: "facebook",
    label: "Facebook",
    handle: "Aarav Marble House",
    url: "https://www.facebook.com/aaravmarblehouse",
  },
  {
    id: "shopify",
    label: "Online store",
    handle: "aarav-marble-house.myshopify.com",
    url: "https://aarav-marble-house.myshopify.com",
  },
];

export const socialUrls = () => SOCIALS.map((s) => s.url);
