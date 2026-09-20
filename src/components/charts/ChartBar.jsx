/**
 * ChartBar — horizontal bar with a single label and a numeric value.
 * Used as a building block for the more complex charts.
 */
export default function ChartBar({
  label,
  value,
  max = 100,
  accent = false,
  unit = "%",
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  return (
    <div className={`chart-bar ${accent ? "is-accent" : ""}`.trim()}>
      <div className="chart-bar-label">{label}</div>
      <div className="chart-bar-track" role="presentation">
        <div className="chart-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="chart-bar-value">
        {value}
        {unit}
      </div>
    </div>
  );
}
