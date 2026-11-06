import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try { body = await request.json(); } catch { return NextResponse.json({ message: "Dados inválidos." }, { status: 400 }); }
  const read = (key: string) => typeof body[key] === "string" ? (body[key] as string).trim() : "";
  if (read("website")) return NextResponse.json({ message: "Mensagem recebida." });
  const name = read("name"), email = read("email"), phone = read("phone"), subject = read("subject"), message = read("message");
  if (name.length < 2 || name.length > 100 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200 || phone.length > 30 || !["projeto", "servico", "outro"].includes(subject) || message.length < 10 || message.length > 5000) return NextResponse.json({ message: "Confira os campos e tente novamente." }, { status: 400 });
  const endpoint = process.env.CONTACT_WEBHOOK_URL;
  if (!endpoint) return NextResponse.json({ message: "Envio ainda não configurado. Use o e-mail ou WhatsApp informado nesta página." }, { status: 503 });
  try {
    const url = new URL(endpoint);
    if (url.protocol !== "https:") throw new Error("HTTPS obrigatório");
    const response = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, subject, message }), signal: AbortSignal.timeout(8000), cache: "no-store" });
    if (!response.ok) throw new Error("Falha no destino");
    return NextResponse.json({ message: "Mensagem enviada." });
  } catch { return NextResponse.json({ message: "Não foi possível enviar agora. Tente novamente ou use outro canal de contato." }, { status: 502 }); }
}
