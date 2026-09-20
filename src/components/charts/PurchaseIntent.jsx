import { langPair } from "../../lib/lang.js";
import PricingCard from "../PricingCard.jsx";

/**
 * 12 — PurchaseIntent
 * Three offer cards + compact comparison bar.
 * Always labeled as scenario preference, not predicted conversion.
 */
export default function PurchaseIntent({ data }) {
  const max = Math.max(...data.scenarios.map((s) => s.top2));
  return (
    <div className="chart-pi">
      <p className="chart-pi-headline">{langPair(data.headline)}</p>
      <p className="chart-pi-lead">{langPair(data.lead)}</p>
      <div className="chart-pi-grid">
        <div className="chart-pi-cards">
          {data.scenarios.map((s) => (
            <PricingCard key={s.id} scenario={s} />
          ))}
        </div>
        <ul className="chart-pi-bars" aria-label="Top 2 box preference">
          {data.scenarios.map((s) => (
            <li key={s.id} className={`chart-pi-bar ${s.accent ? "is-accent" : ""}`.trim()}>
              <span className="chart-pi-bar-id">{s.id}</span>
              <div className="chart-pi-bar-track">
                <div className="chart-pi-bar-fill" style={{ width: `${(s.top2 / max) * 100}%` }} />
              </div>
              <span className="chart-pi-bar-value">{s.top2}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
