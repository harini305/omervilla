import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { EVENT } from "@/data/content";
import { mediaList } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./event.module.css";

export const metadata = {
  title: "Event & Venue",
  description:
    "Omer Villa & Retreat offers the perfect setting for your wedding or special event, surrounded by the serene beauty of Bali’s lush rice fields.",
  alternates: { canonical: "/event-venue" },
};

// Strongest frames first for the editorial selection; the lightbox holds all 21.
const LEAD = [
  "MATANAI_MNR_112786",
  "MATANAI_MNR_113442",
  "MATANAI_MNR_111124",
  "MATANAI_MNR_113230",
  "MATANAI_MNR_113494",
  "MATANAI_MNR_109969",
];

const EVENT_MESSAGE = "Hello Omer Villa & Retreat, I would like to ask about hosting an event at the villa.";

export default function EventPage() {
  const ordered = [...LEAD, ...EVENT.gallery.filter((n) => !LEAD.includes(n))];
  const gallery = mediaList(ordered);
  const [venue, photoshoot] = EVENT.prices;

  return (
    <>
      <section className={styles.hero} aria-labelledby="event-title">
        <div className={styles.heroMedia} data-shutter>
          <Photo name="MATANAI_MNR_111509-e1727740449225" priority sizes="100vw" className="cover" />
        </div>
        <div className={`${styles.heroText} wrap`}>
          <h1 id="event-title" className={styles.title} data-hero-in>
            <span>Event &amp;</span>
            <span className={styles.titleIndent}>Venue</span>
          </h1>
        </div>
      </section>

      <section className={`${styles.intro} wrap`} aria-labelledby="event-intro">
        <h2 id="event-intro" className={styles.tagline} data-reveal>
          {EVENT.tagline}
        </h2>
        <div className={styles.introCols}>
          <div className={styles.introText} data-reveal-group>
            <p className={styles.lead} data-reveal>
              {EVENT.paragraphs[0]}
            </p>
            <p data-reveal>{EVENT.paragraphs[1]}</p>
          </div>
          <figure className={styles.introImg} data-reveal>
            <Photo name="MATANAI_MNR_111641" sizes="(max-width: 800px) 100vw, 40vw" className="cover" />
          </figure>
        </div>
      </section>

      {/* Prices, set like a menu on a dark ground */}
      <section className={styles.prices} aria-labelledby="prices-heading">
        <div className={`${styles.pricesGrid} wrap`}>
          <div className={styles.pricesSide} data-reveal-group>
            <h2 id="prices-heading" className={styles.h2} data-reveal>
              Event &amp; venue rates
            </h2>
            <figure className={styles.pricesImg} data-reveal>
              <Photo name="MATANAI_MNR_113446" sizes="(max-width: 800px) 70vw, 26vw" className="cover" />
            </figure>
          </div>
          <div className={styles.menu} data-reveal-group>
            <div className={styles.menuItem} data-reveal>
              <div className={styles.menuRow}>
                <h3 className={styles.menuName}>{venue.name}</h3>
                <p className={styles.menuPrice}>{venue.price}</p>
              </div>
              <p className={styles.menuNote}>{venue.notes[0]}</p>
              <p className={styles.menuSub}>{venue.notes[1]}</p>
              <ul className={styles.menuRooms}>
                {venue.rooms.map((r) => (
                  <li key={r.label}>
                    <span>
                      {r.label} <span className={styles.muted}>{r.note}</span>
                    </span>
                    <span className={styles.menuRoomPrice}>{r.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.menuItem} data-reveal>
              <div className={styles.menuRow}>
                <h3 className={styles.menuName}>{photoshoot.name}</h3>
                <p className={styles.menuPrice}>{photoshoot.price}</p>
              </div>
              <p className={styles.menuNote}>{photoshoot.notes[0]}</p>
            </div>
            <p className={styles.confirm} data-reveal>
              Prices as last published. Please confirm current pricing and availability for your date when you
              inquire.
            </p>
            <div className={styles.actions} data-reveal>
              <Button href="/contact-us" variant="light">
                Send your inquiry
              </Button>
              <Button href={whatsappLink(EVENT_MESSAGE)} variant="ghostLight">
                Ask on WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className={`${styles.gallery} wrap`} aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="visually-hidden">
          Weddings and celebrations at Omer
        </h2>
        <Gallery items={gallery} label="Weddings and celebrations at Omer" variant="stagger" show={6} />
      </section>

      <CtaBand />
    </>
  );
}
