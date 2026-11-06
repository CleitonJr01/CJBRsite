import { ArrowUpRight, Mail, MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";
export function ContactOptions() {
 const whatsapp: string = siteConfig.contact.whatsapp;
 const email: string = siteConfig.contact.email;
 return <div className="contact-options"><div className="contact-channel"><MessageCircle size={24}/><div><strong>Vamos conversar pelo WhatsApp</strong><p>Conte sua ideia e encontre a solução certa.</p></div>{whatsapp ? <a className="button button-white" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(siteConfig.contact.message)}`} target="_blank" rel="noopener noreferrer">Iniciar conversa <ArrowUpRight size={18}/></a> : <button className="button button-white" disabled>WhatsApp em breve <ArrowUpRight size={18}/></button>}</div><div className="contact-email"><Mail size={18}/>{email ? <a href={`mailto:${email}`}>{email}</a> : <span>E-mail de contato em breve</span>}</div></div>;
}
