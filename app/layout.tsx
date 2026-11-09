import { ExperienceProvider } from "@/components/shop/experience-provider";
import type { Metadata, Viewport } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { siteUrl } from "@/config/site";
import { makeMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  ...makeMetadata(),
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/favicon-48.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};
export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light dark" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: `(function(){try{var c=localStorage.getItem('cjbr-consent-v1');var t=c==='preferences'?localStorage.getItem('cjbr-theme-v1'):null;document.documentElement.dataset.theme=t==='dark'||(t!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches)?'dark':'light'}catch(e){}})();` }} /></head><body><ExperienceProvider><a className="skip-link" href="#main">Pular para o conteúdo</a><Header /><main id="main">{children}</main><Footer /></ExperienceProvider></body></html>;
}
