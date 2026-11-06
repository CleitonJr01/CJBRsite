"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, LoaderCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [message, setMessage] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setState("loading");
    try {
      const data = Object.fromEntries(new FormData(form).entries());
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar sua mensagem.");
      setMessage("Mensagem enviada. Entraremos em contato em breve.");
      setState("success");
      form.reset();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Não foi possível enviar sua mensagem.");
      setState("error");
    }
  }
  return <form className="contact-form" onSubmit={submit}><div className="contact-form__row"><div className="field"><label htmlFor="name">Seu nome <span>*</span></label><input id="name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={100} placeholder="Como podemos chamar você?" /></div><div className="field"><label htmlFor="email">Seu e-mail <span>*</span></label><input id="email" name="email" type="email" autoComplete="email" required maxLength={200} placeholder="voce@exemplo.com" /></div></div><div className="contact-form__row"><div className="field"><label htmlFor="phone">Telefone</label><input id="phone" name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="(00) 00000-0000" /></div><div className="field"><label htmlFor="subject">Assunto <span>*</span></label><select id="subject" name="subject" required defaultValue=""><option value="" disabled>Selecione um assunto</option><option value="projeto">Novo projeto</option><option value="servico">Serviços</option><option value="outro">Outro assunto</option></select></div></div><div className="field"><label htmlFor="message">Sua mensagem <span>*</span></label><textarea id="message" name="message" rows={6} required minLength={10} maxLength={5000} placeholder="Conte um pouco sobre o que você tem em mente..." /></div><div className="field--hidden" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" /></div><div className="contact-form__bottom"><p>Ao enviar, você concorda em receber uma resposta ao seu contato.</p><button type="submit" disabled={state === "loading"}>{state === "loading" ? <>Enviando <LoaderCircle className="spin" size={17} /></> : <>Enviar mensagem <ArrowUpRight size={18} /></>}</button></div>{state !== "idle" && state !== "loading" && <p className={`form-feedback form-feedback--${state}`} role="status">{message}</p>}</form>;
}
