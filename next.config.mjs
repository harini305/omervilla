/** @type {import('next').NextConfig} */
const nextConfig = {
  // Fully static export: every page is pre-built HTML, so Vercel serves
  // files from its CDN and runs no functions for visitors.
  output: "export",
  images: {
    // Next.js image optimization is disabled on purpose: photographs are
    // pre-sized into WebP derivatives by scripts/prepare-media.py instead.
    unoptimized: true,
  },
  // Redirects live in vercel.json (static exports cannot define them here).
};

export default nextConfig;
