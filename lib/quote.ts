import { plans, dailyPackages, carePlans, extras } from "@/data/landing";

export type QuoteItem = { id: string; name: string; cents: number; monthly: boolean; group?: string; from?: boolean };
const cents = (value: string) => Math.round(Number(value.replace(/[^\d,]/g, "").replace(",", ".")) * 100);
export const catalog: QuoteItem[] = [
  ...plans.map((p, i) => ({ id: `site-${i}`, name: `Site ${p.name}`, cents: cents(p.price), monthly: false, group: "site" })),
  { id: "landing", name: "Página de apresentação de uma oferta", cents: 49700, monthly: false, group: "site" },
  ...dailyPackages.map((p, i) => ({ id: `package-${i}`, name: p.name, cents: cents(p.price), monthly: false, group: i < 2 ? "store" : undefined })),
  ...carePlans.map((p, i) => ({ id: `care-${i}`, name: p.name, cents: cents(p.price), monthly: true, group: "care" })),
  ...extras.map(([name, price], i) => ({ id: `extra-${i}`, name, cents: cents(price), monthly: false, from: price.startsWith("A partir") })),
];
export const money = (value: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value / 100);
export function selectedItems(ids: string[]) { return catalog.filter(item => ids.includes(item.id)); }
export function toggleItem(ids: string[], id: string) {
  const item = catalog.find(i => i.id === id);
  if (!item) return ids;
  if (ids.includes(id)) return ids.filter(i => i !== id);
  const remaining = selectedItems(ids).filter(i => !item.group || i.group !== item.group).map(i => i.id);
  return [...remaining, id];
}
export function quoteTotals(ids: string[]) {
  return selectedItems(ids).reduce((sum, item) => ({ once: sum.once + (item.monthly ? 0 : item.cents), monthly: sum.monthly + (item.monthly ? item.cents : 0), from: sum.from || !!item.from }), { once: 0, monthly: 0, from: false });
}
export function quoteMessage(ids: string[], notes = "") {
  const items = selectedItems(ids), totals = quoteTotals(ids);
  if (!items.length) return "Olá! Conheci a CJBR Sites e gostaria de ajuda para escolher uma solução para minha empresa.";
  return ["Olá! Gostaria de um orçamento na CJBR Sites para:", "", ...items.map(item => `• ${item.name}: ${item.from ? "a partir de " : ""}${money(item.cents)}${item.monthly ? "/mês" : " (pagamento único)"}`), "", `Criação e adicionais: ${totals.from ? "a partir de " : ""}${money(totals.once)}`, `Mensalidade: ${money(totals.monthly)}/mês`, "", "Domínio não incluído. Ferramentas externas e taxas são cobradas à parte, quando necessárias. Valores e compatibilidade serão confirmados na proposta. Esta mensagem não confirma contratação.", ...(notes.trim() ? ["", `Observações: ${notes.trim().slice(0,500)}`] : [])].join("\n");
}
export function contactLinks(message: string, email: string, whatsapp: string) {
  const subject = "Pedido de orçamento — CJBR Sites";
  return {
    gmail: `https://mail.google.com/mail/?${new URLSearchParams({view:"cm", fs:"1", to:email, su:subject, body:message})}`,
    email: `mailto:${email}?${new URLSearchParams({subject, body:message}).toString().replaceAll("+", "%20")}`,
    whatsapp: whatsapp ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}` : null,
  };
}
