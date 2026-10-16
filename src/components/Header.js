"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HEADER_OVER_PHOTO, LINKS, NAV, WHATSAPP, whatsappLink } from "@/data/site";
import styles from "./Header.module.css";

gsap.registerPlugin(ScrollTrigger);

const isActive = (pathname, href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

export default function Header() {
  const pathname = usePathname();
  const overPhoto = HEADER_OVER_PHOTO.has(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const dropRef = useRef(null);

  // Solid header once the first 48px have scrolled by.
  useEffect(() => {
    // Compare the scroll position directly: a start/end range switches off at
    // the very bottom of the page, which reset the header there.
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => setScrolled(self.scroll() > 48),
    });
    setScrolled(window.scrollY > 48);
    return () => st.kill();
  }, [pathname]);

  // Close menus on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setDropOpen(false);
  }, [pathname]);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    toggleRef.current?.focus();
  }, []);

  // Mobile panel: lock scroll, trap focus, close on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const panel = panelRef.current;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusables = () => panel.querySelectorAll("a, button");
    focusables()[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") closeMenu();
      if (e.key !== "Tab") return;
      const items = focusables();
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;
      gsap.from(panel.querySelectorAll("[data-menu-item]"), {
        x: 28,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
        delay: 0.12,
      });
    }, panel);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      ctx.revert();
    };
  }, [menuOpen, closeMenu]);

  // Desktop dropdown: close on outside click or Escape.
  useEffect(() => {
    if (!dropOpen) return;
    const onDown = (e) => {
      if (!dropRef.current?.contains(e.target)) setDropOpen(false);
    };
    const onKey = (e) => {
      if (e.key === "Escape") {
        setDropOpen(false);
        dropRef.current?.querySelector("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [dropOpen]);

  const light = overPhoto && !scrolled && !menuOpen;
  const experiencesActive = NAV.find((n) => n.children)?.children.some((c) => isActive(pathname, c.href));

  return (
    <>
      <header
        className={`${styles.header} ${light ? styles.light : styles.solid} ${scrolled ? styles.scrolled : ""}`}
      >
        <div className={styles.bar}>
          <Link href="/" className={styles.logo} aria-label="Omer Villa & Retreat, home">
            <Image
              src="/media/brand/Omer-Logo-clear-white.png"
              alt=""
              width={712}
              height={926}
              priority
              className={`${styles.logoImg} ${light ? styles.show : styles.hide}`}
            />
            <Image
              src="/media/brand/Omer-Logo-clear-black.png"
              alt=""
              width={712}
              height={926}
              priority
              className={`${styles.logoImg} ${light ? styles.hide : styles.show}`}
            />
          </Link>

          <nav className={styles.nav} aria-label="Main">
            <ul className={styles.navList}>
              {NAV.map((item) =>
                item.children ? (
                  <li key={item.label} className={styles.dropWrap} ref={dropRef}>
                    <button
                      type="button"
                      className={`${styles.navLink} ${experiencesActive ? styles.active : ""}`}
                      aria-expanded={dropOpen}
                      aria-controls="nav-experiences"
                      onClick={() => setDropOpen((v) => !v)}
                    >
                      {item.label}
                      <svg className={styles.chev} width="10" height="6" viewBox="0 0 10 6" aria-hidden="true">
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
                      </svg>
                    </button>
                    <div id="nav-experiences" className={styles.drop} hidden={!dropOpen}>
                      <ul>
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              onClick={() => setDropOpen(false)}
                              className={isActive(pathname, c.href) ? styles.dropActive : undefined}
                              aria-current={isActive(pathname, c.href) ? "page" : undefined}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ) : item.href === "/contact-us" ? null : (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`${styles.navLink} ${isActive(pathname, item.href) ? styles.active : ""}`}
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    >
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <Link
            href="/contact-us"
            className={`${styles.cta} ${isActive(pathname, "/contact-us") ? styles.ctaActive : ""}`}
            aria-current={isActive(pathname, "/contact-us") ? "page" : undefined}
          >
            Contact Us
          </Link>

          <button
            ref={toggleRef}
            type="button"
            className={styles.burger}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="visually-hidden">{menuOpen ? "Close menu" : "Open menu"}</span>
            <span className={styles.burgerLines} aria-hidden="true" />
          </button>
        </div>
      </header>

      <div
        className={`${styles.backdrop} ${menuOpen ? styles.backdropOpen : ""}`}
        onClick={closeMenu}
        aria-hidden="true"
      />
      <div
        id="mobile-menu"
        ref={panelRef}
        className={`${styles.panel} ${menuOpen ? styles.panelOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        inert={!menuOpen}
      >
        <button type="button" className={styles.close} onClick={closeMenu}>
          Close menu
        </button>
        <nav aria-label="Mobile">
          <ul className={styles.panelList}>
            {NAV.flatMap((item) => (item.children ? item.children : [item])).map((item) => (
              <li key={item.href} data-menu-item>
                <Link
                  href={item.href}
                  className={isActive(pathname, item.href) ? styles.panelActive : undefined}
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.panelFoot} data-menu-item>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            WhatsApp {WHATSAPP.display}
          </a>
          <a href={LINKS.airbnb} target="_blank" rel="noopener noreferrer">
            Find us on Airbnb
          </a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
        </div>
      </div>
    </>
  );
}
