import { ArrowUpRight } from "lucide-react";
import { primaryCtaHref, siteConfig } from "@/config/site";

export function CTA() {
  return <section className="cta-band"><div className="container cta-band__inner"><div><span className="eyebrow"><span className="eyebrow__line" />07 / Próximo passo</span><h2>Tem uma ideia?<br /><em>Vamos dar forma.</em></h2></div><a href={primaryCtaHref()} className="cta-band__button">{siteConfig.cta.label}<ArrowUpRight size={21} /></a><span className="cta-band__decoration" aria-hidden="true">✳</span></div></section>;
}
