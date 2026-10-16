"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/*
  One motion layer for every page, driven by data attributes:
    data-hero-in      first-screen elements, staggered in on load
    data-shutter      the page's key image opens from the bottom edge (signature move)
    data-reveal       rises 24px and fades in once when it enters the viewport
    data-reveal-group its [data-reveal] children are staggered together
    data-parallax     an image drifts slowly inside its frame (desktop only)
  Content is fully visible without JavaScript or with reduced motion.
*/
export default function Motion() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    const mm = gsap.matchMedia();

    mm.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 900px)",
      },
      (context) => {
        const { motion, desktop } = context.conditions;
        if (!motion) {
          gsap.set("[data-hero-in]", { opacity: 1 });
          return;
        }

        // First screen
        const heroItems = gsap.utils.toArray("[data-hero-in]");
        const shutters = gsap.utils.toArray("[data-shutter]");
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        shutters.forEach((frame) => {
          const img = frame.querySelector("img, video");
          tl.fromTo(
            frame,
            { clipPath: "inset(100% 0% 0% 0%)" },
            { clipPath: "inset(0% 0% 0% 0%)", duration: 1.1, ease: "power4.inOut" },
            0,
          );
          if (img) tl.fromTo(img, { scale: 1.12 }, { scale: 1, duration: 1.6, ease: "power3.out" }, 0);
        });
        if (heroItems.length) {
          tl.fromTo(
            heroItems,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: 1, stagger: 0.09 },
            shutters.length ? 0.45 : 0.1,
          );
        }
        root.classList.add("motion-ready");

        // Section entrances, staggered within groups
        const grouped = new Set();
        gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
          const items = group.querySelectorAll("[data-reveal]");
          items.forEach((el) => grouped.add(el));
          if (!items.length) return;
          gsap.from(items, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.06,
            scrollTrigger: { trigger: group, start: "top bottom-=40", once: true },
          });
        });
        gsap.utils.toArray("[data-reveal]").forEach((el) => {
          if (grouped.has(el)) return;
          gsap.from(el, {
            opacity: 0,
            y: 24,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top bottom-=40", once: true },
          });
        });

        // Gentle parallax inside image frames, larger screens only
        if (desktop) {
          gsap.utils.toArray("[data-parallax]").forEach((img) => {
            const amount = Number(img.dataset.parallax) || 8;
            gsap.fromTo(
              img,
              { yPercent: -amount / 2, scale: 1 + amount / 100 },
              {
                yPercent: amount / 2,
                ease: "none",
                scrollTrigger: {
                  trigger: img.parentElement,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.6,
                },
              },
            );
          });
        }
      },
    );

    // Recalculate trigger positions once lazy images have laid out.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      clearTimeout(t);
      window.removeEventListener("load", refresh);
      mm.revert();
    };
  }, [pathname]);

  return null;
}
