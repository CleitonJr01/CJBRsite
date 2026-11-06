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
    message: "Olá! Conheci a CJBR Sites e gostaria de conversar sobre um projeto para minha empresa.",
    address: "[Endereço da empresa]",
    hours: "[Horário de atendimento]",
  },
  social: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
  ],
  seo: {
    title: "Criação de Sites Profissionais a partir de R$ 497 | CJBR Sites",
    description: "Crie seu site profissional com a CJBR Sites. Planos a partir de R$ 497, landing pages, pedidos no WhatsApp e agendamentos. Conheça os pacotes.",
    ogImage: "/images/social/cjbr-compartilhamento-v1.jpg",
    shareTitle: "CJBR Sites | Seu próximo passo no digital",
    shareDescription: "Sites profissionais a partir de R$ 497. Conheça nossos planos, landing pages e soluções para pedidos e agendamentos.",
    imageAlt: "CJBR Sites — Seu próximo passo no digital. Sites, landing pages e soluções para o seu negócio.",
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

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
const publicUrl = new URL(!configuredUrl || configuredUrl.includes("exemplo.com.br")
  ? "https://cjbrsites.vercel.app"
  : configuredUrl);
if (!["https:", "http:"].includes(publicUrl.protocol)) {
  throw new Error("NEXT_PUBLIC_SITE_URL deve ser uma URL HTTP ou HTTPS válida.");
}
export const siteUrl = publicUrl.origin;
export const isIndexable = !["preview", "development"].includes(process.env.VERCEL_ENV ?? "");

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
