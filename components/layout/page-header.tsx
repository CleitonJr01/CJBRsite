export function PageHeader({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero"><div className="container page-hero__inner"><span className="eyebrow"><span className="eyebrow__line" />{eyebrow}</span><h1>{title}</h1><p>{description}</p><span className="page-hero__asterisk" aria-hidden="true">✳</span></div></section>;
}
