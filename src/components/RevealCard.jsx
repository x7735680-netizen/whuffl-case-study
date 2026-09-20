import useRevealOnce from "../lib/useRevealOnce.js";

export default function RevealCard({ as: Element = "div", className = "", delay = 0, children, style, ...props }) {
  const [ref, hasEntered] = useRevealOnce();
  return (
    <Element
      ref={ref}
      className={`reveal-card ${hasEntered ? "is-revealed" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Element>
  );
}
