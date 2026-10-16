import Button from "@/components/Button";
import Photo from "@/components/Photo";
import styles from "./not-found.module.css";

export const metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={`${styles.wrap} wrap`} aria-labelledby="nf-title">
      <div className={styles.text}>
        <h1 id="nf-title" className={styles.code}>
          404
        </h1>
        <h2 className={styles.title}>Page Not Found</h2>
        <Button href="/" variant="primary">
          Back Home
        </Button>
      </div>
      <figure className={styles.img}>
        <Photo name="Omer-Villa-Joglo6" sizes="(max-width: 800px) 90vw, 40vw" className="cover" alt="" />
      </figure>
    </section>
  );
}
