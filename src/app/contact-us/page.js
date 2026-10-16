import Image from "next/image";
import Link from "next/link";
import Photo from "@/components/Photo";
import ContactForm from "@/components/ContactForm";
import Testimonials from "@/components/Testimonials";
import { CONTACT } from "@/data/content";
import { LINKS, SITE, WHATSAPP, whatsappLink } from "@/data/site";
import styles from "./contact.module.css";

export const metadata = {
  title: "Contact Us",
  description:
    "We love to hear from you. Send Omer Villa & Retreat your inquiry, message us on WhatsApp, or find us on Airbnb.",
  alternates: { canonical: "/contact-us" },
};

export default function ContactPage() {
  return (
    <>
      <section className={styles.hero} aria-labelledby="contact-title">
        <div className={styles.heroMedia} data-shutter>
          <Photo name="Omer-Villa-and-Retreat17" priority sizes="100vw" className="cover" />
        </div>
        <div className={`${styles.heroText} wrap`}>
          <h1 id="contact-title" className={styles.title} data-hero-in>
            {CONTACT.title}
          </h1>
        </div>
      </section>

      <section className={`${styles.main} wrap`} aria-labelledby="form-heading">
        <div className={styles.formCol}>
          <div className={styles.formHead}>
            <h2 id="form-heading" className={styles.h2}>
              {CONTACT.formTitle}
            </h2>
            <p className={styles.sub}>
              {CONTACT.formSubtitle}
            </p>
          </div>
          <div>
            <ContactForm />
          </div>
        </div>

        <aside className={styles.channels} aria-labelledby="channels-heading">
          <h2 id="channels-heading" className={styles.channelsTitle}>
            Or reach us directly
          </h2>
          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={styles.wa}>
            <span className={styles.channelLabel}>WhatsApp</span>
            <span className={styles.channelValue}>{WHATSAPP.display}</span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <ul className={styles.list}>
            <li>
              <a href={LINKS.airbnb} target="_blank" rel="noopener noreferrer">
                <span className={styles.airbnbDot} aria-hidden="true" />
                Find us on Airbnb
                <span className="visually-hidden"> (opens in a new tab)</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
            <li>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer">
                <Image src="/media/brand/Ig-icon.png" alt="" width={24} height={24} />
                Instagram {LINKS.instagramHandle}
                <span className="visually-hidden"> (opens in a new tab)</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
            <li>
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer">
                <Image src="/media/brand/facebook-icon.png" alt="" width={24} height={24} />
                Facebook
                <span className="visually-hidden"> (opens in a new tab)</span>
                <span aria-hidden="true">→</span>
              </a>
            </li>
          </ul>
          <div className={styles.place}>
            <p className={styles.channelLabel}>Location</p>
            <p>{SITE.location}</p>
            <Link href="/#location">See the map</Link>
          </div>
        </aside>
      </section>

      <Testimonials image="DSCF8577" headingId="contact-testimonials" />
    </>
  );
}
