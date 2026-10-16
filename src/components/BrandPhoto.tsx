/**
 * BrandPhoto — credibility-first image slot.
 *
 * BRAND RULE: only the founder's REAL photos may show. Never a stock person.
 * When a real photo file exists at src/assets/<slot>, it renders. When the
 * file is absent, an elegant cream/serif branded placeholder ("사진 준비 중")
 * renders instead — so a missing photo never falls back to a stock human.
 *
 * The founder drops her real photos into these exact paths (see call sites),
 * one per location, and they appear automatically:
 *   src/assets/esther-hero.jpg          — landing hero (seminar stage photo)
 *   src/assets/esther-story.jpg         — story section (bright white-tone seminar)
 *   src/assets/esther-program.jpg       — program section (navy-tone stage)
 *   src/assets/esther-certs-wall.jpg    — certification wall photo
 *   src/assets/esther-academy.jpg       — academy years photo
 *   src/assets/note-*.jpg               — Success Notes article headers
 */

// Eagerly resolve any REAL photos present in src/assets to their URLs.
const realPhotos = import.meta.glob("/src/assets/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

export function BrandPhoto({
  slot,
  alt,
  className = "",
  imgClassName = "h-full w-full object-cover",
  eager = false,
  width,
  height,
}: {
  /** Filename inside src/assets, e.g. "esther-hero.jpg". */
  slot: string;
  alt: string;
  /** Applied to the placeholder wrapper (sizing/aspect for the empty state). */
  className?: string;
  /** Applied to the real <img> when the file exists. */
  imgClassName?: string;
  eager?: boolean;
  width?: number;
  height?: number;
}) {
  const url = realPhotos[`/src/assets/${slot}`];

  if (url) {
    return (
      <img
        src={url}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        width={width}
        height={height}
        className={imgClassName}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex flex-col items-center justify-center gap-3 overflow-hidden bg-[radial-gradient(120%_120%_at_50%_0%,var(--color-blush)_0%,var(--color-cream)_70%)] text-plum ${className}`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-lg border border-berry/25"
      />
      <span
        aria-hidden
        className="h-px w-12 bg-gradient-to-r from-transparent via-berry to-transparent"
      />
      <span className="font-serif text-3xl font-semibold tracking-tight text-plum">
        HN
      </span>
      <span
        aria-hidden
        className="h-px w-12 bg-gradient-to-r from-transparent via-berry to-transparent"
      />
      <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-berry/80">
        사진 준비 중
      </span>
    </div>
  );
}
