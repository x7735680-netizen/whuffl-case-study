import { langPair } from "../lib/lang.js";

/**
 * ChapterHeader — design.md §5
 * Pattern: // 0X LABEL  →  H2  →  short lead
 */
export default function ChapterHeader({
  numeral,
  label,
  title,
  lead,
  id,
  surface = "light",
}) {
  return (
    <header className={`chapter-header chapter-header--${surface}`}>
      <p className="chapter-eyebrow">
        <span className="chapter-eyebrow-mark">//</span>
        <span className="chapter-eyebrow-num">{numeral}</span>
        <span className="chapter-eyebrow-sep">·</span>
        <span className="chapter-eyebrow-label">{langPair(label)}</span>
      </p>
      <h2 id={id} className="chapter-title">
        {typeof title === "string"
          ? <span>{langPair(title)}</span>
          : title /* allow caller to pass already-bilingual node */}
      </h2>
      {lead ? <p className="chapter-lead">{langPair(lead)}</p> : null}
      <hr className="chapter-rule" aria-hidden="true" />
    </header>
  );
}
