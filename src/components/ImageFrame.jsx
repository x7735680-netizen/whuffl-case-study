export default function ImageFrame({
  src,
  alt = "",
  className = "",
  loading = "lazy",
  fetchPriority = "auto",
  width,
  height,
}) {
  return (
    <figure className={`image-frame ${className}`.trim()}>
      <img
        data-preload-src={src}
        alt={alt}
        {...(loading === "eager" ? { src, loading, fetchPriority } : {})}
        width={width}
        height={height}
      />
    </figure>
  );
}
