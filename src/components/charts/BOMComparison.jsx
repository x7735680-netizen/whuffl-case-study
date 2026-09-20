import { langPair } from "../../lib/lang.js";
import useRevealOnce from "../../lib/useRevealOnce.js";
import { viabilityBomLegend } from "../../content/whuffl.js";

/**
 * 09 — BOMComparison
 * Grouped horizontal bars: Pilot 50 vs MP 1000. Only the total gets
 * the accent. Bar widths are scaled to the largest value across both.
 */
export default function BOMComparison({ data, hideTotals = false }) {
  const max = Math.max(...data.groups.flatMap((g) => [g.pilot, g.mp]));
  const fmt = (v) => v.toFixed(2);
  const [rootRef, hasEntered] = useRevealOnce();

  return (
    <div ref={rootRef} className={`chart-bom ${hasEntered ? "is-revealed" : ""}`.trim()}>
      <p className="chart-bom-headline">{langPair(data.headline)}</p>
      <p className="chart-bom-lead">{langPair(data.lead)}</p>
      <div className="viability-bom-legend" aria-label={langPair({ en: "BOM run legend", zh: "BOM 生产批次图例" })}>
        {viabilityBomLegend.map((item) => (
          <span className="viability-bom-legend-item" key={item.key}>
            <span className="viability-bom-legend-dot" style={{ backgroundColor: item.color }} aria-hidden="true" />
            <span className="viability-bom-legend-label">{langPair(item.label)}</span>
          </span>
        ))}
      </div>
      <div className={`chart-bom-grid ${hideTotals ? "chart-bom-grid--no-totals" : ""}`.trim()}>
        <div className="chart-bom-axis">
          <span>{langPair({ en: "Pilot · 50 units", zh: "试产 · 50 台" })}</span>
          <span>{langPair({ en: "MP · 1,000 units", zh: "量产 · 1,000 台" })}</span>
        </div>
        <ul className="chart-bom-list">
          {data.groups.map((g, index) => (
            <li key={g.id} className="chart-bom-row" style={{ "--bom-delay": `${index * 48}ms` }}>
              <span className="chart-bom-label">{langPair(g.label)}</span>
              <div className="chart-bom-bars">
                <div className="chart-bom-bar">
                  <div className="chart-bom-bar-track">
                    <div className="chart-bom-bar-fill is-pilot" style={{ width: `${(g.pilot / max) * 100}%` }} />
                  </div>
                  <span className="chart-bom-bar-value">¥{fmt(g.pilot)}</span>
                </div>
                <div className="chart-bom-bar">
                  <div className="chart-bom-bar-track">
                    <div className="chart-bom-bar-fill is-mp" style={{ width: `${(g.mp / max) * 100}%` }} />
                  </div>
                  <span className="chart-bom-bar-value">¥{fmt(g.mp)}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {!hideTotals ? <BOMTotals data={data} /> : null}
      </div>
    </div>
  );
}

export function BOMTotals({ data }) {
  return (
    <div className="chart-bom-totals">
      <div className="chart-bom-total">
        <p className="chart-bom-total-label">{langPair({ en: "Pilot total", zh: "试产合计" })}</p>
        <p className="chart-bom-total-value">¥{data.totals.pilot.low.toFixed(2)}–{data.totals.pilot.high.toFixed(2)}</p>
        <p className="chart-bom-total-unit">{langPair(data.unit)}</p>
      </div>
      <div className="chart-bom-total is-accent">
        <p className="chart-bom-total-label">{langPair({ en: "MP total", zh: "量产合计" })}</p>
        <p className="chart-bom-total-value">¥{data.totals.mp.low.toFixed(2)}–{data.totals.mp.high.toFixed(2)}</p>
        <p className="chart-bom-total-unit">{langPair(data.unit)}</p>
      </div>
    </div>
  );
}
