import Image from "next/image";

// Circular portrait. Pass `src` (from lib/portrait.js) or get a clean replaceable placeholder.
// To use your photo, drop it at public/images/portrait.jpg (or .png/.webp).
export default function PortraitFrame({ src, alt = "Portrait of Sarbjot Singh", className = "" }) {
  return (
    <div
      className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden rounded-full bg-gradient-to-br from-[#dcd7ff] via-[#e8e4ff] to-[#d4e3ff] ${className}`}
    >
      {src ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 380px, 70vw"
          className="object-cover"
          style={{ objectPosition: "center 18%" }}
        />
      ) : (
        <div role="img" aria-label="Portrait placeholder" className="absolute inset-0 grid place-items-center">
          <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden="true">
            <defs>
              <linearGradient id="ph-body" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#8f86ff" />
                <stop offset="1" stopColor="#4338f5" />
              </linearGradient>
            </defs>
            <circle cx="100" cy="78" r="30" fill="url(#ph-body)" opacity="0.85" />
            <path d="M36 200c0-38 28-62 64-62s64 24 64 62z" fill="url(#ph-body)" opacity="0.85" />
          </svg>
        </div>
      )}
    </div>
  );
}
