"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const items = [
  { label: "Home", href: "/", preview: "/previews/home.png" },
  { label: "Reading", href: "/reading", preview: "/previews/reading.png" },
  { label: "About", href: "/about", preview: "/previews/about.png" },
  { label: "Projects", href: "/projects", preview: "/previews/projects.png" },
  { label: "Writings", href: "/writing", preview: "/previews/writing.png" },
  { label: "Music", href: "/music", preview: "/previews/music.png" },
];

// vertical rhythm of the nav list: 1rem line + 0.4375rem gap
const ITEM_PITCH = 23;

export default function Nav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <nav
      className="site-nav"
      aria-label="Site"
      onMouseLeave={() => setHovered(null)}
    >
      {items.map((item, i) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? "page" : undefined}
            onMouseEnter={() => setHovered(i)}
          >
            {item.label}
          </Link>
        );
      })}
      <div
        className="nav-preview"
        data-show={hovered !== null || undefined}
        style={{ "--y": `${(hovered ?? 0) * ITEM_PITCH}px` } as React.CSSProperties}
        aria-hidden
      >
        {items.map((item, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={item.href}
            src={item.preview}
            alt=""
            data-visible={hovered === i || undefined}
          />
        ))}
      </div>
    </nav>
  );
}
