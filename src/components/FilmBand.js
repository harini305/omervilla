"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./FilmBand.module.css";

// The original home hero film, now a muted loop further down the page.
// It loads only when near the viewport, plays only while visible, never
// autoplays under reduced motion, and can always be paused.
export default function FilmBand({ src, poster, children, label }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const userPaused = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) userPaused.current = true;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.src) {
            video.src = src;
            video.load();
          }
          if (!userPaused.current) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.15 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, [src]);

  const toggle = () => {
    const v = videoRef.current;
    if (v.paused) {
      userPaused.current = false;
      if (!v.src) {
        v.src = src;
        v.load();
      }
      v.play().catch(() => {});
    } else {
      userPaused.current = true;
      v.pause();
    }
  };

  return (
    <section className={styles.band} aria-label={label}>
      <video
        ref={videoRef}
        className={styles.video}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <div className={`${styles.inner} wrap`}>{children}</div>
      <button type="button" className={styles.toggle} onClick={toggle}>
        {playing ? "Pause film" : "Play film"}
      </button>
    </section>
  );
}
