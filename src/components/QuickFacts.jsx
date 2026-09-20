import { langPair } from "../lib/lang.js";

export default function QuickFacts({ facts }) {
  return (
    <ul className="quick-facts" aria-label="Quick facts">
      {facts.map((f, i) => (
        <li key={i} className={`quick-fact ${f.accent ? "is-accent" : ""}`.trim()}>
          <span className="quick-fact-value">{langPair(f.value)}</span>
          <span className="quick-fact-label">{langPair(f.label)}</span>
        </li>
      ))}
    </ul>
  );
}
