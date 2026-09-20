import useRevealOnce from "../lib/useRevealOnce.js";

export default function RevealTextGroup({ as: Element = "div", className = "", children, ...props }) {
  const [ref, hasEntered] = useRevealOnce({ threshold: 0.01, rootMargin: "0px 0px -20% 0px" });
  return (
    <Element
      ref={ref}
      className={`reveal-text-group ${hasEntered ? "is-revealed" : ""} ${className}`.trim()}
      {...props}
    >
      {children}
    </Element>
  );
}
