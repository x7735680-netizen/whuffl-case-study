/**
 * ChartRangeBar — `RPR low ━ ● OPP ━ RPR high` with a vertical
 * reference marker. Used by the PSM range chart.
 */
export default function ChartRangeBar({
  rprLow,
  rprHigh,
  opp,
  reference,
  referenceLabel,
  width = 520,
}) {
  const range = Math.max(1, rprHigh - rprLow);
  const oppX = ((opp - rprLow) / range) * width;
  const refX = reference != null ? ((reference - rprLow) / range) * width : null;

  return (
    <svg
      className="chart-range"
      viewBox={`0 0 ${width} 80`}
      role="img"
      aria-label={`RPR low ${rprLow} to RPR high ${rprHigh}, OPP ${opp}`}
    >
      {/* RPR band */}
      <rect x="0" y="34" width={width} height="14" rx="7" className="chart-range-band" />
      {/* OPP dot */}
      <g transform={`translate(${oppX}, 41)`}>
        <circle r="9" className="chart-range-dot" />
        <text x="0" y="-12" textAnchor="middle" className="chart-range-text">¥{opp}</text>
        <text x="0" y="28" textAnchor="middle" className="chart-range-sub">OPP</text>
      </g>
      {/* Reference vertical marker */}
      {refX != null ? (
        <g transform={`translate(${refX}, 0)`}>
          <line x1="0" y1="20" x2="0" y2="62" className="chart-range-ref" />
          <text x="0" y="14" textAnchor="middle" className="chart-range-ref-label">
            ¥{reference}{referenceLabel ? ` · ${referenceLabel}` : ""}
          </text>
        </g>
      ) : null}
      <text x="0"   y="76" className="chart-range-axis">RPR low ¥{rprLow}</text>
      <text x={width} y="76" textAnchor="end" className="chart-range-axis">RPR high ¥{rprHigh}</text>
    </svg>
  );
}
