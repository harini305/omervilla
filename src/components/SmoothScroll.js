"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  Smooth wheel scrolling on desktop. The page still scrolls natively (no
  transformed wrapper), so sticky panels, anchors, keyboard and find-in-page
  keep working. Touch devices keep their own native scrolling, and visitors
  who prefer reduced motion get plain scrolling.
*/
export default function SmoothScroll() {
  const lenisRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const headerOffset = () => -((document.querySelector("header")?.offsetHeight ?? 84) + 16);
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      anchors: { offset: headerOffset() },
    });
    lenisRef.current = lenis;

    // Drive Lenis from GSAP's ticker so ScrollTrigger reads the same frame.
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // The mobile menu and the lightbox lock the page with overflow: hidden;
    // pause smooth scrolling while they are open.
    const sync = () => (document.body.style.overflow === "hidden" ? lenis.stop() : lenis.start());
    const mo = new MutationObserver(sync);
    mo.observe(document.body, { attributes: true, attributeFilter: ["style"] });

    // Keyboard scrolling and focus moves are native: cancel any glide in
    // progress first so it cannot pull the page back afterwards.
    const KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
    const settle = () => lenis.isScrolling && lenis.scrollTo(window.scrollY, { immediate: true, force: true });
    const onKey = (e) => KEYS.has(e.key) && settle();
    window.addEventListener("keydown", onKey);
    document.addEventListener("focusin", settle);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("focusin", settle);
      mo.disconnect();
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // New page: start at the top, or at the anchor when the link has one.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    const hash = window.location.hash;
    const target = hash ? document.querySelector(hash) : null;
    if (target) {
      lenis.scrollTo(target, { offset: -((document.querySelector("header")?.offsetHeight ?? 84) + 16), immediate: true });
    } else {
      lenis.scrollTo(0, { immediate: true });
    }
    lenis.resize();
  }, [pathname]);

  return null;
}
