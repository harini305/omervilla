"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "gsap";
import styles from "./Lightbox.module.css";

// Full-screen viewer built on <dialog>: native focus containment and Escape,
// arrow keys and swipe to move, and only the current and adjacent images load.
export default function Lightbox({ items, index, onClose, onChange, label }) {
  const dialogRef = useRef(null);
  const imgRef = useRef(null);
  const touch = useRef(null);
  const open = index !== null && index !== undefined;
  const count = items.length;

  const go = useCallback(
    (dir) => {
      if (!open) return;
      onChange((index + dir + count) % count);
    },
    [open, index, count, onChange],
  );

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    }
    if (!open && d.open) d.close();
    return () => {
      if (!open) document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open || !imgRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(imgRef.current, { opacity: 0, scale: 0.985 }, { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" });
    return () => tween.kill();
  }, [open, index]);

  // Warm the adjacent images so moving through the set feels immediate.
  useEffect(() => {
    if (!open) return;
    [items[(index + 1) % count], items[(index - 1 + count) % count]].forEach((n) => {
      const img = new Image();
      img.src = n.src;
    });
  }, [open, index, items, count]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  const handleClose = () => {
    document.body.style.overflow = "";
    onClose();
  };

  const item = open ? items[index] : null;

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-label={label}
      onClose={handleClose}
      onClick={(e) => {
        if (e.target === dialogRef.current) dialogRef.current.close();
      }}
    >
      {item && (
        <div
          className={styles.stage}
          onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touch.current === null) return;
            const dx = e.changedTouches[0].clientX - touch.current;
            if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            touch.current = null;
          }}
        >
          <figure className={styles.figure}>
            <img
              ref={imgRef}
              key={item.src}
              src={item.src}
              width={item.width}
              height={item.height}
              alt={item.alt}
              className={styles.img}
            />
            <figcaption className={styles.caption}>
              <span aria-live="polite">
                {index + 1} / {count}
              </span>
              {item.alt && <span className={styles.alt}>{item.alt}</span>}
            </figcaption>
          </figure>
          <button type="button" className={`${styles.nav} ${styles.prev}`} onClick={() => go(-1)}>
            <span className="visually-hidden">Previous photograph</span>
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" className={`${styles.nav} ${styles.next}`} onClick={() => go(1)}>
            <span className="visually-hidden">Next photograph</span>
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className={styles.close} onClick={() => dialogRef.current?.close()} autoFocus>
            Close
          </button>
        </div>
      )}
    </dialog>
  );
}
