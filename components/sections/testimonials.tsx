import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { showTestimonials, testimonials } from "@/data/content";
import { SectionHeading } from "@/components/ui/section-heading";

export function Testimonials() {
  if (!showTestimonials || testimonials.length === 0) return null;
  return <section className="section testimonials"><div className="container"><SectionHeading eyebrow="05 / Depoimentos" title="Histórias que ficam." description="O que nossos clientes compartilham sobre a experiência." /><div className="testimonials__grid">{testimonials.map((item, i) => <blockquote className="testimonial-card" key={`${item.name}-${i}`}><Quote size={30} aria-hidden="true" />{item.rating && <div className="testimonial-card__rating" aria-label={`Avaliação: ${item.rating} de 5`}>{Array.from({ length: item.rating }, (_, index) => <Star size={15} fill="currentColor" key={index} />)}</div>}<p>“{item.quote}”</p><footer>{item.image && <Image src={item.image} alt="" width={44} height={44} />}<span><strong>{item.name}</strong>{item.role && <small>{item.role}</small>}</span></footer></blockquote>)}</div></div></section>;
}
