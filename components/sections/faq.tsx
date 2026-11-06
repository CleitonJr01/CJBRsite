"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faqs } from "@/data/content";
import { isPageEnabled } from "@/config/site";

export function FAQ({ compact = false }: { compact?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="section faq"><div className="container faq__grid"><div className="faq__intro"><span className="eyebrow"><span className="eyebrow__line" />06 / Perguntas frequentes</span><h2>Boas perguntas.<br /><em>Respostas claras.</em></h2><p>[Edite as perguntas e respostas para refletir seu processo real.]</p>{compact && isPageEnabled("faq") && <a href="/faq" className="text-link">Ver todas as perguntas ↗</a>}</div><div className="faq__items">{(compact ? faqs.slice(0, 3) : faqs).map((item, i) => <div className="faq__item" key={item.question}><h3><button type="button" aria-expanded={open === i} aria-controls={`faq-answer-${i}`} onClick={() => setOpen(open === i ? null : i)}><span>{item.question}</span><Plus className={open === i ? "faq__plus--open" : ""} size={21} aria-hidden="true" /></button></h3><div id={`faq-answer-${i}`} hidden={open !== i}><p>{item.answer}</p></div></div>)}</div></div></section>;
}
