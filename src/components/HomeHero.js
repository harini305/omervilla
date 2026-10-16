"use client";

import { useEffect, useState } from "react";
import Photo from "./Photo";
import Button from "./Button";
import { HOME } from "@/data/content";
import { SITE } from "@/data/site";
import ui from "./ui.module.css";
import styles from "./HomeHero.module.css";

const DAY = "Omer-Villa-front-joglo";
const NIGHT = "Omer-Villa-front-joglo-night";

// Current hour and time in Bali (WITA, GMT+8), whatever the visitor's own timezone.
function baliNow() {
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const time = fmt.format(new Date());
  return { time, hour: Number(time.slice(0, 2)) };
}

const isNightHour = (h) => h >= 18 || h < 6;

export default function HomeHero() {
  const [clock, setClock] = useState(null);
  const [mode, setMode] = useState("day");

  useEffect(() => {
    const now = baliNow();
    setClock(now.time);
    setMode(isNightHour(now.hour) ? "night" : "day");
    const t = setInterval(() => setClock(baliNow().time), 30000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="home-title">
      <div className={styles.media} data-shutter>
        <Photo name={DAY} priority sizes="100vw" className={`${styles.img} cover`} alt="" />
        <Photo
          name={NIGHT}
          priority
          sizes="100vw"
          className={`${styles.img} ${styles.night} cover ${mode === "night" ? styles.visible : ""}`}
          alt=""
        />
        <p className="visually-hidden" aria-live="polite">
          {mode === "night"
            ? "Showing the villa's pool and joglo pavilions lit up at dusk."
            : "Showing the villa's pool and joglo pavilions by day."}
        </p>
      </div>

      <div className={`${styles.content} wrap`}>
        <div className={styles.copy}>
          <h1 id="home-title" className={styles.title} data-hero-in>
            {HOME.headline}
          </h1>
          <div className={styles.actions} data-hero-in>
            <Button href="/rooms-rates" variant="light">
              Rooms & Rates{" "}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </Button>
            <Button href="/contact-us" variant="ghostLight">
              Send your inquiry
            </Button>
          </div>
        </div>

        <div className={styles.light} data-hero-in>
          <p className={styles.clock}>
            {clock ? (
              <>
                <span className={styles.clockTime}>{clock}</span> in Buduk, Bali
              </>
            ) : (
              "Buduk, Bali"
            )}
          </p>
          <div className={styles.switch} role="group" aria-label="See the villa by day or by night">
            {["day", "night"].map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                className={mode === m ? styles.on : undefined}
                onClick={() => setMode(m)}
              >
                {m === "day" ? "By day" : "By night"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
