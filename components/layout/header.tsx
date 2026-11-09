"use client";

import Link from "next/link";
import { HeaderControls } from "@/components/shop/experience-provider";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { enabledNavigation, primaryCtaHref, siteConfig } from "@/config/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 851px)");
    const onChange = () => { if (desktop.matches) setOpen(false); };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (event.key === "Tab") {
        const links = Array.from(menuRef.current?.querySelectorAll<HTMLAnchorElement>("a") ?? []);
        const first = links[0];
        const last = links.at(-1);
        if (!first || !last) return;
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          toggleRef.current?.focus();
        } else if (!event.shiftKey && document.activeElement === toggleRef.current) {
          event.preventDefault();
          first.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggleRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => { document.body.style.overflow = previousOverflow; document.removeEventListener("keydown", onKeyDown); };
  }, [open]);
  const nav = enabledNavigation();
  return <header className="site-header">
    <div className="container site-header__inner">
      <Link href="/" className="brand" aria-label={`${siteConfig.name}, ir ao início`}><span className="logo-crop"><img src="/images/cjbr-logo-transparent.webp" alt="CJBR Sites" width="440" height="147" decoding="async" /></span></Link>
      <nav className="desktop-nav" aria-label="Navegação principal">{nav.map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>
      <HeaderControls/>
      <Link className="header-cta" href={primaryCtaHref()}>{siteConfig.cta.label}<ArrowUpRight size={16} aria-hidden="true" /></Link>
      <button ref={toggleRef} className="menu-toggle" type="button" onClick={() => setOpen(!open)} aria-label={open ? "Fechar menu" : "Abrir menu"} aria-expanded={open} aria-controls="mobile-nav">{open ? <X /> : <Menu />}</button>
    </div>
    <nav ref={menuRef} id="mobile-nav" className={`mobile-nav ${open ? "mobile-nav--open" : ""}`} aria-label="Navegação mobile" inert={!open}>{nav.map((item, i) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}><span>0{i + 1}</span>{item.label}<ArrowUpRight size={20} /></Link>)}</nav>
  </header>;
}
