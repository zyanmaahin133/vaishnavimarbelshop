import { BUSINESS, whatsappLink } from "@/lib/business";

export type MessageTemplate = {
  id: string;
  label: string;
  blurb: string;
  message: string;
};

const intro = `Namaste ${BUSINESS.name}!`;

export const MESSAGE_TEMPLATES: MessageTemplate[] = [
  {
    id: "flooring",
    label: "Marble flooring enquiry",
    blurb: "Area, rooms and laying — get a per sq ft rate with fitting.",
    message: `${intro}

I need a quotation for MARBLE FLOORING.
• Area (sq ft): 
• Rooms / floors: 
• Preferred stone: (Makrana / Italian / Green / Beige)
• Site location: 
• Fitting needed: Yes / No

Please share rate per sq ft with laying and polishing.`,
  },
  {
    id: "slabs",
    label: "Slabs & tiles enquiry",
    blurb: "Gangsaw slabs or calibrated tiles, cut to your sizes.",
    message: `${intro}

I need a quotation for MARBLE SLABS / TILES.
• Stone / colour: 
• Quantity (sq ft): 
• Thickness: 16mm / 18mm / 20mm
• Sizes required: 
• Delivery city: 

Please share available lots with photos and rate.`,
  },
  {
    id: "statues",
    label: "God statue enquiry",
    blurb: "Hand-carved murti in Makrana white or hand-painted finish.",
    message: `${intro}

I want to order a MARBLE GOD STATUE.
• Deity: 
• Height (inches): 
• Finish: Plain white / Hand-painted / Gold leaf
• Delivery city: 
• Needed by (date): 

Please share carving photos, price and delivery time.`,
  },
  {
    id: "mandir",
    label: "Mandir / pooja room",
    blurb: "Carved dome, pillars and full pooja room cladding.",
    message: `${intro}

I want a quotation for a MARBLE MANDIR / POOJA ROOM.
• Type: Mandir unit / Full pooja room
• Size (W × H): 
• Carving level: Simple / Medium / Heavy
• Site location: 

Please share designs and pricing.`,
  },
  {
    id: "countertop",
    label: "Kitchen / bathroom counter",
    blurb: "Edge-profiled counters with cut-outs and fitting.",
    message: `${intro}

I need a quotation for a MARBLE COUNTERTOP.
• Kitchen / Bathroom: 
• Running feet: 
• Stone preference: 
• Cut-outs (sink / hob): 
• Site location: 

Please share rate per sq ft with edge profile and fitting.`,
  },
  {
    id: "visit",
    label: "Showroom visit",
    blurb: "Book a slot to see lots in person at the Newtown yard.",
    message: `${intro}

I would like to visit your Newtown showroom.
• Preferred day & time: 
• Interested in: 
• Coming from: 

Please confirm the slot and share the location pin.`,
  },
  {
    id: "tiles",
    label: "Tiles enquiry",
    blurb: "Floor, wall, bathroom, kitchen, outdoor or elevation tiles.",
    message: `${intro}

I need a quotation for TILES.
• Type: (Floor / Wall / Bathroom / Kitchen / Outdoor / Elevation)
• Material: (Vitrified / Porcelain / Marble-look / Wooden / Anti-skid)
• Area (sq ft): 
• Size required: 
• Delivery city: 

Please share available designs with photos and rate per sq ft.`,
  },
  {
    id: "sanitaryware",
    label: "Sanitaryware enquiry",
    blurb: "WC, wash basin, counter basin or bathroom accessories.",
    message: `${intro}

I need a quotation for SANITARYWARE.
• Product: (Wall hung WC / One piece WC / Wash basin / Counter basin / Accessories)
• Quantity: 
• Colour preference: 
• Delivery city: 

Please share available models with photos and price.`,
  },
  {
    id: "sink",
    label: "Kitchen sink enquiry",
    blurb: "Stainless steel, single/double bowl or designer sinks.",
    message: `${intro}

I need a quotation for a KITCHEN SINK.
• Type: (Single bowl / Double bowl / Designer / Under-counter)
• Material: (Stainless steel / Granite composite)
• Size (inches): 
• Delivery city: 

Please share available models with photos and price.`,
  },
  {
    id: "vanity",
    label: "Vanity enquiry",
    blurb: "Bathroom vanity units, wall-mounted or designer vanities.",
    message: `${intro}

I need a quotation for a BATHROOM VANITY.
• Type: (Vanity unit / Wall-mounted / Designer / Double sink)
• Size (inches): 
• Material preference: 
• Delivery city: 

Please share available designs with photos and price.`,
  },
  {
    id: "granite",
    label: "Granite enquiry",
    blurb: "Granite slabs, countertops, flooring or cladding.",
    message: `${intro}

I need a quotation for GRANITE.
• Product: (Slabs / Countertop / Flooring / Staircase / Cladding / Parking tiles)
• Colour: (Black / White / Brown / Grey)
• Area (sq ft) or running feet: 
• Thickness: 16mm / 18mm / 20mm
• Delivery city: 

Please share available lots with photos and rate per sq ft.`,
  },
];

export const templateLink = (t: MessageTemplate) => whatsappLink(t.message);


/**
 * Picks the WhatsApp preset that matches an item, so a one-click enquiry from
 * any product auto-fills the right questionnaire (flooring vs slabs vs statues
 * vs mandir vs countertop).
 */
export function templateForItem(name: string, group: string): MessageTemplate {
  const n = name.toLowerCase();
  const byId = (id: string) => MESSAGE_TEMPLATES.find((t) => t.id === id)!;

  if (group === "statues") return byId("statues");
  if (group === "sanitaryware") return byId("sanitaryware");
  if (group === "sink") return byId("sink");
  if (group === "vanity") return byId("vanity");
  if (group === "granite") return byId("granite");
  if (group === "tiles") return byId("tiles");
  if (n.includes("mandir") || n.includes("pooja")) return byId("mandir");
  if (n.includes("countertop") || n.includes("wash basin") || n.includes("kitchen"))
    return byId("countertop");
  if (n.includes("flooring") || n.includes("staircase") || n.includes("steps"))
    return byId("flooring");
  if (n.includes("slab") || n.includes("tile") || group === "types" || group === "brands")
    return byId("slabs");
  return byId("slabs");
}

/** Pre-fills the matched preset with the item the customer is looking at. */
export function itemTemplateLink(name: string, group: string, price: string) {
  const t = templateForItem(name, group);
  return whatsappLink(`${t.message}\n\nItem I am looking at: ${name} (listed ${price})`);
}
