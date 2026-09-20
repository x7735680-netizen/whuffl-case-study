/**
 * PhoneFrame — subtle device frame around a phone screenshot.
 * design.md §12: avoid a "wall of phones"; max 2–4 in one viewport.
 */
export default function PhoneFrame({ src, alt, size = "md", priority = false }) {
  return (
    <figure className={`phone phone--${size}`}>
      <div className="phone-bezel">
        <span className="phone-notch" aria-hidden="true" />
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
        />
      </div>
    </figure>
  );
}
