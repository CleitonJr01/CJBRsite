import type { Metadata } from "next";
import { siteConfig, siteUrl, isIndexable } from "@/config/site";

export function makeMetadata(title?: string, description?: string, path = "/"): Metadata {
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.seo.title;
  const summary = description || siteConfig.seo.description;
  const url = new URL(path, siteUrl).toString();
  const image = {
    url: new URL(siteConfig.seo.ogImage, siteUrl).toString(),
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: siteConfig.seo.imageAlt,
  };
  return {
    title: fullTitle,
    description: summary,
    applicationName: siteConfig.name,
    category: "Criação de sites e soluções digitais",
    alternates: { canonical: url },
    robots: {
      index: isIndexable,
      follow: true,
      googleBot: { index: isIndexable, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "website", locale: siteConfig.locale, url,
      siteName: siteConfig.name,
      title: title ? fullTitle : siteConfig.seo.shareTitle,
      description: description || siteConfig.seo.shareDescription,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: title ? fullTitle : siteConfig.seo.shareTitle,
      description: description || siteConfig.seo.shareDescription,
      images: [{ url: image.url, alt: image.alt }],
    },
  };
}
