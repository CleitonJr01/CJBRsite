"use client";

import { Check, Plus, Trash2, Mail, MessageCircle, ArrowUpRight, ShoppingBag } from "lucide-react";
import { useExperience } from "./experience-provider";
import { selectedItems, quoteTotals, quoteMessage, money, contactLinks } from "@/lib/quote";
import { siteConfig } from "@/config/site";

export function SelectService({id, label = "Adicionar ao orçamento", featured = false}: { id: string; label?: string; featured?: boolean }) {
  const {ids,toggle}=useExperience(); const selected=ids.includes(id);
  return <button type="button" className={`button select-service ${selected?"button-selected":featured?"button-blue":"button-outline"}`} onClick={()=>toggle(id)} aria-pressed={selected}>{selected?"Selecionado — remover":label}{selected?<Check size={17}/>:<Plus size={17}/>}</button>;
}
export function QuoteContactLinks({requireItems = false}:{requireItems?:boolean}) {
  const {ids, notes}=useExperience();
  const links=contactLinks(quoteMessage(ids,notes),siteConfig.contact.email,siteConfig.contact.whatsapp);
  const disabled=requireItems && !ids.length;
  return <div className="quote-contact-links">
    {disabled?<button className="button button-blue" disabled>Selecione um serviço para continuar</button>:<a className="button button-blue" href={links.gmail} target="_blank" rel="noopener noreferrer"><Mail size={18}/> {ids.length?"Abrir orçamento no Gmail":"Conversar pelo Gmail"}<ArrowUpRight size={17}/></a>}
    {links.whatsapp && !disabled?<a className="button button-outline" href={links.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Enviar pelo WhatsApp</a>:<button className="button button-outline" disabled><MessageCircle size={18}/> WhatsApp — Em breve</button>}
    {!disabled && <a className="text-link" href={links.email}>Usar outro aplicativo de e-mail <ArrowUpRight size={15}/></a>}
    <p className="sending-note">O texto abre preenchido. Confira e envie pelo seu aplicativo. Nenhuma mensagem é enviada automaticamente.</p>
  </div>;
}
export function QuoteBuilder() {
  const {ids,toggle,clear,notes,setNotes}=useExperience();const items=selectedItems(ids), totals=quoteTotals(ids);
  return <section id="orcamento" className="section quote-section"><div className="container"><div className="section-heading"><div><span className="eyebrow">SEU PROJETO, DO SEU JEITO</span><h2>Monte seu orçamento.</h2></div><p>Escolha os serviços nos cartões acima.<br/>Depois, envie sua seleção para conversarmos.</p></div><div className="quote-layout"><div className="quote-items">
    {items.length?<><div className="quote-items-heading"><strong>{items.length} {items.length===1?"item selecionado":"itens selecionados"}</strong><button className="text-button" onClick={clear}>Limpar seleção</button></div><ul>{items.map(item=><li key={item.id}><div><strong>{item.name}</strong><small>{item.monthly?"Cobrança mensal":"Criação ou adicional · pagamento único"}</small></div><span>{item.from?"A partir de ":""}{money(item.cents)}{item.monthly?"/mês":""}</span><button type="button" className="icon-button" onClick={()=>toggle(item.id)} aria-label={`Remover ${item.name}`}><Trash2 size={17}/></button></li>)}</ul></>:<div className="quote-empty"><ShoppingBag size={32}/><h3>Sua seleção começa aqui.</h3><p>Escolha um plano, um pacote ou um serviço adicional. Não há cobrança nesta etapa.</p><a href="#planos" className="text-link">Ver os planos <ArrowUpRight size={17}/></a></div>}
    <label className="quote-notes">Quer contar mais sobre sua ideia?<textarea value={notes} onChange={e=>setNotes(e.target.value)} maxLength={500} rows={4} placeholder="Ex.: tenho uma barbearia e quero mostrar os serviços e os horários."/><small>{notes.length}/500 caracteres. Evite enviar dados sensíveis.</small></label>
  </div><aside className="quote-summary" aria-label="Resumo do orçamento"><h3>Resumo da sua escolha</h3><dl><div><dt>Criação e adicionais{totals.from?" (a partir de)":""}</dt><dd>{money(totals.once)}</dd></div><div><dt>Mensalidade</dt><dd>{money(totals.monthly)}<small>/mês</small></dd></div></dl><div className="domain-notice"><strong>Domínio não incluído.</strong><p>O endereço do site é registrado e pago separadamente por você. Ferramentas externas e taxas também podem ter custos próprios.</p></div><p className="quote-disclaimer">Estimativa para conversar, não uma compra. Confirmaremos os serviços, a compatibilidade dos adicionais e o valor final antes de começar. Para um único site, escolha somente um plano de criação e um mensal.</p><QuoteContactLinks requireItems/></aside></div></div></section>;
}
