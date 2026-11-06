import type { Metadata } from "next";
import { siteConfig, siteUrl } from "@/config/site";

export function makeMetadata(title?: string, description?: string, path = "/"): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.title;
  const summary = description || siteConfig.seo.description;
  return {
    title: fullTitle,
    description: summary,
    alternates: { canonical: path },
    openGraph: { type: "website", locale: siteConfig.locale, url: new URL(path, siteUrl).toString(), siteName: siteConfig.name, title: fullTitle, description: summary, images: [{ url: siteConfig.seo.ogImage, alt: siteConfig.name }] },
    twitter: { card: "summary_large_image", title: fullTitle, description: summary, images: [siteConfig.seo.ogImage] },
  };
}
