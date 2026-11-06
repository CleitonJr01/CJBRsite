import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { benefits } from "@/data/content";

export function Benefits() {
  return <section className="section benefits"><div className="container benefits__grid"><Reveal><div className="benefits__art"><span>ALÉM DO<br />ESPERADO<span className="benefits__star">✳</span></span><div className="benefits__arc" /><small>FORMA + PROPÓSITO</small></div></Reveal><div className="benefits__content"><span className="eyebrow"><span className="eyebrow__line" />03 / Nossa abordagem</span><h2>O jeito de fazer<br /><em>faz diferença.</em></h2><p>[Explique aqui a filosofia de trabalho da marca de forma específica e verificável.]</p><div className="benefits__list">{benefits.map((item, i) => <Reveal key={item.title} delay={i * 80}><div className="benefits__item"><span>0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><ArrowUpRight size={18} aria-hidden="true" /></div></Reveal>)}</div></div></div></section>;
}
