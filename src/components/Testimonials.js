"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Photo from "./Photo";
import { TESTIMONIALS } from "@/data/content";
import styles from "./Testimonials.module.css";

const INTERVAL = 9000; // the original slider rotated every 9 seconds

export default function Testimonials({ image, headingId = "testimonials-heading" }) {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const quoteRef = useRef(null);
  const reduceRef = useRef(false);
  const count = TESTIMONIALS.length;

  useEffect(() => {
    reduceRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceRef.current) setPlaying(false);
  }, []);

  const go = useCallback((i) => setActive((i + count) % count), [count]);

  useEffect(() => {
    if (!playing || hovered) return;
    const t = setTimeout(() => go(active + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [active, playing, hovered, go]);

  useEffect(() => {
    if (reduceRef.current || !quoteRef.current) return;
    const tween = gsap.fromTo(
      quoteRef.current.children,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.06, ease: "power3.out" },
    );
    return () => tween.kill();
  }, [active]);

  return (
    <section
      className={styles.section}
      aria-labelledby={headingId}
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setHovered(false);
      }}
    >
      <div className={styles.media} aria-hidden="true">
        <Photo name={image} sizes="100vw" alt="" className="cover" data-parallax="10" />
      </div>
      <div className={`${styles.inner} wrap`}>
        <h2 id={headingId} className="visually-hidden">
          Guest testimonials
        </h2>
        <div className={styles.slide} aria-live={playing ? "off" : "polite"}>
          {TESTIMONIALS.map((x, n) => (
            <blockquote
              key={x.name}
              ref={n === active ? quoteRef : undefined}
              className={`${styles.quote} ${n === active ? styles.quoteActive : ""}`}
              aria-hidden={n !== active}
            >
              {x.paragraphs.map((p, i) => (
                <p key={i}>
                  {i === 0 && "“"}
                  {p}
                  {i === x.paragraphs.length - 1 && "”"}
                </p>
              ))}
              <footer className={styles.name}>{x.name}</footer>
            </blockquote>
          ))}
        </div>
        <div className={styles.controls}>
          <div className={styles.dots}>
            {TESTIMONIALS.map((x, i) => (
              <button
                key={x.name}
                type="button"
                className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                aria-label={`Show testimonial from ${x.name}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => go(i)}
              >
                <span className={styles.dotName} aria-hidden="true">
                  {x.name}
                </span>
              </button>
            ))}
          </div>
          <div className={styles.arrows}>
            <button type="button" className={styles.arrow} onClick={() => go(active - 1)}>
              <span className="visually-hidden">Previous testimonial</span>
              <span aria-hidden="true">←</span>
            </button>
            <button type="button" className={styles.arrow} onClick={() => go(active + 1)}>
              <span className="visually-hidden">Next testimonial</span>
              <span aria-hidden="true">→</span>
            </button>
            <button type="button" className={styles.pause} onClick={() => setPlaying((p) => !p)}>
              {playing ? "Pause" : "Play"}
              <span className="visually-hidden"> automatic rotation</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
