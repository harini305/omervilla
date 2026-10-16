"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LINKS, SITE } from "@/data/site";
import styles from "./LocationMap.module.css";

// Recreates the original Leaflet map: OpenStreetMap tiles, centred on the
// audited coordinates at zoom 13, with an accent marker and its label open.
// Leaflet is only fetched once the map is near the viewport.
export default function LocationMap({ label }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    let map;
    let ro;
    let cancelled = false;

    const init = async () => {
      try {
        const L = (await import("leaflet")).default;
        if (cancelled || !el) return;
        const { lat, lng } = SITE.coordinates;
        map = L.map(el, { scrollWheelZoom: false, zoomControl: true }).setView([lat, lng], 13);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        const icon = L.divIcon({
          className: styles.marker,
          html: '<span aria-hidden="true"></span>',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
          popupAnchor: [0, -14],
        });
        L.marker([lat, lng], { icon, title: label, alt: label })
          .addTo(map)
          .bindPopup(label, { closeButton: false, autoPan: false })
          .openPopup();
        // The map stretches with the text beside it: re-measure on resize so
        // every tile loads.
        ro = new ResizeObserver(() => map.invalidateSize());
        ro.observe(el);
      } catch {
        setFailed(true);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          init();
        }
      },
      { rootMargin: "400px" },
    );
    io.observe(el);

    return () => {
      cancelled = true;
      io.disconnect();
      ro?.disconnect();
      map?.remove();
    };
  }, [label]);

  return (
    <div className={styles.wrap}>
      <div ref={ref} className={styles.map} role="region" aria-label={`Map showing ${label}`}>
        {failed && <p className={styles.fallback}>The map could not be loaded.</p>}
      </div>
      <p className={styles.links}>
        <a href={LINKS.directions} target="_blank" rel="noopener noreferrer">
          Get directions<span className="visually-hidden"> (opens Google Maps in a new tab)</span>
        </a>
        <a href={LINKS.osm} target="_blank" rel="noopener noreferrer">
          Open in OpenStreetMap<span className="visually-hidden"> (opens in a new tab)</span>
        </a>
      </p>
    </div>
  );
}
