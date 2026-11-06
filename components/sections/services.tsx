import { ArrowUpRight, Compass, Layers3, Sparkles } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { services } from "@/data/content";
import { isPageEnabled } from "@/config/site";

const icons = { compass: Compass, layers: Layers3, sparkles: Sparkles };

export function Services({ full = false }: { full?: boolean }) {
  return <section className="section services"><div className="container"><div className="section-top"><SectionHeading eyebrow="02 / O que fazemos" title="Ideias, da origem ao impacto." description="[Apresente serviços que respondem aos desafios reais do seu público.]" />{!full && isPageEnabled("servicos") && <Button href="/servicos" variant="outline">Todos os serviços</Button>}</div><div className="services__grid">{services.map((service, i) => { const Icon = icons[service.icon as keyof typeof icons]; return <Reveal key={service.id} delay={i * 90}><article className="service-card"><div className="service-card__top"><span>{service.number} / SERVIÇO</span><Icon size={28} strokeWidth={1.5} aria-hidden="true" /></div><div><h3>{service.title}</h3><p>{service.description}</p>{full && <p className="service-card__detail">{service.detail}</p>}</div><span className="service-card__arrow" aria-hidden="true"><ArrowUpRight size={21} /></span></article></Reveal>; })}</div></div></section>;
}
