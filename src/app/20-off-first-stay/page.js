import Photo from "@/components/Photo";
import Button from "@/components/Button";
import CtaBand from "@/components/CtaBand";
import { PROMO } from "@/data/content";
import { LINKS, whatsappLink } from "@/data/site";
import ui from "@/components/ui.module.css";
import styles from "./promo.module.css";

export const metadata = {
  title: "20% OFF First Stay",
  description:
    "Get 20% off your first stay at OMER Villa & Retreat! Book directly with us or through Airbnb and enjoy a special discount on your perfect Bali getaway.",
  alternates: { canonical: "/20-off-first-stay" },
};

const PROMO_MESSAGE =
  "Hello Omer Villa & Retreat, I would like to ask about the 20% off first stay offer.";

export default function PromoPage() {
  return (
    <>
      <section className={`${styles.hero} wrap`} aria-labelledby="promo-title">
        <div className={styles.heroText}>
          <h1 id="promo-title" className={styles.title} data-hero-in>
            {PROMO.title}
          </h1>
        </div>
        <figure className={styles.artwork} data-shutter>
          <Photo name="IMG_4276" priority sizes="(max-width: 800px) 86vw, 38vw" className="cover" />
        </figure>
      </section>

      <section className={`${styles.offer} wrap`} aria-labelledby="promo-heading">
        <figure className={styles.offerImg} data-reveal>
          <Photo name="omer-28" sizes="(max-width: 800px) 70vw, 30vw" className="cover" data-parallax="8" />
        </figure>
        <div className={styles.offerText} data-reveal-group>
          <h2 id="promo-heading" className={styles.h2} data-reveal>
            {PROMO.heading}
          </h2>
          <p className={styles.lead} data-reveal>
            {PROMO.body}
          </p>
          <div className={styles.actions} data-reveal>
            <Button href={whatsappLink(PROMO_MESSAGE)} variant="primary">
              Ask on WhatsApp
            </Button>
            <Button href={LINKS.airbnb} variant="taupe">
              Find us on Airbnb{" "}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </Button>
            <Button href="/contact-us" variant="outline">
              Send your inquiry
            </Button>
          </div>
          <p className={styles.terms} data-reveal>
            The terms, validity dates and how to claim this offer are not published here. Please confirm them with us
            before you book.
          </p>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
