import Photo from "@/components/Photo";
import Button from "@/components/Button";
import InlineVideo from "@/components/InlineVideo";
import CtaBand from "@/components/CtaBand";
import { CULTURE } from "@/data/content";
import { media } from "@/data/media";
import { whatsappLink } from "@/data/site";
import styles from "./culture.module.css";

export const metadata = {
  title: "Cultural & Spiritual Activities",
  description:
    "Our villa is located in the traditional Balinese village of Buduk, offering you the opportunity to immerse yourself in the local culture.",
  alternates: { canonical: "/cultural-spiritual-activities" },
};

const CULTURE_MESSAGE =
  "Hello Omer Villa & Retreat, I would like to ask about taking part in Balinese rituals and activities during my stay.";

const STORY = ["Omer-Spiritual-Activities-3", "pray2", "pray3"];

export default function CulturePage() {
  const [greeting, prayer, walk] = STORY.map(media);

  return (
    <>
      <section className={`${styles.hero} wrap`} aria-labelledby="culture-title">
        <div className={styles.heroText}>
          <h1 id="culture-title" className={styles.title} data-hero-in>
            {CULTURE.title}
          </h1>
        </div>
        <figure className={styles.panorama} data-shutter>
          <Photo name="pray4" priority sizes="(max-width: 1700px) 100vw, 1600px" className="cover" />
        </figure>
      </section>

      <section className={`${styles.film} wrap`} aria-labelledby="culture-heading">
        <div className={styles.videoWrap} data-reveal>
          <InlineVideo
            src="/media/video/Omer-720p.mp4"
            poster="/media/video/Omer-poster.jpg"
            width={720}
            height={1280}
            label="Film: preparing and presenting Balinese offerings at Omer"
            className={styles.video}
          />
        </div>
        <div className={styles.filmText} data-reveal-group>
          <h2 id="culture-heading" className={styles.h2} data-reveal>
            {CULTURE.heading}
          </h2>
          <p className={styles.lead} data-reveal>
            {CULTURE.paragraph}
          </p>
          <div className={styles.actions} data-reveal>
            <Button href={whatsappLink(CULTURE_MESSAGE)} variant="primary">
              Ask about activities
            </Button>
            <Button href="/contact-us" variant="outline">
              Send your inquiry
            </Button>
          </div>
          <div className={styles.story} aria-label="Photographs of Balinese rituals" role="group">
            {[greeting, prayer, walk].map((m, i) => (
              <figure key={m.stem} className={styles.frame} data-reveal>
                <div className={styles.clip}>
                  <Photo
                    item={m}
                    sizes={i === 0 ? "(max-width: 800px) 100vw, 34vw" : "(max-width: 800px) 50vw, 15vw"}
                    className="cover"
                  />
                </div>
                <figcaption>{m.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
