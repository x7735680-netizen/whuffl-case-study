import { langPair } from "../../lib/lang.js";

/**
 * 07 — HardwareSizingDiagram
 * Engineering calculation panel + dimension diagram.
 */
export default function HardwareSizingDiagram({ data }) {
  return (
    <div className="chart-sizing">
      <p className="chart-sizing-headline">{langPair(data.headline)}</p>
      <p className="chart-sizing-lead">{langPair(data.lead)}</p>
      <div className="chart-sizing-grid">
        <ol className="chart-sizing-steps">
          {data.steps.map((s, i) => (
            <li key={i} className="chart-sizing-step">
              <span className="chart-sizing-step-label">{langPair(s.label)}</span>
              <span className="chart-sizing-step-value">{langPair(s.value)}</span>
            </li>
          ))}
        </ol>
        <figure className="chart-sizing-diagram" aria-label="Module dimension">
          <svg viewBox="0 0 360 200" role="img">
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse">
                <path d="M0 6 L6 0" stroke="var(--c-olive)" strokeWidth="0.5" opacity="0.4" />
              </pattern>
            </defs>
            {/* module outline */}
            <rect x="120" y="60" width="120" height="50" rx="10" className="chart-sizing-module" />
            {/* light guide */}
            <rect x="135" y="78" width="90" height="14" rx="7" fill="var(--c-accent)" opacity="0.8" />
            {/* dimension lines */}
            <line x1="120" y1="125" x2="240" y2="125" className="chart-sizing-dim" />
            <line x1="120" y1="120" x2="120" y2="130" className="chart-sizing-dim" />
            <line x1="240" y1="120" x2="240" y2="130" className="chart-sizing-dim" />
            <text x="180" y="142" textAnchor="middle" className="chart-sizing-dim-label">38 mm</text>
            <line x1="105" y1="60" x2="105" y2="110" className="chart-sizing-dim" />
            <line x1="100" y1="60" x2="110" y2="60" className="chart-sizing-dim" />
            <line x1="100" y1="110" x2="110" y2="110" className="chart-sizing-dim" />
            <text x="96" y="89" textAnchor="end" className="chart-sizing-dim-label">38 mm</text>
            {/* leash direction */}
            <line x1="180" y1="60" x2="180" y2="20" className="chart-sizing-leash" />
            <text x="180" y="14" textAnchor="middle" className="chart-sizing-leash-label">1.5 m</text>
            <text x="180" y="178" textAnchor="middle" className="chart-sizing-strap-label">
              {langPair({ en: "S 26–32 · M 32–42 · L 42–55 cm", zh: "S 26–32 · M 32–42 · L 42–55 cm" })}
            </text>
          </svg>
        </figure>
      </div>
      <p className="chart-sizing-note">
        {langPair({
          en: "Sizing derived from viewing distance, not from styling. Goal: dimensions follow structure, not taste.",
          zh: "尺寸由视距推导，而不是由造型决定。目标：让尺寸服从结构，而非服从审美。"
        })}
      </p>
    </div>
  );
}
