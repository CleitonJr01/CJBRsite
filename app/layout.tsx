import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteConfig, siteUrl } from "@/config/site";
import { makeMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = { ...makeMetadata(), metadataBase: new URL(siteUrl), icons: { icon: "/favicon.svg" } };
export const viewport: Viewport = { themeColor: "#ffffff" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body><a className="skip-link" href="#main">Pular para o conteúdo</a><Header /><main id="main">{children}</main><Footer /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Organization", name: siteConfig.name, url: siteUrl, description: siteConfig.description }).replace(/</g, "\\u003c") }} /></body></html>;
}
