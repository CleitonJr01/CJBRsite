"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { Moon, Sun, ShoppingBag, Cookie, X } from "lucide-react";
import { catalog, toggleItem } from "@/lib/quote";

type Consent = "necessary" | "preferences" | null;
type Experience = { ids: string[]; toggle: (id: string) => void; clear: () => void; notes: string; setNotes: (text: string) => void; dark: boolean; changeTheme: () => void; openCookies: () => void };
const Context = createContext<Experience | null>(null);
export function useExperience() { const value = useContext(Context); if (!value) throw new Error("ExperienceProvider ausente"); return value; }
const keys = { consent: "cjbr-consent-v1", theme: "cjbr-theme-v1", cart: "cjbr-quote-v1" };
export function ExperienceProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [dark, setDark] = useState(false);
  const [consent, setConsent] = useState<Consent>(null);
  const [cookiesOpen, setCookiesOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    let saved: Consent = null;
    let theme: string | null = null;
    try {
      const value = localStorage.getItem(keys.consent);
      saved = value === "necessary" || value === "preferences" ? value : null;
      if (saved === "preferences") {
        theme = localStorage.getItem(keys.theme);
        const items: unknown = JSON.parse(localStorage.getItem(keys.cart) || "[]");
        if (Array.isArray(items)) setIds(items.filter((id): id is string => typeof id === "string" && catalog.some(i => i.id === id)).reduce<string[]>((list,id) => list.includes(id) ? list : toggleItem(list,id), []));
      }
    } catch { /* O site continua funcionando sem armazenamento. */ }
    setDark(theme === "dark" || (theme !== "light" && window.matchMedia("(prefers-color-scheme: dark)").matches));
    setConsent(saved); setCookiesOpen(!saved); setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    try {
      if (consent === "preferences") {
        localStorage.setItem(keys.theme, dark ? "dark" : "light");
        localStorage.setItem(keys.cart, JSON.stringify(ids));
      } else { localStorage.removeItem(keys.theme); localStorage.removeItem(keys.cart); }
    } catch { /* Preferências permanecem nesta visita. */ }
  }, [dark, ids, consent, ready]);
  function choose(value: Exclude<Consent,null>) {
    setConsent(value); setCookiesOpen(false);
    try { localStorage.setItem(keys.consent, value); } catch { /* Sem armazenamento persistente. */ }
  }
  function toggle(id: string) {
    const item = catalog.find(i => i.id === id);
    setIds(current => toggleItem(current, id));
    if (item) setAnnouncement(ids.includes(id) ? `${item.name} removido.` : `${item.name} selecionado.${item.group ? " A opção anterior dessa categoria foi substituída, se havia uma." : ""}`);
  }
  return <Context.Provider value={{ids, toggle, clear:()=>setIds([]), notes, setNotes, dark, changeTheme:()=>setDark(v=>!v), openCookies:()=>setCookiesOpen(true)}}>
    {children}
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
    {ready && cookiesOpen && <section className="cookie-banner" role="region" aria-label="Cookies e preferências">
      <div className="cookie-heading"><Cookie size={22}/><h2>Você escolhe o que fica salvo.</h2>{consent && <button type="button" aria-label="Fechar preferências" className="icon-button" onClick={()=>setCookiesOpen(false)}><X size={18}/></button>}</div>
      <p>Não usamos cookies de publicidade ou medição de visitas. Guardamos sua decisão neste navegador. Se permitir, também lembraremos o modo claro/escuro e os serviços escolhidos. Sem isso, eles funcionam apenas nesta visita.</p>
      <details><summary>Entenda o que é salvo</summary><p>Usamos armazenamento local do navegador, não cookies de rastreamento. Não salvamos suas observações. Ao escolher “Só o necessário”, apagamos o tema e a seleção que estavam salvos. Você pode mudar esta escolha no botão “Cookies” do rodapé. Os links de Gmail e WhatsApp abrem serviços externos com suas próprias regras.</p></details>
      <div className="cookie-actions"><button className="button button-outline" onClick={()=>choose("necessary")}>Só o necessário</button><button className="button button-blue" onClick={()=>choose("preferences")}>Salvar preferências</button></div>
    </section>}
  </Context.Provider>;
}
export function HeaderControls() {
  const {ids,dark,changeTheme} = useExperience();
  return <div className="header-controls"><button className="icon-button theme-toggle" onClick={changeTheme} type="button" aria-label={dark?"Ativar modo claro":"Ativar modo escuro"} title={dark?"Modo claro":"Modo escuro"}>{dark?<Sun size={20}/>:<Moon size={20}/>}</button><a className="cart-link" href="/#orcamento" aria-label={`Ver orçamento, ${ids.length} itens`}><ShoppingBag size={19}/><span className="cart-label">Orçamento</span><span className="cart-count">{ids.length}</span></a></div>;
}
export function CookieSettingsButton() { const {openCookies}=useExperience();return <button type="button" className="cookie-settings" onClick={openCookies}><Cookie size={14}/> Cookies</button>; }
