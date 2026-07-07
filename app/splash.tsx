"use client";

import { useEffect, useState } from "react";

// "folarin" draws itself in script once per session, then fades to the site
export default function Splash() {
  const [state, setState] = useState<"show" | "fading" | "gone">("show");

  useEffect(() => {
    if (
      sessionStorage.getItem("splash-seen") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setState("gone");
      return;
    }
    sessionStorage.setItem("splash-seen", "1");
    const id = setTimeout(() => setState("fading"), 2300);
    return () => clearTimeout(id);
  }, []);

  if (state === "gone") return null;

  return (
    <div
      className="splash"
      data-fading={state === "fading" || undefined}
      aria-hidden
      onTransitionEnd={() => state === "fading" && setState("gone")}
    >
      <svg viewBox="0 0 600 220" className="splash-svg">
        <text x="50%" y="60%" textAnchor="middle" className="splash-text">
          folarin
        </text>
      </svg>
    </div>
  );
}
