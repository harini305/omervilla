import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import RatesAccordion from "@/components/RatesAccordion";
import CtaBand from "@/components/CtaBand";
import { ROOMS } from "@/data/content";
import { mediaList } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./rooms.module.css";

export const metadata = {
  title: "Rooms & Rates",
  description:
    "Our villa is a modern yet soulful sanctuary with a deep respect for Balinese traditions: five bedrooms, a private pool and open-air living spaces.",
  alternates: { canonical: "/rooms-rates" },
};

const SEASONS = [
  ["low", "Low Season"],
  ["high", "High Season"],
  ["peak", "Peak Season"],
];

const RATES_MESSAGE =
  "Hello Omer Villa & Retreat, I would like to ask about your current rates and availability.";

export default function RoomsPage() {
  const gallery = mediaList(ROOMS.gallery);
  const joglo = mediaList(ROOMS.jogloGallery);

  return (
    <>
      {/* Title and introduction beside three photographs that share one top and bottom line */}
      <section className={`${styles.hero} wrap`} aria-labelledby="rooms-title">
        <div className={styles.heroText}>
          <h1 id="rooms-title" className={styles.title} data-hero-in>
            {ROOMS.title}
          </h1>
          <h2 className={styles.introTitle} data-hero-in>
            {ROOMS.discover.title}
          </h2>
          <p className={styles.introBody} data-hero-in>
            {ROOMS.discover.body}
          </p>
          <a href="#rates" className={styles.jump} data-hero-in>
            Go to the rates <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure className={`${styles.print} ${styles.printTall}`} data-shutter>
          <Photo name="Omer-Bedrooms-1" priority sizes="(max-width: 1000px) 100vw, 30vw" className="cover" />
        </figure>
        <figure className={`${styles.print} ${styles.printWide}`} data-hero-in>
          <Photo name="Omer-Villa-and-Retreat22" priority sizes="(max-width: 1000px) 50vw, 26vw" className="cover" />
        </figure>
        <figure className={`${styles.print} ${styles.printSmall}`} data-hero-in>
          <Photo name="Omer-Villa-and-Retreat16" priority sizes="(max-width: 1000px) 50vw, 26vw" className="cover" />
        </figure>
      </section>

      {/* Features: three photographs of unequal width, each with its text */}
      <section className={`${styles.features} wrap`} aria-label="Villa features">
        {ROOMS.features.map((f, i) => (
          <article key={f.title} className={`${styles.feature} ${styles[`f${i}`]}`} data-reveal-group>
            <figure className={styles.featureImg} data-reveal>
              <Photo name={f.image} sizes="(max-width: 800px) 90vw, 40vw" className="cover" />
            </figure>
            <h3 className={styles.featureTitle} data-reveal>
              {f.title}
            </h3>
            <p className={styles.featureBody} data-reveal>
              {f.body}
            </p>
          </article>
        ))}
      </section>

      {/* Villa gallery */}
      <section className={styles.gallery} aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="visually-hidden">
          Villa gallery
        </h2>
        <Gallery items={gallery} label="Omer Villa and Retreat gallery" variant="strip" />
      </section>

      {/* Rates */}
      <section id="rates" className={styles.rates} aria-labelledby="rates-heading">
        <div className={`${styles.ratesGrid} wrap`}>
          <div className={styles.ratesSide} data-reveal-group>
            <h2 id="rates-heading" className={styles.h2} data-reveal>
              {ROOMS.ratesTitle}
            </h2>
            <p className={styles.ratesIntro} data-reveal>
              Whole villa, by number of bedrooms.
            </p>
            <div className={styles.notice} role="note" aria-labelledby="rates-notice" data-reveal>
              <p id="rates-notice" className={styles.noticeTitle}>
                Rates to be confirmed
              </p>
              <p>
                These are the most recently published rates. They were stated as valid for bookings and stays until
                15 December 2024, and the dates of the low, high and peak seasons have not been published. Please ask
                us for current prices before you book.
              </p>
            </div>
            <div className={styles.ratesActions} data-reveal>
              <Button href="/contact-us" variant="primary">
                Send your inquiry
              </Button>
              <Button href={whatsappLink(RATES_MESSAGE)} variant="outline">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
          <div className={styles.ratesMain} data-reveal>
            <RatesAccordion items={ROOMS.wholeVilla} />
            <p className={styles.footnote}>{ROOMS.footnote}</p>
          </div>
        </div>
      </section>

      {/* 1 Bedroom Joglo */}
      <section className={styles.joglo} aria-labelledby="joglo-heading">
        <div className={`${styles.jogloGrid} wrap`}>
          <figure className={styles.jogloImg} data-reveal>
            <Photo name="Omer-Villa-Joglo4" sizes="(max-width: 800px) 90vw, 44vw" className="cover" data-parallax="8" />
          </figure>
          <div className={styles.jogloText} data-reveal-group>
            <h2 id="joglo-heading" className={styles.h2} data-reveal>
              {ROOMS.joglo.name}
            </h2>
            <dl className={styles.jogloTable} data-reveal>
              {SEASONS.map(([key, label]) => (
                <div key={key}>
                  <dt>{label}</dt>
                  <dd>{ROOMS.joglo[key]}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.footnote} data-reveal>
              {ROOMS.footnote}
            </p>
            <p className={styles.jogloNote} data-reveal>
              Maximum capacity for the Joglo has not been published. Please ask when you inquire. The validity note
              above applies to these rates too.
            </p>
          </div>
        </div>
        <div className={styles.jogloGallery}>
          <Gallery items={joglo} label="1 Bedroom Joglo gallery" variant="strip" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
