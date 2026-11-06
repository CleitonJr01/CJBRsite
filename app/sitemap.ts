import type { MetadataRoute } from "next";
import { siteConfig, siteUrl, isPageEnabled, isIndexable, type PageKey } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!isIndexable) return [];
  return ["", ...(Object.keys(siteConfig.pages) as PageKey[]).filter(isPageEnabled)]
    .map(path => ({ url: new URL(path, `${siteUrl}/`).toString(), changeFrequency: "monthly" as const, priority: path ? 0.7 : 1 }));
}
