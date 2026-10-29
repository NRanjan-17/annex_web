import type { MetadataRoute } from "next";
import { SITE } from "@/components/links";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: SITE, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE}/docs`, lastModified, changeFrequency: "weekly", priority: 0.8 },
  ];
}
