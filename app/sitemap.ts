import type { MetadataRoute } from "next";
import { siteConfig, siteUrl, isPageEnabled, type PageKey } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", ...(Object.keys(siteConfig.pages) as PageKey[]).filter(isPageEnabled)].map(path => ({ url: new URL(path, `${siteUrl}/`).toString(), lastModified: new Date(), changeFrequency: "monthly" as const, priority: path ? 0.7 : 1 }));
}
