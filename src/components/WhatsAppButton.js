"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { WHATSAPP, whatsappLink } from "@/data/site";
import styles from "./WhatsAppButton.module.css";

export default function WhatsAppButton() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Step out of the way once the footer is on screen; the footer carries the
  // WhatsApp number itself, and the button would otherwise cover its links.
  useEffect(() => {
    const footer = document.getElementById("site-footer");
    if (!footer) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0 });
    io.observe(footer);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      className={`${styles.wa} ${hidden ? styles.hidden : ""}`}
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat on WhatsApp, ${WHATSAPP.display} (opens in a new tab)`}
      aria-hidden={hidden || undefined}
      tabIndex={hidden ? -1 : undefined}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3C9.4 3 4 8.36 4 14.97c0 2.11.56 4.17 1.62 5.99L4 27l6.2-1.6a12.1 12.1 0 0 0 5.84 1.48h.01C22.68 26.88 28 21.52 28 14.91 28 8.3 22.68 3 16.04 3Zm0 21.84h-.01a9.97 9.97 0 0 1-5.1-1.4l-.37-.22-3.68.95.98-3.57-.24-.37a9.86 9.86 0 0 1-1.52-5.26c0-5.48 4.48-9.94 9.96-9.94 2.66 0 5.15 1.03 7.03 2.91a9.83 9.83 0 0 1 2.91 7.03c0 5.48-4.47 9.87-9.96 9.87Zm5.46-7.42c-.3-.15-1.77-.87-2.04-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47a9 9 0 0 1-1.66-2.06c-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.68-1.63-.93-2.23-.24-.58-.49-.5-.68-.51h-.58a1.1 1.1 0 0 0-.8.37c-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.48.71.3 1.27.49 1.7.63.72.23 1.37.2 1.88.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35Z"
        />
      </svg>
      <span className={styles.label}>Chat on WhatsApp</span>
    </a>
  );
}
