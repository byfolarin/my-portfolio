"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Home", href: "/" },
  { label: "Reading", href: "/reading" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Writings", href: "/writing" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="site-nav" aria-label="Site">
      {items.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
