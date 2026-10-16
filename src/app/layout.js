import { Roboto } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Motion from "@/components/Motion";
import SmoothScroll from "@/components/SmoothScroll";
import FooterFit from "@/components/FooterFit";
import { SITE } from "@/data/site";
import "./globals.css";

// Roboto Light carries the brand's letter-spaced eyebrows; 400 is used for buttons.
// next/font self-hosts the files at build time, so no request goes to Google at runtime.
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-roboto",
});

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Omer Villas",
    template: "%s – Omer Villas",
  },
  description:
    "Nestled in the serene landscapes of Bali, Omer Villa & Retreat is a haven for families, groups, and individuals seeking a peaceful escape.",
  openGraph: {
    siteName: "Omer Villa & Retreat",
    type: "website",
    locale: "en",
    images: [{ url: "/media/Omer-Villa-front-joglo-1600.webp", width: 1600, height: 1200 }],
  },
  icons: { icon: "/media/brand/Omer-Logo-clear-black.png" },
};

export const viewport = {
  themeColor: "#f2ecde",
};

// Hidden start states for the first-screen animation apply only once we know
// motion is allowed, and are withdrawn if GSAP has not started within 2.5s.
const motionGuard = `(function(){try{var d=document.documentElement;if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;d.classList.add('motion-ok');setTimeout(function(){if(!d.classList.contains('motion-ready'))d.classList.remove('motion-ok')},2500)}catch(e){}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGuard }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppButton />
        <Motion />
        <SmoothScroll />
        <FooterFit />
      </body>
    </html>
  );
}
