import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { FAMILY } from "@/data/content";
import { mediaList } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./family.module.css";

export const metadata = {
  title: "Family & Groups",
  description:
    "Omer Villa & Retreat is a family-friendly and group accommodation nestled between Canggu and Ubud, offering a peaceful escape in the heart of Bali.",
  alternates: { canonical: "/family-groups" },
};

const FAMILY_MESSAGE = "Hello Omer Villa & Retreat, I would like to ask about a family or group stay.";

export default function FamilyPage() {
  const gallery = mediaList(FAMILY.gallery);
  const [p1, p2, p3] = FAMILY.paragraphs;

  return (
    <>
      <section className={styles.hero} aria-labelledby="family-title">
        <div className={styles.heroMedia} data-shutter>
          <Photo name="DSCF8625-2" priority sizes="100vw" className="cover" />
        </div>
        <div className={`${styles.heroText} wrap`}>
          <h1 id="family-title" className={styles.title} data-hero-in>
            Family &amp; Groups
          </h1>
        </div>
      </section>

      <section className={`${styles.story} wrap`} aria-labelledby="family-tagline">
        <h2 id="family-tagline" className={styles.tagline} data-reveal>
          {FAMILY.tagline}
        </h2>
        <div className={styles.grid}>
          <div className={styles.leadCol} data-reveal-group>
            <p className={styles.lead} data-reveal>
              {p1}
            </p>
            <div className={styles.actions} data-reveal>
              <Button href={whatsappLink(FAMILY_MESSAGE)} variant="primary">
                Plan a group stay
              </Button>
              <Button href="/rooms-rates" variant="outline">
                Rooms &amp; Rates
              </Button>
            </div>
          </div>
          <div className={styles.side} data-reveal-group>
            <p data-reveal>{p2}</p>
            <p data-reveal>{p3}</p>
          </div>
        </div>
      </section>

      <section className={`${styles.gallery} wrap`} aria-labelledby="family-gallery">
        <h2 id="family-gallery" className="visually-hidden">
          Families at Omer
        </h2>
        <Gallery items={gallery} label="Families at Omer" variant="stagger" />
      </section>

      <CtaBand />
    </>
  );
}
