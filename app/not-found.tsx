import Link from "next/link";

export default function NotFound() { return <section className="not-found"><div className="container"><span className="eyebrow">PÁGINA NÃO ENCONTRADA</span><h1>404<span>✳</span></h1><p>Esta página não está disponível.</p><Link className="button button--primary" href="/">Voltar ao início ↗</Link></div></section>; }
