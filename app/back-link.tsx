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
    const sameOrigin =
      document.referrer !== "" &&
      document.referrer.startsWith(window.location.origin);
    if (navState.count >= 1 || sameOrigin) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <Link className="back-link" href={href}>
      ← {label}
    </Link>
  );
}
