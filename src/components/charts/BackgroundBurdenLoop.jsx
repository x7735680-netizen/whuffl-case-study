import { langPair } from "../../lib/lang.js";

/**
 * 01 — BackgroundBurdenLoop
 * Code-rendered loop: Urban → Dog → Behavior → Owner fatigue → Worse walk
 * plus 2 large-number metrics.
 */
export default function BackgroundBurdenLoop({ data }) {
  const loop = data.loop;
  return (
    <div className="chart-burden">
      <div className="chart-burden-metrics">
        {data.metrics.map((m, i) => (
          <div key={i} className="chart-burden-metric">
            <p className="chart-burden-num">{m.value}</p>
            <p className="chart-burden-cap">{langPair(m.label)}</p>
          </div>
        ))}
      </div>
      <ol className="chart-burden-loop" aria-label="Burden loop">
        {loop.map((step, i) => (
          <li key={i} className="chart-burden-step">
            <span className="chart-burden-step-num">{String(i + 1).padStart(2, "0")}</span>
            <span className="chart-burden-step-text">{langPair(step)}</span>
            {i < loop.length - 1 ? (
              <span className="chart-burden-step-arrow" aria-hidden="true">→</span>
            ) : (
              <span className="chart-burden-step-arrow is-loop" aria-hidden="true">↺</span>
            )}
          </li>
        ))}
      </ol>
      <p className="chart-burden-source">{langPair(data.source)}</p>
    </div>
  );
}
