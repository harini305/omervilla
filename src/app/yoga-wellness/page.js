import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { YOGA } from "@/data/content";
import { mediaList } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./yoga.module.css";

export const metadata = {
  title: "Yoga & Wellness",
  description:
    "At Omer Villa & Retreat, yoga and wellness take on a new dimension, with spacious outdoor areas designed to bring you closer to nature.",
  alternates: { canonical: "/yoga-wellness" },
};

const YOGA_MESSAGE = "Hello Omer Villa & Retreat, I would like to ask about hosting a yoga or wellness retreat.";

export default function YogaPage() {
  const gallery = mediaList(YOGA.gallery);

  return (
    <>
      <section className={styles.hero} aria-labelledby="yoga-title">
        <div className={`${styles.heroText} wrap`}>
          <h1 id="yoga-title" className={styles.title} data-hero-in>
            Yoga &amp; Wellness
          </h1>
        </div>
        <figure className={styles.heroImg} data-shutter>
          <Photo name="omer-5" priority sizes="(max-width: 800px) 100vw, 80vw" className="cover" />
        </figure>
      </section>

      <section className={`${styles.text} wrap`} aria-labelledby="yoga-tagline">
        <figure className={`${styles.portrait} ${styles.portraitA}`} data-reveal>
          <Photo name="omer-11" sizes="(max-width: 900px) 50vw, 24vw" className="cover" data-parallax="8" />
        </figure>
        <div className={styles.paras} data-reveal-group>
          <h2 id="yoga-tagline" className={styles.tagline} data-reveal>
            {YOGA.tagline}
          </h2>
          {YOGA.paragraphs.map((p, i) => (
            <p key={i} data-reveal className={i === 0 ? styles.lead : undefined}>
              {p}
            </p>
          ))}
          <div data-reveal className={styles.actions}>
            <Button href={whatsappLink(YOGA_MESSAGE)} variant="primary">
              Plan a retreat
            </Button>
          </div>
        </div>
        <figure className={`${styles.portrait} ${styles.portraitB}`} data-reveal>
          <Photo name="omer-13" sizes="(max-width: 900px) 50vw, 24vw" className="cover" />
        </figure>
      </section>

      <section className={styles.gallery} aria-labelledby="yoga-gallery">
        <h2 id="yoga-gallery" className="visually-hidden">
          Yoga at Omer
        </h2>
        <Gallery items={gallery} label="Yoga at Omer" variant="strip" />
      </section>

      <CtaBand />
    </>
  );
}
