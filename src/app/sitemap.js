import { SITE } from "@/data/site";

// Generated once at build time for the static export.
export const dynamic = "force-static";

const ROUTES = [
  "",
  "/rooms-rates",
  "/event-venue",
  "/food-beverage",
  "/yoga-wellness",
  "/cultural-spiritual-activities",
  "/family-groups",
  "/20-off-first-stay",
  "/contact-us",
];

export default function sitemap() {
  return ROUTES.map((r) => ({ url: `${SITE.url}${r}` }));
}
