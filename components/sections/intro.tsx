import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { isPageEnabled } from "@/config/site";

export function Intro() {
  return <section id="conteudo" className="section intro"><div className="container intro__grid"><Reveal><span className="eyebrow"><span className="eyebrow__line" />01 / Nossa essência</span><div className="intro__symbol" aria-hidden="true">✳</div></Reveal><Reveal delay={120}><h2>Não seguimos<br />fórmulas.<br /><em>Criamos caminhos.</em></h2><div className="intro__lower"><p>[Conte em poucas linhas o que torna a marca singular. Use uma história verdadeira, focada nas necessidades e aspirações do cliente.]</p>{isPageEnabled("sobre") && <Button href="/sobre" variant="outline">Conheça nossa história</Button>}</div></Reveal></div><div className="container intro__foot"><span>01 — 07</span><ArrowUpRight size={20} aria-hidden="true" /></div></section>;
}
