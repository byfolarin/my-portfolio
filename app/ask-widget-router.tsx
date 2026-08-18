"use client";

import { usePathname } from "next/navigation";
import AskWidget from "./ask-widget";

export default function AskWidgetRouter() {
  const pathname = usePathname();
  return pathname === "/" || pathname === "/music" ? <AskWidget /> : null;
}
