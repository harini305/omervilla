"use client";

import { useEffect, useId, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Rates.module.css";

const SEASONS = [
  ["low", "Low Season"],
  ["high", "High Season"],
  ["peak", "Peak Season"],
];

function Panel({ open, id, labelledBy, children }) {
  const ref = useRef(null);
  const first = useRef(true);

  useEffect(() => {
    const el = ref.current;
    if (first.current) {
      first.current = false;
      gsap.set(el, { height: open ? "auto" : 0 });
      return;
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tween = gsap.to(el, {
      height: open ? "auto" : 0,
      duration: reduce ? 0 : 0.55,
      ease: "power3.inOut",
    });
    return () => tween.kill();
  }, [open]);

  return (
    <div ref={ref} id={id} role="region" aria-labelledby={labelledBy} className={styles.panel} inert={!open}>
      <div className={styles.panelInner}>{children}</div>
    </div>
  );
}

export default function RatesAccordion({ items }) {
  const base = useId();
  const [open, setOpen] = useState(() => new Set([0]));
  const buttons = useRef([]);

  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });

  // Arrow keys, Home and End move between headers (WAI-ARIA accordion pattern).
  const onKeyDown = (e, i) => {
    const last = items.length - 1;
    const target = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const btnId = `${base}-h${i}`;
        const panelId = `${base}-p${i}`;
        return (
          <div key={item.name} className={`${styles.item} ${isOpen ? styles.itemOpen : ""}`}>
            <h3 className={styles.itemHeading}>
              <button
                ref={(el) => (buttons.current[i] = el)}
                id={btnId}
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
              >
                <span className={styles.triggerName}>{item.name}</span>
                <span className={styles.triggerMeta}>{item.capacity.replace(/\.$/, "")}</span>
                <span className={styles.icon} aria-hidden="true" />
              </button>
            </h3>
            <Panel open={isOpen} id={panelId} labelledBy={btnId}>
              <dl className={styles.seasons}>
                {SEASONS.map(([key, label]) => (
                  <div key={key} className={styles.season}>
                    <dt>{label}</dt>
                    <dd>{item[key]}</dd>
                  </div>
                ))}
              </dl>
              <p className={styles.capacity}>Maximum capacity: {item.capacity}</p>
            </Panel>
          </div>
        );
      })}
    </div>
  );
}
