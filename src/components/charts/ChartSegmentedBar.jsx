/**
 * ChartSegmentedBar — single horizontal bar split into segments.
 * One segment can be marked accent. The total is 100%.
 */
export default function ChartSegmentedBar({ segments }) {
  return (
    <div className="chart-seg">
      <div className="chart-seg-track" role="presentation">
        {segments.map((s, i) => (
          <div
            key={i}
            className={`chart-seg-cell ${s.accent ? "is-accent" : ""}`.trim()}
            style={{ width: `${s.share}%` }}
            aria-label={`${s.label} ${s.share}%`}
            title={`${s.label} · ${s.share}%`}
          />
        ))}
      </div>
      <ul className="chart-seg-legend">
        {segments.map((s, i) => (
          <li key={i} className={s.accent ? "is-accent" : ""}>
            <span className="chart-seg-dot" aria-hidden="true" />
            <span className="chart-seg-label">{s.label}</span>
            <span className="chart-seg-value">{s.share}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
