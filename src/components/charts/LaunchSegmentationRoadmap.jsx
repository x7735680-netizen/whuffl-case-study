import { langPair } from "../../lib/lang.js";

/**
 * 05 — LaunchSegmentationRoadmap
 * 3-phase roadmap, not a funnel. Each phase is a column.
 */
export default function LaunchSegmentationRoadmap({ data }) {
  return (
    <div className="chart-launch">
      <header className="chart-launch-head">
        <p className="chart-launch-headline">{langPair(data.headline)}</p>
        <p className="chart-launch-lead">{langPair(data.lead)}</p>
      </header>
      <ol className="chart-launch-list">
        {data.phases.map((p, i) => (
          <li key={p.id} className="chart-launch-phase">
            <div className="chart-launch-num">{String(i + 1).padStart(2, "0")}</div>
            <p className="chart-launch-label">{langPair(p.label)}</p>
            <p className="chart-launch-target">{langPair(p.target)}</p>
            <p className="chart-launch-reason">{langPair(p.reason)}</p>
            <div className="chart-launch-message">
              <span className="chart-launch-message-mark" aria-hidden="true">“</span>
              <span className="chart-launch-message-text">{langPair(p.message)}</span>
              <span className="chart-launch-message-mark" aria-hidden="true">”</span>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
