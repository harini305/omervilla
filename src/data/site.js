// Verified facts from docs/source-audit/02-content-preservation.md.
// Nothing here may be invented: no phone, email or street address is published.

export const SITE = {
  name: "Omer Villas",
  brand: "Omer Villa & Retreat",
  url: "https://omervilla.com",
  location: "Buduk Village, just north of Canggu, Bali",
  coordinates: { lat: -8.6011391, lng: 115.1608734 },
  timeZone: "Asia/Makassar", // GMT+8, WITA (Bali)
};

export const WHATSAPP = {
  display: "+62 821-4798-1342",
  number: "6282147981342",
};

export function whatsappLink(message) {
  const base = `https://wa.me/${WHATSAPP.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export const LINKS = {
  airbnb: "https://www.airbnb.com/users/show/650556914",
  instagram: "https://www.instagram.com/omer.villa.and.retreat/",
  instagramHandle: "@omer.villa.and.retreat",
  facebook: "https://www.facebook.com/profile.php?id=61564987540215&mibextid=kFxxJD",
  credit: "http://suryanirmala.com",
  osm: `https://www.openstreetmap.org/?mlat=-8.6011391&mlon=115.1608734#map=15/-8.6011391/115.1608734`,
  directions: "https://www.google.com/maps/dir/?api=1&destination=-8.6011391,115.1608734",
};

// Header navigation. The original showed four links; the experience pages
// were only reachable from the home grid, so they are grouped here.
export const NAV = [
  { href: "/", label: "Home" },
  { href: "/rooms-rates", label: "Rooms & Rates" },
  { href: "/event-venue", label: "Event & Venue" },
  {
    label: "Experiences",
    children: [
      { href: "/food-beverage", label: "Food & Beverage" },
      { href: "/yoga-wellness", label: "Yoga & Wellness" },
      { href: "/cultural-spiritual-activities", label: "Cultural & Spiritual Activities" },
      { href: "/family-groups", label: "Family & Groups" },
      { href: "/20-off-first-stay", label: "20% OFF First Stay" },
    ],
  },
  { href: "/contact-us", label: "Contact Us" },
];

// Footer quick links, labels exactly as published. "Dining" now points
// straight at /food-beverage instead of relying on the WordPress redirect.
export const FOOTER_LINKS = [
  { href: "/rooms-rates", label: "Rates" },
  { href: "/event-venue", label: "Venue" },
  { href: "/yoga-wellness", label: "Wellness" },
  { href: "/#location", label: "Location" },
  { href: "/food-beverage", label: "Dining" },
  { href: "/cultural-spiritual-activities", label: "Experience" },
  { href: "/family-groups", label: "Family & Groups" },
  { href: "/contact-us", label: "Contact Us" },
];

// Routes whose first screen is a dark photograph, so the header starts light.
export const HEADER_OVER_PHOTO = new Set([
  "/",
  "/event-venue",
  "/family-groups",
  "/contact-us",
]);
