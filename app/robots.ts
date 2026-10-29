import type { MetadataRoute } from "next";
import { SITE } from "@/components/links";

/** Everyone is welcome, search engines and AI agents alike: the more places that can describe Annex, the better. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
