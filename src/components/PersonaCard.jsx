import { langPair } from "../lib/lang.js";
import RevealCard from "./RevealCard.jsx";

export default function PersonaCard({ persona, delay = 0 }) {
  return (
    <RevealCard as="article" delay={delay} className={`persona-card ${persona.accent ? "is-accent" : ""}`.trim()}>
      <div className="persona-card-head">
        <div className="persona-avatar">
          <img src={persona.avatar} alt={langPair(persona.name)} loading="lazy" />
        </div>
        <div className="persona-meta">
          <p className="persona-share">
            <span className="persona-code">{persona.code}</span>
          </p>
          <h3 className="persona-name">{langPair(persona.name)}</h3>
          <p className="persona-tagline">{langPair(persona.tagline)}</p>
        </div>
      </div>
      <dl className="persona-fields">
        <div>
          <dt>{langPair({ en: "Pain", zh: "痛点" })}</dt>
          <dd>{langPair(persona.pain)}</dd>
        </div>
        <div>
          <dt>{langPair({ en: "Need", zh: "需求" })}</dt>
          <dd>{langPair(persona.need)}</dd>
        </div>
        <div>
          <dt>{langPair({ en: "Whuffl response", zh: "Whuffl 回应" })}</dt>
          <dd>{langPair(persona.response)}</dd>
        </div>
      </dl>
      <p className="persona-validation">
        <span className="persona-validation-mark" aria-hidden="true" />
        {langPair(persona.validation)}
      </p>
    </RevealCard>
  );
}
