import { media } from "@/data/media";

// Responsive <img> over the pre-sized WebP derivatives in /public/media.
// Plain <img> is used because Next.js image optimization is disabled
// (images.unoptimized) and would otherwise emit a single full-size src.
export default function Photo({
  name,
  item,
  sizes = "100vw",
  priority = false,
  className = "",
  alt,
  style,
  ...rest
}) {
  const m = item ?? media(name);
  return (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={sizes}
      width={m.width}
      height={m.height}
      alt={alt ?? m.alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      className={className}
      style={style}
      {...rest}
    />
  );
}
