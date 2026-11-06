import { siteConfig, siteUrl } from "@/config/site";
import { plans, dailyPackages } from "@/data/landing";

export function StructuredData() {
  const organization = `${siteUrl}/#organization`;
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization", "@id": organization,
        name: siteConfig.name, url: `${siteUrl}/`, description: siteConfig.description,
        logo: { "@type": "ImageObject", url: `${siteUrl}/images/cjbr-logo.webp`, width: 440, height: 160 },
      },
      {
        "@type": "WebSite", "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`, name: siteConfig.name, inLanguage: "pt-BR",
        publisher: { "@id": organization },
      },
      {
        "@type": "WebPage", "@id": `${siteUrl}/#webpage`,
        url: `${siteUrl}/`, name: siteConfig.seo.title, description: siteConfig.seo.description,
        inLanguage: "pt-BR", isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": organization },
        primaryImageOfPage: { "@type": "ImageObject", url: `${siteUrl}${siteConfig.seo.ogImage}`, width: 1200, height: 630 },
      },
      {
        "@type": "Service", "@id": `${siteUrl}/#servicos-digitais`,
        name: "Criação de sites e soluções digitais", serviceType: "Desenvolvimento de sites",
        provider: { "@id": organization }, url: `${siteUrl}/#planos`,
        hasOfferCatalog: {
          "@type": "OfferCatalog", name: "Sites e pacotes digitais CJBR Sites",
          itemListElement: [...plans, ...dailyPackages].map(plan => ({
            "@type": "Offer", name: plan.name,
            price: plan.price.replaceAll(".", "").replace(",", "."), priceCurrency: "BRL",
            url: `${siteUrl}/${plans.some(p => p.name === plan.name) ? "#planos" : "#sistemas"}`,
            description: `${plan.description} Criação com pagamento único. Hospedagem e domínio separados.`,
            itemOffered: { "@type": "Service", name: plan.name, description: plan.description, provider: { "@id": organization } },
          })),
        },
      },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />;
}
