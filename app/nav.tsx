"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const items = [
  { label: "Home", href: "/", preview: "/previews/home.png" },
  { label: "Reading", href: "/reading", preview: "/previews/reading.png" },
  { label: "About", href: "/about", preview: "/previews/about.png" },
  { label: "Projects", href: "/projects", preview: "/previews/projects.png" },
  { label: "Writings", href: "/writing", preview: "/previews/writing.png" },
  { label: "Music", href: "/music", preview: "/previews/music.png" },
];

// vertical rhythm of the nav list: 1rem line + 0.875rem gap
const ITEM_PITCH = 30;

export default function Nav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const links = nav.querySelectorAll("a");
    const ctx = gsap.context(() => {
      gsap.from(links, {
        x: -14,
        autoAlpha: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.07,
        delay: 0.1,
        clearProps: "all",
      });
    }, nav);
    return () => ctx.revert();
  }, []);

  const nudge = (el: HTMLElement, x: number) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.to(el, { x, duration: 0.3, ease: "power3.out" });
  };

  return (
    <nav
      ref={navRef}
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
            onMouseEnter={(e) => {
              setHovered(i);
              nudge(e.currentTarget, 4);
            }}
            onMouseLeave={(e) => nudge(e.currentTarget, 0)}
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
