import { langPair } from "../lib/lang.js";

export default function OpportunityCard({ opportunity }) {
  return (
    <aside className="opportunity-card">
      <p className="opportunity-eyebrow">
        {langPair({ en: "Opportunity", zh: "机会" })}
      </p>
      <p className="opportunity-text">{langPair(opportunity)}</p>
    </aside>
  );
}
