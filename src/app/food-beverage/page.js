import Photo from "@/components/Photo";
import Button from "@/components/Button";
import Gallery from "@/components/Gallery";
import CtaBand from "@/components/CtaBand";
import { FOOD } from "@/data/content";
import { mediaList } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./food.module.css";

export const metadata = {
  title: "Food & Beverage",
  description:
    "At Omer Villa & Retreat, we believe that great food begins with the finest ingredients: healthy, homemade dishes made from locally sourced produce.",
  alternates: { canonical: "/food-beverage" },
};

const FOOD_MESSAGE = "Hello Omer Villa & Retreat, I would like to ask about dining at the villa.";

export default function FoodPage() {
  const gallery = mediaList(FOOD.gallery);

  return (
    <>
      <section className={`${styles.hero} wrap`} aria-labelledby="food-title">
        <div className={styles.heroText}>
          <h1 id="food-title" className={styles.title} data-hero-in>
            Food &amp; Beverage
          </h1>
          <h2 className={styles.tagline} data-hero-in>
            {FOOD.tagline}
          </h2>
          <p className={styles.lead} data-hero-in>
            {FOOD.paragraphs[0]}
          </p>
        </div>
        <div className={styles.heroMedia}>
          <figure className={styles.heroImg} data-shutter>
            <Photo name="DSC03429" priority sizes="(max-width: 800px) 100vw, 40vw" className="cover" />
          </figure>
          <figure className={styles.heroInset} data-hero-in>
            <Photo name="Omer-Food3" priority sizes="(max-width: 800px) 40vw, 14vw" className="cover" />
          </figure>
        </div>
      </section>

      <section className={`${styles.story} wrap`} aria-label="Dining at the villa">
        <figure className={styles.storyImg} data-reveal>
          <Photo name="IMG_8465" sizes="(max-width: 800px) 100vw, 40vw" className="cover" data-parallax="8" />
        </figure>
        <div className={styles.second} data-reveal-group>
          <p data-reveal>{FOOD.paragraphs[1]}</p>
          <div className={styles.actions} data-reveal>
            <Button href={whatsappLink(FOOD_MESSAGE)} variant="primary">
              Ask about dining
            </Button>
          </div>
        </div>
      </section>

      <section className={`${styles.table} wrap`} aria-labelledby="food-gallery">
        <h2 id="food-gallery" className={styles.galleryTitle} data-reveal>
          Gallery
        </h2>
        <div data-reveal>
          <Gallery items={gallery} label="Food and drink at Omer" variant="masonry" />
        </div>
      </section>

      <CtaBand />
    </>
  );
}
