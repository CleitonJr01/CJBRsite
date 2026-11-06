import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = { href: string; children: React.ReactNode; variant?: "primary" | "outline" | "light"; className?: string };

export function Button({ href, children, variant = "primary", className = "" }: Props) {
  return <Link href={href} className={`button button--${variant} ${className}`}>{children}<ArrowUpRight aria-hidden="true" size={18} /></Link>;
}
