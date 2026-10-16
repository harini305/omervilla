"use client";

import { useRef, useState } from "react";
import Photo from "./Photo";
import Lightbox from "./Lightbox";
import styles from "./Gallery.module.css";

/*
  Photographs that open in the shared lightbox.
    strip    a horizontal, swipeable row with previous/next controls
    masonry  uneven columns, every photograph shown
    stagger  an editorial selection at uneven sizes, plus "view all"
*/
export default function Gallery({ items, label, variant = "strip", show, tone = "light" }) {
  const [index, setIndex] = useState(null);
  const trackRef = useRef(null);
  const visible = variant === "stagger" && show ? items.slice(0, show) : items;

  const scrollBy = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  const thumb = (item, i, sizes, className = "") => (
    <button
      key={item.stem}
      type="button"
      className={`${styles.thumb} ${className}`}
      onClick={() => setIndex(i)}
      aria-label={`Open photograph ${i + 1} of ${items.length}${item.alt ? `: ${item.alt}` : ""}`}
    >
      <Photo item={item} sizes={sizes} alt="" className={styles.img} />
    </button>
  );

  return (
    <div className={`${styles.gallery} ${styles[tone]}`}>
      {variant === "strip" && (
        <>
          <div className={styles.stripHead}>
            <p className={styles.count}>{items.length} photographs</p>
            <div className={styles.controls}>
              <button type="button" onClick={() => scrollBy(-1)} className={styles.ctrl}>
                <span className="visually-hidden">Scroll photographs back</span>
                <span aria-hidden="true">←</span>
              </button>
              <button type="button" onClick={() => scrollBy(1)} className={styles.ctrl}>
                <span className="visually-hidden">Scroll photographs forward</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
          <div ref={trackRef} className={styles.strip} role="region" aria-label={label} tabIndex={0}>
            {items.map((item, i) =>
              thumb(
                item,
                i,
                "(max-width: 700px) 78vw, (max-width: 1200px) 44vw, 32vw",
                item.height > item.width ? styles.stripTall : styles.stripWide,
              ),
            )}
          </div>
        </>
      )}

      {variant === "masonry" && (
        <div className={styles.masonry}>
          {items.map((item, i) => thumb(item, i, i === 0 ? "(max-width: 700px) 100vw, 50vw" : "(max-width: 700px) 50vw, 25vw"))}
        </div>
      )}

      {variant === "stagger" && (
        <>
          <div className={styles.stagger}>
            {visible.map((item, i) =>
              thumb(item, i, i % 6 === 0 ? "(max-width: 700px) 100vw, 64vw" : "(max-width: 700px) 50vw, 32vw"),
            )}
          </div>
          {visible.length < items.length && (
            <button type="button" className={styles.viewAll} onClick={() => setIndex(0)}>
              View all {items.length} photographs
            </button>
          )}
        </>
      )}

      <Lightbox items={items} index={index} onChange={setIndex} onClose={() => setIndex(null)} label={label} />
    </div>
  );
}
