"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { navState } from "./nav-state";

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

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function isActive(href: string, pathname: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Nav() {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // count route CHANGES only — the first page of a session must leave the
  // counter at zero no matter what order effects flush in. Also record
  // whether the change came from a nav click.
  const firstRoute = useRef(true);
  useEffect(() => {
    if (firstRoute.current) {
      firstRoute.current = false;
      navState.pendingNavClick = false;
      return;
    }
    navState.count++;
    navState.viaNav = navState.pendingNavClick;
    navState.pendingNavClick = false;
  }, [pathname]);

  // desktop entrance
  useLayoutEffect(() => {
    const nav = navRef.current;
    if (!nav || reduceMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from(nav.querySelectorAll("a"), {
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

  // mobile overlay timeline: circular bloom from the button, then links
  useLayoutEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    const origin = "calc(100% - 3.125rem) calc(100% - 3.125rem)";
    const tl = gsap.timeline({
      paused: true,
      onReverseComplete: () => gsap.set(overlay, { display: "none" }),
    });
    tl.set(overlay, { display: "flex" })
      .fromTo(
        overlay,
        { clipPath: `circle(0% at ${origin})` },
        {
          clipPath: `circle(142% at ${origin})`,
          duration: 0.55,
          ease: "power3.inOut",
        }
      )
      .fromTo(
        overlay.querySelectorAll(".mnav-links a"),
        { y: 30, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.45,
          ease: "power3.out",
          stagger: 0.06,
        },
        "-=0.18"
      )
      .fromTo(
        overlay.querySelector(".mnav-foot"),
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.3 },
        "-=0.3"
      );
    tlRef.current = tl;
    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, []);

  const setMenu = (next: boolean) => {
    setOpen(next);
    const tl = tlRef.current;
    const overlay = overlayRef.current;
    if (!tl || !overlay) return;
    if (reduceMotion()) {
      gsap.set(overlay, { display: next ? "flex" : "none", clipPath: "none" });
      gsap.set(overlay.querySelectorAll(".mnav-links a, .mnav-foot"), {
        clearProps: "all",
      });
      return;
    }
    if (next) tl.timeScale(1).play();
    else tl.timeScale(1.4).reverse();
  };

  // close the menu on any route change (e.g. tapping the music widget,
  // which floats above the open overlay)
  const openRef = useRef(open);
  openRef.current = open;
  useEffect(() => {
    if (openRef.current) setMenu(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // lock scroll + escape to close
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const nudge = (el: HTMLElement, x: number) => {
    if (reduceMotion()) return;
    gsap.to(el, { x, duration: 0.3, ease: "power3.out" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className="site-nav"
        aria-label="Site"
        onMouseLeave={() => setHovered(null)}
      >
        {items.map((item, i) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive(item.href, pathname) ? "page" : undefined}
            onMouseEnter={(e) => {
              setHovered(i);
              nudge(e.currentTarget, 4);
            }}
            onMouseLeave={(e) => nudge(e.currentTarget, 0)}
            onClick={() => {
              navState.pendingNavClick = true;
            }}
          >
            {item.label}
          </Link>
        ))}
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

      <button
        type="button"
        className="mnav-btn"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        data-open={open || undefined}
        onClick={() => setMenu(!open)}
      >
        <span />
        <span />
      </button>

      <div ref={overlayRef} className="mnav-overlay" aria-hidden={!open}>
        <div className="mnav-links">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href, pathname) ? "page" : undefined}
              onClick={() => {
                navState.pendingNavClick = true;
                setMenu(false);
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <p className="mnav-foot">Folarin Folarin — Lagos, Nigeria</p>
      </div>
    </>
  );
}
