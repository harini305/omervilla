import Link from "next/link";
import styles from "./ui.module.css";

const isExternal = (href) => /^https?:\/\//.test(href);

export default function Button({ href, variant = "primary", children, className = "", external, ...rest }) {
  const cls = `${styles.button} ${styles[variant] ?? ""} ${className}`;
  const ext = external ?? isExternal(href);
  if (ext) {
    return (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  return (
    <Link className={cls} href={href} {...rest}>
      {children}
    </Link>
  );
}
