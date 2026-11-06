"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { projects, type Project } from "@/data/content";
import { isPageEnabled } from "@/config/site";

const categories = ["Todos", ...Array.from(new Set(projects.map(item => item.category)))];

export function Portfolio({ preview = false }: { preview?: boolean }) {
  const [active, setActive] = useState("Todos");
  const [selected, setSelected] = useState<Project | null>(null);
  const displayed = (preview ? projects.slice(0, 3) : projects).filter(item => active === "Todos" || item.category === active);
  useEffect(() => {
    if (!selected) return;
    const previous = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
      if (event.key === "Tab") {
        const close = document.querySelector<HTMLElement>(".lightbox__close");
        if (close) { event.preventDefault(); close.focus(); }
      }
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; previous?.focus(); };
  }, [selected]);
  return <section className="section portfolio"><div className="container"><div className="section-top"><div className="section-heading"><span className="eyebrow"><span className="eyebrow__line" />04 / Trabalhos selecionados</span><h2>O que nos move,<br /><em>ganha forma.</em></h2><p>[Estudos visuais demonstrativos. Substitua por projetos reais antes de publicar.]</p></div>{preview && isPageEnabled("portfolio") && <a className="text-link" href="/portfolio">Ver portfólio completo <ArrowUpRight size={18} /></a>}</div>{!preview && <div className="filters" role="group" aria-label="Filtrar projetos">{categories.map(category => <button type="button" key={category} onClick={() => setActive(category)} aria-pressed={active === category}>{category}</button>)}</div>}<div className={`portfolio__grid ${preview ? "portfolio__grid--preview" : ""}`}>{displayed.map((project, i) => <button type="button" className="project-card" key={project.id} onClick={() => setSelected(project)} aria-label={`Ver ${project.title}`}><span className="project-card__image"><Image src={project.image} alt={project.alt} fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw" loading={i === 0 && preview ? "eager" : "lazy"} /><span className="project-card__open"><ArrowUpRight size={22} /></span></span><span className="project-card__meta"><span><strong>{project.title}</strong><small>{project.category}</small></span><span>0{i + 1}</span></span></button>)}</div></div>{selected && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Projeto ${selected.title}`} onClick={() => setSelected(null)}><div className="lightbox__panel" onClick={event => event.stopPropagation()}><button type="button" className="lightbox__close" aria-label="Fechar projeto" onClick={() => setSelected(null)} autoFocus><X /></button><div className="lightbox__image"><Image src={selected.image} alt={selected.alt} fill sizes="(max-width: 700px) 100vw, 900px" /></div><div className="lightbox__info"><span className="eyebrow">{selected.category}</span><h2>{selected.title}</h2><p>{selected.description}</p></div></div></div>}</section>;
}
