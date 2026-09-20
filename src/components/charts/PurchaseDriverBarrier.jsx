import { langPair } from "../../lib/lang.js";
import ChartBar from "./ChartBar.jsx";

/**
 * 13 — PurchaseDriverBarrier
 * Two columns of horizontal bars + consequence annotations.
 */
export default function PurchaseDriverBarrier({ drivers, barriers }) {
  return (
    <div className="chart-dbb">
      <div className="chart-dbb-col">
        <h3 className="chart-dbb-title is-driver">{langPair(drivers.headline)}</h3>
        <ul className="chart-dbb-list">
          {drivers.items.map((d) => (
            <li key={d.id}>
              <ChartBar
                label={langPair(d.label)}
                value={d.value}
                max={100}
                accent={d.value >= 50}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="chart-dbb-col">
        <h3 className="chart-dbb-title is-barrier">{langPair(barriers.headline)}</h3>
        <ul className="chart-dbb-list">
          {barriers.items.map((b) => (
            <li key={b.id}>
              <ChartBar
                label={langPair(b.label)}
                value={b.value}
                max={100}
                accent={false}
              />
            </li>
          ))}
        </ul>
        <aside className="chart-dbb-consequence">
          <p className="chart-dbb-consequence-title">
            {langPair({ en: "Product consequences", zh: "产品应对" })}
          </p>
          <ul>
            {barriers.consequences.map((c, i) => (
              <li key={i}>
                <span className="chart-dbb-consequence-arrow" aria-hidden="true">→</span>
                <span>{langPair(c.text)}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
}
