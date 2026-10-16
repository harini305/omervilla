import Image from "next/image";
import Link from "next/link";
import Photo from "./Photo";
import { FOOTER_LINKS, LINKS, SITE, WHATSAPP, whatsappLink } from "@/data/site";
import { PROMO } from "@/data/content";
import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="site-footer" className={styles.footer}>
      <div className={`${styles.top} wrap`}>
        <div className={styles.brand}>
          <Link href="/" aria-label="Omer Villa & Retreat, home" className={styles.logo}>
            <Image src="/media/brand/Omer-Logo-Footer.png" alt="" width={813} height={250} />
          </Link>
          <p className={styles.place}>{SITE.location}</p>
          <p className={styles.wa}>
            WhatsApp{" "}
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              {WHATSAPP.display}
            </a>
          </p>
        </div>

        <nav aria-label="Footer" className={styles.links}>
          <ul>
            {FOOTER_LINKS.map((l) => (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={styles.colTitle}>Keep close with Omer</h2>
          <div className={styles.icons}>
            <a
              href={LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omer on Instagram (opens in a new tab)"
            >
              <Image src="/media/brand/Ig-icon.png" alt="" width={148} height={149} />
            </a>
            <a
              href={LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Omer on Facebook (opens in a new tab)"
            >
              <Image src="/media/brand/facebook-icon.png" alt="" width={148} height={148} />
            </a>
          </div>
        </div>

        <div>
          <h2 className={styles.colTitle}>Omer Specials</h2>
          <Link href="/20-off-first-stay" className={styles.special}>
            <Photo name="IMG_4276" sizes="88px" alt="" className={styles.specialImg} />
            <span>
              <span className={styles.specialLabel}>Promo</span>
              <span className={styles.specialTitle}>20% OFF First Stay</span>
              <span className={styles.specialText}>{PROMO.excerpt}</span>
            </span>
          </Link>
        </div>
      </div>
      <div className={styles.bottom}>
        <p className="wrap">
          © {year} Omer Villas. A website by{" "}
          <a href={LINKS.credit} target="_blank" rel="noopener noreferrer">
            SuryaNirmala
          </a>
        </p>
      </div>
    </footer>
  );
}
