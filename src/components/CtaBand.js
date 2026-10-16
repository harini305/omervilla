import { CTA } from "@/data/content";
import { LINKS } from "@/data/site";
import Button from "./Button";
import ui from "./ui.module.css";
import styles from "./CtaBand.module.css";

// Pre-footer band shown on every page except Contact Us and the 404.
export default function CtaBand() {
  return (
    <section className={styles.band} aria-labelledby="cta-heading" data-cta-band>
      <div className={`${styles.inner} wrap`}>
        <h2 id="cta-heading" className={styles.heading} data-reveal>
          {CTA.heading}
        </h2>
        <div className={styles.actions} data-reveal>
          <Button href="/contact-us" variant="light">
            {CTA.contact}
          </Button>
          <Button href={LINKS.airbnb} variant="airbnb">
            {CTA.airbnb}{" "}
            <span className={ui.arrow} aria-hidden="true">
              →
            </span>
          </Button>
        </div>
      </div>
    </section>
  );
}
