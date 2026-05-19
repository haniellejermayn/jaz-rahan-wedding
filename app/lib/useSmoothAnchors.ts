"use client";
import { useEffect } from "react";

/**
 * Intercepts all in-page anchor clicks and replaces the default
 * jump with a smooth scrollIntoView, which works correctly in Next.js
 * where the router would otherwise bypass CSS scroll-behavior: smooth.
 */
export function useSmoothAnchors() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";
      // Only handle same-page hash links
      if (!href.startsWith("#")) return;

      const target = document.querySelector(href);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
}
