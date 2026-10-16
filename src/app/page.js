import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import Photo from "@/components/Photo";
import Button from "@/components/Button";
import FilmBand from "@/components/FilmBand";
import Testimonials from "@/components/Testimonials";
import LocationMap from "@/components/LocationMap";
import CtaBand from "@/components/CtaBand";
import { EVENT, FEATURES, HOME, PROMO, ROOMS } from "@/data/content";
import { LINKS } from "@/data/site";
import ui from "@/components/ui.module.css";
import styles from "./home.module.css";

export const metadata = {
  title: { absolute: "Omer Villas" },
  alternates: { canonical: "/" },
};

const INSTAGRAM = ["IMG_8409-copy", "omer-13", "Omer-Villa-Joglo9", "Omer-Food3", "DSCF8526"];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Introduction: the paragraph with a photograph that fills the rest of
          its column, beside one large photograph. Both columns always end
          level, whatever the text size. */}
      <section className={`${styles.intro} wrap`} aria-label="Introduction">
        <div className={styles.introGrid}>
          <div className={styles.introLeft}>
            <p className={styles.statement} data-reveal>
              {HOME.intro}
            </p>
            <figure className={`${styles.print} ${styles.printFill}`} data-reveal>
              <Photo name="Omer-Villa-and-Retreat14" sizes="(max-width: 800px) 100vw, 40vw" className="cover" />
            </figure>
          </div>
          <figure className={`${styles.print} ${styles.printMain}`} data-reveal>
            <Photo name="Omer-Villa-Joglo10" sizes="(max-width: 800px) 100vw, 56vw" className="cover" data-parallax="8" />
          </figure>
        </div>
      </section>

      {/* The six feature pages as one band of unequal panels */}
      <section className={styles.features} aria-labelledby="features-heading">
        <h2 id="features-heading" className="visually-hidden">
          Explore Omer Villa & Retreat
        </h2>
        <ul className={styles.band}>
          {FEATURES.map((f, i) => (
            <li key={f.href} className={styles[`panel${i}`]}>
              <Link href={f.href} className={styles.panel}>
                <Photo name={f.image} sizes="(max-width: 800px) 50vw, 30vw" alt="" className={`${styles.panelImg} cover`} />
                <span className={styles.panelText}>
                  <span className={styles.panelTitle}>{f.title}</span>
                  <span className={styles.panelRead} aria-hidden="true">
                    Read →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Discover */}
      <section className={`${styles.discover} wrap section`} aria-labelledby="discover-heading">
        <figure className={styles.discoverImg} data-reveal>
          <Photo name="omer-28" sizes="(max-width: 800px) 90vw, 38vw" className="cover" data-parallax="10" />
        </figure>
        <div className={styles.discoverText} data-reveal-group>
          <h2 id="discover-heading" className={styles.h2} data-reveal>
            {HOME.discover.title}
          </h2>
          <p className={styles.body} data-reveal>
            {HOME.discover.body}
          </p>
          <h3 className={styles.listTitle} data-reveal>
            {HOME.discover.listTitle}
          </h3>
          <ul className={styles.doList} data-reveal>
            {HOME.discover.list.map((item) => (
              <li key={item.label}>
                {item.href ? (
                  <Link href={item.href}>
                    {item.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Film with the pull-quote */}
      <FilmBand src="/media/video/Short-720p.mp4" poster="/media/video/Short-poster.jpg" label="Life at the villa, a short film">
        <blockquote className={styles.pullQuote} data-reveal>
          <p>“{HOME.discover.quote}”</p>
        </blockquote>
      </FilmBand>

      {/* Rates preview, set like a menu */}
      <section className={`${styles.rates} wrap section`} aria-labelledby="rates-heading">
        <div className={styles.ratesSide} data-reveal-group>
          <h2 id="rates-heading" className={styles.h2} data-reveal>
            Rooms & Rates
          </h2>
          <figure className={styles.ratesImg} data-reveal>
            <Photo name="Omer-Bedrooms-1" sizes="(max-width: 800px) 70vw, 34vw" className="cover" />
          </figure>
          <p className={styles.rateCaveat} data-reveal>
            Low-season prices per night, as last published. They were stated as valid until 15 December 2024, so
            please confirm current rates with us before booking.
          </p>
          <div data-reveal>
            <Button href="/rooms-rates#rates" variant="primary">
              See all rates{" "}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </Button>
          </div>
        </div>
        <div className={styles.ratesList} data-reveal-group>
          <p className={styles.ratesGroup} data-reveal>
            Whole villa
          </p>
          {ROOMS.wholeVilla.map((r) => (
            <div key={r.name} className={styles.rateRow} data-reveal>
              <div>
                <p className={styles.rateName}>{r.name}</p>
                <p className={styles.rateNote}>Maximum capacity: {r.capacity}</p>
              </div>
              <p className={styles.ratePrice}>{r.low.replace(" /night", "")}</p>
            </div>
          ))}
          <p className={styles.ratesGroup} data-reveal>
            Joglo
          </p>
          <div className={styles.rateRow} data-reveal>
            <div>
              <p className={styles.rateName}>{ROOMS.joglo.name}</p>
            </div>
            <p className={styles.ratePrice}>{ROOMS.joglo.low.replace(" /night", "")}</p>
          </div>
        </div>
      </section>

      {/* Event & venue feature */}
      <section className={styles.event} aria-labelledby="event-heading">
        <figure className={styles.eventImg}>
          <Photo name="MATANAI_MNR_112097" sizes="100vw" className="cover" data-parallax="10" />
        </figure>
        <div className={`${styles.eventCard}`} data-reveal-group>
          <h2 id="event-heading" className={styles.h2} data-reveal>
            {EVENT.title}
          </h2>
          <p data-reveal>{EVENT.paragraphs[0]}</p>
          <dl className={styles.eventPrice} data-reveal>
            <dt>{EVENT.prices[0].name}</dt>
            <dd>
              {EVENT.prices[0].price}
              <span>Per 1 day event, excluding 10% government tax. Rate is for the venue only.</span>
            </dd>
          </dl>
          <div data-reveal>
            <Button href="/event-venue" variant="outline">
              Event & Venue{" "}
              <span className={ui.arrow} aria-hidden="true">
                →
              </span>
            </Button>
          </div>
        </div>
      </section>

      <Testimonials image="Omer-Villa-and-Retreat20" headingId="home-testimonials" />

      {/* Location */}
      <section id="location" className={`${styles.location} wrap section`} aria-labelledby="location-heading">
        <div className={styles.locationText} data-reveal-group>
          <h2 id="location-heading" className={styles.h2} data-reveal>
            {HOME.location.title}
          </h2>
          {HOME.location.paragraphs.map((p, i) => (
            <p key={i} data-reveal className={i === 0 ? styles.lead : undefined}>
              {p}
            </p>
          ))}
        </div>
        <div className={styles.locationMap} data-reveal>
          <LocationMap label={HOME.location.marker} />
        </div>
      </section>

      {/* Instagram, as a static selection (no live feed is connected) */}
      <section className={`${styles.insta} section`} aria-labelledby="insta-heading">
        <div className={`${styles.instaHead} wrap`} data-reveal-group>
          <h2 id="insta-heading" className={styles.h2} data-reveal>
            {HOME.instagramTitle}
          </h2>
          <p className={styles.instaNote} data-reveal>
            Photographs from around the villa. For the latest, follow{" "}
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
              {LINKS.instagramHandle}
            </a>
            .
          </p>
        </div>
        <ul className={styles.instaRow}>
          {INSTAGRAM.map((name) => (
            <li key={name} data-reveal>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className={styles.instaItem}>
                <Photo name={name} sizes="(max-width: 800px) 50vw, 20vw" className="cover" />
                <span className="visually-hidden">(opens Omer on Instagram in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* Promotion: the offer artwork beside a panel of the same height */}
      <section className={styles.promo} aria-labelledby="promo-heading">
        <div className={styles.promoGrid}>
          <figure className={styles.promoImg} data-reveal>
            <Photo name="IMG_4276" sizes="(max-width: 800px) 100vw, 40vw" className="cover" />
          </figure>
          <div className={styles.promoPanel} data-reveal-group>
            <h2 id="promo-heading" className={styles.promoLabel} data-reveal>
              {HOME.promotionTitle}
            </h2>
            <h3 className={styles.promoTitle} data-reveal>
              <span className={styles.promoBig}>20% OFF</span>
              <span className={styles.promoSub}>First Stay</span>
            </h3>
            <p className={styles.promoBody} data-reveal>
              {PROMO.body}
            </p>
            <div className={styles.promoActions} data-reveal>
              <Button href="/20-off-first-stay" variant="primary">
                View the offer{" "}
                <span className={ui.arrow} aria-hidden="true">
                  →
                </span>
              </Button>
              <Button href={LINKS.airbnb} variant="outline">
                Find us on Airbnb
              </Button>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
