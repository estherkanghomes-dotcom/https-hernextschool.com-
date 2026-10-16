export function KenBurnsImage({
  src,
  alt,
  className = "",
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        className="h-full w-full animate-kenburns object-cover motion-reduce:animate-none"
      />
    </div>
  );
}