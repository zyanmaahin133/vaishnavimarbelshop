import showroomImage from "@/assets/brand-showroom.jpg";
import { SITE_URL, absUrl } from "@/lib/site";
import { socialUrls } from "@/lib/socials";

export const BUSINESS = {
  name: "VAISHNAVI MARBLE",
  tagline: "Marble & Stone",
  phoneDisplay: "+91 62918 28459",
  phone: "+916291828459",
  whatsapp: "916291828459",
  email: "sales@vaishnavimarble.in",
  address:
    "Omathati, Kashinathpur, Bishnupur, on 211 Road to Patharghata, Newtown, Kolkata, West Bengal 700135",
  hours: "Mon – Sat · 9:00 AM – 8:00 PM",
  mapQuery:
    "Omathati, Kashinathpur, Bishnupur, 211 Road, Patharghata, Newtown, Kolkata, West Bengal 700135",
};

/** Photo of the showroom front, served from the asset CDN. */
export const SHOWROOM_IMAGE = showroomImage;

/** Google Maps embed (no API key needed) centred on the showroom. */
export function mapsEmbedSrc() {
  return `https://www.google.com/maps?q=${encodeURIComponent(BUSINESS.mapQuery)}&z=15&output=embed`;
}

export function mapsPlaceLink() {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS.mapQuery)}`;
}

export function mapsDirectionsLink() {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(BUSINESS.mapQuery)}`;
}

export function whatsappLink(message: string) {
  return `https://wa.me/${BUSINESS.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function bookingLink(itemName: string, price: string) {
  return whatsappLink(
    `Namaste ${BUSINESS.name}!\n\nI want to book / enquire about:\n• Item: ${itemName}\n• Listed rate: ${price}\n\nPlease share availability, sizes and final quotation.`,
  );
}

/**
 * Organization + LocalBusiness structured data used site-wide so Google can
 * resolve the knowledge panel, address, phone and WhatsApp contact.
 */
export function organizationJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: BUSINESS.name,
    alternateName: "Vaishnavi Marble",
    description:
      "Marble showroom and murti karigars in Newtown, Kolkata — marble slabs, tiles, flooring, countertops, mandirs and hand-carved god statues with WhatsApp booking.",
    url: SITE_URL,
    logo: absUrl(SHOWROOM_IMAGE),
    image: absUrl(SHOWROOM_IMAGE),
    telephone: BUSINESS.phone,
    email: BUSINESS.email,
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank transfer",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Omathati, Kashinathpur, Bishnupur, 211 Road to Patharghata",
      addressLocality: "Newtown, Kolkata",
      addressRegion: "West Bengal",
      postalCode: "700135",
      addressCountry: "IN",
    },
    areaServed: ["Kolkata", "Newtown", "West Bengal", "India"],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    hasMap: mapsPlaceLink(),
    geo: { "@type": "GeoCoordinates", latitude: 22.5958, longitude: 88.4998 },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        availableLanguage: ["Bengali", "Hindi", "English"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        telephone: BUSINESS.phone,
        url: `https://wa.me/${BUSINESS.whatsapp}`,
        name: "WhatsApp booking",
      },
    ],
    sameAs: [`https://wa.me/${BUSINESS.whatsapp}`, ...socialUrls()],
  });
}
