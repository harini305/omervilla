"use client";

import { useEffect } from "react";

// Publishes the footer's height as --footer-h, so the inquiry band above it
// can grow just enough for band + footer to fill the screen at the very end
// of the page (no slice of the previous section showing).
export default function FooterFit() {
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const root = document.documentElement;
    const set = () => root.style.setProperty("--footer-h", `${footer.offsetHeight}px`);
    set();
    const ro = new ResizeObserver(set);
    ro.observe(footer);
    return () => ro.disconnect();
  }, []);
  return null;
}
