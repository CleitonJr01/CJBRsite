import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Mail, MapPin, Phone, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/layout/page-header";
import { Services } from "@/components/sections/services";
import { Benefits } from "@/components/sections/benefits";
import { Portfolio } from "@/components/sections/portfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { ContactForm } from "@/components/sections/contact-form";
import { siteConfig, isPageEnabled, type PageKey } from "@/config/site";
import { pageContent, showTestimonials, testimonials } from "@/data/content";
import { makeMetadata } from "@/lib/seo";

function validPage(slug: string): slug is PageKey { return slug in siteConfig.pages && isPageEnabled(slug as PageKey); }

export function generateStaticParams() { return (Object.keys(siteConfig.pages) as PageKey[]).filter(isPageEnabled).map(slug => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!validPage(slug)) return {};
  const page = pageContent[slug];
  return makeMetadata(page.title, page.description, `/${slug}`);
}

export default async function DetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!validPage(slug)) notFound();
  const page = pageContent[slug];
  return <><PageHeader {...page} />
    {slug === "sobre" && <><section className="section about-page"><div className="container about-page__grid"><div className="about-page__graphic"><span>UMA IDEIA<br />PODE MUDAR<br />TUDO.</span><b aria-hidden="true">✳</b></div><div><span className="eyebrow"><span className="eyebrow__line" />Nossa essência</span><h2>Conexões reais.<br /><em>Ideias singulares.</em></h2><p>[Conte aqui a origem da empresa, sua missão e os princípios que orientam o trabalho. Use informações reais e específicas.]</p><p>[Acrescente a experiência da equipe e a forma como ela colabora com os clientes.]</p></div></div></section><Benefits /><CTA /></>}
    {slug === "servicos" && <><Services full /><Benefits /><CTA /></>}
    {slug === "portfolio" && <><Portfolio /><CTA /></>}
    {slug === "depoimentos" && <>{showTestimonials && testimonials.length > 0 ? <Testimonials /> : <section className="section empty-state"><div className="container"><span className="eyebrow">DEPOIMENTOS</span><h2>Histórias reais<br /><em>merecem espaço.</em></h2><p>[Adicione depoimentos autorizados em data/content.ts e ative a publicação.]</p></div></section>}<CTA /></>}
    {slug === "faq" && <><FAQ /><CTA /></>}
    {slug === "contato" && <section className="section contact-page"><div className="container contact-page__grid"><div className="contact-page__aside"><span className="eyebrow"><span className="eyebrow__line" />Entre em contato</span><h2>Vamos começar<br /><em>uma conversa.</em></h2><p>[Explique como funciona o contato e em quanto tempo a equipe costuma responder.]</p><div className="contact-page__links"><a href={`mailto:${siteConfig.contact.email}`}><Mail size={20} />{siteConfig.contact.email}<ArrowUpRight size={17} /></a><a href={`https://wa.me/${siteConfig.contact.whatsapp}`} target="_blank" rel="noopener noreferrer"><Phone size={20} />WhatsApp<ArrowUpRight size={17} /></a><div><MapPin size={20} />{siteConfig.contact.address}</div></div><span className="contact-page__hours">{siteConfig.contact.hours}</span></div><ContactForm /></div></section>}
  </>;
}
