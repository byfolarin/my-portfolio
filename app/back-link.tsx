"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { navState } from "./nav-state";

// Shows the "← back" link only when the visitor came from within the site:
// either they've already navigated here client-side, or the referrer is
// same-origin (covers hard reloads mid-session). Deep links see nothing.
export default function BackLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // defer past the whole effect flush so this never races the nav's
    // route counter, regardless of tree order
    const id = setTimeout(() => {
      // earned only by in-content navigation — nav-bar clicks and deep
      // links don't get a back button
      if (navState.count >= 1 && !navState.viaNav) setShow(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  if (!show) return null;

  return (
    <Link className="back-link" href={href}>
      ← {label}
    </Link>
  );
}
