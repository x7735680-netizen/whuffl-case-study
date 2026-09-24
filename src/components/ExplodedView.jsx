import { useState } from "react";
import { langPair } from "../lib/lang.js";

export default function ExplodedView({ asset, components, lead }) {
  const [activeId, setActiveId] = useState(components[0]?.id);
  const active = components.find((c) => c.id === activeId) ?? components[0];

  return (
    <div className="exploded">
      <div className="exploded-stage">
        <img data-preload-src={asset} alt={langPair({ en: "Collar exploded view", zh: "项圈爆炸图" })} />
        {components.map((c, i) => {
          // Distribute labels around the right side with alternating offsets.
          const top = 6 + (i * 86) / components.length;
          return (
            <button
              key={c.id}
              type="button"
              className={`exploded-pin ${c.id === activeId ? "is-active" : ""}`.trim()}
              style={{ top: `${top}%` }}
              onMouseEnter={() => setActiveId(c.id)}
              onFocus={() => setActiveId(c.id)}
              onClick={() => setActiveId(c.id)}
              aria-label={langPair(c.label)}
            >
              <span className="exploded-pin-num">{String(i + 1).padStart(2, "0")}</span>
            </button>
          );
        })}
      </div>
      <aside className="exploded-detail">
        {lead ? <p className="exploded-lead">{langPair(lead)}</p> : null}
        <p className="exploded-active-label">
          <span className="exploded-active-name">{langPair(active.label)}</span>
        </p>
        <p className="exploded-active-role">{langPair(active.role)}</p>
        <ul className="exploded-list" aria-label="All components">
          {components.map((c, i) => (
            <li key={c.id}>
              <button
                type="button"
                className={`exploded-row ${c.id === activeId ? "is-active" : ""}`.trim()}
                onMouseEnter={() => setActiveId(c.id)}
                onFocus={() => setActiveId(c.id)}
                onClick={() => setActiveId(c.id)}
              >
                <span className="exploded-row-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="exploded-row-label">{langPair(c.label)}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}
