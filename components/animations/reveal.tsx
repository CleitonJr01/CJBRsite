"use client";

import { useEffect, useRef } from "react";

export function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !('IntersectionObserver' in window)) return;
    const element = ref.current;
    if (!element || element.getBoundingClientRect().top < window.innerHeight) return;
    element.classList.add("reveal--pending");
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { element.classList.remove("reveal--pending"); observer.disconnect(); } }, { threshold: 0.12 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
