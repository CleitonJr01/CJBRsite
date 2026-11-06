export type PageKey = "sobre" | "servicos" | "portfolio" | "depoimentos" | "faq" | "contato";
export type SectionKey = "intro" | "services" | "benefits" | "portfolio" | "testimonials" | "faq" | "cta";

export const siteConfig = {
  name: "CJBR Sites",
  shortName: "CJBR",
  logo: { mark: "✳", descriptor: "SITES & SOLUÇÕES DIGITAIS" },
  tagline: "Seu próximo passo no digital.",
  description: "Sites profissionais, sistemas e anúncios para conectar sua empresa a novas possibilidades.",
  locale: "pt_BR",
  contact: {
    email: "",
    phone: "+55 00 00000-0000",
    whatsapp: "",
    address: "[Endereço da empresa]",
    hours: "[Horário de atendimento]",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  seo: {
    title: "CJBR Sites | Sites e soluções digitais",
    description: "Conheça os planos de sites, landing pages, sistemas, tráfego pago e suporte da CJBR Sites.",
    ogImage: "/images/cjbr-sites-logo-v4.png",
  },
  cta: { label: "Iniciar conversa", href: "/#contato", secondaryLabel: "Explorar projetos", secondaryHref: "/portfolio" },
  navigation: [
    { label: "Soluções", href: "/#solucoes" },
    { label: "Planos", href: "/#planos" },
    { label: "Anúncios", href: "/#anuncios" },
    { label: "Como funciona", href: "/#processo" },
    { label: "Dúvidas", href: "/#duvidas" },
  ],
  pages: {
    sobre: false,
    servicos: false,
    portfolio: false,
    depoimentos: false,
    faq: false,
    contato: false,
  } satisfies Record<PageKey, boolean>,
  homeSections: ["intro", "services", "benefits", "portfolio", "testimonials", "faq", "cta"] as SectionKey[],
} as const;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://exemplo.com.br";

export function isPageEnabled(key: PageKey) {
  return siteConfig.pages[key];
}

export function enabledNavigation() { return siteConfig.navigation; }

export function availableHref(href: string) {
  if (href.startsWith("/#")) return true;
  if (!href.startsWith("/") || href === "/") return true;
  const key = href.slice(1) as PageKey;
  return key in siteConfig.pages && isPageEnabled(key);
}

export function primaryCtaHref() {
  return availableHref(siteConfig.cta.href) ? siteConfig.cta.href : `mailto:${siteConfig.contact.email}`;
}
