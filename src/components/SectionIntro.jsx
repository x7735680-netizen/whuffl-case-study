import { langPair } from "../lib/lang.js";
import RevealTextGroup from "./RevealTextGroup.jsx";

/** Shared page-level section intro: kicker, display title, and optional lead. */
export default function SectionIntro({
  index,
  label,
  title,
  subtitle,
  id,
  surface = "light",
  className = "",
}) {
  const titleContent =
    typeof title === "string"
      ? langPair(title)
      : title && typeof title === "object" && ("en" in title || "zh" in title)
        ? langPair(title)
        : title;

  return (
    <RevealTextGroup as="header" className={`section-intro section-intro--${surface} ${className}`.trim()}>
      <p className="section-intro__kicker reveal-text-group__kicker" aria-label={`${index} ${langPair(label)}`}>
        <span className="section-intro__slashes">//</span>
        <span className="section-intro__index">{index}</span>
        <span className="section-intro__separator">·</span>
        <span className="section-intro__label">{langPair(label)}</span>
      </p>
      <h2 id={id} className="section-intro__title reveal-text-group__title">
        {titleContent}
      </h2>
      {subtitle ? <p className="section-intro__subtitle reveal-text-group__subtitle">{langPair(subtitle)}</p> : null}
    </RevealTextGroup>
  );
}
