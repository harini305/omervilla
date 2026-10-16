"use client";

import { useEffect, useRef } from "react";

// A content video with native controls. It starts muted when scrolled into
// view (as the original did), pauses when out of view, and never autoplays
// under reduced motion. Nothing downloads until it is near the viewport.
export default function InlineVideo({ src, poster, width, height, label, className }) {
  const ref = useRef(null);

  useEffect(() => {
    const video = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let touched = false;
    const markTouched = () => (touched = true);
    video.addEventListener("pause", markTouched);

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!video.getAttribute("src")) video.setAttribute("src", src);
          if (!reduce && !touched) video.play().catch(() => {});
        } else if (!video.paused) {
          video.removeEventListener("pause", markTouched);
          video.pause();
          video.addEventListener("pause", markTouched);
        }
      },
      { rootMargin: "150px 0px", threshold: 0.35 },
    );
    io.observe(video);
    return () => {
      io.disconnect();
      video.removeEventListener("pause", markTouched);
    };
  }, [src]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      width={width}
      height={height}
      controls
      muted
      playsInline
      preload="none"
      aria-label={label}
    />
  );
}
