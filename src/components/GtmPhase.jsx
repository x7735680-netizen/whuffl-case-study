import { langPair } from "../lib/lang.js";

export default function GtmPhase({ phase, index, isLast }) {
  return (
    <li className="gtm-phase">
      <span className="gtm-phase-rail" aria-hidden="true" />
      <div className="gtm-phase-head">
        <span className="gtm-phase-num">{String(index + 1).padStart(2, "0")}</span>
        <h3 className="gtm-phase-label">{langPair(phase.label)}</h3>
      </div>
      <div className="gtm-phase-grid">
        <div>
          <p className="gtm-phase-key">{langPair({ en: "Target", zh: "目标人群" })}</p>
          <p className="gtm-phase-val">{langPair(phase.target)}</p>
        </div>
        <div>
          <p className="gtm-phase-key">{langPair({ en: "Message", zh: "核心话术" })}</p>
          <p className="gtm-phase-val is-message">{langPair(phase.message)}</p>
        </div>
        <div>
          <p className="gtm-phase-key">{langPair({ en: "Goal", zh: "目标" })}</p>
          <p className="gtm-phase-val">{langPair(phase.goal)}</p>
        </div>
        <div>
          <p className="gtm-phase-key">{langPair({ en: "Channels (hypotheses)", zh: "渠道（假设）" })}</p>
          <p className="gtm-phase-val">{langPair(phase.channels ?? "")}</p>
        </div>
      </div>
      {!isLast ? <span className="gtm-phase-arrow" aria-hidden="true">→</span> : null}
    </li>
  );
}
