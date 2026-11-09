import { Mail } from "lucide-react";
import { QuoteContactLinks } from "@/components/shop/quote-builder";
import { siteConfig } from "@/config/site";
export function ContactOptions() {
  return <div className="contact-options"><div className="contact-channel"><Mail size={24}/><div><strong>Conte o que você precisa.</strong><p>Os serviços escolhidos no orçamento vão junto na mensagem.</p></div><QuoteContactLinks/></div><div className="contact-email"><Mail size={18}/><a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></div></div>;
}
