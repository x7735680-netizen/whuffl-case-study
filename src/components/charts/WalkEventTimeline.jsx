import { langPair } from "../../lib/lang.js";

/**
 * 03 — WalkEventTimeline
 * 0..9 simplified walk event timeline. No fabricated sensor curves.
 */
export default function WalkEventTimeline({ data }) {
  return (
    <div className="chart-timeline">
      <p className="chart-timeline-intro">
        {langPair({
          en: "A simplified event timeline. Owner interpretation vs. dog-centered interpretation.",
          zh: "简化的散步事件时间线。主人解读 vs. 以狗为中心的解读。",
        })}
      </p>
      <ol className="chart-timeline-list" aria-label="Walk events">
        {data.events.map((e) => (
          <li key={e.id} className="chart-timeline-item">
            <span className="chart-timeline-id">{String(e.id).padStart(2, "0")}</span>
            <div className="chart-timeline-body">
              <p className="chart-timeline-event">
                <span className="chart-timeline-event-name">{langPair(e.event)}</span>
                <span className="chart-timeline-event-dur">{e.durationSec}s</span>
              </p>
              <p className="chart-timeline-row">
                <span className="chart-timeline-tag">{langPair({ en: "Owner", zh: "主人" })}</span>
                <span className="chart-timeline-text">{langPair(e.ownerInterpretation)}</span>
              </p>
              <p className="chart-timeline-row is-dog">
                <span className="chart-timeline-tag">{langPair({ en: "Dog", zh: "狗" })}</span>
                <span className="chart-timeline-text">{langPair(e.dogCenteredInterpretation)}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
